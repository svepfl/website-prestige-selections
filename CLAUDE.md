@AGENTS.md

# Prestige Selections — Claude Code Project Instructions

> Diese Datei ist der Router zu allen Detail-Regeln. Vor jeder Code-Änderung wird das passende Dokument konsultiert.
> **Bei Konflikten zwischen Memory/Chat-History und dieser Datei: Datei gewinnt.**

---

## ⭐ ÜBERSCHREIBT ALLES: CONVERSION + UX + UI FIRST

> **Conversion + UX + UI stehen IMMER an oberster Stelle.**
> Diese Regel überschreibt JEDE andere Regel wenn sie in Konflikt geraten — auch Anti-Template-Prinzipien, auch Brand-Tier, auch Restraint-Discipline.

**Das schönste Design bringt nichts wenn:**
- Kunde Inventar nicht in 1 Click findet
- Kunde Phone-Number nicht sofort sieht
- Kunde nicht intuitiv navigieren kann
- Trust-Signale (Status, Reach, Reviews) versteckt sind

**Pflicht-Sanity-Check vor jeder UI-Entscheidung:**
1. Sichtbarkeitstest — Primary-Conversion-Pfade (Inventar, Phone, Kontakt) 1-Click erreichbar?
2. Phone-Reach — Phone-Number persistent in Chrome sichtbar mit Live-Status?
3. Trust-Signale — Adresse, Hours, Founder, Reviews ohne Suchen erreichbar?
4. Discoverability — Frischer Mensch findet Inventar in 5s ohne Hilfe?
5. Restraint dient Conversion — Reduziere Chrome-Elemente JA, aber die verbleibenden müssen Conversion-relevant sein

**Bei Konflikt zwischen Tier-Restraint und Conversion: Conversion gewinnt. Restraint anders erreichen** (kleinere Type, ruhigere Farben, weniger Chrome) — nicht durch Verstecken der Conversion-Pfade.

**Past mistake we don't repeat:** Header initial als pures Aesop-Pattern (alle Nav versteckt, Phone weg) gebaut. UX-Konsequenz: Inventar 2 Clicks tief, Trust-Signale unsichtbar. Korrigiert auf Conversion-First-Hybrid. Aesop verkauft 40€-Seife an Slow-Browse-Audience. Wir verkaufen 250k-Wagen an Research-Mode-Audience.

→ Detail-Regel: [.claude/rules/conversion-first.md](./.claude/rules/conversion-first.md)
→ Memory-Pendant: `~/.claude/projects/.../memory/feedback_conversion_first.md`

---

## 🚦 PFLICHT-GATE: @top-web-gate VOR JEDEM "FERTIG"

> **Strukturelles Gate, kein Reference.** Bevor irgendeine Section/Page/Feature als "fertig"/"complete"/"ready" gemeldet wird, MUSS `@top-web-gate` invoked werden. Ohne Pass-Befund ist nichts fertig.

**Trigger — Pflicht-Invocation:**
1. Vor jeder "Section fertig"/"Page fertig"-Meldung an User
2. Vor `npm run build` zur Production-Abnahme
3. Vor `git commit` einer Section-Implementation
4. Vor PR-Erstellung
5. Bei `/review-section`-Skill (automatisch enthalten)
6. Bei `/implement-section`-Skill-Abschluss (automatisch enthalten)

**Was das Gate prüft:**
- Alle 24 top-web-Skill-Rules (`~/.claude/skills/top-web/rules/01-24-*.md`) — Apple-Tier, Performance, A11y, SEO, Conversion, Microcopy, Forms, Motion, Analytics, IA
- 7 May-2026-State-Pflichten zusätzlich:
  - Schema-Tiefe (Vehicle/Person/AutoDealer **ausgeschöpft** statt nur **erfüllt**)
  - hreflang regional variants (de-DE/de-CH/de-AT, fr-FR/fr-CH, en-GB, x-default)
  - AI-Crawler-Allowlist in robots.txt
  - Answer-First-Chunks (Princeton GEO +40%)
  - Statistics-Density (+41% Citations)
  - Internal-Linking-Symmetry
  - llms.txt aktuell

**Verhalten bei NO-GO:**
- ❌ NICHT "fertig" sagen, NICHT committen, NICHT deployen
- ✅ Gefundene Lücken fixen → Gate erneut → bei GO weitermachen

