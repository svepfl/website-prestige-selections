# Asset Brief V2 — Prestige Selections (GPT-Image + Kling AI)

> **Status:** V1-Assets werden mit GPT-Image (Image 2) + Kling AI generiert. Spätere Phasen ersetzen sie durch professionelle Fotografie/Videografie.
> **Konsistenz-Regeln:** Look, Lichtsetzung und Farb-Grading müssen ÜBER ALLE Assets identisch sein, sonst zerfällt die Marke. Jedes Asset folgt dem definierten "House Look".

---

## House Look — verbindlich für alle Assets

Diese Konsistenz-Anker MÜSSEN in jedem Prompt enthalten sein:

- **Lichtsetzung:** Ein Hauptlicht von schräg-oben, gedämpft warm; sanfter Fülllichteindruck links
- **Farbgrading:** Warme Highlights, kontrollierte Schatten, geringe Saturation, niemals HDR oder Instagram-Pop
- **Hintergrund:** Konsistenter Studio-Look — dunkelgrauer bis schwarzer Polierter-Beton-Boden mit subtilen Reflexionen
- **Atmosphäre:** Dokumentarisch, editorial, ruhig — wie eine Galerie, nicht ein Showroom
- **Verboten:** Linsen-Flares, übertriebene Schärfung, Neon-Akzente, Drohnen-Sonnenuntergang-Klischee
- **Aspekt-Ratios:** Pro Kontext fest (siehe pro Asset)

---

## 1. AKT 1 — Tor-Reveal (5 Frames für CSS Scroll-Crossfade)

> Wir generieren **5 Stills** und animieren per CSS Scroll-Driven-Animation den Übergang. Performance-besser als ein Video, identische cinematic-Wirkung. Optional in V1.5 durch Kling-Video ersetzen.

**Aspekt-Ratio:** 16:9 (Desktop) — separate 9:16-Variante (Mobile) später

### Frame 1 — Tor geschlossen
```
Cinematic hero shot of an elegant, architectural showroom door — closed.
A wide, monolithic dark warm-gray garage-style portal, set within a clean
modern stone facade. The door has subtle vertical grain detail.
The space is photographed at dusk with directional warm light grazing
from the right edge, creating dramatic shadow on the left half of the door.
The setting is upscale and architectural — NOT industrial, NOT a typical
auto-repair shop. Think private collector's gallery entrance.
Bottom edge shows polished concrete ground with subtle reflection.
Atmosphere: anticipation, restrained luxury.
No people, no cars visible. No signage.
Color palette: warm dark tones, hint of patina-gold catching the
edge light. Editorial, cinematic, ultra-sharp.
16:9 landscape.
```

### Frame 2 — Tor 25% offen
```
Same exact showroom door scene as Frame 1, identical camera angle and
lighting. Now the door is raised approximately 25% from the bottom —
revealing a horizontal slit of warm interior light spilling out from
underneath. Through the gap, only the lower portion of car wheels and
polished floor reflection is faintly visible — silhouetted, suggestive.
Same warm dark exterior tones. Same patina-gold edge light.
Identical composition, just the door position changed.
16:9 landscape.
```

### Frame 3 — Tor 50% offen
```
Same showroom door scene, identical camera angle and lighting.
Door now raised approximately 50%. The opening reveals more of the
interior — visible: lower half of a single dark-paint luxury car
(silhouetted, no specific brand visible), warm spot-lit interior beyond,
polished floor with reflections. The interior light is significantly
brighter than the exterior dusk.
Same warm tones throughout. Same composition.
16:9 landscape.
```

### Frame 4 — Tor 75% offen
```
Same showroom door scene, identical camera angle and lighting.
Door now raised approximately 75%. The interior is now clearly visible:
a single dark luxury sports car positioned in the center, lit by a
warm overhead spotlight. The car is silhouetted enough that no specific
brand is identifiable. Background: subtle architectural details of the
showroom interior, deep blacks fading off.
Same warm tones, same composition.
16:9 landscape.
```

