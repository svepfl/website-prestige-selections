# 02 — Pages & Customer Journey

> Die komplette Sitemap, der Käufer-Reise-Plan, und für jede Seite: Zweck, Ziel, Conversion-Rolle, Status, Priorität.
> Eine Seite ist niemals nur eine Seite — sie ist ein **Touchpoint** in einem mehrstufigen Verkaufsprozess.

---

## 1. Komplette Sitemap

```
prestige-selections.com
│
├── /                                  Homepage (10-Akte-Choreographie)
│
├── /kollektion                        Bestand-Liste (~30 Fahrzeuge)
│   └── /kollektion/[slug]             Vehicle Detail Page (Christie's-Niveau)
│       └── /kollektion/[slug]/inspektion   Inspection Vault (Akt 5 ausgekoppelt)
│
├── /atelier                           Werkstatt-Portal (Atelier-Hub)
│   ├── /atelier/wartung               Wartung & Inspektion
│   ├── /atelier/reparatur             Reparatur
│   ├── /atelier/klassiker             Klassiker-Betreuung
│   ├── /atelier/aufbereitung          Fahrzeugaufbereitung
│   └── /atelier/tagebuch              Atelier-Tagebuch (Live-Feed, aktuelle Projekte)
│
├── /journal                           Editorial-Magazin
│   ├── /journal/[slug]                Einzelner Artikel
│   └── /journal/kategorie/[slug]      Kategorie-Filter (Atelier, Markt, Vermittelt, Markenportrait)
│
├── /verkaufen                         Fahrzeug-Verkaufs-Wizard
│   ├── /verkaufen/direktkauf
│   ├── /verkaufen/kommission
│   └── /verkaufen/inzahlungnahme
│
├── /garage                            Privater Kundenbereich (Login, V1.5)
│   ├── /garage/anmelden
│   ├── /garage/watchlist
│   ├── /garage/alerts
│   └── /garage/dokumente
│
├── /uber-uns                          Jérôme + Team + Standort
│
├── /kontakt                           Concierge — 4 Wege
│
├── /briefkasten                       Newsletter-Anmeldung (eigene Landing)
│
└── /legal/
    ├── /impressum
    ├── /datenschutz
    ├── /agb
    ├── /widerrufsbelehrung
    └── /cookies                       Cookie-Policy-Detail

System-Pages:
├── /404                               Custom Not-Found
├── /500                               Custom Error
└── /sitemap.xml                       SEO-Sitemap
```

**Multilingual:** Jede Seite existiert unter `/de/`, `/en/`, `/fr/` mit hreflang-Reciprocity. URL-Slugs sind **pro Sprache lokalisiert** (z.B. `/de/kollektion`, `/en/collection`, `/fr/collection`).

---

## 2. Customer Journey — 6 Stufen

### Stufe 1 — Awareness (Wie hört der Käufer von uns?)

| Kanal | Anteil (Schätzung) | Was sie sehen | Landing-Page |
|---|---|---|---|
| mobile.de Listing | ~45% | Numerische Ad mit Fotos + Beschreibung | Detail-Page direkt (via Redirect von alter `/car-details/[id]` URL) |
| Word-of-Mouth | ~22% | Empfehlung von Sammler-Freund | Homepage |
| Google organisch | ~10% | Search-Result für "[Marke Modell] Freiburg/Europa" | Detail-Page oder Kollektion |
| classicdriver.com | ~8% | Dealer-Listing oder Editorial | Über-Uns oder Detail-Page |
| Press-Features (Robb Report, Octane) | ~6% | Editorial-Artikel | Homepage oder Journal |
| AI-Search (ChatGPT/Perplexity/Claude) | ~5% | Empfehlung in Antwort auf Such-Prompt | Homepage |
| Instagram | ~4% | Beitrag (eigener oder Repost) | Homepage |

**Stage-1 Conversion-Hebel:** Hero muss in 5 Sekunden Vertrauen + Kuration kommunizieren. Mobile-Performance kritisch (45% kommen via mobile.de = oft mobile).

### Stufe 2 — Consideration (Sondieren)

Käufer durchläuft typischerweise:
1. Homepage (5-30 Sek)
2. Kollektion (15 Sek - 2 Min)
3. 1-3 Detail-Pages (je 30 Sek - 5 Min)
4. Manchmal: Über-Uns (1-2 Min)
5. Manchmal: Atelier (30 Sek - 1 Min)

