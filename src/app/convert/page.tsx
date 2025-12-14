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
    title: "Free Online Tools | Finance, Bookkeeping & Image Converters | Statement Extract",
    description: "Free tools for accountants, CPAs, and bookkeepers. Bank statement to Excel/CSV converter, QuickBooks export, image converters, JSON tools. No signup required.",
    keywords: "free bookkeeping tools, bank statement converter, pdf to excel, quickbooks export, xero import, image converter, AVIF converter, CPA tools",
    openGraph: {
        title: "Free Finance & Bookkeeping Tools",
        description: "Convert bank statements, images, and data for free. No signup required.",
        type: "website",
        url: "https://statementextract.com/convert",
    },
    alternates: {
        canonical: "https://statementextract.com/convert",
    },
};

// Use string names for icons to allow serialization to Client Component
// Ordered by traffic priority: highest traffic first
const toolSections = [
    // 1. PDF Tools - Extremely high traffic (merge, compress, split are top searches)
    {
        title: "PDF Tools",
        description: "Essential PDF utilities for document management",
        icon: "Layers",
        featured: true,
        tools: [
            {
                title: "Merge PDF",
                description: "Combine multiple PDF files into one document. Drag to reorder. 100% private.",
                href: "/convert/merge-pdf",
                icon: "Layers",
                badge: "Popular",
            },
            {
                title: "Compress PDF",
                description: "Reduce PDF file size while maintaining quality. Perfect for email attachments.",
                href: "/convert/compress-pdf",
                icon: "Minimize2",
                badge: "Popular",
            },
            {
                title: "Split PDF",
                description: "Extract pages or split a PDF into multiple documents.",
                href: "/convert/split-pdf",
                icon: "FileText",
                badge: "New",
            },
            {
                title: "JPG to PDF",
                description: "Convert JPG, PNG images to PDF. Combine multiple photos into one PDF.",
                href: "/convert/jpg-to-pdf",
                icon: "FileImage",
                badge: "Hot",
            },
        ],
    },
    // 2. Finance & Bookkeeping - Flagship product, high-value traffic
    {
        title: "Finance & Bookkeeping Tools",
        description: "AI-powered tools for accountants, CPAs, and financial professionals",
        icon: "Calculator",
        featured: false,
        tools: [
            {
                title: "Bank Statement to Excel/CSV",
                description: "AI-powered extraction from any bank PDF to structured Excel or CSV. Perfect for reconciliation.",
                href: "/convert-bank-statement-to-csv-excel",
                icon: "FileSpreadsheet",
                badge: "Flagship",
            },
            {
                title: "Bank Statement to QuickBooks",
                description: "Convert bank statements to QuickBooks-ready IIF format for seamless import.",
                href: "/convert-bank-statement-to-quickbooks-xero",
                icon: "Building2",
                badge: "Popular",
            },
            {
                title: "Bank Statement to Xero",
                description: "Export bank transactions in Xero-compatible format. Save hours of manual entry.",
                href: "/convert-bank-statement-to-quickbooks-xero",
                icon: "TrendingUp",
                badge: null,
            },
            {
                title: "PDF to Excel Converter",
                description: "Extract tables and data from any PDF into editable Excel spreadsheets.",
                href: "/convert-bank-statement-to-csv-excel",
                icon: "FileText",
                badge: null,
            },
            {
                title: "Receipt Scanner to Excel",
                description: "Scan receipts and invoices, extract data to Excel for expense tracking.",
                href: "/convert-bank-statement-to-csv-excel",
                icon: "Receipt",
                badge: "Coming Soon",
            },
        ],
    },
    // 3. Image Converters - Good volume, evergreen traffic
    {
        title: "Image Converters",
        description: "Fast, free image conversion tools that run entirely in your browser",
        icon: "FileImage",
        featured: false,
        tools: [
            {
                title: "HEIC & AVIF Batch Converter",
                description: "Batch convert iPhone HEIC photos and AVIF images to PNG or JPG.",
                href: "/convert/batch-converter",
                icon: "Images",
                badge: "Popular",
            },
            {
                title: "Image to AVIF Converter",
                description: "Convert PNG, JPG, WebP to AVIF for up to 50% smaller files.",
                href: "/convert/avif-converter/image-to-avif",
                icon: "FileImage",
                badge: null,
            },
            {
                title: "AVIF to PNG Converter",
                description: "Convert AVIF images to universally compatible PNG format.",
                href: "/convert/avif-converter/avif-to-png",
                icon: "FileImage",
                badge: null,
            },
            {
                title: "Image Compressor",
                description: "Compress images to exact sizes: 10KB, 20KB, 50KB, or 100KB.",
                href: "/convert/image-compressor",
                icon: "Minimize2",
                badge: null,
            },
        ],
    },
    // 4. Finance Calculators - Good CPC, growing traffic
    {
        title: "Finance Calculators",
        description: "Essential business calculators for pricing, margins, and financial analysis",
        icon: "Calculator",
        featured: false,
        tools: [
            {
                title: "Profit Margin Calculator",
                description: "Calculate gross margin, net margin, and markup percentage instantly.",
                href: "/tools/profit-margin-calculator",
                icon: "TrendingUp",
                badge: "New",
            },
            {
                title: "GST/VAT Calculator",
                description: "Calculate GST, VAT, and sales tax for any country. Add or remove tax.",
                href: "/tools/gst-vat-calculator",
                icon: "Receipt",
                badge: "New",
            },
            {
                title: "Markup Calculator",
                description: "Calculate markup percentage, selling price, and profit. Includes markup vs margin conversion.",
                href: "/tools/markup-calculator",
                icon: "Calculator",
                badge: "New",
            },
        ],
    },
    // 5. Developer Tools - Niche but engaged audience
    {
        title: "Developer Tools",
        description: "Specialized tools for developers and data processing",
        icon: "Code2",
        featured: false,
        tools: [
            {
                title: "JSON to TOON Converter",
                description: "Convert JSON to Token-Oriented Object Notation. Save 60% on LLM tokens.",
                href: "/convert/json-to-toon",
                icon: "Code2",
                badge: "Hot",
            },
        ],
    },
    // 6. PDF Converters - Coming Soon section
    {
        title: "PDF Converters",
        description: "Extract and convert PDF content to editable formats",
        icon: "FileText",
        featured: false,
        tools: [
            {
                title: "PDF to Excel",
                description: "Extract data from PDF files into editable Excel spreadsheets. Fast and accurate.",
                href: "#",
                icon: "FileSpreadsheet",
                badge: "Coming Soon",
            },
            {
                title: "PDF to Word",
                description: "Convert PDF documents to editable Word files while preserving formatting.",
                href: "#",
                icon: "FileText",
                badge: "Coming Soon",
            },
            {
                title: "PDF to PowerPoint",
                description: "Transform PDF content into editable PowerPoint presentations.",
                href: "#",
                icon: "FileText",
                badge: "Coming Soon",
            },
        ],
    },
    // 7. Excel Converters - Coming Soon section
    {
        title: "Excel Converters",
        description: "Convert Excel spreadsheets to various formats with perfect formatting",
        icon: "FileSpreadsheet",
        featured: false,
        tools: [
            {
                title: "Excel to PDF",
                description: "Convert Excel spreadsheets to PDF with perfect formatting preservation. No broken tables.",
                href: "#",
                icon: "FileSpreadsheet",
                badge: "Coming Soon",
            },
            {
                title: "Excel to Word",
                description: "Transform Excel data into professional Word documents. Perfect for reports.",
                href: "#",
                icon: "FileText",
                badge: "Coming Soon",
            },
            {
                title: "Excel to PowerPoint",
                description: "Convert Excel spreadsheets into PowerPoint presentations for data visualization.",
                href: "#",
                icon: "FileSpreadsheet",
                badge: "Coming Soon",
            },
        ],
    },
];

