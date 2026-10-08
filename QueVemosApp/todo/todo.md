# QueVemosApp Codigo a revisar

## RecommendationService.js

```js
import { WatchList } from "../domain/WatchList.js";
import { WatchItem } from "../domain/WatchItem.js";
import { Recommendation } from "../domain/Recommendation.js";
import { RecommendationList } from "../domain/RecommendationList.js";
import { RecommendationStatus } from "../domain/RecommendationStatus.js";
import { RecommendationExchange } from "../domain/RecommendationExchange.js";

export class RecommendationService {

    createRecommendation(watchList, watchItem){

        if(!watchList.watchItems.some(item => item === watchItem)){
            throw new Error("WatchItem is not in WatchList");
        }

        return new Recommendation({
            mediaId: watchItem.mediaId,
            platforms: [...watchItem.platforms],
            spanishAudio: watchItem.spanishAudio,
            spanishSubtitles: watchItem.spanishSubtitles,
            reason: watchItem.reason,
            recommenderRating: watchItem.userRating
        });
    }

    createRecommendationList(watchList, watchItems){

        const recommendations = watchItems.map(
            item => this.createRecommendation(watchList, item)
        );

        return new RecommendationList({
            name: "Recomendaciones desde : " + watchList.name,
            recommendations
        });
    }

    createRecommendationExchange(recommendationList, watchList) {

        const items = recommendationList.recommendations.map(
            recommendation => {

                const media = watchList.media.find(
                    media => media.id === recommendation.mediaId
                );

                if (!media) {
                    throw new Error(
                        `Media not found in WatchList: ${recommendation.mediaId}`
                    );
                }

                return {
                    media: {
                        id: media.id,
                        title: media.title,
                        originalTitle: media.originalTitle,
                        type: media.type,
                        year: media.year,
                        runtimeMinutes: media.runtimeMinutes,
                        genres: [...media.genres],
                        omdbId: media.omdbId,
                        poster: media.poster,
                        ratings: media.ratings,
                        matchKey: media.matchKey
                    },
                    recommendation
                };
            }
        );

        return new RecommendationExchange({
            sender: watchList.name,
            items
        });
    }

    prepareComparison(recommendationExchange, watchList) {

        if (!watchList) {
            throw new Error("No WatchList loaded");
        }

        return {
            recommendationExchange,
            watchList
        };
    }

    compareRecommendations(recommendationExchange, watchList) {

        return recommendationExchange.items.map(
            exchangeItem => {

                const candidates =
                    this.findMediaCandidates(
                        exchangeItem.media,
                        watchList
                    );


                let status = "new";

                if (candidates.some(candidate =>
                    candidate.matches.includes("omdbId")
                )) {
                    status = "matched";
                }
                else if (candidates.length > 0) {
                    status = "candidate";
                }

                return {
                    exchangeItem,
                    matches: candidates,
                    status
                };
            }
        );
    }

    findMediaCandidates(exchangeMedia, watchList){

       const candidates = [];

       for (const media of watchList.media) {

            const matches = [];

            if (exchangeMedia.omdbId && media.omdbId && exchangeMedia.omdbId === media.omdbId) {
                    matches.push("omdbId");
            }

            if (exchangeMedia.matchKey === media.matchKey) {
                matches.push("matchKey");
            }

            const exchangeTitle = exchangeMedia.title.trim().toLowerCase();
            const mediaTitle = media.title.trim().toLowerCase();

            const titleMatches =
                exchangeTitle !== mediaTitle &&
                (
                    exchangeTitle.includes(mediaTitle) ||
                    mediaTitle.includes(exchangeTitle)
                );

            if (titleMatches) {
                matches.push("partialTitle");
            }
  
            if (matches.length > 0) {
                candidates.push({
                    media,
                    matches,
                    differences: this.compareMedia(
                        exchangeMedia,
                        media
                    )
                });
            }
        }

        return candidates;
    }

    compareMedia(exchangeMedia, media) {

        const differences = [];

        const fieldsToCompare = [
            "title",
            "originalTitle",
            "type",
            "year",
            "runtimeMinutes",
            "genres",
            "poster"
        ];

        for (const field of fieldsToCompare) {

            if (
                JSON.stringify(exchangeMedia[field]) !==
                JSON.stringify(media[field])
            ) {
                differences.push(field);
            }
        }

        if (
            !media.omdbId &&
            exchangeMedia.omdbId
        ) {
            differences.push("omdbId");
        }

        return differences;
    }

    acceptRecommendation(exchangeItem, recommendationList, watchList) {

        const { recommendation } = exchangeItem;

        const media = watchList.media.find(
            item => item.id === recommendation.mediaId
        );

        if (!media) {
            throw new Error("Media not found in WatchList");
        }

        const reasonParts = [
            recommendationList.name
        ];

        if (recommendation.recommenderRating !== undefined) {
            reasonParts[0] += ` | (Nota: ${recommendation.recommenderRating})`;
        }

        if (recommendation.reason) {
            reasonParts.push(recommendation.reason);
        }

        const watchItem = new WatchItem({
            mediaId: media.id,
            platforms: recommendation.platforms,
            spanishAudio: recommendation.spanishAudio,
            spanishSubtitles: recommendation.spanishSubtitles,
            reason: reasonParts.join(" | ")
        });

        watchList.watchItems.push(watchItem);

        recommendation.status = RecommendationStatus.ACCEPTED;

        return watchItem;
    }

    discardRecommendation(recommendation) {

        recommendation.status = RecommendationStatus.DISCARDED;

        return recommendation;
    }
}
```

## RecommendationExchange.js

```js
import { DATA_VERSION } from "../data/version.js";

export class RecommendationExchange {

    constructor({
        version = DATA_VERSION,
        createdAt = new Date().toISOString(),
        sender,
        items = []
    } = {}) {

        this.version = RecommendationExchange.validateVersion(version);
        this.createdAt = createdAt;
        this.sender = RecommendationExchange.validateSender(sender);
        this.items = RecommendationExchange.validateItems(items);
    }

    static validateVersion(version) {

        if (
            !Number.isInteger(version) ||
            version < 1 ||
            version > DATA_VERSION
        ) {
            throw new Error("Unsupported RecommendationExchange version");
        }

        return version;
    }

    static validateSender(sender) {

        if (!sender || typeof sender !== "string") {
            throw new Error("sender is required");
        }

        return sender;
    }

    static validateItems(items) {

        if (!Array.isArray(items)) {
            throw new Error("items is not an array");
        }

        return items;
    }
}
```

## Recommendation.js

```js
import { RecommendationStatus } from "./RecommendationStatus.js";

export class Recommendation {

    constructor({
        id = Recommendation.generateId(),
        mediaId,
        platforms = [],
        spanishAudio = false,
        spanishSubtitles = false,
        reason = undefined,
        recommenderRating = undefined,
        status = RecommendationStatus.PENDING
    }) {
        this.id = id;
        this.mediaId = Recommendation.validateMediaId(mediaId);
        this.platforms = platforms;
        this.spanishAudio = spanishAudio;
        this.spanishSubtitles = spanishSubtitles;
        this.reason = reason;
        this.status = Recommendation.validateStatus(status);
        this.recommenderRating = recommenderRating;
    }

    static generateId() {
        return crypto.randomUUID();
    }

    static validateMediaId(mediaId) {
        if (!mediaId || typeof mediaId !== "string") {
            throw new Error("mediaId is required");
        }

        return mediaId;
    }

    static validateStatus(status) {
        if (!Object.values(RecommendationStatus).includes(status)) {
            throw new Error("Invalid recommendation status");
        }
        return status;
    }
}
```

## RecommendationList.js

