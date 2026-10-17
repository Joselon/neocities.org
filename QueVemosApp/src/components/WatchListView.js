import { LitElement, html, css } from "lit";
import { WatchList } from "../domain/WatchList.js";
import { WatchListService } from "../services/WatchListService.js";
import { WatchListFileStorage } from "../storage/WatchListFileStorage.js";
import { RecommendationService } from "../services/RecommendationService.js";
import { RecommendationLinkCodec } from "../services/RecommendationLinkCodec.js";
import { WatchStatus } from "../domain/WatchStatus.js";
import { MediaType } from "../domain/MediaType.js";

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
        .savedlist-button {
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
        .savedlist-button:hover,
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

        
        .recommendation-bar {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;

            width: 100%;
            min-height: 4.5rem;
            padding: 0.65rem 1rem;
            padding-bottom: calc(
                0.65rem + env(safe-area-inset-bottom, 0px)
            );

            display: flex;
            align-items: center;
            justify-content: center;

            z-index: 100;

            background: rgba(46, 125, 50, 0.78);
            border-top: 1px solid rgba(129, 199, 132, 0.55);
            box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.22);

            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }

        .recommend-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.65rem;

            min-height: 42px;
            padding: 0.65rem 1.25rem;

            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 999px;

            background: #2e7d32;
            color: #fff;

            font-size: 0.95rem;
            font-weight: 600;

            cursor: pointer;

            transition:
                background 0.2s ease,
                transform 0.2s ease;
        }

        .recommend-button:hover {
            background: #388e3c;
            transform: translateY(-1px);
        }

        .recommend-button:active {
            transform: translateY(0);
        }

        .recommend-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            min-width: 22px;
            height: 22px;
            padding: 0 6px;

            border-radius: 999px;

            background: #fff;
            color: #2e7d32;

            font-size: 0.75rem;
            font-weight: 700;
        }


        .recommend-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            min-width: 20px;
            height: 20px;

            padding: 0 6px;

            border-radius: 10px;

            background: white;
            color: #333;

            font-size: 0.75rem;
            font-weight: bold;
        }
        .list-actions {
            display: flex;
            justify-content: center;
            gap: 0.6rem;
            position: relative;
        }

        .action-button.active {
            background: rgba(255, 107, 44, 0.25);
            border-color: var(--accent);
            color: var(--accent);
        }

        .filter-container {
            position: relative;
            display: inline-flex;
        }

        .filter-menu {
            position: absolute;
            top: calc(100% + 8px);
            right: 0;
            z-index: 20;

            display: flex;
            flex-direction: column;
            gap: 0.25rem;

            min-width: 180px;
            padding: 0.4rem;

            background: #292929;
            border: 1px solid var(--border);
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }

        .filter-option {
            padding: 0.65rem 0.8rem;

            border: none;
            border-radius: 8px;

            background: transparent;
            color: var(--text);

            text-align: left;
            cursor: pointer;
        }

        .filter-option:hover {
            background: rgba(255, 255, 255, 0.08);
        }

        .filter-option.selected {
            background: rgba(255, 107, 44, 0.18);
            color: var(--accent);
        }

        .filter-description {
            display: inline-block;
            margin-bottom: 0.7rem;
        }

        .filter-separator {
            height: 1px;
            margin: 0.35rem 0;
            background: var(--border);
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
            .savedlist-button {
                min-height: 32px;
                padding: 0.4rem 0.7rem;
            }
        }
    `;

    static properties = {
        watchList: { attribute: false },
        dataVersion: { type: Number },
        items: { state: true },
        editingItem: { state: true },
        listName: { state: true },
        addingItem: { type: Boolean },
        selectedItemsToShare: { state: true },
        linkCopied: { state: true },
        filters: { state: true },
        sortMode: { state: true },
        showFilterOptions: { state: true },
    };

    constructor() {
        super();

        this.watchList = undefined;
        this.service = undefined;
        this.items = [];
        this.listName = "";
    
        this.fileStorage = new WatchListFileStorage();
        this.recommendService = new RecommendationService();

        this.editingItem = undefined;
        this.addingItem = false;
        this.selectedItemsToShare = [];
        this.linkCopied = false;

        this.filters = {
            status: null,
            type: null
        };

        this.sortMode = "DEFAULT";
        this.showFilterOptions = false;
    }

    willUpdate(changedProperties) {
        if (changedProperties.has("watchList") && this.watchList) {
            this.service = new WatchListService(this.watchList);
        }
        if (
            this.service &&
            (
                changedProperties.has("watchList") ||
                changedProperties.has("dataVersion")
            )
        ) {
            this.listName = this.service.watchList.name;
            this.items = this.service.getItems();
        }
        
    }

    notifyWatchListChanged() {
        this.dispatchEvent(new CustomEvent("watch-list-changed", {
            detail: { watchList: this.service.watchList },
            bubbles: true,
            composed: true,
        }));
    }

    refreshItems() {
        this.items = [...this.service.getItems()];
        this.listName = this.service.watchList.name;
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
        
        this.items = this.service.getItems();
        this.notifyWatchListChanged();

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

    deleteItem(event) {
        const {mediaId} = event.detail;
        
        if (!confirm("¿Quieres eliminar este elemento de tu lista?")) {
            return;
        }
        const result = this.service.deleteItem(mediaId);

        if (!result.success) {
            console.error(result.error);
            return;
        }

        this.notifyWatchListChanged();
        this.items = this.service.getItems();

        this.editingItem = undefined;
    }

    saveItem(event) {
        const result = this.service.updateItem(event.detail);

        if (!result.success) {
            console.error(result.error);
            return;
        }

        this.notifyWatchListChanged();
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

        this.notifyWatchListChanged();
        this.items = [...this.service.getItems()];
    }

    toggleRecommendation(event) {

        const item = event.detail;

        const alreadySelected = this.selectedItemsToShare.some(
            selected => selected.media.id === item.media.id
        );

        if (alreadySelected) {

            this.selectedItemsToShare =
                this.selectedItemsToShare.filter(
                    selected => selected.media.id !== item.media.id
                );

            return;
        }

        this.selectedItemsToShare = [
            ...this.selectedItemsToShare,
            item
        ];
    }

    isSelectedToShare(item) {
        return this.selectedItemsToShare.some(
            selected => selected.media.id === item.media.id
        );
    }

    createRecommendationExchange() {

        if (this.selectedItemsToShare.length === 0) {
            return;
        }

        const watchItems = this.selectedItemsToShare.map(
            item => item.watchItem
        );

        const recommendationList =
            this.recommendService.createRecommendationList(
                this.service.watchList,
                watchItems
            );

        const exchange =
            this.recommendService.createRecommendationExchange(
                recommendationList,
                this.service.watchList
            );

        this.shareRecommendationExchange(exchange);

        //this.selectedItemsToShare = [];
    }

    async shareRecommendationExchange(exchange) {

        const codec = new RecommendationLinkCodec();

        const encodedData =  await codec.encode(exchange);

        const url = new URL(
            "https://joselon79.neocities.org/quevemos"
            //"http://localhost:5173/quevemos"
        );

        url.searchParams.set("recommendation",encodedData);

        try {   
            await navigator.clipboard.writeText(url.toString());

            this.linkCopied = true;

            setTimeout(() => {
                this.linkCopied = false;
            }, 2000);
        } catch (error) {
            console.error("No se pudo copiar el enlace:", error);
        }
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

        this.notifyWatchListChanged();
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

                this.listName = this.service.watchList.name;
                this.items = this.service.getItems();

                this.editingItem = undefined;
                this.notifyWatchListChanged();

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
        this.listName = this.service.watchList.name;
        this.items = this.service.getItems();
        this.notifyWatchListChanged();
    }

    getStatusLabel(status) {
        const labels = {
            [WatchStatus.PENDING]: "Pendientes",
            [WatchStatus.WATCHING]: "En curso",
            [WatchStatus.PAUSED]: "Pausadas",
            [WatchStatus.WATCHED]: "Vistas",
            [WatchStatus.DISCARDED]: "Descartadas"
        };

        return labels[status] ?? status;
    }

    getAvailableStatuses() {
        return Object.values(WatchStatus);
    }

    getVisibleItems() {
        let items = this.items.filter(item => {
            const status = item.watchItem.status;
            
            const matchesStatus = this.filters.status
                ? status === this.filters.status
                : status !== WatchStatus.DISCARDED;

            const matchesType =
                !this.filters.type ||
                item.media.type === this.filters.type;

            return matchesStatus && matchesType;
        });

        if (this.sortMode === "AZ") {
            items.sort((a, b) =>
                a.media.title.localeCompare(
                    b.media.title,
                    "es",
                    { sensitivity: "base" }
                )
            );
        } else if (this.sortMode === "ZA") {
            items.sort((a, b) =>
                b.media.title.localeCompare(
                    a.media.title,
                    "es",
                    { sensitivity: "base" }
                )
            );
        }

        return items;
    }

    getFilterDescription() {
        const descriptions = [];

        if (this.filters.type) {
            descriptions.push(
                this.getMediaTypeFilterLabel(this.filters.type)
            );
        }

        if (this.filters.status) {
            descriptions.push(this.getStatusLabel(this.filters.status));
        }

        if (descriptions.length === 0) {
            return "Mostrando todos los elementos";
        }

        return `Mostrando solo ${descriptions.join(" · ")}`;
    }

    toggleFilterOptions() {
        this.showFilterOptions = !this.showFilterOptions;
    }

    setStatusFilter(status) {
        this.filters = {
            ...this.filters,
            status
        };

        this.showFilterOptions = false;
    }

    toggleSort() {
        const nextMode = {
            DEFAULT: "AZ",
            AZ: "ZA",
            ZA: "DEFAULT"
        };

        this.sortMode = nextMode[this.sortMode];
    }

    getMediaTypeFilterLabel(type) {
        const labels = {
            [MediaType.MOVIE]: "Películas",
            [MediaType.SERIES]: "Series",
            [MediaType.VIDEOGAMES]: "Videojuegos",
        };

        return labels[type] ?? type;
    }

    getAvailableMediaTypes() {
        return Object.values(MediaType);
    }

    setMediaTypeFilter(type) {
        this.filters = {
            ...this.filters,
            type
        };

        this.showFilterOptions = false;
    }
        
    render() {
        const items = this.getVisibleItems();

        return html`
            <link
                rel="stylesheet"
                href="/assets/icons/font-awesome-4.7.0/css/font-awesome.min.css"
            >
            <div class="list-header">
                <div class="storage-actions">
                    <button
                        type="button"
                        class="savedlist-button"
                        @click=${this.exportWatchList}
                    >
                        <i class="fa fa-download"></i>
                        Exportar lista
                    </button>

                    <button
                        type="button"
                        class="savedlist-button"
                        @click=${this.importWatchList}
                    >
                        <i class="fa fa-upload"></i>
                        Importar lista
                    </button>

                    <button
                        type="button"
                        class="savedlist-button"
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
            
            ${this.items.length === 0
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
                            <div class="hero-badge filter-description">
                                ${this.getFilterDescription()}
                            </div>

                            <div class="list-actions">
                                <button
                                    type="button"
                                    class="action-button ${this.sortMode !== "DEFAULT" ? "active" : ""}"
                                    title=${
                                        this.sortMode === "DEFAULT"
                                            ? "Ordenar A-Z"
                                            : this.sortMode === "AZ"
                                                ? "Ordenar Z-A"
                                                : "Volver al orden original"
                                    }
                                    aria-label=${
                                        this.sortMode === "DEFAULT"
                                            ? "Orden original"
                                            : this.sortMode === "AZ"
                                                ? "Orden alfabético A-Z"
                                                : "Orden alfabético Z-A"
                                    }
                                    @click=${this.toggleSort}
                                >
                                    <i class=${
                                        this.sortMode === "DEFAULT"
                                            ? "fa fa-sort"
                                            : this.sortMode === "AZ"
                                                ? "fa fa-sort-alpha-asc"
                                                : "fa fa-sort-alpha-desc"
                                    }></i>
                                </button>

                                <div class="filter-container">
                                    <button
                                        type="button"
                                        class="action-button ${
                                            this.filters.status || this.filters.type ? "active" : ""
                                        }"
                                        title="Filtrar por estado"
                                        aria-label="Filtrar por estado"
                                        aria-expanded=${this.showFilterOptions}
                                        @click=${this.toggleFilterOptions}
                                    >
                                        <i class="fa fa-filter"></i>
                                    </button>

                                    ${this.showFilterOptions
                                        ? html`
                                            <div class="filter-menu">
                                                <button
                                                    type="button"
                                                    class="filter-option ${
                                                        !this.filters.status ? "selected" : ""
                                                    }"
                                                    @click=${() => this.setStatusFilter(null)}
                                                >
                                                    Todos los estados (excepto Descartadas)
                                                </button>

                                                ${this.getAvailableStatuses().map(status => html`
                                                    <button
                                                        type="button"
                                                        class="filter-option ${
                                                            this.filters.status === status ? "selected" : ""
                                                        }"
                                                        @click=${() => this.setStatusFilter(status)}
                                                    >
                                                        ${this.getStatusLabel(status)}
                                                    </button>
                                                `)}

                                                <div class="filter-separator"></div>

                                                <button
                                                    type="button"
                                                    class="filter-option ${
                                                        !this.filters.type ? "selected" : ""
                                                    }"
                                                    @click=${() => this.setMediaTypeFilter(null)}
                                                >
                                                    Todos los tipos
                                                </button>

                                                ${this.getAvailableMediaTypes().map(type => html`
                                                    <button
                                                        type="button"
                                                        class="filter-option ${
                                                            this.filters.type === type ? "selected" : ""
                                                        }"
                                                        @click=${() => this.setMediaTypeFilter(type)}
                                                    >
                                                        ${this.getMediaTypeFilterLabel(type)}
                                                    </button>
                                                `)}
                                            </div>
                                        `
                                        : ""
                                    }
                                </div>
                            </div>
                        </div>

                        ${items.length === 0
                            ? html`
                                <p class="empty">
                                    No hay elementos que coincidan con el filtro.
                                </p>
                            `
                            : items.map(item => {
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
                                                        @delete-item=${this.deleteItem}
                                                    ></edit-item-form>
                                                </div>
                                            `
                                            : html`
                                                <div class="edit-transition">
                                                    <watch-item-view
                                                        .media=${item.media}
                                                        .watchItem=${item.watchItem}
                                                        .selectedToShare=${this.isSelectedToShare(item)}
                                                        @edit-item=${this.editItem}
                                                        @change-status=${this.changeStatus}
                                                        @toggle-recommendation=${this.toggleRecommendation}
                                                    ></watch-item-view>
                                                </div>
                                            `
                                        }
                                    </div>
                                `;
                            })
                        }
                        ${this.selectedItemsToShare.length > 0
                            ? html`
                                <div class="recommendation-bar">
                                    <button
                                        class="recommend-button"
                                        title="Recomendar seleccionados"
                                        @click=${this.createRecommendationExchange}
                                    >
                                        <i class="fa fa-share-alt"></i>
                                        <span>Recomendar</span>
                                        <span class="recommend-badge">
                                            ${this.selectedItemsToShare.length}
                                        </span>
                                        ${this.linkCopied
                                            ? html`
                                                <div class="toast-overlay">
                                                    <div class="toast">
                                                        <span>✓</span>
                                                        Enlace copiado
                                                    </div>
                                                </div>
                                            `
                                            : ""
                                        }
                                    </button>
                                </div>
                            `
                            : ""
                        }

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
}

customElements.define("watch-list-view", WatchListView);