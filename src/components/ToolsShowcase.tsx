"use client";

import Link from "next/link";
import {
    Calculator, FileSpreadsheet, FileText, Wallet,
    Receipt, PiggyBank, TrendingUp, Building2, Percent,
    ArrowRightLeft, Eye, Minimize2, Split,
    Layers, FileImage, Code, CreditCard, ArrowRight
} from "lucide-react";

const TOOL_CATEGORIES = [
    {
        title: "Finance Calculators",
        description: "Calculate loans, investments, and taxes with precision",
        gradient: "from-emerald-500/20 to-teal-500/20",
        iconBg: "bg-emerald-500/10",
        iconColor: "text-emerald-500",
        theme: {
            border: "hover:border-emerald-500/50",
            shadow: "hover:shadow-emerald-500/10",
            glow: "group-hover:from-emerald-500/5",
            text: "group-hover:text-emerald-500",
            arrow: "text-emerald-500"
        },
        tools: [
            { name: "Compound Interest", href: "/tools/compound-interest-calculator", icon: TrendingUp, description: "Investment growth" },
            { name: "Amortization Calculator", href: "/tools/amortization-calculator", icon: Calculator, description: "Loan payment schedules" },
            { name: "Debt Snowball", href: "/tools/debt-snowball-calculator", icon: PiggyBank, description: "Pay off debt faster" },
            { name: "FIRE Calculator", href: "/tools/fire-calculator", icon: TrendingUp, description: "Financial independence" },
            { name: "Rental ROI", href: "/tools/rental-roi-calculator", icon: Building2, description: "Property returns" },
            { name: "Profit Margin", href: "/tools/profit-margin-calculator", icon: Percent, description: "Business margins" },
            { name: "GST/VAT Calculator", href: "/tools/gst-vat-calculator", icon: Receipt, description: "Tax calculations" },
            { name: "Markup Calculator", href: "/tools/markup-calculator", icon: Calculator, description: "Price markup" },
            { name: "Self-Employed Tax", href: "/tools/self-employed-tax-calculator", icon: Wallet, description: "Freelancer taxes" },
        ]
    },
    {
        title: "File Converters",
        description: "Convert between financial file formats seamlessly",
        gradient: "from-blue-500/20 to-indigo-500/20",
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-500",
        theme: {
            border: "hover:border-blue-500/50",
            shadow: "hover:shadow-blue-500/10",
            glow: "group-hover:from-blue-500/5",
            text: "group-hover:text-blue-500",
            arrow: "text-blue-500"
        },
        tools: [
            { name: "Invoice to Excel", href: "/convert-invoice-to-excel-csv", icon: FileText, description: "Extract invoice data" },
            { name: "CSV to QBO", href: "/convert/csv-to-qbo", icon: ArrowRightLeft, description: "QuickBooks format" },
            { name: "CSV to OFX", href: "/convert/csv-to-ofx", icon: ArrowRightLeft, description: "Open Financial Exchange" },
            { name: "CSV to MT940", href: "/convert/csv-to-mt940", icon: ArrowRightLeft, description: "Bank statement format" },
            { name: "QIF to CSV", href: "/convert/qif-to-csv", icon: FileSpreadsheet, description: "Quicken to spreadsheet" },
            { name: "QIF to QBO", href: "/convert/qif-to-qbo", icon: ArrowRightLeft, description: "Quicken to QuickBooks" },
            { name: "QFX to CSV", href: "/convert/qfx-to-csv", icon: FileSpreadsheet, description: "Web Connect export" },
            { name: "OFX to Excel", href: "/convert/ofx-to-excel", icon: FileSpreadsheet, description: "OFX to spreadsheet" },
            { name: "MT940 to Excel", href: "/convert/mt940-to-excel", icon: FileSpreadsheet, description: "SWIFT to spreadsheet" },
        ]
    },
    {
        title: "PDF & Image Tools",
        description: "Process documents privately in your browser",
        gradient: "from-purple-500/20 to-pink-500/20",
        iconBg: "bg-purple-500/10",
        iconColor: "text-purple-500",
        theme: {
            border: "hover:border-purple-500/50",
            shadow: "hover:shadow-purple-500/10",
            glow: "group-hover:from-purple-500/5",
            text: "group-hover:text-purple-500",
            arrow: "text-purple-500"
        },
        tools: [
            { name: "Rotate PDF", href: "/convert/rotate-pdf", icon: Layers, description: "Fix orientation" },
            { name: "Add Page Numbers", href: "/convert/add-page-numbers-pdf", icon: FileText, description: "Number pages" },
            { name: "Unlock PDF", href: "/convert/unlock-pdf", icon: Layers, description: "Remove restrictions" },
            { name: "Compress PDF", href: "/convert/compress-pdf", icon: Minimize2, description: "Reduce file size" },
            { name: "Merge PDF", href: "/convert/merge-pdf", icon: Layers, description: "Combine PDFs" },
            { name: "Split PDF", href: "/convert/split-pdf", icon: Split, description: "Extract pages" },
            { name: "JPG to PDF", href: "/convert/jpg-to-pdf", icon: FileImage, description: "Images to PDF" },
            { name: "Image Compressor", href: "/convert/image-compressor", icon: Minimize2, description: "Reduce image size" },
        ]
    },
    {
        title: "Financial Viewers",
        description: "View and inspect financial files instantly",
        gradient: "from-amber-500/20 to-orange-500/20",
        iconBg: "bg-amber-500/10",
        iconColor: "text-amber-500",
        theme: {
            border: "hover:border-amber-500/50",
            shadow: "hover:shadow-amber-500/10",
            glow: "group-hover:from-amber-500/5",
            text: "group-hover:text-amber-500",
            arrow: "text-amber-500"
        },
        tools: [
            { name: "QBO Viewer", href: "/tools/qbo-viewer", icon: Eye, description: "View QuickBooks files" },
            { name: "OFX Viewer", href: "/tools/ofx-viewer", icon: Eye, description: "View OFX files" },
            { name: "Invoice Generator", href: "/tools/invoice-generator", icon: FileText, description: "Create invoices" },
        ]
    },
    {
        title: "Business Tools",
        description: "Payment platform integrations",
        gradient: "from-rose-500/20 to-red-500/20",
        iconBg: "bg-rose-500/10",
        iconColor: "text-rose-500",
        theme: {
            border: "hover:border-rose-500/50",
            shadow: "hover:shadow-rose-500/10",
            glow: "group-hover:from-rose-500/5",
            text: "group-hover:text-rose-500",
            arrow: "text-rose-500"
        },
        tools: [
            { name: "PayPal to QBO", href: "/convert/paypal-to-qbo", icon: CreditCard, description: "Import PayPal" },
            { name: "Stripe to QBO", href: "/convert/stripe-to-qbo", icon: CreditCard, description: "Import Stripe" },
        ]
    }
];

