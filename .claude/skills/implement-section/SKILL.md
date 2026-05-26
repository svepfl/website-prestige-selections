---
name: implement-section
description: Complete workflow to implement a homepage Akt or detail-page section. Enforces reading of relevant KONZEPT docs, checks tokens, asks for assets, scaffolds, and triggers review.
---

# /implement-section [Akt-Name oder Page-Section]

Komplette Implementation einer Section mit allen Checks.

## Pre-Implementation Checklist

Bevor irgendein Code geschrieben wird:

### 1. Konzept lesen
- [ ] [KONZEPT/00-README.md](../../../KONZEPT/00-README.md) — 10 Anti-Template-Prinzipien
- [ ] [KONZEPT/03-homepage.md](../../../KONZEPT/03-homepage.md) (wenn Homepage-Akt) ODER [KONZEPT/04-detail-seiten.md](../../../KONZEPT/04-detail-seiten.md) (wenn Sub-Page)
- [ ] [KONZEPT/05-design-system.md](../../../KONZEPT/05-design-system.md) — Tokens, Patterns
- [ ] [KONZEPT/08-content.md](../../../KONZEPT/08-content.md) — Voice für Mikrocopy
- [ ] `.claude/rules/design-system.md`
- [ ] `.claude/rules/copy-voice.md`
- [ ] `.claude/rules/anti-template.md`

### 2. Section-Specs identifizieren
Aus dem relevanten KONZEPT-Doc:
- [ ] Signature Mechanism dieser Section verstanden?
- [ ] Conversion-Rolle klar (TRUST / CURATION / EVALUATION / CONTACT / OPERATIONS)?
- [ ] Required Assets benannt (Bilder, Videos, Copy)?
- [ ] Background-Treatment klar (Light / Dark / Mixed)?
- [ ] Motion-Choreographie klar?

### 3. Assets verfügbar?
- [ ] AI-generierte Stills in `/public/assets/{folder}/`?
- [ ] Copy-Strings in `/src/messages/{de,en,fr}.json`?
- [ ] Falls Assets fehlen: Placeholder-Pfade in `images.ts` definieren + im Asset-Brief-V2 vermerken

## Implementation-Schritte

### Schritt 1: Component-Datei
- Location: `src/components/sections/[Name].tsx` (Homepage-Akt) ODER `src/components/blocks/[Name].tsx` (Detail-Block)
- Naming: **NICHT generisch** (siehe `.claude/rules/anti-template.md`)
- 'use client' nur wenn nötig (Scroll-Listener, Interaktivität)

### Schritt 2: i18n-Strings
- Neue Strings in alle 3 Locales: `de.json`, `en.json`, `fr.json`
- Voice-Konsistenz-Check (kanonische Mikrocopy verwenden)
- KEINE Auto-Translate

### Schritt 3: Design-Tokens verwenden
- Farben aus Token-Set (siehe Design-System-Rules)
- Spacing aus 8pt-Skala
- Shadow-Tiers statt Borders
- Easing: `--ease-prestige`

### Schritt 4: Motion (wenn relevant)
- `prefers-reduced-motion` Fallback PFLICHT
- requestAnimationFrame für Scroll-Animations (oder native CSS scroll-driven wenn Browser-Support reicht)
- Will-change Properties für Performance

### Schritt 5: Schema.org (wenn Page-Level)
- Passender Schema-Type
- Required-Fields vollständig
- Visible Price = Schema Price exakt match (bei Vehicle-Page)

### Schritt 6: Integration
- Component in Page importieren ([src/app/[locale]/page.tsx](../../../src/app/[locale]/page.tsx) für Homepage)
- Verify das es rendert mit Placeholder-Daten

## Post-Implementation Checklist

### Schritt 7 — PFLICHT-GATE: @top-web-gate

> **Strukturell verankert. Ohne Pass keine "fertig"-Meldung.**

```
@top-web-gate
audit: [Section-Name oder Page-Pfad]
```

Das Gate prüft alle 24 top-web-Skill-Rules + 7 May-2026-State-Pflichten (Schema-Tiefe, hreflang regional, AI-Crawler-Allowlist, Answer-First-Chunks, Statistics-Density, Internal-Linking-Symmetry, llms.txt). Detail: [.claude/rules/top-web-gate.md](../../rules/top-web-gate.md).

Bei NO-GO: Lücken fixen, Gate erneut, bei GO weitermachen. **Niemals "fertig" sagen ohne GO.**

### Vor Commit:

- [ ] **@top-web-gate Pass** (PFLICHT — siehe Schritt 7)
- [ ] Verify im Browser (`npm run dev`)
- [ ] Mobile + Desktop View geprüft
- [ ] `prefers-reduced-motion` getestet (Browser DevTools)
- [ ] Keyboard-Navigation getestet (Tab durch Section)
- [ ] @principle-reviewer Audit invoked (Projekt-Brand-DNA)
- [ ] @copy-reviewer Audit invoked (wenn Copy enthalten)
- [ ] @accessibility-checker Audit invoked
- [ ] Lighthouse-Score auf der Page ≥ 95 (Performance + A11y)
- [ ] Falls Schema enthalten: @schema-validator Audit invoked
- [ ] KONZEPT-Doc upgedated falls Entscheidungen getroffen wurden (Decision-Log)

## Anti-Patterns (sofort STOP wenn auftritt)

- ❌ Generic Component-Name (`Card`, `Container`, `Section`)
- ❌ `border: 1px solid` auf Card-Element
- ❌ Hardcoded Hex statt Token
- ❌ `font-bold` in Display-Headlines
- ❌ Marketing-Floskeln in Copy
- ❌ Inline `<img>` statt `<Image>`
- ❌ Missing `aria-label` auf icon-only Buttons
- ❌ Auto-Translate für EN/FR

Wenn du eines davon machst → Refactor sofort, niemals committed.

## Konkrete Beispiele

### Akt 2 implementieren
```
/implement-section Akt 2 — Wochen-Schaufenster
```

Was passiert:
1. Lies [KONZEPT/03-homepage.md Section "Akt 2"](../../../KONZEPT/03-homepage.md)
2. Verstehe Signature Mechanism: Pin + 360°-Scrub + Massive Spec-Type
3. Check ob AI-Assets vorhanden (360°-Render des Wochen-Fahrzeugs)
4. Erstelle `src/components/sections/WeeklyShowcase.tsx`
5. Implementiere Scroll-Driven Choreography
6. Strings in i18n hinzufügen
7. Integriere in `src/app/[locale]/page.tsx`
8. Review-Cycle starten

### Vehicle Detail Page implementieren
```
/implement-section Vehicle Detail Page
```

Was passiert:
1. Lies [KONZEPT/04-detail-seiten.md Section 1](../../../KONZEPT/04-detail-seiten.md)
2. Verstehe alle 10 Block-Components der Detail-Page
3. Plane Component-Hierarchie
4. Implementiere Block-by-Block (10 Sub-Components)
5. Schema.org Vehicle + Product + Offer komplett
6. ISR + revalidateTag konfigurieren
7. Review-Cycle starten

## Skip-Bedingungen

Diese Skill **nicht verwenden** wenn:
- Nur kleine Bug-Fixes (direkt fixen)
- Nur Copy-Updates in i18n-Files (separat)
- Tech-Infrastructure-Changes ohne Visual-Impact
