import { LitElement, html, css } from "lit";
import { WatchProgress } from "../domain/WatchProgress.js";
import { MediaType } from "../domain/MediaType.js";
import { OmdbService } from "../services/OmdbService.js";

import settings from "../data/setting.json";

export class EditItemForm extends LitElement {

    static styles = css`
        :host {
            display: block;
        }
            
        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        :host {
            display: block;
        }

        form {
            padding: 1.5rem;
            border: 2px solid var(--accent-2);
            border-radius: 14px;
            background: linear-gradient(
                135deg,
                rgba(255, 107, 44, 0.22),
                rgba(255, 154, 60, 0.12)
            );
            box-shadow:
                0 0 0 1px rgba(255, 154, 60, 0.15),
                0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .header-icon {
            font-size: 1.4rem;
            color: var(--accent-2);
        }

        .header h2 {
            margin: 0;
            color: var(--text);
            font-size: 1.2rem;
        }

        .header p {
            margin: 0.2rem 0 0;
            color: var(--muted);
            font-size: 0.85rem;
        }

        .field {
            margin-bottom: 1rem;
        }

        .fit-content {
            width: fit-content; 
        }

        label {
            display: block;
            margin-bottom: 0.35rem;
            color: var(--text);
            font-weight: 500;
        }

        input,
        select,
        textarea {
            width: 100%;
            padding: 0.7rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            background: var(--surface-strong);
            color: var(--text);
            font: inherit;
        }

        input:focus,
        select:focus,
        textarea:focus {
            outline: none;
            border-color: var(--accent-2);
            box-shadow: 0 0 0 2px rgba(255, 154, 60, 0.15);
        }

        textarea {
            min-height: 100px;
            resize: vertical;
        }

        .checkbox-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem 1rem;
        }

        .checkbox {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-weight: normal;
        }

        .checkbox input {
            width: auto;
        }

        .progress {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .actions {
            display: flex;
            justify-content: flex-end;
            gap: 0.75rem;
            margin-top: 1.5rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        button {
            padding: 0.7rem 1.1rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            font: inherit;
            cursor: pointer;
            transition:
                background 0.2s ease,
                border-color 0.2s ease,
                transform 0.2s ease;
        }

        button:hover {
            transform: translateY(-1px);
        }

        button[type="submit"] {
            border-color: var(--accent-2);
            background: var(--accent);
            color: var(--text);
            font-weight: 600;
        }

        button[type="submit"]:hover {
            background: var(--accent-2);
        }

        button[type="button"] {
            background: rgba(0, 0, 0, 0.2);
            color: var(--muted);
        }

        button[type="button"]:hover {
            border-color: var(--text);
            color: var(--text);
        }

        button.delete-button {
            border-color: #c0392b;
            background: rgba(192, 57, 43, 0.2);
            color: #ff8a80;
        }

        button.delete-button:hover {
            border-color: #e74c3c;
            background: rgba(192, 57, 43, 0.35);
        }

        .omdb-results,
        .omdb-preview {
            margin-top: 1rem;
            padding: 1rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.18);
        }

        .omdb-result {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 1rem;
            width: 100%;
            margin-top: 0.5rem;
            text-align: left;
        }

        .omdb-result img {
            width: 56px;
            max-height: 84px;
            object-fit: cover;
            border-radius: 4px;
        }

        .omdb-result span {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .omdb-result small {
            color: var(--muted);
        }

        .omdb-preview p {
            line-height: 1.5;
        }

        @media (max-width: 600px) {
            form {
                padding: 1rem;
            }

            .progress {
                grid-template-columns: 1fr;
                gap: 0;
            }

            .actions {
                flex-direction: column-reverse;
            }

            button {
                width: 100%;
            }
        }
    `;

    static properties = {
        media: { attribute: false },
        watchItem: { attribute: false },

        omdbResults: { state: true },
        omdbPreview: { state: true },
        omdbSearching: { state: true },
        omdbLoadingDetails: { state: true },
        omdbError: { state: true },
        showAllPlatforms: { state: true },
        showAllGenres: { state: true },
    };

    constructor() {
        super();

        this.mediaInfoService = new OmdbService();

        this.media = undefined;
        this.watchItem = undefined;

        this.omdbResults = [];
        this.omdbPreview = undefined;
        this.omdbSearching = false;
        this.omdbLoadingDetails = false;
        this.omdbError = undefined;
        
        this.showAllPlatforms = false;
        this.showAllGenres = false;
    }