```js
import {DATA_VERSION} from "../data/version.js"
import { Recommendation } from "./Recommendation.js";

export class RecommendationList {

    constructor({
        id =  RecommendationList.generateId(),
        name = undefined,
        recommendations = undefined, //Recommendation[]
        version = DATA_VERSION,
        createdAt = new Date().toISOString(),
    } = {}) {
        this.id = id;
        this.name = RecommendationList.validateName(name);
        this.recommendations = RecommendationList.validatesRecommendations(recommendations);
        this.version = RecommendationList.validateVersion(version);
        this.createdAt = createdAt;
    }

    static generateId() {
        return crypto.randomUUID();
    }

    static validateName(name) {
        if (!name || typeof name !== "string") {
            throw new Error("name is required");
        }

        return name;
    }

    static validatesRecommendations(recommendations) {
        if(!recommendations){
            recommendations = [];
        }
        if (!Array.isArray(recommendations)) {
            throw new Error("recommendations is not an array");
        }
        recommendations.forEach(item => {
            if (!(item instanceof Recommendation)) {
                throw new Error("recommendations must contain only Recommendation");
            }
        });
        return recommendations;
    }

    static validateVersion(version) {
        if (
            !Number.isInteger(version) ||
            version < 1 ||
            version > DATA_VERSION
        ) {
            throw new Error("Unsupported recommendation list version");
        }

        return version;
    }
}
```

## WatchItemView.js