**Stage-2 Conversion-Hebel:** Detail-Page-Tiefe ist entscheidend. Sub-1.8s LCP zwingend (sonst Bounce).

### Stufe 3 — Evaluation (1 Fahrzeug im Fokus)

Käufer kehrt 2-10× zur selben Detail-Page zurück über 1-4 Wochen.
Er prüft:
- Alle 60-80 Fotos
- Walk-Around-Video
- Provenance-Dossier
- Inspection Vault
- Preis vs. Marktvergleich (auf eigene Faust)
- Atelier-Reputation
- Customer-Stories (auf der Site oder GBP-Reviews extern)
- Über-Uns / Jérôme als Person

**Stage-3 Conversion-Hebel:** Mobile-Nummer auf Detail-Page sichtbar (Klick-to-Call), WhatsApp-Direkt-Link, PPI-Einladung.

### Stufe 4 — Decision / First Contact

| Kanal | Anteil (Sales-Research, DACH-Luxus 2026) |
|---|---|
| Direkter Anruf | ~60% |
| WhatsApp | ~25% |
| Email | ~10% |
| Web-Formular | ~5% |

**Stage-4 Conversion-Hebel:** Antwort < 4h Bürozeit (verlieren sonst 50% des Intents nach 6h).

### Stufe 5 — Negotiation & Visit

- Telefonisches Vor-Gespräch / Video-Call
- Bei Bedarf PPI-Termin organisiert
- Anreise nach Freiburg (oft 1-Tages-Trip)
- Vor-Ort-Besichtigung + Probefahrt
- Verhandlung

**Stage-5 Conversion-Hebel:** Operativ — nicht Web. Aber: Website-Versprechen (Antwortzeit, Bestandsfrische) muss mit Realität übereinstimmen.

### Stufe 6 — Purchase & Post-Purchase

- Kaufabwicklung (Vertrag, Zahlung, Logistik)
- Übergabe in Freiburg ODER Lieferung
- Garage-Eintritt (V1.5) automatisch
- Newsletter (Briefkasten) automatisch
- Review-Request (für GBP) nach 14 Tagen
- Service-Touchpoints alle 6-12 Monate (Atelier-Beziehung)
- Referral-Loops aktivieren

**Stage-6 Hebel:** Nicht-Web — operativ. Aber Garage-Feature + Briefkasten-Newsletter sind Retention-Mechanismen.

---

## 3. Conversion-Rollen — jede Seite hat eine

Jede Seite gehört in genau eine dieser 5 Kategorien:

| Rolle | Was sie tut | Beispiele |
|---|---|---|
| **TRUST** | Baut Vertrauen auf | Homepage Akt 7, /uber-uns, /atelier, GBP-Reviews extern |
| **CURATION** | Zeigt unsere Auswahl | Homepage Akt 4, /kollektion |
| **EVALUATION** | Lässt Käufer ein Fahrzeug bewerten | Detail-Page (DAS Conversion-Center), Inspection Vault |
| **CONTACT** | Reduziert Friction zur Anfrage | Homepage Akt 10, /kontakt, sticky Phone Header |
| **OPERATIONS** | Pflegt Bestandskunden | /garage, /briefkasten, Email-Flows, /atelier-Termin |

Plus zwei spezielle Rollen:
- **AUTHORITY** (SEO/GEO) — /journal, /uber-uns als Brand-Authority
- **LEGAL** — Impressum, AGB, Datenschutz, Widerruf (Compliance, aber auch Trust-Signal)

---

## 4. Page-by-Page Matrix

### / (Homepage)

| Dimension | Detail |
|---|---|
| **Status** | ⚠ Existiert (Hero in Arbeit, Rest WIP-Placeholder) |
| **Priorität** | **P0** — Launch-kritisch |
| **Purpose** | Erste-Eindruck-Touchpoint, Brand-Manifesto, kuratorisches Signal |
| **Target** | Alle Stufen 1-2 (Awareness → Consideration) |
| **Primär-CTA** | "Sprechen wir." (Concierge Akt 10) |
| **Sekundär-CTA** | "Alle Fahrzeuge ansehen" (zur Kollektion) |
| **Conversion-Rolle** | TRUST + CURATION + (CONTACT) |
| **Signature Mechanism** | 10-Akte-Choreographie mit Tor-Reveal (Akt 1) |
| **Design-Treatment** | Mix: Akte 1-2 dark, 3-7 light, 8 dark, 9-10 light |
| **SEO Target Queries** | "Prestige Selections", "Sportwagen Händler Freiburg", "Luxusauto Freiburg" |
| **GEO Target Prompts** | "Wo kaufe ich einen Aston Martin/Bentley in Süddeutschland", "Bester Sportwagen-Händler Freiburg" |
| **Schema** | `AutoDealer`, `LocalBusiness`, `WebSite`, `Organization` |
| **Detail-Doc** | [03-homepage.md](./03-homepage.md) |

