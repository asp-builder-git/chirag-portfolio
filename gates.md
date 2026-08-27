# gates.md — chirag-portfolio

**Policy (2026-08-27):** No direct pushes to main. Every change = branch → build → review summary → **Chirag approval** → merge → deploy.

| Gate | Criteria | Status |
|------|----------|--------|
| G1 Design | Scope + voice-checked copy (VOICE.md) | ✅ standing |
| G2 Plan | Files + spec sources identified | ✅ standing |
| G3 Build | `npm run build` exit 0 | ✅ standing |
| G4 Review | Chirag's explicit approval (chat or GitHub PR review) | ⛔ REQUIRED — nothing merges without it |
| G5 Live | Deployed URL returns HTTP 200 | ✅ standing |

## Change log

- 2026-08-27 M4 (bc4cd38): homepage v4 taste pass — **landed via direct push before the review-gate policy existed**. Logged as the incident that created this policy. Reviewed live by Chirag afterward (accepted).
- 2026-08-27: Review-gate policy + branch protection enacted.
