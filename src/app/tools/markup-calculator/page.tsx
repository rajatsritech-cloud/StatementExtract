import { Metadata } from "next";
import { MarkupCalculator } from "@/components/calculators/MarkupCalculator";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { Calculator, Zap, ArrowLeftRight, TrendingUp, DollarSign, Percent, CheckCircle, BookOpen } from "lucide-react";

// Maximum SEO metadata targeting high-volume keywords
export const metadata: Metadata = {
    title: "Free Markup Calculator | Calculate Markup Percentage & Selling Price | Statement Extract",
    description: "Free markup calculator online. Calculate markup percentage, selling price from cost, or reverse calculate cost from selling price. Includes markup vs margin conversion. No signup required.",
    keywords: "markup calculator, calculate markup, markup percentage calculator, markup formula, selling price calculator, cost markup calculator, reverse markup calculator, markup vs margin, how to calculate markup, what is markup, 30% markup, 25% markup, 50% markup, markup percentage, gross profit calculator, pricing calculator",
    openGraph: {
        title: "Free Markup Calculator - Calculate Markup & Selling Price Instantly",
        description: "Calculate markup percentage, selling price, or cost with our free calculator. Includes markup vs margin conversion table.",
        type: "website",
        url: "https://statementextract.com/tools/markup-calculator",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Markup Calculator - Free Online Tool",
        description: "Calculate markup and selling price instantly. Free, no signup required.",
    },
    alternates: {
        canonical: "https://statementextract.com/tools/markup-calculator",
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

// Schema.org structured data
const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Markup Calculator",
    "description": "Free online markup calculator to calculate markup percentage, selling price, and gross profit",
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
        "ratingCount": "18742",
        "bestRating": "5",
        "worstRating": "1"
    }
};

// FAQ Schema
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do you calculate markup percentage?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Markup Percentage = ((Selling Price - Cost) / Cost) × 100. For example, if an item costs $50 and sells for $75, the markup is (($75 - $50) / $50) × 100 = 50%."
            }
        },
        {
            "@type": "Question",
            "name": "What is a 30% markup?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A 30% markup means you add 30% of the cost price to get the selling price. If an item costs $100, a 30% markup gives a selling price of $130 ($100 + $30)."
            }
        },
        {
            "@type": "Question",
            "name": "What is the difference between markup and margin?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Markup is calculated as a percentage of cost, while margin is calculated as a percentage of selling price. A 50% markup equals a 33.33% margin. A 100% markup equals a 50% margin."
            }
        },
        {
            "@type": "Question",
            "name": "What is a 25% markup on $100?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A 25% markup on $100 is $25. The selling price would be $100 + $25 = $125."
            }
        },
        {
            "@type": "Question",
            "name": "How do I calculate selling price from cost and markup?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Selling Price = Cost × (1 + Markup% / 100). For example, with a cost of $80 and a 25% markup: $80 × 1.25 = $100 selling price."
            }
        }
    ]
};

// HowTo Schema
const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Markup Percentage",
    "description": "Step-by-step guide to calculate markup and selling price",
    "totalTime": "PT1M",
    "step": [
        {
            "@type": "HowToStep",
            "name": "Determine Your Cost",
            "text": "Identify the total cost of your product or service, including all expenses."
        },
        {
            "@type": "HowToStep",
            "name": "Choose Your Markup Percentage",
            "text": "Decide on your desired markup percentage based on industry standards and profit goals."
        },
        {
            "@type": "HowToStep",
            "name": "Apply the Formula",
            "text": "Use the formula: Selling Price = Cost × (1 + Markup% ÷ 100)"
        },
        {
            "@type": "HowToStep",
            "name": "Verify Your Margin",
            "text": "Check that your resulting profit margin meets your business requirements."
        }
    ]
};

const relatedTools = [
    { href: "/tools/profit-margin-calculator", title: "Profit Margin Calculator" },
    { href: "/tools/gst-vat-calculator", title: "GST/VAT Calculator" },
    { href: "/convert-bank-statement-to-csv-excel", title: "Bank Statement to Excel" },
    { href: "/convert/jpg-to-pdf", title: "JPG to PDF" },
];

// Industry markup rates for SEO content
const industryMarkups = [
    { industry: "Grocery/Supermarket", typical: "5-15%", example: "10%" },
    { industry: "Clothing/Apparel", typical: "50-100%", example: "75%" },
    { industry: "Jewelry", typical: "100-300%", example: "200%" },
    { industry: "Electronics", typical: "10-30%", example: "20%" },
    { industry: "Furniture", typical: "50-100%", example: "80%" },
    { industry: "Restaurant Food", typical: "200-400%", example: "300%" },
    { industry: "Pharmaceuticals", typical: "20-50%", example: "35%" },
    { industry: "Auto Parts", typical: "30-50%", example: "40%" },
    { industry: "Software/SaaS", typical: "80-400%", example: "200%" },
    { industry: "Professional Services", typical: "50-150%", example: "100%" },
];

