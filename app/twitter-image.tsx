import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Adeola Martins - Product Designer';
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
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(164.34deg, #FFFFFF -18.24%, #D3FBFD -6.6%, #EFF1FD 25.14%, #FFFFFF 77.86%)',
          padding: '40px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h1
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: '#1A1A1A',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Adeola Martins
          </h1>
          <p
            style={{
              fontSize: 40,
              fontWeight: 600,
              color: '#0B70F8',
              margin: 0,
            }}
          >
            Product Designer
          </p>
          <p
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: '#3D4955',
              marginTop: 40,
              maxWidth: '800px',
              lineHeight: 1.4,
            }}
          >
            Crafting intuitive digital experiences and impactful digital products.
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
