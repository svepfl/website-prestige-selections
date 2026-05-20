'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { vehicles, manufacturers } from '@/data/vehicles';
import { VEHICLE_PLACEHOLDERS } from '@/data/images';
import Image from 'next/image';
import { Gauge, Route, Fuel } from 'lucide-react';

export default function FahrzeugeContent() {
  const t = useTranslations('vehicles');
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = activeFilter
    ? vehicles.filter((v) => v.manufacturer === activeFilter)
    : vehicles;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);

  const fuelLabel = (fuel: string) => {
    if (fuel === 'petrol') return t('petrol');
    if (fuel === 'hybrid') return t('hybrid');
    return fuel;
  };

  return (
    <>
      {/* Header */}
      <section className="bg-dark pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
            {t('count', { count: filtered.length })}
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight mb-4">
            {t('title')}
          </h1>
          <p className="text-neutral-400 max-w-xl leading-relaxed">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="bg-dark pb-2">
        <Breadcrumbs
          locale={locale}
          items={[{ label: t('title') }]}
        />
      </section>

      {/* Filter bar */}
      <section className="bg-dark-secondary border-y border-dark-border sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-none -mx-6 px-6">
            <button
              onClick={() => setActiveFilter(null)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 border ${
                activeFilter === null
                  ? 'bg-gold text-dark border-gold'
                  : 'border-dark-border text-neutral-400 hover:text-white hover:border-neutral-500'
              }`}
            >
              {t('filterAll')}
            </button>
            {manufacturers.map((m) => (
              <button
                key={m}
                onClick={() => setActiveFilter(m)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 border ${
                  activeFilter === m
                    ? 'bg-gold text-dark border-gold'
                    : 'border-dark-border text-neutral-400 hover:text-white hover:border-neutral-500'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle grid */}
      <section className="bg-dark py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((vehicle) => (
              <Link
                key={vehicle.id}
                href={`/fahrzeuge/${vehicle.id}` as '/fahrzeuge'}
                className="group bg-dark-secondary border border-dark-border rounded-xl overflow-hidden hover:border-gold/20 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] img-zoom">
                  <Image
                    src={
                      VEHICLE_PLACEHOLDERS[vehicle.manufacturer] ||
                      VEHICLE_PLACEHOLDERS['FERRARI']
                    }
                    alt={`${vehicle.manufacturer} ${vehicle.model}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] uppercase tracking-[0.15em] bg-dark/80 text-gold px-3 py-1 rounded-full backdrop-blur-sm">
                      {vehicle.manufacturer}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-white font-light text-lg mb-1">
                    {vehicle.model}
                  </h3>
                  <p className="text-neutral-500 text-xs line-clamp-1 mb-4">
                    {vehicle.title}
                  </p>

                  {/* Specs */}
                  <div className="flex items-center gap-4 text-xs text-neutral-500 mb-5">
                    <span className="flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-gold/50" />
                      {vehicle.power} PS
                    </span>
                    <span className="w-px h-3 bg-dark-border" />
                    <span className="flex items-center gap-1.5">
                      <Route className="w-3.5 h-3.5 text-gold/50" />
                      {vehicle.mileage.toLocaleString('de-DE')} km
                    </span>
                    <span className="w-px h-3 bg-dark-border" />
                    <span className="flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-gold/50" />
                      {fuelLabel(vehicle.fuel)}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-gold font-light text-xl tabular-nums">
                        {formatPrice(vehicle.price)}
                      </span>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        {vehicle.vatInfo === 'included'
                          ? t('vatIncluded', { rate: vehicle.vatRate ?? 19 })
                          : t('vatNotApplicable')}
                      </p>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-gold/60 group-hover:text-gold transition-colors duration-300">
                      {t('details')} &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
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
    </>
  );
}
