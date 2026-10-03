import { test } from "node:test";
import assert from "node:assert/strict";

import { Media } from "../../src/domain/Media.js";
import { MediaType } from "../../src/domain/MediaType.js";

test("Media requires a title", () => {
    assert.throws(() => {
        new Media({
            type: "movie"
        });
    });
});

test("Media requires a type", () => {
    assert.throws(() => {
        new Media({
            title: "Dune"
        });
    });
});

test("Media generates an id automatically", () => {
    const media = new Media({
        title: "Dune",
        type: "movie"
    });

    assert.ok(media.id);
});

test("Media generates a different id for each instance", () => {
    const media1 = new Media({
        title: "Dune",
        type: "movie"
    });

    const media2 = new Media({
        title: "Dune",
        type: "movie"
    });

    assert.notEqual(media1.id, media2.id);
});

test("Media stores its basic data", () => {
    const media = new Media({
        title: "Dune",
        type: "movie"
    });

    assert.equal(media.title, "Dune");
    assert.equal(media.type, "movie");
});

test("Media generates a matchKey from title and type", () => {
    const media = new Media({
        title: "Dune",
        type: "movie"
    });

    assert.equal(media.matchKey, "dune|movie");
});

test("matchKey normalizes title case and surrounding spaces", () => {
    const media = new Media({
        title: "  DUNE  ",
        type: "movie"
    });

    assert.equal(media.matchKey, "dune|movie");
});

test("matchKey includes the year when available", () => {
    const media = new Media({
        title: "Dune",
        type: "movie",
        year: 2021
    });

    assert.equal(media.matchKey, "dune|movie|2021");
});

test("matchKey changes when year is added", () => {
    const media = new Media({
        title: "Dune",
        type: "movie"
    });

    assert.equal(media.matchKey, "dune|movie");

    media.year = 2021;

    assert.equal(media.matchKey, "dune|movie|2021");
});

test("Media rejects a title containing only spaces", () => {
    assert.throws(() => {
        new Media({
            title: "   ",
            type: "movie"
        });
    });
});

test("Media rejects a title that is too long", () => {
    const title = "A".repeat(251);

    assert.throws(() => {
        new Media({
            title,
            type: "movie"
        });
    });
});

test("Media accepts a title with 250 characters", () => {
    const title = "A".repeat(250);

    assert.doesNotThrow(() => {
        new Media({
            title,
            type: "movie"
        });
    });
});

test("Media requires a valid type", () => {
    assert.throws(() => {
        new Media({
            title: "Dune"
        });
    });

    assert.throws(() => {
        new Media({
            title: "Dune",
            type: "book"
        });
    });
});

test("Media accepts a movie type", () => {
    assert.doesNotThrow(() => {
        new Media({
            title: "Dune",
            type: MediaType.MOVIE
        });
    });
});

test("Media accepts a series type", () => {
    assert.doesNotThrow(() => {
        new Media({
            title: "Dune",
            type: MediaType.SERIES
        });
    });
});