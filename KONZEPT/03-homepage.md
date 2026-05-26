# 03 — Homepage (10 Akte, 10/10)

> Die Homepage ist eine choreographierte Erzählung in 10 Akten. Jeder Akt hat **seinen eigenen Signature Mechanism** — kein Akt teilt seinen Mechanismus mit einem anderen. Wir vermeiden das "Sektionen-Stapel"-Pattern absolut.

**Anti-Template-Pflicht (siehe [00-README.md](./00-README.md)):** Wenn ein Akt austauschbar wäre mit einem anderen Premium-Auto-Site, scheitert er. Jeder Akt rechtfertigt seinen Platz durch eine einzigartige Idee.

---

## Übersicht der 10 Akte

| Akt | Hintergrund | Signature Mechanism | Conversion-Rolle |
|---|---|---|---|
| 1 | Dark | **Tor-Reveal** (5-Frame Scroll-Crossfade) | TRUST (Eintrittsritual) |
| 2 | Dark | **360°-Pin + Massive Type Reveal** | TRUST (Kuration) |
| 3 | Dark→Light | Crossfade-Übergang | — |
| 4 | Light | **Vertikaler Stack-Scroll** (1 Fahrzeug pro Bildschirm) | CURATION |
| 5 | Light | **Interaktiver Inspection Vault** (klickbare Hotspots) | EVALUATION-Vorgriff |
| 6 | Light | **Atelier Live-Feed** (wöchentliche Projekte) | TRUST |
| 7 | Light | **900-Count-Up + animierte Europa-Karte** | TRUST |
| 8 | Dark | **Pinned Quote + Side-Scrolling Customer-Stills** | TRUST (Social Proof) |
| 9 | Light | **Magazine-Spread Teaser** (1 großer Artikel) | AUTHORITY (subtil) |
| 10 | Dark→Light | **Live-Präsenz-Indikator + 4-Wege-Kontakt** | CONTACT |
| Footer | Light | **Brand-Statement im Koenigsegg-Format** | — |

---

## Akt 1 — Tor-Reveal

### Purpose
Das Eintrittsritual. Übersetzt die kuratorische Geste der Marke in eine physische Metapher: "Wir öffnen das Tor für Sie." Macht aus einem Standard-Hero ein **Erlebnis**.

### Visual
- **Hintergrund:** Dark (Carbon `#15110D`)
- **Asset:** 5 AI-generierte Stills der echten Engesserstraße-Halle (Tor geschlossen → 25% → 50% → 75% → offen mit EINEM Fahrzeug im Spotlight)
- **Display-Type über dem Tor:** "AUSSERGEWÖHNLICHE / AUTOMOBILE. / FREIBURG." (Fraunces Light, gigantisch, scrollt mit dem Tor weg)
- **Skip-Button:** dezent oben rechts, "Direkt zur Kollektion →"
- **Scroll-Indicator:** unten, dünner Goldstrich

### Signature Mechanism
**Scroll-Driven Frame-Crossfade.**
- Section ist 3 Viewport-Höhen lang (`h-[300vh]`)
- Sticky-Container hält den Stage im Viewport
- Bei Scroll-Progress 0→1 crossfaden 5 Frames trapezoidal (siehe `easeBand` in TorReveal.tsx)
- Headline fadet bei 25-40% Progress aus, "Diese Woche" fadet bei 85-100% ein
- `sessionStorage.setItem('prestige-tor-seen', 'true')` → Returning Visitor sieht direkt offenes Tor
- `prefers-reduced-motion` → springt sofort auf Frame 5

### Tech
- ✅ Implementiert: [src/components/sections/TorReveal.tsx](../src/components/sections/TorReveal.tsx)
- requestAnimationFrame + Scroll-Listener (kein externer Motion-Lib-Footprint)
- Will-change Optimierungen für Performance

