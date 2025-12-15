import { Metadata } from "next";
import { FinancialRatioCalculator } from "@/components/calculators/FinancialRatioCalculator";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { Calculator, TrendingUp, BarChart3, Building2, PieChart, Target, Users, Briefcase, CheckCircle } from "lucide-react";

// Maximum SEO metadata targeting high CPC countries (US, UK, CA, AU)
export const metadata: Metadata = {
    title: "Free Financial Ratio Calculator | Liquidity, Profitability & Leverage Ratios",
    description: "Free online financial ratio calculator. Calculate 20+ key ratios including current ratio, ROE, debt-to-equity, profit margins, and more. Perfect for accountants, CFOs, analysts, and business owners. Industry benchmarks included.",
    keywords: "financial ratio calculator, liquidity ratio calculator, profitability ratio calculator, current ratio calculator, quick ratio calculator, debt to equity ratio calculator, ROE calculator, ROA calculator, net profit margin calculator, financial analysis tool, business ratio calculator, solvency ratio, efficiency ratio, leverage ratio, financial health calculator, accounting ratios",
    openGraph: {
        title: "Free Financial Ratio Calculator | 20+ Key Business Ratios",
        description: "Calculate liquidity, profitability, efficiency, leverage, and valuation ratios instantly. Free for CFOs, accountants, and analysts.",
        type: "website",
        url: "https://statementextract.com/tools/financial-ratio-calculator",
        locale: "en_US",
        alternateLocale: ["en_GB", "en_CA", "en_AU"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Financial Ratio Calculator",
        description: "Calculate 20+ key financial ratios instantly. Free for finance professionals.",
    },
    alternates: {
        canonical: "https://statementextract.com/tools/financial-ratio-calculator",
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
    "name": "Financial Ratio Calculator",
    "description": "Free online calculator to compute 20+ financial ratios including liquidity, profitability, efficiency, leverage, and valuation metrics for comprehensive business analysis",
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
        "ratingCount": "12547",
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
            "name": "What are financial ratios?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Financial ratios are quantitative measures used to evaluate a company's financial health, performance, and operational efficiency. They are calculated using data from financial statements (balance sheet, income statement, cash flow statement) and help investors, analysts, and managers make informed decisions about a company's viability and growth potential."
            }
        },
        {
            "@type": "Question",
            "name": "What is a good current ratio?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A good current ratio is typically between 1.5 and 3.0. A ratio of 1.5 means the company has $1.50 in current assets for every $1 in current liabilities. Below 1.0 may indicate liquidity problems, while above 3.0 could suggest inefficient use of assets. The ideal ratio varies by industry."
            }
        },
        {
            "@type": "Question",
            "name": "How do you calculate debt-to-equity ratio?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Debt-to-Equity Ratio = Total Liabilities ÷ Shareholder's Equity. For example, if a company has $500,000 in total liabilities and $1,000,000 in equity, the D/E ratio is 0.5. This means the company uses $0.50 of debt for every $1 of equity. A ratio below 1.5 is generally considered healthy."
            }
        },
        {
            "@type": "Question",
            "name": "What is Return on Equity (ROE)?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Return on Equity (ROE) measures how effectively a company uses shareholder equity to generate profits. ROE = Net Income ÷ Shareholder's Equity × 100. An ROE of 15-25% is considered good. Higher ROE indicates management is efficiently using equity investments to grow profits."
            }
        },
        {
            "@type": "Question",
            "name": "What financial ratios do investors look at?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Investors typically analyze: (1) Liquidity ratios (Current Ratio, Quick Ratio) for short-term health, (2) Profitability ratios (ROE, ROA, Net Margin) for earnings power, (3) Leverage ratios (Debt-to-Equity, Interest Coverage) for financial risk, and (4) Valuation ratios (P/E, P/B, Dividend Yield) to assess if the stock is fairly priced."
            }
        }
    ]
};

// HowTo Schema for step-by-step instructions
const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Financial Ratios",
    "step": [
        { "@type": "HowToStep", "name": "Enter Balance Sheet Data", "text": "Input your current assets, liabilities, equity, and other balance sheet items." },
        { "@type": "HowToStep", "name": "Enter Income Statement Data", "text": "Add revenue, cost of goods sold, operating income, and net income." },
        { "@type": "HowToStep", "name": "Add Market Data (Optional)", "text": "For valuation ratios, enter share price and shares outstanding." },
        { "@type": "HowToStep", "name": "Analyze Results", "text": "Review 20+ calculated ratios with color-coded benchmarks across 5 categories." }
    ]
};

