# 09 — Operations Backend

> Payload CMS Setup, Lead-Inbox, Email-Automation, Review-Management, mobile.de-Sync.
> Was Jérôme im Daily Use sieht und nutzt.

---

## 1. Payload CMS Setup (V1.5 — Source of Truth)

### Warum Payload v3
- **Self-hosted** → DSGVO + Datenkontrolle
- **Next.js native** → läuft in derselben App auf `/admin`
- **Editor-UX premium** → Jérôme arbeitet damit täglich, muss erfreulich sein
- **Multilingual native** → Locale-Tabs pro Field
- **Server Actions Integration** → keine separate API-Schicht nötig

### Collections (Datenmodelle)

#### Vehicles
```typescript
{
  // Basic
  slug: string (unique, locale-specific)
  brand: string (Aston Martin, Bentley, Ferrari, ...)
  model: string
  modelYear: number
  firstRegistration: string (MM/YYYY)
  
  // Specs
  power: number (PS)
  mileage: number (km)
  fuel: enum ('petrol' | 'hybrid' | 'electric')
  transmission: enum ('automatic' | 'manual')
  driveWheelConfiguration: enum
  color: string
  bodyType: string
  doors: number
  
  // Pricing
  price: number
  priceCurrency: 'EUR'
  vatInfo: 'included' | 'not_applicable' | 'reverse_charge'
  vatRate: number
  
  // Content
  editorialTitle: string (Per Locale)
  editorialText: richText (300-500 Wörter, Per Locale)
  highlights: array<string>
  features: array<string>
  
  // Media
  heroImage: Image
  gallery: array<Image> (60-80 Bilder)
  walkAroundVideo: Video
  documents: array<Document> (Servicebuch, Rechnung, COA scans)
  
  // Inspection Vault
  inspectionPoints: array<InspectionPoint>
  inspectionDate: date
  inspector: string
  
  // Provenance
  previousOwners: number
  ownershipChain: array<OwnershipEntry> (anonymisiert)
  serviceHistory: array<ServiceEntry>
  
  // Curation
  curatedOrder: number (manuelle Reihenfolge in /kollektion)
  weeklyShowcase: boolean (true für aktuelle Wochen-Hero)
  relatedVehicles: array<Vehicle> (3 manuelle Empfehlungen)
  
  // Status
  status: 'draft' | 'preview' | 'live' | 'reserved' | 'sold'
  inStockSince: date (sichtbar als "In Bestand seit ...")
  publishAt: datetime (für Garage-Vorab-Zugang)
  soldDate: date
  
  // mobile.de Integration
  mobileDeAdId: string (numeric, V1 manuell erfasst, V1.5 auto-gepushed)
  mobileDeSyncStatus: 'draft' | 'live' | 'sold' | 'error'
  mobileDeLastSyncAt: datetime
  mobileDeQualityScore: number (pulled from API)
  mobileDeQualityIssues: array<string>
  mobileDeMarketPriceEstimate: number (Photo-based, ab Juni 2026)
  
  // System
  createdAt: datetime
  updatedAt: datetime (= dateModified im Schema)
}

InspectionPoint {
  area: enum ('front' | 'sides' | 'rear' | 'wheels' | 'interior' | 'engine' | 'underbody' | 'docs')
  pointName: string (z.B. "Lack vorne links")
  result: 'pass' | 'pass_with_note' | 'action_required'
  note: string (optional)
  photo: Image
  date: date
  inspector: string
}
```

#### JournalArticles
```typescript
{
  slug: string
  title: string (Per Locale)
  excerpt: string (Per Locale, max 200 Wörter)
  body: richText (Per Locale)
  category: enum ('atelier' | 'vermittelt' | 'markenportrait' | 'markt' | 'standort')
  heroImage: Image
  inlineImages: array<Image>
  publishedAt: datetime
  author: 'Jerome Gay'
  layoutVariant: enum ('full-bleed-hero' | 'type-hero' | 'split-hero')
  relatedArticles: array<JournalArticle>
  featured: boolean (für Homepage Akt 9)
}
```

