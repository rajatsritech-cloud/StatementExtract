import type { Metadata } from 'next';
import { DebtSnowballCalculator } from '@/components/calculators/DebtSnowballCalculator';

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

    return (
        <div className="min-h-screen bg-[hsl(var(--background))] py-12 px-4 sm:px-6 lg:px-8">
            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-blue-600 mb-4">
                        Debt Snowball Calculator
                    </h1>
                    <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                        Stop guessing when you'll be free. Create a concrete plan to eliminate your debt once and for all.
                    </p>
                </div>

                <DebtSnowballCalculator />

                {/* Content Section for SEO */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
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

                {/* FAQs */}
                <div className="mt-20 border-t border-[hsl(var(--border))] pt-12">
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
            </div>
        </div>
    );
}
