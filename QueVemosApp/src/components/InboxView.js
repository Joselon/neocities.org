import { LitElement, html, css } from "lit";
import { RecommendationList } from "../domain/RecommendationList.js";
import { Recommendation } from "../domain/Recommendation.js";
import { InboxStorage } from "../storage/InboxStorage.js";
import { InboxFileStorage } from "../storage/InboxFileStorage.js";
import "./RecommendationListView.js";

export class InboxView extends LitElement {

    static styles = css`
        .inbox {
            margin-top: 2rem;
        }

        .section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            margin-bottom: 1rem;
            padding: 1rem 1.2rem;

            background:
                linear-gradient(
                    135deg,
                    rgba(70, 70, 70, 0.95),
                    rgba(35, 35, 35, 0.95)
                );

            border: 1px solid var(--border);
            border-radius: 20px;

            box-shadow:
                0 10px 30px rgba(0, 0, 0, 0.25);
        }

        .section-header h2 {
            margin: 0;
        }

        /* -------------------------
           Botones
           ------------------------- */

        .action-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            min-height: 34px;
            padding: 0.45rem 0.8rem;

            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 999px;

            background: rgba(255, 255, 255, 0.1);

            color: #ffffff;

            cursor: pointer;

            transition:
                background 0.2s ease,
                transform 0.2s ease;
        }

        .action-button:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-1px);
        }

        .action-button i {
            margin-right: 0.4rem;
        }
            
        /* -------------------------
           Lista de recomendaciones
           ------------------------- */

        .lists {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .list {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            width: 100%;
            padding: 1rem;

            border: 1px solid var(--border);
            border-radius: 14px;

            background: rgba(255, 255, 255, 0.06);

            color: var(--text);

            text-align: left;
            cursor: pointer;

            transition:
                background 0.2s ease,
                transform 0.2s ease,
                border-color 0.2s ease;
        }

        .list:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-1px);
        }

        .list strong,
        .list span {
            display: block;
            font-size: 1rem;
        }

        .list span {
            margin-top: 0.25rem;
            opacity: 0.7;

            color: var(--muted);
            font-size: 0.9rem;
        }

        /* -------------------------
           Vacía
           ------------------------- */

        .empty {
            opacity: 0.7;
            margin: 1rem 0 0;
            padding: 1rem;

            border-radius: 14px;

            background: rgba(255, 255, 255, 0.06);

            color: var(--muted);

            text-align: center;
        }

        /* -------------------------
           Móvil
           ------------------------- */

        @media (max-width: 768px) {

            .section-header {
                align-items: flex-start;
                gap: 0.8rem;
                padding: 1rem 0.8rem;
            }

            .section-header h2 {
                font-size: 1.2rem;
            }

            .action-button {
                min-height: 32px;
                padding: 0.4rem 0.7rem;
            }
        }
    `;

    static properties = {
        lists: { state: true },
        selectedList: { state: true },
    };

    constructor() {
        super();

        this.storage = new InboxStorage(localStorage);

        this.fileStorage = new InboxFileStorage();

        this.lists = this.storage.load();
        this.selectedList = undefined;

        // TEMPORAL: datos para probar la interfaz
        if (this.lists.length === 0) {
            this.lists = this.createTestLists();
        }
    }

