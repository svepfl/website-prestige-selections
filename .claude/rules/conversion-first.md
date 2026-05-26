---
description: ⭐ HÖCHSTE PRIORITÄT — Conversion + UX + UI an erster Stelle. Design dient Kundengewinnung, nicht Selbstzweck. Bei JEDER Design-Entscheidung zuerst prüfen.
paths:
  - "src/**/*.tsx"
  - "src/**/*.ts"
  - "src/**/*.css"
  - "src/messages/*.json"
---

# ⭐ Conversion First — Die übergeordnete Regel

> **Conversion + UX + UI steht IMMER an oberster Stelle.**
> Diese Regel überschreibt alle anderen wenn sie in Konflikt geraten.
> Das schönste Design bringt nichts wenn keine Kunden gewonnen werden oder der Kunde es nicht bedienen kann.

---

## Warum diese Regel existiert

Die Versuchung bei Premium-Tier-Sites ist, "Restraint" und "Editorial-Tier" als Selbstzweck zu nehmen. Aesop versteckt alle Nav-Links. Bottega zeigt nur den Wordmark. Loewe macht Side-Drawer-only.

**Aber Aesop verkauft 40€-Seife an Slow-Browse-Audience. Wir verkaufen 250k-Wagen an Research-Mode-Audience.** Diese Audience will Inventar effizient evaluieren, Phone schnell finden, Trust-Signale sofort sehen.

Selbst Tom Hartley Jnr (DAS Vorbild) zeigt "Cars · About · Contact" persistent inline. Selbst McLaren, Lamborghini, Singer Vehicle Design haben sichtbare Top-Nav. Aesop-Pattern ist Ausnahme, nicht Regel.

**Past mistake we don't repeat:** Header wurde initial als reines Aesop-Pattern (alle Nav versteckt, Phone weg, Locale weg) gebaut. UX-Konsequenz: Inventar nur 2 Clicks tief, Phone unsichtbar, Discoverability tot. Korrigiert auf Conversion-First-Hybrid.

---

## Die fünf Conversion-Checks vor jeder Design-Entscheidung

Wenn du UI baust oder änderst, prüfe IN DIESER REIHENFOLGE:

### 1. Sichtbarkeitstest (Primary-Conversion-Pfade)
- Kann Käufer **Inventar** in 1 Click erreichen von jeder Page? → Inventar-Link MUSS in Chrome/Header sichtbar sein
- Kann Käufer **Kontakt aufnehmen** in 1 Click? → Phone-Number ODER Contact-Link MUSS sichtbar sein
- Kann Käufer **Trust verifizieren** (Wer, Wo, Hours)? → muss ohne Suchen erreichbar sein

### 2. Phone-Reach (Trust-Signal)
- Phone-Number persistent in Header sichtbar
- Live-Status (Open/Closed) als subtile Pulse-Dot, nicht versteckt
- Alternative: WhatsApp + Phone in mindestens 3 Section-Zonen über die ganze Site verteilt

### 3. Trust-Signale (Vor-Kauf-Vertrauen)
- Adresse, Hours, Founder, Reviews — irgendwo sichtbar, nicht alle in einer Page versteckt
- Schema.org-Tiefe (LocalBusiness + Person + AggregateRating wenn vorhanden)
- Live-Daten (Inventar-Count, Showroom-Status) wo möglich

### 4. Discoverability
- Neuer Besucher findet ohne Hilfe: WAS ihr verkauft, WER ihr seid, WIE er kauft
- Top-web Rule 17 (Persona-Path) — primärer Conversion-Pfad sichtbar
- Five-Second-Test: 3 fremde Personen müssen Inventar in 5s finden

### 5. Restraint dient Conversion
- Weniger Chrome-Elemente JA — aber DIE Elemente die da sind müssen Conversion-relevant sein
- Schöner Wordmark allein reicht nicht — Phone+Inventar müssen auch sichtbar sein
- Editorial-Type-Tier für die SICHTBAREN Elemente (kleinere Type, ruhigere Farben), nicht durch Verstecken

---

## Anti-Patterns die Conversion brechen

