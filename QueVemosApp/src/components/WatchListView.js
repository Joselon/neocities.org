import { LitElement, html, css } from "lit";
import { WatchList } from "../domain/WatchList.js";
import { WatchListService } from "../services/WatchListService.js";
import { WatchListStorage } from "../storage/WatchListStorage.js";
import { WatchListFileStorage } from "../storage/WatchListFileStorage.js";

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

        .add-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-top: 1.5rem;
            padding: 1rem;
        }

        .add-item-button {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 64px;
            height: 64px;

            border: 2px solid var(--accent);
            border-radius: 50%;

            background: rgba(255, 107, 44, 0.15);
            color: var(--accent);

            font-size: 1.8rem;

            cursor: pointer;

            transition:
                background 0.2s ease,
                transform 0.2s ease;
        }

        .add-item-button:hover {
            background: rgba(255, 107, 44, 0.25);
            transform: scale(1.05);
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
        editingItem: { state: true },
        listName: { state: true },
        addingItem: { type: Boolean }
    };

    constructor() {
        super();
                
        this.items = [];
        const watchListStorage = new WatchListStorage(localStorage);
        const watchList = watchListStorage.load();
        const watchListFileStorage = new WatchListFileStorage();

        this.service = new WatchListService(watchList);
        this.listName = this.service.watchList.name;
        this.items = this.service.getItems();
        this.storage = watchListStorage;
        this.fileStorage = watchListFileStorage;

        this.editingItem = undefined;
        this.addingItem = false;
    }
    
    render() {
        const items = this.items;

        return html`
            <link
                rel="stylesheet"
                href="/assets/icons/font-awesome-4.7.0/css/font-awesome.min.css"
            >
            <div class="list-header">
                <div class="storage-actions">
                    <button
                        type="button"
                        @click=${this.exportWatchList}
                    >
                        <i class="fa fa-download"></i>
                        Exportar lista
                    </button>

                    <button
                        type="button"
                        @click=${this.importWatchList}
                    >
                        <i class="fa fa-upload"></i>
                        Importar lista
                    </button>

                    <button
                        type="button"
                        @click=${this.resetWatchList}
                    >
                        <i class="fa fa-refresh"></i>
                        Reset
                    </button>
                </div>
                <h2>${this.listName} <button
                        type="button"
                        class="action-button"
                        title="Editar Nombre de la lista"
                        @click=${this.editListName}
                    >
                        <i class="fa fa-pencil"></i>
                    </button>
                </h2>
            </div>
            
            ${items.length === 0
                ? html`
                    <p class="empty">
                        La lista está vacía.
                    </p>
                    <div class= "add-item">
                    ${this.addingItem
                        ? html`
                            <add-item-form
                                @add-item=${this.addItem}
                            ></add-item-form>
                            <button
                                type="button"
                                class="add-item-button"
                                title="Ocultar Añadir elemento"
                                @click=${this.hideAddItemForm}
                            >
                                <i class="fa fa-minus"></i>
                            </button>
                        `
                        : html`
                            <button
                                type="button"
                                class="add-item-button"
                                title="Añadir elemento"
                                @click=${this.showAddItemForm}
                            >
                                <i class="fa fa-plus"></i>
                            </button>
                        `
                    }

                    </div> 
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
                                    <i class="fa fa-sort-alpha-desc"></i>
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

                        ${!this.editingItem
                            ? html`
                            <div class= "add-item">
                                ${this.addingItem
                                    ? html`
                                        <add-item-form
                                            @add-item=${this.addItem}
                                        ></add-item-form>
                                        <button
                                            type="button"
                                            class="add-item-button"
                                            title="Ocultar Añadir elemento"
                                            @click=${this.hideAddItemForm}
                                        >
                                            <i class="fa fa-minus"></i>
                                        </button>
                                    `
                                    : html`
                                        <button
                                            type="button"
                                            class="add-item-button"
                                            title="Añadir elemento"
                                            @click=${this.showAddItemForm}
                                        >
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    `
                                }

                            </div>
                            `
                            : ""
                        }

                    </div>
                    
                `
            }
        `;
    }

    showAddItemForm() {
        this.addingItem = true;
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
        this.hideAddItemForm();
    }

    hideAddItemForm() {
        this.addingItem = false;
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
    }

    editListName() {
        const newName = prompt(
            "Ingrese el nuevo nombre para la lista:",
            this.service.watchList.name
        );

        if (!newName) {
            return;
        }

        const result = this.service.renameWatchList(newName);

        if (!result.success) {
            console.error(result.error);
            return;
        }

        this.storage.save(this.service.watchList);
        this.listName = this.service.watchList.name;
    }

    exportWatchList() {

        const json = this.fileStorage.export(
            this.service.watchList
        );

        const blob = new Blob(
            [json],
            { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "quevemos-watchlist.json";

        link.click();

        URL.revokeObjectURL(url);
    }

    importWatchList() {

        const confirmed = confirm(
            "La lista actual será sustituida por la lista importada. ¿Deseas continuar?"
        );

        if (!confirmed) {
            return;
        }

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

                const watchList =
                    this.fileStorage.import(json);

                this.service =
                    new WatchListService(watchList);

                this.storage.save(watchList);

                this.listName = this.service.watchList.name;
                this.items = this.service.getItems();

                this.editingItem = undefined;

            } catch (error) {

                console.error(error);

                alert(
                    `No se pudo importar la lista:\n${error.message}`
                );
            }
        });

        input.click();
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
        this.listName = this.service.watchList.name;
        this.items = this.service.getItems();
    }
}

customElements.define("watch-list-view", WatchListView);