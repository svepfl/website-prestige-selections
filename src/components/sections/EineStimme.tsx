'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import TextureLayer from '@/components/visual/TextureLayer';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

/**
 * AKT II — Eine Stimme · Bento-Card-Layout (2026 Premium)
 *
 * 3-Card-Bento-Komposition:
 *   1. Quote-Card (2/3) — Geist Bold UPPERCASE Quote + Byline
 *   2. Portrait-Card (1/3) — Photo-Background, Caption-Overlay
 *   3. 4 Stats-Cards (Grid) — Number + Label
 *   4. Editorial-Link-Card (full-width) — kurzer Bio + Link
 *
 * Apple-Tier Surfaces: bg-shadow-soft, kein Border, generous padding.
 * GSAP Stagger-Reveal beim Viewport-Entry.
 */

const HAS_FOUNDER_PHOTO = true;
const FOUNDER_PHOTO_PATH = '/assets/founder/sven-pflueger.webp';

function CountUp({
  target, suffix = '', durationMs = 1800, trigger,
}: {
  target: number;
  suffix?: string;
  durationMs?: number;
  trigger: boolean;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [n, setN] = useState(0);
  const fired = useRef(false);

  useEffect(() => {
    if (!trigger || fired.current) return undefined;
    fired.current = true;
    if (reducedMotion) {
      // Defer the final-value snap off the effect commit (React 19 idiom)
      const raf = requestAnimationFrame(() => setN(target));
      return () => cancelAnimationFrame(raf);
    }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return undefined;
  }, [trigger, target, durationMs, reducedMotion]);

  return <span className="tabular-nums">{n.toLocaleString('de-DE')}{suffix}</span>;
}

function FounderPortrait({ alt }: { alt: string }) {
  if (HAS_FOUNDER_PHOTO) {
    return (
      <Image
        src={FOUNDER_PHOTO_PATH}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 35vw"
        className="object-cover object-center"
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className="absolute inset-0 bg-gradient-to-b from-canvas-raised via-canvas-soft to-canvas-raised flex items-end justify-start p-8"
    >
      <div aria-hidden className="absolute inset-0 grain pointer-events-none opacity-[0.04]" />
      {/* Subtle monogram bottom-left as placeholder identifier */}
      <span
        aria-hidden
        className="font-display text-[clamp(2rem,3.5vw,3rem)] text-ink-muted/40 tracking-[-0.02em] leading-none"
        style={{ fontStyle: 'italic', fontWeight: 300 }}
      >
        J · G
      </span>
    </div>
  );
}

export default function EineStimme() {
  const t = useTranslations('eineStimme');
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const quoteCardRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLParagraphElement>(null);
  const portraitCardRef = useRef<HTMLDivElement>(null);
  const statsRowRef = useRef<HTMLDivElement>(null);
  const editorialCardRef = useRef<HTMLDivElement>(null);
  const [statsTrigger, setStatsTrigger] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === 'undefined') return;
    const section = sectionRef.current;
    const label = labelRef.current;
    const quote = quoteCardRef.current;
    const signature = signatureRef.current;
    const portrait = portraitCardRef.current;
    const stats = statsRowRef.current;
    const editorial = editorialCardRef.current;
    if (!section || !label || !quote || !portrait || !stats || !editorial) return;

    // Initial states — invisible + displaced
    gsap.set(label, { opacity: 0, y: 12 });
    gsap.set([quote, portrait], { opacity: 0, y: 40 });
    gsap.set(stats.children, { opacity: 0, y: 24 });
    gsap.set(editorial, { opacity: 0, y: 24 });
    // Signature — clip-path masks right-to-left (handwriting draw-in)
    if (signature) gsap.set(signature, { clipPath: 'inset(0 100% 0 0)' });

    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      paused: true,
    });

    tl
      .to(label, { opacity: 1, y: 0, duration: 0.6 })
      .to(quote, { opacity: 1, y: 0, duration: 1.0 }, '-=0.3')
      .to(portrait, { opacity: 1, y: 0, duration: 1.0 }, '-=0.7');

    // Signature draws in left-to-right after quote settles (handwriting effect)
    if (signature) {
      tl.to(
        signature,
        { clipPath: 'inset(0 0% 0 0)', duration: 1.8, ease: 'power2.out' },
        '-=0.5',
      );
    }

    tl
      .to(Array.from(stats.children), { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, '-=1.4')
      .to(editorial, { opacity: 1, y: 0, duration: 0.7 }, '-=0.2');

    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        tl.play();
        // CountUp läuft parallel zur GSAP-Reveal — keine 2.7s Wartezeit auf 0
        setStatsTrigger(true);
        io.disconnect();
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    io.observe(section);

    return () => {
      tl.kill();
      io.disconnect();
      gsap.set([label, quote, portrait, editorial], { clearProps: 'all' });
      gsap.set(Array.from(stats.children), { clearProps: 'all' });
    };
  }, [reducedMotion]);

  const founderSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://www.prestige-selections.com/#founder',
    name: t('founderName'),
    jobTitle: t('founderRole'),
    description: t('editorial'),
    worksFor: {
      '@type': 'AutoDealer',
      '@id': 'https://www.prestige-selections.com/#dealer',
      name: 'Sven Pflüger',
      foundingDate: '2012',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Schusterstraße 40',
        addressLocality: 'Freiburg im Breisgau',
        postalCode: '79098',
        addressCountry: 'DE',
      },
    },
    knowsAbout: ['Aston Martin', 'Bentley', 'Ferrari', 'Lamborghini', 'Maserati', 'Porsche', 'Rolls-Royce'],
    nationality: 'DE',
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-canvas-soft text-ink overflow-hidden"
      aria-labelledby="eine-stimme-label"
    >
      {/* Subtle warm tint from top */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(140, 109, 8, 0.06), transparent)',
        }}
      />
      <TextureLayer variant="paper" opacity={0.04} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema).replace(/</g, '\\u003c') }}
      />

      <div className="relative px-6 md:px-10 lg:px-14 py-24 md:py-32 lg:py-40" style={{ zIndex: 2 }}>
        <div className="mx-auto max-w-[1500px]">
          {/* Section-Label */}
          <div ref={labelRef}>
            <div className="flex items-center gap-3 font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold-deep">
              <span aria-hidden className="block h-px w-8 bg-gold-deep/70" />
              <span id="eine-stimme-label">{t('label')}</span>
              <span aria-hidden className="text-gold-deep/40">·</span>
              <span>{t('founderName')} · {t('founderRole')}</span>
            </div>
          </div>

          {/* BENTO ROW 1 — Quote-Card (2/3) + Portrait-Card (1/3) */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 md:gap-6">
            {/* Quote-Card · Patek-Magazine-Tier mit Engine-Turned-Texture + Ghost-Quote-Ornament */}
            <div
              ref={quoteCardRef}
              className="relative overflow-hidden bg-canvas-raised rounded-lg p-7 md:p-10 lg:p-12 flex flex-col justify-between min-h-[380px] md:min-h-[440px] lg:min-h-[480px]"
            >
              {/* Engine-Turned Watch-Dial Texture — luxury material backdrop */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'url(/assets/atmospherics/markenwelt-engine-turned.webp)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.05,
                  mixBlendMode: 'multiply',
                }}
              />

              <blockquote className="relative">
                <p
                  className="font-display text-ink leading-[1.05] tracking-[-0.015em]"
                  style={{ fontWeight: 400, fontSize: 'clamp(1.625rem, 3.6vw, 3rem)' }}
                >
                  <span className="block">«{t('quoteLine1')}</span>
                  <span className="block">{t('quoteLine2')}</span>
                  <span className="block">{t('quoteLine3')}»</span>
                </p>
              </blockquote>

              {/* Signature + Byline — bottom-right · Patek-Magazine sign-off pattern */}
              <div className="relative mt-12 flex flex-col items-end text-right">
                {/* Handwritten Signature — clip-path draw-in animation via GSAP */}
                <p
                  ref={signatureRef}
                  aria-hidden
                  className="font-display italic text-gold-deep leading-[0.95]"
                  style={{
                    fontWeight: 300,
                    fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                    letterSpacing: '-0.025em',
                    transform: 'rotate(-3deg)',
                    transformOrigin: 'right center',
                    willChange: 'clip-path',
                  }}
                >
                  {t('founderName')}
                </p>
                {/* Byline — role + hairline */}
                <div className="mt-4 md:mt-5 flex items-baseline gap-3">
                  <span
                    className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-ink-muted"
                    style={{ fontWeight: 500 }}
                  >
                    {t('founderName')} · {t('founderRole')}
                  </span>
                  <span aria-hidden className="block h-px w-8 bg-ink-muted/40" />
                </div>
              </div>
            </div>

            {/* Portrait-Card — Image groß auf der Card platziert,
                überlappt Card-Surface von oben.
                Card-Surface 120/150px (= Stats-Card-Höhe) am bottom.
                Image reicht ins Innere der Card hinein. */}
            <div
              ref={portraitCardRef}
              className="relative w-full aspect-[3/4] md:aspect-auto md:min-h-[380px] lg:min-h-[440px] xl:min-h-[480px]"
            >
              {/* Card surface — fixe Höhe wie Stats-Cards */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[120px] md:h-[150px] bg-canvas-raised rounded-lg"
              />

              {/* Image — reicht von -5% (über Cell) bis 60-80px from Cell-bottom,
                  überlappt Card-Surface oben. */}
              <div className="absolute inset-0 pointer-events-none">
                {HAS_FOUNDER_PHOTO ? (
                  <div
                    className="absolute inset-x-0 -top-[5%] bottom-[60px] md:bottom-[80px]"
                    style={{
                      filter:
                        'drop-shadow(0 24px 36px rgba(26, 22, 18, 0.22))',
                    }}
                  >
                    <Image
                      src={FOUNDER_PHOTO_PATH}
                      alt={t('founderImageAlt')}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-contain object-bottom"
                    />
                  </div>
                ) : (
                  <div className="absolute top-0 inset-x-0 bottom-[60px] md:bottom-[80px] overflow-hidden rounded-lg">
                    <FounderPortrait alt={t('founderImageAlt')} />
                  </div>
                )}
              </div>

              {/* Cut-marker: subtle Strich über die volle Card-Breite am unteren
                  Bildrand — visualisiert den Bildschnitt als bewusste Geste */}
              <div
                aria-hidden
                className="absolute bottom-[60px] md:bottom-[80px] inset-x-5 md:inset-x-6 h-px bg-ink/15 pointer-events-none z-[2]"
              />

              {/* Caption — unterer Bereich der Card-Surface, unter dem Image */}
              <div className="absolute bottom-0 inset-x-0 h-[60px] md:h-[80px] flex flex-col justify-center px-5 md:px-6">
                <p
                  className="font-sans text-ink text-base md:text-lg leading-tight"
                  style={{ fontWeight: 600 }}
                >
                  {t('founderName')}
                </p>
                <p className="mt-1 font-mono-spec text-[9px] md:text-[10px] uppercase tracking-[0.28em] text-ink-muted">
                  Schusterstraße · Freiburg
                </p>
              </div>
            </div>
          </div>

          {/* BENTO ROW 2 — 4 Stats-Cards */}
          <div
            ref={statsRowRef}
            className="mt-4 md:mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >

            <StatCard target={14} label={t('stat1Label')} trigger={statsTrigger} />
            <StatCard target={900} suffix="+" label={t('stat2Label')} trigger={statsTrigger} />
            <StatCard target={3} label={t('stat3Label')} trigger={statsTrigger} />
            <StatCard target={142} label={t('stat4Label')} trigger={statsTrigger} />
          </div>

          {/* Closer — minimal mono-link, kein Card-Wrapper, kein Body-Text.
              Trust-Strip + Editorial-Card wurden entfernt (Informationen
              standen mehrfach schon in Stats + Quote-Byline). Nur die
              Brücke zu /haus überlebt — als ruhiger Closer rechts. */}
          <div ref={editorialCardRef} className="mt-10 md:mt-14 flex justify-end">
            <Link
              href="/haus"
              className="group inline-flex items-center gap-3 font-mono-spec text-[11px] uppercase tracking-[0.28em] text-ink hover:text-gold-deep transition-colors duration-300 focus-ring rounded-sm active:translate-y-px"
              style={{ fontWeight: 600 }}
            >
              <span className="relative inline-block">
                {t('moreLink')}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gold-deep origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
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

function StatCard({
  target, label, suffix = '', trigger,
}: {
  target: number;
  label: string;
  suffix?: string;
  trigger: boolean;
}) {
  return (
    <div className="bg-canvas-raised rounded-lg p-5 md:p-6 flex flex-col justify-between min-h-[120px] md:min-h-[150px]">
      <span
        className="font-sans text-ink leading-none tracking-[-0.025em]"
        style={{ fontWeight: 700, fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)' }}
      >
        <CountUp target={target} suffix={suffix} trigger={trigger} />
      </span>
      <div className="mt-4">
        <span aria-hidden className="block h-px w-8 bg-gold-deep mb-3" />
        <p className="font-mono-spec text-[10px] uppercase tracking-[0.22em] text-ink-muted leading-snug">
          {label}
        </p>
      </div>
    </div>
  );
}
