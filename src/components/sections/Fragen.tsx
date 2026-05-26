'use client';

import { useTranslations, useLocale } from 'next-intl';
import TextureLayer from '@/components/visual/TextureLayer';
import Reveal from '@/components/editorial/Reveal';

/**
 * AKT VIII — Häufige Fragen · 2026-Accordion
 *
 * Layout: asymmetrisch 12-Spalten — Header & Intro links (4/12 sticky auf
 * Desktop), Accordion-Stack rechts (8/12). Mobile stacked.
 *
 * Tech-Stack 2026:
 * - Native <details>/<summary> für A11y (keyboard, screen-reader,
 *   Browser-Search-find-in-page funktioniert)
 * - interpolate-size: allow-keywords (Chrome 129+, Edge 129+, Firefox 134+,
 *   Safari 18.2+) — erlaubt smooth height-Transition von 0 → auto
 * - Fallback: ohne interpolate-size geht open/close ohne Animation, aber
 *   funktional (graceful degradation)
 * - Toggle-Icon: Plus → × via Rotation (single SVG cross + 45° rotate)
 * - Hairline-Divider zwischen Items (Premium-Editorial, kein Border-Box)
 * - Q01 Risk-Reversal: default-open ("Vertrauens-Frage zuerst sichtbar")
 *
 * Strukturierte Daten: JSON-LD FAQPage für Google FAQ-Rich-Result + AEO.
 *
 * Anti-Template-Disziplin: <details> ist accessibility-first, kein
 * tab-index/aria-expanded custom-component. CSS macht das Editorial-Tier.
 */

const FAQ_KEYS = [
  { q: 'q01Question', a: 'q01Answer' },
  { q: 'q02Question', a: 'q02Answer' },
  { q: 'q03Question', a: 'q03Answer' },
  { q: 'q04Question', a: 'q04Answer' },
  { q: 'q05Question', a: 'q05Answer' },
  { q: 'q06Question', a: 'q06Answer' },
  { q: 'q07Question', a: 'q07Answer' },
  { q: 'q08Question', a: 'q08Answer' },
] as const;