export function ToolsShowcase() {
    return (
        <section id="tools-showcase" aria-labelledby="tools-showcase-heading" className="relative py-12 md:py-20 overflow-hidden bg-[hsl(var(--background))]">
            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Themed Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.08]" style={{
                    backgroundImage: `linear-gradient(to right, rgb(20 184 166 / 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgb(20 184 166 / 0.3) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }} />
                {/* Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Section Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 mb-6">
                        <span className="text-sm font-medium text-teal-500">
                            35+ Free Tools
                        </span>
                    </div>
                    <h2 id="tools-showcase-heading" className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-5xl lg:text-6xl mb-6">
                        Privacy-First <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">Financial Tools</span>
                    </h2>
                    <p className="text-xl text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto leading-relaxed">
                        These tools run 100% in your browser. Your sensitive financial data never leaves your device.
                    </p>
                </div>

                {/* Categories */}
                <div className="space-y-12">
                    {TOOL_CATEGORIES.map((category, categoryIndex) => (
                        <div
                            key={category.title}
                            className="animate-slide-up"
                            style={{ animationDelay: `${categoryIndex * 100}ms` }}
                        >
                            {/* Category Header with Gradient Background */}
                            <div className={`relative p-6 rounded-2xl bg-gradient-to-r ${category.gradient} mb-8 overflow-hidden`}>
                                <div className="absolute inset-0 bg-grid-pattern-1 bg-size-20 opacity-10" />
                                <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-[hsl(var(--foreground))]">
                                            {category.title}
                                        </h3>
                                        <p className="text-[hsl(var(--muted-foreground))] mt-1">
                                            {category.description}
                                        </p>
                                    </div>
                                    <div className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                                        {category.tools.length} tools
                                    </div>
                                </div>
                            </div>

                            {/* Tools Grid with Staggered Animation */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {category.tools.map((tool, toolIndex) => {
                                    const Icon = tool.icon;
                                    return (
                                        <Link
                                            key={tool.href}
                                            href={tool.href}
                                            className={`group relative flex flex-col p-5 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] backdrop-blur-sm ${category.theme.border} hover:shadow-2xl ${category.theme.shadow} hover:-translate-y-1 transition-all duration-300 animate-fade-in`}
                                            style={{ animationDelay: `${(categoryIndex * 100) + (toolIndex * 50)}ms` }}
                                        >
                                            {/* Hover Glow Effect */}
                                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-[hsl(var(--primary))]/0 to-[hsl(var(--accent))]/0 ${category.theme.glow} transition-all duration-300`} />

                                            <div className="relative">
                                                {/* Icon */}
                                                <div className={`inline-flex p-3 rounded-xl ${category.iconBg} ${category.iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                                    <Icon className="h-6 w-6" />
                                                </div>

                                                {/* Content */}
                                                <h4 className={`font-semibold text-[hsl(var(--foreground))] ${category.theme.text} transition-colors mb-1`}>
                                                    {tool.name}
                                                </h4>
                                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                                    {tool.description}
                                                </p>

                                                {/* Arrow Indicator */}
                                                <div className={`mt-4 flex items-center gap-1 text-sm font-medium ${category.theme.arrow} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                                    Open tool
                                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 text-center animate-fade-in">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-3xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30">
                        <div className="text-left">
                            <h3 className="text-xl font-bold text-[hsl(var(--foreground))] group-hover:text-teal-500 transition-colors">
                                Looking for more?
                            </h3>
                            <p className="text-[hsl(var(--muted-foreground))]">
                                Explore our full collection of financial tools
                            </p>
                        </div>
                        <Link
                            href="/tools"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-white font-medium hover:bg-teal-600 transition-colors shadow-lg"
                        >
                            View All Tools
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

