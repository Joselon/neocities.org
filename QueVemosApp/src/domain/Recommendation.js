import { RecommendationStatus } from "./RecommendationStatus.js";

export class Recommendation {

    constructor({
        id = Recommendation.generateId(),
        mediaId,
        platforms = [],
        spanishAudio = false,
        spanishSubtitles = false,
        reason = undefined,
        recommenderRating = undefined,
        status = RecommendationStatus.PENDING
    }) {
        this.id = id;
        this.mediaId = Recommendation.validateMediaId(mediaId);
        this.platforms = platforms;
        this.spanishAudio = spanishAudio;
        this.spanishSubtitles = spanishSubtitles;
        this.reason = reason;
        this.status = Recommendation.validateStatus(status);
        this.recommenderRating = recommenderRating;
    }

    static generateId() {
        return crypto.randomUUID();
    }

    static validateMediaId(mediaId) {
        if (!mediaId || typeof mediaId !== "string") {
            throw new Error("mediaId is required");
        }

        return mediaId;
    }

    static validateStatus(status) {
        if (!Object.values(RecommendationStatus).includes(status)) {
            throw new Error("Invalid status type");
        }
        return status;
    }
}