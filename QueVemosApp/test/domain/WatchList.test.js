import { test } from "node:test";
import assert from "node:assert/strict";

import { WatchList } from "../../src/domain/WatchList.js";
import { WatchItem } from "../../src/domain/WatchItem.js";
import { Media } from "../../src/domain/Media.js";
import { MediaType } from "../../src/domain/MediaType.js";
import { DATA_VERSION } from "../../src/data/version.js";

test("WatchList starts empty", () => {
    const watchList = new WatchList();

    assert.deepEqual(watchList.media, []);
    assert.deepEqual(watchList.watchItems, []);
});

test("WatchList rejects invalid items", () => {
    assert.throws(() => {
        new WatchList({
            watchItems: ["not a WatchItem"]
        });
    });
});

test("WatchList rejects invalid media", () => {
    assert.throws(() => {
        new WatchList({
            media: ["not a Media"]
        });
    });
});

//ToDo: Test del resto de atributos

test("WatchList can add a Media", () => {
    const watchList = new WatchList();
    const media = new Media({
        title: "Dune",
        type: MediaType.MOVIE
    });

    watchList.addMedia(media);

    assert.deepEqual(watchList.media, [media]);
});

test("WatchList does not add the same Media twice", () => {
    const watchList = new WatchList();

    const media = new Media({
        title: "Dune",
        type: MediaType.MOVIE
    });

    watchList.addMedia(media);
    //watchList.addMedia(media);

    assert.throws(
        () => watchList.addMedia(media),
        /Media already exists/
    );
});

test("WatchList can add a WatchItem for an existing Media", () => {
    const watchList = new WatchList();

    const media = new Media({
        title: "Dune",
        type: MediaType.MOVIE
    });

    const watchItem = new WatchItem({
        mediaId: media.id
    });

    watchList.addMedia(media);
    watchList.addWatchItem(watchItem);

    assert.deepEqual(watchList.watchItems, [watchItem]);
});

test("WatchList rejects a WatchItem whose Media does not exist", () => {
    const watchList = new WatchList();

    const watchItem = new WatchItem({
        mediaId: "media-that-does-not-exist"
    });

    assert.throws(
        () => watchList.addWatchItem(watchItem),
        /Media not found/
    );
});

//ToDo: Test de addMedia y addWatchItem con tipos

test("WatchList removeMedia no elimina un Media que tiene un WatchItem asociado", () => {
    const watchList = new WatchList();

    const media = new Media({ title: "Matrix", type: "movie" });
    const watchItem = new WatchItem({
        mediaId: media.id
    });

    watchList.addMedia(media);
    watchList.addWatchItem(watchItem);

    const result = watchList.removeMedia(media.id);

    assert.equal(result, false);
    assert.equal(watchList.media.length, 1);
    assert.equal(watchList.watchItems.length, 1);
});

test("WatchList:removeMedia elimina un Media sin WatchItem asociado", () => {
    const watchList = new WatchList();

    const media = new Media({ title: "Matrix", type: "movie" });

    watchList.addMedia(media);

    const result = watchList.removeMedia(media.id);

    assert.equal(result, true);
    assert.equal(watchList.media.length, 0);
});

test("WatchList: does not allow adding the same media twice", () => {
    const watchList = new WatchList();

    const media1 = new Media({
        title: "Robocop",
        type: "movie"
    });

    const media2 = new Media({
        title: "Robocop",
        type: "movie"
    });

    watchList.addMedia(media1);

    assert.throws(
        () => watchList.addMedia(media2),
        /Media already exists/
    );
});

test("WatchList: allows media with the same title but different type", () => {
    const watchList = new WatchList();

    const movie = new Media({
        title: "Robocop",
        type: "movie"
    });

    const series = new Media({
        title: "Robocop",
        type: "series"
    });

    watchList.addMedia(movie);
    watchList.addMedia(series);

    assert.strictEqual(watchList.media.length, 2);
});

test("WatchList: accepts supported versions", () => {
    const watchList = new WatchList();

    assert.equal(watchList.version, DATA_VERSION);
});

test("WatchList: rejects unsupported version", () => {
    assert.throws(
        () => new WatchList({
            name: "Mi lista",
            version: DATA_VERSION + 1
        }),
        {
            message: "Unsupported watch list version"
        }
    );
});
