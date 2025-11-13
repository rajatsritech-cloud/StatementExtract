// src/app/page.tsx

import { Hero } from "@/components/Hero";
import { DocumentDemo } from "@/components/DocumentDemo";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { UseCases } from "@/components/UseCases";
import { Integrations } from "@/components/Integrations";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <DocumentDemo />
      <Features />
      <HowItWorks />
      <UseCases />
      <Integrations />
      <CTA />
    </>
  );
}
