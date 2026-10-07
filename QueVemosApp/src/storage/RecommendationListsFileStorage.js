import { RecommendationList } from "../domain/RecommendationList.js";
import { Recommendation } from "../domain/Recommendation.js";
import { DATA_VERSION } from "../data/version.js";

export class RecommendationListsFileStorage {

    export(recommendationList) {
        return JSON.stringify(recommendationList, null, 2);
    }

    import(json) {

        const data = this.parse(json);

        this.validate(data);

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

    parse(json) {

        try {
            return JSON.parse(json);
        } catch {
            throw new Error("Invalid JSON");
        }
    }

    validate(data) {

        if (!Array.isArray(data)) {
            throw new Error(
                "Invalid RecommendationLists file"
            );
        }

        data.forEach(item => {

            if (
                !Number.isInteger(item.version) ||
                item.version < 1 ||
                item.version > DATA_VERSION
            ) {
                throw new Error(
                    "Unsupported RecommendationList version"
                );
            }

            if (
                !Array.isArray(item.recommendations)
            ) {
                throw new Error(
                    "RecommendationList recommendations is not an array"
                );
            }
        });
    }
}