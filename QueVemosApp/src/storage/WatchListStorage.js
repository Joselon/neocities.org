import { WatchList } from "../domain/WatchList.js";
import { Media } from "../domain/Media.js";
import { WatchItem } from "../domain/WatchItem.js";

export class WatchListStorage {

    constructor(storage, key = "quevemos-watchlist") {
        this.storage = storage;
        this.key = key;
    }

    save(watchList) {
        const json = JSON.stringify(watchList);

        this.storage.setItem(
            this.key,
            json
        );
    }

    load() {
        const json = this.storage.getItem(this.key);

        if (!json) {
            return new WatchList();
        }
        
        const data = JSON.parse(json);

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
}