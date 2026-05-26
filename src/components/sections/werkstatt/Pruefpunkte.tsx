'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import TextureLayer from '@/components/visual/TextureLayer';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

/**
 * Pruefpunkte — Signature-Mechanism der Werkstatt-Page.
 *
 * Massive Zahl-Reveal mit Stagger-Breakdown in 4 Kategorien.
 * Scroll-getrieben via IntersectionObserver. Once-only.
 *
 * Motion-Design (Emil-Curve):
 * - Countup über 1400ms mit ease-out cubic-bezier(0.23, 1, 0.32, 1)
 * - Stagger 80ms zwischen den 4 Kategorien
 * - Reveal: transform + opacity only (GPU-accelerated)
 * - prefers-reduced-motion: jump auf Final-Werte, kein Animation
 *
 * Background-Structures:
 * - Subtle technical-grid (CSS-only)
 * - TextureLayer dust-grain
 * - Watermark mono-spec "ATELIER · 142" Tieftext
 */

const CATEGORIES = [
  { key: 'engine', count: 47 },
  { key: 'chassis', count: 38 },
  { key: 'body', count: 31 },
  { key: 'interior', count: 26 },
] as const;
const TOTAL = 142;

export default function Pruefpunkte() {
  const tInspect = useTranslations('workshop.inspection');
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(reduced);
  const [currentNumber, setCurrentNumber] = useState(reduced ? TOTAL : 0);
  const [categoryNumbers, setCategoryNumbers] = useState<number[]>(
    reduced ? CATEGORIES.map((c) => c.count) : CATEGORIES.map(() => 0),
  );

  useEffect(() => {
    if (reduced) return;
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!shown || reduced) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1400;

    const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuint(progress);
      setCurrentNumber(Math.round(TOTAL * eased));
      setCategoryNumbers(CATEGORIES.map((c) => Math.round(c.count * eased)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative px-6 md:px-10 lg:px-14 py-28 md:py-40 overflow-hidden bg-shadow text-on-shadow"
      aria-labelledby="pruefpunkte-label"
    >
      {/* Background-Image — Inspection in Action */}
      <Image
        src="/assets/werkstatt/werkstatt-wartung-hero-placeholder.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover"
        style={{ opacity: 0.45 }}
      />

      {/* Darken-Gradient für Text-Legibility */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, color-mix(in oklab, var(--color-shadow) 78%, transparent) 0%, color-mix(in oklab, var(--color-shadow) 85%, transparent) 50%, color-mix(in oklab, var(--color-shadow) 92%, transparent) 100%)',
        }}
      />

      {/* Film grain für Atmosphäre */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <TextureLayer variant="film" opacity={0.08} />
      </div>

      {/* Watermark — Massive "142" als visual anchor */}
      <div
        aria-hidden
        className="absolute -right-12 md:-right-24 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(20rem, 36vw, 50rem)',
          lineHeight: 0.85,
          color: 'var(--color-on-shadow)',
          opacity: 0.05,
          letterSpacing: '-0.05em',
        }}
      >
        142
      </div>

      <div className="relative mx-auto max-w-[1500px]" style={{ zIndex: 2 }}>
        {/* Label */}
        <div
          className={`flex items-baseline gap-4 mb-14 md:mb-20 transition-[opacity,transform] duration-700 ${
            shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
        >
          <span aria-hidden className="block h-px w-10 bg-gold/70" />
          <p
            id="pruefpunkte-label"
            className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold"
            style={{ fontWeight: 500 }}
          >
            {tInspect('label')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 lg:gap-x-16 gap-y-16">
          {/* Left — Massive number + headline */}
          <div className="lg:col-span-7">
            <div
              className={`transition-[opacity,transform] duration-1000 ${
                shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                transitionDelay: shown ? '100ms' : '0ms',
              }}
            >
              <span
                aria-label={`${TOTAL} Prüfpunkte`}
                className="font-sans block tabular-nums text-on-shadow leading-none tracking-[-0.04em]"
                style={{
                  fontWeight: 700,
                  fontSize: 'clamp(7rem, 16vw, 16rem)',
                }}
              >
                {currentNumber}
              </span>
              <h2
                className="mt-6 font-display italic text-on-shadow leading-[1.05] tracking-[-0.02em] max-w-[16ch]"
                style={{
                  fontWeight: 300,
                  fontSize: 'clamp(1.75rem, 3.6vw, 2.875rem)',
                }}
              >
                {tInspect('headline')}
              </h2>
              <p
                className="mt-8 font-sans text-base md:text-lg text-on-shadow/85 leading-[1.65] max-w-[52ch]"
                style={{ fontWeight: 400 }}
              >
                {tInspect('body')}
              </p>
            </div>
          </div>

          {/* Right — Category breakdown */}
          <div className="lg:col-span-5">
            <ul className="divide-y divide-on-shadow/15 border-t border-b border-on-shadow/15">
              {CATEGORIES.map((cat, i) => (
                <li
                  key={cat.key}
                  className={`grid grid-cols-[1fr_auto] items-baseline gap-6 py-6 md:py-7 transition-[opacity,transform] duration-700 ${
                    shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                    transitionDelay: shown ? `${300 + i * 80}ms` : '0ms',
                  }}
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span
                      className="font-mono-spec tabular-nums text-[11px] uppercase tracking-[0.32em] text-gold shrink-0"
                      style={{ fontWeight: 500 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="font-sans text-on-shadow leading-tight tracking-[-0.01em] truncate"
                      style={{ fontWeight: 500, fontSize: 'clamp(0.9375rem, 1.2vw, 1.125rem)' }}
                    >
                      {tInspect(`cat${i + 1}` as 'cat1')}
                    </span>
                  </div>
                  <span
                    className="font-mono-spec tabular-nums text-on-shadow"
                    style={{
                      fontWeight: 500,
                      fontSize: 'clamp(1.5rem, 2vw, 2rem)',
                    }}
                  >
                    {categoryNumbers[i]}
                  </span>
                </li>
              ))}
              <li
                className={`grid grid-cols-[1fr_auto] items-baseline gap-6 py-6 md:py-7 transition-[opacity,transform] duration-700 ${
                  shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                  transitionDelay: shown ? `${300 + CATEGORIES.length * 80 + 80}ms` : '0ms',
                }}
              >
                <span
                  className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold"
                  style={{ fontWeight: 500 }}
                >
                  {tInspect('sumLabel')}
                </span>
                <span
                  className="font-display italic text-gold tabular-nums leading-none"
                  style={{
                    fontWeight: 300,
                    fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                  }}
                >
                  {currentNumber}
                </span>
              </li>
            </ul>

            <p
              className={`mt-10 font-mono-spec text-[10px] uppercase tracking-[0.28em] text-on-shadow-muted leading-[1.8] max-w-[40ch] transition-opacity duration-1000 ${
                shown ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                fontWeight: 500,
                transitionDelay: shown ? '900ms' : '0ms',
              }}
            >
              {tInspect('footnote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
