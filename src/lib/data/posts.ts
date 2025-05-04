import type {
  InstagramPost,
  NotionPost,
  Post,
  RegularPost,
  XPost,
} from "@/types/common";
import { db } from "./db";

interface GetPostsOptions {
  source?: "all" | "notion" | "x" | "instagram" | "markdown";
  page?: number;
  perPage?: number;
  sortBy?: "published_at" | "title";
  sortOrder?: "asc" | "desc";
}

interface GetPostsResult {
  posts: Post[];
  total: number;
  hasMore: boolean;
}

export const getPosts = async ({
  source = "all",
  page = 1,
  perPage = 10,
  sortBy = "published_at",
  sortOrder = "desc",
}: GetPostsOptions = {}): Promise<GetPostsResult> => {
  try {
    // Start building the query
    let query = db
      .selectFrom("posts")

    // Apply source filter if not "all"
    if (!!source && source !== "all") {
      query = query.where("source", "=", source);
    }

    // Get total count for pagination
    const totalQuery = query
      .select((eb) => eb.fn.countAll().as("total"));
    const total = await totalQuery.executeTakeFirstOrThrow();
    const totalCount = Number(total.total);

    // Apply sorting
    query = query.orderBy(sortBy, sortOrder);

    // Apply pagination
    const offset = (page - 1) * perPage;
    query = query.offset(offset).limit(perPage);

    // Execute the query and transform the results to match Post type
    
    const dbPosts = await query.selectAll().execute();
    const posts: Post[] = dbPosts.map((post) => {
      const basePost = {
        id: post.id,
        title: post.title,
        date: post.published_at?.toISOString() || post.created_at.toISOString(),
        slug: post.slug,
        source: post.source,
        sourceId: post.source_id?.replace(`${post.source}-`, ""),
        sourceUrl: post.source_url,
      };
      const tags = JSON.parse(
        post.tags?.replace(/^\{/g, "[").replace(/\}$/g, "]") || "[]"
      );
      switch (post.source) {
        case "notion":
          return {
            ...basePost,
            source: "notion",
            excerpt: post.summary || "",
            tags,
          } as NotionPost;
        case "x":
          return {
            ...basePost,
            source: "x",
            content: post.content || "",
            likes: (post.raw_metadata as any)?.likes || 0,
            retweets: (post.raw_metadata as any)?.retweets || 0,
          } as XPost;
        case "instagram":
          return {
            ...basePost,
            source: "instagram",
            imageUrl: post.cover_image || undefined,
            likes: (post.raw_metadata as any)?.likes || 0,
            comments: (post.raw_metadata as any)?.comments || 0,
          } as InstagramPost;
        case "markdown":
          return {
            ...basePost,
            source: "markdown",
            content: post.content || "",
            excerpt: post.summary || "",
            tags,
            readingTime:
              (post.raw_metadata as any)?.readingTime || "0 min read",
          } as RegularPost;
        default:
          throw new Error(`Unsupported post source: ${post.source}`);
      }
    });

    // Calculate if there are more pages
    const hasMore = offset + posts.length < totalCount;

    return {
      posts,
      total: totalCount,
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

export const getPostBySlug = async ({ slug }: { slug: string }): Promise<Post | null> => {
  const post = await db.selectFrom("posts").where("slug", "=", slug).selectAll().executeTakeFirst();
  if (!post) return null;

  console.log({
    post,
  });
  if (post.source === "markdown") {
    return {
      id: post.id,
      title: post.title,
      date: post.published_at?.toISOString() || post.created_at.toISOString(),
      slug: post.slug,
      source: post.source,
    sourceId: post.source_id?.replace(`${post.source}-`, "") || "",
    sourceUrl: post.source_url || "",
    tags: JSON.parse(post.tags?.replace(/^\{/g, "[").replace(/\}$/g, "]") || "[]"),
    content: post.content || "",
    excerpt: post.summary || "",
      readingTime: (post.raw_metadata as any)?.readingTime || "0 min read",
    } as RegularPost;
  }

  return null;
};

