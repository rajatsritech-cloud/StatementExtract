import { Metadata } from "next";
import Link from "next/link";
import { HourlyToSalaryTool } from "@/components/tools/HourlyToSalaryTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { PageMeta } from "@/components/PageMeta";
import {
    CheckCircle,
    Zap,
    Briefcase,
    Calendar,
    DollarSign,
    TrendingUp
} from "lucide-react";

export const metadata: Metadata = {
    title: "Hourly to Salary Calculator | Convert Hourly Wage to Annual Income",
    description: "Convert hourly wage to annual salary immediately. Support for USD, GBP, EUR, CAD, and AUD. See your daily, weekly, and monthly income breakdown.",
    keywords: "hourly to salary, hourly wage calculator, currency converter salary, annual income calculator uk, hourly to salary canada, hourly to salary australia",
    openGraph: {
        title: "Hourly to Salary Calculator - Instant Wage Converter",
        description: "See exactly how much you earn. Convert hourly rate to yearly, monthly, and weekly salary instantly.",
        type: "website",
        url: "https://statementextract.com/tools/hourly-to-salary-calculator",
    },
    alternates: {
        canonical: "https://statementextract.com/tools/hourly-to-salary-calculator",
    },
};

const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hourly to Salary Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "featureList": "Convert Hourly to Annual, Monthly Pay Breakdown, Bi-Weekly Pay Check",
    "softwareRequirements": "Modern Web Browser"
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://statementextract.com" },
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://statementextract.com/tools" },
        { "@type": "ListItem", "position": 3, "name": "Hourly to Salary Calculator" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How is annual salary calculated from hourly rate?",
            "acceptedAnswer": { "@type": "Answer", "text": "We multiply your hourly rate by the number of hours you work per week (typically 40) and then by the number of weeks in a year (52). Formula: Rate × 40 × 52 = Annual Salary." }
        },
        {
            "@type": "Question",
            "name": "How many work hours are in a year?",
            "acceptedAnswer": { "@type": "Answer", "text": "A standard full-time work year (40 hours/week) is 2,080 hours. This creates the baseline for most annual salary calculations." }
        },
        {
            "@type": "Question",
            "name": "How do I calculate monthly income from hourly wage?",
            "acceptedAnswer": { "@type": "Answer", "text": "First calculate your annual salary (Hourly Rate × 2080), then divide by 12. Do not just multiply your weekly pay by 4, as a month has roughly 4.33 weeks." }
        },
        {
            "@type": "Question",
            "name": "Does this include taxes?",
            "acceptedAnswer": { "@type": "Answer", "text": "This calculator shows your Gross Income (before taxes). To see your tailored Take-Home Pay after taxes, try our full Paycheck Calculator." }
        }
    ]
};

const relatedTools = [
    { href: "/tools/paycheck-calculator", title: "Paycheck Calculator (After Tax)" },
    { href: "/tools/self-employed-tax-calculator", title: "Self-Employed Tax Calculator" },
    { href: "/tools/profit-margin-calculator", title: "Profit Margin Calculator" },
    { href: "/tools/fire-calculator", title: "FIRE Retirement Calculator" },
];

