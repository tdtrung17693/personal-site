import { redis } from "./redis";

const DEFAULT_EXPIRES_IN = 60 * 60 * 24;

export const withCache = async <T>(
  key: string,
  fn: () => Promise<T>,
  expiresIn: number = DEFAULT_EXPIRES_IN
): Promise<{ data: string; cached: boolean }> => {
  const cached = await redis.get(key);
  if (cached) {
    return { data: cached, cached: true };
  }
  const result = await fn();

  const resultString = JSON.stringify(result);
  await redis.setex(key, expiresIn, resultString);
  return { data: resultString, cached: false };
};

export const withCacheResponse = async <T>(
  key: string,
  fn: () => Promise<T>,
  expiresIn: number = DEFAULT_EXPIRES_IN
): Promise<Response> => {
  const { data, cached } = await withCache(key, fn, expiresIn);

  if (cached) {
    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-Cache": "HIT",
      },
    });
  }
  return new Response(data, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "X-Cache": "MISS",
    },
  });
};
