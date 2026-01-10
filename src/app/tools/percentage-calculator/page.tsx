import { Metadata } from "next";
import { PercentageTool } from "@/components/tools/PercentageTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { PageMeta } from "@/components/PageMeta";
import {
    Percent,
    TrendingUp,
    TrendingDown,
    ShoppingCart,
    PieChart,
    Zap
} from "lucide-react";

export const metadata: Metadata = {
    title: "Percentage Change Calculator | Increase & Decrease Online",
    description: "Calculate percentage increase, decrease, or difference between two numbers. Free tool for discounts, sales tax, and growth rates. Instant results.",
    keywords: "percentage increase calculator, percent change calculator, percentage difference, calculate percentage of number, percentage decrease formula, discount calculator",
    openGraph: {
        title: "Percentage Calculator - Increase, Decrease & Difference",
        description: "The all-in-one percentage tool. Calculate growth, discounts, and proportions instantly.",
        type: "website",
        url: "https://statementextract.com/tools/percentage-calculator",
    },
    alternates: {
        canonical: "https://statementextract.com/tools/percentage-calculator",
    },
};

const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Percentage Calculator",
    "applicationCategory": "MathApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": "Percentage Increase, Percentage Decrease, Percentage of Number",
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Tools", "item": "https://statementextract.com/tools" },
        { "@type": "ListItem", "position": 2, "name": "Percentage Calculator" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do calculate percentage increase?",
            "acceptedAnswer": { "@type": "Answer", "text": "Subtract the original number from the new number, divide the result by the original number, and multiply by 100. Formula: ((New - Old) ÷ Old) × 100." }
        },
        {
            "@type": "Question",
            "name": "How do I calculate a 20% discount?",
            "acceptedAnswer": { "@type": "Answer", "text": "To calculate a 20% discount, multiply the original price by 0.20 to find the savings, then subtract that from the original price. Or simply multiply the price by 0.80 to get the final cost." }
        },
        {
            "@type": "Question",
            "name": "What is the formula for percentage difference?",
            "acceptedAnswer": { "@type": "Answer", "text": "Percentage difference compares two values. Formula: |V1 - V2| ÷ ((V1 + V2) ÷ 2) × 100. This is best used when neither value is the 'original' reference point." }
        }
    ]
};

const relatedTools = [
    { href: "/tools/hourly-to-salary-calculator", title: "Hourly to Salary Calculator" },
    { href: "/tools/profit-margin-calculator", title: "Profit Margin Calculator" },
    { href: "/tools/amortization-calculator", title: "Amortization Calculator" },
];

