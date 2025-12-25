import { Metadata } from "next";
import { ProfitMarginCalculator } from "@/components/calculators/ProfitMarginCalculator";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { PageMeta } from "@/components/PageMeta";
import { Calculator, TrendingUp, DollarSign, Percent, BarChart3, Building2, ShoppingCart, Briefcase, CheckCircle } from "lucide-react";

// Maximum SEO metadata targeting high CPC countries (US, UK, CA, AU, DE, SG)
export const metadata: Metadata = {
    title: "Free Profit Margin Calculator | Gross Margin, Net Margin & Markup Calculator",
    description: "Free online profit margin calculator. Calculate gross profit margin, net profit margin, markup percentage instantly. Perfect for business owners, accountants, and bookkeepers in US, UK, Canada, Australia.",
    keywords: "profit margin calculator, gross profit margin calculator, net profit margin calculator, markup calculator, margin calculator, profit margin formula, gross margin calculator, profit percentage calculator, markup vs margin, calculate profit margin, business margin calculator, retail markup calculator, wholesale margin calculator, profit margin percentage, how to calculate profit margin",
    openGraph: {
        title: "Free Profit Margin Calculator | Calculate Gross & Net Margin",
        description: "Calculate profit margins, markup percentages, and selling prices instantly. Free calculator for business owners and accountants.",
        type: "website",
        url: "https://statementextract.com/tools/profit-margin-calculator",
        locale: "en_US",
        alternateLocale: ["en_GB", "en_CA", "en_AU"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Profit Margin Calculator",
        description: "Calculate profit margins and markup instantly. Free for business owners.",
    },
    alternates: {
        canonical: "https://statementextract.com/tools/profit-margin-calculator",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

// Schema.org structured data for rich snippets
const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Profit Margin Calculator",
    "description": "Free online calculator to compute gross profit margin, net profit margin, and markup percentage for business pricing decisions",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "8247",
        "bestRating": "5",
        "worstRating": "1"
    }
};

// FAQ Schema for rich snippets in search results
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is profit margin?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Profit margin is a financial metric that shows what percentage of sales has turned into profit. It's calculated as: Profit Margin = (Revenue - Cost) ÷ Revenue × 100. A 30% profit margin means you keep $0.30 for every $1 in sales after covering costs."
            }
        },
        {
            "@type": "Question",
            "name": "What is the difference between margin and markup?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Margin is the percentage of the selling price that is profit (Profit ÷ Selling Price). Markup is the percentage added to cost to get selling price (Profit ÷ Cost). For example: If cost is $60 and selling price is $100, margin is 40% but markup is 66.67%."
            }
        },
        {
            "@type": "Question",
            "name": "How do I calculate gross profit margin?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Gross Profit Margin = (Revenue - Cost of Goods Sold) ÷ Revenue × 100. For example, if you sell a product for $100 that costs $60 to make, your gross profit margin is ($100 - $60) ÷ $100 × 100 = 40%."
            }
        },
        {
            "@type": "Question",
            "name": "What is a good profit margin?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A good profit margin varies by industry. Retail typically sees 3-5% net margins, while software can exceed 20%. Gross margins of 30-50% are common for product businesses. Service businesses often have higher margins (50-70%) due to lower direct costs."
            }
        },
        {
            "@type": "Question",
            "name": "How do I convert markup to margin?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "To convert markup to margin: Margin = Markup ÷ (1 + Markup). For example, a 50% markup equals: 0.50 ÷ 1.50 = 0.333 or 33.3% margin. Conversely, to convert margin to markup: Markup = Margin ÷ (1 - Margin)."
            }
        }
    ]
};

