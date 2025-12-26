import { Metadata } from "next";
import { QifToCsvTool } from "@/components/qif-tools/QifToCsvTool";
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
    Briefcase
} from "lucide-react";

export const metadata: Metadata = {
    title: "QIF to CSV Converter Free Online | Quicken to Excel Export | Statement Extract",
    description: "Free QIF to CSV converter online. Convert Quicken QIF files to Excel-ready CSV spreadsheets. Works with all Quicken versions. 100% private browser processing.",
    keywords: "qif to csv converter, qif to csv online, convert qif to csv, qif to excel, quicken to csv, qif file to csv, export quicken to excel, qif file converter",
    openGraph: {
        title: "QIF to CSV Converter Free Online | Quicken to Excel",
        description: "Convert Quicken QIF files to CSV spreadsheets. Free, instant, 100% private.",
        type: "website",
        url: "https://statementextract.com/convert/qif-to-csv",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "QIF to CSV Converter - Free Online Tool",
        description: "Convert Quicken QIF files to CSV. Free, instant, private.",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"],
    },
    alternates: {
        canonical: "https://statementextract.com/convert/qif-to-csv",
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "QIF to CSV Converter",
    "description": "Convert Quicken Interchange Format (QIF) files to CSV spreadsheet format for Excel and Google Sheets.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "934"
    }
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://statementextract.com" },
        { "@type": "ListItem", "position": 2, "name": "Converters", "item": "https://statementextract.com/convert" },
        { "@type": "ListItem", "position": 3, "name": "QIF to CSV" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I convert QIF to CSV?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply drag and drop your QIF file onto our converter. It instantly parses all transactions and downloads a CSV file you can open in Excel or Google Sheets."
            }
        },
        {
            "@type": "Question",
            "name": "Is this QIF to CSV converter free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, it's 100% free with no limits on files or transactions. No signup required."
            }
        },
        {
            "@type": "Question",
            "name": "Is my financial data secure?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Completely. The conversion happens in your browser - your QIF file never leaves your device and is never uploaded to any server."
            }
        },
        {
            "@type": "Question",
            "name": "What Quicken versions are supported?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our converter supports QIF files from all Quicken versions including Deluxe, Premier, Home & Business, and legacy versions."
            }
        }
    ]
};

const whoIsThisFor = [
    { icon: Users, title: "Quicken Users", desc: "Export your Quicken data to spreadsheets for analysis or backup." },
    { icon: Building2, title: "Accountants", desc: "Convert client QIF files to CSV for import into other software." },
    { icon: BarChart3, title: "Financial Planners", desc: "Transform Quicken data for financial analysis and reporting." },
    { icon: Briefcase, title: "Small Businesses", desc: "Move financial data from Quicken to other accounting systems." },
];

const relatedTools = [
    { href: "/convert/qif-to-qbo", title: "QIF to QBO" },
    { href: "/convert/qfx-to-csv", title: "QFX to CSV" },
    { href: "/tools/qbo-viewer", title: "QBO Viewer" },
    { href: "/tools/ofx-viewer", title: "OFX Viewer" },
    { href: "/convert/ofx-to-excel", title: "OFX to Excel" },
    { href: "/convert/mt940-to-excel", title: "MT940 to Excel" },
];

export default function QifToCsvPage() {
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
                <QifToCsvTool />
            </section>

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free QIF to CSV Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Lock, title: "100% Private", desc: "Files never leave your device. Browser-based processing." },
                            { icon: FileSpreadsheet, title: "Excel Ready", desc: "CSV opens in Excel, Google Sheets, or any spreadsheet." },
                            { icon: Zap, title: "Instant Conversion", desc: "No uploads required. Convert files in milliseconds." },
                            { icon: Shield, title: "No Signup", desc: "No email or account needed. Completely free." },
                            { icon: Globe, title: "All Quicken Versions", desc: "Works with QIF from any Quicken version." },
                            { icon: CheckCircle, title: "Full Data Extraction", desc: "Preserves payees, memos, categories, and dates." },
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
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        How to Convert QIF to CSV
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Export from Quicken", desc: "In Quicken, go to File > Export > QIF File." },
                            { step: 2, title: "Upload Your QIF File", desc: "Drag and drop the exported QIF file here." },
                            { step: 3, title: "Click Convert", desc: "Press 'Convert to CSV' to process the file." },
                            { step: 4, title: "Open in Excel", desc: "Your browser downloads the CSV. Open in Excel." },
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

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Who Uses This QIF to CSV Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {whoIsThisFor.map((persona, i) => (
                            <div key={i} className="flex gap-4 items-start p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <persona.icon className="w-8 h-8 text-[hsl(var(--primary))] shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">{persona.title}</h3>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{persona.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        The Best Free QIF to CSV Converter in 2026
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Need to <strong>convert QIF to CSV</strong> for Excel or Google Sheets? Our free online converter transforms Quicken QIF files into standard CSV spreadsheets in seconds. Unlike other tools, it runs <strong>100% in your browser</strong> - your financial data never leaves your device.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        What is QIF Format?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>QIF (Quicken Interchange Format)</strong> is a text-based file format created by Intuit for importing and exporting financial data. Each line starts with a single letter code:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>D</strong> - Date of transaction</li>
                        <li><strong>T</strong> - Transaction amount</li>
                        <li><strong>P</strong> - Payee name</li>
                        <li><strong>M</strong> - Memo or description</li>
                        <li><strong>L</strong> - Category</li>
                        <li><strong>N</strong> - Check number</li>
                        <li><strong>C</strong> - Cleared status</li>
                        <li><strong>^</strong> - End of transaction</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Convert QIF to CSV?
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>Universal Format:</strong> CSV opens in any spreadsheet application.</li>
                        <li><strong>Data Analysis:</strong> Sort, filter, and chart your transactions in Excel.</li>
                        <li><strong>Software Migration:</strong> Move data from Quicken to other platforms.</li>
                        <li><strong>Backup:</strong> Keep readable copies of your financial history.</li>
                    </ul>
                </div>
            </section>

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            { q: "What's the best QIF to CSV converter in 2026?", a: "Statement Extract offers the best free QIF to CSV converter. It's instant, private, and produces clean Excel-compatible output." },
                            { q: "How do I export QIF from Quicken?", a: "In Quicken, go to File > Export > QIF File. Select the account and date range, then save the file." },
                            { q: "What data is extracted from QIF?", a: "We extract dates, amounts, payees, memos, categories, check numbers, and cleared status." },
                            { q: "Is the date format preserved?", a: "Dates are normalized to YYYY-MM-DD format for universal compatibility with Excel." },
                            { q: "Can I convert investment QIF files?", a: "This tool is optimized for banking transactions. Investment QIF files have different formats." },
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{faq.q}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <PageMeta lastUpdated="December 2024" />
                </div>
            </section>

            <ToolPageFooter
                currentTool="QIF to CSV"
                relatedTools={relatedTools}
            />
        </main>
    );
}
