"use client";

import { Sparkles } from "lucide-react";
import { PricingGrid } from "./PricingGrid";

export const Pricing = () => {
    return (
        <section className="relative overflow-hidden bg-[hsl(var(--background))] py-24 md:py-32">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern-1 bg-size-40 opacity-[0.08] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--primary))]/5 to-transparent pointer-events-none" />

            {/* Floating SVG Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg className="absolute top-20 right-20 w-40 h-40 text-[hsl(var(--primary))]/10 animate-float" style={{ animationDelay: '0s' }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M45.3,-57.3C57.9,-49.1,66.7,-33.5,70.4,-16.3C74.1,0.9,72.7,19.7,64.6,35.1C56.5,50.5,41.7,62.5,24.8,68.4C7.9,74.3,-11.1,74.1,-28.4,68.2C-45.7,62.3,-61.3,50.7,-69.5,35.2C-77.7,19.7,-78.5,0.3,-74.6,-17.6C-70.7,-35.5,-62.1,-51.9,-49.3,-60C-36.5,-68.1,-18.3,-67.9,-0.5,-67.2C17.2,-66.5,32.7,-65.5,45.3,-57.3Z" transform="translate(100 100)" />
                </svg>
                <svg className="absolute bottom-20 left-20 w-32 h-32 text-[hsl(var(--accent))]/10 animate-float" style={{ animationDelay: '2s' }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M41.3,-53.4C53.4,-43.7,62.7,-30.9,66.6,-16.4C70.5,-1.9,69,14.3,62.2,28.3C55.4,42.3,43.3,54.1,28.7,61.2C14.1,68.3,-3.1,70.7,-19.6,66.9C-36.1,63.1,-51.9,53.1,-61.3,38.9C-70.7,24.7,-73.7,6.3,-70.5,-10.3C-67.3,-26.9,-57.9,-41.7,-45.3,-51.2C-32.7,-60.7,-16.3,-64.9,-0.8,-63.8C14.7,-62.7,29.3,-63.1,41.3,-53.4Z" transform="translate(100 100)" />
                </svg>
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-4 py-1.5">
                        <Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" />
                        <span className="text-sm font-medium text-[hsl(var(--primary))]">
                            AI-Powered Document Intelligence
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))] mb-4">
                        Choose Your Plan
                    </h2>
                    <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                        Industry-leading accuracy powered by AI. Start free, scale as you grow.
                    </p>
                </div>

                {/* Pricing Cards */}
                <PricingGrid />

                {/* Trust Indicators */}
                <div className="mt-16 text-center">
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        Trusted by CPAs, accountants, and financial professionals worldwide. Bank-level encryption.
                    </p>
                </div>
            </div>
        </section>
    );
};
