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

**Correction (2026-08-31, during Chirag's verification pass):** the original G3 claim over-stated P0.4 — only the skills grid was actually removed. The highlight-card hover lift (transform/shadow) and the contact-link `--accent-text` switch were still in the code. Both fixed in `resume.astro` and re-verified: build green, preview 200.

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

## M6.1 — Design system foundation (2026-08-31, G4 ✅ → G5 ✅ SHIPPED)

**Scope:** M6 redesign kickoff (per Chirag's M6 spec — used as UX/design blueprint only; all metrics replaced with real CV facts per VOICE.md rule 3).

**Shipped (merged `dc326b3` → main, auto-deployed, live verified 200):**
1. **Palette** cream/orange → slate/indigo engineering aesthetic: light `#F8FAFC / #FFFFFF / #0F172A / #475569 / #E2E8F0 / #4338CA`; dark `#0F172A / #1E293B / #F1F5F9 / #94A3B8 / #334155 / #818CF8` (+ `--accent-text #A5B4FC`). All 8 pairs WCAG AA (computed). theme-color metas updated.
2. **JetBrains Mono** self-hosted (400/500, `public/fonts/`) → `--font-mono` token; applied to `.status` badges (Layout), resume `.highlight .num` metric chips, case-study `.proof` rows (spec: metric chips / status badges / integration labels).
3. **CV number corrections** (the M5-pause flags): home Work rows + resume summary + Highlights + 2 bullets — €0.9Bn→**€0.36Bn/yr profitability**; 400+ users/10 markets→**~400 negotiators, 9 EU markets**; 5%→100%→**~5% voluntary→org-wide default** (+120% YoY added); $200M+ think-big→**82% of 40,937 audit entries** / VP-2026 automation vision; $10M→**$3M** defect costs.
4. **M6-PLAN.md** added: 7-milestone roadmap + sub-agent execution contract + open questions.

**Process notes / deviations (logged):**
- **Edit-batch failure caught by Chirag:** first `Layout.astro` multi-edit failed atomically on one sub-edit; only the preload line was re-applied, so the palette never shipped in the build. Caught during Chirag's visual review ("looks the same"). Re-applied all 6 blocks, rebuilt, verified 11 new tokens / 0 old in CSS bundle. Lesson: after any multi-edit, verify the built CSS contains the expected tokens — not just build exit 0.
- **Branch protection restructured (Chirag-approved 2026-08-31):** "1 approving review" was structurally impossible — every PR is authored by `asp-builder-git` (Chirag's account) because the tooling uses his GitHub identity, and GitHub forbids self-approval; admin bypass also rejected (HTTP 405, enforce_admins). Changed `required_approving_review_count` → **0** (enforce_admins stays). The real gate remains Chirag's explicit chat instruction + this REVIEW.md log + PR-only merges; GitHub's protection no longer double-enforces it.
- **M5 PR #1 closed as superseded** — M5's commits (9b1e75b, eb6aeed) shipped inside PR #2 (branched from it). Nothing lost.
- **Screenshot tool still broken** (Chromium missing `libnspr4.so`, needs sudo) — visual QA via preview; retry fix before M6.2.

**Next:** M6.2 — home hero + operating philosophy (3 pillars) + platform impact metrics strip. One milestone per review round; sub-agent implementation (visible session), PM verify → Chirag review → merge → deploy → verify live.

## M6.2 — Home: hero + operating philosophy + impact strip (2026-08-31, G1–G3 ✅, G4 ⏳ awaiting review)

**Implementation:** sub-agent (visible session `m6-2-home`, deepseek-v4-pro) → branch `feat/m6-2-home` (commit `0ceb396`), 1 file: `src/pages/index.astro`.

**Shipped bands (top of home; Projects section kept below):**
1. **Hero** — H1 "Chirag R Gandhi" (brand mark kept, per PM recommendation on open Q §5) + system-role subhead "Internal Platform Product Manager — Workflow Orchestration & Enterprise Automation" + one plain first-person line + mono status chip "Luxembourg · EU · Remote-ready" + CTAs → /projects + /resume (both exist — no dead links; case-studies CTA swaps in with M6.3).
2. **Operating philosophy — 3 pillars** (mono index 01–03): internal employees are the customer (~400 negotiators) · data over opinions (40,937 audit entries, 82% standardized → deterministic > conversational AI, VP-2026) · automation that compounds (~3.6M actions +120% YoY, +148 bps).
3. **Impact strip — 5 mono metric chips**: €0.36Bn/yr · ~3.6M actions (+120% YoY) · ~400 negotiators / 9 EU markets · +148bps (94.87%→96.35%) · 8h→1h vendor prep.

**Verification (PM):** build exit 0 (9 pages); dist contains all key M6.2 strings; tokens only (no new colors — AA inherited from M6.1 palette); responsive (pillars grid→stack @640px, metrics flex-wrap); preview :4321 serving M6.2, 200. No other pages touched; no regression (Writing section absent on main already).

**Deviations / decisions to review:**
- Old M4-era "Work" band removed — its facts absorbed into hero/metrics (no information lost; site reads tighter).
- Hero CTAs point at existing pages (Projects/Resume) until case studies ship in M6.3 — no "coming soon" theater per VOICE.
- Status chip wording chosen: "Luxembourg · EU · Remote-ready" (factual, CV-backed). Swap for "open to opportunities" if Chirag prefers.
- Pillar 2 wording: "VP-level 2026 priority" kept (real, from CV); pillar 3 states reliability gain plainly.

**Next:** M6.3 — 3 case studies (6-part anatomy) at /case-studies. Needs Chirag's pick of 3rd deep-dive (warehouse vs GenAI accelerator) + nav question.

## Design Lab — Deterministic UX Exploration (2026-09-01, G1 ✅)

**Decision:** build a local-only design lab that maps 100-character alphanumeric seeds to full design specs (colors, shadows, buttons, radius, typography, layout archetypes). 16 curated seeds span the design space. Production `Layout.astro` untouched until Chirag picks a winner.

**Scope:**
- `src/design/*` — deterministic `resolveDesign(seed)` pipeline with 10 zones, pattern extractors, WCAG AA nudge logic
- `src/layouts/DesignLabLayout.astro` — injects resolved CSS vars per seed; archetype modifiers (`leerob`, `paco`, `mxb`, `antfu`, `brutalist`)
- `src/components/pages/HomeContent.astro` + `ProjectsContent.astro` — shared markup; production pages refactored to import them
- `/design-lab` gallery + `/design-lab/[seed]/home` + `/design-lab/[seed]/projects` — local dev review only
- Production guard: `[seed]` routes return empty `getStaticPaths()` in PROD; gallery index shows dev-only stub

**Voice (SA-Voice sign-off):** lab pages reuse production copy verbatim from `HomeContent` / `ProjectsContent`. No new marketing text. Banner/footer labels are lab chrome only.

**Review workflow:**
1. `astro dev --background` → `http://localhost:4321/chirag-portfolio/design-lab`
2. Gallery shows 16 variants with swatches + archetype tags
3. Click Home / Projects per seed; shortlist 2–3 seed IDs
4. Winner → separate PR folds tokens into production `Layout.astro`

**Artifacts:** `design-lab-a11y-report.md` (contrast audit), `npm run design:seeds` (terminal catalog)

**Next:** Chirag reviews gallery locally → picks seed → G4 approval → production token migration PR.

## Swiss Home + Parametric Playground (2026-09-02, G3 ✅ — awaiting G4)

**Decision:** Ship Swiss statement poster as production home default. Recruiters get name + role + statement + resume path; builders get `/playground` and the expanded portfolio case study. Design lab stays dev-only.

**Branch:** `feat/design-lab`

### What changed

**Home (`/`):**
- New `HomeLayout.astro` — sticky ATF bar (Chirag R Gandhi · Home · Projects · Resume), theme toggle, appearance drawer
- Statement-dominant hero: name label (red rule) → Platform Product Manager → approved statement → plain sentence
- CTAs: Resume primary, Projects secondary; status chip removed
- 3 impact metrics (from resume highlights); philosophy band unchanged
- Projects band: `this-portfolio-site` only

**Appearance drawer (5 knobs):** Preset · Theme · Hero mode · Density · Texture (glyph drift off by default)

**Playground (`/playground`):** Full preset picker, share-link copy, intro, links to home + case study

**Case study:** `this-portfolio-site` expanded; proof row adds "Try presets →"

**Design system (lab):** `namePlacement: above-statement`, Swiss brutal dark palette, black matrix rain on card #18

### G3 verification

- `npm run build` — exit 0, 11 pages (includes `/`, `/playground`)
- No linter errors on new files

### What to review

1. **`/`** — sticky bar, statement hero, 3 metrics, single project row
2. **Appearance drawer** (gear) — try presets, dark mode, texture
3. **`/playground`** — share link, preset switching
4. **`/projects/this-portfolio-site`** — updated copy + playground link
5. **Dev lab card #18** — `npm run dev` → `/design-lab` → Swiss · statement poster

### Deviations (logged)

- Playground link on home project row omitted (lives in case study proof row only)
- Drawer knob labeled "Texture" not "Motion" (same Off/Subtle behavior)

## Feedback pass — Swiss home polish (2026-09-03)

**Applied from Chirag review:**
- Sticky bar: larger name + orange `|` separator before nav links
- Hero: removed name/role above statement; statement = "I revel in watching a well-built solution come alive."; sub-hero = enterprise/agent line; tagline = "Platform Product Manager | Agent-supported Builder | Lifelong Learner"
- Impact: compact metric cards (smaller type/padding)
- Portfolio project: voice-rewritten blurb + case study
- Footer: removed Professional / Personal tags (home + site-wide Layout)
- Playground: theme preset as buttons under "View this site in different themes:"
- Home projects row links to playground themes

**Open:** Operating philosophy — no prior plan comment found beyond "keep existing copy." Awaiting Chirag's rewrite/hide/shorten direction.

**G3:** build green after this pass.

## Resume sync — CV v8 (2026-09-03)

**Source:** `Chirag-Gandhi-Resume-v8.docx`. Replaced all legacy `/resume` content with v8-accurate copy. Home page left untouched (no Amazon name dumps; VOICE rule 8).

### Legacy → v8 deltas (key numbers)

| Area | Legacy (on site) | CV v8 |
| --- | --- | --- |
| Role title | Senior Product Manager | Senior Technical Product Manager (PM-T) \| Enterprise Platforms & AI Automation |
| Platform users | ~400 negotiators, 9 EU markets | ~850 negotiators, EU & NA |
| Adoption story | ~5% voluntary → org-wide default; ~3.6M actions/year (+120% YoY) | Near-zero → org-wide default (no 3.6M / +120% YoY in v8) |
| Reliability | +148 bps | +175 bps; protecting >$1.05M/yr contribution profit |
| Automation case | 82% of 40,937 audit entries | 41K requests; funded 2026 VP goal; $200MM entitlement |
| New (v8 only) | — | Solo profitability app in 5 weeks; €87MM entitlement; 25 WAU / 50 target; 1.49M EU opportunities portal → UCP |
| Cross-border | OCR → €300M+; 144K products | Same core + 270K listings/year; €300MM+ wording |
| Trade-in / warehouse | 1M units/year capacity; $3M defect costs | Doubling capacity to 1M units/year; defect value 17.8% → ~12% ($3M) |
| Earlier roles | Separate PM / BD roles with $3M+/$15M+, 12→68 cities, +12.3pp, Godrej +43% | Condensed 2007–2019 block; kept 7.8%→99%, 6.5%→25% (vs 15% target); Godrej Channel Manager + Citicorp Research Analyst |
| Skills | Absent on page | Technical (SQL/Python, React/Cloudscape→Lambda→Redshift, Kiro/Claude Code) + Domain |
| Highlights strip | €0.36Bn · ~5%→default · 82% · 11+ yrs | €0.36Bn/yr · Near-zero→default · +175 bps · €87MM |

**Files:** `src/pages/resume.astro`, `REVIEW.md`. Layout meta already aligned (PM-T).

**Build:** run `npm run build` on `feat/design-lab` before commit (shell unavailable in the sync session — verify locally).

## Home / design-lab CV v8 metric sync (2026-09-03)

Aligned non-resume career numbers with resume v8 (VOICE.md; no Amazon on home). Philosophy stays hidden on production-default.

| Metric | Legacy | Now (v8) |
| --- | --- | --- |
| Platform reach | ~400 / 9 EU | ~850 users, EU & NA |
| Profitability | €0.36Bn/yr (kept) | €0.36Bn/yr |
| Adoption | ~3.6M actions / +120% YoY; ~5%→default | Near-zero → org-wide default |
| Reliability | +148 bps | +175 bps; >$1.05M/yr protected |
| Automation evidence | 82% of 40,937 | 41K requests → funded 2026 VP goal ($200MM) |

**Impact cards (3):** €0.36Bn/yr · Near-zero → default · +175 bps  
**Files:** `src/data/home-content.ts`, `src/design/creative.ts`, `src/components/pages/HomeContentLab.astro` (imports shared copy), `REVIEW.md`. `about.astro` had no outdated career claims.

**G3:** `npm run build` on this pass.

## UX designer P0/P1 pass (2026-09-03)

**Decisions:** Hide operating philosophy on Swiss production/playground default; Swiss red (`#ff0000` / `var(--accent)`) replaces orange sticky `|`.

**P0**
- Philosophy hidden via `hiddenSections: ["philosophy"]` in production-default + swiss-statement `applyAppearance`; visible bands **Impact → Projects**
- Fullscreen intro capped: `min-height: min(80svh, 36rem)` (production override)
- Tagline muted/smaller; dropped “Lifelong Learner”
- Metric hero uses real `<h1>`

**P1**
- Impact un-carded (hairline left rules, no fill/radius); `.metric-num` ~1.125rem
- Sticky `|` + bottom border use `var(--accent)`; site-name ~1.25rem; nav ~0.8125rem
- Appearance drawer: Preset + Theme removed (playground buttons + sticky toggle own those)

**G3:** re-run `npm run build` after this pass.

## Content audit — rest of site vs CV v8 (2026-09-03)

**Source:** `Chirag-Gandhi-Resume-v8.docx` (facts via resume-agent extract + REVIEW legacy→v8 table). Scope: all non-resume career copy. `resume.astro` owned by resume agent — not edited here.

### Outdated claims found (legacy → removed/replaced)

| Claim (legacy on site) | CV v8 truth |
| --- | --- |
| ~400 negotiators, 9 EU markets | ~850 negotiators, EU & NA |
| ~5% voluntary → org-wide default; ~3.6M actions/year (+120% YoY) | Near-zero → org-wide EU/NA default (no 3.6M / +120% YoY in v8) |
| +148 bps (94.87% → 96.35%) | +175 bps successful-schedule rate; protecting >$1.05M/yr |
| 82% of 40,937 audit entries | 41K requests → deterministic workflows; funded 2026 VP goal ($200MM) |
| 8h → 1h GenAI / vendor prep | Not in v8 — removed from lab/creative metrics |
| Role: “Internal Platform PM — Workflow Orchestration…” (lab) | Aligned to Enterprise Platforms & AI Automation (no Amazon on home) |

### Content audit table

| Page / string | Old | New / status |
| --- | --- | --- |
| `home-content.ts` HERO_COPY | statement / subhero / tagline | unchanged verified (no career numbers; tagline already without Lifelong Learner) |
| `home-content.ts` HERO_METRIC | €0.36Bn/yr · profitability label | unchanged verified (€0.36Bn/yr still in v8) |
| `home-content.ts` PILLARS 01 | ~400 negotiators | ~850 negotiators across EU and NA |
| `home-content.ts` PILLARS 02 | 40,937 / 82% / VP-level 2026 priority | My analysis of 41K requests → deterministic over AI chatbot; funded 2026 VP goal ($200MM) |
| `home-content.ts` PILLARS 03 | ~3.6M / +120% YoY / +148 bps | +175 bps · 7 fixes in 6 months · >$1.05M/yr |
| `home-content.ts` IMPACT_METRICS | €0.36Bn · ~5%→default · 82% | €0.36Bn/yr · Near-zero→default · +175 bps (CV highlights) |
| `HomeContent.astro` | imports shared copy | unchanged verified (inherits home-content) |
| `HomeContentLab.astro` pillars/metrics | hardcoded legacy 5-chip set | imports PILLARS + IMPACT_METRICS; plain line ~850 EU/NA; role title aligned |
| `creative.ts` HERO_STATEMENTS | ~400 / 82% / 3.6M | ~850 / 41K / +175 bps |
| `creative.ts` HERO_METRICS | 3.6M · ~400 · +148bps · 8h→1h | €0.36Bn · ~850 · +175bps · €87MM · Near-zero→default |
| `creative.ts` heroQuestion | ~400 people | ~850 people |
| `about.astro` | no career metrics | unchanged verified |
| `projects.ts` | personal project blurbs only | unchanged verified (no career claims) |
| `Layout.astro` title/meta | Senior Technical Product Manager | unchanged verified (matches CV PM-T register; no Amazon) |
| `HomeLayout.astro` meta | Platform Product Manager; enterprise/agent line | unchanged verified |
| `VOICE.md` example numbers | €0.9Bn / 5%→100% | updated examples to v8-shaped numbers |

### CV v8 on resume but not on home (intentional)

Kept on `/resume` only (VOICE rule 8 / home density): Amazon employer names; €87MM solo 5-week app (available in lab `HERO_METRICS`); 25 WAU/50; 1.49M EU opportunities → UCP; cross-border OCR 270K/144K/€300MM+; warehouse 1M units + defect 17.8%→~12%; earlier 7.8%→99% / 6.5%→25%; education/skills detail.

**Build:** `npm run build` exit 0 (11 pages).

## Swiss home polish — tomorrow backlog (2026-09-03)

**Branch:** `feat/design-lab`

### Changes
1. **Playground fixed** — preset clicks now apply that preset’s hero + density (Classic/Metric/Terminal no longer stuck under Swiss poster defaults). `PRESET_APPEARANCE` + `appearanceForPreset`.
2. **Projects + Resume** use `HomeLayout` Swiss shell (sticky ATF, tokens, dark mode). Appearance drawer hidden on those pages.
3. **Impact** rebuilt as one horizontal strip (compact mono nums + short labels from CV v8).
4. **Dark mode** — user `localStorage` theme choice wins over persona `forceDark`; warmPaper dark palette added; swiss dark hairline softened.
5. **Copy** — sub-hero: “experiments at home” (dropped agent-built).
6. **Hero CTAs removed** — Resume/Projects only in sticky nav.
7. **Resume** — “Copy résumé text” button with ARIA-live feedback.

**G3:** verify with `npm run build`. **G4:** awaiting Chirag.

## Swiss home ship — impact rewrite + projects cleanup (2026-09-05)

**Branch:** `feat/design-lab` → PR → `main`

### Changes since polish backlog
1. **Impact strip** — Build → Scale → Defend: `€87M surfaced` / `850 negotiators` / `$1.05M/yr protected` (product-leader "why does it matter" rewrite).
2. **Projects page** — removed duplicate "Projects" eyebrow + subtitle "A project counts when a stranger can open it."
3. **In-progress projects** — filtered off public `/projects` list and case-study paths until ready.
4. Prior Swiss home polish still on this branch (playground presets, HomeLayout on Projects/Resume, dark mode, copy, resume copy button, hero CTAs removed).

**G3:** `npm run build` exit 0.
**G4:** Chirag approved in chat 2026-09-05 — "let's push these change to git and deploy to prod."
**G5:** pending merge → GitHub Pages → verify https://asp-builder-git.github.io/chirag-portfolio/


