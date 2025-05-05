// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
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
