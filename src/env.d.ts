interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly GITHUB_TOKEN: string;
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_SITE_EMAIL: string;
  readonly PUBLIC_API_URL: string;
  readonly PUBLIC_ANALYTICS_ID: string;
  readonly PUBLIC_SITE_DESCRIPTION: string;
  readonly PUBLIC_GITHUB_USERNAME: string;
  readonly PUBLIC_TWITTER_USERNAME: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
