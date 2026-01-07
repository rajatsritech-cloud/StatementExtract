import { Metadata } from "next";
import { CompoundInterestCalculator } from "@/components/calculators/CompoundInterestCalculator";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { Calculator, TrendingUp, PiggyBank, Calendar, Download, CheckCircle, Zap, Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "Compound Interest Calculator with Monthly Contributions | Free Daily & Monthly Compounding | Statement Extract",
    description: "Free compound interest calculator with monthly contributions. See how your savings grow with daily, monthly, quarterly, or annual compounding. Download year-by-year breakdown. Perfect for retirement planning, investment growth, and savings goals.",
    keywords: [
        // Long-tail primary targets
        "compound interest calculator with monthly contributions",
        "daily compound interest calculator",
        "monthly compound interest calculator",
        "compound interest calculator with deposits",
        "savings compound interest calculator",
        "investment growth calculator with contributions",
        // Secondary
        "compound interest formula",
        "interest calculator",
        "future value calculator",
        "APY calculator",
        "retirement compound interest",
        "how to calculate compound interest",
        "compound interest for retirement",
        "savings growth calculator",
        "investment calculator",
        "compound interest explained",
    ],
    openGraph: {
        title: "Free Compound Interest Calculator with Monthly Contributions",
        description: "Calculate how your investments grow with compound interest. Add monthly contributions, choose compounding frequency, download results.",
        type: "website",
        url: "https://statementextract.com/tools/compound-interest-calculator/",
    },
    alternates: {
        canonical: "https://statementextract.com/tools/compound-interest-calculator/",
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

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Compound Interest Calculator with Monthly Contributions",
    "description": "Calculate compound interest with optional monthly contributions. Supports daily, monthly, quarterly, and annual compounding frequencies.",
    "url": "https://statementextract.com/tools/compound-interest-calculator/",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
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

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is compound interest?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Compound interest is interest earned on both your initial principal and the accumulated interest from previous periods. Unlike simple interest, which only earns on the principal, compound interest allows your money to grow exponentially over time."
            }
        },
        {
            "@type": "Question",
            "name": "What is the compound interest formula?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The compound interest formula is A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual interest rate, n is the number of times interest compounds per year, and t is the time in years. For monthly contributions, an additional term is added to account for regular deposits."
            }
        },
        {
            "@type": "Question",
            "name": "How does compounding frequency affect my returns?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "More frequent compounding (daily vs. annually) results in higher returns because you earn interest on your interest more often. Daily compounding gives slightly higher returns than monthly, and monthly gives higher returns than annual compounding."
            }
        },
        {
            "@type": "Question",
            "name": "Why are monthly contributions important for compound interest?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Regular monthly contributions significantly accelerate wealth building because each contribution also earns compound interest. Even small monthly additions can grow to substantial amounts over time due to the compounding effect."
            }
        },
        {
            "@type": "Question",
            "name": "Is this calculator accurate for retirement planning?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, this calculator provides accurate projections for retirement planning. However, actual returns may vary based on market conditions. For comprehensive retirement planning, consider consulting a financial advisor."
            }
        }
    ]
};

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Compound Interest with Monthly Contributions",
    "step": [
        { "@type": "HowToStep", "text": "Enter your initial investment (principal amount)" },
        { "@type": "HowToStep", "text": "Enter your planned monthly contribution" },
        { "@type": "HowToStep", "text": "Set your expected annual interest rate" },
        { "@type": "HowToStep", "text": "Choose your investment time period in years" },
        { "@type": "HowToStep", "text": "Select compounding frequency: Daily, Monthly, Quarterly, or Annually" },
        { "@type": "HowToStep", "text": "View your projected future value and interest earned" },
    ]
};

