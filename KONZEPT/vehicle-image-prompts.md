# Vehicle Image Prompts — GPT Image 2 / Sora / Flux

> Compliant with [top-web Rule 13](../../.claude/skills/top-web/rules/13-photo-storyboarding.md) (Photo-Storyboarding) +
> [top-web Rule 14](../../.claude/skills/top-web/rules/14-visual-discipline.md) (Visual-Discipline 15-Point-Quality-Bar) +
> [top-web Template](../../.claude/skills/top-web/templates/gpt-image-2-prompts.md) (6-Block-Structure).

## Brief Compile

```
Brand:        Prestige Selections (Tom Hartley × Hodinkee × Aesop tier)
Audience:     Premium-auto buyer 35-60, research mode, expects discretion
Section:      /fahrzeuge inventory cards (5:4 aspect, ~33vw desktop)
Goal:         Trust + material-truth before click-through to detail
Sibling-set:  18 vehicles — visual consistency across set is critical
Tier:         Editorial (per Rule 14) — vehicle-only, no people
Filename:     {vehicle-id}-placeholder.webp (Rule 13 -placeholder suffix)
Path:         /public/assets/vehicles/{vehicle-id}-placeholder.webp
```

## Workflow

1. Copy ONE prompt below → paste into GPT Image 2 / Sora / Flux
2. Generate 3-4 variants → pick the one that passes Rule 14 15-Point-Quality-Bar
3. Verify model proportions against reference (AI sometimes wrong on specific cars)
4. Save as WebP, filename matches `id` field from `src/data/vehicles.ts`
5. Path: `/public/assets/vehicles/{id}-placeholder.webp`
6. Update `src/data/images.ts` `getVehiclePlaceholder()` to use new paths

**Important:** Each prompt is self-contained (Master-setup inlined). Per Rule 13, no "see above" references — copy-paste once, paste into model, generate.

---

## 1 · Aston Martin DBS (2019)
**File:** `aston-martin-dbs-placeholder.webp`

```
SCENE / BACKGROUND
Independent atelier showroom interior. Warm brick walls camera-left, oak herringbone parquet floor, single brass pendant lamp visible at frame top. Empty space around the subject — no other cars, no people.

SUBJECT
A 2019 Aston Martin DBS Superleggera in deep metallic Magnetic Silver. Three-quarter front view, vehicle anchored at horizontal 0.62 of the frame. Carbon front splitter, carbon side skirts, carbon bonnet vents in visible weave finish. 21-inch Y-spoke alloy wheels in satin graphite. Headlights cold. Hood closed. Stationary on parquet, suspension at natural ride height.

CAMERA / LENS
Hasselblad X2D II medium format, 85mm portrait lens at f/2.8, ISO 100, 1/125s. RAW unprocessed, photorealistic photograph. Slight focal falloff at frame edges.

LIGHTING
One warm tungsten key at 3200K from camera upper-left at 30° elevation. Subtractive negative fill camera-right. Side-raked across the flank to reveal paint depth.

MATERIALS / TEXTURES
Deep base-coat-clear-coat paint with visible orange-peel micro-texture under raking light. Carbon weave reading sharp at f/2.8 hyperfocal. One micro-scratch on lower front fender at 70cm height (intentional imperfection).

CONSTRAINTS
Single consistent shadow direction lower-right. Vehicle in factory ride-height. Manufacturer badge visible on grille but not centered as hero. License plate area empty (no plate fitted). 50% negative space upper-left third of frame. Black point at 10, desaturated 15% from natural. Kodak Portra 400 grain at 12% opacity. 5:4 landscape aspect ratio, 1920×1536 output.

REPLICATION NOTE (for Phase 2 real shoot)
Same atelier, same brass pendant key-light at 3200K, same X2D + 85mm f/2.8. Same 0.62 horizontal anchor, same three-quarter front angle. Photograph the actual DBS at golden hour with pendant on, window-fill subtracted via black flag. Aim for paint-depth visible under raking light.
```

---

## 2 · Bentley Bentayga W12 (2016)
**File:** `bentley-bentayga-w12-placeholder.webp`

```
SCENE / BACKGROUND
Independent atelier showroom interior. Warm brick walls camera-left, oak herringbone parquet floor, single brass pendant lamp visible at frame top. Empty space around the subject — no other cars, no people.

SUBJECT
A 2016 Bentley Bentayga W12 SUV in deep Verdant Green metallic. Profile side view, vehicle anchored at horizontal 0.62 of the frame. 21-inch multi-spoke wheels in painted finish. Polished chrome window-line and matrix LED headlights catching one warm highlight. Hood closed. Stationary on parquet, suspension at standard ride height.

CAMERA / LENS
Hasselblad X2D II medium format, 85mm portrait lens at f/3.2, ISO 100, 1/125s. RAW unprocessed, photorealistic photograph. Slight focal falloff at frame edges.

LIGHTING
One warm tungsten key at 3200K from camera upper-left at 30° elevation. Subtractive negative fill camera-right. Side-raked across the long flank to reveal panel transitions.

MATERIALS / TEXTURES
Deep base-coat-clear-coat green paint with visible orange-peel micro-texture under raking light. Chrome window-line reading polished but not mirror-perfect. Tyre sidewall lettering visible but not centered.

CONSTRAINTS
Single consistent shadow direction lower-right. Manufacturer wing badge on bonnet visible but not centered as hero. License plate area empty. 50% negative space frame-right. Black point at 10, desaturated 15% from natural. Kodak Portra 400 grain at 12% opacity. 5:4 landscape aspect ratio, 1920×1536 output.

REPLICATION NOTE (for Phase 2 real shoot)
Same atelier, same brass pendant key-light at 3200K, same X2D + 85mm f/3.2. Same 0.62 horizontal anchor, same profile side angle. Photograph the actual Bentayga at golden hour with pendant on, subtract window-fill via black flag. Aim for panel-line precision and chrome-band warm highlight.
```

