import { Metadata } from "next";
import { QfxToCsvTool } from "@/components/qfx-tools/QfxToCsvTool";
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
    title: "QFX to CSV Converter Free Online | Export Quicken to Excel | Statement Extract",
    description: "Free QFX to CSV converter online. Convert Quicken QFX files to Excel-ready CSV spreadsheets instantly. Also supports OFX and QBO files. Private & Secure browser processing.",
    keywords: "qfx to csv converter, qfx to csv online, convert qfx to csv, qfx to excel converter, qfx file to csv, quicken to csv, ofx to csv, qbo to csv, export qfx to spreadsheet",
    openGraph: {
        title: "QFX to CSV Converter Free Online | Quicken to Excel",
        description: "Convert QFX, OFX, QBO files to CSV spreadsheets. Free, instant, Private & Secure processing.",
        type: "website",
        url: "https://statementextract.com/convert/qfx-to-csv",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"]
    },
    twitter: {
        card: "summary_large_image",
        title: "QFX to CSV Converter - Free Online Tool",
        description: "Convert Quicken QFX files to CSV spreadsheets. Free, instant, private.",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"]
    },
    alternates: {
        canonical: "https://statementextract.com/convert/qfx-to-csv/"
    }
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "QFX to CSV Converter",
    "description": "Convert Quicken QFX financial files to CSV spreadsheet format for Excel and Google Sheets.",
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
        { "@type": "ListItem", "position": 3, "name": "QFX to CSV" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I convert a QFX file to CSV?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply drag and drop your QFX file onto our converter. It will instantly parse all transactions and convert them to a CSV file that you can download and open in Excel."
            }
        },
        {
            "@type": "Question",
            "name": "Is this QFX to CSV converter free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, it's Free Online Tool with no limits on file size or number of conversions. No signup required."
            }
        },
        {
            "@type": "Question",
            "name": "Is my financial data secure?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Completely. The conversion happens entirely in your browser. Your QFX file is never uploaded to any server - we physically cannot access your data."
            }
        },
        {
            "@type": "Question",
            "name": "What columns are included in the CSV?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The CSV includes Date, Amount, Name, Memo, Type, Check Number, and Reference Number columns extracted from your QFX file."
            }
        },
        {
            "@type": "Question",
            "name": "Can I convert multiple files at once?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Upload multiple QFX files and convert them all to CSV with a single click. Each file downloads as a separate CSV."
            }
        }
    ]
};

const whoIsThisFor = [
    { icon: Users, title: "Accountants", desc: "Export client QFX files to CSV for analysis in Excel or import into other software." },
    { icon: Building2, title: "Business Owners", desc: "Convert bank downloads to spreadsheets for expense tracking and reconciliation." },
    { icon: BarChart3, title: "Financial Analysts", desc: "Transform QFX data into CSV format for data analysis and reporting." },
    { icon: Briefcase, title: "Bookkeepers", desc: "Prepare transaction data for import into accounting systems that accept CSV." },
];

const useCases = [
    { title: "Excel Data Analysis", desc: "Convert QFX bank data to CSV for pivot tables, charts, and financial analysis in Excel." },
    { title: "Expense Categorization", desc: "Export transactions to CSV to categorize and track business or personal expenses." },
    { title: "Tax Preparation", desc: "Convert bank statements to spreadsheet format for tax documentation and deduction tracking." },
    { title: "Software Migration", desc: "Move transaction data from Quicken to other accounting systems via CSV import." },
    { title: "Data Backup", desc: "Create readable CSV archives of your financial transactions for long-term storage." },
    { title: "Bulk Processing", desc: "Convert multiple QFX files to CSV for batch import into databases or ERP systems." },
];

const relatedTools = [
    { href: "/tools/qbo-viewer", title: "QBO Viewer" },
    { href: "/tools/ofx-viewer", title: "OFX Viewer" },
    { href: "/convert/ofx-to-excel", title: "OFX to Excel" },
    { href: "/convert/qfx-to-pdf", title: "QFX to PDF" },
    { href: "/convert/mt940-to-excel", title: "MT940 to Excel" },
    { href: "/convert/qif-to-csv", title: "QIF to CSV" },
];

