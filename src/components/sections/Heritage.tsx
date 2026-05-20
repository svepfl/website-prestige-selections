'use client';

import { useTranslations } from 'next-intl';

const years = ['2026', '2022', '2015', '2013', '2012'] as const;

export default function Heritage() {
  const t = useTranslations('heritage');

  return (
    <section className="relative py-24 md:py-32 bg-dark-secondary grain">
      <div className="max-w-7xl mx-auto px-6 reveal-content">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">{t('label')}</p>
          <h2 className="text-3xl md:text-5xl font-display font-light text-white tracking-tight">
            {t('title')}
          </h2>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {years.map((year, i) => (
            <div key={year} className="relative flex gap-8 pb-12 last:pb-0">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-gold flex-shrink-0" />
                {i < years.length - 1 && (
                  <div className="w-px flex-1 bg-dark-border" />
                )}
              </div>

              {/* Content */}
              <div className="pb-2 -mt-1">
                <span className="text-xs uppercase tracking-[0.2em] text-gold mb-1 block">
                  {year}
                </span>
                <h3 className="text-lg font-light text-white mb-1">
                  {t(`milestones.${year}.title`)}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {t(`milestones.${year}.text`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