---

## 3 · Bentley Continental GTC V8 Azure (2024)
**File:** `bentley-gtc-v8-azure-placeholder.webp`

```
SCENE / BACKGROUND
Independent atelier showroom interior. Warm brick walls camera-left, oak herringbone parquet floor, single brass pendant lamp visible at frame top. Empty space around the subject — no other cars, no people.

SUBJECT
A 2024 Bentley Continental GTC V8 in Azure turquoise-blue metallic. Convertible top folded down, exposing diamond-quilted tan leather interior. Three-quarter front view from slightly raised camera, vehicle anchored at horizontal 0.62 of the frame. 22-inch multi-spoke wheels in painted finish. Diamond-pattern grille and bullseye headlamps visible. Hood closed. Stationary on parquet at standard ride height.

CAMERA / LENS
Hasselblad X2D II medium format, 85mm portrait lens at f/2.8, ISO 100, 1/125s. RAW unprocessed, photorealistic photograph. Slight focal falloff at frame edges.

LIGHTING
One warm tungsten key at 3200K from camera upper-left at 30° elevation. Subtractive negative fill camera-right. Side-raked across the flank, pendant glow visible on the bonnet curve.

MATERIALS / TEXTURES
Deep azure base-coat-clear-coat with orange-peel micro-texture. Diamond-quilted tan leather seats visible through open cabin — stitch lines sharp at f/2.8. Chrome diamond-grille reading as polished but not mirror-perfect.

CONSTRAINTS
Single consistent shadow direction lower-right. Bentley wing badge on bonnet visible but not centered. License plate area empty. 50% negative space upper-left. Black point at 10, desaturated 15% from natural. Kodak Portra 400 grain at 12% opacity. 5:4 landscape aspect ratio, 1920×1536 output.

REPLICATION NOTE (for Phase 2 real shoot)
Same atelier, same brass pendant key-light at 3200K, same X2D + 85mm f/2.8. Same 0.62 horizontal anchor, same three-quarter front angle. Photograph the actual GTC with top folded. Diamond-stitch leather visible through cabin. Aim for paint-depth under raking light and the warm pendant on the bonnet curve.
```

---

## 4 · Ferrari SF90 Spider (2024)
**File:** `ferrari-sf90-spider-placeholder.webp`

```
SCENE / BACKGROUND
Independent atelier showroom interior. Warm brick walls camera-left, oak herringbone parquet floor, single brass pendant lamp visible at frame top. Empty space around the subject — no other cars, no people.

SUBJECT
A 2024 Ferrari SF90 Spider in Rosso Corsa red, retractable hard-top closed. Three-quarter front view from slightly lowered camera, vehicle anchored at horizontal 0.62 of the frame. 20-inch forged dark wheels. Carbon front splitter, side-blade air intakes, rear hexagonal exhaust ports visible. Carbon fibre roof seam visible. Hood closed. Stationary on parquet at standard ride height.

CAMERA / LENS
Hasselblad X2D II medium format, 85mm portrait lens at f/2.8, ISO 100, 1/125s. RAW unprocessed, photorealistic photograph. Slight focal falloff at frame edges.

LIGHTING
One warm tungsten key at 3200K from camera upper-left at 30° elevation. Subtractive negative fill camera-right. Side-raked across the flank, single highlight along the side-blade vent edge.

MATERIALS / TEXTURES
Deep Rosso Corsa base-coat-clear-coat with orange-peel micro-texture. Carbon weave reading sharp at f/2.8. Wheel dish catching one warm pendant reflection. One fingerprint smudge near the door handle (intentional imperfection).

CONSTRAINTS
Single consistent shadow direction lower-right. Prancing Horse badge visible but not centered as hero. License plate area empty. 50% negative space upper-left third. Black point at 10, desaturated 15% from natural. Kodak Portra 400 grain at 12% opacity. 5:4 landscape aspect ratio, 1920×1536 output.

REPLICATION NOTE (for Phase 2 real shoot)
Same atelier, same brass pendant key-light at 3200K, same X2D + 85mm f/2.8. Same 0.62 horizontal anchor, same three-quarter front low angle. Photograph the actual SF90 Spider with hard-top closed. Aim for paint-depth under raking light, carbon weave reading sharp, single warm highlight along the side-blade.
```

---

## 5 · Ferrari 330 GTC (1966)
**File:** `ferrari-330-gtc-placeholder.webp`

