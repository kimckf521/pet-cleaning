import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { SERVICE_AREA_SHORT_EN } from '@/lib/constants';

export const alt = 'ScooPo – Pet Waste Removal & Cat Litter Cleaning in Melbourne';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const [illustrationFile, logoFile] = await Promise.all([
    readFile(join(process.cwd(), 'public', 'og-illustration.jpg')),
    readFile(join(process.cwd(), 'public', 'logo.png')),
  ]);
  const illustrationSrc = `data:image/jpeg;base64,${illustrationFile.toString('base64')}`;
  const logoSrc = `data:image/png;base64,${logoFile.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            width: 480,
            height: '100%',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '56px 48px',
            background:
              'linear-gradient(160deg, #00b4d8 0%, #0096c7 55%, #0077b6 100%)',
            color: 'white',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 18,
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}
            >
              <img
                src={logoSrc}
                alt=""
                width={52}
                height={52}
                style={{ width: 52, height: 52, objectFit: 'contain' }}
              />
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: -1.5 }}>
              ScooPo
            </div>
          </div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: -1,
            }}
          >
            Pet Waste Removal &amp; Cat Litter Cleaning
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              marginTop: 22,
              opacity: 0.95,
            }}
          >
            {SERVICE_AREA_SHORT_EN}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginTop: 32,
              padding: '12px 22px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.18)',
              border: '2px solid rgba(255,255,255,0.4)',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            From $28/visit · No contracts
          </div>
        </div>
        <div
          style={{
            flex: 1,
            height: '100%',
            display: 'flex',
            overflow: 'hidden',
            background: '#fdfaf3',
          }}
        >
          <img
            src={illustrationSrc}
            alt=""
            width={720}
            height={630}
            style={{
              width: 720,
              height: 630,
              objectFit: 'cover',
              objectPosition: 'center bottom',
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
