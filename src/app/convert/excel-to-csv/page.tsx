import { Metadata } from "next";
import Link from "next/link";
import { ExcelToCsvTool } from "@/components/tools/ExcelToCsvTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { PageMeta } from "@/components/PageMeta";
import {
    CheckCircle,
    Zap,
    Shield,
    FileText,
    Globe,
    Code,
    Lock,
    ArrowUpDown,
    Database,
    Settings,
    FileSpreadsheet
} from "lucide-react";


export const metadata: Metadata = {
    title: "Free Excel to CSV Converter | Convert XLXS to CSV | Statement Extract",
    description: "Convert Excel (XLSX, XLS) to CSV online. Creates clean, UTF-8 formatted CSV files ready for import into QuickBooks, Xero, or databases. 100% free.",
    keywords: "convert excel to csv, xlsx to csv, xls to csv, excel converter, convert spreadsheet to csv, excel to comma separated values, online excel converter",
    openGraph: {
        title: "Excel to CSV Converter - Clean Data Export",
        description: "Convert Excel spreadsheets to clean CSV files instantly. Perfect for importing data into software or databases.",
        type: "website",
        url: "https://statementextract.com/convert/excel-to-csv",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/excel-to-csv",
    },
};

const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Excel to CSV Converter",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "featureList": "Convert XLSX to CSV, UTF-8 Encoding, Data Preview",
    "softwareRequirements": "Modern Web Browser"
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://statementextract.com" },
        { "@type": "ListItem", "position": 2, "name": "Converters", "item": "https://statementextract.com/convert" },
        { "@type": "ListItem", "position": 3, "name": "Excel to CSV" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How is this different from 'Save As CSV' in Excel?",
            "acceptedAnswer": { "@type": "Answer", "text": "Excel often uses legacy encodings (like ANSI) instead of standard UTF-8, which breaks special characters. Our tool guarantees a clean, UTF-8 formatted CSV that works everywhere." }
        },
        {
            "@type": "Question",
            "name": "Does it convert all sheets in my Excel file?",
            "acceptedAnswer": { "@type": "Answer", "text": "Currently, the converter processes the first active sheet in your workbook. This handles 99% of use cases for data imports." }
        },
        {
            "@type": "Question",
            "name": "Is my data private?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes! We use client-side processing. Your financial data, customer lists, or personal info never leaves your browser." }
        },
        {
            "@type": "Question",
            "name": "Can I import the CSV into QuickBooks?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, the standard CSV output is fully compatible with QuickBooks Online, Xero, Shopify, and almost any other software that accepts CSV imports." }
        }
    ]
};

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Convert Excel to CSV Online",
    "step": [
        { "@type": "HowToStep", "name": "Select File", "text": "Upload your .xlsx or .xls file to the secure converter." },
        { "@type": "HowToStep", "name": "Preview Data", "text": "Check the instant data preview to ensure your columns look correct." },
        { "@type": "HowToStep", "name": "Convert", "text": "Click 'Convert to CSV' to process the file." },
        { "@type": "HowToStep", "name": "Download", "text": "Download your clean CSV file ready for use." }
    ]
};

const useCases = [
    { title: "Database Imports", desc: "Prepare clean, UTF-8 encoded data for importing into SQL, MySQL, Postgres, or MongoDB." },
    { title: "SaaS Bulk Uploads", desc: "Format customer lists for Salesforce, HubSpot, Mailchimp, or Shopify bulk imports." },
    { title: "Developer Workflows", desc: "Quickly convert client spreadsheets into machine-readable CSV/JSON for application seeding." },
    { title: "Legacy System Migration", desc: "Export modern Excel data for older ERP or accounting systems that only accept basic CSVs." },
];

const relatedTools = [
    { href: "/convert/csv-to-excel", title: "CSV to Excel Converter" },
    { href: "/convert/json-to-csv", title: "JSON to CSV Converter" },
    { href: "/convert/qbo-to-csv", title: "QBO to CSV Converter" },
    { href: "/tools/merge-pdf", title: "Merge PDF Files" },
];

