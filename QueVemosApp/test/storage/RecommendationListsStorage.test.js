import test from "node:test";
import assert from "node:assert/strict";

import { RecommendationListsStorage } from "../../src/storage/RecommendationListsStorage.js";
import { RecommendationList } from "../../src/domain/RecommendationList.js";
import { Recommendation } from "../../src/domain/Recommendation.js";

test("RecommendationListsStorage: returns an empty array when there is no data", () => {
    
    const localStorage = {
        getItem() {
            return null;
        }
    };

    const storage = new RecommendationListsStorage(localStorage);

    const lists = storage.load();

    assert.deepEqual(lists, []);
});

test("RecommendationListsStorage: saves and loads multiple recommendation lists", () => {

    const list1 = new RecommendationList({
        id: "recommendation-list-001",
        name: "Recomendaciones de : Mis padres"
    });

    const list2 = new RecommendationList({
        id: "recommendation-list-002",
        name: "Recomendaciones de : Juan"
    });

    const data = {};
    
    const localStorage = {
        setItem(key, value) {
            data[key] = value;
        },

        getItem(key) {
            return data[key] ?? null;
        }
    };

    const storage =
        new RecommendationListsStorage(localStorage);

    storage.save([list1, list2]);

    const lists = storage.load();

    assert.equal(lists.length, 2);

    assert.equal(lists[0].id, list1.id);
    assert.equal(lists[0].name, list1.name);

    assert.equal(lists[1].id, list2.id);
    assert.equal(lists[1].name, list2.name);
});

test("RecommendationListsStorage: reconstructs RecommendationList and Recommendation instances", () => {

    const recommendation = new Recommendation({
        mediaId: "media-001",
        reason: "Porque os gustará",
        recommenderRating: 9
    });

    const list = new RecommendationList({
        id: "recommendation-list-001",
        name: "Recomendaciones de : Mis padres",
        recommendations: [recommendation]
    });

    const data = {};

    const localStorage = {
        setItem(key, value) {
            data[key] = value;
        },

        getItem(key) {
            return data[key] ?? null;
        }
    };

    const storage =
        new RecommendationListsStorage(localStorage);

    storage.save([list]);

    const lists = storage.load();

    assert.ok(
        lists[0] instanceof RecommendationList
    );

    assert.ok(
        lists[0].recommendations[0] instanceof Recommendation
    );

    assert.equal(
        lists[0].recommendations[0].mediaId,
        "media-001"
    );

    assert.equal(
        lists[0].recommendations[0].reason,
        "Porque os gustará"
    );

    assert.equal(
        lists[0].recommendations[0].recommenderRating,
        9
    );
});

