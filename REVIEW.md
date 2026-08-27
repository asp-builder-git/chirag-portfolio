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

## Known decisions

- Repo name: `chirag-portfolio` (project site under GitHub Pages with `base` path) — final name TBD if custom domain added later.
- Content strategy: OpenClaw writes case-study markdown into `src/content/`; site sections ship only when project reaches MLP.
- Tracking: Obsidian (AI inbox), per decision 2026-08-27.
