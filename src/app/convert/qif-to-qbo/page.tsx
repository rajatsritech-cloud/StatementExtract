import { Metadata } from "next";
import { QifToQboTool } from "@/components/qbo-tools/QifToQboTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import {
    Zap,
    Shield,
    Globe,
    FileText,
    CheckCircle,
    Database,
    Lock,
    ArrowUpDown,
    FileCode
} from "lucide-react";

export const metadata: Metadata = {
    title: "QIF to QBO Converter Free Online | Quicken to QuickBooks | Statement Extract",
    description: "Free QIF to QBO converter online. Convert Quicken Interchange Format (.qif) files to QuickBooks Web Connect (.qbo) format instantly. 100% private, no upload required.",
    keywords: "qif to qbo converter, qif to qbo converter free, convert qif to qbo online, quicken to quickbooks converter, import qif into quickbooks, qif file converter, quicken qif to qbo",
    openGraph: {
        title: "QIF to QBO Converter Free Online | Quicken to QuickBooks",
        description: "Convert Quicken QIF files to QuickBooks QBO format online. Free, instant, 100% private - no data upload required.",
        type: "website",
        url: "https://statementextract.com/convert/qif-to-qbo",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/qif-to-qbo",
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "QIF to QBO Converter",
    "description": "Convert Quicken QIF files to QuickBooks Web Connect (.qbo) format online for free.",
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
        "ratingCount": "423"
    }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I convert a QIF file to QBO format?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply upload your QIF file, review the parsed transactions, edit if needed, then click Export to download a QuickBooks-compatible QBO file."
            }
        },
        {
            "@type": "Question",
            "name": "What is a QIF file?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "QIF (Quicken Interchange Format) is a text-based file format used by Quicken and other financial software to exchange transaction data. It contains dates, amounts, payees, and memos."
            }
        },
        {
            "@type": "Question",
            "name": "Is my financial data secure?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, completely. This tool runs 100% in your browser. Your QIF file is never uploaded to any server - all processing happens locally on your device."
            }
        },
        {
            "@type": "Question",
            "name": "Can I import the QBO file into QuickBooks Online?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! The QBO file format works with both QuickBooks Online and QuickBooks Desktop (Pro, Premier, Enterprise)."
            }
        },
        {
            "@type": "Question",
            "name": "What Quicken versions are supported?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our converter supports QIF files from all Quicken versions including Quicken Deluxe, Premier, Home & Business, and older legacy versions."
            }
        }
    ]
};

const useCases = [
    { title: "Migrate from Quicken to QuickBooks", desc: "Moving from Quicken? Export to QIF, convert to QBO, and import directly into QuickBooks." },
    { title: "Import Legacy Financial Data", desc: "Have old QIF exports? Convert them to QuickBooks format for historical record keeping." },
    { title: "Cross-Platform Data Transfer", desc: "Transfer transactions between different financial software via the universal QIF format." },
    { title: "Clean Up Before Import", desc: "Review and edit transactions before importing to ensure clean, accurate books." },
];

const relatedTools = [
    { href: "/convert/qfx-to-pdf", title: "QFX to PDF" },
    { href: "/convert/csv-to-qbo", title: "CSV to QBO" },
    { href: "/convert/qbo-to-csv", title: "QBO to CSV" },
    { href: "/convert-bank-statement-to-quickbooks-xero", title: "PDF to QBO" },
];

export default function QifToQboPage() {
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

            {/* Tool Section - Visible Above the Fold */}
            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <QifToQboTool />
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free QIF to QBO Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Lock, title: "100% Private", desc: "Files never leave your device. All processing happens locally in your browser." },
                            { icon: FileCode, title: "Full QIF Support", desc: "Parses all QIF fields: dates, amounts, payees, memos, check numbers." },
                            { icon: Zap, title: "Instant Conversion", desc: "No uploads, no waiting. Convert QIF to QBO in seconds." },
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
                        How to Convert QIF to QBO Online
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Upload Your QIF File", desc: "Drag and drop or click to select your Quicken QIF file." },
                            { step: 2, title: "Review Transactions", desc: "The parser extracts all transactions with dates, amounts, payees, and memos." },
                            { step: 3, title: "Edit If Needed", desc: "Click any cell to edit values. Delete or reorder transactions as needed." },
                            { step: 4, title: "Download QBO File", desc: "Enter account details, click Export, and import your QBO file into QuickBooks." },
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
                        The Best Free QIF to QBO Converter Online
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Switching from Quicken to QuickBooks? Our <strong>free QIF to QBO converter</strong> makes the transition seamless. Just upload your Quicken QIF file, review the parsed transactions, and download a QuickBooks-ready QBO file in seconds. Unlike other tools, our converter runs <strong>100% in your browser</strong>—your financial data never leaves your device.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Whether you're migrating years of financial history, importing legacy data, or simply need to move transactions between Quicken and QuickBooks, this <strong>QIF to QBO converter free</strong> tool handles it all. Our parser supports all standard QIF fields including dates, amounts, payees, memos, and check numbers.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        What is QIF Format?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        QIF (Quicken Interchange Format) is a plain-text file format developed by Intuit for Quicken software. It stores financial transactions with line prefixes:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>D</strong> – Date of transaction</li>
                        <li><strong>T</strong> – Transaction amount</li>
                        <li><strong>P</strong> – Payee name</li>
                        <li><strong>M</strong> – Memo/description</li>
                        <li><strong>N</strong> – Check number</li>
                        <li><strong>^</strong> – End of transaction</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Convert QIF to QBO?
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>QuickBooks Compatibility:</strong> QBO is the native import format for QuickBooks Online and Desktop.</li>
                        <li><strong>Migration Path:</strong> Easily move from Quicken to QuickBooks without losing transaction history.</li>
                        <li><strong>Data Validation:</strong> Review and edit transactions before they enter your books.</li>
                        <li><strong>Universal Format:</strong> QBO files work across all QuickBooks versions.</li>
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
                            { q: "Which Quicken versions export QIF?", a: "All Quicken versions can export to QIF format. Go to File > Export > QIF in Quicken to create the file." },
                            { q: "What date formats are supported?", a: "We support M/D/YY, MM/DD/YYYY, D-MMM-YY, and other common date formats used by Quicken." },
                            { q: "Can I convert investment transactions?", a: "This tool is optimized for banking/checking transactions. Investment QIF files may have limited support." },
                            { q: "Is there a transaction limit?", a: "No limits. Convert hundreds or thousands of transactions in a single file, completely free." },
                            { q: "Will my credit card transactions import correctly?", a: "Yes! The converter auto-detects credit card accounts from the QIF header and sets the appropriate account type." },
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{faq.q}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer & CTA */}
            <ToolPageFooter
                currentTool="QIF to QBO"
                relatedTools={relatedTools}
            />
        </main>
    );
}
