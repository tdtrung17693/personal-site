/**
 * Application configuration
 * This file centralizes all configuration settings for the application
 */
import { getEnv, isDev } from "./env";

export interface AppConfig {
  site: {
    title: string;
    description: string;
    url: string;
    email: string;
  };
  theme: {
    defaultTheme: "light" | "dark";
  };
  features: {
    enableAnalytics: boolean;
    enableGithubActivity: boolean;
  };

  api: {
    url: string;
  };
  github?: {
    username: string;
    token: string;
  };
  twitter?: {
    username: string;
  };
  database?: {
    url: string;
  };
}

const config: AppConfig = {
  site: {
    title: getEnv("PUBLIC_SITE_TITLE") || "Personal Site",
    description: getEnv("PUBLIC_SITE_DESCRIPTION") || "Personal Site",
    url: getEnv("PUBLIC_SITE_URL") || "http://localhost:4321",
    email: getEnv("PUBLIC_SITE_EMAIL") || "trandinhtrung176@gmail.com",
  },
  api: {
    url: getEnv("PUBLIC_API_URL") || "http://localhost:4321/api/",
  },
  theme: {
    defaultTheme: "light",
  },
  features: {
    // Only enable analytics in production
    enableAnalytics: !isDev() && Boolean(getEnv("PUBLIC_ANALYTICS_ID")),
    enableGithubActivity: Boolean(getEnv("PUBLIC_GITHUB_ACTIVITY_ENABLED")),
  },
  github: {
    username: getEnv("PUBLIC_GITHUB_USERNAME"),
    token: getEnv("GITHUB_TOKEN"),
  },
  twitter: {
    username: getEnv("PUBLIC_TWITTER_USERNAME"),
  },
  ...(typeof window === "undefined" && {
    database: {
      url: getEnv("DATABASE_URL"),
    },
  }),
};

// Only add API configuration if the URL is defined
const apiUrl = getEnv("PUBLIC_API_URL");
if (apiUrl) {
  config.api = {
    url: apiUrl,
  };
}

export default config;