### Frame 5 — Tor vollständig offen
```
Same showroom door scene, identical camera angle and lighting.
Door fully raised — the entire interior is now revealed. A single
dark luxury sports car (generic silhouette, no specific brand) stands
centered in a softly lit gallery space. Polished concrete floor with
mirror-like reflection of the car. The interior light is warm and
intimate. The empty showroom around the car emphasizes singularity —
this is a curated, intentional space, not a parking lot.
Same composition, same warm tones throughout.
16:9 landscape.
```

**Mobile-Variante (9:16):** Identische 5 Frames, hochkant, Tor-Öffnung dramatischer, Auto näher.

---

## 2. AKT 2 — Wochen-Schaufenster (wechselt wöchentlich/14-tägig)

> Das EINE Fahrzeug der Woche, das im Akt 1 hinter dem Tor erscheint und in Akt 2 detailliert wird. Pro Fahrzeug:

**Aspekt-Ratio:** 16:9 (Hauptbild) + 5 Detail-Shots in 16:10

### Hero — Wochen-Fahrzeug
```
Editorial automotive photograph of a [SPECIFIC CAR: e.g. "1959 Mercedes-Benz
300 SL Roadster in silver"], positioned 3/4 front angle in a minimalist
dark warm-gray gallery space. Single dramatic overhead warm spotlight
creates deep shadows and golden highlights along the body's curves.
Polished dark concrete floor with subtle reflection underneath.
Background fades to deep warm black. No props, no people, no logos.
Editorial color grading: warm highlights, deep but detailed shadows,
controlled saturation, NOT HDR. Atmosphere: museum installation,
quiet reverence.
Sharpness: razor-sharp on the car, slight falloff at edges.
16:9 landscape, cinematic composition with car centered slightly
left of frame.
```

### Detail-Shots (5 pro Fahrzeug, 16:10)
1. Front detail (headlight + grille close)
2. Side profile silhouette
3. Rear 3/4 angle
4. Interior cockpit (steering wheel, dashboard)
5. Signature detail (badge, wheel, engine bay close-up)

**Prompt-Template Detail-Shot:**
```
Editorial detail photograph of [SPECIFIC CAR PART, e.g. "the front
headlight cluster and quad-grille of a 1959 Mercedes 300 SL Roadster"].
Extreme close-up, shallow depth of field. Same warm-toned lighting as
the hero shot (single warm overhead key). Background fades to deep
black. Ultra-sharp, editorial quality. Color grading: warm highlights,
controlled saturation, no HDR. 16:10 landscape.
```

---

## 3. AKT 4 — Kollektion (30 Fahrzeuge im Editorial-Grid)

> Pro Fahrzeug **1 Card-Shot** + 5 Galerie-Shots (für Detail-Page). Alle 30 müssen im identischen House-Look erscheinen — sonst wirkt es wie zusammengewürfelt.

**Aspekt-Ratio:** 16:10 (Card) + 16:9 (Detail-Galerie)

### Card-Shot (pro Fahrzeug)
```
Editorial three-quarter front studio photograph of [SPECIFIC CAR:
brand, model, year, color]. Positioned slightly left of center in
a minimalist dark warm-gray gallery setting. Single warm overhead
key light creates dramatic shadows and golden highlights along the
car's curves. Polished dark concrete floor with subtle reflection
beneath the car. Background: clean dark warm fade.
NO people, NO props, NO logos, NO text overlays.
Editorial color grading: warm highlights, deep but detailed shadows,
geringe Saturation. NOT HDR, NOT Instagram-pop.
Ultra-sharp focus on the entire car.
16:10 landscape, car occupies ~70% of frame width.
The atmosphere is museum-quiet, never theatrical.
```

**Marken-Liste für Variation (alle im House-Look):**
Aston Martin DBS · Bentley Bentayga W12 · Bentley Continental GTC · Ferrari 812 GTS · Ferrari Roma · Lamborghini Huracán · Lamborghini Urus · Maserati MC20 · McLaren 720S · Mercedes-AMG GT · Porsche 911 Turbo S · Porsche 911 GT3 · Porsche Cayenne Turbo · Porsche Panamera · Porsche Taycan · Rolls-Royce Cullinan · Rolls-Royce Ghost · Rolls-Royce Wraith · (Liste mit Jérôme abgleichen)

