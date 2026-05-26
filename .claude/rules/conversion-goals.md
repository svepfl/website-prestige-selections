---
description: Conversion-goal enforcement — every page must serve a buyer-funnel role
paths:
  - "src/app/[locale]/**"
---

# Conversion-Goal Rules

> Jede Seite gehört in genau eine der 5 Conversion-Rollen. Wenn eine Seite nicht zuordenbar ist, gehört sie nicht ins System.

## Conversion-Rollen

Jede Seite **muss eine dieser Rollen** haben:

| Rolle | Was sie tut | Beispiele |
|---|---|---|
| **TRUST** | Vertrauen aufbauen | /uber-uns, Heritage-Akt 7, Atelier |
| **CURATION** | Auswahl zeigen | /kollektion, Akt 4 |
| **EVALUATION** | Fahrzeug bewerten lassen | Vehicle Detail Page |
| **CONTACT** | Friction zur Anfrage senken | /kontakt, Akt 10, Mobile-Pill |
| **OPERATIONS** | Bestandskunden pflegen | /garage, /briefkasten |

Plus:
- **AUTHORITY** (SEO/GEO) — /journal, /uber-uns indirekt
- **LEGAL** — Impressum, AGB, Datenschutz, Widerruf

## Pflicht-Elemente pro Seite

### Mobile-Number sichtbar
**Auf JEDER Seite** muss `+49 761 5573168` erreichbar sein:
- Im Header (sticky desktop, prominent mobile)
- Auf Vehicle-Detail-Page zusätzlich als floating Pill rechts unten

### CTA-Hierarchie
- **Primär-CTA:** "Sprechen wir." (führt zu Concierge/Phone)
- **Maximal 1 Primär-CTA pro Section** (außer Concierge-Akt)
- **Sekundär-CTAs:** Text-Links, niemals visuell mit Primär konkurrieren

### Klare Conversion-Pfade
Pro Page muss ein klarer "wo führt das hin?" Pfad existieren:
- Homepage → /kollektion + /kontakt
- /kollektion → Detail-Page (Vehicle of Interest)
- Detail-Page → Mobile-Call / WhatsApp / Termin
- /atelier → Termin
- /journal → Newsletter Sign-up

## Pflicht-Trust-Signals (kontextual)

Auf Detail-Pages (höchste Conversion-Wichtigkeit):
- ✅ Walk-Around-Video sichtbar
- ✅ Provenance-Dossier (Dokument-Scans)
- ✅ Inspection Vault (interaktiv)
- ✅ PPI-Einladung explizit
- ✅ Konkreter Preis (nicht "auf Anfrage")
- ✅ "In Bestand seit" Datum
- ✅ Editorial Story von Jérôme

## Friction-Reduction-Patterns

### Form-Inputs
- **Maximum 3 Felder** im Concierge-Form (Name, Kontakt, Nachricht)
- KEINE Felder für Budget, Timeline, Finanzierung (in Form)
- Submit-Button: "Schicken" (nicht "Absenden")

### Live-Präsenz-Indikator
Auf /kontakt:
- "Heute geöffnet · 10-18 Uhr" (real-time)
- "Antwortet üblicherweise innerhalb 2 Stunden"

### View-Transitions
Bei Card → Detail-Page Übergang:
- Shared-Element-Transition (Bild fliegt mit)
- Psychologisch macht Click "billiger"

## Schema.org pro Page-Rolle

Verbindlich für jede Page:
- `BreadcrumbList`
- Page-Type-spezifisch:
  - Home: `AutoDealer`, `LocalBusiness`, `WebSite`
  - Detail: `Vehicle + Product + Offer`
  - Collection: `CollectionPage`
  - Article: `Article + BlogPosting`
  - Contact: `LocalBusiness + ContactPoint + FAQPage`
  - About: `Organization + Person`
  - Atelier: `AutoRepair + Service`

**KRITISCH:** Visible Price = Schema Price exakt match (Google Manual Action-Risiko)

## Anti-Conversion-Patterns (verboten)

- ❌ Newsletter-Popup beim ersten Besuch
- ❌ Exit-Intent Modal
- ❌ Live-Chat-Bubble bouncing
- ❌ Carousel-Hero mit Auto-Play
- ❌ Multi-Step Form mit Fortschritt-Balken (außer /verkaufen-Wizard)
- ❌ "10% Rabatt" oder ähnliche Discount-Lure
- ❌ Affiliate-Links / "Refer a friend"
- ❌ Cookie-Banner Dark-Patterns
- ❌ Tooltips für UI-Erklärung (UI selbst muss klar sein)

## GEO-Pflicht-Elemente (für AI-Search)

Jede Page sollte für AI-Citation optimiert sein:
- **Quick-Answer Block** in ersten 200 Wörtern (faktisch, direkt)
- **Per-Vehicle FAQ** in Prompt-Style (3-5 Fragen)
- **dateModified** sichtbar + im Schema
- **inLanguage** Schema-Property matching hreflang exakt
- **Statistics, Prices, Dates inline** in Editorial-Copy

→ Volle Conversion-Strategy: [KONZEPT/07-conversion.md](../../KONZEPT/07-conversion.md)
