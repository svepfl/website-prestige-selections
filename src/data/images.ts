function pexels(id: number, w = 1920) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}

export const IMAGES = {
  hero: {
    main: pexels(26954165),
    secondary: pexels(5397410),
    mobile: pexels(33345481),
  },
  // Akt 1 — Tor-Reveal Video Assets
  // Video wird via scroll-driven scrubbing abgespielt — siehe TorReveal.tsx
  // Pfade direkt im Component, hier nur Referenz:
  // /assets/videos/tor-reveal.mp4         — Haupt-Video (6MB H.264 4K 24fps 5s)
  // /assets/videos/tor-reveal-poster.jpg  — Poster (erstes Frame, ~340KB)
  // /assets/videos/tor-reveal-end.jpg     — End-Frame Still (Reduced-Motion-Fallback)

  // Akt 2 — Wochen-Schaufenster
  // V1: nutzt End-Frame des Tor-Videos für visuelle Kontinuität
  // V1.5: dediziertes Foto des Wochen-Fahrzeugs (Close-Up des selben Autos)
  weeklyFeature: '/assets/videos/tor-reveal-end.jpg',
  featured: {
    sportscar1: pexels(30453079, 800),
    sportscar2: pexels(29831790, 800),
    sportscar3: pexels(17077313, 800),
    classic1: pexels(4645506, 800),
    classic2: pexels(10373439, 800),
    luxury1: pexels(17632052, 800),
    luxury2: pexels(15097792, 800),
    dark1: pexels(33345481, 800),
    dark2: pexels(33268786, 800),
    dark3: pexels(26954165, 800),
    interior1: pexels(3894066, 800),
    showroom1: pexels(35113538, 800),
  },
  services: {
    kaufen: pexels(17632052),
    werkstatt: pexels(8985462),
    aufbereitung: pexels(14231684),
  },
  promise: pexels(3894066),
  heritage: pexels(4645506),
  contact: pexels(35113538),
  werkstattPage: pexels(8985462),
  werkstattDetail: pexels(14231701),
  about: pexels(15097792),
} as const;

// Per-vehicle atelier photography (AI Phase-1-placeholders per Rule 13 —
// Hasselblad-tier brass-pendant Atelier setup, 5:4 landscape, see
// KONZEPT/vehicle-image-prompts.md for the GPT-Image-2 prompts).
//
// Filename-convention: {vehicle-id}-placeholder.webp · suffix means
// "will be 1:1 replaced by real shoot in Phase 2" (Rule 13 Production-
// Swap-Garantie — no code change required when real photos arrive).
const VEHICLE_IMAGE_BY_ID: Record<string, string> = {
  'aston-martin-dbs': '/assets/vehicles/aston-martin-dbs-placeholder.webp',
  'bentley-bentayga-w12': '/assets/vehicles/bentley-bentayga-w12-placeholder.webp',
  'bentley-gtc-v8-azure': '/assets/vehicles/bentley-gtc-v8-azure-placeholder.webp',
  'ferrari-sf90-spider': '/assets/vehicles/ferrari-sf90-spider-placeholder.webp',
  'ferrari-330-gtc': '/assets/vehicles/ferrari-330-gtc-placeholder.webp',
  'ferrari-f430-spider': '/assets/vehicles/ferrari-f430-spider-placeholder.webp',
  'ferrari-f8-spider': '/assets/vehicles/ferrari-f8-spider-placeholder.webp',
  'ferrari-812-gts': '/assets/vehicles/ferrari-812-gts-placeholder.webp',
  'ferrari-f12-nlargo': '/assets/vehicles/ferrari-f12-nlargo-placeholder.webp',
  'ferrari-365-daytona': '/assets/vehicles/ferrari-365-daytona-placeholder.webp',
  'ferrari-400gt-cabrio': '/assets/vehicles/ferrari-400gt-cabrio-placeholder.webp',
  'ferrari-12cilindri': '/assets/vehicles/ferrari-12cilindri-placeholder.webp',
  'maserati-mc20': '/assets/vehicles/maserati-mc20-placeholder.webp',
  'porsche-panamera-turbo': '/assets/vehicles/porsche-panamera-turbo-placeholder.webp',
  'rolls-royce-ghost': '/assets/vehicles/rolls-royce-ghost-placeholder.webp',
  // Pending Phase-1-AI (kein Image generiert) — fallen back via manufacturer:
  //   lamborghini-urus-se
  //   maserati-granturismo-trofeo
  //   rolls-royce-cullinan
};

// Manufacturer-tier fallback (Pexels) — used until per-vehicle photos exist.
const VEHICLE_PLACEHOLDER_MAP: Record<string, string> = {
  "ASTON MARTIN": pexels(33345481, 800),
  BENTLEY: pexels(17632052, 800),
  FERRARI: pexels(30453079, 800),
  LAMBORGHINI: pexels(33268786, 800),
  MASERATI: pexels(29831790, 800),
  PORSCHE: pexels(26954165, 800),
  "ROLLS ROYCE": pexels(15097792, 800),
};

export const DEFAULT_VEHICLE_PLACEHOLDER = pexels(30453079, 800);

export function getVehiclePlaceholder(
  manufacturer: string,
  vehicleId?: string,
): string {
  const perVehicle = vehicleId ? VEHICLE_IMAGE_BY_ID[vehicleId] : undefined;
  if (perVehicle) return perVehicle;
  return VEHICLE_PLACEHOLDER_MAP[manufacturer.toUpperCase()] ?? DEFAULT_VEHICLE_PLACEHOLDER;
}

export const VEHICLE_PLACEHOLDERS: Record<string, string> = VEHICLE_PLACEHOLDER_MAP;

/**
 * Vehicle Cutout Paths — freigestellte (background-removed) PNGs.
 *
 * Drop processed PNGs into `/public/assets/cutouts/{vehicle-id}.png`
 * (e.g. aston-martin-dbs.png). PNG with transparency, ~1600×900px,
 * <500 KB ideal. Workflow: remove.bg → optional cleanup → place file.
 *
 * If the cutout PNG is absent the Hero falls back to the standard
 * VEHICLE_PLACEHOLDER on a canvas-soft card surface.
 */
export const VEHICLE_CUTOUT_PATH = (vehicleId: string) =>
  `/assets/cutouts/${vehicleId}.png`;

/** Featured vehicles for the /fahrzeuge Stage-Cards Hero (5 slots, ordered). */
export const COLLECTION_HERO_IDS = [
  "aston-martin-dbs",
  "ferrari-sf90-spider",
  "porsche-panamera-turbo",
  "maserati-mc20",
  "rolls-royce-cullinan",
] as const;
