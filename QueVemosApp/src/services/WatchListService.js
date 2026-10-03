import { Media } from "../domain/Media.js";
import { WatchItem } from "../domain/WatchItem.js";
import { WatchList } from "../domain/WatchList.js";

/* WatchListService
├── añadir Item (Media y WatchItem)
├── buscar coincidencias
├── resolver coincidencias
├── importar recomendaciones
├── exportar datos
└── ... */
export class WatchListService {

    constructor(watchList) {
        this.watchList = watchList;
    }

    addItem(title, type) {
        try {
            const media = new Media({
                title,
                type
            });

            const watchItem = new WatchItem({
                mediaId: media.id
            });

            this.watchList.addMedia(media);
            this.watchList.addWatchItem(watchItem);

            return {
                success: true
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}