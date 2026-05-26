# 05 — Design System

> Die verbindliche visuelle und interaktive Sprache. Wenn etwas nicht in diesem Dokument als Token oder Pattern definiert ist, **darf es nicht im Code stehen**.

---

## 1. Farb-System

### Brand-Konstante (LOCKED)
| Token | Value | Verwendung |
|---|---|---|
| `--color-gold` | `#C49A0C` | Brand-Konstante. Logo, Mini-Labels, max 2× pro Viewport. Niemals Gradient. |
| `--color-gold-deep` | `#8C6D08` | Hover-State, Mini-Labels in Akten, patiniertere Variante |

### Canvas (Light-System)
| Token | Value | Verwendung |
|---|---|---|
| `--color-canvas` | `#F2EDE3` | Warmer Off-White Default-Background |
| `--color-canvas-raised` | `#FBF8F2` | Cards, erhöhte Flächen |
| `--color-canvas-soft` | `#E8E0D2` | Sub-Backgrounds, dividers, soft callouts |

### Ink (Text auf Light)
| Token | Value | Verwendung |
|---|---|---|
| `--color-ink` | `#1A1612` | Headlines, primary text |
| `--color-ink-soft` | `#4A3F35` | Body text, secondary |
| `--color-ink-muted` | `#8B7B6A` | Labels, captions, tertiary |

### Shadow / Cinema (Dark-Sections — Akte 1, 2, 8, gelegentlich 10)
| Token | Value | Verwendung |
|---|---|---|
| `--color-shadow` | `#15110D` | Main dark background |
| `--color-shadow-soft` | `#2B2520` | Sub-dark, dark cards |
| `--color-shadow-border` | `#3D342C` | Subtle dark borders if needed |
| `--color-on-shadow` | `#F2EDE3` | Text on dark (= canvas value) |
| `--color-on-shadow-muted` | `#B0A491` | Muted text on dark |

### Verwendungsregeln
- **Gold** max 2× pro Viewport (Logo + 1 Akzent). Niemals Gradient.
- **Dark Sections** ausschließlich für Cinematic-Akte (1, 2, 8 + Übergänge 10)
- **Pure White / Pure Black** sind verboten. Always warm.
- **Status-Farben** (Verkauft, Reserviert) sind eigene gedeckte Tags, nicht knallig (max color contrast ~3:1 zu canvas)

---

## 2. Typografie

### Font-Stack
| Rolle | Font | Quelle | Variants |
|---|---|---|---|
| Display Serif | **Fraunces** | Google Fonts (free, variable) | Light (300) bis Regular (500), opsz axis variable |
| UI Sans | **Inter** | Google Fonts (free, variable) | Light (300) bis Semibold (600) |
| Mono | **JetBrains Mono** oder **Inter Mono** | Free | Regular |

### V2-Upgrade-Pfad (Premium, später)
- Display: **Editorial New** (PP) ~150€
- Sans: **ABC Diatype** ~600€
- Mono: **ABC Diatype Mono** im Paket

### Type-Skala (Modular, Ratio 1.2)
| Token | Size (Desktop) | Size (Mobile) | Line-Height | Font | Weight | Letter-Spacing |
|---|---|---|---|---|---|---|
| `display-3xl` | 128px | 72px | 0.95 | Fraunces | 300 | -0.03em |
| `display-2xl` | 96px | 56px | 1.0 | Fraunces | 300 | -0.025em |
| `display-xl` | 72px | 48px | 1.05 | Fraunces | 300 | -0.02em |
| `display-lg` | 56px | 40px | 1.1 | Fraunces | 300 | -0.02em |
| `display-md` | 40px | 32px | 1.15 | Fraunces | 400 | -0.015em |
| `display-sm` | 32px | 28px | 1.2 | Fraunces | 400 | -0.01em |
| `headline` | 24px | 22px | 1.3 | Fraunces | 400 | -0.005em |
| `body-lg` | 20px | 18px | 1.6 | Inter | 400 | 0 |
| `body-md` | 16px | 16px | 1.6 | Inter | 400 | 0 |
| `body-sm` | 14px | 14px | 1.55 | Inter | 400 | 0 |
| `caption` | 12px | 12px | 1.5 | Inter | 500 | 0.04em |
| `label` | 10-11px | 10-11px | 1.4 | Inter | 500 | 0.4em |
| `mono-md` | 14px | 14px | 1.5 | Mono | 400 | 0 |
| `mono-sm` | 12px | 12px | 1.5 | Mono | 400 | 0 |

