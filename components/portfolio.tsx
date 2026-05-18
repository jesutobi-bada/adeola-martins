import React from 'react';
import portfolioData from '@/data/portfolio.json';
import { ProjectCard } from '@/components/projects/project-card';
import { Button } from './ui/button';
import Link from 'next/link';

export function Portfolio() {
  return (
    <section className="w-full flex justify-center py-24 px-4 relative">
      <div className="max-w-[1128px] w-full flex flex-col items-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center max-w-2xl mb-16">
          <h4 className="font-sans font-extrabold text-[14px] leading-none tracking-[-0.02em] text-[#0B70F8] uppercase mb-4">
            PORTFOLIO
          </h4>
          <h2 className="font-sans font-semibold text-[36px] md:text-[40px] leading-[1.2] tracking-[-0.02em] text-zinc-900 mb-6">
            Selected works & product <span className="text-[#0B70F8]">experiences</span>
          </h2>
          <p className="font-sans font-medium text-[16px] md:text-[18px] leading-[1.6] tracking-[-0.02em] text-[#3D4955]">
            A collection of products I’ve designed across fintech, SaaS, AI, and digital platforms, focused on simplifying complex experiences, improving usability, and creating solutions that align user needs with business goals.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="max-w-[900px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full mb-16">
            {portfolioData.slice(0, 4).map((project) => (
              <ProjectCard 
                key={project.id}
                slug={project.slug}
                category={project.category}
                title={project.title}
                description={project.description}
                tags={project.tags}
                image={project.image}
                showImage={true}
              />
            ))}
          </div>
        </div>

        <Button className='w-44 h-14' size="lg" asChild>
          <Link href="/projects">View All Project</Link>
        </Button>

      </div>
    </section>
  );
}