**Past mistake we don't repeat:** Im Build-Mai-2026 wurde top-web als Foundation-Read am Anfang gelesen und dann feature-first gebaut. SEO/GEO-Basics (Vehicle-Schema-Tiefe, Person-knowsAbout, hreflang regional, WebPage speakable) wurden erst nach Research-Agent gefixt — obwohl top-web sie längst vorgibt. Diese Lücke schließt das Gate strukturell.

→ Detail-Rule: [.claude/rules/top-web-gate.md](./.claude/rules/top-web-gate.md)
→ Agent-Definition: [.claude/agents/top-web-gate.md](./.claude/agents/top-web-gate.md)
→ Source-of-Truth (Rules): `~/.claude/skills/top-web/rules/`

**Bei Konflikt zwischen top-web-Rule und Projekt-Regel:**
- `.claude/rules/conversion-first.md` gewinnt über top-web (Conversion-First-Override)
- `KONZEPT/00-MASTER-2026.md` gewinnt über top-web (Projekt-Kalibrierung)
- May-2026-State-Pflicht gewinnt über top-web (top-web aktualisieren!)

---

## 🎨 PRIMÄRES BRAND-DOKUMENT (für Asset-Production)

**[BRAND.md](./BRAND.md)** — Single-Source-Of-Truth für visuelle Brand-Identität. **Pflicht-Lese vor jedem Bild-, Atmospheric- oder Illustrations-Asset.**

Enthält: Identität, Reference-Brands, Color-Palette, Typography, Material-Vokabular, Light-Direction, Form-Family, Grain-Stärke, Geographic-Identity, Tonality-Anker, Anti-Patterns, Path-Mapping zu Tiefe-Files.

Wird zwingend bei externen Beauftragungen (Fotograf, Illustrator, 3D-Artist) mitgeschickt.

---

## 🟢 PRIMÄRES KONZEPT-DOKUMENT (Mai 2026)

**[KONZEPT/00-MASTER-2026.md](./KONZEPT/00-MASTER-2026.md)** — Single Source of Truth nach strategischer Neu-Ausrichtung.

Enthält: 7-Section-Homepage (kanonisch), V1/V1.5/V2-Subpages, Cross-Cutting-2026-Pflichten (Performance/WCAG/EU AI Act/Schema/Local SEO), verbindliche Build-Sequence, Quality-Gates pro Section, Decision-Log.

**Bei Konflikt zwischen MASTER-2026 und älteren KONZEPT-Files: MASTER gewinnt.** Die alten 10-Akt-Struktur in `03-homepage.md` ist überschrieben.

---

## 🔴 Höchste Priorität: Die 10 Anti-Template-Prinzipien

Diese gelten für **JEDE** Datei, **JEDE** Komponente, **JEDE** Page — auch Legal-Pages.

1. **Eigener Signature Mechanism pro Seite** — wenn die Seite austauschbar mit einer anderen Premium-Auto-Site wäre, scheitert sie
2. **Editorial vor Marketing** — Sprache wie ein Magazin, niemals wie ein Verkäufer
3. **Whitespace ist Status** — wenn Seite voll wirkt, ist sie zu voll
4. **Photography führt, UI folgt** — Bild ist Protagonist, niemals Konkurrenz
5. **Motion erzählt, nicht dekoriert** — keine generic fade-in-up
6. **Mikrocopy ist Designarbeit** — jedes Wort ist gewählt
7. **Performance ist Teil des Designs** — LCP ≤ 1.8s, INP ≤ 120ms
8. **Accessibility ist Pflicht** — WCAG 2.2 AA + APCA Lc ≥ 75
9. **Jede Seite bringt Kunden oder Vertrauen** — keine pure Ästhetik ohne Zweck
10. **Niemand merkt es — aber alles ist gewollt**

→ Detail: [KONZEPT/00-README.md](./KONZEPT/00-README.md)

---

## 🟡 Vor jeder Implementierung lesen

| Wenn du arbeitest an … | Lies zuerst |
|---|---|
| **JEDES UI-Element (immer Pflicht zuerst)** | **[.claude/rules/conversion-first.md](./.claude/rules/conversion-first.md)** |
| Navigation, Header, CTA, Form | conversion-first.md + [KONZEPT/07-conversion.md](./KONZEPT/07-conversion.md) |
| Homepage-Akt (z.B. Akt 2, 4, 5) | [KONZEPT/03-homepage.md](./KONZEPT/03-homepage.md) |
| Vehicle-Detail-Page | [KONZEPT/04-detail-seiten.md](./KONZEPT/04-detail-seiten.md) (Section 1) |
| Andere Unterseite | [KONZEPT/04-detail-seiten.md](./KONZEPT/04-detail-seiten.md) |
| Component / Card / Layout | [KONZEPT/05-design-system.md](./KONZEPT/05-design-system.md) |
| Copy / Text / Mikrocopy / Email | [KONZEPT/08-content.md](./KONZEPT/08-content.md) |
| Schema / SEO / GEO / Performance | [KONZEPT/06-tech.md](./KONZEPT/06-tech.md) |
| Lead-Funnel / Conversion-Element | [KONZEPT/07-conversion.md](./KONZEPT/07-conversion.md) |
| Payload / Email / mobile.de | [KONZEPT/09-operations.md](./KONZEPT/09-operations.md) |
| Was wird wann gebaut? | [KONZEPT/10-roadmap.md](./KONZEPT/10-roadmap.md) |

