# 06 — Tech Architecture

> Verbindliche technische Entscheidungen. Performance-Targets, Stack-Wahl, Accessibility, Privacy, Schema-Stack, mobile.de-Integration.

---

## 1. Tech Stack (entschieden)

### Frontend
- **Next.js 16.2.1** (bereits installiert) — App-Router, RSC, Server Actions
- **React 19.2.4**
- **TypeScript 5**
- **Tailwind CSS v4** (`@theme inline` syntax)
- **next-intl 4.8.3** für i18n (DE/EN/FR)
- **next/font/google** für Fraunces + Inter (variable fonts)

### CMS (V1.5)
- **Payload CMS v3** (Self-hosted, Next.js native) — siehe [09-operations.md](./09-operations.md)
- **PostgreSQL via Neon** — Database

### Hosting & Infra
- **Vercel Pro** — Hosting + Edge + Image-Optimization
- **Cloudinary** — Image-CDN + DAM (V1.5)
- **Resend** — Transactional Email
- **Buttondown** — Newsletter (Briefkasten)
- **Plausible (EU-hosted)** — Analytics
- **Sentry** — Error-Monitoring (V1.5)

### Build & Quality
- **ESLint 9** + `eslint-config-next 16.2.1`
- **Prettier** (zu installieren)
- **TypeScript Strict-Mode** auf allen Files
- **Lighthouse CI** (V1.5)

### Forbidden Stack-Additions
- ❌ Framer Motion / GSAP (außer wenn Tor-Reveal native nicht reicht — aktuell nicht)
- ❌ React-Spring
- ❌ Redux / Zustand (kein State-Management-Bedarf)
- ❌ Material UI / Chakra (custom design-system)
- ❌ Locomotive Scroll (zu viel JS für unsere Targets)

---

## 2. Next.js 16 Spezifika

**⚠ Wichtig:** Diese Version hat Breaking Changes vs Training-Data. Vor jeder Daten-Fetching-Komponente die Docs in `node_modules/next/dist/docs/` checken (siehe [AGENTS.md](../AGENTS.md)).

### Pattern-Empfehlungen
- **Default Node Runtime** für alle Pages (Vercel hat selbst auf Edge-Reliability geachtet)
- **Edge Runtime** nur für Middleware (Geo-Redirect, Locale-Negotiation)
- **`"use cache"` Directive** für Server Components mit teuren Compute-Operationen
- **`revalidateTag()`** für ISR-Invalidation bei Payload-Updates (Vehicle, Article, etc.)
- **Static Generation** für `/` und `/kollektion/[slug]` (SSG, dann ISR-Revalidate)

### Image-Component
- `<Image>` from `next/image` PFLICHT (kein `<img>`)
- `priority={true}` nur auf LCP-Image (Hero)
- `sizes` Attribut auf jedes Bild (responsive)
- `placeholder="blur"` mit `blurDataURL` für above-fold-Bilder

### Server Actions
- Alle Form-Submissions (Concierge, Verkaufen, Newsletter) als Server Actions
- Validation mit Zod (zu installieren)
- Resend-Integration in Server-Action für Email-Versand

---

## 3. Performance-Budget (NON-NEGOTIABLE)

### Core Web Vitals (Field Data, 75. Perzentil)
| Metric | Threshold | Unser Target | Pflicht |
|---|---|---|---|
| LCP | ≤ 2.5s | **≤ 1.8s** | ✅ |
| INP | ≤ 200ms | **≤ 120ms** | ✅ |
| CLS | ≤ 0.1 | **≤ 0.05** | ✅ |

### Lighthouse (Lab Data)
- **Performance:** 100/100
- **Accessibility:** 100/100
- **Best Practices:** 100/100
- **SEO:** 100/100

### Bundle-Budget
- Initial JS: < 90 KB (gzipped) für `/`
- Initial CSS: < 30 KB
- LCP Image: < 200 KB (AVIF)
- Total Page Weight (above-fold): < 500 KB

