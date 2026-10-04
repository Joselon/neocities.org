# quevemos.html - WatchList Estructuras de Datos

```txt
joselon.neocities.org
│
├── index.html
├── links.html
├── quevemos.html       ← versión publicada
│
└── QueVemosApp/
      │
      ├── package.json
      ├── vite.config.js
      └── src/
            │
            ├── domain/
            │   ├── Media.js
            │   ├── WatchItem.js
            │   ├── WatchProgress.js
            │   ├── WatchList.js
            │   │
            │   ├── Recommendation.js
            │   ├── RecommendationItem.js
            │   │
            │   ├── Import.js
            │   ├── ImportItem.js
            │   └── ImportConflict.js
            ├── services/
            │   ├── MediaService.js
            │   ├── WatchListService.js
            │   ├── RecommendationService.js
            │   └── ImportService.js
            ├── catalog/
            │   ├── CatalogItem.js
            │   └── Platform.js
            ├── data/
            │   ├── settings.json
            │   ├── media.json
            │   └── my-watchList.json
            └── components/
                    │
                    ▼
                 npm run build
                    │
                    ▼
              QueVemosApp/dist/
                    │
                    ├── quevemos.html
                    └── assets/
                    
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

Media
WatchProgress
WatchItem
WatchList
CatalogItem
Platform
Recommendation
RecommendationItem
Import
ImportItem
ImportConflict
Settings
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
