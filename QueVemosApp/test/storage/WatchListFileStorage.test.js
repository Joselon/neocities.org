import test from "node:test";
import assert from "node:assert/strict";

import { WatchList } from "../../src/domain/WatchList.js";
import { Media } from "../../src/domain/Media.js";
import { WatchItem } from "../../src/domain/WatchItem.js";
import { WatchListFileStorage } from "../../src/storage/WatchListFileStorage.js";

test("Storage: export creates JSON from WatchList", () => {

    const watchList = new WatchList({
        version: 1,
        id: "watchlist-001",
        name: "Nuestra lista"
    });

    const storage = new WatchListFileStorage();

    const json = storage.export(watchList);

    assert.equal(typeof json, "string");

    const data = JSON.parse(json);

    assert.equal(data.version, 1);
    assert.equal(data.id, "watchlist-001");
    assert.equal(data.name, "Nuestra lista");
    assert.deepEqual(data.media, []);
    assert.deepEqual(data.watchItems, []);
});

test("Storage: export preserves WatchList data", () => {

    const media = new Media({
        id: "media-001",
        title: "Matrix",
        type: "movie",
        year: 1999
    });

    const watchItem = new WatchItem({
        mediaId: media.id,
        platforms: ["netflix-es"]
    });

    const watchList = new WatchList({
        version: 1,
        id: "watchlist-001",
        name: "Nuestra lista",
        media: [media],
        watchItems: [watchItem]
    });

    const storage = new WatchListFileStorage();

    const json = storage.export(watchList);
    const data = JSON.parse(json);

    assert.equal(data.media.length, 1);
    assert.equal(data.media[0].title, "Matrix");
    assert.equal(data.media[0].year, 1999);

    assert.equal(data.watchItems.length, 1);
    assert.equal(data.watchItems[0].mediaId, "media-001");
    assert.deepEqual(
        data.watchItems[0].platforms,
        ["netflix-es"]
    );
});

test("Storage: import reconstructs WatchList objects", () => {

    const json = JSON.stringify({
        version: 1,
        id: "watchlist-001",
        name: "Nuestra lista",
        media: [
            {
                id: "media-001",
                title: "Matrix",
                type: "movie",
                year: 1999
            }
        ],
        watchItems: [
            {
                mediaId: "media-001",
                platforms: ["netflix-es"]
            }
        ]
    });

    const storage = new WatchListFileStorage();

    const watchList = storage.import(json);

    assert.ok(watchList instanceof WatchList);

    assert.equal(watchList.name, "Nuestra lista");

    assert.equal(watchList.media.length, 1);
    assert.ok(watchList.media[0] instanceof Media);

    assert.equal(watchList.watchItems.length, 1);
    assert.ok(watchList.watchItems[0] instanceof WatchItem);

    assert.equal(
        watchList.media[0].title,
        "Matrix"
    );

    assert.equal(
        watchList.watchItems[0].mediaId,
        "media-001"
    );
});

test("Storage: exported WatchList can be imported again", () => {

    const media = new Media({
        id: "media-001",
        title: "Matrix",
        type: "movie",
        year: 1999
    });

    const watchItem = new WatchItem({
        mediaId: media.id,
        platforms: ["netflix-es"]
    });

    const original = new WatchList({
        version: 1,
        id: "watchlist-001",
        name: "Nuestra lista",
        media: [media],
        watchItems: [watchItem]
    });

    const storage = new WatchListFileStorage();

    const json = storage.export(original);
    const imported = storage.import(json);

    assert.deepEqual(
        imported.media[0],
        original.media[0]
    );

    assert.deepEqual(
        imported.watchItems[0],
        original.watchItems[0]
    );

    assert.equal(imported.name, original.name);
    assert.equal(imported.id, original.id);
    assert.equal(imported.version, original.version);
});

test("Storage: import rejects invalid JSON", () => {

    const storage = new WatchListFileStorage();

    assert.throws(
        () => storage.import("{ invalid json"),
        {
            message: "Invalid JSON"
        }
    );
});

test("Storage: import rejects unsupported version", () => {

    const storage = new WatchListFileStorage();

    const json = JSON.stringify({
        version: 2,
        media: [],
        watchItems: []
    });

    assert.throws(
        () => storage.import(json),
        {
            message: "Unsupported WatchList version"
        }
    );
});

test("Storage: import rejects missing media array", () => {

    const storage = new WatchListFileStorage();

    const json = JSON.stringify({
        version: 1,
        watchItems: []
    });

    assert.throws(
        () => storage.import(json),
        {
            message: "WatchList media is not an array"
        }
    );
});

test("Storage: import rejects missing watchItems array", () => {

    const storage = new WatchListFileStorage();

    const json = JSON.stringify({
        version: 1,
        media: []
    });

    assert.throws(
        () => storage.import(json),
        {
            message: "WatchList watchItems is not an array"
        }
    );
});

test("Storage: import rejects a non-object JSON value", () => {

    const storage = new WatchListFileStorage();

    assert.throws(
        () => storage.import("[]"),
        {
            message: "Invalid WatchList file"
        }
    );
});