import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import TextureLayer from '@/components/visual/TextureLayer';

/**
 * 404 — Editorial-tier voice + design system tokens.
 *
 * Mikrocopy aus copy-voice.md (kanonischer Satz):
 *   "Diese Seite existiert nicht. Aber dreißig andere schon."
 *
 * Layout: dark Section, monumental Numeral, editorial line, zwei mono-Links
 * (Startseite + Kollektion) statt eines rounded-full CTAs. Konsistent mit
 * dem Editorial-Register der Hauptseiten.
 */

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="relative min-h-[100dvh] bg-shadow text-on-shadow overflow-hidden flex items-center">
      <TextureLayer variant="paper" opacity={0.05} />

      {/* Off-center gold radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 30% 50%, rgba(196, 154, 12, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full px-6 md:px-10 lg:px-14 py-20 md:py-24" style={{ zIndex: 2 }}>
        <div className="mx-auto max-w-[1500px]">
          {/* Mono prelude */}
          <div className="flex items-center gap-3 mb-10 md:mb-14">
            <span aria-hidden className="block h-px w-10 bg-gold/70" />
            <span
              className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-on-shadow-muted"
              style={{ fontWeight: 500 }}
            >
              {t('label')}
            </span>
          </div>

          {/* Monumental numeral — Newsreader italic, gold */}
          <p
            aria-hidden
            className="font-display italic text-gold leading-[0.85] tracking-[-0.04em]"
            style={{
              fontWeight: 300,
              fontSize: 'clamp(7rem, 22vw, 18rem)',
            }}
          >
            404
          </p>

          {/* Editorial line */}
          <h1
            className="mt-8 md:mt-10 font-display italic text-on-shadow leading-[1.15] tracking-[-0.015em] max-w-[28ch]"
            style={{
              fontWeight: 300,
              fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
            }}
          >
            {t('text')}
          </h1>

          {/* Two return paths — mono-text-links, kein Pill-Button */}
          <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-x-10 gap-y-5">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 font-mono-spec text-[11px] uppercase tracking-[0.28em] text-gold hover:text-on-shadow transition-colors duration-300 focus-ring rounded-sm active:translate-y-px"
              style={{ fontWeight: 500 }}
            >
              <span className="relative inline-block">
                {t('ctaHome')}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gold origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
                />
              </span>
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/fahrzeuge"
              className="group inline-flex items-center gap-3 font-mono-spec text-[11px] uppercase tracking-[0.28em] text-on-shadow-muted hover:text-on-shadow transition-colors duration-300 focus-ring rounded-sm active:translate-y-px"
              style={{ fontWeight: 500 }}
            >
              <span className="relative inline-block">
                {t('ctaCollection')}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-px bg-on-shadow-muted/70 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
                />
              </span>
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