```
SCENE / BACKGROUND
Independent atelier showroom interior. Warm brick walls camera-left, oak herringbone parquet floor, single brass pendant lamp visible at frame top. Empty space around the subject — no other cars, no people.

SUBJECT
A 1966 Ferrari 330 GTC in Argento Nürburgring silver metallic. Profile side view, vehicle anchored at horizontal 0.62 of the frame. Pininfarina-designed coupé proportions. Borrani wire wheels with polished spokes. Chrome bumpers showing slight age patina. Chrome rocker trim. Headlights cold under chrome hoods. Hood closed. Stationary on parquet at original ride height.

CAMERA / LENS
Hasselblad X2D II medium format, 85mm portrait lens at f/3.5, ISO 100, 1/125s. RAW unprocessed, photorealistic photograph. Slight focal falloff at frame edges.

LIGHTING
One warm tungsten key at 3200K from camera upper-left at 30° elevation. Subtractive negative fill camera-right. Side-raked along the long bonnet to reveal panel transitions and chrome.

MATERIALS / TEXTURES
Single-stage lacquer paint with subtle 1960s orange-peel under raking light. Borrani wire-spoke chrome reading polished but with one dust mote visible on the hub. Chrome bumper with one micro-scratch near the over-rider (intentional age patina).

CONSTRAINTS
Single consistent shadow direction lower-right. Prancing Horse badge on grille visible but not centered. License plate area empty. 50% negative space frame-right. Black point at 10, desaturated 15% from natural. Kodachrome film register, grain at 14% opacity. 5:4 landscape aspect ratio, 1920×1536 output.

REPLICATION NOTE (for Phase 2 real shoot)
Same atelier, same brass pendant key-light at 3200K, same X2D + 85mm f/3.5. Same 0.62 horizontal anchor, same profile side angle. Photograph the actual 330 GTC. Aim for honest age patina on chrome, paint depth under raking light, Borrani wire-spoke sharpness at f/3.5.
```

---

## 6 · Ferrari F430 Spider (2008)
**File:** `ferrari-f430-spider-placeholder.webp`

```
SCENE / BACKGROUND
Independent atelier showroom interior. Warm brick walls camera-left, oak herringbone parquet floor, single brass pendant lamp visible at frame top. Empty space around the subject — no other cars, no people.

SUBJECT
A 2008 Ferrari F430 Spider in Giallo Modena yellow. Soft-top folded down, exposing black leather interior. Three-quarter front view, vehicle anchored at horizontal 0.62 of the frame. Front oval-mesh grille, twin headlight clusters. 19-inch Challenge-spoke wheels in graphite. Carbon engine cover visible behind cabin. Hood closed. Stationary on parquet at standard ride height.

CAMERA / LENS
Hasselblad X2D II medium format, 85mm portrait lens at f/2.8, ISO 100, 1/125s. RAW unprocessed, photorealistic photograph. Slight focal falloff at frame edges.

LIGHTING
One warm tungsten key at 3200K from camera upper-left at 30° elevation. Subtractive negative fill camera-right. Side-raked across the flank, single pendant highlight on the bonnet curve.

MATERIALS / TEXTURES
Deep Giallo Modena base-coat-clear-coat with orange-peel micro-texture. Carbon engine cover weave reading sharp at f/2.8. Black leather visible in open cabin — natural creases at seat-bolster.

CONSTRAINTS
Single consistent shadow direction lower-right. Prancing Horse badge visible but not centered. License plate area empty. 50% negative space upper-left. Black point at 10, desaturated 15% from natural. Kodak Portra 400 grain at 12% opacity. 5:4 landscape aspect ratio, 1920×1536 output.

REPLICATION NOTE (for Phase 2 real shoot)
Same atelier, same brass pendant key-light at 3200K, same X2D + 85mm f/2.8. Same 0.62 horizontal anchor, same three-quarter front angle. Photograph the actual F430 Spider with top folded. Aim for yellow paint depth, carbon weave sharpness, leather creases visible.
```

---

## 7 · Ferrari F8 Spider (2023)
**File:** `ferrari-f8-spider-placeholder.webp`

```
SCENE / BACKGROUND
Independent atelier showroom interior. Warm brick walls camera-left, oak herringbone parquet floor, single brass pendant lamp visible at frame top. Empty space around the subject — no other cars, no people.

SUBJECT
A 2023 Ferrari F8 Spider in Grigio Titanio metallic with a single Rosso Corsa lower-stripe (Atelier-bespoke configuration). Retractable hard-top closed. Three-quarter front view, vehicle anchored at horizontal 0.62 of the frame. 20-inch forged Y-spoke wheels in matte black. S-duct hood vent visible, side intakes, carbon mirror caps. Hood closed. Stationary on parquet.

CAMERA / LENS
Hasselblad X2D II medium format, 85mm portrait lens at f/2.8, ISO 100, 1/125s. RAW unprocessed, photorealistic photograph. Slight focal falloff at frame edges.

LIGHTING
One warm tungsten key at 3200K from camera upper-left at 30° elevation. Subtractive negative fill camera-right. Side-raked across the flank, single highlight along the S-duct edge.

MATERIALS / TEXTURES
Deep Grigio Titanio base-coat-clear-coat with orange-peel micro-texture. Rosso Corsa lower-stripe with crisp paint line. Carbon mirror caps reading sharp at f/2.8. One micro-dust speck on rear quarter (intentional imperfection).

CONSTRAINTS
Single consistent shadow direction lower-right. Prancing Horse badge visible but not centered. License plate area empty. 50% negative space upper-left. Black point at 10, desaturated 15% from natural. Kodak Portra 400 grain at 12% opacity. 5:4 landscape aspect ratio, 1920×1536 output.

REPLICATION NOTE (for Phase 2 real shoot)
Same atelier, same brass pendant key-light at 3200K, same X2D + 85mm f/2.8. Same 0.62 horizontal anchor, same three-quarter front angle. Photograph the actual F8 Spider with hard-top closed. Aim for paint-line precision on the bespoke stripe, S-duct shadow detail, carbon mirror weave sharp.
```

