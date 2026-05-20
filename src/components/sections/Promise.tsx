'use client';

import { useTranslations } from 'next-intl';
import { IMAGES } from '@/data/images';
import Image from 'next/image';

const statKeys = ['passion', 'available', 'transparency', 'experience'] as const;

export default function Promise() {
  const t = useTranslations('promise');

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-light">
      <div className="max-w-7xl mx-auto px-6 reveal-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src={IMAGES.promise}
              alt="Interior detail"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-dark mb-4">{t('label')}</p>
            <h2 className="text-3xl md:text-5xl font-display font-light text-dark tracking-tight mb-8">
              {t('title')}
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-12">
              {t('text')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8">
              {statKeys.map((key) => (
                <div key={key} className="border-l-2 border-gold/30 pl-6">
                  <div className="text-2xl md:text-3xl font-display font-light text-gold-dark mb-1 tabular-nums">
                    {t(`stats.${key}.value`)}
                  </div>
                  <div className="text-xs uppercase tracking-[0.15em] text-neutral-500">
                    {t(`stats.${key}.label`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
