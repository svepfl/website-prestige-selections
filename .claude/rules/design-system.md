---
description: Design system enforcement rules for any component or CSS work
paths:
  - "src/**/*.tsx"
  - "src/**/*.ts"
  - "src/**/*.css"
---

# Design System Rules

## Verbindliche Tokens

### Farben
**ONLY these color tokens.** Hardcoded hex outside of tokens-file = code review reject.

```
Brand:     gold, gold-deep
Canvas:    canvas, canvas-raised, canvas-soft
Ink:       ink, ink-soft, ink-muted
Shadow:    shadow, shadow-soft, shadow-border
On-Dark:   on-shadow, on-shadow-muted
```

Usage in JSX:
- ✅ `bg-canvas`, `text-ink`, `text-gold`
- ❌ `bg-[#FFF]`, `text-[#1A1612]`, `bg-gray-100`

### Typografie
**Display = Newsreader, Light (300) / Regular (400) / Italic — signature flourish only.**
Gewechselt von Fraunces wegen historischem Long-s-Glyph für ß in "Außergewöhnliche". Newsreader hat authentisches modernes ß und opsz-Variable.
- ✅ `font-display` mit `style={{ fontStyle: 'italic', fontWeight: 300 }}` für Editorial-Pull-Quotes + Massive Statements
- ❌ `font-display` mit fontWeight ≥ 600 (Display-Serif darf nie hart sein)

**Sans = Geist (Display-Headlines + UI), Regular 400 bis Bold 700.**
Post-Modernisierung (Mai 2026) dominiert Geist Bold UPPERCASE als Display-Headline (Tor-Reveal, Schaufenster, Markenwelt, Leistungen, Methode). Newsreader ist Akzent, nicht Default.
- ✅ Headlines: `font-sans uppercase tracking-[-0.02em]` + `style={{ fontWeight: 700, fontSize: 'clamp(2.5rem,7vw,6.5rem)' }}`
- ✅ Body: `font-sans text-ink-soft leading-[1.55]`
- ❌ Generische `text-gray-500`, `text-neutral-400`

**Mono = Geist Mono — Specs, Edition-Marks, Lot-Markers.**
- ✅ `font-mono-spec tabular-nums` für Preis, PS, km
- ✅ `font-mono-spec text-[10px] uppercase tracking-[0.32em]` für Section-Marker

### Spacing
**8pt base only.** Werte aus dem Set: 0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 192, 256

Verboten: 13px, 22px, 19px usw.

### Cards
**NIEMALS Borders.**
- ✅ `shadow-card-rest hover:shadow-card-hover`
- ❌ `border border-gray-200`
- ❌ `border border-ink-muted`

Card-Pattern:
- **Image Card:** Bild full-bleed, kein internal Padding um Bild
- **Solid Card:** White Fill `bg-canvas-raised`, Padding 32-48px desktop
- **Floating Card:** `shadow-card-floating`, bricht aus Grid (max 1× pro Section)

### Radius — 3-Tier-System für Bilder

Premium-Editorial-Sites (Singer · Tom Hartley Jnr · Hodinkee · Aesop) runden niemals "alles". Wir folgen strengen drei Stufen:

**Tier 1 — Editorial-Cinema (square, kein Radius):**
- VDP Hero-Letterbox, Tor-Reveal Canvas, Schaufenster-Spread-Images, alle full-bleed/cinematic Bilder
- → keine Klasse / `rounded-none`
- Begründung: scharfe Kanten = magazin-tier, weiche Kanten = app-tier

**Tier 2 — Subtle Standalone (rounded-lg = 8px):**
- Editorial-Standalone-Bilder ohne Card-Container (Founder-Portrait /haus, /werkstatt Detailshots)
- → `rounded-lg`

**Tier 3 — Soft-Card (rounded-2xl/3xl):**
- Bilder INNERHALB von Cards (inherit via card's `rounded-2xl` + `overflow-hidden`)
- Cards selbst: `rounded-2xl` (16px) für Standard, `rounded-3xl` (24px) für Hero-Cards (CollectionHero)
- Niemals `rounded-sm` (basically square) oder `rounded-full` für Image-Cards

**Anti-Pattern:** Alle Bilder einheitlich runden — das nivelliert die visuelle Hierarchie auf "App-UI" und nimmt der Site den Editorial-Charakter.

### Motion
**Eine Easing-Kurve:** `var(--ease-prestige)` = `cubic-bezier(0.65, 0, 0.35, 1)`

Duration-Tokens:
- 200ms — Mikro (Hover, Button)
- 300ms — Color Transitions
- 600ms — Element Reveals
- 900ms — Section Reveals
- 1.2-1.6s — Hero Transitions

Verboten:
- ❌ `transition: all 0.3s` (zu generisch)
- ❌ Generic `fade-in-up` auf jedes Element
- ❌ Bouncing CTAs
- ❌ Parallax außer in Cinematic Acts

### Hover-Patterns
- **Image Cards:** `hover:scale-[1.04]` + `hover:shadow-card-hover`
- **Text Links:** `hover:text-gold-deep`
- **Buttons:** Opacity-Stufe oder `bg-ink-soft`, KEIN Scale
- **NIEMALS:** Border-Appear on Hover

## Component-Naming-Konvention

**Nicht generisch:**
- ❌ `Card`, `Container`, `Section`, `Wrapper`, `Group`, `Stack`, `Row`, `Column`, `Layout`
- ✅ `VehicleCard`, `EditorialQuote`, `MonoSpec`, `ProvenanceBlock`, `AtelierBlock`

## Photography Direction

Jedes Bild folgt House-Look (siehe `asset-brief-v2.md`):
- Warmes Haupt-Licht von oben
- Dark warm gray Studio Background ODER outdoor warm natural
- Geringe Saturation, controlled Shadows
- NICHT: HDR, Lens-Flares, Instagram-Pop

Format-System (starr):
- Hero 16:9, Mobile 9:16
- Vehicle Card 16:10
- Vehicle Detail Gallery: 16:9, 16:10, 4:5
- Portrait 4:5
- Square Detail 1:1
- Cinematic Banner 21:9

## Image-Component Pflicht

```tsx
import Image from 'next/image';

// Above-fold
<Image
  src={...}
  alt="..."
  fill or width/height
  priority   // LCP only
  sizes="..."  // accurate responsive
  className="object-cover"
/>

// Below-fold: kein priority, lazy default
```

❌ `<img>` tag direkt — niemals

## Reduced Motion Pflicht

Jede Scroll-Driven-Animation muss `prefers-reduced-motion` respektieren:
- Tor-Reveal: jump auf Frame 5
- Pin + Scrub: statisches Hero
- Count-Up: zeigt Ziel-Wert direkt
- Side-Scroll: statisches Layout

Implementation in `useEffect`:
```typescript
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) {
  // alternative rendering
  return;
}
```

## Tailwind v4 Convention

Wir nutzen `@theme inline` in `globals.css`. Tokens werden automatisch zu Utilities.

Erlaubte Klassen-Patterns:
- `bg-{token-name}`, `text-{token-name}`, `border-{token-name}` (Letzteres rarely)
- `shadow-card-{tier}`
- `font-display`, `font-mono`
- Standard Tailwind Utilities (`flex`, `grid`, `pt-`, `px-` etc.)

→ Volles Design System: [KONZEPT/05-design-system.md](../../KONZEPT/05-design-system.md)
