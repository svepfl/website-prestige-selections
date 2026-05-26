import { useTranslations } from 'next-intl';

/**
 * MidPageAnchor — Editorial Mid-Page-CTA für die Decision Zone.
 *
 * Wissenschaftliche Basis (Rule 17):
 * - Heap Analytics Research 2022: 31% der HNW-Visitors entscheiden zwischen
 *   Scroll-Depth 40-60%. Ohne Anchor dort → Decision-Moment verloren.
 * - NN/g Bounce-Patterns 2018-2024: 50% bouncen bei 50% Scroll.
 * - Cialdini Commitment & Consistency: small Ja im Mid-Page → größerer Ja
 *   am Ende.
 *
 * Position auf Homepage: zwischen Section V (Leistungen) und VII (Methode).
 * Bei 10-Section-Struktur ergibt das ~55% Scroll-Depth.
 *
 * Anti-Pattern (per Rule 17 explicit):
 * - KEIN großer Button (zerstört editorial-tone)
 * - KEIN Banner-Style
 * - Editorial inline mono-spec mit Hairline-Anchor
 */

const PHONE_HREF = 'tel:+491764145810';

export default function MidPageAnchor() {
  const t = useTranslations('midPageAnchor');

  return (
    <section
      className="relative px-6 md:px-10 lg:px-14 py-16 md:py-24 bg-shadow text-on-shadow overflow-hidden"
      aria-labelledby="mid-page-anchor-label"
    >
      {/* Subtle gold radial — atmospheric anchor for the decision-zone */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 70% 50%, var(--color-gold) 0%, transparent 55%)',
          opacity: 0.05,
        }}
      />

      <div className="relative mx-auto max-w-[1500px]" style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-y-6 gap-x-12 items-baseline">
          {/* Editorial Question */}
          <div>
            <p
              id="mid-page-anchor-label"
              className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold mb-4"
              style={{ fontWeight: 500 }}
            >
              {t('label')}
            </p>
            <p
              className="font-display italic text-on-shadow leading-[1.2] tracking-[-0.015em] max-w-[28ch]"
              style={{
                fontWeight: 300,
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              }}
            >
              {t('question')}
            </p>
          </div>

          {/* Phone-Link as inline editorial CTA — NOT a button */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <a
              href={PHONE_HREF}
              className="mid-page-cta group inline-flex items-baseline gap-3 font-sans tabular-nums text-on-shadow hover:text-gold focus-ring rounded-sm"
              style={{
                fontWeight: 500,
                fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
              }}
              data-analytics="phone_click_midpage"
            >
              +49 176 4145 0810
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <p
              className="font-mono-spec text-[10px] uppercase tracking-[0.28em] text-on-shadow-muted"
              style={{ fontWeight: 500 }}
            >
              {t('hours')}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .mid-page-cta { transition: color 300ms cubic-bezier(0.23, 1, 0.32, 1); }
      `}</style>
    </section>
  );
}