```js
import { LitElement, html, css } from "lit";
import settings from "../data/setting.json";
import { WatchStatus } from "../domain/WatchStatus.js";


export class WatchItemView extends LitElement {

    static styles = css`
        :host {
            display: block;
        }

        :host(.overlay-open) {
            position: relative;
            z-index: 10;
        }
            
        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        .media-card {
            position: relative;

            display: grid;
            grid-template-columns: 180px minmax(0, 1fr);

            overflow: visible;

            border: 2px solid rgba(250, 62, 0, 0.7);
            border-radius: 18px;

            background:
                linear-gradient(
                    135deg,
                    rgba(202, 155, 121, 0.96),
                    rgba(161, 114, 89, 0.96)
                );

            box-shadow:
                0 10px 24px rgba(0, 0, 0, 0.2);

            transition:
                transform 0.2s ease,
                box-shadow 0.2s ease;
        }

        .media-card:hover {
            transform: translateY(-3px);

            box-shadow:
                0 14px 30px rgba(0, 0, 0, 0.25);
        }

        #overlay {
            display: none;
            position: absolute;
            z-index: 1;
            top: 3.8rem;
            right: 1.2rem;

            width: 280px;
            max-width: calc(100vw - 2rem);

            background: var(--surface-strong);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 1rem;

            color: var(--text);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }

        #overlay.opened {
            display: block;
        }           

        /* -------------------------
        Poster
        ------------------------- */

        .poster {
            display: flex;
            align-items: center;
            justify-content: center;

            padding: 1rem;

            background: rgba(0, 0, 0, 0.12);
        }

        .poster img {
            display: block;

            width: 100%;
            max-width: 150px;
            height: auto;

            border-radius: 10px;

            object-fit: cover;

            box-shadow:
                0 6px 16px rgba(0, 0, 0, 0.25);
        }

        .poster-placeholder {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 100%;
            max-width: 150px;
            aspect-ratio: 2 / 3;

            border-radius: 10px;

            background: rgba(0, 0, 0, 0.18);

            color: rgba(255, 255, 255, 0.7);

            font-size: 2.5rem;
        }

        /* -------------------------
        Información
        ------------------------- */

        .media-content {
            display: flex;
            flex-direction: column;

            min-width: 0;
        }

        .information {
            position: relative;
            padding: 1rem 1.2rem;

            flex: 1;
        }

        .information-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            gap: 1rem;
        }

        .information-header h3 {
            margin: 0;

            color: #ffffff;

            font-size: 1.15rem;
        }

        .information-actions {
            display: flex;
            gap: 0.4rem;

            flex-shrink: 0;
        }

        /* -------------------------
        Metadatos
        ------------------------- */

        .metadata {
            display: flex;
            flex-wrap: wrap;

            gap: 0.4rem;

            margin-top: 0.5rem;
        }

        .metadata span,
        .platform {
            display: inline-flex;
            align-items: center;

            padding: 0.25rem 0.55rem;

            border-radius: 999px;

            background: rgba(255, 255, 255, 0.12);

            color: var(--text);

            font-size: 0.74rem;
        }

        .platforms {
            display: flex;
            flex-wrap: wrap;

            gap: 0.4rem;

            margin-top: 0.6rem;
        }

        .genres {
            display: flex;
            flex-wrap: wrap;
            gap: .25rem .5rem;
            margin-top: .5rem;
        }

        .genre {
            font-size: .72rem;
            color: var(--muted);
            white-space: nowrap;
        }

        .genre:not(:last-child)::after {
            content: " ·";
        }

        /* -------------------------
        Barra inferior
        ------------------------- */
        .share-button {
            position: absolute;
            top: 0.8rem;
            left: 0.8rem;
            z-index: 2;

            display: flex;
            align-items: center;
            justify-content: center;

            width: 38px;
            height: 38px;

            padding: 0;

            border: 1px solid rgba(255, 255, 255, 0.35);
            border-radius: 50%;

            background: rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(3px);

            color: #ffffff;

            font-size: 1rem;

            cursor: pointer;

            transition:
                background 0.2s ease,
                transform 0.2s ease;
        }

        .share-button:hover {
            background: rgba(0, 0, 0, 0.65);
            transform: scale(1.05);
        }

        .media-actions {
            display: flex;
            align-items: center;
            justify-content: space-between;

            gap: 1rem;

            padding: 0.65rem 1rem;

            border-top: 1px solid rgba(255, 255, 255, 0.18);

            background: rgba(0, 0, 0, 0.16);
        }

        .status {
            display: inline-flex;
            align-items: center;

            padding: 0.35rem 0.7rem;

            border-radius: 999px;

            color: #ffffff;

            font-size: 0.8rem;
            font-weight: 600;
        }

        .status-pending {
            background: rgba(255, 193, 7, 0.35);
        }

        .status-watching {
            background: rgba(40, 167, 69, 0.45);
        }

        .status-paused {
            background: rgba(255, 152, 0, 0.45);
        }

        .status-watched {
            background: rgba(0, 123, 255, 0.45);
        }

        .status-discarded {
            background: rgba(220, 53, 69, 0.45);
        }

        .status-actions {
            display: flex;
            align-items: center;

            gap: 0.4rem;
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

        /* -------------------------
        Móvil
        ------------------------- */

        @media (max-width: 650px) {

            .media-card {
                grid-template-columns: 110px minmax(0, 1fr);
            }

            .poster {
                padding: 0.65rem;
            }

            .information {
                padding: 0.8rem;
            }

            .information-header h3 {
                font-size: 1rem;
            }

            .media-actions {
                padding: 0.55rem 0.7rem;
            }

            .action-button {
                width: 32px;
                height: 32px;
            }
        }
    `;

    static properties = {
        media: { type: Object },
        watchItem: { type: Object },
        overlayOpened: { type: Boolean }
    };

    static getCatalogName(catalog, id) {
        const item = catalog.find(item => item.id === id);
        return item?.name ?? id;
    }

    constructor() {
        super();

        this.overlayOpened = false;
    }

    editItem() {
        this.dispatchEvent(new CustomEvent("edit-item", {
            detail: {
                media: this.media,
                watchItem: this.watchItem
            },
            bubbles: true,
            composed: true
        }));
    }

    changeStatus(status) {
        this.dispatchEvent(new CustomEvent("change-status", {
            detail: {
                mediaId: this.media.id,
                status
            },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        if (!this.media || !this.watchItem) {
            return html``;
        }
        
        const statusName = WatchItemView.getCatalogName(
            settings.watchStatuses,
            this.watchItem.status
        );

        const statusClass = `status-${this.watchItem.status}`;

        return html`
            <link
                rel="stylesheet"
                href="/assets/icons/font-awesome-4.7.0/css/font-awesome.min.css"
            >
           
            <article class="media-card">

                <div class="poster">
                    ${this.media.poster
                        ? html`
                            <img
                                src=${this.media.poster}
                                alt="Cartel de ${this.media.title}"
                            >
                        `
                        : html`
                            <div class="poster-placeholder">
                                <i class="fa fa-film"></i>
                            </div>
                        `
                    }
                </div>
                <!-- ToDo: Seleccionar para compartir -->
                <button
                    class="share-button"
                    title="Recomendar"
                    disabled
                >
                    <i class="fa fa-share-alt"></i>
                </button>

                <div class="media-content">
                    
                    <div class="information">
                        ${this.renderInformation()}
                    </div>

                    <div class="media-actions">
                    ${statusName
                        ? html`
                            <div class="status ${statusClass}">
                                ${statusName}
                            </div>
                        `
                        : ""
                    }
                        <div class="status-actions">
                            ${this.renderStatusActions()}
                        </div>
                    </div>
                </div>
                
            </article>
        `;
    }

    renderInformation() {
        const typeName = WatchItemView.getCatalogName(
            settings.mediaTypes,
            this.media.type
        );

        const genres = this.media.genres.map(
            genreId => WatchItemView.getCatalogName(
                settings.genres,
                genreId
            )
        );
        const platforms = this.watchItem.platforms.map(
            platformId => WatchItemView.getCatalogName(
                settings.platforms,
                platformId
            )
        );

        return html`
                    <div class="information-header">
                        <h3>
                            ${this.media.title}
                        </h3>
   
                        <div class="information-actions">
                            <button
                                type="button"
                                class="action-button"
                                title="Información"
                                id="trigger"
                                @click=${this.showInformation}
                            >
                                <i class="fa fa-info-circle"></i>
                            </button>
                            
                            <button
                                type="button"
                                class="action-button"
                                title="Editar"
                                @click=${this.editItem}
                            >
                                <i class="fa fa-pencil"></i>
                            </button>
                        </div>
                    </div>

                    <div id="overlay" class="${this.overlayOpened ? "opened" : ""}">
                            
                        ${this.watchItem.reason
                            ? html`
                                <div class="overlay-section">
                                    <strong>Motivo</strong>
                                    <p>${this.watchItem.reason}</p>
                                </div>
                            `
                            : ""
                        }

                        <div class="overlay-section">
                            <strong>Audio</strong>
                            <span>
                                ${this.watchItem.spanishAudio
                                    ? "Español"
                                    : "Original"
                                }
                            </span>
                        </div>

                        <div class="overlay-section">
                            <strong>Subtítulos</strong>
                            <span>
                                ${this.watchItem.spanishSubtitles
                                    ? "Español"
                                    : "No"
                                }
                            </span>
                        </div>

                        ${this.watchItem.userRating !== undefined
                            ? html`
                                <div class="overlay-section">
                                    <strong>Mi valoración</strong>
                                    <span>${this.watchItem.userRating} / 10</span>
                                </div>
                            `
                            : ""
                        }

                        ${this.media.ratings
                            ? html`
                                <div class="overlay-section">
                                    <strong>Valoraciones</strong>
                                    <span>
                                        ${this.media.ratings.imdb
                                            ? `IMDb: ${this.media.ratings.imdb}`
                                            : ""
                                        }
                                        ${this.media.ratings.metascore
                                            ? ` · Metascore: ${this.media.ratings.metascore}`
                                            : ""
                                        }
                                    </span>
                                </div>
                            `
                            : ""
                        }

                        ${this.watchItem.addedAt
                            ? html`
                                <div class="overlay-section">
                                    <strong>Añadida</strong>
                                    <span>${this.formatDate(this.watchItem.addedAt)}</span>
                                </div>
                            `
                            : ""
                        }

                        ${this.watchItem.watchedAt
                            ? html`
                                <div class="overlay-section">
                                    <strong>Vista</strong>
                                    <span>${this.formatDate(this.watchItem.watchedAt)}</span>
                                </div>
                            `
                            : ""
                        }

                        ${this.watchItem.progress
                            ? html`
                                <div class="overlay-section">
                                    <strong>Progreso</strong>
                                    <span>${this.renderProgress()}</span>
                                </div>
                            `
                            : ""
                        }
                        
                    </div>

                    <div class="metadata">



                        <span class="media-type">${typeName}</span>
                        ${this.media.year
                            ? html`<span>${this.media.year}</span>`
                            : ""
                        }
                        ${this.media.runtimeMinutes
                            ? html`
                                <span>
                                    ${this.media.runtimeMinutes} min
                                </span>
                            `
                            : ""
                        }
                    </div>
                    

                    ${genres.length
                        ? html`
                            <div class="genres">
                                ${genres.map(
                                    genre => html`
                                        <span class="genre">${genre}</span>
                                    `
                                )}
                            </div>
                        `
                        : ""
                    }

                    ${platforms.length
                        ? html`
                            <div class="platforms">
                                <i class="fa fa-tv"></i> ${platforms.join(" · ")}
                            </div>
                        `
                        : ""
                    }
                </div>
        `;
    }

    showInformation() {
        this.overlayOpened = !this.overlayOpened;

        this.classList.toggle(
            "overlay-open",
            this.overlayOpened
        );
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString("es-ES");
    }
    renderProgress() {
        const progress = this.watchItem.progress;

        if (!progress) {
            return "";
        }

        if (progress.minute !== undefined) {
            return `${progress.minute} min`;
        }

        if (
            progress.season !== undefined &&
            progress.episode !== undefined
        ) {
            return `Temporada ${progress.season}, episodio ${progress.episode}`;
        }

        return "";
    }
    renderStatusActions() {

        switch (this.watchItem.status) {

            case WatchStatus.PENDING:
                return html`
                    <button
                        type="button"
                        class="action-button"
                        title="Empezar"
                        @click=${() =>
                            this.changeStatus(WatchStatus.WATCHING)}
                    >
                        <i class="fa fa-play"></i>
                    </button>
                `;

            case WatchStatus.WATCHING:
                return html`
                    <button
                        type="button"
                        class="action-button"
                        title="Pausar"
                        @click=${() =>
                            this.changeStatus(WatchStatus.PAUSED)}
                    >
                        <i class="fa fa-pause"></i>
                    </button>

                    <button
                        type="button"
                        class="action-button"
                        title="Marcar como vista"
                        @click=${() =>
                            this.changeStatus(WatchStatus.WATCHED)}
                    >
                        <i class="fa fa-check"></i>
                    </button>
                `;

            case WatchStatus.PAUSED:
                return html`
                    <button
                        type="button"
                        class="action-button"
                        title="Continuar"
                        @click=${() =>
                            this.changeStatus(WatchStatus.WATCHING)}
                    >
                        <i class="fa fa-play"></i>
                    </button>
                `;

            default:
                return "";
        }
    }
}

customElements.define("watch-item-view", WatchItemView);
```

## RecommendationListView.js

```js
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

```

## InboxView.js

```js
import { LitElement, html, css } from "lit";
import { RecommendationList } from "../domain/RecommendationList.js";
import { Recommendation } from "../domain/Recommendation.js";
import { InboxStorage } from "../storage/InboxStorage.js";
import { InboxFileStorage } from "../storage/InboxFileStorage.js";
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

        this.lists = this.storage.load();
        this.selectedList = undefined;

        // TEMPORAL: datos para probar la interfaz
        if (this.lists.length === 0) {
            this.lists = this.createTestLists();
        }
    }

    createTestLists() {

        const robocopRecommendation = new Recommendation({
            id: "test-recommendation-robocop",
            mediaId: "media-from-other-list-robocop",
            platforms: [
                "prime-video-es"
            ],
            spanishAudio: true,
            spanishSubtitles: false,
            reason: "Creo que os va a gustar mucho.",
            recommenderRating: 9
        });

        robocopRecommendation.media = {
            id: "media-from-other-list-robocop",
            title: "Robocop",
            originalTitle: "Robocop",
            type: "movie",
            year: 1987,
            genres: [
                "action",
                "science-fiction",
                "thriller"
            ],
            omdbId: "tt0093870",
            poster: "https://m.media-amazon.com/images/M/MV5BZWM1YzRhODktZDE1MC00NzBlLTk0NGMtOGNhZDQyMmJiZGFiXkEyXkFqcGc@._V1_SX300.jpg",
            matchKey: "robocop|movie|1987"
        };

        const newRecommendation = new Recommendation({
            id: "test-recommendation-new",
            mediaId: "media-from-other-list-new",
            platforms: [
                "filmin-es"
            ],
            spanishAudio: true,
            spanishSubtitles: true,
            reason: "🔞 Una gamberrada.",
            recommenderRating: 7
        });

        newRecommendation.media = {
            id: "media-from-other-list-new",
            title: "Movie 43",
            type: "movie",
            year: 2013,
            genres: [
                "comedy"
            ],
            omdbId: "tt1333125",
            poster: "https://m.media-amazon.com/images/M/MV5BMTg4NzQ3NDM1Nl5BMl5BanBnXkFtZTcwNjEzMjM3OA@@._V1_QL75_UX380_CR0,1,380,562_.jpg",
            runtimeMinutes: "94",
            matchKey: "movie43|movie|2013"
        };

        const otherRecommendation = new Recommendation({
            id: "test-recommendation-other",
            mediaId: "other-media-from-other-list-new",
            platforms: [
                "rtve-play-es"
            ],
            spanishAudio: true,
            spanishSubtitles: true,
            reason: "Genios del humor",
            recommenderRating: 7.2
        });

        otherRecommendation.media = {
            id: "media-from-other-list-new",
            title: "Muchachada nui",
            type: "series",
            year: 2007,
            genres: [
                "comedy"
            ],
            omdbId: "tt1111854",
            poster: "https://m.media-amazon.com/images/M/MV5BMjA4ODIyOTY1OF5BMl5BanBnXkFtZTgwNjc3NjcxMjE@._V1_SX300.jpg",
            runtimeMinutes: "30",
            matchKey: "muchachadanui|series|2013"
        };

        const halfDefinedRecommendation = new Recommendation({
            id: "test-recommendation-half-defined",
            mediaId: "half-defined-media-from-other-list-new",
            platforms: [
                "youtube-es"
            ],
            spanishAudio: true,
            spanishSubtitles: true,
            reason: "La primera, la auténtica. No siento las piernas XD",
            recommenderRating: 6.5
        });

        halfDefinedRecommendation.media = {
            id: "half-defined-media-from-other-list-new",
            title: "Rambo 1",
            poster: "https://th.bing.com/th?q=Rambo+First+Movie&w=120&h=120&c=1&rs=1&qlt=70&r=0&o=7&cb=1&dpr=1.4&pid=InlineBlock&rm=3&mkt=es-ES&cc=ES&setlang=es&adlt=moderate&t=1&mw=247",
            type: "movie",
            genres: [
                "action"
            ],
            matchKey: "rambo|movie"
        };

        const badRecommendation = new Recommendation({
            id: "test-recommendation-bad",
            mediaId: "bad-media-from-other-list-new",
            platforms: [
                "youtube-es"
            ],
            spanishAudio: true,
            spanishSubtitles: true,
            reason: "Pastelazo, lo mismo os gusta...",
            recommenderRating: 3
        });

        badRecommendation.media = {
            id: "bad-media-from-other-list-new",
            title: "El diario de Noa",
            type: "movie",
            year: 2004,
            genres: [
                "drama"
            ],
            matchKey: "eldiariodenoa|movie"
        };

        return [
            new RecommendationList({
                id: "test-list-001",
                name: "Recomendaciones desde : Lista Ajena",
                recommendations: [
                    robocopRecommendation,
                    newRecommendation,
                ]
            }),
            new RecommendationList({
                id: "test-list-002",
                name: "Recomendaciones desde : Otra Lista Ajena",
                recommendations: [
                    otherRecommendation,
                    halfDefinedRecommendation,
                    badRecommendation
                ]
            })
        ];
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
                            .recommendationList=${this.selectedList}
                        ></recommendation-list-view>
                    `
                    : ""
                }

            </section>
        `;
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
}

customElements.define(
    "inbox-view",
    InboxView
);
```

