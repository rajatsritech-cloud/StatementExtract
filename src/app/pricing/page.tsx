import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, X, Zap, Crown, Building2, ArrowRight, ShieldCheck, Clock, Headphones, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "Pricing | Statement Extract",
    description: "AI-powered document extraction. Simple, transparent pricing. Start free, upgrade when you need more.",
};

const tiers = [
    {
        name: "Free",
        price: "$0",
        period: "/month",
        description: "Perfect for getting started with document extraction.",
        features: [
            { name: "10 pages per month", included: true },
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
            { name: "400 pages per month", included: true },
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

const faqs = [
    {
        question: "What counts as a page?",
        answer: "Each page of your PDF counts as one page toward your monthly limit. For example, a 5-page bank statement uses 5 pages from your quota."
    },
    {
        question: "Can I cancel anytime?",
        answer: "Yes! You can cancel your Pro subscription at any time. You'll continue to have access until the end of your billing period."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express) through our secure Stripe payment processor."
    },
    {
        question: "Is my data secure?",
        answer: "Absolutely. We use bank-level encryption and your documents are automatically deleted after processing. We never store or share your data."
    },
];

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
                {/* Background */}
                <div className="absolute inset-0 bg-grid-pattern-1 bg-size-40 opacity-[0.08] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--primary))]/5 to-transparent pointer-events-none" />

                <div className="relative mx-auto max-w-7xl px-6">
                    <div className="text-center mb-16 animate-fade-in">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-4 py-1.5">
                            <span className="text-sm font-medium text-[hsl(var(--primary))]">
                                Simple, Transparent Pricing
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-[hsl(var(--foreground))] mb-4">
                            Choose Your Plan
                        </h1>
                        <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                            Start free and upgrade when you need more. No hidden fees, cancel anytime.
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
                                            <Icon className={`h-6 w-6 ${tier.popular ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--muted-foreground))]"}`} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">{tier.name}</h2>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-4">
                                        <span className="text-5xl font-bold text-[hsl(var(--foreground))]">{tier.price}</span>
                                        <span className="text-[hsl(var(--muted-foreground))]">{tier.period}</span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-[hsl(var(--muted-foreground))] mb-6">{tier.description}</p>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-8">
                                        {tier.features.map((feature) => (
                                            <li key={feature.name} className="flex items-center gap-3">
                                                {feature.included ? (
                                                    <Check className="h-5 w-5 text-[hsl(var(--primary))] flex-shrink-0" />
                                                ) : (
                                                    <X className="h-5 w-5 text-[hsl(var(--muted-foreground))]/50 flex-shrink-0" />
                                                )}
                                                <span className={feature.included ? "text-[hsl(var(--foreground))]" : "text-[hsl(var(--muted-foreground))]/50"}>
                                                    {feature.name}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
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
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="py-16 border-t border-[hsl(var(--border))]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <div className="p-3 rounded-full bg-[hsl(var(--primary))]/10 mb-4">
                                <ShieldCheck className="h-8 w-8 text-[hsl(var(--primary))]" />
                            </div>
                            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">Bank-Level Security</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                256-bit encryption. Your documents are never stored.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="p-3 rounded-full bg-[hsl(var(--primary))]/10 mb-4">
                                <Clock className="h-8 w-8 text-[hsl(var(--primary))]" />
                            </div>
                            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">Instant Processing</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                Extract data in seconds, not hours.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="p-3 rounded-full bg-[hsl(var(--primary))]/10 mb-4">
                                <Headphones className="h-8 w-8 text-[hsl(var(--primary))]" />
                            </div>
                            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">Dedicated Support</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                Pro users get priority email support.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-24">
                <div className="mx-auto max-w-3xl px-6">
                    <h2 className="text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6"
                            >
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">
                                    {faq.question}
                                </h3>
                                <p className="text-[hsl(var(--muted-foreground))]">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 md:py-24 border-t border-[hsl(var(--border))]">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-lg text-[hsl(var(--muted-foreground))] mb-8">
                        Join thousands of professionals extracting data from bank statements in seconds.
                    </p>
                    <Link href="/convert-bank-statement-to-csv-excel">
                        <Button size="lg" className="gap-2 bg-gradient-primary shadow-glow">
                            Try Free Now
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
