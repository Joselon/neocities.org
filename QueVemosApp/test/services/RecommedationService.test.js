/*
Aceptar una recomendación, creando el WatchItem correspondiente.
Descartar una recomendación.
Dejar preparada la gestión de conflictos sin meter un estado CONFLICT.
*/
import test from "node:test";
import assert from "node:assert/strict";

import { RecommendationService } from "../../src/services/RecommendationService.js";
import { Recommendation } from "../../src/domain/Recommendation.js";
import { RecommendationStatus } from "../../src/domain/RecommendationStatus.js";
import { RecommendationList } from "../../src/domain/RecommendationList.js";
import { WatchList } from "../../src/domain/WatchList.js";
import { Media } from "../../src/domain/Media.js";
import { WatchItem } from "../../src/domain/WatchItem.js";


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

test("RecommendationService: copies WatchItem data to Recommendation", () => {

    const media = new Media({
        id: "media-001",
        title: "Robocop",
        type: "movie"
    });

    const watchItem = new WatchItem({
        mediaId: media.id,
        platforms: ["Netflix ES", "Prime Video"],
        spanishAudio: true,
        spanishSubtitles: false,
        reason: "Me la han recomendado",
        userRating: 8
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [media],
        watchItems: [watchItem]
    });

    const service = new RecommendationService();

    const recommendation =
        service.createRecommendation(watchList, watchItem);

    assert.equal(recommendation.mediaId, watchItem.mediaId);
    assert.deepEqual(recommendation.platforms, watchItem.platforms);
    assert.equal(recommendation.spanishAudio, watchItem.spanishAudio);
    assert.equal(
        recommendation.spanishSubtitles,
        watchItem.spanishSubtitles
    );
    assert.equal(recommendation.reason, watchItem.reason);
    assert.equal(
        recommendation.recommenderRating,
        watchItem.userRating
    );
});

test("RecommendationService: copies platforms independently", () => {

    const watchItem = new WatchItem({
        mediaId: "media-001",
        platforms: ["Netflix ES"]
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        watchItems: [watchItem]
    });

    const service = new RecommendationService();

    const recommendation =
        service.createRecommendation(watchList, watchItem);

    recommendation.platforms.push("Prime Video");

    assert.deepEqual(
        watchItem.platforms,
        ["Netflix ES"]
    );
});

test("RecommendationService: creates pending recommendation", () => {

    const watchItem = new WatchItem({
        mediaId: "media-001"
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        watchItems: [watchItem]
    });

    const service = new RecommendationService();

    const recommendation =
        service.createRecommendation(watchList, watchItem);

    assert.equal(
        recommendation.status,
        RecommendationStatus.PENDING
    );
});

test("RecommendationService: does not copy WatchItem progress or watchedAt", () => {

    const watchItem = new WatchItem({
        mediaId: "media-001",
        progress: {
            season: 2,
            episode: 4
        },
        watchedAt: "2026-10-06T20:00:00.000Z"
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        watchItems: [watchItem]
    });

    const service = new RecommendationService();

    const recommendation =
        service.createRecommendation(watchList, watchItem);

    assert.equal(recommendation.progress, undefined);
    assert.equal(recommendation.watchedAt, undefined);
    assert.equal(recommendation.userRating, undefined);
});

test("RecommendationService: creates a recommendation exchange item", () => {

    const media = new Media({
        id: "media-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        omdbId: "tt0093870"
    });

    const watchItem = new WatchItem({
        mediaId: media.id,
        platforms: ["Netflix ES"],
        spanishAudio: true,
        spanishSubtitles: false,
        reason: "Me encanta",
        userRating: 9
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [media],
        watchItems: [watchItem]
    });

    const service = new RecommendationService();

    const recommendation =
        service.createRecommendation(watchList, watchItem);

    const recommendationList =
        new RecommendationList({
            name: "Recomendaciones desde : La nuestra",
            recommendations: [recommendation]
        });

    const exchange =
        service.createRecommendationExchange(
            recommendationList,
            watchList
        );

    assert.equal(exchange.length, 1);

    assert.deepEqual(exchange[0].media, media);
    assert.equal(
        exchange[0].recommendation,
        recommendation
    );
});

