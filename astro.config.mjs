// @ts-check
import { defineConfig } from "astro/config";
import sentry from "@sentry/astro";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [sentry({
    dsn: "https://6e7eeeca383931b0af6fde05095fbe28@o4508385501839360.ingest.us.sentry.io/4509364214431744",
    sourceMapsUploadOptions: {
      project: "ebanos-website",
      authToken:
        "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",
    },
    autoInstrumentation: {
      requestHandler: true,
    },
  }), sitemap()],
});