---

## 8 · Ferrari 812 GTS (2023)
**File:** `ferrari-812-gts-placeholder.webp`

```
SCENE / BACKGROUND
Independent atelier showroom interior. Warm brick walls camera-left, oak herringbone parquet floor, single brass pendant lamp visible at frame top. Empty space around the subject — no other cars, no people.

SUBJECT
A 2023 Ferrari 812 GTS in Blu Pozzi metallic blue (Atelier-bespoke). Soft-top folded down, exposing tan-cream leather interior. Profile side view to emphasise long front-engined V12 proportions, vehicle anchored at horizontal 0.62 of the frame. 20-inch diamond-finish wheels. Hood closed. Stationary on parquet at standard ride height.

CAMERA / LENS
Hasselblad X2D II medium format, 85mm portrait lens at f/3.2, ISO 100, 1/125s. RAW unprocessed, photorealistic photograph. Slight focal falloff at frame edges.

LIGHTING
One warm tungsten key at 3200K from camera upper-left at 30° elevation. Subtractive negative fill camera-right. Side-raked across the long bonnet to reveal the elongated GT silhouette.

MATERIALS / TEXTURES
Deep Blu Pozzi base-coat-clear-coat with orange-peel micro-texture. Tan-cream leather visible in open cabin — natural creases at seat-bolster. Diamond-finish wheel face reading sharp at f/3.2.

CONSTRAINTS
Single consistent shadow direction lower-right. Prancing Horse badge visible but not centered. License plate area empty. 50% negative space upper-left. Black point at 10, desaturated 15% from natural. Kodak Portra 400 grain at 12% opacity. 5:4 landscape aspect ratio, 1920×1536 output.

REPLICATION NOTE (for Phase 2 real shoot)
Same atelier, same brass pendant key-light at 3200K, same X2D + 85mm f/3.2. Same 0.62 horizontal anchor, same profile side angle. Photograph the actual 812 GTS with top folded. Aim for the long-bonnet proportions, paint depth, tan leather creases visible.
```

---

## 9 · Ferrari F12 NOVITEC N-Largo (2013)
**File:** `ferrari-f12-nlargo-placeholder.webp`

```
SCENE / BACKGROUND
Independent atelier showroom interior. Warm brick walls camera-left, oak herringbone parquet floor, single brass pendant lamp visible at frame top. Empty space around the subject — no other cars, no people.

SUBJECT
A 2013 Ferrari F12 Berlinetta with NOVITEC N-Largo wide-body conversion in Bianco Avus white. Three-quarter front view, vehicle anchored at horizontal 0.62 of the frame. Wide-body fender flares visible, custom carbon front splitter, NOVITEC rear wing. 21-inch staggered NOVITEC NF7 wheels in dark graphite. Hood closed. Stationary on parquet.

CAMERA / LENS
Hasselblad X2D II medium format, 85mm portrait lens at f/2.8, ISO 100, 1/125s. RAW unprocessed, photorealistic photograph. Slight focal falloff at frame edges.

LIGHTING
One warm tungsten key at 3200K from camera upper-left at 30° elevation. Subtractive negative fill camera-right. Side-raked across the wide-body fender to reveal flare transition to original bodywork.

MATERIALS / TEXTURES
Deep Bianco Avus base-coat-clear-coat with orange-peel micro-texture. Carbon weave on splitter and wing reading sharp at f/2.8. Wheel face catching one warm pendant reflection. One micro-dust speck on lower fender flare.

CONSTRAINTS
Single consistent shadow direction lower-right. Prancing Horse badge visible but not centered. License plate area empty. 50% negative space upper-left. Black point at 10, desaturated 15% from natural. Kodak Portra 400 grain at 12% opacity. 5:4 landscape aspect ratio, 1920×1536 output.

REPLICATION NOTE (for Phase 2 real shoot)
Same atelier, same brass pendant key-light at 3200K, same X2D + 85mm f/2.8. Same 0.62 horizontal anchor, same three-quarter front angle. Photograph the actual N-Largo example. Aim for fender-flare transition crisp under raking light, carbon weave detail sharp, wheel face catching pendant.
```

---

## 10 · Ferrari 365 GTB/4 Daytona Competizione (1977)
**File:** `ferrari-365-daytona-placeholder.webp`

