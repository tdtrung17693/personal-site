// @ts-check
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    isr: {
      // A secret random string that you create.
      bypassToken: "005556d774a8",
      // Paths that will always be served fresh.
      exclude: [
        "/",
        "/blog/[page]",
        /^\/api\/.+/, // Regular expressions supported since @astrojs/vercel@v8.1.0
      ],
    },
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "rose-pine-dawn",
        dark: "rose-pine",
      },
    },
  },
  integrations: [
    vue({
      jsx: true,
      appEntrypoint: "./src/_app",
    }),
  ],
});
