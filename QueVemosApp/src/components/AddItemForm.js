import { LitElement, html, css } from "lit";
import settings from "../data/setting.json";

export class AddItemForm extends LitElement {

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
        }

        input,
        select {
            width: 100%;
            padding: 0.7rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            background: var(--surface-strong);
            color: var(--text);
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
        }

        .checkbox input {
            width: auto;
        }
        .details-button {
            margin-bottom: 1rem;
            padding: 0.45rem 0.8rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            background: transparent;
            color: var(--muted);
            cursor: pointer;
        }

        .details-button:hover {
            color: var(--text);
            border-color: var(--accent);
        }

        .details {
            margin-bottom: 1rem;
            padding: 1rem;
            border: 1px solid var(--border);
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.04);
        }

    `;

    static properties = {
        showDetails: {
            state: true
        }
    };

    constructor() {
        super();

        this.showDetails = false;
    }

    addItem(event) {
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

        this.dispatchEvent(new CustomEvent("add-item", {
            detail: {
                title: form.title.value.trim(),
                type: form.type.value,
                year: form.year?.value
                    ? Number(form.year.value)
                    : undefined,
                originalTitle: form.originalTitle?.value.trim() || undefined,
                genres,
                platforms
            },
            bubbles: true,
            composed: true
        }));
    }

    resetForm() {
        this.renderRoot.querySelector("form").reset();
        this.showDetails = false;
    }

    toggleDetails() {
        this.showDetails = !this.showDetails;
    }

    render() {

        return html`
            <hr class="divider"></hr>
            <div class="header">
                <div class="header-icon">
                    <i class="fa fa-plus"></i>
                </div>

                <div>
                    <h2>Añadir elemento</h2>
                    <p>Estás añadiendo un elemento a tu lista manualmente</p>
                </div>
            </div>
            <form @submit=${this.addItem}>
                <div class="field">
                    <label for="title">
                        Título
                    </label>

                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Título"
                        required
                    >
                </div>

                <div class="field fit-content">
                    <label for="type">
                        Tipo
                    </label>

                    <select id="type" name="type">
                        ${settings.mediaTypes.map(type => html`
                            <option value=${type.id}>
                                ${type.name}
                            </option>
                        `)}
                    </select>
                </div>

                <button
                    type="button"
                    class="details-button"
                    @click=${this.toggleDetails}
                >
                    ${this.showDetails
                        ? "− Ocultar detalles"
                        : "+ Más detalles"
                    }
                </button>

                ${this.showDetails
                    ? html`
                        <div class="details">

                            <div class="field fit-content">
                                <label for="year">
                                    Año
                                </label>

                                <input
                                    id="year"
                                    name="year"
                                    type="number"
                                    min="1888"
                                    max="2100"
                                    placeholder="Año"
                                >
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
                                                >
                                                ${platform.name}
                                            </label>
                                        `)}
                                </div>
                            </div>

                            <div class="field">
                                <label for="originalTitle">
                                    Título original
                                </label>

                                <input
                                    id="originalTitle"
                                    name="originalTitle"
                                    type="text"
                                    placeholder="Título original"
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
                                            >
                                            ${genre.name}
                                        </label>
                                    `)}
                                </div>
                            </div>
                            
                        </div>
                    `
                    : ""
                }

                <button type="submit">
                    Añadir
                </button>

            </form>
           <hr class="divider"></hr>
        `;
    }
}


customElements.define("add-item-form", AddItemForm);