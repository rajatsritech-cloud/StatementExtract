import { Metadata } from "next";
import Link from "next/link";
import { QboToCsvTool } from "@/components/qbo-tools/QboToCsvTool";
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
    HelpCircle,
    AlertTriangle
} from "lucide-react";

export const metadata: Metadata = {
    title: "QBO to CSV Converter Online Free | QuickBooks Export | Statement Extract",
    description: "Free online QBO to CSV converter. Convert QuickBooks Web Connect (.qbo) files to Excel or CSV. Fully Client-Side, secure, & free.",
    keywords: "qbo to csv converter, .qbo to csv, qbo to csv converter online, qbo to csv converter free, qbo converter, bank feed to csv, convert qbo file to excel, quickbooks file converter, qbo to csv",
    openGraph: {
        title: "QBO to CSV Converter Online Free | QuickBooks Data Export",
        description: "Convert QuickBooks (.qbo) files to CSV/Excel instantly. Free, private tool for accountants and bookkeepers.",
        type: "website",
        url: "https://statementextract.com/convert/qbo-to-csv"
    },
    alternates: {
        canonical: "https://statementextract.com/convert/qbo-to-csv/"
    }
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "QBO to CSV Converter",
    "description": "Convert QuickBooks QBO files to portable CSV and Excel formats online for free. Export your QuickBooks Web Connect bank feeds to editable spreadsheets.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "datePublished": "2025-06-01",
    "dateModified": "2026-01-13",
    "publisher": {
        "@type": "Organization",
        "name": "Statement Extract",
        "url": "https://statementextract.com"
    }
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://statementextract.com" },
        { "@type": "ListItem", "position": 2, "name": "Converters", "item": "https://statementextract.com/convert" },
        { "@type": "ListItem", "position": 3, "name": "QBO to CSV" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is a QBO file?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A QBO file (QuickBooks Web Connect) is a financial data format used by QuickBooks to import bank transactions. It uses OFX XML standards and contains transaction dates, amounts, payee names, and reference numbers. Banks provide QBO downloads for importing into QuickBooks Online and Desktop."
            }
        },
        {
            "@type": "Question",
            "name": "How do I convert a QBO file to CSV?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply drag and drop your .qbo file into our converter above. It will instantly parse the file in your browser and provide a CSV download. No upload needed - everything runs locally on your computer for maximum privacy."
            }
        },
        {
            "@type": "Question",
            "name": "Is my data secure when using this QBO converter?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, completely. This tool runs entirely in your browser using JavaScript. Your financial data never leaves your computer and is never uploaded to any server. This makes it the most secure QBO to CSV converter available."
            }
        },
        {
            "@type": "Question",
            "name": "Is this QBO to CSV converter free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, it is Free Online Tool with no limits. You can convert as many QBO files as you want without signing up or paying anything. There are no hidden fees or premium tiers."
            }
        },
        {
            "@type": "Question",
            "name": "Can I open QBO files in Excel directly?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No, Excel cannot open .qbo files directly because they use OFX XML format. Use our free converter to turn QBO files into CSV format, which opens perfectly in Microsoft Excel, Google Sheets, or Apple Numbers."
            }
        },
        {
            "@type": "Question",
            "name": "Which banks support QBO file downloads?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most major US banks support QBO downloads including Chase, Bank of America, Wells Fargo, Citi, Capital One, US Bank, PNC, and thousands of credit unions. Look for 'Download for QuickBooks' or 'Web Connect' options in your online banking."
            }
        },
        {
            "@type": "Question",
            "name": "What is the difference between QBO, OFX, and QFX files?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "QBO (QuickBooks Web Connect) is for QuickBooks, QFX (Quicken Financial Exchange) is for Quicken personal finance software, and OFX (Open Financial Exchange) is the generic standard used by Microsoft Money and other software. All three use similar XML-based formats."
            }
        },
        {
            "@type": "Question",
            "name": "Can I use the CSV output to import into other accounting software?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! The CSV file we generate is universally compatible. You can import it into Xero, Sage, FreshBooks, Wave, Zoho Books, or any accounting software that accepts CSV bank statement imports."
            }
        }
    ]
};