### /kollektion (Bestand-Liste)

| Dimension | Detail |
|---|---|
| **Status** | ⚠ Existiert als `/fahrzeuge` — muss umbenannt + komplett überarbeitet werden |
| **Priorität** | **P0** |
| **Purpose** | Kuratierte Übersicht aller ~30 Fahrzeuge im Bestand |
| **Target** | Stufe 2-3 (Consideration → Evaluation-Anfang) |
| **Primär-CTA** | Click auf Fahrzeug → Detail |
| **Sekundär-CTA** | Filter / Sortierung |
| **Conversion-Rolle** | CURATION |
| **Signature Mechanism** | **Vertikaler Stack-Scroll** (jedes Fahrzeug 1 Bildschirmhöhe, wie ein Magazin) ODER asymmetrisches Editorial-Grid mit kuratorischer Sortierung (NICHT preis-aufsteigend) |
| **Design-Treatment** | Light Canvas, hochwertige Fotografie führend |
| **SEO Target** | "Ferrari kaufen Freiburg", "Aston Martin Bestand", "Bentley Continental gebraucht" |
| **GEO Target** | "Zeige mir aktuelle Sportwagen-Bestände in Süddeutschland" |
| **Schema** | `CollectionPage` + Liste von `Vehicle`+`Product`+`Offer` |
| **Sub-Routes** | `?marke=ferrari`, `?preis-max=100000` (URL-Parameter für Filter) |
| **Detail-Doc** | [04-detail-seiten.md](./04-detail-seiten.md) |

### /kollektion/[slug] (Vehicle Detail Page)

| Dimension | Detail |
|---|---|
| **Status** | ⚠ Existiert als `/fahrzeuge/[slug]` — komplett rebuild nötig |
| **Priorität** | **P0** — Höchste, das ist die Conversion-Seite |
| **Purpose** | Tiefe Evaluation eines einzelnen Fahrzeugs |
| **Target** | Stufe 3 (Evaluation) — wo die Kaufentscheidung fällt |
| **Primär-CTA** | "Sprechen wir." → Anruf / WhatsApp / Termin |
| **Sekundär-CTAs** | PPI-Anfrage, Walkaround-Video starten, Doku-Anfrage |
| **Conversion-Rolle** | EVALUATION (KRITISCH) |
| **Signature Mechanism** | **Walk-Around-Video als Hero** + **interaktiver Inspection Vault** + **Provenance-Dossier mit Dokument-Scans** |
| **Design-Treatment** | Editorial — wie Christie's Auktionskatalog. Light dominant, einzelne Dark-Moments für Hero |
| **SEO Target** | "[Marke] [Modell] [Jahr] kaufen", "[Marke] [Modell] Freiburg" |
| **GEO Target** | "Ich suche einen [Marke] [Modell] in [Farbe], gibt es einen?" |
| **Schema** | `Vehicle` + `Product` + `Offer`, alle Felder ausgereizt, **Preis muss visuell und Schema match** |
| **Pflicht-Bausteine** | 60-80 Fotos, Walk-Around-Video, Provenance-Dossier, Inspection Vault, PPI-Einladung, Editorial-Text, mobile-Phone-Pill |
| **Detail-Doc** | [04-detail-seiten.md](./04-detail-seiten.md) |

### /atelier (Werkstatt-Hub)

