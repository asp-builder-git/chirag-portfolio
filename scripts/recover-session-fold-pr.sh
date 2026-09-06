#!/usr/bin/env bash
# Recover session-fold docs that never left the local machine after PR #5.
# Safe actions only: branch → commit → push → open PR. Does NOT merge to main.
#
# Run in WSL:
#   cd /home/cgexp/cg-projects/chirag-portfolio
#   bash scripts/recover-session-fold-pr.sh
set -euo pipefail
cd "$(dirname "$0")/.."
REPO_ROOT=$(pwd)

echo "=== cwd: $REPO_ROOT ==="
git fetch origin
git status -sb
echo "--- branches ---"
git branch -vv
echo "--- stash ---"
git stash list
echo "--- PRs ---"
gh pr list --state all --limit 20 || true

# Ensure we start from latest main
git checkout -B docs/session-fold-persistence origin/main

# Stage session-fold artifacts (rules, skills, pipeline docs, verify script)
FILES=(
  .cursor/rules/product-invariants.mdc
  .cursor/rules/pipeline.mdc
  .cursor/rules/model-routing.mdc
  .cursor/rules/design-system.mdc
  .cursor/rules/voice.mdc
  .cursor/rules/astro-conventions.mdc
  .cursor/skills/ship-verify/SKILL.md
  SKILL.md
  gates.md
  REVIEW.md
  AGENTS.md
  scripts/verify-live.sh
  scripts/recover-session-fold-pr.sh
)

missing=0
for f in "${FILES[@]}"; do
  if [[ -e "$f" ]]; then
    git add -- "$f"
  else
    echo "WARN missing: $f"
    missing=$((missing + 1))
  fi
done

if git diff --cached --quiet; then
  echo "Nothing new to commit vs origin/main (already synced or nothing staged)."
  # Still try to open PR if branch has commits ahead
else
  git commit -m "$(cat <<'EOF'
docs: persist session-fold rules, ship-verify skill, G5 scripts

Fold product invariants / pipeline / model-routing into the repo so agents
do not lose Swiss-home G5 lessons after PR #4/#5. No site code changes.
EOF
)"
fi

echo "--- ahead of origin/main ---"
git log --oneline origin/main..HEAD

git push -u origin HEAD

# Open PR if none exists for this branch
EXISTING=$(gh pr list --head docs/session-fold-persistence --state open --json number --jq '.[0].number // empty')
if [[ -n "$EXISTING" ]]; then
  echo "PR already open: #$EXISTING"
  gh pr view "$EXISTING" --web 2>/dev/null || gh pr view "$EXISTING"
else
  gh pr create --title "docs: session-fold persistence (rules + ship-verify)" --body "$(cat <<'EOF'
## Summary
- Persist `.cursor/rules` (product invariants, pipeline, model-routing, design-system) and `.cursor/skills/ship-verify` that were folded locally after PR #5 but never pushed
- Harden `SKILL.md` / `gates.md` / `REVIEW.md` G5 notes
- Add `scripts/verify-live.sh` for chrome-class G5 checks when agent shells flake

## Test plan
- [ ] Docs-only review — no production UI change expected
- [ ] Confirm `.cursor/` appears on the PR branch
- [ ] Optional: `bash scripts/verify-live.sh` against live site (already shipped via PR #4/#5)

**G4:** awaiting Chirag approval before merge. Do not merge without recorded OK.
EOF
)"
fi

echo "=== DONE — do not merge without Chirag approval ==="
gh pr list --head docs/session-fold-persistence