    createTestLists() {

        const robocopRecommendation = new Recommendation({
            id: "test-recommendation-robocop",
            mediaId: "media-from-other-list-robocop",
            platforms: [
                "prime-video-es"
            ],
            spanishAudio: true,
            spanishSubtitles: false,
            reason: "Creo que os va a gustar mucho.",
            recommenderRating: 9
        });

        robocopRecommendation.media = {
            id: "media-from-other-list-robocop",
            title: "Robocop",
            originalTitle: "Robocop",
            type: "movie",
            year: 1987,
            genres: [
                "action",
                "science-fiction",
                "thriller"
            ],
            omdbId: "tt0093870",
            poster: "https://m.media-amazon.com/images/M/MV5BZWM1YzRhODktZDE1MC00NzBlLTk0NGMtOGNhZDQyMmJiZGFiXkEyXkFqcGc@._V1_SX300.jpg",
            matchKey: "robocop|movie|1987"
        };

        const newRecommendation = new Recommendation({
            id: "test-recommendation-new",
            mediaId: "media-from-other-list-new",
            platforms: [
                "filmin-es"
            ],
            spanishAudio: true,
            spanishSubtitles: true,
            reason: "🔞 Una gamberrada.",
            recommenderRating: 7
        });

        newRecommendation.media = {
            id: "media-from-other-list-new",
            title: "Movie 43",
            type: "movie",
            year: 2013,
            genres: [
                "comedy"
            ],
            omdbId: "tt1333125",
            poster: "https://m.media-amazon.com/images/M/MV5BMTg4NzQ3NDM1Nl5BMl5BanBnXkFtZTcwNjEzMjM3OA@@._V1_QL75_UX380_CR0,1,380,562_.jpg",
            runtimeMinutes: "94",
            matchKey: "movie43|movie|2013"
        };

        const otherRecommendation = new Recommendation({
            id: "test-recommendation-other",
            mediaId: "other-media-from-other-list-new",
            platforms: [
                "rtve-play-es"
            ],
            spanishAudio: true,
            spanishSubtitles: true,
            reason: "Genios del humor",
            recommenderRating: 7.2
        });

        otherRecommendation.media = {
            id: "media-from-other-list-new",
            title: "Muchachada nui",
            type: "series",
            year: 2007,
            genres: [
                "comedy"
            ],
            omdbId: "tt1111854",
            poster: "https://m.media-amazon.com/images/M/MV5BMjA4ODIyOTY1OF5BMl5BanBnXkFtZTgwNjc3NjcxMjE@._V1_SX300.jpg",
            runtimeMinutes: "30",
            matchKey: "muchachadanui|series|2013"
        };

        const halfDefinedRecommendation = new Recommendation({
            id: "test-recommendation-half-defined",
            mediaId: "half-defined-media-from-other-list-new",
            platforms: [
                "youtube-es"
            ],
            spanishAudio: true,
            spanishSubtitles: true,
            reason: "La primera, la auténtica. No siento las piernas XD",
            recommenderRating: 6.5
        });

        halfDefinedRecommendation.media = {
            id: "half-defined-media-from-other-list-new",
            title: "Rambo 1",
            poster: "https://th.bing.com/th?q=Rambo+First+Movie&w=120&h=120&c=1&rs=1&qlt=70&r=0&o=7&cb=1&dpr=1.4&pid=InlineBlock&rm=3&mkt=es-ES&cc=ES&setlang=es&adlt=moderate&t=1&mw=247",
            type: "movie",
            genres: [
                "action"
            ],
            matchKey: "rambo|movie"
        };

        const badRecommendation = new Recommendation({
            id: "test-recommendation-bad",
            mediaId: "bad-media-from-other-list-new",
            platforms: [
                "youtube-es"
            ],
            spanishAudio: true,
            spanishSubtitles: true,
            reason: "Pastelazo, lo mismo os gusta...",
            recommenderRating: 3
        });

        badRecommendation.media = {
            id: "bad-media-from-other-list-new",
            title: "El diario de Noa",
            type: "movie",
            year: 2004,
            genres: [
                "drama"
            ],
            matchKey: "eldiariodenoa|movie"
        };

        return [
            new RecommendationList({
                id: "test-list-001",
                name: "Recomendaciones desde : Lista Ajena",
                recommendations: [
                    robocopRecommendation,
                    newRecommendation,
                ]
            }),
            new RecommendationList({
                id: "test-list-002",
                name: "Recomendaciones desde : Otra Lista Ajena",
                recommendations: [
                    otherRecommendation,
                    halfDefinedRecommendation,
                    badRecommendation
                ]
            })
        ];
    }

    render() {
        return html`
            <link
                rel="stylesheet"
                href="/assets/icons/font-awesome-4.7.0/css/font-awesome.min.css"
            >

            <section class="inbox">

                <header class="section-header">
                    <i class="fa fa-inbox"></i>
                    <h2>Buzón de entrada</h2>

                    <button
                        type="button"
                        class="action-button"
                        @click=${this.importRecommendations}
                    >
                        <i class="fa fa-upload"></i>
                        Importar
                    </button>
                </header>

                ${this.lists.length === 0
                    ? html`
                        <p class="empty">
                            No tienes recomendaciones recibidas.
                        </p>
                    `
                    : html`
                        ${this.selectedList? html `
                            <button
                                class="list"
                                @click=${() => this.closeList()}
                            >
                                <strong>
                                 <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
                                 Comparando con tu Lista local...
                                </strong>
                                <span>
                                    Cerrar
                                </span>
                            </button>
                            `: html`
                            <div class="lists">
                            ${this.lists.map(list => html`
                                    <button
                                        class="list"
                                        @click=${() => this.selectList(list)}
                                    >
                                        <strong>
                                        <i class="fa fa-envelope-o" aria-hidden="true"></i></big> ${list.name}</strong>

                                        <span>
                                            ${list.recommendations.length}
                                            recomendaciones
                                        </span>
                                    </button>
                            `)}
                        </div>
                        `}
                    `
                }

                ${this.selectedList
                    ? html`
                        <recommendation-list-view
                            .recommendationList=${this.selectedList}
                        ></recommendation-list-view>
                    `
                    : ""
                }

            </section>
        `;
    }

    selectList(list) {
        this.selectedList = list;
    }

    closeList() {
        this.selectedList = undefined;
    }

    importRecommendations() {

        const input = document.createElement("input");

        input.type = "file";
        input.accept = "application/json,.json";

        input.addEventListener("change", async () => {

            const file = input.files[0];

            if (!file) {
                return;
            }

            try {

                const json = await file.text();

                const importedLists =
                    this.fileStorage.import(json);

                this.lists = [
                    ...this.lists,
                    ...importedLists
                ];

                this.storage.save(this.lists);

                this.selectedList = undefined;

            } catch (error) {

                console.error(error);

                alert(
                    `No se pudo importar al buzón de entrada:\n${error.message}`
                );
            }
        });

        input.click();
    }
}

customElements.define(
    "inbox-view",
    InboxView
);
