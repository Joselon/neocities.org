import { LitElement, html, css } from "lit";
import { WatchList } from "./domain/WatchList.js";
import { WatchListService } from "./services/WatchListService.js";
import { WatchListStorage } from "./storage/WatchListStorage.js";

import "./components/AppHeader.js";
import "./components/AppFooter.js";
import "./components/WatchItemView.js";
import "./components/AddItemForm.js";

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
        const watchListStorage = new WatchListStorage(localStorage);
        const watchList = watchListStorage.load();

        this.service = new WatchListService(watchList);
        this.storage = watchListStorage;
        this.items = this.service.getItems();
    }


    render() {
        const items = this.items;

        return html`
            <app-header></app-header>
            <main>
                <section class="content">
                    <div class="storage-actions">
                        <button @click=${this.resetWatchList}>
                            Reset
                        </button>
                    </div>
                    <h2>${this.service.watchList.name}</h2>

                    <add-item-form @add-item=${this.addItem}></add-item-form>
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
        this.items = this.service.getItems();
    }
}

customElements.define("quevemos-app", App);