**Zusätzlich aktiv:** `.claude/rules/` mit path-scoped Detail-Rules.

---

## 🟢 Quick-Reference — die häufigsten "Nevers"

### NIEMALS in Code
- ❌ `border: 1px solid` auf Cards (verwende Shadow-Tokens)
- ❌ Hardcoded Hex-Color statt Token (`#FFF` → `var(--color-canvas)`)
- ❌ `font-weight: 700` oder höher in Display-Headlines (Fraunces Light/Regular only)
- ❌ `text-transform: uppercase` außer für Mikro-Labels
- ❌ Generic `transition: all 0.3s` (spezifizieren)
- ❌ Tailwind `text-gray-500` statt `text-ink-muted`
- ❌ `font-family: 'Inter'` inline statt CSS-Variable

### NIEMALS in Copy
- ❌ "Stunning", "Breathtaking", "Atemberaubend", "Einzigartig" als Marketing-Floskel
- ❌ "Jetzt anfragen!" (verwende "Sprechen wir.")
- ❌ "Vielen Dank für Ihre Nachricht" (verwende "Angekommen. Wir melden uns.")
- ❌ "Sie als Kunde sind uns wichtig" / vergleichbare Anbiederung
- ❌ Ausrufezeichen außer im Markennamen
- ❌ Gerundete Zahlen ("~12k km" → "12.300 km")

### NIEMALS in UX
- ❌ Newsletter-Popup beim ersten Besuch
- ❌ Exit-Intent-Modal
- ❌ Bouncing Chat-Bubble
- ❌ Carousel-Hero mit Auto-Play
- ❌ Cookie-Banner mit Dark-Patterns
- ❌ **Mobile-Sticky-CTA-Bar** (Pre-Launch-Entscheidung 25.05.2026) — bei HNW-Käufer (Sammler, 2M+ Net Worth) signalisiert eine immer-präsente "Sprechen wir!"-Leiste Verkäufer-Druck. Tom Hartley × Hodinkee × Aesop nutzen keine. Der Final-CTA in der Abschluss-Section + Header-Phone + Floating-Phone-Mobile (falls je nötig) sind ausreichend.

