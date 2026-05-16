"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-[60px] left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav 
        style={{
          background: 'linear-gradient(164.34deg, #FFFFFF -18.24%, #D3FBFD -6.6%, #EFF1FD 25.14%, #FFFFFF 77.86%)',
          borderColor: '#0B70F81A',
        }}
        className="pointer-events-auto flex items-center justify-between max-w-[800px] w-full h-[80px] px-10 py-5 rounded-[60px] border shadow-[0px_8px_32px_0px_rgba(0,0,0,0.05)] backdrop-blur-xl gap-[10px]"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.svg" 
            alt="Logo" 
            width={32}
            height={32}
            className="h-8 w-auto"
          />
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className={cn(
              "text-base font-medium transition-colors",
              pathname === "/" ? "text-[#0B70F8] hover:text-[#0B70F8]/80" : "text-zinc-500 hover:text-zinc-900"
            )}
          >
            Home
          </Link>
          <Link 
            href="/projects" 
            className={cn(
              "text-base font-medium transition-colors",
              pathname?.startsWith("/projects") ? "text-[#0B70F8] hover:text-[#0B70F8]/80" : "text-zinc-500 hover:text-zinc-900"
            )}
          >
            Portfolio
          </Link>
        </div>

        {/* Action Button */}
        <Button 
          asChild
          size="lg" 
          className="w-26"
        >
          <a href="#contact">Hire Me</a>
        </Button>
      </nav>
    </div>
  );
}
