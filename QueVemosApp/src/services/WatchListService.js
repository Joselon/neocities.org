import { Media } from "../domain/Media.js";
import { WatchItem } from "../domain/WatchItem.js";
import { WatchStatus } from "../domain/WatchStatus.js";
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
        watchItem,
        omdbDetails
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

        const hasNewOmdbSelection =
            omdbDetails &&
            omdbDetails.imdbID !== currentMedia.omdbId;

        const poster = media.poster?.trim()
            ? media.poster.trim()
            : hasNewOmdbSelection
                ? undefined
                : currentMedia.poster;

        try {
            const updatedMedia = new Media({
                id: mediaId,

                // Campos editables por el usuario.
                title: media.title,
                type: media.type,
                year: media.year,
                originalTitle: media.originalTitle,
                genres: media.genres,
                trailer: media.trailer?.trim() || undefined,

                // Metadatos actuales: se conservan si no se selecciona
                // una ficha OMDb diferente.
                runtimeMinutes: currentMedia.runtimeMinutes,
                ratings: currentMedia.ratings,
                director: currentMedia.director,
                country: currentMedia.country,
                actors: currentMedia.actors,
                plot: currentMedia.plot,
                awards: currentMedia.awards,
                omdbId: currentMedia.omdbId,
                //Permite editado por usuario
                poster: poster
            });

            const duplicate = this.watchList.media.some(item =>
                item.id !== mediaId &&
                item.matchKey === updatedMedia.matchKey
            );

            if (duplicate) {
                throw new Error("Media already exists");
            }

            if (omdbDetails) {
                const result = this.updateOmdbDetails({
                    media: updatedMedia,
                    details: omdbDetails
                });

                if (!result.success) {
                    throw new Error(result.error);
                }
            }

            // A partir de aquí, todas las validaciones han terminado.
            currentMedia.title = updatedMedia.title;
            currentMedia.type = updatedMedia.type;
            currentMedia.year = updatedMedia.year;
            currentMedia.originalTitle = updatedMedia.originalTitle;
            currentMedia.genres = updatedMedia.genres;
            currentMedia.runtimeMinutes = updatedMedia.runtimeMinutes;
            currentMedia.ratings = updatedMedia.ratings;
            currentMedia.director = updatedMedia.director;
            currentMedia.country = updatedMedia.country;
            currentMedia.actors = updatedMedia.actors;
            currentMedia.plot = updatedMedia.plot;
            currentMedia.awards = updatedMedia.awards;
            currentMedia.omdbId = updatedMedia.omdbId;
            currentMedia.poster = updatedMedia.poster;
            currentMedia.trailer = updatedMedia.trailer;

            currentWatchItem.platforms = watchItem.platforms;
            currentWatchItem.reason = watchItem.reason;
            currentWatchItem.spanishAudio = watchItem.spanishAudio;
            currentWatchItem.spanishSubtitles =
                watchItem.spanishSubtitles;
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
            
                case WatchStatus.PENDING:
                    if(watchItem.status !== WatchStatus.DISCARDED){
                        if (watchItem.status !== WatchStatus.WATCHED) {
                            throw new Error("Invalid status transition");
                        }
                    }
                    watchItem.markAsUnwatched();
                    break;
                case WatchStatus.DISCARDED:
                    if (watchItem.status === WatchStatus.DISCARDED) {
                        throw new Error("Invalid status transition");
                    }
                    watchItem.discard();
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

    renameWatchList(name) {
        if (!name || !name.trim()) {
            return {
                success: false,
                error: "El nombre no puede estar vacío"
            };
        }

        this.watchList.name = name.trim();

        return {
            success: true
        };
    }

    deleteItem(mediaId) {
        const removed = this.watchList.removeWatchItem(mediaId);

        if (!removed) {
            return {
                success: false,
                error: "Item not found"
            };
        }

        const mediaIsReferenced = this.watchList.watchItems.some(
            item => item.mediaId === mediaId
        );

        if (!mediaIsReferenced) {
            this.watchList.removeMedia(mediaId);
        }

        return { success: true };
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


    
    updateOmdbDetails({ media, details }) {
        if (!media || !details) {
            return {
                success: false,
                error: "Media and OMDb details are required"
            };
        }

        if (
            details.Response === "False" ||
            typeof details.imdbID !== "string" ||
            !details.imdbID.trim()
        ) {
            return {
                success: false,
                error: "Invalid OMDb details"
            };
        }

        if (!media.poster) {
            media.poster =
                details.Poster && details.Poster !== "N/A"
                    ? details.Poster
                    : undefined;
        }

        const runtimeMatch =
            typeof details.Runtime === "string"
                ? details.Runtime.match(/^(\d+)\s+min$/i)
                : null;

        const ratings = Array.isArray(details.Ratings)
            ? details.Ratings.filter(
                rating => rating?.Source && rating?.Value
            )
            : [];

        const getOmdbValue = value =>
            typeof value === "string" &&
            value.trim() &&
            value !== "N/A"
                ? value.trim()
                : undefined;

        media.omdbId = details.imdbID.trim();

        media.runtimeMinutes = runtimeMatch
            ? Number(runtimeMatch[1])
            : undefined;

        media.ratings = ratings;
        media.director = getOmdbValue(details.Director);
        media.country = getOmdbValue(details.Country);
        media.actors = getOmdbValue(details.Actors);
        media.plot = getOmdbValue(details.Plot);
        media.awards = getOmdbValue(details.Awards);

        return {
            success: true
        };
    }


    clearOmdbDetails({ mediaId }) {
        const media = this.watchList.media.find(
            item => item.id === mediaId
        );

        if (!media) {
            return {
                success: false,
                error: "Media not found"
            };
        }

        media.omdbId = undefined;
        media.runtimeMinutes = undefined;
        media.ratings = undefined;
        media.director = undefined;
        media.country = undefined;
        media.actors = undefined;
        media.plot = undefined;
        media.awards = undefined;

        return { success: true };
    }

}