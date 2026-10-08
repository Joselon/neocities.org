import { LitElement, html, css } from "lit";

import { RecommendationService } from "../services/RecommendationService.js";
import { WatchListStorage } from "../storage/WatchListStorage.js";
import { RecommendationExchange } from "../domain/RecommendationExchange.js";

import "./RecommendationItemView.js";

export class RecommendationListView extends LitElement {

    static styles = css`
        :host {
            display: block;
        }

        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        .recommendation-list {
            margin-top: 0.9rem;

            border: 1px solid var(--border);
            border-radius: 16px;

            background: rgba(255, 255, 255, 0.05);

            overflow: hidden;
        }

        /* -------------------------
           Cabecera
           ------------------------- */

        .list-header {
            display: flex;
            align-items: center;
            gap: 1rem;

            padding: 1rem 1.1rem;

            background:
                linear-gradient(
                    135deg,
                    rgba(70, 70, 70, 0.95),
                    rgba(35, 35, 35, 0.95)
                );
        }

        .list-info {
            flex: 1;
            min-width: 0;
        }

        .list-info h3 {
            margin: 0;

            font-size: 1.05rem;
        }

        .list-count {
            margin-top: 0.2rem;

            color: var(--muted);
            font-size: 0.9rem;
        }

        /* -------------------------
           Estados
           ------------------------- */

        .status-counts {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;

            margin-top: 0.5rem;
        }

        .status {
            color: var(--muted);
            font-size: 0.82rem;
            white-space: nowrap;
        }

        .status.pending {
            color: var(--accent-2);
        }

        .status.accepted {
            color: #8fd694;
        }

        .status.discarded {
            color: #e59a9a;
        }

        /* -------------------------
           Acciones
           ------------------------- */

        .actions {
            display: flex;
            align-items: center;
            gap: 0.45rem;
        }

        .action-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            width: 34px;
            height: 34px;

            padding: 0;

            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 50%;

            background: rgba(255, 255, 255, 0.1);

            color: #ffffff;

            cursor: pointer;

            transition:
                background 0.2s ease,
                transform 0.2s ease;
        }

        .action-button:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-1px);
        }

        /* -------------------------
           Contenido
           ------------------------- */

        .list-content {
            padding: 1rem;
        }

        /* -------------------------
           Móvil
           ------------------------- */

        @media (max-width: 768px) {

            .list-header {
                align-items: flex-start;
                padding: 0.9rem;
            }

            .actions {
                flex-shrink: 0;
            }

            .status-counts {
                gap: 0.4rem;
            }

            .status {
                font-size: 0.78rem;
            }

            .list-content {
                padding: 0.8rem;
            }
        }
    `;

    static properties = {
        recommendationList: { attribute: false },
        comparisons: { state: true },
        expanded: { state: true }
    };

    constructor() {
        super();

        const watchListStorage =
            new WatchListStorage(localStorage);

        this.watchList =
            watchListStorage.load();

        this.service =
            new RecommendationService();

        this.comparisons = [];
        this.expanded = false;
    }

    updated(changedProperties) {
        if (
            changedProperties.has("recommendationList") &&
            this.recommendationList
        ) {
            this.updateComparisons();
        }
    }

    updateComparisons() {
        this.comparisons =
            this.service.compareRecommendations(
                new RecommendationExchange({sender: "OtraLista", items: this.recommendationList.recommendations}),
                this.watchList
            );
    }

    getStatusCount(status) {
        return this.recommendationList.recommendations
            .filter(
                recommendation =>
                    recommendation.status === status
            )
            .length;
    }

    toggleExpanded() {
        this.expanded = !this.expanded;
    }

    render() {
        if (!this.recommendationList) {
            return html``;
        }

        const pending =
            this.getStatusCount("pending");

        const accepted =
            this.getStatusCount("accepted");

        const discarded =
            this.getStatusCount("discarded");

        return html`
            <link
                rel="stylesheet"
                href="/assets/icons/font-awesome-4.7.0/css/font-awesome.min.css"
            >
            <article class="recommendation-list">

                <header class="list-header">

                    <div class="list-info">

                        <h3>
                            ${this.recommendationList.name}
                        </h3>

                        <div class="list-count">
                            ${this.recommendationList.recommendations.length}
                            recomendaciones
                        </div>

                        <div class="status-counts">

                            ${pending > 0
                                ? html`
                                    <span class="status pending">
                                        ● ${pending} pendientes
                                    </span>
                                `
                                : ""
                            }

                            ${accepted > 0
                                ? html`
                                    <span class="status accepted">
                                        ✓ ${accepted} aceptadas
                                    </span>
                                `
                                : ""
                            }

                            ${discarded > 0
                                ? html`
                                    <span class="status discarded">
                                        × ${discarded} descartadas
                                    </span>
                                `
                                : ""
                            }

                        </div>

                    </div>

                    <div class="actions">

                        <button
                            type="button"
                            class="action-button"
                            title=${this.expanded
                                ? "Cerrar"
                                : "Abrir"}
                            @click=${this.toggleExpanded}
                        >
                            <i
                                class="fa ${this.expanded
                                    ? "fa-chevron-up"
                                    : "fa-chevron-down"}"
                            ></i>
                        </button>

                    </div>

                </header>

                ${this.expanded
                    ? html`
                        <div class="list-content">

                            ${this.comparisons.map(
                                comparison => html`
                                    <recommendation-item-view
                                        .comparison=${comparison}
                                    ></recommendation-item-view>
                                `
                            )}

                        </div>
                    `
                    : ""
                }

            </article>
        `;
    }
}

customElements.define(
    "recommendation-list-view",
    RecommendationListView
);
