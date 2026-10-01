# QueVemosApp

## Media.js

```js
export class Media {

    constructor({
        id,
        title,
        originalTitle = undefined,
        type,
        year = undefined,
        runtimeMinutes = undefined,
        genres = [],
        matchKey,
        omdbId = undefined,
        poster = undefined,
        ratings = undefined
    }) {
        this.id = id;
        this.title = title;
        this.originalTitle = originalTitle;
        this.type = type;
        this.year = year;
        this.runtimeMinutes = runtimeMinutes;
        this.genres = genres;
        this.matchKey = matchKey;
        this.omdbId = omdbId;
        this.poster = poster;
        this.ratings = ratings;
    }
}
```

## WatchItem.js

```js
export class WatchItem {

    constructor({
        mediaId,
        platformId = undefined,
        reason = undefined,
        spanishAudio = false,
        spanishSubtitles = false,
        status = "pending",
        userRating = undefined,
        progress = undefined,
        addedAt,
        watchedAt = undefined
    }) {
        this.mediaId = mediaId;
        this.platformId = platformId;
        this.reason = reason;
        this.spanishAudio = spanishAudio;
        this.spanishSubtitles = spanishSubtitles;
        this.status = status;
        this.userRating = userRating;
        this.progress = progress;
        this.addedAt = addedAt;
        this.watchedAt = watchedAt;
    }
}
```

## setting.json

```json
{
  "version": 1,

  "mediaTypes": [
    {
      "id": "movie",
      "name": "Película"
    },
    {
      "id": "series",
      "name": "Serie"
    }
  ],

  "genres": [
    {
      "id": "action",
      "name": "Acción"
    },
    {
      "id": "adventure",
      "name": "Aventuras"
    },
    {
      "id": "animation",
      "name": "Animación"
    },
    {
      "id": "comedy",
      "name": "Comedia"
    },
    {
      "id": "crime",
      "name": "Crimen"
    },
    {
      "id": "documentary",
      "name": "Documental"
    },
    {
      "id": "drama",
      "name": "Drama"
    },
    {
      "id": "family",
      "name": "Familiar"
    },
    {
      "id": "fantasy",
      "name": "Fantasía"
    },
    {
      "id": "history",
      "name": "Historia"
    },
    {
      "id": "horror",
      "name": "Terror"
    },
    {
      "id": "music",
      "name": "Musical"
    },
    {
      "id": "mystery",
      "name": "Misterio"
    },
    {
      "id": "romance",
      "name": "Romance"
    },
    {
      "id": "science-fiction",
      "name": "Ciencia ficción"
    },
    {
      "id": "sport",
      "name": "Deporte"
    },
    {
      "id": "thriller",
      "name": "Thriller"
    },
    {
      "id": "war",
      "name": "Bélica"
    },
    {
      "id": "western",
      "name": "Western"
    }
  ],

  "watchStatuses": [
    {
      "id": "pending",
      "name": "Pendiente"
    },
    {
      "id": "watching",
      "name": "Viendo"
    },
    {
      "id": "paused",
      "name": "En pausa"
    },
    {
      "id": "watched",
      "name": "Vista"
    },
    {
      "id": "discarded",
      "name": "Descartada"
    }
  ],

  "platforms": [
    {
      "id": "netflix-es",
      "name": "Netflix España",
      "country": "ES",
      "active": true,
      "logo": "netflix"
    },
    {
      "id": "max-es",
      "name": "Max España",
      "country": "ES",
      "active": true,
      "logo": "max"
    },
    {
      "id": "prime-video-es",
      "name": "Prime Video España",
      "country": "ES",
      "active": true,
      "logo": "prime-video"
    },
    {
      "id": "disney-plus-es",
      "name": "Disney+ España",
      "country": "ES",
      "active": true,
      "logo": "disney-plus"
    },
    {
      "id": "movistar-plus-es",
      "name": "Movistar Plus+ España",
      "country": "ES",
      "active": true,
      "logo": "movistar-plus"
    },
    {
      "id": "apple-tv-plus-es",
      "name": "Apple TV+ España",
      "country": "ES",
      "active": true,
      "logo": "apple-tv-plus"
    },
    {
      "id": "filmin-es",
      "name": "Filmin España",
      "country": "ES",
      "active": true,
      "logo": "filmin"
    },
    {
      "id": "skyshowtime-es",
      "name": "SkyShowtime España",
      "country": "ES",
      "active": true,
      "logo": "skyshowtime"
    },
    {
      "id": "atresplayer-es",
      "name": "Atresplayer España",
      "country": "ES",
      "active": true,
      "logo": "atresplayer"
    },
    {
      "id": "rtve-play-es",
      "name": "RTVE Play España",
      "country": "ES",
      "active": true,
      "logo": "rtve-play"
    }
  ]
}
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
