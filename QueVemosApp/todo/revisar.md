# Código a Revisar

## TDD

```sh
✔ Media requires a title (3.187927ms)
✔ Media requires a type (0.383038ms)
✔ Media generates an id automatically (0.79967ms)
✔ Media generates a different id for each instance (0.278041ms)
✔ Media stores its basic data (0.550609ms)
✔ Media generates a matchKey from title and type (0.236557ms)
✔ Media:matchKey normalizes title case and surrounding spaces (0.211566ms)
✔ Media:matchKey includes the year when available (0.293318ms)
✔ Media:matchKey changes when year is added (0.69555ms)
✔ Media rejects a title containing only spaces (0.476374ms)
✔ Media rejects a title that is too long (0.228597ms)
✔ Media accepts a title with 250 characters (0.216316ms)
✔ Media requires a valid type (0.19124ms)
✔ Media accepts a movie type (0.114085ms)
✔ Media accepts a series type (0.151042ms)
✔ Recommendation: creates a recommendation (5.789795ms)
✔ Recommendation: generates a local id (0.194771ms)
✔ Recommendation: generates a different id for each recommendation (0.218277ms)
✔ Recommendation: mediaId is required (0.503316ms)
✔ Recommendation: optional information can be omitted (0.182499ms)
✔ Recommendation: does not contain WatchItem progress (0.144257ms)
✔ Recommendation: starts with pending status (0.133423ms)
✔ Recommendation: rejects invalid status (0.227099ms)
✔ RecommendationExchange: creates an exchange (7.766971ms)
✔ RecommendationExchange: sender is required (0.490634ms)
✔ RecommendationExchange: items must be an array (0.182508ms)
✔ RecommendationExchange: stores exchange items (0.176799ms)
✔ RecommendationList: requires a name (4.874493ms)
✔ RecommendationList: generates a different id for each list (0.384035ms)
✔ RecommendationList: accepts recommendations (0.324324ms)
✔ RecommendationList: accepts multiple recommendations (0.571264ms)
✔ RecommendationList: rejects invalid recommendations (0.289231ms)
✔ RecommendationList: accepts supported versions (0.166501ms)
✔ RecommendationList: rejects unsupported version (0.235045ms)
✔ WatchItem requires a mediaId (2.877469ms)
✔ WatchItem starts with pending status (0.258661ms)
✔ WatchItem generates addedAt automatically (0.267735ms)
✔ WatchItem starts without Spanish audio (0.144419ms)
✔ WatchItem starts without Spanish subtitles (0.159306ms)
✔ WatchItem accepts a status (0.145965ms)
✔ WatchItem rejects an invalid status (0.211382ms)
✔ WatchItem accepts a platform (0.137726ms)
✔ WatchItem accepts a reason (0.363683ms)
✔ WatchItem accepts a userRating (0.440187ms)
✔ WatchItem can start watching (0.208898ms)
✔ WatchItem manages progress (0.430834ms)
✔ WatchItem requires a WatchProgress (1.000005ms)
✔ WatchItem accepts a WatchProgress (0.132153ms)
✔ WatchList starts empty (3.665376ms)
✔ WatchList rejects invalid items (2.519167ms)
✔ WatchList rejects invalid media (0.20421ms)
✔ WatchList can add a Media (0.46042ms)
✔ WatchList does not add the same Media twice (0.395166ms)
✔ WatchList can add a WatchItem for an existing Media (1.521253ms)
✔ WatchList rejects a WatchItem whose Media does not exist (0.341669ms)
✔ WatchList removeMedia no elimina un Media que tiene un WatchItem asociado (0.576709ms)
✔ WatchList:removeMedia elimina un Media sin WatchItem asociado (0.459099ms)
✔ WatchList: does not allow adding the same media twice (0.563945ms)
✔ WatchList: allows media with the same title but different type (0.259152ms)
✔ WatchList: accepts supported versions (0.106422ms)
✔ WatchList: rejects unsupported version (0.201298ms)
✔ WatchProgress stores a minute (0.957267ms)
✔ RecommendationService: creates a recommendation from a WatchItem (5.867882ms)
✔ RecommendationService: rejects a WatchItem that is not in the WatchList (0.619552ms)
✔ RecommendationService: creates a recommendation list (0.544299ms)
✔ RecommendationService: creates a recommendation for each selected WatchItem (0.22222ms)
✔ RecommendationService: copies WatchItem data to Recommendation (0.212056ms)
✔ RecommendationService: copies platforms independently (0.182213ms)
✔ RecommendationService: creates pending recommendation (0.218626ms)
✔ RecommendationService: does not copy WatchItem progress or watchedAt (0.174808ms)
✔ RecommendationService: creates a recommendation exchange item (0.790125ms)
✔ RecommendationService: exchange rejects a recommendation with unknown mediaId (0.565552ms)
✔ RecommendationService: creates an exchange item with a complete media snapshot (0.323811ms)
✔ RecommendationService: finds media by matching omdbId (0.584934ms)
✔ RecommendationService: ignores empty omdbId (0.745814ms)
✔ RecommendationService: finds candidate by exact matchKey (0.204797ms)
✔ RecommendationService: finds media by matching matchKey (0.250526ms)
✔ RecommendationService: does not duplicate candidate matching omdbId and matchKey (0.228337ms)
✔ RecommendationService: finds candidate by matchKey despite media differences (0.172345ms)
✔ RecommendationService: returns new when no media matches (0.146058ms)
✔ RecommendationService: finds candidate by partial title match (0.192727ms)
✔ RecommendationService: accepts a recommendation and creates a WatchItem (0.639772ms)
✔ RecommendationService: accepts a recommendation without recommenderRating (0.181077ms)
✔ RecommendationService: accepts a recommendation without reason (0.221038ms)
✔ RecommendationService: discards a recommendation (0.117912ms)
✔ RecommendationService: discarding a recommendation does not create a WatchItem (0.11238ms)
✔ RecommendationService: identifies a candidate when matchKey matches but media data differs (0.264956ms)
✔ RecommendationService: detects differences in a candidate media (0.235881ms)
✔ RecommedationService.resolveRecommendation: create adds a local Media and WatchItem (0.52434ms)
✔ RecommedationService.resolveRecommendation: resolveRecommendation: merge uses the selected local Media ID (0.741524ms)
✔ resolveRecommendation: merge preserves unselected fields (0.323113ms)
✔ resolveRecommendation: merge ignores unselected empty fields (0.320001ms)
✔ resolveRecommendation: merge rejects duplicate matchKey without changes (0.341391ms)
✔ resolveRecommendation: discard does not modify WatchList (0.171512ms)
✔ resolveRecommendation: rejects an already accepted recommendation (0.17507ms)
✔ resolveRecommendation: rejects missing incoming Media (0.183551ms)
✔ RecommendationLinkCodec: encode y decode conservan el intercambio completo (62.804896ms)
✔ RecommendationLinkCodec: encode genera una cadena Base64 URL-safe (2.415093ms)
✔ RecommendationLinkCodec: decode rechaza una entrada vacía (0.60727ms)
✔ RecommendationLinkCodec: decode rechaza datos que no son JSON válido (8.038396ms)
✔ RecommendationLinkCodec: encode rechaza valores que no son objetos (0.289891ms)
✔ RecommendationLinkReader: read returns null when recommendation parameter is missing (0.985444ms)
✔ RecommendationLinkReader: read creates RecommendationExchange from recommendation parameter (45.502377ms)
✔ RecommendationLinkReader: read rejects invalid recommendation data (0.75599ms)
✔ Services: addItem añade un Media y su WatchItem (5.342382ms)
✔ Services: addItem no añade nada si falla la creación del Media (0.243741ms)
✔ Services: addItem elimina el Media si falla al añadir el WatchItem (0.350438ms)
✔ InboxFileStorage: exports inbox (recommendation lists) as JSON (2.627677ms)
✔ InboxFileStorage: imports inbox of recommendation lists (0.364963ms)
✔ InboxFileStorage: rejects invalid JSON (0.488682ms)
✔ InboxFileStorage: rejects a non-array root (0.167649ms)
✔ InboxFileStorage: rejects unsupported version (0.202381ms)
✔ InboxStorage: returns an empty array when there is no data (1.517813ms)
✔ InboxStorage: saves and loads multiple recommendation lists in an inbox (1.763032ms)
✔ InboxStorage: reconstructs IncomingRecommendationList and Recommendation instances (2.272627ms)
✔ Storage: export creates JSON from WatchList (1.936837ms)
✔ Storage: export preserves WatchList data (1.866008ms)
✔ Storage: import reconstructs WatchList objects (0.588952ms)
✔ Storage: exported WatchList can be imported again (0.475638ms)
✔ Storage: import rejects invalid JSON (1.507815ms)
✔ Storage: import rejects unsupported version (0.199953ms)
✔ WatchListFileStorage: rejects version lower than 1 (0.259415ms)
✔ WatchListFileStorage: imports current version (1.876903ms)
✔ Storage: import rejects missing media array (0.44224ms)
✔ Storage: import rejects missing watchItems array (0.434637ms)
✔ Storage: import rejects a non-object JSON value (0.204102ms)
✔ Storage: load returns empty WatchList when storage is empty (3.790782ms)
✔ Storage: load reconstructs WatchList from stored JSON (2.28547ms)
✔ Storage: save stores WatchList as JSON (0.231128ms)
✔ Storage: save and load preserve WatchList (1.359279ms)
```

