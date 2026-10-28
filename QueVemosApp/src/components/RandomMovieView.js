
import { LitElement, html, css } from "lit";

export class RandomMovieView extends LitElement {

    static properties = {
        movie: { type: Object },
        loading: { type: Boolean },
        error: { type: String }
    };

    static styles = css`
        :host {
            display: block;
            color: var(--text);
        }

        .backdrop {
            position: fixed;
            inset: 0;
            z-index: 1000;
            display: grid;
            place-items: center;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.78);
        }

        .dialog {
            position: relative;
            width: min(100%, 680px);
            max-height: 90vh;
            overflow-y: auto;
            padding: 1.5rem;
            border: 1px solid var(--border);
            border-radius: 16px;
            background: var(--surface-strong);
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
        }

        .close {
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
        }

        .movie {
            display: grid;
            grid-template-columns: minmax(110px, 180px) minmax(0, 1fr);
            gap: 1.25rem;
            margin-top: 1rem;
        }

        .poster {
            width: 100%;
            border-radius: 8px;
            object-fit: cover;
        }

        .placeholder {
            display: grid;
            place-items: center;
            min-height: 160px;
            padding: 0.5rem;
            border-radius: 8px;
            background: var(--surface);
            text-align: center;
        }

        .actions {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin-top: 1.5rem;
        }

        button {
            padding: 0.7rem 1rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            color: var(--text);
            background: var(--surface);
            cursor: pointer;
        }

        .primary {
            border-color: var(--accent);
            background: var(--accent);
            color: #111;
        }

        button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .muted {
            color: var(--muted);
        }

        @media (max-width: 480px) {
            .movie {
                grid-template-columns: 100px minmax(0, 1fr);
                gap: 0.75rem;
            }

            .dialog {
                padding: 1rem;
            }
        }
    `;

    constructor() {
        super();
        this.movie = null;
        this.loading = false;
        this.error = "";
    }

    emit(name, detail = {}) {
        this.dispatchEvent(new CustomEvent(name, {
            detail,
            bubbles: true,
            composed: true
        }));
    }

    close() {
        this.emit("close-random-movie");
    }

    discoverAnother() {
        this.emit("discover-another-movie");
    }

    addMovie() {
        if (this.movie && !this.loading) {
            this.emit("add-random-movie", {
                details: this.movie
            });
        }
    }

    render() {
        return html`
            <div
                class="backdrop"
                @click=${this.close}
            >
                <section
                    class="dialog"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="random-movie-title"
                    @click=${event => event.stopPropagation()}
                >
                    <button
                        class="close"
                        aria-label="Cerrar"
                        @click=${this.close}
                    >✕</button>

                    <h2 id="random-movie-title">
                        ¿Qué vemos hoy?
                    </h2>

                    ${this.loading ? html`
                        <p role="status">
                            Buscando una película...
                        </p>
                    ` : this.error ? html`
                        <p role="alert">${this.error}</p>
                    ` : this.movie ? html`
                        <div class="movie">
                            ${this.movie.Poster &&
                            this.movie.Poster !== "N/A" ? html`
                                <img
                                    class="poster"
                                    src=${this.movie.Poster}
                                    alt="Cartel de ${this.movie.Title}"
                                />
                            ` : html`
                                <div class="placeholder">
                                    Sin cartel disponible
                                </div>
                            `}

                            <div>
                                <h3>${this.movie.Title}</h3>
                                <p class="muted">
                                    ${this.movie.Year || ""}
                                    ${this.movie.Runtime &&
                                    this.movie.Runtime !== "N/A"
                                        ? ` · ${this.movie.Runtime}`
                                        : ""}
                                </p>
                                <p>${this.movie.Genre &&
                                    this.movie.Genre !== "N/A"
                                        ? this.movie.Genre
                                        : ""}
                                </p>
                                <p>${this.movie.Plot &&
                                    this.movie.Plot !== "N/A"
                                        ? this.movie.Plot
                                        : "Sin sinopsis disponible."}
                                </p>
                                <p class="muted">
                                    Dirección: ${this.movie.Director &&
                                    this.movie.Director !== "N/A"
                                        ? this.movie.Director
                                        : "No disponible"}
                                </p>
                                <p class="muted">
                                    IMDb: ${this.movie.imdbRating &&
                                    this.movie.imdbRating !== "N/A"
                                        ? this.movie.imdbRating
                                        : "Sin puntuación"}
                                </p>
                            </div>
                        </div>
                    ` : html`
                        <p>Vamos a buscar una película.</p>
                    `}

                    <div class="actions">
                        <button
                            @click=${this.discoverAnother}
                            ?disabled=${this.loading}
                        >
                            Otra película
                        </button>

                        <button
                            class="primary"
                            @click=${this.addMovie}
                            ?disabled=${this.loading || !this.movie}
                        >
                            Añadir a mi lista
                        </button>
                    </div>
                </section>
            </div>
        `;
    }
}

customElements.define("random-movie-view", RandomMovieView);
