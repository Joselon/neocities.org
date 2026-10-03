import { WatchStatus } from "./WatchStatus.js";

export class WatchItem {

    constructor({
        mediaId,
        platformId = undefined,
        reason = undefined,
        spanishAudio = false,
        spanishSubtitles = false,
        status = WatchStatus.PENDING,
        userRating = undefined,
        progress = undefined,
        addedAt = new Date().toISOString(),
        watchedAt = undefined
    }) {
        this.mediaId = WatchItem.validateMediaId(mediaId);
        this.platformId = platformId;
        this.reason = reason;
        this.spanishAudio = spanishAudio;
        this.spanishSubtitles = spanishSubtitles;
        this.status =  WatchItem.validateStatus(status);
        this.userRating = userRating;
        this.progress = progress;
        this.addedAt = addedAt;
        this.watchedAt = watchedAt;
    }

    static validateMediaId(mediaId) {
        if (!mediaId || typeof mediaId !== "string") {
            throw new Error("mediaId is required");
        }

        return mediaId;
    }
    
    static validateStatus(status) {
        if (!Object.values(WatchStatus).includes(status)) {
            throw new Error("Invalid status type");
        }
        return status;
    }
    
}