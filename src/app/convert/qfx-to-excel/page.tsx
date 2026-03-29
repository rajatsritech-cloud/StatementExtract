import { Metadata } from "next";
import { FinanceToExcelTool } from "@/components/tools/FinanceToExcelTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { PageMeta } from "@/components/PageMeta";
import {
    Zap,
    Shield,
    Globe,
    CheckCircle,
    Lock,
    FileSpreadsheet,
    Users,
    Building2,
    BarChart3,
    Briefcase,
    FileText,
    ArrowUpDown
} from "lucide-react";
import Link from "next/link";


export const metadata: Metadata = {
    title: "QFX to Excel Converter Free Online | Convert Quicken Files to XLSX",
    description: "Free QFX to Excel converter. Turn Quicken (QFX) files into editable Excel spreadsheets instantly. No signup, secure browser-based conversion.",
    keywords: "qfx to excel, convert qfx to excel, qfx to xlsx, quicken to excel, qfx converter, bank statement to excel, convert qfx file",
    openGraph: {
        title: "QFX to Excel Converter Free Online | Quicken to XLSX",
        description: "Convert QFX Quicken files to Excel spreadsheets instantly and securely.",
        type: "website",
        url: "https://statementextract.com/convert/qfx-to-excel",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"]
    },
    alternates: {
        canonical: "https://statementextract.com/convert/qfx-to-excel/"
    }
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "QFX to Excel Converter by Statement Extract",
    "description": "Instantly convert QFX (Quicken) files to Excel or CSV format securely in your browser. No signup required.",
    "url": "https://statementextract.com/convert/qfx-to-excel",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser, Windows, macOS, Android, iOS",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock"
    },
    "featureList": [
        "QFX to Excel conversion",
        "Secure browser-based processing",
        "No file upload to server",
        "Instant preview",
        "Drag and drop interface"
    ],
    "screenshot": "https://statementextract.com/assets/StatementExtract_Workflow_img.png",
    "softwareVersion": "1.0",
    "datePublished": "2026-01-01"
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I convert a QFX file to Excel?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Upload your QFX file to our free tool. We parse the Quicken data and instantly generate a formatted Excel (.xlsx) file for you to download."
            }
        },
        {
            "@type": "Question",
            "name": "Can I convert QFX to Excel without Quicken?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! You don't need Quicken installed. Our online tool reads the QFX file directly and converts it to Excel format."
            }
        },
        {
            "@type": "Question",
            "name": "Is it safe to upload my bank files?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Our tool processes files locally in your browser. Your financial data is never sent to our servers or stored anywhere."
            }
        }
    ]
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://statementextract.com" },
        { "@type": "ListItem", "position": 2, "name": "Converters", "item": "https://statementextract.com/convert" },
        { "@type": "ListItem", "position": 3, "name": "QFX to Excel", "item": "https://statementextract.com/convert/qfx-to-excel" }
    ]
};

const relatedTools = [
    { href: "/convert/ofx-to-excel", title: "OFX to Excel" },
    { href: "/convert/qif-to-excel", title: "QIF to Excel" },
    { href: "/convert/iif-to-excel", title: "IIF to Excel" },
    { href: "/convert/csv-to-iif", title: "CSV to IIF" },
    { href: "/convert/qbo-to-csv", title: "QBO to CSV" },
    { href: "/convert/csv-to-qbo", title: "CSV to QBO" },
    { href: "/tools/ofx-viewer", title: "OFX Viewer" },
    { href: "/convert-bank-statement-to-csv-excel", title: "PDF to Excel" },
];

