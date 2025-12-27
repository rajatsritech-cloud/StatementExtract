import type { Metadata } from 'next';
import { RentalROICalculator } from '@/components/calculators/RentalROICalculator';
import { ToolPageFooter } from '@/components/tools/ToolPageFooter';
import { Home, Percent, DollarSign, Calculator, Shield, Search, TrendingUp, Key } from "lucide-react";

export const metadata: Metadata = {
    title: 'Free Rental Property Calculator | Cash Flow & ROI Analysis',
    description: 'Analyze real estate deals instantly. Calculate cash flow, cap rate, and cash-on-cash return with our free Rental Property ROI Calculator. No signup required.',
    keywords: 'rental property calculator, cap rate calculator, real estate investment calculator, cash on cash return, roi calculator, landlord tools, brrrr calculator',
    authors: [{ name: 'Statement Extract' }],
    openGraph: {
        title: 'Rental Property ROI Calculator | Analyze Deals Fast',
        description: 'Is it a good deal? Calculate cash flow and ROI in seconds.',
        type: 'website',
    },
    alternates: {
        canonical: "https://statementextract.com/tools/rental-roi-calculator/",
    },
};

const relatedTools = [
    { href: "/tools/amortization-calculator", title: "Amortization Calculator" },
    { href: "/tools/fire-calculator", title: "FIRE Calculator" },
    { href: "/tools/financial-ratio-calculator", title: "Financial Ratio Calculator" },
    { href: "/tools/debt-snowball-calculator", title: "Debt Snowball Calculator" },
];