### Asset-Optimization
- **AVIF primary, WebP fallback, JPG last** via `<picture>` automatisch durch Vercel
- **Video:** AV1 / H.265, max 5 MB für 5-15s Loops (Akt 1, 2, 8)
- **Walk-Around-Videos (Detail-Page):** max 30 MB, lazy-loaded, no autoplay

### Loading-Pattern
- Above-fold: priority + preload
- Below-fold: lazy
- Off-page (links): preload on hover (via `<Link prefetch={true}>`)
- Speculation Rules API für instant page transitions (V1.5)

---

## 4. Accessibility (WCAG 2.2 AA Pflicht)

### Compliance-Standard
- **WCAG 2.2 AA** durchgehend
- **EAA-konform** ab Tag 1 (European Accessibility Act seit 28 Juni 2025)
- **APCA Lc ≥ 75** für Body-Text (zusätzlich zu WCAG 4.5:1 Ratio)
- **APCA Lc ≥ 90** für Light-Type auf Light (besonders bei Fraunces Light Weight)

### Pflicht-Implementations
- **Focus-Indicators:** 2px outline gold, offset 3px, sichtbar **und** ≥ 3:1 Kontrast (WCAG 2.4.11 / 2.4.13)
- **Pointer-Targets:** Minimum 24×24px CSS pixels (WCAG 2.5.8) — auch Mobile-Nav, Cards, Pills
- **Drag-Alternativen:** Jede Drag-Interaktion hat Single-Pointer-Alternative (WCAG 2.5.7)
- **Reduced-Motion strikt:** `prefers-reduced-motion: reduce` → ALLE Scroll-Driven-Animations aus, Auto-Play aus, Parallax aus
- **Keyboard-Nav vollständig:** Tab-Order logisch, alle Interactive-Elements erreichbar
- **Skip-Link:** "Skip to content" (✅ in layout.tsx implementiert)
- **Screen-Reader-Labels:** `aria-label` auf icon-only Buttons, `alt` auf jedes Bild (auch dekorative bekommen `alt=""`)
- **Live-Regions:** für dynamische Updates (Form-Submit-Feedback, Inspection Vault Updates)

### Forbidden A11y-Antipatterns
- ❌ `outline: none` ohne replacement focus-style
- ❌ `<div onClick={...}>` statt `<button>`
- ❌ Color als einziger Indikator (immer text/icon dazu)
- ❌ Auto-rotating Carousels ohne Pause-Control
- ❌ Tooltips ohne Keyboard-Trigger

### Testing-Pflicht
- Axe DevTools auf jeder Seite
- Manuell mit VoiceOver (macOS) + NVDA (Windows)
- Tab-Through-Test pro Page
- Reduced-Motion-Toggle-Test

---

## 5. Privacy & EU-Compliance

### Status der relevanten Gesetzgebung (Mai 2026)
- **DSGVO + ePrivacy-Directive** weiterhin gültig (ePrivacy-Regulation wurde Feb 2026 zurückgezogen)
- **EU AI Act Article 50** seit 2. August 2026 verpflichtend: AI-Disclosure
- **DSA** nicht relevant (Single-Dealer-Site, kein Online-Plattform-Status)
- **TCF 2.3** nur relevant bei programmatic Ads — wir haben keine

### Cookie-Banner
- **Accept / Reject buttons VISUELL gleichwertig** (kein Dark Pattern, kein "Reject" versteckt)
- **Granular per Zweck** (Necessary, Analytics, Marketing)
- **Non-essential Scripts blockiert** bis Consent
- **Plausible (EU-hosted)** braucht KEINEN Banner — cookie-free Analytics

### Analytics
- **Plausible EU-hosted** als Primär-Analytics
- KEINE Google Analytics (oder nur hinter explizitem Opt-In)
- KEINE Tracking-Pixel von Drittanbietern
- KEINE Heatmaps (zu invasiv, keine zentrale Conversion-Insights bei unserer Größe)

