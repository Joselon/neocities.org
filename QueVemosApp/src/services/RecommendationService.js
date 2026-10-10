import { Media } from "../domain/Media.js";
import { WatchItem } from "../domain/WatchItem.js";
import { Recommendation } from "../domain/Recommendation.js";
import { RecommendationList } from "../domain/RecommendationList.js";
import { RecommendationStatus } from "../domain/RecommendationStatus.js";
import { RecommendationExchange } from "../domain/RecommendationExchange.js";
import { IncomingRecommendationList } from "../domain/IncomingRecommendationList.js";
import { DATA_VERSION } from "../data/version.js";

export class RecommendationService {

    createRecommendation(watchList, watchItem){

        if(!watchList.watchItems.some(item => item === watchItem)){
            throw new Error("WatchItem is not in WatchList");
        }

        return new Recommendation({
            mediaId: watchItem.mediaId,
            platforms: [...watchItem.platforms],
            spanishAudio: watchItem.spanishAudio,
            spanishSubtitles: watchItem.spanishSubtitles,
            reason: watchItem.reason,
            recommenderRating: watchItem.userRating
        });
    }

    createRecommendationList(watchList, watchItems){

        const recommendations = watchItems.map(
            item => this.createRecommendation(watchList, item)
        );

        return new RecommendationList({
            name: "Recomendaciones desde : " + watchList.name,
            recommendations
        });
    }

    createRecommendationExchange(recommendationList, watchList) {

        const items = recommendationList.recommendations.map(
            recommendation => {

                const media = watchList.media.find(
                    media => media.id === recommendation.mediaId
                );

                if (!media) {
                    throw new Error(
                        `Media not found in WatchList: ${recommendation.mediaId}`
                    );
                }

                return {
                    media: {
                        id: media.id,
                        title: media.title,
                        originalTitle: media.originalTitle,
                        type: media.type,
                        year: media.year,
                        runtimeMinutes: media.runtimeMinutes,
                        genres: [...media.genres],
                        omdbId: media.omdbId,
                        poster: media.poster,
                        ratings: media.ratings,
                        matchKey: media.matchKey
                    },
                    recommendation
                };
            }
        );

        return new RecommendationExchange({
            sender: recommendationList.name,
            items
        });
    }

    createIncomingRecommendationList(exchange) {
        if (!(exchange instanceof RecommendationExchange)) {
            throw new Error("exchange must be a RecommendationExchange");
        }

        return new IncomingRecommendationList({
            id: exchange.id,
            name: exchange.sender,
            media: exchange.items.map(item => item.media),
            recommendations: exchange.items.map(
                item => new Recommendation(item.recommendation)
            ),
            version: DATA_VERSION,
            createdAt: exchange.createdAt
        });
    }

    prepareComparison(incomingRecommendationList, watchList) {

        if (!watchList) {
            throw new Error("No WatchList loaded");
        }

        return {
            incomingRecommendationList,
            watchList
        };
    }

    compareRecommendations(incomingRecommendationList, watchList) {

        return incomingRecommendationList.recommendations.map(
            recommendation => {

                const media =
                    incomingRecommendationList.media.find(
                        media => media.id === recommendation.mediaId
                    );

                const candidates =
                    this.findMediaCandidates(
                        media,
                        watchList
                    );

                let status = "new";

                if (candidates.some(candidate =>
                    candidate.matches.includes("omdbId")
                )) {
                    status = "matched";
                }
                else if (candidates.length > 0) {
                    status = "candidate";
                }

                return {
                    recommendation,
                    media,
                    matches: candidates,
                    status
                };
            }
        );
    }

    findMediaCandidates(incomingMedia, watchList){

       const candidates = [];

       for (const media of watchList.media) {

            const matches = [];

            if (incomingMedia.omdbId && media.omdbId && incomingMedia.omdbId === media.omdbId) {
                    matches.push("omdbId");
            }

            if (incomingMedia.matchKey === media.matchKey) {
                matches.push("matchKey");
            }

            const exchangeTitle = incomingMedia.title.trim().toLowerCase();
            const mediaTitle = media.title.trim().toLowerCase();

            const titleMatches =
                exchangeTitle !== mediaTitle &&
                (
                    exchangeTitle.includes(mediaTitle) ||
                    mediaTitle.includes(exchangeTitle)
                );

            if (titleMatches) {
                matches.push("partialTitle");
            }
  
            if (matches.length > 0) {
                candidates.push({
                    media,
                    matches,
                    differences: this.compareMedia(
                        incomingMedia,
                        media
                    )
                });
            }
        }

        return candidates;
    }

    compareMedia(incomingMedia, media) {

        const differences = [];

        const fieldsToCompare = [
            "title",
            "originalTitle",
            "type",
            "year",
            "runtimeMinutes",
            "genres",
            "poster"
        ];

        for (const field of fieldsToCompare) {

            if (
                JSON.stringify(incomingMedia[field]) !==
                JSON.stringify(media[field])
            ) {
                differences.push(field);
            }
        }

        if (
            !media.omdbId &&
            incomingMedia.omdbId
        ) {
            differences.push("omdbId");
        }

        return differences;
    }

