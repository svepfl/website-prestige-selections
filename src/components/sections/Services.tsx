'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { IMAGES } from '@/data/images';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const services = [
  {
    key: 'buy' as const,
    image: IMAGES.services.kaufen,
    href: '/fahrzeuge' as const,
  },
  {
    key: 'workshop' as const,
    image: IMAGES.services.werkstatt,
    href: '/werkstatt' as const,
  },
  {
    key: 'detailing' as const,
    image: IMAGES.services.aufbereitung,
    href: '/werkstatt' as const,
  },
];

export default function Services() {
  const t = useTranslations('services');

  return (
    <section className="relative py-24 md:py-32 lg:py-40 bg-dark grain">
      <div className="max-w-7xl mx-auto px-6 reveal-content">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">{t('label')}</p>
          <h2 className="text-3xl md:text-5xl font-display font-light text-white tracking-tight">
            {t('title')}
          </h2>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.key}
              href={service.href}
              className="group relative block aspect-[3/4] rounded-xl overflow-hidden"
            >
              <Image
                src={service.image}
                alt={t(`${service.key}.title`)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/50 to-dark/20 group-hover:from-dark/95 group-hover:via-dark/60 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-light text-white mb-2">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {t(`${service.key}.description`)}
                </p>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold group-hover:gap-3 transition-all duration-300">
                  {t('learnMore')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
