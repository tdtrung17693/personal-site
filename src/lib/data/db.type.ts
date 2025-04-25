import type { Selectable } from "kysely";

export interface Database {
  posts: {
    id: string;
    slug: string;
    title: string;
    content: string;
    source: "notion" | "instagram" | "x" | "markdown";
    source_url?: string | null;
    source_id?: string | null;
    created_at: Date;
    updated_at: Date;
    // tags is stored as text in the database, format: {tag1,tag2,tag3}
    tags?: string | null;
    summary?: string | null;
    author?: string | null;
    cover_image?: string | null;
    raw_metadata?: Record<string, unknown> | null;
    status: "draft" | "published";
    published_at?: Date | null;
  };
  kysely_migration: {
    name: string;
    timestamp: string;
  };
}

export type Post = Selectable<Database["posts"]>;