export default function QfxToExcelPage() {
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

            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <FinanceToExcelTool />
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

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        The Fastest Way to Convert QFX to Excel
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: FileSpreadsheet, title: "Structured Excel Output", desc: "Get clean columns for Date, Payee, Memo, Amount, and Check Number." },
                            { icon: Lock, title: "Bank-Grade Security", desc: "Processing happens client-side. Your data never leaves your browser." },
                            { icon: Zap, title: "No Software Needed", desc: "Convert QFX files without installing Quicken or Excel." },
                            { icon: CheckCircle, title: "Accuracy Guaranteed", desc: "We parse the exact financial data structure, ensuring zero data loss." },
                            { icon: Globe, title: "Multi-Currency", desc: "Supports QFX files from banks worldwide with any currency." },
                            { icon: Users, title: "Batch Conversion", desc: "Drag and drop multiple QFX files to convert them all at once." },
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

            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        Why Convert QFX Files to Excel?
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>QFX files</strong> are a variation of the OFX format, designed specifically for Quicken software. While great for Quicken, they are difficult to read manually or use in other applications.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        By converting <strong>QFX to Excel (.xlsx)</strong>, you unlock your data:
                    </p>
                    <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-8 space-y-2">
                        <li><strong>Audit & Analysis:</strong> Use Excel's pivot tables and filters to analyze spending.</li>
                        <li><strong>Reconciliation:</strong> Compare bank records with your own books easily.</li>
                        <li><strong>Universal Access:</strong> Share financial data with stakeholders who don't use Quicken.</li>
                        <li><strong>Custom Reports:</strong> Build your own financial dashboards in Excel or Google Sheets.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6 mt-12">
                        Deep Dive: The QFX File Format
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        The <strong>Quicken Financial Exchange (QFX)</strong> format is a proprietary variant of the OFX (Open Financial Exchange) standard. It was developed by Intuit to facilitate the reliable transfer of data between financial institutions and Quicken software.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Unlike standard CSV (Comma Separated Values) files, QFX files are structured using SGML (Standard Generalized Markup Language) tags. This structure ensures that data like dates, amounts, and transaction IDs are unambiguous.
                    </p>
                    <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-3">
                        Key Data Blocks in QFX
                    </h3>
                    <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-8 space-y-2">
                        <li><strong>&lt;BANKTRANLIST&gt;:</strong> The container for all banking transactions.</li>
                        <li><strong>&lt;STMTTRN&gt;:</strong> Represents a single statement transaction.</li>
                        <li><strong>&lt;DTPOSTED&gt;:</strong> The exact date and time the transaction posted to the account.</li>
                        <li><strong>&lt;TRNAMT&gt;:</strong> The transaction amount. Negative for debits, positive for credits.</li>
                        <li><strong>&lt;FITID&gt;:</strong> A unique Financial Institution Transaction ID. This prevents duplicate imports.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6 mt-12">
                        Troubleshooting QFX Issues
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        While QFX is robust, users often encounter issues when trying to open these files directly or import them into non-Quicken software.
                    </p>
                    <div className="space-y-6 mb-8">
                        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5">
                            <h4 className="font-bold text-[hsl(var(--foreground))] mb-2">Error: "Excel cannot open this file"</h4>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                Excel does not natively support QFX/OFX files. It treats them as text, resulting in a mess of tags. <strong>Solution:</strong> Use our converter to transform the QFX tags into columns like 'Date', 'Payee', and 'Amount' before opening in Excel.
                            </p>
                        </div>
                        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5">
                            <h4 className="font-bold text-[hsl(var(--foreground))] mb-2">Error: "Invalid Date Format"</h4>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                QFX dates often look like `20240115120000`. Manual conversion is tedious. <strong>Solution:</strong> Our tool automatically parses this string into a valid Excel Date format (MM/DD/YYYY).
                            </p>
                        </div>
                        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5">
                            <h4 className="font-bold text-[hsl(var(--foreground))] mb-2">Problem: Missing Payee Names</h4>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                Some banks put the payee name in the `&lt;MEMO&gt;` field instead of `&lt;NAME&gt;`. <strong>Solution:</strong> Our intelligent parser checks both fields to ensure you always get the most descriptive transaction text.
                            </p>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Who uses this tool?
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 not-prose mb-8">
                        <div className="p-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl">
                            <h4 className="font-bold mb-1 flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-500" /> Accountants
                            </h4>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Convert client QFX exports to Excel for tax prep.</p>
                        </div>
                        <div className="p-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl">
                            <h4 className="font-bold mb-1 flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-green-500" /> Business Owners
                            </h4>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Track expenses without expensive accounting software.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Privacy Section (Below Upload) */}
            <section className="py-12 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto text-center">
                    <Shield className="w-12 h-12 text-[hsl(var(--primary))] mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                        Your Financial Data Stays Private
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto mb-6">
                        Unlike other converters that upload your files to a server, <strong>Statement Extract processes everything locally in your browser</strong>. Your QFX files never leave your computer, ensuring high-grade data security.
                    </p>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-12 md:py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        QFX to Excel Converter Comparison
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Why Statement Extract is the clear choice
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
                                    { feature: "Security", us: "entirely browser-based", competitors: "Server Upload (Risky)" },
                                    { feature: "Cost", us: "Free Forever", competitors: "Paid / Freemium" },
                                    { feature: "Quicken Required?", us: "No", competitors: "Often Yes" },
                                    { feature: "Excel Output", us: "Structured .XLSX", competitors: "Basic CSV" },
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

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {[
                            { q: "What is a QFX file?", a: "A QFX file is a proprietary version of the OFX (Open Financial Exchange) format, used by Intuit's Quicken software to import transaction data from banks." },
                            { q: "How do I open a QFX file in Excel?", a: "Excel cannot open QFX files directly. You must first use a converter like Statement Extract to transform the QFX data into an Excel-compatible format (XLSX or CSV)." },
                            { q: "Is this tool free?", a: "Yes, our QFX to Excel converter is completely free to use for unlimited files." },
                            { q: "Does it support Mac and Windows?", a: "Yes! Since it runs in your web browser (Chrome, Safari, Edge), it works on Windows, Mac, Linux, and even mobile devices." },
                        ].map((faq, i) => (
                            <div key={i} className="p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{faq.q}</h3>
                                <p className="text-[hsl(var(--muted-foreground))] text-sm">{faq.a}</p>
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
                currentTool="QFX to Excel"
                relatedTools={relatedTools}
            />
        </main >
    );
}