## app.js

```js
import { LitElement, html, css } from "lit";

import "./components/AppHeader.js";
import "./components/AppFooter.js";
import "./components/WatchListView.js";
import "./components/InboxView.js";

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

        /* Móvil */

        @media (max-width: 768px) {
            :host {
                padding: 12px 10px 28px;
            }

            .content {
                padding: 1rem 0.8rem 1.2rem;
            }

        }
    `;
    
    render() {
        return html`
            <app-header></app-header>

            <main>
                <section class="content">
                    <watch-list-view></watch-list-view>
                </section>
                <hr/>
                <section class="content">
                    <inbox-view></inbox-view>
                </section>
            </main>

            <app-footer></app-footer>
        `;
    }

}

customElements.define("quevemos-app", App);
```

## InboxFileStorage.js

```js
import { RecommendationList } from "../domain/RecommendationList.js";
import { Recommendation } from "../domain/Recommendation.js";
import { DATA_VERSION } from "../data/version.js";

export class InboxFileStorage {

    export(recommendationList) {
        return JSON.stringify(recommendationList, null, 2);
    }

    import(json) {

        const data = this.parse(json);

        this.validate(data);

        return data.map(
            item => new RecommendationList({
                version: item.version,
                id: item.id,
                name: item.name,
                recommendations:
                    item.recommendations.map(
                        recommendation =>
                            new Recommendation(recommendation)
                    ),
                createdAt: item.createdAt
            })
        );
    }

    parse(json) {

        try {
            return JSON.parse(json);
        } catch {
            throw new Error("Invalid JSON");
        }
    }

    validate(data) {

        if (!Array.isArray(data)) {
            throw new Error(
                "Invalid Inbox's file"
            );
        }

        data.forEach(item => {

            if (
                !Number.isInteger(item.version) ||
                item.version < 1 ||
                item.version > DATA_VERSION
            ) {
                throw new Error(
                    "Unsupported RecommendationList version"
                );
            }

            if (
                !Array.isArray(item.recommendations)
            ) {
                throw new Error(
                    "RecommendationList recommendations is not an array"
                );
            }
        });
    }
}
```

## InboxStorage.js

```js
import { RecommendationList } from "../domain/RecommendationList.js";
import { Recommendation } from "../domain/Recommendation.js";

export class InboxStorage {
    
    constructor(storage, key = "quevemos-inbox") {
        this.storage = storage;
        this.key = key;
    }

    save(inbox) {

        const json = JSON.stringify(
            inbox
        );

        this.storage.setItem(
            this.key,
            json
        );
    }

    load() {

        const json = this.storage.getItem(
            this.key
        );

        if (!json) {
            return [];
        }

        const data = JSON.parse(json);

        return data.map(
            item => new RecommendationList({
                version: item.version,
                id: item.id,
                name: item.name,
                recommendations:
                    item.recommendations.map(
                        recommendation =>
                            new Recommendation(recommendation)
                    ),
                createdAt: item.createdAt
            })
        );
    }
}

```

## tests

```js
import test from "node:test";
import assert from "node:assert/strict";

import { RecommendationService } from "../../src/services/RecommendationService.js";
import { Recommendation } from "../../src/domain/Recommendation.js";
import { RecommendationStatus } from "../../src/domain/RecommendationStatus.js";
import { RecommendationList } from "../../src/domain/RecommendationList.js";
import { RecommendationExchange } from "../../src/domain/RecommendationExchange.js";
import { WatchList } from "../../src/domain/WatchList.js";
import { Media } from "../../src/domain/Media.js";
import { WatchItem } from "../../src/domain/WatchItem.js";


