import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { RandomMovieService } from "../../src/services/RandomMovieService.js";

const movieDetails = {
    Response: "True",
    imdbID: "tt0083658",
    Title: "Blade Runner",
    Year: "1982",
    Type: "movie",
    Poster: "https://example.com/blade-runner.jpg",
    Runtime: "117 min",
    Genre: "Sci-Fi, Thriller",
    Plot: "A blade runner must pursue replicants.",
    Awards: "N/A"
};

function createService({
    words = ["blade"],
    searchResults = [],
    details = movieDetails,
    maxAttempts = 3,
    random = () => 0,
    searchError,
    detailsError
} = {}) {
    let wordIndex = 0;

    const omdbService = {
        search: async () => {
            if (searchError) {
                throw searchError;
            }

            return searchResults;
        },

        getDetails: async () => {
            if (detailsError) {
                throw detailsError;
            }

            return details;
        }
    };

    const service = new RandomMovieService({
        omdbService,
        getRandomWord: () => {
            const word = words[wordIndex % words.length];
            wordIndex++;
            return word;
        },
        maxAttempts,
        random
    });

    return { service, omdbService };
}

describe("RandomMovieService", () => {
    it("encuentra una película y devuelve sus detalles de OMDb", async () => {
        const { service, omdbService } = createService({
            searchResults: [
                {
                    imdbID: "tt0083658",
                    Title: "Blade Runner",
                    Type: "movie",
                    Year: "1982"
                }
            ]
        });

        const result = await service.discoverRandomMovie();

        assert.equal(result, movieDetails);
        assert.equal(typeof omdbService.search, "function");
        assert.equal(typeof omdbService.getDetails, "function");
    });

    it("ignora resultados que no sean películas o no tengan imdbID", async () => {
        const { service } = createService({
            searchResults: [
                {
                    Title: "Una serie",
                    imdbID: "tt1111111",
                    Type: "series"
                },
                {
                    Title: "Resultado sin identificador",
                    Type: "movie"
                }
            ],
            maxAttempts: 2
        });

        await assert.rejects(
            service.discoverRandomMovie(),
            /No se pudo encontrar una película/
        );
    });

    it("vuelve a intentarlo cuando una búsqueda no devuelve resultados", async () => {
        let searchCount = 0;

        const omdbService = {
            search: async () => {
                searchCount++;

                return searchCount === 1
                    ? []
                    : [{
                        imdbID: "tt0083658",
                        Title: "Blade Runner",
                        Type: "movie",
                        Year: "1982"
                    }];
            },

            getDetails: async () => movieDetails
        };

        const service = new RandomMovieService({
            omdbService,
            getRandomWord: () => "blade",
            maxAttempts: 3,
            random: () => 0
        });

        const result = await service.discoverRandomMovie();

        assert.equal(result, movieDetails);
        assert.equal(searchCount, 2);
    });

    it("vuelve a intentarlo si OMDb falla temporalmente", async () => {
        let searchCount = 0;

        const omdbService = {
            search: async () => {
                searchCount++;

                if (searchCount === 1) {
                    throw new Error("Error temporal de red");
                }

                return [{
                    imdbID: "tt0083658",
                    Title: "Blade Runner",
                    Type: "movie",
                    Year: "1982"
                }];
            },

            getDetails: async () => movieDetails
        };

        const service = new RandomMovieService({
            omdbService,
            getRandomWord: () => "blade",
            maxAttempts: 3,
            random: () => 0
        });

        const result = await service.discoverRandomMovie();

        assert.equal(result, movieDetails);
        assert.equal(searchCount, 2);
    });

    it("termina al alcanzar el máximo de intentos", async () => {
        let searchCount = 0;

        const omdbService = {
            search: async () => {
                searchCount++;
                return [];
            },

            getDetails: async () => movieDetails
        };

        const service = new RandomMovieService({
            omdbService,
            getRandomWord: () => "palabra",
            maxAttempts: 3,
            random: () => 0
        });

        await assert.rejects(
            service.discoverRandomMovie(),
            /No se pudo encontrar una película/
        );

        assert.equal(searchCount, 3);
    });

    it("rechaza los detalles si OMDb devuelve una serie", async () => {
        const { service } = createService({
            searchResults: [{
                imdbID: "tt1234567",
                Title: "Una serie",
                Type: "movie",
                Year: "2020"
            }],
            details: {
                ...movieDetails,
                Type: "series"
            }
        });

        await assert.rejects(
            service.discoverRandomMovie(),
            /No se pudo encontrar una película/
        );
    });
});