export default function PercentagePage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <PercentageTool />
            </section>

            {/* Formula Cheat Sheet (AEO Optimized) */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-8">
                        Percentage Formula Cheat Sheet
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-[hsl(var(--muted))]/20 border border-[hsl(var(--border))]">
                            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-green-500" />
                                Percentage Increase Formula
                            </h3>
                            <div className="bg-[hsl(var(--background))] p-4 rounded-xl font-mono text-sm md:text-base text-center border border-[hsl(var(--border))]">
                                ((New Value - Old Value) ÷ Old Value) × 100
                            </div>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-3">
                                Example: Moving from $50 to $75 is a 50% increase.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[hsl(var(--muted))]/20 border border-[hsl(var(--border))]">
                            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                <PieChart className="w-5 h-5 text-blue-500" />
                                "Percentage Of" Formula
                            </h3>
                            <div className="bg-[hsl(var(--background))] p-4 rounded-xl font-mono text-sm md:text-base text-center border border-[hsl(var(--border))]">
                                (Percentage ÷ 100) × Total Value
                            </div>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-3">
                                Example: 20% of $500 is $100.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Real World Use Cases */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-12">
                        Real-World Applications
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: ShoppingCart,
                                title: "Discounts & Sales",
                                desc: "Calculate the final price of an item on sale. 25% off a $80 jacket means you save $20 and pay $60."
                            },
                            {
                                icon: TrendingUp,
                                title: "Investment Growth",
                                desc: "Track your portfolio performance. If you bought for $1,000 and sold for $1,500, calculate your 50% ROI."
                            },
                            {
                                icon: Percent,
                                title: "Tips & Tax",
                                desc: "Calculate a 20% tip on a bill ($50 bill = $10 tip) or add 8% sales tax to a purchase."
                            },
                            {
                                icon: TrendingDown,
                                title: "Inflation Calculator",
                                desc: "Determine how much purchasing power has decreased over time using the percentage decrease mode."
                            },
                            {
                                icon: PieChart,
                                title: "Weight Loss",
                                desc: "Track progress by calculating percentage of body weight lost over time."
                            },
                            {
                                icon: Zap,
                                title: "Markup & Margin",
                                desc: "For business owners, calculate the markup percentage needed to achieve a specific profit margin."
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-[hsl(var(--card))] p-8 rounded-2xl border border-[hsl(var(--border))]">
                                <item.icon className="w-10 h-10 text-[hsl(var(--primary))] mb-4" />
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deep Content for Rankings */}
            <section className="py-12 px-6">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-center mb-8">Mastering Percentages: Beyond the Calculator</h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-12 not-prose">
                        <div className="bg-orange-500/5 p-6 rounded-2xl border border-orange-500/20">
                            <h3 className="font-bold text-lg text-orange-700 dark:text-orange-400 mb-3">
                                ⚠️ The "Percentage Point" Trap
                            </h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                                Moving from <strong>5% to 7%</strong> is NOT a 2% increase. It is a <strong>2 percentage point</strong> increase, but a <strong>40% relative increase</strong> in the underlying rate.
                                <br /><br />
                                <em>Formula: ((7 - 5) / 5) * 100 = 40%</em>
                            </p>
                        </div>
                        <div className="bg-blue-500/5 p-6 rounded-2xl border border-blue-500/20">
                            <h3 className="font-bold text-lg text-blue-700 dark:text-blue-400 mb-3">
                                🔄 Reverse Percentages
                            </h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                                If a price is $120 <em>after</em> a 20% tax, the original price was NOT $100. It was $100.
                                <br /><br />
                                <em>Wrong: 120 - 20% = 96</em>
                                <br />
                                <em>Right: 120 / 1.20 = 100</em>
                            </p>
                        </div>
                    </div>

                    <h3>Why "Percent" Means "Per 100"</h3>
                    <p>
                        The word comes from the Latin <em>per centum</em>, literally meaning "by the hundred". It is a standardized way of expressing fractions.
                        <strong> 0.5</strong>, <strong>1/2</strong>, and <strong>50%</strong> are mathematically identical values represented in different formats.
                    </p>

                    <h3>How to Calculate Percentages in Your Head</h3>
                    <p>
                        While this calculator is instant, knowing these mental math tricks is useful:
                    </p>
                    <ul>
                        <li><strong>10%</strong>: Move the decimal point one spot to the left (10% of 500 is 50).</li>
                        <li><strong>1%</strong>: Move the decimal point two spots to the left (1% of 500 is 5).</li>
                        <li><strong>5%</strong>: Find 10%, then cut it in half.</li>
                        <li><strong>15%</strong>: Find 10%, find 5%, and add them together.</li>
                    </ul>
                </div>
            </section>

            {/* Comparison Table: Change vs Difference */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Percentage Change vs. Percentage Difference
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        It is crucial to choose the right calculation for your specific scenario.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]/10">
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--foreground))]">Feature</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--primary))]">Percentage Change</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--muted-foreground))]">Percentage Difference</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: "Goal", change: "Track growth/loss over time", diff: "Compare two separate items" },
                                    { feature: "Order Matters?", change: "Yes (Old vs New)", diff: "No (A vs B)" },
                                    { feature: "Common Use", change: "Stock prices, Weight loss, Inflation", diff: "Comparing prices of two laptops" },
                                    { feature: "Formula", change: "(New - Old) / Old", diff: "|A - B| / ((A + B) / 2)" },
                                    { feature: "Result", change: "Can be Positive or Negative", diff: "Always Positive" },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-[hsl(var(--border))]">
                                        <td className="p-4 text-[hsl(var(--foreground))]">{row.feature}</td>
                                        <td className="p-4 text-[hsl(var(--primary))] font-medium">{row.change}</td>
                                        <td className="p-4 text-[hsl(var(--muted-foreground))]">{row.diff}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* How To Use Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/10">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        How to Use This Percentage Calculator
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Select Calculation Mode", desc: "Choose 'Increase/Decrease' for growth, 'What is X% of Y' for parts, or 'X is what % of Y' for proportions." },
                            { step: 2, title: "Enter Values", desc: "Input your starting numbers. For percentage increase, ensure you put the 'Original' value first." },
                            { step: 3, title: "View Result", desc: "The answer appears instantly. Positive numbers indicate an increase, negative numbers indicate a decrease." },
                            { step: 4, title: "Read Explanation", desc: "Check the sentence below the result to confirm you are interpreting the data correctly." },
                        ].map((item) => (
                            <div key={item.step} className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary))] text-white flex items-center justify-center font-bold shrink-0">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">{item.title}</h3>
                                    <p className="text-[hsl(var(--muted-foreground))]">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Area */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/10 border-t border-[hsl(var(--border))]">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqSchema.mainEntity.map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-lg mb-2">{faq.name}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.acceptedAnswer.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <PageMeta lastUpdated="January 2026" />
                </div>
            </section>

            <ToolPageFooter
                currentTool="Percentage Calculator"
                relatedTools={relatedTools}
            />
        </main >
    );
}
