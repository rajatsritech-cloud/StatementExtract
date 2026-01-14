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
    Briefcase
} from "lucide-react";

export const metadata: Metadata = {
    title: "QIF to Excel Converter Free Online | Quicken Interface Format to XLSX",
    description: "Convert QIF files to Excel online. Free Quicken Interface Format converter. Extract transactions from legacy QIF files to clean Excel spreadsheets.",
    keywords: "qif to excel, qif converter, convert qif file to excel, quicken interface format, qif to xlsx, convert qif",
    openGraph: {
        title: "QIF to Excel Converter Free Online | Legacy Quicken to XLSX",
        description: "Convert old QIF files to modern Excel spreadsheets instantly.",
        type: "website",
        url: "https://statementextract.com/convert/qif-to-excel",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"]
    },
    alternates: {
        canonical: "https://statementextract.com/convert/qif-to-excel/"
    }
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "QIF to Excel Converter by Statement Extract",
    "description": "Convert QIF files to Excel/CSV instantly in your browser. Supports all date formats and financial data types.",
    "url": "https://statementextract.com/convert/qif-to-excel",
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
        "QIF to Excel conversion",
        "Smart date parsing",
        "Secure local processing",
        "Support for Quicken formats",
        "Free to use"
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
            "name": "How converts QIF to Excel?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our tool reads the text-based QIF format, identifies transaction blocks (starting with 'D' for date, 'T' for amount, etc.), and exports them into a structured Excel table."
            }
        },
        {
            "@type": "Question",
            "name": "Do I need Quicken to use this?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. This tool is completely standalone. You can convert QIF files exported from any software (Money, Quicken, YNAB) without having the original program installed."
            }
        },
        {
            "@type": "Question",
            "name": "Can I convert QIF dates correctly?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. QIF files often have tricky date formats. Our smart parser attempts to normalize them into standard Excel date columns automatically."
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
        { "@type": "ListItem", "position": 3, "name": "QIF to Excel", "item": "https://statementextract.com/convert/qif-to-excel" }
    ]
};

const relatedTools = [
    { href: "/convert/ofx-to-excel", title: "OFX to Excel" },
    { href: "/convert/qfx-to-excel", title: "QFX to Excel" },
    { href: "/convert/iif-to-excel", title: "IIF to Excel" },
    { href: "/convert/csv-to-iif", title: "CSV to IIF" },
    { href: "/convert/qif-to-csv", title: "QIF to CSV" },
    { href: "/convert/csv-to-qbo", title: "CSV to QBO" },
    { href: "/tools/ofx-viewer", title: "OFX Viewer" },
    { href: "/convert-bank-statement-to-csv-excel", title: "PDF to Excel" },
];

