# REVIEW.md — Portfolio Site

## Review Protocol

- **G1 Design review** (2026-08-27): Stack = Astro + GitHub Pages. Rationale: free, full demo embedding, public repo = build-in-public evidence. Obsidian Publish rejected (no demos, no repo, $96-120/yr). Source: portfolio-analysis/analyses/06-astro-vs-obsidian-publish.md.
- **G2 Plan review**: scaffold → skeleton (About/Projects/Writing) → public push → Pages deploy → verify. External dep: GitHub Actions Pages workflow.
- **G3 Implementation review**: verify scaffold matches plan; check no leftover boilerplate confusion.
- **G4 Ship review**: URL live, repo public, README positioning line, guardrails documented.

## M2 — Homepage vs Separate Resume Page (2026-08-27)

**Decision: hybrid.** Homepage stays a focused hook; full history lives on a dedicated `/resume` page.

**Why:** The blakebeal.com model is right for a builder portfolio — the home page is a hook, not a CV dump. But the constraint differs for Chirag: he's targeting Stripe-tier PM roles, and recruiters scan home pages in ~15 seconds. So the home page gets a **compact highlights strip** (4 killer numbers: €0.9Bn platform value, 5%→100% adoption, $200M+ opportunity, 11+ yrs) plus a hero statement and a visible Resume CTA — enough for the 15-second scan — while the full Amazon ladder, skills, and education live on `/resume` where a human (or ATS-like skim) can get depth. A pure homepage-dump would bury positioning; a pure "CV on its own page" would hide the strongest numbers from the first screen.

