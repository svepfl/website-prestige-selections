'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useMemo, useState } from 'react';
import { vehicles } from '@/data/vehicles';
import Reveal from '@/components/editorial/Reveal';

/**
 * Markenwelt — Numerals-Mosaik auf Engine-Turned-Aluminum-Atmospheric.
 *
 * Atmospheric-Background (hand-finished engine-turned aluminum / guilloché —
 * Bugatti-Type-35-Dashboard-Tier, Pagani Huayra interior signature) trägt
 * eine datengetriebene Typo-Mosaic. Brand-name-Größe skaliert mit Anzahl
 * Fahrzeuge im Bestand (Live-Aggregation aus vehicles.ts).
 *
 * Asset:  /public/assets/atmospherics/markenwelt-engine-turned.webp
 *         (graceful fallback: nur bg-shadow + grain, wenn File fehlt)
 *
 * Color-System: text-on-shadow palette für Lesbarkeit gegen warmen
 * Champagne-Aluminum-Hintergrund. Tint-Gradient sorgt für APCA Lc ≥ 75
 * auf Body-Text trotz heller Stellen im Material.
 */

const ATMOSPHERIC_BG = '/assets/atmospherics/markenwelt-engine-turned.webp';

type BrandSlug =
  | 'ferrari'
  | 'porsche'
  | 'lamborghini'
  | 'aston-martin'
  | 'bentley'
  | 'maserati'
  | 'rolls-royce';

const BRAND_META: Record<
  string,
  { slug: BrandSlug; display: string; city: string }
> = {
  FERRARI:        { slug: 'ferrari',      display: 'Ferrari',      city: 'Modena' },
  PORSCHE:        { slug: 'porsche',      display: 'Porsche',      city: 'Stuttgart' },
  LAMBORGHINI:    { slug: 'lamborghini',  display: 'Lamborghini',  city: "Sant'Agata" },
  'ASTON MARTIN': { slug: 'aston-martin', display: 'Aston Martin', city: 'Gaydon' },
  BENTLEY:        { slug: 'bentley',      display: 'Bentley',      city: 'Crewe' },
  MASERATI:       { slug: 'maserati',     display: 'Maserati',     city: 'Modena' },
  'ROLLS ROYCE':  { slug: 'rolls-royce',  display: 'Rolls‑Royce', city: 'Goodwood' },
};

interface BrandTile {
  manufacturer: string;
  count: number;
  slug: BrandSlug;
  display: string;
  city: string;
}

function tierFor(count: number) {
  if (count >= 7) {
    return {
      brandSize: 'clamp(3.5rem, 8vw, 6.5rem)',
      countSize: 'clamp(0.95rem, 1.5vw, 1.4rem)',
      citySize: 'clamp(0.95rem, 1.15vw, 1.2rem)',
    };
  }
  if (count >= 4) {
    return {
      brandSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
      countSize: 'clamp(0.85rem, 1.25vw, 1.15rem)',
      citySize: 'clamp(0.9rem, 1.05vw, 1.1rem)',
    };
  }
  if (count >= 2) {
    return {
      brandSize: 'clamp(1.875rem, 3.5vw, 2.875rem)',
      countSize: 'clamp(0.8rem, 1vw, 1rem)',
      citySize: 'clamp(0.85rem, 0.95vw, 1rem)',
    };
  }
  return {
    brandSize: 'clamp(1.5rem, 2.5vw, 2.125rem)',
    countSize: 'clamp(0.75rem, 0.9vw, 0.95rem)',
    citySize: 'clamp(0.8rem, 0.9vw, 0.95rem)',
  };
}

