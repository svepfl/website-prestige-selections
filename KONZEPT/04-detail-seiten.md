# 04 — Detail-Seiten (alle Subpages, 10/10)

> Jede Unterseite folgt dem **gleichen Anspruch wie die Homepage**. Keine "Standard-CMS-Page". Jede hat ihren eigenen Signature Mechanism.
> Reihenfolge in diesem Doc = grobe Conversion-Wichtigkeit (Vehicle Detail zuerst — das ist DAS Conversion-Center).

---

## /kollektion/[slug] — Vehicle Detail Page

> **Die wichtigste Seite der Site.** Wenn diese nicht weltklasse ist, ist nichts weltklasse.

### Purpose
Tiefe Evaluation eines einzelnen Fahrzeugs durch einen Käufer, der bereits Interesse hat. **Decision-Page** — hier passiert "ich will das".

### Visual & Struktur (Top → Bottom)

#### Block 1 — Cinematic Hero (50-70vh)
- **Full-Bleed Hero-Foto** (das beste Foto aus den 60-80) mit minimalem Overlay
- **Display-Type Overlay** unten links: `ASTON MARTIN DBS` (Fraunces Display L) + `2019 · 12.300 km` (mono unter)
- **Floating Mobile-Pill** rechts unten (sticky throughout page): `Anruf · WhatsApp`
- **Subtle "DIESE WOCHE"** Marker oben links, falls dies das Wochen-Schaufenster-Fahrzeug ist

#### Block 2 — Walk-Around-Video (60vh)
- **Full-Width Video-Embed** (Kling AI generiert 8-15s loop, oder echtes 3-5min Video V1.5)
- Mute-by-Default, Play-Button prominent zentriert
- Beim Play: Sound an, Video-Controls minimal
- **Optional Sticky Caption oben links während Play:** "Aufgenommen am 12.04.2026 in Freiburg"

#### Block 3 — Spec-Block (mono, dry)
- 7-Spalten-Layout (auf Desktop): Marke · Modell · Erstzulassung · Leistung · Kilometerstand · Getriebe · Preis
- Alles mono-typografiert, tabellarisch, niemals geschmückt
- Preis sichtbar (nicht "auf Anfrage"), MwSt-Status klar
- Schema.org `Vehicle` + `Product` + `Offer` Match-Check (Preis muss Schema == Visual)

#### Block 4 — Editorial Story (von Jérôme persönlich)
- Eine ~300-500 Wörter Editorial-Passage über *dieses* Fahrzeug
- Persönlicher Tonfall, faktisch, niemals salesy
- Beispiel-Einstieg: *"Erstauslieferung 2019 in Freiburg. Eine Hand. Garagenfahrzeug. 12.300 km in fünf Jahren — wer einen DBS so behandelt, weiß warum."*
- Schrift: Fraunces, 18-20px, comfortable reading column (max-width ~680px)
- KEIN Bild-Beigabe — die Schrift trägt allein

#### Block 5 — Inspection Vault (interaktiv, pro Fahrzeug)
- Die generische Akt-5-Komponente, aber mit echten Daten für *dieses* Fahrzeug
- Klickbare 142-Punkte-Outline
- Pro Punkt: Foto + Datum + Prüfer + Result
- "67/142 erkundet — alle anzeigen" Mini-Indikator

#### Block 6 — Provenance Dossier
- **Foto-Scans der echten Dokumente:**
  - Servicebuch (alle Stempel sichtbar)
  - Original-Rechnung / COC
  - Optionale Restaurierungs-Dokumentation
  - Optionale Vorbesitzer-Historie (anonymisiert)
- Layout: Editorial Asymmetric, jedes Dokument als Card mit subtle shadow
- Click → Lightbox-Vollbild für Details

#### Block 7 — Photo Gallery (60-80 Fotos)
- Editorial-Lightbox mit Keyboard-Navigation (Pfeile, ESC)
- Kategorisiert: Außen · Innen · Motor · Detail · Dokumentation
- Bilder im House-Look (siehe [asset-brief-v2.md](../asset-brief-v2.md))
- Lazy-Loading (nur erste 12 priority)

#### Block 8 — PPI-Einladung (Trust-Booster)
- Eigenständiger Block in editorial Layout:
  ```
  Wir begrüßen Ihre unabhängige Begutachtung.
  
  Bringen Sie Ihren Sachverständigen mit — wir öffnen das
  Fahrzeug für eine 4-stündige Inspektion.
  
  → PPI-Termin anfragen
  ```
