/**
 * Application configuration
 * This file centralizes all configuration settings for the application
 */
import { getEnv, isDev } from './env';

export interface AppConfig {
  site: {
    title: string;
    description: string;
    url: string;
  };
  theme: {
    defaultTheme: 'light' | 'dark';
  };
  features: {
    enableAnalytics: boolean;
  };
  api?: {
    url: string;
  };
}

const config: AppConfig = {
  site: {
    title: getEnv('PUBLIC_SITE_TITLE') || 'Personal Site',
    description: getEnv('PUBLIC_SITE_DESCRIPTION') || 'Personal Site',
    url: getEnv('PUBLIC_SITE_URL') || 'http://localhost:4321',
  },
  theme: {
    defaultTheme: 'light',
  },
  features: {
    // Only enable analytics in production
    enableAnalytics: !isDev() && Boolean(getEnv('PUBLIC_ANALYTICS_ID')),
  },
};

// Only add API configuration if the URL is defined
const apiUrl = getEnv('PUBLIC_API_URL');
if (apiUrl) {
  config.api = {
    url: apiUrl,
  };
}

export default config; 
