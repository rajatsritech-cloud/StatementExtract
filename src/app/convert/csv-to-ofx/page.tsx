import { Metadata } from "next";
import { CSVToOFXConverter } from "@/components/converters/CSVToOFXConverter";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { PageMeta } from "@/components/PageMeta";
import {
    Zap,
    Shield,
    Globe,
    FileText,
    CheckCircle,
    Database,
    Lock,
    ArrowUpDown,
    FileSpreadsheet
} from "lucide-react";
import Link from "next/link";


export const metadata: Metadata = {
    title: "CSV / Excel to OFX Converter Free Online | QuickBooks, Xero, Sage Import | Statement Extract",
    description: "Free CSV and Excel to OFX converter online. Convert bank files (CSV, XLS, XLSX) to OFX, QBO, or QFX format for QuickBooks, Xero, Sage, Wave import. Map columns, preview, export. 100% private.",
    keywords: "csv to ofx converter, csv to ofx free, csv to qbo converter, csv to ofx online, convert csv to quickbooks, bank csv to ofx, csv to ofx for xero, import csv to accounting software, ofx file converter",
    openGraph: {
        title: "CSV to OFX Converter Free Online | Import to QuickBooks & Xero",
        description: "Convert any bank CSV to OFX, QBO, or QFX format. Import into QuickBooks, Xero, Sage & more. 100% free, secure, browser-based.",
        type: "website",
        url: "https://statementextract.com/convert/csv-to-ofx"
    },
    alternates: {
        canonical: "https://statementextract.com/convert/csv-to-ofx/"
    }
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CSV / Excel to OFX Converter",
    "description": "Convert CSV/Excel bank transaction files to OFX, QBO, or QFX format for import into QuickBooks, Xero, Sage, and other accounting software.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://statementextract.com" },
        { "@type": "ListItem", "position": 2, "name": "Converters", "item": "https://statementextract.com/convert" },
        { "@type": "ListItem", "position": 3, "name": "CSV to OFX" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is OFX format?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "OFX (Open Financial Exchange) is a universal format for exchanging financial data between banks and accounting software. It's supported by QuickBooks, Xero, Sage, Wave, FreshBooks, and most other accounting applications."
            }
        },
        {
            "@type": "Question",
            "name": "What's the difference between OFX, QBO, and QFX?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "OFX is the universal standard. QBO is OFX with QuickBooks-specific headers (INTU.BID) for better Desktop compatibility. QFX is Quicken's OFX variant. All three are structurally similar and work with most accounting software."
            }
        },
        {
            "@type": "Question",
            "name": "Is this CSV to OFX converter free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, 100% free with no limits. Convert unlimited CSV files to OFX, QBO, or QFX format without signing up or paying anything."
            }
        },
        {
            "@type": "Question",
            "name": "Is my data secure?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. This tool runs 100% in your browser. Your financial data never leaves your computer and is never uploaded to any server."
            }
        },
        {
            "@type": "Question",
            "name": "Which accounting software supports OFX import?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "OFX is supported by QuickBooks Desktop & Online, Xero, Sage Business Cloud, Wave, FreshBooks, Zoho Books, Microsoft Money, YNAB, and most other modern accounting applications."
            }
        }
    ]
};

const useCases = [
    { title: "Import Bank Exports to QuickBooks", desc: "Convert CSV files from any bank into OFX/QBO format for seamless QuickBooks import via Web Connect." },
    { title: "Import to Xero, Sage, or Wave", desc: "Universal OFX format works with all major accounting platforms. No software-specific formatting needed." },
    { title: "Migrate from Spreadsheets", desc: "Moving from Excel or Google Sheets? Export as CSV and convert to OFX for proper accounting software import." },
    { title: "Batch Import Historical Data", desc: "Import years of historical bank data from CSV archives into your accounting software." },
];

const relatedTools = [
    { href: "/convert/qfx-to-pdf", title: "QFX to PDF" },
    { href: "/convert/csv-to-qbo", title: "CSV to QBO" },
    { href: "/convert/qbo-to-csv", title: "QBO to CSV" },
    { href: "/convert-bank-statement-to-csv-excel", title: "PDF to Excel" },
];

