/**
 * Section-Konstanten — Brand-wide Cohesion-Anchors.
 *
 * Jede Section auf der Homepage UND auf Subpages importiert diese statt
 * Inline-Werte. Garantiert konsistentes Spacing, Container-Width, Label-Style,
 * Headline-Sizing über das gesamte Produkt.
 *
 * Wenn ein Wert hier geändert wird, ändert sich Brand-konsistent überall.
 */

// === Spacing ===

/** Standard Section-Padding — alle 8 Homepage-Sections + Subpages. */
export const SECTION_PADDING = 'px-6 md:px-10 lg:px-14 py-24 md:py-32 lg:py-40';

/** Reduziertes Padding für kompakte Sections (Markenwelt-Strip, kurze Spuren). */
export const SECTION_PADDING_COMPACT = 'px-6 md:px-10 lg:px-14 py-16 md:py-20';

/** Container-Max-Width für Standard-Sections. */
export const SECTION_MAX_WIDTH = 'max-w-[1400px]';

/** Schmaler Max-Width für Long-Form / Editorial. */
export const SECTION_MAX_WIDTH_NARROW = 'max-w-[1200px]';

/** Wide Max-Width für full-bleed-Triptychon / Bento. */
export const SECTION_MAX_WIDTH_WIDE = 'max-w-[1500px]';

// === Typography ===

/** Section-Label (micro mono-spec) — gold-deep auf Light, gold auf Dark. */
export const SECTION_LABEL_LIGHT = 'font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep';
export const SECTION_LABEL_DARK = 'font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold';

/** Section-Headline — Geist Bold UPPERCASE Standard. */
export const SECTION_HEADLINE_STYLE = {
  fontWeight: 700,
  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
  letterSpacing: '-0.03em',
  lineHeight: '0.95',
} as const;

/** Section-Subline (Sub-Headline / Intro-Paragraph). */
export const SECTION_SUBLINE_STYLE = {
  fontWeight: 400,
  fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
  lineHeight: '1.5',
} as const;

// === Motion ===

/** Single Easing-Curve durchgängig. */
export const EASE_PRESTIGE = 'cubic-bezier(0.65, 0, 0.35, 1)';

/** Motion-Durations (in ms). */
export const DURATION = {
  micro: 200,
  color: 300,
  reveal: 600,
  section: 900,
  hero: 1200,
} as const;

// === CTA-Patterns (3 erlaubte Varianten) ===

/** Primary CTA — rounded-full Solid Button. */
export const CTA_PRIMARY_DARK_BG = 'group inline-flex items-center gap-3 bg-on-shadow text-shadow rounded-full px-6 py-3 font-mono-spec text-[10px] uppercase tracking-[0.28em] hover:bg-gold transition-colors duration-300 active:translate-y-px focus-ring';
export const CTA_PRIMARY_LIGHT_BG = 'group inline-flex items-center gap-3 bg-ink text-canvas rounded-full px-6 py-3 font-mono-spec text-[10px] uppercase tracking-[0.28em] hover:bg-ink-soft transition-colors duration-300 active:translate-y-px focus-ring';

/** Secondary CTA — underline-on-hover Link with arrow. */
export const CTA_SECONDARY_DARK = 'group inline-flex items-center gap-3 font-mono-spec text-[11px] uppercase tracking-[0.28em] text-on-shadow hover:text-gold transition-colors duration-300 focus-ring rounded-sm active:translate-y-px';
export const CTA_SECONDARY_LIGHT = 'group inline-flex items-center gap-3 font-mono-spec text-[11px] uppercase tracking-[0.28em] text-ink hover:text-gold-deep transition-colors duration-300 focus-ring rounded-sm active:translate-y-px';

/** Tertiary CTA — text-only with arrow, no underline animation. */
export const CTA_TERTIARY_DARK = 'inline-flex items-center gap-2 font-mono-spec text-[10px] uppercase tracking-[0.28em] text-on-shadow-muted hover:text-gold transition-colors duration-300';
export const CTA_TERTIARY_LIGHT = 'inline-flex items-center gap-2 font-mono-spec text-[10px] uppercase tracking-[0.28em] text-ink-muted hover:text-gold-deep transition-colors duration-300';

// === Section-Pattern-Tags (für Audit) ===

/** Pattern jeder Section auf der Homepage — sollte nie 2x in Folge wiederholt sein. */
export const HOMEPAGE_PATTERNS = {
  torReveal: 'sticky-pinned-scroll',
  eineStimme: 'bento-card-grid',
  schaufenster: 'triptychon',
  markenwelt: 'typographic-strip',
  services: 'sequential-sticky',     // wird refactored
  methode: 'data-viz-animated',      // wird refactored, light-flip
  spuren: 'editorial-long-form',     // wird refactored
  concierge: 'bento-address-hero',   // wird refactored
} as const;

/** Color-Tone jeder Section — Arc-Audit.
 *
 * TorReveal bleibt dark als bewusste Cinematic-Hero-Exception
 * (Asset-Frames sind dark "Tor öffnet sich"-Sequenz).
 * Alle übrigen Sections light für editorial-magazine consistency.
 */
export const HOMEPAGE_TONES = {
  torReveal: 'dark',
  eineStimme: 'light',
  schaufenster: 'light',
  markenwelt: 'light',
  services: 'light',
  methode: 'light',
  spuren: 'light',
  concierge: 'light',
} as const;
