import { getPosts } from "@/lib/data/posts";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async (request) => {
  const { url } = request;
  const { searchParams } = url;
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");
  const source = searchParams.get("source");

  try {
    const posts = await getPosts({
      perPage: limit ? parseInt(limit) : 3,
      page: page ? parseInt(page) : 1,
      source: source as "all" | "notion" | "x" | "instagram" | "markdown",
    });
    return new Response(JSON.stringify(posts), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch posts" }), {
      status: 500,
    });
  }
};
