# SKILL.md — chirag-portfolio

## ⚠️ Hard Rules (Chirag, 2026-08-27)

1. **NO direct pushes to `main`. Ever.** All changes land via a branch + pull request.
2. **Every change is pre-reviewed before merge.** The review gate is: build passes → review summary written for Chirag → Chirag approves (chat or GitHub) → merge → deploy.
3. **No working behind the scenes.** Drafts, branches, and review summaries are visible; merges wait for the human.
4. **The site is built by sub-agents following this SKILL.md + VOICE.md.** Read VOICE.md before writing any copy.

## Pipeline (5 gates)

1. **DESIGN** — what changes, why, which pages. For copy: draft in Chirag's voice (VOICE.md). Output: short design note in REVIEW.md.
2. **PLAN** — files touched, spec sources (analyses/08, 09 etc.), verification steps.
3. **IMPLEMENT** — on a branch (`chore/…`, `feat/…`, `fix/…`). `npm run build` must pass.
4. **REVIEW (mandatory, never skipped)** — write a review summary for Chirag: what changed, how it looks, what he should decide. He approves → merge. He rejects → fix on the branch.
5. **SHIP** — merge to main → GitHub Actions deploys → **G5 verify** (see below). Use `.cursor/skills/ship-verify/SKILL.md`.

## Gates

- G1 Design: clear scope + voice-checked copy.
- G2 Plan: files + spec identified.
- G3 Build: `npm run build` exit 0.
- G4 Review: **Chirag's explicit approval recorded in REVIEW.md** (chat OK). Without it: no merge, no push.
- G5 Live: HTTP 200 on touched routes **and** bug-class checks (theme toggle, Appearance only on `/playground`, LinkedIn `chiraggandhi09`, Live-only projects). Content-ship ≠ chrome-ship. Diagnose live HTML before panic-shipping. Terminal flaky → `scripts/` + ask Chirag; never claim shipped until G5 done.

## Recovery

- Pushed to main by mistake → create branch from main, revert main via PR, log it in REVIEW.md.
- Chirag rejects review → fix on branch, re-run G3 + G4.
- Deploy fails → fix, re-verify, don't bypass.

## Exit Criteria

- Change is on `main` ONLY via merged PR.
- REVIEW.md shows the approval.
- Live URL verified for the bug class (not build-only).
