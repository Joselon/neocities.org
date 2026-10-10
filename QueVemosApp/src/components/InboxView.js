import { LitElement, html, css } from "lit";
import { InboxStorage } from "../storage/InboxStorage.js";
import { InboxFileStorage } from "../storage/InboxFileStorage.js";
import { RecommendationService} from "../services/RecommendationService.js"
import { RecommendationLinkReader} from "../services/RecommendationLinkReader.js"

import "./RecommendationListView.js";

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
        selectedList: { state: true },
    };

    constructor() {
        super();

        this.storage = new InboxStorage(localStorage);
        this.fileStorage = new InboxFileStorage();
        this.linkReader = new RecommendationLinkReader();

        this.service = new RecommendationService();

        this.lists = this.storage.load();
        this.selectedList = undefined;
    }

    async connectedCallback() {
        super.connectedCallback();

        await this.importRecommendationFromUrl();
    }

    async importRecommendationFromUrl() {

        const exchange = await this.linkReader.read(window.location.href);

        if (!exchange) {
            return;
        }

        if (this.lists.some(list => list.id === exchange.id)) {
            alert(
                    `Ya se ha agregado al buzón de entrada`
                );
            
            return;
        }

        const incomingList  = this.service.createIncomingRecommendationList(exchange);
        this.lists = [...this.lists, incomingList];
        this.storage.save(this.lists);

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

    selectList(list) {
        this.selectedList = list;
    }

    closeList() {
        this.selectedList = undefined;
    }

    importRecommendations() {

        const input = document.createElement("input");

        input.type = "file";
        input.accept = "application/json,.json";

        input.addEventListener("change", async () => {

            const file = input.files[0];

            if (!file) {
                return;
            }

            try {

                const json = await file.text();

                const importedLists =
                    this.fileStorage.import(json);

                this.lists = [
                    ...this.lists,
                    ...importedLists
                ];

                this.storage.save(this.lists);

                this.selectedList = undefined;

            } catch (error) {

                console.error(error);

                alert(
                    `No se pudo importar al buzón de entrada:\n${error.message}`
                );
            }
        });

        input.click();
    }

    formatDate(date) {
        return new Date(date).toLocaleString("es-ES");
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

                    <button
                        type="button"
                        class="action-button"
                        @click=${this.importRecommendations}
                    >
                        <i class="fa fa-upload"></i>
                        Importar
                    </button>
                </header>

                ${this.lists.length === 0
                    ? html`
                        <p class="empty">
                            No tienes recomendaciones recibidas.
                        </p>
                    `
                    : html`
                        ${this.selectedList? html `
                            <button
                                class="list"
                                @click=${() => this.closeList()}
                            >
                                <strong>
                                 <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
                                 Comparando con tu Lista local...
                                </strong>
                                <span>
                                    Cerrar
                                </span>
                            </button>
                            `: html`
                            <div class="lists">
                            ${this.lists.map(list => html`
                                    <button
                                        class="list"
                                        @click=${() => this.selectList(list)}
                                    >
                                        <strong>
                                        <i class="fa fa-envelope-o" aria-hidden="true"></i></big> ${list.name}</strong>
                                        <small> ${this.formatDate(list.createdAt)} </small>
                                        <span>
                                            ${list.recommendations.length}
                                            recomendaciones
                                        </span>
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
                        ></recommendation-list-view>
                    `
                    : ""
                }

            </section>
        `;
    }
}

customElements.define(
    "inbox-view",
    InboxView
);
