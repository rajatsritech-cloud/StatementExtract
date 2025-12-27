import { Metadata } from "next";
import { Mt940ToExcelTool } from "@/components/mt940-tools/Mt940ToExcelTool";
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
    title: "MT940 to Excel Converter Free Online | SWIFT to CSV | Statement Extract",
    description: "Free MT940 to Excel converter online. Convert SWIFT bank statement files to Excel spreadsheets. Perfect for SAP, Oracle, Sage users. 100% private browser processing.",
    keywords: "mt940 to excel converter, mt940 to csv online, convert mt940 to excel, swift to excel, mt940 file to csv, bank statement to excel, mt940 viewer, swift bank statement converter",
    openGraph: {
        title: "MT940 to Excel Converter Free Online | SWIFT to CSV",
        description: "Convert MT940 SWIFT bank files to Excel spreadsheets. Free, instant, private.",
        type: "website",
        url: "https://statementextract.com/convert/mt940-to-excel",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "MT940 to Excel Converter - Free Online Tool",
        description: "Convert SWIFT MT940 files to Excel. Free, instant, private.",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"],
    },
    alternates: {
        canonical: "https://statementextract.com/convert/mt940-to-excel/",
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MT940 to Excel Converter",
    "description": "Convert SWIFT MT940 bank statement files to Microsoft Excel spreadsheet format.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "ratingCount": "678"
    }
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://statementextract.com" },
        { "@type": "ListItem", "position": 2, "name": "Converters", "item": "https://statementextract.com/convert" },
        { "@type": "ListItem", "position": 3, "name": "MT940 to Excel" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I convert MT940 to Excel?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply drag and drop your MT940 file onto our converter. It parses all transactions and downloads an Excel-compatible file you can open in Microsoft Excel."
            }
        },
        {
            "@type": "Question",
            "name": "What is an MT940 file?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "MT940 is a SWIFT standard format for electronic bank statements. It's commonly used by European banks and enterprise ERP systems like SAP, Oracle, and Sage."
            }
        },
        {
            "@type": "Question",
            "name": "Is my data secure?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The conversion happens entirely in your browser. Your MT940 file never leaves your device and is never uploaded to any server."
            }
        }
    ]
};

const whoIsThisFor = [
    { icon: Building2, title: "SAP Users", desc: "Export MT940 bank files from SAP to Excel for analysis." },
    { icon: Users, title: "Treasury Teams", desc: "Convert bank statement files for cash management reporting." },
    { icon: BarChart3, title: "Financial Controllers", desc: "Transform MT940 data into Excel for reconciliation." },
    { icon: Briefcase, title: "ERP Administrators", desc: "Validate MT940 files before importing into accounting systems." },
];

const useCases = [
    { title: "SAP Bank Statement Analysis", desc: "Export MT940 files from SAP to Excel for detailed transaction analysis outside the ERP." },
    { title: "Cash Position Reporting", desc: "Convert SWIFT statements to Excel for treasury cash flow reporting and forecasting." },
    { title: "Bank Reconciliation", desc: "Import MT940 data to Excel to reconcile bank balances with internal records." },
    { title: "Audit Documentation", desc: "Create Excel archives of MT940 statements for audit trails and compliance." },
    { title: "Oracle EBS Analysis", desc: "Convert MT940 files to Excel for Oracle E-Business Suite transaction review." },
    { title: "Multi-Bank Consolidation", desc: "Export statements from multiple banks to Excel for consolidated reporting." },
];

const relatedTools = [
    { href: "/convert/csv-to-mt940", title: "CSV to MT940" },
    { href: "/convert/ofx-to-excel", title: "OFX to Excel" },
    { href: "/tools/ofx-viewer", title: "OFX Viewer" },
    { href: "/tools/qbo-viewer", title: "QBO Viewer" },
    { href: "/convert/qfx-to-csv", title: "QFX to CSV" },
    { href: "/convert/qif-to-csv", title: "QIF to CSV" },
];

export default function Mt940ToExcelPage() {
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
                <Mt940ToExcelTool />
            </section>

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free MT940 to Excel Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Lock, title: "100% Private", desc: "Files never leave your device. Browser-based processing." },
                            { icon: FileSpreadsheet, title: "Excel Compatible", desc: "Output opens in Excel, Google Sheets, or LibreOffice." },
                            { icon: Zap, title: "Instant Conversion", desc: "No uploads required. Convert files in milliseconds." },
                            { icon: Shield, title: "No Signup", desc: "No email or account needed. Free forever." },
                            { icon: Globe, title: "Multi-Currency", desc: "Preserves EUR, USD, GBP, and all currency codes." },
                            { icon: CheckCircle, title: "SWIFT Compliant", desc: "Parses standard MT940 tags (:61:, :86:, etc.)." },
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
                        How to Convert MT940 to Excel
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Upload Your MT940 File", desc: "Drag and drop your .sta, .mt940, .940, or .txt file." },
                            { step: 2, title: "Automatic Parsing", desc: "The converter reads all :61: and :86: transaction blocks." },
                            { step: 3, title: "Click Convert", desc: "Press 'Convert to Excel' to start the conversion." },
                            { step: 4, title: "Open in Excel", desc: "Your browser downloads the file. Open in Excel." },
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
                        Who Uses This MT940 Converter?
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
                        Common Use Cases for MT940 to Excel Converter
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

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        The Best Free MT940 to Excel Converter in 2026
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Need to <strong>convert MT940 to Excel</strong>? Our free <strong>online MT940 to Excel converter</strong> transforms SWIFT bank statement files into Excel spreadsheets instantly. Ideal for SAP, Oracle, Microsoft Dynamics, and Sage users who need to analyze bank data outside of the ERP.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        What is MT940 Format?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>MT940</strong> is a SWIFT standard (MT = Message Type) for customer account statements. It's the most common format for electronic bank statements in Europe and is used by enterprise systems worldwide.
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>:20:</strong> Transaction Reference Number</li>
                        <li><strong>:25:</strong> Account Identification</li>
                        <li><strong>:60F:</strong> Opening Balance</li>
                        <li><strong>:61:</strong> Statement Line (transaction)</li>
                        <li><strong>:86:</strong> Information to Account Owner</li>
                        <li><strong>:62F:</strong> Closing Balance</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Convert MT940 to Excel?
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>Data Analysis:</strong> Use Excel for sorting, filtering, and reporting.</li>
                        <li><strong>Validation:</strong> Preview transactions before ERP import.</li>
                        <li><strong>Reconciliation:</strong> Compare bank data with internal records.</li>
                        <li><strong>Archiving:</strong> Keep readable backups of bank statements.</li>
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
                            { q: "What's the best MT940 to Excel converter?", a: "Statement Extract offers the best free MT940 to Excel converter. It's instant, private, and handles standard SWIFT formats." },
                            { q: "What file extensions are supported?", a: "We support .sta, .mt940, .940, and .txt files containing MT940 formatted data." },
                            { q: "Does it work with files from any bank?", a: "Yes, it parses standard MT940 format used by banks worldwide." },
                            { q: "Can I convert files from SAP?", a: "Yes, MT940 files exported from SAP work perfectly with this converter." },
                            { q: "Is there a file size limit?", a: "No practical limit. Large files with thousands of transactions convert quickly." },
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
                currentTool="MT940 to Excel"
                relatedTools={relatedTools}
            />
        </main>
    );
}
