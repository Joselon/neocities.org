import { DATA_VERSION } from "../data/version.js";

export class RecommendationExchange {

    constructor({
        id =  RecommendationExchange.generateId(),
        version = DATA_VERSION,
        createdAt = new Date().toISOString(),
        sender,
        items = []
    } = {}) {
        this.id = id;
        this.version = RecommendationExchange.validateVersion(version);
        this.createdAt = createdAt;
        this.sender = RecommendationExchange.validateSender(sender);
        this.items = RecommendationExchange.validateItems(items);
    }

    static generateId() {
        return crypto.randomUUID();
    }

    static validateVersion(version) {

        if (
            !Number.isInteger(version) ||
            version < 1 ||
            version > DATA_VERSION
        ) {
            throw new Error("Unsupported RecommendationExchange version");
        }

        return version;
    }

    static validateSender(sender) {

        if (!sender || typeof sender !== "string") {
            throw new Error("sender is required");
        }

        return sender;
    }

    static validateItems(items) {

        if (!Array.isArray(items)) {
            throw new Error("items is not an array");
        }

        return items;
    }
}