| Dimension | Detail |
|---|---|
| **Status** | ⚠ Existiert als `/werkstatt` — Umbenennung + Neu-Konzept |
| **Priorität** | **P1** |
| **Purpose** | Werkstatt als Brand-Authority + Service-Umsatz-Quelle |
| **Target** | Stufe 2-3 (Trust-Building beim Kauf) + Stufe 6 (Post-Purchase) |
| **Primär-CTA** | "Termin vereinbaren" |
| **Sekundär-CTA** | "Atelier-Tagebuch lesen" |
| **Conversion-Rolle** | TRUST + OPERATIONS |
| **Signature Mechanism** | **Atelier-Tagebuch Live-Feed** — wöchentlich kuratierte Liste aktueller Projekte (anonymisiert) |
| **Design-Treatment** | Light, dokumentarisch, Reportage-Fotografie |
| **SEO Target** | "Sportwagen Werkstatt Freiburg", "Ferrari Service Freiburg", "Klassiker Restauration Süddeutschland" |
| **GEO Target** | "Wo kann ich meinen Ferrari/Aston Martin in Süddeutschland warten lassen?" |
| **Schema** | `AutoRepair` + `Service` |
| **Sub-Pages** | 4 Service-Bereiche + 1 Tagebuch-Hub |
| **Detail-Doc** | [04-detail-seiten.md](./04-detail-seiten.md) |

### /journal (Editorial-Magazin)

| Dimension | Detail |
|---|---|
| **Status** | ❌ **NEU** — existiert nicht |
| **Priorität** | **P1** (essentiell für GEO/SEO-Authority) |
| **Purpose** | Editorial-Authority, SEO-Long-Tail, AI-Search-Citations, Newsletter-Content |
| **Target** | Alle Stufen — vor allem Pre-Awareness (organische Discovery) |
| **Primär-CTA** | Newsletter-Sign-up am Artikel-Ende |
| **Sekundär-CTA** | Weiterer Artikel |
| **Conversion-Rolle** | AUTHORITY (SEO/GEO/Brand-Building) |
| **Signature Mechanism** | **Pro-Artikel-Layout** — kein Standard-Blog-Template. Jeder Artikel hat eigenen typografischen Rhythmus, große Bilder, mono Spec-Blocks (für Markt-Beobachtungen) |
| **Design-Treatment** | Editorial Light, Magazin-artig |
| **Editorial-Cadence** | 1-2 Artikel/Monat (Qualität vor Frequenz) |
| **Artikel-Typen** | "Im Atelier", "Vermittelt", "Markenportrait", "Markt-Beobachtung", "Standort Freiburg" |
| **SEO Target** | Long-tail-Phrasen: "Aston Martin DBS Wertentwicklung", "Porsche 911 Targa restaurieren" |
| **GEO Target** | Faktische Antworten: "Was kostet ein Aston Martin DBS in Europa?", "Wie erkenne ich einen matching-numbers Ferrari?" |
| **Schema** | `Article` + `BlogPosting`, `BreadcrumbList`, `Person` (Author = Jérôme) |
| **Detail-Doc** | [04-detail-seiten.md](./04-detail-seiten.md) |

### /verkaufen (Fahrzeug-Verkaufs-Wizard)

| Dimension | Detail |
|---|---|
| **Status** | ❌ **NEU** |
| **Priorität** | **P1** (zweite Umsatz-Quelle: Ankauf/Kommission) |
| **Purpose** | Lead-Generation für Verkäufer-Seite, neue Inventory-Quelle |
| **Target** | Privatpersonen, die ein hochwertiges Fahrzeug abgeben wollen |
| **Primär-CTA** | Wizard starten (Marke → Modell → KM → Fotos → Kontakt) |
| **Sekundär-CTA** | Direkt anrufen |
| **Conversion-Rolle** | CONTACT (alternative Lead-Quelle) |
| **Signature Mechanism** | **3-Wege-Branding** (Direktkauf / Kommission / Inzahlungnahme) — keine Standard "Sell your car" Form |
| **Design-Treatment** | Light, klar geführt, Schritt-für-Schritt-Wizard ohne Klick-Pyrotechnik |
| **SEO Target** | "Sportwagen verkaufen Freiburg", "Ankauf Aston Martin", "Ferrari in Zahlung geben" |
| **GEO Target** | "Wo kann ich meinen Porsche/Aston Martin in Süddeutschland verkaufen?" |
| **Schema** | `Service` |
| **Detail-Doc** | [04-detail-seiten.md](./04-detail-seiten.md) |

### /garage (Privater Kundenbereich)

