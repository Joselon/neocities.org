import { Media } from "../domain/Media.js";
import { WatchItem } from "../domain/WatchItem.js";

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
        let media = null;
        let mediaAdded = false;

        try {
            media = new Media({ title, type });

            const watchItem = new WatchItem({
                mediaId: media.id
            });

            this.watchList.addMedia(media);
            mediaAdded = true;

            this.watchList.addWatchItem(watchItem);

            return {
                success: true
            };

        } catch (error) {

            if (mediaAdded) {
                this.watchList.removeMedia(media.id);
            }

            return {
                success: false,
                error: error.message
            };
        }
    }

    getItems() {
        return this.watchList.watchItems.map(watchItem => {
            const media = this.watchList.media.find(
                media => media.id === watchItem.mediaId
            );

            return {
                media,
                watchItem
            };
        });
    }
}