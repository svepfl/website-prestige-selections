# Atmospheric Generation Session — 2026-05-23

> **Pflicht-Vorab-Lese:** [`BRAND.md`](../../BRAND.md) — alle Brand-Werte
> (Palette, Materialien, Form-Family, Grain, Tonality) leben dort. Diese
> Session-Prompts referenzieren BRAND.md statt Brand-DNA inline zu
> duplizieren.
>
> **WARNUNG:** Dies ist ein Session-Output, KEIN Template, NICHT für Re-Use.
>
> Bei nächster Atmospheric-Generierung: neues Session-File mit aktuellem
> Datum anlegen. NICHT dieses File kopieren-und-anpassen. Frisch denken
> aus den Regeln.

---

## Brand-Constraints (gelten für ALLE Prompts dieser Session)

> Konsolidiert aus [BRAND.md](../../BRAND.md) — Pflicht-Vorab-Lese.
> Diese Anti-Patterns sind in jeden Asset implizit eingebaut. Wenn du
> Prompts manuell ergänzen oder anpassen willst, prüfe gegen diese Liste.

**Erlaubte Hex-Werte (aus BRAND.md):**

UI-Code-Tokens: #C49A0C · #8C6D08 · #F2EDE3 · #FBF8F2 · #E8E0D2 ·
#1A1612 · #4A3F35 · #8B7B6A · #15110D · #2B2520 · #3D342C

Atmospheric-Dark-Family: #8C5028 (Cognac) · #A0683A (Cognac-Light) ·
#4A3520 (Walnut-Dark) · #6B3D1F (Walnut-Deep)

Atmospheric-Light-Family: #C8A878 (Sandstone) · #8B7560 (Sandstone-Mid) ·
#6B5C45 (Sandstone-Deep) · #E8DCC4 (Patina-Cream-Light)

Period-Authentic (nur für Historic-Artifact-Assets): #E8D9B8 · #3A2A18 ·
#8C6F47 · #B89878

**Wenn ein Hex-Wert in einem Prompt NICHT in dieser Liste steht → falsch.
Re-evaluieren oder BRAND.md ergänzen.**

**Globale visuelle Anti-Patterns (Pflicht-Vermeidung):**

❌ Stripe-Purple/Pink/Cyan-Iridescent Mesh-Gradients
❌ Hollywood-Orange-Grading, Instagram-HDR-Saturation
❌ Carbon-Bling, Chrome-Bling, Polished-Bling
❌ Sci-Fi Glow, Silicon-Valley aesthetic
❌ Drohnen-Sonnenuntergang-Berg-Klischee
❌ Lederhose-Kuckucksuhren-Schwarzwald-Klischee
❌ Cool-Blue, Cool-Silver, Industrial-Tech-Look
❌ Lens-Flares, Übertriebene Schärfung
❌ Plastik-Glanz, Acrylglas-Plexi-Look
❌ Symmetrisch zentrierte Kompositionen
❌ Harte geometrische Edges (2018-Trend, dead)

**Reference-Brands (visuelle Pole):** Tom Hartley Jnr · Singer Vehicle Design ·
Hodinkee · Aesop · Bottega Veneta (Daniel Lee era).

**Tonality-Anker:** Editorial-Restraint, Apple-Discipline, Hodinkee-Material-
Detail, restrained-warm-luxury — niemals "shouts".

---

## Transparenz-Strategie

GPT Image 2 ist anfällig dafür, einen Background zu rendern obwohl der
User Transparenz will. Diese Prompts sind sprachlich darauf optimiert,
maximal-zuverlässig transparente PNGs zu produzieren:

1. **Subject-Logik statt Scene-Logik** — jeder Atmospheric ist ein
   "standalone floating subject", keine "Atmosphäre die das Frame füllt"
2. **`background: "transparent"` API-Parameter** Pflicht
3. **Explizite Wiederholung im Prompt** — "transparent background" steht
   am Anfang, in der Mitte und am Ende des Prompts
4. **Negative Cues** — "no background, no backdrop, no scene fill,
   no environment"
5. **PNG-Specs** — "PNG-24 with alpha channel, sticker-style cutout"

