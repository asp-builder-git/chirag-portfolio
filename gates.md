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

## M3: Homepage v3 + dark mode

| Gate | Criteria | Status |
|------|----------|--------|
| G9 Design | Name = H1, headline under it, one honest sentence; professional vs personal demarcation; skills → one sentence; numbers move to resume; zero Amazon on home | ✅ PASS 2026-08-27 (per Chirag feedback, recorded in VOICE.md) |
| G10 Plan | Rewrite `index.astro`; extend Layout tokens with dark values + toggle + localStorage; add Highlights strip to `resume.astro`; sweep hardcoded colors on all pages | ✅ PASS 2026-08-27 |
| G11 Verify | `npm run build` exit 0; home has H1 name + no Amazon + no chips/numbers; resume has Amazon + highlights; dark vars on all 5 pages (no hardcoded light colors left) | ✅ PASS 2026-08-27 |
| G12 Ship | Commit + push to main, Actions deploy green, live `/` and `/resume/` return HTTP 200 | ✅ PASS 2026-08-27 |

## Exit Criteria (M3)

- [x] Home hero: "Chirag R Gandhi" as H1 (biggest text), headline beneath, one honest sentence
- [x] Home: professional section (plain summary + skills sentence + "Full résumé →") clearly separated from projects section (cards: site, crawler, TrueReview, market-evaluation)
- [x] Home: no skills chips, no career numbers, no resume detail, no Amazon
- [x] Resume: keeps Amazon + full history + new Highlights strip (€0.9Bn / 5%→100% / $200M+ / 11+ yrs)
- [x] Dark mode: `prefers-color-scheme` default + manual nav toggle (sun/moon), persisted via localStorage, all tokens have dark variants
- [x] About/Projects/Writing content intact; all pages work in both modes
- [x] Deployed; `/` and `/resume/` return HTTP 200