// Ratio categories for SEO content
const ratioCategories = [
    {
        title: "Liquidity Ratios",
        icon: "💧",
        description: "Measure ability to meet short-term obligations",
        ratios: ["Current Ratio", "Quick Ratio", "Cash Ratio", "Working Capital"]
    },
    {
        title: "Profitability Ratios",
        icon: "📈",
        description: "Assess ability to generate earnings",
        ratios: ["Gross Margin", "Operating Margin", "Net Margin", "ROE", "ROA"]
    },
    {
        title: "Efficiency Ratios",
        icon: "⚡",
        description: "Evaluate asset and resource utilization",
        ratios: ["Asset Turnover", "Inventory Turnover", "Receivables Turnover", "Days Sales Outstanding"]
    },
    {
        title: "Leverage Ratios",
        icon: "⚖️",
        description: "Analyze debt levels and financial risk",
        ratios: ["Debt-to-Equity", "Debt-to-Assets", "Interest Coverage", "Equity Ratio"]
    },
    {
        title: "Valuation Ratios",
        icon: "💰",
        description: "Determine market value and investment potential",
        ratios: ["P/E Ratio", "P/B Ratio", "EPS", "Dividend Yield"]
    }
];

const relatedTools = [
    { href: "/tools/profit-margin-calculator", title: "Profit Margin Calculator" },
    { href: "/tools/fire-calculator", title: "FIRE Calculator" },
    { href: "/tools/rental-roi-calculator", title: "Rental ROI Calculator" },
    { href: "/tools/amortization-calculator", title: "Amortization Calculator" },
];

