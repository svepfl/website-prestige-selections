# AI-Asset-Briefs — GPT Image 2 + Kling 3.0

> Prompts und Spezifikationen für AI-generierte Assets. Jeder Brief ist ready-to-paste in das jeweilige Tool. Outputs gehören in `/public/assets/{folder}/` mit den dort genannten Dateinamen.

**Brand-Tonalität für ALLE Outputs:**
- Editorial-Premium (NICHT mainstream-marketing)
- Referenzen: Singer Vehicle Design · Tom Hartley Jnr · Hodinkee · Octane Magazine
- Warm-natural Licht (kein HDR, kein Instagram-Filter)
- Gedämpfte Saturation, controlled Shadows
- Keine Lens-Flares, keine schreienden Farben
- Wenn Gold-Akzent: `#C49A0C` oder `#8C6D08` (gold-deep), niemals Neon

---

## 🥇 PRIORITÄT 1 — 5 Vehicle-Cutouts (GPT Image 2)

**Wofür:** CollectionHero Stage-Cards auf `/fahrzeuge`. Freigestellte Wagen schweben auf canvas-raised Cards mit subtle ground-shadow.

**Dateinamen → `/public/assets/cutouts/`:**
```
aston-martin-dbs.png
ferrari-sf90-spider.png
porsche-panamera-turbo.png
maserati-mc20.png
rolls-royce-cullinan.png
```

**Spec pro Bild:**
- 1600×900px
- PNG mit transparentem Background
- Wagen in 3/4-Ansicht (vorne-seitlich), schräg von rechts oder links
- Realistischer Bodenschatten freigestellt mitkopiert (kein scharfer Cut-Off)
- Wagen mittig-untig im Frame, kein Cropping

**Prompt-Template (anpassen pro Wagen):**
```
A studio product photograph of a {{MODEL}} sports car in {{COLOR}}, 
3/4 front view from the right side. The car is the only subject, 
completely isolated on a fully transparent background. Soft, natural 
warm lighting from above-left. Realistic subtle ground shadow beneath 
the car. No reflections except minimal on body. The image should look 
like a high-end automotive magazine product shot — editorial, restrained, 
not glossy marketing. Render at 16:9 aspect ratio. Output PNG with 
transparent background.
```

**Per Wagen:**
| Filename | MODEL | COLOR | Spez |
|---|---|---|---|
| `aston-martin-dbs.png` | Aston Martin DBS Superleggera | British Racing Green | Coupé, Carbon-Paket sichtbar |
| `ferrari-sf90-spider.png` | Ferrari SF90 Spider | Rosso Corsa | Cabrio, Dach offen |
| `porsche-panamera-turbo.png` | Porsche Panamera Turbo | Achatgrau Metallic | Limousine |
| `maserati-mc20.png` | Maserati MC20 | Bianco Audace | Coupé, Schmetterlingstüren leicht angedeutet |
| `rolls-royce-cullinan.png` | Rolls-Royce Cullinan | Black Diamond | SUV, Spirit-of-Ecstasy sichtbar |

---

## 🥇 PRIORITÄT 2 — 142-Prüfpunkte Blueprint (GPT Image 2)

**Wofür:** Ersetzt den Code-rendered Dot-Grid in `Methode.tsx`. Hand-drawn Blueprint-Stil wirkt sofort weniger AI-built.

**Dateiname → `/public/assets/illustrations/`:**
```
methode-142-blueprint.png
```

**Spec:**
- 1200×1200px (quadratisch)
- PNG mit transparentem Background
- Wagen-Outline als Pen-Stroke + 142 markierte Inspektions-Punkte (Nummern, Kreise, Zoom-Linien)
- Stil: technische Hand-Skizze auf transparentem Background, monochromatisch

**Prompt:**
```
A hand-drawn technical blueprint illustration of a sports car (silhouette 
profile view), rendered as a vintage engineering schematic. The car outline 
is drawn in thin gold-deep colored pen strokes (#8C6D08) on a fully transparent 
background. 142 small numbered inspection circles are scattered across the 
car: wheels, suspension points, engine bay, interior areas, exhaust, body 
panels, lights. Each circle has a tiny number (1-142) next to it. Some 
circles have thin connecting lines drawn to text annotations in the margins 
(brief technical terms like "tire wear", "compression", "VIN plate" — but 
keep these subtle). The whole composition feels like a Moleskine sketch by 
a master mechanic. NO color fills, only line work. Transparent background. 
1:1 aspect ratio.
```

