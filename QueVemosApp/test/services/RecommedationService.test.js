import test from "node:test";
import assert from "node:assert/strict";

import { RecommendationService } from "../../src/services/RecommendationService.js";
import { Recommendation } from "../../src/domain/Recommendation.js";
import { RecommendationStatus } from "../../src/domain/RecommendationStatus.js";
import { RecommendationList } from "../../src/domain/RecommendationList.js";
import { WatchList } from "../../src/domain/WatchList.js";
import { Media } from "../../src/domain/Media.js";
import { WatchItem } from "../../src/domain/WatchItem.js";
import { IncomingRecommendationList } from "../../src/domain/IncomingRecommendationList.js";

// HELPERS
function createLocalMedia(overrides = {}) {
    return new Media({
        id: "local-media-1",
        title: "Blade Runner",
        type: "movie",
        year: 1982,
        originalTitle: "Blade Runner",
        genres: ["Sci-Fi"],
        ...overrides
    });
}

function createIncomingMedia(overrides = {}) {
    return new Media({
        id: "sender-media-1",
        title: "Blade Runner",
        type: "movie",
        year: 1982,
        originalTitle: "Blade Runner",
        runtimeMinutes: 117,
        genres: ["Sci-Fi", "Thriller"],
        omdbId: "tt0083658",
        poster: "poster-url",
        ...overrides
    });
}

function createRecommendation(overrides = {}) {
    return new Recommendation({
        mediaId: "sender-media-1",
        platforms: ["Netflix ES"],
        spanishAudio: true,
        spanishSubtitles: true,
        reason: "Me la han recomendado",
        ...overrides
    });
}

function createIncomingRecommendationList({
    media = [createIncomingMedia()],
    recommendations = undefined,
    name = "Recomendaciones de mis padres"
} = {}) {
    return new IncomingRecommendationList({
        name,
        media,
        recommendations: recommendations ?? [
            createRecommendation({ mediaId: media[0]?.id ?? "sender-media-1" })
        ]
    });
}

function createService() {
    return new RecommendationService();
}

