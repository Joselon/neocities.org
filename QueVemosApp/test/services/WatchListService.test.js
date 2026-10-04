import { test } from "node:test";
import assert from "node:assert/strict";

import { WatchListService } from "../../src/services/WatchListService.js";
import { WatchList } from "../../src/domain/WatchList.js";
import { Media } from "../../src/domain/Media.js";


test("addItem añade un Media y su WatchItem", () => {
    const watchList = new WatchList();
    const service = new WatchListService(watchList);

    const result = service.addItem("Matrix", "movie");

    assert.equal(result.success, true);
    assert.equal(watchList.media.length, 1);
    assert.equal(watchList.watchItems.length, 1);

    assert.equal(
        watchList.watchItems[0].mediaId,
        watchList.media[0].id
    );
});


test("addItem no añade nada si falla la creación del Media", () => {
    const watchList = new WatchList();
    const service = new WatchListService(watchList);

    const result = service.addItem("", "movie");

    assert.equal(result.success, false);
    assert.equal(watchList.media.length, 0);
    assert.equal(watchList.watchItems.length, 0);
});

test("addItem elimina el Media si falla al añadir el WatchItem", () => {
    class WatchListQueFalla extends WatchList {

        addWatchItem() {
            throw new Error("Error al añadir WatchItem");
        }
    }

    const watchList = new WatchListQueFalla();
    const service = new WatchListService(watchList);

    const result = service.addItem("Matrix", "movie");

    assert.equal(result.success, false);

    assert.equal(watchList.media.length, 0);
    assert.equal(watchList.watchItems.length, 0);
});
