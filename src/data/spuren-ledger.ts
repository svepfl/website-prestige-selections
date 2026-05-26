/**
 * Spuren Ledger — recently-placed motorcars, chronological (newest first).
 *
 * Acht Übergaben, eine pro Photorealism-Tier-Placeholder-Photo. Jedes Foto
 * zeigt einen spezifischen Kunden mit spezifischem Fahrzeug — deshalb kann
 * jedes Foto NUR EINMAL als 1:1 Card verwendet werden. Wenn der Real-Shoot
 * (Phase 2) kommt, werden hier weitere Einträge zugefügt; bis dahin gilt:
 * Photo == Card, keine Manufacturer-Fallbacks.
 *
 * Display-Disziplin pro Card: Period · Vehicle · City · Quote. Kein
 * Buyer-Type-Label, keine Sterne, keine Namen — Diskretion ist Pflicht im
 * HNW-Segment (Sammler, 2M+, erwartet Privacy).
 *
 * `quoteKey` (q01..q50) verlinkt eine per-Eintrag Customer-Voice aus i18n —
 * im Pool bleiben 50 Quotes für spätere Erweiterung, aktiv aktuell 8.
 */

export type QuoteKey =
  | 'q01' | 'q02' | 'q03' | 'q04' | 'q05' | 'q06' | 'q07' | 'q08' | 'q09' | 'q10'
  | 'q11' | 'q12' | 'q13' | 'q14' | 'q15' | 'q16' | 'q17' | 'q18' | 'q19' | 'q20'
  | 'q21' | 'q22' | 'q23' | 'q24' | 'q25' | 'q26' | 'q27' | 'q28' | 'q29' | 'q30'
  | 'q31' | 'q32' | 'q33' | 'q34' | 'q35' | 'q36' | 'q37' | 'q38' | 'q39' | 'q40'
  | 'q41' | 'q42' | 'q43' | 'q44' | 'q45' | 'q46' | 'q47' | 'q48' | 'q49' | 'q50';

export interface LedgerEntry {
  period: string;            // "Q1 · 2026"
  vehicle: string;           // "Aston Martin DBS"
  manufacturer: string;      // SEO/Filter facet — nicht für Display
  city: string;              // Übergabe-Ort, signalisiert Cross-Border-Reach
  quoteKey: QuoteKey;        // Customer-Voice — JEDER Eintrag hat eine Stimme
  photoOverride: string;     // Photorealism-Tier-Placeholder → Real-Shoot 1:1-Swap
}

const PHOTO = {
  aston: '/assets/spuren/spuren-01-aston-martin-dbs-placeholder.webp',
  bentley: '/assets/spuren/spuren-02-bentley-continental-gt-placeholder.webp',
  ferrari: '/assets/spuren/spuren-03-ferrari-488-pista-placeholder.webp',
  lamborghini: '/assets/spuren/spuren-04-lamborghini-urus-placeholder.webp',
  maserati: '/assets/spuren/spuren-05-maserati-mc20-placeholder.webp',
  porsche_gt: '/assets/spuren/spuren-06-porsche-911-gt3rs-placeholder.webp',
  rolls: '/assets/spuren/spuren-07-rolls-royce-wraith-placeholder.webp',
  porsche_road: '/assets/spuren/spuren-08-porsche-911-carrera-placeholder.webp',
} as const;

export const SPUREN_LEDGER: LedgerEntry[] = [
  { period: 'Q1 · 2026', vehicle: 'Aston Martin DBS',          manufacturer: 'ASTON MARTIN', city: 'Stuttgart',  quoteKey: 'q01', photoOverride: PHOTO.aston },
  { period: 'Q1 · 2026', vehicle: 'Ferrari 488 Pista',         manufacturer: 'FERRARI',      city: 'München',    quoteKey: 'q02', photoOverride: PHOTO.ferrari },
  { period: 'Q1 · 2026', vehicle: 'Bentley Continental GT V8', manufacturer: 'BENTLEY',      city: 'Wien',       quoteKey: 'q03', photoOverride: PHOTO.bentley },
  { period: 'Q1 · 2026', vehicle: 'Porsche 911 GT3 RS',        manufacturer: 'PORSCHE',      city: 'Hamburg',    quoteKey: 'q04', photoOverride: PHOTO.porsche_gt },
  { period: 'Q4 · 2025', vehicle: 'Rolls-Royce Wraith',        manufacturer: 'ROLLS ROYCE',  city: 'Zürich',     quoteKey: 'q07', photoOverride: PHOTO.rolls },
  { period: 'Q4 · 2025', vehicle: 'Maserati MC20',             manufacturer: 'MASERATI',     city: 'Düsseldorf', quoteKey: 'q09', photoOverride: PHOTO.maserati },
  { period: 'Q3 · 2025', vehicle: 'Lamborghini Urus',          manufacturer: 'LAMBORGHINI',  city: 'Zürich',     quoteKey: 'q10', photoOverride: PHOTO.lamborghini },
  { period: 'Q3 · 2024', vehicle: 'Porsche 911 Carrera S',     manufacturer: 'PORSCHE',      city: 'Mailand',    quoteKey: 'q24', photoOverride: PHOTO.porsche_road },
];