//TESTS

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

    assert.equal(exchange.items.length, 1);
    assert.notEqual(exchange.items[0].media, media);
    assert.equal(exchange.items[0].media.matchKey, media.matchKey);
    assert.equal(
        exchange.items[0].recommendation,
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

test("RecommendationService: creates an exchange item with a complete media snapshot", () => {

    const media = new Media({
        id: "media-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        omdbId: "tt0093870"
    });

    const watchItem = new WatchItem({
        mediaId: media.id
        // ...los datos necesarios
    });

    const watchList = new WatchList({
        id: "list-001",
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

    const exchange =
        service.createRecommendationExchange(
            recommendationList,
            watchList
        );

    assert.equal(exchange.items.length, 1);

    assert.equal(exchange.items[0].media.id, media.id);
    assert.equal(exchange.items[0].media.title, media.title);
    assert.equal(exchange.items[0].media.originalTitle, media.originalTitle);
    assert.equal(exchange.items[0].media.type, media.type);
    assert.equal(exchange.items[0].media.year, media.year);
    assert.equal(exchange.items[0].media.omdbId, media.omdbId);
    assert.equal(exchange.items[0].media.matchKey, media.matchKey);

    assert.equal(
        exchange.items[0].recommendation,
        recommendationList.recommendations[0]
    );
});

test("RecommendationService: finds media by matching omdbId", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        omdbId: "tt0093870",
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        omdbId: "tt0093870",
        matchKey: "robocop|movie|1987"
    };

    const recommendation = new Recommendation({
        mediaId: "media-foreign-001"
    });

    const incomingList =  new IncomingRecommendationList({
        name: "Otra lista",
        media: [exchangeMedia],
        recommendations: [recommendation]
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const result = service.compareRecommendations(
            incomingList,
            watchList
        );

    assert.equal(result.length, 1);
    assert.equal(result[0].status, "matched");
    assert.equal(result[0].matches.length, 1);
    assert.equal(
        result[0].media.omdbId,
        existingMedia.omdbId
    );
    assert.deepEqual(result[0].matches[0].matches, ["omdbId", "matchKey"]);
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

    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        matchKey: "robocop|movie|1987"
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
    assert.equal(matches[0].media, existingMedia);
    assert.deepEqual(matches[0].matches, ["matchKey"]);
});

test("RecommendationService: finds media by matching matchKey", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        //matchKey: "robocop-movie-1987"
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        matchKey: "robocop|movie|1987"
    };

    const recommendation = new Recommendation({
        mediaId: "media-foreign-001"
    });

    const incomingList =  new IncomingRecommendationList({
        name: "Otra lista",
        media: [exchangeMedia],
        recommendations: [recommendation]
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const result =
        service.compareRecommendations(
            incomingList,
            watchList
        );

    assert.equal(result.length, 1);
    assert.equal(result[0].status, "candidate");
    assert.equal(result[0].matches.length, 1);
    assert.equal(
        result[0].media.matchKey,
        existingMedia.matchKey
    );
    assert.deepEqual(result[0].matches[0].matches, ["matchKey"]);
});

test("RecommendationService: does not duplicate candidate matching omdbId and matchKey", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        omdbId: "tt0093870"
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        omdbId: "tt0093870",
        matchKey: "robocop|movie|1987"
    };

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const matches = service.findMediaCandidates(
        exchangeMedia,
        watchList
    );

    assert.equal(matches.length, 1);
    assert.equal(matches[0].media, existingMedia);
    assert.deepEqual(matches[0].matches, ["omdbId", "matchKey"]);
});

test("RecommendationService: finds candidate by matchKey despite media differences", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        //matchKey: "robocop-movie-1987"
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        matchKey: "robocop|movie|1987"
    };

    const recommendation = new Recommendation({
        mediaId: "media-foreign-001"
    });

    const incomingList =  new IncomingRecommendationList({
        name: "Otra lista",
        media: [exchangeMedia],
        recommendations: [recommendation]
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const result =
        service.compareRecommendations(
            incomingList,
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
        //matchKey: "alien-movie-1979"
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        matchKey: "robocop|movie|1987"
    };

    const recommendation = new Recommendation({
        mediaId: "media-foreign-001"
    });

    const incomingList =  new IncomingRecommendationList({
        name: "Otra lista",
        media: [exchangeMedia],
        recommendations: [recommendation]
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const result =
        service.compareRecommendations(
            incomingList,
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
        //matchKey: "indianajones-movie"
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "Indiana Jones y el templo maldito",
        type: "movie",
        matchKey: "indianajonesyeltemplomaldito|movie"
    };

    const recommendation = new Recommendation({
        mediaId: "media-foreign-001"
    });

    const incomingList =  new IncomingRecommendationList({
        name: "Otra lista",
        media: [exchangeMedia],
        recommendations: [recommendation]
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const result =
        service.compareRecommendations(
            incomingList,
            watchList
        );

    assert.equal(result[0].status, "candidate");
    assert.equal(result[0].matches.length, 1);
    assert.deepEqual(result[0].matches[0].matches, ["partialTitle"]);
});

test("RecommendationService: accepts a recommendation and creates a WatchItem", () => {

    const media = new Media({
        id: "media-1",
        title: "RoboCop",
        type: "movie",
        year: 1987
    });

    const watchList = new WatchList({
        name: "La nuestra",
        media: [media],
        watchItems: []
    });

    const recommendation = new Recommendation({
        mediaId: media.id,
        platforms: ["Netflix"],
        spanishAudio: true,
        spanishSubtitles: false,
        reason: "Muy entretenida",
        recommenderRating: 9
    });

    const incomingList = new IncomingRecommendationList({
        name: "Recomendaciones desde : Mis padres",
        recommendations: [recommendation],
        media: [media]
    });

    const service = new RecommendationService();

    service.acceptRecommendation(
        recommendation,
        incomingList,
        watchList
    );

    assert.equal(watchList.watchItems.length, 1);

    const watchItem = watchList.watchItems[0];

    assert.equal(watchItem.mediaId, media.id);
    assert.deepEqual(watchItem.platforms, ["Netflix"]);
    assert.equal(watchItem.spanishAudio, true);
    assert.equal(watchItem.spanishSubtitles, false);

    assert.equal(
        watchItem.reason,
        "Recomendaciones desde : Mis padres | (Nota: 9) | Muy entretenida"
    );

    assert.equal(watchItem.userRating, undefined);

    assert.equal(
        recommendation.status,
        RecommendationStatus.ACCEPTED
    );
});

test("RecommendationService: accepts a recommendation without recommenderRating", () => {

    const media = new Media({
        id: "media-1",
        title: "RoboCop",
        type: "movie",
        year: 1987
    });

    const watchList = new WatchList({
        name: "La nuestra",
        media: [media],
        watchItems: []
    });

    const recommendation = new Recommendation({
        mediaId: media.id,
        reason: "Porque os gustará"
    });

    const incomingList = new IncomingRecommendationList({
        name: "Recomendaciones desde : Mis padres",
        recommendations: [recommendation],
        media: [media]
    });

    const service = new RecommendationService();

    service.acceptRecommendation(
        recommendation,
        incomingList,
        watchList
    );

    assert.equal(
        watchList.watchItems[0].reason,
        "Recomendaciones desde : Mis padres | Porque os gustará"
    );
});

test("RecommendationService: accepts a recommendation without reason", () => {

    const media = new Media({
        id: "media-1",
        title: "RoboCop",
        type: "movie",
        year: 1987
    });

    const watchList = new WatchList({
        name: "La nuestra",
        media: [media],
        watchItems: []
    });

    const recommendation = new Recommendation({
        mediaId: media.id,
        recommenderRating: 9
    });

    const incomingList = new IncomingRecommendationList({
        name: "Recomendaciones desde : Mis padres",
        recommendations: [recommendation],
        media: [media]
    });

    const service = new RecommendationService();

    service.acceptRecommendation(
        recommendation,
        incomingList,
        watchList
    );

    assert.equal(
        watchList.watchItems[0].reason,
        "Recomendaciones desde : Mis padres | (Nota: 9)"
    );
});

test("RecommendationService: discards a recommendation", () => {

    const recommendation = new Recommendation({
        mediaId: "media-1",
        reason: "Creo que os gustará"
    });

    const service = new RecommendationService();

    service.discardRecommendation(recommendation);

    assert.equal(
        recommendation.status,
        RecommendationStatus.DISCARDED
    );
});



test("RecommendationService: discarding a recommendation does not create a WatchItem", () => {

    const media = new Media({
        id: "media-1",
        title: "RoboCop",
        type: "movie",
        year: 1987
    });

    const watchList = new WatchList({
        name: "La nuestra",
        media: [media],
        watchItems: []
    });

    const recommendation = new Recommendation({
        mediaId: "media-1"
    });

    const service = new RecommendationService();

    service.discardRecommendation(recommendation);

    assert.equal(watchList.watchItems.length, 0);
    assert.equal(
        recommendation.status,
        RecommendationStatus.DISCARDED
    );
});

test("RecommendationService: identifies a candidate when matchKey matches but media data differs", () => {

    const localMedia = new Media({
        id: "local-1",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        runtimeMinutes: 99
    });

    const exchangeMedia = {
        id: "remote-1",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        runtimeMinutes: 102,
        genres: [],
        omdbId: undefined,
        poster: undefined,
        ratings: undefined,
        originalTitle: undefined,
        matchKey: localMedia.matchKey
    };

    const watchList = new WatchList({
        name: "La nuestra",
        media: [localMedia],
        watchItems: []
    });

    const exchangeItem = {
        media: exchangeMedia,
        recommendation: new Recommendation({
            mediaId: "remote-1"
        })
    };

    const incomingList =  new IncomingRecommendationList({
        name: "Otra lista",
        media: [exchangeMedia],
        recommendations: [exchangeItem.recommendation]
    });

    const service = new RecommendationService();

    const result = service.compareRecommendations(
        incomingList,
        watchList
    );

    assert.equal(result[0].status, "candidate");
    assert.equal(result[0].matches.length, 1);
    assert.equal(
        result[0].media.matchKey,
        localMedia.matchKey
    );
    assert.deepEqual(
        result[0].matches[0].matches,
        ["matchKey"]        
    );
});

test("RecommendationService: detects differences in a candidate media", () => {

    const existingMedia = new Media({
        id: "media-1",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        runtimeMinutes: 99,
        genres: ["Action"]
    });

    const exchangeMedia = {
        id: "remote-1",
        title: "RoboCop",
        originalTitle: undefined,
        type: "movie",
        year: 1987,
        runtimeMinutes: 102,
        genres: ["Action", "Sci-Fi"],
        omdbId: undefined,
        poster: undefined,
        ratings: undefined,
        matchKey: existingMedia.matchKey
    };

    const watchList = new WatchList({
        name: "La nuestra",
        media: [existingMedia],
        watchItems: []
    });

    const exchangeItem = {
        media: exchangeMedia,
        recommendation: new Recommendation({
            mediaId: "remote-1"
        })
    };

        const incomingList =  new IncomingRecommendationList({
        name: "Otra lista",
        media: [exchangeMedia],
        recommendations: [exchangeItem.recommendation]
    });

    const service = new RecommendationService();
    
    const result = service.compareRecommendations(
        incomingList,
        watchList
    );

    assert.equal(result[0].status, "candidate");

    assert.equal(result[0].matches.length, 1);

    assert.deepEqual(
        result[0].matches[0].matches,
        ["matchKey"]
    );

    assert.deepEqual(
        result[0].matches[0].differences,
        [
            "runtimeMinutes",
            "genres"
        ]
    );
});

test("RecommedationService.resolveRecommendation: create adds a local Media and WatchItem", () => {
    const incomingRecommendationList = createIncomingRecommendationList();
    const incomingRecommendation =
        incomingRecommendationList.recommendations[0];

    const watchList = new WatchList({
        name: "Mi lista",
        media: [],
        watchItems: []
    });

    const service = createService();

    service.resolveRecommendation({
        incomingRecommendationList,
        incomingRecommendation,
        decision: "create",
        watchList
    });

    assert.equal(watchList.media.length, 1);
    assert.equal(watchList.watchItems.length, 1);

    const localMedia = watchList.media[0];
    const watchItem = watchList.watchItems[0];

    assert.notEqual(localMedia.id, incomingRecommendation.mediaId);
    assert.equal(localMedia.title, "Blade Runner");
    assert.equal(localMedia.omdbId, "tt0083658");

    assert.equal(watchItem.mediaId, localMedia.id);
    assert.deepEqual(watchItem.platforms, ["Netflix ES"]);
    assert.equal(watchItem.spanishAudio, true);
    assert.equal(watchItem.spanishSubtitles, true);

    assert.equal(
        incomingRecommendation.status,
        RecommendationStatus.ACCEPTED
    );
});

test("RecommedationService.resolveRecommendation: resolveRecommendation: merge uses the selected local Media ID", () => {
    const incomingRecommendationList = createIncomingRecommendationList();
    const incomingRecommendation =
        incomingRecommendationList.recommendations[0];

    const localMedia = createLocalMedia({
        runtimeMinutes: undefined,
        omdbId: undefined,
        poster: undefined
    });

    const watchList = new WatchList({
        media: [localMedia],
        watchItems: []
    });

    const service = createService();

    service.resolveRecommendation({
        incomingRecommendationList,
        incomingRecommendation,
        decision: "merge",
        watchList,
        targetMediaId: localMedia.id,
        mediaFields: ["runtimeMinutes", "omdbId", "poster"]
    });

    assert.equal(watchList.media.length, 1);
    assert.equal(watchList.watchItems.length, 1);

    assert.equal(localMedia.runtimeMinutes, 117);
    assert.equal(localMedia.omdbId, "tt0083658");
    assert.equal(localMedia.poster, "poster-url");

    assert.equal(watchList.watchItems[0].mediaId, localMedia.id);
    assert.equal(
        incomingRecommendation.status,
        RecommendationStatus.ACCEPTED
    );
});

test("resolveRecommendation: merge preserves unselected fields", () => {
    const incomingRecommendationList = createIncomingRecommendationList({
        media: [
            createIncomingMedia({
                title: "Blade Runner: The Final Cut",
                poster: "incoming-poster"
            })
        ]
    });

    const incomingRecommendation =
        incomingRecommendationList.recommendations[0];

    const localMedia = createLocalMedia({
        poster: "local-poster"
    });

    const watchList = new WatchList({
        media: [localMedia],
        watchItems: []
    });

    createService().resolveRecommendation({
        incomingRecommendationList,
        incomingRecommendation,
        decision: "merge",
        watchList,
        targetMediaId: localMedia.id,
        mediaFields: ["poster"]
    });

    assert.equal(localMedia.title, "Blade Runner");
    assert.equal(localMedia.poster, "incoming-poster");
});

test("resolveRecommendation: merge ignores unselected empty fields", () => {
    const incomingRecommendationList = createIncomingRecommendationList();
    const incomingRecommendation =
        incomingRecommendationList.recommendations[0];

    const localMedia = createLocalMedia({
        runtimeMinutes: undefined,
        poster: undefined
    });

    const watchList = new WatchList({
        media: [localMedia],
        watchItems: []
    });

    createService().resolveRecommendation({
        incomingRecommendationList,
        incomingRecommendation,
        decision: "merge",
        watchList,
        targetMediaId: localMedia.id,
        mediaFields: ["poster"]
    });

    assert.equal(localMedia.poster, "poster-url");
    assert.equal(localMedia.runtimeMinutes, undefined);
});

test("resolveRecommendation: merge rejects duplicate matchKey without changes", () => {
    const incomingRecommendationList = createIncomingRecommendationList({
        media: [
            createIncomingMedia({
                title: "Blade Runner: The Final Cut",
                year: 2007
            })
        ]
    });

    const incomingRecommendation =
        incomingRecommendationList.recommendations[0];

    const localMedia = createLocalMedia();

    const otherMedia = new Media({
        id: "local-media-2",
        title: "Blade Runner: The Final Cut",
        type: "movie",
        year: 2007
    });

    const watchList = new WatchList({
        media: [localMedia, otherMedia],
        watchItems: []
    });

    assert.throws(() => {
        createService().resolveRecommendation({
            incomingRecommendationList,
            incomingRecommendation,
            decision: "merge",
            watchList,
            targetMediaId: localMedia.id,
            mediaFields: ["title", "year"]
        });
    });

    assert.equal(watchList.media.length, 2);
    assert.equal(watchList.watchItems.length, 0);
    assert.equal(localMedia.title, "Blade Runner");
    assert.equal(localMedia.year, 1982);
});

test("resolveRecommendation: discard does not modify WatchList", () => {
    const incomingRecommendationList = createIncomingRecommendationList();
    const incomingRecommendation =
        incomingRecommendationList.recommendations[0];

    const localMedia = createLocalMedia();

    const watchList = new WatchList({
        media: [localMedia],
        watchItems: [new WatchItem({ mediaId: localMedia.id })]
    });

    createService().resolveRecommendation({
        incomingRecommendationList,
        incomingRecommendation,
        decision: "discard",
        watchList
    });

    assert.equal(watchList.media.length, 1);
    assert.equal(watchList.watchItems.length, 1);
    assert.equal(
        incomingRecommendation.status,
        RecommendationStatus.DISCARDED
    );
});

test("resolveRecommendation: rejects an already accepted recommendation", () => {
    const incomingRecommendationList = createIncomingRecommendationList();
    const incomingRecommendation =
        incomingRecommendationList.recommendations[0];

    incomingRecommendation.status = RecommendationStatus.ACCEPTED;

    const watchList = new WatchList({
        media: [],
        watchItems: []
    });

    assert.throws(() => {
        createService().resolveRecommendation({
            incomingRecommendationList,
            incomingRecommendation,
            decision: "create",
            watchList
        });
    });

    assert.equal(watchList.media.length, 0);
    assert.equal(watchList.watchItems.length, 0);
});

test("resolveRecommendation: rejects missing incoming Media", () => {
    const incomingRecommendationList = createIncomingRecommendationList();
    const incomingRecommendation =
        incomingRecommendationList.recommendations[0];

    incomingRecommendationList.media = [];

    const watchList = new WatchList({
        media: [],
        watchItems: []
    });

    assert.throws(() => {
        createService().resolveRecommendation({
            incomingRecommendationList,
            incomingRecommendation,
            decision: "create",
            watchList
        });
    }, /Media not found/);

    assert.equal(watchList.media.length, 0);
    assert.equal(watchList.watchItems.length, 0);
});