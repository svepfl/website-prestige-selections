'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import TextureLayer from '@/components/visual/TextureLayer';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

/**
 * WerkstattHero — Full-Bleed Cinematic Hero (Singer × Pagani × Patek-Tier).
 *
 * Edge-to-edge Atelier-Image über die volle Viewport-Breite. Editorial-Overlay
 * positioned bottom-left in der Caption-Position (Magazine-Pattern).
 *
 * Anti-Template-Move: bricht das Split-Screen-SaaS-Pattern komplett auf.
 * Photography führt absolut — kein Card-Container, kein 40%-Image-Slot.
 *
 * Consistent zur Homepage: Tor-Reveal, Schaufenster, Abschluss sind alle
 * full-bleed cinematic mit text-overlay. Pattern jetzt durchgängig auf Sub-Pages.
 *
 * Motion (Emil cubic-bezier(0.23, 1, 0.32, 1)):
 * - Image priority load instant
 * - Text-Overlay: 4-step Stagger (eyebrow → H1 → intro → CTA-row), 80-100ms apart
 * - Floating stat-line ein 800ms später (dramatic pause)
 * - prefers-reduced-motion: instant final-state
 *
 * Height: clamp(600px, 82vh, 920px) — cinematic above-fold ohne mobil zu lang.
 */

const HERO_IMAGE = '/assets/werkstatt/werkstatt-hero-placeholder.webp';

export default function WerkstattHero() {
  const t = useTranslations('workshop');
  const locale = useLocale();
  const reduced = usePrefersReducedMotion();
  const [textShown, setTextShown] = useState(reduced);
  const [statShown, setStatShown] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const t1 = setTimeout(() => setTextShown(true), 80);
    const t2 = setTimeout(() => setStatShown(true), 880);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduced]);

  return (
    <section
      className="relative w-full overflow-hidden bg-shadow"
      style={{
        height: 'clamp(600px, 82vh, 920px)',
      }}
      aria-labelledby="hero-h1"
    >
      {/* ─── FULL-BLEED IMAGE ─── */}
      <Image
        src={HERO_IMAGE}
        alt={t('heroImageAlt')}
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />

      {/* ─── VIGNETTE / DARKEN GRADIENT (für Text-Legibility) ─── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, color-mix(in oklab, var(--color-shadow) 25%, transparent) 0%, transparent 22%, transparent 48%, color-mix(in oklab, var(--color-shadow) 55%, transparent) 75%, color-mix(in oklab, var(--color-shadow) 92%, transparent) 100%)',
        }}
      />

      {/* Side-vignette for additional depth */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, color-mix(in oklab, var(--color-shadow) 35%, transparent) 0%, transparent 35%)',
        }}
      />

      {/* Subtle film grain */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <TextureLayer variant="film" opacity={0.06} />
      </div>

      {/* ─── BREADCRUMBS OVERLAY (top, under fixed header) ─── */}
      <div className="hero-breadcrumbs absolute top-24 lg:top-28 left-0 right-0 z-10">
        <Breadcrumbs locale={locale} items={[{ label: t('title') }]} />
        <style>{`
          .hero-breadcrumbs nav { padding-top: 0.25rem; padding-bottom: 0.25rem; }
          .hero-breadcrumbs ol { color: var(--color-on-shadow-muted); }
          .hero-breadcrumbs a { color: var(--color-on-shadow-muted); }
          .hero-breadcrumbs a:hover { color: var(--color-gold); }
          .hero-breadcrumbs [aria-current="page"] { color: var(--color-on-shadow); }
          .hero-breadcrumbs span[aria-hidden] { color: color-mix(in oklab, var(--color-on-shadow-muted) 50%, transparent); }
        `}</style>
      </div>

      {/* ─── CONTENT OVERLAY (bottom-left, Caption-Position) ─── */}
      <div className="absolute inset-0 flex items-end pointer-events-none px-6 md:px-10 lg:px-14 pb-14 md:pb-20 lg:pb-24">
        <div className="w-full mx-auto max-w-[1500px] min-w-0">
          <div className="max-w-[64ch] min-w-0 pointer-events-auto">
            {/* Eyebrow */}
            <div
              className={`flex items-center gap-3 mb-8 md:mb-10 transition-[opacity,transform] duration-700 ${
                textShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              <span aria-hidden className="block h-px w-10 bg-gold/70" />
              <span
                className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold"
                style={{ fontWeight: 500 }}
              >
                {t('heroEyebrow')}
              </span>
            </div>

            {/* H1 — massive editorial display */}
            <h1
              id="hero-h1"
              className={`font-sans text-on-shadow leading-[0.95] tracking-[-0.03em] [overflow-wrap:anywhere] min-w-0 max-w-full lg:max-w-[14ch] [text-wrap:balance] transition-[opacity,transform] duration-1000 ${
                textShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{
                fontWeight: 700,
                fontSize: 'clamp(2rem, 6vw, 7rem)',
                transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                transitionDelay: textShown ? '100ms' : '0ms',
                textShadow: '0 1px 24px color-mix(in oklab, var(--color-shadow) 40%, transparent)',
              }}
            >
              <span className="block">{t('h1Line1')}</span>
              <span
                className="block text-on-shadow-muted"
                style={{
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {t('h1Line2')}
              </span>
            </h1>

            {/* Intro — Magazine-tier subhead */}
            <p
              className={`mt-8 md:mt-10 font-sans text-base md:text-lg lg:text-xl text-on-shadow/90 leading-[1.5] max-w-[52ch] transition-[opacity,transform] duration-1000 ${
                textShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                fontWeight: 400,
                transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                transitionDelay: textShown ? '220ms' : '0ms',
                textShadow: '0 1px 12px color-mix(in oklab, var(--color-shadow) 50%, transparent)',
              }}
            >
              {t('intro')}
            </p>

            {/* CTA row + inline stat line */}
            <div
              className={`mt-10 md:mt-14 flex flex-col sm:flex-row sm:items-center gap-6 md:gap-10 transition-[opacity,transform] duration-1000 ${
                textShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                transitionDelay: textShown ? '360ms' : '0ms',
              }}
            >
              <Link
                href="/kontakt"
                className="hero-cta group inline-flex items-center gap-3 bg-on-shadow text-shadow rounded-full px-8 py-4 font-mono-spec text-[11px] uppercase tracking-[0.28em] focus-ring self-start"
                style={{ fontWeight: 600 }}
              >
                {t('cta')}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>

              {/* Inline editorial stat-line — no card, hairline-anchor */}
              <div
                className={`flex items-baseline gap-4 sm:border-l sm:border-on-shadow/30 sm:pl-6 md:pl-8 transition-[opacity,transform] duration-1000 ${
                  statShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                }}
              >
                <span
                  className="font-sans tabular-nums text-on-shadow leading-none tracking-[-0.02em]"
                  style={{
                    fontWeight: 700,
                    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                    textShadow:
                      '0 1px 12px color-mix(in oklab, var(--color-shadow) 50%, transparent)',
                  }}
                >
                  142
                </span>
                <div className="flex flex-col leading-tight">
                  <span
                    className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold"
                    style={{ fontWeight: 500 }}
                  >
                    {t('heroStat.label')}
                  </span>
                  <span
                    className="mt-1 font-mono-spec text-[9px] uppercase tracking-[0.28em] text-on-shadow-muted"
                    style={{ fontWeight: 500 }}
                  >
                    {t('heroStat.sub')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-cta {
          transition: background-color 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .hero-cta:hover { background-color: var(--color-gold); }
        .hero-cta:active { transform: scale(0.97); }
      `}</style>
    </section>
  );
}
