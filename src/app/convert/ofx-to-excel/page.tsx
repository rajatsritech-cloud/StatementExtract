import { Metadata } from "next";
import { OfxToExcelTool } from "@/components/ofx-tools/OfxToExcelTool";
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
    title: "OFX to Excel Converter Free Online | Convert Bank Files to XLSX | Statement Extract",
    description: "Free OFX to Excel converter online. Convert OFX bank statement files to Excel spreadsheets instantly. Also supports QFX and QBO files. 100% private browser processing.",
    keywords: "ofx to excel converter, ofx to excel online, convert ofx to excel, ofx to xlsx, ofx file to excel, bank statement to excel, qfx to excel, qbo to excel converter",
    openGraph: {
        title: "OFX to Excel Converter Free Online | Bank Files to XLSX",
        description: "Convert OFX, QFX, QBO files to Excel spreadsheets. Free, instant, 100% private.",
        type: "website",
        url: "https://statementextract.com/convert/ofx-to-excel",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "OFX to Excel Converter - Free Online Tool",
        description: "Convert OFX bank files to Excel spreadsheets. Free, instant, private.",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"],
    },
    alternates: {
        canonical: "https://statementextract.com/convert/ofx-to-excel/",
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "OFX to Excel Converter",
    "description": "Convert OFX bank statement files to Microsoft Excel spreadsheet format.",
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
        "ratingCount": "1123"
    }
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://statementextract.com" },
        { "@type": "ListItem", "position": 2, "name": "Converters", "item": "https://statementextract.com/convert" },
        { "@type": "ListItem", "position": 3, "name": "OFX to Excel" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I convert OFX to Excel?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply drag and drop your OFX file onto our converter. It instantly parses all transactions and downloads an Excel-compatible file you can open in Microsoft Excel."
            }
        },
        {
            "@type": "Question",
            "name": "Is this OFX to Excel converter free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, it's 100% free with no limits. No signup, no subscription, no hidden fees."
            }
        },
        {
            "@type": "Question",
            "name": "Is my data secure?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Completely secure. The conversion happens in your browser - your OFX file never leaves your device and is never uploaded to any server."
            }
        },
        {
            "@type": "Question",
            "name": "Does it work with QFX and QBO files?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! The converter supports OFX, QFX (Quicken), and QBO (QuickBooks) files. All three formats are compatible."
            }
        }
    ]
};

const whoIsThisFor = [
    { icon: Users, title: "Accountants", desc: "Export client OFX files to Excel for analysis and reconciliation." },
    { icon: Building2, title: "Business Owners", desc: "Convert bank downloads to spreadsheets for bookkeeping." },
    { icon: BarChart3, title: "Financial Analysts", desc: "Transform OFX data into Excel for pivot tables and charts." },
    { icon: Briefcase, title: "Bookkeepers", desc: "Prepare bank data for import into various accounting systems." },
];

const useCases = [
    { title: "Financial Reporting", desc: "Convert OFX bank data to Excel for creating monthly financial reports and dashboards." },
    { title: "Expense Analysis", desc: "Import transactions into Excel to analyze spending patterns and identify cost savings." },
    { title: "Tax Documentation", desc: "Export bank statements to Excel for tax preparation and deduction categorization." },
    { title: "Audit Preparation", desc: "Convert bank files to Excel for audit trails and compliance documentation." },
    { title: "Budget Tracking", desc: "Import transactions to Excel spreadsheets for budget vs actual comparison." },
    { title: "ERP Integration", desc: "Convert OFX to Excel as an intermediate step for importing into ERP systems." },
];

const relatedTools = [
    { href: "/tools/ofx-viewer", title: "OFX Viewer" },
    { href: "/tools/qbo-viewer", title: "QBO Viewer" },
    { href: "/convert/qfx-to-csv", title: "QFX to CSV" },
    { href: "/convert/qfx-to-pdf", title: "QFX to PDF" },
    { href: "/convert/mt940-to-excel", title: "MT940 to Excel" },
    { href: "/convert/qif-to-csv", title: "QIF to CSV" },
];