    save(event) {
        event.preventDefault();

        const form = event.target;

        const genres = [
            ...form.querySelectorAll(
                'input[name="genres"]:checked'
            )
        ].map(input => input.value);

        const platforms = [
            ...form.querySelectorAll(
                'input[name="platforms"]:checked'
            )
        ].map(input => input.value);

        const progress = this.createProgress(form);

        this.dispatchEvent(new CustomEvent("save-item", {
            detail: {
                mediaId: this.media.id,
                media: {
                    title: form.title.value.trim(),
                    type: form.type.value,
                    year: form.year.value
                        ? Number(form.year.value)
                        : undefined,
                    originalTitle:
                        form.originalTitle.value.trim() || undefined,
                    genres,
                    poster: form.poster.value.trim() || undefined,
                    trailer: form.trailer.value.trim() || undefined,
                },
                omdbDetails: this.omdbPreview,
                watchItem: {
                    platforms,
                    reason:
                        form.reason.value.trim() || undefined,
                    spanishAudio:
                        form.spanishAudio.checked,
                    spanishSubtitles:
                        form.spanishSubtitles.checked,
                    userRating:
                        form.userRating.value
                            ? Number(form.userRating.value)
                            : undefined,
                    progress
                }
            },
            bubbles: true,
            composed: true
        }));
    }

    
    async searchOmdb() {
        const input = this.renderRoot.querySelector(
            '[name="originalTitle"]'
        );

        const title = input.value.trim();

        this.omdbError = undefined;
        this.omdbResults = [];
        this.omdbPreview = undefined;

        if (!title) {
            this.omdbError = "Introduce un título para buscar.";
            return;
        }

        this.omdbSearching = true;

        try {
            this.omdbResults =
                await this.mediaInfoService.search(title);

            if (this.omdbResults.length === 0) {
                this.omdbError =
                    "OMDb no ha encontrado resultados.";
            }
        } catch (error) {
            this.omdbError =
                `Error al buscar en OMDb: ${error.message}`;
        } finally {
            this.omdbSearching = false;
        }
    }

    async selectOmdbResult(result) {
        this.omdbError = undefined;
        this.omdbPreview = undefined;
        this.omdbLoadingDetails = true;

        try {
            this.omdbPreview =
                await this.mediaInfoService.getDetails(
                    result.imdbID
                );
            await this.updateComplete;

            this.renderRoot
                .querySelector(".omdb-preview")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
        } catch (error) {
            this.omdbError =
                `No se pudieron obtener los detalles: ${error.message}`;
        } finally {
            this.omdbLoadingDetails = false;
        }
    }


    deleteItem() {
        this.dispatchEvent(new CustomEvent("delete-item", {
            detail: {
                mediaId: this.media.id
            },
            bubbles: true,
            composed: true
        }));
    }

    createProgress(form) {
        if (this.media.type === MediaType.SERIES) {
            const season = form.season.value;
            const episode = form.episode.value;
            const minute = form.minute.value;

            if (!season && !episode) {
                return undefined;
            }

            return new WatchProgress({
                season: season
                    ? Number(season)
                    : undefined,
                episode: episode
                    ? Number(episode)
                    : undefined,
                minute: minute
                    ? Number(minute)
                    : undefined
            });
        }

        const minute = form.minute.value;

        if (!minute) {
            return undefined;
        }

        return new WatchProgress({
            minute: Number(minute)
        });
    }

    getProgressValue(property) {
        return this.watchItem?.progress?.[property] ?? "";
    }

    isGenreSelected(genreId) {
        return this.media?.genres?.includes(genreId);
    }

    isPlatformSelected(platformId) {
        return this.watchItem?.platforms?.includes(platformId);
    }

    renderProgress() {
        if (this.media?.type === MediaType.SERIES) {
            return html`
                <div class="progress">

                    <div class="field fit-content">
                        <label for="season">
                            Temporada
                        </label>

                        <input
                            id="season"
                            name="season"
                            type="number"
                            min="1"
                            value=${this.getProgressValue("season")}
                        >
                    </div>

                    <div class="field fit-content">
                        <label for="episode">
                            Episodio
                        </label>

                        <input
                            id="episode"
                            name="episode"
                            type="number"
                            min="1"
                            value=${this.getProgressValue("episode")}
                        >
                    </div>

                    <div class="field fit-content">
                        <label for="minute">
                        (minutos)
                        </label>

                        <input
                            id="minute"
                            name="minute"
                            type="number"
                            min="0"
                            value=${this.getProgressValue("minute")}
                        >
                    </div>

                </div>
            `;
            
        }
        return html`
            <div class="field fit-content">
                <label for="minute">
                    Progreso (minutos)
                </label>

                <input
                    id="minute"
                    name="minute"
                    type="number"
                    min="0"
                    value=${this.getProgressValue("minute")}
                >
            </div>
        `;
        
    }


