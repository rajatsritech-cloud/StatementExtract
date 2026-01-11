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
    FileText
} from "lucide-react";

export const metadata: Metadata = {
    title: "CSV to IIF Converter Free Online | Convert Excel to QuickBooks IIF",
    description: "Free CSV to IIF converter. Convert Excel or CSV files to QuickBooks IIF format for easy import. Map columns date, amount, payee, and more.",
    keywords: "csv to iif, convert csv to iif, excel to iif, quickbooks iif converter, import csv to quickbooks desktop, csv to iif mapping",
    openGraph: {
        title: "CSV to IIF Converter Free Online | Excel to QuickBooks",
        description: "Convert CSV/Excel files to QuickBooks IIF format instantly and securely.",
        type: "website",
        url: "https://statementextract.com/csv-to-iif",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"],
    },
    alternates: {
        canonical: "https://statementextract.com/csv-to-iif/",
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CSV to IIF Converter",
    "description": "Convert CSV and Excel files to Intuit Interchange Format (IIF) for QuickBooks Desktop import.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
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
                "text": "Upload your CSV file, map the columns (Date, Amount, Payee) to the IIF fields, and download the formatted .iif file ready for QuickBooks Desktop import."
            }
        },
        {
            "@type": "Question",
            "name": "Can I import Excel files to QuickBooks Desktop?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, but first you must save your Excel file as a CSV. Then use our tool to convert that CSV into the IIF format that QuickBooks Desktop requires."
            }
        },
        {
            "@type": "Question",
            "name": "Is this tool free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our CSV to IIF converter is 100% free with no usage limits."
            }
        }
    ]
};

const relatedTools = [
    { href: "/convert/iif-to-excel", title: "IIF to Excel" },
    { href: "/convert/csv-to-qbo", title: "CSV to QBO" },
    { href: "/convert/qfx-to-excel", title: "QFX to Excel" },
    { href: "/convert/qif-to-excel", title: "QIF to Excel" },
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

            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <CsvToIifTool />
            </section>

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Import Excel Data into QuickBooks Desktop
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: FileSpreadsheet, title: "Easy Column Mapping", desc: "Instantly map your CSV headers to QuickBooks fields like Date, Amount, and Class." },
                            { icon: Lock, title: "Secure & Private", desc: "Processing happens entirely in your browser. Your financial data is never uploaded." },
                            { icon: Zap, title: "Instant Conversion", desc: "Get an import-ready IIF file significantly faster than manually entering data." },
                            { icon: CheckCircle, title: "Validates Data", desc: "Ensures dates and amounts are in the correct format before generating the IIF." },
                            { icon: Globe, title: "Universal CSV Support", desc: "Works with CSV exports from any bank, PayPal, Stripe, or custom Excel sheets." },
                            { icon: Users, title: "Bulk Import", desc: "Import thousands of transactions into QuickBooks in seconds." },
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
                        Why Use IIF Files?
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        While <strong>QuickBooks Desktop</strong> supports newer formats, the <strong>IIF (Intuit Interchange Format)</strong> remains a powerful way to import lists and transactions directly into the database. It allows you to bypassing the "Bank Feeds" center and directly record data into registers.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        This is especially useful for:
                    </p>
                    <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-8 space-y-2">
                        <li><strong>Historical Data:</strong> Importing years of data that bank feeds won't provide.</li>
                        <li><strong>Non-Bank Data:</strong> Importing sales from stripe, expenses from spreadsheets, or payroll data.</li>
                        <li><strong>Bulk Edits:</strong> Preparing data in Excel (easier to edit) and importing it all at once.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6 mt-12">
                        How to Import the IIF File
                    </h2>
                    <div className="space-y-4 mb-8">
                        <div className="p-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl">
                            <h4 className="font-bold mb-2">Step 1: Backup Your Company File</h4>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">IIF imports cannot be undone. Always creating a backup before importing.</p>
                        </div>
                        <div className="p-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl">
                            <h4 className="font-bold mb-2">Step 2: Go to Utilities</h4>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">In QuickBooks, go to <strong>File &gt; Utilities &gt; Import &gt; IIF Files</strong>.</p>
                        </div>
                        <div className="p-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl">
                            <h4 className="font-bold mb-2">Step 3: Select File</h4>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Choose the `.iif` file you downloaded from this tool.</p>
                        </div>
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
