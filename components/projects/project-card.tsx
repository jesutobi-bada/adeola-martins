import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
      className="bg-[#0B70F80D] border border-[#0B70F80D] rounded-[32px] p-6 md:p-8 flex flex-col transition-all duration-300 hover:shadow-[0px_10px_30px_-10px_rgba(11,112,248,0.1)] hover:-translate-y-1 w-full h-full block group"
    >
      <span className="font-sans font-extrabold text-[11px] leading-none tracking-[-0.02em] text-[#0B70F8] uppercase mb-5 block">
        {category}
      </span>
      
      {showImage && image && (
        <div className="relative w-full aspect-[16/10] mb-6 rounded-[24px] overflow-hidden bg-white border border-black/[0.04]">
          <Image 
            src={image}
            alt={`${title} project thumbnail`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      
      <h3 className="font-sans font-bold text-[20px] md:text-[24px] leading-[1.2] tracking-[-0.02em] text-zinc-900 mb-3">
        {title}
      </h3>
      
      <p className="font-sans font-medium text-[14px] md:text-[15px] leading-[1.6] tracking-[-0.02em] text-[#3D4955] mb-6 flex-grow">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
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