| Dimension | Detail |
|---|---|
| **Status** | ❌ **NEU**, V1.5 (Login + Auth nötig) |
| **Priorität** | **P2** für initial Launch, P1 für Retention nach 6 Monaten |
| **Purpose** | Retention-Engine, Vorab-Zugang, Wiederkehr-Mechanik |
| **Target** | Stufe 6 (Post-Purchase) + Sammler-Interessenten (Stufe 2) |
| **Primär-CTA** | "Anmelden" / nach Login: Watchlist erweitern |
| **Sekundär-CTA** | Alerts setzen, Dokumente einsehen |
| **Conversion-Rolle** | OPERATIONS + Retention |
| **Signature Mechanism** | **Vorab-Zugang** — Garage-User sehen neue Fahrzeuge 24-48h *vor* öffentlicher Listung |
| **Design-Treatment** | Light, privater Look, dezent personalisiert |
| **SEO Target** | Indexierung gesperrt (private) |
| **Schema** | Nicht öffentlich |
| **Detail-Doc** | [04-detail-seiten.md](./04-detail-seiten.md) |

### /uber-uns

| Dimension | Detail |
|---|---|
| **Status** | ❌ **NEU** als eigenständige Seite (Heritage-Komponente existiert in Homepage) |
| **Priorität** | **P0** (zentrale Trust-Seite) |
| **Purpose** | Wer sind wir, warum machen wir das, wer arbeitet hier |
| **Target** | Stufe 2-3 (Consideration / Trust-Aufbau) |
| **Primär-CTA** | "Besuchen Sie uns" |
| **Sekundär-CTA** | Atelier-Termin / Concierge |
| **Conversion-Rolle** | TRUST (zentral) |
| **Signature Mechanism** | **Jérôme als Protagonist** — persönliche Story, eingebettetes Video-Statement (V1.5 real, V1 AI-generiert mit Disclosure), Team-Portraits, Standort-Story (neue Halle) |
| **Design-Treatment** | Editorial Light, dokumentarische Fotografie |
| **SEO Target** | "Jérôme Gay Prestige Selections", "Prestige Selections Inhaber" |
| **GEO Target** | "Wer ist Prestige Selections in Freiburg?" |
| **Schema** | `Organization`, `Person` (Founder), `LocalBusiness` |
| **Detail-Doc** | [04-detail-seiten.md](./04-detail-seiten.md) |

### /kontakt (Concierge)

| Dimension | Detail |
|---|---|
| **Status** | ⚠ Existiert — Re-Konzept als Concierge nötig |
| **Priorität** | **P0** |
| **Purpose** | Reibungsloser Erstkontakt (4 Wege gleichwertig) |
| **Target** | Stufe 4 (Decision / Contact) |
| **Primär-CTA** | Anruf (sales-research priorisiert: 60% rufen) |
| **Sekundär-CTAs** | WhatsApp / Termin / Besuch |
| **Conversion-Rolle** | CONTACT |
| **Signature Mechanism** | **Live-Präsenz-Indikator** — "Jérôme ist heute im Showroom" / "Heute geschlossen" (echte Daten), Antwortzeit-Tracking sichtbar |
| **Design-Treatment** | Mix, mit dunklem Hero-Moment der echten Halle |
| **SEO Target** | "Prestige Selections Telefon", "Prestige Selections Adresse" |
| **Schema** | `LocalBusiness` + `ContactPoint` |
| **Detail-Doc** | [04-detail-seiten.md](./04-detail-seiten.md) |

### /briefkasten (Newsletter-Landing)

| Dimension | Detail |
|---|---|
| **Status** | ❌ **NEU** |
| **Priorität** | **P1** |
| **Purpose** | Dedicated Newsletter-Sign-up-Page (besser als generischer Footer-Slot) |
| **Target** | Pre-Awareness + Stufe 2 (alle die noch nicht kaufen, aber im Bereich rumstöbern) |
| **Primär-CTA** | Anmelden |
| **Sekundär-CTA** | Beispiel-Ausgabe ansehen |
| **Conversion-Rolle** | OPERATIONS + Retention |
| **Signature Mechanism** | **Vorab-Zugang als Kern-Versprechen** ("Sie sehen jedes neue Fahrzeug 48h vor allen anderen") + **Visuelle Newsletter-Preview** (echte vergangene Ausgaben als Editorial Carousel) |
| **Design-Treatment** | Light, fokussiert, fast monolithisch |
| **SEO Target** | Nicht primäres Ziel |
| **Schema** | `Service` |
| **Detail-Doc** | [04-detail-seiten.md](./04-detail-seiten.md) |

