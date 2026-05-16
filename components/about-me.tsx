import React from 'react';
import Image from 'next/image';
import { Trophy, Building2, Lightbulb, Globe, Download } from 'lucide-react';

const stats = [
  { value: "4+", label: "Years of Experience", icon: Trophy },
  { value: "7+", label: "Trusted Brands", icon: Building2 },
  { value: "10+", label: "Product Designed", icon: Lightbulb },
  { value: "5+", label: "Country Served", icon: Globe },
];

export function AboutMe() {
  return (
    <section className="w-full flex justify-center py-20 px-4">
      <div className="max-w-[1128px] w-full flex flex-col gap-6">
        
        {/* Section Label */}
        <h4 className="font-sans font-extrabold text-[14px] leading-none tracking-[-0.02em] text-[#0B70F8] uppercase">
          ABOUT ME
        </h4>

        {/* Headline */}
        <h2 className="font-sans font-semibold text-[32px] text-zinc-900 tracking-[-0.02em] leading-none max-w-4xl mt-2">
          Designing products that bridge <span className="text-[#0B70F8]">user needs</span> and <span className="text-[#0B70F8]">business goals</span>
        </h2>

        {/* Description Paragraphs */}
        <div className="flex flex-col gap-6 mt-6 max-w-4xl">
          <p className="font-sans font-medium text-[18px] md:text-[20px] leading-[1.6] tracking-[-0.02em] text-[#3D4955]">
            I'm Alabi Adeola Martins, a Product Designer specializing in SaaS platforms, fintech applications, AI products, Web3 experiences, and modern mobile-first digital products.
          </p>
          
          <p className="font-sans font-medium text-[18px] md:text-[20px] leading-[1.6] tracking-normal text-zinc-900">
            My journey into product design started from a simple curiosity: understanding why some digital experiences feel effortless while others create frustration. That curiosity evolved into a passion for simplifying complex systems and designing products that feel intuitive, scalable, and genuinely useful for people.
          </p>
        </div>

        {/* Two Column Layout: Image & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-16 items-center">
          
          {/* Left: Headshot */}
          <div className="relative flex justify-center items-end w-full min-h-[400px] md:min-h-[550px] pt-12">
            <div className="absolute inset-0 flex justify-center items-end">
              <Image 
                src="/headshot-backdrop.svg" 
                alt="Backdrop" 
                fill 
                className="object-contain object-bottom z-0" 
              />
            </div>
            <Image 
              src="/professional-headshot.svg" 
              alt="Adeola Martins" 
              width={480} 
              height={550} 
              className="relative z-10 object-contain object-bottom w-full" 
              priority
            />
          </div>

          {/* Right: Content (Quote, Stats, Resume) */}
          <div className="flex flex-col gap-5">
            
            {/* Quote */}
            <div className="relative pl-12 pt-4">
              <Image 
                src="/quote-image.svg" 
                alt="Quote" 
                width={32} 
                height={20} 
                className="absolute top-[14px] left-[8px] transform -rotate-180" 
              />
              <h3 className="font-sans font-semibold text-[32px] leading-none tracking-[-0.02em] text-zinc-900 relative z-10">
                I simply complexity through research-driven and scalable design solutions.
              </h3>
            </div>

            {/* Top Pattern */}
            <div className="w-full h-10 relative">
              <Image src="/pattern-horizontal.svg" alt="Pattern" fill className="object-cover" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-white rounded-md shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-zinc-100 transition-all hover:shadow-md">
                  <div className="w-14 h-14 rounded-full bg-[#EFF5FF] flex items-center justify-center flex-shrink-0">
                    <stat.icon className="w-6 h-6 text-[#0B70F8]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-3xl text-zinc-900">{stat.value}</h4>
                    <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Pattern */}
            <div className="w-full h-10 relative">
              <Image src="/pattern-horizontal.svg" alt="Pattern" fill className="object-cover" />
            </div>

            {/* Resume Banner */}
            <div 
              className="flex items-center justify-between p-3 rounded-md"
              style={{ background: 'linear-gradient(164.34deg, #FFFFFF -18.24%, #D3FBFD -6.6%, #EFF1FD 25.14%, #FFFFFF 77.86%)' }}
            >
              <span className="font-semibold text-zinc-900">My Resume:</span>
              <button className="flex items-center gap-2 text-[#0B70F8] font-bold hover:underline transition-all active:scale-95">
                <Download className="w-5 h-5" /> Download Resume
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
