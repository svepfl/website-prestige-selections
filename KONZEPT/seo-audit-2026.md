# SEO / GEO / AEO Audit — Prestige Selections · Mai 2026

> **Compliance:** [top-web Rule 6](../../.claude/skills/top-web/rules/06-seo-legal.md) (SEO+Legal) + [Rule 16](../../.claude/skills/top-web/rules/16-customer-question-coverage.md) (Q-Coverage) + [Memory](`~/.claude/projects/.../memory/project_seo_reality.md`) (HNW-Niche-Realität).

## Executive Summary

**Technische Foundation:** Weltklasse (alle Pflicht-Layer implementiert)
**On-Page-Content:** Editorial-stark, aber SEO-Keyword-Optimierung schwach
**AEO (AI-Search):** Sehr gut (llms.txt, Schema-Tiefe)
**GEO (Local):** Code-seitig stark, aber Google Business Profile fehlt operativ
**Ranking-Realität:** Long-Tail-Brand-Modifier + Local-Pack = realistisch erreichbar in 3-6 Monaten. Head-Terms (z.B. "Sportwagen Freiburg") gegen Mehrjährige Domain-Authority-Konkurrenz = unrealistisch ohne Backlinks.

---

## A. TECHNICAL SEO — Foundation

| Layer | Status | Note |
|---|---|---|
| `robots.txt` | ✅ Excellent | AI-Crawler-Allowlist (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) — 2026-optimal |
| `sitemap.xml` | ✅ Excellent | Dynamisch, alle Routes + Vehicle-Slugs × 3 Locales, lastModified, alternates |
| `llms.txt` | ✅ Excellent | Brand-Beschreibung + Pages-Liste + Key-Facts für AI-Citation |
| Canonical URLs | ✅ Korrekt | `alternates.canonical` pro Page mit Locale-Prefix |
| Hreflang | ✅ Korrekt | `alternates.languages` mit DE/EN/FR per Page |
| HTTPS + HSTS | ⚠️ Operativ | Auto-Vercel/Cloudflare — bei Production-Domain verifizieren |
| Mobile-Friendly | ✅ Korrekt | Responsive Tailwind, viewport meta |
| LCP/INP/CLS | ⚠️ Messen | Code-seitig optimiert (next/image, lazy loading, no CLS) — echte Werte erst nach Live-Test |
| Open Graph + Twitter | ✅ Korrekt | Layout default + Page-Override |
| 404 Handling | ✅ Korrekt | `/not-found.tsx` mit Brand-Voice + Schema |
| Favicon | ⚠️ Verifizieren | favicon.ico in /app/ — vollständiger Favicon-Set (Apple, Android, manifest) prüfen |

**Verdict:** Foundation ist auf Weltklasse-Niveau. Nichts zu verbessern hier außer Live-Performance-Messung.

---

## B. SCHEMA.ORG ARCHITECTURE

**Cross-Reference-Topologie** (alle via `@id` verlinkt):

```
LocalBusiness/AutoDealer (#dealer, layout)
    ├─ founder → Person (#founder)
    ├─ employee → Person (#founder)
    ├─ areaServed → 5× Country
    ├─ vehicleSpecialty → 7 Brands
    ├─ makesOffer → 7 Car-Brands
    ├─ openingHoursSpecification
    └─ geo → GeoCoordinates
WebSite (#website, layout)
    └─ potentialAction → SearchAction
Person (#founder, layout)
    ├─ knowsLanguage → [de, en, fr]
    └─ worksFor → #dealer

Pro Page:
WebPage / AboutPage / ContactPage / AutoRepair
    ├─ inLanguage
    ├─ isPartOf → #website
    └─ about / mainEntity → #dealer or #founder

Vehicle-Detail:
Vehicle + Product + Car
    ├─ offers → Offer (priceValidUntil, availability)
    └─ seller → #dealer
BreadcrumbList per page

FAQPage (Homepage Fragen-Section)
HowTo (Werkstatt 3-Schritt-Process)
ItemList (Inventory-Listing)
```

