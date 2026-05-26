---
name: review-section
description: Comprehensive multi-agent audit of a completed section. Runs principle-reviewer, copy-reviewer, accessibility-checker, schema-validator in sequence and consolidates findings.
---

# /review-section [Komponenten-Pfad oder Page-URL]

Vollständiger Quality-Audit einer Section vor Merge.

## Audit-Sequenz

### 0. ⭐ TOP-WEB-GATE (PFLICHT — vor allen anderen)
```
@top-web-gate [path]
```
Prüft: 24 top-web-Skill-Rules + 7 May-2026-State-Pflichten (Schema-Tiefe, hreflang regional, AI-Crawler-Allowlist, Answer-First, Statistics-Density, Internal-Linking, llms.txt). **Ohne GO darf nichts gemerged werden.** Detail: [.claude/rules/top-web-gate.md](../../rules/top-web-gate.md).

### 1. Principle-Reviewer
```
@principle-reviewer [path]
```
Prüft: 10 Anti-Template-Prinzipien, Component-Naming, Card-Patterns, Motion-Rules.

### 2. Copy-Reviewer (wenn Copy enthalten)
```
@copy-reviewer [path]
```
Prüft: Voice, Forbidden Words, Mikrocopy-Konsistenz, Multilingual.

### 3. Accessibility-Checker
```
@accessibility-checker [path]
```
Prüft: WCAG 2.2 AA, APCA, Alt-Texts, Keyboard-Nav, Focus-Indicators.

### 4. Schema-Validator (wenn Page-Level)
```
@schema-validator [path]
```
Prüft: JSON-LD-Vollständigkeit, Price-Match, inLanguage, Required-Fields.

### 5. Performance-Check
```bash
npm run build
npx lighthouse [url] --view
```
Prüft: LCP ≤ 1.8s, INP ≤ 120ms, CLS ≤ 0.05, Lighthouse-Score ≥ 95.

## Konsolidierter Report

Nach allen Audits zusammenfassen:

```
═══════════════════════════════════════════
SECTION-REVIEW: [Section Name]
═══════════════════════════════════════════

▸ Principle Audit:     ✅ Pass / ❌ Fail
▸ Copy Voice:          ✅ Pass / ❌ Fail / ⏭ N/A
▸ Accessibility:       ✅ Pass / ❌ Fail
▸ Schema:              ✅ Pass / ❌ Fail / ⏭ N/A
▸ Performance:         ✅ Pass / ⚠ Below Target

Overall Status: READY FOR MERGE / NEEDS REWORK

═══════════════════════════════════════════

CRITICAL (must fix before merge):
1. [Issue mit File:Line + Fix]
2. ...

WARNING (should fix):
1. ...

SUGGESTION (nice-to-have):
1. ...

═══════════════════════════════════════════
```

## Merge-Gate

Section darf NUR gemerged werden wenn:
- ✅ **top-web-gate GO** (PFLICHT — alle 24 Rules + May-2026-State)
- ✅ Principle-Audit Pass (keine CRITICAL)
- ✅ Copy-Voice Pass (keine CRITICAL)
- ✅ Accessibility Pass (alle WCAG 2.2 AA Pflicht-Items)
- ✅ Schema Pass (falls relevant — Price-Match!)
- ✅ Lighthouse Performance ≥ 95
- ✅ Mobile + Desktop visuell verifiziert
- ✅ `prefers-reduced-motion` getestet

Bei CRITICAL-Failures: Fixes machen + Re-Audit. **Niemals** mit CRITICAL-Issues mergen.

## Quick-Skip-Bedingungen

Diese Skill nicht nötig bei:
- Trivialen Copy-Tweaks (nur Copy-Reviewer reicht)
- Tech-Internal-Refactors ohne Visual-Impact (nur Principle-Reviewer reicht)
- Asset-Replacements (Image-Swaps ohne Layout-Change)

## Output für Decision-Log

Wichtige Audit-Findings, die zu Konzept-Entscheidungen führen, werden festgehalten in:
- [KONZEPT/06-tech.md Section 13](../../../KONZEPT/06-tech.md#13-tech-decision-log)
- Component-spezifische Notes als Kommentar im Code

## Audit-Cadence

Standard:
- **Pro Section nach Implementation:** Vollständiger Review
- **Vor Phase-Abschluss:** Alle Sections der Phase erneut auditiert (Cross-Section-Konsistenz)
- **Pre-Launch:** Site-weiter Audit (alle Pages systematisch)