test("RecommendationService: creates a recommendation from a WatchItem", () => {
    const media = new Media({
        title: "Matrix",
        type: "movie",
        year: 1999
    });

    const watchItem = new WatchItem({
        mediaId: media.id,
        platforms: ["netflix-es"],
        spanishAudio: true,
        spanishSubtitles: false,
        reason: "Tienes que verla",
        userRating: 9
    });

    const watchList = new WatchList({
        name: "La nuestra",
        media: [media],
        watchItems: [watchItem]
    });

    const service = new RecommendationService();

    const recommendation =
        service.createRecommendation(watchList, watchItem);

    assert.ok(recommendation.id);
    assert.equal(recommendation.mediaId, media.id);
    assert.deepEqual(
        recommendation.platforms,
        ["netflix-es"]
    );
    assert.equal(recommendation.spanishAudio, true);
    assert.equal(recommendation.spanishSubtitles, false);
    assert.equal(
        recommendation.reason,
        "Tienes que verla"
    );
    assert.equal(
        recommendation.recommenderRating,
        9
    );
    assert.equal(
        recommendation.status,
        RecommendationStatus.PENDING
    );
});

test("RecommendationService: rejects a WatchItem that is not in the WatchList", () => {
    const media = new Media({
        title: "Matrix",
        type: "movie"
    });

    const otherMedia = new Media({
        title: "Alien",
        type: "movie"
    });

    const watchItem = new WatchItem({
        mediaId: media.id
    });

    const otherWatchItem = new WatchItem({
        mediaId: otherMedia.id
    });

    const watchList = new WatchList({
        name: "La nuestra",
        media: [media],
        watchItems: [watchItem]
    });

    const service = new RecommendationService();

    assert.throws(
        () => service.createRecommendation(
            watchList,
            otherWatchItem
        ),
        {
            message: "WatchItem is not in WatchList"
        }
    );
});

test("RecommendationService: creates a recommendation list", () => {
    const media = new Media({
        title: "Matrix",
        type: "movie",
        year: 1999
    });

    const watchItem = new WatchItem({
        mediaId: media.id,
        platforms: ["netflix-es"],
        reason: "Tienes que verla",
        userRating: 9
    });

    const watchList = new WatchList({
        name: "La nuestra",
        media: [media],
        watchItems: [watchItem]
    });

    const service = new RecommendationService();

    const recommendationList =
        service.createRecommendationList(
            watchList,
            [watchItem]
        );

    assert.ok(recommendationList.id);

    assert.equal(
        recommendationList.name,
        "Recomendaciones desde : La nuestra"
    );

    assert.equal(
        recommendationList.recommendations.length,
        1
    );

    assert.equal(
        recommendationList.recommendations[0].mediaId,
        media.id
    );
});

test("RecommendationService: creates a recommendation for each selected WatchItem", () => {
    const media1 = new Media({
        title: "Matrix",
        type: "movie"
    });

    const media2 = new Media({
        title: "Alien",
        type: "movie"
    });

    const watchItem1 = new WatchItem({
        mediaId: media1.id
    });

    const watchItem2 = new WatchItem({
        mediaId: media2.id
    });

    const watchList = new WatchList({
        name: "La nuestra",
        media: [media1, media2],
        watchItems: [watchItem1, watchItem2]
    });

    const service = new RecommendationService();

    const recommendationList =
        service.createRecommendationList(
            watchList,
            [watchItem1, watchItem2]
        );

    assert.equal(
        recommendationList.recommendations.length,
        2
    );

    assert.equal(
        recommendationList.recommendations[0].mediaId,
        media1.id
    );

    assert.equal(
        recommendationList.recommendations[1].mediaId,
        media2.id
    );
});

test("RecommendationService: copies WatchItem data to Recommendation", () => {

    const media = new Media({
        id: "media-001",
        title: "Robocop",
        type: "movie"
    });

    const watchItem = new WatchItem({
        mediaId: media.id,
        platforms: ["Netflix ES", "Prime Video"],
        spanishAudio: true,
        spanishSubtitles: false,
        reason: "Me la han recomendado",
        userRating: 8
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [media],
        watchItems: [watchItem]
    });

    const service = new RecommendationService();

    const recommendation =
        service.createRecommendation(watchList, watchItem);

    assert.equal(recommendation.mediaId, watchItem.mediaId);
    assert.deepEqual(recommendation.platforms, watchItem.platforms);
    assert.equal(recommendation.spanishAudio, watchItem.spanishAudio);
    assert.equal(
        recommendation.spanishSubtitles,
        watchItem.spanishSubtitles
    );
    assert.equal(recommendation.reason, watchItem.reason);
    assert.equal(
        recommendation.recommenderRating,
        watchItem.userRating
    );
});

test("RecommendationService: copies platforms independently", () => {

    const watchItem = new WatchItem({
        mediaId: "media-001",
        platforms: ["Netflix ES"]
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        watchItems: [watchItem]
    });

    const service = new RecommendationService();

    const recommendation =
        service.createRecommendation(watchList, watchItem);

    recommendation.platforms.push("Prime Video");

    assert.deepEqual(
        watchItem.platforms,
        ["Netflix ES"]
    );
});

test("RecommendationService: creates pending recommendation", () => {

    const watchItem = new WatchItem({
        mediaId: "media-001"
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        watchItems: [watchItem]
    });

    const service = new RecommendationService();

    const recommendation =
        service.createRecommendation(watchList, watchItem);

    assert.equal(
        recommendation.status,
        RecommendationStatus.PENDING
    );
});

test("RecommendationService: does not copy WatchItem progress or watchedAt", () => {

    const watchItem = new WatchItem({
        mediaId: "media-001",
        progress: {
            season: 2,
            episode: 4
        },
        watchedAt: "2026-10-06T20:00:00.000Z"
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        watchItems: [watchItem]
    });

    const service = new RecommendationService();

    const recommendation =
        service.createRecommendation(watchList, watchItem);

    assert.equal(recommendation.progress, undefined);
    assert.equal(recommendation.watchedAt, undefined);
    assert.equal(recommendation.userRating, undefined);
});

test("RecommendationService: creates a recommendation exchange item", () => {

    const media = new Media({
        id: "media-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        omdbId: "tt0093870"
    });

    const watchItem = new WatchItem({
        mediaId: media.id,
        platforms: ["Netflix ES"],
        spanishAudio: true,
        spanishSubtitles: false,
        reason: "Me encanta",
        userRating: 9
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [media],
        watchItems: [watchItem]
    });

    const service = new RecommendationService();

    const recommendation =
        service.createRecommendation(watchList, watchItem);

    const recommendationList =
        new RecommendationList({
            name: "Recomendaciones desde : La nuestra",
            recommendations: [recommendation]
        });

    const exchange =
        service.createRecommendationExchange(
            recommendationList,
            watchList
        );

    assert.equal(exchange.items.length, 1);
    assert.notEqual(exchange.items[0].media, media);
    assert.equal(exchange.items[0].media.matchKey, media.matchKey);
    assert.equal(
        exchange.items[0].recommendation,
        recommendation
    );
});

test("RecommendationService: exchange rejects a recommendation with unknown mediaId", () => {

    const recommendation =
        new Recommendation({
            mediaId: "media-does-not-exist"
        });

    const recommendationList =
        new RecommendationList({
            name: "Recomendaciones",
            recommendations: [recommendation]
        });

    const watchList =
        new WatchList({
            id: "list-001",
            name: "La nuestra"
        });

    const service = new RecommendationService();

    assert.throws(
        () => service.createRecommendationExchange(
            recommendationList,
            watchList
        ),
        /Media not found in WatchList/
    );
});

test("RecommendationService: creates an exchange item with a complete media snapshot", () => {

    const media = new Media({
        id: "media-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        omdbId: "tt0093870"
    });

    const watchItem = new WatchItem({
        mediaId: media.id
        // ...los datos necesarios
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [media],
        watchItems: [watchItem]
    });

    const service = new RecommendationService();

    const recommendationList =
        service.createRecommendationList(
            watchList,
            [watchItem]
        );

    const exchange =
        service.createRecommendationExchange(
            recommendationList,
            watchList
        );

    assert.equal(exchange.items.length, 1);

    assert.equal(exchange.items[0].media.id, media.id);
    assert.equal(exchange.items[0].media.title, media.title);
    assert.equal(exchange.items[0].media.originalTitle, media.originalTitle);
    assert.equal(exchange.items[0].media.type, media.type);
    assert.equal(exchange.items[0].media.year, media.year);
    assert.equal(exchange.items[0].media.omdbId, media.omdbId);
    assert.equal(exchange.items[0].media.matchKey, media.matchKey);

    assert.equal(
        exchange.items[0].recommendation,
        recommendationList.recommendations[0]
    );
});

