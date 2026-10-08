import { LitElement, html, css } from "lit";

export class AppHeader extends LitElement {

    static styles = css`
        :host {
            display: block;
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
        /* Móvil */

        @media (max-width: 768px) {
           
            header {
                padding: 1rem 0.8rem 1.1rem;
            }

            h1 {
                font-size: 1.6rem;
            }



        }
    `;

    render() {
        return html`
            <header>
                <div class="hero-badge">
                    LAB EXPERIMENTAL
                </div>

                <h1>¿Qué Vemos?</h1>

                <p class="hero-subtitle">
                    Tu listado de pelis y series local con gestión de recomendaciones
                </p>

                <p class="hero-subtitle">
                    <small> No olvides exportarlo para evitar perderlo al cambiar de navegador o limpiar</small>
                </p>

                <div class="hero-actions">
                    <a class="a-button" href="/">
                        ← Volver a Joselon79 Lab
                    </a>
                </div>
            </header>
        `;
    }
}

customElements.define("app-header", AppHeader);