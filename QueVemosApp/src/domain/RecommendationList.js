import {DATA_VERSION} from "../data/version.js"
import { Recommendation } from "./Recommendation.js";

export class RecommendationList {

    constructor({
        id =  RecommendationList.generateId(),
        name = undefined,
        recommendations = undefined, //Recommendation[]
        version = DATA_VERSION,
        createdAt = new Date().toISOString(),
    } = {}) {
        this.id = id;
        this.name = RecommendationList.validateName(name);
        this.recommendations = RecommendationList.validatesRecommendations(recommendations);
        this.version = RecommendationList.validateVersion(version);
        this.createdAt = createdAt;
    }

    static generateId() {
        return crypto.randomUUID();
    }

    static validateName(name) {
        if (!name || typeof name !== "string") {
            throw new Error("name is required");
        }

        return name;
    }

    static validatesRecommendations(recommendations) {
        if(!recommendations){
            recommendations = [];
        }
        if (!Array.isArray(recommendations)) {
            throw new Error("recommendations is not an array");
        }
        recommendations.forEach(item => {
            if (!(item instanceof Recommendation)) {
                throw new Error("recommendations must contain only Recommendation");
            }
        });
        return recommendations;
    }

    static validateVersion(version) {
        if (
            !Number.isInteger(version) ||
            version < 1 ||
            version > DATA_VERSION
        ) {
            throw new Error("Unsupported recommendation list version");
        }

        return version;
    }
}