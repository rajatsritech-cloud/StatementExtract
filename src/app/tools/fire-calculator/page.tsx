import type { Metadata } from 'next';
import { FIRECalculator } from '@/components/calculators/FIRECalculator';
import { ToolPageFooter } from '@/components/tools/ToolPageFooter';
import { TrendingUp, Shield, Calendar, Target, Zap, DollarSign, Activity, Lock } from "lucide-react";

export const metadata: Metadata = {
    title: 'FIRE Calculator | Financial Independence Retire Early Planner',
    description: 'Plan your early retirement with our free FIRE Calculator. Based on the 4% rule and your savings rate, find out exactly when you will be debt-free. 100% client-side data privacy.',
    keywords: 'fire calculator, financial independence retire early, early retirement calculator, 4% rule calculator, savings rate calculator, retirement projection, fire movement, retire early calculator',
    authors: [{ name: 'Statement Extract' }],
    openGraph: {
        title: 'FIRE Calculator | When Can You Retire?',
        description: 'Calculate your path to Financial Independence. See how your savings rate impacts your retirement date.',
        type: 'website',
    },
};

const relatedTools = [
    { href: "/tools/rental-roi-calculator", title: "Rental ROI Calculator" },
    { href: "/tools/amortization-calculator", title: "Amortization Calculator" },
    { href: "/tools/debt-snowball-calculator", title: "Debt Snowball Calculator" },
    { href: "/tools/profit-margin-calculator", title: "Profit Margin Calculator" },
];

