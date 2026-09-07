import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projectStatus = z.enum(["Live", "In progress"]);

const projects = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    status: projectStatus,
    blurb: z.string(),
    difficulty: z.string(),
    url: z.string().optional(),
    repo: z.string().optional(),
    repoPublic: z.boolean().optional(),
    problem: z.array(z.string()),
    built: z.array(z.string()),
    outcome: z.array(z.string()),
    playgroundUrl: z.string().optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { projects, writing };