#### AtelierProjects (Live-Feed)
```typescript
{
  vehicleDescription: string ("911 Carrera 3.2 Targa")
  serviceType: enum ('wartung' | 'reparatur' | 'restaurierung' | 'aufbereitung' | 'einlagerung')
  status: 'in_progress' | 'completed'
  startDate: date
  notes: string (optional, public-friendly)
  photos: array<Image> (anonymisiert)
}
```

#### CustomerStories
```typescript
{
  quote: richText (Per Locale)
  customerInitials: string (z.B. "J.M.")
  customerCity: string (z.B. "Zürich")
  vehicle: string (Brand + Modell + Jahr)
  customerPhoto: Image (mit Disclosure-Flag falls AI)
  isAIGenerated: boolean (für EU AI Act)
  publishedAt: date
  weight: number (für Sortierung in Akt 8)
}
```

#### Leads (Lead-Inbox)
```typescript
{
  source: enum ('phone' | 'whatsapp' | 'form' | 'email' | 'mobile_de' | 'autoscout24' | 'newsletter')
  vehicleInterest: Vehicle (optional)
  contact: {
    name: string
    email: string
    phone: string
    notes: string
  }
  message: richText
  status: 'new' | 'in_progress' | 'meeting_scheduled' | 'won' | 'lost'
  scoreEstimate: number (1-10, AI-suggested + manual override)
  jeromeNotes: richText (internal)
  responseRequiredBy: datetime (4h SLA)
  firstResponseAt: datetime
  closedAt: datetime
  closedOutcome: enum ('sale' | 'no_match' | 'price_no_agree' | 'other')
  createdAt: datetime
}
```

#### Users (Garage)
```typescript
{
  email: string (unique)
  passwordHash: string
  firstName: string
  lastName: string
  watchlist: array<Vehicle>
  alerts: array<AlertConfig>
  preferences: {
    locale: enum
    newsletter: boolean
  }
  isPreviousBuyer: boolean (Bestandskunde-Flag)
  ownedVehicles: array<Vehicle> (für Dokumenten-Archiv)
  createdAt: datetime
}
```

#### Settings
```typescript
{
  globalStatus: 'open' | 'closed' | 'on_holiday'
  jeromeIsInShowroom: boolean (manual flag für Live-Präsenz-Indikator)
  openingHours: object
  holidayMessage: string (optional)
  weeklyShowcaseVehicle: Vehicle (linked)
  briefkastenNextEdition: date
}
```

### Admin-UX-Prinzipien
Jérôme arbeitet täglich damit. Pflicht:
- **3 Klicks Maximum** zu jeder häufigen Aktion (Vehicle anlegen, Status ändern, Foto upload)
- **Locale-Tabs** für mehrsprachige Felder
- **Drag-Drop Foto-Upload** mit Auto-Resize + AVIF/WebP Generation
- **Auto-Translate-Vorschlag** (von LLM, NICHT auto-applied) für EN/FR Editorial-Texte
- **Quality-Gates**: Vehicle kann nicht "live" gehen ohne:
  - Min 30 Fotos (zur Sicherheit), Ziel 60-80
  - Editorial-Text ≥ 200 Wörter pro Locale
  - Preis gesetzt
  - mobile.de Quality-Score ≥ 80 (wenn Push aktiv)
- **Bulk-Actions** für häufige Operations (Mass-Update Wochen-Schaufenster, Mass-Locale-Refresh)

### Auto-Übersetzung
- **DE → EN/FR Vorschlag** durch OpenAI/Anthropic API (Server-Side)
- Markiert als "AUTO-VORSCHLAG" bis Jérôme oder Native Reviewer freigibt
- Niemals direkt published — Pflicht-Review-Step

---

## 2. Lead-Inbox UI (für Jérôme)

### Daily-Use-Dashboard

Layout:
- **Top:** Heute neue Leads (Count + Stack mit Photo/Initials)
- **Links:** Lead-Liste, gefiltert nach Status
- **Rechts:** Aktiver Lead Detail
- **Bottom:** Performance-Snippet (Avg-Response-Time-7d, Weekly Lead-Volume)

### Lead-Detail-View
- **Header:** Source-Badge (Phone/WhatsApp/Form), Name, Vehicle of Interest, Timestamp
- **Body:** Originale Anfrage (Email-Render, WhatsApp-Snippet, Form-Fields)
- **Side-Panel:**
  - Vorgeschlagene Antwort (LLM-Draft, klickbar als Email-Template-Start)
  - Lead-Score Estimate
  - Verbindungs-Historie (vorherige Anfragen / Käufe)
  - Status-Wechsel + Notes
