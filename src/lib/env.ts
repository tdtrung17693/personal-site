/**
 * Environment variable helper
 * Provides type-safe access to environment variables
 */

interface EnvVars {
  VITE_PUBLIC_SITE_URL: string;
  VITE_PUBLIC_SITE_EMAIL: string;
  VITE_PUBLIC_API_URL?: string;
  VITE_PUBLIC_ANALYTICS_ID?: string;
  VITE_PUBLIC_SITE_TITLE: string;
  VITE_PUBLIC_SITE_DESCRIPTION: string;
  VITE_DATABASE_URL: string;
  VITE_PUBLIC_GITHUB_USERNAME: string;
  VITE_GITHUB_TOKEN: string;
  VITE_PUBLIC_TWITTER_USERNAME: string;
  VITE_PUBLIC_GITHUB_ACTIVITY_ENABLED: boolean;
}

// Default values for environment variables
const defaults: Partial<EnvVars> = {
  VITE_PUBLIC_SITE_URL: "http://localhost:4321",
};

/**
 * Get environment variable with type safety
 */
export function getEnv<K extends keyof EnvVars>(key: K): EnvVars[K] {
  // For Astro, we access import.meta.env
  const value = import.meta.env[key] || defaults[key];

  if (value === undefined) {
    console.warn(`Environment variable ${key} is not defined`);
  }

  return value as EnvVars[K];
}

/**
 * Check if we're in development mode
 */
export function isDev(): boolean {
  return import.meta.env.DEV === true;
}

/**
 * Check if we're in production mode
 */
export function isProd(): boolean {
  return import.meta.env.PROD === true;
}
