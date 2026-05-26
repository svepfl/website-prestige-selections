# BRAND — Prestige Selections

> Single-Source-Of-Truth für visuelle Brand-Identität.
> **Pflicht-Lese vor jedem Bild-, Atmospheric- oder Illustrations-Asset.**
> **Pflicht-Mit-Brief** bei externen Fotografen / Illustratoren / 3D-Artists.
>
> Diese Datei bündelt — verteilte Tiefe-Files siehe Section 12 (Path-Mapping).
>
> Last updated: 2026-05-23

---

## 1. Identität in 3 Sätzen

- **Was wir sind:** Kuratierter High-End-Fahrzeug-Handel in Freiburg im Breisgau, geführt von Jérôme Gay (seit 2012). Wir vermitteln moderne Hypercars, klassische Ferraris, britische Grand Tourer und Ultra-Luxus-Limousinen an Sammler in DACH + Norditalien.
- **Was wir nicht sind:** Kein mobile.de-Volumen-Händler. Kein Auto-Showroom mit Banner-Sale. Kein "exklusiv & einzigartig"-Marketing-Sprech.
- **Was uns trennt:** Christie's-Niveau für Fahrzeug-Detail-Pages, Tom-Hartley-Jnr-Editorial-Discipline für die Marken-Sprache, persönliche Bewertung jedes Fahrzeugs durch Jérôme — keine Aufnahme ohne seine Freigabe.

---

## 2. Reference-Brands (visuelle Pole)

- **Tom Hartley Jnr** — Editorial-Restraint, persönliche Founder-Voice, dokumentarische Fahrzeug-Fotografie
- **Singer Vehicle Design** — Material-Photography-Detail, Schwarz-Weiß-Editorial-Ernst, Craft-Storytelling
- **Hodinkee** — Macro-Detail-Photography, Heritage-Voice, Magazin-Tier-Long-Form-Editorial
- **Aesop** — Whitespace, restrained Typography, Apothecary-Editorial-Tone
- **Bottega Veneta** (Daniel Lee era) — Material-Luxus ohne Logo-Schreien, Quiet-Confidence

**Nicht-Referenzen (bewusst vermeiden):**
- ❌ Sotheby's — visuell veraltet, zu traditional-auction
- ❌ DuPont Registry — Volumen-Listing-Aesthetic
- ❌ Robb Report — zu "Lifestyle-Magazin"
- ❌ Volume-Dealer-Sites — Banner-Sale-Energie

---

## 3. Color-Palette

**Source-of-Truth Hex:** `src/app/globals.css` (Tailwind `@theme inline`)

| Token | Hex | Anwendung |
|---|---|---|
| `--color-gold` | #C49A0C | Brand-Akzent, niemals als Gradient |
| `--color-gold-deep` | #8C6D08 | Hover, patinated gold variants |
| `--color-canvas` | #F2EDE3 | Default Light-Background |
| `--color-canvas-raised` | #FBF8F2 | Light-Cards |
| `--color-canvas-soft` | #E8E0D2 | Sub-Backgrounds, Dividers |
| `--color-ink` | #1A1612 | Text Default |
| `--color-ink-soft` | #4A3F35 | Body Secondary |
| `--color-ink-muted` | #8B7B6A | Labels, Captions |
| `--color-shadow` | #15110D | Cinema Dark Sections |
| `--color-shadow-soft` | #2B2520 | Dark Cards |
| `--color-shadow-border` | #3D342C | Dark Sub-Tones |
| `--color-on-shadow` | #F2EDE3 | Text auf dunklem Hintergrund |

**Atmospheric-Extension** (nur für Asset-Generierung, nicht im UI-Code):

Dark-Family:
- Cognac #8C5028 (mid-warm transition)
- Cognac-Light #A0683A (leather highlight crest)
- Walnut-Dark #4A3520 (mid-shadow)
- Walnut-Deep #6B3D1F (deeper warm shadow before charcoal)

