# Archive — ORG-0–6 checklist (historical)

Shipped in PR [#11](https://github.com/asp-builder-git/chirag-portfolio/pull/11) (`chore/org-scale-roadmap`, 2026-09-07). Structure truth now lives in [`../ORG-BLUEPRINT.md`](../ORG-BLUEPRINT.md). Active work: [`../../ORG-BACKLOG.md`](../../ORG-BACKLOG.md).

Do not re-open these IDs; cite them in REVIEW only as history.

---

## ORG-0 — Backlog + identity

- [x] ORG-0.1 Add this backlog file
- [x] ORG-0.2 Rename `package.json` name → `chirag-portfolio`
- [x] ORG-0.3 Sync README Status + link this backlog
- [x] ORG-0.4 Fix M6-PLAN §1.7 token location (production styles + `design/css.ts` + SiteLayout)

## ORG-0b — Agent guardrails

- [x] ORG-0.5 Org structure section in `AGENTS.md` / `CLAUDE.md`
- [x] ORG-0.6 `.cursor/rules/org-structure.mdc`
- [x] ORG-0.7 Restore `model-routing.mdc` if missing

## ORG-1 — Unify document shell + nav + base assets

- [x] ORG-1.1 `BaseDocument.astro`
- [x] ORG-1.2 `SiteLayout.astro` + `LabLayout.astro`
- [x] ORG-1.3 `src/lib/nav.ts`
- [x] ORG-1.4 Migrate pages onto SiteLayout; delete legacy `Layout.astro`
- [x] ORG-1.5 Favicons via `withBase`; verify-live root-absolute `/favicon`
- [x] ORG-1.6 Writing / About+Writing nav — already shipped separately

## ORG-2 — Split production vs lab CSS

- [x] ORG-2.1 `src/styles/production/` and `src/styles/lab/`
- [x] ORG-2.2 SiteLayout production only; LabLayout production + lab
- [x] ORG-2.3 Curated production subset for playground personas

## ORG-3 — Shared client scripts + CI beyond build

- [x] ORG-3.1 `src/scripts/theme.ts` + appearance module
- [x] ORG-3.2 Appearance remains playground-only
- [x] ORG-3.3 CI: astro check / tsc → build → dist smoke → design:a11y

## ORG-4 — Content collections

- [x] ORG-4.1 `projects` collection
- [x] ORG-4.2 `writing` collection schema (empty OK)
- [x] ORG-4.3 Keep `home-content` as typed module
- [x] ORG-4.4 `projects/[slug]` via collections

## ORG-5 — Component taxonomy + HomeContent dedupe

- [x] ORG-5.1 Folders: `chrome/`, `ui/`, `features/`, `home/`
- [x] ORG-5.2 Merge HomeContent behind props/flags
- [x] ORG-5.3 Shared token-driven patterns where cheap

## ORG-6 — Docs archive + P2 hygiene

- [x] ORG-6.1 `docs/process/` + `docs/archive/`
- [x] ORG-6.2 Collapse duplicate a11y scripts
- [x] ORG-6.3 tsconfig path aliases
- [x] ORG-6.4 Retire `--body` → `--ink`
- [x] ORG-6.5 Shared `DocumentMeta`; 404 wiring (page content shipped separately)
- [x] ORG-6.6 Optional `LabCreativeProfile` split if lab knobs still leak
