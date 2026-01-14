import { Metadata } from "next";
import { PaycheckCalculator } from "@/components/calculators/PaycheckCalculator";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { Calculator, DollarSign, Shield, Zap, CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Free Paycheck Calculator 2026 | Take-Home Pay After Taxes | Statement Extract",
    description: "Free paycheck calculator for 2026. Calculate your take-home pay after federal taxes, Social Security, Medicare, and state taxes. Updated 2026 tax brackets. No signup required.",
    keywords: "paycheck calculator, salary calculator, take home pay calculator, paycheck after taxes, net pay calculator, gross to net calculator, tax calculator, federal tax calculator, 2026 tax brackets, biweekly paycheck calculator, hourly to salary calculator",
    openGraph: {
        title: "Free Paycheck Calculator 2026 - Calculate Take-Home Pay",
        description: "Calculate your net pay after federal, state, Social Security, and Medicare taxes. Updated for 2026 tax brackets.",
        type: "website",
        url: "https://statementextract.com/tools/paycheck-calculator",
        locale: "en_US"
    },
    twitter: {
        card: "summary_large_image",
        title: "Paycheck Calculator 2026 - Free Take-Home Pay Calculator",
        description: "Calculate your net pay after all deductions. Free, no signup."
    },
    alternates: {
        canonical: "https://statementextract.com/tools/paycheck-calculator/"
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1
        }
    }
};

const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Paycheck Calculator",
    "description": "Free online paycheck calculator with 2026 federal tax brackets. Calculate take-home pay after federal, state, Social Security, and Medicare taxes.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I calculate my take-home pay?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Enter your gross annual salary, select your pay frequency (weekly, biweekly, monthly), choose your filing status, and enter your state tax rate. The calculator will show your net pay after federal taxes, Social Security, Medicare, and state taxes."
            }
        },
        {
            "@type": "Question",
            "name": "What percentage of my paycheck goes to taxes?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The percentage varies based on income and filing status. Federal income tax ranges from 10% to 37%, Social Security is 6.2% (up to $168,600), Medicare is 1.45%, and state taxes vary from 0% to 13.3% depending on where you live."
            }
        },
        {
            "@type": "Question",
            "name": "How much is Social Security tax in 2026?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Social Security tax is 6.2% of your gross wages up to the wage base limit of $176,100 in 2026. Wages above this limit are not subject to Social Security tax."
            }
        },
        {
            "@type": "Question",
            "name": "Which states have no income tax?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nine states have no state income tax: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. Enter 0% for state tax if you live in these states."
            }
        }
    ]
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://statementextract.com"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Tools",
            "item": "https://statementextract.com/tools"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Paycheck Calculator",
            "item": "https://statementextract.com/tools/paycheck-calculator"
        }
    ]
};

const relatedTools = [
    { href: "/tools/self-employed-tax-calculator", title: "Self-Employment Tax Calculator" },
    { href: "/tools/gst-vat-calculator", title: "GST/VAT Calculator" },
    { href: "/tools/compound-interest-calculator", title: "Compound Interest Calculator" },
    { href: "/tools/amortization-calculator", title: "Amortization Calculator" },
    { href: "/tools/profit-margin-calculator", title: "Profit Margin Calculator" },
];

