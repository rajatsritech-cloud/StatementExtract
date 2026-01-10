import { Metadata } from "next";
import Link from "next/link";
import { CsvToExcelTool } from "@/components/tools/CsvToExcelTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { PageMeta } from "@/components/PageMeta";
import {
    CheckCircle,
    Zap,
    Shield,
    FileText,
    Database,
    Settings,
    Lock,
    ArrowUpDown,
    Globe,
    Code
} from "lucide-react";

export const metadata: Metadata = {
    title: "Free CSV to Excel Converter | Preserve Leading Zeros | Statement Extract",
    description: "Convert CSV to Excel (XLSX) online. Smart formatting preserves leading zeros, dates, and special characters. No file limits, 100% free and secure.",
    keywords: "convert csv to excel, text to columns, csv to xlsx, import csv to excel, preserve leading zeros csv, csv converter, excel converter, csv to excel leading zeros",
    openGraph: {
        title: "CSV to Excel Converter - Preserve Leading Zeros",
        description: "Convert CSV to Excel instantly. Smart formatting keeps data accurate - no more broken dates or lost leading zeros.",
        type: "website",
        url: "https://statementextract.com/convert/csv-to-excel",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/csv-to-excel",
    },
};

const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CSV to Excel Converter",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "featureList": "Convert CSV to XLSX, Preserve Leading Zeros, Client-side Processing",
    "softwareRequirements": "Modern Web Browser"
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://statementextract.com" },
        { "@type": "ListItem", "position": 2, "name": "Converters", "item": "https://statementextract.com/convert" },
        { "@type": "ListItem", "position": 3, "name": "CSV to Excel" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I keep leading zeros when converting CSV to Excel?",
            "acceptedAnswer": { "@type": "Answer", "text": "Our converter has a 'Smart Formatting' feature enabled by default. This forces Excel to treat ID columns (like '00123') as text, preserving the leading zeros that Excel normally strips away." }
        },
        {
            "@type": "Question",
            "name": "Is this converter secure?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. This is a client-side tool, meaning your CSV file is processed entirely within your web browser. No data is ever uploaded to our servers." }
        },
        {
            "@type": "Question",
            "name": "Can I convert large CSV files?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes! Because we process files locally on your device, we can handle files up to 100MB+ depending on your computer's RAM, much larger than server-based tools." }
        },
        {
            "@type": "Question",
            "name": "Does it support special characters?",
            "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. We use UTF-8 encoding to ensure reliable handling of accents, symbols, and non-Latin characters." }
        }
    ]
};

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Convert CSV to Excel without Losing Leading Zeros",
    "step": [
        { "@type": "HowToStep", "name": "Upload CSV", "text": "Drag and drop your CSV file into the converter area." },
        { "@type": "HowToStep", "name": "Check Settings", "text": "Ensure 'Smart Formatting' is checked to preserve special data formats." },
        { "@type": "HowToStep", "name": "Convert", "text": "Click 'Convert to Excel' to process your file instantly." },
        { "@type": "HowToStep", "name": "Download", "text": "Save the resulting .xlsx file to your computer." }
    ]
};

const useCases = [
    { title: "Data Analysis & Reporting", desc: "Turn raw system exports into formatted Excel sheets ready for PivotTables and charts." },
    { title: "Clean Database Exports", desc: "Fix \"broken\" CSVs where dates and long IDs (like SKUs) get corrupted by Excel." },
    { title: "E-commerce Management", desc: "Edit Shopify, WooCommerce, or Amazon product CSVs with proper column formatting." },
    { title: "Client Deliverables", desc: "Convert messy data logs into professional, readable Excel reports for your clients." },
];

const relatedTools = [
    { href: "/convert/excel-to-csv", title: "Excel to CSV Converter" },
    { href: "/convert/json-to-csv", title: "JSON to CSV Converter" },
    { href: "/convert-bank-statement-to-csv-excel", title: "Bank Statement Converter" },
    { href: "/tools/merge-pdf", title: "Merge PDF Files" },
];