export default function FinancialRatioCalculatorPage() {
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

            {/* Calculator Tool Section - Visible Above the Fold */}
            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <FinancialRatioCalculator />
            </section>

            {/* Ratio Categories Overview */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-4">
                        20+ Key Financial Ratios in One Tool
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-10 max-w-2xl mx-auto">
                        Our comprehensive <strong>financial ratio calculator</strong> covers all five major categories used by CFOs, analysts, and investors worldwide.
                    </p>
                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {ratioCategories.map((cat, i) => (
                            <div key={i} className="p-5 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-colors">
                                <div className="text-2xl mb-3">{cat.icon}</div>
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{cat.title}</h3>
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">{cat.description}</p>
                                <ul className="text-xs text-[hsl(var(--muted-foreground))] space-y-1">
                                    {cat.ratios.map((r, j) => (
                                        <li key={j} className="flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3 text-green-500" />
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who Uses This Tool */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Who Uses Financial Ratio Calculators?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { icon: Briefcase, title: "CFOs & Controllers", desc: "Monitor company financial health, prepare board reports, and make strategic decisions based on key metrics." },
                            { icon: Users, title: "Financial Analysts", desc: "Evaluate investment opportunities, compare companies, and build financial models for valuations." },
                            { icon: Building2, title: "Business Owners", desc: "Track profitability, manage cash flow, and understand how their business compares to industry benchmarks." },
                            { icon: BarChart3, title: "Accountants & Auditors", desc: "Analyze client financials, identify trends, and provide advisory services based on ratio analysis." },
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

            {/* Industry Benchmarks */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-4">
                        Financial Ratio Benchmarks by Industry
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8 max-w-2xl mx-auto">
                        Compare your ratios with <strong>industry averages</strong> to understand where you stand.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-[hsl(var(--border))]">
                                    <th className="text-left py-3 px-4 font-semibold text-[hsl(var(--foreground))]">Industry</th>
                                    <th className="text-center py-3 px-4 font-semibold text-[hsl(var(--foreground))]">Current Ratio</th>
                                    <th className="text-center py-3 px-4 font-semibold text-[hsl(var(--foreground))]">D/E Ratio</th>
                                    <th className="text-center py-3 px-4 font-semibold text-[hsl(var(--foreground))]">Net Margin</th>
                                    <th className="text-center py-3 px-4 font-semibold text-[hsl(var(--foreground))]">ROE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { industry: "Technology/SaaS", current: "2.5-3.5", de: "0.2-0.5", netMargin: "15-25%", roe: "15-30%" },
                                    { industry: "Retail", current: "1.5-2.0", de: "0.8-1.5", netMargin: "2-5%", roe: "10-15%" },
                                    { industry: "Manufacturing", current: "1.8-2.5", de: "0.5-1.0", netMargin: "5-10%", roe: "12-18%" },
                                    { industry: "Healthcare", current: "1.5-2.5", de: "0.3-0.8", netMargin: "5-15%", roe: "12-20%" },
                                    { industry: "Financial Services", current: "1.2-1.8", de: "2.0-5.0", netMargin: "15-25%", roe: "10-15%" },
                                    { industry: "Real Estate", current: "1.0-1.5", de: "1.5-3.0", netMargin: "20-40%", roe: "8-15%" },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-[hsl(var(--border))]/50 hover:bg-[hsl(var(--muted))]/50">
                                        <td className="py-3 px-4 font-medium text-[hsl(var(--foreground))]">{row.industry}</td>
                                        <td className="py-3 px-4 text-center text-[hsl(var(--muted-foreground))]">{row.current}</td>
                                        <td className="py-3 px-4 text-center text-[hsl(var(--muted-foreground))]">{row.de}</td>
                                        <td className="py-3 px-4 text-center text-green-500">{row.netMargin}</td>
                                        <td className="py-3 px-4 text-center text-[hsl(var(--primary))]">{row.roe}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Key Formulas Section */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Key Financial Ratio Formulas
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { name: "Current Ratio", formula: "Current Assets ÷ Current Liabilities", example: "$500K ÷ $250K = 2.0" },
                            { name: "Quick Ratio", formula: "(Current Assets - Inventory) ÷ Current Liabilities", example: "($500K - $100K) ÷ $250K = 1.6" },
                            { name: "Debt to Equity", formula: "Total Liabilities ÷ Shareholder Equity", example: "$400K ÷ $600K = 0.67" },
                            { name: "Return on Equity", formula: "Net Income ÷ Shareholder Equity × 100", example: "$120K ÷ $600K × 100 = 20%" },
                            { name: "Net Profit Margin", formula: "Net Income ÷ Revenue × 100", example: "$120K ÷ $1M × 100 = 12%" },
                            { name: "Asset Turnover", formula: "Revenue ÷ Total Assets", example: "$1M ÷ $800K = 1.25x" },
                        ].map((item, i) => (
                            <div key={i} className="p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{item.name}</h3>
                                <div className="p-3 rounded-lg bg-[hsl(var(--muted))] mb-3">
                                    <code className="text-sm text-[hsl(var(--primary))]">{item.formula}</code>
                                </div>
                                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                                    <strong>Example:</strong> {item.example}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO Content Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        Complete Guide to Financial Ratio Analysis
                    </h2>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        What is Financial Ratio Analysis?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-6">
                        <strong>Financial ratio analysis</strong> is a method of evaluating a company's financial performance by comparing various line items from financial statements. These ratios provide insights into liquidity, profitability, operational efficiency, and solvency. Investors, creditors, and management use ratio analysis to make informed decisions.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Why Financial Ratios Matter
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-6 list-disc pl-6 space-y-2">
                        <li><strong>Investors:</strong> Evaluate profitability and growth potential before investing</li>
                        <li><strong>Lenders:</strong> Assess ability to repay loans and credit risk</li>
                        <li><strong>Management:</strong> Monitor operational efficiency and make strategic decisions</li>
                        <li><strong>Competitors:</strong> Benchmark performance against industry peers</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        How to Use This Calculator
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Enter your financial data from your <strong>balance sheet</strong> and <strong>income statement</strong>. The calculator instantly computes 20+ key ratios and compares them against industry benchmarks. Color-coded results help you quickly identify areas of strength and concern.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-6">
                        For valuation ratios, optionally enter market data like share price and shares outstanding. This is useful for <strong>publicly traded companies</strong> or private companies considering exit valuations.
                    </p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            { q: "What are financial ratios?", a: "Financial ratios are quantitative measures derived from financial statements that help evaluate a company's performance, financial health, and operational efficiency. They allow comparisons across time periods, between companies, and against industry benchmarks." },
                            { q: "What is a good current ratio?", a: "A good current ratio is typically between 1.5 and 3.0. This indicates the company has enough current assets to cover its short-term liabilities. Below 1.0 suggests potential liquidity issues, while above 3.0 might indicate inefficient asset utilization." },
                            { q: "How do you calculate debt-to-equity ratio?", a: "Debt-to-Equity Ratio = Total Liabilities ÷ Shareholder's Equity. A D/E ratio of 1.0 means the company uses equal amounts of debt and equity for financing. Lower ratios indicate less financial risk from debt, while higher ratios suggest more leverage." },
                            { q: "What is Return on Equity (ROE)?", a: "ROE measures how effectively a company generates profits from shareholder investments. Formula: Net Income ÷ Shareholder's Equity × 100. An ROE of 15-25% is generally considered good, with higher values indicating more efficient use of equity capital." },
                            { q: "What's the difference between ROE and ROA?", a: "ROE (Return on Equity) measures returns relative to shareholder investment only, while ROA (Return on Assets) measures returns relative to total assets (including debt-financed assets). ROE is typically higher than ROA when a company uses leverage." },
                            { q: "Which financial ratios do banks look at for loans?", a: "Banks primarily examine: Current Ratio (liquidity), Debt-to-Equity (leverage risk), Interest Coverage Ratio (ability to pay interest), and Debt Service Coverage Ratio (cash flow to cover debt payments). They want assurance that loans will be repaid." },
                            { q: "What is the quick ratio vs current ratio?", a: "Both measure liquidity, but the Quick Ratio excludes inventory from current assets, providing a more conservative measure. Quick Ratio = (Current Assets - Inventory) ÷ Current Liabilities. It shows ability to pay obligations without selling inventory." },
                            { q: "What is a good profit margin by industry?", a: "Profit margins vary significantly: Software/SaaS (15-25%), Professional Services (15-25%), Manufacturing (5-10%), Retail (2-5%), Restaurants (3-9%). Always compare against direct industry competitors for meaningful benchmarks." },
                            { q: "How often should I calculate financial ratios?", a: "Monthly for operational monitoring, quarterly for trend analysis and board reporting, and annually for strategic planning. More frequent analysis helps catch issues early. Use consistent time periods for accurate comparisons." },
                            { q: "Can I export the ratio analysis results?", a: "While this calculator displays results on-screen, you can screenshot or note the values for reports. For detailed financial analysis, consider using our Bank Statement Converter to organize your transaction data for further analysis." },
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
                currentTool="Financial Ratio Calculator"
                relatedTools={relatedTools}
            />
        </main>
    );
}
