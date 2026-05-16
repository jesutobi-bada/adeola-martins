"use client";

import React, { useState } from 'react';
import portfolioData from '@/data/portfolio.json';
import { ProjectCard } from '@/components/projects/project-card';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All Work");

  const filteredProjects = portfolioData.filter((project) => {
    if (filter === "All Work") return true;
    if (filter === "Web Application") return project.category.includes("WEB APPLICATION") || project.category.includes("WEB APP");
    if (filter === "Mobile Application") return project.category.includes("MOBILE APPLICATION") || project.category.includes("MOBILE APP");
    return true;
  });

  return (
    <main className="min-h-screen pt-32">
      <div className="max-w-[1128px] mx-auto px-4 w-full flex flex-col items-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mb-12">
          <h4 className="font-sans font-extrabold text-[14px] leading-none tracking-[-0.02em] text-[#0B70F8] uppercase mb-4">
            PORTFOLIO
          </h4>
          <h1 className="font-sans font-semibold text-[40px] md:text-[48px] leading-[1.2] tracking-[-0.02em] text-zinc-900 mb-6">
            Selected works & product <span className="text-[#0B70F8]">experiences</span>
          </h1>
          <p className="font-sans font-medium text-[16px] md:text-[18px] leading-[1.6] tracking-[-0.02em] text-[#3D4955] max-w-2xl">
            A collection of products I’ve designed across fintech, SaaS, AI, and digital platforms, focused on simplifying complex experiences, improving usability, and creating solutions that align user needs with business goals.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-1.5 rounded-[100px] flex gap-1 shadow-[0px_4px_12px_rgba(0,0,0,0.04)] border border-black/[0.02] mb-16 overflow-x-auto max-w-full">
          {["All Work", "Web Application", "Mobile Application"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={cn(
                "px-6 py-3 rounded-[100px] font-sans font-bold text-[14px] whitespace-nowrap transition-all duration-300",
                filter === tab 
                  ? "bg-[#0B70F8] text-white shadow-sm" 
                  : "bg-transparent text-[#3D4955] hover:text-zinc-900 hover:bg-zinc-50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="max-w-[1000px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full mb-24">
            {filteredProjects.map((project) => (
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

      </div>
      <Footer />
    </main>
  );
}