### /impressum, /datenschutz, /agb, /widerrufsbelehrung, /cookies

| Dimension | Detail |
|---|---|
| **Status** | ⚠ Impressum + Datenschutz Placeholder, AGB + Widerruf + Cookies fehlen |
| **Priorität** | **P0** (rechtliche Pflicht zum Launch) |
| **Purpose** | Compliance + Trust-Signal |
| **Conversion-Rolle** | LEGAL + TRUST |
| **Signature Mechanism** | **Nicht "Standard-Legal-Page"** — saubere Editorial-Typographie, gut lesbar, transparent (nicht versteckt). **Niemand merkt diesen Anspruch — bis er es tut.** Diese Seiten beweisen, dass selbst die kleinsten Touchpoints durchdacht sind. |
| **Design-Treatment** | Light, sehr ruhig, fokussiert auf Lesbarkeit (max-width Reading-Column, gute Type-Hierarchy) |
| **SEO Target** | Indexierbar aber nicht aktiv beworben |
| **Schema** | `WebPage` |
| **Anwalt-Brief** | Pflicht für rechtliche Korrektheit (~800-1500€ Erstpaket) |
| **Detail-Doc** | [04-detail-seiten.md](./04-detail-seiten.md) |

### /404, /500 (Error Pages)

| Dimension | Detail |
|---|---|
| **Status** | ⚠ Existiert minimal — Re-Konzept |
| **Priorität** | **P1** (Trust-Touchpoint, viele Premium-Sites unterschätzen das) |
| **Purpose** | Fehler graceful handling, Voice-konsistent |
| **Conversion-Rolle** | TRUST (in der Niederlage) |
| **Signature Mechanism** | **Voice-konsistente Microcopy** ("Diese Seite existiert nicht. Aber 30 andere schon.") + Photo eines Fahrzeugs (rotated weekly), das sagt "schau dich um statt aufzugeben" |
| **Design-Treatment** | Light, ruhig, 1 Foto + 1 Satz + 1 CTA zurück |
| **Detail-Doc** | [04-detail-seiten.md](./04-detail-seiten.md) |

---

## 5. Status-Übersicht aller Seiten

| Seite | Status | Aktion | Priorität |
|---|---|---|---|
| / | ⚠ WIP | Refactor Akte 2-10 + Footer | P0 |
| /kollektion | ⚠ Existiert als `/fahrzeuge` | Umbenennen + Komplett-Rebuild | P0 |
| /kollektion/[slug] | ⚠ Existiert als `/fahrzeuge/[slug]` | Christie's-Niveau-Rebuild | **P0 HÖCHSTE** |
| /atelier | ⚠ Existiert als `/werkstatt` | Umbenennen + Tagebuch hinzufügen | P1 |
| /atelier/[service] | ⚠ Existiert in `/werkstatt` als Tabs | Eigene Pages bauen | P1 |
| /atelier/tagebuch | ❌ NEU | Neu bauen | P1 |
| /journal | ❌ NEU | Neu bauen | P1 |
| /journal/[slug] | ❌ NEU | Neu bauen | P1 |
| /verkaufen | ❌ NEU | Neu bauen | P1 |
| /verkaufen/[option] | ❌ NEU | Neu bauen | P1 |
| /garage | ❌ NEU | V1.5 (Auth nötig) | P2 |
| /uber-uns | ❌ NEU | Neu bauen | **P0** |
| /kontakt | ⚠ Existiert | Re-Konzept als Concierge | P0 |
| /briefkasten | ❌ NEU | Neu bauen | P1 |
| /impressum | ⚠ Placeholder | Anwalt + Editorial Layout | P0 |
| /datenschutz | ⚠ Placeholder | Anwalt + Editorial Layout | P0 |
| /agb | ❌ NEU | Anwalt + Editorial Layout | P0 |
| /widerrufsbelehrung | ❌ NEU | Anwalt + Editorial Layout | P0 |
| /cookies | ❌ NEU | Detail-Policy-Seite | P0 |
| /404 | ⚠ Default | Custom mit Voice | P1 |
| /500 | ❌ NEU | Custom mit Voice | P1 |
| /sitemap.xml | ⚠ Existiert | Auto-generate update | P0 |

---

## 6. Priorisierter Build-Plan (zwingend in dieser Reihenfolge)

