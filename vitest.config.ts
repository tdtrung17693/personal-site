import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    // Vitest configuration options
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    environment: "jsdom",
    reporters: ["dot"],
  },
});
