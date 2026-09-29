# quevemos.html - WatchList Estructuras de Datos

```txt
WatchList/
│
├── settings.json
├── media.json
├── my-watchList.json
│
├── recommendations/
│   ├── recommendation-001.json
│   └── recommendation-002.json
│
└── imports/
    ├── import-001.json
    └── import-002.json
```

```ts
interface WatchList {
    version: number;

    id: string;
    name: string;

    items: WatchItem[];
}

interface WatchItem {
    mediaId: string;

    platformId?: string;

    reason?: string;

    spanishAudio: boolean;
    spanishSubtitles: boolean;

    status: WatchStatus;

    userRating?: number;

    addedAt: string;
}

type WatchStatus =
    | "pending"
    | "watching"
    | "paused"
    | "watched"
    | "discarded";

interface Media {
    id: string;
    title: string;
    originalTitle?: string;

    type: "movie" | "series";

    year?: number;

    genres: Genre[];

    matchKey: string;

    omdbId?: string;

    poster?: string;

    ratings?: {
        imdb?: number;
        metacritic?: number;
    };
}

type MediaType =
    | "movie"
    | "series";

```

| Campo           | Tipo       | Obligatorio | Valores                          |
| --------------- | ---------- | ----------: | -------------------------------- |
| `id`            | `string`   |          Sí | UUID/ID interno                  |
| `title`         | `string`   |          Sí | Título que mostramos             |
| `originalTitle` | `string`   |          No | Título original                  |
| `type`          | enum       |          Sí | `movie`, `series`                |
| `year`          | `number`   |          No | Año                              |
| `genres`        | array enum |          No | Géneros                          |
| `matchKey`      | `string`   |          Sí | Clave calculada                  |
| `omdbId`        | `string`   |          No | IMDb ID                          |
| `poster`        | `string`   |          No | URL                              |
| `rating`        | `number`   |          No | 0–10                             |

watchItem:

- mediaId
- platform
- reason
- spanishAudio
- spanishSubtitles
- status
- addedAt

type:

- movie
- series

genres:

- action          Acción
- adventure       Aventuras
- animation       Animación
- comedy          Comedia
- crime           Crimen
- documentary     Documental
- drama           Drama
- family          Familiar
- fantasy         Fantasía
- history         Historia
- horror          Terror
- music           Musical
- mystery         Misterio
- romance         Romance
- science-fiction Ciencia ficción
- sport           Deporte
- thriller        Thriller
- war             Bélica
- western         Western

plattforms:

- netflix-es
Netflix España

- max-es
Max España

- prime-video-es
Prime Video España

- disney-plus-es
Disney+ España

- movistar-plus-es
Movistar Plus+ España

- apple-tv-plus-es
Apple TV+ España

- filmin-es
Filmin España

- skyshowtime-es
SkyShowtime España

- atresplayer-es
Atresplayer España

- rtve-play-es
RTVE Play España