    renderOmdbSearch() {
        return html`
            ${this.omdbSearching
                ? html`<p>Buscando en OMDb...</p>`
                : ""
            }

            ${this.omdbError
                ? html`
                    <p role="status">${this.omdbError}</p>
                `
                : ""
            }

            ${this.omdbResults.length
                ? html`
                    <div class="omdb-results">
                        <h3>Resultados de OMDb</h3>

                        ${this.omdbResults.map(result => html`
                            <button
                                type="button"
                                class="omdb-result"
                                @click=${() =>
                                    this.selectOmdbResult(result)}
                            >
                                ${result.Poster &&
                                result.Poster !== "N/A"
                                    ? html`
                                        <img
                                            src=${result.Poster}
                                            alt=""
                                        >
                                    `
                                    : ""
                                }

                                <span>
                                    <strong>${result.Title}</strong>
                                    <span>
                                        ${result.Year ?? ""}
                                        · ${result.Type ?? ""}
                                    </span>
                                    <!--<small>${result.imdbID}</small>-->
                                </span>
                            </button>
                        `)}
                    </div>
                `
                : ""
            }
            ${this.omdbLoadingDetails
                ? html`<p>Cargando ficha completa...</p>`
                : ""
            }

            ${this.omdbPreview
                ? this.renderOmdbPreview()
                : ""
            }
        `;
    }

    renderOmdbPreview() {
        const details = this.omdbPreview;
        const ratings = Array.isArray(details.Ratings)
            ? details.Ratings.filter(
                rating => rating?.Source && rating?.Value
            )
            : [];

        return html`
            <section class="omdb-preview">
                <h3>Vista previa del resultado seleccionado</h3>
                <p class="omdb-preview-notice" role="status">
                    Estos son los datos de OMDb que se guardarán al pulsar
                    Guardar. Si cancelas, no se aplicarán los cambios.
                </p>
                <p>
                    <strong>${details.Title}</strong>
                    ${details.Year ? ` (${details.Year})` : ""}
                </p>

                <p>
                    <strong>ID OMDb:</strong>
                    ${details.imdbID}
                </p>

                ${details.Runtime && details.Runtime !== "N/A"
                    ? html`<p><strong>Duración:</strong> ${details.Runtime}</p>`
                    : ""
                }

                ${details.Genre && details.Genre !== "N/A"
                    ? html`<p><strong>Géneros OMDb:</strong> ${details.Genre}</p>`
                    : ""
                }

                ${details.Director && details.Director !== "N/A"
                    ? html`<p><strong>Dirección:</strong> ${details.Director}</p>`
                    : ""
                }

                ${details.Country && details.Country !== "N/A"
                    ? html`<p><strong>País:</strong> ${details.Country}</p>`
                    : ""
                }

                ${details.Actors && details.Actors !== "N/A"
                    ? html`<p><strong>Reparto:</strong> ${details.Actors}</p>`
                    : ""
                }

                ${details.Plot && details.Plot !== "N/A"
                    ? html`<p><strong>Sinopsis:</strong> ${details.Plot}</p>`
                    : ""
                }

                ${details.Awards && details.Awards !== "N/A"
                    ? html`<p><strong>Premios:</strong> ${details.Awards}</p>`
                    : ""
                }

                ${ratings.length
                    ? html`
                        <div>
                            <strong>Valoraciones externas:</strong>
                            <ul>
                                ${ratings.map(rating => html`
                                    <li>
                                        ${rating.Source}: ${rating.Value}
                                    </li>
                                `)}
                            </ul>
                        </div>
                    `
                    : ""
                }
            </section>
        `;
    }


