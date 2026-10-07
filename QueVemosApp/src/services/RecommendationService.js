import { WatchList } from "../domain/WatchList.js";
import { WatchItem } from "../domain/WatchItem.js";
import { Recommendation } from "../domain/Recommendation.js";
import { RecommendationList } from "../domain/RecommendationList.js";
import { RecommendationStatus } from "../domain/RecommendationStatus.js";
import { RecommendationExchange } from "../domain/RecommendationExchange.js";

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

    prepareComparison(recommendationExchange, watchList) {

        if (!watchList) {
            throw new Error("No WatchList loaded");
        }

        return {
            recommendationExchange,
            watchList
        };
    }

    compareRecommendations(recommendationExchange, watchList) {

        return recommendationExchange.map(
            exchangeItem => {

                const candidates =
                    this.findMediaCandidates(
                        exchangeItem.media,
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
                    exchangeItem,
                    matches: candidates,
                    status
                };
            }
        );
    }

    findMediaCandidates(exchangeMedia, watchList){

       const candidates = [];

       for (const media of watchList.media) {

            const matches = [];

            if (exchangeMedia.omdbId && media.omdbId && exchangeMedia.omdbId === media.omdbId) {
                    matches.push("omdbId");
            }

            if (exchangeMedia.matchKey === media.matchKey) {
                matches.push("matchKey");
            }

            const exchangeTitle = exchangeMedia.title.trim().toLowerCase();
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
                        exchangeMedia,
                        media
                    )
                });
            }
        }

        return candidates;
    }

    compareMedia(exchangeMedia, media) {

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
                JSON.stringify(exchangeMedia[field]) !==
                JSON.stringify(media[field])
            ) {
                differences.push(field);
            }
        }

        if (
            !media.omdbId &&
            exchangeMedia.omdbId
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