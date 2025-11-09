// src/app/page.tsx

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { DocumentDemo } from "@/components/DocumentDemo";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { UseCases } from "@/components/UseCases";
import { Integrations } from "@/components/Integrations";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <DocumentDemo />
        <Features />
        <HowItWorks />
        <UseCases />
        <Integrations />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
