import { glob } from "astro/loaders"; // Not available with legacy API
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  // `loader` can accept an array of multiple patterns as well as string patterns
  // Load all markdown files in the space-probes directory, except for those that start with "voyager-"
  loader: glob({
    pattern: ["*.md"],
    base: "src/contents/projects",
  }),
  schema: z.object({
    name: z.string(),
    tags: z.array(z.string()),
    github: z.string(),
    demo: z.string().optional(),
  }),
});

export const collections = { projects };
