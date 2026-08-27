# SKILL.md — Personal Portfolio Site (M1: Skeleton)

## Pipeline

1. **DESIGN**: Astro static site, GitHub Pages hosting, public repo from day one. Structure: Home/About, Projects index, Writing index. Positioning: "Product Manager & Builder". Markdown-first content (OpenClaw writes case studies into content collections).
2. **PLAN**: scaffold Astro → strip to skeleton → About page with positioning → git init + public push → GitHub Pages workflow → verify URL loads.
3. **IMPLEMENT**: standard Astro scaffold (verified approach, no ad-lib).
4. **VERIFY**: `npm run build` passes; deployed URL returns 200; repo is public.
5. **SHIP**: report URL + repo to Chirag. Guardrails: public repo or it doesn't count; MLP = one page that loads.

## Gates

- **Gate 1 (Design)**: Stack validated against Obsidian Publish (analysis 06) — Astro wins on demos + build-in-public evidence. ✅ auto-pass (decision made 2026-08-27).
- **Gate 2 (Plan)**: Steps are ordered and complete (scaffold → skeleton → deploy → verify). External dep: GitHub Pages deploy — known workflow, auto-pass with verification.
- **Gate 3 (Verify)**: `npm run build` exit 0 + live URL returns 200.
- **Gate 4 (Ship)**: Chirag asked for the site (M1 from project plan). Repo public, no secrets, README present.

## Recovery

- npm scaffold fails (network/registry) → retry with `--yes` flags; fall back to manual `package.json` + minimal Astro install.
- GitHub Pages deploy fails → check workflow logs, verify `base` path config for project-site repos.
- Node version too old → check `node -v`; use `npx astro@latest` which handles current versions.

## Exit Criteria

- [x] Public GitHub repo exists (day one)
- [x] Astro skeleton: About + Projects + Writing pages
- [x] Deployed to GitHub Pages, URL returns HTTP 200
- [x] README with positioning one-liner
