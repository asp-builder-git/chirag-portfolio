# REVIEW.md — Portfolio Site M1

## Review Protocol

- **G1 Design review** (2026-08-27): Stack = Astro + GitHub Pages. Rationale: free, full demo embedding, public repo = build-in-public evidence. Obsidian Publish rejected (no demos, no repo, $96-120/yr). Source: portfolio-analysis/analyses/06-astro-vs-obsidian-publish.md.
- **G2 Plan review**: scaffold → skeleton (About/Projects/Writing) → public push → Pages deploy → verify. External dep: GitHub Actions Pages workflow.
- **G3 Implementation review**: verify scaffold matches plan; check no leftover boilerplate confusion.
- **G4 Ship review**: URL live, repo public, README positioning line, guardrails documented.

## Known decisions

- Repo name: `chirag-portfolio` (project site under GitHub Pages with `base` path) — final name TBD if custom domain added later.
- Content strategy: OpenClaw writes case-study markdown into `src/content/`; site sections ship only when project reaches MLP.
- Tracking: Obsidian (AI inbox), per decision 2026-08-27.
