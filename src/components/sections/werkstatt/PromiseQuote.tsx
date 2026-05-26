'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import TextureLayer from '@/components/visual/TextureLayer';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

/**
 * PromiseQuote — Cinematic Pull-Quote mit full-bleed Atelier-Image.
 *
 * Anti-Template-Move: ein Promise-Statement nicht als isolierte Text-Zeile,
 * sondern als cinematic Moment mit Image-Background, Founder-Signatur,
 * subtle scroll-driven Parallax.
 *
 * Motion (Emil):
 * - Background parallax (translateY based on scroll position, slow)
 * - Fade-up reveal on enter
 * - Stagger: quote → signature, 200ms apart
 * - prefers-reduced-motion: jump
 */

const HERO_IMAGE = '/assets/werkstatt/werkstatt-promise-bg-placeholder.webp';

export default function PromiseQuote() {
  const t = useTranslations('workshop');
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(reduced);

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
      { rootMargin: '0px 0px -15% 0px', threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // Parallax on background image — subtle, only when in viewport range
  useEffect(() => {
    if (reduced) return;
    const wrap = imageWrapRef.current;
    const section = sectionRef.current;
    if (!wrap || !section) return;

    let raf = 0;
    let ticking = false;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      // -1 (above viewport) → 0 (centered) → 1 (below viewport)
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      const offset = progress * -60; // -60px to +60px, subtle
      wrap.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.12)`;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-shadow"
      aria-labelledby="promise-label"
    >
      {/* Background image with parallax */}
      <div ref={imageWrapRef} className="absolute inset-0 will-change-transform" style={{ transform: 'scale(1.12)' }}>
        <Image
          src={HERO_IMAGE}
          alt={t('promise.imageAlt')}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Overlays — darken + warm gradient for type contrast */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, color-mix(in oklab, var(--color-shadow) 55%, transparent) 0%, color-mix(in oklab, var(--color-shadow) 70%, transparent) 60%, color-mix(in oklab, var(--color-shadow) 92%, transparent) 100%)',
        }}
      />
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <TextureLayer variant="film" opacity={0.08} />
      </div>

      {/* Subtle gold-accent vertical line at left edge — editorial-anchor */}
      <div
        aria-hidden
        className="absolute left-6 md:left-10 lg:left-14 top-1/4 bottom-1/4 w-px bg-gold/30 pointer-events-none"
      />

      <div
        className="relative px-6 md:px-10 lg:px-14 py-28 md:py-40 lg:py-56"
        style={{ zIndex: 2 }}
      >
        <div className="mx-auto max-w-[1500px]">
          <div
            className={`transition-[opacity,transform] duration-1000 ${
              shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
          >
            <div className="flex items-baseline gap-4 mb-12 md:mb-16">
              <span aria-hidden className="block h-px w-10 bg-gold/70" />
              <p
                id="promise-label"
                className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-gold"
                style={{ fontWeight: 500 }}
              >
                {t('promise.label')}
              </p>
            </div>

            <blockquote
              className="font-display italic text-on-shadow leading-[1.05] tracking-[-0.02em] max-w-[24ch]"
              style={{
                fontWeight: 300,
                fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
              }}
            >
              {t('riskReversal')}
            </blockquote>
          </div>

          {/* Signature — staggered */}
          <div
            className={`mt-14 md:mt-20 flex items-center gap-4 transition-[opacity,transform] duration-1000 ${
              shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
              transitionDelay: shown ? '200ms' : '0ms',
            }}
          >
            <svg viewBox="0 0 80 24" className="h-6 w-20" aria-hidden>
              <path
                d="M 4 16 Q 14 4, 22 12 Q 28 18, 36 12 Q 44 6, 52 14 Q 60 20, 68 12 L 76 12"
                stroke="var(--color-gold)"
                strokeWidth="0.8"
                fill="none"
                opacity="0.7"
              />
            </svg>
            <p
              className="font-mono-spec text-[10px] uppercase tracking-[0.32em] text-on-shadow-muted"
              style={{ fontWeight: 500 }}
            >
              {t('promise.signature')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
