"use client";

import { Sparkles } from "lucide-react";
import { PricingGrid } from "./PricingGrid";

export const Pricing = () => {
    return (
        <section id="pricing" aria-labelledby="pricing-heading" className="relative overflow-hidden bg-[hsl(var(--background))] py-12 md:py-20">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern-1 bg-size-40 opacity-[0.08] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--primary))]/5 to-transparent pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-4 py-1.5">
                        <span className="text-sm font-medium text-[hsl(var(--primary))]">
                            AI-Powered Document Intelligence
                        </span>
                    </div>
                    <h2 id="pricing-heading" className="text-4xl md:text-5xl font-bold tracking-tight text-[hsl(var(--foreground))] mb-4">
                        Choose Your Plan
                    </h2>
                    <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                        Industry-leading accuracy powered by AI. Start free, scale as you grow.
                    </p>
                </div>

                {/* Pricing Cards */}
                <PricingGrid />

                {/* Trust Indicators */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        Trusted by CPAs, accountants, and financial professionals worldwide. Bank-level encryption.
                    </p>
                </div>
            </div>
        </section>
    );
};
