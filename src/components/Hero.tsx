import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, CheckCircle2, ShieldCheck } from "lucide-react";
import { PrivacyNotice } from "@/components/PrivacyNotice";

export const Hero = () => {
  const logos = [
    { name: "QuickBooks", icon: "QB" },
    { name: "Xero", icon: "X" },
    { name: "Excel", icon: "E" },
    { name: "FreshBooks", icon: "FB" },
    { name: "NetSuite", icon: "N" },
    { name: "Sage", icon: "S" },
    { name: "Wave", icon: "W" },
    { name: "Zoho Books", icon: "Z" },
  ];

  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden bg-[hsl(var(--background))] pt-16 pb-12 md:pt-32 md:pb-24">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern-strong bg-size-128 opacity-[0.15] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 flex flex-col items-center">
        <div className="flex flex-col items-center text-center max-w-6xl mx-auto z-10">

          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary))]/20 bg-[hsl(var(--primary))]/5 px-4 py-1.5 backdrop-blur-sm animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--primary))] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[hsl(var(--primary))]"></span>
            </span>
            <span className="text-sm font-medium text-[hsl(var(--primary))]">
              #1 Bank Statement & Invoice Converter
            </span>
          </div>

          {/* Headline */}
          <h1 id="hero-heading" className="mb-8 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] animate-slide-up">
            Intelligent Document Processing <br className="hidden md:block" />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Reimagined for Scale</span>
          </h1>

          {/* Subheadline */}
          <p className="mb-10 max-w-2xl text-lg text-[hsl(var(--muted-foreground))] md:text-xl animate-fade-in delay-100">
            The most accurate <strong>Bank Statement & Invoice Converter</strong> in 2026. Automatically convert bank statements to Excel, CSV, QuickBooks, and Xero. AI-powered PDF extraction—compatible with 1000+ banks and all major accounting software.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in delay-200">
            <Link href="/convert-bank-statement-to-csv-excel" passHref className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base shadow-glow gap-2 group">
                Start Converting Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#flagship-tools" passHref className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base gap-2">
                Explore Tools
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-[hsl(var(--muted-foreground))] animate-fade-in delay-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[hsl(var(--primary))]" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[hsl(var(--primary))]" />
              <span>Bank-Level Security</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[hsl(var(--primary))]" />
              <span>Support for 1000+ Banks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="mt-20 md:mt-32 relative w-full border-t border-[hsl(var(--border))]/40 bg-[hsl(var(--background))]/50 backdrop-blur-sm">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[hsl(var(--background))] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[hsl(var(--background))] to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden py-8 group pause-on-hover select-none">
          <div className="flex animate-scroll min-w-full shrink-0 gap-16 md:gap-24 px-8 items-center justify-around">
            {[...logos, ...logos].map((logo, i) => (
              <div key={i} className="flex items-center gap-3 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105 cursor-default">
                {/* Placeholder for actual logos - using text for professional look if assets missing */}
                <span className="text-xl md:text-2xl font-bold font-headings tracking-tight text-[hsl(var(--foreground))] whitespace-nowrap">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
          {/* Duplicate for seamless loop if needed by CSS logic, but 'animate-scroll' usually works on the parent wrapper if using a specific technique. 
               Here we used the 'duplicate content' technique inside the single wrapper. 
               Wait, the standard is: 
               <div wrapper> 
                  <div track class="flex animate-scroll"> 
                     content 
                     content 
                  </div> 
               </div>
               My CSS 'transform: translateX(-50%)' implies the track contains exactly 2 copies of the content and we slide by half.
               So the structure above:
               <div class="flex animate-scroll ...">
                  mapped items (which is logos + logos)
               </div>
               This works perfect. 100% -> -50% means we slide half the width.
           */}
        </div>
      </div>
    </section >
  );
};