### Headline-Regeln
- **NIEMALS Bold-Weights für Display.** Light (300) oder Regular (400) only.
- **Niemals Uppercase außer:** Mikro-Labels (`label`-Token), Section-Tags
- **Sentence-Case** für Headlines (deutsch: erstes Wort + Eigennamen großgeschrieben)
- **Staggered Indent** für 3-Zeilen-Headlines:
  ```
  WORT EINS
        WORT ZWEI    ← 1-2 Spalten eingerückt
  WORT DREI
  ```

### Hierarchy-Pattern (Mini-Label + Display)
Pro Section-Einstieg:
```
LABEL (label-Token, gold-deep, uppercase, tracking 0.4em)
↓ 16-24px Spacing ↓
HEADLINE (display-md bis display-2xl je nach Section)
```

### Forbidden Patterns
- ❌ Mehrere Bold-Hierarchien innerhalb einer Headline
- ❌ Display-Sizes < 32px (das ist dann Headline, nicht Display)
- ❌ Body-Text in Display-Font
- ❌ Mono-Font für nicht-numerische/technische Inhalte
- ❌ Italic für Hervorhebung (außer in Editorial-Pull-Quotes)

---

## 3. Spacing-System (8pt Base)

### Skala
```
0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 192, 256
```
Jedes andere Maß ist verboten. Keine 13px, keine 22px.

### Section-Padding (vertikal)
| Context | Mobile | Desktop |
|---|---|---|
| Tight Section | 64px | 96px |
| Normal Section | 96px | 144px |
| Generous Section | 128px | 192px |
| Hero / Cinematic | 0 (full-bleed) | 0 |

### Internal Component Padding
| Component | Mobile | Desktop |
|---|---|---|
| Card (Solid) | 24px | 32-48px |
| Card (Image) | 0 (image full-bleed) | 0 |
| Button | 12px × 24px | 14px × 28px |
| Input | 14px × 16px | 16px × 18px |

### Type-Spacing
- Label → Headline: 16-24px
- Headline → Sub-Headline: 12-16px
- Sub-Headline → Body: 32-48px
- Body Paragraphs: 16-24px between

### Grid
- Max-Width Container: 1440px
- Hero / Cinematic: Full-Bleed
- Reading Column (Article, Legal): max-width 680px
- Gutter: 24px mobile, 32px desktop

---

## 4. Card-System

### Globale Regeln
1. **Niemals Borders.** Punkt.
2. Hierarchy nur durch Shadow oder Background-Color-Shift.
3. Radius: 16-24px (mittel), niemals 4px oder 32+px
4. Rounded corners durchgängig konsistent pro Card-Typ

### Card-Typen

#### Bild-Karte (Image-as-Card)
- Bild ist Full-Bleed in Card-Hülle
- Text-Overlay unten mit subtilem Gradient (`from-shadow/80 to-transparent`)
- Hover: Bild scale 1.04, Shadow `shadow-card-hover`
- Beispiel: Vehicle-Cards in /kollektion

#### Solid-Karte
- White Fill (`canvas-raised`) auf canvas Background
- Padding 32-48px internal
- Shadow: `shadow-card-rest` default, `shadow-card-hover` on hover
- Beispiel: Stat-Cards in Versprechen-Akt

