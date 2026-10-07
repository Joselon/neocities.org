import test from "node:test";
import assert from "node:assert/strict";

import { RecommendationListsFileStorage } from "../../src/storage/RecommendationListsFileStorage.js";
import { RecommendationList } from "../../src/domain/RecommendationList.js";
import { Recommendation } from "../../src/domain/Recommendation.js";
import { DATA_VERSION } from "../../src/data/version.js";

test("RecommendationListsFileStorage: exports recommendation lists as JSON", () => {

    const list = new RecommendationList({
        id: "recommendation-list-001",
        name: "Recomendaciones desde : Mis padres"
    });

    const storage =
        new RecommendationListsFileStorage();

    const json = storage.export([list]);

    const data = JSON.parse(json);

    assert.ok(Array.isArray(data));
    assert.equal(data.length, 1);
    assert.equal(
        data[0].name,
        "Recomendaciones desde : Mis padres"
    );
});

test("RecommendationListsFileStorage: imports recommendation lists", () => {

    const list = new RecommendationList({
        id: "recommendation-list-001",
        name: "Recomendaciones desde : Mis padres"
    });

    const storage =
        new RecommendationListsFileStorage();

    const json = storage.export([list]);

    const lists = storage.import(json);

    assert.equal(lists.length, 1);

    assert.ok(
        lists[0] instanceof RecommendationList
    );

    assert.equal(
        lists[0].name,
        "Recomendaciones desde : Mis padres"
    );
});

test("RecommendationListsFileStorage: rejects invalid JSON", () => {

    const storage =
        new RecommendationListsFileStorage();

    assert.throws(
        () => storage.import("esto no es JSON"),
        /Invalid JSON/
    );
});

test("RecommendationListsFileStorage: rejects a non-array root", () => {

    const storage =
        new RecommendationListsFileStorage();

    assert.throws(
        () => storage.import("{}"),
        /Invalid RecommendationLists file/
    );
});

test("RecommendationListsFileStorage: rejects unsupported version", () => {

    const storage =
        new RecommendationListsFileStorage();

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