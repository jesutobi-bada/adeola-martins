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
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            borderRadius: '100px',
            padding: '80px',
            boxShadow: '0 32px 64px rgba(11, 112, 248, 0.1)',
            border: '2px solid rgba(11, 112, 248, 0.1)',
          }}
        >
          <svg width="216" height="144" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scale(6)' }}>
            <path d="M0 0C6.62742 0 12 5.37258 12 12V18C12 21.3137 9.31371 24 6 24C2.68629 24 0 21.3137 0 18V0Z" fill="#0B70F8"/>
            <path d="M13 7H16.5C21.1944 7 25 10.8056 25 15.5V18C25 21.3137 22.3137 24 19 24C15.6863 24 13 21.3137 13 18V7Z" fill="black"/>
            <rect x="26" width="10" height="24" rx="5" fill="#F8E7C9"/>
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