```
SCENE / BACKGROUND
Independent atelier showroom interior. Warm brick walls camera-left, oak herringbone parquet floor, single brass pendant lamp visible at frame top. Empty space around the subject — no other cars, no people.

SUBJECT
A 1977 Ferrari 365 GTB/4 Daytona with period-correct Competizione conversion in Rosso Corsa red with twin white racing stripes running bonnet to tail. Profile side view, vehicle anchored at horizontal 0.62 of the frame. Quad-headlight setup behind Plexiglas cover. Magnesium racing wheels (Cromodora style). Side-exit racing exhaust visible. Bonnet leather straps. Hood closed. Stationary on parquet.

CAMERA / LENS
Hasselblad X2D II medium format, 85mm portrait lens at f/3.2, ISO 100, 1/125s. RAW unprocessed, photorealistic photograph. Slight focal falloff at frame edges.

LIGHTING
One warm tungsten key at 3200K from camera upper-left at 30° elevation. Subtractive negative fill camera-right. Side-raked along the long Daytona flank.

MATERIALS / TEXTURES
Single-stage lacquer paint with subtle 1970s orange-peel under raking light. White stripe with crisp paint line. Magnesium wheel face reading slightly dull (period-correct, not polished). Leather hood straps showing natural wear creases.

CONSTRAINTS
Single consistent shadow direction lower-right. Prancing Horse badge visible but not centered. License plate area empty. 50% negative space frame-right. Black point at 10, desaturated 15% from natural. Kodachrome film register, grain at 14% opacity. 5:4 landscape aspect ratio, 1920×1536 output.

REPLICATION NOTE (for Phase 2 real shoot)
Same atelier, same brass pendant key-light at 3200K, same X2D + 85mm f/3.2. Same 0.62 horizontal anchor, same profile side angle. Photograph the actual Daytona Competizione. Aim for stripe-line precision, magnesium wheel honest patina, leather strap wear visible.
```

---

## 11 · Ferrari 400 GT Cabrio Straman (1979)
**File:** `ferrari-400gt-cabrio-placeholder.webp`

```
SCENE / BACKGROUND
Independent atelier showroom interior. Warm brick walls camera-left, oak herringbone parquet floor, single brass pendant lamp visible at frame top. Empty space around the subject — no other cars, no people.

SUBJECT
A 1979 Ferrari 400 GT with Straman cabriolet conversion in Marrone Colorado dark metallic brown. Soft-top folded down, exposing tan leather interior. Profile side view to emphasise the square-shouldered 1970s grand-tourer proportions, vehicle anchored at horizontal 0.62 of the frame. 15-inch alloy wheels. Hood closed. Stationary on parquet at original ride height.

CAMERA / LENS
Hasselblad X2D II medium format, 85mm portrait lens at f/3.5, ISO 100, 1/125s. RAW unprocessed, photorealistic photograph. Slight focal falloff at frame edges.

LIGHTING
One warm tungsten key at 3200K from camera upper-left at 30° elevation. Subtractive negative fill camera-right. Side-raked along the flank to reveal panel transitions.

MATERIALS / TEXTURES
Single-stage lacquer paint with subtle 1970s orange-peel under raking light. Tan leather visible in open cabin — natural creases on bolsters and steering wheel. Chrome trim showing slight age patina.

CONSTRAINTS
Single consistent shadow direction lower-right. Prancing Horse badge visible but not centered. License plate area empty. 50% negative space frame-right. Black point at 10, desaturated 15% from natural. Kodachrome film register, grain at 14% opacity. 5:4 landscape aspect ratio, 1920×1536 output.

REPLICATION NOTE (for Phase 2 real shoot)
Same atelier, same brass pendant key-light at 3200K, same X2D + 85mm f/3.5. Same 0.62 horizontal anchor, same profile side angle. Photograph the actual 400 GT Straman with top folded. Aim for square-shoulder proportions, leather creases, honest chrome patina.
```

---

## 12 · Ferrari 12Cilindri (2025)
**File:** `ferrari-12cilindri-placeholder.webp`

```
SCENE / BACKGROUND
Independent atelier showroom interior. Warm brick walls camera-left, oak herringbone parquet floor, single brass pendant lamp visible at frame top. Empty space around the subject — no other cars, no people.

SUBJECT
A 2025 Ferrari 12Cilindri coupé in Nero Daytona deep metallic black. Three-quarter front view, vehicle anchored at horizontal 0.62 of the frame. Minimalist front mask (no traditional grille, two horizontal LED bands). Long sculpted bonnet, fastback rear. 21-inch forged wheels in dark graphite. Hood closed. Stationary on parquet at standard ride height.

CAMERA / LENS
Hasselblad X2D II medium format, 85mm portrait lens at f/2.8, ISO 100, 1/125s. RAW unprocessed, photorealistic photograph. Slight focal falloff at frame edges.

LIGHTING
One warm tungsten key at 3200K from camera upper-left at 30° elevation. Subtractive negative fill camera-right. Side-raked across the long bonnet to reveal the sculpted body lines.

MATERIALS / TEXTURES
Deep Nero Daytona base-coat-clear-coat with orange-peel micro-texture catching one pendant warm highlight on the bonnet curve. LED-band cold. Wheel face matte graphite reading sharp at f/2.8.

CONSTRAINTS
Single consistent shadow direction lower-right. Prancing Horse badge visible but not centered. License plate area empty. 50% negative space upper-left. Black point at 10, desaturated 15% from natural. Kodak Portra 400 grain at 12% opacity. 5:4 landscape aspect ratio, 1920×1536 output.

REPLICATION NOTE (for Phase 2 real shoot)
Same atelier, same brass pendant key-light at 3200K, same X2D + 85mm f/2.8. Same 0.62 horizontal anchor, same three-quarter front angle. Photograph the actual 12Cilindri. Aim for the minimalist front-mask treatment, sculpted bonnet shadow under raking light, paint-depth on black metallic.
```