Light-Family:
- Sandstone #C8A878 (light-section warmth)
- Sandstone-Mid #8B7560 (stone veining mid-tone)
- Sandstone-Deep #6B5C45 (stone shadow recess)
- Patina-Cream-Light #E8DCC4 (warmer highlight than canvas-soft)

Period-Authentic (NUR für Historic-Artifact-Assets, z.B. Karten):
- Aged-Paper #E8D9B8
- Sepia-Ink #3A2A18
- Coffee-Stain #8C6F47
- Paper-Edge-Weathering #B89878

→ Diese Atmospheric-Extension-Werte sind die EINZIGEN erlaubten Mid-Tones
zwischen Brand-Tokens. Keine erfundenen Zwischenwerte in Prompts.

**Verbotene Color-Familien:**
- ❌ Stripe-Purple/Pink/Cyan-Iridescent
- ❌ Neon, Synthetic-Saturation
- ❌ Cool-Blue, Cool-Silver (Industrial-Tech-Look)
- ❌ Instagram-HDR-Orange
- ❌ Hollywood-Golden-Hour-Saturation

---

## 4. Typography-Family

- **Display:** Newsreader (Google Fonts via next/font) — Light/Regular + Italic. Signature-Flourish-only (Pull-Quotes, Founder-Attribution). Niemals Bold.
- **Sans:** Geist Sans — Display-Headlines UPPERCASE Bold + UI-Body Regular
- **Mono:** Geist Mono — Specs, Lot-Marker, Edition-Marks, Tabular-Nums

**Hierarchie-Regel:** Geist Sans Bold UPPERCASE dominiert als Display, Newsreader Italic ist Akzent (max 1× pro Section).

→ Tiefe: `.claude/rules/design-system.md`

---

## 5. Material-Vokabular

Die Materialien die in der Prestige-Welt visuell existieren:

- **Walnut-Burr-Veneer** — Dashboard-Material klassischer Grand Tourer
- **Cognac Saddle Leather / Shell Cordovan** — Heritage-Sattlerei, Aston Martin Interieurs
- **Brushed Aluminium** — Schalt-Surround, Premium-Watch-Casebacks
- **Carbon-Fibre-Weave** — Aston DBS Carbon-Package, Ferrari Atelier
- **Polished Black Automotive Lacquer** — Onyx-Paint mit Tiefe
- **Raw Polished Concrete** — Atelier-Floors, Industrial-Loft
- **Freiburg Sandstone (Buntsandstein)** — Münster-Region, Schwarzwald-Edge
- **Aged Oak Workbenches** — Atelier-Möbel
- **Vintage Bakelite** — Phone-Receivers, Vintage-Instruments
- **Patinated Brass** — Aged Hardware-Details

**Verbotene Materialien in Brand-Assets:**
- ❌ Plastik mit synthetischem Glanz
- ❌ Chrome-Bling (high-shine machined chrome)
- ❌ Glas mit blauen Refraktionen
- ❌ Acrylglas-Plexi-Look
- ❌ Modern weiße Lab-Surfaces

---

## 6. Light-Direction

- **Qualität:** Warm directional daylight, South-Baden-Quality (soft Black-Forest-overcast ODER golden hour durch Schwarzwald-Konifere)
- **Stunde:** Late golden hour OR soft warm overhead
- **Source-Position:** Meistens upper-left, manchmal upper-right — niemals frontal-flat
- **Verboten:** HDR, Lens-Flares, High-Contrast-Push, Blown Highlights, Drohnen-Sonnenuntergang-Klischee, Hollywood-Orange-Grading

---

## 7. Form-Family

**Form-Family-Name:** Sculptural-Warm-Diffusion

**Beschreibung:** Für Atmospherics + Illustrationen gilt eine durchgängige Form-Sprache. Konzentrierte warme Diffusion mit weichen organischen Übergängen — niemals harte Geometrie, niemals symmetrische Kompositionen.

