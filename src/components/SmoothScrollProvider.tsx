'use client';

import { ReactLenis } from 'lenis/react';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

/**
 * SmoothScrollProvider — Apple-tier butter-smooth scroll site-wide.
 *
 * Wraps the site with the official lenis/react `ReactLenis root` provider so
 * any descendant can subscribe via `useLenis()` and share the same rAF loop
 * (no double-rAF jank).
 *
 * - `root` mode: no DOM wrapper added → safe for SSR / hydration
 * - Native browser scrollbar is preserved (no hijack)
 * - `syncTouch: false` keeps native iOS rubber-band + 120 Hz momentum
 * - Reduced-motion → native scroll, no Lenis interpolation at all
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.4,
      }}
    >
      {children}
    </ReactLenis>
  );
}
