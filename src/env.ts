import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

// Helper function to parse boolean env vars (e.g., "true", "1", "false", "0")
const zodBoolean = z.string()
  .transform((val) => {
    const lowerVal = val.toLowerCase();
    if (lowerVal === 'true' || lowerVal === '1') return true;
    if (lowerVal === 'false' || lowerVal === '0') return false;
    throw new Error(`Invalid boolean value: ${val}`);
  })
  .pipe(z.boolean());

export const env = createEnv({
  /**
   * Server-side variables. Not prefixed with VITE_.
   * Accessible only on the server (e.g., during build or in Node.js environments).
   */
  server: {
    DATABASE_URL: z.string().url({ message: "DATABASE_URL must be a valid URL"}),
    GITHUB_TOKEN: z.string().min(1, { message: "GITHUB_TOKEN is required"}),
    // Example: NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },

  /**
   * Client-side variables. Must be prefixed with VITE_.
   * Exposed to the client bundle.
   */
  clientPrefix: "VITE_",
  client: {
    VITE_PUBLIC_SITE_URL: z.string().url().default("http://localhost:4321"), // Added default
    VITE_PUBLIC_SITE_EMAIL: z.string().email({ message: "VITE_PUBLIC_SITE_EMAIL must be a valid email"}),
    VITE_PUBLIC_API_URL: z.string().url({ message: "VITE_PUBLIC_API_URL must be a valid URL" }).optional(), // Optional
    VITE_PUBLIC_ANALYTICS_ID: z.string().min(1).optional(), // Optional
    VITE_PUBLIC_SITE_TITLE: z.string().min(1, { message: "VITE_PUBLIC_SITE_TITLE is required"}),
    VITE_PUBLIC_SITE_DESCRIPTION: z.string().min(1, { message: "VITE_PUBLIC_SITE_DESCRIPTION is required"}),
    VITE_PUBLIC_GITHUB_USERNAME: z.string().min(1, { message: "VITE_PUBLIC_GITHUB_USERNAME is required"}),
    VITE_PUBLIC_TWITTER_USERNAME: z.string().min(1, { message: "VITE_PUBLIC_TWITTER_USERNAME is required"}),
    VITE_PUBLIC_GITHUB_ACTIVITY_ENABLED: zodBoolean, // Use custom boolean parser
  },

  /**
   * Map variables from the actual environment (process.env or import.meta.env)
   * to the schemas defined above.
   */
  runtimeEnv: {
    // Server (Node.js process.env - adjust if using a different server runtime)
    DATABASE_URL: process.env.DATABASE_URL,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    // NODE_ENV: process.env.NODE_ENV,

    // Client (Vite import.meta.env)
    VITE_PUBLIC_SITE_URL: import.meta.env.VITE_PUBLIC_SITE_URL,
    VITE_PUBLIC_SITE_EMAIL: import.meta.env.VITE_PUBLIC_SITE_EMAIL,
    VITE_PUBLIC_API_URL: import.meta.env.VITE_PUBLIC_API_URL,
    VITE_PUBLIC_ANALYTICS_ID: import.meta.env.VITE_PUBLIC_ANALYTICS_ID,
    VITE_PUBLIC_SITE_TITLE: import.meta.env.VITE_PUBLIC_SITE_TITLE,
    VITE_PUBLIC_SITE_DESCRIPTION: import.meta.env.VITE_PUBLIC_SITE_DESCRIPTION,
    VITE_PUBLIC_GITHUB_USERNAME: import.meta.env.VITE_PUBLIC_GITHUB_USERNAME,
    VITE_PUBLIC_TWITTER_USERNAME: import.meta.env.VITE_PUBLIC_TWITTER_USERNAME,
    VITE_PUBLIC_GITHUB_ACTIVITY_ENABLED: import.meta.env.VITE_PUBLIC_GITHUB_ACTIVITY_ENABLED,
  },

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION=true` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!import.meta.env.SKIP_ENV_VALIDATION,

  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
