# Prestige Selections — Status

> Live-Status des Projekts. Wird bei jedem größeren Schritt aktualisiert.

## Current Phase

**Phase 1 → Phase 2 Übergang**
- Phase 0 (Foundation) ✅ DONE
- Phase 1 (Konzept + Claude-Setup) ✅ DONE
- Phase 2 (Homepage Bau) ⏳ Akt 1 done, Akt 2-10 + Footer + Header pending

## Wave Map

| Phase | Welle | Inhalt | Status |
|---|---|---|---|
| 0 | — | Foundation (Color, Type, Tokens) | ✅ DONE |
| 1 | — | KONZEPT-Docs (11) + Claude-Setup | ✅ DONE |
| 2 | 2.1 | Akt 1 Tor-Reveal + Akt 2 Wochen-Schaufenster | Akt 1 ✅, Akt 2 ⏳ |
| 2 | 2.2 | Akt 3 Crossfade + Akt 4 Kollektion Stack | ⏳ |
| 2 | 2.3 | Akt 5 Inspection Vault | ⏳ |
| 2 | 2.4 | Akt 6 Atelier + Akt 7 Heritage | ⏳ |
| 2 | 2.5 | Akt 8 Story + Akt 9 Journal + Akt 10 Concierge | ⏳ |
| 2 | 2.6 | Footer + Header Refactor | ⏳ |
| 3 | 3.1 | Vehicle Detail Page Rebuild | ⏳ |
| 3 | 3.2 | Kollektion-Page Refactor | ⏳ |
| 4 | — | Atelier + Journal + Über-uns + Kontakt | ⏳ |
| 5 | — | Verkaufen + Briefkasten + Legal + 404/500 | ⏳ |
| 6 | — | Payload CMS + mobile.de Phase 1 + Schema | ⏳ |
| 7 | — | Email + Plausible + GEO + Disclosure | ⏳ |
| 8 | — | Polish + Audits | ⏳ |
| 9 | — | Launch | ⏳ |
| 10 | — | V1.5 (mobile.de Phase 2 + Garage + ...) | ⏳ |

## Files erstellt in Phase 0-1

### Code Foundation
- ✅ [src/app/globals.css](src/app/globals.css) — komplettes Token-System
- ✅ [src/app/[locale]/layout.tsx](src/app/[locale]/layout.tsx) — Fonts + Light-First
- ✅ [src/data/images.ts](src/data/images.ts) — mit tor-frames Placeholders
- ✅ [src/components/sections/TorReveal.tsx](src/components/sections/TorReveal.tsx) — Akt 1
- ✅ [src/messages/{de,en,fr}.json](src/messages/) — torReveal-Translations
- ✅ [src/app/[locale]/page.tsx](src/app/[locale]/page.tsx) — Akt 1 integriert

### Asset-Verzeichnis
- ✅ `/public/assets/{tor,weekly,collection,atelier,heritage,stories,journal,videos}/`

### KONZEPT-Docs (alle 11 Dateien)
- ✅ [KONZEPT/00-README.md](KONZEPT/00-README.md)
- ✅ [KONZEPT/01-strategie.md](KONZEPT/01-strategie.md)
- ✅ [KONZEPT/02-pages-und-journey.md](KONZEPT/02-pages-und-journey.md)
- ✅ [KONZEPT/03-homepage.md](KONZEPT/03-homepage.md)
- ✅ [KONZEPT/04-detail-seiten.md](KONZEPT/04-detail-seiten.md)
- ✅ [KONZEPT/05-design-system.md](KONZEPT/05-design-system.md)
- ✅ [KONZEPT/06-tech.md](KONZEPT/06-tech.md)
- ✅ [KONZEPT/07-conversion.md](KONZEPT/07-conversion.md)
- ✅ [KONZEPT/08-content.md](KONZEPT/08-content.md)
- ✅ [KONZEPT/09-operations.md](KONZEPT/09-operations.md)
- ✅ [KONZEPT/10-roadmap.md](KONZEPT/10-roadmap.md)

### Asset-Brief
- ✅ [asset-brief-v2.md](asset-brief-v2.md) — GPT-Image + Kling AI Prompts

### Claude-Code Projekt-Setup
- ✅ [CLAUDE.md](CLAUDE.md) — Router zu KONZEPT + Quick-Reference
- ✅ [.claude/settings.json](.claude/settings.json) — Permissions + Hook-Config
- ✅ [.claude/rules/design-system.md](.claude/rules/design-system.md)
- ✅ [.claude/rules/copy-voice.md](.claude/rules/copy-voice.md)
- ✅ [.claude/rules/conversion-goals.md](.claude/rules/conversion-goals.md)
- ✅ [.claude/rules/anti-template.md](.claude/rules/anti-template.md)
- ✅ [.claude/agents/principle-reviewer.md](.claude/agents/principle-reviewer.md)
- ✅ [.claude/agents/copy-reviewer.md](.claude/agents/copy-reviewer.md)
- ✅ [.claude/agents/accessibility-checker.md](.claude/agents/accessibility-checker.md)
- ✅ [.claude/agents/schema-validator.md](.claude/agents/schema-validator.md)
- ✅ [.claude/skills/implement-section/SKILL.md](.claude/skills/implement-section/SKILL.md)
- ✅ [.claude/skills/review-section/SKILL.md](.claude/skills/review-section/SKILL.md)
- ✅ [.claude/hooks/lint-check.sh](.claude/hooks/lint-check.sh)
- ✅ [.claude/hooks/principle-validator.sh](.claude/hooks/principle-validator.sh)

## Async Background Tasks

| Task | Status |
|---|---|
| mobile.de + AutoScout24 Research | Läuft im Hintergrund (Agent), Update kommt asynchron |

## Open Decisions

Nichts dringend offen. Implementation kann starten.

## Next Steps

1. **Erste Section auswählen** und mit `/implement-section [name]` starten
2. **AI-Assets produzieren** (Tor-Frames für Akt 1, Wochen-Schaufenster-Hero für Akt 2)
3. **Welle 2.1 abschließen** (Akt 2 Wochen-Schaufenster)
4. **Review-Cycle** mit Sub-Agents nach jedem Akt

## Operativ-Setup Pending

- Anwalt-Brief für Legal-Drafts
- Native EN + FR Copywriter-Engagement
- mobile.de API-Zugang klären
- Cal.com Account
- Buttondown Account
- Plausible Setup
- Resend Setup
- Payload CMS Database (Neon PostgreSQL)
- Cloudinary Account