**Ausnahme:** Asset #5 (Historic Map) ist opaque — die Map IST der
Background, kein Floating Subject.

---

## Asset-Liste

| # | Asset | Layer | Alpha | Aspect | Filename |
|---|---|---|---|---|---|
| 1 | Hero Light-Bloom | 1 | transparent | 16:9 | `/atmospherics/hero-bloom.png` |
| 2 | Warm Material-Tile | 1 | transparent | 4:3 | `/atmospherics/material-warm.png` |
| 3 | Light Material-Tile | 1 | transparent | 4:3 | `/atmospherics/material-light.png` |
| 4 | Quiet Haze-Cluster | 1 | transparent | 16:9 | `/atmospherics/quiet-glow.png` |
| 5 | Historic Map | 1 | opaque | 16:9 | `/atmospherics/spuren-map.png` |
| 6 | Sculptural Float | 2 | transparent | 1:1 | `/floats/hero-sculptural.png` |
| 7 | CTA Accent Float | 2 | transparent | 1:1 | `/floats/cta-accent.png` |

## CSS-bg-Token-Mapping (Layer 0)

| Slot | CSS-Token | Asset darüber |
|---|---|---|
| TorReveal | `bg-shadow` (#15110D) | #1 Hero-Bloom |
| EineStimme Quote-Card | `bg-shadow-soft` (#2B2520) | #2 Warm-Material @ 30% |
| EineStimme Editorial-Card | `bg-shadow-soft` (#2B2520) | #2 Warm-Material @ 12% |
| Markenwelt | `bg-shadow` (#15110D) | optional #4 |
| Services Card | `bg-canvas-raised` (#FBF8F2) | #3 Light-Material @ 15% |
| Methode | `bg-canvas-soft` (#E8E0D2) | optional #3 @ 20% |
| Spuren | `bg-canvas` (#F2EDE3) | #5 Map @ 8% |
| Concierge Ankauf-Teaser | `bg-shadow` (#15110D) | #4 Quiet-Glow |
| Newsletter-Footer | `bg-shadow` (#15110D) | #4 Quiet-Glow |
| 404-Page | `bg-shadow` (#15110D) | #4 Quiet-Glow |

---

# PROMPT 1 — Hero Light-Bloom (transparent) — v4

> **API:** `background: "transparent"`, `output_format: "png"`,
> `quality: "high"`.
>
> **Iterations-Notiz:**
> - v1: kompakter Bloob mit harter Silhouette → Form-Vokabular raus
> - v2: Diffusion überall, ganze Canvas tinted → zu trübe
> - v3: Zonen-Trennung sauber, ABER Bloom selbst hat harte Sonnen-Edge
> - v4: Zonen-Struktur beibehalten, aber Bloom-internal-Falloff ÜBER GROSSE
>   Distanz, keine erkennbare Edge mehr. Density-Gradient statt Objekt.

```
Transparent PNG with alpha channel. A warm light-density gradient
fading from a small hot point in the upper-right outward through long
soft diffusion, eventually reaching pure transparency that occupies
the majority of the canvas. CRITICAL: there is NO edge or rim where
the bloom ends. Only a continuously decreasing warm density that
gradually fades to nothing over a large area.

THIS IS NOT A SUN. NOT A BALL OF LIGHT. NOT A GLOWING SPHERE. NOT A
CIRCULAR DISC WITH HALO. The previous attempt produced a defined
warm circle — that is wrong. We want continuous density-falloff
without any recognizable shape.

CORRECT MENTAL MODEL: Imagine warm sunlight catching dust particles
in air. You can see where the light is densest (the hot point), but
there is no "edge" to the light — it just gets thinner and thinner
in every direction until you can no longer see it. That's what we
want, except the "thinning to nothing" must reach actual pure
transparency.

ON 16:9 CANVAS:

The hot point (densest warm color):
- Located approximately in the upper-right at coordinates roughly
  (75% from left, 30% from top)
- Tiny — only ~3-5% of total canvas area at peak density
- Opacity at hot point: ~85%

The diffusion area surrounding the hot point:
- Density decreases CONTINUOUSLY in all directions from the hot point
- No "halo ring", no concentric circles, no defined edge
- Falloff happens over a very large distance — the warm tint extends
  organically from the hot point spanning roughly 50-60% of canvas
  width before fully disappearing
- The falloff is irregular and organic, NOT a smooth circle

Pure transparency area:
- The lower-left half of the canvas: pure alpha 0
- Left third entirely: pure alpha 0
- Bottom third entirely: pure alpha 0
- Outer 10% margin on all four edges: pure alpha 0
- These zones have NO warm tint whatsoever, no subtle haze, just
  pure transparent canvas

The boundary between "barely-visible warm tint" and "pure alpha 0"
is itself soft and gradual — but it occurs FAR from the hot point,
not as a ring around it. Most of the warm-tint area is at very low
opacity (5-20%).

PALETTE (warm hex from BRAND.md only):
- Hot point center #C49A0C
- Mid-falloff #8C5028
- Outer faint warm tint #4A3520
- No other colors

DENSITY GRADIENT (precise stops, measured from hot point):
- At hot point (0% distance): 85% opacity, color #C49A0C
- At 10% distance from hot point: 60% opacity, color shifting toward
  #8C5028
- At 25% distance: 30% opacity, color #8C5028
- At 40% distance: 12% opacity, color #4A3520
- At 55% distance: 3% opacity, very faint warm tint
- At 70% distance: 0% opacity, fully transparent
- Beyond 70% distance: pure alpha 0

These stops apply in all directions from the hot point — but more
of the gradient is visible toward the upper-right (less canvas to
traverse) and the warm tint reaches transparency faster toward the
lower-left (more canvas to traverse).

TEXTURE: 35mm film grain ~8% baked into visible warm-pixels.
Grain intensity scales with opacity. No grain in fully transparent
zones.

ABSOLUTE TRANSPARENCY RULES:
- Lower-left half of canvas: pure alpha 0
- All four canvas edges: pure alpha 0 (no warm fade-to-edge)
- The warm density only extends ~50-60% of the canvas at most
- Never a tinted full-canvas wash
- Never a defined circular shape

ABSOLUTE FORM RULES:
- NO sun, NO ball of light, NO disc, NO circle, NO sphere
- NO halo ring around a brighter center
- NO concentric color bands
- NO defined boundary anywhere — only continuous density-gradient
- The hot point itself is also SOFT — not a sharp pixel

CONSTRAINTS (from BRAND.md):
- NO shape, NO mass, NO sphere, NO blob, NO oval, NO sun-disc
- NO recognizable form, NO object identity
- NO architectural elements, NO scene
- NO logos, NO text
- NO Stripe-purple/pink/cyan iridescent
- NO Hollywood-orange grading, NO Instagram-HDR
- NO carbon-bling, chrome-bling, sci-fi glow
- NO Drohnen-Sonnenuntergang aesthetic
- ONLY warm density-gradient fading into pure transparency

ASPECT: 16:9 canvas
QUALITY: high
BACKGROUND: TRANSPARENT (alpha channel)
SAVE-AS: hero-bloom.png

FINAL EMPHASIS: This is NOT a sun. This is a tiny hot point with warm
density extending organically outward over a long distance into pure
transparency. No edge, no rim, no defined shape. Lower-left half is
completely transparent. The warm tint is mostly faint — only the tiny
hot point is bright.
```

---

# PROMPT 2 — Warm Material-Tile (transparent)

> **API:** `background: "transparent"`, `output_format: "png"`,
> `quality: "high"`.

```
PNG sticker-style cutout on transparent background, alpha channel
output, no background fill. A floating tile of warm material-texture
isolated on pure transparent background.

SUBJECT: A free-floating rectangular tile of warm leather-textured
surface, suspended on transparency like a sample swatch held in
empty space. The subject is the material-tile itself — not the
material as part of a scene. Reference: Hodinkee material-detail
editorial swatches.

FORM: A soft-edged rectangular tile of polished oxblood shell
cordovan surface (the dense horsehide used in heritage saddlery
and bespoke automotive upholstery). The tile fills roughly the
central 70% of a 4:3 canvas. Edges of the tile feather softly into
transparency via gentle alpha-gradient — no hard rectangle border,
no crisp cutout, no visible "edge of the material".

PALETTE (these warm hex only):
- Surface mid-tone #8C5028
- Crest highlight #A0683A
- Mid-shadow warm depth #4A3520
- Rare specular catch #C49A0C
- Deepest pore-shadow #2B2520

LIGHT: Single soft directional studio light from upper-left at
glancing angle. Specular reveals material's natural depth-glow.
Shallow depth-of-field across the tile.

TEXTURE: Heavy 35mm film grain ~8% baked into the material-pixels.
Grain fades with alpha at falloff edges.

COMPOSITION ON 4:3 CANVAS: Material-tile occupies central 70% of
canvas. Outer 15% on all four sides is pure alpha 0 (transparent).
Falloff gradient is wide and organic.

CRITICAL TRANSPARENCY REQUIREMENTS:
- Canvas around the tile is PURE TRANSPARENT — no warm fill, no
  dark surround
- Soft gradual alpha-falloff at tile edges (no hard cutout line)
- No checker, no white, no color fill outside the material
- PNG-24 alpha channel

CONSTRAINTS:
- NO visible seams, stitches, edges, or boundaries of the material
- NO scene-context (no surface beneath, no surroundings)
- NO logos, NO branded marks
- ONLY the material-tile + transparent canvas around

ASPECT: 4:3 canvas
QUALITY: medium-high
BACKGROUND: TRANSPARENT — alpha channel only
SAVE-AS: material-warm.png

FINAL EMPHASIS: transparent background, alpha channel PNG, isolated
material swatch on transparency, no scene, no environment, sticker-
cutout style, PNG with alpha, no background fill of any kind
```

---

# PROMPT 3 — Light Material-Tile (transparent)

> **API:** `background: "transparent"`, `output_format: "png"`,
> `quality: "high"`.

```
PNG sticker-style cutout on transparent background, alpha channel
output, no background fill. A floating tile of warm mineral-texture
isolated on pure transparent background.

SUBJECT: A free-floating rectangular tile of cross-cut Italian
travertine surface (naturally honed, not polished), suspended on
transparency like a sample swatch in empty space. The subject is
the stone-tile itself — not the stone as part of a wall or building.
Reference: Hodinkee mineral-detail editorial swatches.

FORM: A soft-edged rectangular tile of warm cream-beige travertine,
with quiet horizontal mineral-veining. The tile fills roughly central
70% of a 4:3 canvas. Edges feather softly into transparency via
gentle alpha-gradient.

PALETTE (these warm earth hex only):
- Warm mineral mid-tone #C8A878
- Mid-shadow veining #8B7560
- Patina-cream highlight #E8DCC4
- Soft amber tint in warmest highlights #C49A0C
- Deepest pore-recess #6B5C45

LIGHT: Soft warm overhead daylight from above-center. Shallow depth-
of-field. Subtle directional shadow on veining-ridges. Real
photographic depth.

TEXTURE: Light 35mm film grain ~6% baked into material-pixels.
Grain fades with alpha at falloff edges.

COMPOSITION ON 4:3 CANVAS: Material-tile central 70% of canvas.
Outer 15% on all four sides is pure alpha 0. Wide organic falloff.

CRITICAL TRANSPARENCY REQUIREMENTS:
- Canvas around the tile is PURE TRANSPARENT — no white fill, no
  cream surround
- Soft alpha-falloff at edges, no hard line
- No checker-pattern, no color fill outside the material
- PNG-24 alpha channel

CONSTRAINTS:
- NO carved details, NO architectural edges, NO geometric tool-marks
- NO scene-context (no wall, no surrounding)
- NO logos, NO engravings
- ONLY the stone-tile + transparent canvas around

ASPECT: 4:3 canvas
QUALITY: medium-high
BACKGROUND: TRANSPARENT — alpha channel only
SAVE-AS: material-light.png

FINAL EMPHASIS: transparent background, alpha channel PNG, isolated
stone swatch on transparency, no scene, no environment, sticker-
cutout style, PNG with alpha, no background fill of any kind
```

---

# PROMPT 4 — Quiet Haze-Cluster (transparent)

> **API:** `background: "transparent"`, `output_format: "png"`,
> `quality: "high"`.

```
PNG sticker-style cutout on transparent background, alpha channel
output, no background fill. A standalone diffuse warm haze-cluster
isolated on pure transparent background.

SUBJECT: A single suspended cluster of warm atmospheric haze with
drifting particle-motes — a freestanding diffuse cloud-form floating
in transparent space. The subject is the haze-cluster itself, not
an atmosphere across a scene. Reference: Hodinkee editorial-restraint
brand-marks, Anthropic abstract glow-clusters.

FORM: One coherent diffuse haze-zone shaped roughly as a soft
horizontal cluster, denser in its center, fading outward into
transparency. Occupies the lower-third center of a 16:9 canvas.
Individual visible warm particle-specks drift through the haze.
Edges feather into pure alpha-transparency with very wide soft
falloff.

PALETTE (warm hex only):
- Mid-shadow warm haze #4A3520
- Warm haze-density-zone #6B3D1F
- Rare bright warm specular mote-points #C49A0C
- (No bright accent, no dark fill — haze is mid-warm muted)

LIGHT: Diffuse internal warmth, no directional source. The cluster
is its own subtle glow.

TEXTURE: Heavy 35mm film grain ~10% baked into haze-pixels. Visible
individual mote-particles. Grain fades with alpha.

COMPOSITION ON 16:9 CANVAS: Haze-cluster occupies lower-third center
roughly. Upper two-thirds of canvas: pure alpha 0 (transparent).
Outer 20% border on all sides: pure alpha 0. Maximum haze-opacity
~60% at densest center.

CRITICAL TRANSPARENCY REQUIREMENTS:
- Canvas above and around the haze is PURE TRANSPARENT — no dark
  fill, no warm surround
- Very wide soft alpha-falloff, no hard edges
- No checker-pattern, no fill outside the haze-cluster
- PNG-24 alpha channel

CONSTRAINTS:
- NO objects, NO recognizable forms
- NO scene, NO environment, NO architecture, NO light-shaft
- NO logos, NO text
- NO dramatic theatricality
- ONLY the haze-cluster + transparent canvas around

ASPECT: 16:9 canvas
QUALITY: high
BACKGROUND: TRANSPARENT — alpha channel only
SAVE-AS: quiet-glow.png

FINAL EMPHASIS: transparent background, alpha channel PNG, isolated
haze-cluster on transparency, no scene-fill, no environment, sticker-
cutout style, PNG with alpha, no background of any kind
```

---

# PROMPT 5 — Historic Map (opaque — eigene Background-Color)

> **API:** `background: "auto"`, `output_format: "png"`,
> `quality: "high"`. Dieses Asset bleibt opaque — die Paper-Color
> gehört zum Artifact.

```
Photographed historic artifact for premium automotive trade website
editorial background. Reference: museum-quality historic-document
photography.

SUBJECT: A fragment of a vintage 1880-1920 era hand-drawn European
map on aged warm-cream paper, photographed flat. Sepia ink in fine
copperplate-engraving style. Geographic focus: the corridor through
DACH plus Northern Italy — Germany center-left including Freiburg's
region subtly noted, Switzerland (Zürich, Geneva, St. Moritz visible
as period place-names), France (Strasbourg and Alsace at left edge),
Austria (Salzburg and Tyrolean Alps), and Northern Italy (Lombardy
and Emilia-Romagna including the Maranello region).

ANNOTATIONS: Subtle period German fraktur-script annotations along
several routes (illegible — atmosphere only). Faint graphite-pencil
dotted lines connecting select cities.

COMPOSITION: Map fills frame edge-to-edge. Implicit visual spine
upper-left through center to lower-right. Paper grain horizontal.
Faint coffee-stain ring off-axis. Edges show authentic wear.

PALETTE (period-authentic, opaque — paper IS the asset's background):
- Aged paper base #E8D9B8
- Sepia ink #3A2A18
- Faint pencil dotted lines #6B5C45
- Coffee-stain warm shadow #8C6F47
- Slight warm-amber paper-edge weathering #B89878

LIGHT: Soft warm daylight from above, slight oblique angle revealing
paper grain.

TEXTURE: Heavy 35mm film grain ~6%. Real ink-bleed into paper fibers.

CONSTRAINTS:
- NO modern digital elements
- NO logos, publisher-marks, copyright-stamps
- NO readable modern text — fraktur-script atmosphere only
- Authentic 1880-1920 cartographic conventions
- Designed to read at ~8% opacity over Spuren section-bg

ASPECT: 16:9
QUALITY: high
BACKGROUND: auto (opaque paper-tone)
SAVE-AS: spuren-map.png
```

---

# PROMPT 6 — Sculptural Float-Object (transparent)

> **API:** `background: "transparent"`, `output_format: "png"`,
> `quality: "high"`.

```
PNG sticker-style cutout on transparent background, alpha channel
output, no background fill. A standalone abstract sculptural mass
isolated on pure transparent background.

SUBJECT: A single suspended sculptural form resembling a softly
twisted organic mass — like a sheet of warm amber-resin caught
mid-motion, frozen as a flowing curve. The subject is the sculpture
itself, floating in transparent space with no surroundings. Reference:
Apple Liquid Glass material studies, Anthropic abstract brand-marks.

FORM: One continuous curving mass, roughly three times taller than
wide, with one soft fold creating a subtle highlight-ridge. The form
self-shadows, revealing internal depth. Edges of the form feather
gently into pure transparency — no hard cutout line.

PALETTE (warm hex only, Brand-coherent):
- Deep shadow zones #4A3520
- Surface mid-tone #8C5028
- Crest highlight #A0683A
- Rare specular point #C49A0C

LIGHT: Single soft directional studio light from upper-left. Specular
catch on upper crest. Soft self-shadow into mid-body. Sub-surface
warm glow at thinnest edges.

TEXTURE: Fine 35mm film grain ~5% baked into surface. Clean alpha
falloff — no halo, no matte-line.

COMPOSITION ON 1:1 CANVAS: Form occupies center-right two-thirds of
square canvas. Vertical orientation. At least 10% pure transparent
margin on all four sides. Surrounding canvas: pure alpha 0.

CRITICAL TRANSPARENCY REQUIREMENTS:
- Canvas around the sculptural form is PURE TRANSPARENT
- No fill, no backdrop, no surround
- Clean alpha edges, gentle gradient falloff
- No white halo, no matte-line, no checker-pattern
- PNG-24 alpha channel

CONSTRAINTS:
- Pure abstract form — NO recognizable identity
- NO vehicles, NO vehicle-parts, NO tools
- NO body parts, NO faces, NO hands
- NO logos, NO text
- NO multi-form composition
- NO geometric machined shapes
- ONLY the sculptural form + transparent canvas around

ASPECT: 1:1 canvas
QUALITY: high
BACKGROUND: TRANSPARENT — alpha channel only
SAVE-AS: hero-sculptural.png

FINAL EMPHASIS: transparent background, alpha channel PNG, isolated
sculptural form, no scene, no environment, sticker-cutout style, PNG
with alpha, no background fill, no backdrop, freistehend auf
transparentem Hintergrund
```

---

# PROMPT 7 — CTA Accent Float-Object (transparent)

> **API:** `background: "transparent"`, `output_format: "png"`,
> `quality: "high"`.

```
PNG sticker-style cutout on transparent background, alpha channel
output, no background fill. A standalone abstract micro-sculptural
mass isolated on pure transparent background.

SUBJECT: A small suspended micro-form resembling a single softly
polished warm sphere — but not quite a sphere, slightly elongated
and slightly asymmetric. Suggests a droplet caught mid-fall but never
identifiable as water, liquid, or any specific functional object.
Pure abstract micro-mass floating in transparent space.

FORM: Single coherent compact mass, roughly square in proportion,
occupying about 60% of a 1:1 canvas area. Smooth surface with one
subtle directional highlight-arc and one soft self-shadow. Edges
gently feather into transparency.

PALETTE (warm hex only):
- Deep shadow side #2B2520
- Surface mid-tone #6B3D1F
- Crest highlight #8C5028
- Single bright specular point #C49A0C (small, <5% of form area)

LIGHT: Single soft directional studio light from upper-left at ~30°
above horizon. Small specular arc on upper surface. Soft self-shadow
lower-right.

TEXTURE: Fine 35mm film grain ~4% baked into form surface. Surface
reads as polished but not glassy. Clean alpha edges.

COMPOSITION ON 1:1 CANVAS: Form centered slightly off-center toward
lower-right third. Negative space upper-left. At least 15% pure
transparent margin on all four sides.

CRITICAL TRANSPARENCY REQUIREMENTS:
- Canvas around the form is PURE TRANSPARENT
- No fill, no backdrop, no surround
- Clean alpha edges, no halo, no matte-line
- No white, no checker-pattern, no color fill
- PNG-24 alpha channel

CONSTRAINTS:
- Pure abstract micro-form — NO recognizable identity
- NO droplet (don't suggest water), NO orb, NO bubble, NO planet
- NO vehicle-parts, NO body-parts, NO logos
- NO multi-form composition
- NO sharp machined geometric shapes
- ONLY the micro-form + transparent canvas around

ASPECT: 1:1 canvas
QUALITY: high
BACKGROUND: TRANSPARENT — alpha channel only
SAVE-AS: cta-accent.png

FINAL EMPHASIS: transparent background, alpha channel PNG, isolated
micro-form on transparency, no scene, no environment, sticker-cutout
style, PNG with alpha, no background fill, no backdrop, freistehend
auf transparentem Hintergrund
```

---

## Verification nach Download

Wenn das PNG geladen ist, kurz prüfen:

1. **Datei in einem Image-Viewer öffnen, der Transparenz unterstützt**
   (macOS Preview, Photoshop, Figma)
2. **Transparenz visible?** Wenn ja → OK. Wenn weißer Hintergrund → re-gen.
3. **Soft Edge?** Wenn harte Rechteck-Kante → "soft alpha falloff" im
   Prompt verstärken und re-gen.
4. **Halo um Subject?** Wenn ja → Photoshop Refine Edge oder re-gen mit
   "no halo, no matte-line" stärker im Prompt.

Falls GPT Image 2 trotz `background: "transparent"` einen Hintergrund
liefert: das Subject in ChatGPT-UI nochmal mit explizitem Hinweis
generieren oder Photoshop-Background-Remove als Fallback.

---

## Pre-Commit-Check pro Asset

- [ ] Transparent (außer #5 Map)?
- [ ] Brand-Palette ausschließlich?
- [ ] Temp-Shift 30-40°?
- [ ] Grain 4-10% (nach Asset-Typ)?
- [ ] Composition off-axis?
- [ ] Form frische Interpretation, keine Kopie?
- [ ] Anti-Pretension: keine echten Locations/Personen/Vehicles?
- [ ] Alpha: soft falloff, kein hard mask, kein halo?
- [ ] Filename korrekt?

Bei NEIN → re-generate.

---

## Compositing-Beispiel Hero (Code-Snippet)

```html
<section class="bg-shadow relative overflow-hidden">       <!-- Layer 0 -->
  <img src="/atmospherics/hero-bloom.png"                  <!-- Layer 1 -->
       alt="" class="absolute inset-0 w-full h-full object-cover" />
  <img src="/floats/hero-sculptural.png"                   <!-- Layer 2 -->
       alt="" class="absolute right-[10%] top-[20%] w-[35%]" />
  <div class="relative z-10">                              <!-- Layer 3 -->
    <h1>...</h1>
  </div>
</section>
```

Section-bg-Color (`bg-shadow`) ist Single Source of Truth. Layer 1+2
sind transparente PNGs.

---

## Verzeichnis-Setup (erledigt)

```
/public/assets/
├── atmospherics/           ← Layer-1 PNGs (#1-4 transparent, #5 opaque)
└── floats/                 ← Layer-2 transparent PNGs (#6-7)
```