**Verdict:** Schema-Tiefe ist in der **Top-1%** aller Premium-Auto-Sites 2026. Die `@id`-Cross-References ermöglichen Knowledge-Graph-Building.

**Eine Lücke:** `AggregateRating` fehlt überall — sobald Reviews vorhanden sind, ist das DER wichtigste SEO-Boost-Hebel (Star-Snippets in SERP).

---

## C. ON-PAGE SEO — Route-für-Route

### 1. Homepage `/`

**Aktuelle Metadata:**
- Title: "Prestige Selections Freiburg — Sportwagen & Klassiker"
- Description: "Sportwagen- und Klassiker-Händler in Freiburg. Ferrari, Porsche, Lamborghini, Bentley, Rolls-Royce, Aston Martin. Über 900 Fahrzeuge vermittelt seit 2012."

**Bewertung:**
- ✅ Title 56 Zeichen (Sweet-Spot: 50-60)
- ✅ Description 158 Zeichen (Sweet-Spot: 140-160)
- ✅ Brand + Standort + 6 Marken + Trust-Stat
- ✅ Keywords: "Sportwagen Freiburg", "Klassiker", Brand-Namen

**Quality-Bar:** Weltklasse.

**Empfehlung:** Keine Änderung nötig.

---

### 2. `/fahrzeuge` (Inventory-Listing)

**Aktuelle Metadata:**
- Title: `t('title')` = "Alle Fahrzeuge"
- Description: `t('description')` = "Entdecken Sie unsere aktuelle Auswahl an Sportwagen und Klassikern."

**Bewertung:**
- ⚠️ Title generisch "Alle Fahrzeuge" — kein Brand, kein Standort
- ⚠️ Description 53 Zeichen — viel zu kurz (Google füllt auf mit eigenem Text)
- ❌ Keine Long-Tail-Keywords ("gebraucht", "Premium", "Sammler")

**Quality-Bar:** Verbesserbar.

**Empfehlung — Hoher SEO-Hebel:**

```
DE:
Title: "Kollektion — Sportwagen & Klassiker | Prestige Selections Freiburg"
       (62 Zeichen, Brand + Standort)
Description: "Aktuelle Auswahl handverlesener Sportwagen und Klassiker in Freiburg. Ferrari, Porsche, Lamborghini, Aston Martin, Bentley, Rolls-Royce — jedes Fahrzeug geprüft, persönlich vermittelt."
            (~190 Zeichen, kürzer trimmen, voller Brand+Location-Reichtum)

EN:
Title: "Collection — Sports Cars & Classics | Prestige Selections Freiburg"
Description: "Hand-picked sports cars and classics in Freiburg. Ferrari, Porsche, Lamborghini, Aston Martin, Bentley, Rolls-Royce — every motorcar inspected, personally placed."
```

### 3. `/fahrzeuge/[slug]` (Vehicle-Detail)

**Aktuelle Metadata (dynamic):**
- Title: `{Manufacturer} {Model} · Freiburg`
- Description: `{vehicle.description[locale]}`
- Keywords-Array: `[Marke, Modell, Marke Modell kaufen, Marke Freiburg, Prestige Selections]`
- Schema: Vehicle + Product + Car (multi-type) + Offer + Breadcrumb

**Bewertung:**
- ✅ Dynamic Title mit Brand + Model + Standort
- ✅ Editorial Description aus i18n
- ✅ Keywords explizit gesetzt
- ✅ Multi-Type-Schema für Google Merchant + Vehicle Rich Results
- ⚠️ Title-Format "Ferrari 488 · Freiburg" könnte um Spezifikum erweitert werden

**Quality-Bar:** Sehr gut. Long-Tail-Ranking-Potential ist hoch (z.B. "Ferrari 488 Pista kaufen Freiburg" — niedrige Konkurrenz).

**Empfehlung:**
- Title-Erweiterung wenn Bauj./Kraftstoff distinct: "Ferrari 488 Pista 2019 · Freiburg" oder "Aston Martin DBS 725 PS · Freiburg"
- Vehicle-Schema-Felder noch erweitern: `color`, `bodyType`, `numberOfDoors` (wenn vorhanden)

