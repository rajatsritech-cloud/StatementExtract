import type { Metadata } from 'next';
import { FIRECalculator } from '@/components/calculators/FIRECalculator';

export const metadata: Metadata = {
    title: 'FIRE Calculator | Financial Independence Retire Early Planner',
    description: 'Plan your early retirement with our free FIRE Calculator. Based on the 4% rule and your savings rate, find out exactly when you will reach financial independence.',
    keywords: 'fire calculator, financial independence retire early, early retirement calculator, 4% rule calculator, savings rate calculator, retirement projection, fire movement',
    authors: [{ name: 'Statement Extract' }],
    openGraph: {
        title: 'FIRE Calculator | When Can You Retire?',
        description: 'Calculate your path to Financial Independence. See how your savings rate impacts your retirement date.',
        type: 'website',
    },
};

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
                    <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-purple-600 mb-4">
                        FIRE Calculator
                    </h1>
                    <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                        Financial Independence, Retire Early. Discover the math behind your freedom.
                    </p>
                </div>

                <FIRECalculator />

                {/* Content Section for SEO */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
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
                                    <strong className="text-[hsl(var(--foreground))]">Coast FIRE:</strong> Saving enough early so that compound interest will carry you to retirement without further contributions, allowing you to "coast" in a lower-stress job.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* FAQs */}
                <div className="mt-20 border-t border-[hsl(var(--border))] pt-12">
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
            </div>
        </div>
    );
}
