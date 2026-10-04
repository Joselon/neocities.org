import { LitElement, html, css } from "lit";
import settings from "../data/setting.json";

export class WatchItemView extends LitElement {

    static styles = css`
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

        .media-card {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
    
                padding: 1rem;
    
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

        .media-info {
            min-width: 0;
        }

        .media-card h3 {
            margin: 0;
            color: #ffffff;
            font-size: 1.15rem;
        }

        .media-type {
            display: inline-block;

            margin-top: 0.35rem;
            padding: 0.25rem 0.6rem;

            border-radius: 999px;

            background: rgba(255, 255, 255, 0.12);
            color: var(--text);

            font-size: 0.78rem;
        }

        .status {
            display: inline-block;
            margin-top: 0.6rem;
            padding: 0.25rem 0.7rem;
            border-radius: 999px;
            font-size: 0.8rem;
            font-weight: 600;
            background: rgba(255, 255, 255, 0.12);
        }

        .status-pending {
            opacity: 0.8;
        }

        .status-watching {
            background: rgba(255, 154, 60, 0.25);
            border: 1px solid var(--accent-2);
        }

        .status-paused {
            background: rgba(255, 255, 255, 0.18);
        }

        .status-watched {
            background: rgba(100, 200, 120, 0.25);
            border: 1px solid rgba(100, 200, 120, 0.7);
        }

        .status-discarded {
            background: rgba(220, 80, 80, 0.25);
            border: 1px solid rgba(220, 80, 80, 0.7);
        }

        .action-button {
            padding: 0.4rem 0.6rem;
            border: 1px solid var(--border);
            border-radius: 6px;
            background: transparent;
            color: var(--muted);
            cursor: pointer;
        }

        .action-button:hover {
            color: var(--text);
            border-color: var(--text);
        }

        /* Móvil */

        @media (max-width: 768px) {

            .media-card {
                align-items: flex-start;
                flex-direction: column;
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
                <div class="media-info">
                    <h3>
                        ${this.media.title}
                    </h3>
                    <div class="media-meta">
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

                    ${statusName
                        ? html`
                            <div class="status ${statusClass}">
                                ${statusName}
                            </div>
                        `
                        : ""
                    }
                    <div class="actions">

                        ${this.renderStatusActions()}

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
            </article>
        `;
    }

    renderStatusActions() {

        switch (this.watchItem.status) {

            case "pending":
                return html`
                    <button
                        type="button"
                        class="action-button"
                        title="Empezar"
                        @click=${() =>
                            this.changeStatus("watching")}
                    >
                        <i class="fa fa-play"></i>
                    </button>
                `;

            case "watching":
                return html`
                    <button
                        type="button"
                        class="action-button"
                        title="Pausar"
                        @click=${() =>
                            this.changeStatus("paused")}
                    >
                        <i class="fa fa-pause"></i>
                    </button>

                    <button
                        type="button"
                        class="action-button"
                        title="Marcar como vista"
                        @click=${() =>
                            this.changeStatus("watched")}
                    >
                        <i class="fa fa-check"></i>
                    </button>
                `;

            case "paused":
                return html`
                    <button
                        type="button"
                        class="action-button"
                        title="Continuar"
                        @click=${() =>
                            this.changeStatus("watching")}
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