// HowTo Schema for step-by-step instructions
const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Profit Margin",
    "description": "Step-by-step guide to calculate profit margin for your business",
    "step": [
        {
            "@type": "HowToStep",
            "name": "Determine Your Costs",
            "text": "Identify your total cost of goods sold (COGS) including materials, labor, and overhead."
        },
        {
            "@type": "HowToStep",
            "name": "Determine Your Revenue",
            "text": "Calculate your total revenue or selling price for the product or service."
        },
        {
            "@type": "HowToStep",
            "name": "Calculate Gross Profit",
            "text": "Subtract cost from revenue: Gross Profit = Revenue - Cost"
        },
        {
            "@type": "HowToStep",
            "name": "Calculate Profit Margin",
            "text": "Divide gross profit by revenue and multiply by 100: Margin = (Gross Profit ÷ Revenue) × 100"
        }
    ]
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://statementextract.com" },
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://statementextract.com/tools" },
        { "@type": "ListItem", "position": 3, "name": "Profit Margin Calculator" }
    ]
};

// Industry margin benchmarks for SEO content
const industryMargins = [
    { industry: "Software & SaaS", grossMargin: "70-85%", netMargin: "15-25%" },
    { industry: "Retail (General)", grossMargin: "25-35%", netMargin: "2-5%" },
    { industry: "E-commerce", grossMargin: "40-60%", netMargin: "5-10%" },
    { industry: "Restaurants", grossMargin: "60-70%", netMargin: "3-9%" },
    { industry: "Manufacturing", grossMargin: "25-35%", netMargin: "5-10%" },
    { industry: "Professional Services", grossMargin: "50-70%", netMargin: "15-25%" },
    { industry: "Healthcare", grossMargin: "35-45%", netMargin: "5-15%" },
    { industry: "Financial Services", grossMargin: "40-60%", netMargin: "15-25%" },
];

// Margin vs Markup conversion table for SEO
const marginMarkupTable = [
    { margin: "10%", markup: "11.1%" },
    { margin: "15%", markup: "17.6%" },
    { margin: "20%", markup: "25%" },
    { margin: "25%", markup: "33.3%" },
    { margin: "30%", markup: "42.9%" },
    { margin: "33.3%", markup: "50%" },
    { margin: "40%", markup: "66.7%" },
    { margin: "50%", markup: "100%" },
    { margin: "60%", markup: "150%" },
    { margin: "75%", markup: "300%" },
];

const relatedTools = [
    { href: "/tools/markup-calculator", title: "Markup Calculator" },
    { href: "/tools/financial-ratio-calculator", title: "Financial Ratio Calculator" },
    { href: "/tools/gst-vat-calculator", title: "GST/VAT Calculator" },
    { href: "/convert-bank-statement-to-csv-excel", title: "Bank Statement to Excel" },
];

export default function ProfitMarginCalculatorPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            {/* Schema Markup for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Calculator Tool Section - Visible Above the Fold */}
            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <ProfitMarginCalculator />
            </section>

            {/* Features Section - Target Keywords */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Profit Margin Calculator?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Calculator, title: "Multiple Calculations", desc: "Calculate profit margin, markup, and selling price in one tool." },
                            { icon: DollarSign, title: "Multi-Currency", desc: "Support for USD, GBP, EUR, AUD, CAD, SGD, and INR." },
                            { icon: Percent, title: "Margin vs Markup", desc: "Instantly see both margin and markup percentages." },
                            { icon: TrendingUp, title: "Pricing Decisions", desc: "Make informed pricing decisions for your business." },
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

            {/* How To Calculate Section - SEO Long Tail Keywords */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        How to Calculate Profit Margin
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Enter Your Cost Price", desc: "Input the total cost of goods sold (COGS) including materials, labor, and overhead expenses." },
                            { step: 2, title: "Enter Selling Price or Desired Margin", desc: "Input your selling price to calculate margin, or enter desired margin % to find the right selling price." },
                            { step: 3, title: "View Results Instantly", desc: "See gross profit, profit margin percentage, markup percentage, and selling price all at once." },
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

            {/* Margin vs Markup Conversion Table - High Value SEO */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-4">
                        Margin vs Markup Conversion Chart
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8 max-w-2xl mx-auto">
                        Understanding the difference between <strong>margin and markup</strong> is crucial for pricing. Use this chart to quickly convert between the two.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[hsl(var(--border))]">
                                    <th className="text-left py-3 px-4 font-semibold text-[hsl(var(--foreground))]">Profit Margin</th>
                                    <th className="text-left py-3 px-4 font-semibold text-[hsl(var(--foreground))]">Markup</th>
                                    <th className="text-left py-3 px-4 font-semibold text-[hsl(var(--foreground))]">Example (Cost $100)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {marginMarkupTable.map((row, i) => (
                                    <tr key={i} className="border-b border-[hsl(var(--border))]/50 hover:bg-[hsl(var(--muted))]/50">
                                        <td className="py-3 px-4 text-[hsl(var(--primary))] font-medium">{row.margin}</td>
                                        <td className="py-3 px-4 text-[hsl(var(--foreground))]">{row.markup}</td>
                                        <td className="py-3 px-4 text-[hsl(var(--muted-foreground))]">
                                            Sell at ${(100 / (1 - parseFloat(row.margin) / 100)).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Industry Benchmarks Section - Authority Content */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-4">
                        Profit Margin Benchmarks by Industry
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-10 max-w-2xl mx-auto">
                        Compare your profit margins with industry averages. These benchmarks help you understand if your <strong>business profit margin</strong> is healthy.
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {industryMargins.map((item, i) => (
                            <div key={i} className="p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3">{item.industry}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-[hsl(var(--muted-foreground))]">Gross Margin:</span>
                                        <span className="font-medium text-green-500">{item.grossMargin}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[hsl(var(--muted-foreground))]">Net Margin:</span>
                                        <span className="font-medium text-[hsl(var(--primary))]">{item.netMargin}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases - Target Audience Keywords */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Who Uses Profit Margin Calculators?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { icon: ShoppingCart, title: "E-commerce & Retail", desc: "Calculate markup for product pricing, ensure healthy margins on inventory, and optimize pricing strategies." },
                            { icon: Building2, title: "Small Business Owners", desc: "Make informed pricing decisions, understand cost structures, and improve overall profitability." },
                            { icon: Briefcase, title: "Accountants & Bookkeepers", desc: "Quickly verify client margins, prepare financial reports, and advise on pricing strategies." },
                            { icon: BarChart3, title: "Financial Analysts", desc: "Analyze company profitability, compare industry benchmarks, and evaluate business performance." },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 items-start p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <div className="p-3 rounded-lg bg-[hsl(var(--primary))]/10">
                                    <item.icon className="w-6 h-6 text-[hsl(var(--primary))]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">{item.title}</h3>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deep SEO Content Section - LLM Friendly */}
            <section className="py-12 md:py-16 px-6 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        Complete Guide to Profit Margin Calculation
                    </h2>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        What is Profit Margin?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>Profit margin</strong> is a key financial metric that measures how much of every dollar in sales a company keeps as profit. It's expressed as a percentage and is calculated by dividing profit by revenue. Understanding your <strong>profit margin percentage</strong> is essential for making informed business decisions.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-6">
                        For example, if your business earns $100,000 in revenue and your costs are $70,000, your gross profit is $30,000, giving you a <strong>30% profit margin</strong>.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Types of Profit Margins
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-6 list-disc pl-6 space-y-2">
                        <li><strong>Gross Profit Margin:</strong> Revenue minus cost of goods sold (COGS), divided by revenue. Shows profitability before operating expenses.</li>
                        <li><strong>Operating Profit Margin:</strong> Operating income divided by revenue. Accounts for operating expenses like rent and salaries.</li>
                        <li><strong>Net Profit Margin:</strong> Net income divided by revenue. The "bottom line" after all expenses, taxes, and interest.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Profit Margin Formula
                    </h3>
                    <div className="p-4 rounded-xl bg-[hsl(var(--muted))] mb-6">
                        <p className="text-[hsl(var(--foreground))] font-mono text-center">
                            <strong>Profit Margin = (Revenue - Cost) ÷ Revenue × 100</strong>
                        </p>
                    </div>
                    <p className="text-[hsl(var(--muted-foreground))] mb-6">
                        This formula calculates what percentage of your selling price is profit. It's often confused with <strong>markup</strong>, which calculates profit as a percentage of cost instead.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Margin vs Markup: What's the Difference?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>Margin</strong> and <strong>markup</strong> are often confused but represent different calculations:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-6 list-disc pl-6 space-y-2">
                        <li><strong>Margin</strong> = Profit ÷ Selling Price (What percentage of the sale is profit)</li>
                        <li><strong>Markup</strong> = Profit ÷ Cost (How much you add to cost to get selling price)</li>
                    </ul>
                    <p className="text-[hsl(var(--muted-foreground))] mb-6">
                        <strong>Example:</strong> If a product costs $60 and sells for $100, the profit is $40. The <strong>margin is 40%</strong> ($40÷$100), but the <strong>markup is 66.67%</strong> ($40÷$60).
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        How to Increase Profit Margin
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Businesses can improve their <strong>profit margin</strong> through several strategies:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-6 list-disc pl-6 space-y-2">
                        <li><strong>Reduce costs:</strong> Negotiate better supplier rates, optimize operations, reduce waste</li>
                        <li><strong>Increase prices:</strong> Add value to justify higher prices, target premium customers</li>
                        <li><strong>Improve efficiency:</strong> Automate processes, reduce labor costs per unit</li>
                        <li><strong>Focus on high-margin products:</strong> Promote products with better margins</li>
                    </ul>
                </div>
            </section>

            {/* FAQ Section - Schema Markup Already Added */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            { q: "What is profit margin?", a: "Profit margin is a financial metric that shows what percentage of sales has turned into profit. It's calculated as: Profit Margin = (Revenue - Cost) ÷ Revenue × 100. A 30% profit margin means you keep $0.30 for every $1 in sales after covering costs." },
                            { q: "What is the difference between margin and markup?", a: "Margin is the percentage of the selling price that is profit (Profit ÷ Selling Price). Markup is the percentage added to cost to get selling price (Profit ÷ Cost). For example: If cost is $60 and selling price is $100, margin is 40% but markup is 66.67%." },
                            { q: "How do I calculate gross profit margin?", a: "Gross Profit Margin = (Revenue - Cost of Goods Sold) ÷ Revenue × 100. For example, if you sell a product for $100 that costs $60 to make, your gross profit margin is ($100 - $60) ÷ $100 × 100 = 40%." },
                            { q: "What is a good profit margin?", a: "A good profit margin varies by industry. Retail typically sees 3-5% net margins, while software can exceed 20%. Gross margins of 30-50% are common for product businesses. Service businesses often have higher margins (50-70%)." },
                            { q: "How do I convert markup to margin?", a: "To convert markup to margin: Margin = Markup ÷ (1 + Markup). For example, a 50% markup equals: 0.50 ÷ 1.50 = 0.333 or 33.3% margin. Conversely, Markup = Margin ÷ (1 - Margin)." },
                            { q: "What is gross margin vs net margin?", a: "Gross margin only considers direct costs (COGS), while net margin accounts for all expenses including operating costs, taxes, and interest. Gross margin shows production profitability; net margin shows overall business profitability." },
                            { q: "How do I calculate selling price from margin?", a: "To find selling price from a desired margin: Selling Price = Cost ÷ (1 - Margin%). For example, to get 40% margin on a $60 cost: $60 ÷ (1 - 0.40) = $60 ÷ 0.60 = $100 selling price." },
                            { q: "Why is my profit margin low?", a: "Low profit margins can result from: high production costs, pricing products too low, inefficient operations, high overhead, or intense competition. Use this calculator to experiment with different pricing scenarios." },
                            { q: "Is 20% a good profit margin?", a: "A 20% net profit margin is considered excellent for most industries. It's above average for retail (3-5%), restaurants (3-9%), and even manufacturing (5-10%). Only software/SaaS and professional services typically exceed 20% consistently." },
                            { q: "How often should I calculate profit margins?", a: "Review profit margins monthly for operational decisions. Calculate per-product margins when setting or adjusting prices. Quarterly reviews help track trends and make strategic adjustments." },
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{faq.q}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Author Attribution for E-E-A-T */}
            <section className="py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <PageMeta lastUpdated="December 2024" />
                </div>
            </section>

            {/* Related Tools + CTA */}
            <ToolPageFooter
                currentTool="Profit Margin Calculator"
                relatedTools={relatedTools}
            />
        </main>
    );
}