**Erlaubte Form-Charakteristika:**
- ✅ Soft volumetric blooms mit graduellen Alpha-Übergängen
- ✅ Organische Sculptural-Masses (warm resin/amber/light-flow)
- ✅ Extreme Material-Macros so close dass Form-Identität verschwindet
- ✅ Off-axis Drittel-Regel-Kompositionen
- ✅ Diagonal-Flow upper-left → lower-right

**Verbotene Form-Charakteristika:**
- ❌ Harte geometrische Edges
- ❌ Symmetrisch zentrierte Kompositionen
- ❌ Stripe-Mesh-Pattern (purple/iridescent)
- ❌ Sphäre/Orb/Bubble (zu wörtlich)
- ❌ Cloth-/Fabric-Drape-Renderings
- ❌ Sci-Fi-Glow-Aesthetic

→ Tiefe: `~/.claude/skills/top-web/rules/10-abstract-backgrounds.md`

---

## 8. Grain-Stärke

- **Standard-Grain:** 8% (35mm Film-Grain)
- **Light-Section-Variant:** 6% (light sections need lighter grain)
- **Float-Object-Variant:** 4-5% (clean alpha edges)
- **Anwendung:** Auf jedem Atmospheric, jedem Photo-Render, jedem Illustration-Asset
- **Niemals weglassen** — Grain-freier Render = 2019-Look

---

## 9. Geographic-Identity

- **Ort:** Engesserstraße 1, Freiburg im Breisgau (79108) — Industrie-Westen, Schwarzwald-Edge
- **Region:** South-Baden, Markgräflerland-Süden, French-German cultural intersection
- **Wahrnehmbare Charakteristika in Assets (subtle hints only):**
  - Warmer Freiburger Buntsandstein
  - Schwarzwald-Misty-Conifer-Depth
  - South-Baden-Light-Quality (soft directional warmth)
  - Markgräflerland-Vineyard-Hügel
  - Sales-Corridor: Freiburg → Zürich → St. Moritz → Milan → Maranello

**Verbotene Klischees:**
- ❌ Lederhose, Kuckucksuhren, Schwarzwald-Trachten
- ❌ Cliché Bavarian/Alpine imagery
- ❌ Fastnacht, Karneval, Volksfest
- ❌ Stereotyp deutsche Architektur (Fachwerk)
- ❌ "Black-Forest-Cake"-Visual-Tropes

---

## 10. Tonality-Anker (mentale Bilder)

Die 7 mentalen Anker bei jeder Asset-Entscheidung:

1. **Käufer ist 54, Sammler, 2M+ Net Worth, 3-sprachig, erwartet Diskretion** — visueller Effekt: nichts "shouts"
2. **Tom Hartley Jnr ist Vorbild** — Editorial-Authority, persönliche Founder-Stimme
3. **Christie's-Niveau für VDPs** — Provenance-Documentation-Ernst
4. **Koenigsegg + Apple als Motion-Referenz** — präzise, restrained, niemals demonstrativ
5. **Aesop / Bottega Veneta für Editorial-Restraint** — Whitespace ist Status
6. **"Außergewöhnliche Automobile. Aus Freiburg."** — die Tagline ist Leitstern
7. **Hodinkee × Singer × Tom Hartley × Aesop × Bottega** — die visuelle Sprache

---

## 11. Anti-Patterns (visuell)

❌ HDR-Push, Lens-Flares, übertriebene Schärfung
❌ Linsen-Klischee Drohnen-Sonnenuntergang-Berg-Shots
❌ Auto-Carousel-Hero mit Auto-Play
❌ Newsletter-Popup beim ersten Besuch
❌ Carbon-Bling, Chrome-Bling, Polished-Bling
❌ Spinning Loaders überall, Bouncing CTAs, Pulsing Indicators
❌ Generic 3-Spalten-Grid, "Hero + 3 Cards + CTA"-Layout
❌ Stripe-Purple-Mesh-Gradients oder ähnliche fremde Brand-Sprache
❌ Stock-Image-Top-100-Photography
❌ Centered Symmetrical Composition
❌ Border auf Cards (immer Shadow-Tokens nutzen)
❌ Generic Hex außerhalb der Token-Liste

