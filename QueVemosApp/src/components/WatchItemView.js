import { LitElement, html, css } from "lit";

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

    render() {
        if (!this.media || !this.watchItem) {
            return html``;
        }

        return html`
            <article class="media-card">
                <div class="media-info">
                    <h3>
                        ${this.media.title}
                    </h3>

                    <span class="media-type">
                        ${this.media.type}
                    </span>
                </div>
            </article>
        `;
    }
}


customElements.define("watch-item-view", WatchItemView);