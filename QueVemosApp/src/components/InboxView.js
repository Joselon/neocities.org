import { LitElement, html, css } from "lit";
import { InboxFileStorage } from "../storage/InboxFileStorage.js";
import { RecommendationService} from "../services/RecommendationService.js"
import { RecommendationLinkReader} from "../services/RecommendationLinkReader.js"

import "./RecommendationListView.js";
import { RecommendationStatus } from "../domain/RecommendationStatus.js";

export class InboxView extends LitElement {

    static styles = css`
        .inbox {
            margin-top: 2rem;
        }

        .section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            margin-bottom: 1rem;
            padding: 1rem 1.2rem;

            background:
                linear-gradient(
                    135deg,
                    rgba(70, 70, 70, 0.95),
                    rgba(35, 35, 35, 0.95)
                );

            border: 1px solid var(--border);
            border-radius: 20px;

            box-shadow:
                0 10px 30px rgba(0, 0, 0, 0.25);
        }

        .section-header h2 {
            margin: 0;
        }

        /* -------------------------
           Botones
           ------------------------- */

        .action-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            min-height: 34px;
            padding: 0.45rem 0.8rem;

            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 999px;

            background: rgba(255, 255, 255, 0.1);

            color: #ffffff;

            cursor: pointer;

            transition:
                background 0.2s ease,
                transform 0.2s ease;
        }

        .delete-button {
            justify-self: end;
            align-self: end;
            color: red;
        }

        .action-button:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-1px);
        }

        .action-button i {
            margin-right: 0.4rem;
        }
            
        /* -------------------------
           Lista de recomendaciones
           ------------------------- */

        .lists {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .list-opened {
            border: 2px solid var(--accent);
            border-radius: 27%;
            background: rgba(255, 107, 44, 0.15);
            color: var(--accent);
            width: fit-content;
            justify-self: center;

        }

        .list {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            width: 100%;
            padding: 1rem;

            border: 1px solid var(--border);
            border-radius: 14px;

            background: rgba(255, 255, 255, 0.06);

            color: var(--text);

            text-align: left;
            cursor: pointer;

            transition:
                background 0.2s ease,
                transform 0.2s ease,
                border-color 0.2s ease;
        }

        .list:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-1px);
        }

        .list strong,
        .list span {
            display: block;
            font-size: 1rem;
        }
        
        .list small {
            align-self: end;
        }

        .list span {
            margin-top: 0.25rem;
            opacity: 0.7;

            color: var(--muted);
            font-size: 0.9rem;
        }

        .list--highlighted {
            position: relative;
            border: 2px solid var(--accent);
            background: rgba(255, 107, 44, 0.16);
            box-shadow: 0 0 0 2px rgba(255, 107, 44, 0.12);
            animation: recommendation-pulse 1.8s ease-in-out infinite;
        }

        @keyframes recommendation-pulse {
            0%, 100% {
                box-shadow: 0 0 0 2px rgba(255, 107, 44, 0.12);
                border-color: var(--accent);
            }

            50% {
                box-shadow: 0 0 18px 5px rgba(255, 107, 44, 0.38);
                border-color: var(--accent-2);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .list--highlighted {
                animation: none;
                border-color: var(--accent-2);
                box-shadow: 0 0 0 3px rgba(255, 107, 44, 0.25);
            }
        }

        /* -------------------------
           Vacía
           ------------------------- */

        .empty {
            opacity: 0.7;
            margin: 1rem 0 0;
            padding: 1rem;

            border-radius: 14px;

            background: rgba(255, 255, 255, 0.06);

            color: var(--muted);

            text-align: center;
        }

        /* -------------------------
           Móvil
           ------------------------- */

        @media (max-width: 768px) {

            .section-header {
                align-items: flex-start;
                gap: 0.8rem;
                padding: 1rem 0.8rem;
            }

            .section-header h2 {
                font-size: 1.2rem;
            }

            .action-button {
                min-height: 32px;
                padding: 0.4rem 0.7rem;
            }
        }
    `;

    static properties = {
        lists: { state: true },
        watchList: { attribute: false },
        dataVersion: { type: Number },
        selectedList: { state: true },
        showImportLink: { type: Boolean },
        importLink: { type: String },
    };

    constructor() {
        super();

        this.fileStorage = new InboxFileStorage();
        this.linkReader = new RecommendationLinkReader();
        this.service = new RecommendationService();

        this.selectedList = undefined;
        this.highlightedListId = null;
        this.scrollToListPending = false;
        this.showImportLink = false;
        this.importLink = "";
    }

    updated() {
        if (!this.scrollToListPending || !this.highlightedListId) {
            return;
        }

        const target = [
            ...this.renderRoot.querySelectorAll(
                "[data-recommendation-list-id]"
            )
        ].find(
            element =>
                element.dataset.recommendationListId ===
                this.highlightedListId
        );

        if (!target) {
            // Volver a intentarlo.
            return;
        }

        target.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        this.scrollToListPending = false;
    }

    async connectedCallback() {
        super.connectedCallback();

        await this.importRecommendationFromUrl();
    }

    async importRecommendationFromUrl() {
        const exchange = await this.linkReader.read(
            window.location.href
        );

        if (!exchange) {
            return;
        }

        const existingList = this.lists.find(
            list => list.id === exchange.id
        );

        if (existingList) {
            // Ya existe: llevamos al usuario hasta ella.
            this.highlightIncomingList(existingList.id);
            this.clearRecommendationUrlParameter();
            return;
        }

        const incomingList =
            this.service.createIncomingRecommendationList(exchange);

        this.highlightIncomingList(incomingList.id);

        this.notifyInboxChanged([
            ...this.lists,
            incomingList
        ]);

        this.clearRecommendationUrlParameter();
    }