test("RecommendationService: finds media by matching omdbId", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        omdbId: "tt0093870"
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        omdbId: "tt0093870",
        matchKey: "robocop|movie|1987"
    };

    const recommendation = new Recommendation({
        mediaId: "media-foreign-001"
    });

    const recommendationExchange =  new RecommendationExchange({
        sender: "Otra lista",
        items: [
            {
                media: exchangeMedia,
                recommendation
            }
        ]
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const result = service.compareRecommendations(
            recommendationExchange,
            watchList
        );

    assert.equal(result.length, 1);
    assert.equal(result[0].status, "matched");
    assert.equal(result[0].matches.length, 1);
    assert.equal(
        result[0].matches[0].media,
        existingMedia
    );
    assert.deepEqual(result[0].matches[0].matches, ["omdbId", "matchKey"]);
});

test("RecommendationService: ignores empty omdbId", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "RoboCop",
        type: "movie",
        year: 1987
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        omdbId: undefined
    };

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const matches =
        service.findMediaCandidates(
            exchangeMedia,
            watchList
        );

    assert.equal(matches.length, 0);
});

test("RecommendationService: finds candidate by exact matchKey", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        //matchKey: "robocop-movie-1987"
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        matchKey: "robocop|movie|1987"
    };

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const matches =
        service.findMediaCandidates(
            exchangeMedia,
            watchList
        );

    assert.equal(matches.length, 1);
    assert.equal(matches[0].media, existingMedia);
    assert.deepEqual(matches[0].matches, ["matchKey"]);
});

test("RecommendationService: finds media by matching matchKey", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        //matchKey: "robocop-movie-1987"
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        matchKey: "robocop|movie|1987"
    };

    const recommendation = new Recommendation({
        mediaId: "media-foreign-001"
    });

    const recommendationExchange = new RecommendationExchange({
        sender: "Otra lista",
        items: [
            {
                media: exchangeMedia,
                recommendation
            }
        ]
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const result =
        service.compareRecommendations(
            recommendationExchange,
            watchList
        );

    assert.equal(result.length, 1);
    assert.equal(result[0].status, "candidate");
    assert.equal(result[0].matches.length, 1);
    assert.equal(
        result[0].matches[0].media,
        existingMedia
    );
    assert.deepEqual(result[0].matches[0].matches, ["matchKey"]);
});

test("RecommendationService: does not duplicate candidate matching omdbId and matchKey", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        omdbId: "tt0093870"
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        omdbId: "tt0093870",
        matchKey: "robocop|movie|1987"
    };

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const matches = service.findMediaCandidates(
        exchangeMedia,
        watchList
    );

    assert.equal(matches.length, 1);
    assert.equal(matches[0].media, existingMedia);
    assert.deepEqual(matches[0].matches, ["omdbId", "matchKey"]);
});

test("RecommendationService: finds candidate by matchKey despite media differences", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        //matchKey: "robocop-movie-1987"
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        matchKey: "robocop|movie|1987"
    };

    const recommendation = new Recommendation({
        mediaId: "media-foreign-001"
    });

    const recommendationExchange = new RecommendationExchange({
        sender: "Otra lista",
        items: [
            {
                media: exchangeMedia,
                recommendation
            }
        ]
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const result =
        service.compareRecommendations(
            recommendationExchange,
            watchList
        );

    assert.equal(result[0].status, "candidate");
    assert.equal(result[0].matches.length, 1);
});

test("RecommendationService: returns new when no media matches", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "Alien",
        type: "movie",
        year: 1979,
        //matchKey: "alien-movie-1979"
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        originalTitle: "RoboCop",
        matchKey: "robocop|movie|1987"
    };

    const recommendation = new Recommendation({
        mediaId: "media-foreign-001"
    });

    const recommendationExchange = new RecommendationExchange({
        sender: "Otra lista",
        items: [
            {
                media: exchangeMedia,
                recommendation
            }
        ]
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const result =
        service.compareRecommendations(
            recommendationExchange,
            watchList
        );

    assert.equal(result[0].status, "new");
    assert.equal(result[0].matches.length, 0);
});

test("RecommendationService: finds candidate by partial title match", () => {

    const existingMedia = new Media({
        id: "media-local-001",
        title: "Indiana Jones",
        type: "movie",
        //matchKey: "indianajones-movie"
    });

    const exchangeMedia = {
        id: "media-foreign-001",
        title: "Indiana Jones y el templo maldito",
        type: "movie",
        matchKey: "indianajonesyeltemplomaldito|movie"
    };

    const recommendation = new Recommendation({
        mediaId: "media-foreign-001"
    });

    const recommendationExchange = new RecommendationExchange({
        sender: "Otra lista",
        items: [
            {
                media: exchangeMedia,
                recommendation
            }
        ]
    });

    const watchList = new WatchList({
        id: "list-001",
        name: "La nuestra",
        media: [existingMedia]
    });

    const service = new RecommendationService();

    const result =
        service.compareRecommendations(
            recommendationExchange,
            watchList
        );

    assert.equal(result[0].status, "candidate");
    assert.equal(result[0].matches.length, 1);
    assert.equal(
        result[0].matches[0].media,
        existingMedia
    );
});

test("RecommendationService: accepts a recommendation and creates a WatchItem", () => {

    const media = new Media({
        id: "media-1",
        title: "RoboCop",
        type: "movie",
        year: 1987
    });

    const watchList = new WatchList({
        name: "La nuestra",
        media: [media],
        watchItems: []
    });

    const recommendationList = new RecommendationList({
        name: "Recomendaciones desde : Mis padres"
    });

    const recommendation = new Recommendation({
        mediaId: media.id,
        platforms: ["Netflix"],
        spanishAudio: true,
        spanishSubtitles: false,
        reason: "Muy entretenida",
        recommenderRating: 9
    });

    const exchangeItem = {
        media: {
            ...media,
            matchKey: media.matchKey
        },
        recommendation
    };

    const service = new RecommendationService();

    service.acceptRecommendation(
        exchangeItem,
        recommendationList,
        watchList
    );

    assert.equal(watchList.watchItems.length, 1);

    const watchItem = watchList.watchItems[0];

    assert.equal(watchItem.mediaId, media.id);
    assert.deepEqual(watchItem.platforms, ["Netflix"]);
    assert.equal(watchItem.spanishAudio, true);
    assert.equal(watchItem.spanishSubtitles, false);

    assert.equal(
        watchItem.reason,
        "Recomendaciones desde : Mis padres | (Nota: 9) | Muy entretenida"
    );

    assert.equal(watchItem.userRating, undefined);

    assert.equal(
        recommendation.status,
        RecommendationStatus.ACCEPTED
    );
});

test("RecommendationService: accepts a recommendation without recommenderRating", () => {

    const media = new Media({
        id: "media-1",
        title: "RoboCop",
        type: "movie",
        year: 1987
    });

    const watchList = new WatchList({
        name: "La nuestra",
        media: [media],
        watchItems: []
    });

    const recommendationList = new RecommendationList({
        name: "Recomendaciones desde : Mis padres"
    });

    const recommendation = new Recommendation({
        mediaId: media.id,
        reason: "Porque os gustará"
    });

    const exchangeItem = {
        media: {
            ...media,
            matchKey: media.matchKey
        },
        recommendation
    };

    const service = new RecommendationService();

    service.acceptRecommendation(
        exchangeItem,
        recommendationList,
        watchList
    );

    assert.equal(
        watchList.watchItems[0].reason,
        "Recomendaciones desde : Mis padres | Porque os gustará"
    );
});

