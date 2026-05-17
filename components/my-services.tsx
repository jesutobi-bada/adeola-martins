"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { Layout, Box, Search, PenTool } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, 
        { 
          rotateX: 45, // Tilted back
          y: 50,
          opacity: 0,
          scale: 0.9
        }, 
        {
          rotateX: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            end: "top 50%",
            scrub: 1.2,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full flex justify-center py-10 px-4 [perspective:3000px]">
      <div 
        ref={containerRef}
        style={{
          borderColor: '#0B70F840',
          transformStyle: 'preserve-3d',
          transformOrigin: 'bottom center' // Pivot from the bottom to look like it's standing up
        }}
        className="max-w-[960px] w-full min-h-[600px] rounded-[60px] border relative overflow-hidden flex flex-col mx-auto"
      >
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 flex-1 relative">
          
          {/* Vertical Divider */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-blue-500/10 hidden md:block" />
          
          {/* Horizontal Divider */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-blue-500/10 hidden md:block" />

          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-6 md:p-8 flex flex-col justify-center gap-6 transition-all duration-300 hover:bg-white m-2 rounded-[32px] relative cursor-pointer hover:shadow-[0px_20px_40px_-10px_rgba(11,112,248,0.1)] z-10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-transparent border-2 border-[#0B70F8] flex items-center justify-center">
                  <service.icon className="w-5 h-5 text-zinc-900" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900">{service.title}</h3>
              </div>
              <p className="text-base text-zinc-500 leading-relaxed max-w-md">
                {service.description}
              </p>
              
              {/* Book a Call Link (Shown on Hover) */}
              <div className="overflow-hidden h-0 group-hover:h-8 transition-all duration-300 ease-in-out">
                <a 
                  href="https://calendly.com/alabiadeolamartins" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#0B70F8] font-semibold text-lg flex items-center gap-2 hover:underline"
                >
                  Book a Call
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