❌ **Phone-Number aus Chrome entfernen** — auch wenn "premium". Trust-Signal weg.
❌ **Alle Nav hinter Hamburger/Index versteckt** — 2 Clicks zu Inventar = Conversion-Verlust
❌ **Locale-Switcher nur im Overlay** — internationale Käufer brauchen das schnell
❌ **Live-Status entfernt für "Restraint"** — Open/Closed-Info ist Conversion-relevant
❌ **CTAs in Footer einzig** — primary-CTA muss im Hero und mid-page liegen (Rule 17 Mid-Page-CTA-Anchor)
❌ **Newsletter-Modal beim Erst-Besuch** — Premium-Customer hasst Pop-ups
❌ **Mobile-Sticky-CTA-Bar** für HNW-Käufer (siehe CLAUDE.md — separater Memory-Eintrag)

✅ **Erlaubte Restraint-Optionen die NICHT Conversion brechen:**
- Tagline aus Chrome raus → JA (lebt im Footer/Hero)
- Inline-Nav reduzieren von 5 auf 2 wichtigste → JA (Rest via Index-Overlay)
- Generic Brand-Trust-Stripes weg → JA (lebt strukturiert in Section)
- Persistent Cookie-Banner-Footer-Bar → JA (Wegnehmen nach 1× Accept)

---

## Sanity-Check vor jedem Commit

**Bevor du eine Design-Änderung committest, frage dich:**

1. Wenn ich ein 45-jähriger Käufer von einem Aston Martin DB11 wäre und auf dieser Page lande — kann ich in 5 Sekunden sagen:
   - Was sie verkaufen?
   - Wie ich Inventar sehe?
   - Wie ich sie erreiche?
2. Wenn ich die Chrome reduziert habe, ist trotzdem 1-Click zu Inventar + Phone möglich?
3. Wenn ich Trust-Signale weggenommen habe, leben die woanders sichtbar?
4. Schaue ich auf das Design oder auf die Conversion-Pfade? — wenn ersteres, falsch fokussiert.

Wenn auch nur EINE dieser Fragen unklar beantwortbar ist → nicht committen, sondern Conversion-Pfad reparieren.

---

## Bei Konflikt zwischen Regeln

| Konflikt | Lösung |
|---|---|
| Restraint vs. Conversion | **Conversion gewinnt.** Restraint anders erreichen. |
| Brand-Tier vs. UX-Klarheit | **UX-Klarheit gewinnt.** Tier durch Type/Color erreichen, nicht durch Verstecken. |
| Schöne Animation vs. Performance | **Performance gewinnt.** LCP ≤ 1.8s ist Conversion-relevant. |
| Editorial-Voice vs. CTA-Klarheit | Beide möglich. "Sprechen wir." statt "Jetzt anfragen!" UND statt "Lassen Sie uns einen Termin vereinbaren bei Gelegenheit" |
| Whitespace vs. Inventar-Visibility | Inventar muss above-fold mindestens angeteasert sein. |

---

## Beziehung zu anderen Regeln

- **Rule 9 (Anti-Template):** "Jede Seite bringt Kunden oder Vertrauen" → Conversion-First operationalisiert das.
- **Rule 12 (Conversion):** Die 9 Conversion-Hebel-Pflichten → Mindest-Standard, Conversion-First geht weiter.
- **Rule 17 (Persona-Path):** Pre-Build Conversion-Architecture → Conversion-First ist Implementations-Pflicht zu diesem Plan.
- **Voice-Rules:** Editorial-Restraint im COPY → JA. Aber CTA-Copy muss klar handlungsleitend bleiben.

---

## Decision-Log-Eintrag bei Conflict-Override

Wenn diese Regel eine andere Design-Entscheidung überschreibt, im Decision-Log eintragen mit:
- Was sollte gebaut werden (das schöne)
- Warum es Conversion gebrochen hätte
- Was stattdessen gebaut wurde (das funktionierende)
- Wie Tier trotzdem erhalten blieb

Format: `KONZEPT/06-tech.md Section 13` Decision-Log-Eintrag.
