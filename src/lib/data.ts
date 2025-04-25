import type { Post } from "@/types/common";

// Mock data for demonstration purposes
// In a real implementation, this would fetch from APIs
export const getPosts = async (
  source?: string,
  page = 1,
  perPage = 3
): Promise<{ posts: Post[]; hasMore: boolean }> => {
  // Simulate API delay
  console.log("getPosts", source, page, perPage);
  await new Promise((resolve) => setTimeout(resolve, 500));

  const allPosts: Post[] = [
    {
      id: "1",
      title: "Heuristic Search Methods",
      date: "Oct 21, 2022",
      slug: "heuristic-search-methods",
      source: "notion",
      sourceUrl:
        "https://www.notion.so/trungtran/Heuristic-Search-Methods-99000000000000000000000000000000",
      excerpt:
        "An exploration of various heuristic search algorithms and their applications in AI.",
      tags: ["algorithms", "ai", "computer-science"],
    },
    {
      id: "2",
      title: "Just learned about undefined vs null in JavaScript",
      date: "Oct 21, 2022",
      slug: "undefined-vs-null",
      source: "x",
      sourceUrl:
        "https://x.com/trungtran/status/1718181818181818181818181818181818181818",
      content:
        "TIL the difference between undefined and null in JavaScript. Undefined means a variable has been declared but not assigned a value, while null is an assignment value representing no value or no object.",
      likes: 42,
      retweets: 7,
    },
    {
      id: "3",
      title: "Coding session today",
      date: "Oct 21, 2022",
      slug: "coding-session",
      source: "instagram",
      sourceUrl:
        "https://www.instagram.com/trungtran/p/1718181818181818181818181818181818181818",
      imageUrl: "/placeholder.svg?height=400&width=400",
      likes: 128,
      comments: 14,
    },
    {
      id: "4",
      title: "Common Programming Idioms",
      date: "Oct 21, 2022",
      slug: "programming-idioms",
      source: "notion",
      sourceUrl:
        "https://www.notion.so/trungtran/Common-Programming-Idioms-99000000000000000000000000000000",
      excerpt:
        "A collection of common programming idioms across different languages and when to use them.",
      tags: ["programming", "best-practices"],
    },
    {
      id: "5",
      title: "Just shipped a new feature!",
      date: "Oct 21, 2022",
      slug: "new-feature",
      source: "x",
      sourceUrl:
        "https://x.com/trungtran/status/1718181818181818181818181818181818181818",
      content:
        "Just pushed a major update to my side project. Took 3 weeks but it's finally done! #coding #webdev",
      likes: 89,
      retweets: 12,
    },
    {
      id: "6",
      title: "My desk setup for 2022",
      date: "Oct 21, 2022",
      slug: "desk-setup-2022",
      source: "instagram",
      sourceUrl:
        "https://www.instagram.com/trungtran/p/1718181818181818181818181818181818181818",
      imageUrl: "/placeholder.svg?height=400&width=400",
      likes: 256,
      comments: 32,
    },
    {
      id: "7",
      title: "Understanding Variables in Programming",
      date: "Oct 21, 2022",
      slug: "variables-in-programming",
      source: "notion",
      sourceUrl:
        "https://www.notion.so/trungtran/Understanding-Variables-in-Programming-99000000000000000000000000000000",
      excerpt:
        "A deep dive into how variables work across different programming languages.",
      tags: ["programming", "basics", "computer-science"],
    },
    {
      id: "8",
      title: "Learning Rust has been a journey",
      date: "Oct 22, 2022",
      slug: "learning-rust",
      source: "x",
      sourceUrl:
        "https://x.com/trungtran/status/1718181818181818181818181818181818181818",
      content:
        "After a month of learning Rust, I'm finally starting to understand ownership and borrowing. The compiler is strict but helpful! #rustlang #programming",
      likes: 112,
      retweets: 24,
    },
    {
      id: "9",
      title: "New mechanical keyboard arrived",
      date: "Oct 22, 2022",
      slug: "new-keyboard",
      source: "instagram",
      sourceUrl:
        "https://www.instagram.com/trungtran/p/1718181818181818181818181818181818181818",
      imageUrl: "/placeholder.svg?height=400&width=400",
      likes: 189,
      comments: 27,
    },
    {
      id: "10",
      title: "Functional Programming Patterns",
      date: "Oct 23, 2022",
      slug: "functional-programming",
      source: "notion",
      sourceUrl:
        "https://www.notion.so/trungtran/Functional-Programming-Patterns-99000000000000000000000000000000",
      excerpt:
        "Exploring common functional programming patterns and their applications in modern JavaScript.",
      tags: ["functional-programming", "javascript", "patterns"],
    },
    {
      id: "11",
      title: "Getting Started with TypeScript",
      date: "Oct 24, 2022",
      slug: "getting-started-with-typescript",
      source: "regular",
      sourceUrl:
        "https://www.notion.so/trungtran/Getting-Started-with-TypeScript-99000000000000000000000000000000",
      content:
        '# Getting Started with TypeScript\n\nTypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.\n\n## Why TypeScript?\n\nTypeScript adds additional syntax to JavaScript to support a tighter integration with your editor. Catch errors early in your editor.\n\n## Basic Types\n\n```typescript\nlet isDone: boolean = false;\nlet decimal: number = 6;\nlet color: string = "blue";\nlet list: number[] = [1, 2, 3];\nlet x: [string, number] = ["hello", 10]; // Tuple\n```\n\nTypeScript is a great choice for developers who want to improve their productivity and code quality.',
      excerpt:
        "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
      tags: ["typescript", "javascript", "programming"],
      readingTime: "5 min read",
    },
    {
      id: "12",
      title: "regular Cheat Sheet",
      date: "Oct 25, 2022",
      slug: "regular-cheat-sheet",
      source: "regular",
      sourceUrl:
        "https://www.notion.so/trungtran/Regular-Cheat-Sheet-99000000000000000000000000000000",
      content:
        "# regular Cheat Sheet\n\nThis is a quick reference for regular syntax.\n\n## Headers\n\n```\n# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6\n```\n\n## Emphasis\n\n```\n*italic* or _italic_\n**bold** or __bold__\n~~strikethrough~~\n```\n\n## Lists\n\n```\n1. First ordered item\n2. Second ordered item\n\n* Unordered item\n* Unordered item\n```\n\n## Links and Images\n\n```\n[Link text](https://www.example.com)\n![Alt text](image.jpg)\n```\n\nregular is widely used for documentation and content creation.",
      excerpt:
        "A quick reference guide for regular syntax including headers, emphasis, lists, links, and more.",
      tags: ["regular", "documentation", "writing"],
      readingTime: "3 min read",
    },
  ];

  // Filter by source if provided
  const filteredPosts =
    source && source !== "all"
      ? allPosts.filter((post) => post.source === source)
      : allPosts;

  // Calculate pagination
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  const hasMore = endIndex < filteredPosts.length;

  return {
    posts: paginatedPosts,
    hasMore,
  };
};
