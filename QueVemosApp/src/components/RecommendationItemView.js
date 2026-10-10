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
        .candidates {
            margin-top: 1rem;
        }

        .candidate-grid {
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: 0.5rem;
        }

        .candidate {
            min-width: 0;
            padding: 0.6rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            background: var(--surface-strong);
            color: var(--text);
            text-align: left;
            overflow-wrap: anywhere;
        }

        .candidate.selected {
            border-color: var(--accent);
            box-shadow: inset 0 0 0 1px var(--accent);
        }

        .candidate-navigation {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            margin-top: 0.6rem;
        }

        .merge-fields {
            display: grid;
            gap: 0.4rem;
            margin-top: 0.8rem;
        }

        .merge-fields label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .actions {
            flex-wrap: wrap;
        }

        button:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        @media (max-width: 768px) {
            .candidate-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
            .recommendation {
                grid-template-columns: 70px 1fr;
            }

            .poster {
                width: 70px;
            }
        }
    `;

    static properties = {
        comparison: { attribute: false },
        selectedCandidateId: { state: true },
        candidatePage: { state: true },
        selectedMediaFields: { state: true }
    };

    static getCatalogName(catalog, id) {
        const item = catalog.find(item => item.id === id);
        return item?.name ?? id;
    }

    constructor() {
        super();

        this.comparison = undefined;
        this.selectedCandidateId = null;
        this.candidatePage = 0;
        this.selectedMediaFields = [];
    }

    get candidatePageCount() {
        return Math.ceil(this.matches.length / 5);
    }

    get visibleCandidates() {
        return this.matches.slice(
            this.candidatePage * 5,
            this.candidatePage * 5 + 5
        );
    }

    get selectedCandidate() {
        return this.matches.find(
            candidate =>
                candidate.media.id === this.selectedCandidateId
        );
    }

    updated(changedProperties) {
        if (changedProperties.has("comparison")) {
            this.selectedCandidateId = null;
            this.candidatePage = 0;
            this.selectedMediaFields = [];
        }
    }

    selectCandidate(candidate) {
        this.selectedCandidateId = candidate.media.id;
        this.selectedMediaFields = [];
    }

    toggleMediaField(field, checked) {
        this.selectedMediaFields = checked
            ? [...new Set([...this.selectedMediaFields, field])]
            : this.selectedMediaFields.filter(
                selected => selected !== field
            );
    }

    previousCandidatePage() {
        this.candidatePage = Math.max(0, this.candidatePage - 1);
    }

    nextCandidatePage() {
        this.candidatePage = Math.min(
            this.candidatePageCount - 1,
            this.candidatePage + 1
        );
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

    accept(decision) {
        if (
            decision === "merge" &&
            (
                !this.selectedCandidate ||
                this.selectedMediaFields.length === 0
            )
        ) {
            return;
        }

        this.dispatchEvent(new CustomEvent(
            "accept-recommendation",
            {
                detail: {
                    comparison: this.comparison,
                    decision,
                    targetMediaId:
                        decision === "merge"
                            ? this.selectedCandidate.media.id
                            : undefined,
                    mediaFields:
                        decision === "merge"
                            ? [...this.selectedMediaFields]
                            : []
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

                    ${this.matches.length > 0 ? html`
                        <section class="candidates">
                            <div class="differences-title">
                                Candidatos para fusionar
                            </div>

                            <div class="candidate-grid">
                                ${this.visibleCandidates.map(candidate => html`
                                    <button
                                        type="button"
                                        class="candidate ${
                                            candidate.media.id === this.selectedCandidateId
                                                ? "selected"
                                                : ""
                                        }"
                                        aria-pressed=${
                                            candidate.media.id === this.selectedCandidateId
                                        }
                                        @click=${() => this.selectCandidate(candidate)}
                                    >
                                        <strong>${candidate.media.title}</strong>
                                        <div>${candidate.media.year ?? "Año desconocido"}</div>
                                        <small>${candidate.matches.join(", ")}</small>
                                    </button>
                                `)}
                            </div>

                            ${this.candidatePageCount > 1 ? html`
                                <div class="candidate-navigation">
                                    <button
                                        type="button"
                                        ?disabled=${this.candidatePage === 0}
                                        @click=${this.previousCandidatePage}
                                    >
                                        Anteriores
                                    </button>

                                    <span>
                                        ${this.candidatePage + 1}
                                        / ${this.candidatePageCount}
                                    </span>

                                    <button
                                        type="button"
                                        ?disabled=${
                                            this.candidatePage >= this.candidatePageCount - 1
                                        }
                                        @click=${this.nextCandidatePage}
                                    >
                                        Siguientes
                                    </button>
                                </div>
                            ` : ""}

                            ${this.selectedCandidate ? html`
                                <div class="merge-fields">
                                    <strong>
                                        Campos que se actualizarán en
                                        ${this.selectedCandidate.media.title}
                                    </strong>

                                    ${this.selectedCandidate.differences.map(field => html`
                                        <label>
                                            <input
                                                type="checkbox"
                                                .checked=${
                                                    this.selectedMediaFields.includes(field)
                                                }
                                                @change=${event =>
                                                    this.toggleMediaField(
                                                        field,
                                                        event.target.checked
                                                    )
                                                }
                                            >
                                            ${field}
                                        </label>
                                    `)}
                                </div>
                            ` : ""}
                        </section>
                        ` 
                        : ""
                    }
                    <div class="actions">
                        <button
                            type="button"
                            @click=${() => this.accept("create")}
                        >
                            <i class="fa fa-plus"></i>
                            Añadir como nuevo
                        </button>

                        <button
                            type="button"
                            ?disabled=${
                                !this.selectedCandidate ||
                                this.selectedMediaFields.length === 0
                            }
                            @click=${() => this.accept("merge")}
                        >
                            <i class="fa fa-code-fork"></i>
                            Fusionar
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
