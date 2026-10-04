import { LitElement, html, css } from "lit";
import { WatchProgress } from "../domain/WatchProgress.js";
import { MediaType } from "../domain/MediaType.js";
import settings from "../data/setting.json";

export class EditItemForm extends LitElement {

    static styles = css`
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
        watchItem: { attribute: false }
    };

    constructor() {
        super();

        this.media = undefined;
        this.watchItem = undefined;
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
                    genres
                },

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

    createProgress(form) {
        if (this.media.type === MediaType.MOVIE) {
            const minute = form.minute.value;

            if (!minute) {
                return undefined;
            }

            return new WatchProgress({
                minute: Number(minute)
            });
        }

        const season = form.season.value;
        const episode = form.episode.value;

        if (!season && !episode) {
            return undefined;
        }

        return new WatchProgress({
            season: season
                ? Number(season)
                : undefined,
            episode: episode
                ? Number(episode)
                : undefined
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
        if (this.media?.type === MediaType.MOVIE) {
            return html`
                <div class="field">
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

        return html`
            <div class="progress">

                <div class="field">
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

                <div class="field">
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

            </div>
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

                <div class="field">
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

                <div class="field">
                    <label for="year">
                        Año
                    </label>

                    <input
                        id="year"
                        name="year"
                        type="number"
                        min="1888"
                        max="2100"
                        value=${this.media.year ?? ""}
                    >
                </div>

                <div class="field">
                    <label for="originalTitle">
                        Título original
                    </label>

                    <input
                        id="originalTitle"
                        name="originalTitle"
                        type="text"
                        value=${this.media.originalTitle ?? ""}
                    >
                </div>

                <div class="field">
                    <label>
                        Géneros
                    </label>

                    <div class="checkbox-list">
                        ${settings.genres.map(genre => html`
                            <label class="checkbox">
                                <input
                                    type="checkbox"
                                    name="genres"
                                    value=${genre.id}
                                    ?checked=${this.isGenreSelected(genre.id)}
                                >
                                ${genre.name}
                            </label>
                        `)}
                    </div>
                </div>

                <div class="field">
                    <label>
                        Plataformas
                    </label>

                    <div class="checkbox-list">
                        ${settings.platforms
                            .filter(platform => platform.active)
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

                <div class="field">
                    <label for="userRating">
                        Nota personal
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
                    <label>
                        Progreso
                    </label>

                    ${this.renderProgress()}
                </div>

                <div class="actions">
                    <button type="submit">
                        Guardar
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