- Hintergrund: subtle warm beige (`canvas-soft`), gerahmt mit Whitespace

#### Block 9 — Concierge-Block (Conversion)
- 4-Wege-Kontakt, vereinfachte Version von Homepage-Akt 10
- Mobile-Pill bleibt sticky (überall)
- Newsletter-Sign-up als kleiner Footer (subtle)

#### Block 10 — "Weitere Fahrzeuge" (kuratiert, NICHT algorithmisch)
- 3 Empfehlungen, kuratiert von Jérôme (manuell pro Fahrzeug in Payload)
- KEIN "ähnliche Fahrzeuge" basierend auf Preis-Filter — sondern **bewusste Auswahl**
- Mini-Cards mit Brand + Modell + Preis

### Signature Mechanism
**Three-Layer Editorial:** 1) Cinematic Hero, 2) Walk-Around-Video, 3) Interactive Inspection Vault. Diese drei Bausteine zusammen sind **das Vertrauenskapital** der Detail-Seite. Niemand sonst hat alle drei in dieser Tiefe.

### Tech
- ISR mit `revalidateTag('vehicle-${id}')` — bei Inventory-Update sofort refresh
- View Transitions API: Bild aus Kollektion-Liste fliegt mit zur Detail-Page
- Schema.org Vehicle + Product + Offer **vollständig** (alle Felder)
- `dateModified` sichtbar im Footer-Mikrocopy: "Aktualisiert am 14.03.2026"
- Per-Vehicle FAQ-Schema (5-7 Fragen im Prompt-Stil)
- Per-Vehicle Custom OG Image (dynamisch via Vercel OG)

### Assets pro Fahrzeug
- 1 Hero-Foto (best of 60-80)
- 60-80 Galerie-Fotos
- 1 Walk-Around-Video (5-15s minimum, ideal 3-5min)
- 1 Vehicle-Outline-SVG für Inspection Vault
- ~30-40 Inspection-Detail-Fotos
- 3-5 Dokument-Scans (Servicebuch, Rechnung, etc.)
- Editorial-Text 300-500 Wörter

### Conversion-Hebel (geordnet nach Wichtigkeit)
1. **Mobile-Pill sticky** (Call/WhatsApp permanent verfügbar)
2. **Walk-Around-Video** (laut Sales-Research +40-60% Conversion)
3. **Provenance Dossier** (Trust für 200k-Käufer)
4. **Inspection Vault** (radikale Transparenz)
5. **PPI-Einladung** (Trust-Multiplikator)
6. **Konkreter Preis** (kein "auf Anfrage")
7. **Editorial Story** (emotionale Bindung)

### Anti-Patterns (NIEMALS)
- ❌ Carousel-Hero
- ❌ "Stunning DBS" / "Breathtaking" in der Beschreibung
- ❌ "Price on application"
- ❌ Standard "Contact Us" Form mit 5+ Feldern
- ❌ Manufacturer Press Bilder
- ❌ Live-Chat-Bubble

### Status
**Vehicle Detail Page existiert als `/fahrzeuge/[slug]` mit minimalem Layout.** Komplett-Rebuild zwingend. Priorität: **HÖCHSTE** (P0).

---

## /kollektion — Bestand-Liste

### Purpose
Kuratierte Übersicht aller ~30 Fahrzeuge. Brücke von Homepage zur Detail-Page.

### Visual & Struktur

#### Block 1 — Editorial Header (40vh)
- Headline: "DREISSIG / AUTOMOBILE. / EINE ADRESSE." (Fraunces, staggered)
- Untertitel: "Jedes geprüft. Jedes mit Historie."
- Subtle Filter-Strip darunter (Marken-Logos, Preisrange-Slider, Erstzulassung)

#### Block 2 — Kuratorische Reihenfolge
- Default-Sortierung: **"Kuratorisch"** (Jérôme entscheidet manuell die Order)
- Andere Sortierungen wählbar: Preis (auf/ab), Baujahr, Kilometerstand
- Filter sind sekundär — die kuratierte Reihenfolge ist das Brand-Signal

