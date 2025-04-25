export type PostSource = "notion" | "x" | "instagram" | "markdown";

export interface BasePost {
  id: string;
  title: string;
  date: string;
  slug: string;
  source: PostSource;
  sourceId: string;
  sourceUrl: string;
}

export interface NotionPost extends BasePost {
  source: "notion";
  excerpt: string;
  tags: string[];
}

export interface XPost extends BasePost {
  source: "x";
  content: string;
  likes: number;
  retweets: number;
}

export interface InstagramPost extends BasePost {
  source: "instagram";
  imageUrl?: string;
  likes: number;
  comments: number;
}

export interface RegularPost extends BasePost {
  source: "markdown";
  content: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
}

export type Post = NotionPost | XPost | InstagramPost | RegularPost;
export interface GithubEvent {
  id: string;
  repo: string;
  action: string;
  message: string;
  date: string;
}