export default function Markenwelt() {
  const t = useTranslations('markenwelt');
  const [bgFailed, setBgFailed] = useState(false);

  const brands: BrandTile[] = useMemo(() => {
    const counts = vehicles.reduce<Record<string, number>>((acc, v) => {
      const key = v.manufacturer.toUpperCase();
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .filter(([m, c]) => c > 0 && BRAND_META[m])
      .map(([manufacturer, count]) => {
        const meta = BRAND_META[manufacturer]!;
        return {
          manufacturer,
          count,
          slug: meta.slug,
          display: meta.display,
          city: meta.city,
        };
      })
      .sort((a, b) => b.count - a.count);
  }, []);

  return (
    <section
      className="relative bg-shadow text-on-shadow overflow-hidden"
      aria-labelledby="markenwelt-label"
    >
      {/* Atmospheric Background — Engine-turned aluminum macro. Fallback: bg-shadow + grain. */}
      {!bgFailed && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <Image
            src={ATMOSPHERIC_BG}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
            onError={() => setBgFailed(true)}
          />
        </div>
      )}

      {/* Tint Layer — engine-turned aluminum is bright warm champagne; we
          need an assertive darken to push APCA Lc ≥ 75 for body text while
          still letting the swirl pattern read as material, not as flat
          color. Vertical gradient adds subtle vignette top + bottom. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-shadow/75 via-shadow/60 to-shadow/80"
      />
      {/* Radial-ish second layer — darkens edges so the centre still
          shows the aluminum character */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(21,17,13,0.45)_100%)]"
      />

      {/* Grain texture — site-wide cohesion */}
      <div aria-hidden className="absolute inset-0 grain pointer-events-none" />

      <div
        className="relative px-6 md:px-10 lg:px-14 py-20 md:py-28 lg:py-32"
        style={{ zIndex: 2 }}
      >
        <div className="mx-auto max-w-[1500px]">
          {/* Header — mono strip on dark */}
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-on-shadow/15 pb-5 mb-14 md:mb-20 lg:mb-24">
              <h2
                id="markenwelt-label"
                className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-on-shadow-muted"
              >
                {t('label')}
              </h2>
              <span className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-on-shadow-muted/70">
                {t('lotMarker')}
              </span>
            </div>
          </Reveal>

          {/* Numerals-Mosaik — count-driven scale on atmospheric backdrop */}
          <ul className="flex flex-wrap items-baseline gap-x-10 gap-y-14 md:gap-x-14 md:gap-y-16 lg:gap-x-20 lg:gap-y-20">
            {brands.map((b, i) => {
              const tier = tierFor(b.count);
              return (
                <li key={b.slug}>
                  <Reveal delayMs={i * 70}>
                    <Link
                      href={{ pathname: '/fahrzeuge' as const, query: { brand: b.slug } }}
                      className="group block focus-ring rounded-sm active:translate-y-px"
                      aria-label={`${b.display} — ${b.count} ${t('viewBrand')}`}
                    >
                      {/* Count — mono, tabular-nums, gold */}
                      <span
                        className="block font-mono-spec text-gold tabular-nums leading-none transition-opacity duration-300 group-hover:opacity-80"
                        style={{
                          fontSize: tier.countSize,
                          fontWeight: 500,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {String(b.count).padStart(2, '0')}
                      </span>

                      {/* Brand name — display, scales with count, cream on warm dark */}
                      <h3
                        className="mt-2 md:mt-3 font-sans text-on-shadow uppercase tracking-[-0.02em] leading-[0.92] transition-colors duration-300 group-hover:text-gold"
                        style={{
                          fontWeight: 700,
                          fontSize: tier.brandSize,
                          whiteSpace: 'nowrap',
                          textShadow: '0 2px 24px rgba(21,17,13,0.45)',
                        }}
                      >
                        {b.display}
                      </h3>

                      {/* City — italic Newsreader flourish + arrow */}
                      <p
                        className="mt-2 md:mt-3 font-display italic text-on-shadow-muted leading-none flex items-baseline gap-2"
                        style={{ fontWeight: 300, fontSize: tier.citySize }}
                      >
                        <span>{b.city}</span>
                        <span
                          aria-hidden
                          className="font-mono-spec text-[10px] not-italic text-on-shadow-muted/50 transition-[color,transform] duration-300 group-hover:text-gold group-hover:translate-x-1"
                          style={{ fontWeight: 500 }}
                        >
                          →
                        </span>
                      </p>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          {/* Footer — viewAll + footnote */}
          <Reveal delayMs={brands.length * 70 + 100}>
            <div className="mt-16 md:mt-24 flex flex-wrap items-baseline justify-between gap-4 border-t border-on-shadow/15 pt-5">
              <p className="font-mono-spec text-[10px] uppercase tracking-[0.28em] text-on-shadow-muted/70 max-w-[42ch]">
                {t('footnote')}
              </p>
              <Link
                href="/fahrzeuge"
                className="group inline-flex items-center gap-2 font-mono-spec text-[10px] uppercase tracking-[0.28em] text-on-shadow hover:text-gold transition-colors duration-300 focus-ring rounded-sm"
                style={{ fontWeight: 600 }}
              >
                <span>{t('viewAll')}</span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