test("RecommendationService: accepts a recommendation without reason", () => {

    const media = new Media({
        id: "media-1",
        title: "RoboCop",
        type: "movie",
        year: 1987
    });

    const watchList = new WatchList({
        name: "La nuestra",
        media: [media],
        watchItems: []
    });

    const recommendationList = new RecommendationList({
        name: "Recomendaciones desde : Mis padres"
    });

    const recommendation = new Recommendation({
        mediaId: media.id,
        recommenderRating: 9
    });

    const exchangeItem = {
        media: {
            ...media,
            matchKey: media.matchKey
        },
        recommendation
    };

    const service = new RecommendationService();

    service.acceptRecommendation(
        exchangeItem,
        recommendationList,
        watchList
    );

    assert.equal(
        watchList.watchItems[0].reason,
        "Recomendaciones desde : Mis padres | (Nota: 9)"
    );
});

test("RecommendationService: discards a recommendation", () => {

    const recommendation = new Recommendation({
        mediaId: "media-1",
        reason: "Creo que os gustará"
    });

    const service = new RecommendationService();

    service.discardRecommendation(recommendation);

    assert.equal(
        recommendation.status,
        RecommendationStatus.DISCARDED
    );
});



test("RecommendationService: discarding a recommendation does not create a WatchItem", () => {

    const media = new Media({
        id: "media-1",
        title: "RoboCop",
        type: "movie",
        year: 1987
    });

    const watchList = new WatchList({
        name: "La nuestra",
        media: [media],
        watchItems: []
    });

    const recommendation = new Recommendation({
        mediaId: "media-1"
    });

    const service = new RecommendationService();

    service.discardRecommendation(recommendation);

    assert.equal(watchList.watchItems.length, 0);
    assert.equal(
        recommendation.status,
        RecommendationStatus.DISCARDED
    );
});

test("RecommendationService: identifies a candidate when matchKey matches but media data differs", () => {

    const localMedia = new Media({
        id: "local-1",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        runtimeMinutes: 99
    });

    const exchangeMedia = {
        id: "remote-1",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        runtimeMinutes: 102,
        genres: [],
        omdbId: undefined,
        poster: undefined,
        ratings: undefined,
        originalTitle: undefined,
        matchKey: localMedia.matchKey
    };

    const watchList = new WatchList({
        name: "La nuestra",
        media: [localMedia],
        watchItems: []
    });

    const exchangeItem = {
        media: exchangeMedia,
        recommendation: new Recommendation({
            mediaId: "remote-1"
        })
    };

    const recommedationExchange =  new RecommendationExchange({
        sender: "Otra lista",
        items: [exchangeItem]
    });

    const service = new RecommendationService();

    const result = service.compareRecommendations(
        recommedationExchange,
        watchList
    );

    assert.equal(result[0].status, "candidate");
    assert.equal(result[0].matches.length, 1);
    assert.equal(
        result[0].matches[0].media,
        localMedia
    );
    assert.deepEqual(
        result[0].matches[0].matches,
        ["matchKey"]
    );
});

test("RecommendationService: detects differences in a candidate media", () => {

    const existingMedia = new Media({
        id: "media-1",
        title: "RoboCop",
        type: "movie",
        year: 1987,
        runtimeMinutes: 99,
        genres: ["Action"]
    });

    const exchangeMedia = {
        id: "remote-1",
        title: "RoboCop",
        originalTitle: undefined,
        type: "movie",
        year: 1987,
        runtimeMinutes: 102,
        genres: ["Action", "Sci-Fi"],
        omdbId: undefined,
        poster: undefined,
        ratings: undefined,
        matchKey: existingMedia.matchKey
    };

    const watchList = new WatchList({
        name: "La nuestra",
        media: [existingMedia],
        watchItems: []
    });

    const exchangeItem = {
        media: exchangeMedia,
        recommendation: new Recommendation({
            mediaId: "remote-1"
        })
    };

    const recommedationExchange =  new RecommendationExchange({
        sender: "Otra lista",
        items: [exchangeItem]
    });

    const service = new RecommendationService();
    
    const result = service.compareRecommendations(
        recommedationExchange,
        watchList
    );

    assert.equal(result[0].status, "candidate");

    assert.equal(result[0].matches.length, 1);

    assert.deepEqual(
        result[0].matches[0].matches,
        ["matchKey"]
    );

    assert.deepEqual(
        result[0].matches[0].differences,
        [
            "runtimeMinutes",
            "genres"
        ]
    );
});

```

```js
import test from "node:test";
import assert from "node:assert/strict";

import { DATA_VERSION } from "../../src/data/version.js";
import { RecommendationExchange } from "../../src/domain/RecommendationExchange.js";

test("RecommendationExchange: creates an exchange", () => {

    const exchange = new RecommendationExchange({
        sender: "Mis padres"
    });

    assert.equal(
        exchange.sender,
        "Mis padres"
    );

    assert.equal(
        exchange.version,
        DATA_VERSION
    );

    assert.ok(exchange.createdAt);

    assert.deepEqual(
        exchange.items,
        []
    );
});

test("RecommendationExchange: sender is required", () => {

    assert.throws(
        () => new RecommendationExchange(),
        /sender is required/
    );
});

test("RecommendationExchange: items must be an array", () => {

    assert.throws(
        () => new RecommendationExchange({
            sender: "Mis padres",
            items: {}
        }),
        /items is not an array/
    );
});