#### Floating-Karte (Asymmetric Break-Out)
- Wie Solid-Karte, aber `shadow-card-floating`
- Bricht aus Grid (überlappt nächste Sektion, oder bricht in Image-Container)
- Max 1× pro Section
- Beispiel: "5 Spezialisten" Sub-Card in Atelier-Akt

#### Frame-Loose (gar keine Card)
- Bild + Text frei, getrennt nur durch Whitespace
- Keine Container-Card, keine Shadow
- Beispiel: Editorial-Stack in /kollektion (Akt 4)

### Shadow-Tokens (3 Stufen)
```css
--shadow-card-rest:     0 2px 8px -2px rgba(26, 22, 18, 0.06);
--shadow-card-hover:    0 12px 24px -8px rgba(26, 22, 18, 0.14);
--shadow-card-floating: 0 24px 48px -12px rgba(26, 22, 18, 0.18);
```

---

## 5. Motion-System

### Signature Easing
```css
--ease-prestige: cubic-bezier(0.65, 0, 0.35, 1);
```
**Eine Kurve, durchgängig.** Andere Easings nur in begründeten Ausnahmen.

### Duration-Skala
| Token | ms | Verwendung |
|---|---|---|
| `duration-micro` | 200ms | Hover, Button-Press |
| `duration-fast` | 300ms | Color Transitions, Input Focus |
| `duration-medium` | 600ms | Reveal Elements, Card Hover Lift |
| `duration-slow` | 900ms | Section Reveals, Big Components |
| `duration-cinematic` | 1.2-1.6s | Hero-Transitions, Tor-Reveal |
| `duration-scrub` | scroll-linked | Scroll-Driven Pin-Animations |

### Motion-Regeln
1. **Nichts animiert ohne Erzählgrund.**
2. **Hover:** Lift + Shadow deepen. Niemals Border-Appear, niemals Color-Wechsel von Card-Background.
3. **Scroll-Driven Animations:** ScrollY + requestAnimationFrame ODER native CSS scroll-driven (wenn breit unterstützt — siehe [06-tech.md](./06-tech.md))
4. **Page Transitions:** View Transitions API für Shared-Element-Transitions (Card → Detail)
5. **Reduced-Motion strikt respektiert** — kein "etwas weniger", sondern **alle non-essential Motion aus**