export default function FIREPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'FIRE Calculator',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'A free calculator to help users plan their early retirement (FIRE) based on savings rate and investment returns.',
        featureList: '4% safe withdrawal rule, Savings rate calculation, Net worth projection, Inflation adjustment consideration',
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'What is the 4% Rule?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The 4% rule is a rule of thumb used to determine how much you need to save to retire. It suggests that if you withdraw 4% of your portfolio in the first year of retirement and adjust that amount for inflation thereafter, your money should last for at least 30 years.',
                },
            },
            {
                '@type': 'Question',
                name: 'What is my FI Number?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Your "FI Number" (Financial Independence Number) is the total amount you need invested to support your lifestyle indefinitely. It is typically calculated as your annual expenses multiplied by 25 (which corresponds to a 4% withdrawal rate).',
                },
            },
            {
                '@type': 'Question',
                name: 'How does savings rate affect retirement?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The savings rate is the most important factor in early retirement. A higher savings rate means you are living on less (so you need less to retire) AND saving more. For example, a 50% savings rate can theoretically lead to retirement in about 17 years starting from zero.',
                },
            },
        ],
    };

    // HowTo Schema for step-by-step instructions
    const howToSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Calculate Your FIRE Number',
        step: [
            { '@type': 'HowToStep', name: 'Enter Current Finances', text: 'Input your age, annual income, annual expenses, and current net worth.' },
            { '@type': 'HowToStep', name: 'Set Investment Return', text: 'Enter your expected annual investment return (7% is a common inflation-adjusted estimate).' },
            { '@type': 'HowToStep', name: 'View Your FI Number', text: 'See the portfolio size needed to retire (typically 25x annual expenses).' },
            { '@type': 'HowToStep', name: 'Find Your FIRE Date', text: 'Discover the year and age when you can achieve financial independence.' }
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
                    <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-purple-600 mb-4">
                        FIRE Calculator
                    </h1>
                    <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                        Financial Independence, Retire Early. Discover the math behind your freedom.
                    </p>
                </div>

                <FIRECalculator />
            </div>

            {/* Feature Grid - "Why Use This Tool?" */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our FIRE Calculator?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Target, title: "Find Your Number", desc: "Instantly calculate your 'FI Number'—the exact portfolio size needed to retire forever." },
                            { icon: Activity, title: "Savings Rate Power", desc: "Visualize how increasing your savings rate by even 5% drastically cuts working years." },
                            { icon: Shield, title: "Privacy First", desc: "No data collection. Your financial details are processed locally in your browser." },
                            { icon: TrendingUp, title: "Visual Projection", desc: "See your net worth grow over time with our interactive 60-year projection chart." },
                            { icon: Calendar, title: "Accurate Timeline", desc: "Get a realistic estimate of the age and year you can hand in your resignation." },
                            { icon: Lock, title: "Safe Withdrawal", desc: "Built on the researched 'Safe Withdrawal Rate' principles (The 4% Rule)." },
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

            {/* Rich Content - Savings Rate Impact Table */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-8">
                        The Power of Savings Rate
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8 max-w-2xl mx-auto">
                        Assuming you start from $0 net worth and earn a 5% inflation-adjusted investment return, here is how long it takes to reach Financial Independence based on how much of your take-home pay you save.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse rounded-xl overflow-hidden shadow-sm border border-[hsl(var(--border))]">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]">
                                    <th className="px-6 py-4 text-left text-white font-semibold">Savings Rate</th>
                                    <th className="px-6 py-4 text-left text-white font-semibold">Years to Retirement</th>
                                </tr>
                            </thead>
                            <tbody className="bg-[hsl(var(--card))]">
                                {[
                                    { rate: "10%", years: "51 years" },
                                    { rate: "25%", years: "32 years" },
                                    { rate: "40%", years: "22 years" },
                                    { rate: "50%", years: "17 years" },
                                    { rate: "65%", years: "10.5 years" },
                                    { rate: "80%", years: "5.5 years" },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-[hsl(var(--border))]/50 last:border-0 hover:bg-[hsl(var(--muted))]/30 transition-colors">
                                        <td className="px-6 py-4 font-bold text-[hsl(var(--primary))]">{row.rate}</td>
                                        <td className="px-6 py-4 text-[hsl(var(--foreground))] font-medium">{row.years}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-center text-xs text-[hsl(var(--muted-foreground))] mt-4">
                        *Based on the 'Shockingly Simple Math Behind Early Retirement' by Mr. Money Mustache. Assumes 4% withdrawal rate.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-t border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">Understanding the Approach</h2>
                            <div className="space-y-4 text-[hsl(var(--muted-foreground))]">
                                <p>
                                    FIRE (Financial Independence, Retire Early) is a movement dedicated to extreme savings and investment that allows proponents to retire far earlier than traditional budgets and retirement plans.
                                </p>
                                <h3 className="font-semibold text-[hsl(var(--foreground))]">The Core Formula</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Expenses vs. Income:</strong> It's not about how much you earn, but how much you keep.</li>
                                    <li><strong>The Multiple of 25:</strong> To be safe, you generally need 25 times your annual expenses invested.</li>
                                    <li><strong>Compounding:</strong> Time in the market does the heavy lifting.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">Types of FIRE</h2>
                            <div className="space-y-4 text-[hsl(var(--muted-foreground))]">
                                <ul className="space-y-4">
                                    <li>
                                        <strong className="text-[hsl(var(--foreground))]">Lean FIRE:</strong> Living on a strict budget (e.g., spending &#60;$40k/year) to retire as quickly as possible.
                                    </li>
                                    <li>
                                        <strong className="text-[hsl(var(--foreground))]">Fat FIRE:</strong> Saving a significantly larger amount (e.g., $2.5M+) to support a lavish lifestyle in retirement.
                                    </li>
                                    <li>
                                        <strong className="text-[hsl(var(--foreground))]">Coast FIRE:</strong> Saving enough early so that compound interest will carry you to retirement without further contributions.
                                    </li>
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
                            <h3 className="font-semibold text-lg mb-2">What is a safe withdrawal rate?</h3>
                            <p className="text-[hsl(var(--muted-foreground))] text-sm">
                                The standard "safe" rate is 4%, based on the Trinity Study. This means in your first year of retirement, you withdraw 4% of your total portfolio value. However, some conservative planners prefer 3.5% or 3% to account for longer lifespans or lower expected market returns.
                            </p>
                        </div>
                        <div className="bg-[hsl(var(--card))] p-6 rounded-xl border border-[hsl(var(--border))]">
                            <h3 className="font-semibold text-lg mb-2">Does this account for inflation?</h3>
                            <p className="text-[hsl(var(--muted-foreground))] text-sm">
                                This simple calculator uses "real" dollars, meaning the return rate you enter should be adjusted for inflation. Typically, the stock market returns 10%, and inflation is 3%, so entering a 7% return gives you an inflation-adjusted projection.
                            </p>
                        </div>
                        <div className="bg-[hsl(var(--card))] p-6 rounded-xl border border-[hsl(var(--border))]">
                            <h3 className="font-semibold text-lg mb-2">Is Social Security included?</h3>
                            <p className="text-[hsl(var(--muted-foreground))] text-sm">
                                No, this calculator focuses strictly on your investment portfolio. Social Security benefits would be additional income that effectively lowers the "FI Number" you need to hit, providing an extra safety margin.
                            </p>
                        </div>
                        <div className="bg-[hsl(var(--card))] p-6 rounded-xl border border-[hsl(var(--border))]">
                            <h3 className="font-semibold text-lg mb-2">Is this investment advice?</h3>
                            <p className="text-[hsl(var(--muted-foreground))] text-sm">
                                No. This is a mathematical projection tool. Market returns vary, and past performance does not guarantee future results. Always consult a qualified financial advisor before making major life decisions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <ToolPageFooter
                currentTool="FIRE Calculator"
                relatedTools={relatedTools}
            />
        </div>
    );
}
