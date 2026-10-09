
export class RecommendationLinkCodec {

    async encode(recommendationExchange) {
        if (!recommendationExchange ||
            typeof recommendationExchange !== "object" ||
            Array.isArray(recommendationExchange)) {
            throw new TypeError(
                "recommendationExchange debe ser un objeto"
            );
        }

        const json = JSON.stringify(recommendationExchange);
        const bytes = new TextEncoder().encode(json);

        const compressed = await this.compress(bytes);

        return this.encodeBase64Url(compressed);
    }

    async decode(encodedData) {
        if (typeof encodedData !== "string" ||
            encodedData.length === 0) {
            throw new TypeError(
                "encodedData debe ser una cadena no vacía"
            );
        }

        const compressed = this.decodeBase64Url(encodedData);
        const bytes = await this.decompress(compressed);
        const json = new TextDecoder("utf-8", {
            fatal: true
        }).decode(bytes);

        return JSON.parse(json);
    }

    async compress(bytes) {
        if (typeof CompressionStream === "undefined") {
            throw new Error(
                "Este navegador no soporta CompressionStream"
            );
        }

        const stream = new Blob([bytes])
            .stream()
            .pipeThrough(new CompressionStream("deflate"));

        return new Uint8Array(
            await new Response(stream).arrayBuffer()
        );
    }

    async decompress(bytes) {
        if (typeof DecompressionStream === "undefined") {
            throw new Error(
                "Este navegador no soporta DecompressionStream"
            );
        }

        const stream = new Blob([bytes])
            .stream()
            .pipeThrough(new DecompressionStream("deflate"));

        return new Uint8Array(
            await new Response(stream).arrayBuffer()
        );
    }

    encodeBase64Url(bytes) {
        let binary = "";

        for (let i = 0; i < bytes.length; i += 0x8000) {
            binary += String.fromCharCode(
                ...bytes.subarray(i, i + 0x8000)
            );
        }

        return btoa(binary)
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }

    decodeBase64Url(encodedData) {
        const base64 = encodedData
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        const padded = base64 +
            "=".repeat((4 - base64.length % 4) % 4);

        const binary = atob(padded);

        return Uint8Array.from(
            binary,
            character => character.charCodeAt(0)
        );
    }
}
