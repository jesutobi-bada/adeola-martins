import { Button } from "@/components/ui/button";

export function Introduction() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[linear-gradient(164.34deg,#FFFFFF_-18.24%,#D3FBFD_-6.6%,#EFF1FD_25.14%,#FFFFFF_77.86%)] pt-32 md:pt-40">
      <div className="container mx-auto px-6 py-20 flex flex-col items-center text-center">
        
        {/* Hello Script */}
        <div className="mb-6 flex items-center gap-2">
          <span className="font-script text-[40px] text-[#000000] leading-none">Hello</span>
          <span className="text-2xl animate-bounce">👋</span>
        </div>

        {/* Main Heading */}
        <h1 className="max-w-4xl font-sans font-semibold text-[40px] leading-[48px] tracking-[-2px] text-zinc-900 mb-8 text-center text-outline">
          I'm Martins. I turn <span className="text-[#0B70F8]">complex ideas</span> into <br className="hidden md:block" /> simple, usable products.
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl font-sans font-normal text-base leading-relaxed tracking-[-0.02em] text-[#3D4955] mb-12 text-center">
          Product designer with 4+ years of experience creating intuitive, scalable <br className="hidden md:block" />
          experiences that drive user engagement and business results.
        </p>

        {/* Hire Me Button */}
        <Button 
          asChild
          size="lg" 
          className="w-[220px] h-[60px]"
        >
          <a href="#contact">Hire Me</a>
        </Button>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px] -z-10 animate-pulse delay-700" />
      </div>
    </section>
  );
}
