import { Metadata } from "next";
import { OfxToQboTool } from "@/components/ofx-tools/OfxToQboTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { PageMeta } from "@/components/PageMeta";
import {
    Zap,
    Shield,
    Globe,
    FileText,
    CheckCircle,
    Lock,
    RefreshCcw,
    Users,
    Building2,
    BarChart3,
    Briefcase
} from "lucide-react";

// SEO metadata targeting competitor keywords
export const metadata: Metadata = {
    title: "OFX to QBO Converter Free Online | Convert OFX to QuickBooks | Statement Extract",
    description: "Free OFX to QBO converter online. Convert Open Financial Exchange files to QuickBooks Web Connect format instantly. No signup required. Private & Secure browser processing.",
    keywords: "ofx to qbo converter, convert ofx to qbo online, ofx to qbo converter free, ofx file to qbo, convert ofx to quickbooks, bank ofx to qbo, qfx to qbo converter, ofx to quickbooks import",
    openGraph: {
        title: "OFX to QBO Converter Free Online | OFX to QuickBooks",
        description: "Convert OFX bank files to QuickBooks QBO format. Free, instant, no signup required.",
        type: "website",
        url: "https://statementextract.com/convert/ofx-to-qbo",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"]
    },
    twitter: {
        card: "summary_large_image",
        title: "OFX to QBO Converter - Free Online Tool",
        description: "Convert OFX files to QuickBooks QBO format instantly. Free, privacy-first.",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"]
    },
    alternates: {
        canonical: "https://statementextract.com/convert/ofx-to-qbo/"
    }
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "OFX to QBO Converter",
    "description": "Convert Open Financial Exchange (OFX) bank files to QuickBooks Web Connect (QBO) format online for free.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://statementextract.com" },
        { "@type": "ListItem", "position": 2, "name": "Converters", "item": "https://statementextract.com/convert" },
        { "@type": "ListItem", "position": 3, "name": "OFX to QBO" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is the best OFX to QBO converter in 2026?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Statement Extract offers the best free OFX to QBO converter. It processes files instantly in your browser, preserves all transaction data, and never uploads your data to any server."
            }
        },
        {
            "@type": "Question",
            "name": "How do I convert an OFX file to QBO?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply drag and drop your OFX file onto the converter, click 'Convert to QBO', and your browser will generate a QuickBooks-compatible QBO file instantly."
            }
        },
        {
            "@type": "Question",
            "name": "Is my OFX data kept private?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, completely. This tool runs entirely in your browser. Your financial data never leaves your computer and is never uploaded to any server."
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
            "name": "What is the difference between OFX and QBO files?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "OFX (Open Financial Exchange) is a universal bank download format. QBO is Intuit's proprietary variant optimized for QuickBooks. They have the same structure but QBO includes QuickBooks-specific headers."
            }
        },
        {
            "@type": "Question",
            "name": "Do I need to install any software?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No installation required. Everything runs in your web browser. Just upload your file and download the QBO."
            }
        }
    ]
};

const useCases = [
    { title: "Import Bank Transactions", desc: "Convert OFX bank downloads to QBO for seamless QuickBooks import." },
    { title: "QuickBooks Compatibility", desc: "Transform OFX files that QuickBooks doesn't directly accept." },
    { title: "Multiple Account Support", desc: "Convert files from banks that only provide OFX format." },
    { title: "Clean Transaction Import", desc: "Ensure proper formatting before importing to your books." },
];

const whoIsThisFor = [
    { icon: Users, title: "Accountants", desc: "Convert client bank OFX files to QBO for easy QuickBooks import." },
    { icon: Building2, title: "Business Owners", desc: "Import bank transactions when your bank only provides OFX files." },
    { icon: BarChart3, title: "Bookkeepers", desc: "Standardize different bank formats to QuickBooks-compatible QBO." },
    { icon: Briefcase, title: "Financial Managers", desc: "Ensure accurate transaction import across all accounts." },
];



const relatedTools = [
    { href: "/convert/csv-to-qbo", title: "CSV to QBO" },
    { href: "/convert/qfx-to-pdf", title: "QFX to PDF" },
    { href: "/convert-bank-statement-to-csv-excel", title: "PDF to Excel" },
    { href: "/convert-bank-statement-to-quickbooks-xero", title: "PDF to QBO" },
];

