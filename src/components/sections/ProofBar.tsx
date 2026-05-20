'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, duration: number, isVisible: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }

    let start = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out-expo curve for natural deceleration
      const eased = 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * target);

      if (current !== start) {
        start = current;
        setCount(current);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration, isVisible]);

  return count;
}

export default function ProofBar() {
  const t = useTranslations('proofBar');
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const vehicles = useCountUp(900, 1800, isVisible);
  const year = useCountUp(2012, 1200, isVisible);
  const specialists = useCountUp(5, 800, isVisible);
  const brands = useCountUp(7, 1000, isVisible);

  const stats = [
    { value: `${vehicles}+`, label: t('vehicles') },
    { value: String(year), label: t('since') },
    { value: String(specialists), label: t('specialists') },
    { value: String(brands), label: t('brands') },
  ];

  return (
    <section className="bg-dark-secondary border-y border-dark-border">
      <div ref={ref} className="max-w-7xl mx-auto px-6 py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-light text-gold tabular-nums mb-1">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-[0.15em] text-neutral-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
