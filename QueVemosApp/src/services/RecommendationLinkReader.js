import { RecommendationExchange } from "../domain/RecommendationExchange.js";
import { RecommendationLinkCodec} from "../services/RecommendationLinkCodec.js"

export class RecommendationLinkReader {

    constructor(codec = new RecommendationLinkCodec(), parameterName = "recommendation") {
        this.codec = codec;
        this.parameterName = parameterName;
    }

    async read(url) {

        const params = new URL(url).searchParams;
        const encodedExchange = params.get(this.parameterName);

        if (!encodedExchange) {
            return null;
        }

        try {
            const data = await this.codec.decode(encodedExchange);

            return new RecommendationExchange(data);
        } catch {
            throw new Error("Invalid recommendation link");
        }
    }
}