export default function CsvToExcelPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <CsvToExcelTool />
            </section>

            {/* Why Use This Tool */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-12">
                        Why Use Our CSV to Excel Converter?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Shield,
                                title: "Leading Zeros Preserved",
                                desc: "Excel famously deletes leading zeros (turning '007' to '7'). Our tool forces text formatting to keep your IDs and zip codes intact."
                            },
                            {
                                icon: Zap,
                                title: "Instant Processing",
                                desc: "No queue, no waiting. Conversion happens instantly in your browser using WebAssembly technology."
                            },
                            {
                                icon: Database,
                                title: "Large File Support",
                                desc: "Process datasets with thousands of rows without crashing. We handle large files efficiently using streaming parsing."
                            },
                            {
                                icon: CheckCircle,
                                title: "Auto-Column Sizing",
                                desc: "The generated Excel file includes auto-width columns so your data is readable immediately without manual adjustment."
                            },
                            {
                                icon: Settings,
                                title: "UTF-8 Support",
                                desc: "Full support for international characters, accents, and emojis. Never see broken characters again."
                            },
                            {
                                icon: FileText,
                                title: "Clean Output",
                                desc: "Get a clean .xlsx file compatible with Microsoft Excel 2007+, Google Sheets, LibreOffice, and Numbers."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] hover:shadow-lg transition-shadow">
                                <feature.icon className="w-10 h-10 text-[hsl(var(--primary))] mb-4" />
                                <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-3">{feature.title}</h3>
                                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How To Section */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        How to Convert CSV to Excel & Keep Leading Zeros
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Upload Your CSV", desc: "Drag and drop your CSV file. We support files up to 100MB+." },
                            { step: 2, title: "Enable Smart Formatting", desc: "Ensure the 'Smart Formatting' toggle is checked. This tells the converter to treat strings of numbers (like '00123') as text." },
                            { step: 3, title: "Convert to Excel", desc: "Click Convert. The tool parses your data and builds a native Excel worksheet." },
                            { step: 4, title: "Download .XLSX", desc: "Save your file. Open it in basic Excel and see your data perfectly preserved." },
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

            {/* Comparison Table */}
            <section className="py-12 md:py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Best Free CSV to Excel Converter (Vs. Excel Wizard)
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Why use our tool instead of Excel's "Text to Columns"?
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]/10">
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--foreground))]">Feature</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--primary))]">Statement Extract</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--muted-foreground))]">Excel Import Wizard</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: "Price", us: "Free", competitors: "Paid (Office 365)" },
                                    { feature: "Leading Zeros", us: "Automatic Preservation", competitors: "Requires manual setup steps" },
                                    { feature: "Date Formats", us: "Smart Detection", competitors: "Often breaks YYYY-MM-DD" },
                                    { feature: "Ease of Use", us: "1-Click", competitors: "Multi-step Wizard" },
                                    { feature: "Accessibility", us: "Any Browser / Device", competitors: "Desktop Only" },
                                    { feature: "Privacy", us: "100% Client-Side", competitors: "Local App" },
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

            {/* Deep Technical Dive: The Leading Zero Problem */}
            <section className="py-12 px-6 bg-[hsl(var(--muted))]/10">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-center mb-8">Why Does Excel Delete Leading Zeros?</h2>
                    <p>
                        It is one of the most frustrating "features" in modern data analysis. You open a CSV containing Zip Codes (e.g., <code>02110</code>) or SKUs (e.g., <code>005432</code>), and Excel automatically converts them to <code>2110</code> and <code>5432</code>.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 not-prose my-8">
                        <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20">
                            <h3 className="font-bold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                What Excel Does (Wrong)
                            </h3>
                            <pre className="text-xs md:text-sm bg-[hsl(var(--background))] p-3 rounded-lg overflow-x-auto">
                                Input:  0012345
                                <br />
                                Action: Detects "Number"
                                <br />
                                Result: 12345 ❌
                            </pre>
                            <p className="text-sm mt-3 text-[hsl(var(--muted-foreground))]">
                                Excel attempts to "clean" your data by removing mathematically insignificant zeros, corrupting IDs.
                            </p>
                        </div>
                        <div className="bg-green-500/10 p-6 rounded-2xl border border-green-500/20">
                            <h3 className="font-bold text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                What We Do (Right)
                            </h3>
                            <pre className="text-xs md:text-sm bg-[hsl(var(--background))] p-3 rounded-lg overflow-x-auto">
                                Input:  0012345
                                <br />
                                Action: Force "Text" Type
                                <br />
                                Result: 0012345 ✅
                            </pre>
                            <p className="text-sm mt-3 text-[hsl(var(--muted-foreground))]">
                                We explicitly define the cell format as Text during the XML generation process.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Specs: CSV vs Excel */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        File Format Showdown: CSV vs. XLSX
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        When should you use which? A technical breakdown.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]/10">
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--foreground))]">Feature</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--primary))]">CSV (Comma Separated)</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--muted-foreground))]">Excel (XLSX)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: "File Size", csv: "Tiny (Text only)", xlsx: "Larger (XML compression)" },
                                    { feature: "Row Limit", csv: "Unlimited (System dependent)", xlsx: "1,048,576 rows" },
                                    { feature: "Formatting", csv: "None (Raw data)", xlsx: "Colors, Bolding, Fonts" },
                                    { feature: "Formulas", csv: "Not Supported", xlsx: "Full Support (=SUM, etc)" },
                                    { feature: "Leading Zeros", csv: "Varies by viewer", xlsx: "Supported (as Text)" },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-[hsl(var(--border))]">
                                        <td className="p-4 text-[hsl(var(--foreground))]">{row.feature}</td>
                                        <td className="p-4 text-[hsl(var(--primary))] font-medium">{row.csv}</td>
                                        <td className="p-4 text-[hsl(var(--muted-foreground))]">{row.xlsx}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* SEO Content Block */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        The Best Free CSV to Excel Converter Online
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Working with raw data files can be frustrating, especially when Excel automatically changes your data. Our <strong>free CSV to Excel converter</strong> solves the most common pain points developers and data analysts face. By forcing column data types during the conversion process, we ensure your ZIP codes, phone numbers, and SKUs remain exactly as they appear in the source file.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Unlike basic "converters" that just rename the file extension, our tool actually parses the CSV data and rebuilds a valid XML-based Excel (.xlsx) file structure. This means you get a genuine spreadsheet with properly measured column widths, correct header freezing, and data integrity.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Not Just Open CSV in Excel?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        When you double-click a CSV file to open it in Excel, Excel makes "guesses" about your data types. It assumes that "00123" is a number and converts it to "123", effectively deleting your data. It assumes that "OCT-2023" is a date and formats it to your local system date. Once saved, this data is often lost forever.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Our tool acts as a safe middleman. It reads the raw text, understands that "00123" should be a text string, and creates an Excel file with that cell explicitly set to Text format. When you open the resulting file in Excel, your data is pristine.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Supported Data Types
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>Standard CSV:</strong> Comma-separated values (RFC 4180).</li>
                        <li><strong>International CSV:</strong> Semicolon (;) delimited files used in Europe.</li>
                        <li><strong>Text Files:</strong> .txt files containing structured data.</li>
                        <li><strong>Large Datasets:</strong> Files with up to 1 million rows (browser memory dependent).</li>
                    </ul>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqSchema.mainEntity.map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-lg text-[hsl(var(--foreground))] mb-2">{faq.name}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.acceptedAnswer.text}</p>
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
                currentTool="CSV to Excel"
                relatedTools={relatedTools}
            />
        </main>
    );
}
