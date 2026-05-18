"use client";

import React, { useState, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { Search, LayoutGrid, Palette, Box, RefreshCcw } from 'lucide-react';
import gsap from 'gsap';

const steps = [
  {
    id: 1,
    title: "Discover",
    icon: Search,
    image: "/discover.svg",
    floatingTop: "/discover-a.svg",
    floatingBottom: "/discover-b.svg",
    headline: "Understanding the problem, the users, and the business context.",
    description: "I gather insights through user research, stakeholder discussions, and competitive analysis to uncover real user needs and identify key pain points worth solving.",
    quote: "“If I had asked people what they wanted, they would have said faster horses.”",
    author: "— Henry Ford"
  },
  {
    id: 2,
    title: "Define",
    icon: LayoutGrid,
    image: "/define.svg",
    floatingTop: "/define-a.svg",
    floatingBottom: "/define-b.svg",
    headline: "Structuring insights into clear problems and strategic opportunities.",
    description: "I analyze research findings, identify patterns, and define user pain points to create focused problem statements that align user needs with business objectives.",
    quote: "“A problem well stated is a problem half solved.”",
    author: "— Charles Kettering"
  },
  {
    id: 3,
    title: "Design",
    icon: Palette,
    image: "/design.svg",
    floatingTop: "/design-a.svg",
    floatingBottom: "/design-b.svg",
    headline: "Transforming insights into intuitive and scalable product experiences.",
    description: "I create wireframes, interaction flows, visual systems, and high-fidelity interfaces that balance usability, accessibility, and business goals while ensuring clarity across every touchpoint.",
    quote: "“Design is not just what it looks like and feels like. Design is how it works.”",
    author: "— Steve Jobs"
  },
  {
    id: 4,
    title: "Deliver",
    icon: Box,
    image: "/deliver.svg",
    floatingTop: "/deliver-a.svg",
    floatingBottom: "/deliver-b.svg",
    headline: "Bringing ideas to life through collaboration and seamless execution.",
    description: "I work closely with developers and stakeholders to ensure responsive implementation, design consistency, and smooth handoff processes that maintain product quality from concept to launch.",
    quote: "“Details matter. It’s worth waiting to get it right.”",
    author: "— Steve Jobs"
  },
  {
    id: 5,
    title: "Iterate",
    icon: RefreshCcw,
    image: "/iterate.svg",
    floatingTop: "/iterate-a.svg",
    floatingBottom: "/iterate-b.svg",
    headline: "Improving experiences through continuous learning and refinement.",
    description: "I use usability testing, feedback, analytics, and product insights to refine interactions, optimize workflows, and evolve products based on real user behavior and changing needs.",
    quote: "“There is no innovation and creativity without failure. Period.”",
    author: "— Brené Brown"
  }
];

export function DesignApproach() {
  const [activeStep, setActiveStep] = useState(0);
  
  const textContentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const floatingTopRef = useRef<HTMLDivElement>(null);
  const floatingBottomRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; currentX: number; isDragging: boolean }>({ startX: 0, currentX: 0, isDragging: false });

  // Auto-shuffle timer after 20 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (deckRef.current) {
        gsap.to(deckRef.current, {
          x: -200,
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            setActiveStep((prev) => (prev + 1) % steps.length);
            gsap.fromTo(deckRef.current, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
          }
        });
      } else {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }
    }, 20000);
    return () => clearInterval(timer);
  }, [activeStep]);

  useLayoutEffect(() => {
    // Animate text content fade/slide
    if (textContentRef.current) {
      gsap.fromTo(textContentRef.current.children, 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out", overwrite: "auto" }
      );
    }
    
    // Animate the main icon and floating elements with a stagger
    if (iconRef.current) {
      gsap.fromTo([iconRef.current, floatingTopRef.current, floatingBottomRef.current],
        { opacity: 0, scale: 0.5, rotate: (i) => i === 0 ? -30 : 0 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)", overwrite: "auto" }
      );
    }
  }, [activeStep]);

  // Handle Drag Gestures on the Deck
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = { startX: e.clientX, currentX: e.clientX, isDragging: true };
    e.currentTarget.setPointerCapture(e.pointerId);
    if (deckRef.current) {
      gsap.killTweensOf(deckRef.current);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.currentX = e.clientX;
    const diffX = dragRef.current.currentX - dragRef.current.startX;
    
    // Smooth, constrained dragging physics
    if (deckRef.current) {
      gsap.set(deckRef.current, { x: diffX * 0.6, rotation: diffX * 0.05 });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.isDragging = false;
    
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {
      // Ignore if pointer capture was already released
    }

    const diffX = dragRef.current.currentX - dragRef.current.startX;
    
    if (Math.abs(diffX) > 80) {
      // Swiped far enough!
      const direction = diffX < 0 ? -1 : 1; // -1 is swipe left (next), 1 is swipe right (prev)
      
      // Calculate next step with continuous looping
      let nextStep = direction === -1 ? activeStep + 1 : activeStep - 1;
      if (nextStep >= steps.length) {
        nextStep = 0;
      } else if (nextStep < 0) {
        nextStep = steps.length - 1;
      }

      // Throw card off screen, change state, and fly back in
      gsap.to(deckRef.current, { 
        x: direction * 200, 
        opacity: 0, 
        duration: 0.2, 
        onComplete: () => {
          setActiveStep(nextStep);
          
          if (deckRef.current) {
            gsap.set(deckRef.current, { x: -direction * 200, opacity: 0 });
            gsap.to(deckRef.current, { x: 0, opacity: 1, rotation: 0, duration: 0.4, ease: "back.out(1.2)" });
          }
        }
      });
    } else {
      // Didn't swipe far enough, bounce back
      if (deckRef.current) {
        gsap.to(deckRef.current, { x: 0, rotation: 0, duration: 0.4, ease: "back.out(1.5)" });
      }
    }
  };

  return (
    <section 
      className="w-full flex justify-center py-20 px-4"
      style={{ background: 'linear-gradient(164.34deg, #FFFFFF -18.24%, #EFF1FD 28.23%, #FFFFFF 40.86%)' }}
    >
      <div className="max-w-[1128px] w-full flex flex-col items-center gap-4">
        
        {/* Label */}
        <h4 className="font-sans font-extrabold text-[14px] leading-none tracking-[-0.02em] text-[#0B70F8] uppercase text-center">
          MY DESIGN APPROACH
        </h4>

        {/* Headline */}
        <h2 className="font-sans font-semibold text-[36px] leading-[44px] tracking-[-0.02em] text-zinc-900 text-center mt-2">
          From insight to <span className="text-[#0B70F8]">impact</span>
        </h2>

        {/* Description */}
        <p className="font-sans font-semibold text-base leading-[24px] tracking-[-0.02em] text-[#3D4955] text-center max-w-2xl mt-4">
          My design process is rooted in understanding user needs and business goals, moving from research and problem definition to structured design, testing, and continuous iteration.
        </p>

        {/* Interactive Steps Section */}
        <div className="w-full flex flex-col md:flex-row gap-8 lg:gap-16 mt-20 items-center md:items-start">
          
          {/* Left Sidebar (Tabs) */}
          <div className="w-full md:w-72 flex flex-col relative py-2 h-fit md:self-start">
             {/* Background Line for inactive steps */}
             <div className="absolute left-[2px] top-4 bottom-4 w-[3px] bg-[#D5E4FA] rounded-full" />
             
             {/* Smooth Animated Active Line */}
             <div 
               className="absolute left-[2px] top-0 w-[3px] bg-[#0B70F8] rounded-full z-10 shadow-[0px_0px_8px_rgba(11,112,248,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
               style={{
                 height: '36px',
                 transform: `translateY(calc(${activeStep * 58}px + 15px))` 
               }}
             />

             {steps.map((step, index) => {
               const isActive = activeStep === index;
               return (
                 <div key={step.id} className="relative flex items-center h-[50px] mb-[8px] group">
                   <button
                     onClick={() => setActiveStep(index)}
                     className={`ml-6 flex items-center gap-3 px-4 py-3 w-full h-full text-left transition-all duration-300 rounded-[12px]
                       ${isActive 
                         ? 'bg-gradient-to-r from-[#F0F5FF] to-white border border-[#E0EAFF] text-[#0B70F8]' 
                         : 'text-[#3D4955] hover:bg-black/[0.02] border border-transparent'
                       }
                     `}
                   >
                     <span className={`text-[16px] md:text-[18px] ${isActive ? 'font-medium' : 'font-medium'}`}>Step {step.id}:</span>
                     <step.icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-[#0B70F8]' : 'text-[#3D4955]'}`} strokeWidth={isActive ? 2.5 : 2} />
                     <span className={`text-[16px] md:text-[18px] transition-all duration-300 ${isActive ? 'font-bold' : 'font-semibold'}`}>{step.title}</span>
                   </button>
                 </div>
               )
             })}
          </div>

          {/* Middle: Stacked Cards Placeholder */}
          <div 
            className="w-full md:w-[400px] flex-shrink-0 relative aspect-square p-8 group cursor-grab active:cursor-grabbing select-none touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            
            {/* Background Card 4 (Back-most) */}
            <div 
              className="absolute inset-0 rounded-[40px] border border-white transition-all duration-500 transform -rotate-[12deg] scale-[0.88] -translate-x-6 translate-y-8 group-hover:-rotate-[14deg] group-hover:-translate-x-8 group-hover:translate-y-10" 
              style={{ background: 'linear-gradient(164.34deg, #FFFFFF -18.24%, #D3FBFD -6.6%, #EFF1FD 25.14%, #FFFFFF 77.86%)', boxShadow: '0px 0px 12px 4px #0B70F81F', zIndex: 1 }}
            />
            
            {/* Background Card 3 */}
            <div 
              className="absolute inset-0 rounded-[40px] border border-white transition-all duration-500 transform -rotate-[9deg] scale-[0.92] -translate-x-4 translate-y-6 group-hover:-rotate-[11deg] group-hover:-translate-x-6 group-hover:translate-y-8" 
              style={{ background: 'linear-gradient(164.34deg, #FFFFFF -18.24%, #D3FBFD -6.6%, #EFF1FD 25.14%, #FFFFFF 77.86%)', boxShadow: '0px 0px 12px 4px #0B70F81F', zIndex: 2 }}
            />
            
            {/* Background Card 2 */}
            <div 
              className="absolute inset-0 rounded-[40px] border border-white transition-all duration-500 transform -rotate-[6deg] scale-[0.96] -translate-x-2 translate-y-4 group-hover:-rotate-[8deg] group-hover:-translate-x-4 group-hover:translate-y-6" 
              style={{ background: 'linear-gradient(164.34deg, #FFFFFF -18.24%, #D3FBFD -6.6%, #EFF1FD 25.14%, #FFFFFF 77.86%)', boxShadow: '0px 0px 12px 4px #0B70F81F', zIndex: 3 }}
            />
            
            {/* Background Card 1 (Directly behind foreground) */}
            <div 
              className="absolute inset-0 rounded-[40px] border border-white transition-all duration-500 transform -rotate-[3deg] scale-[0.98] -translate-x-1 translate-y-2 group-hover:-rotate-[5deg] group-hover:-translate-x-2 group-hover:translate-y-4 overflow-hidden" 
              style={{ background: 'linear-gradient(164.34deg, #FFFFFF -18.24%, #D3FBFD -6.6%, #EFF1FD 25.14%, #FFFFFF 77.86%)', boxShadow: '0px 0px 12px 4px #0B70F81F', zIndex: 4 }}
            >
              <div className="absolute inset-0 w-full h-full transition-all duration-500 opacity-60">
                <Image 
                  src={steps[(activeStep + 1) % steps.length].image} 
                  alt="Next Step Preview"
                  fill
                  className="object-contain p-6 pointer-events-none"
                  draggable={false}
                />
              </div>
            </div>
            
            {/* Foreground Card */}
            <div 
              ref={deckRef} 
              className="absolute inset-0 rounded-[40px] border border-white flex items-center justify-center overflow-hidden z-10"
              style={{ 
                background: 'linear-gradient(164.34deg, #FFFFFF -18.24%, #D3FBFD -6.6%, #EFF1FD 25.14%, #FFFFFF 77.86%)',
                boxShadow: '0px 0px 12px 4px #0B70F81F' 
              }}
            >
              
              {/* Dynamic Image with GSAP fade/scale animation */}
              <div ref={iconRef} className="relative z-10 w-full h-full transition-all duration-500 transform group-hover:scale-[1.05]">
                <Image 
                  src={steps[activeStep].image} 
                  alt={steps[activeStep].title}
                  fill
                  className="object-contain p-6 pointer-events-none"
                  draggable={false}
                  priority
                />
              </div>

              {/* Floating Element Top Left */}
              <div ref={floatingTopRef} className="absolute top-4 left-4 w-28 h-28 z-20 transition-transform duration-500 group-hover:-translate-y-1 group-hover:-translate-x-1 pointer-events-none drop-shadow-xl">
                 <Image 
                   src={steps[activeStep].floatingTop}
                   alt=""
                   fill
                   className="object-contain"
                 />
              </div>

              {/* Floating Element Bottom Right */}
              <div ref={floatingBottomRef} className="absolute bottom-4 right-4 w-28 h-28 z-20 transition-transform duration-500 group-hover:translate-y-1 group-hover:translate-x-1 pointer-events-none drop-shadow-xl">
                 <Image 
                   src={steps[activeStep].floatingBottom}
                   alt=""
                   fill
                   className="object-contain"
                 />
              </div>

            </div>
          </div>

          {/* Right: Content */}
          <div ref={textContentRef} className="w-full md:flex-1 flex flex-col justify-center gap-6 py-4">
            <h3 className="font-sans font-bold text-[24px] leading-[1.2] tracking-[-0.02em] text-zinc-900 max-w-sm">
              {steps[activeStep].headline}
            </h3>
            
            <p className="font-sans font-medium text-[16px] leading-[1.6] tracking-[-0.02em] text-[#3D4955] max-w-sm">
              {steps[activeStep].description}
            </p>
            
            <div className="mt-4 flex flex-col gap-3">
              <p className="font-sans font-medium text-[14px] leading-[1.4] tracking-[-0.02em] text-[#0B70F8] max-w-sm">
                {steps[activeStep].quote}
              </p>
              <p className="font-sans font-bold text-[14px] leading-none tracking-[-0.02em] text-zinc-900">
                {steps[activeStep].author}
              </p>
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
}