// Targeted Use Cases
const useCases = [
    { title: "Open in Excel", desc: "View and edit your QuickBooks data directly in Microsoft Excel or Google Sheets." },
    { title: "Migrate Accounting Data", desc: "Easily move transaction history from QuickBooks to Xero, Sage, or other software." },
    { title: "Audit & Analysis", desc: "Perform detailed analysis on your financial data outside of the QuickBooks environment." },
    { title: "Fix Import Errors", desc: "Convert corrupted QBO files to CSV to manually correct data before re-importing." },
];

const relatedTools = [
    { href: "/convert/qfx-to-pdf", title: "QFX to PDF" },
    { href: "/convert-bank-statement-to-csv-excel", title: "PDF to Excel" },
    { href: "/convert-bank-statement-to-quickbooks-xero", title: "PDF to QBO" },
    { href: "/convert/csv-to-qbo", title: "CSV to QBO" },
    { href: "/convert/stripe-to-qbo", title: "Stripe to QBO" },
    { href: "/convert/paypal-to-qbo", title: "PayPal to QBO" },
];

export default function QboToCsvPage() {
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
                <QboToCsvTool />
            </section>

            {/* Hub Link - Cross-promote Related Tools */}
            <section className="bg-gradient-to-r from-[hsl(var(--primary))]/10 to-transparent border-b border-[hsl(var(--border))] py-3 px-6">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[hsl(var(--primary))]" />
                        <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                            Need the <strong>reverse conversion</strong>? Convert CSV files to QBO format.
                        </span>
                    </div>
                    <Link href="/convert/csv-to-qbo" className="text-sm font-bold text-[hsl(var(--primary))] hover:underline flex items-center gap-1">
                        Use our Free CSV to QBO Converter <ArrowUpDown className="w-3 h-3 rotate-90" />
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free QBO Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Lock, title: "Private & Secure", desc: "Files never leave your device. All processing happens in your browser." },
                            { icon: Zap, title: "Instant Conversion", desc: "Zero wait time. Convert files instantly without uploading." },
                            { icon: Database, title: "Universal CSV", desc: "Generate clean CSV files compatible with Excel and all accounting software." },
                            { icon: Shield, title: "No Signup Required", desc: "No email, no account needed. Just drop your file and convert." },
                            { icon: Globe, title: "Works Offline", desc: "Since it runs in your browser, it even works without an internet connection." },
                            { icon: CheckCircle, title: "Completely Free", desc: "Professional grade conversion at zero cost." },
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
                        How to Convert QBO to CSV Online
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Select QBO File", desc: "Drag and drop your QuickBooks (.qbo) file into the box above." },
                            { step: 2, title: "Instant Processing", desc: "Our tool parses the file instantly in your browser." },
                            { step: 3, title: "Download CSV", desc: "Your converted CSV file will download automatically." },
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
                        Maximize Your Financial Data
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

            {/* Comparison Table - Best Free QBO to CSV Converter */}
            <section className="py-12 md:py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Best Free QBO to CSV Converter
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Compare our free tool to other QBO converters
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
                                    { feature: "Price", us: "Free forever", competitors: "$10-30/conversion" },
                                    { feature: "File Upload", us: "None (browser only)", competitors: "Uploads to servers" },
                                    { feature: "Processing Time", us: "Instant", competitors: "Minutes to hours" },
                                    { feature: "Excel Compatible", us: "Yes, perfect CSV", competitors: "Sometimes" },
                                    { feature: "Offline Capable", us: "Yes", competitors: "No" },
                                    { feature: "File Limits", us: "Unlimited", competitors: "Per-file charges" },
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
                        The Best Client-Side QBO to CSV Converter
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Most <strong>QBO to CSV converters</strong> require you to upload your sensitive financial data to a server. Our tool is different. We built a <strong>client-side converter</strong> that processes your file directly in your web browser. This means your data never leaves your computer, ensuring Privacy & Security and security.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Whether you need a reliable <strong>qbo to csv converter</strong> or simply want to convert <strong>.qbo to csv</strong> quickly, our free tool is the safest solution. Turn confusing QuickBooks Web Connect files into clean, editable Excel spreadsheets in seconds.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Convert QBO to Excel/CSV?
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>Readability:</strong> Visualizing cryptic <strong>.qbo</strong> XML banking data in a human-readable table.</li>
                        <li><strong>Editing:</strong> Use our <strong>qbo to csv converter</strong> to enable bulk editing in Excel.</li>
                        <li><strong>Archiving:</strong> Save long-term backups of your bank feeds in a valid <strong>.csv</strong> format.</li>
                        <li><strong>Compatibility:</strong> Import your data into Xero, Sage, or FreshBooks using the standard CSV output.</li>
                    </ul>
                </div>
            </section>

            {/* What is a QBO File - Educational Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/20 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <HelpCircle className="w-8 h-8 text-[hsl(var(--primary))]" />
                        <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))]">
                            What is a QBO File? (Complete Guide)
                        </h2>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-[hsl(var(--muted-foreground))] mb-4">
                            A <strong>.QBO file</strong> (QuickBooks Web Connect file) is a specialized financial data format created by Intuit for importing bank transactions directly into QuickBooks. Unlike generic spreadsheets, QBO files use <strong>OFX (Open Financial Exchange)</strong> XML standards, making them machine-readable but difficult for humans to interpret.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                            <div className="bg-[hsl(var(--card))] p-6 rounded-2xl border border-[hsl(var(--border))]">
                                <h4 className="font-bold text-[hsl(var(--foreground))] mb-3">📁 QBO File Contains:</h4>
                                <ul className="text-sm space-y-2 text-[hsl(var(--muted-foreground))]">
                                    <li>• <strong>Transaction Date</strong> (DTPOSTED)</li>
                                    <li>• <strong>Amount</strong> (TRNAMT - positive or negative)</li>
                                    <li>• <strong>Transaction ID</strong> (FITID - unique identifier)</li>
                                    <li>• <strong>Payee Name</strong> (NAME)</li>
                                    <li>• <strong>Memo/Description</strong> (MEMO)</li>
                                    <li>• <strong>Transaction Type</strong> (TRNTYPE - DEBIT/CREDIT)</li>
                                </ul>
                            </div>
                            <div className="bg-[hsl(var(--card))] p-6 rounded-2xl border border-[hsl(var(--border))]">
                                <h4 className="font-bold text-[hsl(var(--foreground))] mb-3">🔧 Common QBO Sources:</h4>
                                <ul className="text-sm space-y-2 text-[hsl(var(--muted-foreground))]">
                                    <li>• <strong>Bank Websites</strong> (Chase, Bank of America, Wells Fargo)</li>
                                    <li>• <strong>Credit Unions</strong> (NCUA member institutions)</li>
                                    <li>• <strong>Credit Card Companies</strong> (Amex, Discover, Capital One)</li>
                                    <li>• <strong>Third-Party Tools</strong> (MoneyThumb, Bank2QBO)</li>
                                    <li>• <strong>Our CSV to QBO Converter</strong></li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                            QBO vs OFX vs QFX - What&apos;s the Difference?
                        </h3>
                        <div className="overflow-x-auto not-prose">
                            <table className="w-full border-collapse text-sm">
                                <thead>
                                    <tr className="bg-[hsl(var(--primary))]/10">
                                        <th className="text-left p-3 font-semibold">Format</th>
                                        <th className="text-left p-3 font-semibold">Full Name</th>
                                        <th className="text-left p-3 font-semibold">Used By</th>
                                        <th className="text-left p-3 font-semibold">Compatibility</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-[hsl(var(--border))]">
                                        <td className="p-3 font-bold text-[hsl(var(--primary))]">.QBO</td>
                                        <td className="p-3 text-[hsl(var(--muted-foreground))]">QuickBooks Web Connect</td>
                                        <td className="p-3 text-[hsl(var(--muted-foreground))]">Intuit QuickBooks</td>
                                        <td className="p-3 text-[hsl(var(--muted-foreground))]">QuickBooks Online &amp; Desktop</td>
                                    </tr>
                                    <tr className="border-b border-[hsl(var(--border))]">
                                        <td className="p-3 font-bold">.OFX</td>
                                        <td className="p-3 text-[hsl(var(--muted-foreground))]">Open Financial Exchange</td>
                                        <td className="p-3 text-[hsl(var(--muted-foreground))]">Banks, Financial Software</td>
                                        <td className="p-3 text-[hsl(var(--muted-foreground))]">Microsoft Money, Quicken, GnuCash</td>
                                    </tr>
                                    <tr className="border-b border-[hsl(var(--border))]">
                                        <td className="p-3 font-bold">.QFX</td>
                                        <td className="p-3 text-[hsl(var(--muted-foreground))]">Quicken Financial Exchange</td>
                                        <td className="p-3 text-[hsl(var(--muted-foreground))]">Intuit Quicken</td>
                                        <td className="p-3 text-[hsl(var(--muted-foreground))]">Quicken (Personal Finance)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Troubleshooting Section */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <AlertTriangle className="w-8 h-8 text-amber-500" />
                        <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))]">
                            Troubleshooting QBO File Issues
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[hsl(var(--card))] p-6 rounded-2xl border border-[hsl(var(--border))]">
                            <h3 className="font-bold text-red-600 dark:text-red-400 mb-3">
                                ❌ &quot;File format not recognized&quot;
                            </h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
                                <strong>Cause:</strong> The file may be corrupted or saved with the wrong extension.
                            </p>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                <strong>Solution:</strong> Open the file in a text editor and verify it starts with <code>&lt;OFX&gt;</code> or <code>&lt;?OFX</code>. Re-download from your bank if corrupted.
                            </p>
                        </div>

                        <div className="bg-[hsl(var(--card))] p-6 rounded-2xl border border-[hsl(var(--border))]">
                            <h3 className="font-bold text-red-600 dark:text-red-400 mb-3">
                                ❌ &quot;No transactions found&quot;
                            </h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
                                <strong>Cause:</strong> The date range in the QBO file may be empty or have already been imported.
                            </p>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                <strong>Solution:</strong> Download a new QBO file from your bank with a wider date range that includes transactions.
                            </p>
                        </div>

                        <div className="bg-[hsl(var(--card))] p-6 rounded-2xl border border-[hsl(var(--border))]">
                            <h3 className="font-bold text-amber-600 dark:text-amber-400 mb-3">
                                ⚠️ Dates appear incorrect in Excel
                            </h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
                                <strong>Cause:</strong> Excel may interpret date formats differently based on your locale.
                            </p>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                <strong>Solution:</strong> Select the date column, right-click → Format Cells → Date → choose your preferred format.
                            </p>
                        </div>

                        <div className="bg-[hsl(var(--card))] p-6 rounded-2xl border border-[hsl(var(--border))]">
                            <h3 className="font-bold text-amber-600 dark:text-amber-400 mb-3">
                                ⚠️ Special characters display incorrectly
                            </h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
                                <strong>Cause:</strong> Character encoding mismatch (UTF-8 vs ANSI).
                            </p>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                <strong>Solution:</strong> When opening in Excel, use Import Wizard and select UTF-8 encoding specifically.
                            </p>
                        </div>
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
                            { q: "What is a QBO file?", a: "A QBO file (QuickBooks Web Connect) is a financial data format used by QuickBooks to import bank transactions. It uses OFX XML standards and contains transaction dates, amounts, payee names, and reference numbers." },
                            { q: "How does the client-side conversion work?", a: "We use modern JavaScript to read the .qbo file directly in your browser's memory. The parsing code runs locally on your device, not on our servers - your data never leaves your computer." },
                            { q: "Is this QBO to CSV converter free?", a: "Yes, it's Free Online Tool with no limits. Convert as many files as you want without signing up or paying anything. No hidden fees or premium tiers." },
                            { q: "Can I convert QBO to Excel?", a: "Yes. The CSV file we generate is formatted specifically to open correctly in Microsoft Excel, Google Sheets, or Apple Numbers." },
                            { q: "Which banks support QBO downloads?", a: "Most major US banks including Chase, Bank of America, Wells Fargo, Citi, Capital One, US Bank, PNC, and thousands of credit unions support QBO file downloads." },
                            { q: "What's the difference between QBO, OFX, and QFX?", a: "QBO is for QuickBooks, QFX is for Quicken personal finance, and OFX is the generic Open Financial Exchange standard. All use similar XML-based formats." },
                            { q: "Can I import the CSV into other accounting software?", a: "Yes! The CSV is universally compatible with Xero, Sage, FreshBooks, Wave, Zoho Books, and any software that accepts CSV bank statement imports." },
                            { q: "Do you store my data?", a: "No. Since the file is never uploaded to a server, it's physically impossible for us to store your data. Everything stays on your machine." },
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
                currentTool="QBO to CSV"
                relatedTools={relatedTools}
            />
        </main>
    );
}
