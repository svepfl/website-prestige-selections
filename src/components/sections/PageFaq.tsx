'use client';

import { useTranslations, useLocale } from 'next-intl';

type Tone = 'light' | 'dark';

type PageFaqProps = {
  namespace: 'workshop' | 'verkaufen';
  tone?: Tone;
};

const FAQ_KEYS = Array.from({ length: 8 }, (_, i) => i + 1);

export default function PageFaq({ namespace, tone = 'light' }: PageFaqProps) {
  const t = useTranslations(namespace);
  useLocale();

  const isDark = tone === 'dark';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.page-faq-question', '.page-faq-reveal p'],
    },
    mainEntity: FAQ_KEYS.map((i) => ({
      '@type': 'Question',
      name: t(`faq.q${i}` as 'faq.q1'),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`faq.a${i}` as 'faq.a1'),
      },
    })),
  };

  return (
    <section
      className={
        (isDark
          ? 'relative px-6 md:px-10 lg:px-14 py-24 md:py-32 border-t border-on-shadow/15 page-faq-section-dark'
          : 'relative px-6 md:px-10 lg:px-14 py-24 md:py-32 bg-canvas-soft text-ink')
      }
      aria-labelledby={`${namespace}-faq-label`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />

      <div className="mx-auto max-w-[1500px]">
        <div className="flex items-baseline gap-4 mb-12">
          <span
            aria-hidden
            className={`block h-px w-10 ${isDark ? 'bg-gold-deep/60' : 'bg-gold-deep/70'}`}
          />
          <h2
            id={`${namespace}-faq-label`}
            className={`font-mono-spec text-[10px] uppercase tracking-[0.32em] ${
              isDark ? 'text-gold' : 'text-gold-deep'
            }`}
            style={{ fontWeight: 500 }}
          >
            {t('faqLabel')}
          </h2>
        </div>

        {/* Asymmetric 4/8 split — Intro sticky links (ab lg), Accordion rechts.
            Identische Logik wie Homepage Fragen-Section — alle FAQ-Sektionen
            der Site folgen diesem kanonischen Pattern.

            Sticky-Anchor: lg:top-32 (8rem) = Abstand unter dem fixed header
            (96px header + ~30px Atemraum). Section darf KEIN overflow-hidden
            haben sonst bricht sticky (sticky-element bekäme die Section als
            Scroll-Container statt des Viewports). */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 lg:gap-x-16 gap-y-12 lg:gap-y-10">
          {/* Left — Intro (sticky on desktop) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="max-w-[24ch]">
                {/* Gold-Hairline-Eyebrow — Sidebar-Anchor, verhindert orphan-text-Look */}
                <span
                  aria-hidden
                  className={`hidden lg:block h-px w-10 mb-7 ${isDark ? 'bg-gold/70' : 'bg-gold-deep/80'}`}
                />
                <p
                  className={`font-display italic leading-[1.2] tracking-[-0.015em] ${
                    isDark ? 'text-on-shadow' : 'text-ink'
                  }`}
                  style={{
                    fontWeight: 300,
                    fontSize: 'clamp(1.375rem, 2.4vw, 2rem)',
                  }}
                >
                  {t('faqHeading')}
                </p>
              </div>
            </div>
          </div>

          {/* Right — Accordion stack */}
          <div className="lg:col-span-8">
            <ul className={`page-faq-list border-t ${isDark ? 'border-on-shadow/15' : 'border-ink/15'}`}>
              {FAQ_KEYS.map((i, idx) => (
                <li key={i} className={`border-b ${isDark ? 'border-on-shadow/15' : 'border-ink/15'}`}>
                  <details {...(idx === 0 ? { open: true } : {})} className="page-faq-details group">
                    <summary
                      className={`page-faq-summary cursor-pointer list-none select-none flex items-start justify-between gap-6 py-6 md:py-7 focus-ring rounded-sm ${
                        isDark ? 'hover:text-gold' : 'hover:text-gold-deep'
                      }`}
                    >
                      <div className="flex items-baseline gap-4 flex-1 min-w-0">
                        <span
                          className={`font-mono-spec tabular-nums text-[11px] uppercase tracking-[0.32em] shrink-0 mt-1 ${
                            isDark ? 'text-gold' : 'text-gold-deep'
                          }`}
                          style={{ fontWeight: 500 }}
                        >
                          {String(i).padStart(2, '0')}
                        </span>
                        <span
                          className={`page-faq-question font-sans leading-[1.3] tracking-[-0.01em] ${
                            isDark ? 'text-on-shadow' : 'text-ink'
                          }`}
                          style={{
                            fontWeight: 500,
                            fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)',
                          }}
                        >
                          {t(`faq.q${i}` as 'faq.q1')}
                        </span>
                      </div>
                      <span
                        aria-hidden
                        className={`page-faq-toggle relative shrink-0 mt-1.5 inline-block h-5 w-5 md:h-6 md:w-6 transition-colors duration-300 ${
                          isDark ? 'text-on-shadow-muted' : 'text-ink-muted'
                        }`}
                      >
                        <span className="absolute top-1/2 left-0 right-0 h-px bg-current -translate-y-1/2" />
                        <span className="page-faq-toggle-v absolute top-0 bottom-0 left-1/2 w-px bg-current -translate-x-1/2" />
                      </span>
                    </summary>

                    <div className="page-faq-reveal">
                      <div className="pb-7 md:pb-8 pl-9 md:pl-10 pr-2">
                        <p
                          className={`font-sans leading-[1.65] max-w-[58ch] ${
                            isDark ? 'text-on-shadow/85' : 'text-ink-soft'
                          }`}
                          style={{
                            fontWeight: 400,
                            fontSize: 'clamp(0.9375rem, 1.05vw, 1rem)',
                          }}
                        >
                          {t(`faq.a${i}` as 'faq.a1')}
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

      <style>{`
        .page-faq-summary::-webkit-details-marker { display: none; }
        .page-faq-summary::marker { content: ''; }

        .page-faq-question {
          transition: color 500ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .page-faq-details[open] .page-faq-question {
          color: var(--color-gold-deep);
        }
        .page-faq-section-dark .page-faq-details[open] .page-faq-question {
          color: var(--color-gold);
        }

        .page-faq-toggle {
          transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: center;
        }
        .page-faq-details[open] .page-faq-toggle {
          transform: scale(0.92);
        }
        .page-faq-toggle-v {
          transition: opacity 400ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .page-faq-details[open] .page-faq-toggle-v {
          opacity: 0;
        }

        .page-faq-details { interpolate-size: allow-keywords; }
        .page-faq-details::details-content {
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
        .page-faq-details[open]::details-content {
          block-size: auto;
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .page-faq-toggle,
          .page-faq-toggle-v,
          .page-faq-question {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
