import type { Metadata } from 'next';
import { DebtSnowballCalculator } from '@/components/calculators/DebtSnowballCalculator';
import { ToolPageFooter } from '@/components/tools/ToolPageFooter';
import { TrendingDown, Shield, Calendar, PiggyBank, Target, Zap, CheckCircle, Calculator } from "lucide-react";

export const metadata: Metadata = {
    title: 'Free Debt Snowball Calculator | Visualize Your Debt-Free Date',
    description: 'Use our free Debt Snowball Calculator to create a customized payoff plan. Add multiple debts, set extra payments, and see exactly when you will be debt-free. 100% client-side privacy.',
    keywords: 'debt snowball calculator, debt payoff calculator, credit card payoff calculator, dave ramsey calculator, debt reduction planner, financial freedom',
    authors: [{ name: 'Statement Extract' }],
    openGraph: {
        title: 'Free Debt Snowball Calculator | Visualize Your Debt-Free Date',
        description: 'Create your personalized debt payoff plan instantly. See how the snowball method can help you become debt-free faster.',
        type: 'website',
    },
};

const relatedTools = [
    { href: "/tools/amortization-calculator", title: "Amortization Calculator" },
    { href: "/tools/fire-calculator", title: "FIRE Calculator" },
    { href: "/tools/financial-ratio-calculator", title: "Financial Ratio Calculator" },
    { href: "/tools/rental-roi-calculator", title: "Rental ROI Calculator" },
];