### EU AI Act Article 50 Compliance
- **Disclosure aller AI-generierten Bilder/Videos:**
  - Pro Page mit AI-Visuals: subtler Footer-Hinweis
  - Per-Image-Disclosure wo Personen sichtbar sind
  - Beispiel: *"Einige Visuals sind KI-generiert und werden sukzessive durch Originalaufnahmen ersetzt."*
- **AI-Concierge-Chat (V1.5):** falls implementiert — explizite Disclosure beim ersten Kontakt: *"Diese Antworten werden KI-gestützt verfasst und von Jérôme freigegeben."*

### Security-Headers
```http
Content-Security-Policy: default-src 'self';
  script-src 'nonce-{random}' 'strict-dynamic' 'unsafe-inline' https:;
  style-src 'self' 'nonce-{random}';
  img-src 'self' data: https:;
  object-src 'none'; base-uri 'self'; frame-ancestors 'none';
  require-trusted-types-for 'script';

Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Permissions-Policy: camera=(), microphone=(), geolocation=()
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

### DSGVO-Compliant Logging
- **Keine vollständigen IPs** in Access-Logs (Letztes Oktett truncated)
- **Keine User-Agent-Fingerprinting**
- **Log-Retention:** ≤ 30 Tage Access-Logs (ohne Legal-Hold)
- **Verzeichnis von Verarbeitungstätigkeiten** dokumentiert (rechtliches Internal-Doc)

---

## 6. SEO-Infrastructure

### Schema.org Stack (JSON-LD in `<head>`)

#### Homepage
```typescript
- AutoDealer (extends LocalBusiness)
- WebSite
- Organization
```

#### /kollektion (Listing)
```typescript
- CollectionPage
- BreadcrumbList
- Array<Vehicle> (preview)
```

#### /kollektion/[slug] (Detail) ← KRITISCH
```typescript
- Vehicle (extends Product)
  - vehicleIdentificationNumber (VIN)
  - brand: Brand
  - model
  - vehicleModelDate
  - mileageFromOdometer (with unitCode KMT)
  - fuelType
  - vehicleTransmission
  - driveWheelConfiguration
  - numberOfDoors
  - color
  - bodyType
  - vehicleEngine: EngineSpecification
- Offer
  - price (MUSS visual price exakt matchen!)
  - priceCurrency: "EUR"
  - availability
  - priceValidUntil
  - seller: AutoDealer (linked by @id)
- BreadcrumbList
```

#### /journal/[slug]
```typescript
- Article + BlogPosting
- Person (Author = Jérôme)
- BreadcrumbList
```

#### /kontakt
```typescript
- LocalBusiness
- ContactPoint
- OpeningHoursSpecification
- FAQPage
```

#### /atelier + Sub-Pages
```typescript
- AutoRepair
- Service (per Sub-Page)
- BreadcrumbList
```

### `inLanguage` Property
**MUSS** auf jeder Page matchen mit hreflang exakt:
- `/de/...` → `inLanguage: "de-DE"`
- `/en/...` → `inLanguage: "en"`
- `/fr/...` → `inLanguage: "fr-FR"`

### Sitemap & Robots
- **`/sitemap.xml`** dynamisch generiert (Next.js sitemap.ts)
- **`/robots.txt`** erlaubt explizit:
  ```
  User-agent: GPTBot
  Allow: /
  
  User-agent: PerplexityBot
  Allow: /
  
  User-agent: Google-Extended
  Allow: /
  
  User-agent: ClaudeBot
  Allow: /
  ```

### hreflang
- Subdirectory `/de/`, `/en/`, `/fr/`
- Language-only codes (`de`, `en`, `fr`) — geo-targeted nur wenn nötig
- **Self-referencing** + **symmetric** + **x-default**
- HTML head ODER Sitemap, **nicht beide**

### Canonical URLs
- Pro Locale eigenes Canonical (kein cross-language canonical)
- Pro Vehicle: numerische mobile.de-ID Redirects → semantic slug (`/kollektion/aston-martin-dbs-2019`)

---

## 7. GEO (Generative Engine Optimization)

### /llms.txt
**`/public/llms.txt`** wird angelegt mit kuratierten Entry-Points:
```
# Prestige Selections — Außergewöhnliche Automobile aus Freiburg

