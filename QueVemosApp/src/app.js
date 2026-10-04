import { LitElement, html, css } from "lit";
import { WatchList } from "./domain/WatchList.js";
import { WatchListService } from "./services/WatchListService.js";

import "./components/AppHeader.js";
import "./components/AppFooter.js";
import "./components/WatchItemView.js";

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

        /* Lista */

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

    static properties = {
        items: { state: true }
    };
    
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
            <app-header></app-header>
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
                                    <watch-item-view
                                        .media=${item.media}
                                        .watchItem=${item.watchItem}
                                    ></watch-item-view>
                                `)}
                            </div>
                        `
                    }
                </section>
            </main>
            <app-footer></app-footer>
        `;
    }
}

customElements.define("quevemos-app", App);
