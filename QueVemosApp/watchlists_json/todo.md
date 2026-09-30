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
