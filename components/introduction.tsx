import { Button } from "@/components/ui/button";

export function Introduction() {
  return (
    <section className="relative w-full pt-50 flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col items-center text-center ">
        
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

        {/* Book a Call Button */}
        <Button 
          asChild
          size="lg" 
          className="w-[220px] h-[60px]"
        >
          <a href="https://calendly.com/alabiadeolamartins" target="_blank" rel="noopener noreferrer">Book a Call</a>
        </Button>

      </div>
    </section>
  );
}
