import { WatchList } from "../domain/WatchList.js";
import { Media } from "../domain/Media.js";
import { WatchItem } from "../domain/WatchItem.js";
import { DATA_VERSION } from "../data/version.js";

export class WatchListFileStorage {

    export(watchList) {
        return JSON.stringify(watchList, null, 2);
    }

    import(json) {
        const data = this.parse(json);

        this.validate(data);

        const media = data.media.map(
            item => new Media(item)
        );

        const watchItems = data.watchItems.map(
            item => new WatchItem(item)
        );

        return new WatchList({
            version: data.version,
            id: data.id,
            name: data.name,
            media,
            watchItems
        });
    }

    parse(json) {
        try {
            return JSON.parse(json);
        } catch {
            throw new Error("Invalid JSON");
        }
    }

    validate(data) {

        if (!data || typeof data !== "object" || Array.isArray(data)) {
            throw new Error("Invalid WatchList file");
        }

        if (
            !Number.isInteger(data.version) ||
            data.version < 1 ||
            data.version > DATA_VERSION
        ) {
            throw new Error("Unsupported WatchList version");
        }

        if (!Array.isArray(data.media)) {
            throw new Error("WatchList media is not an array");
        }

        if (!Array.isArray(data.watchItems)) {
            throw new Error("WatchList watchItems is not an array");
        }
    }
}