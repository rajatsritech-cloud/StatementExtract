import { Metadata } from "next";
import Link from "next/link";
import { QuickBooksValidatorTool } from "@/components/tools/QuickBooksValidatorTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { PageMeta } from "@/components/PageMeta";
import {
    Zap,
    Shield,
    Globe,
    FileText,
    CheckCircle,
    AlertTriangle,
    ArrowRight,
    Calendar,
    DollarSign,
    List,
    FileSpreadsheet,
    Building2,
    Clock,
    Users
} from "lucide-react";

export const metadata: Metadata = {
    title: "Free QuickBooks Import Validator & CSV Error Checker | Fix QBO Errors | Statement Extract",
    description: "Validate your CSV and Excel files before importing to QuickBooks Online. Instantly detect date format errors, missing columns, duplicate transactions, and invalid amounts. 100% free, no signup required.",
    keywords: "QuickBooks Online import error, QBO import validator, validate CSV for QuickBooks, QuickBooks date format error, fix QuickBooks CSV import, qbo error 350, quickbooks csv format, quickbooks import failed, csv to qbo validator",
    openGraph: {
        title: "Free QuickBooks Import Validator & CSV Error Checker",
        description: "Validate your CSV files before importing to QuickBooks Online. Detect and fix date formats, encoding errors, and missing columns instantly.",
        type: "website",
        url: "https://statementextract.com/tools/quickbooks-import-validator",
    },
    alternates: {
        canonical: "https://statementextract.com/tools/quickbooks-import-validator/",
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "QuickBooks Import Validator",
    "description": "Validate CSV and Excel files for QuickBooks Online import compatibility. Checks date formats, amounts, headers, and detects duplicate transactions.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "featureList": "Date Format Validation, Amount Checking, Duplicate Detection, Column Mapping, Excel Support, Privacy-First"
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://statementextract.com" },
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://statementextract.com/tools" },
        { "@type": "ListItem", "position": 3, "name": "QuickBooks Validator" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why does QuickBooks Online keep rejecting my CSV?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "QuickBooks Online often rejects CSVs due to incorrect date formats (must be MM/DD/YYYY or YYYY-MM-DD), missing required columns (Date, Description, Amount), or special characters (like colons) in fields. Our validator detects all these issues before you import."
            }
        },
        {
            "@type": "Question",
            "name": "Is my data safe using this tool?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. This tool runs 100% in your browser using client-side JavaScript. Your file data never leaves your device and is never uploaded to any server."
            }
        },
        {
            "@type": "Question",
            "name": "How do I fix 'Input is not a valid money' errors?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Remove currency symbols (like $) and ensure amounts are just numbers (e.g., '100.50'). Our validator flags rows with non-numeric characters automatically."
            }
        },
        {
            "@type": "Question",
            "name": "What date format should I use for QuickBooks?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "For QuickBooks Online US, the safest format is MM/DD/YYYY (e.g. 12/31/2023). YYYY-MM-DD is also widely accepted, but avoid DD/MM/YYYY if your region is US."
            }
        },
        {
            "@type": "Question",
            "name": "Can I validate Excel files or only CSV?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our validator supports both CSV and Excel (.xlsx) files. Simply drag and drop your file and the tool will parse it automatically."
            }
        },
        {
            "@type": "Question",
            "name": "What is QBO Error 350?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Error 350 in QuickBooks typically means 'Invalid format' - usually caused by currency symbols in amount fields, wrong date formats, or special characters in descriptions. Our validator identifies the exact rows causing this error."
            }
        },
        {
            "@type": "Question",
            "name": "How do I avoid duplicate transactions when importing?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Enable 'Strict Mode' in our validator. It automatically flags duplicate rows (same date, amount, and description) in yellow so you can remove them before importing to QuickBooks."
            }
        },
        {
            "@type": "Question",
            "name": "Is this tool really free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, 100% free with no limits. No watermark, no signup, no credit card required. It's provided as a companion tool to our CSV to QBO converter."
            }
        }
    ]
};

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Validate CSV for QuickBooks Import",
    "step": [
        { "@type": "HowToStep", "name": "Upload File", "text": "Drag and drop your CSV or Excel file to the validator." },
        { "@type": "HowToStep", "name": "Map Columns", "text": "Use the dropdown menus to map your file's columns to Date, Description, and Amount." },
        { "@type": "HowToStep", "name": "Review Errors", "text": "The tool scans for date, amount, and header errors. Red rows are blocking errors, yellow are warnings." },
        { "@type": "HowToStep", "name": "Fix Inline", "text": "Click any cell to edit values directly. Dates and amounts are validated in real-time." },
        { "@type": "HowToStep", "name": "Export Clean", "text": "Once all errors are resolved, export your clean file ready for QuickBooks import." }
    ]
};

