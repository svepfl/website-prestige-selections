#!/bin/bash
# Prestige Selections — Post-Edit Lint Hook
# Runs after Edit/Write tool to catch basic issues immediately

# Exit gracefully if no changed files
if ! git status --porcelain 2>/dev/null | grep -q .; then
  exit 0
fi

# Find changed TS/TSX files
CHANGED_TS=$(git diff --name-only HEAD 2>/dev/null | grep -E '\.(ts|tsx)$' || true)

if [ -n "$CHANGED_TS" ]; then
  # Run ESLint on changed files only (don't block, but warn)
  echo "$CHANGED_TS" | xargs -r npx eslint --fix 2>&1 | head -50 || true
fi

# Exit 0 — never block, only inform
exit 0
