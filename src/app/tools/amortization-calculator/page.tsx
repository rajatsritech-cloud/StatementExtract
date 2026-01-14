import { Metadata } from "next";
import { AmortizationCalculator } from "@/components/calculators/AmortizationCalculator";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { Calculator, TrendingDown, PiggyBank, Calendar, Download, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Free Amortization Schedule Calculator | Mortgage & Loan Payment Calculator | Statement Extract",
    description: "Free amortization schedule calculator. Calculate mortgage payments, see how extra payments reduce interest and time. Supports mortgage, auto, student, and personal loans. Download schedule as CSV.",
    keywords: "amortization schedule calculator, amortization calculator, mortgage payment calculator, loan amortization schedule, mortgage amortization with extra payments, car loan payment calculator, student loan amortization, loan payment schedule, mortgage calculator with extra principal, amortization table, loan payoff calculator, extra payment calculator, mortgage interest calculator",
    openGraph: {
        title: "Amortization Schedule Calculator - See How Extra Payments Save Money",
        description: "Calculate loan payments and generate full amortization schedules. See interest savings from extra payments.",
        type: "website",
        url: "https://statementextract.com/tools/amortization-calculator",
        locale: "en_US"
    },
    twitter: {
        card: "summary_large_image",
        title: "Amortization Calculator - Free Loan Payment Schedule",
        description: "Calculate mortgage and loan payments. See savings from extra payments."
    },
    alternates: {
        canonical: "https://statementextract.com/tools/amortization-calculator/"
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

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Amortization Schedule Calculator",
    "description": "Calculate loan payments and amortization schedules with extra payment analysis",
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
            "name": "What is an amortization schedule?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "An amortization schedule is a table showing each loan payment broken down into principal and interest portions, along with the remaining balance after each payment. It shows how your loan balance decreases over time."
            }
        },
        {
            "@type": "Question",
            "name": "How do extra payments reduce my loan?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Extra payments go directly toward your principal balance, reducing the amount you owe. This means less interest accrues over time, allowing you to pay off your loan faster and save thousands in interest."
            }
        },
        {
            "@type": "Question",
            "name": "How is the monthly payment calculated?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Monthly payment is calculated using the formula: M = P × [r(1+r)^n] / [(1+r)^n – 1], where P is the principal, r is the monthly interest rate, and n is the number of payments."
            }
        },
        {
            "@type": "Question",
            "name": "Can I download my amortization schedule?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! You can download your complete amortization schedule as a CSV file that opens in Excel, Google Sheets, or any spreadsheet application."
            }
        },
        {
            "@type": "Question",
            "name": "What loan types does this calculator support?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "This calculator works for mortgages (15-year, 30-year), auto loans, student loans, personal loans, and any other fixed-rate amortizing loan."
            }
        }
    ]
};

// HowTo Schema for step-by-step instructions
const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Your Loan Amortization Schedule",
    "step": [
        { "@type": "HowToStep", "name": "Enter Loan Details", "text": "Input your loan amount, interest rate, and loan term (in years or months)." },
        { "@type": "HowToStep", "name": "Add Extra Payments (Optional)", "text": "Enter any extra monthly payments you plan to make toward principal." },
        { "@type": "HowToStep", "name": "View Results", "text": "See your monthly payment, total interest, and payoff date instantly." },
        { "@type": "HowToStep", "name": "Download Schedule", "text": "Export your full amortization schedule to CSV for Excel or Google Sheets." }
    ]
};

const relatedTools = [
    { href: "/tools/debt-snowball-calculator", title: "Debt Snowball Calculator" },
    { href: "/tools/fire-calculator", title: "FIRE Calculator" },
    { href: "/tools/rental-roi-calculator", title: "Rental ROI Calculator" },
    { href: "/convert-bank-statement-to-csv-excel", title: "Bank Statement to Excel" },
];

