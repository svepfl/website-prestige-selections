---
description: The 10 Anti-Template-Principles — enforced for every component and page
paths:
  - "src/**/*.tsx"
  - "src/**/*.ts"
---

# Die 10 Anti-Template-Prinzipien

> **Wenn eine Seite austauschbar wäre mit einer anderen Premium-Auto-Site, scheitert sie.** Diese 10 Prinzipien sind die DNA — sie gelten für JEDE Seite, JEDE Komponente.

## 1. Eigener Signature Mechanism pro Seite

Jede Section/Page hat **mindestens einen** Mechanismus, der sie unterscheidet von:
- Anderen Sections derselben Site
- Anderen Premium-Auto-Sites

❌ Wenn die Section "noch ein Hero mit Headline + 2 CTAs" ist
✅ Wenn die Section eine spezifische, durchdachte Idee verkörpert (z.B. Tor-Reveal, Pinned Spec-Counting, Atelier-Live-Feed)

## 2. Editorial vor Marketing

**Wir schreiben wie ein Magazin, nicht wie ein Verkäufer.**

❌ "Erleben Sie unsere atemberaubende Auswahl an Premium-Sportwagen"
✅ "Dreißig Fahrzeuge in der Halle. Jedes von uns geprüft."

## 3. Whitespace ist Status

Premium = Reduktion. Wenn Seite "voll" wirkt, ist sie zu voll.

❌ 4 Cards pro Row + Sidebar + Banner + Footer-CTA
✅ 1 fokussiertes Element pro Viewport, generöser Whitespace

## 4. Photography führt, UI folgt

Das Fahrzeug ist Protagonist. UI darf niemals mit Foto konkurrieren.

❌ Heavy chrome / Gradients über Fahrzeug-Bildern
✅ Restrained Overlays, full-bleed images, subtile Type

## 5. Motion erzählt, nicht dekoriert

Keine generic `fade-in-up` auf jedes Element. Jede Animation muss einen Erzählgrund haben.

❌ `animate-fade-in` auf JEDEM Heading
✅ Scroll-driven Tor-Reveal in Akt 1 (erzählt Eintritts-Akt)

## 6. Mikrocopy ist Designarbeit

Jedes Wort ist gewählt — auch in 3-Wort-CTAs.

❌ "Jetzt unverbindlich anfragen!"
✅ "Sprechen wir."

❌ "Seite nicht gefunden"
✅ "Diese Seite existiert nicht. Aber dreißig andere schon."

## 7. Performance ist Teil des Designs

Eine "schöne" Seite die > 1.8s LCP hat, ist NICHT weltklasse.

Pflicht: LCP ≤ 1.8s, INP ≤ 120ms, CLS ≤ 0.05

## 8. Accessibility ist Pflicht

WCAG 2.2 AA + APCA Lc ≥ 75 für Body. Pointer-Targets ≥ 24×24px. Focus-Indicators sichtbar UND mit Kontrast.

Reduced-Motion strikt respektiert — kein "etwas weniger".

## 9. Jede Seite bringt Kunden oder Vertrauen

Pure Ästhetik ohne Conversion-Ziel ist Selbstbespiegelung.

Jede Section/Page muss eine klare Rolle haben: **TRUST**, **CURATION**, **EVALUATION**, **CONTACT**, oder **OPERATIONS**.

→ siehe `.claude/rules/conversion-goals.md`

## 10. Niemand merkt es — aber alles ist gewollt

Das höchste Lob: *"Ich kann nicht sagen warum, aber das fühlt sich anders an als alle anderen Dealer-Sites."*

Diese Wirkung kommt aus **tausenden Mikro-Entscheidungen** — alle bewusst.

---

## Anti-Template Component-Naming

❌ Generisch:
- `Card`, `Container`, `Section`, `Wrapper`, `Group`, `Stack`, `Row`, `Column`, `Layout`

✅ Domain-spezifisch:
- `VehicleCard`, `EditorialQuote`, `MonoSpec`, `ProvenanceBlock`
- `AtelierBlock`, `HeritageCountUp`, `CustomerStoryPin`
- `WeeklyShowcase`, `InspectionVault`, `BrandStatementFooter`

## Anti-Template Layout-Patterns

Vermeiden:
- ❌ Generic 3-Spalten-Grid für Services / Features
- ❌ "Hero + 3 Cards + CTA" Standard-Layout
- ❌ Akkordeons außerhalb von FAQ
- ❌ Tabbed Content
- ❌ "Read more →" auf jedem Card

Bevorzugen:
- ✅ Asymmetrische Compositions (60/40, 65/35 Splits)
- ✅ Vertikaler Editorial Stack
- ✅ Pinned Center + Side-Scroll
- ✅ Mini-Label + Massive Display-Type
- ✅ Staggered Headline Indents

## Anti-Template Microinteractions

❌ Hover: Border-Appear
❌ Hover: Color-Wechsel der gesamten Card
❌ Spinning Loaders überall
❌ Bouncing CTAs
❌ Pulsing Indicators inflationär

✅ Hover: Lift + Shadow deepen
✅ Subtle Scale (1.04) on Image-Cards
✅ Patina-Glow (gold focus) on Inputs
✅ Skeleton-Loaders statt Spinner

## Pre-Commit Anti-Template-Check

Frage dich bei jedem Component:
1. Würde diese Komponente auf einem generischen Bootstrap-Template aussehen?
2. Ist der Name domain-spezifisch oder generisch?
3. Hat sie einen erkennbaren "Prestige Selections Look"?
4. Gibt es ein klares Signature-Element?

Wenn 1 = Ja oder 2/3/4 = Nein → Refactor.

→ Volle Prinzipien: [KONZEPT/00-README.md](../../KONZEPT/00-README.md)
