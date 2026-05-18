import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface ProjectCardProps {
  id?: string | number;
  slug: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  showImage?: boolean;
}

export function ProjectCard({ slug, category, title, description, tags, image, showImage = true }: ProjectCardProps) {
  return (
    <Link 
      href={`/projects/${slug}`}
      className="relative overflow-hidden bg-[#0B70F80D] border border-[#0B70F80D] hover:border-[#0B70F8] rounded-[32px] p-6 md:p-8 flex flex-col transition-all duration-300 hover:shadow-[0px_20px_40px_-10px_rgba(11,112,248,0.15)] hover:-translate-y-1 w-full h-full block group"
    >
      {/* Hover Gradient Background */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(164.34deg, #FFFFFF -18.24%, #D3FBFD -6.6%, #EFF1FD 25.14%, #FFFFFF 77.86%)'
        }}
      />

      <div className="flex items-center justify-between mb-5 relative z-10">
        <span className="font-sans font-extrabold text-[11px] leading-none tracking-[-0.02em] text-[#0B70F8] uppercase block">
          {category}
        </span>
        <ArrowUpRight className="w-5 h-5 text-[#0B70F8] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" strokeWidth={2.5} />
      </div>
      
      {showImage && image && (
        <div className="relative z-10 w-full aspect-[478/230] mb-6 rounded-lg overflow-hidden bg-white border border-black/[0.04]">
          <Image 
            src={image}
            alt={`${title} project thumbnail`}
            fill
            className="object-contain w-full group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      
      <h3 className="relative z-10 font-sans font-bold text-[20px] md:text-[24px] leading-[1.2] tracking-[-0.02em] text-zinc-900 mb-3">
        {title}
      </h3>
      
      <p className="relative z-10 font-sans font-medium text-[14px] md:text-[15px] leading-[1.6] tracking-[-0.02em] text-[#3D4955] mb-6 flex-grow">
        {description}
      </p>

      <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="bg-white rounded-full px-3 py-1.5 font-sans font-bold text-[11px] leading-none tracking-[-0.02em] text-zinc-900 shadow-[0px_2px_8px_rgba(0,0,0,0.04)] inline-block"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