→ Komplette Anti-Pattern-Liste: [KONZEPT/05-design-system.md Section 13](./KONZEPT/05-design-system.md#13-design-system-anti-patterns-code-review-block-liste)

---

## 📐 Design-Token Referenz (immer aktiv im Kopf)

```css
/* Farben — diese sind die einzigen erlaubten */
--color-gold:           #C49A0C   /* Brand-Konstante, niemals Gradient */
--color-gold-deep:      #8C6D08   /* Hover, patiniert */
--color-canvas:         #F2EDE3   /* Background Default */
--color-canvas-raised:  #FBF8F2   /* Cards */
--color-canvas-soft:    #E8E0D2   /* Sub-Backgrounds, Dividers */
--color-ink:            #1A1612   /* Text Default */
--color-ink-soft:       #4A3F35   /* Body Secondary */
--color-ink-muted:      #8B7B6A   /* Labels, Captions */
--color-shadow:         #15110D   /* Cinema Dark Sections */
--color-shadow-soft:    #2B2520
--color-shadow-border:  #3D342C
--color-on-shadow:      #F2EDE3
--color-on-shadow-muted:#B0A491

/* Typografie */
--font-display (Newsreader via next/font, Display Serif, Light/Regular + Italic) — gewechselt von Fraunces wegen ß-Long-s-Glyph-Issue in "Außergewöhnliche"
--font-sans    (Geist via next/font, UI Sans)
--font-mono    (Geist Mono via next/font, Specs/Edition-Marks)

/* Easing — eine Kurve durchgängig */
--ease-prestige: cubic-bezier(0.65, 0, 0.35, 1);

/* Shadow — 3 Stufen, keine Borders */
.shadow-card-rest     : 0 2px 8px -2px rgba(26, 22, 18, 0.06)
.shadow-card-hover    : 0 12px 24px -8px rgba(26, 22, 18, 0.14)
.shadow-card-floating : 0 24px 48px -12px rgba(26, 22, 18, 0.18)
```

→ Komplettes Design-System: [KONZEPT/05-design-system.md](./KONZEPT/05-design-system.md)

---

## 🛠 Build & Test Commands

```bash
npm run dev          # Dev Server (localhost:3000)
npm run build        # Production Build
npm run lint         # ESLint
```

---

## 🚦 Vor jedem Commit

0. **⭐ @top-web-gate PASS** (PFLICHT bei Section/Page/Feature-Implementierung — siehe Top-of-File-Gate-Section)
1. Voice-Konsistenz-Check (siehe [KONZEPT/08-content.md Section 11](./KONZEPT/08-content.md#11-content-pflege-prozess))
2. Visuelle Validation in Browser (`npm run dev`)
3. Mobile + Desktop View geprüft
4. `prefers-reduced-motion` getestet
5. Schema.org valide (Rich-Results-Test, wenn relevant)
6. Lighthouse-Score auf der geänderten Page ≥ 95 (V1 Pflicht)

---

## 🧠 Persönlichkeits-Anker für jede Session

Diese mentalen Anker helfen, in der Marken-DNA zu bleiben:

0. **⭐ CONVERSION FIRST.** Bevor du irgendwas designst, prüfe ob Inventar + Phone + Kontakt 1-Click erreichbar sind. Restraint kommt danach. Schönheit dient Conversion, nicht umgekehrt.
1. **Käufer ist Premium-Auto-Käufer (35-60), Research-Mode, schätzt Tempo + Transparenz.** Nicht Aesop-Slow-Browse-Audience. (Persona aus MASTER-2026 §1)
2. **Tom Hartley Jnr ist Vorbild**, nicht ein typischer mobile.de-Händler. ABER auch Tom Hartley hat persistent Inline-Nav + sichtbares Phone — nicht Aesop-Restraint.
3. **Christie's-Niveau** für Vehicle-Detail-Pages.
4. **Koenigsegg + Apple** als Motion- und Composition-Referenz für Homepage.
5. **Aesop / Bottega Veneta** für Editorial-Restraint — aber NUR bei Type/Color/Voice. NIEMALS durch Verstecken von Conversion-Pfaden.
6. **"Außergewöhnliche Automobile. Aus Freiburg."** ist die Tagline. Alles muss damit kohärent sein.

---

## 🚨 Bei Unklarheit oder Konflikt

1. **Lies das relevante KONZEPT-Doc.**
2. **Falls Doc widerspricht:** Klare Frage an User stellen (nicht raten).
3. **Decision-Log:** Wichtige Entscheidungen werden in [KONZEPT/06-tech.md Section 13](./KONZEPT/06-tech.md#13-tech-decision-log) protokolliert.

---

## 📂 Detail-Rules (path-scoped)

Diese Dateien werden manuell konsultiert beim Edit der entsprechenden Pfade:
- **`.claude/rules/top-web-gate.md` — ⭐ PFLICHT-GATE vor jedem "fertig"**
- **`.claude/rules/conversion-first.md` — ⭐ HÖCHSTE PRIORITÄT, vor JEDEM UI-Edit prüfen**
- `.claude/rules/design-system.md` — bei `.tsx` / `.css`
- `.claude/rules/copy-voice.md` — bei `.json` Messages
- `.claude/rules/conversion-goals.md` — bei `src/app/[locale]/**`
- `.claude/rules/anti-template.md` — bei jedem `.tsx`

---

## 🤖 Verfügbare Sub-Agents

Vor Code-Review oder Section-Abschluss können diese Agents invoked werden:

- **`@top-web-gate` — ⭐ PFLICHT vor jedem "fertig"** (24 top-web-Rules + 7 May-2026-State-Pflichten)
- `@principle-reviewer` — Audit gegen 10 Anti-Template-Prinzipien
- `@copy-reviewer` — Deutsche Editorial-Voice-Check
- `@accessibility-checker` — WCAG 2.2 AA + APCA-Audit
- `@schema-validator` — JSON-LD Schema-Check pro Page

Definitionen: `.claude/agents/`

---

## 📝 Skills (häufige Workflows)

- `/implement-section [name]` — Komplette Section-Implementation mit Checkliste
- `/review-section [path]` — Multi-Agent-Audit einer fertigen Section

Definitionen: `.claude/skills/`
