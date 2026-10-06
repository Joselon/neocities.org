/*
Preparar los datos completos para compartir/exportar, resolviendo el mediaId contra el WatchList.
Importar una recomendación y determinar si la película/serie ya existe en nuestra lista.
Aceptar una recomendación, creando el WatchItem correspondiente.
Descartar una recomendación.
Dejar preparada la gestión de conflictos sin meter un estado CONFLICT.
*/
import test from "node:test";
import assert from "node:assert/strict";

import { RecommendationService } from "../../src/services/RecommendationService.js";
import { WatchList } from "../../src/domain/WatchList.js";
import { Media } from "../../src/domain/Media.js";
import { WatchItem } from "../../src/domain/WatchItem.js";
import { RecommendationStatus } from "../../src/domain/RecommendationStatus.js";


test("RecommendationService: creates a recommendation from a WatchItem", () => {
    const media = new Media({
        title: "Matrix",
        type: "movie",
        year: 1999
    });

    const watchItem = new WatchItem({
        mediaId: media.id,
        platforms: ["netflix-es"],
        spanishAudio: true,
        spanishSubtitles: false,
        reason: "Tienes que verla",
        userRating: 9
    });

    const watchList = new WatchList({
        name: "La nuestra",
        media: [media],
        watchItems: [watchItem]
    });

    const service = new RecommendationService();

    const recommendation =
        service.createRecommendation(watchList, watchItem);

    assert.ok(recommendation.id);
    assert.equal(recommendation.mediaId, media.id);
    assert.deepEqual(
        recommendation.platforms,
        ["netflix-es"]
    );
    assert.equal(recommendation.spanishAudio, true);
    assert.equal(recommendation.spanishSubtitles, false);
    assert.equal(
        recommendation.reason,
        "Tienes que verla"
    );
    assert.equal(
        recommendation.recommenderRating,
        9
    );
    assert.equal(
        recommendation.status,
        RecommendationStatus.PENDING
    );
});

test("RecommendationService: rejects a WatchItem that is not in the WatchList", () => {
    const media = new Media({
        title: "Matrix",
        type: "movie"
    });

    const otherMedia = new Media({
        title: "Alien",
        type: "movie"
    });

    const watchItem = new WatchItem({
        mediaId: media.id
    });

    const otherWatchItem = new WatchItem({
        mediaId: otherMedia.id
    });

    const watchList = new WatchList({
        name: "La nuestra",
        media: [media],
        watchItems: [watchItem]
    });

    const service = new RecommendationService();

    assert.throws(
        () => service.createRecommendation(
            watchList,
            otherWatchItem
        ),
        {
            message: "WatchItem is not in WatchList"
        }
    );
});

test("RecommendationService: creates a recommendation list", () => {
    const media = new Media({
        title: "Matrix",
        type: "movie",
        year: 1999
    });

    const watchItem = new WatchItem({
        mediaId: media.id,
        platforms: ["netflix-es"],
        reason: "Tienes que verla",
        userRating: 9
    });

    const watchList = new WatchList({
        name: "La nuestra",
        media: [media],
        watchItems: [watchItem]
    });

    const service = new RecommendationService();

    const recommendationList =
        service.createRecommendationList(
            watchList,
            [watchItem]
        );

    assert.ok(recommendationList.id);

    assert.equal(
        recommendationList.name,
        "Recomendaciones desde : La nuestra"
    );

    assert.equal(
        recommendationList.recommendations.length,
        1
    );

    assert.equal(
        recommendationList.recommendations[0].mediaId,
        media.id
    );
});

test("RecommendationService: creates a recommendation for each selected WatchItem", () => {
    const media1 = new Media({
        title: "Matrix",
        type: "movie"
    });

    const media2 = new Media({
        title: "Alien",
        type: "movie"
    });

    const watchItem1 = new WatchItem({
        mediaId: media1.id
    });

    const watchItem2 = new WatchItem({
        mediaId: media2.id
    });

    const watchList = new WatchList({
        name: "La nuestra",
        media: [media1, media2],
        watchItems: [watchItem1, watchItem2]
    });

    const service = new RecommendationService();

    const recommendationList =
        service.createRecommendationList(
            watchList,
            [watchItem1, watchItem2]
        );

    assert.equal(
        recommendationList.recommendations.length,
        2
    );

    assert.equal(
        recommendationList.recommendations[0].mediaId,
        media1.id
    );

    assert.equal(
        recommendationList.recommendations[1].mediaId,
        media2.id
    );
});

