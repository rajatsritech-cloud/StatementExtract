
import { Metadata } from "next";
import { CSVToOFXConverter } from "@/components/converters/CSVToOFXConverter";
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
    title: "CSV / Excel to MT940 Converter Free Online | SWIFT Format for Sage, Xero | Statement Extract",
    description: "Free CSV and Excel to MT940 converter. Convert bank files (CSV, XLS, XLSX) to MT940 SWIFT format. Compatible with Sage, Xero, SAP, ERPs, and more. 100% private.",
    keywords: "csv to mt940, csv to swift mt940, convert csv to mt940 online, mt940 generator, bank statement to mt940, mt940 format converter, swift mt940 export",
    openGraph: {
        title: "CSV to MT940 Converter Free Online | Create SWIFT Files",
        description: "Convert any bank CSV to MT940 SWIFT format. Import into Sage, SAP, Oracle & more. 100% free, secure, browser-based.",
        type: "website",
        url: "https://statementextract.com/convert/csv-to-mt940"
    },
    alternates: {
        canonical: "https://statementextract.com/convert/csv-to-mt940/"
    }
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CSV / Excel to MT940 Converter",
    "description": "Convert CSV/Excel bank transaction files to MT940 SWIFT format for import into Sage, SAP, Xero, and other ERP software.",
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
            "name": "What is MT940 format?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "MT940 (SWIFT Customer Statement Message) is a standard structured format used by banks to send account statements to customers. It's widely used by ERP systems like SAP, Oracle, and Sage for automated reconciliation."
            }
        },
        {
            "@type": "Question",
            "name": "How does this converter work?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Upload your CSV file, map the columns (Date, Amount, Description), and our tool generates a valid MT940 file with standard SWIFT tags (:20:, :25:, :60F:, :61:, :86:, :62F:)."
            }
        },
        {
            "@type": "Question",
            "name": "Is this CSV to MT940 converter free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, it is completely free to use directly in your browser. No signup or subscription required."
            }
        },
        {
            "@type": "Question",
            "name": "Is my data secure?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. All processing happens locally in your web browser. Your financial data is never uploaded to our servers, ensuring 100% privacy."
            }
        },
        {
            "@type": "Question",
            "name": "Which software supports MT940?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "MT940 is supported by most enterprise accounting software including SAP, Oracle NetSuite, Sage Intacct, Microsoft Dynamics 365, and Xero."
            }
        }
    ]
};

const useCases = [
    { title: "Import into ERP Systems", desc: "Generate MT940 files for SAP, Oracle, or Microsoft Dynamics that require strict SWIFT formatting." },
    { title: "Sage & Xero Compatibility", desc: "Create MT940 files compatible with Sage line of products and Xero bank statement import." },
    { title: "Legacy System Integration", desc: "Connect modern digital banks that only export CSV to legacy systems requiring MT940." },
    { title: "Automated Reconciliation", desc: "Standardize data from multiple banks into a single MT940 format for auto-reconciliation tools." },
];

const relatedTools = [
    { href: "/convert/qfx-to-pdf", title: "QFX to PDF" },
    { href: "/convert/csv-to-ofx", title: "CSV to OFX" },
    { href: "/convert/csv-to-qbo", title: "CSV to QBO" },
    { href: "/convert/pdf-to-mt940", title: "PDF to MT940" },
];

