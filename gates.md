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

## M4: Homepage v4 — the taste pass

| Gate | Criteria | Status |
|------|----------|--------|
| G13 Design | Follow analysis 09 (typography & taste spec) exactly: Instrument Serif + Inter, spec type scale, spec light/dark palette, accent only in hover underline / selection / focus ring, 42rem column, quiet nav, tiny uppercase labels, one-line footer | ✅ PASS 2026-08-27 |
| G14 Plan | Rewrite `index.astro` to Chirag's exact copy (name H1 moderate, tagline, intro with ONE `<em>` word, two CTAs, quiet Projects/Writing rows); rebuild Layout tokens/fonts/buttons/links; keep dark toggle; keep legacy token aliases so About/Projects/Writing/Resume render unchanged; resume content untouched | ✅ PASS 2026-08-27 |
| G15 Verify | `npm run build` exit 0; dist contains single fonts CSS2 request + preconnects + display=swap; exact copy present (`Professional Experience / Career`, tagline, `billion $ impact`, `<em>build</em>`); nav = 4 quiet text links (no pill CTA); resume still resolves legacy tokens; dark vars + no-JS fallback + toggle intact | ✅ PASS 2026-08-27 |
| G16 Ship | Commit + push to main, Actions deploy green, live `/` and `/resume/` return HTTP 200 | ✅ PASS 2026-08-27 |

## Exit Criteria (M4)

- [x] Home: "Chirag R Gandhi" as moderate Instrument Serif H1 (clamp 2.25→3.25rem, not huge); tagline "Senior Technical Product Manager, Builder" (muted, no period); exact intro copy with one `<em>build</em>` in Instrument Serif italic
- [x] Two CTAs: primary "Professional Experience / Career" (ink fill, --bg text, 6px radius) + secondary "Projects →" (plain text link)
- [x] Quiet Projects rows (name + one line, hairline-separated, no cards; "This portfolio site" first) + quiet Writing row; "A project counts when a stranger can open it." kept
- [x] Layout: Instrument Serif + Inter via single Google Fonts request (preconnect, display=swap); spec palette light/dark; accent only in link hover underline / ::selection / :focus-visible; nav quiet text links; tiny one-line footer; 42rem column
- [x] Dark mode: manual toggle + localStorage + prefers-color-scheme fallback all preserved, new dark values
- [x] Resume keeps numbers strip + Amazon history (content unchanged, legacy tokens aliased to new palette)
- [x] Deployed; `/` and `/resume/` return HTTP 200