export default function OfxToQboPage() {
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
                <OfxToQboTool />
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free OFX to QBO Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Lock, title: "Private & Secure", desc: "Files never leave your device. All processing happens in your browser." },
                            { icon: RefreshCcw, title: "Lossless Conversion", desc: "All transaction data preserved: dates, amounts, payees, memos, and IDs." },
                            { icon: Zap, title: "Instant Conversion", desc: "No uploads, no waiting. Convert files instantly in your browser." },
                            { icon: Shield, title: "No Signup Required", desc: "No email, no account needed. Just drop your file and convert." },
                            { icon: Globe, title: "Multi-Currency Support", desc: "Works with OFX files from banks worldwide in any currency." },
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
                        How to Convert OFX to QBO Online
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Upload Your OFX File", desc: "Drag and drop or click to select your OFX or QFX bank file." },
                            { step: 2, title: "Review Settings", desc: "Tool auto-detects bank ID, account ID, and currency from your file." },
                            { step: 3, title: "Click Convert to QBO", desc: "Your browser parses the OFX and generates a QuickBooks-compatible QBO file." },
                            { step: 4, title: "Import into QuickBooks", desc: "Download the QBO file and import directly into QuickBooks Online or Desktop." },
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

            {/* Who Is This For Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Who Is This OFX to QBO Converter For?
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

            {/* Use Cases Grid */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Common Use Cases
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
            <section className="py-12 md:py-16 px-4 bg-[hsl(var(--muted))]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Best Free OFX to QBO Converter
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Compare our free tool to paid OFX converters
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
                                    { feature: "Price", us: "Free forever", competitors: "$20-50/year" },
                                    { feature: "File Upload", us: "None (browser only)", competitors: "Uploads to servers" },
                                    { feature: "Data Preserved", us: "lossless", competitors: "Some data lost" },
                                    { feature: "Account Settings", us: "Auto-detected", competitors: "Manual entry" },
                                    { feature: "Multi-Currency", us: "All currencies", competitors: "Limited" },
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

            {/* SEO Content Block */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        The Best Free OFX to QBO Converter Online
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Need to import OFX bank files into QuickBooks? Our <strong>free OFX to QBO converter</strong> transforms any OFX or QFX file into a QuickBooks-compatible QBO file in seconds. Unlike other tools that require uploads to external servers, our converter runs <strong>entirely in your browser</strong>—your financial data never leaves your device.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Whether you're an accountant managing client accounts, a business owner importing bank transactions, or a bookkeeper standardizing different bank formats, this <strong>OFX to QBO converter free</strong> tool handles it all. Simply drag and drop your file, and get an instant QBO file ready for QuickBooks import.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        What is OFX Format?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>OFX (Open Financial Exchange)</strong> is a standardized file format for electronic exchange of financial data. It was developed jointly by Intuit, Microsoft, and CheckFree in the late 1990s. OFX files contain:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>Bank Transactions:</strong> Deposits, withdrawals, transfers, and payments</li>
                        <li><strong>Account Information:</strong> Bank ID, account ID, and account type</li>
                        <li><strong>Balance Data:</strong> Opening and closing balances with timestamps</li>
                        <li><strong>Transaction Details:</strong> Dates, amounts, payees, memos, and reference IDs</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        OFX vs QBO: What's the Difference?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        OFX and QBO are essentially the same format with minor differences:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>OFX (Open Financial Exchange):</strong> The open standard used by most banks and financial software.</li>
                        <li><strong>QBO (QuickBooks Online):</strong> Intuit's proprietary variant with QuickBooks-specific headers (INTU.BID).</li>
                        <li><strong>QFX (Quicken Financial Exchange):</strong> Intuit's variant for Quicken software.</li>
                    </ul>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        While QuickBooks can often import OFX files directly, some versions require the QBO format for proper import. Our converter ensures compatibility by adding the necessary QuickBooks headers.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Convert OFX to QBO?
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>QuickBooks Compatibility:</strong> Ensure seamless import into all QuickBooks versions.</li>
                        <li><strong>Proper Headers:</strong> Add INTU.BID headers required by QuickBooks.</li>
                        <li><strong>Bank Support:</strong> Convert from banks that only provide OFX downloads.</li>
                        <li><strong>Error Prevention:</strong> Avoid import errors from format mismatches.</li>
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
                            { q: "What's the best OFX to QBO converter in 2026?", a: "Statement Extract offers the best free OFX to QBO converter. It's instant, private, and preserves all transaction data with high-precision accuracy." },
                            { q: "Is my financial data secure?", a: "Yes, completely. The tool runs entirely in your browser. Your OFX file is never uploaded to any server—we physically cannot access your data." },
                            { q: "Do I need to install anything?", a: "No. Everything runs in your web browser. Just drag and drop your OFX file and click convert." },
                            { q: "Will QuickBooks accept the converted QBO file?", a: "Yes! The converter produces fully compatible QBO files that work with QuickBooks Online and all Desktop versions." },
                            { q: "Does it work with QFX files too?", a: "Yes! The converter accepts both OFX and QFX files and converts them to QBO format." },
                            { q: "Is there a limit to how many files I can convert?", a: "No limits. Convert as many files as you need, completely free." },
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
                    <PageMeta lastUpdated="January 2026" />
                </div>
            </section>

            {/* Footer & CTA */}
            <ToolPageFooter
                currentTool="OFX to QBO"
                relatedTools={relatedTools}
            />
        </main>
    );
}
