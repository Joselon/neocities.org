import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    build: {
        rollupOptions: {
            input: fileURLToPath(
                new URL("./quevemos.html", import.meta.url)
            )
        }
    }
});