#### Block 3 — Vehicle Grid (Editorial Asymmetric)
- KEIN 3-Spalten-Raster.
- Stattdessen: **Editorial Mosaic** mit unterschiedlich-großen Cards
- Pro Card: Bild (full-bleed), Marke + Modell + Jahr + Preis
- "VERKAUFT" Status für historische Sales (bleiben sichtbar mit Overlay → Aktivität-Signal)
- Hover: Bild subtle zoom (1.04), Card-Shadow vertieft sich
- Click: View-Transition zur Detail-Page

#### Block 4 — Empty-State (wenn Filter zu strikt)
- Anstelle "Keine Ergebnisse" — Voice-Konsistent: *"Nicht in unserem Bestand. Wir finden es für Sie. → Sprechen wir."*
- CTA zu /kontakt

### Signature Mechanism
**Kuratorische Reihenfolge als Default + Editorial Mosaic statt Grid.** Die Reihenfolge ist nicht algorithmisch — sie ist redaktionell. Das ist Brand-Aussage.

### Tech
- Static Generation mit `revalidateTag('collection')` bei jeder Vehicle-Änderung
- URL-Params für Filter: `?marke=ferrari&preis-max=100000`
- Schema.org `CollectionPage` + Vehicle-Liste

### Conversion-Hebel
- View-Transitions für smooth Click → Detail (psychologisch macht Klick "billiger")
- "Verkauft"-Sichtbarkeit zeigt Aktivität → schafft FOMO ohne Druck

### Status
**Existiert als `/fahrzeuge`** — Umbenennung + Komplett-Rebuild.

---

## /atelier (Hub-Page) + 4 Service-Sub-Pages + /atelier/tagebuch

### Purpose
Werkstatt-Authority. Service-Geschäft als zweite Umsatz-Säule.

### Layout der Hub-Page (/atelier)

#### Block 1 — Atelier Hero
- Full-Bleed dokumentarisches Reportage-Foto der Halle
- Tagline: *"Hier arbeiten 5 Hände an Fahrzeugen, die Geschichte geschrieben haben."*
- Floating Sub-Card mit Stat: "5 Spezialisten · Eine Werkstatt · 24 Jahre Erfahrung"

#### Block 2 — 4 Service-Bereiche (asymmetric)
- 2x2 Grid mit unterschiedlichen Card-Größen
- Pro Card: Bild + Service-Name + 1-Satz-Description
- Click → eigene Sub-Page (siehe unten)

#### Block 3 — Atelier-Tagebuch Teaser
- Aktuelle 5 Live-Projekte (anonymisiert, wöchentlich gepflegt)
- "Tagebuch ansehen →" zum Sub-Hub

#### Block 4 — Brands-We-Service (Logo-Wall, restrained)
- Bentley, Ferrari, Porsche, Aston Martin, etc. — Logos in `gold-deep` auf Canvas
- Subtitle: "Marken, denen wir vertrauen — und die uns vertrauen"

#### Block 5 — Terminbuchung (Concierge-Variant)
- Cal.com-Embed oder Custom-Slot-UI
- Telefon + WhatsApp daneben

### Sub-Pages: `/atelier/wartung`, `/atelier/reparatur`, `/atelier/klassiker`, `/atelier/aufbereitung`

Jede Sub-Page als **Editorial Long-Form**:
- Hero-Bild des Service-Bereichs (House-Look)
- Lange Editorial-Beschreibung (von Jérôme verfasst, ~600 Wörter)
- Feature-Liste (mono, präzise)
- Pricing-Hinweise (transparent, falls möglich)
- Termin-Slot direkt am Ende

### Signature Mechanism (Hub)
**Atelier-Tagebuch Live-Feed.** Wöchentlich aktualisierte Liste aktueller Projekte. Macht keiner sonst. Beweis statt Behauptung.

### /atelier/tagebuch — eigene Sub-Page
- Liste aktueller + vergangener Projekte
- Pro Projekt: 1-2 Sätze + Foto (anonymisiert: kein Kennzeichen, ggf. unscharf)
- Filter: nach Marke, nach Service-Typ
- Atom-Feed für Newsletter-Integration

### Tech
- Payload Collection `atelierProjects` (manuell, weekly Pflege)
- Schema.org `AutoRepair` + `Service` pro Sub-Page

### Status
**Existiert als `/werkstatt` mit Tab-UI** — komplettes Refactor: Hub-Page + 4 Standalone Sub-Pages + Tagebuch.

---

## /journal (Editorial-Magazin)

### Purpose
Editorial-Authority. SEO/GEO-Maschine. Newsletter-Content-Quelle. Brand-Building über Jahre.