### Verbotene Motion-Patterns
- ❌ Generic `fade-in-up` auf jedes Element ohne Grund
- ❌ Parallax-Backgrounds (außer in cinematic acts)
- ❌ Auto-Play Carousels
- ❌ Bouncing CTAs ("Click me!")
- ❌ Excessive blur transitions
- ❌ Anything synchronized to music (we don't have music)

### Hover-Patterns (verbindlich)
- **Image-Cards:** Bild scale `1.04`, shadow vertieft → `shadow-card-hover`
- **Text-Links:** Color subtle wechsel zu `gold-deep`, optional 1px underline-fade-in
- **Buttons (Primary):** Background opacity-Stufe (`bg-ink` → `bg-ink-soft`), kein Skalieren
- **Buttons (Secondary):** Border subtile zu `gold-deep`
- **Icons:** Color-Wechsel oder leichter scale `1.08`

---

## 6. Photography-Direction

### House Look (verbindlich für jedes Foto)
- **Lichtsetzung:** Hauptlicht von schräg-oben, warm
- **Farbgrading:** Warm Highlights, controlled Shadows, niedrige Saturation
- **Hintergrund:** Studio dark warm gray ODER outdoor warm natural light
- **Atmosphäre:** Dokumentarisch, editorial, ruhig
- **Verboten:** Lens Flares, HDR, übersättigte Filter, Instagram-Pop

### Format-System (starr)
| Context | Aspect Ratio | Min Resolution |
|---|---|---|
| Hero Desktop | 16:9 | 3000×1688 |
| Hero Mobile | 9:16 | 1080×1920 |
| Vehicle Card | 16:10 | 1920×1200 |
| Vehicle Detail Gallery | 16:9, 16:10, 4:5 | 2400×... |
| Portrait (Team, Customer) | 4:5 | 1200×1500 |
| Square (Detail Crop) | 1:1 | 1600×1600 |
| Cinematic Banner | 21:9 | 2520×1080 |

### AI-Generated Assets (V1)
- GPT-Image (Image 2) für Stills
- Kling AI für 5-15s Videos
- **Pflicht-Disclosure** auf jeder Page mit AI-Bildern: dezenter Footer-Hinweis "Einige Visuals sind KI-generiert und werden sukzessive durch Originalaufnahmen ersetzt."
- **Per-Image Disclosure** wo eine Person zu sehen ist (EU AI Act Article 50)

### Photography Asset-Pipeline
- Originale in `/public/assets/{folder}/[name].jpg` (oder Cloudinary V1.5)
- Next.js Image-Component PFLICHT (`<Image>` from `next/image`)
- AVIF primary, WebP fallback automatisch via Vercel

---

## 7. Iconography

### V1 Setup
- **Lucide-React** (Free, gut, schon installiert) — als Default
- **Custom Icons** für High-Visibility-Stellen (Logo-Monogramm später, Live-Präsenz-Dot, WhatsApp-Icon)

### Icon-Regeln
- **Größe:** 16px, 20px, 24px (8pt-multiples)
- **Stroke:** 1.5px für 16-24px Größen, 2px nur für sehr klein (12px)
- **Color:** Inherit von text-color (nie hardcoded)
- **Verboten in V1:** Solid/Filled Icons (außer Status-Indicators wie "Verkauft")

### Pflicht-Replacements V2
Diese Lucide-Icons werden später durch custom-designed Versionen ersetzt:
- Telefon (Phone)
- WhatsApp
- Kalender (Terminbuchung)
- Pin (Standort)
- Logo-Monogramm "PS"

---

## 8. Interaktion-Patterns

### Buttons
| Variant | Style | Verwendung |
|---|---|---|
| Primary | Dark Fill (`bg-ink`), white text, rounded-full | Main CTAs ("Sprechen wir") |
| Secondary | Transparent + dark text, optional thin border on hover only | Secondary CTAs ("Mehr sehen") |
| Tertiary / Link | Text only, gold-deep hover | Inline Links |

**Pill-Form (rounded-full)** für Primary + Secondary CTAs. Rectangular nur für Form-Inputs.

### Form-Inputs
- **Kein Border-Style.** Stattdessen subtle `bg-canvas-soft` Fill auf canvas Background.
- **Underline-Style** für minimal Inputs (Newsletter Sign-up auf Light)
- **Focus:** Patina-Glow (gold outline 2px, offset 3px) — NIEMALS hartes Outline
- **Placeholder:** `ink-muted`, niemals dasselbe wie Label

### Tooltips & Hints
- **Existieren nicht** in V1. Wenn UI Erklärung braucht, ist UI falsch.
- Ausnahme: Inspection Vault Hotspots — dort sind Tooltips inhärent

### Loading-States
- **Skeleton-Loader** statt Spinner
- Newer-Image-Load: subtle blur-up via Next/Image placeholder="blur"
- Form-Submit: Button-State wechselt zu "Wird gesendet..." (kein Spinner)

### Modals & Lightboxes
- Native `<dialog>` Element wo möglich (Keyboard-A11y umsonst)
- ESC zum schließen
- Click outside zum schließen
- Animation: fade-in + scale-95→100 in 300ms `var(--ease-prestige)`

---

## 9. Cursor (V2 — V1 skip)
- Custom-Cursor in Image-Hover-Bereichen ("Sehen" / "Drehen" / "Sprechen")
- Sparsam: max 3 Cursor-Variants in der ganzen Site
- Fallback: Standard-Cursor

---

## 10. Sound (Optional, V1.5)

### Verwendungs-Regeln
- **Default OFF**, Mute-Toggle prominent
- Maximum 1 Sound-Event pro Session (Akt 1 Engine-Klick)
- Niemals Auto-Play mit Sound
- Niemals Background-Music
- Sound-Source: Lizenzfrei oder selbst aufgenommen (kein YouTube-Audio-Clipping)

---

## 11. Component-Bibliothek (Soll-Inventar)

Diese Komponenten werden gebaut und in `/src/components/` organisiert:

### Sections (`/src/components/sections/`)
- `TorReveal.tsx` ✅ (Akt 1)
- `WeeklyShowcase.tsx` (Akt 2)
- `BackgroundCrossfade.tsx` (Akt 3 Übergänge)
- `CollectionStack.tsx` (Akt 4 — Vertikaler Editorial Stack)
- `InspectionVault.tsx` (Akt 5 + auch in Detail-Page)
- `AtelierBlock.tsx` (Akt 6)
- `HeritageCountUp.tsx` (Akt 7)
- `CustomerStoryPin.tsx` (Akt 8)
- `JournalTeaser.tsx` (Akt 9)
- `Concierge.tsx` (Akt 10 + auch in /kontakt)
- `BrandStatementFooter.tsx` (Footer)

### UI Primitives (`/src/components/ui/`)
- `Button.tsx` (Primary, Secondary, Tertiary variants)
- `Card.tsx` (Image, Solid, Floating, FrameLoose variants)
- `Input.tsx`
- `Dialog.tsx` (Native dialog wrapper)
- `EditorialQuote.tsx`
- `MonoSpec.tsx`
- `MiniLabel.tsx`
- `StaggeredHeadline.tsx`
- `ImageGallery.tsx` (Lightbox-enabled)
- `LivePresenceIndicator.tsx`
- `WhatsAppQR.tsx`

### Composite Patterns (`/src/components/patterns/`)
- `AsymmetricImageText.tsx` (Akt 6 / Detail-Page-Blocks)
- `PinnedScrollScrubber.tsx` (für Akt 2, 8)
- `ScrollDrivenCounter.tsx` (für Akt 7 Count-Up)
- `ProvenanceCard.tsx` (Detail-Page Dokument-Scans)
- `VehicleHero.tsx` (Detail-Page Block 1)

### Layout (`/src/components/layout/`)
- `Header.tsx` (✅ existiert, refresh nötig — context-aware Light/Dark)
- `Footer.tsx` (refresh)
- `MobilePill.tsx` (sticky Call/WhatsApp on Detail-Pages)
- `SkipLink.tsx` (✅ in layout.tsx)

---

## 12. Globale Tokens-File (`/src/app/globals.css`)

✅ Bereits implementiert. Siehe [globals.css](../src/app/globals.css).

Erweitert wird in V1.5 durch:
- Container-Query-Tokens (`@container` based responsive)
- View-Transitions CSS für Page-Transitions
- Scroll-Driven Animation Definitions (wenn Browser-Support reift)

---

## 13. Design-System-Anti-Patterns (Code-Review Block-Liste)

Folgendes wird in Code-Reviews abgelehnt:

- `border: 1px solid` auf Cards
- Inline Hex-Color statt Token
- `font-weight: 700` oder höher in Headlines
- `text-transform: uppercase` außer für Mikro-Labels
- `transition: all 0.3s` (zu generisch, spezifizieren)
- Hardcoded `box-shadow: 0 1px 2px rgba(0,0,0,0.1)` statt Shadow-Token
- `font-family: 'Inter'` inline statt Token-Variable
- `width: 100vw` ohne overflow-x:hidden Konsequenz
- Tailwind Default-Colors wie `text-gray-500` (verwende `text-ink-muted`)

---

## Was diese Doc NICHT abdeckt

- **Performance-Targets:** → [06-tech.md](./06-tech.md)
- **A11y-Spec:** → [06-tech.md](./06-tech.md)
- **Tonalität Copy:** → [08-content.md](./08-content.md)