- **Quick-Actions:**
  - "Antwort per Email senden" (öffnet Resend-Template mit pre-filled)
  - "Termin vorschlagen" (Cal.com Link generieren)
  - "Status: Termin geschlossen" / "Won" / "Lost"

### Lead-Scoring (LLM-gestützt)
Heuristiken:
- Spezifisches Fahrzeug erwähnt (+2)
- Preis-Bereich erwähnt (+1)
- Timeline erwähnt (+1)
- Anreise-Möglichkeit erwähnt (+1)
- Frühere Anfragen / Bestand-Kunde (+3)
- Nur generelle Anfrage ("Was haben Sie da?") (0)
- Unkonkret + Preis-fokussiert (-1)

Score 1-10. Anzeige als Visual-Bar im Inbox.

### Performance-Metriken (für Jérôme)
- Avg Response Time (7d / 30d)
- Open Leads (älter als 4h ungeöffnet → ROT)
- Lead-Volume Trend
- Conversion-Rate (Lead → Won)
- Source-Breakdown

---

## 3. Email-Automation Setup

### Plattform-Architektur
- **Resend** für transaktionale Mails (Lead-Bestätigung, Termin-Confirmation, etc.)
- **Buttondown** für Newsletter (Briefkasten alle 14 Tage)
- **Email-Templates** in `/src/email-templates/` als React-Components (Resend-React-Email-Support)

### Transaktional-Flows

#### Flow 1: Concierge-Form-Submit
1. Server Action validiert Form
2. Speichert Lead in Payload
3. Auto-Mail an Submitter (Eingangsbestätigung, Template aus [08-content.md](./08-content.md))
4. Internal-Mail an Jérôme (mit Lead-Details + Quick-Action-Links)
5. SLA-Timer-Start (4h)

#### Flow 2: Cal.com Termin-Booking
1. Webhook von Cal.com → Server Action
2. Erstellt Lead-Entry mit Status `meeting_scheduled`
3. Bestätigungs-Mail an Submitter (Detailed Anreise-Info + Phone-Number)
4. Internal-Calendar-Sync (optional, V1.5)

#### Flow 3: Briefkasten-Sign-up
1. Email validiert → Buttondown API
2. Double-Opt-In Mail (DSGVO Pflicht)
3. Bestätigung speichert in Payload + Buttondown
4. Welcome-Sequence triggert (3 Mails über 2 Wochen)

#### Flow 4: After-Sale Workflow (Manual + Auto)
1. Jérôme markiert Lead als `won` + setzt `soldDate`
2. T+14 Tage: Auto-Mail mit Review-Request (GBP-Link)
3. T+30 Tage: Auto-Mail mit "Wie waren die ersten Wochen?"
4. T+6 Monate: Auto-Mail mit Atelier-Service-Reminder
5. T+12 Monate: Personal-Touchpoint (Jubiläums-Mail von Jérôme)

### Newsletter-Workflow (Briefkasten)
1. Jérôme erstellt im Buttondown-Editor die Sendung
2. Pull aus Payload: aktuelles Wochen-Fahrzeug + neuster Journal-Artikel + Atelier-Tagebuch-Snippet
3. Preview → Schedule für nächsten Sonntag 09:00
4. Send → Tracking-Stats in Buttondown
5. Sync Stats zurück in Payload (Open-Rate pro Edition)

---

## 4. mobile.de Integration (Detail)

> **Hinweis:** Tiefe technische Details kommen mit der laufenden Recherche zurück. Dieses Doc wird upgedated, sobald die Research die mobile.de Seller-API-Endpoints detailliert beschrieben hat.

### Aktueller Kenntnisstand (Stand Mai 2026)

#### mobile.de Seller API
- **CRUD Operations** für Vehicle-Listings (XML oder JSON)
- **Authentication:** API-Key + OAuth
- **Listing-Quality-Endpoint (seit November 2025):** Bewertet Bild-Anzahl, Bild-Qualität, Attribut-Vollständigkeit, Beschreibungslänge
- **Photo-Based Price Estimation (ab 22. Juni 2026):** KI-Modellerkennung für genauere Preisschätzung
- **Polling-Based** (keine Webhooks für Lead-Capture)