export default function HourlyToSalaryPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <HourlyToSalaryTool />
            </section>

            {/* Why Use This Tool */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-12">
                        Common Hourly vs Salary Conversions (Global)
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: DollarSign,
                                title: "25/hr in Annual Income",
                                desc: "At 40 hours/week, 25/hr is 52,000 per year before taxes. Works for USD, GBP, EUR, and more."
                            },
                            {
                                icon: DollarSign,
                                title: "15/hr Minimum Wage",
                                desc: "Earning 15/hr equates to 31,200 annually. Your gross weekly paycheck is 600."
                            },
                            {
                                icon: DollarSign,
                                title: "50/hr High Income",
                                desc: "Making 50/hr means a salary of 104,000 per year. This breaks the six-figure milestone."
                            },
                            {
                                icon: DollarSign,
                                title: "Global Currency Support",
                                desc: "Switch instantly between USD ($), EUR (€), GBP (£), CAD ($), AUD ($), and JPY (¥)."
                            },
                            {
                                icon: DollarSign,
                                title: "Freelance Rates",
                                desc: "Calculate daily and weekly earnings for short-term contracts in any currency."
                            },
                            {
                                icon: Briefcase,
                                title: "Full Time vs Part Time",
                                desc: "Our calculator lets you adjust weekly hours, so you can see income for 20, 30, or 40 hour weeks."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] hover:shadow-lg transition-shadow">
                                <feature.icon className="w-10 h-10 text-[hsl(var(--primary))] mb-4" />
                                <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-3">{feature.title}</h3>
                                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Deep Dive: Taxes & Employment Types */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/10">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-3xl font-bold text-center mb-8">It's Not Just About the Rate: Factors Affecting Pay</h2>

                    <div className="grid md:grid-cols-2 gap-8 not-prose mb-12">
                        <div className="bg-[hsl(var(--card))] p-6 rounded-2xl border border-[hsl(var(--border))]">
                            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-blue-500" />
                                W-2 Employee
                            </h3>
                            <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Employer pays half of FICA taxes</li>
                                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Eligible for Benefits (Health, 401k)</li>
                                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Guaranteed Minimum Wage</li>
                                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Overtime Protection (1.5x)</li>
                            </ul>
                        </div>
                        <div className="bg-[hsl(var(--card))] p-6 rounded-2xl border border-[hsl(var(--border))]">
                            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-orange-500" />
                                1099 Contractor
                            </h3>
                            <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                                <li className="flex gap-2"><Zap className="w-4 h-4 text-orange-500" /> You pay full 15.3% Self-Employment Tax</li>
                                <li className="flex gap-2"><Zap className="w-4 h-4 text-orange-500" /> No Benefits (Pay your own insurance)</li>
                                <li className="flex gap-2"><Zap className="w-4 h-4 text-orange-500" /> No Overtime or Rights</li>
                                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Tax Deductions (Home Office, etc)</li>
                            </ul>
                        </div>
                    </div>

                    <h3>Historical Context: The Evolution of Hourly Wages</h3>
                    <p>
                        The concept of an "hourly wage" became standardized with the Fair Labor Standards Act (FLSA) of 1938, which also established the 40-hour workweek and the first federal minimum wage ($0.25/hr).
                    </p>
                    <ul>
                        <li><strong>1938:</strong> $0.25/hr (approx $5.00 today)</li>
                        <li><strong>1968:</strong> $1.60/hr (peak purchasing power, approx $14.00 today)</li>
                        <li><strong>2009:</strong> $7.25/hr (standard federal rate unchanged for over a decade)</li>
                    </ul>
                </div>
            </section >

            {/* Comparison Table */}
            < section className="py-12 md:py-16 px-4" >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Hourly vs. Salary: Pros & Cons
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Understanding the trade-offs between hourly wages and fixed annual salaries.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]/10">
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--foreground))]">Feature</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--primary))]">Hourly Wage</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--muted-foreground))]">Annual Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: "Overtime", hourly: "Paid (Typically 1.5x)", salary: "Usually Unpaid" },
                                    { feature: "Income Stability", hourly: "Fluctuates with hours", salary: "Consistent Paycheck" },
                                    { feature: "Flexibility", hourly: "High (Shift work)", salary: "Standard (9-5)" },
                                    { feature: "Benefits", hourly: "Often Limited", salary: "Health, 401k, PTO" },
                                    { feature: "Work-Life Balance", hourly: "Work stays at work", salary: "Work often follows you home" },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-[hsl(var(--border))]">
                                        <td className="p-4 text-[hsl(var(--foreground))]">{row.feature}</td>
                                        <td className="p-4 text-[hsl(var(--primary))] font-medium">{row.hourly}</td>
                                        <td className="p-4 text-[hsl(var(--muted-foreground))]">{row.salary}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section >

            {/* Why Calc This? */}
            < section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-t border-[hsl(var(--border))]" >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        When to Use This Calculator?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: "Comparing Job Offers", desc: "Easily compare a $65,000 salary offer against your current $30/hr contract role." },
                            { title: "Asking for a Raise", desc: "Calculate exactly how much a $2/hr raise adds to your bottom line ($4,160/year!)." },
                            { title: "Freelance Pricing", desc: "Reverse engineer your hourly rate to hit your goal of earning $100,000 this year." },
                            { title: "Budget Planning", desc: "Convert your variable weekly pay into a steady monthly average for rent and bills." },
                        ].map((useCase, i) => (
                            <div key={i} className="flex gap-4 items-start p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <CheckCircle className="w-6 h-6 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">{useCase.title}</h3>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{useCase.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How To Section */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        How to Convert Hourly Rate to Salary
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Enter Hourly Rate", desc: "Input your gross hourly wage (before tax)." },
                            { step: 2, title: "Set Hours per Week", desc: "Default is 40. Adjust if you work overtime or part-time." },
                            { step: 3, title: "Check Annual Weeks", desc: "Most salaried jobs pay for 52 weeks (including vacation). Hourly contractors might work 50." },
                            { step: 4, title: "View Income", desc: "Instantly see what that rate equals in annual, monthly, and weekly pay." },
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

            {/* SEO Content Block */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        Understanding Hourly vs. Salary Pay
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        When comparing job offers, it's crucial to understand the difference between an hourly wage and an annual salary. Hourly positions pay you for every specific hour you work (often eligible for overtime), while salaried positions pay a fixed amount regardless of exact hours worked.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        To compare "apples to apples," use this calculator to normalize the payments. If an employer offers <strong>$65,000 a year</strong>, you can work backwards to see that it equals roughly <strong>$31.25/hr</strong> (assuming 40 hours/week).
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        The "Working Days" Factor
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-8">
                        A typical year has 52 weeks, but roughly 260 working days (5 days × 52 weeks). However, after accounting for public holidays (typically 10-11 days), the actual working days are closer to <strong>250 days per year</strong>. This calculator assumes a standard paid 52-week year, which is typical for comparing gross income.
                    </p>

                    <div className="bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/20 rounded-2xl p-6 my-8 not-prose">
                        <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-[hsl(var(--primary))]" />
                            The Salary Calculation Formula
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="bg-[hsl(var(--background))] p-4 rounded-xl border border-[hsl(var(--border))]">
                                <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Annual Formula</span>
                                <p className="text-lg font-mono font-bold text-[hsl(var(--foreground))] mt-1">
                                    Hourly Rate × Hours/Week × 52
                                </p>
                            </div>
                            <div className="bg-[hsl(var(--background))] p-4 rounded-xl border border-[hsl(var(--border))]">
                                <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Monthly Formula</span>
                                <p className="text-lg font-mono font-bold text-[hsl(var(--foreground))] mt-1">
                                    Annual Salary ÷ 12
                                </p>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Why Gross Income Matters for Loans
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Banks and lenders typically ask for your <strong>Gross Annual Income</strong> (before taxes) when you apply for mortgages, auto loans, or credit cards. Using this calculator helps you provide the exact number lenders are looking for, increasing your chances of accurate qualification.
                    </p>
                </div>
            </section >

            {/* FAQ */}
            < section className="py-12 md:py-16 px-6" >
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqSchema.mainEntity.map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-lg text-[hsl(var(--foreground))] mb-2">{faq.name}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.acceptedAnswer.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            <section className="py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <PageMeta lastUpdated="January 2026" />
                </div>
            </section>

            <ToolPageFooter
                currentTool="Hourly to Salary"
                relatedTools={relatedTools}
            />
        </main >
    );
}