    acceptRecommendation(incomingRecommendation, recommendationList, watchList) {

        const incomingMedia = recommendationList.media.find(
            item => item.id === incomingRecommendation.mediaId
        );

        if (!incomingMedia) {
            throw new Error("Media not found in recommendationList");
        }

        const { id: incomingMediaId, ...mediaData } = incomingMedia;
        const media = new Media(mediaData);

        watchList.addMedia(media);

        const reasonParts = [
            recommendationList.name
        ];

        if (incomingRecommendation.recommenderRating !== undefined) {
            reasonParts[0] += ` | (Nota: ${incomingRecommendation.recommenderRating})`;
        }

        if (incomingRecommendation.reason) {
            reasonParts.push(incomingRecommendation.reason);
        }

        const watchItem = new WatchItem({
            mediaId: media.id,
            platforms: incomingRecommendation.platforms,
            spanishAudio: incomingRecommendation.spanishAudio,
            spanishSubtitles: incomingRecommendation.spanishSubtitles,
            reason: reasonParts.join(" | ")
        });

        watchList.addWatchItem(watchItem);

        incomingRecommendation.status = RecommendationStatus.ACCEPTED;

        return watchItem;
    }

    mergeRecommendation({
        incomingRecommendationList,
        incomingRecommendation,
        watchList,
        targetMediaId,
        mediaFields = []
    }) {
        if (targetMediaId === undefined) {
            throw new Error("targetMediaId is required for merge");
        }
        const incomingMedia = incomingRecommendationList.media.find(
            item => item.id === incomingRecommendation.mediaId
        );

        if (!incomingMedia) {
            throw new Error("Media not found in recommendationList");
        }

        const localMedia = watchList.media.find(
            item => item.id === targetMediaId
        );

        if (!localMedia) {
            throw new Error("Target media not found in watchList");
        }

        const watchItem = watchList.watchItems.find(
            item => item.mediaId === localMedia.id
        );

        if (!watchItem) {
            throw new Error("WatchItem not found for target media");
        }

        if (!Array.isArray(mediaFields)) {
            throw new Error("mediaFields must be an array");
        }

        const allowedFields = [
            "title",
            "originalTitle",
            "type",
            "year",
            "runtimeMinutes",
            "genres",
            "omdbId",
            "poster",
            "ratings"
        ];

        for (const field of mediaFields) {
            if (!allowedFields.includes(field)) {
                throw new Error(`Invalid media field: ${field}`);
            }
        }

        const updates = {};

        for (const field of mediaFields) {
            const value = incomingMedia[field];

            if (value !== undefined) {
                updates[field] = Array.isArray(value)
                    ? [...value]
                    : value;
            }
        }

        const mergedMedia = new Media({
            ...localMedia,
            ...updates,
            id: localMedia.id
        });

        const hasDuplicate = watchList.media.some(
            media =>
                media.id !== localMedia.id &&
                media.matchKey === mergedMedia.matchKey
        );

        if (hasDuplicate) {
            throw new Error("Media already exists");
        }

        const reasonParts = [incomingRecommendationList.name];

        if (incomingRecommendation.recommenderRating !== undefined) {
            reasonParts.push(
                `(Nota: ${incomingRecommendation.recommenderRating})`
            );
        }

        if (incomingRecommendation.reason) {
            reasonParts.push(incomingRecommendation.reason);
        }

        const recommendationReason = reasonParts.join(" | ");

        const existingReason = watchItem.reason?.trim();

        // No añadir de nuevo la misma recomendación.
        if (
            existingReason &&
            existingReason.includes(recommendationReason)
        ) {
            throw new Error("Recommendation already added to WatchItem");
        }

        // Aplicar los cambios una vez validados.
        for (const [field, value] of Object.entries(updates)) {
            localMedia[field] = value;
        }

        watchItem.reason = existingReason
            ? `${existingReason} | ${recommendationReason}`
            : recommendationReason;

        incomingRecommendation.status = RecommendationStatus.ACCEPTED;

        return watchItem;
    }
    
    discardRecommendation(incomingRecommendation) {

        incomingRecommendation.status = RecommendationStatus.DISCARDED;

        return incomingRecommendation;
    }

    resolveRecommendation({incomingRecommendationList,
        incomingRecommendation,
        decision,
        watchList, targetMediaId, mediaFields = []}){
            if(incomingRecommendation.status === RecommendationStatus.ACCEPTED){
                throw new Error("Recommendation already accepted");
            }
                
            switch (decision) {
                case "create":
                    return this.acceptRecommendation(
                        incomingRecommendation,
                        incomingRecommendationList,
                        watchList
                    );
                case "merge":
                    return this.mergeRecommendation({
                        incomingRecommendationList,
                        incomingRecommendation,
                        watchList,
                        targetMediaId,
                        mediaFields
                    });

                case "discard":
                    return this.discardRecommendation(incomingRecommendation);

                default:
                    throw new Error("Invalid decision");
            }
    }
}
