/**
 * Application configuration
 * This file centralizes all configuration settings for the application
 */

import {
  PUBLIC_ANALYTICS_ID,
  PUBLIC_API_URL,
  PUBLIC_GITHUB_ACTIVITY_ENABLED,
  PUBLIC_GITHUB_USERNAME,
  PUBLIC_SITE_DESCRIPTION,
  PUBLIC_SITE_EMAIL,
  PUBLIC_SITE_URL,
  PUBLIC_TWITTER_USERNAME,
} from "astro:env/client";
import { DATABASE_URL, GITHUB_TOKEN } from "astro:env/server";
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
    title: "Trung Tran's Personal Site",
    description: PUBLIC_SITE_DESCRIPTION || "Personal Site",
    url: PUBLIC_SITE_URL || "http://localhost:4321",
    email: PUBLIC_SITE_EMAIL || "trandinhtrung176@gmail.com",
  },
  api: {
    url: PUBLIC_API_URL || "http://localhost:4321/api/",
  },
  theme: {
    defaultTheme: "light",
  },
  features: {
    // Only enable analytics in production
    enableAnalytics: Boolean(PUBLIC_ANALYTICS_ID),
    enableGithubActivity: ["true", "1"].includes(
      PUBLIC_GITHUB_ACTIVITY_ENABLED || "false"
    )
      ? true
      : false,
  },
  github: {
    username: PUBLIC_GITHUB_USERNAME || "",
    token: GITHUB_TOKEN || "",
  },
  twitter: {
    username: PUBLIC_TWITTER_USERNAME || "",
  },
  ...(typeof window === "undefined" && {
    database: {
      url: DATABASE_URL,
    },
  }),
};

// Only add API configuration if the URL is defined
const apiUrl = PUBLIC_API_URL;
if (apiUrl) {
  config.api = {
    url: apiUrl,
  };
}

export default config;
