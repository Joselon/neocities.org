import test from "node:test";
import assert from "node:assert/strict";

import { InboxFileStorage } from "../../src/storage/InboxFileStorage.js";
import { RecommendationList } from "../../src/domain/RecommendationList.js";
import { Recommendation } from "../../src/domain/Recommendation.js";
import { DATA_VERSION } from "../../src/data/version.js";

test("InboxFileStorage: exports inbox (recommendation lists) as JSON", () => {

    const list = new RecommendationList({
        id: "recommendation-list-001",
        name: "Recomendaciones desde : Mis padres"
    });

    const storage =
        new InboxFileStorage();

    const json = storage.export([list]);

    const data = JSON.parse(json);

    assert.ok(Array.isArray(data));
    assert.equal(data.length, 1);
    assert.equal(
        data[0].name,
        "Recomendaciones desde : Mis padres"
    );
});

test("InboxFileStorage: imports inbox of recommendation lists", () => {

    const list = new RecommendationList({
        id: "recommendation-list-001",
        name: "Recomendaciones desde : Mis padres"
    });

    const storage =
        new InboxFileStorage();

    const json = storage.export([list]);

    const inbox = storage.import(json);

    assert.equal(inbox.length, 1);

    assert.ok(
        inbox[0] instanceof RecommendationList
    );

    assert.equal(
        inbox[0].name,
        "Recomendaciones desde : Mis padres"
    );
});

test("InboxFileStorage: rejects invalid JSON", () => {

    const storage =
        new InboxFileStorage();

    assert.throws(
        () => storage.import("esto no es JSON"),
        /Invalid JSON/
    );
});

test("InboxFileStorage: rejects a non-array root", () => {

    const storage =
        new InboxFileStorage();

    assert.throws(
        () => storage.import("{}"),
        /Invalid Inbox's file/
    );
});

test("InboxFileStorage: rejects unsupported version", () => {

    const storage =
        new InboxFileStorage();

    const json = JSON.stringify([
        {
            version: 999,
            id: "recommendation-list-001",
            name: "Recomendaciones",
            recommendations: []
        }
    ]);

    assert.throws(
        () => storage.import(json),
        /Unsupported RecommendationList version/
    );
});