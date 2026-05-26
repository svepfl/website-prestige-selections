# top-web-gate — PFLICHT vor Section/Page-Abschluss

> **Diese Rule ist Gate, kein Reference.** Vor jeder "Section fertig"/"Page fertig"/"Feature fertig"-Meldung MUSS das `@top-web-gate` Agent invoked werden. Ohne dessen Pass ist nichts fertig.

## Warum diese Regel existiert

Past mistake (Mai 2026): Bei Prestige-Selections-Build wurde top-web als Foundation-Read am Anfang gelesen, dann feature-first gebaut. SEO/GEO-Basics (Vehicle-Schema-Tiefe, Person-knowsAbout, hreflang regional variants, WebPage speakable) wurden erst nach Research-Agent gefixt — **obwohl top-web sie längst vorgibt**. Schema wurde "erfüllt" statt "ausgeschöpft".

Diese Regel verhindert das durch strukturelles Gate.

## Wann das Gate läuft

Pflicht-Invocation bei **jedem** dieser Trigger:

1. Vor `npm run build` zur Production-Abnahme
2. Vor jeder "Section fertig"/"Page fertig"-Meldung an User
3. Vor `git commit` einer Section-Implementierung
4. Vor PR-Erstellung
5. Bei `/review-section`-Skill
6. Bei Section-Implementation-Abschluss (siehe `/implement-section`-Skill)

## Wie das Gate läuft

```
@top-web-gate
audit: [Section-Name oder Page-Pfad]
```

Das Agent:
1. Identifiziert Section-Scope (Files)
2. Mappt zutreffende top-web-Rules (von 24)
3. Liest jede Rule-Datei (`~/.claude/skills/top-web/rules/XX-*.md`)
4. Checkt Implementation gegen Rule-Vorgaben
5. Prüft zusätzlich die 7 May-2026-State-Pflichten:
   - Schema-Tiefe (Vehicle/Person/AutoDealer ausgeschöpft)
   - hreflang regional variants
   - AI-Crawler-Allowlist (robots.txt)
   - Answer-First-Chunks (AEO)
   - Statistics-Density (Princeton GEO)
   - Internal-Linking-Symmetry
   - llms.txt aktuell
6. Reportet Pass/Partial/Fail pro Rule mit konkretem Datei:Zeile-Befund
7. Gibt GO oder NO-GO + Pflicht-Fixes

## Pflicht-Verhalten bei NO-GO

- ❌ NICHT "fertig" sagen
- ❌ NICHT committen
- ❌ NICHT in Production deployen
- ✅ Gefundene Lücken fixen
- ✅ Gate erneut laufen lassen
- ✅ Erst bei GO weitermachen

## Pflicht-Verhalten bei Partial

- Bewerten: ist Partial-Befund akzeptabel (z.B. Pflicht-Feld bewusst weggelassen aus Tier-Gründen) oder Lücke?
- Wenn Lücke: fixen
- Wenn akzeptabel: im Decision-Log dokumentieren (`KONZEPT/06-tech.md` Section 13)

## Path-Scope

Diese Regel gilt für **alle** Implementierungen unter:
- `src/app/**` (Routes + Pages)
- `src/components/sections/**` (Akt-Sections)
- `src/components/blocks/**` (Detail-Page-Blocks)
- `src/app/[locale]/**/page.tsx` (Route-Pages)

Ausgenommen (kein Gate-Trigger):
- `src/lib/**` (Utilities)
- `src/data/**` (Daten-Files)
- `src/messages/**` (i18n) — wenn nur Translation-Pflege
- Hotfix < 10 LOC
- Dokumentations-Updates (KONZEPT/, Memory, CLAUDE.md)

## Beziehung zu anderen Agents

Das Gate ist **breit + strukturell**. Die anderen Agents sind **tief + thematisch:**

| Agent | Fokus | Trigger |
|---|---|---|
| `@top-web-gate` | 24 top-web-Rules + May-2026-State | PFLICHT vor jedem "fertig" |
| `@principle-reviewer` | 10 Anti-Template-Prinzipien (Projekt-Brand-DNA) | Optional zur Tiefe |
| `@copy-reviewer` | DE/EN/FR Editorial-Voice | Optional bei i18n-Edits |
| `@accessibility-checker` | WCAG 2.2 AA + APCA | Optional bei UI-Edits |
| `@schema-validator` | JSON-LD Validierung Detail | Optional bei Schema-Edits |

Die thematischen Agents bleiben **nachgeordnet** — `top-web-gate` muss zuerst durchgehen.

## Konflikt-Auflösung

- Wenn top-web-Rule mit `.claude/rules/conversion-first.md` kollidiert → Conversion-First gewinnt (siehe CLAUDE.md)
- Wenn top-web-Rule mit May-2026-State kollidiert → May-2026-State gewinnt (top-web aktualisieren!)
- Wenn top-web-Rule mit KONZEPT/00-MASTER-2026.md kollidiert → Projekt-spezifisch (MASTER) gewinnt

## Beispiel-Output (Section Vehicle-Detail-Page)

```
## TOP-WEB GATE — /fahrzeuge/[slug]/page.tsx

### ✅ Pass (8/14)
- Rule 03 (tech-quality): Next.js 16 server-component, TS strict
- Rule 04 (perf): Image-priority auf hero, sizes accurate
- Rule 06 (SEO): metaTitle/Description vollständig
- Rule 15 (copy): Outcome-Copy, kein Feature-Stack
- Rule 17 (persona-path): Sticky-Offer-Card mit Primary-CTA
- Rule 19 (microcopy): Form-States deklariert
- Rule 22 (analytics): data-analytics auf Phone + Inquiry
- May-2026 Internal-Linking: Auch-aus-dem-Haus-Block ✓

### ⚠️ Partial (3/14)
- Rule 05 (imagery): Placeholder-Bilder, nicht Hero-Photography (akzeptabel pre-launch)
- May-2026 Answer-First-Chunks: Vehicle-Body atmospheric, nicht Fakten-Lead (Editorial-Tier-Tradeoff)
- May-2026 Statistics-Density: Specs vorhanden aber keine Marken-Production-Numbers

### ❌ Fail (0/14)

### Empfehlung
GO — alle Partials sind dokumentierte Tradeoffs.
```