export default function DebtSnowballPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Debt Snowball Calculator',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'A free calculator to help users plan their debt repayment using the snowball method.',
        featureList: 'Multiple debt support, Visual payoff timeline, Extra payment modeling, Privacy-first client-side processing',
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'What is the Debt Snowball method?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The debt snowball method is a debt reduction strategy where you pay off debt in order of smallest balance to largest, regardless of interest rate. When the smallest debt is paid in full, you roll the money you were paying on that debt into the next smallest balance.',
                },
            },
            {
                '@type': 'Question',
                name: 'Is the Debt Snowball better than the Avalanche method?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Mathematically, the Avalanche method (paying highest interest first) saves more money. However, the Snowball method is often more effective psychologically because the quick wins of paying off small debts keep you motivated to stick with the plan.',
                },
            },
            {
                '@type': 'Question',
                name: 'Does this calculator save my financial data?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No. This calculator runs entirely in your browser. Your debt details, balances, and payment information never leave your device and are not stored on our servers.',
                },
            },
        ],
    };

    // HowTo Schema for step-by-step instructions
    const howToSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Use the Debt Snowball Calculator',
        step: [
            { '@type': 'HowToStep', name: 'Add Your Debts', text: 'Enter each debt with its name, balance, interest rate, and minimum payment.' },
            { '@type': 'HowToStep', name: 'Set Extra Payment', text: 'Enter any extra monthly amount you can put toward debt payoff.' },
            { '@type': 'HowToStep', name: 'View Payoff Timeline', text: 'See your debt-free date and the order in which debts will be eliminated.' },
            { '@type': 'HowToStep', name: 'Track Progress', text: 'Return monthly to update balances and stay motivated.' }
        ]
    };

    return (
        <div className="min-h-screen bg-[hsl(var(--background))]">
            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />

            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-blue-600 mb-4">
                        Debt Snowball Calculator
                    </h1>
                    <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                        Stop guessing when you'll be free. Create a concrete plan to eliminate your debt once and for all.
                    </p>
                </div>

                <DebtSnowballCalculator />
            </div>

            {/* Feature Grid - "Why Use This Tool?" */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Debt Snowball Calculator?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: TrendingDown, title: "Visualize Freedom", desc: "See your debt balances drop over time with our interactive timeline chart." },
                            { icon: Shield, title: "100% Private", desc: "Your financial data never leaves your browser. We don't store your debt info." },
                            { icon: Target, title: "Snowball vs Avalanche", desc: "Focus on psychological wins (Snowball) to keep your momentum high." },
                            { icon: Calendar, title: "Exact Payoff Date", desc: "Know the specific month and year you will become completely debt-free." },
                            { icon: PiggyBank, title: "Extra Payment Power", desc: "See how adding just $50 or $100 extra per month slashes years off your debt." },
                            { icon: Zap, title: "Instant Results", desc: "No signups, no loading. Get your personalized payoff plan in seconds." },
                        ].map((feature, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <feature.icon className="w-8 h-8 text-[hsl(var(--primary))] mb-4" />
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{feature.title}</h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table Section */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-8">
                        Snowball vs. Avalanche: Which is Right for You?
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse rounded-xl overflow-hidden shadow-sm border border-[hsl(var(--border))]">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]">
                                    <th className="px-6 py-4 text-left text-white font-semibold">Feature</th>
                                    <th className="px-6 py-4 text-left text-white font-semibold">Debt Snowball ❄️</th>
                                    <th className="px-6 py-4 text-left text-white font-semibold">Debt Avalanche 🏔️</th>
                                </tr>
                            </thead>
                            <tbody className="bg-[hsl(var(--card))]">
                                {[
                                    { feature: "Primary Strategy", snowball: "Pay smallest balance first", avalanche: "Pay highest interest rate first" },
                                    { feature: "Psychological Effect", snowball: "High motivation from quick wins", avalanche: "Logical satisfaction from saving money" },
                                    { feature: "Total Interest Paid", snowball: "Slightly higher", avalanche: "Lowest possible" },
                                    { feature: "Speed of First Payoff", snowball: "Very Fast", avalanche: "Slow (if highest rate is large balance)" },
                                    { feature: "Best For", snowball: "People who need motivation to stick with it", avalanche: "People driven by pure math/efficiency" },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-[hsl(var(--border))]/50 last:border-0 hover:bg-[hsl(var(--muted))]/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-[hsl(var(--foreground))]">{row.feature}</td>
                                        <td className="px-6 py-4 text-[hsl(var(--muted-foreground))]">{row.snowball}</td>
                                        <td className="px-6 py-4 text-[hsl(var(--muted-foreground))]">{row.avalanche}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Rich Content Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-t border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">How the Debt Snowball Works</h2>
                            <div className="space-y-4 text-[hsl(var(--muted-foreground))]">
                                <p>
                                    The concept is simple but powerful. Instead of worrying about interest rates, you focus on momentum.
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>List all your debts</strong> from smallest balance to largest.</li>
                                    <li><strong>Pay minimums</strong> on everything except the smallest debt.</li>
                                    <li><strong>Attack the smallest debt</strong> with every extra dollar you have.</li>
                                    <li><strong>Roll it over</strong>. Once the smallest debt is gone, take its payment and add it to the next smallest debt.</li>
                                </ul>
                                <p>
                                    As you pay off debts, your "snowball" payment gets bigger and bigger, crushing the larger debts at the end.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">Why Use This Calculator?</h2>
                            <div className="space-y-4 text-[hsl(var(--muted-foreground))]">
                                <p>
                                    Most people underestimate how much interest works against them, or how much faster they could be free with just a little extra payment.
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Visual Motivation:</strong> See your exact debt-free date move closer as you add extra payments.</li>
                                    <li><strong>Privacy First:</strong> Unlike other financial apps, we don't ask for bank logins or store your data.</li>
                                    <li><strong>Simplicity:</strong> No complex spreadsheets. Just enter your numbers and get your plan.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-12 md:py-16 px-6 border-t border-[hsl(var(--border))]">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] text-center mb-8">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[hsl(var(--card))] p-6 rounded-xl border border-[hsl(var(--border))]">
                            <h3 className="font-semibold text-lg mb-2">Should I include my mortgage?</h3>
                            <p className="text-[hsl(var(--muted-foreground))] text-sm">
                                Generally, no. The debt snowball is designed for consumer debt like credit cards, car loans, and student loans. Mortgages are usually paid off separately over a longer term, unless you are in the final stage of total debt freedom (often called "Baby Step 6").
                            </p>
                        </div>
                        <div className="bg-[hsl(var(--card))] p-6 rounded-xl border border-[hsl(var(--border))]">
                            <h3 className="font-semibold text-lg mb-2">What if I have 0% interest debts?</h3>
                            <p className="text-[hsl(var(--muted-foreground))] text-sm">
                                In the strict snowball method, you treat them the same: list by balance size. However, if a 0% promotion is expiring soon, some people choose to prioritize it to avoid back-interest penalties.
                            </p>
                        </div>
                        <div className="bg-[hsl(var(--card))] p-6 rounded-xl border border-[hsl(var(--border))]">
                            <h3 className="font-semibold text-lg mb-2">Can I save my progress?</h3>
                            <p className="text-[hsl(var(--muted-foreground))] text-sm">
                                Currently, for privacy reasons, we do not save your data to a server. You can keep this tab open, or re-enter your updated numbers next month to track your progress.
                            </p>
                        </div>
                        <div className="bg-[hsl(var(--card))] p-6 rounded-xl border border-[hsl(var(--border))]">
                            <h3 className="font-semibold text-lg mb-2">Snowball vs. Avalanche?</h3>
                            <p className="text-[hsl(var(--muted-foreground))] text-sm">
                                The Avalanche method targets high-interest debts first. While it saves more money mathematically, the Snowball method is often more successful in the real world because the psychological boost of eliminating entire debts quickly keeps you committed.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <ToolPageFooter
                currentTool="Debt Snowball Calculator"
                relatedTools={relatedTools}
            />
        </div>
    );
}
