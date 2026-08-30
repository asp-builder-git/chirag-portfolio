# BENCHMARK EXERCISE — chirag-portfolio (reference study for a clean, minimal, honest site)

## 0. CONTEXT — READ FIRST

You are benchmarking a personal website for **Chirag Gandhi — Product Manager & Builder**.
Tech: **Astro** (static, already deployed to GitHub Pages). Live repo: `~/cg-projects/chirag-portfolio`.

Before any work, read these files in the repo:
- `VOICE.md` — the voice contract. This is law for all language/copy findings.
- `SKILL.md` + `gates.md` — the 5-gate pipeline (design → plan → implement → review → ship). No direct pushes to main.
- `src/layouts/Layout.astro`, `src/pages/*.astro` — current information architecture and structure.
- `README.md` — the stated ethos ("a project counts when a stranger can open it").

Current state to critique (do NOT treat as finished):
- 5 pages: Home, About, Projects, Resume, Writing.
- Current typography: Instrument Serif (display) + Inter (body). Dark mode toggle exists.
- Current structure per page is skeletal; several sections are still placeholders.

Goal of THIS exercise: produce an evidence-backed reference report on UX, typography, language, and structure that Chirag can use to make concrete build decisions. This is a *study*, not a redesign. Do not write site code.

## 1. OBJECTIVE

Benchmark 10–14 reference sites across 6 dimensions, score Chirag's current site against them, and output a prioritized list of actionable, opinionated recommendations. Every recommendation must cite a specific observed pattern (which site, what it did, why it works) and map to a concrete change.

The site must stay: **clean, minimal, honest, first-person, no buzzwords.** (See VOICE.md — those rules override any "best practice" that pushes toward corporate marketing.)

## 2. GUARDRAILS (non-negotiable, inherited from VOICE.md)

- First person ("I build…"), never third-person marketing.
- Zero buzzwords (synergy, leverage, results-driven, passionate, innovative, "thought leader", "end-to-end").
- Numbers over adjectives; every claim traces to something real.
- Honest about difficulty — real work is hard, say so.
- Strict separation of **professional** (resume/enterprise) vs **personal** (projects/build-in-public). Never blend them into one mush.
- No "coming soon" theater. A section ships only when its underlying project is public.
- Minimal ≠ empty. Restraint is a design choice, not an excuse to ship nothing.

## 3. BENCHMARK TARGETS

Study these, in three tiers. If a site is inaccessible, note that and move on; do not substitute a corporate marketing site for a personal builder site.

### Tier A — Direct peers (personal builder/engineer sites, primary study: 6–8)
- leerob.io (Lee Robinson) — clean minimal personal + product leader
- antfu.me (Anthony Fu) — monospace restraint, dense utility
- mxb.dev (Max Böck) — minimal, honest indie dev
- paco.me (Paco Coursey) — craft, typography
- rauno.me (Rauno Freiberg) — design craft, minimal
- brianlovin.com (Brian Lovin) — builder/project showcase
- joshwcomeau.com (Josh Comeau) — what "maximal craft" looks like (upper bound)
- overreacted.io (Dan Abramov) — extreme minimalism, plain language
- levels.io (Pieter Levels) — brutally honest, no fluff (lower bound of "polish", upper bound of "honesty")

### Tier B — Voice/language references (how honest professional writing reads: 2–3)
- pragmaticengineer.com (Gergely Orosz)
- lennysnewsletter.com (Lenny Rachitsky)
- Any Substack you consider "honest voice" — pick one and justify it.

### Tier C — Anti-references (what NOT to do: 2–3)
- Pick 2–3 typical "portfolio template" sites that are generic/corporate. Catalog their exact failure patterns (hero with stock-ish tagline, third-person bio, "passionate about", skill progress bars, generic grid).

## 4. BENCHMARK DIMENSIONS

For EACH target site, answer the questions under every dimension. Use a consistent template (Section 6).