export default function CsvToOfxPage() {
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Tool Section - Visible Above the Fold */}
            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <CSVToOFXConverter />
            </section>

            {/* Hub Link - Upsell Flagship Tools */}
            <section className="bg-gradient-to-r from-[hsl(var(--primary))]/5 to-transparent border-b border-[hsl(var(--border))] py-4 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                    <Link href="/convert-bank-statement-to-csv-excel" className="group flex items-center gap-3 text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                        <div className="p-2 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] group-hover:border-[hsl(var(--primary))] shadow-sm">
                            <FileSpreadsheet className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Flagship Tool</p>
                            <p className="text-sm font-bold flex items-center gap-1">
                                PDF Bank Statement to Excel <ArrowUpDown className="w-3 h-3 rotate-90" />
                            </p>
                        </div>
                    </Link>

                    <div className="hidden md:block w-px h-8 bg-[hsl(var(--border))]" />

                    <Link href="/convert-invoice-to-excel-csv" className="group flex items-center gap-3 text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                        <div className="p-2 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] group-hover:border-[hsl(var(--primary))] shadow-sm">
                            <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-medium text-[hsl(var(--muted-foreground))]">New Tool</p>
                            <p className="text-sm font-bold flex items-center gap-1">
                                PDF Invoice to Excel <ArrowUpDown className="w-3 h-3 rotate-90" />
                            </p>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free CSV / Excel to OFX Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Lock, title: "100% Private", desc: "Files never leave your device. All processing happens in your browser." },
                            { icon: ArrowUpDown, title: "Smart Column Mapping", desc: "Auto-detects Date, Amount, and Description columns. Map any custom format." },
                            { icon: Zap, title: "Instant Conversion", desc: "No uploads, no waiting. Convert files instantly in your browser." },
                            { icon: Shield, title: "No Signup Required", desc: "No email, no account needed. Just drop your file and convert." },
                            { icon: Globe, title: "Universal Format", desc: "OFX works with QuickBooks, Xero, Sage, Wave, FreshBooks, and more." },
                            { icon: CheckCircle, title: "Completely Free", desc: "Professional-grade conversion at zero cost. Unlimited files." },
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

            {/* How To Section */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        How to Convert CSV / Excel to OFX Online
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Upload Your File", desc: "Drag and drop or click to select your bank CSV or Excel (XLSX/XLS) file." },
                            { step: 2, title: "Map Your Columns", desc: "Match Date, Description, and Amount/Credit/Debit columns. We auto-detect common formats." },
                            { step: 3, title: "Preview Transactions", desc: "Review the parsed transactions to ensure correct mapping before export." },
                            { step: 4, title: "Download OFX/QBO/QFX", desc: "Choose your format and download. Import into QuickBooks, Xero, or Sage instantly." },
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

            {/* Use Cases Grid */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Perfect for These Use Cases
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {useCases.map((useCase, i) => (
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

            {/* Comparison Table - Best Free CSV to OFX Converter */}
            <section className="py-12 md:py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Best Free CSV to OFX Converter (No Upload, No Signup)
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Compare our free tool to MoneyThumb, Bank2OFX, and Transactions Pro
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]/10">
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--foreground))]">Feature</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--primary))]">Statement Extract</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--muted-foreground))]">Others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: "Price", us: "Free forever", competitors: "$39-99/year" },
                                    { feature: "File Upload", us: "None (browser only)", competitors: "Uploads to servers" },
                                    { feature: "Output Formats", us: "OFX, QBO, QFX", competitors: "Usually 1 format" },
                                    { feature: "Excel Support", us: "XLS & XLSX", competitors: "CSV only usually" },
                                    { feature: "Column Mapping", us: "Auto + Manual", competitors: "Manual only" },
                                    { feature: "Transaction Limit", us: "Unlimited", competitors: "25-100 free" },
                                    { feature: "Software Support", us: "QB, Xero, Sage+", competitors: "QuickBooks only" },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-[hsl(var(--border))]">
                                        <td className="p-4 text-[hsl(var(--foreground))]">{row.feature}</td>
                                        <td className="p-4 text-[hsl(var(--primary))] font-medium">{row.us}</td>
                                        <td className="p-4 text-[hsl(var(--muted-foreground))]">{row.competitors}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* SEO Content Block */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        The Best Free CSV/Excel to OFX Converter Online
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Need to import bank transactions into accounting software but only have a CSV or Excel file? Our <strong>free CSV/Excel to OFX converter</strong> transforms any bank export into OFX, QBO, or QFX format in seconds. Unlike other tools that require subscriptions or uploads to external servers, our converter runs <strong>100% in your browser</strong>—your financial data never leaves your device.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Whether you're an accountant importing client data into QuickBooks, a bookkeeper migrating to Xero, or a business owner setting up Wave or Sage, this <strong>CSV to OFX converter free</strong> tool handles it all. Smart column detection automatically identifies Date, Amount, and Description fields from virtually any bank's CSV format.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Convert CSV to OFX Format?
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>Universal Compatibility:</strong> OFX is the industry standard supported by QuickBooks, Xero, Sage, Wave, FreshBooks, and more.</li>
                        <li><strong>Bank Feed Alternative:</strong> Import transactions when bank feeds aren't available or supported by your bank.</li>
                        <li><strong>Historical Data Import:</strong> Bring in years of transaction history from CSV archives.</li>
                        <li><strong>Data Migration:</strong> Move from spreadsheets or other software to proper accounting platforms.</li>
                        <li><strong>Multi-Format Export:</strong> Choose OFX (universal), QBO (QuickBooks Desktop), or QFX (Quicken) based on your needs.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Supported Accounting Software
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Our OFX files are compatible with all major accounting platforms:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li>QuickBooks Desktop (Pro, Premier, Enterprise) via Web Connect</li>
                        <li>QuickBooks Online</li>
                        <li>Xero</li>
                        <li>Sage Business Cloud</li>
                        <li>Wave Accounting</li>
                        <li>FreshBooks</li>
                        <li>Zoho Books</li>
                        <li>Microsoft Money</li>
                        <li>YNAB (You Need A Budget)</li>
                        <li>Moneydance</li>
                    </ul>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            { q: "What columns does my CSV need?", a: "At minimum, your CSV needs Date and Description columns, plus either a single Amount column or separate Credit/Debit columns. Our tool auto-detects common column names." },
                            { q: "Which date formats are supported?", a: "We support MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD, and other common formats. The tool auto-detects the format from your data." },
                            { q: "What's the difference between OFX, QBO, and QFX?", a: "OFX is the universal standard. QBO adds QuickBooks-specific headers for better Desktop import. QFX is Quicken's variant. All are structurally similar." },
                            { q: "How do I import OFX into QuickBooks?", a: "In QuickBooks Desktop: File → Import → Web Connect Files. In QuickBooks Online: Banking → Upload Transactions. Select your .ofx or .qbo file." },
                            { q: "Do you store my data?", a: "No. Everything is processed in your browser. Your file never leaves your computer—it's physically impossible for us to access your data." },
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{faq.q}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Author Attribution for E-E-A-T */}
            <section className="py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <PageMeta lastUpdated="January 2026" />
                </div>
            </section>

            {/* Footer & CTA */}
            <ToolPageFooter
                currentTool="CSV to OFX"
                relatedTools={relatedTools}
            />
        </main >
    );
}
