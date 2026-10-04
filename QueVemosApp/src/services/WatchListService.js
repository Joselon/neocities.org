import { Media } from "../domain/Media.js";
import { WatchItem } from "../domain/WatchItem.js";
import { WatchStatus } from "../domain/WatchStatus.js";

/* WatchListService
├── añadir Item (Media y WatchItem)
├── buscar coincidencias
├── resolver coincidencias
├── importar recomendaciones
├── exportar datos
└── ... */
export class WatchListService {

    constructor(watchList) {
        this.watchList = watchList;
    }

    addItem({
        title,
        type,
        year,
        originalTitle,
        genres,
        platforms
    }) {
        let media = null;
        let mediaAdded = false;

        try {
            media = new Media({
                title,
                type,
                year,
                originalTitle,
                genres
            });

            const watchItem = new WatchItem({
                mediaId: media.id,
                platforms
            });

            this.watchList.addMedia(media);
            mediaAdded = true;

            this.watchList.addWatchItem(watchItem);

            return {
                success: true
            };

        } catch (error) {

            if (mediaAdded) {
                this.watchList.removeMedia(media.id);
            }

            return {
                success: false,
                error: error.message
            };
        }
    }

    updateItem({
        mediaId,
        media,
        watchItem
    }) {
        const currentMedia = this.watchList.media.find(
            item => item.id === mediaId
        );

        const currentWatchItem = this.watchList.watchItems.find(
            item => item.mediaId === mediaId
        );

        if (!currentMedia || !currentWatchItem) {
            return {
                success: false,
                error: "Item not found"
            };
        }

        try {
            const updatedMedia = new Media({
                id: mediaId,
                title: media.title,
                type: media.type,
                year: media.year,
                originalTitle: media.originalTitle,
                genres: media.genres,

                runtimeMinutes: currentMedia.runtimeMinutes,
                omdbId: currentMedia.omdbId,
                poster: currentMedia.poster,
                ratings: currentMedia.ratings

            });

            const duplicate = this.watchList.media.some(item =>
                item.id !== mediaId &&
                item.matchKey === updatedMedia.matchKey
            );

            if (duplicate) {
                throw new Error("Media already exists");
            }

            currentMedia.title = updatedMedia.title;
            currentMedia.type = updatedMedia.type;
            currentMedia.year = updatedMedia.year;
            currentMedia.originalTitle = updatedMedia.originalTitle;
            currentMedia.genres = updatedMedia.genres;

            currentWatchItem.platforms = watchItem.platforms;
            currentWatchItem.reason = watchItem.reason;
            currentWatchItem.spanishAudio = watchItem.spanishAudio;
            currentWatchItem.spanishSubtitles = watchItem.spanishSubtitles;
            currentWatchItem.userRating = watchItem.userRating;
            currentWatchItem.progress = watchItem.progress;

            return {
                success: true
            };

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    changeStatus(mediaId, status) {
        const watchItem = this.watchList.watchItems.find(
            item => item.mediaId === mediaId
        );

        if (!watchItem) {
            return {
                success: false,
                error: "WatchItem not found"
            };
        }

        try {
            switch (status) {
                case WatchStatus.WATCHING:
                    if (watchItem.status === WatchStatus.PENDING) {
                        watchItem.start();
                    } else if (watchItem.status === WatchStatus.PAUSED) {
                        watchItem.resume();
                    } else {
                        throw new Error("Invalid status transition");
                    }
                    break;

                case WatchStatus.PAUSED:
                    if (watchItem.status !== WatchStatus.WATCHING) {
                        throw new Error("Invalid status transition");
                    }

                    watchItem.pause();
                    break;

                case WatchStatus.WATCHED:
                    if (watchItem.status !== WatchStatus.WATCHING) {
                        throw new Error("Invalid status transition");
                    }

                    watchItem.markAsWatched();
                    break;

                default:
                    throw new Error("Invalid status transition");
            }

            const updatedWatchItem = new WatchItem({
                mediaId: watchItem.mediaId,
                platforms: watchItem.platforms,
                reason: watchItem.reason,
                spanishAudio: watchItem.spanishAudio,
                spanishSubtitles: watchItem.spanishSubtitles,
                status: watchItem.status,
                userRating: watchItem.userRating,
                progress: watchItem.progress,
                addedAt: watchItem.addedAt,
                watchedAt: watchItem.watchedAt
            });

            const index = this.watchList.watchItems.indexOf(watchItem);

            this.watchList.watchItems[index] = updatedWatchItem;

            return {
                success: true
            };

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    getItems() {
        return this.watchList.watchItems.map(watchItem => {
            const media = this.watchList.media.find(
                media => media.id === watchItem.mediaId
            );

            return {
                media,
                watchItem
            };
        });
    }
}