### Hub-Page (/journal)

#### Block 1 — Editorial-Header
- Tagline: *"Was wir denken. Was im Atelier passiert. Was den Markt bewegt."*
- KEIN "Latest Articles" oder ähnliche Generika

#### Block 2 — Featured Article (großformatig)
- 1 Hauptartikel, Hero-Foto + Title + Lead-Text
- 50% Bildschirmhöhe, dominant

#### Block 3 — Article Grid (asymmetric)
- 6-8 weitere Artikel als Cards
- Mix: nur Title + Date (kein Bild) für die kleineren — schafft Editorial-Rhythmus

#### Block 4 — Kategorien-Filter
- 5 Kategorien: Im Atelier · Vermittelt · Markenportrait · Markt · Standort Freiburg
- Filter-Pills oben, subtle

### Artikel-Page (/journal/[slug])

Pro Artikel **eigenes Layout** — kein Standard-Blog-Template:

- **Hero-Variation:** Manche Artikel Full-Bleed-Bild, andere reine Type-Headline auf Canvas, andere Asymmetric-Split. Pro Artikel-Typ ein eigenes Pattern.
- **Lange Reading-Column** (max-width ~680px für Lesbarkeit)
- **Eingestreute Bilder** in unterschiedlichen Formaten (Full-bleed, 4:5, 16:10) für Editorial-Rhythmus
- **Mono-Spec-Blocks** für Markt-Beobachtungen (Preise, Daten, Statistiken)
- **Eigene Pull-Quote-Styling** (groß, Fraunces Light, eingerückt)
- **Article-Footer:** Author (Jérôme), Date, Tags, Newsletter-Sign-up, "Weitere Beiträge"

### Signature Mechanism
**Pro-Artikel-Layout-Variation.** Kein WordPress-Blog-Vibe. Jeder Artikel fühlt sich an wie ein Magazin-Spread, nicht wie "noch ein Blog-Post".

### Tech
- Payload Collection `journalArticles` (Markdown + Hero-Bild + Inline-Bilder + Layout-Variant)
- Schema.org `Article` + `BlogPosting` + `Person` (Author) + `BreadcrumbList`
- RSS-Feed für Newsletter-Integration
- 1-2 Artikel/Monat Cadence (siehe [08-content.md](./08-content.md))

### Conversion-Hebel
- Sekundär — Authority + SEO/GEO
- Newsletter-Sign-up am Ende JEDES Artikels (kontextuell, nicht aufdringlich)

### Status
**❌ Neu — existiert nicht.** P1 Build (essentiell für GEO/Authority).

---

## /verkaufen (Fahrzeug-Verkaufs-Wizard)

### Purpose
Neue Lead-Quelle: Privatpersonen, die ein hochwertiges Fahrzeug abgeben wollen. Generiert auch neue Inventory.

### Layout

#### Block 1 — Hero
- Headline: "SIE MÖCHTEN / ABGEBEN."
- Subtitle: "Wir kaufen direkt — oder vermitteln diskret."

#### Block 2 — Drei Wege visuell gleichwertig (Cards)
1. **Direktkauf** — schnell, fair, sofortige Liquidität
2. **Kommission** — höchster Erlös, Zeit (Vermittlung über uns)
3. **Inzahlungnahme** — gegen Fahrzeug aus unserem Bestand

Pro Karte: 1 Bild + 1 Headline + 1 Absatz + CTA "Mehr →"

#### Block 3 — Wizard (Sticky Sidebar oder Inline Multi-Step)
- Schritt 1: Marke + Modell (Auto-Suggest)
- Schritt 2: Baujahr + Erstzulassung
- Schritt 3: Kilometerstand
- Schritt 4: Zustand (Multiple-Choice)
- Schritt 5: Fotos hochladen (5-10 Bilder, Drag-Drop)
- Schritt 6: Kontakt (Name, Email, Telefon)
- Submit: "Wir melden uns innerhalb 24 Stunden."

#### Block 4 — Sub-Pages pro Verkaufs-Weg
- `/verkaufen/direktkauf`, `/verkaufen/kommission`, `/verkaufen/inzahlungnahme`
- Jede mit Editorial-Erklärung + spezifischem Wizard

### Signature Mechanism
**3-Wege-Differenzierung statt Standard "Sell your car"-Form.** Macht keiner sonst in DACH-Premium. Erlaubt Käufer-Selbst-Selektion.

