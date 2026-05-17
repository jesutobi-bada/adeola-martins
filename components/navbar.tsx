"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="fixed top-4 md:top-[60px] left-0 right-0 z-50 flex flex-col items-center px-4 pointer-events-none">
      <nav 
        style={{
          background: 'linear-gradient(164.34deg, #FFFFFF -18.24%, #D3FBFD -6.6%, #EFF1FD 25.14%, #FFFFFF 77.86%)',
          borderColor: '#0B70F81A',
        }}
        className="pointer-events-auto flex items-center justify-between max-w-[800px] w-full h-[64px] md:h-[80px] px-6 md:px-10 py-3 md:py-5 rounded-[60px] border shadow-[0px_8px_32px_0px_rgba(0,0,0,0.05)] backdrop-blur-xl gap-[10px] transition-all duration-300"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
          <Image 
            src="/logo.svg" 
            alt="Logo" 
            width={32}
            height={32}
            className="h-6 md:h-8 w-auto"
            priority
          />
        </Link>

        {/* Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className={cn(
              "text-base font-medium transition-colors",
              pathname === "/" ? "text-[#0B70F8] hover:text-[#0B70F8]/80" : "text-zinc-500 hover:text-[#0B70F8]"
            )}
          >
            Home
          </Link>
          <Link 
            href="/projects" 
            className={cn(
              "text-base font-medium transition-colors",
              pathname?.startsWith("/projects") ? "text-[#0B70F8] hover:text-[#0B70F8]/80" : "text-zinc-500 hover:text-[#0B70F8]"
            )}
          >
            Portfolio
          </Link>
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button 
            asChild
            size="lg" 
            className="hidden md:flex"
          >
            <a href="https://calendly.com/alabiadeolamartins" target="_blank" rel="noopener noreferrer">Book a Call</a>
          </Button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-zinc-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div 
          className="pointer-events-auto w-full max-w-[800px] mt-2 rounded-[32px] border border-[#0B70F81A] shadow-lg backdrop-blur-xl flex flex-col p-6 gap-6 md:hidden animate-in fade-in slide-in-from-top-4"
          style={{
            background: 'linear-gradient(164.34deg, #FFFFFF -18.24%, #D3FBFD -6.6%, #EFF1FD 25.14%, #FFFFFF 77.86%)',
          }}
        >
          <div className="flex flex-col gap-4">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-lg font-medium transition-colors px-4 py-2 rounded-2xl",
                pathname === "/" ? "bg-[#0B70F8]/5 text-[#0B70F8]" : "text-zinc-500"
              )}
            >
              Home
            </Link>
            <Link 
              href="/projects" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-lg font-medium transition-colors px-4 py-2 rounded-2xl",
                pathname?.startsWith("/projects") ? "bg-[#0B70F8]/5 text-[#0B70F8]" : "text-zinc-500"
              )}
            >
              Portfolio
            </Link>
          </div>
          <Button 
            asChild
            size="lg" 
            className="w-full h-14 text-lg rounded-[100px]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <a href="https://calendly.com/alabiadeolamartins" target="_blank" rel="noopener noreferrer">Book a Call</a>
          </Button>
        </div>
      )}
    </div>
  );
}
