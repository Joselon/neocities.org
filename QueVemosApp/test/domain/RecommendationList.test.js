import test from "node:test";
import assert from "node:assert/strict";

import { Recommendation } from "../../src/domain/Recommendation.js";
import { RecommendationList } from "../../src/domain/RecommendationList.js";
import { DATA_VERSION } from "../../src/data/version.js";

test("RecommendationList: requires a name", () => {
    assert.throws(
        () => new RecommendationList({}),
        {
            message: "name is required"
        }
    );
});

test("RecommendationList: generates a different id for each list", () => {
    const list1 = new RecommendationList({
        name: "Lista 1"
    });

    const list2 = new RecommendationList({
        name: "Lista 2"
    });

    assert.notEqual(list1.id, list2.id);
});

test("RecommendationList: accepts recommendations", () => {
    const recommendation = new Recommendation({
        mediaId: "media-001",
        platforms: ["netflix-es"],
        reason: "Te gustará",
        recommenderRating: 8
    });

    const recommendationList = new RecommendationList({
        name: "Recomendaciones desde Juan",
        recommendations: [recommendation]
    });

    assert.equal(recommendationList.recommendations.length, 1);
    assert.equal(
        recommendationList.recommendations[0],
        recommendation
    );
});


test("RecommendationList: accepts multiple recommendations", () => {
    const recommendation1 = new Recommendation({
        mediaId: "media-001"
    });

    const recommendation2 = new Recommendation({
        mediaId: "media-002"
    });

    const recommendationList = new RecommendationList({
        name: "Recomendaciones",    
        recommendations: [
            recommendation1,
            recommendation2
        ]
    });

    assert.deepEqual(
        recommendationList.recommendations,
        [
            recommendation1,
            recommendation2
        ]
    );
});


test("RecommendationList: rejects invalid recommendations", () => {
    assert.throws(
        () => new RecommendationList({
            name: "Recomendaciones",
            recommendations: [{}]
        }),
        {
            message: "recommendations must contain only Recommendation"
        }
    );
});


test("RecommendationList: accepts supported versions", () => {
    const recommendationList = new RecommendationList({
        name: "Recomendaciones",
        version: DATA_VERSION
    });

    assert.equal(recommendationList.version, DATA_VERSION);
});

test("RecommendationList: rejects unsupported version", () => {
    assert.throws(
        () => new RecommendationList({
            name: "Recomendaciones",
            version: DATA_VERSION + 1
        }),
        {
            message: "Unsupported recommendation list version"
        }
    );
});