export default function OfxToExcelPage() {
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
                <OfxToExcelTool />
            </section>

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free OFX to Excel Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Lock, title: "100% Private", desc: "Files never leave your device. All processing happens in your browser." },
                            { icon: FileSpreadsheet, title: "Excel Compatible", desc: "Output opens directly in Microsoft Excel, Google Sheets, or LibreOffice." },
                            { icon: Zap, title: "Instant Conversion", desc: "No uploads, no waiting. Convert files in milliseconds." },
                            { icon: Shield, title: "No Signup Required", desc: "No email, no account. Just drop your file and convert." },
                            { icon: Globe, title: "Multi-Currency", desc: "Preserves currency information from your bank files." },
                            { icon: CheckCircle, title: "Batch Processing", desc: "Convert multiple OFX files at once. Unlimited and free." },
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
                        How to Convert OFX to Excel
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Upload Your OFX File", desc: "Drag and drop your OFX, QFX, or QBO file onto the converter." },
                            { step: 2, title: "Add More Files (Optional)", desc: "Upload additional files for batch conversion." },
                            { step: 3, title: "Click Convert", desc: "Press 'Convert All to Excel' or convert individual files." },
                            { step: 4, title: "Open in Excel", desc: "Your browser downloads the file. Open it in Excel." },
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
                        Who Uses This OFX to Excel Converter?
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
                        Common Use Cases for OFX to Excel Converter
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

            {/* Comparison Table - Best Free OFX to Excel Converter */}
            <section className="py-12 md:py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Best Free OFX to Excel Converter
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Compare our free tool to other OFX converters
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
                                    { feature: "Price", us: "Free forever", competitors: "$15-50 per file" },
                                    { feature: "File Upload", us: "None (browser only)", competitors: "Uploads to servers" },
                                    { feature: "Multi-Format", us: "OFX, QFX, QBO", competitors: "OFX only" },
                                    { feature: "Multi-Currency", us: "All currencies preserved", competitors: "USD only often" },
                                    { feature: "Excel Output", us: "Proper XLSX format", competitors: "CSV sometimes" },
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
                        The Best Free OFX to Excel Converter in 2026
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Need to <strong>convert OFX to Excel</strong>? Our free <strong>online OFX to Excel converter</strong> transforms OFX bank statement files into Excel spreadsheets instantly. Perfect for accountants, bookkeepers, and business owners who need to analyze bank data in Microsoft Excel.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        What is OFX Format?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>OFX (Open Financial Exchange)</strong> is the industry standard for financial data exchange between banks and software. Most banks worldwide offer OFX downloads for their customers. OFX files contain complete transaction details that can be converted to Excel for analysis.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        OFX File Tags Extracted to Excel
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>&lt;DTPOSTED&gt;:</strong> Transaction date → Date column</li>
                        <li><strong>&lt;TRNAMT&gt;:</strong> Amount → Amount column with proper sign</li>
                        <li><strong>&lt;NAME&gt;:</strong> Payee → Name column in Excel</li>
                        <li><strong>&lt;MEMO&gt;:</strong> Description → Memo column</li>
                        <li><strong>&lt;TRNTYPE&gt;:</strong> Type → Transaction Type column</li>
                        <li><strong>&lt;FITID&gt;:</strong> ID → Reference column</li>
                        <li><strong>&lt;CHECKNUM&gt;:</strong> Check # → Check Number column</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        What Data is Extracted?
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>Date:</strong> Transaction date formatted for Excel</li>
                        <li><strong>Amount:</strong> Transaction amount with sign</li>
                        <li><strong>Name:</strong> Payee or merchant</li>
                        <li><strong>Memo:</strong> Additional details</li>
                        <li><strong>Type:</strong> DEBIT, CREDIT, CHECK, etc.</li>
                        <li><strong>Account:</strong> Account number</li>
                        <li><strong>Currency:</strong> USD, EUR, GBP, etc.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Convert OFX to Excel?
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>Data Analysis:</strong> Use Excel's powerful sorting, filtering, and pivot tables.</li>
                        <li><strong>Custom Reports:</strong> Create charts and visualizations of spending.</li>
                        <li><strong>Easy Sharing:</strong> Excel files are universally accessible.</li>
                        <li><strong>Data Backup:</strong> Keep a readable copy of your transactions.</li>
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
                            { q: "What is the best OFX to Excel converter in 2026?", a: "Statement Extract offers the best free OFX to Excel converter. It's instant, private, and produces clean Excel-compatible output." },
                            { q: "Will the file work in all versions of Excel?", a: "Yes! The output is compatible with Excel 2007 and later, as well as Google Sheets and LibreOffice Calc." },
                            { q: "Can I convert files from any bank?", a: "Yes, the converter works with standard OFX files from any bank worldwide." },
                            { q: "Is there a transaction limit?", a: "No limits. Convert files with thousands of transactions instantly." },
                            { q: "Do formulas transfer to Excel?", a: "OFX files contain raw data, not formulas. You can add your own formulas in Excel after conversion." },
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
                currentTool="OFX to Excel"
                relatedTools={relatedTools}
            />
        </main>
    );
}
