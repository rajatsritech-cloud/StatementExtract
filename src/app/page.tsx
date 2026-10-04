import dynamic from 'next/dynamic';
import { Hero } from "@/components/Hero";
import { LandingPageSchema } from "@/components/LandingPageSchema";
import { FlagshipTools } from "@/components/FlagshipTools";
import { ScanDocumentHero } from "@/components/uselayouts/ScanDocumentHero";
import { BentoFeatures } from "@/components/uselayouts/BentoFeatures";
import { FinancialStandardsGuide } from "@/components/FinancialStandardsGuide";
import { DocumentDemo } from "@/components/DocumentDemo";

// Dynamic imports for components below the fold (performance optimization)
const Features = dynamic(() => import("@/components/Features").then(mod => ({ default: mod.Features })), {
  loading: () => <div className="min-h-[400px] bg-[hsl(var(--background))]" />,
});

const HowItWorks = dynamic(() => import("@/components/HowItWorks").then(mod => ({ default: mod.HowItWorks })), {
  loading: () => <div className="min-h-[400px] bg-[hsl(var(--background))]" />,
});

const UseCases = dynamic(() => import("@/components/UseCases").then(mod => ({ default: mod.UseCases })), {
  loading: () => <div className="min-h-[400px] bg-[hsl(var(--background))]" />,
});

const ToolsShowcase = dynamic(() => import("@/components/ToolsShowcase").then(mod => ({ default: mod.ToolsShowcase })), {
  loading: () => <div className="min-h-[600px] bg-[hsl(var(--background))]" />,
});

const Pricing = dynamic(() => import("@/components/Pricing").then(mod => ({ default: mod.Pricing })), {
  loading: () => <div className="min-h-[600px] bg-[hsl(var(--background))]" />,
});

const Integrations = dynamic(() => import("@/components/Integrations").then(mod => ({ default: mod.Integrations })), {
  loading: () => <div className="min-h-[300px] bg-[hsl(var(--background))]" />,
});

const FAQ = dynamic(() => import("@/components/FAQ").then(mod => ({ default: mod.FAQ })), {
  loading: () => <div className="min-h-[400px] bg-[hsl(var(--background))]" />,
});

const CTA = dynamic(() => import("@/components/CTA").then(mod => ({ default: mod.CTA })), {
  loading: () => <div className="min-h-[200px] bg-[hsl(var(--background))]" />,
});

const RecentBlogs = dynamic(() => import("@/components/RecentBlogs").then(mod => ({ default: mod.RecentBlogs })), {
  loading: () => <div className="min-h-[400px] bg-[hsl(var(--background))]" />,
});

export default function Home() {
  return (
    <>
      <LandingPageSchema />
      <Hero />
      <section className="px-4 py-8 md:py-12 bg-[hsl(var(--background))] border-b border-[hsl(var(--border))]/40">
        <ScanDocumentHero />
      </section>
      <FlagshipTools />
      <BentoFeatures />
      <FinancialStandardsGuide />
      <DocumentDemo />
      <ToolsShowcase />
      <Features />
      <HowItWorks />
      <UseCases />
      <Pricing />
      <Integrations />
      <RecentBlogs />
      <FAQ />
      <CTA />
    </>
  );
}