    clearRecommendationUrlParameter() {
        const url = new URL(window.location.href);

        url.searchParams.delete("recommendation");

        window.history.replaceState(
            window.history.state,
            "",
            url.pathname + url.search + url.hash
        );
    }

    importRecommendations() {
        this.showImportLink = true;
    }

    cancelImportLink() {
        this.showImportLink = false;
        this.importLink = "";
    }

    highlightIncomingList(listId) {
        this.highlightedListId = listId;
        this.scrollToListPending = true;
        this.requestUpdate();
    }   

    openRecommendationsLink(event) {
        event.preventDefault();

        const link = this.importLink.trim();

        if (!link) {
            return;
        }

        let url;

        try {
            url = new URL(link);
        } catch {
            return;
        }

        if (url.protocol !== "https:" && url.protocol !== "http:") {
            return;
        }

        window.location.href = url.href;
    }

    selectList(list) {
        this.highlightedListId = null;
        this.scrollToListPending = false;
        this.selectedList = list;
    }

    closeList() {
        this.selectedList = undefined;
    }

    notifyInboxChanged(inbox) {
        this.dispatchEvent(new CustomEvent("inbox-changed", {
            detail: { inbox },
            bubbles: true,
            composed: true,
        }));
    }

    formatDate(date) {
        return new Date(date).toLocaleString("es-ES");
    }
    
    canDeleteIncomingList(list) {
        return list.recommendations.length > 0 &&
            list.recommendations.every(
                recommendation => recommendation.status !== RecommendationStatus.PENDING
            );
    }

    deleteIncomingList(list) {
        const updatedLists = this.service.deleteIncomingList(
            this.lists,
            list.id
        );

        if (updatedLists === null) {
            return;
        }

        this.lists = updatedLists;

        this.notifyInboxChanged([
            ...this.lists
        ]);
    }

    render() {
        return html`
            <link
                rel="stylesheet"
                href="/assets/icons/font-awesome-4.7.0/css/font-awesome.min.css"
            >

            <section class="inbox">

                <header class="section-header">
                    <i class="fa fa-inbox"></i>
                    <h2>Buzón de entrada</h2>

                    ${this.showImportLink
                        ? html`
                            <form class="import-link-form"
                                @submit=${this.openRecommendationsLink}
                            >
                                <input
                                    type="url"
                                    placeholder="Pega aquí el enlace de recomendaciones"
                                    .value=${this.importLink}
                                    @input=${(event) =>
                                        this.importLink = event.target.value}
                                    required
                                >

                                <button type="submit" class="action-button">
                                    <i class="fa fa-link"></i>
                                    Abrir enlace
                                </button>

                                <button
                                    type="button"
                                    class="action-button"
                                    @click=${this.cancelImportLink}
                                >
                                    Cancelar
                                </button>
                            </form>
                        `
                        : html`
                            <button
                                type="button"
                                class="action-button"
                                @click=${this.importRecommendations}
                            >
                                <i class="fa fa-link"></i>
                                Importar enlace
                            </button>
                        `
                    }
                </header>

                ${this.lists.length === 0
                    ? html`
                        <p class="empty">
                            No tienes recomendaciones recibidas.
                        </p>
                    `
                    : html`
                        ${this.selectedList? html `
                        <div class="lists list-opened">
                            <button
                                class="list"
                                @click=${() => this.closeList()}
                            >
                                <strong>
                                 <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
                                    Cerrar
                                </strong>
                            </button>
                            `: html`
                        <div class="lists" >
                            ${this.lists.map(list => html`
                                    <button
                                        class="list ${
                                            this.highlightedListId === list.id
                                                ? "list--highlighted"
                                                : ""
                                        }"
                                        data-recommendation-list-id=${list.id}
                                        @click=${() => this.selectList(list)}
                                    >
                                        <strong>
                                        <i class="fa fa-envelope-o" aria-hidden="true"></i></big> ${list.name}</strong>
                                        <small> ${this.formatDate(list.createdAt)} </small>
                                        <span>
                                            ${list.recommendations.length}
                                            recomendaciones
                                        </span>
                                       ${this.canDeleteIncomingList(list)
                                        ? html`
                                            <button
                                                type="button"
                                                class="action-button delete-button"
                                                title="Borrar lista de recomendaciones"
                                                aria-label="Borrar lista de recomendaciones"
                                                @click=${(event) => {
                                                    event.stopPropagation();
                                                    this.deleteIncomingList(list);
                                                }}
                                            >
                                                <i class="fa fa-trash" aria-hidden="true"></i>
                                                Borrar
                                            </button>
                                        `
                                        : ""} 
                                    </button>
                            `)}
                        </div>
                        `}
                    `
                }

                ${this.selectedList
                    ? html`
                        <recommendation-list-view
                            .incomingList=${this.selectedList}
                            .watchList=${this.watchList}
                            .dataVersion=${this.dataVersion}
                        ></recommendation-list-view>
                   
                    `
                    : html`
                   
                    `
                }
                
                
            </section>
        `;
    }
}

customElements.define(
    "inbox-view",
    InboxView
);