**What changed (M2):**
- New `src/layouts/Layout.astro`: shared nav (Resume pill CTA, active states), footer (contact links), design tokens (cream/ink/orange kept), serif display headings + system sans body, buttons, cards, chips, hover states, `initial-scale=1` viewport, responsive breakpoints.
- `index.astro` rebuilt: eyebrow positioning → punchy H1 → lede with inline proof numbers → CTA row → 4-number highlights grid → skills chips → Latest (existing cards kept) → bottom resume CTA band.
- New `src/pages/resume.astro`: full real resume — summary, all 6 Amazon roles (dates + quantified bullets), Godrej/Citicorp, skills in 3 columns, education.
- `about.astro`, `projects.astro`, `writing.astro`: content preserved verbatim, restyled onto shared layout.
- Design decisions: no images, no frameworks, no external fonts (system stacks only — fast, dependency-free); cream/orange palette retained (it's the brand), typography scale elevated via clamp().

**Follow-ups / notes:**
- LinkedIn URL is a placeholder (`/in/chirag-gandhi`) — Chirag should confirm the real handle.
- Resume page could gain a print stylesheet (`@media print`) later; not needed for M2.
- README still describes M1 skeleton — worth updating next pass.

## M3 — Homepage v3 + dark mode (2026-08-27)

**Decision: follow Chirag's feedback exactly.** Home stops being a résumé hook and becomes two clearly separated halves: who he is professionally (hero + one paragraph + handoff) and what he builds himself (project cards). Amazon and the career numbers leave the home page entirely; the numbers move to the resume as a Highlights strip.

**Voice reference:** this pass is the first execution of `VOICE.md` (v0.1, started same day from his feedback). All new copy follows it: first person, no buzzwords, grounded claims, numbers only where they belong (resume). The skills sentence is the chips replacement.

**What changed (M3):**
- `index.astro` rebuilt to Chirag's spec: eyebrow (no Amazon) → **H1 "Chirag R Gandhi"** (largest text) → headline "I enjoy solving real problems and adding value at scale." → one honest sentence ("Eleven-plus years owning enterprise products — and I still build the tools myself.") → **Professional section** (2-line plain summary ending with the one-sentence skills line + "Full résumé →" button) → **Projects section** (4 cards: this site, crawler, TrueReview, market-evaluation + build-in-public line + "All projects →"). Removed: skills chips grid, 4-number highlights strip, resume detail, all Amazon references, "Latest" section.
- One-sentence skills line (chips replacement): **"I own enterprise products end to end — strategy, discovery, delivery — and I build the tools myself: SQL, Python, React."** Grounded in the resume (owns platform end to end; shipped full-stack apps SQL→Lambda→S3→React).
- `resume.astro`: added **Highlights** section (€0.9Bn / 5%→100% / $200M+ / 11+ yrs) right after the summary; Amazon + full history untouched; hardcoded `#333` → `var(--body)` token.
- `Layout.astro`: design tokens extended — new `--body` token; dark values for `--bg/--card/--ink/--body/--muted/--accent/--accent-dark/--accent-soft/--border` under `:root[data-theme="dark"]`; `color-scheme` set per theme; no-JS `@media (prefers-color-scheme: dark)` fallback; **theme toggle** (sun/moon SVG, keyboard-accessible button) in nav; inline head script sets `data-theme` before first paint from localStorage → OS preference; toggle persists choice. Shared meta description de-Amazoned.
- `about.astro`: hardcoded `#333` → token. `projects.astro`/`writing.astro`: already token-clean.

**Follow-ups / notes:**
- Headline is a placeholder per Chirag (VOICE.md approves it as such).
- Dark palette keeps the cream/warm brand (deep brown-black bg, warm off-white ink, brighter orange accent #ff8a3d for contrast).
- Card hover shadow switched to neutral black-alpha so it works on dark cards.

## M5 — Benchmark P0+P1 execution (2026-08-30)

**Decision: execute the P0 + P1 backlog from `benchmark/README.md` §4 on a branch, then show Chirag updated mocks for approval before merge.** Source of truth: benchmark master report (2026-08-28) + deep dives 02/03/04/05. No P2 items. Nothing touches `main` without Chirag's G4 approval.

### G1 — Design note

**Scope: P0 (7 items) + P1 (8 items) exactly as backlogged.**

- **P0.1 Lead rewrite** (VOICE 5/8/9): `index.astro` lead → two plain verb sentences ("I build enterprise products at work. I build small tools at home.") with the serif italic on `build`; rule line ("A project counts when a stranger can open it.") becomes the third sentence, muted. Amazon + untraced "billion $" gone from home; also de-Amazoned the shared meta description (same VOICE violation in the `<head>`).
- **P0.2 Writing out of nav + home** until a real post exists. `writing.astro` stays as the P2 slot (unlinked). Nav: About · Projects · Resume (3 items + toggle).
- **P0.3 "More coming" card deleted** from `projects.astro`. Statuses now only Live / In progress.
- **P0.4 Resume stripped**: 3-column skills grid removed; highlight-card hover lift (transform/shadow) removed. Contact links switch `--accent` → new `--accent-text` (#c2410c light / #ff9d5c dark) — accent-as-text was 3.6:1, fails 4.5:1 (benchmark §6).
- **P0.5 Fonts self-hosted**: Google CDN link removed. Inter 400/500/600 + Instrument Serif 400/italic woff2 (latin subsets from `@fontsource`) copied to `public/fonts/`; hand-written `@font-face` with `font-display: swap` + unicode-range; serif preloaded. Metric-adjusted fallbacks (Georgia metrics for serif) via fontaine if it computes cleanly, else documented approximation.
- **P0.6 Skip link**: `a.skip-link → #main`, first focusable element, styled on focus (mxb pattern).
- **P0.7 Reduced motion**: `scroll-behavior: smooth` gated behind `prefers-reduced-motion: no-preference`; full kill-switch for animations/transitions (mxb one-liner).
- **P1.1 Home = two-band hub**: above fold = h1, role line, 3-sentence lead, two CTAs (Resume primary / Projects secondary). Below = Work band (3 rows, no employer names, numbers trace to resume: €0.9Bn / 400+ users / 10 markets / 5%→100% / 3.6M actions) + "Full resume →"; Projects band (4 rows, title links to case study) + "All projects →". No hero, no chips, no stats, no social row. "Elsewhere" line skipped: footer already carries Email/LinkedIn/GitHub — adding it would duplicate (deviation logged, SA-4 §4 listed it optional-ish; footer split is the structural home).
- **P1.2 h2 → Inter 600, 1.5rem** (serif restricted to h1 + italic accents). Explicit h2 sizing = highest-value typography fix (SA-2 §4/§7).
- **P1.3 `/projects/{slug}` case studies**: `src/data/projects.ts` + `src/pages/projects/[slug].astro`. Structure: title → proof row (status + Open it + Source) → Problem → What I built (one honest difficulty line) → Outcome (or "no outcome yet") → ← All projects. Four pages (portfolio Live; crawler/TrueReview/market-eval In progress). Private repos labeled private — no fake public links. Note for Chirag: SA-4 sitemap says case studies appear "when the project becomes public" — kept all four so he can decide; hiding in-progress ones is a one-line change.
- **P1.4 About = three blocks** (Work / Personal / The meta): "at the intersection of…" killed; verb lists (Working on / Built / Learning, antfu pattern); build-in-public rule kept as the meta block.
- **P1.5 Difficulty lines**: one honest line per project blurb (home + projects page + case studies), all traceable to real repo facts (review gate discipline, crawler matching, review-noise proof, keeping 4 agents on one brief).
- **P1.6 Footer split explicit**: Professional (Email · LinkedIn) | Personal (GitHub) with tiny category labels.
- **P1.7 `theme-color` meta** light `#fffdf8` / dark `#16140f` (paco pattern).
- **P1.8 `--accent-soft` retired** (4th color stop; invisible on dark); `.chip` class dropped (unused anywhere).

**Voice:** all copy written against VOICE.md (first person, short sentences, no claims without traces, no company names on home, statuses blunt).

### G2 — Plan

Files touched:
- `package.json` — devDep `fontaine` only if fallback computation works; font files come from `@fontsource/*` (dev-only, not kept in deps once woff2 are copied).
- `astro.config.mjs` — fontaine vite plugin (if used).
- `src/layouts/Layout.astro` — fonts, skip link, reduced motion, h2, nav, footer, meta description, theme-color, accent tokens.
- `src/pages/index.astro` — hub restructure + lead + difficulty lines.
- `src/pages/about.astro` — three blocks.
- `src/pages/projects.astro` — rule-as-subheader, links to case studies, difficulty lines, no "More coming".
- `src/pages/resume.astro` — strip skills grid + hover lift; accent-text links.
- `src/pages/writing.astro` — drop active nav state (page stays as P2 slot).
- `src/data/projects.ts` (new) — project data incl. case-study content.
- `src/pages/projects/[slug].astro` (new) — case-study template.
- `public/fonts/*.woff2` (new) — self-hosted latin subsets.
- `REVIEW.md` — this log + G4 review summary.

Verification: `npm run build` exit 0 (G3) → `astro preview` + curl 200 → Playwright screenshots of all pages (light + dark) as the review mocks → G4 review summary → Chirag approval → merge → GitHub Actions deploy → live URL 200 (G5).

### G3 — Implementation (build ✅)

Implemented on `feat/p0-p1-benchmark`. All P0 (7) + P1 (8) items landed:

- **Fonts self-hosted** (`public/fonts/`, latin woff2 subsets from `@fontsource`, ~21–24KB each): Google CDN removed, serif + Inter preloaded, `font-display: swap`, metric-adjusted fallback faces computed from real font metrics (Instrument Serif → Georgia `size-adjust 76.49%`; Inter → Arial `size-adjust 107.12%`; math per fontaine, values in `src/styles/fonts.css`).
- **Home = two-band hub** with the 3-sentence lead ("I *build* enterprise products at work. I *build* small tools at home. A project counts when a stranger can open it."), Work band (3 rows, no employer names, all numbers trace to resume), Projects band (rows link to case studies). Writing section + nav item removed (page kept as P2 slot).
- **h2 → Inter 600 1.5rem** (serif now h1 + italic accents only).
- **Case studies**: `src/data/projects.ts` + `src/pages/projects/[slug].astro` — 4 pages (portfolio Live + proof links; crawler/TrueReview/market-eval In progress with honest private-repo/"no outcome yet" labels).
- **About** = Work / Personal (verb lists) / The meta blocks; "intersection" phrase killed.
- **Resume**: skills grid removed, hover-lift removed, contact links → ink-safe accent `#c2410c`.
- **Skip link** (`#main`), **reduced-motion guard + kill-switch**, **theme-color** metas (light `#fffdf8` / dark `#16140f`), **footer split** (Professional: Email·LinkedIn | Personal: GitHub), **`--accent-soft` retired**.
- Meta description de-Amazoned (same VOICE 8 violation as the old lead, one line below it).
- `npm run build` exit 0 (9 pages). Preview served locally; all routes + fonts return 200.

**Mocks (for review):** 12 full-page screenshots (6 pages × light/dark) at `~/.openclaw/workspace/tools/site-shots/shots/` — attached in chat. Local preview for hands-on review: `npm run preview -- --port 4321` → `http://localhost:4321/chirag-portfolio/`.

**Deviations (logged):** ① "Elsewhere" line on home skipped — footer already carries Email/LinkedIn/GitHub; adding both would duplicate. ② In-progress projects keep case-study pages (SA-4 sitemap says case studies appear when public) — Chirag can drop the three in-progress pages if he wants the strict rule. ③ Pre-existing resume layout quirks ("Earlier" date spacing, Education date wrap) untouched — out of P0/P1 scope.

### G4 — Review (⛔ awaiting Chirag's approval)

**Status: awaiting approval.** Nothing merges until Chirag says go (chat or PR review).

## Known decisions

- Repo name: `chirag-portfolio` (project site under GitHub Pages with `base` path) — final name TBD if custom domain added later.
- Content strategy: OpenClaw writes case-study markdown into `src/content/`; site sections ship only when project reaches MLP.
- Tracking: Obsidian (AI inbox), per decision 2026-08-27.

## M4 — Homepage v4: the taste pass (2026-08-27)

**Decision: execute analysis 09 (Typography & Taste Spec) exactly, on Chirag's exact homepage copy.** Homepage v3 was structurally right but still shouted (big serif H1, orange buttons, cards, pill CTA, orange nav states). This pass removes every decorative move: no hero, no giant type, no cards on home, no orange except in the three allowed places. Sources: `portfolio-analysis/analyses/08-site-inspiration-pm-builders.md` (Direction A — serif-led editorial, blakebeal.com structure) + `09-typography-taste-spec.md` (hard spec).

**What changed (M4):**
- `index.astro` rewritten to Chirag's exact copy: moderate name H1 (Instrument Serif 400, `clamp(2.25rem, 1.7rem + 2.4vw, 3.25rem)`, -0.01em) → tagline "Senior Technical Product Manager, Builder" (Inter 500, muted, no period) → his intro verbatim with **one** `<em>build</em>` in Instrument Serif italic → two CTAs: **"Professional Experience / Career"** (primary: ink fill, `--bg` text, 6px radius, no shadow, hover 85% opacity) + **"Projects →"** (secondary plain text). Below: quiet **Projects** section (hairline-separated rows, name + one line each, "This portfolio site" first, statuses muted) + build-in-public line "A project counts when a stranger can open it." + quiet **Writing** section (one row) + secondary links.
- `Layout.astro` rebuilt on the spec: **Instrument Serif** (display, 400 + italic) + **Inter** (400/500/600) via one Google Fonts CSS2 request with preconnects + `display=swap`; tokens `--bg #fffdf8 / --surface #fffefb / --ink #1a1a1a / --muted #6b655c / --hairline #e9e5da / --accent #e8590c` (dark: `#16140f / #1c1913 / #f2efe6 / #9b948a / #2a251d / #ff9d5c`); **orange restricted to** link hover underline (1px, 150ms), `::selection`, `:focus-visible`; links ink at rest; content column narrowed 720px → **42rem**; page padding `clamp(1.5rem, 5vw, 3rem)`; sections 3.5rem apart; tiny uppercase section labels (0.8125rem Inter 600, 0.08em, muted); quiet text-only nav (About/Projects/Writing/Resume — Home link and pill CTA removed); tiny one-line footer (0.8125rem muted); card/status/chip restyled quiet (hairline borders, muted statuses, no hover shadows).
- **Dark mode preserved and extended**: manual sun/moon toggle + localStorage + no-JS `prefers-color-scheme` fallback all kept, now with the spec's dark values. Toggle hover uses ink, not accent (accent discipline).
- **Backward-compat aliases** in Layout tokens (`--card: var(--surface)`, `--border: var(--hairline)`, `--body: var(--ink)`, `--accent-dark: var(--accent)`, `--accent-soft` via color-mix) so About/Projects/Writing/Resume render unchanged — `resume.astro` untouched (numbers strip + Amazon history intact, just inheriting the new palette + Instrument Serif headings via global rules).

**Follow-ups / notes:**
- Headline/tagline now Chirag's exact words; VOICE.md's placeholder headline is superseded on home (VOICE.md still lists it — worth updating next pass).
- Intro mentions Amazon (per Chirag's exact copy) — note this deliberately overrides VOICE.md rule 8 for the home page; Chirag's explicit words win.
- `nav a.active` uses a persistent ink underline (accent would violate the one-accent rule); hover still goes accent.
- Fonts are now third-party (Google Fonts, ~60–120 KB) — first external dependency on the site; `display=swap` keeps CLS low. Self-hosting via @fontsource is the documented fallback if offline-first ever matters.
