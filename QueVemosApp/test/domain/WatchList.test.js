import { test } from "node:test";
import assert from "node:assert/strict";

import { WatchList } from "../../src/domain/WatchList.js";
import { WatchItem } from "../../src/domain/WatchItem.js";
import { Media } from "../../src/domain/Media.js";
import { MediaType } from "../../src/domain/MediaType.js";

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

test("removeMedia no elimina un Media que tiene un WatchItem asociado", () => {
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