### D1 — UX & Interaction
- What is the first action a visitor can take within 3 seconds? Is the value proposition clear without scrolling?
- What's the primary CTA, and how restrained is it?
- How does it handle project/resume content — is anything hidden behind "click to reveal", tabs, or is it all flat?
- Dark mode: present? default? how is it implemented?
- What feels *unnecessary* (things you'd strip for "minimal")?

### D2 — Typography & Fonts
- Font pairing(s): display vs body, and *why* it works (or doesn't).
- Scale: base size, line-height, type scale, spacing rhythm (8pt? 4pt? fluid clamp?).
- Does it use one family, two, or a system stack? Is the pairing calm or attention-seeking?
- Weight usage — how restrained? (e.g., one weight + one size contrast vs. many)
- Critically: does Chirag's current **Instrument Serif + Inter** pairing hold up against what you see? Recommend keep / change / tune, with reasons.

### D3 — Language & Voice (HIGHEST WEIGHT — this is the point of the site)
- First sentence on the homepage: quote it, rate its honesty on a 1–5 scale, explain why.
- Count buzzwords/adjectives vs concrete nouns/numbers. Which sites read "human" and which read "LinkedIn"?
- How does it say what it *does* in one line? (e.g., "I build products" vs "results-driven leader delivering…")
- Where does it admit difficulty, limitations, or process? Quote the honest bits.
- Bio length and tone: professional-only, personal-only, or blended — and does the blend work?

### D4 — Structure / Information Architecture
- Top-level nav: what pages/sections, and in what order? How many items max?
- How is **resume/work** separated from **projects**? Is the separation explicit or implied?
- Home page: what's above the fold vs below? Is the home a "hub" or a "pitch"?
- How are individual projects/case-studies structured (title → problem → what I built → outcome)?
- Is there a writing/blog section? How is it treated relative to work?

### D5 — Visual Design (restraint)
- Color: how many colors? Accent usage? Is it mostly monochrome?
- Spacing/whitespace: generous or dense? What's the whitespace-to-content ratio?
- Any decorative elements (gradients, illustrations, animations)? Are they earned or noise?
- Layout system: single column, grid, cards? What fits "minimal but not empty"?

### D6 — Performance & Accessibility
- Static vs JS-heavy. Load time feel, Core Web Vitals proxies (LCP, CLS, font loading).
- Font loading strategy (system fonts? self-hosted? FOIT/FOUT?).
- Accessibility: semantic headings, contrast, keyboard nav, alt text, reduced-motion support.
- Anything in Astro's favor (static-first) that these sites get right/wrong.

## 5. SUB-AGENT ORCHESTRATION

Spawn these as **isolated sub-agents**, run in parallel where possible, then synthesize. Model guidance: heavy analysis → `deepseek/deepseek-v4-pro`; synthesis and the voice audit → `deepseek/deepseek-reasoner`; performance/a11y collection → `deepseek/deepseek-v4-flash` is fine.

### SA-1 — Competitive Teardown (model: pro)
Input: Tier A list (Section 3). Read nothing else.
Task: For each Tier A site, produce a full structured teardown using the Section 6 template. Capture exact quotes for D3, exact font names for D2 (via CSS inspection where possible), and screenshots-as-notes (describe, don't embed). Also do Tier C — catalog failure patterns.
Output: `benchmark/01-teardowns.md`

### SA-2 — Typography & Visual System (model: pro)
Input: D2 + D5 questions, plus SA-1's font findings as they land.
Task: Extract the dominant font pairings and spacing systems across all targets. Rank them for "calm + minimal + credible for a builder". Produce a direct verdict on Instrument Serif + Inter, and 2–3 concrete alternative pairings (with Google Fonts names + loading strategy). Include a minimal color-palette recommendation (max 3 colors + neutrals).
Output: `benchmark/02-typography-visual.md`

### SA-3 — Voice & Copy Audit (model: reasoner)
Input: D3 questions + `VOICE.md` (must read it). The highest-signal agent.
Task: Pull exact homepage first-lines, bios, and "honest" passages from all Tier A + B targets. Build a scale of honesty (1–5) and score Chirag's current VOICE.md copy against it. Produce: (a) 5–10 rewritten headline options for Chirag in his voice, (b) a do/don't microcopy list, (c) a revised bio structure that keeps professional and personal separate. No buzzwords anywhere in your output.
Output: `benchmark/03-voice-copy.md`

### SA-4 — Information Architecture & UX (model: pro)
Input: D1 + D4 questions, current `src/pages/*` structure.
Task: Map the sitemap + nav + home-page layout of each target. Identify the 2–3 IA patterns that best fit "resume + projects + build-in-public". Propose a concrete sitemap for Chirag (with rationale), explicitly solving the professional-vs-personal demarcation. Include: what goes above the fold on Home, and how a project case-study page should be structured.
Output: `benchmark/04-ia-ux.md`

### SA-5 — Performance & Accessibility (model: flash)
Input: D6 questions.
Task: Audit load strategy (fonts, JS, images) and a11y practices across targets. Produce a short checklist of the top patterns Astro's static output should adopt, plus a "must-have vs nice-to-have" a11y list.
Output: `benchmark/05-perf-a11y.md`

### SA-6 — Synthesis & Recommendations (model: reasoner) — runs LAST
Input: all five `benchmark/0*.md` files.
Task: Merge into one report. Produce: (a) a scorecard of Chirag's current site vs the best-of-peer across all 6 dimensions, (b) a **Steal / Reject / Do-Differently** table, (c) a prioritized, ordered build backlog (P0 must-do now → P2 later) where every item cites source evidence and maps to a repo change, (d) a one-paragraph "north-star" summary of what the redesigned site should feel like in 30 words.
Output: `benchmark/README.md` (the master report) + `benchmark/00-recommendations.md`

## 6. OUTPUT TEMPLATE (per target site, used by SA-1)

For each site, fill this block:

```
### {Site} — {one-line verdict}
- URL: ...
- First line above fold (quote): "..."   | Honesty 1–5: X/5
- Fonts: display {name} / body {name} / {system|webfont|self-hosted}
- Type scale: base {px}, line-height {n}, scale {ratio}
- Nav: {items, in order}
- Work vs projects separation: {how}
- Colors: {count + accent}
- Whitespace feel: {dense|balanced|airy}
- Honest/process quote: "..."
- Buzzword count (first 300 words): {n}
- What to STEAL: {specific, 1 line}
- What to REJECT: {specific, 1 line}
```

## 7. HANDOFF TO BUILD PIPELINE

The output of this exercise feeds gate G1 (DESIGN) of `SKILL.md`. The final `benchmark/README.md` is the design reference. No site code changes happen during benchmarking. After Chirag reviews the report, the recommendations become discrete P0/P1/P2 work items — each one goes through the normal branch → build → review → approve → merge flow. Nothing touches `main` directly.

## 8. DEFINITION OF DONE

- [ ] `benchmark/01..05` written; `benchmark/README.md` is the synthesized master report.
- [ ] Every recommendation cites a source (site + observed pattern).
- [ ] A clear verdict on Instrument Serif + Inter (keep/tune/replace) with alternatives.
- [ ] 5–10 rewritten headlines in Chirag's honest voice.
- [ ] Scorecard across all 6 dimensions for the current site.
- [ ] Steal/Reject/Do-Differently table.
- [ ] Prioritized P0→P2 backlog mapped to repo changes.
- [ ] Zero buzzwords in the report itself (the report must *demonstrate* the voice).
