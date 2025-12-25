import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, X, ShieldCheck, Clock, Headphones, ArrowRight } from "lucide-react";
import { PricingGrid } from "@/components/PricingGrid";

export const metadata: Metadata = {
    title: "Pricing | Statement Extract",
    description: "AI-powered document extraction. Simple, transparent pricing. Start free, upgrade when you need more.",
};

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
                    <PricingGrid />
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