export default function RentalROIPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Rental Property ROI Calculator',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'A free calculator for real estate investors to analyze rental property profitability, including metrics like Cap Rate, Cash-on-Cash Return, and Monthly Cash Flow.',
        featureList: 'Cash Flow Analysis, Cap Rate Calculation, Expense Breakdown, Mortgage Payment Calculator',
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'What is Cap Rate?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Capitalization Rate (Cap Rate) is a metric used to evaluate the profitability of a real estate investment. It is calculated by dividing the Net Operating Income (NOI) by the current market value (or purchase price) of the property. It represents the potential annual return if you bought the property with all cash.',
                },
            },
            {
                '@type': 'Question',
                name: 'What is Cash-on-Cash Return?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Cash-on-Cash Return measures the annual pre-tax cash flow relative to the actual cash you invested. Unlike Cap Rate, this metric takes debt service (mortgage payment) into account. It is often considered the most important metric for investors using leverage.',
                },
            },
            {
                '@type': 'Question',
                name: 'What is the 50% Rule?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The 50% rule is a quick estimation tactic that suggests operating expenses (excluding mortgage P&I) will average about 50% of the gross rent over time. If a property rents for $1,000, you can estimate $500 will go to taxes, insurance, repairs, and vacancy.',
                },
            },
        ],
    };

    // HowTo Schema for step-by-step instructions
    const howToSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Calculate Rental Property ROI',
        step: [
            { '@type': 'HowToStep', name: 'Enter Property Details', text: 'Input purchase price, down payment, and monthly rent.' },
            { '@type': 'HowToStep', name: 'Add Operating Expenses', text: 'Enter taxes, insurance, maintenance, vacancy rate, and management fees.' },
            { '@type': 'HowToStep', name: 'Set Financing Terms', text: 'Input your loan interest rate and term for accurate mortgage calculations.' },
            { '@type': 'HowToStep', name: 'Analyze Results', text: 'Review Cash Flow, Cap Rate, and Cash-on-Cash Return to evaluate the deal.' }
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

            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-green-600 mb-4">
                        Rental Property Calculator
                    </h1>
                    <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                        Analyze your next potential deal. Calculate Cash Flow, Cap Rate, and ROI with precision.
                    </p>
                </div>

                <RentalROICalculator />
            </div>

            {/* Feature Grid - "Why Use This Tool?" */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Real Estate Analysis Made Simple
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: DollarSign, title: "Cash Flow Focused", desc: "Instantly see your monthly net profit after ALL expenses. No surprising losses." },
                            { icon: Percent, title: "Cash-on-Cash ROI", desc: "Calculate the true return on your down payment and closing costs." },
                            { icon: Search, title: "Detailed Expense Breakdowns", desc: "Factor in vacancy, maintenance, management, and taxes for accuracy." },
                            { icon: Calculator, title: "Quick Deal Screening", desc: "Evaluate properties in seconds to decide if they are worth a deeper look." },
                            { icon: Shield, title: "Privacy First", desc: "We don't store your property data. Analyze deals privately in your browser." },
                            { icon: Key, title: "Cap Rate Analysis", desc: "Compare property performance objectively, independent of financing terms." },
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

            {/* Rich Content - Metrics Comparison */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-8">
                        Key Investment Metrics Explained
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse rounded-xl overflow-hidden shadow-sm border border-[hsl(var(--border))]">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]">
                                    <th className="px-6 py-4 text-left text-white font-semibold">Metric</th>
                                    <th className="px-6 py-4 text-left text-white font-semibold">Formula</th>
                                    <th className="px-6 py-4 text-left text-white font-semibold">Why it Matters</th>
                                </tr>
                            </thead>
                            <tbody className="bg-[hsl(var(--card))]">
                                {[
                                    { metric: "Cash Flow", formula: "Income - Expenses - Debt Service", desc: "The money you keep each month." },
                                    { metric: "Cap Rate", formula: "NOI / Purchase Price", desc: "Measures inherent property profitability (unleveraged)." },
                                    { metric: "Cash-on-Cash", formula: "Annual Cash Flow / Cash Invested", desc: "Your actual return on the money you put down." },
                                    { metric: "NOI", formula: "Income - Operating Expenses", desc: "Net Operating Income limits loan amounts." },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-[hsl(var(--border))]/50 last:border-0 hover:bg-[hsl(var(--muted))]/30 transition-colors">
                                        <td className="px-6 py-4 font-bold text-[hsl(var(--primary))]">{row.metric}</td>
                                        <td className="px-6 py-4 text-[hsl(var(--muted-foreground))] font-mono text-xs md:text-sm">{row.formula}</td>
                                        <td className="px-6 py-4 text-[hsl(var(--foreground))] text-sm">{row.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-t border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">Key Investment Metrics</h2>
                            <div className="space-y-4 text-[hsl(var(--muted-foreground))]">
                                <div className="p-4 bg-[hsl(var(--card))] rounded-lg border border-[hsl(var(--border))]">
                                    <h3 className="font-semibold text-[hsl(var(--foreground))]">Cash Flow</h3>
                                    <p className="text-sm mt-1">
                                        The profit you take home each month after all expenses and mortgage payments. Positive cash flow is essential for a sustainable rental portfolio.
                                    </p>
                                </div>
                                <div className="p-4 bg-[hsl(var(--card))] rounded-lg border border-[hsl(var(--border))]">
                                    <h3 className="font-semibold text-[hsl(var(--foreground))]">Cap Rate (Capitalization Rate)</h3>
                                    <p className="text-sm mt-1">
                                        NOI / Purchase Price. A way to compare the inherent profitability of different properties regardless of how they are financed.
                                    </p>
                                </div>
                                <div className="p-4 bg-[hsl(var(--card))] rounded-lg border border-[hsl(var(--border))]">
                                    <h3 className="font-semibold text-[hsl(var(--foreground))]">Cash-on-Cash Return</h3>
                                    <p className="text-sm mt-1">
                                        Annual Cash Flow / Total Cash Invested. This tells you the yield on the actual money you put into the deal (Down Payment + Closing Costs + Repairs).
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">Why Use This Calculator?</h2>
                            <div className="space-y-4 text-[hsl(var(--muted-foreground))]">
                                <p>
                                    Real estate investing is a numbers game. Emotions can lead to bad purchases. This calculator helps you objectively analyze a property's potential.
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Catch Hidden Costs:</strong> We include fields for Vacancy, Maintenance, and Management to give you a realistic picture, not an optimistic one.</li>
                                    <li><strong>Leverage Analysis:</strong> See how different down payments and interest rates affect your cash flow.</li>
                                    <li><strong>Privacy Guaranteed:</strong> Your deal data is processed entirely in your browser. We don't store your potential property addresses or financial details.</li>
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
                            <h3 className="font-semibold text-lg mb-2">What is a good Cash-on-Cash Return?</h3>
                            <p className="text-[hsl(var(--muted-foreground))] text-sm">
                                This varies by investor and market, but many target between 8% and 12%. Some investors accept lower returns (4-6%) in high-appreciation markets, while others demand 15%+ in riskier or lower-growth areas.
                            </p>
                        </div>
                        <div className="bg-[hsl(var(--card))] p-6 rounded-xl border border-[hsl(var(--border))]">
                            <h3 className="font-semibold text-lg mb-2">How much should I budget for maintenance?</h3>
                            <p className="text-[hsl(var(--muted-foreground))] text-sm">
                                A common rule of thumb is 1% of the property value per year, or 5-10% of the gross rent. Older homes generally require higher maintenance budgets than newer ones.
                            </p>
                        </div>
                        <div className="bg-[hsl(var(--card))] p-6 rounded-xl border border-[hsl(var(--border))]">
                            <h3 className="font-semibold text-lg mb-2">Should I count vacancy if it's rented?</h3>
                            <p className="text-[hsl(var(--muted-foreground))] text-sm">
                                Yes. Always budget for vacancy (typically 5-8%). Tenants move out, and turnover takes time. Ignoring vacancy is a common mistake that leads to overestimating returns.
                            </p>
                        </div>
                        <div className="bg-[hsl(var(--card))] p-6 rounded-xl border border-[hsl(var(--border))]">
                            <h3 className="font-semibold text-lg mb-2">What defines 'Net Operating Income' (NOI)?</h3>
                            <p className="text-[hsl(var(--muted-foreground))] text-sm">
                                NOI is your total income minus all operating expenses (taxes, insurance, maintenance, etc.). Crucially, NOI <strong>excludes</strong> mortgage payments (principal and interest). It represents the property's ability to generate income independent of debt.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <ToolPageFooter
                currentTool="Rental Property ROI Calculator"
                relatedTools={relatedTools}
            />
        </div>
    );
}
