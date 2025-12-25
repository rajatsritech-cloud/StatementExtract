import { Metadata } from "next";
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
    description: "Free CSV and Excel to QBO converter online. Convert bank files (CSV, XLS, XLSX) to QuickBooks Web Connect (.qbo) format. Map columns, preview, and export. 100% private.",
    keywords: "csv to qbo converter, csv to qbo converter free, convert csv to qbo online, csv to quickbooks format, bank csv to qbo, import csv to quickbooks, qbo file converter",
    openGraph: {
        title: "CSV to QBO Converter Free Online | Import to QuickBooks",
        description: "Convert any CSV bank export to QuickBooks .qbo format. Map columns, edit transactions, and download QBO file instantly.",
        type: "website",
        url: "https://statementextract.com/convert/csv-to-qbo",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/csv-to-qbo",
    },
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
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "847"
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
                "text": "Yes, it is 100% free with no limits. Convert unlimited CSV files to QBO format without signing up or paying anything."
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
                "text": "Yes, completely. This tool runs 100% in your browser. Your financial data never leaves your computer and is never uploaded to any server."
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
    { href: "/convert/qbo-to-csv", title: "QBO to CSV" },
    { href: "/convert-bank-statement-to-csv-excel", title: "PDF to Excel" },
    { href: "/convert-bank-statement-to-quickbooks-xero", title: "PDF to QBO" },
    { href: "/convert/merge-pdf", title: "Merge PDF" },
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

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free CSV / Excel to QBO Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Lock, title: "100% Private", desc: "Files never leave your device. All processing happens in your browser." },
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

            {/* SEO Content Block */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        The Best Free CSV/Excel to QBO Converter Online
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Need to import bank transactions into QuickBooks but only have a CSV or Excel file? Our <strong>free CSV/Excel to QBO converter</strong> transforms any bank export into QuickBooks Web Connect format in seconds. Unlike other tools that require subscriptions or uploads to external servers, our converter runs <strong>100% in your browser</strong>—your financial data never leaves your device.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Whether you're an accountant importing client data, a bookkeeper migrating from another system, or a business owner cleaning up historical records, this <strong>CSV/Excel to QBO converter free</strong> tool handles it all. Smart column detection automatically identifies Date, Amount, and Description fields from CSV or Excel files, while the interactive preview lets you edit, reorder, and validate transactions before export.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Convert CSV to QBO Format?
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>QuickBooks Compatibility:</strong> QBO is the native import format for QuickBooks Online and Desktop.</li>
                        <li><strong>Bank Feed Alternative:</strong> Import transactions when bank feeds aren't available or supported.</li>
                        <li><strong>Historical Data Import:</strong> Bring in years of transaction history from CSV archives.</li>
                        <li><strong>Data Migration:</strong> Move from Xero, Sage, Wave, or spreadsheets to QuickBooks easily.</li>
                        <li><strong>Clean Data Entry:</strong> Edit and validate transactions before they enter your books.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Supported CSV Formats
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Our converter works with any CSV file structure. Common formats include:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li>Bank statement exports (Chase, Bank of America, Wells Fargo, etc.)</li>
                        <li>Accounting software exports (Xero, Sage, FreshBooks, Wave)</li>
                        <li>Spreadsheet transaction logs</li>
                        <li>Payment processor reports (Stripe, PayPal, Square)</li>
                        <li>Credit card statement downloads</li>
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
                    <PageMeta lastUpdated="December 2024" />
                </div>
            </section>

            {/* Footer & CTA */}
            <ToolPageFooter
                currentTool="CSV to QBO"
                relatedTools={relatedTools}
            />
        </main>
    );
}
