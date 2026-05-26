# 10 — Roadmap

> Phasen, Timeline, Dependencies. Was wird wann gebaut und in welcher Reihenfolge?
> Diese Roadmap ist die **operative Übersetzung** der Konzept-Docs in Bau-Reihenfolge.

---

## Gesamt-Timeline (Realistisch)

| Phase | Inhalt | Dauer | Status |
|---|---|---|---|
| **Phase 0** | Foundation (Color, Type, Tokens, Asset-Struktur) | 1 Tag | ✅ DONE |
| **Phase 1** | Konzept-Docs + Claude-Setup | 2-3 Tage | ⚙ In Arbeit |
| **Phase 2** | Homepage (Akte 1-10 + Footer + Header) | 4-5 Wochen | ⏳ Akt 1 done |
| **Phase 3** | Vehicle Detail Page (Christie's-Niveau) + Kollektion-Refactor | 2-3 Wochen | ⏳ Pending |
| **Phase 4** | Atelier + Journal + Über-uns + Kontakt | 2-3 Wochen | ⏳ Pending |
| **Phase 5** | Verkaufen + Briefkasten + Legal + 404/500 | 1-2 Wochen | ⏳ Pending |
| **Phase 6** | Payload CMS + mobile.de Phase 1 + Schema Stack | 2-3 Wochen | ⏳ Pending |
| **Phase 7** | Email-Automation + Plausible + EU AI Act + /llms.txt | 1-2 Wochen | ⏳ Pending |
| **Phase 8** | Polish + A11y Audit + Performance + Native Copy Reviews | 1-2 Wochen | ⏳ Pending |
| **Phase 9** | Soft-Launch + Hard-Launch | 1 Woche | ⏳ Pending |
| **Phase 10** | mobile.de Phase 2 + Garage + V1.5 Features | 4-6 Wochen | ⏳ V1.5 |

**Realistisch:** 16-20 Wochen für vollständige V1 inkl. Operations.
**MVP-Capable:** ~6-8 Wochen (Phasen 0-3 + minimal Phase 4-7).

---

## Phase 0 — Foundation ✅ DONE

Status: Abgeschlossen am 2026-05-20.

### Erledigt
- ✅ Color-System refactored (warmes Off-White Canvas, Gold-Konstante, Shadow-System)
- ✅ Fraunces + Inter via next/font/google
- ✅ Tailwind v4 @theme inline mit allen Tokens
- ✅ Globale CSS-Utilities (font-display, tabular-nums, shadow-card-*, ease-prestige)
- ✅ Layout.tsx auf light-first umgestellt (colorScheme, theme-color)
- ✅ Asset-Verzeichnisstruktur in `/public/assets/{tor,weekly,collection,atelier,heritage,stories,journal,videos}`

### Files berührt
- [src/app/globals.css](../src/app/globals.css)
- [src/app/[locale]/layout.tsx](../src/app/[locale]/layout.tsx)
- [src/data/images.ts](../src/data/images.ts) (tor-frames placeholders)

---

## Phase 1 — Konzept-Docs + Claude-Setup (CURRENT)

### Erledigt
- ✅ [KONZEPT/00-README.md](./00-README.md) — Navigation + 10 Anti-Template-Prinzipien
- ✅ [KONZEPT/01-strategie.md](./01-strategie.md) — Brand, Voice, Target, KPIs
- ✅ [KONZEPT/02-pages-und-journey.md](./02-pages-und-journey.md) — Sitemap, Journey, Page-by-Page
- ✅ [KONZEPT/03-homepage.md](./03-homepage.md) — 10 Akte mit Signature Mechanisms
- ✅ [KONZEPT/04-detail-seiten.md](./04-detail-seiten.md) — Alle Unterseiten 10/10
- ✅ [KONZEPT/05-design-system.md](./05-design-system.md) — Tokens, Type, Motion, Photography
- ✅ [KONZEPT/06-tech.md](./06-tech.md) — Stack, Performance, Schema, mobile.de
- ✅ [KONZEPT/07-conversion.md](./07-conversion.md) — GEO, SEO, Press, Lead-Funnel
- ✅ [KONZEPT/08-content.md](./08-content.md) — Voice, Multilingual, Editorial-Calendar
- ✅ [KONZEPT/09-operations.md](./09-operations.md) — CMS, Lead-Inbox, Email, mobile.de
- ✅ [KONZEPT/10-roadmap.md](./10-roadmap.md) — Diese Datei
- ⏳ Asset-Brief V2 in [asset-brief-v2.md](../asset-brief-v2.md) (existiert)

### Pending in Phase 1
- ⏳ **Claude-Code Projekt-Setup**
  - `CLAUDE.md` Router (komprimiert) + `@AGENTS.md` Reference
  - `.claude/rules/` mit path-scoped Rules (design-system, copy-voice, conversion-goals, anti-template)
  - `.claude/agents/` mit 4 Sub-Agents (principle-reviewer, copy-reviewer, accessibility-checker, schema-validator)
  - `.claude/skills/implement-section/` + `.claude/skills/review-section/`
  - `.claude/hooks/` mit PostToolUse Linter + Principle-Validator
  - `.claude/settings.json` mit Permissions + Hook-Konfiguration

### Pending Strategie-Items
- ⏳ mobile.de + AutoScout24 Recherche-Report (Background, kommt async zurück)

---

## Phase 2 — Homepage (4-5 Wochen)

### Welle 2.1 — Hero + Wochen-Schaufenster (1 Woche)
- ✅ **Akt 1 — Tor-Reveal Hero** (scaffold done, AI-Frames pending)
- ⏳ **Akt 2 — Wochen-Schaufenster mit Pin + 360°-Rotation + Massive Spec-Type**
  - Component `WeeklyShowcase.tsx`
  - Scroll-driven Animation (rAF, ähnlich TorReveal)
  - AI-generierte 360°-Render oder 24 Stills pro Wochen-Fahrzeug
  - Optional: Sound-Element (mute-by-default)

### Welle 2.2 — Crossfade + Kollektion (1 Woche)
- ⏳ **Akt 3 — Background Crossfade Übergang**
- ⏳ **Akt 4 — Vertikaler Stack-Scroll**
  - Component `CollectionStack.tsx`
  - 5-7 Vehicle-Module, alternierende Layouts
  - View-Transitions API für Click → Detail
  - Vehicle-Data hardcoded V1 (aus updated images.ts), V1.5 aus Payload

### Welle 2.3 — Inspection Vault (1 Woche)
- ⏳ **Akt 5 — Interaktiver Inspection Vault**
  - Component `InspectionVault.tsx`
  - SVG-Outline mit clickable areas
  - Side-Panel (native `<dialog>`)
  - Demo-Daten für Homepage-Version
  - Re-used Component für Detail-Pages

### Welle 2.4 — Atelier + Heritage (1 Woche)
- ⏳ **Akt 6 — Atelier mit Floating Sub-Card**
  - Component `AtelierBlock.tsx`
  - Live-Feed-Items hardcoded V1 (Sample), V1.5 aus Payload
- ⏳ **Akt 7 — Heritage mit Count-Up + Europa-Karte**
  - Component `HeritageCountUp.tsx`
  - SVG Europa-Karte + Pulse-Punkte
  - Intersection Observer für Count-Up-Trigger

### Welle 2.5 — Customer Story + Journal + Concierge (1 Woche)
- ⏳ **Akt 8 — Customer Story Pin + Side-Scroll**
  - Component `CustomerStoryPin.tsx`
  - 3-Layer Scroll-Sync
  - Customer-Stills mit AI-Disclosure
- ⏳ **Akt 9 — Journal Teaser (minimal)**
  - Component `JournalTeaser.tsx`
  - 1 Featured + 2-3 Mini-Links
- ⏳ **Akt 10 — Concierge mit Live-Präsenz**
  - Component `Concierge.tsx`
  - 4-Wege visuell gleichwertig
  - Live-Status via Payload Settings (V1 manual flag)
  - Cal.com Inline Embed

### Welle 2.6 — Footer + Header (1 Woche)
- ⏳ **Footer Brand-Statement**
  - Component `BrandStatementFooter.tsx`
  - Newsletter Inline-Form (Resend/Buttondown)
  - Massive Display-Type "AUSSER / GEWÖHNLICH. / SEIT / 2012."
- ⏳ **Header Refactor (Context-Aware Hell/Dunkel)**
  - Intersection-Observer für aktive Sektion
  - Light-Mode auf hellen Sektionen, Dark-Mode auf dunklen
  - Phone-Number prominent sichtbar (nicht hinter "Call us")

---

## Phase 3 — Vehicle Detail + Kollektion (2-3 Wochen)

### Welle 3.1 — Vehicle Detail Page (2 Wochen, KRITISCH)
- ⏳ **Block 1 — Cinematic Hero**
- ⏳ **Block 2 — Walk-Around-Video Embed**
- ⏳ **Block 3 — Mono Spec-Block**
- ⏳ **Block 4 — Editorial Story (300-500 Wörter Renderer)**
- ⏳ **Block 5 — Inspection Vault (Per-Vehicle Variant)**
- ⏳ **Block 6 — Provenance Dossier (Document Scans)**
- ⏳ **Block 7 — Photo Gallery (60-80 Bilder Lightbox)**
- ⏳ **Block 8 — PPI-Einladung**
- ⏳ **Block 9 — Concierge-Block (re-use)**
- ⏳ **Block 10 — Kuratierte Empfehlungen**
- ⏳ **Floating Mobile-Pill** (Call + WhatsApp sticky)
- ⏳ **Schema.org Vehicle + Product + Offer komplett**
- ⏳ **Dynamic OG Image via Vercel OG**
- ⏳ **dateModified Footer-Mikrocopy**

### Welle 3.2 — Kollektion-Page (1 Woche)
- ⏳ **Editorial Header**
- ⏳ **Filter-Strip (Brand Logos, Price-Range, Year)**
- ⏳ **Editorial Mosaic Cards (asymmetric, NICHT Grid)**
- ⏳ **Kuratorische Sortierung als Default**
- ⏳ **"Verkauft" Status sichtbar**
- ⏳ **URL-Parameter für Filter (?marke=ferrari)**
- ⏳ **Schema.org CollectionPage**
- ⏳ **Empty-State mit Voice**

---

## Phase 4 — Atelier + Journal + Über-uns + Kontakt (2-3 Wochen)

### Welle 4.1 — Atelier-Hub + Sub-Pages (1 Woche)
- ⏳ **/atelier Hub-Page**
- ⏳ **4 Service-Sub-Pages** (wartung, reparatur, klassiker, aufbereitung)
- ⏳ **/atelier/tagebuch** Live-Feed
- ⏳ Schema.org AutoRepair + Service

### Welle 4.2 — Journal (1 Woche)
- ⏳ **/journal Hub-Page**
- ⏳ **/journal/[slug] Article-Pages mit Layout-Variants**
- ⏳ **/journal/kategorie/[slug] Filter-Pages**
- ⏳ **Erste 3-5 Artikel publiziert**
- ⏳ Schema.org Article + BlogPosting + Person + BreadcrumbList
- ⏳ RSS-Feed

### Welle 4.3 — Über-uns + Kontakt (1 Woche)
- ⏳ **/uber-uns mit Editorial Reading-Column**
- ⏳ **Jérôme-Persona, Team-Portraits, Standort-Story**
- ⏳ **/kontakt mit Live-Präsenz, 4-Wege, Cal.com Embed**
- ⏳ Schema.org Organization + Person + LocalBusiness + ContactPoint

---

## Phase 5 — Verkaufen + Briefkasten + Legal + 404/500 (1-2 Wochen)

### Welle 5.1 — Verkaufen-Wizard (3-4 Tage)
- ⏳ **/verkaufen Landing + 3 Wege**
- ⏳ **Multi-Step Wizard mit Foto-Upload**
- ⏳ **3 Sub-Pages (direktkauf, kommission, inzahlungnahme)**
- ⏳ Server-Action Lead-Creation + Email-Notification

### Welle 5.2 — Briefkasten + Newsletter (2 Tage)
- ⏳ **/briefkasten Landing-Page**
- ⏳ **Footer Newsletter-Inline (überall)**
- ⏳ Buttondown Integration + Double-Opt-In Flow

### Welle 5.3 — Legal Pages (3-4 Tage)
- ⏳ **/impressum (Anwalt-Draft + Editorial Layout)**
- ⏳ **/datenschutz (Anwalt-Draft + Editorial Layout)**
- ⏳ **/agb (Anwalt-Draft + Editorial Layout)**
- ⏳ **/widerrufsbelehrung (Anwalt-Draft + Editorial Layout)**
- ⏳ **/cookies (Detail-Policy)**
- ⏳ Cookie-Banner DSGVO-konform (visuell premium)
- ⏳ EU AI Act Disclosure Footer-Block

### Welle 5.4 — Custom 404 + 500 (1 Tag)
- ⏳ **/404 mit Voice-konsistenter Microcopy**
- ⏳ **/500 mit Phone-Fallback**

---

## Phase 6 — Payload CMS + mobile.de Phase 1 + Schema Stack (2-3 Wochen)

### Welle 6.1 — Payload Setup (1 Woche)
- ⏳ Payload v3 in Next.js App installieren
- ⏳ PostgreSQL via Neon
- ⏳ Collections: Vehicles, JournalArticles, AtelierProjects, CustomerStories, Leads, Settings, Users
- ⏳ Admin-UI auf `/admin` mit Locale-Tabs
- ⏳ Auth (Email + Passwort)

### Welle 6.2 — mobile.de Phase 1 (1 Woche)
- ⏳ URL-Redirects (301) von alten `/car-details/[id]` zu neuen Slugs
- ⏳ Initial-Daten-Import (manuell oder CSV-Script)
- ⏳ Schema.org Price-Match-Validation Hook
- ⏳ Vehicle-Pflege durch Jérôme in Payload-Admin (Onboarding-Doc)

### Welle 6.3 — Schema Stack komplett (3-4 Tage)
- ⏳ AutoDealer + LocalBusiness auf jeder Page
- ⏳ Vehicle + Product + Offer auf Detail-Pages
- ⏳ Article + BlogPosting auf Journal-Articles
- ⏳ FAQPage auf /kontakt + per-Vehicle FAQ
- ⏳ BreadcrumbList überall
- ⏳ inLanguage matching hreflang exakt
- ⏳ Schema-Validation via Rich-Results-Test

---

## Phase 7 — Email + Plausible + GEO + Disclosure (1-2 Wochen)

- ⏳ **Resend Setup für transactional Emails**
- ⏳ **5 Email-Templates** (Eingang, Termin, Nachfass, After-Sale, Review-Request)
- ⏳ **Buttondown Setup für Briefkasten**
- ⏳ **Welcome-Sequence (3 Mails über 2 Wochen)**
- ⏳ **Plausible EU-hosted Integration**
- ⏳ **Conversion-Events tracked (Phone-Click, WhatsApp-Click, Form-Submit, etc.)**
- ⏳ **/llms.txt mit kuratierten Entries pro Locale**
- ⏳ **robots.txt erlaubt GPTBot, PerplexityBot, Google-Extended, ClaudeBot**
- ⏳ **EU AI Act Disclosure-Footer + Per-Image-Markup**

---

## Phase 8 — Polish + Audits (1-2 Wochen)

### Performance-Audit
- ⏳ Lighthouse CI Setup
- ⏳ LCP < 1.8s, INP < 120ms, CLS < 0.05 für jede Page
- ⏳ Bundle-Size-Analyze (Initial JS < 90 KB)
- ⏳ Image-Optimization-Pass

### Accessibility-Audit
- ⏳ Axe DevTools auf jeder Page
- ⏳ Manuelles VoiceOver-Testing (macOS)
- ⏳ Manuelles NVDA-Testing (Windows)
- ⏳ Keyboard-Nav-Test pro Page
- ⏳ Reduced-Motion-Toggle-Test
- ⏳ APCA Lc ≥ 75 Body-Text verifiziert

### Content-Audit
- ⏳ Forbidden-Adjectives-Scan über alle Texte
- ⏳ Voice-Konsistenz-Check
- ⏳ Native EN + FR Reviews (extern beauftragt)
- ⏳ Schema-Validation via Rich-Results-Test

### Security-Audit
- ⏳ CSP-Headers strict
- ⏳ HSTS aktiviert
- ⏳ Permissions-Policy konfiguriert
- ⏳ DSGVO-Logging-Compliance

---

## Phase 9 — Launch (1 Woche)

### Soft-Launch (Tag 1-3)
- ⏳ Site live, aber `noindex` für externe Sichtbarkeit
- ⏳ Email an Jérômes existierende Kunden-Liste mit Vorab-Zugang
- ⏳ Feedback-Window 5 Tage
- ⏳ Issue-Tracking + Hotfixes

### Hard-Launch (Tag 4-7)
- ⏳ `noindex` entfernen
- ⏳ Sitemap an Google Search Console + Bing Webmaster submitten
- ⏳ Press-Outreach Welle 1 (Robb Report DE, Octane, Top Gear DE)
- ⏳ GBP-Update (Beschreibung, neue Fotos)
- ⏳ Newsletter erste reguläre Sendung
- ⏳ Instagram-Announcement
- ⏳ classicdriver.com Listing aktivieren

---

## Phase 10 — V1.5+ (Post-Launch, 4-6 Wochen)

### mobile.de Phase 2 (2 Wochen)
- ⏳ Push-Sync Payload → mobile.de
- ⏳ Listing-Quality-Score-Integration
- ⏳ Market-Price-Estimate-Pull (ab Juni 2026)
- ⏳ Lead-Capture von mobile.de in unsere Inbox

### Garage Feature (2 Wochen)
- ⏳ User-Auth (Magic-Link + Email-Password)
- ⏳ Watchlist + Alerts
- ⏳ Vorab-Zugang-Mechanik (24-48h before public)
- ⏳ Dokumenten-Archiv für Bestandskunden

### V1.5 Polish
- ⏳ AutoScout24 Premium-Listing aktivieren
- ⏳ WhatsApp Business API Integration
- ⏳ Live-Präsenz-Indikator dynamisch (statt manual Flag)
- ⏳ AI-gestütztes Lead-Scoring

### Asset-Replacement V1.5
- ⏳ Professionelles Foto-Shooting (30 Fahrzeuge × 60-80 Bilder)
- ⏳ Echte Walk-Around-Videos (3-5 min pro Fahrzeug)
- ⏳ Echtes Jérôme-Portrait + Team-Portraits
- ⏳ Echte Customer-Stories mit Photos + Erlaubnis

---

## Critical-Path Dependencies

### Phase 0 → Phase 1
Foundation muss stehen, bevor Konzept-Docs als sinnvoll sind.

### Phase 1 → Phase 2
Konzept-Docs + Claude-Setup steuern den Build. Ohne ist Build inkonsistent.

### Phase 2 (Welle 2.1) → Phase 3 (Detail-Page)
Hero gibt den Stil-Anker. Detail-Page bedient sich der gleichen Sprache.

### Phase 6 (Payload) → Phase 10 (V1.5)
Ohne Payload kein mobile.de Sync und kein Garage.

### Externe Dependencies (parallel zu Build)
- **Asset-Production** durch Sven (AI-Generation): parallel zu Phase 2+3
- **Native EN + FR Copy** durch externe: parallel zu Phase 4
- **Anwalt-Drafts** parallel zu Phase 5
- **Jérôme Onboarding für Payload + Lead-Inbox** in Phase 6

---

## Risiken & Mitigation

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|---|---|---|---|
| AI-Asset-Konsistenz nicht hinreichend | Mittel | Hoch | Strict House-Look-Rules in Asset-Brief, V1.5 echte Fotos einplanen |
| mobile.de API-Komplexität | Mittel | Mittel | Phase 1 manuell, Phase 2 erst nach erfolgreicher V1 |
| Performance unter Target | Niedrig | Hoch | Lighthouse-CI früh, INP < 120ms strict |
| Native Copy-Review verzögert | Mittel | Mittel | Externe Reviewer früh briefen (Phase 4) |
| Legal-Texte nicht rechtzeitig | Hoch | Hoch | Anwalt in Phase 1 briefen, parallel arbeiten |
| Jérôme Bandbreite für Editorial-Content | Hoch | Mittel | Realistisch 1-2 Artikel/Monat, kein 4/Monat-Versprechen |
| EU AI Act Disclosure-Vergessen | Niedrig | Hoch | Pre-Launch-Checklist mit explizit-Item |
| Bestand-Refresh-Cadence | Mittel | Mittel | Payload Admin so simple bauen, dass Pflege 5 min/Vehicle ist |

---

## Definition of Done — pro Phase

### Phase abgeschlossen wenn:
1. ✅ Alle Wellen-Tasks abgehakt
2. ✅ Lighthouse-Score auf Wellen-Pages ≥ 95 (mobile + desktop)
3. ✅ Axe DevTools 0 errors auf Wellen-Pages
4. ✅ Voice-Konsistenz-Check durch zweite Person
5. ✅ Browser-Test (Chrome, Safari, Firefox, mobile Safari, mobile Chrome)
6. ✅ Code-Review (siehe Anti-Pattern-Liste in [05-design-system.md](./05-design-system.md))
7. ✅ KONZEPT-Doc aktualisiert (Decision-Log)

---

## Definition of Done — Launch (Hard-Launch)

Voraussetzungen für `noindex` entfernen:
- ✅ Alle 10 Akte live + funktionierend
- ✅ Vehicle Detail Page mit min 5 vollständig gepflegten Fahrzeugen
- ✅ /kollektion mit 10+ Fahrzeugen
- ✅ Atelier-Hub + 4 Sub-Pages
- ✅ Journal mit 3+ Artikeln
- ✅ /uber-uns vollständig
- ✅ /kontakt mit funktionierender Cal.com + WhatsApp + Phone
- ✅ /verkaufen Wizard funktional
- ✅ Legal-Pages anwaltlich freigegeben
- ✅ Schema.org auf jeder Page validiert
- ✅ /llms.txt + robots.txt korrekt
- ✅ EU AI Act Disclosure sichtbar
- ✅ Plausible tracking events
- ✅ Email-Auto-Confirmations funktionieren
- ✅ Newsletter Sign-up + Double-Opt-In funktioniert
- ✅ Native EN + FR Review abgeschlossen
- ✅ Lighthouse 100/100/100/100 (oder ≥ 95 wo nicht 100 erreichbar)
- ✅ WCAG 2.2 AA verifiziert
- ✅ Backup-Job läuft (Weekly Payload-Dump)
- ✅ Soft-Launch-Feedback eingearbeitet

---

## Ressourcen-Plan

### Roles & Effort

| Rolle | Phase 1-9 Effort | Phase 10+ |
|---|---|---|
| **Sven (Web-Build)** | Vollzeit | 50% Maintenance |
| **Jérôme** | 30% (Content, Operations-Setup, Feedback) | 60% (Pflege, Lead-Bearbeitung) |
| **Native EN Copywriter** | ~20h One-Time | Ad-hoc |
| **Native FR Copywriter** | ~20h One-Time | Ad-hoc |
| **Anwalt für Onlinerecht** | ~10h One-Time | Ad-hoc bei Gesetzesänderung |
| **Photograph (V1.5)** | ~3-4 Tage Shooting | Quarterly Refresh |

### Externe Costs (One-Time)
- Anwalt: 800-1.500€
- Native Copy EN + FR: 3.000-5.000€
- Photo-Shooting (V1.5): 6.000-10.000€
- Initial AI-Asset-Production: ~500€ (Tokens/Credits)

### Externe Costs (Monthly Recurring, V1.5)
- mobile.de Plus + classicdriver.com + AutoScout24 + Stack: ~€600-1.200/Monat (siehe [09-operations.md](./09-operations.md))

---

## Status Dashboard (Live)

Wird in `STATUS.md` im Repo-Root gepflegt:

```markdown
# Prestige Selections — Status

## Current Phase: Phase 1 (Konzept + Setup)
## Next Phase: Phase 2 (Homepage Welle 2.1)

### This Week
- ✅ KONZEPT-Docs 00-10 geschrieben
- ⚙ Claude-Code Projekt-Setup
- 🎨 Tor-Reveal AI-Frames in Produktion (durch Sven)

### Blocked / Waiting
- mobile.de Recherche-Report (Background-Agent)

### Open Decisions
- Welche Hero-Video-Variante für Akt 1? (Stills + CSS vs Kling-Video)
- Anwalt-Brief vor oder nach Launch?
```
