#!/usr/bin/env bash
# G5 live verify — run from repo root or anywhere:
#   bash scripts/verify-live.sh
set -euo pipefail
BASE="https://asp-builder-git.github.io/chirag-portfolio"

pass=0
fail=0
check() {
  local name="$1" ok="$2" detail="${3:-}"
  if [[ "$ok" == "1" ]]; then
    echo "PASS  $name${detail:+ — $detail}"
    pass=$((pass + 1))
  else
    echo "FAIL  $name${detail:+ — $detail}"
    fail=$((fail + 1))
  fi
}

echo "=== G5 verify: $BASE ==="

for path in "/" "/projects/" "/resume/" "/playground/"; do
  code=$(curl -sS -o /tmp/g5-body.html -w "%{http_code}" "${BASE}${path}" || echo "000")
  check "HTTP ${path}" "$([[ "$code" == "200" ]] && echo 1 || echo 0)" "status=$code"
done

home=$(curl -sS "${BASE}/")
projects=$(curl -sS "${BASE}/projects/")
resume=$(curl -sS "${BASE}/resume/")
playground=$(curl -sS "${BASE}/playground/")

echo "$resume" | grep -q 'linkedin.com/in/chiraggandhi09' \
  && check "LinkedIn chiraggandhi09" 1 \
  || check "LinkedIn chiraggandhi09" 0 "missing on /resume"

# Appearance control should be absent on home/projects/resume, present on playground
for label in home projects resume; do
  body="${!label}"
  if echo "$body" | grep -qi 'Appearance'; then
    check "Appearance absent on /$label" 0 "Appearance string found"
  else
    check "Appearance absent on /$label" 1
  fi
done

if echo "$playground" | grep -qi 'Appearance'; then
  check "Appearance present on /playground" 1
else
  check "Appearance present on /playground" 0 "no Appearance string"
fi

echo "$home" | grep -q '€87M surfaced' \
  && check "Impact Build chip" 1 \
  || check "Impact Build chip" 0

echo "$home" | grep -q '850 negotiators' \
  && check "Impact Scale chip" 1 \
  || check "Impact Scale chip" 0

echo "$home" | grep -q '\$1.05M/yr protected' \
  && check "Impact Defend chip" 1 \
  || check "Impact Defend chip" 0

echo
echo "Theme toggle: needs manual click (localStorage light↔dark) — not claimed by this script."
echo "=== Result: $pass passed, $fail failed ==="
[[ "$fail" -eq 0 ]]
