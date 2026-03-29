import { Metadata } from "next";
import Link from "next/link";
import { CsvToQboTool } from "@/components/qbo-tools/CsvToQboTool";
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
    ArrowUpDown
} from "lucide-react";

export const metadata: Metadata = {
    title: "CSV / Excel to QBO Converter Free Online | QuickBooks Import | Statement Extract",
    description: "Free CSV and Excel to QBO converter online. Convert bank files (CSV, XLS, XLSX) to QuickBooks Web Connect (.qbo) format. Map columns, preview, and export. Private & Secure.",
    keywords: "csv to qbo converter, csv to qbo converter free, convert csv to qbo online, csv to quickbooks format, bank csv to qbo, import csv to quickbooks, qbo file converter",
    openGraph: {
        title: "CSV to QBO Converter Free Online | Import to QuickBooks",
        description: "Convert any CSV bank export to QuickBooks .qbo format. Map columns, edit transactions, and download QBO file instantly.",
        type: "website",
        url: "https://statementextract.com/convert/csv-to-qbo"
    },
    alternates: {
        canonical: "https://statementextract.com/convert/csv-to-qbo/"
    }
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CSV / Excel to QBO Converter",
    "description": "Convert CSV/Excel bank transaction files to QuickBooks Web Connect (.qbo) format online for free.",
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
        { "@type": "ListItem", "position": 3, "name": "CSV to QBO" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I convert a CSV file to QBO format?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Upload your CSV file, map the columns (Date, Amount, Description), preview and edit transactions, then click Export to download the QBO file ready for QuickBooks import."
            }
        },
        {
            "@type": "Question",
            "name": "Is this CSV to QBO converter free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, it is Free Online Tool with no limits. Convert unlimited CSV files to QBO format without signing up or paying anything."
            }
        },
        {
            "@type": "Question",
            "name": "What is a QBO file?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A QBO file is a QuickBooks Web Connect file that contains bank transaction data. It's used to import bank statements directly into QuickBooks Online or Desktop."
            }
        },
        {
            "@type": "Question",
            "name": "Is my data secure when using this tool?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, completely. This tool runs entirely in your browser. Your financial data never leaves your computer and is never uploaded to any server."
            }
        },
        {
            "@type": "Question",
            "name": "Can I edit transactions before exporting to QBO?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! After mapping columns, you can preview all transactions in an editable table. Click any cell to edit, drag rows to reorder, or delete unwanted transactions before export."
            }
        }
    ]
};

const useCases = [
    { title: "Import Bank Exports to QuickBooks", desc: "Convert CSV files from any bank into QBO format for seamless QuickBooks import." },
    { title: "Migrate from Other Software", desc: "Moving from Xero, Sage, or spreadsheets? Export as CSV and convert to QBO for QuickBooks." },
    { title: "Clean Up Transaction Data", desc: "Edit, reorder, and remove transactions before importing to ensure clean books." },
    { title: "Batch Import Historical Data", desc: "Import years of historical bank data from CSV archives into QuickBooks." },
];

const relatedTools = [
    { href: "/convert/ofx-to-qbo", title: "OFX to QBO" },
    { href: "/convert/qfx-to-pdf", title: "QFX to PDF" },
    { href: "/convert/qbo-to-csv", title: "QBO to CSV" },
    { href: "/convert-bank-statement-to-csv-excel", title: "PDF to Excel" },
    { href: "/convert-bank-statement-to-quickbooks-xero", title: "PDF to QBO" },
];

