import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

const outDir = process.env.REOST_DE_DIR || "dist";

// https://astro.build/config
export default defineConfig({
    integrations: [sitemap()],
    vite: {
        build: {
            assetsInlineLimit: 0,
        },
    },
    outDir,
});
