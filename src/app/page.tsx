// src/app/page.tsx

import { Hero } from "@/components/Hero";
import { DocumentDemo } from "@/components/DocumentDemo";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { UseCases } from "@/components/UseCases";
import { Pricing } from "@/components/Pricing";
import { Integrations } from "@/components/Integrations";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";

import { RecentBlogs } from "@/components/RecentBlogs";

export default function Home() {
  return (
    <>
      <Hero />
      <DocumentDemo />
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
