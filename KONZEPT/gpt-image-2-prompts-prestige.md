# Prestige Selections — Atmospheric-Background-Leitplanken

> **Prinzip:** Nur Regeln und projekt-spezifische Leitplanken, keine
> fertigen Prompts oder Beispiel-Assets. Jeder Atmospheric wird frisch
> erzeugt anhand dieser Leitplanken und der globalen Regeln.
>
> **Pflicht-Vorab-Lese:** [`BRAND.md`](../BRAND.md) — Single-Source-Of-Truth
> für Brand-Identität. Alle Brand-Werte (Palette, Materialien, Form-Family,
> Grain, Tonality) leben dort, nicht hier.
>
> **Globale Regel:** [`~/.claude/skills/top-web/rules/10-abstract-backgrounds.md`](file:///Users/svenpflueger/.claude/skills/top-web/rules/10-abstract-backgrounds.md)

---

## Projekt-Setzungen (einmalig, dann fix)

### 1. Palette-Family (warm-luxury-dark)

| Token | Hex | Rolle |
|---|---|---|
| Charcoal-Brown | `#2B2520` | Deep shadow, base atmosphere |
| Walnut-Dark | `#4A3520` | Mid-shadow warm |
| Cognac | `#8C5028` | Warm tone primary |
| Amber-Gold | `#C49A0C` | Brand accent (gold-deep) |
| Patina-Cream | `#F2EDE3` | Light surface, rare specular |

Maximum 5 Colors pro Atmospheric. Akzent (Amber-Gold) ≤ 10% der Fläche.
Color-Temperature-Shift innerhalb des Atmospherics: 30-40° max.

### 2. Form-Family

Eine einzige Form-Sprache durchgängig — kein Mischen mit fremden
Form-Idiomen. Die Form-Family des Projekts bleibt projektintern definiert
und wird pro Atmospheric frisch interpretiert, nie kopiert.

### 3. Grain-Stärke

Durchgängig 8-10% heavy 35mm film grain auf jedem Atmospheric. Niemals
weglassen, niemals variieren.

### 4. Composition-Pflicht

Off-axis ist Pflicht. Zentrierte Komposition ist verboten. Diagonale
Flow-Lines, Drittel-Regel-Focal-Points, asymmetrische Negative-Space.

### 5. Asset-Count-Maximum

Maximum 5 Atmospherics auf der gesamten Site (kombiniert über alle
Sections). Mehr = Mesh-Saturation, kills Signature-Feel.

Wenn eine Section eine sechste Atmospheric "bräuchte" → re-prüfen, ob
sie wirklich eine braucht oder ob ein vorhandenes Asset re-used werden
kann, ODER ob hier ein echtes Foto die richtigere Antwort ist.

### 6. Production-Mode

AI-Image-Generation (May 2026 Standard) als Default. Für Hero-Assets
darf auf höheres Render-Tier hochgezogen werden.

### 7. Animation-Curve (wenn animiert)

Slow loop nur, 15-20s Dauer. Linear oder ease-in-out. `prefers-reduced-motion`
→ statisches Poster. WebGL-Performance, nicht CSS-keyframe.

---

## Section-Slot-Map (welche Section bekommt ein Atmospheric)

| Section | Atmospheric? | Logik |
|---|---|---|
| TorReveal Hero | ja / optional | Signature-Slot, hier ist es zulässig |
| EineStimme Quote-Card | ja, subtle | Hinter Founder-Quote zulässig |
| EineStimme Portrait-Card | **nein** | Echtes Foto Jérôme — Photo-Logik |
| EineStimme Stats-Cards | **nein** | Set-Cohesion, Clarity |
| EineStimme Editorial-Card | ja, subtle | Zulässig wenn Material-Macro |
| Schaufenster Triptychon | **nein** | Echte Vehicle-Fotos — Photo-Logik |
| Markenwelt | ja, subtle | Brand-Atmospheric zulässig |
| Services Cards | ja, subtle | Material-Macros zulässig |
| Methode | ja, subtle | Material-Macro oder Light-Atmospheric |
| Spuren | nur Historic Artifact | Editorial-Long-Form sonst Atmospheric-frei |
| Concierge Address-Card | **nein** | Echtes Building-Foto — Photo-Logik |
| Concierge Channel-Cards | **nein** | Clarity für Kontaktdaten |
| Concierge Ankauf-Teaser | ja, subtle | CTA-Backdrop zulässig |
| Newsletter-Footer | ja, subtle | CTA-Backdrop zulässig |
| 404 / Confirm / Modal | ja | Quiet Editorial Atmospheric |

→ Atmospheric-Bedarf der Site insgesamt: ungefähr 4-5 Assets, da Re-Use
über mehrere Slots erlaubt und gewünscht ist.

---

## Was vom Fotografen kommt (kein Atmospheric)

Ein Foto-Shooting-Tag in Freiburg deckt das ganze ab:

- Founder-Portrait Jérôme Gay
- Engesserstraße Building außen + innen
- Atelier Detail-Shots (für Werkstatt-Page)
- 142-Inspektions-Punkte Story-Fotos
- Customer-Story-Fotos (aus echten Quellen)
- Vehicle-Fotos (rotierend, pro Fahrzeug-Einlieferung)

Diese Slots sind explizit Photo-Logik — Atmospherics sind hier verboten.

---

## Brief-Template für frische Atmospheric-Generierung

Pro Atmospheric-Slot wird ein neuer Brief geschrieben. Niemals einen
vorherigen Brief kopieren und anpassen — immer frisch denken vom Slot
ausgehend.

```
1. SLOT — welche Section, welche Position, welche Opacity-Range
2. KATEGORIE — Color-Field / Material-Macro / Form-Render / Light-Study
3. KOMPOSITION — wo Focal-Point, wo Negative-Space (off-axis Pflicht)
4. FORM — frische Interpretation der Projekt-Form-Family
5. PALETTE — aus den 5 Tokens, konkret welche und welches Verhältnis
6. LIGHT — Direction + Quality
7. TEXTURE — 8-10% Grain Pflicht
8. CONSTRAINTS — was darf NICHT erscheinen (siehe Anti-Pretension)
9. ASPECT + QUALITY
10. RE-USE-POTENTIAL — kann dieses Asset auch in anderen Slots dienen?
```

---

## Anti-Pretension (Strict für Prestige)

Atmospherics dürfen NIEMALS darstellen:

❌ Das Engesserstraße-Gebäude (echtes Foto Pflicht)
❌ Den echten Atelier-Innenraum (echtes Foto Pflicht)
❌ Jérôme oder Mitarbeiter (echtes Foto Pflicht)
❌ Vehicles (echte Foto Pflicht, rotieren wöchentlich)
❌ Workshop-Tools, Spec-Sheets, Logbücher mit erkennbarer Funktion
❌ Freiburger Architektur, Schwarzwald-Landschaft mit Landmarks
❌ Anything that suggests "this is THE place, THE car, THE person"

Erlaubt:
✅ Pure Material-Macros so close, dass die Materialform unidentifizierbar
   wird (kein "ein Brett aus Walnut-Holz", sondern reine warme Holztextur)
✅ Pure Color-Field-Renders (Mesh-Gradients, Ribbon-Forms)
✅ Pure Light-Atmosphere (Volumetric Beam, Diffuse Glow) ohne identifizierbare
   Architektur drumherum
✅ Historische Dokumente (Karten, Briefe) wenn era-authentisch

---

## Pre-Commit-Check pro Atmospheric

Vor jedem Asset prüfen:

1. Logik-Wahl: Atmospheric (nicht Photo)?
2. Palette: Alle Colors aus den 5 Tokens?
3. Temp-Shift: 30-40°?
4. Grain: 8-10% drauf?
5. Composition: Off-axis?
6. Form: Frische Interpretation, keine Kopie?
7. Anti-Pretension: Keine echten Locations/Personen/Vehicles erkennbar?
8. Asset-Count-Limit: Bleibt die Site unter Max 5?
9. Re-Use: Kann das Asset in mehreren Slots dienen?
10. Restraint: Geht's noch zurückgenommener?

Bei NEIN → refactor oder neu generieren.

---

## Frisch-Generieren-Prinzip

Wenn ein Atmospheric für einen Slot gebraucht wird:

1. Brief frisch schreiben anhand der Projekt-Setzungen oben
2. Generieren via AI-Image-Tool May-2026-Standard
3. 3-4 Variants prüfen
4. Beste gegen Pre-Commit-Check
5. PNG in `/public/assets/atmospherics/` mit beschreibendem Slug
6. Im Code referenzieren

Nicht: aus alter Liste wählen, alten Prompt kopieren-modifizieren,
Vorlagen-Generator füttern.

Jedes Atmospheric ist ein Original im Brand-Korridor.
