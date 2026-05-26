'use client';

import { useEffect, useState } from 'react';
import { initSounds, isEnabled, toggleEnabled } from '@/lib/sound';

/**
 * SoundToggle — Mute/Unmute global control.
 *
 * Default OFF. User aktiviert. Persists in localStorage.
 * Position: bottom-left, discreet. Visible only when sound is opt-in-able
 * (not on touch / reduced-motion devices).
 */

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || reduced) return;
    initSounds();
    // Defer setState off the effect commit (React 19 idiom)
    const raf = requestAnimationFrame(() => {
      setEnabled(isEnabled());
      setShow(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!show) return null;

  const onToggle = () => {
    const next = toggleEnabled();
    setEnabled(next);
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      aria-label={enabled ? 'Sound ausschalten' : 'Sound einschalten'}
      className="fixed bottom-6 left-6 z-[60] w-10 h-10 rounded-full bg-canvas-raised/90 backdrop-blur-sm shadow-card-rest hover:shadow-card-hover transition-[box-shadow,transform] duration-300 active:translate-y-px focus-ring flex items-center justify-center"
      style={{
        border: '1px solid rgba(26, 22, 18, 0.08)',
      }}
    >
      {enabled ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-ink">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-ink-muted">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
}
