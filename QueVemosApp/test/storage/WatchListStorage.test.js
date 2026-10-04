import { test } from "node:test";
import assert from "node:assert/strict";

import { WatchList } from "../../src/domain/WatchList.js";
import { WatchListStorage } from "../../src/storage/WatchListStorage.js";
import { Media } from "../../src/domain/Media.js";
import { WatchItem } from "../../src/domain/WatchItem.js";

test("Storage: load returns empty WatchList when storage is empty", () => {

    const storage = {
        getItem() {
            return null;
        }
    };

    const watchListStorage = new WatchListStorage(storage);

    const watchList = watchListStorage.load();

    assert.ok(watchList instanceof WatchList);
    assert.deepEqual(watchList.watchItems, []);
    assert.deepEqual(watchList.media, []);
});


test("Storage: load reconstructs WatchList from stored JSON", () => {

    const data = {
        version: 1,
        id: "watchlist-001",
        name: "La nuestra",
        media: [
            {
                id: "media-001",
                title: "Matrix",
                originalTitle: "The Matrix",
                type: "movie",
                year: 1999,
                runtimeMinutes: 136,
                genres: [
                    "science-fiction",
                    "action"
                ],
                omdbId: "tt0133093",
                poster: "poster.jpg",
                ratings: {
                    imdb: 8.7
                }
            }
        ],
        watchItems: [
            {
                mediaId: "media-001",
                platforms: [
                    "netflix-es"
                ],
                status: "pending"
            }
        ]
    };

    const storage = {
        getItem() {
            return JSON.stringify(data);
        }
    };

    const watchListStorage = new WatchListStorage(storage);

    const watchList = watchListStorage.load();

    assert.ok(watchList instanceof WatchList);

    assert.equal(watchList.id, "watchlist-001");
    assert.equal(watchList.name, "La nuestra");

    assert.equal(watchList.media.length, 1);
    assert.ok(watchList.media[0] instanceof Media);
    assert.equal(watchList.media[0].title, "Matrix");
    assert.equal(watchList.media[0].year, 1999);

    assert.equal(watchList.watchItems.length, 1);
    assert.ok(watchList.watchItems[0] instanceof WatchItem);
    assert.equal(watchList.watchItems[0].mediaId, "media-001");
    assert.deepEqual(
        watchList.watchItems[0].platforms,
        ["netflix-es"]
    );
});

test("Storage: save stores WatchList as JSON", () => {

    let storedKey;
    let storedValue;

    const storage = {
        setItem(key, value) {
            storedKey = key;
            storedValue = value;
        }
    };

    const watchList = new WatchList({
        version: 1,
        id: "watchlist-001",
        name: "La nuestra"
    });

    const watchListStorage = new WatchListStorage(storage);

    watchListStorage.save(watchList);

    assert.equal(
        storedKey,
        "quevemos-watchlist"
    );

    assert.equal(
        storedValue,
        JSON.stringify(watchList)
    );
});

test("Storage: save and load preserve WatchList", () => {

    const data = {};

    const storage = {
        setItem(key, value) {
            data[key] = value;
        },

        getItem(key) {
            return data[key] ?? null;
        }
    };

    const original = new WatchList({
        version: 1,
        id: "watchlist-001",
        name: "La nuestra",
        media: [
            new Media({
                id: "media-001",
                title: "Matrix",
                type: "movie",
                year: 1999,
                genres: ["science-fiction"]
            })
        ],
        watchItems: [
            new WatchItem({
                mediaId: "media-001",
                platforms: ["netflix-es"],
                status: "pending"
            })
        ]
    });

    const watchListStorage = new WatchListStorage(storage);

    watchListStorage.save(original);

    const loaded = watchListStorage.load();

    assert.deepEqual(
        loaded,
        original
    );

    assert.ok(loaded instanceof WatchList);
    assert.ok(loaded.media[0] instanceof Media);
    assert.ok(loaded.watchItems[0] instanceof WatchItem);
});