---

## 13 · Lamborghini Urus SE (2024)
**File:** `lamborghini-urus-se-placeholder.webp`

```
SCENE / BACKGROUND
Independent atelier showroom interior. Warm brick walls camera-left, oak herringbone parquet floor, single brass pendant lamp visible at frame top. Empty space around the subject — no other cars, no people.

SUBJECT
A 2024 Lamborghini Urus SE plug-in hybrid in Arancio Borealis deep orange metallic. Three-quarter front view from slightly lowered camera, vehicle anchored at horizontal 0.62 of the frame. 23-inch Taigete diamond-cut wheels in gloss black. Carbon front splitter, carbon side skirts, carbon rear diffuser in visible weave finish. Y-shaped front DRL bands, hexagonal grille. Hood closed. Stationary on parquet.

CAMERA / LENS
Hasselblad X2D II medium format, 85mm portrait lens at f/2.8, ISO 100, 1/125s. RAW unprocessed, photorealistic photograph. Slight focal falloff at frame edges.

LIGHTING
One warm tungsten key at 3200K from camera upper-left at 30° elevation. Subtractive negative fill camera-right. Side-raked across the angular fender to reveal sculpted body lines.

MATERIALS / TEXTURES
Deep Arancio base-coat-clear-coat with orange-peel micro-texture. Carbon weave reading sharp at f/2.8. Diamond-cut wheel face catching one warm pendant reflection. One micro-dust speck on lower bumper.

CONSTRAINTS
Single consistent shadow direction lower-right. Raging Bull badge on bonnet visible but not centered. License plate area empty. 50% negative space upper-left. Black point at 10, desaturated 15% from natural. Kodak Portra 400 grain at 12% opacity. 5:4 landscape aspect ratio, 1920×1536 output.

REPLICATION NOTE (for Phase 2 real shoot)
Same atelier, same brass pendant key-light at 3200K, same X2D + 85mm f/2.8. Same 0.62 horizontal anchor, same three-quarter front low angle. Photograph the actual Urus SE. Aim for orange paint depth, carbon weave sharp, diamond-cut wheel catching warm pendant.
```

---

## 14 · Maserati MC20 (2024)
**File:** `maserati-mc20-placeholder.webp`

```
SCENE / BACKGROUND
Independent atelier showroom interior. Warm brick walls camera-left, oak herringbone parquet floor, single brass pendant lamp visible at frame top. Empty space around the subject — no other cars, no people.

SUBJECT
A 2024 Maserati MC20 in Bianco Audace white. Three-quarter front view from slightly lowered camera, vehicle anchored at horizontal 0.62 of the frame. Carbon front splitter, carbon side skirts, carbon roof, carbon rear diffuser — all visible carbon weave finish. Butterfly doors closed but seam visible. 20-inch forged wheels in graphite. Trident grille badge. Hood closed.

CAMERA / LENS
Hasselblad X2D II medium format, 85mm portrait lens at f/2.8, ISO 100, 1/125s. RAW unprocessed, photorealistic photograph. Slight focal falloff at frame edges.

LIGHTING
One warm tungsten key at 3200K from camera upper-left at 30° elevation. Subtractive negative fill camera-right. Side-raked across the carbon roof and flank.

MATERIALS / TEXTURES
Deep Bianco Audace base-coat-clear-coat with orange-peel micro-texture. Carbon weave on roof, splitter, skirts, diffuser reading sharp at f/2.8. Butterfly-door seam line precise. Front lift-system gap visible at front splitter (raised position).

CONSTRAINTS
Single consistent shadow direction lower-right. Trident badge on grille visible but not centered. License plate area empty. 50% negative space upper-left. Black point at 10, desaturated 15% from natural. Kodak Portra 400 grain at 12% opacity. 5:4 landscape aspect ratio, 1920×1536 output.

REPLICATION NOTE (for Phase 2 real shoot)
Same atelier, same brass pendant key-light at 3200K, same X2D + 85mm f/2.8. Same 0.62 horizontal anchor, same three-quarter front low angle. Photograph the actual MC20 with lift-system raised. Aim for carbon weave detail across all panels, butterfly-door seam precision.
```

---

## 15 · Maserati Granturismo Trofeo (2024)
**File:** `maserati-granturismo-trofeo-placeholder.webp`

