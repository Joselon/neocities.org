import test from "node:test";
import assert from "node:assert/strict";

import {
    RecommendationLinkCodec
} from "../../src/services/RecommendationLinkCodec.js";

test("encode y decode conservan el intercambio completo", async () => {
    const codec = new RecommendationLinkCodec();

    const exchange = {
        version: 1,
        createdAt: "2026-10-08T21:00:00.000Z",
        sender: "Joselón",
        items: [
            {
                media: {
                    title: "Amélie",
                    year: 2001,
                    type: "movie"
                },
                recommendation: {
                    reason: "Una película fantástica",
                    spanishAudio: true
                }
            }
        ]
    };

    const encoded = await codec.encode(exchange);
    const decoded = await codec.decode(encoded);

    assert.deepStrictEqual(decoded, exchange);
});

test("encode genera una cadena Base64 URL-safe", async () => {
    const codec = new RecommendationLinkCodec();

    const encoded = await codec.encode({
        version: 1,
        items: []
    });

    assert.match(encoded, /^[A-Za-z0-9_-]+$/);
});

test("decode rechaza una entrada vacía", async () => {
    const codec = new RecommendationLinkCodec();

    await assert.rejects(
        codec.decode(""),
        {
            name: "TypeError"
        }
    );
});

test("decode rechaza datos que no son JSON válido", async () => {
    const codec = new RecommendationLinkCodec();

    const invalidJson = new TextEncoder().encode("{");
    const compressed = await codec.compress(invalidJson);
    const encoded = codec.encodeBase64Url(compressed);

    await assert.rejects(
        codec.decode(encoded),
        SyntaxError
    );
});

test("encode rechaza valores que no son objetos", async () => {
    const codec = new RecommendationLinkCodec();

    await assert.rejects(
        codec.encode(null),
        {
            name: "TypeError"
        }
    );
});
