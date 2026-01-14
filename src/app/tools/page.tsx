import { Metadata } from "next";
import Link from "next/link";
import {
    Zap,
    Shield,
    Globe,
    ArrowRight,
} from "lucide-react";
import { ConvertPageClient } from "@/components/tools/ConvertPageClient";

export const metadata: Metadata = {
    title: "Financial Tools & Business Calculators | Free & Instant | Statement Extract",
    description: "Free online financial tools for small businesses and freelancers. Professional invoice generator, tax calculators, profit margin analysis, and more. No signup required.",
    keywords: "free financial tools, business calculators, invoice generator, tax calculator, profit margin, markup calculator, ROI calculator, finance utilities",
    openGraph: {
        title: "Free Financial Tools & Business Calculators",
        description: "Professional tools for your business. Generate invoices, calculate taxes, and analyze ROI for free.",
        type: "website",
        url: "https://statementextract.com/tools",
    },
    alternates: {
        canonical: "https://statementextract.com/tools/",
    },
};

const toolSections = [
    {
        title: "Finance & Invoicing",
        description: "Professional billing and financial management utilities",
        icon: "FileText",
        featured: true,
        tools: [
            {
                title: "Free Invoice Generator",
                description: "Create professional PDF invoices instantly. VAT/GST compliant, multiple currencies, and digital signatures.",
                href: "/tools/invoice-generator",
                icon: "FileText",
                badge: "Hot",
            },
            {
                title: "Profit Margin Calculator",
                description: "Calculate gross margin, net margin, and markup percentage instantly.",
                href: "/tools/profit-margin-calculator",
                icon: "TrendingUp",
                badge: "Popular",
            },
            {
                title: "Markup Calculator",
                description: "Calculate markup percentage, selling price, and profit. Includes markup vs margin conversion.",
                href: "/tools/markup-calculator",
                icon: "Calculator",
                badge: null,
            },
            {
                title: "QuickBooks Import Validator",
                description: "Validate CSV entries for QuickBooks Online. Prevent import errors before they happen.",
                href: "/tools/quickbooks-import-validator",
                icon: "CheckCircle2",
                badge: "New",
            },
        ],
    },
    {
        title: "File Viewers",
        description: "Open and inspect financial file formats without software",
        icon: "Eye",
        featured: false,
        tools: [
            {
                title: "QBO File Viewer",
                description: "Open and view QuickBooks QBO files online. See transactions instantly without software.",
                href: "/tools/qbo-viewer",
                icon: "Eye",
                badge: "New",
            },
            {
                title: "OFX File Viewer",
                description: "Open and view OFX bank statement files online. Supports QFX and QBO too.",
                href: "/tools/ofx-viewer",
                icon: "Eye",
                badge: "New",
            },
        ],
    },
    {
        title: "Tax Calculators",
        description: "Stay compliant with global tax calculation tools",
        icon: "Receipt",
        featured: false,
        tools: [
            {
                title: "Paycheck Calculator",
                description: "Calculate take-home pay after federal, state, Social Security, and Medicare taxes. 2026 tax brackets.",
                href: "/tools/paycheck-calculator",
                icon: "DollarSign",
                badge: "New",
            },
            {
                title: "GST/VAT Calculator",
                description: "Calculate GST, VAT, and sales tax for any country. Add or remove tax easily.",
                href: "/tools/gst-vat-calculator",
                icon: "Receipt",
                badge: "Popular",
            },
            {
                title: "Self-Employed Tax Calculator",
                description: "Calculate 1099 taxes, self-employment tax, and quarterly estimated payments.",
                href: "/tools/self-employed-tax-calculator",
                icon: "Calculator",
                badge: null,
            },
        ],
    },
    {
        title: "Investment & Loans",
        description: "Analyze ROI, mortgage schedules, and debt strategies",
        icon: "Building2",
        featured: false,
        tools: [
            {
                title: "Compound Interest Calculator",
                description: "Calculate investment growth with daily, monthly, or annual compounding. Add monthly contributions.",
                href: "/tools/compound-interest-calculator",
                icon: "TrendingUp",
                badge: "New",
            },
            {
                title: "Hourly to Salary Calculator",
                description: "Convert hourly wage to annual salary instantly. See monthly, weekly, and daily income.",
                href: "/tools/hourly-to-salary-calculator",
                icon: "DollarSign",
                badge: "New",
            },
            {
                title: "Percentage Calculator",
                description: "Calculate increase, decrease, difference, and percentages of numbers.",
                href: "/tools/percentage-calculator",
                icon: "Percent",
                badge: "New",
            },
            {
                title: "Routing Number Validator",
                description: "Verify US Bank routing numbers instantly. Details on ACH vs Wire formats.",
                href: "/tools/routing-number-validator",
                icon: "ShieldCheck",
                badge: "New",
            },
            {
                title: "Amortization Calculator",
                description: "Full loan payment schedules with extra payment analysis. Mortgage, auto, & student loans.",
                href: "/tools/amortization-calculator",
                icon: "TrendingDown",
                badge: "Hot",
            },
            {
                title: "Rental Property ROI",
                description: "Analyze cash flow, Cap Rate, and Cash-on-Cash return for real estate deals.",
                href: "/tools/rental-roi-calculator",
                icon: "Layers",
                badge: "Professional",
            },
            {
                title: "Debt Snowball Calculator",
                description: "Visualize your debt-free date and build a plan to pay off loans faster.",
                href: "/tools/debt-snowball-calculator",
                icon: "TrendingDown",
                badge: null,
            },
            {
                title: "FIRE Calculator",
                description: "Financial Independence, Retire Early. See when you can retire based on your savings.",
                href: "/tools/fire-calculator",
                icon: "Zap",
                badge: null,
            },
            {
                title: "Financial Ratio Calculator",
                description: "Calculate key business ratios: Current Ratio, Quick Ratio, Debt-to-Equity, and more.",
                href: "/tools/financial-ratio-calculator",
                icon: "Calculator",
                badge: "New",
            },
        ],
    }
];

