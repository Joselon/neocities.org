export class WatchItem {

    constructor({
        mediaId,
        platformId = undefined,
        reason = undefined,
        spanishAudio = false,
        spanishSubtitles = false,
        status = "pending",
        userRating = undefined,
        progress = undefined,
        addedAt = new Date().toISOString(),
        watchedAt = undefined
    }) {
        this.mediaId = mediaId;
        this.platformId = platformId;
        this.reason = reason;
        this.spanishAudio = spanishAudio;
        this.spanishSubtitles = spanishSubtitles;
        this.status = status;
        this.userRating = userRating;
        this.progress = progress;
        this.addedAt = addedAt;
        this.watchedAt = watchedAt;
    }
}