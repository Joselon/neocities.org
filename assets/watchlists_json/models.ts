export type MediaType =
    | "movie"
    | "series";

export type WatchStatus =
    | "pending"
    | "watching"
    | "paused"
    | "watched"
    | "discarded";

export type ImportItemStatus =
    | "pending"
    | "matched"
    | "new"
    | "conflict"
    | "imported"
    | "discarded";

export interface Media {
    id: string;

    title: string;
    originalTitle?: string;

    type: MediaType;
    year?: number;
    runtimeMinutes?: number;

    genres: string[];

    matchKey: string;

    omdbId?: string;
    poster?: string;

    ratings?: {
        imdb?: number;
        metacritic?: number;
    };
}

export interface WatchProgress {
    season?: number;
    episode?: number;
    minute?: number;
}

export interface WatchItem {
    mediaId: string;

    platformId?: string;

    reason?: string;

    spanishAudio: boolean;
    spanishSubtitles: boolean;

    status: WatchStatus;

    userRating?: number;

    progress?: WatchProgress;

    addedAt: string;
    watchedAt?: string;
}

export interface WatchList {
    version: number;
    id: string;
    name: string;

    items: WatchItem[];
}

export interface CatalogItem {
    id: string;
    name: string;
}

export interface Platform extends CatalogItem {
    country: string;
    active: boolean;
    logo?: string;
}

//compartir/importar:

export interface RecommendationPackage {
    version: number;

    source: {
        listId: string;
        listName: string;
    };

    items: RecommendationItem[];
}

export interface RecommendationItem {
    media: Media;
    watchItem: RecommendationWatchItem;
}

export interface RecommendationWatchItem {
    platformId?: string;

    reason?: string;

    spanishAudio: boolean;
    spanishSubtitles: boolean;

    status: WatchStatus;

    userRating?: number;

    progress?: WatchProgress;

    addedAt: string;
    watchedAt?: string;
}

//estado persistente de una importación:

export interface Import {
    version: number;
    id: string;

    source: {
        listId: string;
        listName: string;
    };

    status: "pending" | "completed";

    items: ImportItem[];
}

export interface ImportItem {
    media: Media;
    watchItem: RecommendationWatchItem;

    status: ImportItemStatus;

    localMediaId?: string;

    conflict?: ImportConflict;
}

export interface ImportConflict {
    reason: string;

    localMedia?: Media;

    conflictingFields?: string[];
}