export default function ToolsHubPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            <ConvertPageClient toolSections={toolSections} heroContent={
                <section className="relative py-16 md:py-24 px-6 text-center border-b border-[hsl(var(--border))] overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="grid-pattern-tools" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-[hsl(var(--border))]" strokeOpacity="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid-pattern-tools)" />
                        </svg>
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[hsl(var(--background))] to-transparent" />
                    </div>

                    <div className="relative z-10">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-4 py-1.5">
                            <Zap className="h-4 w-4 text-[hsl(var(--primary))]" />
                            <span className="text-sm font-medium text-[hsl(var(--primary))]">
                                Professional Business Utilities
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))] mb-4">
                            Premium <span className="bg-gradient-primary bg-clip-text text-transparent">Financial Tools</span> for Your Business
                        </h1>
                        <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                            Generate professional invoices, calculate margins, and analyze investments instantly. No signup, no fees, 100% private.
                        </p>
                    </div>
                </section>
            } />

            {/* Features */}
            <section className="relative py-12 md:py-16 px-6 border-t border-[hsl(var(--border))]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Built for Professionals
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Zap, title: "Instant Results", desc: "Get professional-grade documents and calculations in milliseconds." },
                            { icon: Shield, title: "Privacy First", desc: "All data stays on your device. We never store your financial information." },
                            { icon: Globe, title: "Global Ready", desc: "Supports VAT, GST, and multiple currencies for international business." },
                        ].map((feature, i) => (
                            <div key={i} className="text-center">
                                <div className="mx-auto w-14 h-14 rounded-2xl bg-[hsl(var(--primary))]/10 flex items-center justify-center mb-4">
                                    <feature.icon className="w-7 h-7 text-[hsl(var(--primary))]" />
                                </div>
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{feature.title}</h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-t border-[hsl(var(--border))]">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                        Ready to Start Billing?
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-6">
                        Our Free Invoice Generator is the fastest way to get paid. Professional, compliant, and easy to use.
                    </p>
                    <Link
                        href="/tools/invoice-generator"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity shadow-glow"
                    >
                        Try Invoice Generator
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