---

## 12. Conversion-Architektur

> Conversion ist Architektur, nicht Optimierung. Wenn die Site schön ist
> aber nicht konvertiert → Portfolio-Stück, kein Geschäftsprojekt.

### Primary KPIs

| Page-Type | Primary KPI | Mikro-Conversion |
|---|---|---|
| Homepage | Vehicle-Inquiry über Concierge / Phone-Click | Newsletter-Signup, Saved-Vehicle |
| Vehicle-Detail (VDP) | Lead pro Vehicle (Inquiry-Form / Phone / WhatsApp) | Saved-Vehicle, PDF-Download |
| /verkaufen (Ankauf) | Bewertungs-Anfrage (Vehicle-Submission-Form) | Phone-Click, Email |
| /werkstatt (Atelier) | Termin-Anfrage | Process-PDF-Download |
| /kontakt | Multi-Channel-Contact-Click | Karte-Click, Calendar-Booking |
| /haus | Newsletter / Vertrauensaufbau für späteren Lead | Newsletter |
| /journal (V2) | Engagement (Read-Time, Cross-Link-Click) | Newsletter-Signup |

### Conversion-Funnel-Stufen (Sammler-Buyer-Journey)

1. **Awareness** — Sammler entdeckt Prestige über Google/AEO/Reco → Homepage
2. **Trust-Build** — Liest Founder-Voice (EineStimme), sieht Process (Methode), prüft Heritage (Spuren)
3. **Curation-Scan** — Schaufenster sticky-scroll, weiter zu /fahrzeuge oder VDP
4. **Vehicle-Evaluation** — VDP mit Specs, Provenance, Editorial, 142-Inspektion
5. **Mikro-Commitment** — Saved-Vehicle, Newsletter-Signup, Phone-Click
6. **Macro-Inquiry** — Vehicle-Lead via Inquiry-Form oder WhatsApp
7. **First-Contact** — Jérômes persönliche Antwort innerhalb 24h
8. **Termin / Vermittlung** — Showroom-Visit oder remote Übergabe

### Trust-Layer-Asset-Liste (Pflicht für Production)

- Echtes Jérôme-Foto (Founder-Portrait Engesserstraße)
- Echte Building-Fotos außen + innen (Engesserstraße 1)
- 3+ Customer-Reviews mit Vorname + Initial + Auto + Stadt
  ("M. K. — DBS Carbon, München")
- 142-Punkte-Inspektion als visualisierte Liste / Story
- 14 Jahre · 900+ vermittelt · 7 Marken — Stats (sind bereits in EineStimme)
- Live Showroom-Status (open/closed) in Header + Footer
- Lokale Adresse präsent — Engesserstraße 1, Freiburg

### CTA-Voice-Mapping (verbindlich)

| Sprache | Primary | Secondary | Confirm | 404/Empty |
|---|---|---|---|---|
| DE | "Sprechen wir." | "Mehr sehen" / "Vorab. Vor allen anderen." | "Angekommen. Wir melden uns." | "Diese Seite existiert nicht. Aber dreißig andere schon." |
| EN | "Let's talk." | "See more" / "Early. Before everyone else." | "Received. We'll be in touch." | "This page does not exist. But thirty others do." |
| FR | "Parlons-en." | "Voir plus" / "En avant-première." | "Bien reçu. Nous vous recontactons." | "Cette page n'existe pas. Mais trente autres oui." |

### Friction-Removal-Patterns (Pflicht)

- Phone-Number sichtbar in Header (auch im scroll-state)
- MobileStickyCTA (Phone + Termin) auf jeder Page
- Multi-Channel-Contact-Grid auf VDP (Phone + WhatsApp + Email + Calendar)
- Inquiry-Form max 5 Felder (Name, Email/Phone, Fahrzeug, Botschaft, DSGVO)
- Saved-Vehicle account-less (Sessionstorage)
- Newsletter mit konkretem Versprechen ("Vorab. Vor allen anderen.")

