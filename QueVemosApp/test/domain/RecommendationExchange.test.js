import test from "node:test";
import assert from "node:assert/strict";

import { DATA_VERSION } from "../../src/data/version.js";
import { RecommendationExchange } from "../../src/domain/RecommendationExchange.js";

test("RecommendationExchange: creates an exchange", () => {

    const exchange = new RecommendationExchange({
        sender: "Mis padres"
    });

    assert.equal(
        exchange.sender,
        "Mis padres"
    );

    assert.equal(
        exchange.version,
        DATA_VERSION
    );

    assert.ok(exchange.createdAt);

    assert.deepEqual(
        exchange.items,
        []
    );
});

test("RecommendationExchange: sender is required", () => {

    assert.throws(
        () => new RecommendationExchange(),
        /sender is required/
    );
});

test("RecommendationExchange: items must be an array", () => {

    assert.throws(
        () => new RecommendationExchange({
            sender: "Mis padres",
            items: {}
        }),
        /items is not an array/
    );
});

test("RecommendationExchange: stores exchange items", () => {

    const item = {
        media: {
            title: "RoboCop",
            type: "movie",
            year: 1987,
            matchKey: "RoboCop|movie|1987"
        },
        recommendation: {
            mediaId: "abc",
            reason: "Porque os gustará"
        }
    };

    const exchange = new RecommendationExchange({
        sender: "Mis padres",
        items: [item]
    });

    assert.equal(exchange.items.length, 1);
    assert.equal(exchange.items[0].media.title, "RoboCop");
    assert.equal(
        exchange.items[0].recommendation.reason,
        "Porque os gustará"
    );
});