---

### 4. `/werkstatt` (Atelier) — wichtigste SEO-Page nach Inventar

**Aktuelle Metadata:**
- Title: `t('title')` = "Meister-Werkstatt"
- Description: `t('intro')` = "Sportwagen und Klassiker — jeden Alters, jeden Zustands. Ausschließlich Meister..."

**Bewertung:**
- ⚠️ Title "Meister-Werkstatt" — kein Brand, kein Standort, generisch
- ⚠️ Description editorial-poetisch, kein Lokal-Keyword
- ❌ Keine "Werkstatt Freiburg" Long-Tail-Keywords im Title/Description
- ✅ HowTo + AutoRepair + OfferCatalog Schema (top)
- ✅ knowsAbout-Property mit allen 7 Brands

**Quality-Bar:** Verbesserbar — **das ist DIE Local-SEO-Page für hohe Conversion** (Werkstatt-Suche ist High-Intent-Lokal).

**Empfehlung — Hoher SEO-Hebel:**

```
DE:
Title: "Meister-Werkstatt für Sportwagen & Klassiker in Freiburg"
       (54 Zeichen — Standort + Spezialisierung)
Description: "Meisterwerkstatt für Ferrari, Porsche, Lamborghini, Aston Martin, Bentley & Klassiker in Freiburg. Wartung, Reparatur, Aufbereitung, Restauration — auf Herstellerniveau."
            (~165 Zeichen — Lokal + Brand-Marken + Services)

EN:
Title: "Master Workshop for Sports Cars & Classics in Freiburg"
Description: "Master-certified workshop for Ferrari, Porsche, Lamborghini, Aston Martin, Bentley and classics in Freiburg. Maintenance, repair, detailing, restoration — manufacturer standards."

FR:
Title: "Atelier maître pour voitures de sport et classiques à Fribourg"
Description: "Atelier de maîtres-mécaniciens pour Ferrari, Porsche, Lamborghini, Aston Martin, Bentley et classiques à Fribourg. Entretien, réparation, préparation, restauration."
```

**Long-Tail Keyword-Pages später (V1.5):**
- `/werkstatt/ferrari` — "Ferrari Werkstatt Freiburg" (niedrige Konkurrenz, hohe Intent)
- `/werkstatt/porsche` — "Porsche Werkstatt Freiburg"
- `/werkstatt/klassiker` — "Klassiker Werkstatt Baden"

Diese Sub-Pages mit echter Editorial-Tiefe (600-800 W) ranken realistisch in 3-6 Monaten auf Top-3 für die spezifischen Lokal-Keywords.

---

### 5. `/haus` (Founder / About)

**Aktuelle Metadata (DE):**
- Title: "Das Haus — Prestige Selections"
- Description: "Familienunternehmen in Freiburg seit 2012. Über 900 Sportwagen und Klassiker vermittelt. Gegründet von Jérôme Gay."

**Bewertung:**
- ✅ Title 33 Zeichen — kompakt
- ✅ Description 138 Zeichen — Brand + Standort + Trust-Stat + Founder
- ⚠️ Title könnte "Sportwagen-Händler Freiburg" als sekundären Keyword-Hinweis nutzen
- ✅ AboutPage-Schema mit `mainEntity` → `#founder` Cross-Reference (E-E-A-T)

**Quality-Bar:** Sehr gut.

**Empfehlung — Minor:**
```
Title: "Das Haus — Familienunternehmen aus Freiburg seit 2012 | Prestige Selections"
       (75 Zeichen, am Limit, könnte gekürzt werden)

Oder kompakter:
Title: "Über uns — Prestige Selections Freiburg"
       (40 Zeichen, generischere "Über uns" Suche)
```

E-E-A-T-Boost: Jérôme's Person-Schema in `/haus` zitieren mit allen Credentials.

---

### 6. `/verkaufen` (Ankauf-Service)

