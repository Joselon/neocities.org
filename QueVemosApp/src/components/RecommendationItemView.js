import { LitElement, html, css } from "lit";
import settings from "../data/setting.json";

export class RecommendationItemView extends LitElement {

    static styles = css`
        :host {
            display: block;
        }

        .recommendation {
            display: grid;
            grid-template-columns: 100px 1fr;
            gap: 1rem;
            padding: 1rem;
            border: 1px solid var(--border);
            border-radius: 10px;
            background: var(--surface);
        }

        .poster {
            width: 100px;
            aspect-ratio: 2 / 3;
            overflow: hidden;
            border-radius: 6px;
            background: var(--surface-strong);
        }

        .poster img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .poster-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.4;
        }

        .information {
            min-width: 0;
        }

        h3 {
            margin: 0 0 0.35rem;
        }

        .original-title {
            margin: 0 0 0.5rem;
            opacity: 0.7;
            font-size: 0.9rem;
        }

        .meta {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 0.75rem;
            font-size: 0.9rem;
        }

        .badge {
            padding: 0.25rem 0.5rem;
            border-radius: 5px;
            background: var(--surface-strong);
        }

        .status {
            margin-bottom: 0.75rem;
            font-weight: 600;
        }

        .status.matched {
            color: var(--accent);
        }

        .status.new {
            color: var(--text);
        }

        .reason {
            margin: 0 0 0.75rem;
            white-space: pre-line;
        }

        .rating {
            margin-bottom: 0.75rem;
        }

        .differences {
            margin: 0;
            padding-left: 1.2rem;
        }

        .differences-title {
            margin-bottom: 0.35rem;
            font-weight: 600;
        }

        .actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
        }

        button {
            padding: 0.6rem 0.9rem;
            border: 0;
            border-radius: 8px;
            cursor: pointer;
        }

        @media (max-width: 600px) {
            .recommendation {
                grid-template-columns: 70px 1fr;
            }

            .poster {
                width: 70px;
            }
        }
    `;

    static properties = {
        comparison: {
            attribute: false
        }
    };

    static getCatalogName(catalog, id) {
        const item = catalog.find(item => item.id === id);
        return item?.name ?? id;
    }

    constructor() {
        super();

        this.comparison = undefined;
    }

    get media() {
        return this.comparison?.media;
    }

    get recommendation() {
        return this.comparison?.recommendation;
    }

    get matches() {
        return this.comparison?.matches ?? [];
    }

    get differences() {
        if (this.matches.length === 0) {
            return [];
        }

        return this.matches[0].differences ?? [];
    }

    isNew() {
        return this.comparison?.status === "new";
    }

    isMatched() {
        return this.comparison?.status === "matched";
    }

    accept() {
        this.dispatchEvent(new CustomEvent(
            "accept-recommendation",
            {
                detail: {
                    comparison: this.comparison
                },
                bubbles: true,
                composed: true
            }
        ));
    }

    discard() {
        this.dispatchEvent(new CustomEvent(
            "discard-recommendation",
            {
                detail: {
                    comparison: this.comparison
                },
                bubbles: true,
                composed: true
            }
        ));
    }
    
    renderStatus() {
        if (this.isNew()) {
            return html`
                <div class="status new">
                    <i class="fa fa-plus-circle"></i>
                    No está en tu lista
                </div>
            `;
        }

        if (this.isMatched()) {
            return html`
                <div class="status matched">
                    <i class="fa fa-check-circle"></i>
                    Ya está en tu lista
                </div>
            `;
        }

        return html`
            <div class="status">
                Posible coincidencia
            </div>
        `;
    }

    renderDifferences() {
        if (!this.isMatched() || this.differences.length === 0) {
            return "";
        }

        return html`
            <div>
                <div class="differences-title">
                    Diferencias
                </div>

                <ul class="differences">
                    ${this.differences.map(field => html`
                        <li>${field}</li>
                    `)}
                </ul>
            </div>
        `;
    }

    render() {
        if (!this.comparison) {
            return "";
        }

        const media = this.media;
        const recommendation = this.recommendation;

        return html`
            <article class="recommendation">

                <div class="poster">
                    ${media?.poster
                        ? html`
                            <img
                                src=${media.poster}
                                alt="Cartel de ${media.title}"
                            >
                        `
                        : html`
                            <div class="poster-placeholder">
                                <i class="fa fa-film"></i>
                            </div>
                        `
                    }
                </div>

                <div class="information">

                    <h3>
                        ${media?.title}
                    </h3>

                    ${media?.originalTitle
                        ? html`
                            <p class="original-title">
                                ${media.originalTitle}
                            </p>
                        `
                        : ""
                    }

                    <div class="meta">

                        ${media?.year
                            ? html`
                                <span class="badge">
                                    ${media.year}
                                </span>
                            `
                            : ""
                        }

                        ${media?.type
                            ? html`
                                <span class="badge">
                                    ${RecommendationItemView.getCatalogName(settings.mediaTypes, media.type)}
                                </span>
                            `
                            : ""
                        }

                    </div>

                    ${this.renderStatus()}

                    ${recommendation?.recommenderRating !== undefined
                        ? html`
                            <div class="rating">
                                <i class="fa fa-star"></i>
                                ${recommendation.recommenderRating}/10
                            </div>
                        `
                        : ""
                    }

                    ${recommendation?.reason
                        ? html`
                            <p class="reason">
                                ${recommendation.reason}
                            </p>
                        `
                        : ""
                    }

                    ${this.renderDifferences()}

                    <div class="actions">

                        <button
                            type="button"
                            @click=${this.accept}
                        >
                            <i class="fa fa-check"></i>
                            Aceptar
                        </button>

                        <button
                            type="button"
                            @click=${this.discard}
                        >
                            <i class="fa fa-times"></i>
                            Descartar
                        </button>

                    </div>

                </div>

            </article>
        `;
    }
}

customElements.define(
    "recommendation-item-view",
    RecommendationItemView
);
