// One-shot optimizer for the three Schaufenster vehicle source PNGs.
// Source: /public/ChatGPT Image 23. Mai 2026, *.png (1774x887, ~1.8 MB)
// Target: /public/assets/vehicles/{vehicle-id}.webp (q=82, ~150-250 KB)
//
// Usage: node scripts/optimize-vehicle-images.mjs

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SOURCES = [
  {
    from: 'public/ChatGPT Image 23. Mai 2026, 21_49_09.png',
    to: 'public/assets/vehicles/aston-martin-dbs.webp',
  },
  {
    from: 'public/ChatGPT Image 23. Mai 2026, 21_49_12.png',
    to: 'public/assets/vehicles/ferrari-sf90-spider.webp',
  },
  {
    from: 'public/ChatGPT Image 23. Mai 2026, 21_49_15.png',
    to: 'public/assets/vehicles/porsche-panamera-turbo.webp',
  },
];

await mkdir(path.join(ROOT, 'public/assets/vehicles'), { recursive: true });

for (const { from, to } of SOURCES) {
  const src = path.join(ROOT, from);
  const dst = path.join(ROOT, to);
  const info = await sharp(src)
    .resize({ width: 1774, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(dst);
  console.log(`${to} → ${(info.size / 1024).toFixed(0)} KB (${info.width}×${info.height})`);
}