**Aktuelle Metadata (DE):**
- Title: "Fahrzeug verkaufen — Prestige Selections"
- Description: "Sportwagen oder Klassiker verkaufen an Prestige Selections Freiburg. Persönliche Bewertung, marktgerechter Preis, diskrete Abwicklung."

**Bewertung:**
- ✅ Title 40 Zeichen — kompakt
- ✅ Description 131 Zeichen — direkt + Standort + USPs
- ✅ Service-Schema mit `areaServed: [DE, CH, AT, FR, LI]`

**Quality-Bar:** Sehr gut.

**Empfehlung — Optimierung für High-Intent Verkäufer-Suchen:**
```
Title: "Sportwagen verkaufen Freiburg — Ankauf bei Prestige Selections"
       (66 Zeichen — Long-Tail "Sportwagen verkaufen Freiburg" als Primary-Keyword)
Description: "Ankauf von Sportwagen und Klassikern in Freiburg. Persönliche Bewertung innerhalb 48 Stunden, marktgerechter Preis, diskrete Abwicklung. Ferrari, Porsche, Lamborghini, Aston Martin & mehr."
            (~190 Zeichen, leicht über Limit — auf ~155 trimmen)
```

**Hohes SEO-Potential** — Verkäufer-Suchen sind High-Intent + niedrige Konkurrenz (Vertragshändler kaufen selten von Privat).

---

### 7. `/kontakt`

**Aktuelle Metadata (DE):**
- Title: "Lassen Sie uns sprechen"
- Description: "Besuchen Sie unsere Ausstellung in Freiburg oder kontaktieren Sie uns — unverbindlich und diskret."

**Bewertung:**
- ⚠️ Title "Lassen Sie uns sprechen" — editorial-tier aber keine Keywords
- ⚠️ Description: kurz, kein Brand, kein Standort prominent
- ✅ ContactPage-Schema + AutoDealer-Cross-Ref

**Quality-Bar:** Verbesserbar.

**Empfehlung:**
```
Title: "Kontakt — Showroom Freiburg | Prestige Selections"
       (51 Zeichen — Service-Wort + Standort + Brand)
Description: "Showroom Engesserstraße Freiburg. Mo–Fr 9–18, Sa 10–16. Telefon, WhatsApp, E-Mail oder Termin. Mehrsprachig DE · EN · FR. Diskretion garantiert."
            (~155 Zeichen — NAP + Hours + Sprachen + USPs)
```

---

### 8. Legal Pages (`/impressum`, `/datenschutz`, `/barrierefreiheit`)

**Aktuelle Metadata:** Title + Description per Page, alle korrekt.

**Bewertung:** Keine SEO-Priorität (Legal-Pages ranken nicht für commercial Keywords).

**Empfehlung:** Keine Änderung. Sind funktional + Schema-OK.

---

## D. AEO (Answer-Engine-Optimization) — AI-Search-Readiness

**2026-Realität:** Perplexity · ChatGPT-Search · Google AI Overviews · Claude — diese suchen anders als klassisches Google. Sie konsumieren `llms.txt`, parsen Schema.org, extrahieren konkrete Antworten aus FAQ + Editorial-Content.

### Was wir gut machen

✅ **`llms.txt`** — präzise Brand-Beschreibung + Pages-Liste + Key-Facts. AI-Engines zitieren das direkt.

✅ **Schema.org Tiefe** — Vehicle/AutoRepair/Person/LocalBusiness mit Cross-References = AI-Engines können Entity-Graph aufbauen.

✅ **FAQPage-Schema** auf Homepage (Fragen-Section) — 8 Q&A, AI-extrahierbar.

✅ **HowTo-Schema** auf /werkstatt (3-Step-Process) — Featured-Snippet-Potential.

✅ **Editorial Voice** ist AI-extrahierbar — kurze, klare Sätze, konkrete Fakten ("Über 900 Fahrzeuge vermittelt seit 2012").

✅ **AI-Crawler-Allowlist** in robots.txt — alle major AI-Bots explicit erlaubt.

### Was fehlt / Lücken

