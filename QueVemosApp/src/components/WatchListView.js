import { LitElement, html, css } from "lit";
import { WatchList } from "../domain/WatchList.js";
import { WatchListService } from "../services/WatchListService.js";
import { WatchListStorage } from "../storage/WatchListStorage.js";

import "./WatchItemView.js";
import "./AddItemForm.js";
import "./EditItemForm.js";

export class WatchListView extends LitElement {

    static styles = css`
        :host {
            display: block;
        }
            
        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        /* Lista */

        .list-header {
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

        /* -------------------------
        Botones
        ------------------------- */

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
        /* Móvil */

        @media (max-width: 768px) {
            .list-header {
                padding: 1rem 0.8rem 1.1rem;
            }

            .action-button {
                width: 32px;
                height: 32px;
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
            <link
                rel="stylesheet"
                href="/assets/icons/font-awesome-4.7.0/css/font-awesome.min.css"
            >
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
                        <div class="list-header">
                            <div class="hero-badge"> Mostrando todos los elementos </div>
                            <div class="list-actions">
                                <button
                                    class="action-button"
                                    title="Ordenar"
                                    disabled
                                >
                                    <i class="fa fa-sort-down"></i>
                                </button>
                                <button
                                    class="action-button"
                                    title="Filtrar"
                                    disabled
                                >
                                    <i class="fa fa-filter"></i>
                                </button>
                            </div>
                        </div>
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

customElements.define("watch-list-view", WatchListView);