### Conversion-Anti-Patterns (Brand-Lethal)

❌ Newsletter-Popup beim Erstbesuch
❌ Exit-Intent-Modal
❌ Scarcity-Tricks ("Nur noch 2 verfügbar!")
❌ Countdown-Timer
❌ Bouncing Chat-Bubble
❌ Auto-Play-Video mit Ton
❌ Generic CTA ("Jetzt anfragen!", "Click hier")
❌ Stock-Photography in Trust-Sections

### AEO/GEO-Conversion (2026-Pflicht)

- Schema.org auf JEDER Page (AutoDealer, Vehicle, Product, Person, ContactPage, FAQPage)
- E-E-A-T-Signal in Founder-Section + Detail-Pages
- Named Entities hochfrequent (Prestige Selections, Jérôme Gay, Engesserstraße, Freiburg, +7 Brands)
- FAQ-Schema strukturiert mit häufigen Sammler-Fragen
- AI-Crawler-Allowlist in robots.ts (bereits implementiert)
- Live-Inventory-API für AI-Cite-Worthiness (V2)

### Measurement (DSGVO-konform, post-consent)

- Primary KPI Tracking via lightweight analytics (Plausible / vergleichbar)
- Friction-Map: wo brechen User ab? (Heatmap nur opt-in)
- A/B-Test bei kritischen Conversion-Points (nicht aesthetic-shifts)
- Conversion-Rate-Ziel Phase 1: 2% Lead pro Vehicle-View
- Phone-Click-Tracking als secondary signal

→ Tiefe: [`.claude/rules/conversion-goals.md`](.claude/rules/conversion-goals.md) +
[`~/.claude/skills/top-web/rules/12-conversion.md`](file:///Users/svenpflueger/.claude/skills/top-web/rules/12-conversion.md)

---

## 13. Path-Mapping (Tiefe-Files)

| Thema | Pfad |
|---|---|
| **Code-Tokens** (canonical Hex / Spacing / Easing) | `src/app/globals.css` |
| **Section-Konstanten** (Padding, Max-Width) | `src/lib/section-constants.ts` |
| **Design-System-Doku** | `KONZEPT/05-design-system.md` |
| **Design-System Path-scoped Rules** | `.claude/rules/design-system.md` |
| **Photography-Direction (V1)** | `asset-brief-v2.md` |
| **Voice + Mikrocopy** | `KONZEPT/08-content.md` + `.claude/rules/copy-voice.md` |
| **Anti-Template-Prinzipien** | `.claude/rules/anti-template.md` + `KONZEPT/00-README.md` |
| **Conversion-Goals** | `.claude/rules/conversion-goals.md` + `KONZEPT/07-conversion.md` |
| **Atmospheric-Leitplanken** | `KONZEPT/gpt-image-2-prompts-prestige.md` |
| **Atmospheric-Session-Outputs** | `KONZEPT/sessions/atmospheric-*.md` |
| **Master-Konzept 2026** | `KONZEPT/00-MASTER-2026.md` |
| **Roadmap / Build-Sequence** | `KONZEPT/10-roadmap.md` |

---

## Workflow-Reihenfolge bei Asset-Generierung

1. **BRAND.md lesen** (diese Datei, jedes Mal frisch, nicht aus Memory)
2. **Spezifische Rule lesen** (z.B. `10-abstract-backgrounds.md` für Atmospherics)
3. **Asset-Brief frisch schreiben** mit Referenz auf BRAND.md (keine Inline-Duplikation)
4. **Generieren** (GPT Image 2, Foto-Shooting, Illustration)
5. **Quality-Check gegen BRAND.md** — alle Sektionen prüfen
6. **Asset speichern** an definiertem Pfad

Bei Konflikt: `globals.css` wins für technische Werte, BRAND.md wins für visuelle Interpretation.

---

## Update-Log

| Datum | Änderung | Person |
|---|---|---|
| 2026-05-23 | Initial BRAND.md angelegt, konsolidiert aus 9 verteilten Files | Sven + Claude |
