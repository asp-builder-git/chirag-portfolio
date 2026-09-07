# ORG backlog — structure & scale

Orthogonal to [M6-PLAN.md](M6-PLAN.md) (product IA/content). Each ORG PR checks off its items in the same PR. Cite IDs in REVIEW.md (e.g. `ORG-1.2`).

**Pipeline:** branch → build → REVIEW → Chirag approval → merge → G5. No direct pushes to main.

---

## ORG-0 — Backlog + identity

- [x] ORG-0.1 Add this backlog file
- [x] ORG-0.2 Rename `package.json` name → `chirag-portfolio`
- [x] ORG-0.3 Sync README Status + link this backlog
- [x] ORG-0.4 Fix M6-PLAN §1.7 token location (production styles + `design/css.ts` + SiteLayout)

**Accept:** Agents find the backlog; package/README match the product; token docs point at real files.

---

## ORG-0b — Agent guardrails (durable)

Keep org-scale decisions in agent-facing config so future work extends existing paths instead of re-splitting the repo. Checklist only — implement in a follow-up PR unless already trivial.

- [x] ORG-0.5 Add **Org structure (mandatory)** section to `AGENTS.md` / `CLAUDE.md` with:
  - One document shell: `BaseDocument` → `SiteLayout` / `LabLayout` — do not revive a second full `Layout.astro` or duplicate html/head/theme bootstrap
  - CSS: production pages import only `src/styles/production/`; lab CSS under `src/styles/lab/` imported only by `LabLayout` — never ship lab persona/chaos CSS on production routes
  - Nav: single source `src/lib/nav.ts` — no second primary-nav list
  - Home: diverge lab vs production by props/flags, not forked `HomeContent`/layout shells
  - Before adding chrome/theme/nav/layout files, read `ORG-BACKLOG.md` and extend existing paths — do not re-split the repo
- [x] ORG-0.6 Optional always-on mirror: `.cursor/rules/org-structure.mdc` with the same Org structure content
- [x] ORG-0.7 Fix/restore `.cursor/rules/model-routing.mdc` if `AGENTS.md` still points at it and the file is missing

**Accept:** Agents see Org structure rules before layout/CSS/nav work; model-routing link resolves or is removed; optional `.mdc` mirror matches AGENTS/CLAUDE.

---

## ORG-1 — Unify document shell + nav + base assets

- [x] ORG-1.1 `BaseDocument.astro` (html/head/fonts/theme bootstrap/footer chrome)
- [x] ORG-1.2 `SiteLayout.astro` + `LabLayout.astro` (thin wrappers)
- [x] ORG-1.3 `src/lib/nav.ts` single primary-nav source
- [x] ORG-1.4 Migrate about/writing/resume/home/projects/playground onto SiteLayout; delete legacy `Layout.astro`
- [x] ORG-1.5 Favicons via `withBase`; verify-live catches root-absolute `/favicon`
- [x] ORG-1.6 Writing: remove “coming soon” theater; About/Writing omit from primary nav

**Accept:** One theme bootstrap path; About/Writing not in primary nav; build green; Appearance FOUC OK on playground.

---

## ORG-2 — Split production vs lab CSS

- [x] ORG-2.1 `src/styles/production/` and `src/styles/lab/`
- [x] ORG-2.2 SiteLayout imports production only; LabLayout imports production + lab
- [x] ORG-2.3 Curated production subset if playground needs a persona (not full lab matrix)

**Accept:** Production `dist` pages lack lab persona/chaos CSS; lab still works in DEV.

---

## ORG-3 — Shared client scripts + CI beyond build

- [x] ORG-3.1 `src/scripts/theme.ts` + appearance module (bundled, not triplicated `is:inline`)
- [x] ORG-3.2 Appearance remains playground-only
- [x] ORG-3.3 CI: `astro check` / tsc → build → dist smoke → design:a11y when stable

**Accept:** Theme/Appearance work interactively; CI fails on known base-path footguns.

---

## ORG-4 — Content collections (before M6.3 / M6.4)

- [x] ORG-4.1 Astro content config + `projects` collection (migrate from `src/data/projects.ts`)
- [x] ORG-4.2 `writing` collection schema (empty OK)
- [x] ORG-4.3 Keep `home-content` as typed module
- [x] ORG-4.4 `projects/[slug]` reads collections; preserve VOICE schema fields

**Accept:** Build green; project pages unchanged in substance.

---

## ORG-5 — Component taxonomy + HomeContent dedupe

- [x] ORG-5.1 Folders: `chrome/`, `ui/`, `features/`, `home/`
- [x] ORG-5.2 Merge HomeContent / HomeContentLab behind props/flags
- [x] ORG-5.3 Shared token-driven patterns where cheap (no visual redesign)

**Accept:** Lab vs production home diverge by flag, not file fork.

---

## ORG-6 — Docs archive + P2 hygiene

- [x] ORG-6.1 `docs/process/` pointers; `docs/archive/` note for benchmark / old REVIEW slices
- [x] ORG-6.2 Collapse duplicate a11y scripts to one Node entry
- [x] ORG-6.3 `tsconfig` path aliases (`@design/*`, `@lib/*`, …)
- [x] ORG-6.4 Retire `--body` → `--ink` (and related legacy aliases) on pages
- [x] ORG-6.5 `404.astro` + shared meta/OG component
- [x] ORG-6.6 Optional `LabCreativeProfile` split if lab knobs still leak

**Accept:** One process path for agents; aliases work in build; fewer dead scripts.