export default function CsvToMt940Page() {
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
                <CSVToOFXConverter
                    title="Convert CSV to MT940 Online"
                    description="Generate valid SWIFT MT940 files for Sage, SAP, Oracle, and Xero."
                />
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free CSV / Excel to MT940 Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Lock, title: "100% Private", desc: "Files never leave your device. All processing happens securely in your browser." },
                            { icon: FileCode, title: "SWIFT Compliant", desc: "Generates standard MT940 structure with correct tags (:61:, :86:)." },
                            { icon: Zap, title: "Instant Conversion", desc: "Convert huge CSV files to MT940 instantly without waiting." },
                            { icon: Shield, title: "No Signup Required", desc: "No email, no account needed. Just drop your file and convert." },
                            { icon: Globe, title: "ERP Compatible", desc: "Perfect for SAP, Oracle, Microsoft Dynamics, and Sage." },
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
                        How to Convert CSV / Excel to MT940 Online
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Upload Your File", desc: "Drag and drop or click to select your bank CSV or Excel (XLSX/XLS) file." },
                            { step: 2, title: "Map Your Columns", desc: "Match Date, Description, and Amount columns. We auto-detect common headers." },
                            { step: 3, title: "Verify Processing", desc: "Check the preview to ensure dates and amounts are correctly parsed." },
                            { step: 4, title: "Download MT940", desc: "Click 'Download MT940' to get your .txt file ready for import." },
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

            {/* Comparison Table - Best Free CSV to MT940 Converter */}
            <section className="py-12 md:py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Best Free CSV to MT940 Converter
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Compare our free tool to paid MT940 generators
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
                                    { feature: "Price", us: "Free forever", competitors: "$50-200/year" },
                                    { feature: "File Upload", us: "None (browser only)", competitors: "Uploads to servers" },
                                    { feature: "SWIFT Compliance", us: "Full MT940 tags", competitors: "Varies" },
                                    { feature: "Excel Support", us: "XLS & XLSX", competitors: "CSV only" },
                                    { feature: "ERP Support", us: "SAP, Oracle, Sage+", competitors: "Limited" },
                                    { feature: "Transaction Limit", us: "Unlimited", competitors: "50-100 free" },
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

            {/* SEO Content Block */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        The Best Free CSV/Excel to MT940 Converter
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        If you need to import bank transaction data into enterprise ERP systems or specialized accounting software, the <strong>MT940 (SWIFT)</strong> format is often a strict requirement. Most modern digital banks and fintech platforms only export simple CSV or Excel files, leaving you with incompatible data.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Our <strong>free CSV/Excel to MT940 converter</strong> bridges this gap. It allows you to transform any CSV spreadsheet into a valid, SWIFT-compliant MT940 file in seconds. It runs completely in your browser, ensuring that your sensitive financial data remains private and secure on your own device.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Use MT940 Format?
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>Standardization:</strong> MT940 is a globally recognized SWIFT standard for electronic bank statements.</li>
                        <li><strong>Rich Detail:</strong> Supports detailed transaction codes (:61:) and narrative (:86:) for better reconciliation.</li>
                        <li><strong>Automation:</strong> ERPs like SAP and Oracle use MT940 to automatically match payments and clear open items.</li>
                        <li><strong>Compatibility:</strong> It is the preferred format for many legacy systems and European accounting software.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Supported Systems
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Our generated MT940 files are compatible with:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li>SAP S/4HANA & SAP ERP</li>
                        <li>Oracle NetSuite</li>
                        <li>Microsoft Dynamics 365 Finance</li>
                        <li>Sage Intacct & Sage 50/200</li>
                        <li>Xero (Bank Feed Import)</li>
                        <li>Exact Online</li>
                        <li>Twinfield</li>
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
                            { q: "What columns do I need in my CSV?", a: "You need at least Date, Description, and Amount columns. You can also map separate Credit/Debit columns or a Reference ID column if available." },
                            { q: "Does it support opening/closing balances?", a: "Yes, the tool automatically calculates intermediate running balances based on the transaction order to generate valid :60F: and :62F: balance tags." },
                            { q: "Is the generated file compatible with SAP?", a: "Yes, we follow the standard SWIFT MT940 structure that is compatible with SAP's electronic bank statement interface." },
                            { q: "Is this tool free for commercial use?", a: "Yes, our CSV to MT940 converter is 100% free for unlimited files for both personal and commercial use." },
                            { q: "Do you save my bank data?", a: "No. The conversion happens entirely in your web browser using JavaScript. Your data is not sent to our servers." },
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
                currentTool="CSV to MT940"
                relatedTools={relatedTools}
            />
        </main>
    );
}
