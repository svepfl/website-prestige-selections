#!/bin/bash
# Prestige Selections — Anti-Template Principle Validator
# Detects regression to generic React patterns after Edit/Write

FILE="${1}"

# Skip if no file or not a TS/TSX file
if [ -z "$FILE" ] || ! echo "$FILE" | grep -qE '\.(ts|tsx)$'; then
  exit 0
fi

# Skip if file doesn't exist
if [ ! -f "$FILE" ]; then
  exit 0
fi

VIOLATIONS=0
WARNINGS=()

# Check 1: Generic Component Names
if grep -nE 'export\s+(default\s+)?function\s+(Card|Container|Section|Wrapper|Group|Stack|Row|Column|Layout|Box)\s*\(' "$FILE" 2>/dev/null; then
  WARNINGS+=("Generic component name detected. Use domain-specific name (e.g. VehicleCard, EditorialQuote).")
  ((VIOLATIONS++))
fi

# Check 2: Border on Cards (Anti-Pattern)
if grep -nE 'className=["'"'"'][^"'"'"']*border\s+border-' "$FILE" 2>/dev/null | grep -vE '(focus|hover):' | head -3; then
  WARNINGS+=("border-* utility on potentially card-like element. Use shadow-card-* instead.")
  ((VIOLATIONS++))
fi

# Check 3: font-bold or font-extrabold in Display
if grep -nE 'font-(bold|extrabold|black).*text-(4xl|5xl|6xl|7xl|8xl|9xl|display)' "$FILE" 2>/dev/null; then
  WARNINGS+=("Bold weight on Display-Type detected. Fraunces should be Light (300) or Regular (400).")
  ((VIOLATIONS++))
fi

# Check 4: Hardcoded Hex Colors
if grep -nE 'className=["'"'"'][^"'"'"']*(bg|text|border)-\[#[0-9A-Fa-f]{3,8}\]' "$FILE" 2>/dev/null; then
  WARNINGS+=("Hardcoded hex color detected. Use design tokens (bg-canvas, text-ink, etc.).")
  ((VIOLATIONS++))
fi

# Check 5: Tailwind default grays
if grep -nE 'className=["'"'"'][^"'"'"']*(bg|text|border)-(gray|slate|zinc|neutral|stone)-[0-9]' "$FILE" 2>/dev/null; then
  WARNINGS+=("Tailwind default gray/slate color detected. Use brand tokens (text-ink-muted, bg-canvas-soft).")
  ((VIOLATIONS++))
fi

# Check 6: <img> tag instead of next/image
if grep -nE '<img\s' "$FILE" 2>/dev/null; then
  WARNINGS+=("<img> tag detected. Use next/image <Image> component for optimization.")
  ((VIOLATIONS++))
fi

# Check 7: Marketing-Floskeln in JSX
if grep -inE '(atemberaubend|stunning|breathtaking|jetzt anfragen|sichern sie sich)' "$FILE" 2>/dev/null; then
  WARNINGS+=("Marketing-Floskel detected in copy. Use editorial voice (see .claude/rules/copy-voice.md).")
  ((VIOLATIONS++))
fi

# Output warnings (informational, non-blocking)
if [ $VIOLATIONS -gt 0 ]; then
  echo ""
  echo "⚠ Anti-Template Principle-Check found ${VIOLATIONS} potential issue(s) in ${FILE}:"
  for w in "${WARNINGS[@]}"; do
    echo "  - $w"
  done
  echo ""
  echo "Read .claude/rules/anti-template.md and .claude/rules/design-system.md for guidance."
  echo ""
fi

# Always exit 0 — these are warnings, not blockers
# To upgrade to blocking later, change exit code based on severity
exit 0
