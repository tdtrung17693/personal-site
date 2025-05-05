// @ts-check
import { defineConfig } from "astro/config";
import vercelServerless from "@astrojs/vercel/serverless";
import tailwindcss from "@tailwindcss/vite";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercelServerless({
    edgeMiddleware: true,
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
