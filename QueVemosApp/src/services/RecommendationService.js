import { WatchList } from "../domain/WatchList.js";
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
            sender: watchList.name,
            items
        });
    }

    createIncomingRecommendationList(exchange) {
        if (!(exchange instanceof RecommendationExchange)) {
            throw new Error("exchange must be a RecommendationExchange");
        }

        return new IncomingRecommendationList({
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

    acceptRecommendation(exchangeItem, recommendationList, watchList) {

        const { recommendation } = exchangeItem;

        const media = watchList.media.find(
            item => item.id === recommendation.mediaId
        );

        if (!media) {
            throw new Error("Media not found in WatchList");
        }

        const reasonParts = [
            recommendationList.name
        ];

        if (recommendation.recommenderRating !== undefined) {
            reasonParts[0] += ` | (Nota: ${recommendation.recommenderRating})`;
        }

        if (recommendation.reason) {
            reasonParts.push(recommendation.reason);
        }

        const watchItem = new WatchItem({
            mediaId: media.id,
            platforms: recommendation.platforms,
            spanishAudio: recommendation.spanishAudio,
            spanishSubtitles: recommendation.spanishSubtitles,
            reason: reasonParts.join(" | ")
        });

        watchList.watchItems.push(watchItem);

        recommendation.status = RecommendationStatus.ACCEPTED;

        return watchItem;
    }

    discardRecommendation(recommendation) {

        recommendation.status = RecommendationStatus.DISCARDED;

        return recommendation;
    }
}
