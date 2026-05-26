import TorReveal from '@/components/sections/TorReveal';
import EineStimme from '@/components/sections/EineStimme';
import Schaufenster from '@/components/sections/Schaufenster';
import Markenwelt from '@/components/sections/Markenwelt';
import Services from '@/components/sections/Services';
import MidPageAnchor from '@/components/sections/MidPageAnchor';
import Methode from '@/components/sections/Methode';
import Spuren from '@/components/sections/Spuren';
import Fragen from '@/components/sections/Fragen';
import Abschluss from '@/components/sections/Abschluss';

/**
 * Homepage — 10-Section-Struktur (post Rule 17 wissenschaftlicher Audit)
 *
 *   I    Tor-Reveal     — Brand-Mood (dark, 130vh sticky) — AIDA: Attention
 *   II   Eine Stimme    — Founder + Authority (light) — Cialdini: Authority + Liking
 *   III  Schaufenster   — 3 Featured-Wagen (dark, 180vh sticky) — JTBD: konkretes Inventar
 *   IV   Markenwelt     — 7 Marken (dark) — JTBD: Range-Confirmation
 *
 *   Order-Note: Visual-Rhythm-Pflicht > JTBD-Theorie. Beide sticky-scroll
 *   Sections (I + III) zuerst, dann shorter content sections. Sonst feel:
 *   Akt III zu schnell weil short, IV zu lang weil sticky.
 *   V    Leistungen     — 4 Disziplinen (light) — AIDA: Desire (offering)
 *   VI   Mid-Page-CTA   — Editorial Decision-Zone-Anchor (light)
 *   VII  Methode        — 3 Process Steps (light) — AIDA: Desire (process)
 *   VIII Spuren         — Customer-Voices (light) — Cialdini: Social Proof
 *   IX   Fragen         — FAQ mit Risk-Reversal Q01 (light) — Kahneman: Loss-Aversion
 *   X    Abschluss      — Final-CTA + Adresse + 3 Channels (light) — AIDA: Action
 *
 * Rule-17-Fixes (May 2026 Audit):
 *  - Markenwelt VOR Schaufenster: HNW-JTBD-Pattern (Brand-Range vor Inventar-Peek)
 *  - Mid-Page-CTA neu (Heap-2022 Decision-Zone-Research: 31% bei 40-60% Scroll)
 *  - TorReveal Edition-Mark erweitert (NN/g 5-Sec-Test "WAS" sofort klar)
 *  - Enter-Prompt clickable (Conversion-First — kein dead visual)
 *
 * Question-Coverage pro Layer (Rule 16):
 *  L1 Identity → II + Footer
 *  L2 Offering → III + IV + V
 *  L3 Process → VII + IX
 *  L4 Quality + Risk-Reversal → IX (Q01 + Q02)
 *  L5 Logistics → IX + X
 *  L6 Payment → IX
 *  L7 After-Sales → V + IX
 *  L8 Social-Proof → VIII + II (Trust-Strip)
 *  L9 Contact → VI (Mid-CTA) + X + Footer
 *  L10 Privacy → Footer + Subpages
 *  L11 Accessibility → tech (WCAG 2.2 AA)
 *  L12 First-Step → X (3 channels)
 */

export default function HomePage() {
  return (
    <>
      {/* Resource hints — Akt I erstes Frame priority-preload für instant LCP */}
      <link
        rel="preload"
        href="/assets/videos/frames/frame-001.jpg"
        as="image"
        type="image/jpeg"
        fetchPriority="high"
      />

      <TorReveal />
      <EineStimme />
      <Schaufenster />
      <Markenwelt />
      <Services />
      <MidPageAnchor />
      <Methode />
      <Spuren />
      <Fragen />
      <Abschluss />
    </>
  );
}
