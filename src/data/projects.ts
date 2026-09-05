export type ProjectStatus = "Live" | "In progress";

export interface Project {
  slug: string;
  name: string;
  status: ProjectStatus;
  /** One plain clause for index rows. */
  blurb: string;
  /** One honest difficulty line (VOICE rule 6). */
  difficulty: string;
  url?: string;
  repo?: string;
  /** False when the repo exists but is not public yet — shown as such, never faked. */
  repoPublic?: boolean;
  /** Case-study sections, first person, plain words. */
  problem: string[];
  built: string[];
  outcome: string[];
  /** Optional link to the parametric playground preset picker */
  playgroundUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "this-portfolio-site",
    name: "This portfolio site",
    status: "Live",
    blurb: "The meta-project — a portfolio with a design system visitors can try.",
    difficulty:
      "The hard part wasn't Astro. It was the discipline: every change goes through a review gate before it ships.",
    url: "https://asp-builder-git.github.io/chirag-portfolio/",
    repo: "https://github.com/asp-builder-git/chirag-portfolio",
    repoPublic: true,
    playgroundUrl: "/chirag-portfolio/playground",
    problem: [
      "Most portfolios are a template or a promise. I wanted one that only shows real things — and that shows how I think about systems, not just what I shipped.",
      "The rule that runs it: a project counts when a stranger can open it.",
    ],
    built: [
      "A static Astro site on GitHub Pages. A seed string resolves to a design spec, which drives the CSS — typography, palette, hero, motion.",
      "Four curated presets visitors can try on /playground. Twenty-four wilder ones stay in a local design lab.",
      "Every change ships through a review gate: branch, build, approval, then merge.",
    ],
    outcome: [
      "Live since August 2026. Open /playground to switch themes. The meta-project is proof I can finish things.",
    ],
  },
  {
    slug: "luxembourg-property-crawler",
    name: "Luxembourg Property Asymmetry Crawler",
    status: "In progress",
    blurb: "Compares broker listings against the atHome aggregator inventory.",
    difficulty:
      "Matching listings across two very different sites was harder than it looked.",
    repo: "https://github.com/asp-builder-git/lux-property-crawler",
    repoPublic: false,
    problem: [
      "Property listings in Luxembourg are scattered. Brokers publish on their own sites, and the big aggregator doesn't see everything.",
      "I wanted to know what's listed where, and what the aggregator is missing.",
    ],
    built: [
      "A full pipeline: crawl broker listings, snapshot the aggregator inventory, match across both, and surface the asymmetry in a dashboard.",
      "The matching step was harder than it looked — the same house shows up with different address formats, different languages, different spellings.",
    ],
    outcome: [
      "No outcome yet — the matching step is still being tuned.",
      "The repo stays private until a stranger can open it. That's the rule.",
    ],
  },
  {
    slug: "truereview",
    name: "TrueReview",
    status: "In progress",
    blurb:
      "Analyzes Google reviews for suspicious patterns and shows the adjusted \u201ctrue\u201d rating.",
    difficulty:
      "The hard part is proving a pattern is real and not just noise.",
    repo: "https://github.com/asp-builder-git/truereview",
    repoPublic: false,
    problem: [
      "Restaurant ratings get gamed. A place with a hundred glowing five-star reviews can still be average — the reviews just look similar.",
      "I wanted the rating a place actually deserves, not the one the review pattern produces.",
    ],
    built: [
      "A tool that pulls Google reviews, looks for suspicious patterns — bursts of reviews, repetitive language, one-sided stars — and shows an adjusted \u201ctrue\u201d rating.",
      "The hard part is proving a pattern is real and not just noise.",
    ],
    outcome: [
      "No outcome yet — in progress.",
      "The repo stays private until it ships.",
    ],
  },
  {
    slug: "market-evaluation-4-agents",
    name: "Market Evaluation \u2014 4 Agents, 1 Day",
    status: "In progress",
    blurb:
      "A 4-week market study compressed into a single day with a 4-agent pipeline.",
    difficulty: "Keeping four agents on one brief was the hard part.",
    problem: [
      "A proper market study takes weeks: research, teardowns, scoring, synthesis. I wanted to know whether a 4-agent pipeline could compress a 4-week study into a single day — and whether the output was usable.",
    ],
    built: [
      "One brief, four agents: problem discovery, validation, solution generation, and a synthesis pass. Three ranked, ready-to-build business ideas came out.",
      "Keeping four agents on the same brief was the hard part — context leaks and drifts fast.",
    ],
    outcome: [
      "No outcome yet — the write-up lands here when it ships.",
    ],
  },
];