## worker cloudflare

```js
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
/*
export default {
  async fetch(request, env, ctx) {
    // You can view your logs in the Observability dashboard
    console.info({ message: 'omdb-worker ha recibido una peticion!' }); 
    return new Response('Bienvenido a Joselon79 cloudflare Workers');
  }
};
*/
const ALLOWED_ORIGIN = 'https://joselon79.neocities.org';

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders(origin)
      });
    }

    if (request.method !== 'GET') {
      return jsonResponse(
        { error: 'Method not allowed' },
        405,
        origin
      );
    }

    const url = new URL(request.url);

    try {
      let omdbUrl;

      if (url.pathname === '/search') {
        const title = url.searchParams.get('title');

        if (!title || title.trim().length === 0) {
          return jsonResponse(
            { error: 'Missing title parameter' },
            400,
            origin
          );
        }

        omdbUrl = new URL('https://www.omdbapi.com/');
        omdbUrl.searchParams.set('apikey', env.OMDB_API_KEY);
        omdbUrl.searchParams.set('s', title.trim());
        omdbUrl.searchParams.set('r', 'json');

      } else if (url.pathname === '/detail') {
        const id = url.searchParams.get('id');

        if (!id || id.trim().length === 0) {
          return jsonResponse(
            { error: 'Missing id parameter' },
            400,
            origin
          );
        }

        omdbUrl = new URL('https://www.omdbapi.com/');
        omdbUrl.searchParams.set('apikey', env.OMDB_API_KEY);
        omdbUrl.searchParams.set('i', id.trim());
        omdbUrl.searchParams.set('plot', 'full');
        omdbUrl.searchParams.set('r', 'json');

      } else {
        return jsonResponse(
          { error: 'Not found' },
          404,
          origin
        );
      }

      const response = await fetch(omdbUrl);

      const data = await response.json();

      return jsonResponse(data, response.status, origin);

    } catch (error) {
      return jsonResponse(
        { error: 'Error contacting OMDb' },
        502,
        origin
      );
    }
  }
};


function corsHeaders(origin) {
  const headers = {
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (origin === ALLOWED_ORIGIN) {
    headers['Access-Control-Allow-Origin'] = ALLOWED_ORIGIN;
  }

  return headers;
}


function jsonResponse(data, status, origin) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    ...corsHeaders(origin)
  };

  return new Response(JSON.stringify(data), {
    status,
    headers
  });
}
```