export default function PaycheckCalculatorPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Tool Section */}
            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <PaycheckCalculator />
            </section>

            {/* Features */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Paycheck Calculator?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Calculator, title: "2026 Tax Brackets", desc: "Updated with the latest IRS federal tax rates and Social Security limits." },
                            { icon: Shield, title: "100% Private", desc: "All calculations happen in your browser. No data is sent anywhere." },
                            { icon: Zap, title: "Instant Results", desc: "See your take-home pay update in real-time as you adjust inputs." },
                            { icon: DollarSign, title: "Free Forever", desc: "No signup, no limits, no ads. Calculate as many paychecks as you need." },
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

            {/* Tax Brackets Reference */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        2026 Federal Tax Brackets
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]/10">
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--foreground))]">Tax Rate</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--foreground))]">Single Filers</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--foreground))]">Married Filing Jointly</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { rate: "10%", single: "$0 - $11,600", married: "$0 - $23,200" },
                                    { rate: "12%", single: "$11,601 - $47,150", married: "$23,201 - $94,300" },
                                    { rate: "22%", single: "$47,151 - $100,525", married: "$94,301 - $201,050" },
                                    { rate: "24%", single: "$100,526 - $191,950", married: "$201,051 - $383,900" },
                                    { rate: "32%", single: "$191,951 - $243,725", married: "$383,901 - $487,450" },
                                    { rate: "35%", single: "$243,726 - $609,350", married: "$487,451 - $731,200" },
                                    { rate: "37%", single: "Over $609,350", married: "Over $731,200" },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-[hsl(var(--border))]">
                                        <td className="p-4 font-medium text-[hsl(var(--primary))]">{row.rate}</td>
                                        <td className="p-4 text-[hsl(var(--foreground))]">{row.single}</td>
                                        <td className="p-4 text-[hsl(var(--foreground))]">{row.married}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-6 text-center text-sm text-[hsl(var(--muted-foreground))]">
                        Source: IRS Revenue Procedure 2023-34. Standard deduction: $14,600 (single) / $29,200 (married).
                    </p>
                </div>
            </section>

            {/* States with No Income Tax */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-6">
                        States with No Income Tax
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {["Alaska", "Florida", "Nevada", "New Hampshire", "South Dakota", "Tennessee", "Texas", "Washington", "Wyoming"].map((state) => (
                            <div key={state} className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="font-medium text-[hsl(var(--foreground))]">{state}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-6 text-[hsl(var(--muted-foreground))]">
                        If you live in one of these states, enter 0% for state tax in the calculator above.
                    </p>
                </div>
            </section>

            {/* SEO Content */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        How to Calculate Your Take-Home Pay
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Your <strong>take-home pay</strong> (also called net pay) is what&apos;s left after all taxes and deductions are taken from your gross salary. Understanding your paycheck breakdown helps you budget effectively and plan for major expenses.
                    </p>
                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        What Taxes Are Deducted from Your Paycheck?
                    </h3>
                    <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-6 space-y-2">
                        <li><strong>Federal Income Tax:</strong> Based on your taxable income and filing status (10% to 37%)</li>
                        <li><strong>Social Security Tax:</strong> 6.2% of wages up to $176,100 (2026 limit)</li>
                        <li><strong>Medicare Tax:</strong> 1.45% of all wages (plus 0.9% additional tax for high earners)</li>
                        <li><strong>State Income Tax:</strong> Varies by state (0% to 13.3%)</li>
                    </ul>
                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        How to Reduce Your Tax Withholding
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        You can legally reduce your taxable income and increase your take-home pay by:
                    </p>
                    <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-6 space-y-2">
                        <li>Contributing to a <strong>traditional 401(k)</strong> or <strong>403(b)</strong> plan</li>
                        <li>Using a <strong>Health Savings Account (HSA)</strong> if eligible</li>
                        <li>Contributing to a <strong>Flexible Spending Account (FSA)</strong> for healthcare or dependent care</li>
                        <li>Maximizing your <strong>commuter benefits</strong> if offered by your employer</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Related Financial Tools
                    </h3>
                    <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] space-y-2">
                        <li><Link href="/tools/self-employed-tax-calculator" className="text-[hsl(var(--primary))] hover:underline">Self-Employment Tax Calculator</Link> – For freelancers and 1099 contractors</li>
                        <li><Link href="/tools/compound-interest-calculator" className="text-[hsl(var(--primary))] hover:underline">Compound Interest Calculator</Link> – See how your savings grow over time</li>
                        <li><Link href="/tools/amortization-calculator" className="text-[hsl(var(--primary))] hover:underline">Amortization Calculator</Link> – Calculate loan payments and payoff schedules</li>
                        <li><Link href="/convert-bank-statement-to-csv-excel" className="text-[hsl(var(--primary))] hover:underline">Bank Statement Converter</Link> – Convert PDFs to Excel for tax preparation</li>
                    </ul>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-t border-[hsl(var(--border))]">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            { q: "How do I calculate my take-home pay?", a: "Enter your gross annual salary, select your pay frequency, choose your filing status, and enter your state tax rate. The calculator shows your net pay after federal taxes, Social Security, Medicare, and state taxes." },
                            { q: "What percentage of my paycheck goes to taxes?", a: "It depends on your income and location. Federal income tax ranges from 10-37%, Social Security is 6.2%, Medicare is 1.45%, and state taxes vary from 0% to 13.3%." },
                            { q: "How much is Social Security tax in 2026?", a: "Social Security tax is 6.2% of wages up to the wage base limit of $176,100 in 2026. Income above this limit is not subject to Social Security tax." },
                            { q: "Which states have no income tax?", a: "Nine states have no income tax: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming." },
                            { q: "How can I increase my take-home pay?", a: "Contribute to pre-tax retirement accounts (401k), use HSA or FSA accounts, and claim all eligible deductions on your W-4 form." },
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
                currentTool="Paycheck Calculator"
                relatedTools={relatedTools}
            />
        </main>
    );
}
