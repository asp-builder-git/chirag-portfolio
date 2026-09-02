# Design Lab — Accessibility Audit Report

Generated: 2026-09-01 (regenerate with `npm run design:a11y`)

## Overview

- **Seeds audited:** 16
- **WCAG AA threshold (normal text):** 4.5:1
- **Audit script:** `scripts/audit-standalone.mjs` (mirrors `src/design/a11y.ts` + `resolve.ts`)

Contrast checks per seed (light + dark): ink on bg, ink on surface, accentText on surface.

## Methodology

1. Each curated seed is resolved via `resolveDesign(seed)`.
2. `ensureContrast()` nudges accent colors up to 12 lightness steps until 4.5:1 on surface.
3. `auditPalette()` flags ink/muted/accent failures in `a11yNotes`.
4. Seeds pass if all six ratio checks ≥ 4.5:1 and no `(fail)` or `below AA after nudge` notes.

## Summary

| Metric | Value |
|--------|-------|
| Seeds audited | 16 |
| Base palettes | 12 families (slate, warmCream, forest, ocean, ink, sand, rose, mint, lavender, charcoal, terracotta, steel) |
| Accent nudging | Applied when generated accent < 4.5:1 on surface |
| Production guard | `[seed]` routes excluded from PROD build via empty `getStaticPaths()` |

**Expected result:** All 16 seeds pass after `ensureContrast` nudging. Base ink/muted pairs are curated from M6.1-safe values; only dynamically derived accents may require nudging.

## ensureContrast Nudge Results

Some seeds may show notes like `Accent nudged for WCAG AA (4.52:1 on surface)` — this is expected and logged in `spec.a11yNotes`.

Run `npm run design:a11y` locally to regenerate this report with exact per-seed ratios and the full summary table.

## Recommendations

- No action required if all seeds pass after regeneration.
- If any seed fails after nudging: increase `maxAttempts` in `src/design/a11y.ts` or clamp accent saturation in `deriveAccent()`.
- Before merging a winning seed to production: re-run audit and verify dark-mode contrast manually in the gallery.

## Per-Seed Regeneration

```bash
npm run design:a11y   # writes this file + audit-results.json
npm run design:seeds  # terminal catalog of all 16 variants
```