Über uns: https://www.prestige-selections.com/de/uber-uns
Kollektion: https://www.prestige-selections.com/de/kollektion
Atelier: https://www.prestige-selections.com/de/atelier
Journal: https://www.prestige-selections.com/de/journal
Kontakt: https://www.prestige-selections.com/de/kontakt

# Vehicle Inventory
{auto-generated list with VIN-friendly slugs}

# Journal Articles (recent)
{auto-generated list}
```

### Content-Structure für AI-Citations
- **Quick-Answer Block** in ersten 200 Wörtern jeder Page (direkte faktische Antwort)
- **Per-Vehicle FAQ-Blocks** im Prompt-Stil:
  - "Welche Historie hat dieser Aston Martin DBS?"
  - "Liefert Prestige Selections nach Zürich?"
  - "Wie alt ist Prestige Selections?"
- **Statistics, Prices, Dates inline** in Editorial-Copy (höchster GEO-Lift)
- **Author-Attribution** (Jérôme als Person mit Schema.org)

### `dateModified` Pflicht
- Auf jeder Vehicle-Page sichtbar im Footer
- Im Schema als `dateModified`
- Wöchentliche Aktualisierung der Inventory-Pages (Freshness-Signal)

### Third-Party Citations
Operativ wichtig (in [07-conversion.md](./07-conversion.md) detailliert):
- **Google Business Profile** auf 150+ Reviews
- **classicdriver.com** Dealer-Listing
- **mobile.de** + **AutoScout24** Premium-Dealer-Pages
- **Wikidata-Eintrag** sobald Notability erreicht

---

## 8. mobile.de Integration

### Architektur-Entscheidung
**Payload CMS = Source of Truth** (V1.5). mobile.de ist Distribution-Channel, nicht Master.

### Phase 1 — V1 (Launch)
1. **Manuelle Erst-Migration**: Inventory-Daten von der bestehenden Quelle (mobile.de oder dazimaxx-CMS) zu Payload
2. **URL-Redirects**: Alte `/de/car-details/[id]` URLs → `/de/kollektion/[semantic-slug]` (Permanent 301)
3. **Schema.org Match**: Visible Price = Schema Price (Google-Manual-Action-Risiko)

### Phase 2 — V1.5 (Sync)
1. **Push-Sync zu mobile.de** via Seller-API (CRUD)
2. **Pull-Quality-Score** von mobile.de Listing-Quality-Endpoint (seit Nov 2025)
3. **Pull-Status-Updates** (Sold/Reserved) alle 15 min via Cron
4. **Pull-Leads** von mobile.de in unsere Lead-Inbox
5. **Photo-basierte Preis-Schätzung** (mobile.de Endpoint seit Juni 2026) → angezeigt im Payload-Admin

### Tech-Detail siehe [09-operations.md](./09-operations.md)

### Sources
- [mobile.de Seller API Docs](https://services.mobile.de/docs/seller-api.html)
- [mobile.de Changelog](https://services.mobile.de/manual/changelog.html)

---

## 9. Multilingual / hreflang Setup

### URL-Pattern
- **Subdirectory-Strategie:** `/de/`, `/en/`, `/fr/`
- **Locale-spezifische Slugs**: 
  - DE: `/de/kollektion/aston-martin-dbs-2019`
  - EN: `/en/collection/aston-martin-dbs-2019` 
  - FR: `/fr/collection/aston-martin-dbs-2019`

### next-intl Configuration
- `/src/i18n/routing.ts` definiert Locales + Slug-Mapping
- Messages in `/src/messages/{de,en,fr}.json`
- Pflicht: Native-Übersetzung (kein Auto-Translate)

### hreflang Implementation
- HTML `<head>` Tags:
  ```html
  <link rel="alternate" hreflang="de" href="https://prestige-selections.com/de/kollektion/..." />
  <link rel="alternate" hreflang="en" href="https://prestige-selections.com/en/collection/..." />
  <link rel="alternate" hreflang="fr" href="https://prestige-selections.com/fr/collection/..." />
  <link rel="alternate" hreflang="x-default" href="https://prestige-selections.com/de/kollektion/..." />
  ```
- **Self-referencing** required
- **Symmetric** (jede Seite verlinkt zurück)
- **x-default** auf DE (Hauptmarkt)
- Reciprocal Validation via Search Console + Bing Webmaster

---

## 10. Browser-Support

### Targets
- **Modern Browsers** (last 2 versions): Chrome, Edge, Safari, Firefox
- **iOS Safari** 16+
- **Android Chrome** last 2 versions
- **NO IE/Legacy Edge**

### Progressive Enhancement
- View-Transitions API: graceful Degradation (fallback: kein Animation)
- CSS Scroll-Driven Animations: graceful Degradation (fallback: kein Animation oder JS-Polyfill)
- WebGPU: optional (V2 für 3D, V1 nicht nötig)
- Speculation Rules: optional, polyfill via prefetch

---

## 11. Build & Deployment

### Vercel Setup
- **Production:** `main` branch → `prestige-selections.com`
- **Preview:** Pull Requests → `*.vercel.app` Preview URLs
- **Environment Variables:** in Vercel Dashboard + `.env.local` (gitignored)

### Required ENV Variables
```env
# Public
NEXT_PUBLIC_SITE_URL=https://www.prestige-selections.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=prestige-selections.com