test("RecommendationExchange: stores exchange items", () => {

    const item = {
        media: {
            title: "RoboCop",
            type: "movie",
            year: 1987,
            matchKey: "RoboCop|movie|1987"
        },
        recommendation: {
            mediaId: "abc",
            reason: "Porque os gustará"
        }
    };

    const exchange = new RecommendationExchange({
        sender: "Mis padres",
        items: [item]
    });

    assert.equal(exchange.items.length, 1);
    assert.equal(exchange.items[0].media.title, "RoboCop");
    assert.equal(
        exchange.items[0].recommendation.reason,
        "Porque os gustará"
    );
});
```

```js
/* 
Guarda plataformas.
Guarda idioma español y subtítulos.
Guarda la razón.
Guarda la valoración del recomendador.
Podemos crear una recomendación aunque alguno de los datos opcionales no esté marcado.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { Recommendation } from "../../src/domain/Recommendation.js";
import { RecommendationStatus } from "../../src/domain/RecommendationStatus.js";


test("Recommendation: creates a recommendation", () => {
    const recommendation = new Recommendation({
        mediaId: "media-001",
        platforms: ["netflix-es"],
        spanishAudio: true,
        spanishSubtitles: false,
        reason: "Creo que te gustará",
        recommenderRating: 8
    });

    assert.ok(recommendation.id);
    assert.equal(recommendation.mediaId, "media-001");
    assert.deepEqual(recommendation.platforms, ["netflix-es"]);
    assert.equal(recommendation.spanishAudio, true);
    assert.equal(recommendation.spanishSubtitles, false);
    assert.equal(recommendation.reason, "Creo que te gustará");
    assert.equal(recommendation.recommenderRating, 8);
    assert.equal(recommendation.status, RecommendationStatus.PENDING);
});


test("Recommendation: generates a local id", () => {
    const recommendation = new Recommendation({
        mediaId: "media-001"
    });

    assert.ok(recommendation.id);
    assert.equal(typeof recommendation.id, "string");
});


test("Recommendation: generates a different id for each recommendation", () => {
    const recommendation1 = new Recommendation({
        mediaId: "media-001"
    });

    const recommendation2 = new Recommendation({
        mediaId: "media-001"
    });

    assert.notEqual(recommendation1.id, recommendation2.id);
});


test("Recommendation: mediaId is required", () => {
    assert.throws(
        () => new Recommendation({}),
        {
            message: "mediaId is required"
        }
    );
});


test("Recommendation: optional information can be omitted", () => {
    const recommendation = new Recommendation({
        mediaId: "media-001"
    });

    assert.deepEqual(recommendation.platforms, []);
    assert.equal(recommendation.spanishAudio, false);
    assert.equal(recommendation.spanishSubtitles, false);
    assert.equal(recommendation.reason, undefined);
    assert.equal(recommendation.recommenderRating, undefined);
});


test("Recommendation: does not contain WatchItem progress", () => {
    const recommendation = new Recommendation({
        mediaId: "media-001"
    });

    assert.equal(recommendation.progress, undefined);
    assert.equal(recommendation.watchedAt, undefined);
});

test("Recommendation: starts with pending status", () => {
    const recommendation = new Recommendation({
        mediaId: "media-001"
    });

    assert.equal(
        recommendation.status,
        RecommendationStatus.PENDING
    );
});

test("Recommendation: rejects invalid status", () => {
    assert.throws(
        () => new Recommendation({
            mediaId: "media-001",
            status: "invalid"
        }),
        {
            message: "Invalid recommendation status"
        }
    );
});
```

```js
import test from "node:test";
import assert from "node:assert/strict";

import { Recommendation } from "../../src/domain/Recommendation.js";
import { RecommendationList } from "../../src/domain/RecommendationList.js";
import { DATA_VERSION } from "../../src/data/version.js";

test("RecommendationList: requires a name", () => {
    assert.throws(
        () => new RecommendationList({}),
        {
            message: "name is required"
        }
    );
});

test("RecommendationList: generates a different id for each list", () => {
    const list1 = new RecommendationList({
        name: "Lista 1"
    });

    const list2 = new RecommendationList({
        name: "Lista 2"
    });

    assert.notEqual(list1.id, list2.id);
});

test("RecommendationList: accepts recommendations", () => {
    const recommendation = new Recommendation({
        mediaId: "media-001",
        platforms: ["netflix-es"],
        reason: "Te gustará",
        recommenderRating: 8
    });

    const recommendationList = new RecommendationList({
        name: "Recomendaciones desde Juan",
        recommendations: [recommendation]
    });

    assert.equal(recommendationList.recommendations.length, 1);
    assert.equal(
        recommendationList.recommendations[0],
        recommendation
    );
});


test("RecommendationList: accepts multiple recommendations", () => {
    const recommendation1 = new Recommendation({
        mediaId: "media-001"
    });

    const recommendation2 = new Recommendation({
        mediaId: "media-002"
    });

    const recommendationList = new RecommendationList({
        name: "Recomendaciones",    
        recommendations: [
            recommendation1,
            recommendation2
        ]
    });

    assert.deepEqual(
        recommendationList.recommendations,
        [
            recommendation1,
            recommendation2
        ]
    );
});


test("RecommendationList: rejects invalid recommendations", () => {
    assert.throws(
        () => new RecommendationList({
            name: "Recomendaciones",
            recommendations: [{}]
        }),
        {
            message: "recommendations must contain only Recommendation"
        }
    );
});


test("RecommendationList: accepts supported versions", () => {
    const recommendationList = new RecommendationList({
        name: "Recomendaciones",
        version: DATA_VERSION
    });

    assert.equal(recommendationList.version, DATA_VERSION);
});

test("RecommendationList: rejects unsupported version", () => {
    assert.throws(
        () => new RecommendationList({
            name: "Recomendaciones",
            version: DATA_VERSION + 1
        }),
        {
            message: "Unsupported recommendation list version"
        }
    );
});
```

```js
import test from "node:test";
import assert from "node:assert/strict";

import { InboxFileStorage } from "../../src/storage/InboxFileStorage.js";
import { RecommendationList } from "../../src/domain/RecommendationList.js";
import { Recommendation } from "../../src/domain/Recommendation.js";
import { DATA_VERSION } from "../../src/data/version.js";

test("InboxFileStorage: exports inbox (recommendation lists) as JSON", () => {

    const list = new RecommendationList({
        id: "recommendation-list-001",
        name: "Recomendaciones desde : Mis padres"
    });

    const storage =
        new InboxFileStorage();

    const json = storage.export([list]);

    const data = JSON.parse(json);

    assert.ok(Array.isArray(data));
    assert.equal(data.length, 1);
    assert.equal(
        data[0].name,
        "Recomendaciones desde : Mis padres"
    );
});

test("InboxFileStorage: imports inbox of recommendation lists", () => {

    const list = new RecommendationList({
        id: "recommendation-list-001",
        name: "Recomendaciones desde : Mis padres"
    });

    const storage =
        new InboxFileStorage();

    const json = storage.export([list]);

    const inbox = storage.import(json);

    assert.equal(inbox.length, 1);

    assert.ok(
        inbox[0] instanceof RecommendationList
    );

    assert.equal(
        inbox[0].name,
        "Recomendaciones desde : Mis padres"
    );
});

test("InboxFileStorage: rejects invalid JSON", () => {

    const storage =
        new InboxFileStorage();

    assert.throws(
        () => storage.import("esto no es JSON"),
        /Invalid JSON/
    );
});

test("InboxFileStorage: rejects a non-array root", () => {

    const storage =
        new InboxFileStorage();

    assert.throws(
        () => storage.import("{}"),
        /Invalid Inbox's file/
    );
});

test("InboxFileStorage: rejects unsupported version", () => {

    const storage =
        new InboxFileStorage();

    const json = JSON.stringify([
        {
            version: 999,
            id: "recommendation-list-001",
            name: "Recomendaciones",
            recommendations: []
        }
    ]);

    assert.throws(
        () => storage.import(json),
        /Unsupported RecommendationList version/
    );
});
```

```js
import test from "node:test";
import assert from "node:assert/strict";

import { InboxStorage } from "../../src/storage/InboxStorage.js";
import { RecommendationList } from "../../src/domain/RecommendationList.js";
import { Recommendation } from "../../src/domain/Recommendation.js";

test("InboxStorage: returns an empty array when there is no data", () => {
    
    const localStorage = {
        getItem() {
            return null;
        }
    };

    const storage = new InboxStorage(localStorage);

    const inbox = storage.load();

    assert.deepEqual(inbox, []);
});

test("InboxStorage: saves and loads multiple recommendation lists in an inbox", () => {

    const list1 = new RecommendationList({
        id: "recommendation-list-001",
        name: "Recomendaciones de : Mis padres"
    });

    const list2 = new RecommendationList({
        id: "recommendation-list-002",
        name: "Recomendaciones de : Juan"
    });

    const data = {};
    
    const localStorage = {
        setItem(key, value) {
            data[key] = value;
        },

        getItem(key) {
            return data[key] ?? null;
        }
    };

    const storage =
        new InboxStorage(localStorage);

    storage.save([list1, list2]);

    const inbox = storage.load();

    assert.equal(inbox.length, 2);

    assert.equal(inbox[0].id, list1.id);
    assert.equal(inbox[0].name, list1.name);

    assert.equal(inbox[1].id, list2.id);
    assert.equal(inbox[1].name, list2.name);
});

test("InboxStorage: reconstructs RecommendationList and Recommendation instances", () => {

    const recommendation = new Recommendation({
        mediaId: "media-001",
        reason: "Porque os gustará",
        recommenderRating: 9
    });

    const list = new RecommendationList({
        id: "recommendation-list-001",
        name: "Recomendaciones de : Mis padres",
        recommendations: [recommendation]
    });

    const data = {};

    const localStorage = {
        setItem(key, value) {
            data[key] = value;
        },

        getItem(key) {
            return data[key] ?? null;
        }
    };

    const storage =
        new InboxStorage(localStorage);

    storage.save([list]);

    const inbox = storage.load();

    assert.ok(
        inbox[0] instanceof RecommendationList
    );

    assert.ok(
        inbox[0].recommendations[0] instanceof Recommendation
    );

    assert.equal(
        inbox[0].recommendations[0].mediaId,
        "media-001"
    );

    assert.equal(
        inbox[0].recommendations[0].reason,
        "Porque os gustará"
    );

    assert.equal(
        inbox[0].recommendations[0].recommenderRating,
        9
    );
});


```
