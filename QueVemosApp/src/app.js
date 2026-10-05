import { LitElement, html, css } from "lit";
import { WatchList } from "./domain/WatchList.js";
import { WatchListService } from "./services/WatchListService.js";
import { WatchListStorage } from "./storage/WatchListStorage.js";

import "./components/AppHeader.js";
import "./components/AppFooter.js";
import "./components/WatchItemView.js";
import "./components/AddItemForm.js";
import "./components/EditItemForm.js";

export class App extends LitElement {
    static styles = css`
        :host {
            display: block;
            min-height: 100vh;
            box-sizing: border-box;

            --bg: #111111;
            --surface: rgba(38, 38, 38, 0.92);
            --surface-strong: rgba(58, 58, 58, 0.97);
            --accent: #ff6b2c;
            --accent-2: #ff9a3c;
            --text: #f8f2ea;
            --muted: #d7c8bb;
            --border: rgba(255, 255, 255, 0.16);

            color: var(--text);
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;

            background:
                radial-gradient(
                    circle at top left,
                    rgba(255, 107, 44, 0.28),
                    transparent 22%
                ),
                linear-gradient(
                    135deg,
                    #111111 0%,
                    #1e1e1e 100%
                );

            padding: 20px 16px 40px;
        }

        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        a {
            color: var(--text);
            text-decoration: none;
            transition:
                color 0.2s ease,
                transform 0.2s ease,
                box-shadow 0.2s ease;
        }

        a:hover {
            color: #ffffff;
        }

        /* Contenido */

        main {
            margin-top: 24px;
        }

        .content {
            background: var(--surface);

            border-radius: 20px;
            border: 1px solid var(--border);

            padding: 1.2rem 1.2rem 1.4rem;

            box-shadow:
                0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .content h2 {
            margin: 0 0 1rem;
            text-align: center;
        }

        /* Lista */

        header {
            background:
                linear-gradient(
                    135deg,
                    rgba(70, 70, 70, 0.95),
                    rgba(35, 35, 35, 0.95)
                );

            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 1.1rem 1.3rem 1.3rem;
            box-shadow:
                0 10px 30px rgba(0, 0, 0, 0.25);

            text-align: center;
        }

        .hero-badge {
            display: inline-block;
            margin-bottom: 0.5rem;
            padding: 0.35rem 0.8rem;

            border-radius: 999px;

            background: rgba(255, 107, 44, 0.18);
            color: #ffd7bf;

            font-size: 0.82rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
        }

        .media-list {
            display: flex;
            flex-direction: column;
            gap: 0.9rem;
        }

        
        .empty {
            margin: 1rem 0 0;
            padding: 1rem;

            border-radius: 14px;

            background: rgba(255, 255, 255, 0.06);
            color: var(--muted);

            text-align: center;
        }

        .item-container {
            position: relative;
        }

        .edit-transition {
            animation: edit-in 0.25s ease;
        }

        @keyframes edit-in {
            from {
                opacity: 0;
                transform: translateY(8px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Móvil */

        @media (max-width: 768px) {
            :host {
                padding: 12px 10px 28px;
            }

            .content {
                padding: 1rem 0.8rem 1.2rem;
            }

            header {
                padding: 1rem 0.8rem 1.1rem;
            }

        }
    `;

    static properties = {
        items: { state: true },
        editingItem: { state: true }
    };
    
    constructor() {
        super();
        
        this.items = [];
        const watchListStorage = new WatchListStorage(localStorage);
        const watchList = watchListStorage.load();

        this.service = new WatchListService(watchList);
        this.storage = watchListStorage;
        this.items = this.service.getItems();

        this.editingItem = undefined;
    }



    render() {
        const items = this.items;

        return html`
            <app-header></app-header>

            <main>
                <section class="content">

                    <div class="storage-actions">
                        <button @click=${this.resetWatchList}>
                            Reset
                        </button>
                    </div>

                    <h2>${this.service.watchList.name}</h2>

                    <br/>

                    ${!this.editingItem
                        ? html`
                            <add-item-form
                                @add-item=${this.addItem}
                            ></add-item-form>
                        `
                        : ""
                    }

                    <br/>

                    ${items.length === 0
                        ? html`
                            <p class="empty">
                                La lista está vacía.
                            </p>
                        `
                        : html`
                            <div class="media-list">
                                <header>
                                    <div class="hero-badge"> Mostrando todos los elementos </div>
                                </header>
                                ${items.map(item => {

                                    const isEditing =
                                        this.editingItem?.media.id === item.media.id;

                                    return html`
                                        <div class="item-container">

                                            ${isEditing
                                                ? html`
                                                    <div class="edit-transition">
                                                        <edit-item-form
                                                            .media=${item.media}
                                                            .watchItem=${item.watchItem}
                                                            @save-item=${this.saveItem}
                                                            @cancel-edit=${this.cancelEdit}
                                                        ></edit-item-form>
                                                    </div>
                                                `
                                                : html`
                                                    <div class="edit-transition">
                                                        <watch-item-view
                                                            .media=${item.media}
                                                            .watchItem=${item.watchItem}
                                                            @edit-item=${this.editItem}
                                                            @change-status=${this.changeStatus}
                                                        ></watch-item-view>
                                                    </div>
                                                `
                                            }

                                        </div>
                                    `;
                                })}

                            </div>
                        `
                    }

                </section>
            </main>

            <app-footer></app-footer>
        `;
    }


    addItem(event) {
        const { title, type } = event.detail;

        if (!title) {
            return;
        }

        const result = this.service.addItem(event.detail);

        if (!result.success) {
            console.error(result.error);
            return;
        }
        this.storage.save(this.service.watchList);
        this.items = this.service.getItems();

        event.target.resetForm();
    }

    editItem(event) {
        this.editingItem = event.detail;
    }

    cancelEdit() {
        this.editingItem = undefined;
    }

    saveItem(event) {
        const result = this.service.updateItem(event.detail);

        if (!result.success) {
            console.error(result.error);
            return;
        }

        this.storage.save(this.service.watchList);

        this.items = this.service.getItems();

        this.editingItem = undefined;
    }

    changeStatus(event) {
        console.log("changeStatus", event.detail);
        const result = this.service.changeStatus(
            event.detail.mediaId,
            event.detail.status
        );

        if (!result.success) {
            console.error(result.error);
            return;
        }

        this.storage.save(this.service.watchList);

        this.items = [...this.service.getItems()];

        console.log("nuevo estado:", event.detail.status);
    }

    resetWatchList() {
        const confirmed = confirm(
            "Se perderán todos los datos de la lista. ¿Deseas continuar?"
        );

        if (!confirmed) {
            return;
        }

        const watchList = new WatchList({
            name: "Mi nueva lista"
        });

        this.service = new WatchListService(watchList);
        this.storage.save(watchList);
        this.items = this.service.getItems();
    }
}

customElements.define("quevemos-app", App);
