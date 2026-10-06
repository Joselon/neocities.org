/* 
Guarda plataformas.
Guarda idioma español y subtítulos.
Guarda la razón.
Guarda la valoración del recomendador.
Podemos crear una recomendación aunque alguno de los datos opcionales no esté marcado.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { Recommendation } from "../../src/domain/Recommendation.js";
import { RecommendationStatus } from "../../src/domain/RecommendationStatus.js";


test("Recommendation: creates a recommendation", () => {
    const recommendation = new Recommendation({
        mediaId: "media-001",
        platforms: ["netflix-es"],
        spanishAudio: true,
        spanishSubtitles: false,
        reason: "Creo que te gustará",
        recommenderRating: 8
    });

    assert.ok(recommendation.id);
    assert.equal(recommendation.mediaId, "media-001");
    assert.deepEqual(recommendation.platforms, ["netflix-es"]);
    assert.equal(recommendation.spanishAudio, true);
    assert.equal(recommendation.spanishSubtitles, false);
    assert.equal(recommendation.reason, "Creo que te gustará");
    assert.equal(recommendation.recommenderRating, 8);
    assert.equal(recommendation.status, RecommendationStatus.PENDING);
});


test("Recommendation: generates a local id", () => {
    const recommendation = new Recommendation({
        mediaId: "media-001"
    });

    assert.ok(recommendation.id);
    assert.equal(typeof recommendation.id, "string");
});


test("Recommendation: generates a different id for each recommendation", () => {
    const recommendation1 = new Recommendation({
        mediaId: "media-001"
    });

    const recommendation2 = new Recommendation({
        mediaId: "media-001"
    });

    assert.notEqual(recommendation1.id, recommendation2.id);
});


test("Recommendation: mediaId is required", () => {
    assert.throws(
        () => new Recommendation({}),
        {
            message: "mediaId is required"
        }
    );
});


test("Recommendation: optional information can be omitted", () => {
    const recommendation = new Recommendation({
        mediaId: "media-001"
    });

    assert.deepEqual(recommendation.platforms, []);
    assert.equal(recommendation.spanishAudio, false);
    assert.equal(recommendation.spanishSubtitles, false);
    assert.equal(recommendation.reason, undefined);
    assert.equal(recommendation.recommenderRating, undefined);
});


test("Recommendation: does not contain WatchItem progress", () => {
    const recommendation = new Recommendation({
        mediaId: "media-001"
    });

    assert.equal(recommendation.progress, undefined);
    assert.equal(recommendation.watchedAt, undefined);
});

test("Recommendation: starts with pending status", () => {
    const recommendation = new Recommendation({
        mediaId: "media-001"
    });

    assert.equal(
        recommendation.status,
        RecommendationStatus.PENDING
    );
});

test("Recommendation: rejects invalid status", () => {
    assert.throws(
        () => new Recommendation({
            mediaId: "media-001",
            status: "invalid"
        }),
        {
            message: "Invalid recommendation status"
        }
    );
});