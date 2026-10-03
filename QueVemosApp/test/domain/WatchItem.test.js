import { test } from "node:test";
import assert from "node:assert/strict";

import { WatchItem } from "../../src/domain/WatchItem.js";
import { WatchStatus } from "../../src/domain/WatchStatus.js";
import { WatchProgress } from "../../src/domain/WatchProgress.js";

test("WatchItem requires a mediaId", () => {
    assert.throws(() => {
        new WatchItem({});
    });
});

test("WatchItem starts with pending status", () => {
    const item = new WatchItem({
        mediaId: "media-001"
    });

    assert.equal(item.status, WatchStatus.PENDING);
});

test("WatchItem generates addedAt automatically", () => {
    const item = new WatchItem({
        mediaId: "media-001"
    });

    assert.ok(item.addedAt);
});

test("WatchItem starts without Spanish audio", () => {
    const item = new WatchItem({
        mediaId: "media-001"
    });

    assert.equal(item.spanishAudio, false);
});

test("WatchItem starts without Spanish subtitles", () => {
    const item = new WatchItem({
        mediaId: "media-001"
    });

    assert.equal(item.spanishSubtitles, false);
});

test("WatchItem accepts a status", () => {
    const watchingItem = new WatchItem({
        mediaId: "media-001",
        status: WatchStatus.WATCHING
    });

    assert.equal(watchingItem.status, WatchStatus.WATCHING);

});

test("WatchItem rejects an invalid status", () => {
    assert.throws(() => {
            new WatchItem({mediaId: "media-001",
        status: "mono-rojo"});
        });
});

test("WatchItem accepts a platform", () => {
    const watchingItem = new WatchItem({
        mediaId: "media-001",
        platformId: "netflix-es"
    });

    assert.equal(watchingItem.platformId, "netflix-es");

});

test("WatchItem accepts a reason", () => {
    const watchingItem = new WatchItem({
        mediaId: "media-001",
        reason: "Recomendación de Pepe"
    });

    assert.equal(watchingItem.reason, "Recomendación de Pepe");

});

test("WatchItem accepts a userRating", () => {
    const watchingItem = new WatchItem({
        mediaId: "media-001",
        userRating: 1
    });

    assert.equal(watchingItem.userRating, 1);

});

test("WatchItem can start watching", () => {
    const item = new WatchItem({
        mediaId: "media-001"
    });

    item.start();

    assert.equal(item.status, WatchStatus.WATCHING);
});

test("WatchItem manages progress", () => {
    const item = new WatchItem({
        mediaId: "media-001"
    });

    const progress = new WatchProgress({
        minute: 47
    });

    item.setProgress(progress);

    assert.deepEqual(item.progress, progress);
});

test("WatchItem requires a WatchProgress", () => {
    const item = new WatchItem({
        mediaId: "media-001"
    });

    assert.throws(() => {
        item.setProgress({ minute: 47 });
    });
});

test("WatchItem accepts a WatchProgress", () => {
    const item = new WatchItem({
        mediaId: "media-001"
    });

    const progress = new WatchProgress({
        minute: 47
    });

    item.setProgress(progress);

    assert.deepEqual(item.progress, progress);
});

/*
puede cambiar de estado
gestiona progreso
*/