test("RecommendationService: exchange rejects a recommendation with unknown mediaId", () => {

    const recommendation =
        new Recommendation({
            mediaId: "media-does-not-exist"
        });

    const recommendationList =
        new RecommendationList({
            name: "Recomendaciones",
            recommendations: [recommendation]
        });

    const watchList =
        new WatchList({
            id: "list-001",
            name: "La nuestra"
        });

    const service = new RecommendationService();

    assert.throws(
        () => service.createRecommendationExchange(
            recommendationList,
            watchList
        ),
        /Media not found in WatchList/
    );
});

test("RecommendationService: finds media by matching omdbId", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        omdbId: "tt0093870"
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        omdbId: "tt0093870"
    };

    const recommendation = new Recommendation({
        mediaId: "media-foreign-001"
    });

    const recommendationExchange = [
        {
            media: exchangeMedia,
            recommendation
        }
    ];

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const result =
        service.compareRecommendations(
            recommendationExchange,
            watchList
        );

    assert.equal(result.length, 1);
    assert.equal(result[0].status, "matched");
    assert.equal(result[0].matches.length, 1);
    assert.equal(
        result[0].matches[0],
        existingMedia
    );
});

test("RecommendationService: ignores empty omdbId", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "RoboCop",
        type: "movie",
        year: 1987
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        omdbId: undefined
    };

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const matches =
        service.findMediaCandidates(
            exchangeMedia,
            watchList
        );

    assert.equal(matches.length, 0);
});

test("RecommendationService: finds candidate by exact matchKey", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        matchKey: "robocop-movie-1987"
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        matchKey: "robocop-movie-1987"
    };

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const matches =
        service.findMediaCandidates(
            exchangeMedia,
            watchList
        );

    assert.equal(matches.length, 1);
    assert.equal(matches[0], existingMedia);
});

test("RecommendationService: finds media by matching matchKey", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        matchKey: "robocop-movie-1987"
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        matchKey: "robocop-movie-1987"
    };

    const recommendation = new Recommendation({
        mediaId: "media-foreign-001"
    });

    const recommendationExchange = [
        {
            media: exchangeMedia,
            recommendation
        }
    ];

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const result =
        service.compareRecommendations(
            recommendationExchange,
            watchList
        );

    assert.equal(result.length, 1);
    assert.equal(result[0].status, "matched");
    assert.equal(result[0].matches.length, 1);
    assert.equal(
        result[0].matches[0],
        existingMedia
    );
});

test("RecommendationService: finds candidate by matchKey despite media differences", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        matchKey: "robocop-movie-1987"
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        matchKey: "robocop-movie-1987"
    };

    const recommendation = new Recommendation({
        mediaId: "media-foreign-001"
    });

    const recommendationExchange = [
        {
            media: exchangeMedia,
            recommendation
        }
    ];

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const result =
        service.compareRecommendations(
            recommendationExchange,
            watchList
        );

    assert.equal(result[0].status, "candidate");
    assert.equal(result[0].matches.length, 1);
});

test("RecommendationService: returns new when no media matches", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "Alien",
        type: "movie",
        year: 1979,
        matchKey: "alien-movie-1979"
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        matchKey: "robocop-movie-1987"
    };

    const recommendation = new Recommendation({
        mediaId: "media-foreign-001"
    });

    const recommendationExchange = [
        {
            media: exchangeMedia,
            recommendation
        }
    ];

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const result =
        service.compareRecommendations(
            recommendationExchange,
            watchList
        );

    assert.equal(result[0].status, "new");
    assert.equal(result[0].matches.length, 0);
});

test("RecommendationService: finds candidate by partial title match", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "Indiana Jones",
        type: "movie",
        matchKey: "indianajones-movie"
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "Indiana Jones y el templo maldito",
        type: "movie",
        matchKey: "indianajonesyeltemplomaldito-movie"
    };

    const recommendation = new Recommendation({
        mediaId: "media-foreign-001"
    });

    const recommendationExchange = [
        {
            media: exchangeMedia,
            recommendation
        }
    ];

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const result =
        service.compareRecommendations(
            recommendationExchange,
            watchList
        );

    assert.equal(result[0].status, "candidate");
    assert.equal(result[0].matches.length, 1);
    assert.equal(
        result[0].matches[0],
        existingMedia
    );
});
