/**
 * TextureLayer — atmosphärischer Grain-Overlay für Sections
 *
 * Anti-Template-Move: bricht das "flat color + type" Pattern, das alle
 * AI-built Editorial-Sites verraten. Nutzt SVG fractalNoise als
 * data-URI (kein HTTP-Request, kein Asset-File).
 *
 * 3 Varianten:
 *   - film     → fein, monochrom, für Dark-Cinema-Sections
 *   - dust     → mittel, leicht warm, für Atelier-/Werkstatt-Atmosphäre
 *   - paper    → grob, warm-gelblich, für Light-Editorial-Sections
 *
 * Performance: 1 absolute-positioned Layer pro Section, 200×200 tiled,
 * mix-blend-mode overlay → quasi GPU-frei. Reduced-Motion-safe (static).
 *
 * Usage:
 *   <section className="relative bg-shadow ...">
 *     <TextureLayer variant="film" opacity={0.07} />
 *     ...
 *   </section>
 */

type Variant = 'film' | 'dust' | 'paper';

const NOISE_SVG: Record<Variant, string> = {
  // Fine monochromatic — 35mm film stock vibe
  film: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' seed='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>`,
  // Medium with subtle warmth — Atelier dust
  dust: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix values='0.08 0 0 0 0  0.06 0 0 0 0  0.03 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>`,
  // Coarse with warm yellow tint — archive paper
  paper: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.48' numOctaves='2' seed='13' stitchTiles='stitch'/><feColorMatrix values='0.12 0 0 0 0  0.10 0 0 0 0  0.05 0 0 0 0  0 0 0 0.5 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>`,
};

const BLEND: Record<Variant, string> = {
  film: 'overlay',
  dust: 'overlay',
  paper: 'multiply',
};

export default function TextureLayer({
  variant = 'film',
  opacity = 0.06,
  size = 220,
}: {
  variant?: Variant;
  /** 0.03 – 0.12 ideal. Lower for hero, higher for atmosphere. */
  opacity?: number;
  /** Tile size in px. Larger = bigger grain. */
  size?: number;
}) {
  const dataUri = `url("data:image/svg+xml;utf8,${NOISE_SVG[variant]}")`;
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: dataUri,
        backgroundSize: `${size}px ${size}px`,
        opacity,
        mixBlendMode: BLEND[variant] as 'overlay' | 'multiply',
        zIndex: 1,
      }}
    />
  );
}