---

## 🥈 PRIORITÄT 3 — Karte Europa "Spuren" (GPT Image 2)

**Wofür:** Ersetzt die Code-SVG TrailMap in `Spuren.tsx` mit warmem Vintage-Karten-Look.

**Dateiname → `/public/assets/illustrations/`:**
```
spuren-europa-karte.png
```

**Spec:**
- 2400×1400px (16:9.5)
- PNG mit transparentem Background ODER hellem canvas-Hintergrund
- Vintage Pen-and-Ink-Karte West-Europa mit Freiburg-zentrierten Routen

**Prompt:**
```
A vintage hand-drawn pen-and-ink map of Western Europe (Germany, France, 
Switzerland, Austria, Italy, Liechtenstein), drawn in the style of an early 
20th century cartographic illustration. Show country borders as thin sepia 
lines on a warm cream-colored background (or transparent). Mark Freiburg im 
Breisgau as the central point with a small gold-deep colored circle (#8C6D08). 
From Freiburg, draw five thin gold-deep arc lines connecting to: Zürich, 
München, Wien, Frankfurt, Genf. Each city is marked with a small circle and 
a typeset label in a vintage serif font. Add minor decorative elements: 
a compass rose in one corner, a faint mountain range silhouette for the 
Alps, very subtle wave lines for the lakes. The overall look should feel 
like a page from a Christie's catalog or a Singer Vehicle Design route map. 
Restrained, editorial, never busy. 16:9 aspect ratio.
```

---

## 🥈 PRIORITÄT 4 — 4-6 Sekunden Atelier-Hand-Loop (Kling 3.0)

**Wofür:** Atmospheric Background-Video für `Methode`-Section. Wagen-Inspektions-Detail in slow motion.

**Dateiname → `/public/assets/loops/`:**
```
methode-atelier-hand.mp4
```

**Spec:**
- 4-6 Sekunden Loop (seamless)
- 1920×1080 MP4 H.264
- Max 3 MB
- Ohne Ton

**Prompt:**
```
A close-up cinematic shot in an automotive atelier. A skilled mechanic's 
hands (no face visible, just hands and forearms in a clean dark grey work 
shirt) are slowly running across the door panel of a luxury sports car, 
checking the panel gap and paint finish with a precision gauge tool. The 
camera moves in extremely slow motion. The lighting is warm and directional 
from above, creating soft highlights on the car's metallic paint. The 
background is dark, slightly out of focus, suggesting workshop machinery. 
The mood is meditative, precise, premium-editorial. Color palette: deep 
shadows, warm wood tones, subtle gold reflections from overhead lighting. 
No text, no music. 6 seconds. The shot should loop seamlessly — end frame 
matches start frame.
```

---

## 🥉 PRIORITÄT 5 — Schwarzwald-Drone-Loop (Kling 3.0)

**Wofür:** Background-Video für `Eine Stimme`-Section hinter der Founder-Quote.

**Dateiname → `/public/assets/loops/`:**
```
eine-stimme-schwarzwald.mp4
```

**Spec:**
- 6-8 Sekunden Loop
- 1920×1080 MP4 H.264
- Max 3 MB

**Prompt:**
```
A slow aerial drone shot flying over a misty Black Forest road in southern 
Germany, early morning light. The camera moves smoothly forward above the 
empty winding asphalt road. Pine trees on both sides, low fog hanging 
between the trees. The light is cold-warm transitional (sunrise), with 
golden rays cutting through the fog. No vehicles in the shot. The aesthetic 
is editorial, cinematic, Octane Magazine — never overproduced or HDR. 
8 seconds. Loop seamlessly.
```

---

## 🥉 PRIORITÄT 6 — 4 Disziplin-Mini-Skizzen (GPT Image 2)

**Wofür:** Kleine Hand-Skizzen für jeden der 4 Service-Einträge in `Leistungen` (Kollektion · Ankauf · Atelier · Concierge).

**Dateinamen → `/public/assets/illustrations/`:**
```
leistungen-kollektion.png
leistungen-ankauf.png
leistungen-atelier.png
leistungen-concierge.png
```

