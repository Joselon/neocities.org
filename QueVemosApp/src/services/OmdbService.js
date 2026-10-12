
export class OmdbService {

    constructor({
        baseUrl = "https://omdb-proxy.joselon79.workers.dev",
        fetchFunction = globalThis.fetch.bind(globalThis)
    } = {}) {
        this.baseUrl = baseUrl.replace(/\/+$/, "");
        this.fetchFunction = fetchFunction;
    }

    async search(title) {
        if (typeof title !== "string" || !title.trim()) {
            throw new Error("Search title is required");
        }

        const params = new URLSearchParams({
            title: title.trim()
        });

        const data = await this.request(
            `/search?${params}`
        );

        if (data.Response === "False") {
            return [];
        }

        return data.Search ?? [];
    }

    async getDetails(omdbId) {
        if (typeof omdbId !== "string" || !omdbId.trim()) {
            throw new Error("OMDb ID is required");
        }

        const params = new URLSearchParams({
            id: omdbId.trim()
        });

        const data = await this.request(
            `/detail?${params}`
        );

        if (data.Response === "False") {
            throw new Error(
                data.Error || "OMDb details not found"
            );
        }

        return data;
    }

    async request(path) {
        const response = await this.fetchFunction(
            `${this.baseUrl}${path}`
        );

        if (!response.ok) {
            throw new Error(
                `OMDb request failed: ${response.status}`
            );
        }

        return response.json();
    }
}
