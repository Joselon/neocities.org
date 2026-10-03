import { LitElement, html, css } from "lit";
import { WatchList } from "./domain/WatchList.js";
import { WatchListService } from "./services/WatchListService.js";

export class App extends LitElement {
    static properties = {
        items: { state: true }
    };
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

        /* Cabecera */

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

        h1 {
            color: white;

            background:
                linear-gradient(
                    135deg,
                    var(--accent),
                    var(--accent-2)
                );

            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 18px;

            padding: 0.7rem 1rem;
            margin: 0.2rem auto 0.75rem;

            box-shadow:
                0 8px 20px rgba(255, 107, 44, 0.2);

            max-width: 720px;
        }

        .hero-subtitle {
            max-width: 720px;
            margin: 0 auto 1rem;
            color: var(--muted);
            font-size: 1rem;
        }

        .hero-actions {
            display: flex;
            justify-content: center;
        }

        .a-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            border: 1px solid rgba(255, 255, 255, 0.16);
            border-radius: 999px;

            padding: 0.65rem 1rem;

            background: rgba(255, 255, 255, 0.06);

            box-shadow:
                0 6px 16px rgba(0, 0, 0, 0.16);
        }

        .a-button:hover {
            background: rgba(255, 255, 255, 0.12);
            transform: translateY(-1px);
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

        .media-list {
            display: flex;
            flex-direction: column;
            gap: 0.9rem;
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

        .empty {
            margin: 1rem 0 0;
            padding: 1rem;

            border-radius: 14px;

            background: rgba(255, 255, 255, 0.06);
            color: var(--muted);

            text-align: center;
        }

        /* Footer */

        footer {
            position: relative;

            background:
                linear-gradient(
                    135deg,
                    rgba(70, 70, 70, 0.95),
                    rgba(35, 35, 35, 0.95)
                );

            font-size: 12px;
            text-align: center;

            width: 100%;

            padding: 1rem 0.8rem;
            margin-top: 1.2rem;

            border-radius: 18px;
            border: 1px solid var(--border);

            box-shadow:
                0 10px 30px rgba(0, 0, 0, 0.2);
        }

        footer p {
            margin: 0.5rem 0;
        }

        footer a {
            color: var(--muted);
        }

        footer a:hover {
            color: #ffffff;
        }

        /* Móvil */

        @media (max-width: 768px) {
            :host {
                padding: 12px 10px 28px;
            }

            header {
                padding: 1rem 0.8rem 1.1rem;
            }

            h1 {
                font-size: 1.6rem;
            }

            .content {
                padding: 1rem 0.8rem 1.2rem;
            }

            .media-card {
                align-items: flex-start;
                flex-direction: column;
            }
        }
    `;

    constructor() {
        super();
        
        this.items = [];

        const watchList = new WatchList({
            name: "La nuestra"
        });

        this.service = new WatchListService(watchList);
        this.items = this.service.getItems();
    }

    addItem(event) {
        event.preventDefault();

        const form = event.target;
        const title = form.title.value.trim();
        const type = form.type.value;

        if (!title) {
            return;
        }

        const result = this.service.addItem(title, type);

        if (!result.success) {
            console.error(result.error);
            return;
        }

        this.items = this.service.getItems();

        form.reset();
    }

    render() {
        const items = this.items;

        return html`
            <header>
                <div class="hero-badge">
                    LAB EXPERIMENTAL
                </div>

                <h1>¿Qué Vemos?</h1>

                <p class="hero-subtitle">
                    Listado de recomendaciones de pelis y series personales
                </p>

                <div class="hero-actions">
                    <a class="a-button" href="/">
                        ← Volver a Joselon79 Lab
                    </a>
                </div>
            </header>

            <main>
                <section class="content">
                    <h2>Mi lista</h2>

                    <form @submit=${this.addItem}>
                        <input
                            name="title"
                            type="text"
                            placeholder="Título"
                            required
                        >

                        <select name="type">
                            <option value="movie">Película</option>
                            <option value="series">Serie</option>
                        </select>

                        <button type="submit">
                            Añadir
                        </button>
                    </form>
                    <br/>
                    ${items.length === 0
                        ? html`
                            <p class="empty">
                                La lista está vacía.
                            </p>
                        `
                        : html`
                            <div class="media-list">
                                ${items.map(item => html`
                                    <article class="media-card">
                                        <div class="media-info">
                                            <h3>
                                                ${item.media.title}
                                            </h3>

                                            <span class="media-type">
                                                ${item.media.type}
                                            </span>
                                        </div>
                                    </article>
                                `)}
                            </div>
                        `
                    }
                </section>
            </main>

            <footer>
                <p>
                    Contacto por Correo
                    (<a href="mailto:joselon79@gmail.com">
                        joselon79@gmail.com
                    </a>)
                </p>

                <p>
                    <a href="https://neocities.org/">
                        Perfil Neocities
                    </a>
                </p>

                <p>
                    <a href="https://neocities.org/">
                        Política de Cookies de Neocities.org
                    </a>
                </p>

                <p>
                    Copyleft © Joselon79
                </p>
            </footer>
        `;
    }
}

customElements.define("quevemos-app", App);
