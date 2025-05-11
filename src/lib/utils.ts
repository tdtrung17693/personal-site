import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Get all possible paths with a maximum depth of 10
type DotNotationPath<T, D extends number = 4> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, DotNotationPath<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : "";

type ConfigKey<T> = DotNotationPath<T>;

/**
 * Get a configuration value using dot notation
 * @example getConfig('site.title')
 */
export type GetConfig<
  AppConfig,
  P extends ConfigKey<AppConfig> = ConfigKey<AppConfig>
> = (
  key: P
) => P extends `${infer K}.${infer Rest}`
  ? K extends keyof AppConfig
    ? Rest extends DotNotationPath<NonNullable<AppConfig[K]>>
      ? any
      : never
    : never
  : P extends keyof AppConfig
  ? AppConfig[P]
  : never;

export type GetConfigWithDefault<
  AppConfig,
  P extends ConfigKey<AppConfig> = ConfigKey<AppConfig>,
  D = any
> = (
  key: P,
  defaultVal: D
) => P extends `${infer K}.${infer Rest}`
  ? K extends keyof AppConfig
    ? Rest extends DotNotationPath<NonNullable<AppConfig[K]>>
      ? any | D
      : D
    : D
  : P extends keyof AppConfig
  ? AppConfig[P] | D
  : D;

export function calculateReadingTime(text: string) {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
