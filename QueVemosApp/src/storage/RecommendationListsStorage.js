import { RecommendationList } from "../domain/RecommendationList.js";
import { Recommendation } from "../domain/Recommendation.js";

export class RecommendationListsStorage {
    
    constructor(storage, key = "quevemos-recommendation-lists") {
        this.storage = storage;
        this.key = key;
    }

    save(recommendationLists) {

        const json = JSON.stringify(
            recommendationLists
        );

        this.storage.setItem(
            this.key,
            json
        );
    }

    load() {

        const json = this.storage.getItem(
            this.key
        );

        if (!json) {
            return [];
        }

        const data = JSON.parse(json);

        return data.map(
            item => new RecommendationList({
                version: item.version,
                id: item.id,
                name: item.name,
                recommendations:
                    item.recommendations.map(
                        recommendation =>
                            new Recommendation(recommendation)
                    ),
                createdAt: item.createdAt
            })
        );
    }
}
