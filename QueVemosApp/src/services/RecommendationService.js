import { WatchList } from "../domain/WatchList.js";
import { WatchItem } from "../domain/WatchItem.js";
import { Recommendation } from "../domain/Recommendation.js";
import { RecommendationList } from "../domain/RecommendationList.js";

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

        return recommendationList.recommendations.map(
            recommendation => {

                const media = watchList.media.find(
                    item => item.id === recommendation.mediaId
                );

                if (!media) {
                    throw new Error("Media not found in WatchList");
                }

                return {
                    media,
                    recommendation
                };
            }
        );
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

                const matches =
                    this.findMediaCandidates(
                        exchangeItem.media,
                        watchList
                    );

                // decidir status

                return {
                    exchangeItem,
                    matches,
                    status: matches.length > 0
                    ? "matched"
                    : "new"
                };
            }
        );
    }

    findMediaCandidates(exchangeMedia, watchList){
        /*
        1. omdbId exacto
            const matches = watchList.media.filter(
                media =>
                    exchangeItem.media.omdbId &&
                    media.omdbId &&
                    exchangeItem.media.omdbId === media.omdbId
            );
            status: matches.length > 0
                    ? "matched"
                    : "new"

        2. matchKey exacto
        3. matchKey parcial
        4. originalTitle
        */
       return watchList.media.filter(
            media =>
                exchangeMedia.omdbId &&
                media.omdbId &&
                exchangeMedia.omdbId === media.omdbId
        );
    }

}