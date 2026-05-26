import { ImageResponse } from 'next/og';

export const runtime = 'edge';

/**
 * OG-Image-Generator — Edge runtime.
 *
 * Usage:
 *   /api/og?title=Aston%20Martin%20DBS&subtitle=Freiburg
 *
 * Returns 1200x630 branded OG image with title + subtitle.
 * Used in generateMetadata() openGraph.images.
 */

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get('title')?.slice(0, 100) ?? 'Prestige Selections';
  const subtitle = url.searchParams.get('subtitle')?.slice(0, 80) ?? 'Außergewöhnliche Automobile. Aus Freiburg.';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          backgroundColor: '#15110D',
          color: '#F2EDE3',
          fontFamily: 'Helvetica Neue, Arial, sans-serif',
        }}
      >
        {/* Top edge: brand line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '40px', height: '1px', background: '#C49A0C' }} />
          <span
            style={{
              fontSize: '14px',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              color: '#C49A0C',
            }}
          >
            Prestige Selections
          </span>
        </div>

        {/* Title block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h1
            style={{
              fontSize: '88px',
              lineHeight: 0.95,
              letterSpacing: '-3px',
              textTransform: 'uppercase',
              fontWeight: 700,
              margin: 0,
              maxWidth: '900px',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '32px',
              lineHeight: 1.3,
              color: '#B0A491',
              margin: 0,
              maxWidth: '800px',
              fontWeight: 400,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Bottom edge */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '16px',
            color: '#B0A491',
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}
        >
          <span>Schusterstraße · Freiburg</span>
          <span>prestige-selections.com</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