### Assets (Pflicht)
- 5 Stills `/public/assets/tor/frame-1.jpg` ... `frame-5.jpg` (Desktop 16:9, mind. 3000px Breite)
- 2 Mobile-Stills 9:16 für Portrait
- Prompts: siehe [asset-brief-v2.md](../asset-brief-v2.md#1-akt-1--tor-reveal-5-frames-für-css-scroll-crossfade)

### Status
**✅ Scaffold gebaut.** Wartet auf AI-Frames.

---

## Akt 2 — Wochen-Schaufenster (10/10 Aufwertung)

### Purpose
Kuratorische Geste sichtbar machen: Wir zeigen *ein* Fahrzeug pro Woche. Nicht 30. Das signalisiert Auswahl, Tiefe, Editorial-Haltung.

### Visual
- **Hintergrund:** Dark (Fortsetzung von Akt 1, kein Wechsel)
- **Asset Layer 1:** AI-generiertes 360°-Rotations-Loop des Wochen-Fahrzeugs (Kling AI, 8s) ODER 5-8 Standbilder, die per Scroll rotiert werden
- **Asset Layer 2:** Massive Display-Type, die mit Scroll **physisch durch den Viewport wandert**
- **Mini-Label oben:** "DIESE WOCHE" (Gold, mono, 10px, tracking 0.4em)

### Signature Mechanism — 3 verschachtelte Choreographien
**1. Pin + 360°-Scrub:** Fahrzeug bleibt zentral pin'd während Scroll, rotiert in Echtzeit basierend auf Scroll-Progress.
**2. Massive Spec-Type:** Beim Scrollen erscheinen Specs nicht als Liste, sondern als **viewport-füllende Display-Type** in Sequenz:
```
[Scroll 20%]   ASTON MARTIN
[Scroll 30%]   DBS
[Scroll 40%]   725 PS
[Scroll 50%]   12.300 km
[Scroll 60%]   1. Hand
[Scroll 70%]   Lückenlose Historie
[Scroll 80%]   215.000 €  ← klein, ruhig, am Ende
```
Jede Zeile fadet ein und wieder aus, eine nach der anderen. Das Auto bleibt sichtbar im Hintergrund.

**3. Optionales Sound-Element:** Sehr subtiler Engine-Klick beim ersten Reveal (1× pro Session, Mute-Toggle prominent). Default off auf Mobile, opt-in.

### Tech
- Sticky 100vh Container, 3-4 viewport tall section
- Scroll-progress mapped auf 7-10 Stages
- Jede Stage = ein massiver Headline-Frame mit fade-in/out
- Bild-Layer = entweder scrubbed video (`<video>` mit `currentTime` getriggert) ODER 360°-Stills im rapid succession (CSS Transform)

### Assets
- 1 360°-Render des Hero-Fahrzeugs (Kling AI Walk-Around, 8s loop) ODER 24 Standbilder im 15°-Abstand
- Pro Woche neu (Operativ-Aufwand)

### Conversion-Hebel
- Subtiler CTA am Ende: "Diese Geschichte ansehen" → führt zur Detail-Page
- Das Fahrzeug wird emotional aufgeladen — Käufer kennt es bereits, wenn er die Detail-Page erreicht

### Status
**Pending.** Build mit AI-Asset-Vorbereitung.

---

## Akt 3 — Übergang (Crossfade Dark → Light)

### Purpose
Nicht "noch eine Sektion" — ein **Atemzug**. Der Käufer wechselt psychisch von "Schaufenster" (kuratorisch) zu "Bestand" (auswählend). Der Background-Wechsel signalisiert das.

### Visual
- 80vh hohe Pufferzone
- Hintergrund crossfaded smooth von Carbon `#15110D` → Canvas `#F2EDE3`
- In der Mitte: **EIN winziges Label** "KOLLEKTION" (mono, gold-deep, 10px, tracking-weit)
- Sonst nichts

### Signature Mechanism
**Negative Space als Statement.** 80vh leerer Raum auf einer Premium-Site ist eine Aussage. Sagt: "Wir haben Platz. Wir hetzen Sie nicht."

### Tech
- CSS scroll-driven animation (oder JS scroll-listener) für background-color interpolation
- Sehr kurze Section, kein Pin

### Status
**Pending.** Wird als Übergang zwischen Akt 2 und 4 implementiert.

---

## Akt 4 — Kollektion (Vertikaler Stack-Scroll — 10/10 Aufwertung)

### Purpose
Den vollen Bestand zeigen — aber **nicht im Grid**. Editorial Stack-Scroll, wie ein Magazin.

### Visual
- **Hintergrund:** Canvas `#F2EDE3`
- **Header oben fixed:** "DIE KOLLEKTION" + "5 von 30 ansehen, oder alle →" (Link zu /kollektion)
- **5-7 Fahrzeuge als vertikaler Stack**, jeweils ~80-100vh hoch
- Jedes Fahrzeug-Modul:
  - Full-bleed Bild rechts
  - Editorial-Text links (Marke + Modell + Jahr + 1 Satz Kontext)
  - Preis dezent unten
  - Mono-Spec-Zeile (PS, km, Erstzulassung)
- "Alle Fahrzeuge ansehen →" am Ende, führt zu /kollektion

### Signature Mechanism — Vertikaler Editorial-Stack (NICHT Grid)
**Warum nicht Grid?** Grids haben alle Premium-Händler. Das hier wirkt wie ein Magazin-Spread, nicht ein Katalog. Slower aber edler. Der Käufer scrollt durch wie durch einen Editorial-Beitrag, nicht durch einen Shop.

**Layout-Wechsel zwischen Fahrzeugen:**
- Fahrzeug 1: Bild rechts (60%), Text links (40%)
- Fahrzeug 2: Bild links (60%), Text rechts (40%)
- Fahrzeug 3: Full-bleed Bild oben, Text unten (60/40 vertikal)
- Fahrzeug 4: Bild rechts (40%), Text links (60%) — Text dominant für besondere Fahrzeuge
- Fahrzeug 5: zurück zu Fahrzeug-1-Pattern

**Damit:** Asymmetrie, Rhythmus, kein Wiederholungs-Geruch.

### Tech
- Normal Scroll (kein Pin)
- View Transitions API für Click → Detail (Bild fliegt mit)
- Vehicle-Data aus Payload CMS (V1.5) oder hardcoded (V1)
- Lazy-Load Images mit Priority auf Erste 2

### Conversion-Hebel
- Direkte Conversion: Click führt zur Detail-Page
- Vorab-Kuration: Reihenfolge ist NICHT preis-aufsteigend, sondern **redaktionell kuratiert** (Jérôme entscheidet, welche 5-7 hier sind)

### Status
**Pending.** Komplexer Build, ~3-4 Tage.

---

## Akt 5 — Inspection Vault (Interaktiv — 10/10)

### Purpose
Beweisen, dass "142 Prüfpunkte" keine Marketing-Zahl ist, sondern reale Operationen. **Höchster Trust-Hebel der gesamten Site.**

### Visual
- **Hintergrund:** Canvas `#F2EDE3`
- **Headline links:** "GEPRÜFT, / BEVOR SIE / ES SEHEN." (Fraunces Light, staggered indent)
- **Rechts:** Interaktive Fahrzeug-Silhouette (technische Linienzeichnung) mit pulsierenden Hotspots
- **Hotspot-Click:** Slide-Out-Panel rechts mit Inspektions-Detail (Foto, Datum, Prüfer, Pass/Fail, Notizen)
- **Score-Builder unten:** "Sie haben 7 von 142 Punkten erkundet"

### Signature Mechanism — Interaktive Fahrzeug-Outline
**Nicht statisches Infographic. Nicht Pseudo-Animation.** Echte Klickbarkeit auf Fahrzeug-Karosserie-Bereiche:
- Front (Crash-Struktur, Scheinwerfer, Kühler) — 12 Punkte
- Seitenwand (Lack, Spaltmaße, Türgriffe) — 14 Punkte
- Heck (Stoßstange, Heckklappe, Auspuff) — 10 Punkte
- Räder & Bremsen — 18 Punkte
- Innenraum (Sitze, Armaturenbrett, Elektronik) — 24 Punkte
- Motorraum — 28 Punkte
- Unterboden — 16 Punkte
- Dokumentation (Servicebuch, Originalrechnung, Doku) — 20 Punkte
= **142 Punkte**

Jeder Hotspot zeigt:
- Foto des geprüften Bereichs
- Datum der Prüfung (z.B. "14.03.2026")
- Prüfer (z.B. "T. Müller, Meister")
- Ergebnis (Pass / Pass mit Notiz / Action Required)
- Notiz (optional)

### Tech
- SVG-Outline mit per-area `<g>`-Elementen, click-handled
- Hotspot-Punkte mit CSS-Pulse-Animation
- Side-Panel als `<dialog>` (native HTML, keyboard-accessible)
- Daten: pro Vehicle in Payload CMS strukturiert (`inspectionPoints: InspectionPoint[]`)
- Schema.org `Vehicle.condition` + erweiterter Markup mit Inspection-Details

### Conversion-Hebel
- Trust-Multiplikator: Käufer SIEHT, dass Prüfung real ist
- Senkt Friction für PPI-Anfrage (sie verstehen, dass wir transparent sind)
- Per-Detail-Page-Variant zeigt die Inspection für DAS spezifische Fahrzeug

### Assets
- Pro Fahrzeug: SVG-Outline + ~30-40 Inspection-Detail-Fotos
- Für Akt 5 (Homepage-Demo): generische Demo-Daten, klickbar aber nicht spezifisch

### Status
**Pending.** ~5 Tage Build (Komplexität durch Interaktivität).

---

## Akt 6 — Atelier (Live-Feed — 10/10)

### Purpose
Werkstatt nicht als Service-Center positionieren, sondern als **Atelier mit lebendiger Praxis**. Beweis durch wöchentlich aktuelle Projekte.

### Visual
- **Hintergrund:** Canvas `#F2EDE3`
- **Layout asymmetrisch:**
  - Links (60%): Editorial-Bild der Atelier-Halle (Reportage-Stil) + Floating-Sub-Card unten rechts mit Live-Feed
  - Rechts (40%): "MEHR / ALS EIN / HÄNDLER." (Fraunces, staggered) + 2-3 Sätze + "Atelier ansehen →"
- **Floating Sub-Card "HEUTE IM ATELIER":**
  - 3-5 anonymisierte aktuelle Projekte
  - Format: "911 Carrera 3.2 — Ölservice" / "Ferrari 458 — Kupplung" / "DBS — Aufbereitung"
  - Update wöchentlich durch Jérôme

### Signature Mechanism — "Heute im Atelier" Live-Feed
**Macht keiner sonst.** Zeigt:
- Aktivität (nicht "leerer Showroom")
- Tiefe (echte Marken, echte Arbeiten)
- Authentizität (anonymisiert, also nicht inszeniert)

Wöchentliche Pflege durch Jérôme (3 Minuten Aufwand). Riesiger Trust-Effekt.

### Tech
- Payload CMS Collection `atelierProjects` (manuell gepflegt)
- ISR mit `revalidateTag('atelier')` bei Update
- Datum + Modell + Service-Art (kein Kundenname)

### Conversion-Hebel
- Trust + Brand-Authority
- Sekundär: Service-Anfragen (Wartung/Reparatur) — neue Umsatz-Quelle

### Status
**Pending.** ~2 Tage Build.

---

## Akt 7 — Heritage (Count-Up + Europa-Karte — 10/10)

### Purpose
Beweisen, dass 900 Fahrzeuge in 14 Jahren keine Marketing-Behauptung ist, sondern operative Realität — und dass wir europäisch sind, nicht lokal.

### Visual
- **Hintergrund:** Canvas `#F2EDE3`
- **Layout:**
  - Links (50%): Jérôme-Portrait (echtes Foto, V1 AI-Placeholder mit Disclosure) + Tiny-Label "SEIT 2012" oben + "EIN MANN. / EINE STADT. / 900 AUTOMOBILE." darunter
  - Rechts (50%): **Animierte Europa-Karte** mit Punkten, wo vermittelte Fahrzeuge gelandet sind
- **Die Zahl 900** wird animiert hochgezählt beim Scroll-In (0 → 900 in 1.5s)
- Unter der Karte: Mini-Liste "Basel · Zürich · München · Paris · Mailand · London · ..."

### Signature Mechanism — Two-Layer
**1. Count-Up Animation:** Die "900" startet bei 0 und zählt hoch sobald die Section im Viewport ist. **Slow-burn**, nicht hektisch. Nutzt `Intersection Observer` für Auslöser, `requestAnimationFrame` für Smoothness.

**2. Europa-Karte mit lebenden Datenpunkten:**
- SVG-Karte Europas
- ~10-15 Punkte über Schweiz, Frankreich, Deutschland, Österreich, Norditalien, Belgien, UK
- Punkte erscheinen sequenziell beim Scroll-In (Stagger, jeder ~80ms)
- Jeder Punkt mit subtilem Pulse
- Hover zeigt Stadt + (anonyme) Fahrzeug-Anzahl: "Basel · 28 Fahrzeuge"

### Tech
- SVG-Karte Europas (custom-drawn oder lizenzfrei)
- Daten hardcoded für V1 (aus Jérômes Archiv geschätzt)
- V1.5 aus Payload CMS (Sales-Tracking pro Fahrzeug mit Stadt-Field)

### Conversion-Hebel
- Trust + Reichweite (Käufer sieht: nicht nur lokaler Händler)
- Subtil: senkt Friction für FR/CH-Käufer ("die liefern auch zu uns")

### Status
**Pending.** ~3 Tage Build.

---

## Akt 8 — Customer Story (Pinned + Side-Scrolling — 10/10)

### Purpose
Social Proof, aber editorial. Nicht "Sterne-Bewertungen", sondern eine eingebettete Stimme aus dem Käufer-Universum.

### Visual
- **Hintergrund:** Dark (Carbon `#15110D`) — Switch zurück zur Cinema-Welt
- **Pinned Center:** Eine massive Editorial-Quote in Fraunces Light, rechts-bündig
- **Side-Scrolling Layers:** Während die Quote bleibt, scrollen seitlich rechts und links **Customer-Still-Photos** vorbei (Auto + Besitzer in Landschaft, Editorial-Stil)
- Pro Bild: Mikro-Caption (Modell + Stadt): "Bentley GTC · Zürich"

### Signature Mechanism — Pinned Quote + Multi-Layer Side-Scroll
**Inverse vom AutoHaus-Pattern:** Die *Quote* ist pinned (zentral), die *Bilder* scrollen vorbei. Damit ist die Stimme der Anker, die Bilder der Kontext.

**Quote-Beispiel (kuratiert von Jérôme):**
> *"Klare Kommunikation. Der Inspektionsbericht passte exakt zum Fahrzeug. Die Übergabe war ehrlich entspannt."*
>
> — J.M., Zürich, Aston Martin DBS, 2024

3-5 Quotes rotieren über die Section (jede ~25vh Scroll-Distance vor Wechsel).

### Tech
- Sticky-Quote-Container
- 3 parallele Scroll-Layer (left, right + center) mit verschiedenen Geschwindigkeiten
- Side-Images: 8-12 Customer-Stills (V1 AI-generiert mit Disclosure-Hinweis)
- EU-AI-Act: alle KI-generierten Personen-Bilder bekommen subtilen Hinweis "Beispielbild — Echte Stimmen folgen"

### Conversion-Hebel
- Social Proof bei niedriger Friction (kein Lese-Zwang)
- Diversität: zeigt Kunden aus mehreren Ländern → reduziert lokale Wahrnehmung

### Assets
- 3-5 Editorial-Quotes (von Jérôme, von echten Kunden mit Erlaubnis oder anonymisiert)
- 8-12 Customer-Stills (Kunde + Auto in Landschaft, AI-generiert mit House-Look)

### Status
**Pending.** ~3-4 Tage Build, komplexer Side-Scroll-Sync.

---

## Akt 9 — Journal-Teaser (Minimalisiert — 10/10 durch Reduktion)

### Purpose
**Ehrlich: Auf der Homepage ist Journal kein WOW-Akt.** Es ist ein Signal "Wir produzieren Editorial-Content" und ein SEO-Verweis. Mehr nicht.

**Daher: Bewusste Reduktion auf ~30vh, NICHT 100vh.**

### Visual
- **Hintergrund:** Canvas `#F2EDE3`
- **Tiny-Label oben:** "AUS DEM JOURNAL"
- **Großes Bild + Title des aktuell-besten Artikels (1 Stück)**
- **2-3 Mini-Links** zu weiteren Artikeln (nur Title + Date, kein Bild)
- "Alle Beiträge ansehen →" — Link zu /journal

### Signature Mechanism — Magazine-Spread Header
Das Bild ist großformatig (rechts), der Title links in Display-Serif (Fraunces Light, große Größe, niemals Bold). Liest sich wie ein Magazin-Cover, nicht wie "Latest Posts" auf einem Blog.

### Tech
- 1 Featured-Article aus Payload + 2-3 Latest-Articles
- Standard Editorial-Card-Pattern, sehr restrained

### Conversion-Hebel
- Nicht direktes Conversion-Tool — Authority-Aufbau, SEO/GEO-Bridge

### Status
**Pending.** ~1 Tag Build (klein, schnell).

---

## Akt 10 — Concierge (Live-Präsenz — 10/10)

### Purpose
Friction-Loss bei Erstkontakt absolut minimieren. **60% rufen direkt an** (Sales-Research), also priorisieren wir das.

### Visual
- **Hintergrund:** Beginnt Dark (full-bleed Foto der echten Halle bei Nacht), fadet bei Scroll zu Light Canvas
- **Headline:** "SPRECHEN / WIR." (Fraunces, staggered indent)
- **Live-Präsenz-Indikator (NEU!):** "Heute im Showroom · Donnerstag bis Samstag, 10–18 Uhr" — echte Daten basierend auf Öffnungs-Schema
- **4 Kontakt-Wege visuell gleichwertig:**
  1. **Anruf** — `+49 761 5573168` als visuell prominent, click-to-call
  2. **WhatsApp** — Direct-Link zum WhatsApp Business
  3. **Termin** — Cal.com-Inline (Cal Atoms) oder eigene Slot-UI
  4. **Besuch** — Mini-Karte + Adresse + Öffnungszeiten + WhatsApp-QR-Code

### Signature Mechanism — Live-Präsenz + Antwortzeit-Tracking
**Live-Präsenz-Indikator:**
- Pulsierender grüner Punkt, wenn aktuell Öffnungszeiten + nicht abwesend (Manual flag in Payload Settings)
- "Heute geschlossen" / "Geöffnet bis 18 Uhr" / "Jérôme im Termin — zurück um 15 Uhr"

**Antwortzeit (transparent):**
- "Antwortet üblicherweise innerhalb von 2 Stunden" — basierend auf real-tracked Lead-Inbox-Daten (V1.5)
- V1: statisch "Innerhalb 4 Stunden in Bürozeit"

### Tech
- Cal.com Inline Embed oder Custom-Booking
- WhatsApp Direct-Link mit pre-filled message: `https://wa.me/497615573168?text=Anfrage%20via%20Website`
- WhatsApp-QR-Code generiert dynamisch (für Mobile→Desktop-Switcher)
- Settings-Flag in Payload für Manual Status ("im Showroom" / "auf Reisen")
- Auto-Status basierend auf openingHoursSpecification

### Conversion-Hebel
- **DIE Hauptconversion** — alles davor führt hierher
- Telefon-Pill auch im Header sticky (Header-Refactor)

### Status
**Pending.** ~4 Tage Build (Cal-Integration, WhatsApp-Setup, Live-Status).

---

## Footer — Brand Statement (10/10 durch Koenigsegg-Pattern)

### Purpose
Letzter Berührungspunkt. Nicht "Goodbye"-Pattern, sondern eine Marken-Aussage.

### Visual
- **Hintergrund:** Canvas `#F2EDE3`
- **Top-Block:**
  - Links: 3 Spalten Navigation + Newsletter-Inline ("Briefkasten")
  - Rechts: **MONUMENTALE Brand-Aussage** in Display-Serif, gestaffelt:
  ```
  AUSSER
       GEWÖHNLICH.
  SEIT
       2012.
  ```
  (Fraunces Light, Display-XL, ~120-160px Schriftgröße auf Desktop)
- **Bottom-Block:** Standort + Telefon + Email + Sprachwechsler + Rechtliches + Social-Icons + EU-AI-Act-Disclosure-Link

### Signature Mechanism — Massive Brand-Statement
**Wie Koenigsegg's "THE SHOW MUST GO ON".** Macht den Footer zum letzten emotionalen Moment, nicht zum funktionalen Müll-Eimer.

### Tech
- Newsletter-Inline-Form mit Resend/Buttondown-Integration
- Sprachwechsler mit hreflang-aware switching
- Sicht-Animation: das Brand-Statement skaliert leicht hinein wenn im Viewport (subtle parallax)

### Conversion-Hebel
- Newsletter-Sign-up (Retention)
- Sprachwechsler (Internationale Käufer)
- Brand-Recall (last impression)

### Status
**Pending.** ~1-2 Tage Build.

---

## Konzeptionelle Konsistenz-Regeln (gelten für ALLE 10 Akte)

### Background-Wechsel-Rhythmus
- Akt 1: Dark
- Akt 2: Dark (Fortsetzung — kein Wechsel innerhalb der Cinema-Welt)
- Akt 3: Crossfade Dark→Light (Akt selbst ist der Übergang)
- Akt 4-7: Light
- Akt 8: Dark (zurück zur Cinema-Welt für Customer Story Pin)
- Akt 9: Light
- Akt 10: Dark→Light (Übergang innerhalb des Akts)
- Footer: Light

Damit: **3 Dark-Inseln** in einer Light-See. Dark wird zur Punktuation, nicht zum Default.

### Mini-Label-Pattern
Jeder Akt (außer 1, 3, 10) hat ein Mini-Label als Eingangspunkt:
- "DIESE WOCHE" (Akt 2)
- "KOLLEKTION" (Akt 3 Übergang oder Akt 4 Start)
- "DAS VERSPRECHEN" (Akt 5)
- "ATELIER" (Akt 6)
- "SEIT 2012" (Akt 7)
- "EINE STIMME" (Akt 8)
- "AUS DEM JOURNAL" (Akt 9)

Größe: 10-12px, mono, uppercase, tracking 0.4em, color: `gold-deep`.

### Staggered Headline Indent
Wo immer eine 3-Zeilen-Headline steht, bekommt die mittlere Zeile einen typografischen Indent:
```
WORT EINS
     WORT ZWEI
WORT DREI
```
Wie Koenigsegg's "DELIVERING ON / A SINGULAR / VISION". Bewusste Komposition, kein Setzfehler.

### Motion-Choreographie pro Akt
- 1: Frame-Crossfade
- 2: Pin + Specs-Sequence
- 3: Background-Crossfade
- 4: Normal-Scroll (keine besonderen Pins) — die Asymmetrie ist Choreographie
- 5: Statische Interaktivität (Hotspots) — Motion nur on hover/click
- 6: Statisch + Live-Feed-Updates
- 7: Count-Up + Punkt-Stagger
- 8: 3-Layer Side-Scroll mit Pin
- 9: Normal-Scroll (klein, schnell)
- 10: Background-Crossfade Dark→Light + Live-Pulse

**Jeder Akt = andere Motion-Sprache.** Kein Akt verwendet die exakt gleiche Mechanik wie ein anderer.

### Performance-Pflicht
- Sub-1.8s LCP (Hero-Image priority preload)
- INP < 100ms (kein scroll-jank)
- CLS < 0.05 (alle Image-Dimensions reserved)
- Reduced-motion-fallback PFLICHT pro Akt

---

## Build-Reihenfolge (innerhalb Welle 1)

1. ✅ Akt 1 (Tor-Reveal) — DONE Scaffold
2. **Akt 2 (Wochen-Schaufenster)** — Next
3. **Akt 3 (Crossfade)** — quick, mit Akt 2 zusammen
4. Akt 4 (Vertikaler Stack)
5. Akt 5 (Inspection Vault — größter Build)
6. Akt 6 (Atelier Live-Feed)
7. Akt 7 (Heritage Count-Up + Karte)
8. Akt 10 (Concierge — wichtigste Conversion)
9. Akt 8 (Customer Story Pin)
10. Akt 9 (Journal Teaser — quick)
11. Footer Brand Statement
12. Header context-aware refresh

Die Reihenfolge ist optimiert für **frühen Sichtbarkeits-Gewinn** (Akt 1+2 zuerst, dann Konversion-Achse 4-5-10 priorisiert).

---

## Was diese Doc NICHT beantwortet

- **Detail-Page (was passiert nach Click in Akt 4)?** → [04-detail-seiten.md](./04-detail-seiten.md)
- **Welche Type-Größen genau?** → [05-design-system.md](./05-design-system.md)
- **Wie sehen die AI-Prompts aus?** → [asset-brief-v2.md](../asset-brief-v2.md)
- **Welche Schema-Felder?** → [06-tech.md](./06-tech.md)
- **Wie werden Akte gebaut (Build-Methodik)?** → [10-roadmap.md](./10-roadmap.md)
