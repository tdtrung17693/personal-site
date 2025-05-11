// @ts-check
import { defineConfig, envField } from "astro/config";
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
  env: {
    schema: {
      DATABASE_URL: envField.string({
        context: "server",
        access: "public",
        optional: true,
        url: true,
      }),
      GITHUB_TOKEN: envField.string({
        context: "server",
        access: "public",
        optional: true,
      }),
      PUBLIC_SITE_URL: envField.string({
        url: true,
        context: "client",
        access: "public",
        optional: true,
        default: "http://localhost:4321",
      }), // Added default
      PUBLIC_SITE_EMAIL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PUBLIC_API_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
        url: true,
      }),
      PUBLIC_ANALYTICS_ID: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PUBLIC_SITE_DESCRIPTION: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PUBLIC_GITHUB_USERNAME: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PUBLIC_TWITTER_USERNAME: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PUBLIC_GITHUB_ACTIVITY_ENABLED: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
});
