import assert from "node:assert/strict";
import test from "node:test";

import { RecommendationLinkCodec } from "../../src/services/RecommendationLinkCodec.js";
import { RecommendationLinkReader } from "../../src/services/RecommendationLinkReader.js";
import { RecommendationExchange } from "../../src/domain/RecommendationExchange.js";

test("RecommendationLinkReader: read returns null when recommendation parameter is missing", async () => {

    const reader = new RecommendationLinkReader();

    const result = await reader.read(
        "https://example.com/quevemos.html"
    );

    assert.equal(result, null);
});

test("RecommendationLinkReader: read creates RecommendationExchange from recommendation parameter", async () => {

    const codec = new RecommendationLinkCodec();
    const reader = new RecommendationLinkReader(codec);

    const data = {
        id: "un-id-para-no-duplicar",
        sender: "Pepe",
        items: []
    };

    const encoded = await codec.encode(data);

    const url = new URL(
        "https://example.com/quevemos.html"
    );

    url.searchParams.set("recommendation", encoded);

    const result = await reader.read(url.toString());

    assert.ok(result instanceof RecommendationExchange);
    assert.equal(result.sender, "Pepe");
    assert.deepEqual(result.items, []);
});

test("RecommendationLinkReader: read rejects invalid recommendation data", async () => {

    const reader = new RecommendationLinkReader();

    const url = new URL(
        "https://example.com/quevemos.html"
    );

    url.searchParams.set("recommendation", "!!!");

    await assert.rejects(
        reader.read(url.toString()),
        {
            message: "Invalid recommendation link"
        }
    );
});

//?recommendation=%7B"version"%3A1%2C"createdAt"%3A"2026-10-08T22%3A24%3A06.963Z"%2C"sender"%3A"Lista+de+Cova+y+José"%2C"items"%3A%5B%7B"media"%3A%7B"id"%3A"4f742bfc-1aa0-4337-9d7a-a89108ca317d"%2C"title"%3A"Robot+Dreams"%2C"type"%3A"movie"%2C"genres"%3A%5B%5D%2C"matchKey"%3A"robot+dreams%7Cmovie"%7D%2C"recommendation"%3A%7B"id"%3A"543c819c-1c6b-4bdd-a7da-cd986fc53a63"%2C"mediaId"%3A"4f742bfc-1aa0-4337-9d7a-a89108ca317d"%2C"platforms"%3A%5B"rtve-play-es"%5D%2C"spanishAudio"%3Atrue%2C"spanishSubtitles"%3Afalse%2C"reason"%3A"Parece+bonita"%2C"status"%3A"pending"%7D%7D%2C%7B"media"%3A%7B"id"%3A"d3ad5b80-41c3-47c7-b931-a204106647c9"%2C"title"%3A"Robocop"%2C"originalTitle"%3A"Robocop"%2C"type"%3A"movie"%2C"year"%3A1987%2C"genres"%3A%5B"action"%5D%2C"omdbId"%3A"tt0093870"%2C"poster"%3A"https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BZWM1YzRhODktZDE1MC00NzBlLTk0NGMtOGNhZDQyMmJiZGFiXkEyXkFqcGc%40._V1_SX300.jpg"%2C"matchKey"%3A"robocop%7Cmovie%7C1987"%7D%2C"recommendation"%3A%7B"id"%3A"6fe0e5cd-e3fa-4c2b-9dbf-731573d7fd3c"%2C"mediaId"%3A"d3ad5b80-41c3-47c7-b931-a204106647c9"%2C"platforms"%3A%5B%5D%2C"spanishAudio"%3Atrue%2C"spanishSubtitles"%3Afalse%2C"reason"%3A"Añoranza"%2C"status"%3A"pending"%2C"recommenderRating"%3A7%7D%7D%5D%7D