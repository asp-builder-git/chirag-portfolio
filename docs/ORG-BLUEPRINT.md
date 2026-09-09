# Org blueprint — desired-state architecture

**Source of truth for repo structure.** Agents: read this before adding chrome, theme, nav, layout, or CSS. Update only when architecture changes — not for feature checklists.

Work queue lives in [`ORG-BACKLOG.md`](../ORG-BACKLOG.md). Product IA/content: [`M6-PLAN.md`](../M6-PLAN.md).

---

## Target folder map (shipped after ORG-0–6)

```
src/
  layouts/
    BaseDocument.astro     # html / head / fonts / theme bootstrap / footer chrome
    SiteLayout.astro       # production pages — production CSS only
    LabLayout.astro        # design-lab — production + lab CSS
  components/
    chrome/                # DocumentMeta, ThemeToggle, shared shell chrome
    features/              # AppearanceDrawer (playground-only product surface)
    home/                  # HomeContent, ProjectsContent, PlaygroundView
    ui/                    # shared primitives (extend here; no second taxonomy)
  styles/
    production/            # SiteLayout + curated playground-presets.css
    lab/                   # LabLayout only (personas / variants / fx)
  scripts/
    theme.ts               # light/dark — shared, not triplicated is:inline
    appearance.ts          # playground Appearance controls
  lib/
    nav.ts                 # single primary-nav source
    base.ts                # withBase / base-path helpers
  content/
    projects/              # Astro content collection (JSON)
    writing/               # schema stub until real posts
  content.config.ts
  data/                    # typed modules (e.g. home-content); thin re-exports OK
  design/                  # tokens, presets, resolve, a11y — not page CSS
  pages/                   # routes only; no second layout shell
docs/
  ORG-BLUEPRINT.md         # this file
  process/                 # pointers to root process docs
  archive/                 # historical notes (not live architecture)
```

---

## Invariants

1. **One document shell** — `BaseDocument` → `SiteLayout` / `LabLayout`. Do not revive a second full `Layout.astro` or duplicate html/head/theme bootstrap.
2. **Production CSS only on SiteLayout** — import `src/styles/production/`. Never ship lab persona/chaos matrix CSS on production routes. Playground may use curated `playground-presets.css` only.
3. **Lab CSS only on LabLayout** — `src/styles/lab/` imported only there (DEV design-lab).
4. **Single nav** — `src/lib/nav.ts` only; no second primary-nav list. About/Writing stay off primary nav unless product deliberately changes that in M6.
5. **Home by props/flags** — lab vs production diverge via `HomeContent` variant (or equivalent flags), not forked `HomeContent`/layout shells.
6. **Appearance** — playground only (see product-invariants).
7. **Extend existing paths** — before adding chrome/theme/nav/layout files, read this blueprint and extend what is here; do not re-split the repo.

---

## Agent pointers

| Need | Read |
|------|------|
| Structure truth | **This file** |
| Work queue | [`ORG-BACKLOG.md`](../ORG-BACKLOG.md) |
| Always-on mirror | [`.cursor/rules/org-structure.mdc`](../.cursor/rules/org-structure.mdc) |
| Ship / G5 | [`SKILL.md`](../SKILL.md), [`gates.md`](../gates.md), ship-verify skill |