### Galerie-Shots (5 pro Fahrzeug)
Wie Detail-Shots in Sektion 2.

---

## 4. AKT 5 — Inspection Vault

> Interaktive 142-Punkte-Prüfung mit klickbarer Karosserie. Wir brauchen 1 technische Outline + Detail-Crops.

**Aspekt-Ratio:** 1:1 (interaktive Hauptansicht) + diverse Detail-Crops

### Vehicle Outline (für jedes Fahrzeug einmal)
```
Pure side-profile silhouette of [SPECIFIC CAR MODEL], on a clean
warm off-white background. Style: precise technical illustration,
NOT photorealistic — like a manufacturer's official line drawing
adapted into a minimalist editorial style. Stroke-only rendering,
1px-2px dark warm gray outline, subtle shadow underneath the car.
Proportions anatomically correct for the specific model.
NO color fill (line-art only). NO text, NO labels.
1:1 square, car centered horizontally, occupies ~80% of width.
```

### Inspection Detail Crops (pro Prüfpunkt 1 Foto)
Beispielprompts (für je 1 von 142 Punkten):
- "Close-up of brake disc and caliper assembly on a sports car, editorial, warm lighting" (1:1)
- "Detail shot of leather seat stitching on a luxury sports car interior, warm light" (1:1)
- "Engine bay close-up of a V12 engine, restrained editorial style" (1:1)

Wir generieren **ca. 30-40 Generic-Crops** für den Vault-Demo und nutzen sie über alle Fahrzeuge wiederverwendbar.

---

## 5. AKT 6 — Atelier (Werkstatt)

**Aspekt-Ratio:** 16:9 (Hero) + 4:5 (Floating Card) + diverse Detail (1:1)

### Atelier Hero
```
Dokumentarisches Reportage-Foto einer Premium-Sportwagen-Werkstatt.
Mid-shot Ansicht: zwei Mechaniker (Hände + Arbeitskleidung sichtbar,
Gesichter abgewandt oder leicht unscharf) arbeiten konzentriert
an einem hochgehobenen Ferrari oder Porsche. Organisierte
Werkzeuge im Hintergrund, sauber, ruhig, fast bibliothekarisch.
Warmes Tungsten-Licht mit subtilem Tageslicht durch Oberlichter.
Farbgrading: warme Highlights, leicht entsättigt, dokumentarisch
(NICHT Glamour, NICHT Werbung). Editorial-Qualität, ultrascharf.
16:9 Landschaft.
```

### Atelier Detail-Shots
- Hände am Motor (Werkzeug-Detail) — 1:1
- Diagnose-Bildschirm mit Anschluss am Fahrzeug — 4:5
- Lackpolitur in Mikrofaserstoff-Nahaufnahme — 1:1
- Werkzeug-Wand mit organisierten Schlüsseln — 4:5
- Klimatisierter Klassiker-Einlagerungsraum — 16:9

---

## 6. AKT 7 — Heritage

> Jérôme als Person ist Vertrauenskapital — **echtes Foto von ihm bevorzugt**. AI-Generated als Notlösung mit Disclosure.

**Aspekt-Ratio:** 4:5 (Portrait) + 16:9 (Pinned-Sides-Heritage-Bilder)

### Jérôme-Placeholder (bis echtes Foto kommt)
```
Editorial portrait of a 50-something year-old European man, salt-and-pepper
hair, well-groomed beard, wearing a dark fine-knit roll-neck sweater
and a vintage steel watch. Photographed mid-shot in a softly-lit
gallery space with a dark warm-gray background and a silhouetted
classic sports car partially visible behind him to the right.
He looks at the camera with a calm, slightly reserved expression —
not smiling broadly, but warmth in his eyes. Professional, restrained,
European — think editorial portrait for a magazine like Robb Report
or Octane, NOT a smiling commercial headshot.
Warm tones, controlled saturation, ultra-sharp.
4:5 portrait.
```

