"use client";

import React from 'react';
import { Layout, Box, Search, PenTool } from 'lucide-react';

const services = [
  {
    title: "UIUX Design",
    description: "Creating modern user interfaces and intuitive experiences that improve usability, accessibility, engagement, and product interaction consistency.",
    icon: Layout
  },
  {
    title: "Product Design",
    description: "Designing scalable digital products that balance user needs, business goals, usability, and seamless experiences across web and mobile platforms.",
    icon: Box
  },
  {
    title: "UX Audit",
    description: "Conducting detailed UX audits to identify usability issues, improve user flows, optimize experiences, and enhance product performance consistently.",
    icon: Search
  },
  {
    title: "UX Writing",
    description: "Crafting clear and user-focused product copy that improves communication, guides interactions, and enhances overall user experience flows.",
    icon: PenTool
  }
];

export function MyServices() {

  return (
    <section className="w-full flex justify-center pb-10 px-4  [perspective:3000px]">
      <div 
        style={{
          background: 'linear-gradient(164.34deg, #FFFFFF -18.24%, #D3FBFD -6.6%, #EFF1FD 25.14%, #FFFFFF 77.86%)',
          borderColor: '#0B70F840',
          transformStyle: 'preserve-3d',
          transformOrigin: 'bottom center', // Pivot from the bottom to look like it's standing up
          transform: 'rotateX(25deg)'
        }}
        className="max-w-[960px] w-full min-h-[920px] rounded-[60px] border relative flex flex-col mx-auto "
      >
        {/* Grid Container */}
        <div 
          style={{ transformStyle: 'preserve-3d' }} 
          className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 flex-1 relative p-0"
        >
          
          {/* Vertical Divider */}
          <div style={{ transform: 'translateZ(80px)' }} className="absolute top-16 bottom-16 left-1/2 w-px bg-blue-500/10 hidden md:block" />
          
          {/* Horizontal Divider */}
          <div style={{ transform: 'translateZ(80px)' }} className="absolute left-16 right-16 top-1/2 h-px bg-blue-500/30 hidden md:block" />

          {services.map((service, index) => (
            <div 
              key={index}
              style={{
                transform: `translateZ(80px) translateY(${index < 2 ? '25px' : '-25px'}) rotateX(-25deg)`,
                transformOrigin: 'center center',
                transformStyle: 'preserve-3d'
              }}
              className="group pt-8 px-8 pb-16 flex flex-col justify-start transition-all duration-300 hover:bg-white border border-transparent hover:border-zinc-200/80 w-full max-w-[360px] min-h-[300px] place-self-center m-2 rounded-[32px] relative cursor-pointer hover:shadow-[0px_20px_40px_-10px_rgba(11,112,248,0.1)] z-10"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-transparent border border-[#0B70F8] group-hover:border group-hover:border-zinc-200 group-hover:bg-white group-hover:shadow-sm flex items-center justify-center transition-all duration-300">
                    <service.icon className="w-5 h-5 text-zinc-900" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900">{service.title}</h3>
                </div>
                <p className="text-base text-zinc-500 group-hover:text-zinc-600 leading-relaxed w-full transition-colors duration-300">
                  {service.description}
                </p>
              </div>
              
              {/* Hire Me Link (Shown on Hover) */}
              <div className="absolute left-8 bottom-6 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                <a 
                  href="https://calendly.com/alabiadeolamartins" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#0B70F8] font-semibold text-lg flex items-center gap-2 hover:underline"
                >
                  Hire Me
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