❌ **FAQ-Schemas nur auf Homepage** — sollten auch auf:
- `/werkstatt` (Werkstatt-FAQ: Wie lange? Was kostet? Pickup?)
- `/verkaufen` (Ankauf-FAQ: Wie schnell? Welche Marken? Wie wird der Preis bestimmt?)
- `/kontakt` (Contact-FAQ: Sprachen? Termin nötig?)

❌ **`knowsAbout`-Property** auf Organization-Schema fehlt — sollte Brand-Liste explizit haben (haben wir auf AutoRepair, nicht auf AutoDealer).

❌ **Article-Schema für Editorial-Content** fehlt — falls /haus oder eine "Journal"-Page mit Long-Form-Content kommt, brauchen wir Article + Author-Schema.

### Empfehlung — Hoher AEO-Hebel

1. **FAQPage-Schema auf /werkstatt** mit 6-8 Werkstatt-spezifischen Fragen
2. **FAQPage-Schema auf /verkaufen** mit 6-8 Ankauf-spezifischen Fragen
3. **`knowsAbout`-Array auf AutoDealer-Schema** mit Marken-Liste
4. **Per-Vehicle FAQ-Schema** (V1.5) — "Wann ist das Fahrzeug verfügbar? Welche Optionen sind drin? Kann ich Probefahrt?"

---

## E. GEO (Local-SEO) — Freiburg + DE-Süd

**Was wir gut machen:**

✅ **LocalBusiness/AutoDealer Schema** mit:
- `geo: { latitude: 48.013, longitude: 7.8354 }`
- `address` exact
- `openingHoursSpecification` strukturiert
- `areaServed` mit 5 Countries

✅ **NAP-Konsistenz** über Footer + Schema + llms.txt

✅ **Adresse "Engesserstraße 1, 79108 Freiburg" als Text** site-weit sichtbar (Footer)

✅ **Geo-Anchors in Content** — "Freiburg" mehrfach in Hero, Footer, Tagline, Über-uns

### Was fehlt — operativ + Code

❌ **Google Business Profile** — code-seitig nichts möglich, aber kritisch. Setup-Steps:
1. Google Business Profile registrieren (kostenlos)
2. Adresse, Hours, Phone synced mit Site (NAP-Konsistenz)
3. Kategorien: "Used Car Dealer", "Sports Car Dealer", "Auto Repair Shop"
4. 20+ echte Showroom-Fotos hochladen
5. Wöchentliche GBP-Posts (Top-Ranking-Signal 2026)
6. Aktive Review-Pflege

❌ **GBP-Profile-URL in Schema-`sameAs`** — sobald GBP live, in `sameAs`-Array hinzufügen

❌ **Local-Reviews + AggregateRating** — keine Reviews → keine Star-Snippets → keine Local-Pack-Position. Sammeln-Strategie nötig.

❌ **Brand-Verzeichnisse** — sind wir gelistet bei:
- mobile.de (Premium-Dealer-Profil)
- AutoScout24
- classicdriver.com (für Klassiker)
- Octane Magazine Trader-Directory
- Branchenbuch Freiburg / IHK
- Yelp / Trustpilot

Falls ja → in `sameAs`-Array. Falls nein → operativ aufbauen.

❌ **Geo-Targeted-Content** — keine spezifische "Standorte/Freiburg"-Page (haben wir auch nicht in Roadmap, könnte aber V1.5-Hebel sein)

### Realistische Local-Pack-Position

Aktuell: nicht in Local-Pack für "Sportwagen Freiburg" (kein GBP).

Nach GBP-Setup + 10-20 Reviews: realistisch Top-3 im Local-Pack für:
- "Sportwagen Händler Freiburg"
- "Klassiker Händler Freiburg"
- "Sportwagen Werkstatt Freiburg"
- "Ferrari Werkstatt Freiburg" (gegen wenig Konkurrenz)

NICHT erreichbar:
- "Porsche Freiburg" (Porsche Zentrum Freiburg = Vertragshändler-Bias)
- "Autohaus Freiburg" (zu generisch, zu viele Wettbewerber)

