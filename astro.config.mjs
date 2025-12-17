// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

export default defineConfig({
  site: "https://ebanosmuebles.com",
  
  integrations: [
    sitemap({
      lastmod: new Date(),
      filter: (page) => !page.includes("/404"),
      namespaces: {
        news: false,
        video: false,
        xhtml: false,
      },
    }),

    robotsTxt({
      policy: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/404"],
        },
      ],
      sitemap: true,
      host: "ebanosmuebles.com",
    }),
  ],
});