export default function AmortizationCalculatorPage() {
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />

            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <AmortizationCalculator />
            </section>

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use This Amortization Calculator?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: TrendingDown, title: "Extra Payment Analysis", desc: "See exactly how much time and interest you save with extra monthly payments." },
                            { icon: Calendar, title: "Full Payment Schedule", desc: "View every payment for your entire loan term with principal/interest breakdown." },
                            { icon: PiggyBank, title: "Interest Savings", desc: "Calculate total interest savings from making extra payments toward principal." },
                            { icon: Download, title: "Export to CSV", desc: "Download your complete amortization schedule for Excel or Google Sheets." },
                            { icon: Calculator, title: "Multiple Loan Types", desc: "Pre-configured for mortgages, auto loans, student loans, and personal loans." },
                            { icon: CheckCircle, title: "100% Accurate", desc: "Bank-grade calculations you can trust for financial planning." },
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

            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-8">
                        How Extra Payments Save You Money
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse rounded-xl overflow-hidden">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]">
                                    <th className="px-4 py-3 text-left text-white font-semibold">Loan Amount</th>
                                    <th className="px-4 py-3 text-left text-white font-semibold">Extra/Month</th>
                                    <th className="px-4 py-3 text-left text-white font-semibold">Time Saved</th>
                                    <th className="px-4 py-3 text-left text-white font-semibold">Interest Saved</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { loan: "$250,000 @ 6.5%", extra: "$100", time: "3 years, 4 months", saved: "$47,000+" },
                                    { loan: "$250,000 @ 6.5%", extra: "$200", time: "6 years", saved: "$78,000+" },
                                    { loan: "$250,000 @ 6.5%", extra: "$500", time: "11 years", saved: "$130,000+" },
                                    { loan: "$35,000 @ 7.5%", extra: "$50", time: "6 months", saved: "$650+" },
                                    { loan: "$50,000 @ 5.5%", extra: "$100", time: "1 year, 8 months", saved: "$2,800+" },
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? "bg-[hsl(var(--muted))]/30" : "bg-[hsl(var(--card))]"}>
                                        <td className="px-4 py-3 text-[hsl(var(--foreground))]">{row.loan}</td>
                                        <td className="px-4 py-3 text-[hsl(var(--foreground))]">{row.extra}</td>
                                        <td className="px-4 py-3 text-green-600 font-medium">{row.time}</td>
                                        <td className="px-4 py-3 text-green-600 font-bold">{row.saved}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-center text-sm text-[hsl(var(--muted-foreground))] mt-4">
                        *Based on 30-year mortgage or standard loan terms. Actual savings vary by rate and term.
                    </p>
                </div>
            </section>

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        Understanding Loan Amortization
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>Amortization</strong> is the process of spreading loan payments over time. Each monthly payment includes both <strong>principal</strong> (the amount borrowed) and <strong>interest</strong> (the cost of borrowing).
                    </p>
                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        The Amortization Formula
                    </h3>
                    <div className="p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] font-mono text-center mb-4">
                        M = P × [r(1+r)^n] / [(1+r)^n – 1]
                    </div>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Where M = monthly payment, P = principal, r = monthly interest rate, n = number of payments.
                    </p>
                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Why Early Payments Save More
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))]">
                        In the early years of a loan, most of your payment goes to <strong>interest</strong>. By making extra payments early, you reduce the principal faster, which means less interest accrues over the remaining term. This is why even small extra payments can save tens of thousands of dollars over a 30-year mortgage.
                    </p>
                </div>
            </section>

            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {[
                            { q: "What is an amortization schedule?", a: "An amortization schedule is a table showing each loan payment broken down into principal and interest, along with the remaining balance. It shows exactly how your debt decreases over time." },
                            { q: "How do extra payments save money?", a: "Extra payments go directly to your principal balance. This reduces interest accrual, shortens your loan term, and can save thousands in total interest paid." },
                            { q: "Should I pay extra on my mortgage?", a: "Generally yes, if you have no higher-interest debt. Even $100/month extra on a $250,000 mortgage can save $47,000+ in interest and pay off 3+ years early." },
                            { q: "How is monthly payment calculated?", a: "Using the formula: M = P × [r(1+r)^n] / [(1+r)^n – 1], where P is principal, r is monthly rate, and n is total payments." },
                            { q: "Can I download my schedule?", a: "Yes! Click 'Download Schedule' to get a CSV file you can open in Excel or Google Sheets." },
                            { q: "Does this work for car loans?", a: "Yes! This calculator works for any fixed-rate amortizing loan including mortgages, auto loans, student loans, and personal loans." },
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{faq.q}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ToolPageFooter
                currentTool="Amortization Calculator"
                relatedTools={relatedTools}
            />
        </main>
    );
}
