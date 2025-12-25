"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, X, Zap, Crown, ArrowRight } from "lucide-react";
import { SignUpButton, SignedOut } from "@clerk/clerk-react";

export const tiers = [
    {
        name: "Free",
        price: "$0",
        period: "/month",
        description: "Instant access. No login required.",
        features: [
            { name: "5 pages/document", included: true },
            { name: "Bank statement formats", included: true },
            { name: "CSV & Excel export", included: true },
            { name: "QuickBooks/Xero formats", included: false },
            { name: "Dashboard & History", included: false },
            { name: "Multi-upload supported", included: false },
        ],
        cta: "Try Now",
        href: "/convert-bank-statement-to-csv-excel",
        popular: false,
        icon: Zap,
    },
    {
        name: "Free Plus",
        price: "$0",
        period: "/month",
        description: "More pages. Login required.",
        features: [
            { name: "300 pages/month (10/day)", included: true },
            { name: "All bank statement formats", included: true },
            { name: "CSV, Excel, JSON export", included: true },
            { name: "QuickBooks & Xero formats", included: true },
            { name: "Dashboard & History", included: true },
            { name: "Multi-upload supported", included: true },
        ],
        cta: "Create Free Account",
        href: "", // Controlled by button
        popular: true,
        icon: Crown,
    },
];

export const PricingGrid = () => {
    return (
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {tiers.map((tier, index) => {
                const Icon = tier.icon;
                const isFreePlus = tier.name === "Free Plus";

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
                        {isFreePlus ? (
                            <SignUpButton mode="modal">
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
                            </SignUpButton>
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
    );
};
