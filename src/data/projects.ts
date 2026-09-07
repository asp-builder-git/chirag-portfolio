import thisPortfolioSite from "../content/projects/this-portfolio-site.json";
import luxembourgPropertyCrawler from "../content/projects/luxembourg-property-crawler.json";
import truereview from "../content/projects/truereview.json";
import marketEvaluation from "../content/projects/market-evaluation-4-agents.json";

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
  /** Optional site-relative path to the parametric playground (joined via withBase) */
  playgroundUrl?: string;
}

/**
 * Project list — data lives in `src/content/projects/*.json` (content collection).
 * This module stays for typed sync imports (home-content consumers); pages may also use `getCollection("projects")`.
 */
export const projects: Project[] = [
  { slug: "this-portfolio-site", ...thisPortfolioSite },
  { slug: "luxembourg-property-crawler", ...luxembourgPropertyCrawler },
  { slug: "truereview", ...truereview },
  { slug: "market-evaluation-4-agents", ...marketEvaluation },
] as Project[];
