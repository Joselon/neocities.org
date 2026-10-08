import {DATA_VERSION} from "../data/version.js"
import { Recommendation } from "./Recommendation.js";

export class IncomingRecommendationList {

    constructor({
        id =  IncomingRecommendationList.generateId(),
        name = undefined    ,
        recommendations = undefined, //Recommendation[]
        media = undefined,
        version = DATA_VERSION,
        createdAt = new Date().toISOString(),
    } = {}) {
        this.id = id;
        this.name = IncomingRecommendationList.validateName(name);
        this.recommendations = IncomingRecommendationList.validatesRecommendations(recommendations);
        this.media = IncomingRecommendationList.validatesMedia(media);
        this.version = IncomingRecommendationList.validateVersion(version);
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

    static validatesMedia(media) {

        if(!media){
            media = [];
        }
        if (!Array.isArray(media)) {
            throw new Error("media is not an array");
        }

        return media;
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