### Tech
- Multi-Step-Form mit Progress-Indicator
- Foto-Upload zu Cloudinary
- Auto-Email an Jérôme + Auto-Confirmation an Verkäufer (Resend)
- Optional: ML-basierte Preis-Range-Schätzung (V1.5)

### Conversion-Hebel
- 3-Wege-Selektion reduziert Decision-Fatigue
- Foto-Upload macht Anfragen QUALIFIZIERTER → weniger Time-Waste für Jérôme

### Status
**❌ Neu — P1.**

---

## /garage (Privater Kundenbereich — V1.5)

### Purpose
Retention. Vorab-Zugang. Wiederkehr-Mechanik für Sammler.

### Layout (nach Login)

#### Block 1 — Personalisierter Header
- "Willkommen zurück, [Vorname]."
- Aktivität-Summary (z.B. "3 neue Fahrzeuge auf Ihrer Watchlist")

#### Block 2 — Watchlist
- Gespeicherte Fahrzeuge als Editorial-Cards
- Status-Updates: "Noch verfügbar" / "Verkauft" / "Im Atelier"

#### Block 3 — Alerts
- "Benachrichtige mich bei neuen [Marke/Modell]"
- Konfigurations-UI: Marke, Preisrange, Erstzulassung

#### Block 4 — Vorab-Zugang
- "Bald in der Halle" — Fahrzeuge, die noch nicht öffentlich gelistet sind
- 24-48h Garage-User-Vorsprung vor öffentlicher Listung

#### Block 5 — Dokumenten-Archiv
- Für Bestandskunden: Eigene Service-Historie ihres Fahrzeugs

### Signature Mechanism
**Vorab-Zugang** — Garage-User sehen neue Fahrzeuge *vor* allen anderen. Macht den Login wertvoll.

### Tech
- Payload Auth (Email + Passwort, optional Magic-Link)
- Pro User: Watchlist, Alerts, Documents-Collection
- Vorab-Listing-Logik: Vehicle-Field `publishAt` mit Garage-Override

### Status
**❌ Neu — V1.5 (komplex wegen Auth + DB).**

---

## /uber-uns

### Purpose
Trust. Jérôme als Persona. Team-Foundation. Standort-Story.

### Layout

#### Block 1 — Jérôme-Portrait (Hero)
- Full-Bleed Editorial-Portrait (echtes Foto bevorzugt)
- Untertitel: "Gründer und Inhaber, seit 2012."

#### Block 2 — Persönliche Story (Editorial)
- ~800-1200 Wörter Editorial-Erzählung
- Von Jérôme verfasst (in Ich-Form), Voice-konsistent
- Themen: Wieso Sportwagen, wieso Freiburg, was treibt uns

#### Block 3 — Video-Statement (optional V1.5)
- 60-90s Jérôme on Camera, narrated, dokumentarisch
- V1: AI-generiertes Placeholder mit Disclosure

#### Block 4 — Das Team
- 5 Werkstatt-Spezialisten als Editorial-Portraits
- Pro Person: Name + Rolle + 1 Satz zur Person ("Spezialisiert auf Klassiker-Restaurierung")

#### Block 5 — Der Standort
- Foto-Reportage der Halle (Außen + Innen)
- Geographische Anbindung (Freiburg, Schwarzwald, Rhein)
- "So finden Sie uns" mit Karte

#### Block 6 — Werte (3-Stück, kurz)
- *Kuration. Beziehung. Diskretion.*
- Pro Wert 1-2 Sätze

#### Block 7 — Einladung
- "Kommen Sie vorbei. Auch ohne Anlass."
- Termin-Slot + Telefon

### Signature Mechanism
**Lange Editorial Reading-Column mit Jérôme als Protagonist** — keine "Über uns"-Standard-Cards. Eine ehrliche, lange Stimme.

### Tech
- Lange Markdown-Datei → Custom Layout (kein generic Blog-Template)
- Schema.org `Organization` + `Person` (Founder)

### Status
**❌ Neu (Heritage-Komponente existiert auf Homepage, aber keine eigene Page).**

---

## /kontakt — Concierge

### Purpose
Reibungsloser Erstkontakt. 4 Wege. Operativ präzise.

### Layout

#### Block 1 — Hero (Dark)
- Full-Bleed Foto der Halle bei Nacht
- Headline: "SPRECHEN / WIR." (Fraunces, staggered)
- Background fadet bei Scroll zu Light

