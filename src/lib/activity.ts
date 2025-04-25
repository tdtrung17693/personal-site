import type { GithubEvent } from "@/types/common";
import { getConfig } from "./utils";

export const getGithubActivity = async (): Promise<GithubEvent[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  const response = await fetch(`${getConfig("api.url")}/github`);
  const data = await response.json();
  return data;
};

export const getSpotifyActivity = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    currentlyPlaying: {
      title: "Weightless",
      artist: "Marconi Union",
      album: "Ambient 1",
      imageUrl: "/placeholder.svg?height=60&width=60",
    },
    recentTracks: [
      {
        id: "1",
        title: "Strobe",
        artist: "deadmau5",
        playedAt: "2 hours ago",
      },
      {
        id: "2",
        title: "Neon Lights",
        artist: "Kraftwerk",
        playedAt: "Yesterday",
      },
      {
        id: "3",
        title: "Midnight City",
        artist: "M83",
        playedAt: "Yesterday",
      },
    ],
  };
};