**Spec pro Bild:**
- 400×400px (quadratisch)
- PNG mit transparentem Background
- Mini-Skizze, Pen-Stroke, gold-deep (#8C6D08)
- Stil: Moleskine-Hand-Zeichnung, schnell, gekonnt

**Prompts:**

`leistungen-kollektion.png`:
```
A simple hand-drawn pen sketch in gold-deep color (#8C6D08) on transparent 
background: a single classic sports car key (with a leather fob bearing a 
tiny engraved "P") shown in 3/4 view. Loose pen strokes, sketch style — 
like a sketch in a vintage Moleskine. 400×400 PNG transparent.
```

`leistungen-ankauf.png`:
```
A simple hand-drawn pen sketch in gold-deep color (#8C6D08) on transparent 
background: an open vintage notebook with a brief handwritten note "1A 
ZUSTAND" and a small price figure below. A pen lies diagonally across the 
page. Loose pen strokes, sketch style — Moleskine vibe. 400×400 PNG transparent.
```

`leistungen-atelier.png`:
```
A simple hand-drawn pen sketch in gold-deep color (#8C6D08) on transparent 
background: a single workshop wrench crossed with a small precision torque 
gauge. Loose pen strokes, sketch style. 400×400 PNG transparent.
```

`leistungen-concierge.png`:
```
A simple hand-drawn pen sketch in gold-deep color (#8C6D08) on transparent 
background: a vintage rotary telephone receiver in profile. Loose pen 
strokes, sketch style. 400×400 PNG transparent.
```

---

## 🥉 PRIORITÄT 7 — Engesserstraße Hausfront (GPT Image 2)

**Wofür:** Hintergrund-Asset für Concierge-Section. Architekturzeichnung der Showroom-Fassade.

**Dateiname → `/public/assets/illustrations/`:**
```
concierge-fassade.png
```

**Spec:**
- 1600×900px
- PNG mit transparentem Background ODER hellem Canvas
- Architektonische Linien-Zeichnung der Engesserstraße 1, Freiburg (Showroom-Gebäude)

**Prompt:**
```
A clean architectural line drawing of a modern luxury car showroom 
building facade — long horizontal building with large glass windows 
showing dimly-lit sports cars inside, flat roof, restrained signage 
"PRESTIGE" engraved in serif type above the entrance. The drawing is 
rendered in thin gold-deep pen strokes (#8C6D08) on a transparent 
background. No fills, only outlines. Editorial blueprint style. The 
perspective is straight-on elevation, like an architect's drawing. 
Includes subtle ground line and one tree silhouette on the left. 
16:9 aspect ratio.
```

---

## 📋 Implementation Sequence

Sobald du Assets droppst, sage Bescheid — ich slotte sie in den entsprechenden Komponenten ein. Die Pfade sind:

| Asset | Code-Slot |
|---|---|
| Vehicle Cutouts | `CollectionHero.tsx` → `VEHICLE_CUTOUT_PATH(vehicleId)` (bereits gewired) |
| 142-Blueprint | Methode-Section, ersetzt `<DotsGrid />` |
| Karte Europa | Spuren-Section, ersetzt `<TrailMap />` |
| Atelier-Loop | Methode-Section als `<video autoPlay loop muted>` Background |
| Schwarzwald-Loop | EineStimme-Section Background |
| Disziplin-Skizzen | Services.tsx, neben jedem Service-Eintrag |
| Fassade | Concierge-Section Background |

## 🚫 Brand-Don'ts für ALLE Outputs

- Keine schreienden Farben (Neon, Hot Pink, Electric Blue)
- Keine Lens-Flares oder Instagram-Filter
- Keine "selling" Marketing-Photography-Tropes (Wassertropfen auf Lack, Rennstrecken-Action)
- Keine HDR-Look mit übertriebenen Schatten
- Keine sichtbaren Marken-Logos außer der echten Marken-Embleme auf Wagen-Cutouts
- Kein "AI-Künstler-Style" mit übertriebener Renderlichtung (Octane Render, Unreal Engine 5 Vibes)

## ✅ Brand-Do's

- Restrained, editorial, "Christie's catalog" tone
- Warm natural Licht
- Dunkle Schatten okay
- Hand-drawn feel bevorzugt
- Goldakzente nur in unserer Token-Farbe (#C49A0C oder #8C6D08)
- "Magazin-Tier statt Marketing-Tier"