#### Block 2 — Live-Präsenz-Indikator
- Pulsierender Punkt + Status: "Heute geöffnet · 10–18 Uhr" oder "Heute geschlossen"
- "Antwortet üblicherweise innerhalb 2 Stunden" (real-tracked)

#### Block 3 — 4 Wege Layout (gleichgewichtig)
1. **Anruf** — Mobile-Pill mit `+49 761 5573168`
2. **WhatsApp** — Direct-Link mit pre-filled message
3. **Termin** — Cal.com Inline Embed
4. **Besuch** — Adresse + Karte + WhatsApp-QR-Code (Mobile→Desktop)

#### Block 4 — Form (Last Resort, minimal)
- Nur 3 Felder: Name · Kontakt (Email oder Telefon) · Nachricht
- KEINE Felder für Budget, Timeline, etc. (Reduktion = Trust)
- Submit: "Schicken" (nicht "Absenden")

#### Block 5 — FAQ (für AI-Search)
- 5-7 typische Fragen im Prompt-Stil
- Schema.org `FAQPage` (GEO-Authority)

### Signature Mechanism
**Live-Präsenz-Indikator + Sub-4h-Response-Versprechen.** Macht Concierge transparent statt black-box.

### Tech
- Cal.com Inline Embed
- WhatsApp Direct-Link
- Resend für transactional Email
- Plausible Event-Tracking für Conversion-Funnel
- LocalBusiness Schema vollständig

### Conversion-Hebel
- Anruf ist priorisiert (60% rufen)
- Live-Status zeigt Erreichbarkeit
- 3-Felder-Form senkt Friction

### Status
**Existiert minimalistisch.** Re-Konzept als Concierge zwingend.

---

## /briefkasten — Newsletter-Landing

### Purpose
Dedicated Sign-up-Page mit eigenem Conversion-Versprechen.

### Layout

#### Block 1 — Headline + Promise
- "**Vorab. Vor allen anderen.**"
- Subtitle: "Jedes neue Fahrzeug erreicht Sie 48 Stunden, bevor es öffentlich gelistet wird."

#### Block 2 — Newsletter-Preview
- 3-4 echte vergangene Ausgaben als Editorial-Cards (Visual Preview)
- Click öffnet Lightbox mit echter Mail-Render

#### Block 3 — Anmeldung
- Nur 1 Feld: Email
- Submit: "Aufnehmen" (nicht "Abonnieren")
- DSGVO-Hinweis dezent darunter (Double-Opt-In)

#### Block 4 — Was passiert nach Sign-up
- 3 Schritte: 1) Bestätigungs-Mail · 2) Briefkasten-Newsletter alle 14 Tage · 3) Vorab-Zugang zu neuen Fahrzeugen
- Voice-konsistent: kein "Welcome!" — sondern "Aufgenommen. Die erste Sendung kommt Sonntag."

### Signature Mechanism
**Vorab-Zugang als Kern-Versprechen** + Visual Newsletter-Preview (echte Editorial-Beispiele).

### Tech
- Buttondown oder Resend Custom-Form
- Double-Opt-In Pflicht (DSGVO)
- Tag-System: Sign-up-Quelle tracken

### Status
**❌ Neu — P1.**

---

## /impressum, /datenschutz, /agb, /widerrufsbelehrung, /cookies

### Anti-Template-Anspruch
Auch hier 10/10. Die meisten Premium-Sites haben **schlechte** Legal-Pages — wir zeigen, dass selbst Compliance ein Brand-Touchpoint ist.

### Visual & Treatment (alle 5)

- **Layout:** Reading-Column max-width 680px, mit Fraunces für Headlines, Inter für Body
- **Type-Größen:** Body 16-18px, Line-Height 1.7 (super comfortable reading)
- **Section-Hierarchy:** Klare H2/H3, vertikales Spacing großzügig
- **Footer-Mikrocopy:** "Aktualisiert am 14.03.2026" sichtbar (`dateModified` Schema)
- **Sprache:** Anwaltlich präzise, aber LESBAR — nicht copy-paste-Standardtext
- **Tone:** Neutral, kein "Hi!" oder ähnliches, aber auch nicht intimidating
- **Cookie-Banner Sub-Settings Page:** echte transparente Optionen, keine Dark Patterns

