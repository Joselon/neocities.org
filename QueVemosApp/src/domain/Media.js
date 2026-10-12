import { MediaType } from "./MediaType.js";

export class Media {

    constructor({
        title,
        type,
        id = Media.generateId(),
        originalTitle = undefined,
        year = undefined,
        runtimeMinutes = undefined,
        genres = [],
        omdbId = undefined,
        poster = undefined,
        ratings = undefined,
        director = undefined,
        country = undefined,
        actors = undefined,
        plot = undefined,
        awards = undefined
    }) {
        this.id = id;
        this.title = Media.validateTitle(
            Media.normalizeTitle(title)
        );
        this.originalTitle = originalTitle;
        this.type = Media.validateType(type);
        this.year = year;
        this.runtimeMinutes = runtimeMinutes;
        this.genres = genres;
        this.omdbId = omdbId;
        this.poster = poster;
        this.ratings = ratings;

        this.director = director;
        this.country = country;
        this.actors = actors;
        this.plot = plot;
        this.awards = awards;
    }

    get matchKey() {
        return Media.createMatchKey(
            this.title,
            this.type,
            this.year
        );
    }

    static generateId() {
        return crypto.randomUUID();
    }

    static createMatchKey(title, type, year = undefined) {

        const normalizedTitle = title
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");

        const key = `${normalizedTitle}|${type}`;

        return year
            ? `${key}|${year}`
            : key;
    }

    static normalizeTitle(title) {
        if (typeof title !== "string") {
            throw new Error("Media title is required");
        }

        return title
            .trim()
            .replace(/\s+/g, " ");
    }

    static validateTitle(title) {
        if (!title) {
            throw new Error("Media title cannot be empty");
        }

        if (title.length > 250) {
            throw new Error("Media title cannot exceed 250 characters");
        }

        return title;
    }
    static validateType(type) {
        if (!Object.values(MediaType).includes(type)) {
            throw new Error(type + "Invalid media type");
        }
        return type;
    }
}