---
name: ship-verify
description: >-
  Verify portfolio G5 after merge/deploy: curl live routes, LinkedIn href,
  Appearance absent on home/projects/resume, present on playground, theme not
  claimed done on build alone. Use when shipping, merging to main, or claiming
  live verification. If shell fails, write scripts/ and ask Chirag to run.
---

# Ship verify (G5)

Live base: `https://asp-builder-git.github.io/chirag-portfolio`

## When

After Chirag approves merge, after Actions "Deploy to GitHub Pages" succeeds, or before saying "shipped."

## Steps

1. Confirm Actions conclusion `success` for Deploy to GitHub Pages on `main`.
2. HTTP headers — expect 200:
   - `/`
   - `/projects/`
   - `/resume/`
   - `/playground/` (if playground changed)
3. Body checks (curl HTML or fetch):
   - Resume/footer LinkedIn contains `linkedin.com/in/chiraggandhi09`
   - Home + projects + resume: **no** Appearance drawer trigger (no "Appearance" control in sticky chrome)
   - Playground: Appearance control **present** if that page is in scope
   - If theme was in the PR: state that interactive toggle must be manually confirmed (localStorage light↔dark); do not equate build green with theme OK
4. If agent terminal/WSL fails: write `scripts/verify-live.sh` with the curls above; ask Chirag to run; do **not** claim G5 until results return.

## Report format

| Check | Result |
|-------|--------|
| Actions | URL + success/fail |
| Routes 200 | list |
| LinkedIn | pass/fail |
| Appearance home | absent / FAIL present |
| Appearance playground | present / n/a |
| Theme | verified / needs Chirag click |

Never mark shipped on `npm run build` alone.
