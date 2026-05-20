'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { vehicles } from '@/data/vehicles';
import { VEHICLE_PLACEHOLDERS } from '@/data/images';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const featured = vehicles.slice(0, 6);

export default function FeaturedVehicles() {
  const t = useTranslations('featured');

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-light">
      <div className="max-w-7xl mx-auto px-6 reveal-content">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-dark mb-4">{t('label')}</p>
          <h2 className="text-3xl md:text-5xl font-display font-light text-dark tracking-tight mb-6">
            {t('title')}
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Vehicle grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((vehicle) => (
            <Link
              key={vehicle.id}
              href={`/fahrzeuge/${vehicle.id}` as '/fahrzeuge'}
              className="group relative rounded-xl overflow-hidden"
            >
              {/* Image fills the entire card */}
              <div className="relative aspect-[16/10] img-zoom">
                <Image
                  src={VEHICLE_PLACEHOLDERS[vehicle.manufacturer] || VEHICLE_PLACEHOLDERS['FERRARI']}
                  alt={`${vehicle.manufacturer} ${vehicle.model}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Permanent: manufacturer badge top-left */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] uppercase tracking-[0.15em] bg-dark/70 text-gold px-3 py-1 rounded-full backdrop-blur-sm">
                    {vehicle.manufacturer}
                  </span>
                </div>

                {/* Gradient overlay — always visible on mobile, hover on desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent md:from-dark/0 md:via-transparent md:to-transparent md:group-hover:from-dark/90 md:group-hover:via-dark/40 transition-all duration-500" />

                {/* Info overlay — always visible on mobile, slides up on desktop hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-white font-light text-lg mb-0.5">
                    {vehicle.model}
                  </h3>
                  <p className="text-white/60 text-xs line-clamp-1 mb-3">
                    {vehicle.title}
                  </p>

                  {/* Specs row */}
                  <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
                    <span>{vehicle.power} {t('ps')}</span>
                    <span className="w-px h-3 bg-white/20" />
                    <span>{vehicle.mileage.toLocaleString('de-DE')} {t('km')}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-gold font-light text-lg tabular-nums">
                      {t('from')} {formatPrice(vehicle.price)}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-white/40 group-hover:text-gold transition-colors duration-300">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-12">
          <Link
            href="/fahrzeuge"
            className="inline-flex items-center gap-3 text-gold-dark text-sm tracking-widest uppercase hover:text-gold transition-colors duration-300"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