## Extraccion palabras aleatorias en titulos

```sh
>node generate-omdb-words.js title.basics.tsv words.json
Catálogo generado correctamente.
Películas analizadas: 750,713
Títulos adultos excluidos: 9,104
Palabras únicas: 297,817
Archivo: //Repositorios/neocities.org/QueVemosApp/todo/words.json
Nota: el dataset no identifica el idioma; puede haber palabras de otros idiomas.

>node split-omdb-words.js
words-00.json: 14891 palabras
words-01.json: 14891 palabras
words-02.json: 14891 palabras
words-03.json: 14891 palabras
words-04.json: 14891 palabras
words-05.json: 14891 palabras
words-06.json: 14891 palabras
words-07.json: 14891 palabras
words-08.json: 14891 palabras
words-09.json: 14891 palabras
words-10.json: 14891 palabras
words-11.json: 14891 palabras
words-12.json: 14891 palabras
words-13.json: 14891 palabras
words-14.json: 14891 palabras
words-15.json: 14891 palabras
words-16.json: 14891 palabras
words-17.json: 14890 palabras
words-18.json: 14890 palabras
words-19.json: 14890 palabras
```

Cambio de criterio:

```sh
Procesando títulos de IMDb...
Títulos procesados: 1.000.000

--- Resultado del análisis ---
Títulos procesados: 1.176.069
Palabras distintas encontradas: 391.937
Mínimo configurado: 6 títulos
Palabras incluidas en words.json: 49.175

--- Palabras que quedarían con cada mínimo ---
Mínimo   1 títulos: 391.937 palabras
Mínimo   2 títulos: 145.039 palabras
Mínimo   3 títulos: 93.919 palabras
Mínimo   5 títulos: 57.816 palabras
Mínimo   6 títulos: 49.175 palabras
Mínimo  10 títulos: 31.494 palabras
Mínimo  15 títulos: 22.150 palabras
Mínimo  20 títulos: 17.198 palabras
Mínimo  25 títulos: 14.155 palabras
Mínimo  30 títulos: 12.002 palabras
Mínimo  40 títulos: 9278 palabras
Mínimo  50 títulos: 7580 palabras
Mínimo  75 títulos: 5261 palabras
Mínimo 100 títulos: 4033 palabras
Mínimo 150 títulos: 2680 palabras
Mínimo 200 títulos: 2000 palabras
Mínimo 300 títulos: 1334 palabras
Mínimo 500 títulos: 738 palabras

Archivos generados:
Catálogo: src/data/words.json
Informe: todo/words-counts.json
```

