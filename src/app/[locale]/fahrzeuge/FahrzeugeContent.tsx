'use client';

import { useMemo, useState } from 'react';
import { jsonLd, buildBreadcrumb } from '@/lib/json-ld';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import { vehicles, manufacturers } from '@/data/vehicles';
import { getVehiclePlaceholder } from '@/data/images';

/**
 * /fahrzeuge — Editorial Collection
 *
 * 1. Breadcrumbs + Page-Header
 * 2. Filter Bar: Marken-Pills, editorial Style, sticky
 * 3. Grid: Premium-Cards mit voll-gerundetem Image-Block + Editorial-Spec-Layout
 *
 * Brand-Filter via URL: /fahrzeuge?brand=ferrari (von Markenwelt-Section)
 */

const BRAND_SLUG_MAP: Record<string, string> = {
  'ferrari': 'FERRARI',
  'porsche': 'PORSCHE',
  'lamborghini': 'LAMBORGHINI',
  'aston-martin': 'ASTON MARTIN',
  'bentley': 'BENTLEY',
  'maserati': 'MASERATI',
  'rolls-royce': 'ROLLS ROYCE',
};

export default function FahrzeugeContent() {
  const t = useTranslations('vehicles');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Sync brand from URL ?brand=ferrari (Markenwelt-Section navigation).
  // Derived from search-param prop — no effect needed; reset on every change
  // so the filter reflects the latest URL state.
  const brandParam = searchParams.get('brand');
  const urlFilter = brandParam ? BRAND_SLUG_MAP[brandParam] : null;
  const [lastUrlFilter, setLastUrlFilter] = useState(urlFilter ?? null);
  if (lastUrlFilter !== urlFilter) {
    setLastUrlFilter(urlFilter ?? null);
    if (urlFilter) setActiveFilter(urlFilter);
  }

  const filtered = useMemo(
    () => (activeFilter ? vehicles.filter((v) => v.manufacturer === activeFilter) : vehicles),
    [activeFilter],
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(
      locale === 'de' ? 'de-DE' : locale === 'fr' ? 'fr-FR' : 'en-GB',
      { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 },
    ).format(price);

  return (
    <main className="bg-canvas text-ink">
      {/* Breadcrumbs — top padding accounts for fixed-header */}
      <div className="pt-24 md:pt-28">
        <Breadcrumbs locale={locale} items={[{ label: t('title') }]} />
      </div>

      {/* Page Header — Editorial Title */}
      <section className="px-6 md:px-10 lg:px-14 pb-10 md:pb-14">
        <div className="mx-auto max-w-[1500px]">
          <h1
            className="font-sans text-ink leading-[0.95] tracking-[-0.03em] uppercase max-w-[18ch]"
            style={{ fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            {t('title')}
          </h1>
        </div>
      </section>

      {/* Filter Bar — editorial pill row. top alignt exakt mit Chrome-Höhe
          (h-20 mobile = 80px, h-24 desktop = 96px) damit kein Spalt sichtbar. */}
      <section
        className="sticky z-30 bg-canvas/95 backdrop-blur-sm border-y border-ink/10 top-20 lg:top-24"
        aria-label={t('filterAriaLabel')}
      >
        <div className="px-6 md:px-10 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            <div className="flex items-center gap-3 py-4 overflow-x-auto scrollbar-none -mx-6 px-6 md:mx-0 md:px-0">
              <span className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted flex-shrink-0 hidden md:inline">
                {t('count', { count: filtered.length })}
              </span>
              <span aria-hidden className="hidden md:block h-px w-8 bg-ink/20 flex-shrink-0" />
              <FilterPill
                active={activeFilter === null}
                onClick={() => setActiveFilter(null)}
                label={t('filterAll')}
              />
              {manufacturers.map((m) => (
                <FilterPill
                  key={m}
                  active={activeFilter === m}
                  onClick={() => setActiveFilter(m)}
                  label={m}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Grid — canvas-raised cards */}
      <section className="bg-canvas py-16 md:py-24">
        <div className="px-6 md:px-10 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-display italic text-xl md:text-2xl text-ink-soft leading-snug max-w-[40ch] mx-auto" style={{ fontWeight: 300 }}>
                  {t('emptyState')}
                </p>
              </div>
            ) : (
              // Richtung A — Truly Editorial (Aesop × Tom Hartley × Hodinkee).
              // Kein Card-Background, kein Frame, kein Shadow. Photo ist das
              // Statement, Whitespace ist der Rahmen. Text floatet unter dem
              // Photo direkt auf bg-canvas.
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-10 gap-y-16 lg:gap-y-20">
                {filtered.map((vehicle, i) => (
                  <li key={vehicle.id}>
                    <Link
                      href={`/fahrzeuge/${vehicle.id}` as '/fahrzeuge'}
                      className="group block focus-ring rounded-2xl active:translate-y-px"
                      aria-label={`${vehicle.manufacturer} ${vehicle.model}`}
                    >
                      {/* Image — eigenständig, alle 4 Ecken gerundet, kein Frame drumherum */}
                      <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-canvas-soft">
                        <Image
                          src={
                            getVehiclePlaceholder(vehicle.manufacturer, vehicle.id)
                          }
                          alt={`${vehicle.manufacturer} ${vehicle.model} — Sportwagen aus der Prestige Selections Kollektion in Freiburg`}
                          fill
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-[1.04]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading={i < 6 ? 'eager' : 'lazy'}
                        />
                      </div>

                      {/* Text — floatet direkt auf bg-canvas, kein Card-Frame */}
                      <div className="mt-6 md:mt-7">
                        {/* Brand mono-spec eyebrow — über dem Model-Name */}
                        <p
                          className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep mb-3"
                          style={{ fontWeight: 500 }}
                        >
                          {vehicle.manufacturer === 'ROLLS ROYCE' ? 'Rolls-Royce' : vehicle.manufacturer === 'ASTON MARTIN' ? 'Aston Martin' : vehicle.manufacturer.charAt(0) + vehicle.manufacturer.slice(1).toLowerCase()}
                        </p>
                        <h3
                          className="font-sans text-ink leading-[1.05] tracking-[-0.02em] uppercase"
                          style={{ fontWeight: 700, fontSize: 'clamp(1.375rem, 1.9vw, 1.625rem)' }}
                        >
                          {vehicle.model}
                        </h3>
                        <p
                          className="mt-2.5 font-mono-spec text-[10.5px] uppercase tracking-[0.26em] text-ink-muted tabular-nums line-clamp-1"
                          style={{ fontWeight: 500 }}
                        >
                          {vehicle.firstRegistration ? `${vehicle.firstRegistration} · ` : ''}
                          {vehicle.power} PS
                          {vehicle.mileage > 200 && ` · ${vehicle.mileage.toLocaleString('de-DE')} km`}
                        </p>

                        <div className="mt-5 flex items-baseline justify-between gap-3 pt-4 border-t border-ink/12">
                          <div className="min-w-0">
                            <span
                              className="font-mono-spec tabular-nums text-[18px] md:text-[19px] text-ink tracking-[-0.01em]"
                              style={{ fontWeight: 500 }}
                            >
                              {formatPrice(vehicle.price)}
                            </span>
                            <p className="mt-1 font-mono-spec text-[9px] uppercase tracking-[0.22em] text-ink-muted/70">
                              {vehicle.vatInfo === 'included'
                                ? t('vatIncluded', { rate: vehicle.vatRate ?? 19 })
                                : t('vatNotApplicable')}
                            </p>
                          </div>
                          <span
                            className="inline-flex items-center gap-2 font-mono-spec text-[10px] uppercase tracking-[0.26em] text-ink group-hover:text-gold-deep transition-colors duration-300 flex-shrink-0"
                            style={{ fontWeight: 600 }}
                          >
                            <span className="relative inline-block">
                              {t('details')}
                              <span aria-hidden className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold-deep origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100" />
                            </span>
                            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* ItemList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: t('title'),
            numberOfItems: vehicles.length,
            itemListElement: vehicles.map((v, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `https://www.prestige-selections.com/${locale}/fahrzeuge/${v.id}`,
            })),
          }).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(buildBreadcrumb(locale, [{ name: t('title'), path: '/fahrzeuge' }])) }}
      />
    </main>
  );
}

function FilterPill({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex-shrink-0 px-5 py-2 rounded-full font-mono-spec text-[10px] uppercase tracking-[0.28em] transition-colors duration-300 active:translate-y-px focus-ring ${
        active
          ? 'bg-ink text-canvas'
          : 'text-ink-soft hover:text-ink bg-canvas-soft hover:bg-ink/5'
      }`}
      style={{ fontWeight: 600, minHeight: '36px' }}
    >
      {label}
    </button>
  );
}