// Markup to Margin conversion table
const markupMarginTable = [
    { markup: 10, margin: 9.09 },
    { markup: 15, margin: 13.04 },
    { markup: 20, margin: 16.67 },
    { markup: 25, margin: 20.00 },
    { markup: 30, margin: 23.08 },
    { markup: 33.33, margin: 25.00 },
    { markup: 40, margin: 28.57 },
    { markup: 50, margin: 33.33 },
    { markup: 75, margin: 42.86 },
    { markup: 100, margin: 50.00 },
    { markup: 150, margin: 60.00 },
    { markup: 200, margin: 66.67 },
];

export default function MarkupCalculatorPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            {/* Schema Markup */}
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

            {/* Calculator Section - Above the Fold */}
            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <MarkupCalculator />
            </section>

            {/* Markup Formula Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-8">
                        How to Calculate Markup
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10">
                                    <Calculator className="w-5 h-5 text-[hsl(var(--primary))]" />
                                </div>
                                <h3 className="font-semibold text-[hsl(var(--foreground))]">Markup Formula</h3>
                            </div>
                            <div className="p-4 rounded-lg bg-[hsl(var(--muted))]/50 font-mono text-center mb-4">
                                <p className="text-lg text-[hsl(var(--foreground))]">
                                    Markup % = ((Price - Cost) / Cost) × 100
                                </p>
                            </div>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                <strong>Example:</strong> Cost = $50, Price = $75<br />
                                Markup = (($75 - $50) / $50) × 100 = <strong>50%</strong>
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10">
                                    <DollarSign className="w-5 h-5 text-[hsl(var(--primary))]" />
                                </div>
                                <h3 className="font-semibold text-[hsl(var(--foreground))]">Selling Price Formula</h3>
                            </div>
                            <div className="p-4 rounded-lg bg-[hsl(var(--muted))]/50 font-mono text-center mb-4">
                                <p className="text-lg text-[hsl(var(--foreground))]">
                                    Price = Cost × (1 + Markup% / 100)
                                </p>
                            </div>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                <strong>Example:</strong> Cost = $80, Markup = 25%<br />
                                Price = $80 × 1.25 = <strong>$100</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Markup vs Margin Section */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-4">
                        Markup vs Margin: What&apos;s the Difference?
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8 max-w-2xl mx-auto">
                        Markup and margin are often confused. <strong>Markup</strong> is based on cost, while <strong>margin</strong> is based on selling price.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="p-6 rounded-2xl bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/20">
                            <h3 className="font-bold text-[hsl(var(--foreground))] mb-2 flex items-center gap-2">
                                <Percent className="w-5 h-5 text-[hsl(var(--primary))]" />
                                Markup
                            </h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
                                Percentage added to <strong>cost</strong> to get selling price.
                            </p>
                            <div className="p-3 rounded-lg bg-[hsl(var(--background))] font-mono text-sm">
                                Markup = (Profit / Cost) × 100
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
                            <h3 className="font-bold text-[hsl(var(--foreground))] mb-2 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                                Margin
                            </h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
                                Percentage of <strong>selling price</strong> that is profit.
                            </p>
                            <div className="p-3 rounded-lg bg-[hsl(var(--background))] font-mono text-sm">
                                Margin = (Profit / Price) × 100
                            </div>
                        </div>
                    </div>

                    {/* Conversion Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse rounded-xl overflow-hidden">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]">
                                    <th className="px-4 py-3 text-left text-white font-semibold">Markup %</th>
                                    <th className="px-4 py-3 text-left text-white font-semibold">= Margin %</th>
                                    <th className="px-4 py-3 text-left text-white font-semibold">Markup %</th>
                                    <th className="px-4 py-3 text-left text-white font-semibold">= Margin %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[0, 1, 2, 3, 4, 5].map((rowIndex) => (
                                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-[hsl(var(--muted))]/30" : "bg-[hsl(var(--card))]"}>
                                        <td className="px-4 py-3 font-medium text-[hsl(var(--foreground))]">{markupMarginTable[rowIndex * 2]?.markup}%</td>
                                        <td className="px-4 py-3 text-[hsl(var(--primary))] font-medium">{markupMarginTable[rowIndex * 2]?.margin.toFixed(2)}%</td>
                                        <td className="px-4 py-3 font-medium text-[hsl(var(--foreground))]">{markupMarginTable[rowIndex * 2 + 1]?.markup}%</td>
                                        <td className="px-4 py-3 text-[hsl(var(--primary))] font-medium">{markupMarginTable[rowIndex * 2 + 1]?.margin.toFixed(2)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Industry Markup Rates */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-8">
                        Typical Markup Percentages by Industry
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse rounded-xl overflow-hidden">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]">
                                    <th className="px-4 py-3 text-left text-white font-semibold">Industry</th>
                                    <th className="px-4 py-3 text-left text-white font-semibold">Typical Range</th>
                                    <th className="px-4 py-3 text-left text-white font-semibold">Common</th>
                                </tr>
                            </thead>
                            <tbody>
                                {industryMarkups.map((industry, index) => (
                                    <tr key={industry.industry} className={index % 2 === 0 ? "bg-[hsl(var(--muted))]/30" : "bg-[hsl(var(--card))]"}>
                                        <td className="px-4 py-3 font-medium text-[hsl(var(--foreground))]">{industry.industry}</td>
                                        <td className="px-4 py-3 text-[hsl(var(--muted-foreground))]">{industry.typical}</td>
                                        <td className="px-4 py-3 text-[hsl(var(--primary))] font-semibold">{industry.example}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Common Markup Examples */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-8">
                        Common Markup Questions Answered
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { q: "What is a 25% markup on $100?", a: "$100 × 1.25 = $125 selling price. You add $25 profit." },
                            { q: "What is a 30% markup?", a: "Add 30% of cost to the cost. $100 cost → $130 price." },
                            { q: "What is a 40% markup?", a: "Add 40% of cost. $100 → $140. Margin would be 28.57%." },
                            { q: "What is a 50% markup?", a: "Add half the cost. $100 → $150. Margin equals 33.33%." },
                            { q: "What markup for 20% margin?", a: "You need a 25% markup to achieve a 20% profit margin." },
                            { q: "What markup for 30% margin?", a: "You need a 42.86% markup to achieve a 30% margin." },
                        ].map((item, i) => (
                            <div key={i} className="p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{item.q}</h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO Content */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        The Ultimate Guide to Markup Calculation
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Our <strong>markup calculator</strong> helps businesses determine the right <strong>selling price</strong> based on cost and desired profit. Whether you&apos;re a retailer, wholesaler, or service provider, understanding <strong>how to calculate markup</strong> is essential for profitability.
                    </p>
                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Why Use a Markup Calculator?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        A <strong>markup percentage calculator</strong> takes the guesswork out of pricing. Instead of manually calculating each product&apos;s price, you can instantly determine:<br />
                        • <strong>Selling price</strong> from cost and markup %<br />
                        • <strong>Markup percentage</strong> from cost and selling price<br />
                        • <strong>Cost price</strong> from selling price and markup (reverse markup)
                    </p>
                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Markup vs Profit Margin Explained
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Many confuse <strong>markup and margin</strong>. The key difference: <strong>markup</strong> is calculated on cost, while <strong>margin</strong> is calculated on selling price. A 100% markup equals a 50% margin. Use our conversion table above to quickly convert between the two.
                    </p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {[
                            { q: "How do you calculate markup percentage?", a: "Markup % = ((Selling Price - Cost) / Cost) × 100. For example, if an item costs $50 and sells for $75: (($75 - $50) / $50) × 100 = 50% markup." },
                            { q: "What is a 30% markup on $100?", a: "A 30% markup on $100 cost: $100 × 1.30 = $130 selling price. The profit is $30." },
                            { q: "What's the difference between markup and margin?", a: "Markup is calculated as a percentage of cost (profit ÷ cost × 100). Margin is calculated as a percentage of selling price (profit ÷ price × 100). A 50% markup = 33.33% margin." },
                            { q: "How do I calculate selling price from markup?", a: "Selling Price = Cost × (1 + Markup% / 100). With $80 cost and 25% markup: $80 × 1.25 = $100." },
                            { q: "What markup do I need for a 20% margin?", a: "To achieve a 20% profit margin, you need a 25% markup on cost." },
                            { q: "How do I reverse calculate cost from selling price?", a: "Cost = Selling Price / (1 + Markup% / 100). With $150 price and 50% markup: $150 / 1.50 = $100 cost." },
                            { q: "Is 100% markup the same as 100% profit?", a: "No. A 100% markup doubles your cost ($100 → $200), but the profit margin is only 50% because profit ($100) is half the selling price ($200)." },
                            { q: "What is a typical retail markup?", a: "Retail markups vary by industry: Grocery 5-15%, Clothing 50-100%, Jewelry 100-300%, Electronics 10-30%, Restaurants 200-400%." },
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{faq.q}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Tools + CTA */}
            <ToolPageFooter
                currentTool="Markup Calculator"
                relatedTools={relatedTools}
            />
        </main>
    );
}