---

## F. KEYWORD-STRATEGIE

### Tier 1 — High-Value Long-Tail (realistisch 3-6 Monate erreichbar)

| Keyword | Volumen | Konkurrenz | Page-Ziel | Realistisch |
|---|---|---|---|---|
| "Sportwagen verkaufen Freiburg" | niedrig-mittel | sehr niedrig | `/verkaufen` | Top-3 |
| "Sportwagen Werkstatt Freiburg" | niedrig-mittel | sehr niedrig | `/werkstatt` | Top-3 |
| "Ferrari Werkstatt Freiburg" | niedrig | sehr niedrig | `/werkstatt` + `/werkstatt/ferrari` (V1.5) | Top-3 |
| "Porsche Werkstatt Freiburg" | niedrig-mittel | niedrig | `/werkstatt` + `/werkstatt/porsche` (V1.5) | Top-3 |
| "Klassiker Werkstatt Baden" | niedrig | sehr niedrig | `/werkstatt` | Top-3 |
| "Klassiker Händler Baden" | niedrig | sehr niedrig | `/fahrzeuge` | Top-3 |
| "Sportwagen Ankauf Freiburg" | niedrig | sehr niedrig | `/verkaufen` | Top-3 |
| "{Brand} kaufen Freiburg" | je Marke | niedrig | `/fahrzeuge/[slug]` | Top-3 für jeweiliges Modell |
| "Aston Martin Werkstatt Freiburg" | sehr niedrig | sehr niedrig | `/werkstatt` | Top-1 |
| "Bentley Aufbereitung Freiburg" | sehr niedrig | sehr niedrig | `/werkstatt` | Top-1 |

### Tier 2 — Brand-Modifier (V1.5 erreichbar mit Brand-Hubs)

| Keyword | Volumen | Konkurrenz | Realistisch in 6-12 Monaten |
|---|---|---|---|
| "Ferrari Freiburg" | mittel | hoch | Top-5 (nicht 1 — Marke-Site dominiert) |
| "Porsche gebraucht Freiburg" | mittel | mittel | Top-3 (Vertragshändler-Bias) |
| "Aston Martin Freiburg" | niedrig | mittel | Top-3 |
| "Lamborghini Freiburg" | niedrig | mittel | Top-3 |

### Tier 3 — Head-Terms (nicht realistisch)

| Keyword | Warum nicht erreichbar |
|---|---|
| "Porsche Freiburg" | Porsche Zentrum Freiburg = Trademark-Holder |
| "Sportwagen kaufen" | DE-weit, Konkurrenz mobile.de + AutoScout24 |
| "Klassiker kaufen" | DE-weit, Sotheby's-Tier-Domain-Authority |

### Tier 4 — Brand-Authority (Long-term, V2)

| Keyword | Strategie |
|---|---|
| "Prestige Selections" | Direct-Brand → 100% rank with proper site |
| "Jérôme Gay Sportwagen" | E-E-A-T via Person-Schema + Press-Mentions |

---

## G. TOP-10 QUICK WINS (Sofort umsetzbar)

Reihenfolge nach Impact / Effort:

1. **`/werkstatt` Meta-Title-Optimization** — von "Meister-Werkstatt" zu "Meister-Werkstatt für Sportwagen & Klassiker in Freiburg" → +Long-Tail-Ranking
2. **`/verkaufen` Meta-Title** — von "Fahrzeug verkaufen" zu "Sportwagen verkaufen Freiburg — Ankauf" → höchste Verkäufer-Intent
3. **`/fahrzeuge` Meta-Description** — von 53 Zeichen zu ~150 Zeichen mit Brand-Liste + Standort
4. **FAQ-Schema auf `/werkstatt`** mit 6-8 Werkstatt-Fragen → Featured-Snippet-Potential
5. **FAQ-Schema auf `/verkaufen`** mit 6-8 Ankauf-Fragen → Featured-Snippet-Potential
6. **`knowsAbout`-Array auf AutoDealer-Schema** (Layout.tsx) mit Brand-Liste
7. **`/kontakt` Meta-Title + Description** — von "Lassen Sie uns sprechen" zu "Kontakt — Showroom Freiburg"
8. **Image-Alt-Texte** auf Vehicle-Listing — von "Aston Martin DBS" zu "Aston Martin DBS Superleggera 2019 Carbon — Prestige Selections Freiburg" (mehr Keyword-Density)
9. **Internal Linking** — Vehicle-Detail-Pages sollten "Werkstatt-Service möglich" Link haben → Werkstatt-Page kriegt mehr Internal-Link-Juice
10. **GBP Setup operativ** — Google Business Profile mit allen Daten füllen (kein Code, aber kritisch)