## Propuesta comparacion Media

```js
       //1. omdbId exacto
       const matchesOmdbId = watchList.media.filter(
                media =>
                    exchangeMedia.omdbId &&
                    media.omdbId &&
                    exchangeMedia.omdbId === media.omdbId
            );

        // 2. matchKey exacto pero exchangeMedia no es Media, hay que añadirle el matchkey que tenga en el momento
        const matchesMatchKey = watchList.media.filter(
                media =>
                    exchangeMedia.matchKey == media.matchKey
            );

        ToDO:
        3. matchKey parcial
        4. originalTitle
    
       return [
            ...new Set([
                ...matchesOmdbId,
                ...matchesMatchKey
            ])
        ];
```

## Propuesta typescript

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

```ts
export type MediaType =
    | "movie"
    | "series";

export type WatchStatus =
    | "pending"
    | "watching"
    | "paused"
    | "watched"
    | "discarded";

export type ImportItemStatus =
    | "pending"
    | "matched"
    | "new"
    | "conflict"
    | "imported"
    | "discarded";

export interface Media {
    id: string;

    title: string;
    originalTitle?: string;

    type: MediaType;
    year?: number;
    runtimeMinutes?: number;

    genres: string[];

    matchKey: string;

    omdbId?: string;
    poster?: string;

    ratings?: {
        imdb?: number;
        metacritic?: number;
    };
}

export interface WatchProgress {
    season?: number;
    episode?: number;
    minute?: number;
}

export interface WatchItem {
    mediaId: string;

    platformId?: string;

    reason?: string;

    spanishAudio: boolean;
    spanishSubtitles: boolean;

    status: WatchStatus;

    userRating?: number;

    progress?: WatchProgress;

    addedAt: string;
    watchedAt?: string;
}

export interface WatchList {
    version: number;
    id: string;
    name: string;

    items: WatchItem[];
}

export interface CatalogItem {
    id: string;
    name: string;
}

export interface Platform extends CatalogItem {
    country: string;
    active: boolean;
    logo?: string;
}

//compartir/importar:

export interface RecommendationPackage {
    version: number;

    source: {
        listId: string;
        listName: string;
    };

    items: RecommendationItem[];
}

export interface RecommendationItem {
    media: Media;
    watchItem: RecommendationWatchItem;
}

export interface RecommendationWatchItem {
    platformId?: string;

    reason?: string;

    spanishAudio: boolean;
    spanishSubtitles: boolean;

    status: WatchStatus;

    userRating?: number;

    progress?: WatchProgress;

    addedAt: string;
    watchedAt?: string;
}

//estado persistente de una importación:

export interface Import {
    version: number;
    id: string;

    source: {
        listId: string;
        listName: string;
    };

    status: "pending" | "completed";

    items: ImportItem[];
}

export interface ImportItem {
    media: Media;
    watchItem: RecommendationWatchItem;

    status: ImportItemStatus;

    localMediaId?: string;

    conflict?: ImportConflict;
}

export interface ImportConflict {
    reason: string;

    localMedia?: Media;

    conflictingFields?: string[];
}
```
