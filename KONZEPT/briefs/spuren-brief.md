# Spuren — Customer-with-Vehicle Photos (Phase 1 Placeholder)

> 8 AI-generierte Photorealism-Tier-Placeholder via GPT Image 2 (Mai 2026).
> Werden später beim echten Foto-Shoot in der Engesserstraße per Customer-
> mit-Vehicle-Photo 1:1 ersetzt (Rule 13 1:1-Swap-Workflow). Code-Änderung
> pro Real-Photo = 0 Zeilen (Filename gleich, Suffix `-placeholder` bleibt
> bis Real-Shoot dann entfernt).

---

## Mapping zu SPUREN_LEDGER

Jedes Photo deckt eine Manufacturer-Gruppe ab. Bei mehreren Photos pro
Brand alternieren über Index (z.B. Porsche 06 + 08).

| Photo | Vehicle / Subject | Cards-Abdeckung (Manufacturer) |
|---|---|---|
| 01 | Aston Martin DBS · South-Asian-European male 38 | ASTON MARTIN |
| 02 | Bentley Continental GT V8 · White-European female 55 | BENTLEY |
| 03 | Ferrari 488 Pista · Mediterranean-European male 47 | FERRARI |
| 04 | Lamborghini Urus · East-Asian-European female 42 | LAMBORGHINI |
| 05 | Maserati MC20 · Mixed-race male 48 | MASERATI |
| 06 | Porsche 911 GT3 RS · White-European male 35 | PORSCHE (alternating mit 08) |
| 07 | Rolls-Royce Wraith · White-European male 62 | ROLLS ROYCE |
| 08 | Porsche 911 Carrera S · Mediterranean-European female 49 | PORSCHE (alternating mit 06) |

**Quote-Card-Specific-Match** (entries mit `quoteKey` bekommen das matchende
Photo zugewiesen, nicht nur Manufacturer-Fallback):
- quote1 (Sammler · Zürich, Rolls-Royce Wraith) → Photo 07
- quote2 (Unternehmer · München, Ferrari 488 Pista) → Photo 03
- quote3 (Privatkunde · Wien, Bentley Continental GT V8) → Photo 02

---

## Photo-Strategy (Rule 13 + Rule 14 Person-Photo Tier-Calibration)

**Photorealism-Tier-Pattern** verwendet (nicht Editorial-Tier — siehe
`rules/14-visual-discipline.md#person-photo-tier-calibration--ai-placeholder-vs-real-shoot-may-2026`):

- Camera-aware Subject (looking directly at camera)
- Centered composition mit Vehicle hinter Subject
- Soft natural daylight (neutral-warm)
- Anti-CGI Vocabulary stack explizit
- Simple showroom-wall background (KEIN multi-material Editorial-Bühne)
- Explicit "no manufacturer logos / brand signage on wall / background characters"
- Demographic-Spread: 4M + 4F, ages 35-62, ethnic mix (white European,
  Mediterranean, South-Asian, East-Asian, mixed-race)

---

## Real-Shoot-Workflow (Phase 2)

Photograph bekommt:
1. Die 8 `-placeholder.webp` als visuelle Vorlage (was die Card zeigen soll)
2. Diese `_brief.md` (Setting, Pose, Mood per Photo)
3. BRAND.md Section 7 (Stamm-Demographics + Discretion-Rules)

Photograph repliziert per Customer-with-Vehicle-Photo 1:1 in der
Engesserstraße. Output: `spuren-0X-{slug}.webp` (Suffix `-placeholder`
entfernt). Code-Änderung: keine — Filename-Swap nur.

**Customer-Consent-Pflicht:** vor jedem Real-Customer-Shot expliziter
Anonymitäts-Check — Pseudonym + Stadt bleiben (Sammler · Zürich), echter
Name niemals in Card. Foto-Release-Form Pflicht.

---

## Quality-Bar (Rule 14)

Per 26-Punkt-Quality-Bar geprüft beim Commit:
- ✓ Photo-Craft (Camera-Anker, Kelvin neutral-warm, Composition centered)
- ✓ Demographic-Spread (8 verschiedene Personas, kein Mono-Type-Cluster)
- ✓ Anti-AI-Tells (explicit "no CGI look, no plastic-looking face")
- ✓ Industry-Tier (Auto-Atelier-Register, nicht Gallery-Tier)
- ✓ No background brand-logos / signage (User-Constraint Mai 2026)
- ✓ Vehicle-Identification (Grill, Badge, Silhouette signature visible)

---

## Generation-Prompts (für Re-Generation falls nötig)

Siehe Conversation-History Mai 2026 für die 8 vollständigen Prompts.
Pattern dokumentiert in `top-web/templates/gpt-image-2-prompts.md`
Kategorie E "Person-with-Subject (AI-Placeholder)".
