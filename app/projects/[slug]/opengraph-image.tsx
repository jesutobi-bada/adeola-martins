import { ImageResponse } from 'next/og';
import portfolioData from '@/data/portfolio.json';
import projectDetailsData from '@/data/project-details.json';

export const runtime = 'edge';
export const alt = 'Project Details';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let project = (projectDetailsData as any)[slug];
  const basicProject = portfolioData.find(p => p.slug === slug);
  
  const title = project?.title || basicProject?.title || 'Project Case Study';
  const description = project?.overview || basicProject?.description || 'View the full project details and case study.';
  const category = basicProject?.category || 'CASE STUDY';

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
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '900px' }}>
          <span style={{ color: '#0B70F8', fontSize: 24, fontWeight: 700, letterSpacing: '0.05em', marginBottom: 24 }}>
            {category}
          </span>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#1A1A1A',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: 32,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: '#3D4955',
              lineHeight: 1.4,
              overflow: 'hidden',
            }}
          >
            {description}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 60, gap: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#1A1A1A' }}>Adeola Martins</div>
            <div style={{ fontSize: 28, fontWeight: 500, color: '#0B70F8' }}>• Product Designer</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