export default function QifToExcelPage() {
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

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Modernize Your Legacy Data: QIF to Excel
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: FileSpreadsheet, title: "Modern Excel Output", desc: "Turn old text-based QIF files into modern, sortable XLSX spreadsheets." },
                            { icon: Zap, title: "Instant Parsing", desc: "Reads thousands of QIF lines in milliseconds right in your browser." },
                            { icon: Lock, title: "100% Private", desc: "Your financial history never leaves your computer." },
                            { icon: CheckCircle, title: "Smart Formatting", desc: "Auto-detects transaction fields like Payee, Memo, and Category." },
                            { icon: Users, title: "Universal Support", desc: "Works with QIF files from Quicken, MS Money, and other legacy apps." },
                            { icon: Globe, title: "No Dependencies", desc: "You don't need to buy or install Quicken to access your data." },
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
                        Why Convert QIF to Excel?
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        The <strong>Quicken Interchange Format (QIF)</strong> is an older file standard that many modern banks have stopped supporting. However, millions of users still have archives of data in this format, or use legacy software that exports only to QIF.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Our <strong>QIF to Excel Converter</strong> bridges the gap between old data and modern analysis:
                    </p>
                    <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-8 space-y-2">
                        <li><strong>Data Migration:</strong> Move your history from MS Money or old Quicken versions to a simple spreadsheet.</li>
                        <li><strong>Category Analysis:</strong> QIF files often contain valuable categorization data ('L' lines) which we preserve in the conversion.</li>
                        <li><strong>Cleanup:</strong> Fix errors in your data using Excel's find-and-replace before importing elsewhere.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Understanding QIF Fields
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        QIF files use single-letter codes. We translate these for you:
                    </p>
                    <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-8 space-y-2">
                        <li><strong>D (Date)</strong> → Converted to Excel Date Column</li>
                        <li><strong>T (Amount)</strong> → Converted to Number (Credits/Debits)</li>
                        <li><strong>P (Payee)</strong> → The 'Description' or 'Name' field</li>
                        <li><strong>L (Category)</strong> → Mapped to 'Type' or 'Category' in Excel</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6 mt-12">
                        Deep Dive: The QIF File Format
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        The <strong>Quicken Interchange Format (QIF)</strong> is a legacy text-based specification developed by Intuit. While now largely superseded by OFX/QFX, it remains critical for retrieving historical data from older software versions (pre-2005).
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        QIF files are simple text files where each line represents a field, identified by a standardized single-letter prefix.
                    </p>
                    <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-3">
                        Anatomy of a QIF Transaction
                    </h3>
                    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-4 mb-6 font-mono text-xs md:text-sm overflow-x-auto text-[hsl(var(--muted-foreground))]">
                        <p>!Type:Bank</p>
                        <p>D01/15/2024 <span className="text-green-500">// Date</span></p>
                        <p>T-45.00 <span className="text-green-500">// Amount</span></p>
                        <p>PStarbucks <span className="text-green-500">// Payee</span></p>
                        <p>LCoffee:Dining <span className="text-green-500">// Category</span></p>
                        <p>^ <span className="text-green-500">// End of Record</span></p>
                    </div>
                    <p className="text-[hsl(var(--muted-foreground))] mb-8">
                        Our converter parses these codes specifically, handling common variations in date formats (DD/MM vs MM/DD) that often cause other tools to fail.
                    </p>

                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6 mt-12">
                        Common QIF Import Problems Solved
                    </h2>
                    <div className="space-y-6 mb-8">
                        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5">
                            <h4 className="font-bold text-[hsl(var(--foreground))] mb-2">Issue: "Dates are swapped (12th of Jan becomes 1st of Dec)"</h4>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                QIF files don't specify their date format. <strong>Solution:</strong> We use smart heuristics to detect if the file uses US (MM/DD) or International (DD/MM) dates based on value ranges.
                            </p>
                        </div>
                        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5">
                            <h4 className="font-bold text-[hsl(var(--foreground))] mb-2">Issue: "All transactions are in one column"</h4>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                Opening a .qif file in Excel directly puts everything in Column A. <strong>Solution:</strong> Our tool parses the file logic and outputs a true multi-column .xlsx file.
                            </p>
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
                        Unlike other converters that upload your files to a server, <strong>Statement Extract processes everything locally in your browser</strong>. Your QIF files never leave your computer, ensuring 100% data security.
                    </p>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-12 md:py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        QIF to Excel Converter Comparison
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
                                    { feature: "Security", us: "100% Browser-Based", competitors: "Server Upload (Risky)" },
                                    { feature: "Cost", us: "Free Forever", competitors: "Paid / Freemium" },
                                    { feature: "Split Transactions", us: "Flattened Output", competitors: "Often Broken" },
                                    { feature: "Date Parsing", us: "Smart Auto-Detect", competitors: "Often Fails" },
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
                            { q: "Can I open the output in Google Sheets?", a: "Yes. The downloaded .xlsx file works perfectly in Microsoft Excel, Google Sheets, Apple Numbers, and LibreOffice." },
                            { q: "Does this handle splits?", a: "Currently, our tool flattens split transactions into the main transaction line for simplicity. We are working on advanced split support." },
                            { q: "Is there a file size limit?", a: "No. Since processing is local to your device, you are only limited by your browser's memory, which is usually huge." },
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
                currentTool="QIF to Excel"
                relatedTools={relatedTools}
            />
        </main>
    );
}
