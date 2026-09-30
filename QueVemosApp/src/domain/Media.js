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
        ratings = undefined
    }) {
        this.id = id;
        this.title = title;
        this.originalTitle = originalTitle;
        this.type = type;
        this.year = year;
        this.runtimeMinutes = runtimeMinutes;
        this.genres = genres;
        this.omdbId = omdbId;
        this.poster = poster;
        this.ratings = ratings;
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
}