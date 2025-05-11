import { withCacheResponse } from "@/lib/cache";
import { getConfig } from "@/lib/config/server.config";
import type { APIRoute } from "astro";

// Initialize Redis client

const getGitHubEventMessage = (event: any) => {
  console.log(event);
  switch (event.type) {
    case "PushEvent":
      return event.payload.commits[0].message.split("\n")[0];
    case "IssuesEvent":
      return event.payload.issue.title;
    case "PullRequestEvent":
      return event.payload.pull_request.title;
    case "ForkEvent":
      return `Forked repository ${event.repo.name}`;
    case "CreateEvent":
      if (event.payload.ref_type === "repository") {
        return "New repository created";
      }
      return `New branch [${event.payload.ref}] created`;
    case "WatchEvent":
      return "Repository starred";
    case "ReleaseEvent":
      return `New release ${event.payload.release.name} created`;
    case "MemberEvent":
      return `New member ${event.payload.member.login} added`;
    default:
      return event.payload.comment.body;
  }
};
const getGitHubEventType = (eventType: string) => {
  switch (eventType) {
    case "PushEvent":
      return "push";
    case "CreateEvent":
      return "create";
    case "ForkEvent":
      return "fork";
    case "IssueCommentEvent":
      return "comment";
    case "IssuesEvent":
      return "issue";
    case "PullRequestEvent":
      return "pull_request";
    case "WatchEvent":
      return "watch";
    case "ReleaseEvent":
      return "release";
    case "MemberEvent":
      return "member";
    case "PublicEvent":
      return "public";
    default:
      return eventType;
  }
};

export const GET: APIRoute = async ({ request }) => {
  try {
    // Check cache first
    return await withCacheResponse("github_events_processed", async () => {
      const response = await fetch(
        `https://api.github.com/users/${getConfig(
          "github.username"
        )}/events/public?per_page=5`,
        {
          headers: {
            Authorization: `Bearer ${getConfig("github.token")}`,
          },
          redirect: "follow",
        }
      );
      const events = await response.json();

      return events
        .slice(0, 5)
        .filter((e: any) =>
          [
            "PushEvent",
            "CreateEvent",
            "ForkEvent",
            "IssuesEvent",
            "PullRequestEvent",
            "WatchEvent",
            "ReleaseEvent",
          ].includes(e.type)
        )
        .map((event: any) => ({
          id: event.id,
          repo:
            event.type === "ForkEvent"
              ? event.payload.forkee.full_name
              : event.repo.name,
          action: getGitHubEventType(event.type),
          message: getGitHubEventMessage(event),
          date: event.created_at,
        }));
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch GitHub events" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