### Welle 1 — Foundation + Hero (Woche 1-2)
Wenn dies steht, hat die Seite ihre Visit-Card.
1. ✅ Foundation (Color, Type, Tokens) — DONE
2. ⏳ Homepage Akt 1-10 (10/10 Niveau) — Akt 1 done
3. ⏳ Header context-aware
4. ⏳ Footer Brand-Statement

### Welle 2 — Conversion-Center (Woche 3-4)
Hier passiert der Sale.
5. ⏳ /kollektion/[slug] — Detail-Page Christie's-Niveau
6. ⏳ /kollektion — Liste mit Signature-Layout
7. ⏳ /kontakt — Concierge mit 4 Wegen
8. ⏳ Inspection Vault (Komponente, in Detail-Page integriert)

### Welle 3 — Trust + Authority (Woche 5-6)
Hier baut sich Glaubwürdigkeit auf.
9. ⏳ /uber-uns
10. ⏳ /atelier + Sub-Services + /atelier/tagebuch
11. ⏳ /journal + erste 3 Artikel
12. ⏳ Custom 404 / 500

### Welle 4 — Additional Revenue (Woche 7-8)
13. ⏳ /verkaufen Wizard
14. ⏳ /briefkasten + Email-Automation
15. ⏳ Legal-Seiten alle (Anwalt parallel)

### Welle 5 — Operations + mobile.de (Woche 9-10)
16. ⏳ Payload CMS Setup
17. ⏳ mobile.de Phase 1 Import
18. ⏳ Schema-Stack komplett
19. ⏳ /llms.txt + GEO-Foundation
20. ⏳ Plausible EU + Analytics

### Welle 6 — Retention + Sync (Woche 11-12)
21. ⏳ /garage mit Auth
22. ⏳ mobile.de Phase 2 Push-Sync
23. ⏳ Lead-Inbox Backend für Jérôme
24. ⏳ Email-Templates komplett

### Welle 7 — Polish + Launch (Woche 13-14)
25. ⏳ Performance-Audit (Lighthouse 100)
26. ⏳ Accessibility-Audit (WCAG 2.2 AA)
27. ⏳ Native EN + FR Final-Review
28. ⏳ Soft-Launch + Hard-Launch

**Total realistisch: 14-16 Wochen** für vollständige 10/10-Site mit allen Backends.

---

## 7. User Flows (Top-3 als Diagramm)

### Flow 1 — Käufer findet ein Fahrzeug (Stufe 1 → Stufe 4)

```
mobile.de Listing
    ↓ (Click)
Vehicle Detail Page (unsere Site)
    ↓ (Scrollt durch 60 Fotos, schaut Walk-Around)
    ↓ (Liest Provenance + Inspection Vault)
    ↓ (Click auf Mobile-Pill)
Anruf-Dialog
    ↓
Jérôme antwortet (< 4h)
```

### Flow 2 — Käufer entdeckt Prestige durch AI-Search

```
"Wo finde ich einen Aston Martin DBS in Süddeutschland?"
    ↓
ChatGPT/Perplexity zitiert prestige-selections.com
    ↓ (Click auf Link)
Homepage (Tor-Reveal + Wochen-Schaufenster)
    ↓ (Trust aufgebaut)
/kollektion (Browse)
    ↓ (Findet DBS)
Vehicle Detail Page
    ↓ (siehe Flow 1)
```

### Flow 3 — Bestandskunde will sein Fahrzeug verkaufen

```
Email an info@prestige-selections.com ("Mein Bekannter hat bei Ihnen gekauft...")
    ↓
Jérôme verweist auf /verkaufen
    ↓
Wizard: Direktkauf vs. Kommission vs. Inzahlungnahme
    ↓
Fotos + Specs Upload
    ↓
Jérôme antwortet mit Angebot
    ↓
Termin in Freiburg
    ↓
Übernahme (neue Inventory-Quelle)
```

---

## 8. Was diese Doc NICHT beantwortet

Diese Doc legt Pages und Journey fest. Für Details siehe:
- **Wie sehen Akte 1-10 aus?** → [03-homepage.md](./03-homepage.md)
- **Wie sieht Detail-Page genau aus?** → [04-detail-seiten.md](./04-detail-seiten.md)
- **Welche Schema-Felder genau?** → [06-tech.md](./06-tech.md)
- **Welche SEO-Keywords pro Page?** → [07-conversion.md](./07-conversion.md)
- **Welche Copy genau pro Page?** → [08-content.md](./08-content.md)