```
SCENE / BACKGROUND
Independent atelier showroom interior. Warm brick walls camera-left, oak herringbone parquet floor, single brass pendant lamp visible at frame top. Empty space around the subject — no other cars, no people.

SUBJECT
A 2024 Maserati Granturismo Trofeo in Blu Nobile royal blue metallic. Profile side view, vehicle anchored at horizontal 0.62 of the frame. Long bonnet, fastback rear proportions. 20-inch Trofeo sport wheels, red brake calipers visible behind wheel spokes. Trident grille badge. Front splitter in body colour. Hood closed. Stationary on parquet at standard ride height.

CAMERA / LENS
Hasselblad X2D II medium format, 85mm portrait lens at f/3.0, ISO 100, 1/125s. RAW unprocessed, photorealistic photograph. Slight focal falloff at frame edges.

LIGHTING
One warm tungsten key at 3200K from camera upper-left at 30° elevation. Subtractive negative fill camera-right. Side-raked along the long bonnet to reveal the gran-tourer silhouette.

MATERIALS / TEXTURES
Deep Blu Nobile base-coat-clear-coat with orange-peel micro-texture catching one warm pendant highlight along the side crease line. Red brake caliper paint reading saturated through wheel spokes. Tyre sidewall lettering visible but not centered.

CONSTRAINTS
Single consistent shadow direction lower-right. Trident badge visible but not centered. License plate area empty. 50% negative space frame-right. Black point at 10, desaturated 15% from natural. Kodak Portra 400 grain at 12% opacity. 5:4 landscape aspect ratio, 1920×1536 output.

REPLICATION NOTE (for Phase 2 real shoot)
Same atelier, same brass pendant key-light at 3200K, same X2D + 85mm f/3.0. Same 0.62 horizontal anchor, same profile side angle. Photograph the actual Granturismo Trofeo. Aim for the long-bonnet silhouette, paint depth, red caliper saturation through wheel spokes.
```

---

## 16 · Porsche Panamera Turbo (2010)
**File:** `porsche-panamera-turbo-placeholder.webp`

```
SCENE / BACKGROUND
Independent atelier showroom interior. Warm brick walls camera-left, oak herringbone parquet floor, single brass pendant lamp visible at frame top. Empty space around the subject — no other cars, no people.

SUBJECT
A 2010 first-generation Porsche Panamera Turbo in Basalt Black metallic. Profile side view to emphasise the distinctive Panamera-meets-911 silhouette, vehicle anchored at horizontal 0.62 of the frame. 20-inch Turbo II wheels in body-colour painted finish. Air suspension at slightly lowered ride height. Honest patina near lower sill where stone-chips have been touched up. Hood closed.

CAMERA / LENS
Hasselblad X2D II medium format, 85mm portrait lens at f/3.5, ISO 100, 1/125s. RAW unprocessed, photorealistic photograph. Slight focal falloff at frame edges.

LIGHTING
One warm tungsten key at 3200K from camera upper-left at 30° elevation. Subtractive negative fill camera-right. Side-raked along the long flank to reveal panel transitions.

MATERIALS / TEXTURES
Deep Basalt Black base-coat-clear-coat with orange-peel micro-texture catching one warm pendant highlight on the bonnet curve. Wheel face polished but not mirror-perfect. Lower sill paint showing honest touch-up texture (15 years of careful use).

CONSTRAINTS
Single consistent shadow direction lower-right. Porsche crest on bonnet visible but not centered. License plate area empty. 50% negative space frame-right. Black point at 10, desaturated 15% from natural. Kodak Portra 400 grain at 12% opacity. 5:4 landscape aspect ratio, 1920×1536 output.

REPLICATION NOTE (for Phase 2 real shoot)
Same atelier, same brass pendant key-light at 3200K, same X2D + 85mm f/3.5. Same 0.62 horizontal anchor, same profile side angle. Photograph the actual Panamera. Aim for honest 15-year patina on lower sill, paint depth, distinctive first-gen silhouette.
```

---

## 17 · Rolls-Royce Cullinan (2019)
**File:** `rolls-royce-cullinan-placeholder.webp`

```
SCENE / BACKGROUND
Independent atelier showroom interior. Warm brick walls camera-left, oak herringbone parquet floor, single brass pendant lamp visible at frame top. Empty space around the subject — no other cars, no people.

SUBJECT
A 2019 Rolls-Royce Cullinan in Arctic White solid paint. Three-quarter front view, vehicle anchored at horizontal 0.62 of the frame. Pantheon grille polished, laser-headlights visible. Spirit of Ecstasy hood ornament catching one warm highlight. 24-inch directional polished wheels. Coach-doors closed. Hood closed. Stationary on parquet at standard ride height.

CAMERA / LENS
Hasselblad X2D II medium format, 85mm portrait lens at f/3.2, ISO 100, 1/125s. RAW unprocessed, photorealistic photograph. Slight focal falloff at frame edges.

LIGHTING
One warm tungsten key at 3200K from camera upper-left at 30° elevation. Subtractive negative fill camera-right. Side-raked across the upright Pantheon grille and long flank.

MATERIALS / TEXTURES
Arctic White solid paint reading deeply matte-to-satin under raking light. Pantheon grille polished but with one micro-dust speck near the badge (intentional imperfection). 24-inch wheel face catching one warm pendant reflection. Tyre sidewall lettering visible but not centered.

CONSTRAINTS
Single consistent shadow direction lower-right. Spirit of Ecstasy visible but not centered as hero. License plate area empty. 50% negative space upper-left. Black point at 10, desaturated 15% from natural. Kodak Portra 400 grain at 12% opacity. 5:4 landscape aspect ratio, 1920×1536 output.

REPLICATION NOTE (for Phase 2 real shoot)
Same atelier, same brass pendant key-light at 3200K, same X2D + 85mm f/3.2. Same 0.62 horizontal anchor, same three-quarter front angle. Photograph the actual Cullinan. Aim for Pantheon grille polish, white paint reading deep-satin, Spirit of Ecstasy single warm highlight.
```

