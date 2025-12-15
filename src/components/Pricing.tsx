"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, X, Zap, Crown, Building2, ArrowRight, Sparkles } from "lucide-react";

const tiers = [
    {
        name: "Free",
        price: "$0",
        period: "/month",
        description: "Perfect for getting started with document extraction.",
        features: [
            { name: "10 pages/month", included: true },
            { name: "Bank statement formats", included: true },
            { name: "CSV & Excel export", included: true },
            { name: "Basic AI extraction", included: true },
            { name: "QuickBooks/Xero formats", included: false },
            { name: "AI validation & reconciliation", included: false },
            { name: "Priority processing", included: false },
            { name: "24/7 email support", included: false },
        ],
        cta: "Get Started Free",
        href: "/convert-bank-statement-to-csv-excel",
        popular: false,
        icon: Zap,
    },
    {
        name: "Pro",
        price: "$19",
        period: "/month",
        description: "For professionals who need AI-powered accuracy and priority support.",
        features: [
            { name: "400 pages/month", included: true },
            { name: "All bank statement formats", included: true },
            { name: "CSV, Excel, JSON export", included: true },
            { name: "Advanced AI extraction", included: true },
            { name: "QuickBooks & Xero formats", included: true },
            { name: "AI validation & reconciliation", included: true },
            { name: "Priority processing", included: true },
            { name: "24/7 email support", included: true },
        ],
        cta: "Subscribe Now",
        href: "mailto:support@statementextract.com?subject=Pro%20Plan%20Subscription&body=Hi%20Statement%20Extract%20Team%2C%0A%0AI%27d%20like%20to%20subscribe%20to%20the%20Pro%20plan%20(%2419%2Fmonth).%0A%0APlease%20send%20me%20payment%20instructions.%0A%0AThank%20you!",
        popular: true,
        icon: Crown,
    },
    {
        name: "Custom",
        price: "Contact Us",
        period: "",
        description: "Tailored solutions for firms with multiple team members.",
        features: [
            { name: "Unlimited pages", included: true },
            { name: "Multiple team members", included: true },
            { name: "Custom branded portal", included: true },
            { name: "Custom extraction rules", included: true },
            { name: "API access & integrations", included: true },
            { name: "Dedicated account manager", included: true },
            { name: "Custom export formats", included: true },
            { name: "Priority support", included: true },
        ],
        cta: "Contact Sales",
        href: "mailto:support@statementextract.com?subject=Custom%20Plan%20Inquiry&body=Hi%20Statement%20Extract%20Team%2C%0A%0AI%27m%20interested%20in%20a%20custom%20plan%20for%20my%20organization.%0A%0ACompany%20Name%3A%20%0ANumber%20of%20Team%20Members%3A%20%0AEstimated%20Monthly%20Pages%3A%20%0A%0APlease%20contact%20me%20to%20discuss%20pricing%20and%20features.%0A%0AThank%20you!",
        popular: false,
        icon: Building2,
    },
];

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
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {tiers.map((tier, index) => {
                        const Icon = tier.icon;
                        return (
                            <div
                                key={tier.name}
                                className={`relative group rounded-2xl p-6 transition-all duration-300 animate-slide-up ${tier.popular
                                    ? "bg-gradient-card border-2 border-[hsl(var(--primary))]/50 shadow-glow scale-105 z-10"
                                    : "bg-[hsl(var(--card))] border border-[hsl(var(--border))]"
                                    }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Popular Badge */}
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="bg-gradient-primary text-[hsl(var(--primary-foreground))] text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                {/* Icon & Name */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-lg ${tier.popular ? "bg-[hsl(var(--primary))]/20" : "bg-[hsl(var(--muted))]"}`}>
                                        <Icon className={`h-5 w-5 ${tier.popular ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--muted-foreground))]"}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[hsl(var(--foreground))]">{tier.name}</h3>
                                </div>

                                {/* Price */}
                                <div className="mb-3">
                                    <span className="text-4xl font-bold text-[hsl(var(--foreground))]">{tier.price}</span>
                                    <span className="text-[hsl(var(--muted-foreground))]">{tier.period}</span>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-5">{tier.description}</p>

                                {/* Features */}
                                <ul className="space-y-2 mb-6">
                                    {tier.features.map((feature) => (
                                        <li key={feature.name} className="flex items-center gap-2 text-sm">
                                            {feature.included ? (
                                                <Check className="h-4 w-4 text-[hsl(var(--primary))] flex-shrink-0" />
                                            ) : (
                                                <X className="h-4 w-4 text-[hsl(var(--muted-foreground))]/50 flex-shrink-0" />
                                            )}
                                            <span className={feature.included ? "text-[hsl(var(--foreground))]" : "text-[hsl(var(--muted-foreground))]/50"}>
                                                {feature.name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                {tier.comingSoon ? (
                                    <div className="space-y-2">
                                        <Button
                                            size="lg"
                                            disabled
                                            className="w-full gap-2 bg-[hsl(var(--muted))] cursor-not-allowed opacity-70"
                                        >
                                            {tier.cta}
                                        </Button>
                                        <p className="text-xs text-center text-[hsl(var(--primary))] font-medium">
                                            🚀 Beta Phase — Launching Soon!
                                        </p>
                                    </div>
                                ) : (
                                    <Link href={tier.href} className="block">
                                        <Button
                                            size="lg"
                                            className={`w-full group gap-2 ${tier.popular
                                                ? "bg-gradient-primary hover:opacity-90 shadow-glow"
                                                : "bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/80"
                                                }`}
                                        >
                                            {tier.cta}
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>

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
