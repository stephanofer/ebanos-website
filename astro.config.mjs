// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://ebanosmuebles.com",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
      namespaces: {
        news: false,
        video: false,
        xhtml: false,
      },
    }),
  ],
});
