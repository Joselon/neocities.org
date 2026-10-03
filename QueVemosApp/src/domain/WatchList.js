import { Media } from "./Media.js";
import { WatchItem } from "./WatchItem.js";

export class WatchList {

    constructor({
        version = undefined,
        id = undefined,
        name = undefined,
        watchItems = undefined, //WatchItem[]
        media = undefined
    } = {}) {
        this.version = version;
        this.id = id;
        this.name = name;
        this.watchItems = WatchList.validatesItems(watchItems);
        this.media = WatchList.validatesMedia(media);
    }

    static validatesItems(watchItems) {
        if (!watchItems) {
            watchItems = [];
        }
        if (!Array.isArray(watchItems)) {
            throw new Error("watchItems is not an array");
        }
        watchItems.forEach(item => {
            if (!(item instanceof WatchItem)) {
                throw new Error("watchItems must contain only WatchItem");
            }
        });
        return watchItems;
    }

    static validatesMedia(media) {
        if (!media) {
            media = [];
        }
        if (!Array.isArray(media)) { //!(item instanceof Media)
            throw new Error("media is not an array");
        }
        media.forEach(item => {
            if (!(item instanceof Media)) {
                throw new Error("media must contain only Media");
            }
        });
        return media;
    }

    addMedia(media) {
        if (this.media.some(item => item.id === media.id)) {
            throw new Error("Media already exists");
        }
        //ToDo: por matchKey y comparación de campos
        // ¿devolver media1?
        // ¿rechazar?
        // ¿comparar campos?
        // ¿considerarlo conflicto?
        this.media.push(media);
    }

    addWatchItem(watchItem) {
        const mediaExists = this.media.some(
            media => media.id === watchItem.mediaId
        );

        if (!mediaExists) {
            throw new Error("Media not found");
        }
        this.watchItems.push(watchItem);
    }
}

