import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'ScooPo – Pet Waste Removal & Cat Litter Cleaning in Melbourne';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          background:
            'linear-gradient(135deg, #00b4d8 0%, #0096c7 60%, #0077b6 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 48,
            }}
          >
            🐾
          </div>
          <div style={{ fontSize: 72, fontWeight: 900, letterSpacing: -2 }}>
            ScooPo
          </div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -1.5,
            maxWidth: 980,
          }}
        >
          Pet Waste Removal &amp; Cat Litter Cleaning
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 600,
            marginTop: 28,
            opacity: 0.95,
          }}
        >
          Melbourne · Box Hill · Blackburn
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginTop: 36,
            padding: '14px 28px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.18)',
            border: '2px solid rgba(255,255,255,0.4)',
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          From $10/visit · No contracts
        </div>
      </div>
    ),
    { ...size },
  );
}
