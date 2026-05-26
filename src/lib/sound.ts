'use client';

import { Howl } from 'howler';

/**
 * Sound-Design — Howler.js wrapper.
 *
 * 3 Audio-Cues:
 * - hover     — kurzer Tick bei CTA-Hover
 * - click     — Click-Confirmation
 * - transition— Page-Transition Whoosh
 *
 * Default: OFF. User aktiviert via Mute-Toggle.
 * Audio-Assets müssen in /public/assets/sound/ liegen.
 * Fehlende Files = silent failure (Howler), Site funktioniert weiter.
 *
 * V1: Audio-Files sind Placeholders — User droppt Real-Sounds später ein.
 */

type CueName = 'hover' | 'click' | 'transition';

const SOUND_FILES: Record<CueName, string> = {
  hover: '/assets/sound/hover.mp3',
  click: '/assets/sound/click.mp3',
  transition: '/assets/sound/transition.mp3',
};

let sounds: Partial<Record<CueName, Howl>> | null = null;
let enabled = false;
const STORAGE_KEY = 'prestige-sound-enabled';

export function initSounds() {
  if (typeof window === 'undefined') return;
  if (sounds) return;

  // Read user-preference from localStorage
  try {
    enabled = window.localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    enabled = false;
  }

  // Don't init if reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sounds = {};
    return;
  }

  sounds = {
    hover: new Howl({ src: [SOUND_FILES.hover], volume: 0.15, preload: false }),
    click: new Howl({ src: [SOUND_FILES.click], volume: 0.25, preload: false }),
    transition: new Howl({ src: [SOUND_FILES.transition], volume: 0.2, preload: false }),
  };
}

export function play(cue: CueName) {
  if (!enabled || !sounds) return;
  sounds[cue]?.play();
}

export function isEnabled(): boolean {
  return enabled;
}

export function setEnabled(value: boolean) {
  enabled = value;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, value ? '1' : '0');
    } catch {
      // ignore storage errors
    }
  }
}

export function toggleEnabled(): boolean {
  setEnabled(!enabled);
  return enabled;
}
