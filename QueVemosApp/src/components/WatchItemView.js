import { LitElement, html, css } from "lit";
import settings from "../data/setting.json";
import { WatchStatus } from "../domain/WatchStatus.js";


export class WatchItemView extends LitElement {

    static styles = css`
        :host {
            display: block;
        }
            
        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        .media-card {
            display: grid;
            grid-template-columns: 180px minmax(0, 1fr);

            overflow: hidden;

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
        .genre,
        .platform {
            display: inline-flex;
            align-items: center;

            padding: 0.25rem 0.55rem;

            border-radius: 999px;

            background: rgba(255, 255, 255, 0.12);

            color: var(--text);

            font-size: 0.78rem;
        }

        .genres,
        .platforms {
            display: flex;
            flex-wrap: wrap;

            gap: 0.4rem;

            margin-top: 0.6rem;
        }

        /* -------------------------
        Barra inferior
        ------------------------- */

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
        watchItem: { type: Object }
    };
    static getCatalogName(catalog, id) {
        const item = catalog.find(item => item.id === id);
        return item?.name ?? id;
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
                            <!-- ToDo -->
                            <button
                                class="action-button"
                                title="Recomendar"
                                disabled
                            >
                                <i class="fa fa-share-alt"></i>
                            </button>
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
                                        <span>${genre}</span>
                                    `
                                )}
                            </div>
                        `
                        : ""
                    }

                    ${platforms.length
                        ? html`
                            <div class="platforms">
                                <i class="fa fa-tv"></i> : ${platforms.join(" · ")}
                            </div>
                        `
                        : ""
                    }
                </div>
        `;
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