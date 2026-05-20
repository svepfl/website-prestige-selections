'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { IMAGES } from '@/data/images';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const indicator = indicatorRef.current;
    if (!section || !image || !content || !indicator) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;

        // Only animate while hero is in view
        if (rect.bottom <= 0 || rect.top >= sectionHeight) {
          ticking = false;
          return;
        }

        // scrollProgress: 0 (top) → 1 (fully scrolled past)
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / sectionHeight));

        // Image: scale from 1.0 → 1.15 as user scrolls
        const scale = 1 + scrollProgress * 0.15;
        image.style.transform = `scale(${scale})`;

        // Content: fade out and move up as user scrolls
        const contentOpacity = Math.max(0, 1 - scrollProgress * 2.5);
        const contentTranslate = scrollProgress * -60;
        content.style.opacity = String(contentOpacity);
        content.style.transform = `translateY(${contentTranslate}px)`;

        // Scroll indicator: fade out quickly
        const indicatorOpacity = Math.max(0, 1 - scrollProgress * 5);
        indicator.style.opacity = String(indicatorOpacity);

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden grain"
    >
      {/* Background image — scroll-driven zoom */}
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <Image
          src={IMAGES.hero.main}
          alt="Luxury sports car in showroom"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark/95" />

      {/* Content — fades out on scroll */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center will-change-[transform,opacity]"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6 animate-fade-in">
          {t('subtitle')}
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-light tracking-tight text-white mb-10 animate-fade-in-up">
          {t('titleLine1')}
          <br />
          <span className="text-gold">{t('titleLine2')}</span>
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
          <Link
            href="/fahrzeuge"
            className="inline-flex items-center gap-3 bg-gold text-dark px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-gold-light transition-colors duration-300"
          >
            {t('cta')}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full text-sm tracking-widest uppercase hover:border-white/40 transition-colors duration-300"
          >
            {t('ctaSecondary')}
          </Link>
        </div>
      </div>

      {/* Scroll indicator — fades out first */}
      <div
        ref={indicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold/50" />
      </div>
    </section>
  );
}