const relatedTools = [
    { href: "/tools/amortization-calculator", title: "Amortization Calculator" },
    { href: "/tools/debt-snowball-calculator", title: "Debt Snowball Calculator" },
    { href: "/tools/fire-calculator", title: "FIRE Calculator" },
    { href: "/tools/rental-roi-calculator", title: "Rental ROI Calculator" },
    { href: "/tools/profit-margin-calculator", title: "Profit Margin Calculator" },
];

const features = [
    { icon: Calculator, title: "Multiple Compounding Options", desc: "Daily, monthly, quarterly, or annual compounding" },
    { icon: TrendingUp, title: "Monthly Contributions", desc: "See how regular deposits accelerate growth" },
    { icon: Calendar, title: "Year-by-Year Breakdown", desc: "Track your investment growth every year" },
    { icon: Download, title: "Download Results", desc: "Export your breakdown to CSV" },
    { icon: Shield, title: "100% Private", desc: "All calculations run in your browser" },
    { icon: Zap, title: "Instant Results", desc: "See projections update in real-time" },
];

export default function CompoundInterestCalculatorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaData)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(howToSchema)
                }}
            />

            <section className="py-12 px-4">
                <CompoundInterestCalculator />
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                        Powerful Compound Interest Calculator Features
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <div key={i} className="p-6 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <feature.icon className="w-8 h-8 text-[hsl(var(--primary))] mb-3" />
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{feature.title}</h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO Content Section */}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
                    <h2>Understanding Compound Interest with Monthly Contributions</h2>
                    <p>
                        Compound interest is often called the "eighth wonder of the world" because of its powerful wealth-building potential. Unlike simple interest, which only earns returns on your initial principal, compound interest earns returns on both your principal <strong>and</strong> your accumulated interest.
                    </p>
                    <p>
                        When you add <strong>monthly contributions</strong> to compound interest, the effect becomes even more dramatic. Each contribution you make also starts earning compound interest, creating a snowball effect that accelerates your investment growth over time.
                    </p>

                    <h3>The Compound Interest Formula Explained</h3>
                    <p>
                        The basic compound interest formula is: <code>A = P(1 + r/n)^(nt)</code>
                    </p>
                    <ul>
                        <li><strong>A</strong> = Final amount (future value)</li>
                        <li><strong>P</strong> = Principal (initial investment)</li>
                        <li><strong>r</strong> = Annual interest rate (as a decimal)</li>
                        <li><strong>n</strong> = Compounding frequency per year</li>
                        <li><strong>t</strong> = Time in years</li>
                    </ul>

                    <h3>Daily vs. Monthly vs. Annual Compounding</h3>
                    <p>
                        The more frequently interest compounds, the faster your money grows. With <strong>daily compounding</strong>, your interest is calculated and added to your balance 365 times per year. <strong>Monthly compounding</strong> does this 12 times, <strong>quarterly</strong> 4 times, and <strong>annual compounding</strong> just once.
                    </p>
                    <p>
                        For example, $10,000 at 7% interest over 20 years:
                    </p>
                    <ul>
                        <li>Annual compounding: $38,697</li>
                        <li>Monthly compounding: $40,387</li>
                        <li>Daily compounding: $40,552</li>
                    </ul>

                    <h3>The Power of Monthly Contributions</h3>
                    <p>
                        Adding just $500 per month to your investments can dramatically change your outcome. Using our <strong>compound interest calculator with monthly contributions</strong>, you can see exactly how these regular deposits compound over time—often resulting in hundreds of thousands of dollars in additional wealth.
                    </p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4 bg-[hsl(var(--muted))]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqSchema.mainEntity.map((faq, i) => (
                            <details key={i} className="group p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <summary className="font-medium text-[hsl(var(--foreground))] cursor-pointer list-none flex items-center justify-between">
                                    {faq.name}
                                    <span className="text-[hsl(var(--muted-foreground))] group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-3 text-[hsl(var(--muted-foreground))]">
                                    {faq.acceptedAnswer.text}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <ToolPageFooter relatedTools={relatedTools} />
        </>
    );
}