export default function ConvertHubPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            {/* Category Filter - Above Hero */}
            <ConvertPageClient toolSections={toolSections} heroContent={
                /* Hero with Grid Background */
                <section className="relative py-16 md:py-24 px-6 text-center border-b border-[hsl(var(--border))] overflow-hidden">
                    {/* Grid SVG Background */}
                    <div className="absolute inset-0 pointer-events-none">
                        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-[hsl(var(--border))]" strokeOpacity="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                        </svg>
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[hsl(var(--background))] to-transparent" />
                        <div className="absolute top-12 left-[10%] w-16 h-16 rounded-xl bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/10 rotate-12" />
                        <div className="absolute top-24 right-[15%] w-12 h-12 rounded-lg bg-[hsl(var(--primary))]/8 border border-[hsl(var(--primary))]/15 -rotate-6" />
                        <div className="absolute bottom-16 left-[20%] w-10 h-10 rounded-lg bg-[hsl(var(--primary))]/6 border border-[hsl(var(--primary))]/10 rotate-45" />
                        <div className="absolute bottom-20 right-[25%] w-14 h-14 rounded-xl bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/8 -rotate-12" />
                    </div>

                    <div className="relative z-10">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-4 py-1.5">
                            <Zap className="h-4 w-4 text-[hsl(var(--primary))]" />
                            <span className="text-sm font-medium text-[hsl(var(--primary))]">
                                All Tools 100% Free
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))] mb-4">
                            Free Online Tools for <span className="bg-gradient-primary bg-clip-text text-transparent">Finance & Productivity</span>
                        </h1>
                        <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                            Convert bank statements, images, and data instantly. Trusted by accountants, CPAs, and bookkeepers worldwide. No signup, no watermarks.
                        </p>
                    </div>
                </section>
            } />

            {/* Features */}
            <section className="relative py-12 md:py-16 px-6 border-t border-[hsl(var(--border))]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Choose Our Tools?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Zap, title: "Lightning Fast", desc: "AI-powered processing delivers results in seconds, not minutes." },
                            { icon: Shield, title: "100% Private & Secure", desc: "Your files never leave your device. Bank-level encryption for all data." },
                            { icon: Globe, title: "Works Anywhere", desc: "Use on any device with a modern browser. No installation required." },
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
                        Need to Convert Bank Statements?
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-6">
                        Try our flagship AI-powered Bank Statement to Excel/CSV converter. Used by thousands of CPAs and accountants.
                    </p>
                    <Link
                        href="/convert-bank-statement-to-csv-excel"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity shadow-glow"
                    >
                        Bank Statement Converter
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
