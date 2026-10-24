import words from "../data/words.json" with { type: "json" };
import { OmdbService } from "./OmdbService.js";

const MAX_ATTEMPTS = 10;

export class RandomMovieService {

    constructor({
        omdbService = new OmdbService(),
        getRandomWord,
        random = Math.random,
        maxAttempts = MAX_ATTEMPTS
    } = {}) {
        if (!Number.isInteger(maxAttempts) || maxAttempts < 1) {
            throw new Error("maxAttempts must be a positive integer");
        }

        this.omdbService = omdbService;
        this.random = random;
        this.maxAttempts = maxAttempts;
        this.getRandomWord = getRandomWord
            ?? (() => words[Math.floor(this.random() * words.length)]);
    }

    
    async discoverRandomMovie() {
        let attempts = 0;

        while (attempts < this.maxAttempts) {
            const word = this.getRandomWord();

            if (typeof word !== "string" || !word.trim()) {
                continue;
            }

            attempts++;

            try {
                const results = await this.omdbService.search(word);

                if (!Array.isArray(results)) {
                    continue;
                }

                const movies = results.filter(
                    result =>
                        result?.Type === "movie" &&
                        typeof result.imdbID === "string" &&
                        result.imdbID.trim()
                );

                if (movies.length === 0) {
                    continue;
                }

                const selectedMovie =
                    movies[Math.floor(this.random() * movies.length)];

                const details = await this.omdbService.getDetails(
                    selectedMovie.imdbID
                );

                if (
                    details?.Type !== "movie" ||
                    details.imdbID !== selectedMovie.imdbID
                ) {
                    continue;
                }

                return details;
            } catch {
                // Si OMDb falla, se prueba con otra búsqueda.
            }
        }

        throw new Error("No se pudo encontrar una película");
    }

}
