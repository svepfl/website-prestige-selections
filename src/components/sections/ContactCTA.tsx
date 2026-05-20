'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { IMAGES } from '@/data/images';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

export default function ContactCTA() {
  const t = useTranslations('contact');

  return (
    <section className="relative py-24 md:py-32 overflow-hidden grain">
      {/* Background — optimized via Next/Image */}
      <Image
        src={IMAGES.contact}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-dark/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center reveal-content">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">{t('label')}</p>
        <h2 className="text-3xl md:text-5xl font-display font-light text-white tracking-tight mb-6">
          {t('title')}
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10">
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-3 bg-gold text-dark px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-gold-light transition-colors duration-300"
          >
            {t('cta')}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="tel:+497615573168"
            className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full text-sm tracking-widest uppercase hover:border-white/40 transition-colors duration-300"
          >
            <Phone className="w-4 h-4" />
            +49 761 5573168
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 text-neutral-500 text-sm">
          <MapPin className="w-4 h-4 text-gold/50" />
          {t('address')}
        </div>
      </div>
    </section>
  );
}
