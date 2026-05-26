// Generic image optimizer — source → optimized WebP.
//
// Usage:
//   node scripts/optimize-image.mjs <source-path> <dest-path> [max-width]
//
// Example:
//   node scripts/optimize-image.mjs \
//     "public/markenwelt-source.png" \
//     "public/assets/atmospherics/markenwelt-burr-walnut.webp"
//
// Defaults: max-width 2400px (retina-ready), quality 82, effort 6.

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const [, , src, dst, maxWidthArg] = process.argv;

if (!src || !dst) {
  console.error('Usage: node scripts/optimize-image.mjs <source> <dest> [max-width]');
  process.exit(1);
}

const ROOT = path.resolve(import.meta.dirname, '..');
const srcPath = path.isAbsolute(src) ? src : path.join(ROOT, src);
const dstPath = path.isAbsolute(dst) ? dst : path.join(ROOT, dst);
const maxWidth = maxWidthArg ? parseInt(maxWidthArg, 10) : 2400;

await mkdir(path.dirname(dstPath), { recursive: true });

const info = await sharp(srcPath)
  .resize({ width: maxWidth, withoutEnlargement: true })
  .webp({ quality: 82, effort: 6 })
  .toFile(dstPath);

const relDst = path.relative(ROOT, dstPath);
console.log(`${relDst} → ${(info.size / 1024).toFixed(0)} KB (${info.width}×${info.height})`);
