import { Metadata } from "next";
import { CsvToIifTool } from "@/components/tools/CsvToIifTool";
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
    Briefcase,
    FileText
} from "lucide-react";

export const metadata: Metadata = {
    title: "CSV to IIF Converter Free Online | Excel to QuickBooks Import",
    description: "Convert CSV and Excel files to QuickBooks IIF format free. Map columns and import transactions to QuickBooks Desktop instantly. Secure & Private.",
    keywords: "csv to iif, convert csv to iif, excel to iif, quickbooks import, iif converter, csv to quickbooks, import transactions to quickbooks",
    openGraph: {
        title: "CSV to IIF Converter Free Online | Excel to QuickBooks",
        description: "Convert CSV/Excel files to QuickBooks IIF format instantly and securely.",
        type: "website",
        url: "https://statementextract.com/convert/csv-to-iif",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"],
    },
    alternates: {
        canonical: "https://statementextract.com/convert/csv-to-iif/",
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CSV to IIF Converter by Statement Extract",
    "description": "Convert CSV files to QuickBooks IIF format. Map columns and import bank transactions into QuickBooks Desktop.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1140"
    },
    "featureList": [
        "CSV to IIF conversion",
        "Custom column mapping",
        "QuickBooks import ready",
        "Auto-date formatting",
        "Secure local processing"
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I convert CSV to IIF for QuickBooks?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Upload your CSV file, map the columns (Date, Amount, Payee) to the IIF fields using our interactive tool, and download the formatted .iif file ready for QuickBooks Desktop import."
            }
        },
        {
            "@type": "Question",
            "name": "Can I import Excel files to QuickBooks Desktop?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Save your Excel file as a CSV first, then use our tool to convert that CSV into the IIF format that QuickBooks Desktop requires."
            }
        },
        {
            "@type": "Question",
            "name": "Is this tool free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our CSV to IIF converter is 100% free with no usage limits."
            }
        },
        {
            "@type": "Question",
            "name": "What data formatting does it handle?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "It automatically handles date formats (e.g. converting 12/31/23 to QuickBooks format) and cleans up currency symbols ($1,200.00 -> 1200.00) to prevent import errors."
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
        { "@type": "ListItem", "position": 3, "name": "CSV to IIF" }
    ]
};

const whoIsThisFor = [
    { icon: Building2, title: "Business Owners", desc: "Import bank transactions that don't support direct QuickBooks feeds." },
    { icon: Users, title: "Accountants", desc: "Bulk import client data from Excel statements into QuickBooks Desktop." },
    { icon: FileText, title: "Payroll Managers", desc: "Import payroll data from third-party systems into QuickBooks registers." },
    { icon: Briefcase, title: "Bookkeepers", desc: "Clean up historical data in Excel before importing to QuickBooks." },
];

const useCases = [
    { title: "Bank Feed Alternative", desc: "Import transactions for banks that don't connect to QuickBooks Desktop." },
    { title: "PayPal/Stripe Imports", desc: "Convert payment processor CSV exports into importable IIF files." },
    { title: "Data Repair", desc: "Fix transaction errors in Excel first, then import the clean data." },
    { title: "Historical Data", desc: "Import years of past transactions that bank feeds can't retrieve." },
    { title: "Non-Financial Data", desc: "Import lists of customers or vendors (advanced usage)." },
    { title: "Migration", desc: "Move data from other accounting software into QuickBooks via Excel export." },
];

const relatedTools = [
    { href: "/convert/iif-to-excel", title: "IIF to Excel" },
    { href: "/convert/csv-to-qbo", title: "CSV to QBO" },
    { href: "/convert/qif-to-csv", title: "QIF to CSV" },
    { href: "/convert/qfx-to-excel", title: "QFX to Excel" },
    { href: "/tools/invoice-generator", title: "Free Invoice Generator" },
    { href: "/convert-bank-statement-to-csv-excel", title: "Bank Statement Converter" },
];

