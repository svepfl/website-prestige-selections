'use client';

import { useSyncExternalStore } from 'react';

/**
 * usePrefersReducedMotion — subscribe to the OS `prefers-reduced-motion`
 * media query via `useSyncExternalStore` (React 19 idiom).
 *
 * Replaces the legacy `useEffect(() => setShown(matchMedia(...).matches), [])`
 * pattern that triggers the new `react-hooks/set-state-in-effect` lint rule.
 * Returns the live value AND reacts to runtime OS preference changes (which
 * the old pattern didn't).
 *
 * SSR-safe: `getServerSnapshot` returns `false`, so motion plays by default
 * during render-on-server. Hydration corrects to the actual value.
 */

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