export default function CsvToQboPage() {
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
                <CsvToQboTool />
            </section>

            {/* Hub Link - Upsell PDF Converter */}
            <section className="bg-gradient-to-r from-[hsl(var(--primary))]/10 to-transparent border-b border-[hsl(var(--border))] py-3 px-6">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[hsl(var(--primary))]" />
                        <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                            Need to convert <strong>PDF Bank Statements</strong> instead?
                        </span>
                    </div>
                    <Link href="/convert-bank-statement-to-csv-excel" className="text-sm font-bold text-[hsl(var(--primary))] hover:underline flex items-center gap-1">
                        Use our Free PDF to Excel Tool <ArrowUpDown className="w-3 h-3 rotate-90" />
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free CSV / Excel to QBO Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Lock, title: "Private & Secure", desc: "Files never leave your device. All processing happens in your browser." },
                            { icon: ArrowUpDown, title: "Smart Column Mapping", desc: "Auto-detects common column names. Manually map any custom format." },
                            { icon: Zap, title: "Instant Conversion", desc: "No uploads, no waiting. Convert files instantly in your browser." },
                            { icon: Shield, title: "No Signup Required", desc: "No email, no account needed. Just drop your file and convert." },
                            { icon: Database, title: "Edit Before Export", desc: "Preview, edit, reorder, and delete transactions before downloading." },
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
                        How to Convert CSV / Excel to QBO Online
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Upload Your File", desc: "Drag and drop or click to select your bank CSV or Excel (XLSX/XLS) file." },
                            { step: 2, title: "Map Your Columns", desc: "Match Date, Amount, and Description columns. We auto-detect common formats." },
                            { step: 3, title: "Preview & Edit", desc: "Review transactions, edit values, reorder rows, or delete entries as needed." },
                            { step: 4, title: "Download QBO File", desc: "Click Export and your QuickBooks-ready .qbo file downloads instantly." },
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

            {/* Comparison Table - Best Free CSV to QBO Converter */}
            <section className="py-12 md:py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Best Free CSV to QBO Converter (No Upload, No Signup)
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Compare our free tool to MoneyThumb, Bank2QBO, and Transactions Pro
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
                                    { feature: "Excel Support", us: "XLS & XLSX", competitors: "CSV only usually" },
                                    { feature: "Column Mapping", us: "Auto + Manual", competitors: "Manual only" },
                                    { feature: "Edit Before Export", us: "Yes, full editing", competitors: "Limited" },
                                    { feature: "Transaction Limit", us: "Unlimited", competitors: "25-100 free" },
                                    { feature: "QuickBooks Versions", us: "Online + Desktop", competitors: "Sometimes both" },
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

            {/* Deep Technical Dive: Troubleshooting QBO Imports */}
            <section className="py-12 px-6 bg-[hsl(var(--muted))]/10">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-center mb-8">Why Does QuickBooks Reject My CSV?</h2>
                    <p className="lead text-center mb-12">
                        QuickBooks Online is notoriously strict. If your file is rejected, it's usually due to one of these three common formatting errors.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 not-prose my-8">
                        <div className="bg-[hsl(var(--card))] p-6 rounded-2xl border border-[hsl(var(--border))]">
                            <h3 className="font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                The "3-Column Rule"
                            </h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                                QBO Web Connect requires <strong>exactly</strong> three mapped fields to be valid. Extra data is fine, but missing data triggers "Error 350".
                            </p>
                            <div className="bg-[hsl(var(--background))] p-4 rounded-lg border border-[hsl(var(--border))] text-sm font-mono leading-relaxed">
                                <span className="text-green-500 font-bold">✓ Date</span> (MM/DD/YYYY)<br />
                                <span className="text-green-500 font-bold">✓ Amount</span> (-100.00 for spend)<br />
                                <span className="text-green-500 font-bold">✓ Description</span> (Payee Name)<br />
                                <span className="text-red-500 line-through">✗ Check Number</span> (Optional)<br />
                                <span className="text-red-500 line-through">✗ Running Balance</span> (Ignored)
                            </div>
                        </div>

                        <div className="bg-[hsl(var(--card))] p-6 rounded-2xl border border-[hsl(var(--border))]">
                            <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
                                <Globe className="w-5 h-5" />
                                Bank Feed vs. Web Connect
                            </h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                                Why convert files when "Bank Feeds" exist?
                            </p>
                            <ul className="text-sm space-y-3 text-[hsl(var(--muted-foreground))]">
                                <li className="flex gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                    <span><strong>History Limits:</strong> Bank feeds often only go back 90 days. Our tool lets you import years of history.</span>
                                </li>
                                <li className="flex gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                    <span><strong>Smaller Banks:</strong> Many credit unions don't support direct QuickBooks connections.</span>
                                </li>
                                <li className="flex gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                    <span><strong>Clean Up:</strong> Edit descriptions *before* import to save hours of categorization.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 not-prose">
                        <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 mb-2">FIX: "QuickBooks Error 350" (Input is not a valid money)</h3>
                        <p className="text-[hsl(var(--muted-foreground))]">
                            This cryptic error usually means you have <strong>commas</strong> in your numbers (e.g., <code>1,234.00</code>) or currency symbols (<code>$1234</code>).
                            Our converter automatically strips these out during processing to ensure a clean numeric format (<code>1234.00</code>) that QBO accepts.
                        </p>
                    </div>
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
                            { q: "What columns does my CSV need?", a: "At minimum, your CSV needs Date, Amount, and Description columns. Our tool auto-detects common column names, and you can manually map any custom headers." },
                            { q: "Which date formats are supported?", a: "We support MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD, and other common formats. The tool auto-detects the format and lets you override if needed." },
                            { q: "Can I import the QBO file into QuickBooks Desktop?", a: "Yes! QBO files work with both QuickBooks Online and QuickBooks Desktop (Pro, Premier, Enterprise)." },
                            { q: "Is there a limit to how many transactions I can convert?", a: "No limits. Convert hundreds or thousands of transactions in a single file, completely free." },
                            { q: "Do you store my data?", a: "No. The file is processed entirely in your browser. Nothing is uploaded to our servers—it's physically impossible for us to store your data." },
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
                currentTool="CSV to QBO"
                relatedTools={relatedTools}
            />
        </main >
    );
}