export default function CsvToIifPage() {
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
                <CsvToIifTool />
            </section>

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our CSV to IIF Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Lock, title: "100% Private", desc: "Files never leave your device. Browser-based processing." },
                            { icon: FileSpreadsheet, title: "Easy Mapping", desc: "Interactive column mapper. Match 'Date', 'Amount', 'Payee' easily." },
                            { icon: Zap, title: "Instant Conversion", desc: "No uploads required. Generate IIF files in milliseconds." },
                            { icon: CheckCircle, title: "Error Free", desc: "Auto-formats dates and numbers to prevent QuickBooks import errors." },
                            { icon: Globe, title: "Universal Support", desc: "Works with CSVs from any bank, PayPal, Stripe, or manual Excel sheets." },
                            { icon: Shield, title: "No Signup", desc: "No email or account needed. Completely free to use." },
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
                        How to Convert CSV to IIF
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Prepare Your CSV", desc: "Save your Excel file as CSV. Ensure it has headers like Date, Amount, Description." },
                            { step: 2, title: "Upload & Map", desc: "Upload the CSV. Use the dropdowns to match your CSV columns to IIF fields." },
                            { step: 3, title: "Download IIF", desc: "Click 'Convert'. We generate a properly formatted .iif file." },
                            { step: 4, title: "Import to QuickBooks", desc: "In QuickBooks, go to File > Utilities > Import > IIF Files." },
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



            <section className="py-12 md:py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Who Uses This CSV to IIF Converter?
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

            {/* Comparison Table */}
            <section className="py-12 md:py-16 px-4 bg-[hsl(var(--muted))]/30 border-t border-[hsl(var(--border))]">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Best Free CSV to IIF Converter
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Why choose Statement Extract?
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]/10">
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--foreground))]">Feature</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--primary))]">Statement Extract</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--muted-foreground))]">Competitors</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: "Price", us: "Free forever", competitors: "$19/mo or $50+" },
                                    { feature: "Privacy", us: "100% Browser-Based", competitors: "Cloud Upload (Risky)" },
                                    { feature: "Mapping", us: "Visual Column Mapper", competitors: "Strict Templates Only" },
                                    { feature: "Date Parsing", us: "Auto-Detect Format", competitors: "Must be exact" },
                                    { feature: "Speed", us: "Instant", competitors: "Queue times" },
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

            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        Why Use IIF Files?
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        While <strong>QuickBooks Desktop</strong> supports newer formats like QBO (Web Connect), the <strong>IIF (Intuit Interchange Format)</strong> remains a powerful "backdoor" to import data directly into your company file lists and registers.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        It's the file format of choice when:
                    </p>
                    <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-8 space-y-2">
                        <li>You need to import historical data (older than 90 days).</li>
                        <li>Your bank doesn't support QuickBooks Web Connect.</li>
                        <li>You want to bulk import expenses from a spreadsheet where you've already done the coding.</li>
                        <li>You are migrating data from another accounting system.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6 mt-12">
                        How It Works
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Our tool acts as a bridge. It reads your unstructured CSV data, asks you to identify the key columns (Date, Amount, etc.), and then constructs the rigorous `!TRNS` and `!SPL` blocks that QuickBooks requires.
                    </p>
                    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-4 mb-6 font-mono text-xs md:text-sm overflow-x-auto text-[hsl(var(--muted-foreground))]">
                        <p>!TRNS <span className="text-green-500">// Transaction Header</span></p>
                        <p>DATE	ACCNT	NAME	AMOUNT	MEMO</p>
                        <p>01/15/2024	Checking	Staples	-45.20	Office Supplies</p>
                        <p>!SPL <span className="text-green-500">// Split Line (The other side of the entry)</span></p>
                        <p>DATE	ACCNT	NAME	AMOUNT	MEMO</p>
                        <p>01/15/2024	Office Expense		45.20	</p>
                        <p>!ENDTRNS</p>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            { q: "Do I need to backup my QuickBooks file?", a: "YES. IIF imports write directly to your database and cannot be undone properly. Always create a backup of your company file before importing any IIF." },
                            { q: "What Excel date formats are supported?", a: "We support most common formats (MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD). If you have issues, try standardizing the date column in Excel before uploading." },
                            { q: "Does this work with QuickBooks Online?", a: "No. QuickBooks Online (QBO) uses CSV or QBO files differently. This tool is specifically for QuickBooks Desktop (Pro, Premier, Enterprise) IIF imports." },
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
                currentTool="CSV to IIF"
                relatedTools={relatedTools}
            />
        </main>
    );
}
