/**
 * Application configuration
 * This file centralizes all configuration settings for the application
 */

import { PUBLIC_GITHUB_USERNAME } from "astro:env/client";
import { DATABASE_URL, GITHUB_TOKEN } from "astro:env/server";
import type { GetConfig, GetConfigWithDefault } from "../utils";
export interface AppServerConfig {
  github: {
    token: string;
    username: string;
  };
  database: {
    url: string;
  };
}

const config: AppServerConfig = {
  github: {
    token: GITHUB_TOKEN || "",
    username: PUBLIC_GITHUB_USERNAME || "",
  },
  database: {
    url: DATABASE_URL || "",
  },
};

export default config;

export const getConfig: GetConfig<AppServerConfig> = (key: string) => {
  if (!key) return undefined;

  const keys = key.split(".");
  let result: any = config;

  for (const k of keys) {
    if (result && typeof result === "object" && k in result) {
      result = result[k];
    } else {
      return undefined;
    }
  }

  return result;
};

export const getConfigWithDefault: GetConfigWithDefault<AppServerConfig> = (
  key,
  defaultVal
) => {
  return getConfig(key) || defaultVal;
};