### Impressum-Spezifika
- TMG §5 vollständig (Inhaber, Anschrift, Telefon, Email, Handelsregister)
- KFZ-Händler-spezifisch: Handwerkskammer-Zugehörigkeit + Berufsständische Versicherung

### Datenschutz-Spezifika
- Vollständige Auflistung **aller** Drittanbieter: Plausible, Resend, Payload, Cloudinary, etc.
- Cookie-Spezifika
- Rechtsgrundlage je Verarbeitung (DSGVO Art. 6)
- Betroffenenrechte
- Auftragsverarbeitungs-Verträge dokumentiert

### AGB-Spezifika
- Gewerblich vs. Privat-Differenzierung (Garantie-Unterschiede)
- Anzahlungs-Modalitäten
- Lieferungs-Bedingungen (DE / EU)
- Eigentumsvorbehalt
- Gewährleistung KFZ

### Widerrufsbelehrung
- Fernabsatz nach BGB §312g
- Klar formulierte Frist + Adresse für Widerruf

### Cookies (eigene Detail-Seite)
- Auflistung aller verwendeten Cookies/Storage-Items
- Pro Item: Name, Zweck, Anbieter, Dauer, Kategorie

### Signature Mechanism
**Editorial-Typographie + sauberes Reading-Layout + transparente Aktualisierungs-Datums-Signal.** Niemand erwartet, dass /impressum schön ist — wir liefern es trotzdem.

### Tech
- Markdown-Files in Payload (Editor-friendly Pflege)
- `dateModified` automatisch
- Schema.org `WebPage` mit `WebPage.lastReviewed`

### Status
**❌ Drafts nötig (Anwalt-Brief), Editorial-Layout-Implementierung.**

---

## /404, /500 (Error Pages)

### Purpose
Trust auch im Fehlerfall. Voice-konsistent.

### Visual
- Light Canvas
- 1 Foto eines rotating-weekly-Fahrzeugs als subtle Background
- Mittig: Headline + Mikrocopy + 1 CTA zurück

### /404 Layout
- Headline: "**Diese Seite existiert nicht.**"
- Untertitel: "Aber dreißig andere schon."
- CTA: "Zur Kollektion →"

### /500 Layout
- Headline: "**Etwas ist schiefgegangen.**"
- Untertitel: "Wir wissen Bescheid und arbeiten daran. Versuchen Sie es in einem Moment erneut — oder rufen Sie direkt an: +49 761 5573168"
- CTA: "Zur Startseite →"

### Signature Mechanism
**Voice-konsistente Mikrocopy** statt Standard-Error-Page. Auch im Fehlerfall fühlt sich der Käufer noch in der Marken-Welt.

### Tech
- Next.js `not-found.tsx` + `error.tsx` per Locale
- Sentry-Integration für Error-Tracking (V1.5)

### Status
**Default existiert** — Custom-Layout pending.

---

## Übergreifende Anti-Template-Pflichten

Diese gelten für **JEDE** Unterseite (auch die, die hier nicht einzeln aufgeführt sind):

1. **Eigene typografische Komposition** — niemand kopiert einfach das Homepage-Headline-Pattern
2. **Whitespace strategisch** — wenn die Seite "voll" wirkt, ist sie zu voll
3. **Photography vor UI** — selbst Legal-Pages haben mindestens 1 atmosphärisches Bild
4. **Voice durchgehend konsistent** — Mikrocopy folgt [01-strategie.md](./01-strategie.md)
5. **Schema.org passend** — kein "Webpage" als Default, sondern passender Subtype
6. **Performance Pflicht** — LCP < 1.8s, INP < 100ms, CLS < 0.05 auch auf "kleinen" Seiten
7. **A11y Pflicht** — WCAG 2.2 AA, APCA Lc ≥ 75, Keyboard-Nav
8. **Reduced-Motion respektiert** überall
9. **Native EN + FR** — keine Auto-Translate (auch auf /impressum)
10. **dateModified sichtbar** auf relevant Pages

---

## Was diese Doc NICHT beantwortet

- **Wie genau sieht das Foto-Direction aus?** → [asset-brief-v2.md](../asset-brief-v2.md)
- **Welche Type-Größen genau?** → [05-design-system.md](./05-design-system.md)
- **Welche Schema-Felder?** → [06-tech.md](./06-tech.md)
- **Wie sieht der Editorial-Calendar aus?** → [08-content.md](./08-content.md)
- **Wann wird was gebaut?** → [10-roadmap.md](./10-roadmap.md)