export default function QfxToCsvPage() {
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
                <QfxToCsvTool />
            </section>

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free QFX to CSV Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Lock, title: "Private & Secure", desc: "Files never leave your device. All processing happens in your browser." },
                            { icon: FileSpreadsheet, title: "Excel Ready", desc: "CSV output opens directly in Excel, Google Sheets, or any spreadsheet app." },
                            { icon: Zap, title: "Instant Conversion", desc: "No uploads, no waiting. Convert files in milliseconds." },
                            { icon: Shield, title: "No Signup Required", desc: "No email, no account. Just drop your file and convert." },
                            { icon: Globe, title: "Multi-Format Support", desc: "Works with QFX, OFX, and QBO files from any bank." },
                            { icon: CheckCircle, title: "Batch Processing", desc: "Convert multiple files at once. Unlimited and free." },
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
                        How to Convert QFX to CSV
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Upload Your QFX File", desc: "Drag and drop your QFX, OFX, or QBO file onto the converter." },
                            { step: 2, title: "Add More Files (Optional)", desc: "Upload additional files if you need to convert multiple statements." },
                            { step: 3, title: "Click Convert", desc: "Press 'Convert All to CSV' or convert individual files." },
                            { step: 4, title: "Download CSV", desc: "Your browser automatically downloads the converted CSV file." },
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
                        Who Uses This QFX to CSV Converter?
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

            {/* Common Use Cases Section */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Common Use Cases for QFX to CSV Converter
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

            {/* Comparison Table - Best Free QFX to CSV Converter */}
            <section className="py-12 md:py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Best Free QFX to CSV Converter (No Upload)
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Compare our free tool to other QFX converters
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
                                    { feature: "Price", us: "Free forever", competitors: "$10-30 per file" },
                                    { feature: "File Upload", us: "None (browser only)", competitors: "Uploads to servers" },
                                    { feature: "Multi-Format", us: "QFX, OFX, QBO", competitors: "Usually one format" },
                                    { feature: "Batch Convert", us: "Multiple files at once", competitors: "One at a time" },
                                    { feature: "Excel Compatible", us: "Perfect CSV output", competitors: "Sometimes broken" },
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

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        The Best Free QFX to CSV Converter in 2026
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Need to <strong>convert QFX to CSV</strong> for use in Excel or Google Sheets? Our free <strong>online QFX to CSV converter</strong> transforms Quicken QFX files into standard CSV spreadsheets in seconds. Unlike other tools, it runs <strong>entirely in your browser</strong> - your financial data never leaves your device.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        What is a QFX File?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>QFX (Quicken Financial Exchange)</strong> is Intuit's proprietary financial file format used by Quicken personal finance software. Banks provide QFX downloads for importing transactions into Quicken. It's based on the Open Financial Exchange (OFX) standard with additional Quicken-specific headers.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        QFX File Structure and Key Tags
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>&lt;INTU.BID&gt;:</strong> Intuit's unique bank identifier</li>
                        <li><strong>&lt;INTU.USERID&gt;:</strong> User identification for Quicken</li>
                        <li><strong>&lt;STMTTRN&gt;:</strong> Transaction container with all transaction data</li>
                        <li><strong>&lt;TRNTYPE&gt;:</strong> Transaction type (DEBIT, CREDIT, CHECK, DEP)</li>
                        <li><strong>&lt;DTPOSTED&gt;:</strong> Transaction date in YYYYMMDD format</li>
                        <li><strong>&lt;TRNAMT&gt;:</strong> Transaction amount (positive/negative)</li>
                        <li><strong>&lt;FITID&gt;:</strong> Unique transaction identifier</li>
                        <li><strong>&lt;NAME&gt;:</strong> Payee or merchant name</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        What Data is Extracted to CSV?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        The converter extracts all transaction data from your QFX file:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>Date:</strong> Transaction date in YYYY-MM-DD format</li>
                        <li><strong>Amount:</strong> Transaction amount (positive for credits, negative for debits)</li>
                        <li><strong>Name:</strong> Payee or merchant name</li>
                        <li><strong>Memo:</strong> Additional description or notes</li>
                        <li><strong>Type:</strong> DEBIT, CREDIT, CHECK, etc.</li>
                        <li><strong>Check Number:</strong> If applicable</li>
                        <li><strong>Reference:</strong> Unique transaction ID</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Convert QFX to CSV?
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>Universal Format:</strong> CSV opens in any spreadsheet application.</li>
                        <li><strong>Easy Analysis:</strong> Sort, filter, and analyze transactions in Excel.</li>
                        <li><strong>Import Anywhere:</strong> Many accounting apps accept CSV imports.</li>
                        <li><strong>Data Backup:</strong> Store transaction history in a readable format.</li>
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
                            { q: "What is the best QFX to CSV converter in 2026?", a: "Statement Extract offers the best free QFX to CSV converter. It's instant, private, and produces clean Excel-compatible output." },
                            { q: "Is the CSV compatible with Excel?", a: "Yes! The output CSV opens directly in Microsoft Excel, Google Sheets, LibreOffice Calc, and any other spreadsheet software." },
                            { q: "Can I convert OFX files too?", a: "Yes, both OFX and QBO files work with this converter since they share the same underlying structure as QFX." },
                            { q: "Is there a file size limit?", a: "No practical limit. Files are processed in your browser, so even large statements with thousands of transactions convert quickly." },
                            { q: "Do I need to install software?", a: "No installation needed. Everything runs in your web browser." },
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
                    <PageMeta lastUpdated="January 2026" />
                </div>
            </section>

            <ToolPageFooter
                currentTool="QFX to CSV"
                relatedTools={relatedTools}
            />
        </main>
    );
}
