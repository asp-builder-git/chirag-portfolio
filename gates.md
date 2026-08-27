# gates.md — Portfolio Site

## M1: Skeleton

| Gate | Criteria | Status |
|------|----------|--------|
| G1 Design | Stack decided (Astro vs Obsidian Publish, analysis 06) | ✅ PASS 2026-08-27 |
| G2 Plan | Steps ordered, deps known (node, npm, GitHub Pages) | ✅ PASS 2026-08-27 |
| G3 Verify | `npm run build` exit 0; URL returns 200 | ✅ PASS 2026-08-27 (build 4 pages, all URLs 200) |
| G4 Ship | Repo public, README, no secrets | ✅ PASS 2026-08-27 (public, deployed) |

## M2: Resume + UX upgrade

| Gate | Criteria | Status |
|------|----------|--------|
| G5 Design | Where does resume live? Decision: **hybrid** — home = hook (hero + 4 killer numbers + CTA), full history on dedicated `/resume` page. Rationale in REVIEW.md | ✅ PASS 2026-08-27 |
| G6 Plan | Shared Layout component (nav/footer/design tokens), restructure index, create resume.astro, nav link, restyle About/Projects/Writing without losing content | ✅ PASS 2026-08-27 |
| G7 Verify | `npm run build` exit 0; all 5 routes 200 (dev server + live after deploy); mobile: nav wraps, grids collapse, clamp() type | ✅ PASS 2026-08-27 |
| G8 Ship | Commit + push to main, Actions deploy green, live `/` and `/resume/` return 200 | ✅ PASS 2026-08-27 |

## Exit Criteria (M2)

- [x] Home page: hero positioning, highlights strip (€0.9Bn / 5%→100% / $200M+ / 11+ yrs), clear CTA
- [x] Dedicated `/resume` page with full career history (real data), skills, education
- [x] Nav includes Resume (pill CTA); footer with contact links
- [x] All original content preserved (About, Projects, Writing)
- [x] Shared Layout = consistent typography/spacing/hover states; responsive
- [x] Deployed; `/` and `/resume/` return HTTP 200