export default function ExcelToCsvPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <ExcelToCsvTool />
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

            {/* Why Use This Tool */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-12">
                        Why Use Our Excel to CSV Converter?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Globe,
                                title: "Universal Compatibility",
                                desc: "CSV is the language of the internet. Convert your locked-in Excel tables into a format that any software, database, or script can read."
                            },
                            {
                                icon: Shield,
                                title: "Privacy First",
                                desc: "Your sensitive spreadsheets are processed locally on your device. We never see, store, or transmit your data."
                            },
                            {
                                icon: Code,
                                title: "Developer Friendly",
                                desc: "We ensure standard comma delimiters and UTF-8 encoding, so your data is ready for Python, SQL, or Node.js scripts immediately."
                            },
                            {
                                icon: CheckCircle,
                                title: "Legacy Support",
                                desc: "Works with modern .xlsx files and older .xls files (Excel 97-2003). No need to have Excel installed."
                            },
                            {
                                icon: FileText,
                                title: "Data Preview",
                                desc: "See a snapshot of your data before you download, ensuring the columns are correctly aligned."
                            },
                            {
                                icon: Zap,
                                title: "Fast & Free",
                                desc: "Convert 1 file or 100 files - it's always free and instant. No email sign-up required."
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

            {/* How To Section */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        How to Convert Excel to CSV Online
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Select File", desc: "Upload your .xlsx or .xls file to the secure converter." },
                            { step: 2, title: "Preview Data", desc: "Check the instant data preview to ensure your columns look correct." },
                            { step: 3, title: "Convert", desc: "Click 'Convert to CSV' to process the file." },
                            { step: 4, title: "Download", desc: "Download your clean CSV file ready for use." },
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

            {/* Comparison Table */}
            <section className="py-12 md:py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Best Free Excel to CSV Converter (Vs. Excel Save As)
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Why use our tool instead of standard Excel export?
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]/10">
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--foreground))]">Feature</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--primary))]">Statement Extract</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--muted-foreground))]">Excel "Save As"</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: "Encoding", us: "UTF-8 (Standard)", competitors: "Often ANSI (Breaks symbols)" },
                                    { feature: "Accessibility", us: "No Excel Installed Needed", competitors: "Requires Excel License" },
                                    { feature: "Preview", us: "Instant Data Check", competitors: "Blind Save" },
                                    { feature: "Platform", us: "Mac / Windows / Mobile", competitors: "Device Dependent" },
                                    { feature: "Speed", us: "Instant", competitors: "Slow software launch" },
                                    { feature: "Privacy", us: "100% Client-Side", competitors: "Local App" },
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

            {/* Deep Technical Dive: The Encoding Nightmare */}
            <section className="py-12 px-6 bg-[hsl(var(--muted))]/10">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-center mb-8">Why Do My CSVs Have Broken Characters?</h2>
                    <p>
                        If you've ever seen text like <code>RenÃ©e</code> instead of <code>Renée</code>, you've been a victim of encoding mismatch. Excel often saves CSVs in an older format called "ANSI" (Windows-1252), which cannot handle international characters.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 not-prose my-8">
                        <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20">
                            <h3 className="font-bold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                Standard Excel Export
                            </h3>
                            <pre className="text-xs md:text-sm bg-[hsl(var(--background))] p-3 rounded-lg overflow-x-auto">
                                Name: RenÃ©e
                                <br />
                                Price: â‚¬50.00
                                <br />
                                Status: ðŸš€ (Broken)
                            </pre>
                            <p className="text-sm mt-3 text-[hsl(var(--muted-foreground))]">
                                Without a BOM (Byte Order Mark), web apps guess the wrong language.
                            </p>
                        </div>
                        <div className="bg-green-500/10 p-6 rounded-2xl border border-green-500/20">
                            <h3 className="font-bold text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                Our UTF-8 Converter
                            </h3>
                            <pre className="text-xs md:text-sm bg-[hsl(var(--background))] p-3 rounded-lg overflow-x-auto">
                                Name: Renée
                                <br />
                                Price: €50.00
                                <br />
                                Status: 🚀 (Preserved)
                            </pre>
                            <p className="text-sm mt-3 text-[hsl(var(--muted-foreground))]">
                                We enforce <code>UTF-8 with BOM</code>, ensuring Shopify, Xero, and SQL read it correctly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Cleanliness Checklist */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                        Pre-Export Checklist: Is Your File Ready?
                    </h2>
                    <div className="space-y-4">
                        {[
                            { title: "No Merged Cells", desc: "CSVs cannot carry merged cells. Unmerge everything before converting to prevent data shifting." },
                            { title: "Single Header Row", desc: "Ensure your first row contains unique column names (e.g., 'Email', 'First Name'). Remove pure title rows." },
                            { title: "Remove Formulas", desc: "Our tool extracts the *value*, but it's safer to Paste Values in Excel first if you have complex macros." },
                            { title: "Check Dates", desc: "Standardize dates to YYYY-MM-DD for the best compatibility with SQL databases." },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-[hsl(var(--foreground))]">{item.title}</h3>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
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
            </section>

            <section className="py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <PageMeta lastUpdated="January 2026" />
                </div>
            </section>

            <ToolPageFooter
                currentTool="Excel to CSV"
                relatedTools={relatedTools}
            />
        </main >
    );
}