### Heritage Pinned-Sides — Archive Cars (10-15 Bilder)
> Für Akt 7 mit Pinned-Center + Side-Scrolling Bildern. Jedes mit Jahr + Modell + Stadt-Caption.

**Prompt-Template:**
```
Vintage-feel editorial photograph of a [BRAND MODEL, e.g. "1970s
Porsche 911 Targa in silver"] positioned in a soft outdoor European
setting (cobblestone courtyard / mountain road / historic plaza).
Color grading: slightly desaturated, warm highlights, film-photography
feel (NOT obvious vintage filter — subtle, documentary). The car looks
"lived with" but cared for. No people visible. Editorial composition,
sharp focus on car, soft natural light. 4:5 portrait.
```

Variationen:
- 1970s Porsche 911 Targa · Basel
- 1980s Ferrari Testarossa · Mailand
- 1990s Aston Martin DB7 · München
- 2000s Bentley Continental · Stuttgart
- Klassische 911 Carrera · Genf
- Etc. (10-15 Variationen)

---

## 7. AKT 8 — Customer Story (Full-Bleed Dark)

> **Wichtig:** AI-Generated Customers MÜSSEN mit Disclosure markiert werden (EU AI Act Article 50, ab Aug 2026). Beste Lösung: in Bildunterschrift "Beispielbild — KI-generiert. Echte Kundenstimmen folgen." bis V1.5.

**Aspekt-Ratio:** 21:9 (Full-Bleed Dark Hero)

### Customer Story Hero (3-5 Variationen)
```
Cinematic 21:9 photograph of a stylish European man (40-55, well-dressed,
business-casual) standing beside or leaning on his sports car on an
empty mountain pass at golden hour. The car is a classic [Porsche 911 /
Aston Martin DB / Ferrari 550] in deep paint. The subject is shown
in profile or 3/4 view, NOT looking directly at camera — instead gazing
toward the road or the horizon, contemplative. Warm gold light, dramatic
landscape (Alps / Black Forest / Vosges feel). Atmosphere: ownership
satisfaction, quiet pride, NOT commercial advertising.
Color grading: warm cinematic, deep but detailed shadows, controlled
saturation. Editorial-cinematic — think Robb Report cover.
21:9 ultra-wide.
```

Variationen:
- Mountain road, silver car, evening
- Lakeside European villa entrance, dark blue car, late afternoon
- Vineyard road, dark green car, golden hour
- Forest gravel driveway, deep red car, soft overcast
- Snow-dusted alpine route, white car, crisp morning

---

## 8. AKT 9 — Journal (Editorial Article Headers)

**Aspekt-Ratio:** 16:9 (Feature Article) + 4:5 (Side Cards)

### Journal Hero (pro Artikel)
Beispielprompts:
- *"Im Atelier: Restaurierung eines 911 Targa"* — Reportage-Stil, Mechaniker an einem Klassiker, 16:9
- *"Markt-Beobachtung: Aston Martin DBS"* — Editorial Studio-Shot, 16:9
- *"Was eine lückenlose Historie wirklich bedeutet"* — Servicebuch / Dokumente auf Holztisch, 16:9

---

## 9. Kling AI Video — Bewegtbild-Inhalte

> Kling AI generiert 5-10s Clips. Verwenden wir für Walk-Around-Videos und Atmosphären-Loops.

### Walk-Around-Video (pro Fahrzeug, 5-8s Loop)
**Kling AI Prompt:**
```
Slow cinematic dolly shot orbiting a [SPECIFIC CAR, e.g. "1959 Mercedes-Benz
300 SL Roadster in silver"], 3/4 angle. The car is parked in a minimalist
dark gallery setting with a single warm overhead spotlight. The camera
moves smoothly from front-right to side-profile angle over 6 seconds.
Polished concrete floor with reflection. NO people, NO text overlays.
Editorial cinematic quality, warm color grade, ultra-sharp.
5 seconds, 16:9, smooth motion, no jump cuts.
```

