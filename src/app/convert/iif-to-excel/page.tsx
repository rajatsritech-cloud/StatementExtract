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
    FileText
} from "lucide-react";

export const metadata: Metadata = {
    title: "IIF to Excel Converter Free Online | Convert QuickBooks IIF to XLSX",
    description: "Free IIF to Excel converter. Turn Intuit Interchange Format (IIF) files into editable Excel spreadsheets instantly. View and edit QuickBooks data without software.",
    keywords: "iif to excel, convert iif to excel, iif file viewer, quickbooks to excel, convert iif file, view iif file",
    openGraph: {
        title: "IIF to Excel Converter Free Online | QuickBooks to XLSX",
        description: "Convert IIF Intuit files to Excel spreadsheets instantly and securely.",
        type: "website",
        url: "https://statementextract.com/convert-iif-to-excel",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"]
    },
    alternates: {
        canonical: "https://statementextract.com/convert-iif-to-excel/"
    }
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "IIF to Excel Converter by Statement Extract",
    "description": "Convert QuickBooks IIF files to Excel or CSV. View and edit IIF data easily without QuickBooks.",
    "url": "https://statementextract.com/convert/iif-to-excel",
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
        "IIF to Excel conversion",
        "QuickBooks data viewer",
        "Error checking",
        "Secure client-side processing",
        "Compatible with all IIF versions"
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
            "name": "What is an IIF file?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "IIF stands for Intuit Interchange Format. It is a legacy text file format used by QuickBooks Desktop to import and export lists and transactions."
            }
        },
        {
            "@type": "Question",
            "name": "How do I open an IIF file in Excel?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Excel can open text files, but the formatting is messy. Our tool parses the specific IIF structure (TRNS/SPL blocks) and converts it into a clean, columnar Excel spreadsheet."
            }
        },
        {
            "@type": "Question",
            "name": "Is it safe to upload my IIF files?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Our tool processes files locally in your browser using JavaScript. Your financial data is never sent to our servers or stored anywhere."
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
        { "@type": "ListItem", "position": 3, "name": "IIF to Excel", "item": "https://statementextract.com/convert/iif-to-excel" }
    ]
};

const relatedTools = [
    { href: "/convert/csv-to-iif", title: "CSV to IIF" },
    { href: "/convert/qfx-to-excel", title: "QFX to Excel" },
    { href: "/convert/qif-to-excel", title: "QIF to Excel" },
    { href: "/convert/qbo-to-csv", title: "QBO to CSV" },
    { href: "/convert/csv-to-qbo", title: "CSV to QBO" },
    { href: "/convert-bank-statement-to-csv-excel", title: "Bank Statement Converter" },
];

export default function IifToExcelPage() {
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
                        View and Edit IIF Files in Excel
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: FileSpreadsheet, title: "Clean Format", desc: "Converts crazy IIF text blocks into simple rows: Date, Name, Amount, Memo." },
                            { icon: Lock, title: "100% Private", desc: "Browser-based processing. No data upload, no cloud storage." },
                            { icon: Zap, title: "Instant View", desc: "See what's inside a QuickBooks IIF file without opening QuickBooks." },
                            { icon: CheckCircle, title: "Accuracy First", desc: "Correctly maps TRNS and SPL lines to transactions." },
                            { icon: Globe, title: "Cross-Platform", desc: "Works on Mac, Windows, and Linux. No plugins needed." },
                            { icon: Users, title: "For Accountants", desc: "Quickly review client data imports before loading them into QuickBooks." },
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
                        Understanding IIF Files
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>IIF (Intuit Interchange Format)</strong> is an older, text-based file format used by QuickBooks Desktop. While Intuit now prefers the IIF Import Kit or more advanced formats, many legacy systems and payroll providers still export data as IIF.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        The problem is that IIF files are just plain text with tab delimiters. They are hard to read and easy to break. Converting them to Excel allows you to:
                    </p>
                    <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-8 space-y-2">
                        <li><strong>Verify Data:</strong> Check transaction dates and amounts before importing.</li>
                        <li><strong>Clean Up Errors:</strong> Fix typos or wrong accounts in Excel, then re-save (if you have a converter back to IIF).</li>
                        <li><strong>Archive Data:</strong> Save financial history in a readable format independent of QuickBooks.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6 mt-12">
                        Common Uses for IIF to Excel
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4 not-prose mb-8">
                        <div className="p-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl">
                            <h4 className="font-bold mb-1 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-orange-500" /> Payroll Imports
                            </h4>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Verify payroll journal entries from third-party payroll providers before hitting "Import".</p>
                        </div>
                        <div className="p-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl">
                            <h4 className="font-bold mb-1 flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-purple-500" /> Legacy Data
                            </h4>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Extract data from old accounting backups that use IIF format.</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6 mt-12">
                        Troubleshooting IIF Files
                    </h2>
                    <div className="space-y-6 mb-8">
                        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5">
                            <h4 className="font-bold text-[hsl(var(--foreground))] mb-2">Issue: "QuickBooks Warning: Import at your own risk"</h4>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                QuickBooks Desktop often warns that IIF imports can corrupt data. <strong>Recommendation:</strong> Always convert to Excel first to visually verify that the `ACCT` (Account) and `AMOUNT` fields match your expectations.
                            </p>
                        </div>
                        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5">
                            <h4 className="font-bold text-[hsl(var(--foreground))] mb-2">Issue: Columns Misaligned</h4>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                Opening an IIF in Excel directly relies on Tab delimiters, which can break if descriptions contain tabs. Our converter parses the file strictly by its `!TRNS` and `!SPL` headers to ensure alignment.
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
                        Your IIF Data Stays Private
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto mb-6">
                        We understand that IIF files often contain sensitive payroll or general ledger data. <strong>Statement Extract processes everything locally in your browser</strong>. We do not upload your files, meaning we technically cannot see your data even if we wanted to.
                    </p>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-12 md:py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        IIF Viewer Comparison
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]/10">
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--foreground))]">Feature</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--primary))]">Statement Extract</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--muted-foreground))]">Excel Direct Open</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: "Data Parsing", us: "Intelligent (TRNS mapping)", competitors: "Dumb (Tabs only)" },
                                    { feature: "Transaction Logic", us: "Validates Dates & Amounts", competitors: "None" },
                                    { feature: "Formatting", us: "Clean XLSX Headers", competitors: "Raw Text" },
                                    { feature: "Privacy", us: "100% Local", competitors: "N/A (Local App)" },
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

            <section className="py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <PageMeta lastUpdated="January 2026" />
                </div>
            </section>

            <ToolPageFooter
                currentTool="IIF to Excel"
                relatedTools={relatedTools}
            />
        </main>
    );
}