---

## 18 · Rolls-Royce Ghost Series II (2018)
**File:** `rolls-royce-ghost-placeholder.webp`

```
SCENE / BACKGROUND
Independent atelier showroom interior. Warm brick walls camera-left, oak herringbone parquet floor, single brass pendant lamp visible at frame top. Empty space around the subject — no other cars, no people.

SUBJECT
A 2018 Rolls-Royce Ghost Series II in Silver Shadow metallic. Profile side view to emphasise the elegant long-saloon proportions, vehicle anchored at horizontal 0.62 of the frame. Coach-doors closed, suicide rear-door hinge visible. 21-inch polished wheels. Chrome window-line catching one warm pendant highlight. Spirit of Ecstasy hood ornament visible. Hood closed.

CAMERA / LENS
Hasselblad X2D II medium format, 85mm portrait lens at f/3.5, ISO 100, 1/125s. RAW unprocessed, photorealistic photograph. Slight focal falloff at frame edges.

LIGHTING
One warm tungsten key at 3200K from camera upper-left at 30° elevation. Subtractive negative fill camera-right. Side-raked along the long limousine flank to reveal panel transitions and chrome.

MATERIALS / TEXTURES
Deep Silver Shadow metallic base-coat-clear-coat with orange-peel micro-texture. Chrome window-line polished. Polished wheel face catching one warm pendant reflection. One micro-fingerprint smudge near the suicide-door handle (intentional imperfection).

CONSTRAINTS
Single consistent shadow direction lower-right. Spirit of Ecstasy visible but not centered as hero. License plate area empty. 50% negative space frame-right. Black point at 10, desaturated 15% from natural. Kodak Portra 400 grain at 12% opacity. 5:4 landscape aspect ratio, 1920×1536 output.

REPLICATION NOTE (for Phase 2 real shoot)
Same atelier, same brass pendant key-light at 3200K, same X2D + 85mm f/3.5. Same 0.62 horizontal anchor, same profile side angle. Photograph the actual Ghost Series II. Aim for the elongated saloon proportions, chrome window-line warm highlight, paint depth.
```

---

## Quality-Bar-Check (Rule 14 — pro Bild durchgehen)

Vor Commit jedes Bild gegen diese 15 Punkte prüfen (siehe `top-web/rules/14-visual-discipline.md` für Details):

- [ ] Camera-spec: Hasselblad X2D + 85mm + concrete f-stop visible
- [ ] Kelvin: 3000-3400K tungsten OR 4800-5200K daylight (nie 5600K)
- [ ] Side-rake key at 15-35° elevation, subtractive fill opposite
- [ ] Negative space ~50-70% upper-left or upper-right
- [ ] Subject at golden ratio (~0.62 horizontal)
- [ ] Asymmetric counterweight (1 shadow OR 1 highlight, niemals 2. Subject)
- [ ] Saturation desaturated 10-20% from natural
- [ ] Black point 8-12 (nicht crushed, nicht lifted über 18)
- [ ] Grain at 8-15% opacity, Portra 400 character
- [ ] Material-truth visible: paint depth, panel transition, micro-detail
- [ ] One intentional imperfection (dust mote, fingerprint, micro-scratch)
- [ ] Palette: 3-4 hues max — atelier warm browns + vehicle hue + light highlight
- [ ] Anatomy-check: vehicle proportions correct vs reference photos
- [ ] Aspect 5:4 landscape, 1920×1536 minimum
- [ ] Filename `{id}-placeholder.webp` with -placeholder suffix

## Anti-Patterns (NICHT generieren — Rule 14 vocab-blacklist)

Aus Prompts und Output strikt eliminiert:
- ❌ Wörter: "cinematic", "dramatic", "epic", "stunning", "breathtaking", "premium", "luxury", "high quality", "ultra-realistic", "beautiful", "amazing", "magical"
- ❌ Pure white CGI-render-studio background
- ❌ Wet asphalt urban-night reflections
- ❌ Race-track action shots
- ❌ Driver inside car
- ❌ Aerial drone view
- ❌ Wide-angle lens distortion (unter 35mm)
- ❌ HDR halos / clipped highlights
- ❌ Symmetric centered subject
- ❌ Multiple light sources / contradicting shadows
- ❌ Chrome-bumper hero-tier (1950s magazine)

## Phase 2 — Real Shoot Notes

Diese 18 AI-generierten Bilder sind **Phase-1-Placeholders** mit Production-Tier-Quality (per Rule 13). Phase 2 = echter Foto-Shoot mit:

- Hasselblad X2D II + 85mm f/2.8 (oder Phase One IQ4)
- Im echten Atelier Engesserstraße 1 Freiburg
- Brass pendants ON, window-fill subtracted via black flag
- Goldene Stunde (16:00-17:30 Winter, 18:00-19:30 Sommer)
- Vehicles in factory ride-height
- Photograph nutzt die REPLICATION NOTE pro Vehicle als 1:1 storyboard
- Output: ersetzt `{id}-placeholder.webp` durch `{id}.webp` — kein Code-Change nötig

Filename-Suffix `-placeholder` ist Production-Swap-Garantie per Rule 13.