### Atelier-Atmospheric-Loop (5s)
```
Slow cinematic tracking shot through a premium automotive workshop.
A mechanic's hands work on a engine in the foreground (face not shown),
soft warm lighting from above, organized tools in soft focus background.
Documentary cinema feel, NOT commercial. 5 seconds, 16:9, looping.
```

### Halle-Bei-Nacht-Atmosphere (für Akt 10)
```
Slow dolly-in shot of a luxury car showroom interior at night. One
sports car visible in soft spotlight, polished floor reflecting, warm
amber light. Empty otherwise, atmospheric. 5 seconds, 16:9.
```

---

## 10. UI / Decorative Assets

### Showroom-Tor-Logo-Variante (Favicon-Inspiration)
- Minimal geometrisches Tor-Icon in Patina-Gold auf Carbon (16x16, 32x32, 180x180)

### OG-Images (dynamisch generiert via Vercel OG, statische Fallbacks):
- Homepage OG: 1200×630, Hero-Fahrzeug-Wochenschaufenster
- Kollektion OG: 1200×630, Editorial Grid Preview
- Pro Fahrzeug OG: 1200×630, Card-Shot + Modellname

---

## Konsistenz-Check vor Verwendung

Vor jedem Asset, das ins Repo wandert:

- [ ] Lichtsetzung match? (warm, oberhalb, gedämpft)
- [ ] Hintergrund match? (dark warm gradient oder konsistenter Outdoor-Look)
- [ ] Farbgrading match? (warm highlights, controlled saturation, no HDR)
- [ ] Aspekt-Ratio korrekt für Kontext?
- [ ] Auflösung mindestens 3000px breit (Retina-Qualität)?
- [ ] Falls AI-generierte Person sichtbar: Disclosure-Markierung vorbereitet?

---

## Asset-Mengen-Übersicht

| Kategorie | Anzahl | Tool |
|---|---|---|
| Tor-Reveal Frames | 5 (+5 Mobile) | GPT-Image |
| Wochen-Schaufenster (rotating) | 1 Hero + 5 Details, ca. 4-6 Fahrzeuge im Vorrat | GPT-Image |
| Kollektion Cards (30 Fahrzeuge) | 30 Cards + 150 Detail-Shots | GPT-Image |
| Inspection Vault Outlines | 30 Linien-Illustrations + ~30 Detail-Crops | GPT-Image |
| Atelier | 1 Hero + 5 Details | GPT-Image |
| Heritage Archive | 10-15 Vintage Cars + 1 Jérôme-Placeholder | GPT-Image |
| Customer Story | 3-5 Hero-Variations | GPT-Image |
| Journal Headers | 5-10 (Start) | GPT-Image |
| Kling AI Walk-Arounds | 30 (5-8s pro Fahrzeug) | Kling AI |
| Kling AI Atmospheric Loops | 3-5 | Kling AI |
| OG-Images | dynamisch + 3 statische Fallbacks | Vercel OG |
| **TOTAL Stills** | **~280-320** | GPT-Image |
| **TOTAL Videos** | **~35** | Kling AI |

---

## Workflow-Vorschlag

1. **Block 1 (heute):** Tor-Reveal 5 Frames generieren (höchste Priorität — Akt 1 wartet darauf)
2. **Block 2:** 4-6 Wochen-Schaufenster-Hero generieren (Akt 2)
3. **Block 3:** 30 Kollektion-Card-Shots (eines pro Bestand-Fahrzeug)
4. **Block 4:** Atelier-Set + Heritage-Set + Customer-Story-Set
5. **Block 5:** Detail-Shots für Top-10-Fahrzeuge (für Detail-Page-Galerien)
6. **Block 6:** Kling AI Videos (sobald Stills final sind — Konsistenz)

Bei jedem Block: **Generierte Assets im Repo ablegen unter `public/assets/[block]/`**, ich integriere sie sofort in die entsprechenden Komponenten.
