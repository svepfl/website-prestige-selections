'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

/**
 * Reveal — Editorial entry animation triggered by IntersectionObserver.
 *
 * Single source of truth for the "fade-up on enter" pattern. Previously
 * duplicated identically across five section components. Respects reduced-
 * motion via `usePrefersReducedMotion` (shown immediately, no animation).
 *
 * Animation: 800ms opacity + 20px translateY, prestige easing.
 * Trigger: 10% threshold, 10% bottom-margin (fires before fully scrolled in).
 */
export default function Reveal({
  children,
  delayMs = 0,
  className = '',
}: {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  const visible = shown || reducedMotion;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 800ms cubic-bezier(0.65, 0, 0.35, 1) ${delayMs}ms, transform 800ms cubic-bezier(0.65, 0, 0.35, 1) ${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
