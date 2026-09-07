import { withBase } from "./base";

export type PrimaryNavKey = "home" | "projects" | "resume";

export interface PrimaryNavItem {
  key: PrimaryNavKey;
  label: string;
  href: string;
}

/** Primary production nav — About/Writing stay off this list. */
export const PRIMARY_NAV: PrimaryNavItem[] = [
  { key: "home", label: "Home", href: withBase() },
  { key: "projects", label: "Projects", href: withBase("projects") },
  { key: "resume", label: "Resume", href: withBase("resume") },
];
