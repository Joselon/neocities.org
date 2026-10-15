
import { LitElement, html, css } from "lit";

export class AppHeader extends LitElement {

    static properties = {
        _helpOpen: { state: true }
    };

    constructor() {
        super();
        this._helpOpen = false;
    }

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
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
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
            box-shadow: 0 8px 20px rgba(255, 107, 44, 0.2);
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
            align-items: center;
            flex-wrap: wrap;
            gap: 0.65rem;
        }

        .a-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            border: 1px solid rgba(255, 255, 255, 0.16);
            border-radius: 999px;
            padding: 0.65rem 1rem;
            background: rgba(255, 255, 255, 0.06);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.16);
            font: inherit;
            cursor: pointer;
            transition:
                background 0.2s ease,
                transform 0.2s ease;
        }

        .a-button:hover {
            background: rgba(255, 255, 255, 0.12);
            transform: translateY(-1px);
        }

        .a-button:focus-visible,
        .close-button:focus-visible {
            outline: 2px solid var(--accent-2);
            outline-offset: 3px;
        }

        .help-button {
            border-color: rgba(255, 154, 60, 0.4);
            color: #ffd7bf;
        }

        .help-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.35rem;
            height: 1.35rem;
            border: 1px solid currentColor;
            border-radius: 50%;
            font-weight: 700;
            font-size: 0.85rem;
        }

        /* Overlay de ayuda */

        .help-overlay {
            position: fixed;
            inset: 0;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.78);
            backdrop-filter: blur(5px);
        }

        .help-panel {
            width: 100%;
            max-width: 680px;
            max-height: 90vh;
            overflow-y: auto;
            overscroll-behavior: contain;

            background:
                radial-gradient(
                    ellipse at top right,
                    rgba(255, 107, 44, 0.12),
                    transparent 55%
                ),
                #202020;

            border: 1px solid var(--border);
            border-radius: 22px;
            padding: 1.4rem;
            color: var(--text);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .help-heading {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 1rem;
            margin-bottom: 0.4rem;
        }

        .help-heading h2 {
            margin: 0;
            color: white;
            font-size: 1.55rem;
        }

        .help-intro {
            margin: 0 0 1.2rem;
            color: var(--muted);
            line-height: 1.5;
        }

        .close-button {
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 2.5rem;
            height: 2.5rem;
            border: 1px solid var(--border);
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.06);
            color: white;
            font-size: 1.4rem;
            cursor: pointer;
        }

        .close-button:hover {
            background: rgba(255, 255, 255, 0.14);
        }

        .help-steps {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.8rem;
        }

        .help-card {
            min-width: 0;
            padding: 1rem;
            border: 1px solid var(--border);
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.035);
        }

        .step-heading {
            display: flex;
            align-items: center;
            gap: 0.65rem;
            margin-bottom: 0.6rem;
        }

        .step-icon {
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 12px;
            background: rgba(255, 107, 44, 0.16);
            font-size: 1.35rem;
        }

        .step-number {
            display: block;
            margin-bottom: 0.1rem;
            color: var(--accent-2);
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .help-card h3 {
            margin: 0;
            color: white;
            font-size: 1rem;
            line-height: 1.3;
        }

        .help-card p {
            margin: 0;
            color: var(--muted);
            font-size: 0.91rem;
            line-height: 1.55;
        }

        .help-note {
            display: flex;
            align-items: flex-start;
            gap: 0.8rem;
            margin-top: 1rem;
            padding: 1rem;
            border: 1px solid rgba(255, 154, 60, 0.3);
            border-radius: 14px;
            background: rgba(255, 107, 44, 0.09);
        }

        .help-note-icon {
            flex-shrink: 0;
            font-size: 1.3rem;
        }

        .help-note p {
            margin: 0;
            color: var(--muted);
            font-size: 0.9rem;
            line-height: 1.55;
        }

        .help-note strong {
            color: #ffd7bf;
        }

        .help-footer {
            display: flex;
            justify-content: center;
            margin-top: 1.2rem;
        }

        .close-text-button {
            background: linear-gradient(
                135deg,
                var(--accent),
                var(--accent-2)
            );
            border: 0;
            color: white;
            font-weight: 600;
            box-shadow: 0 5px 16px rgba(255, 107, 44, 0.18);
        }

        .close-text-button:hover {
            background: linear-gradient(
                135deg,
                var(--accent-2),
                var(--accent)
            );
        }

        /* Móvil */

        @media (max-width: 768px) {
            header {
                padding: 1rem 0.8rem 1.1rem;
            }

            h1 {
                font-size: 1.6rem;
            }

            .hero-actions {
                gap: 0.55rem;
            }

            .help-overlay {
                padding: 0.65rem;
                align-items: center;
            }

            .help-panel {
                max-height: 92vh;
                padding: 1rem;
                border-radius: 18px;
            }

            .help-heading h2 {
                font-size: 1.35rem;
            }

            .help-steps {
                grid-template-columns: 1fr;
                gap: 0.65rem;
            }

            .help-card {
                padding: 0.85rem;
            }

            .step-heading {
                margin-bottom: 0.4rem;
            }

            .help-card p {
                font-size: 0.9rem;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            a,
            .a-button {
                transition: none;
            }
        }
    `;

    _openHelp() {
        this._helpOpen = true;
    }

    _closeHelp() {
        this._helpOpen = false;
    }

    _handleHelpKeydown(event) {
        if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            this._closeHelp();
        }
    }

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
                    <small>
                        No olvides exportarlo para evitar perderlo al cambiar
                        de dispositivo/navegador o limpiar los datos de navegación
                    </small>
                </p>

                <div class="hero-actions">
                    <a class="a-button" href="/">
                        ← Volver a Joselon79 Lab
                    </a>

                    <button
                        class="a-button help-button"
                        type="button"
                        @click=${this._openHelp}
                        aria-haspopup="dialog"
                        aria-expanded=${this._helpOpen}
                    >
                        <span class="help-icon" aria-hidden="true">i</span>
                        ¿Cómo funciona?
                    </button>
                </div>
            </header>

            ${this._helpOpen ? html`
                <div
                    class="help-overlay"
                    @click=${(event) => {
                        if (event.target === event.currentTarget) {
                            this._closeHelp();
                        }
                    }}
                    @keydown=${this._handleHelpKeydown}
                >
                    <section
                        class="help-panel"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="help-title"
                        aria-describedby="help-description"
                    >
                        <div class="help-heading">
                            <h2 id="help-title">
                                ¿Cómo funciona QueVemos?
                            </h2>

                            <button
                                class="close-button"
                                type="button"
                                @click=${this._closeHelp}
                                aria-label="Cerrar ayuda"
                                autofocus
                            >
                                ×
                            </button>
                        </div>

                        <p class="help-intro" id="help-description">
                            Organiza lo que quieres ver, lleva el seguimiento de visionado
                            y comparte tus descubrimientos con los demás.
                        </p>

                        <div class="help-steps">
                            <article class="help-card">
                                <div class="step-heading">
                                    <span class="step-icon"
                                        aria-hidden="true">🎬</span>
                                    <div>
                                        <span class="step-number">Paso 1</span>
                                        <h3>Tu lista, a tu manera</h3>
                                    </div>
                                </div>

                                <p>
                                    Añade películas, series y documentales.
                                    Completa sus datos cuando quieras con el botón Editar(lápiz) y marca
                                    si están pendientes, en curso, en pausa
                                    o terminados con los botones del pie de la tarjeta.
                                </p>
                                <p>
                                    <strong>¿Por dónde ibas?</strong>
                                    Guarda la temporada, el episodio o el
                                    minuto para retomarlos después. 
                                    Puedes editar para anotarlo y consultarlo con el botón (i)
                                </p>
                            </article>

                            <article class="help-card">
                                <div class="step-heading">
                                    <span class="step-icon"
                                        aria-hidden="true">📝</span>
                                    <div>
                                        <span class="step-number">Paso 2</span>
                                        <h3>Decide qué hacer con cada título</h3>
                                    </div>
                                </div>

                                <p>
                                    Si te interesa, déjalo pendiente o empieza
                                    a verlo. Si no te convence, puedes
                                    descartarlo e indicar el motivo.
                                </p>
                                <p>
                                    <strong>¡No lo pierdes!</strong>
                                    El título descartado se conserva para
                                    consultar más adelante por qué no te
                                    interesaba.
                                </p>
                            </article>

                            <article class="help-card">
                                <div class="step-heading">
                                    <span class="step-icon"
                                        aria-hidden="true">📨</span>
                                    <div>
                                        <span class="step-number">Paso 3</span>
                                        <h3>Comparte tus recomendaciones</h3>
                                    </div>
                                </div>

                                <p>
                                    Elige títulos de tu lista y crea un enlace
                                    para compartirlos con familiares o amigos.
                                    Así podrán recibir tus propuestas en su
                                    propia aplicación.
                                </p>
                                <p>
                                    El motivo puede servir para contar por qué
                                    recomiendas una película o qué te llamó
                                    la atención.
                                </p>
                            </article>

                            <article class="help-card">
                                <div class="step-heading">
                                    <span class="step-icon"
                                        aria-hidden="true">📬</span>
                                    <div>
                                        <span class="step-number">Paso 4</span>
                                        <h3>Recibe y decide</h3>
                                    </div>
                                </div>

                                <p>
                                    Revisa las recomendaciones que recibas
                                    en la bandeja de entrada. Puedes aceptarlas
                                    para añadirlas a tu lista o descartarlas.
                                </p>
                                <p>
                                    Si el título ya está en tu lista, puedes
                                    relacionar la recomendación con ese registro
                                    en lugar de crear otro.
                                </p>
                            </article>
                        </div>

                        <div class="help-note">
                            <span class="help-note-icon"
                                aria-hidden="true">💾</span>
                            <p>
                                <strong>Importante: tus datos son locales.</strong>
                                Tu lista se guarda en el navegador y dispositivo
                                donde utilizas la aplicación. Compartir
                                recomendaciones no sincroniza las listas.
                                Exporta una copia de seguridad periódicamente
                                y guárdala en un lugar seguro.
                            </p>
                        </div>

                        <div class="help-footer">
                            <button
                                class="a-button close-text-button"
                                type="button"
                                @click=${this._closeHelp}
                            >
                                ¡Entendido!
                            </button>
                        </div>
                    </section>
                </div>
            ` : ""}
        `;
    }
}

customElements.define("app-header", AppHeader);
