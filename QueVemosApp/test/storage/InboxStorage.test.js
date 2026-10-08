import test from "node:test";
import assert from "node:assert/strict";

import { InboxStorage } from "../../src/storage/InboxStorage.js";
import { RecommendationList } from "../../src/domain/RecommendationList.js";
import { Recommendation } from "../../src/domain/Recommendation.js";
import { IncomingRecommendationList } from "../../src/domain/IncomingRecommendationList.js";

test("InboxStorage: returns an empty array when there is no data", () => {
    
    const localStorage = {
        getItem() {
            return null;
        }
    };

    const storage = new InboxStorage(localStorage);

    const inbox = storage.load();

    assert.deepEqual(inbox, []);
});

test("InboxStorage: saves and loads multiple recommendation lists in an inbox", () => {

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
        new InboxStorage(localStorage);

    storage.save([list1, list2]);

    const inbox = storage.load();

    assert.equal(inbox.length, 2);

    assert.equal(inbox[0].id, list1.id);
    assert.equal(inbox[0].name, list1.name);

    assert.equal(inbox[1].id, list2.id);
    assert.equal(inbox[1].name, list2.name);
});

test("InboxStorage: reconstructs IncomingRecommendationList and Recommendation instances", () => {

    const recommendation = new Recommendation({
        mediaId: "media-001",
        reason: "Porque os gustará",
        recommenderRating: 9
    });

    const list = new IncomingRecommendationList({
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
        new InboxStorage(localStorage);

    storage.save([list]);

    const inbox = storage.load();

    assert.ok(
        inbox[0] instanceof IncomingRecommendationList
    );

    assert.ok(
        inbox[0].recommendations[0] instanceof Recommendation
    );

    assert.equal(
        inbox[0].recommendations[0].mediaId,
        "media-001"
    );

    assert.equal(
        inbox[0].recommendations[0].reason,
        "Porque os gustará"
    );

    assert.equal(
        inbox[0].recommendations[0].recommenderRating,
        9
    );
});