export default function Fragen() {
  const t = useTranslations('fragen');
  const locale = useLocale();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: FAQ_KEYS.map((pair) => ({
      '@type': 'Question',
      name: t(pair.q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(pair.a),
      },
    })),
  };

  return (
    <section
      className="relative bg-canvas-soft text-ink"
      aria-labelledby="fragen-label"
    >
      {/* TextureLayer in clipping-Container — overflow-hidden auf der
          Section würde position:sticky der linken Intro-Spalte brechen
          (Sticky-Element bekäme die Section als Scroll-Container statt
          des Viewports). Texture wird stattdessen lokal geclippt. */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <TextureLayer variant="paper" opacity={0.04} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />

      <div className="relative px-6 md:px-10 lg:px-14 py-24 md:py-32 lg:py-40" style={{ zIndex: 2 }}>
        <div className="mx-auto max-w-[1500px]">
          {/* Section header */}
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink/15 pb-5 mb-12 md:mb-16">
              <h2
                id="fragen-label"
                className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted"
              >
                {t('label')}
              </h2>
              <span className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted/70">
                {t('lotMarker')}
              </span>
            </div>
          </Reveal>

          {/* Asymmetric 4/8 split — Intro sticky links (ab lg), Accordion rechts.
              Mobile: stacked, mit großzügigem Abstand zwischen Intro und
              Accordion (gap-y-12) damit nichts zusammenklebt. */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 lg:gap-x-16 gap-y-12 lg:gap-y-10">
            {/* Left — Intro (sticky on desktop, lg:top-32 = 32px Abstand
                unter dem 96px-Header, also genug Atemraum). */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <Reveal delayMs={80}>
                  <div className="max-w-[24ch]">
                    {/* Gold-Hairline-Eyebrow — verankert die Intro visuell
                        als "Sidebar-Anchor", verhindert orphan-text-Look */}
                    <span
                      aria-hidden
                      className="hidden lg:block h-px w-10 bg-gold-deep/80 mb-7"
                    />
                    <p
                      className="font-display italic text-ink leading-[1.2] tracking-[-0.015em]"
                      style={{
                        fontWeight: 300,
                        fontSize: 'clamp(1.375rem, 2.4vw, 2rem)',
                      }}
                    >
                      {t('intro')}
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Right — Accordion stack */}
            <div className="lg:col-span-8">
              <ul className="faq-list border-t border-ink/15">
                {FAQ_KEYS.map((pair, i) => (
                  <li key={pair.q} className="faq-item border-b border-ink/15">
                    <details {...(i === 0 ? { open: true } : {})} className="faq-details group">
                      <summary className="faq-summary group/summary cursor-pointer list-none select-none flex items-start justify-between gap-6 py-6 md:py-8 focus-ring rounded-sm">
                        {/* Mono index + Question */}
                        <div className="flex items-baseline gap-4 md:gap-5 flex-1 min-w-0">
                          <span
                            className="font-mono-spec tabular-nums text-gold-deep text-[11px] uppercase tracking-[0.32em] shrink-0 mt-1"
                            style={{ fontWeight: 500 }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span
                            className="faq-question font-sans text-ink leading-[1.25] tracking-[-0.01em] group-hover/summary:text-gold-deep"
                            style={{
                              fontWeight: 500,
                              fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
                            }}
                          >
                            {t(pair.q)}
                          </span>
                        </div>
                        {/* Toggle — plus → × via 45° rotate when open */}
                        <span aria-hidden className="faq-toggle relative shrink-0 mt-1.5 inline-block h-5 w-5 md:h-6 md:w-6 text-ink-muted transition-colors duration-300 group-hover/summary:text-gold-deep">
                          {/* Horizontal bar */}
                          <span className="absolute top-1/2 left-0 right-0 h-px bg-current -translate-y-1/2" />
                          {/* Vertical bar — collapses to invisible (rotates with parent open) */}
                          <span className="faq-toggle-v absolute top-0 bottom-0 left-1/2 w-px bg-current -translate-x-1/2" />
                        </span>
                      </summary>

                      {/* Reveal wrapper — interpolate-size erlaubt smooth grid */}
                      <div className="faq-reveal">
                        <div className="faq-reveal-inner pb-7 md:pb-9 pl-9 md:pl-10 pr-2">
                          <p
                            className="font-sans text-ink-soft leading-[1.65] max-w-[52ch]"
                            style={{
                              fontWeight: 400,
                              fontSize: 'clamp(0.9375rem, 1.05vw, 1rem)',
                            }}
                          >
                            {t(pair.a)}
                          </p>
                        </div>
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Hide native ::-webkit-details-marker (Safari) */
        .faq-summary::-webkit-details-marker { display: none; }
        .faq-summary::marker { content: ''; }

        /* Question — color shift on open OR hover. Easing ease-out-expo
           für gracefuldeceleration (premium-feel vs. symmetric ease-in-out). */
        .faq-question {
          transition: color 500ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .faq-details[open] .faq-question {
          color: var(--color-gold-deep);
        }

        /* Toggle — clean opacity-fade plus → minus (kein 90deg-rotate,
           wirkte mechanisch). Subtle 0.92 scale on open für tactile feedback. */
        .faq-toggle {
          transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: center;
        }
        .faq-details[open] .faq-toggle {
          transform: scale(0.92);
        }
        .faq-toggle-v {
          transition: opacity 400ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .faq-details[open] .faq-toggle-v {
          opacity: 0;
        }

        /* Premium content reveal — 2026 nativer ::details-content +
           interpolate-size approach. Funktioniert in Chrome 131+ / Safari
           18.2+ / Firefox 134+ (~95% browser-coverage May 2026).
           Graceful degradation: ältere Browser zeigen content ohne Animation. */
        .faq-details {
          interpolate-size: allow-keywords;
        }
        .faq-details::details-content {
          block-size: 0;
          overflow: clip;
          opacity: 0;
          transform: translateY(6px);
          transition:
            block-size 600ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) 80ms,
            transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 80ms,
            content-visibility 600ms cubic-bezier(0.16, 1, 0.3, 1) allow-discrete;
        }
        .faq-details[open]::details-content {
          block-size: auto;
          opacity: 1;
          transform: translateY(0);
        }

        /* Reduced-motion — jump statt animate */
        @media (prefers-reduced-motion: reduce) {
          .faq-reveal,
          .faq-reveal-inner,
          .faq-toggle,
          .faq-toggle-v,
          .faq-question {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