const relatedTools = [
    { href: "/convert/csv-to-qbo", title: "CSV to QBO Converter" },
    { href: "/convert-bank-statement-to-csv-excel", title: "Bank Statement to Excel" },
    { href: "/tools/invoice-generator", title: "Free Invoice Generator" },
    { href: "/tools/profit-margin-calculator", title: "Profit Margin Calculator" },
];

export default function QuickBooksValidatorPage() {
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />

            {/* Hero Section with H1 */}
            <section className="py-16 px-6 text-center border-b border-[hsl(var(--border))] bg-gradient-to-b from-[hsl(var(--muted))]/10 to-transparent">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))] mb-4">
                        Free QuickBooks Import Validator & CSV Error Checker
                    </h1>
                    <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto text-xl mb-10 leading-relaxed">
                        Stop wasting hours on failed imports. Validate your <span className="text-[hsl(var(--primary))] font-medium">CSV and Excel files</span> before importing to QuickBooks Online.
                        Detect date format errors, missing columns, and invalid amounts instantly.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-[hsl(var(--muted-foreground))]">
                        <span className="flex items-center gap-2 bg-[hsl(var(--card))] px-4 py-2 rounded-full border shadow-sm"><CheckCircle className="w-4 h-4 text-green-500" /> No Sign Up</span>
                        <span className="flex items-center gap-2 bg-[hsl(var(--card))] px-4 py-2 rounded-full border shadow-sm"><CheckCircle className="w-4 h-4 text-green-500" /> 100% Free</span>
                        <span className="flex items-center gap-2 bg-[hsl(var(--card))] px-4 py-2 rounded-full border shadow-sm"><CheckCircle className="w-4 h-4 text-green-500" /> Secure (Client-Side)</span>
                    </div>
                </div>
            </section>

            {/* Tool Section */}
            <section className="py-8 md:py-12 bg-[hsl(var(--background))]">
                <QuickBooksValidatorTool />
            </section>

            {/* How-To Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/10 border-t border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">How to Fix QuickBooks Import Errors in 5 Steps</h2>
                    <div className="grid md:grid-cols-5 gap-6">
                        {[
                            { step: "1", title: "Upload", desc: "Drag and drop your CSV or Excel file." },
                            { step: "2", title: "Map", desc: "Assign Date, Description, and Amount columns." },
                            { step: "3", title: "Scan", desc: "Tool automatically detects all errors." },
                            { step: "4", title: "Fix", desc: "Click cells to edit values directly." },
                            { step: "5", title: "Export", desc: "Download your clean file for QBO import." }
                        ].map((item) => (
                            <div key={item.step} className="relative p-5 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-sm text-center">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[hsl(var(--primary))] text-white flex items-center justify-center font-bold shadow-lg text-sm">{item.step}</div>
                                <h3 className="font-bold mb-2 pt-4">{item.title}</h3>
                                <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-t border-[hsl(var(--border))]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our QuickBooks Import Validator?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <Calendar className="w-8 h-8 text-[hsl(var(--primary))] mb-4" />
                            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">Date Format Detection</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Instantly flags dates that don't match QBO's required MM/DD/YYYY or YYYY-MM-DD formats.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <DollarSign className="w-8 h-8 text-[hsl(var(--primary))] mb-4" />
                            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">Amount Validation</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Detects currency symbols, commas in numbers, and invalid characters that cause Error 350.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <List className="w-8 h-8 text-[hsl(var(--primary))] mb-4" />
                            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">Duplicate Detection</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Strict Mode flags identical rows so you don't accidentally import duplicates.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <Shield className="w-8 h-8 text-[hsl(var(--primary))] mb-4" />
                            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">100% Private</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">All processing happens in your browser. Your financial data never leaves your device.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <Zap className="w-8 h-8 text-[hsl(var(--primary))] mb-4" />
                            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">Instant Feedback</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Get row-by-row error reports so you know exactly what to fix before importing.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <FileSpreadsheet className="w-8 h-8 text-[hsl(var(--primary))] mb-4" />
                            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">Excel & CSV Support</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Validate both CSV and Excel (.xlsx) files directly without conversion.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Is This For Section */}
            <section className="py-12 md:py-16 px-6 border-t border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Who Needs a QuickBooks Import Validator?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex gap-4 p-6 rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/30 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600"><Users className="w-5 h-5" /></div>
                            <div>
                                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">Bookkeepers & Accountants</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">CPAs who import client bank data need to ensure clean files before QuickBooks import to avoid reconciliation issues.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/30 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-green-600"><Building2 className="w-5 h-5" /></div>
                            <div>
                                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">Small Business Owners</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">Entrepreneurs managing their own books who download CSV exports from banks and payment processors.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/30 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0 text-purple-600"><Clock className="w-5 h-5" /></div>
                            <div>
                                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">Freelancers & Contractors</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">Self-employed professionals tracking expenses from multiple sources who need clean data for tax time.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/30 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600"><Globe className="w-5 h-5" /></div>
                            <div>
                                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">International Businesses</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">Companies dealing with multiple date formats (US vs UK) who need to standardize before import.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--background))] border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-8">
                        Manual Review vs. QuickBooks Validator
                    </h2>
                    <div className="overflow-x-auto rounded-xl border border-[hsl(var(--border))]">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[hsl(var(--muted))]/50">
                                    <th className="p-4 font-semibold text-[hsl(var(--foreground))]">Feature</th>
                                    <th className="p-4 font-semibold text-[hsl(var(--foreground))]">Manual Excel Checking</th>
                                    <th className="p-4 font-semibold text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5">QuickBooks Validator</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[hsl(var(--border))]">
                                <tr>
                                    <td className="p-4 font-medium text-[hsl(var(--muted-foreground))]">Date Formatting</td>
                                    <td className="p-4 text-red-500">Manual (prone to MM/DD errors)</td>
                                    <td className="p-4 text-green-600 font-medium bg-[hsl(var(--primary))]/5">Auto-Detects Region (US/UK)</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-[hsl(var(--muted-foreground))]">Currency Symbols</td>
                                    <td className="p-4 text-red-500">Must Find & Replace '$'</td>
                                    <td className="p-4 text-green-600 font-medium bg-[hsl(var(--primary))]/5">Auto-Flags Invalid Characters</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-[hsl(var(--muted-foreground))]">Column Mapping</td>
                                    <td className="p-4 text-red-500">Rename headers manually</td>
                                    <td className="p-4 text-green-600 font-medium bg-[hsl(var(--primary))]/5">Smart Dropdown Mapping</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-[hsl(var(--muted-foreground))]">Validation Speed</td>
                                    <td className="p-4 text-red-500">10+ Minutes per file</td>
                                    <td className="p-4 text-green-600 font-medium bg-[hsl(var(--primary))]/5">Instant (&lt; 1 Second)</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-[hsl(var(--muted-foreground))]">Duplicate Detection</td>
                                    <td className="p-4 text-red-500">Conditional Formatting (complex)</td>
                                    <td className="p-4 text-green-600 font-medium bg-[hsl(var(--primary))]/5">Auto-Highlights Duplicates</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-[hsl(var(--muted-foreground))]">Privacy</td>
                                    <td className="p-4 text-[hsl(var(--foreground))]">Local</td>
                                    <td className="p-4 text-green-600 font-medium bg-[hsl(var(--primary))]/5">100% Client-Side (Local)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Deep SEO Content - Error Encyclopedia */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-4">
                        QuickBooks Import Error Encyclopedia
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-12 max-w-2xl mx-auto">
                        The most complete guide to troubleshooting QuickBooks Online import failures. Learn exactly what causes each error and how to fix it.
                    </p>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="p-6 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-sm">
                            <h3 className="flex items-center gap-2 font-bold text-lg mb-3">
                                <AlertTriangle className="w-5 h-5 text-red-500" /> Error: "Input is not a valid money"
                            </h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">
                                <strong>Code:</strong> Error 350 / Format Error
                            </p>
                            <div className="text-sm space-y-2">
                                <p><strong>Cause:</strong> Your Amount column contains non-numeric characters like currency symbols ($), commas (1,000.00), or text.</p>
                                <p className="text-green-600 font-medium"><strong>Solution:</strong> Clean the column to numbers only (e.g. "1000.00"). Our validator identifies these rows instantly.</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-sm">
                            <h3 className="flex items-center gap-2 font-bold text-lg mb-3">
                                <Calendar className="w-5 h-5 text-amber-500" /> Error: "Date format is invalid"
                            </h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">
                                <strong>Code:</strong> General Formatting
                            </p>
                            <div className="text-sm space-y-2">
                                <p><strong>Cause:</strong> Using DD/MM/YYYY when QBO expects MM/DD/YYYY, or using text formats like "Jan 1, 2024".</p>
                                <p className="text-green-600 font-medium"><strong>Solution:</strong> Standardize all dates to YYYY-MM-DD or MM/DD/YYYY. Our tool validates against your selected region.</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-sm">
                            <h3 className="flex items-center gap-2 font-bold text-lg mb-3">
                                <FileText className="w-5 h-5 text-blue-500" /> Error: Missing Columns
                            </h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">
                                <strong>Code:</strong> Header Mapping Error
                            </p>
                            <div className="text-sm space-y-2">
                                <p><strong>Cause:</strong> Uploading a file where the header row doesn't exactly match "Date", "Description", and "Amount".</p>
                                <p className="text-green-600 font-medium"><strong>Solution:</strong> Use our <strong>Column Mapping</strong> feature to tell the tool which column is which, regardless of the header name.</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-sm">
                            <h3 className="flex items-center gap-2 font-bold text-lg mb-3">
                                <List className="w-5 h-5 text-purple-500" /> Error: Duplicate Transactions
                            </h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">
                                <strong>Code:</strong> Deduplication Logic
                            </p>
                            <div className="text-sm space-y-2">
                                <p><strong>Cause:</strong> Re-importing the same file twice, or having identical rows in your CSV.</p>
                                <p className="text-green-600 font-medium"><strong>Solution:</strong> Our <strong>Strict Mode</strong> validator flags duplicate rows in yellow so you can remove them before export.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Long-Form SEO Guide Section */}
            <section className="py-16 px-6 border-t border-[hsl(var(--border))]">
                <div className="max-w-3xl mx-auto prose prose-blue dark:prose-invert">
                    <h2 className="text-3xl font-bold mb-8">Complete Guide: Importing Bank Transactions to QuickBooks Online</h2>

                    <h3 className="text-xl font-bold mt-10 mb-4">Understanding QuickBooks Import Methods</h3>
                    <p>
                        QuickBooks Online supports multiple methods for importing bank transactions. The most common approach is using <strong>Bank Feeds</strong>, where QuickBooks connects directly to your bank. However, this isn't always available—especially for international banks, credit unions, or specialized business accounts.
                    </p>
                    <p>
                        When bank feeds aren't an option, you'll need to manually import transactions using <strong>CSV, QBO, or OFX files</strong>. This is where most users encounter frustrating import errors. QuickBooks is notoriously strict about file formatting.
                    </p>

                    <h3 className="text-xl font-bold mt-10 mb-4">Why CSV Imports Fail (And How to Prevent It)</h3>
                    <p>
                        The most common reasons for QuickBooks CSV import failures include:
                    </p>
                    <ul className="space-y-3">
                        <li><strong>Date Format Mismatch:</strong> QuickBooks US expects MM/DD/YYYY, but many banks export dates as DD/MM/YYYY or YYYY-MM-DD.</li>
                        <li><strong>Currency Symbols in Amounts:</strong> Entries like "$1,500.00" will fail. QuickBooks requires plain numbers like "1500.00".</li>
                        <li><strong>Missing Required Headers:</strong> If your file doesn't have explicit "Date", "Description", and "Amount" columns, QuickBooks can't parse it.</li>
                        <li><strong>Special Characters:</strong> Colons, semicolons, and certain Unicode characters in descriptions can cause parsing errors.</li>
                        <li><strong>Encoding Issues:</strong> Files saved in non-UTF-8 encoding (common with Excel on Windows) may have invisible characters that break imports.</li>
                    </ul>

                    <div className="my-8 p-6 rounded-xl bg-[hsl(var(--primary))]/5 border-l-4 border-[hsl(var(--primary))] italic text-sm">
                        <strong>Pro Tip:</strong> Always validate your file before importing to QuickBooks. A single bad row at line 500 can cause the entire import to fail, wasting hours of troubleshooting.
                    </div>

                    <h3 className="text-xl font-bold mt-10 mb-4">Bank-Specific Export Guides</h3>
                    <p>
                        Different banks have different CSV export formats. Here are quick tips for the most common ones:
                    </p>
                    <ul className="space-y-3">
                        <li><strong>Chase Bank:</strong> Export from chase.com → Select "Download Activity" → Choose CSV. Chase uses MM/DD/YYYY format (US-friendly) but includes currency symbols.</li>
                        <li><strong>Wells Fargo:</strong> Navigate to Account Activity → Download → Select Date Range → Choose CSV. May include extra header rows that need removal.</li>
                        <li><strong>Bank of America:</strong> Download Transactions → CSV format. Uses "Reference Number" instead of "Description" which needs mapping.</li>
                        <li><strong>Stripe/PayPal:</strong> Payment processor exports often include many extra columns. Map only the essential Date, Description, and Amount columns.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-10 mb-4">Best Practices for Error-Free Imports</h3>
                    <p>
                        Follow these steps to ensure smooth QuickBooks imports every time:
                    </p>
                    <ol className="space-y-3">
                        <li><strong>Always validate first:</strong> Use our free validator before attempting any import.</li>
                        <li><strong>Import smaller batches:</strong> Instead of importing 12 months at once, import month-by-month for easier troubleshooting.</li>
                        <li><strong>Keep original files:</strong> Save your original bank export before making any modifications.</li>
                        <li><strong>Check for duplicates:</strong> If you've already imported some transactions, ensure you're not re-importing overlapping date ranges.</li>
                        <li><strong>Use consistent naming:</strong> Name files with dates like <code>2024-01_Chase_Checking.csv</code> for easy reference.</li>
                    </ol>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/20 border-t border-[hsl(var(--border))]">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            { q: "Why does QuickBooks reject my CSV?", a: "QuickBooks is strict about formatting. It rejects files with missing headers, invalid date formats, or currency symbols in number fields. Our validator detects all these issues before you import." },
                            { q: "What is the correct date format for QuickBooks?", a: "Use MM/DD/YYYY (e.g., 12/31/2024) for QuickBooks Online US. YYYY-MM-DD also works. Avoid using text months (Dec 31) or dot separators (12.31.24)." },
                            { q: "What is QBO Error 350?", a: "Error 350 typically means 'invalid format' in the amount field. Remove currency symbols, commas, and ensure all amounts are plain numbers like '1500.00'." },
                            { q: "Is this tool free?", a: "Yes, 100% free with no limits. No watermark, no signup, no credit card required." },
                            { q: "Does this store my financial data?", a: "No. All validation happens locally in your web browser using JavaScript. Your file is never uploaded to any server." },
                            { q: "Can I validate Excel files or only CSV?", a: "You can validate both! Simply drag and drop any .csv or .xlsx file and the tool will parse it automatically." },
                            { q: "How do I avoid duplicate transactions?", a: "Enable 'Strict Mode' which flags duplicate rows (same date, amount, and description) in yellow so you can review them before export." },
                            { q: "Can I edit values directly in the tool?", a: "Yes! Click any cell in the transaction table to edit dates, amounts, descriptions, or memos inline. Changes are validated in real-time." },
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{faq.q}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Legal Disclaimer */}
            <section className="py-8 px-6 bg-[hsl(var(--card))] border-t border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-4">
                        <Shield className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                        <div className="text-sm text-[hsl(var(--muted-foreground))]">
                            <p className="font-semibold text-amber-700 dark:text-amber-500 mb-1">Legal Disclaimer</p>
                            <p>
                                This validator is a tool for checking file formatting before QuickBooks import. It does not constitute accounting, financial, or tax advice. Always verify imported transactions in QuickBooks for accuracy.
                            </p>
                            <p className="mt-2">
                                We do not store your data on our servers. All information is processed locally in your browser.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Author Attribution for E-E-A-T */}
            <section className="py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <PageMeta lastUpdated="January 2026" />
                </div>
            </section>

            {/* Footer */}
            <ToolPageFooter
                currentTool="QuickBooks Import Validator"
                relatedTools={relatedTools}
            />
        </main>
    );
}
