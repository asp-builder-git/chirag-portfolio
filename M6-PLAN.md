# M6 — Portfolio Redesign Plan (chirag-portfolio)

**Owner:** Space Lobster (PM) · **Reviewer:** Chirag · **Baseline spec:** the M6 design prompt (Stripe/Linear/Vercel-grade internal-platform PM portfolio)

## 1. Ground rules (non-negotiable)

1. **The spec is a UX/design-system blueprint, not a biography.** It was written for a fictional persona with invented metrics. We take its IA, page anatomy, design system, and rigor — and fill it with **Chirag's real facts** (VOICE.md rule 3: never invent). Every number on the site must trace back to the CV docx or Chirag's word.
2. **One milestone per review round.** Progressive, reviewable increments. No big-bang rewrites.
3. **Review gate (SKILL.md / gates.md):** sub-agent implements → PM verifies (build + dist + preview) → REVIEW.md summary → **Chirag approves (chat or GitHub PR Approve)** → PM merges → auto-deploy → PM verifies live URL 200.
4. **No direct pushes to main. Ever.** Branch protection stays on (1 approving review, enforce_admins). Each milestone = own branch + PR.
5. **WCAG AA everywhere.** New color pairs verified programmatically before shipping.
6. **VOICE.md applies to all copy:** first person, short plain sentences, numbers over adjectives, honest about difficulty, no "coming soon" theater, no invented titles on the home page (system roles, not job titles).
7. **Design tokens live in `Layout.astro`** (`--bg/--surface/--ink/--muted/--hairline/--accent/--accent-text`, `--font-mono`). Inner pages consume tokens; they do not hardcode colors.

## 2. Review model (how we work)

- **PM (me):** breaks the spec into milestones, writes self-contained sub-agent tasks, verifies every result (build, dist content, preview, token hygiene), writes REVIEW.md, merges after approval, deploys, verifies live.
- **Reviewer (Chirag):** reviews preview + REVIEW.md summary each round, approves/rejects on GitHub (PR Approve), steers scope.
- **Sub-agents:** one implementation sub-agent per milestone (visible session, isolated context — keeps the main session lean). They create branches, write code, and **stop at build-green**. They never merge or push to main.
- **Screenshots:** `~/.openclaw/workspace/tools/site-shots` (currently broken: Chromium missing `libnspr4.so`, needs sudo — retry before M6.2; fallback = Chirag reviews in browser).

## 3. Milestone roadmap

### ✅ M6.1 — Design system foundation (DONE, PR #2 awaiting approval)
Slate/indigo palette (AA-verified), JetBrains Mono self-hosted → `--font-mono` (status badges, metric chips, proof rows), CV number corrections (€0.36Bn/yr, 9 EU markets, ~5%→default, 82% of 40,937 audit entries, $3M). **State:** merged once Chirag approves PRs #1 (M5) + #2.

### 🔜 M6.2 — Home: hero + operating philosophy + impact strip
- **Hero:** system-role headline (e.g. "Internal Platform Product Manager — Workflow Orchestration & Enterprise Automation"), one plain-sentence sub-line, mono status chip, two CTAs (Case studies, Resume PDF).
- **Operating philosophy:** 3 pillars from his real approach — e.g. *internal employees as paying customers · data over opinions (40,937 audit entries) · automation that scales deterministically* (82% standardized → deterministic > conversational).
- **Impact strip:** mono metric chips — €0.36Bn/yr profitability · ~3.6M actions/yr (+120% YoY) · ~400 negotiators, 9 EU markets · +148 bps reliability (94.87%→96.35%) · 8h→1h vendor prep.
- **Acceptance:** hero + 3 pillars + chips; AA; build green; no invented facts; existing sections still work.

### 🔜 M6.3 — Case studies: 3 featured deep-dives (6-part anatomy)
- New routes `/case-studies` + `/case-studies/[slug]`; nav gains "Case Studies".
- **Template (per spec):** 1. Bottleneck (the problem, sized) → 2. Discovery & time-motion (how I found the truth) → 3. Architecture & integrations (system diagram, RBAC, data flow) → 4. Trade-offs & scoping (build-vs-buy, what I cut) → 5. Change management & rollout (5%→org-wide default) → 6. Business ROI & learnings (real numbers, honest failures).
- **Candidates (real work):** ① Negotiations platform (flagship — every part of the anatomy maps to real facts) ② Warehouse ops (from scratch in 2 months, 1M units/yr, $3M defect costs) ③ GenAI Accelerator (8h→1h) — **choice needs Chirag** (see §5).
- **Personal projects stay** on `/projects` (VOICE rule 9: don't bury personal work — portfolio site, crawler, truereview, market-eval-4-agents).
- **Acceptance:** 3 full case studies, consistent 6-part template, mono proof rows, no invented facts, build green.

### 🔜 M6.4 — Artifacts: `/artifacts`
- Sanitized real artifacts: RFC sample (redacted), RBAC schema (diagram), before/after swimlane (time-motion: 8h→1h), build-vs-buy matrix.
- Diagrams as inline SVG (diagram-maker skill); mono font for code/schema blocks.
- **Acceptance:** page + 4 artifacts, every one sanitized (no internal names/data beyond what's public), build green.

### 🔜 M6.5 — About rewrite
- Career journey: 11+ yrs Amazon, 5 teams, 2 regions; the "internal employees as paying customers" philosophy; builder stack (Claude, Cursor, OpenClaw, Python/SQL, automation); personal context (Luxembourg, EU-remote, learning Luxembourgish — real, from the vocab project).
- **Acceptance:** rewritten, first person, real facts, AA, build green.

### 🔜 M6.6 — Resume + 1-click PDF
- `/resume` restyled to the design system (it already inherits tokens; polish + metric chips consistent).
- **PDF:** build-time static PDF (puppeteer/playwright at build, or hand-made printable) vs print stylesheet — **choice needs Chirag** (§5).
- **Acceptance:** resume matches design system; PDF downloads and renders correctly.

### 🔜 M6.7 — Launch QA
- Lighthouse (aim ≥90, stretch 100), WCAG AA pass, keyboard nav + focus states, reduced motion, 404 page, meta/OG/social card, favicon, final deploy + live URL 200 + spot-check all routes.
- **Acceptance:** QA checklist all green; live site verified post-deploy.

## 4. Sub-agent execution contract (per milestone)

Each implementation sub-agent task prompt must contain:
1. Repo path + branch to create (`feat/m6-x-…`, off `main`).
2. Current state + exact files to touch.
3. Constraints: VOICE.md rules, no invented facts, tokens from `Layout.astro`, WCAG AA, keep build size sane.
4. **Completion criteria:** `npm run build` exits 0; required strings/classes verified in `dist/`; **do not push to main, do not merge, do not deploy** — PM owns merge/deploy.
5. Report back: what changed, files, verification output, any deviations.

PM then: verify build + dist + preview → REVIEW.md entry → Chirag review → merge → deploy → verify live (G5).

## 5. Open questions for Chirag

1. **Approve PRs #1 + #2** (GitHub) so M5 + M6.1 land and deploy.
2. **3rd case study:** Warehouse ops or GenAI Accelerator (or both, as 4th)?
3. **Resume PDF:** static generated PDF vs print stylesheet ("Save as PDF" from browser)?
4. **Nav:** keep "Projects" (personal) alongside "Case Studies"? (Recommended: yes — VOICE rule 9.)
5. **Home H1:** keep "Chirag R Gandhi" as the brand mark (recommended) with system-role subhead? Or system role first?