# Private
PAYLOAD_SECRET=...
DATABASE_URL=postgresql://...neon.tech/...
RESEND_API_KEY=...
BUTTONDOWN_API_KEY=...
CLOUDINARY_URL=...
MOBILE_DE_API_KEY=...   # V1.5
WHATSAPP_BUSINESS_TOKEN=...   # V1.5
```

### CI/CD
- Vercel automatic builds on push
- **Pre-merge Checks** (zu setup):
  - TypeScript Build (`tsc --noEmit`)
  - ESLint (no errors)
  - Lighthouse CI auf preview URL (Performance ≥ 95)

---

## 12. Monitoring & Observability (V1.5)

- **Vercel Analytics** (Performance + Web Vitals — kostenlos)
- **Plausible** für Page-Views + Conversion-Events
- **Sentry** für Error-Tracking + Performance-Profiling
- **Bing Webmaster Tools** für AI-Performance-Report (Copilot-Citations)
- **Google Search Console** für Organic SEO

### Custom Conversion-Events (Plausible)
- `concierge_call_click` (Phone-Pill Click)
- `concierge_whatsapp_click`
- `concierge_form_submit`
- `vehicle_detail_view` (mit Vehicle-ID)
- `walk_around_play`
- `inspection_vault_open` (mit Hotspot-ID)
- `verkaufen_wizard_start`
- `verkaufen_wizard_complete`
- `newsletter_signup`
- `garage_signup` (V1.5)

---

## 13. Tech-Decision-Log

Dieser Abschnitt dokumentiert nachträgliche Entscheidungen während des Builds:

| Datum | Entscheidung | Begründung |
|---|---|---|
| 2026-05 | Fraunces + Inter statt Cormorant + Montserrat | 2026-Trend Editorial Serif + restraint, Variable Fonts |
| 2026-05 | Off-White Canvas statt Pure White | Premium Quiet-Luxury Pattern |
| 2026-05 | No Motion-Library | Native rAF reicht für unsere Choreographien |
| 2026-05 | Payload v3 (Self-hosted) statt Sanity | DSGVO + EU-Hosted + Next.js native + Self-Owned |
| 2026-05 | Plausible EU-hosted statt GA4 | DSGVO ohne Cookie-Banner, Premium-Positionierung |

---

## Was diese Doc NICHT abdeckt

- **Konkrete Component-Implementation:** Pro Akt in [03-homepage.md](./03-homepage.md) + [04-detail-seiten.md](./04-detail-seiten.md)
- **Build-Phasen-Reihenfolge:** [10-roadmap.md](./10-roadmap.md)
- **CMS-Schemas:** [09-operations.md](./09-operations.md)
