import { test } from "node:test";
import assert from "node:assert/strict";

import { WatchListService } from "../../src/services/WatchListService.js";
import { WatchList } from "../../src/domain/WatchList.js";
import { Media } from "../../src/domain/Media.js";
import { WatchStatus } from "../../src/domain/WatchStatus.js";


test("Services: addItem añade un Media y su WatchItem", () => {
    const watchList = new WatchList();
    const service = new WatchListService(watchList);

    const result = service.addItem({title: "Matrix", type: "movie"});

    assert.equal(result.success, true);
    assert.equal(watchList.media.length, 1);
    assert.equal(watchList.watchItems.length, 1);

    assert.equal(
        watchList.watchItems[0].mediaId,
        watchList.media[0].id
    );
});


test("Services: addItem no añade nada si falla la creación del Media", () => {
    const watchList = new WatchList();
    const service = new WatchListService(watchList);

    const result = service.addItem({title: "", type: "movie"});

    assert.equal(result.success, false);
    assert.equal(watchList.media.length, 0);
    assert.equal(watchList.watchItems.length, 0);
});

test("Services: addItem elimina el Media si falla al añadir el WatchItem", () => {
    class WatchListQueFalla extends WatchList {

        addWatchItem() {
            throw new Error("Error al añadir WatchItem");
        }
    }

    const watchList = new WatchListQueFalla();
    const service = new WatchListService(watchList);

    const result = service.addItem({title: "Matrix", type: "movie"});

    assert.equal(result.success, false);

    assert.equal(watchList.media.length, 0);
    assert.equal(watchList.watchItems.length, 0);
});


const omdbDetails = {
    Response: "True",
    Type: "movie",
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Runtime: "136 min",
    Genre: "Action, Sci-Fi",
    Poster: "https://example.com/matrix.jpg",
    Director: "Lana Wachowski, Lilly Wachowski",
    Country: "United States",
    Actors: "Keanu Reeves, Laurence Fishburne",
    Plot: "A computer hacker discovers the truth.",
    Awards: "4 wins & 37 nominations.",
    Ratings: [
        { Source: "Internet Movie Database", Value: "8.7/10" }
    ]
};

test("Services: addMovieFromOmdb añade Media y WatchItem con los metadatos de OMDb", () => {
    const watchList = new WatchList();
    const service = new WatchListService(watchList);

    const result = service.addMovieFromOmdb(omdbDetails);

    assert.equal(result.success, true);
    assert.equal(watchList.media.length, 1);
    assert.equal(watchList.watchItems.length, 1);

    const media = watchList.media[0];
    const watchItem = watchList.watchItems[0];

    assert.equal(media.title, "The Matrix");
    assert.equal(media.omdbId, "tt0133093");
    assert.equal(media.runtimeMinutes, 136);
    assert.equal(media.director, omdbDetails.Director);
    assert.equal(media.country, omdbDetails.Country);
    assert.equal(media.actors, omdbDetails.Actors);
    assert.equal(media.plot, omdbDetails.Plot);
    assert.equal(media.awards, omdbDetails.Awards);
    assert.deepEqual(media.ratings, omdbDetails.Ratings);
    assert.equal(media.poster, omdbDetails.Poster);

    assert.equal(watchItem.mediaId, media.id);
    assert.equal(watchItem.status, WatchStatus.PENDING);
});

test("Services: addMovieFromOmdb no añade nada si falla la ficha OMDb", () => {
    const watchList = new WatchList();
    const service = new WatchListService(watchList);

    const result = service.addMovieFromOmdb({
        ...omdbDetails,
        Response: "False",
        Error: "Movie not found"
    });

    assert.equal(result.success, false);
    assert.equal(watchList.media.length, 0);
    assert.equal(watchList.watchItems.length, 0);
});

test("Services: addMovieFromOmdb elimina Media si falla al añadir WatchItem", () => {
    class WatchListQueFalla extends WatchList {
        addWatchItem() {
            throw new Error("Error al añadir WatchItem");
        }
    }

    const watchList = new WatchListQueFalla();
    const service = new WatchListService(watchList);

    const result = service.addMovieFromOmdb(omdbDetails);

    assert.equal(result.success, false);
    assert.equal(watchList.media.length, 0);
    assert.equal(watchList.watchItems.length, 0);
});

/*
test("Services: preserves OMDb details after accepting a recommendation and saving watched item", async () => {
    // Arrange: película original con información completa de OMDb.
    const originalMedia = {
        title: "Película de prueba",
        type: "movie",
        omdbId: "tt1234567",
        plot: "Una sinopsis que debe conservarse.",
        awards: "Ganadora de dos premios.",
        director: "Director de prueba",
        actors: "Actor Uno, Actor Dos",
        country: "Spain",
        runtimeMinutes: 120
    };

    // Act 1: crear el intercambio sin los campos omitidos.
    // Act 2: recibir y aceptar la recomendación.
    // Act 3: completar los detalles desde OMDb.
    // Act 4: marcar el WatchItem como watched y guardarlo.
    // Act 5: recuperar la información persistida.
    
- Crear un Media con omdbId: "tt1234567", pero sin plot ni awards.
- Crear su WatchItem, simulando una recomendación aceptada.
- Invocar updateItem() con el mismo omdbId y una respuesta completa de OMDb.
- Comprobar que se guardan plot, awards, director, actors, country, runtimeMinutes y ratings.
- Comprobar que los campos editables por el usuario no se sobrescriben.
- Comprobar que los metadatos siguen presentes después de serializar y reconstruir los datos, si el test de persistencia cubre ese flujo.

    // Assert: comprobar los datos recuperados.
    assert.equal(savedMedia.plot, originalMedia.plot);
    assert.equal(savedMedia.awards, originalMedia.awards);
    assert.equal(savedMedia.director, originalMedia.director);
    assert.equal(savedMedia.actors, originalMedia.actors);
    assert.equal(savedMedia.country, originalMedia.country);
    assert.equal(savedMedia.runtimeMinutes, originalMedia.runtimeMinutes);
    assert.equal(savedWatchItem.status, "watched");
});
*/
