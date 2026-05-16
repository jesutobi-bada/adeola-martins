import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import projectDetailsData from '@/data/project-details.json';
import portfolioData from '@/data/portfolio.json';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ExternalLink, Smartphone, Monitor, ArrowLeft } from 'lucide-react';
import { ProjectCard } from '@/components/projects/project-card';

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Try to get full details first, fallback to basic portfolio data
  let project = (projectDetailsData as any)[slug];
  let isPartial = false;

  if (!project) {
    const basicProject = portfolioData.find(p => p.slug === slug);
    if (!basicProject) {
      return notFound();
    }
    // Create a fallback payload
    project = {
      title: basicProject.title,
      overview: basicProject.description,
      heroImage: basicProject.image,
      roles: basicProject.tags,
      platforms: ['desktop', 'mobile'], // generic fallback
      isPartial: true
    };
    isPartial = true;
  }

  // Get related projects (exclude current, pick 3)
  const relatedProjects = portfolioData
    .filter(p => p.slug !== slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen pt-48">
      <div className="max-w-[1128px] mx-auto px-4 w-full flex flex-col items-center">
        
        {/* Back Button */}
        <div className="w-full mb-8">
          <Link 
            href="/#projects" 
            className="inline-flex items-center gap-2 text-[#3D4955] hover:text-[#0B70F8] transition-colors duration-200 font-sans font-semibold text-[14px] md:text-[15px] group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Projects
          </Link>
        </div>

        {/* Header Section */}
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex items-center gap-4">
              <h1 className="font-sans font-bold text-[40px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-zinc-900">
                {project.title}
              </h1>
              {project.year && (
                <span 
                  className="bg-[#0B70F8] text-white text-[14px] font-bold px-4 py-1 rounded-[100px] border border-white"
                  style={{ boxShadow: '0px 0px 12px 8px #0B70F833' }}
                >
                  {project.year}
                </span>
              )}
            </div>
            {project.overview && (
              <p className="font-sans font-medium text-[15px] md:text-[16px] leading-[1.6] tracking-[-0.02em] text-[#3D4955]">
                {project.overview}
              </p>
            )}
          </div>

          {project.liveLink && project.liveLink !== "#" && (
            project.liveLink.startsWith("http") ? (
              <Button variant="link" asChild className="text-[#0B70F8] font-bold text-[16px] md:self-start mt-2 px-0">
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Check it Live
                </a>
              </Button>
            ) : (
              <span className="text-[#0B70F8] font-bold text-[16px] md:self-start mt-2 py-2">
                {project.liveLink}
              </span>
            )
          )}
        </div>

        {/* Hero Image & Meta Bar */}
        <div className="w-full flex flex-col gap-4 mb-32">
          <div className="relative w-full aspect-[16/10] md:aspect-[2/1] rounded-[32px] overflow-hidden bg-[#F8FAFD] border border-black/5">
            {project.heroImage && (
              <Image 
                src={project.heroImage}
                alt={`${project.title} Hero`}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
          {/* Dark Meta Bar */}
          {(project.roles?.length > 0 || project.platforms?.length > 0) && (
            <div 
              className="w-full rounded-[24px] p-4 md:px-8 md:py-4 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden"
              style={{ 
                backgroundColor: project.themeColor || '#1A1A1A',
                backgroundImage: "url('/bg-pattern.png')",
                backgroundRepeat: 'repeat-x',
                backgroundSize: 'auto 100%',
                backgroundBlendMode: 'multiply'
              }}
            >
              {project.roles && project.roles.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {project.roles.map((role: string, idx: number) => (
                    <span key={idx} className="bg-white rounded-[100px] px-4 py-2 text-[12px] font-bold text-zinc-900 shadow-sm">
                      {role}
                    </span>
                  ))}
                </div>
              )}
              {project.platforms && project.platforms.length > 0 && (
                <div className="flex items-center gap-3">
                  {project.platforms.includes('mobile') && (
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-zinc-900" />
                    </div>
                  )}
                  {project.platforms.includes('desktop') && (
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <Monitor className="w-5 h-5 text-zinc-900" />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Partial Case Study Fallback */}
        {isPartial && (
          <div className="w-full max-w-[1000px] flex flex-col items-center text-center gap-6 mb-32 py-20 bg-[#0B70F80D] rounded-[32px] border border-[#0B70F80D]">
            <h2 className="font-sans font-semibold text-[32px] text-zinc-900">Case Study Coming Soon</h2>
            <p className="font-sans font-medium text-[16px] text-[#3D4955] max-w-lg">
              The full detailed case study for {project.title} is currently being documented. Check back later!
            </p>
          </div>
        )}

        {/* --- Content Sections --- */}
        {!isPartial && (
          <div className="w-full max-w-[1000px] flex flex-col gap-16 mb-32">
            
            {/* The Problem */}
            {project.problem?.heading && project.problem?.paragraphs?.length > 0 && (
              <div className="flex flex-col gap-3">
                <h4 className="font-sans font-extrabold text-[12px] md:text-[13px] text-[#0B70F8] uppercase tracking-[-0.02em]">
                  The Problem
                </h4>
                <h2 className="font-sans font-semibold text-[24px] md:text-[32px] leading-[1.2] tracking-[-0.02em] text-zinc-900 mb-2">
                  {project.problem.heading}
                </h2>
                <div className="flex flex-col gap-4">
                  {project.problem.paragraphs.map((para: string, idx: number) => (
                    <p key={idx} className="font-sans font-medium text-[15px] md:text-[16px] leading-[1.6] text-[#3D4955]">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* The Solution */}
            {project.solution?.heading && (
              <div className="flex flex-col gap-3">
                <h4 className="font-sans font-extrabold text-[12px] md:text-[13px] text-[#0B70F8] uppercase tracking-[-0.02em]">
                  The Solution
                </h4>
                <h2 className="font-sans font-semibold text-[24px] md:text-[32px] leading-[1.2] tracking-[-0.02em] text-zinc-900 mb-2">
                  {project.solution.heading}
                </h2>
                <p className="font-sans font-medium text-[15px] md:text-[16px] leading-[1.6] text-[#3D4955] whitespace-pre-wrap">
                  {project.solution.intro}
                </p>
                {project.solution.features && project.solution.features.length > 0 && (
                  <div className="flex flex-col gap-3 mt-4">
                    {project.solution.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-4 bg-[#F8FAFD] rounded-[20px] p-3 border border-[#0B70F80D]">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                          <span className="text-[#0B70F8] font-bold text-[12px]">{idx + 1}</span>
                        </div>
                        <span className="font-sans font-semibold text-[15px] text-zinc-900">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Key Design Decisions */}
            {project.designDecisions?.heading && project.designDecisions?.items?.length > 0 && (
              <div className="flex flex-col gap-3">
                <h4 className="font-sans font-extrabold text-[12px] md:text-[13px] text-[#0B70F8] uppercase tracking-[-0.02em]">
                  Key Design Decisions
                </h4>
                <h2 className="font-sans font-semibold text-[24px] md:text-[32px] leading-[1.2] tracking-[-0.02em] text-zinc-900 mb-2">
                  {project.designDecisions.heading}
                </h2>
                <div className="flex flex-col gap-6 mt-4">
                  {project.designDecisions.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex flex-col gap-2">
                      <h3 className="font-sans font-bold text-[18px] md:text-[20px] text-zinc-900">{item.title}</h3>
                      <p className="font-sans font-medium text-[15px] md:text-[16px] leading-[1.6] text-[#3D4955]">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* The Outcome */}
            {project.outcome?.heading && project.outcome?.paragraphs?.length > 0 && (
              <div className="flex flex-col gap-3">
                <h4 className="font-sans font-extrabold text-[12px] md:text-[13px] text-[#0B70F8] uppercase tracking-[-0.02em]">
                  The Outcome
                </h4>
                <h2 className="font-sans font-semibold text-[24px] md:text-[32px] leading-[1.2] tracking-[-0.02em] text-zinc-900 mb-2">
                  {project.outcome.heading}
                </h2>
                <div className="flex flex-col gap-4">
                  {project.outcome.paragraphs.map((para: string, idx: number) => (
                    <p key={idx} className="font-sans font-medium text-[15px] md:text-[16px] leading-[1.6] text-[#3D4955]">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Reflection */}
            {project.reflection?.heading && project.reflection?.paragraphs?.length > 0 && (
              <div className="flex flex-col gap-3">
                <h4 className="font-sans font-extrabold text-[12px] md:text-[13px] text-[#0B70F8] uppercase tracking-[-0.02em]">
                  Reflection
                </h4>
                <h2 className="font-sans font-semibold text-[24px] md:text-[32px] leading-[1.2] tracking-[-0.02em] text-zinc-900 mb-2">
                  {project.reflection.heading}
                </h2>
                <div className="flex flex-col gap-4">
                  {project.reflection.paragraphs.map((para: string, idx: number) => (
                    <p key={idx} className="font-sans font-medium text-[15px] md:text-[16px] leading-[1.6] text-[#3D4955]">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Screenshots */}
            {project.screenshots?.images?.length > 0 && (
              <div className="flex flex-col gap-10 w-full mt-10">
                <div className="flex flex-col gap-3 text-center md:text-left max-w-3xl">
                  <h4 className="font-sans font-extrabold text-[12px] md:text-[13px] text-[#0B70F8] uppercase tracking-[-0.02em]">
                    Screenshots from the project
                  </h4>
                  <h2 className="font-sans font-semibold text-[24px] md:text-[32px] leading-[1.2] tracking-[-0.02em] text-zinc-900">
                    {project.screenshots.heading}
                  </h2>
                  <p className="font-sans font-medium text-[15px] md:text-[16px] leading-[1.6] text-[#3D4955]">
                    {project.screenshots.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.screenshots.images.map((img: string, idx: number) => (
                    <div key={idx} className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-white border border-black/5">
                      <Image 
                        src={img}
                        alt={`Screenshot ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="w-full flex flex-col gap-10 mt-16 mb-32">
            <div className="flex flex-col gap-2">
              <h4 className="font-sans font-extrabold text-[12px] md:text-[13px] text-[#0B70F8] uppercase tracking-[-0.02em]">
                Explore More
              </h4>
              <h2 className="font-sans font-semibold text-[24px] md:text-[32px] leading-[1.2] tracking-[-0.02em] text-zinc-900">
                Other projects you might like
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <ProjectCard
                  key={p.id}
                  slug={p.slug}
                  category={p.category}
                  title={p.title}
                  description={p.description}
                  tags={p.tags}
                  image={p.image}
                />
              ))}
            </div>
          </div>
        )}

      </div>
      <Footer />
    </main>
  );
}
