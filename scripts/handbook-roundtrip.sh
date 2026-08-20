#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# handbook-roundtrip.sh — proves the .md ⇄ .docx pipeline loses nothing.
#
# Markdown is the source of the Handbook; .docx is generated from it. That
# is only safe if the generation is faithful, so this renders every .docx
# back to markdown with docx2md.py and compares it to the .md it came from.
#
# Content must match exactly. Blank-line placement may differ: the two
# scripts normalise spacing slightly differently, and no governance meaning
# rides on a blank line.
#
# Run after changing either converter, and before trusting a .docx that is
# going to a person.
# ═══════════════════════════════════════════════════════════════
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$HERE"

tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT

content=0
spacing=0
checked=0

for docx in handbook/pt/*.docx handbook/en/*.docx; do
  [ -e "$docx" ] || continue
  case "$(basename "$docx")" in 00_*) continue ;; esac
  md="${docx%.docx}.md"
  [ -e "$md" ] || { echo "  no .md beside $docx"; content=$((content + 1)); continue; }

  checked=$((checked + 1))
  python3 scripts/docx2md.py "$docx" > "$tmp" 2>/dev/null

  if ! diff -q <(grep -v '^[[:space:]]*$' "$md") <(grep -v '^[[:space:]]*$' "$tmp") >/dev/null; then
    echo "  ✗ CONTENT LOST — $md"
    diff <(grep -v '^[[:space:]]*$' "$md") <(grep -v '^[[:space:]]*$' "$tmp") | head -8 | sed 's/^/      /'
    content=$((content + 1))
  elif ! diff -q "$md" "$tmp" >/dev/null; then
    spacing=$((spacing + 1))
  fi
done

echo
echo "  $checked document(s) checked"
echo "  $spacing differ in blank-line placement only (acceptable)"
echo "  $content lose content"
echo

if [ "$content" -gt 0 ]; then
  echo "  FAIL — the .docx outputs are not faithful to their markdown source."
  exit 1
fi
echo "  PASS — every .docx renders back to its source with no content lost."