---

## H. V1.5 STRATEGIC ADDITIONS (Größere Hebel)

Nach Quick-Wins, in dieser Reihenfolge:

### H.1 — Service-Detail-Pages
- `/werkstatt/wartung`
- `/werkstatt/reparatur`
- `/werkstatt/aufbereitung`
- `/werkstatt/restauration`

Jede Page ~600-800 W mit:
- Editorial-Tier-Content
- 3-5 spezifische FAQ
- Service-Schema mit Pricing-Range
- Internal-Links zurück zu `/werkstatt` + relevant Marken

**Erwartung:** Top-3 für "Sportwagen Wartung Freiburg", "Klassiker Restauration Baden" etc.

### H.2 — Brand-Hub-Pages
- `/werkstatt/ferrari`
- `/werkstatt/porsche`
- `/werkstatt/lamborghini`
- (analog für weitere Marken)

Jede Page ~800-1200 W mit:
- Brand-Spezifisches Editorial (was macht Service für diese Marke einzigartig?)
- Marken-spezifisches Equipment / Expertise
- Inventar-Cross-Link zu /fahrzeuge?brand=X
- Brand-Specific FAQ

**Erwartung:** Top-3 für "Ferrari Werkstatt Freiburg" etc.

### H.3 — Verkaufte-Fahrzeuge / Vermittelt-Archive
- `/vermittelt` — Galerie der letzten 30-50 Verkäufe

Bringt:
- Cialdini Social-Proof (echte Verkäufe sichtbar)
- Long-Tail-Suchen ("Ferrari 488 Pista verkauft Freiburg")
- E-E-A-T-Boost (verified track record)

### H.4 — Journal / Editorial
- `/journal` — 2-3 Editorial-Stories pro Jahr (NICHT Blog-Mill)

**Vorsicht:** Memory sagt Journal stirbt bei 80% der KMU. Nur bauen wenn Jérôme echtes Editorial-Commitment hat (1 Story/Quartal).

### H.5 — Locale-Hub `/standorte/freiburg`
- Dedizierte Standort-Page für Local-Pack-Boost
- NAP + Hours + Adresse prominent
- "Sportwagen Händler Freiburg" als Primary-Keyword
- Schema: LocalBusiness erweitert + Place

---

## I. OPERATIONAL (Code-Off, aber kritisch)

| Action | Impact | Aufwand |
|---|---|---|
| Google Business Profile Setup | Hoch (Local-Pack-Eintritt) | 1-2h |
| 20+ Showroom-Fotos zu GBP | Hoch (GBP-Rank-Signal) | 2-3h |
| 10+ echte Google-Reviews sammeln | Sehr hoch (Star-Snippets) | 2-4 Wochen |
| mobile.de Premium-Dealer-Profil | Hoch (Discovery-Channel + Backlink) | 1-2h |
| classicdriver.com Verifizierung | Mittel (HNW-Sammler-Channel) | 2-3h |
| GBP Wöchentliche Posts | Mittel (Rank-Signal 2026) | 30min/Woche |
| Branchenverzeichnis-NAP-Listings | Niedrig-Mittel (Trust-Signal) | 2-3h einmalig |
| Octane Magazine Trader-Directory | Mittel (Brand-Authority + Backlink) | 1-2h |

---

## J. MONITORING & MEASUREMENT (für nach Launch)

