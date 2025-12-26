import { Metadata } from "next";
import { SelfEmployedTaxCalculator } from "@/components/tools/SelfEmployedTaxCalculator";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import {
    Calculator,
    Shield,
    Zap,
    CheckCircle,
    Users,
    Briefcase,
    TrendingUp,
    FileText
} from "lucide-react";

export const metadata: Metadata = {
    title: "Self-Employed Tax Calculator 2026 | 1099 Quarterly Tax Estimator Free",
    description: "Free self-employed tax calculator for 2026 income. Calculate 1099 taxes for freelancers, Uber drivers, and gig workers. Includes QBI deduction and quarterly deadlines.",
    keywords: "self employed tax calculator 2026, 1099 tax calculator 2026, freelancer tax calculator, quarterly tax calculator 2026, uber driver tax calculator, independent contractor tax estimator, gig economy tax calculator, side hustle tax calculator",
    openGraph: {
        title: "Self-Employed Tax Calculator 2026 | Free 1099 Tax Estimator",
        description: "Calculate your 2026 self-employment tax, federal income tax, and quarterly payments. Free 100% private calculator.",
        type: "website",
        url: "https://statementextract.com/tools/self-employed-tax-calculator",
    },
    alternates: {
        canonical: "https://statementextract.com/tools/self-employed-tax-calculator",
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Self-Employed Tax Calculator 2026",
    "description": "Calculate federal income tax, self-employment tax, and quarterly estimated payments for freelancers, 1099 workers, and independent contractors for 2025 and 2026 tax years.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "1842"
    }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is the self-employment tax rate for 2026?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The self-employment tax rate for 2026 remains 15.3%. This consists of 12.4% for Social Security (on income up to $176,100 estimated) and 2.9% for Medicare (with no income limit)."
            }
        },
        {
            "@type": "Question",
            "name": "Do I need to pay quarterly taxes?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, if you expect to owe $1,000 or more in taxes when you file, the IRS requires you to make quarterly estimated tax payments. This calculator estimates your Q1, Q2, Q3, and Q4 payments."
            }
        },
        {
            "@type": "Question",
            "name": "Can I deduct the self-employment tax?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, you can deduct 50% of your self-employment tax from your adjusted gross income (AGI). This calculator automatically applies this deduction to your estimate."
            }
        },
        {
            "@type": "Question",
            "name": "Does this calculator include the QBI deduction?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we calculate the 20% Qualified Business Income (QBI) deduction, which is available to most sole proprietors, partnerships, and S-corps with income below the phase-out thresholds."
            }
        }
    ]
};

const taxBrackets2026 = [
    { bracket: "10%", single: "$0 – $11,925", married: "$0 – $23,850" },
    { bracket: "12%", single: "$11,926 – $48,475", married: "$23,851 – $96,950" },
    { bracket: "22%", single: "$48,476 – $103,350", married: "$96,951 – $206,700" },
    { bracket: "24%", single: "$103,351 – $197,300", married: "$206,701 – $394,600" },
    { bracket: "32%", single: "$197,301 – $250,525", married: "$394,601 – $501,050" },
    { bracket: "35%", single: "$250,526 – $626,350", married: "$501,051 – $751,600" },
    { bracket: "37%", single: "$626,351+", married: "$751,601+" },
];

const personas = [
    { title: "Freelancers", desc: "For writers, designers, developers, and consultants working on contract.", icon: Briefcase },
    { title: "Gig Workers", desc: "For Uber/Lyft drivers, DoorDash/Instacart shoppers, and TaskRabbits.", icon: Users },
    { title: "Small Business", desc: "For sole proprietors, Etsy sellers, and single-member LLCs.", icon: TrendingUp },
    { title: "Independent Contractors", desc: "For construction, IT, real estate agents, and medical professionals.", icon: FileText },
];

const relatedTools = [
    { href: "/tools/profit-margin-calculator", title: "Profit Calculator" },
    { href: "/tools/gst-vat-calculator", title: "GST/VAT Calculator" },
    { href: "/convert/csv-to-qbo", title: "CSV to QBO" },
    { href: "/convert-bank-statement-to-csv-excel", title: "Bank to Excel" },
];

export default function SelfEmployedTaxCalculatorPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Calculator Section */}
            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <SelfEmployedTaxCalculator />
            </section>

            {/* Features Grid */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our 2026 Self-Employment Tax Calculator?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Calculator, title: "2025 & 2026 Tax Years", desc: "Calculate taxes for your 2025 return or plan ahead for 2026 income." },
                            { icon: Zap, title: "QBI Deduction Included", desc: "Automatically calculates the 20% Qualified Business Income deduction." },
                            { icon: Shield, title: "100% Private & Free", desc: "No signup required. Data never leaves your browser." },
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

            {/* Who is this for? (Competitor Style) */}
            <section className="py-12 md:py-16 px-6 border-t border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Who Needs to Pay Self-Employment Tax?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {personas.map((persona, i) => (
                            <div key={i} className="flex gap-4 p-6 rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/30 transition-colors">
                                <persona.icon className="w-10 h-10 text-[hsl(var(--primary))] shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">{persona.title}</h3>
                                    <p className="text-[hsl(var(--muted-foreground))]">{persona.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tax Brackets Table */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-4">
                        2026 Federal Tax Brackets (Projected)
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Inflation-adjusted tax brackets for the 2026 tax year (filing in 2027).
                    </p>
                    <div className="overflow-x-auto rounded-xl border border-[hsl(var(--border))] shadow-sm">
                        <table className="w-full text-sm bg-[hsl(var(--card))]">
                            <thead className="bg-[hsl(var(--muted))]">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold text-[hsl(var(--foreground))]">Rate</th>
                                    <th className="px-4 py-3 text-left font-semibold text-[hsl(var(--foreground))]">Single Filers</th>
                                    <th className="px-4 py-3 text-left font-semibold text-[hsl(var(--foreground))]">Married Filing Jointly</th>
                                </tr>
                            </thead>
                            <tbody>
                                {taxBrackets2026.map((row, i) => (
                                    <tr key={i} className="border-t border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/10">
                                        <td className="px-4 py-3 font-medium text-[hsl(var(--primary))]">{row.bracket}</td>
                                        <td className="px-4 py-3 text-[hsl(var(--foreground))]">{row.single}</td>
                                        <td className="px-4 py-3 text-[hsl(var(--foreground))]">{row.married}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* SEO Content Block */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        Understanding Your 1099 Taxes
                    </h2>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        What is Self-Employment Tax?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Self-employment tax consists of Social Security and Medicare taxes. While W-2 employees split these costs with their employer, self-employed individuals are responsible for the full 15.3% (12.4% for Social Security and 2.9% for Medicare).
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Do I Need to File Quarterly Taxes?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        The US has a "pay-as-you-go" tax system. If you expect to owe more than $1,000 in taxes for the year, you generally must make estimated tax payments four times a year. Use the quarterly breakdown in our calculator to estimate your payments for <strong>April 15, June 16, September 15, and January 15</strong>.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Common Deductions for 2026
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] list-disc pl-6 space-y-2">
                        <li><strong>Standard Deduction:</strong> Increased to $15,000 for single filers and $30,000 for married filers (2026 projected).</li>
                        <li><strong>QBI Deduction:</strong> Deduct up to 20% of your net qualified business income.</li>
                        <li><strong>Expenses:</strong> Deduct home office costs, mileage, supplies, and health insurance premiums.</li>
                    </ul>
                </div>
            </section>

            {/* Legal Disclaimer */}
            <section className="py-8 px-6 bg-[hsl(var(--card))] border-t border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-4">
                        <Shield className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                        <div className="text-sm text-[hsl(var(--muted-foreground))]">
                            <p className="font-semibold text-amber-700 dark:text-amber-500 mb-1">Legal Disclaimer</p>
                            <p>
                                This calculator is for educational and illustrative purposes only. The results are estimates based on 2025-2026 tax brackets and do not constitute professional tax advice, legal advice, or financial planning.
                            </p>
                            <p className="mt-2">
                                Tax laws vary by individual situation and location. We strongly recommend consulting with a qualified CPA or tax professional before making any financial decisions or filing your taxes. We do not guarantee the accuracy of the results and are not responsible for any errors or omissions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <ToolPageFooter
                currentTool="Self-Employed Tax Calculator"
                relatedTools={relatedTools}
            />
        </main >
    );
}
