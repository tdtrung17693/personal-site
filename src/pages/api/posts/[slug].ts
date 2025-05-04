import { withCacheResponse } from "@/lib/cache";
import { getPostBySlug } from "@/lib/data/posts";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug || "";
  if (!slug) {
    return new Response("Slug is required", { status: 400 });
  }
  console.log({
    slug,
  });
  return withCacheResponse(
    `posts:${slug}`,
    async () => {
      return await getPostBySlug({ slug });
    },
    60 * 2
  );
};