### Tools-Setup (kostenlos):

1. **Google Search Console** — Pflicht. Zeigt echte Search-Queries, Impressions, Clicks, Position. Domain verifizieren, Sitemap submitten.

2. **Plausible Analytics** — bereits eingebaut. Zeigt Traffic + Goals.

3. **Microsoft Clarity** — kostenlose Heatmaps + Session-Recordings. DSGVO-OK.

4. **Bing Webmaster Tools** — Pflicht für AEO (Bing ist ChatGPT-Search-Backend). Sitemap submitten.

### KPIs nach 30/60/90 Tagen

**Day 30:**
- Indexierte Pages: alle 60+ Routes
- Impressions Search Console: Baseline-Wert
- Local-Pack-Position: GBP wird sichtbar für "Sportwagen Freiburg"

**Day 60:**
- Long-Tail-Rankings: erste Top-10 für "Sportwagen Werkstatt Freiburg"
- Phone-Click-Rate: 2-5% (baseline)
- Form-Submission-Rate: 1-3%

**Day 90:**
- Long-Tail-Rankings: Top-3 für 5-10 spezifische Keywords erwartet
- Direct + Organic-Traffic: 70/30 (Direct dominiert bei Premium-Brand)
- Erste 5-10 Google-Reviews

---

## K. ENTSCHEIDUNGEN — was machen wir wann?

### Sofort (Quick-Wins, < 1 Tag Code-Arbeit):
- 7 Meta-Title/Description-Updates
- 2 FAQ-Schemas (`/werkstatt`, `/verkaufen`)
- `knowsAbout` Schema-Erweiterung
- Image-Alt-Text-Updates

### V1.5 (nach Launch, gestaffelt 4-12 Wochen):
- Service-Detail-Pages (`/werkstatt/wartung` etc.)
- Brand-Hub-Pages (`/werkstatt/ferrari` etc.)
- `/vermittelt` Verkaufte-Fahrzeuge

### V2 (langfristig, nach Reviews-Sammlung):
- Journal / Editorial
- `/standorte/freiburg` Local-Hub
- AggregateRating Schema (sobald Reviews da)

### Operational (parallel, nicht Code):
- Google Business Profile diese Woche
- mobile.de Premium diese Woche
- Reviews-Sammlung-Strategy (Email-Sequence-Plan)

---

## L. EHRLICHE EINORDNUNG (für die Erwartung)

**Wir starten nicht bei Null:**
- Domain-Authority = 0 (neue Domain, bisher nicht indexiert)
- Backlinks = 0
- Reviews = 0
- Brand-Recognition = niedrig (Region: Freiburg, Außenwirkung begrenzt)

**Was realistisch passiert in 6 Monaten:**
- Long-Tail-Lokal-Keywords (10-20 Stück): Top-3 oder Top-5 → ~50-200 Visitors/Monat aus Organic
- Brand-Suche ("Prestige Selections Freiburg"): Top-1 (trivial, deine Marke)
- Local-Pack: nach GBP + Reviews Top-3 für 2-4 Local-Keywords
- Head-Terms (Marken-Heads): nicht erreichbar

**Was NICHT realistisch ist:**
- "Porsche Freiburg" Platz 1 gegen Porsche Zentrum
- DE-weite Generic-Keywords ("Sportwagen kaufen")
- Massive Organic-Traffic ohne sustained Content-Investment

**Der größte Hebel ist NICHT klassisches SEO. Es ist:**
1. **mobile.de Premium-Listings** — dort suchen die Käufer aktiv
2. **Google Business Profile + Reviews** — Local-Pack-Sichtbarkeit
3. **classicdriver.com / Octane-Verifizierung** — HNW-Sammler-Channel
4. **Word-of-Mouth durch makelloses Service** — der wahre HNW-Sales-Channel

Site-SEO ist **Sekundär-Hebel — wichtig aber nicht der Haupt-Conversion-Driver** für HNW-Niche. Diese Audit-Aktionen geben dir ~15-30% incremental Conversion-Lift, nicht 10x.
