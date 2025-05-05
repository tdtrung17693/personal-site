/**
 * Environment variable helper
 * Provides type-safe access to environment variables
 */

// Import the validated environment object
import { env } from "@/env";

// Define the type for the keys of the env object for type safety
type EnvKey = keyof typeof env;

/**
 * Get environment variable using the validated env object.
 *
 * Note: While this function allows accessing any key defined in src/env.ts,
 * server-side variables (like DATABASE_URL, GITHUB_TOKEN) will not be available
 * in the client-side bundle and will return undefined if accessed client-side.
 * Prefer direct import `import { env } from '@/env'` where possible.
 */
export function getEnv<K extends EnvKey>(key: K): (typeof env)[K] {
  const value = env[key];

  // The T3 Env setup already performs validation, so warnings here are less critical,
  // but you could add one if a server variable is accessed client-side (value === undefined).
  // Example check (might need refinement based on build process):
  // if (value === undefined && !(key in env.client) && typeof window !== 'undefined') {
  //   console.warn(`Attempted to access server-side env var "${key}" from the client.`);
  // }

  return value;
}

// isDev and isProd functions removed. Use `import.meta.env.DEV` or `import.meta.env.PROD`
// directly if needed in a Vite context, or add NODE_ENV to src/env.ts server schema
// for build-time/server-side checks.

export function isDev() {
  return import.meta.env.DEV;
}