    render() {
        if (!this.media || !this.watchItem) {
            return "";
        }

        return html`
            <div class="header">
                <div class="header-icon">
                    <i class="fa fa-pencil"></i>
                </div>

                <div>
                    <h2>Editar elemento</h2>
                    <p>Estás modificando un elemento de tu lista</p>
                </div>
            </div>
            <form @submit=${this.save}>

                <div class="field">
                    <label for="title">
                        Título
                    </label>

                    <input
                        id="title"
                        name="title"
                        type="text"
                        value=${this.media.title}
                        required
                    >
                </div>

                <div class="field fit-content">
                    <label for="type">
                        Tipo
                    </label>

                    <select
                        id="type"
                        name="type"
                    >
                        ${settings.mediaTypes.map(type => html`
                            <option
                                value=${type.id}
                                ?selected=${type.id === this.media.type}
                            >
                                ${type.name}
                            </option>
                        `)}
                    </select>
                </div>

                <div class="field fit-content">
                    <label for="year">
                       ~ Año ~
                    </label>

                    <input
                        id="year"
                        name="year"
                        type="number"
                        min="1888"
                        max="2100"
                        placeholder="aaaa"
                        value=${this.media.year ?? ""}
                    >
                </div>

                <div class="field">
                    <label>Plataformas</label>

                    <div class="checkbox-list">
                        ${settings.platforms
                            .filter(platform => platform.active)
                            .filter(platform =>
                                this.showAllPlatforms ||
                                this.isPlatformSelected(platform.id)
                            )
                            .map(platform => html`
                                <label class="checkbox">
                                    <input
                                        type="checkbox"
                                        name="platforms"
                                        value=${platform.id}
                                        ?checked=${this.isPlatformSelected(
                                            platform.id
                                        )}
                                    >
                                    ${platform.name}
                                </label>
                            `)}
                    </div>

                    ${settings.platforms.filter(platform =>
                        platform.active &&
                        !this.isPlatformSelected(platform.id)
                    ).length
                        ? html`
                            <button
                                type="button"
                                @click=${() => {
                                    this.showAllPlatforms =
                                        !this.showAllPlatforms;
                                }}
                            >
                                ${this.showAllPlatforms
                                    ? "Ocultar opciones"
                                    : "Añadir plataformas"}
                            </button>
                        `
                        : ""}
                </div>

                <div class="field">
                    <label>
                        Audio y subtítulos
                    </label>

                    <div class="checkbox-list">

                        <label class="checkbox">
                            <input
                                type="checkbox"
                                name="spanishAudio"
                                ?checked=${this.watchItem.spanishAudio}
                            >
                            Audio español
                        </label>

                        <label class="checkbox">
                            <input
                                type="checkbox"
                                name="spanishSubtitles"
                                ?checked=${this.watchItem.spanishSubtitles}
                            >
                            Subtítulos español
                        </label>

                    </div>
                </div>

                <div class="field">
                    <label for="reason">
                        Motivo / observaciones
                    </label>

                    <textarea
                        id="reason"
                        name="reason"
                        placeholder="¿Por qué quieres ver esta película o serie?"
                    >${this.watchItem.reason ?? ""}</textarea>
                </div>

                 <div class="field fit-content">
                    <label>
                        Progreso
                    </label>

                    ${this.renderProgress()}
                </div>

                <div class="field fit-content">
                    <label for="userRating">
                        Valoración personal
                    </label>

                    <input
                        id="userRating"
                        name="userRating"
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value=${this.watchItem.userRating ?? ""}
                    >
                </div>

                <div class="field">
                    <label>Géneros</label>

                    <div class="checkbox-list">
                        ${settings.genres
                            .filter(genre =>
                                this.showAllGenres ||
                                this.isGenreSelected(genre.id)
                            )
                            .map(genre => html`
                                <label class="checkbox">
                                    <input
                                        type="checkbox"
                                        name="genres"
                                        value=${genre.id}
                                        ?checked=${this.isGenreSelected(
                                            genre.id
                                        )}
                                    >
                                    ${genre.name}
                                </label>
                            `)}
                    </div>

                    ${settings.genres.some(genre =>
                        !this.isGenreSelected(genre.id)
                    )
                        ? html`
                            <button
                                type="button"
                                @click=${() => {
                                    this.showAllGenres = !this.showAllGenres;
                                }}
                            >
                                ${this.showAllGenres
                                    ? "Ocultar opciones"
                                    : "Añadir géneros"}
                            </button>
                        `
                        : ""}
                </div>

                <div class="field">
                    <label for="originalTitle">
                        Título Uniforme (V.O.)
                    </label>

                    <input
                        id="originalTitle"
                        name="originalTitle"
                        type="text"
                        value=${this.media.originalTitle ?? ""}
                    >
                    <button
                        type="button"
                        @click=${this.searchOmdb}
                    >
                        <span role="img" aria-label="Buscar">🔍</span>
                        Buscar en OMDb
                    </button>
                </div>
                <div class="field">
                    <label for="poster">
                        URL del póster
                    </label>

                    <input
                        id="poster"
                        name="poster"
                        type="url"
                        placeholder="https://..."
                        value=${this.media.poster ?? ""}
                    >

                    <small>
                        Déjalo vacío para utilizar el póster de OMDb.
                    </small>
                </div>

                <div class="field">
                    <label for="trailer">URL del tráiler</label>

                    <input
                        id="trailer"
                        name="trailer"
                        type="url"
                        placeholder="https://..."
                        value=${this.media.trailer ?? ""}
                    >

                    <small>
                        Enlace al tráiler en Youtube u otras fuentes.
                    </small>
                </div>

                <!--Resultados-->
                ${this.renderOmdbSearch()}

                <div class="actions">
                    <button type="submit">
                        Guardar
                    </button>
                    <button
                        type="button"
                        class="delete-button"
                        @click=${this.deleteItem}
                    >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                        Eliminar
                    </button>
                    <button
                        type="button"
                        @click=${() => this.dispatchEvent(
                            new CustomEvent("cancel-edit", {
                                bubbles: true,
                                composed: true
                            })
                        )}
                    >
                        Cancelar
                    </button>
                </div>

            </form>
        `;
    }
}

customElements.define("edit-item-form", EditItemForm);
