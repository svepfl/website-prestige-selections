'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

/**
 * LeistungenCards — Editorial 2×2 service cards.
 *
 * Statt 4-Zeilen-Liste: 4 großzügige Cards mit individuell-distincten
 * abstract CSS-Glyphs als Card-Marker. Hover-Lift, Stagger-Reveal.
 *
 * Motion (Emil): cubic-bezier(0.23, 1, 0.32, 1), 60ms stagger.
 * Hover: subtle translateY(-4px) + shadow-deepen + glyph-rotate.
 */

const SERVICES = ['maintenance', 'repair', 'restoration', 'detailing'] as const;

const SERVICE_IMAGE: Record<(typeof SERVICES)[number], string> = {
  maintenance: '/assets/werkstatt/werkstatt-wartung-hero-placeholder.webp',
  repair: '/assets/werkstatt/werkstatt-reparatur-hero-placeholder.webp',
  restoration: '/assets/werkstatt/werkstatt-restauration-hero-placeholder.webp',
  detailing: '/assets/werkstatt/werkstatt-aufbereitung-hero-placeholder.webp',
};

const SERVICE_HREF: Record<(typeof SERVICES)[number], '/werkstatt'> = {
  maintenance: '/werkstatt/wartung' as '/werkstatt',
  repair: '/werkstatt/reparatur' as '/werkstatt',
  restoration: '/werkstatt/restauration' as '/werkstatt',
  detailing: '/werkstatt/aufbereitung' as '/werkstatt',
};

const SERVICE_ALT: Record<(typeof SERVICES)[number], string> = {
  maintenance: 'Sportwagen-Wartung auf der Hebebühne — Underbody-Inspektion bei Prestige Selections Freiburg',
  repair: 'Sportwagen-Reparatur — OEM-Diagnose-Tablet auf Workbench bei Prestige Selections Freiburg',
  restoration: 'Klassiker-Restauration — Sportwagen unter Dustsheet im klimatisierten Lager bei Prestige Selections',
  detailing: 'Sportwagen-Aufbereitung — Lackdetail Ferrari Carbon-Side-Skirt bei Prestige Selections',
};

export default function LeistungenCards() {
  const t = useTranslations('workshop');
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative px-6 md:px-10 lg:px-14 py-20 md:py-28 border-t border-ink/15"
      aria-labelledby="leistungen-label"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="flex items-baseline gap-4 mb-14 md:mb-20">
          <span aria-hidden className="block h-px w-10 bg-gold-deep/60" />
          <p
            id="leistungen-label"
            className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep"
            style={{ fontWeight: 500 }}
          >
            {t('servicesLabel')}
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[28rem] lg:auto-rows-[32rem] gap-6 lg:gap-8">
          {SERVICES.map((key, i) => {
            // Asymmetric editorial bento — alternating 5/7, 7/5 per row.
            // Index 0: narrow / 1: wide / 2: wide / 3: narrow → zig-zag rhythm
            // Heights harmonize per row via auto-rows-[Xrem] on container;
            // Cards stretch with h-full, image fills via object-cover.
            const isWide = i === 1 || i === 2;
            const colSpan = isWide ? 'md:col-span-7' : 'md:col-span-5';

            return (
            <li
              key={key}
              className={`${colSpan} h-full transition-[opacity,transform] duration-1000 ${
                shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                transitionDelay: shown ? `${i * 80}ms` : '0ms',
              }}
            >
              <Link
                href={SERVICE_HREF[key]}
                className="group relative block h-full focus-ring rounded-2xl active:translate-y-px overflow-hidden"
              >
                {/* Cinematic full-bleed Image-Card — fills row height, mobile fallback uses aspect */}
                <div className="relative h-full aspect-[4/3] md:aspect-auto overflow-hidden rounded-2xl bg-shadow-soft">
                  <Image
                    src={SERVICE_IMAGE[key]}
                    alt={SERVICE_ALT[key]}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]"
                  />

                  {/* Darken Gradient — bottom for text legibility */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to bottom, color-mix(in oklab, var(--color-shadow) 10%, transparent) 0%, transparent 35%, color-mix(in oklab, var(--color-shadow) 35%, transparent) 60%, color-mix(in oklab, var(--color-shadow) 85%, transparent) 100%)',
                    }}
                  />

                  {/* Content Overlay — bottom-left magazine-caption */}
                  <div className="absolute inset-0 flex items-end p-7 md:p-10 lg:p-12">
                    <div className="w-full max-w-[34ch]">
                      {/* Mono-spec Eyebrow */}
                      <p
                        className="font-mono-spec tabular-nums text-[10px] uppercase tracking-[0.32em] text-gold mb-4 md:mb-5"
                        style={{
                          fontWeight: 500,
                          textShadow:
                            '0 1px 8px color-mix(in oklab, var(--color-shadow) 50%, transparent)',
                        }}
                      >
                        Atelier · {String(i + 1).padStart(2, '0')}
                      </p>

                      {/* Massive Title — Sans Bold UPPERCASE über Image */}
                      <h3
                        className="font-sans text-on-shadow leading-[1.0] tracking-[-0.02em] uppercase"
                        style={{
                          fontWeight: 700,
                          fontSize: 'clamp(1.625rem, 3vw, 2.5rem)',
                          textShadow:
                            '0 1px 14px color-mix(in oklab, var(--color-shadow) 50%, transparent)',
                        }}
                      >
                        {t(`services.${key}.title`)}
                      </h3>

                      {/* Affordance */}
                      <div className="mt-5 md:mt-6 flex items-center gap-3">
                        <span
                          aria-hidden
                          className="block h-px w-8 bg-on-shadow/40 transition-[width,background-color] duration-500 group-hover:w-12 group-hover:bg-gold"
                          style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
                        />
                        <span
                          className="font-mono-spec text-[10px] uppercase tracking-[0.28em] text-on-shadow-muted group-hover:text-gold transition-colors duration-300"
                          style={{ fontWeight: 600 }}
                        >
                          {t('servicesReadMore')}
                        </span>
                        <span
                          aria-hidden
                          className="text-on-shadow-muted group-hover:text-gold transition-[color,transform] duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
