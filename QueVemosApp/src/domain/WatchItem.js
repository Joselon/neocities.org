import { WatchStatus } from "./WatchStatus.js";
import { WatchProgress } from "./WatchProgress.js";

export class WatchItem {

    constructor({
        mediaId,
        platforms = [],
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
        this.platforms = platforms;
        this.reason = reason;
        this.spanishAudio = spanishAudio;
        this.spanishSubtitles = spanishSubtitles;
        this.status = WatchItem.validateStatus(status);
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

    start() {
        this.status = WatchStatus.WATCHING;
    }

    setProgress(progress) {
        if (!(progress instanceof WatchProgress)) {
            throw new Error("Invalid progress");
        }

        this.progress = progress;
    }

}