#### Sources
- [mobile.de Seller API Documentation](https://services.mobile.de/docs/seller-api.html)
- [mobile.de APIs Changelog](https://services.mobile.de/manual/changelog.html)
- [mobile.de XSD Schema](https://services.mobile.de/schema/seller/seller-ad-1.1.xsd)

### Phase 1 — V1 Launch

#### A) URL-Migration & Redirects
**Pflicht für Launch:**
- Alte `/de/car-details/449707804` URLs → permanente 301-Redirects → `/de/kollektion/aston-martin-dbs-2019`
- Vehicle-Slug enthält Brand + Modell + Jahr für SEO + Lesbarkeit
- Numerische mobile.de Ad-IDs werden als Sekundär-ID gespeichert (für Sync später)

**Implementation:**
```typescript
// next.config.ts
async redirects() {
  return [
    {
      source: '/de/car-details/:id',
      destination: '/de/kollektion/:semanticSlug', // pro ID aufgelöst
      permanent: true,
    },
  ];
}

// Lookup via Payload: mobileDeAdId → semantic slug
```

#### B) Initial-Daten-Import
Optionen:
1. **Manuell** durch Jérôme im Payload-Admin (für ~30 Fahrzeuge praktikabel)
2. **Halb-automatisch:** CSV-Export aus mobile.de → Import-Script in Payload
3. **API-Pull:** Falls Jérôme bereits API-Zugang hat → bulk-pull aller Listings nach Payload

**Empfehlung V1:** Option 1 oder 2 (Option 3 als V1.5 wenn Push-Sync gebaut)

#### C) Schema.org Match-Check
- Visible Price = Schema Price (Google-Manual-Action-Risiko)
- VIN, Kilometerstand, Erstzulassung exakt übereinstimmend
- Auto-Validation in Payload Pre-Save Hook

### Phase 2 — V1.5 Sync

#### A) Push-Sync (Payload → mobile.de)
**Trigger:**
- Bei Vehicle-Status-Change zu `live` → Push als neue Anzeige
- Bei Edit → Push als Update
- Bei Status-Change zu `sold` → Push als Sold-Status (oder Delete)

**Architecture:**
```
Payload Webhook (vehicle.afterChange)
    ↓
Server Action (push-to-mobile-de.ts)
    ↓
mobile.de Seller API (POST/PUT)
    ↓
Response: AdId + Quality-Score
    ↓
Update Payload Vehicle.mobileDeAdId + .mobileDeSyncStatus
```

**Conflict-Resolution:** Bei API-Error: Status auf `error`, Notification an Jérôme, Retry-Queue.

#### B) Pull-Quality-Scores
**Cron alle 6h:**
```
For each Vehicle with mobileDeAdId:
    Fetch Quality-Endpoint
    Update Vehicle.mobileDeQualityScore + .mobileDeQualityIssues
```

**Anzeige im Payload-Admin:**
```
Quality Score: 92/100 ✓
Issues:
  - Beschreibung kürzer als empfohlen (280 vs 500+ Wörter)
  - Preis liegt 8% unter Markt-Vergleichsangeboten
```

#### C) Pull-Market-Price-Estimates (ab Juni 2026)
**Cron alle 12h:**
```
For each Vehicle with mobileDeAdId:
    Fetch Photo-Based Price Estimate
    Update Vehicle.mobileDeMarketPriceEstimate
```

**Anzeige:** "Markt-Schätzung: 218.000 € — Ihr Preis: 215.000 € (1.4% unter Markt)" als Sidebar im Vehicle-Edit-View.

#### D) Lead-Capture von mobile.de
**Approach:**
- mobile.de leitet Anfragen per Email an `info@prestige-selections.com`
- Email-Parser in Server Action erkennt Pattern, erstellt Lead-Entry mit `source: 'mobile_de'`
- Verlinkung zum entsprechenden Vehicle via Listing-ID-Match
- Auto-Routing in Lead-Inbox

**Alternative V1.5:** mobile.de unterstützt teilweise Webhook für Lead-Forwarding (Konfiguration im mobile.de Dashboard).

### mobile.de Plus Premium-Subscription
- **Highly Recommended** für unsere Preisklasse (~150-300€/Monat je nach Tier)
- Vorteile: Top-Position in Search, Brand-Logo im Listing, mehr Foto-Slots, Lead-Forwarding

---

## 5. AutoScout24 Integration (V1.5+, P2)

### Aktueller Stand
- AutoScout24 hat ebenfalls Seller-API (weniger ausgereift als mobile.de)
- Premium-Dealer-Pages verfügbar (vergleichbar mobile.de Plus)

### Empfehlung
- Parallel-Pflege zu mobile.de (manuell oder via API in V1.5+)
- Wichtig für Backlink-Authority + Markt-Diversifizierung
- Nicht V1-Pflicht, aber sollte innerhalb Y1 aktiviert werden

---

## 6. Google Business Profile (GBP)

### Setup-Aufgaben (P0 für Launch)
- [ ] Inhaberschaft verifizieren
- [ ] Kategorien: "Used car dealer" + "Sports car dealer"
- [ ] Vollständige Adresse + Öffnungszeiten + Telefonnummer
- [ ] Beschreibung 500+ Wörter (deutsche + englische Version)
- [ ] Foto-Set (Halle Außen, Halle Innen, Team, Atelier, 5-10 Sample-Fahrzeuge)
- [ ] Termin-Booking-Link (Cal.com)
- [ ] Q&A-Bereich mit FAQ-Style (gleicher Content wie /kontakt FAQ-Schema)
- [ ] Service-Bereiche eingerichtet (Wartung, Reparatur, Aufbereitung, Klassiker)

### Operativ
- Wöchentliche Posts (kuratiertes Fahrzeug oder Atelier-Update)
- Antwort auf jede Review innerhalb 48h (auch 5-Sterne)
- Quarterly: Reviews-Push an Bestandskunden via Email

### Review-System
**Auto-Review-Request-Mechanik:**
- T+14 Tage nach Sale: Auto-Email mit Review-Link
- T+30 Tage nach Service: Auto-Email mit Review-Link
- Verfolgung: pro Customer markiert ob Review-Request gesendet → Limit 1 Request/Jahr/Person

**KPI:** 150+ Reviews innerhalb Y1 (Schwelle für AI-Search-Empfehlungen).

---

## 7. WhatsApp Business Integration

### Setup
- **WhatsApp Business Account** verifiziert
- **Business-Profil** mit Logo, Adresse, Business-Description
- **Quick-Replies** für häufige Fragen ("Verfügbarkeit?", "Preisverhandlung?", "Termin?")
- **Catalog API** für Fahrzeug-Karten (V1.5)

### Direct-Link-Pattern auf Site
```
https://wa.me/497615573168?text=Anfrage%20via%20Website%20-%20Aston%20Martin%20DBS
```

Pre-filled Message macht Lead-Routing einfacher (Source-Tracking).

### Lead-Capture
- V1: WhatsApp-Nachrichten kommen auf Jérômes Phone, er erstellt manuell Lead in Payload (oder vergisst es)
- V1.5: WhatsApp Business API Integration → Auto-Lead-Creation mit Conversation-Sync

---

## 8. Cal.com Integration (Terminbuchung)

### Setup
- Cal.com Account (Free oder Pro)
- Event-Types:
  - **Fahrzeug-Besichtigung** (90 Min, in-person Freiburg)
  - **Atelier-Termin** (60 Min, in-person)
  - **Phone-Beratung** (30 Min, telephonisch)
  - **Video-Call** (45 Min, für internationale Käufer)

### Embed
- Inline auf /kontakt (Akt 10) + /atelier
- Direct-Link in Email-Templates
- Brand-Customization: Farb-Match (Gold-Akzent, warmer Off-White)

### Webhook
- Bei Booking → Server Action erstellt Lead-Entry (siehe Section 3 Flow 2)

---

## 9. Image / Media Pipeline

### V1 — Public Folder
- Bilder unter `/public/assets/{folder}/[name].jpg`
- Next.js Image-Component für Optimization (AVIF/WebP/JPG)

### V1.5 — Cloudinary
- Source-of-Truth wird Cloudinary
- DAM (Digital Asset Management) für 30+ Fahrzeuge × 60-80 Bilder = 2000+ Assets
- Auto-Tagging, Auto-Variants (Sizes)
- Optional: Watermarking
- API für Bulk-Upload, Re-Process

### Video-Pipeline
- Walk-Around-Videos: V1 als MP4 in `/public/assets/videos/` (max 30 MB pro Video)
- V1.5: Mux oder Cloudflare Stream für Adaptive Bitrate, Subtitles, Analytics

---

## 10. Backup & Disaster Recovery

### V1
- **Vercel** macht automatische Build-History
- **Neon PostgreSQL** mit Auto-Backup (Point-in-Time Recovery 7 Tage)
- **Manual Export-Cadence:** Wöchentlich Payload-Backup als JSON-Dump (Cron Job)

### V1.5
- Off-Site-Backup (separates Cloud-Storage)
- Disaster-Recovery-Test quarterly (Restore-Drill)

---

## 11. Operations-Daily-Routine für Jérôme

### Morgens (15 Min)
1. Payload-Admin öffnen
2. Lead-Inbox checken (gibt es Neues seit gestern?)
3. Wenn ja: Quick-Reply an alle (auch wenn nur "Ich melde mich heute Mittag mit Details")
4. Atelier-Tagebuch updaten (was startet heute?)

### Mittags (30 Min)
1. Detaillierte Antworten auf neue Leads
2. Termin-Slots für die Woche prüfen (Cal.com)
3. Wenn ein Vehicle Status-Change anliegt (z.B. neue Ankunft, Verkauf): in Payload eintragen

### Abends (15 Min)
1. Final Lead-Inbox check
2. Review-Requests prüfen (sollten Auto-Mails an heutige Sale-Customers raus?)
3. WhatsApp-Nachrichten in Lead-Inbox übertragen falls noch nicht

### Wöchentlich (Sonntag oder Montag, 1-2h)
1. Newsletter-Briefkasten verfassen
2. Wochen-Schaufenster-Fahrzeug auswählen + in Settings setzen
3. GBP-Post + ggf. Instagram-Post
4. Atelier-Tagebuch konsolidieren

### Quartalsweise (2-3h)
1. Journal-Artikel verfassen (1-2 pro Monat = 3-6/Quartal)
2. Performance-Review (Leads, Sales, Source-Breakdown)
3. Vehicle-Bestand Review (Was muss raus? Was kommt rein?)

---

## 12. Cost-Estimate (Monthly Operating)

### V1 Launch
| Service | Monthly |
|---|---|
| Vercel Pro | ~€20 |
| Neon PostgreSQL | ~€20 |
| Resend (transactional) | ~€10 |
| Buttondown (Newsletter) | ~€10 |
| Plausible | ~€10 |
| Cloudinary (V1.5) | ~€80 |
| Cal.com | Free (or Pro ~€15) |
| Domain | ~€2 |
| **Total V1 Monthly** | **~€72-150** |

### V1.5+
| Service | Monthly |
|---|---|
| ... + WhatsApp Business API | ~€30-50 |
| Mux / Cloudflare Stream (Video) | ~€50-100 |
| Sentry | Free (or Team ~€26) |
| mobile.de Plus | ~€150-300 |
| classicdriver.com Listing | ~€250-400 |
| AutoScout24 Premium | ~€150-300 |
| **Total V1.5 Monthly** | **~€600-1.200** |

### Y1 One-Time
- Anwalt für Legal-Drafts: ~€800-1.500
- Initial Asset-Production (V1 AI, V1.5 Photo-Shoot): ~€500 (V1) + ~€6.000-10.000 (V1.5)
- Native EN + FR Copy-Reviews: ~€1.500-2.500
- Press-Outreach (Versand-Kosten + Materials): ~€500

---

## Was diese Doc NICHT abdeckt

- **Wie sehen die Vehicle-Detail-Page-Inhalte konkret aus?** → [04-detail-seiten.md](./04-detail-seiten.md)
- **Welche Voice gilt für die Auto-Emails?** → [08-content.md](./08-content.md)
- **Wann werden welche Operations aufgesetzt?** → [10-roadmap.md](./10-roadmap.md)
