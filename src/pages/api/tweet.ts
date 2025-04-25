import { withCacheResponse } from "@/lib/cache";
import type { APIRoute } from "astro";

export const prerender = false;
const tweetApiBase = "https://react-tweet.vercel.app/api/tweet";

type MediaDetails = {
  media_url: string;
  video_info?: {
    variants: {
      url: string;
      content_type: string;
    }[];
  };
}[];

function extractMedia(mediaDetails?: MediaDetails) {
  if (!mediaDetails) {
    return null;
  }
  return {
    url: mediaDetails[0].media_url,
    type: mediaDetails[0].video_info ? "video" : "image",
    videoUrl:
      mediaDetails[0].video_info?.variants.find(
        (variant: any) => variant.content_type === "application/x-mpegURL"
      )?.url ||
      mediaDetails[0].video_info?.variants.find(
        (variant: any) => variant.content_type === "video/mp4"
      )?.url,
  };
}

export const GET: APIRoute = async (request) => {
  const { searchParams } = request.url;
  const tweetId = searchParams.get("tweetId");
  if (!tweetId) {
    return new Response("No tweetId provided", { status: 400 });
  }
  return await withCacheResponse(`tweet:${tweetId}`, async () => {
    const tweetResponse = await fetch(`${tweetApiBase}/${tweetId}`);
    const tweet = await tweetResponse.json();
    if (!tweet.data) {
      throw new Error("Failed to fetch tweet");
    }
    const { data } = tweet;
    const quotedTweet = data.quoted_tweet
      ? {
          user: data.quoted_tweet.user.name,
          userHandle: data.quoted_tweet.user.screen_name,
          text: data.quoted_tweet.text,
          createdAt: data.quoted_tweet.created_at,
          id: data.quoted_tweet.id_str,
          media: extractMedia(data.quoted_tweet.mediaDetails),
        }
      : null;
    const media = extractMedia(data.mediaDetails);

    return {
      user: data.user.name,
      userHandle: data.user.screen_name,
      likes: data.favorite_count ?? 0,
      retweets: data.retweet_count ?? 0,
      replies: data.conversation_count ?? 0,
      text: data.text,
      createdAt: data.created_at,
      id: data.id_str,
      quotedTweet,
      media,
      raw: data,
    };
  });
};
