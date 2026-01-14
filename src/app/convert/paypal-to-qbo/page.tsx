import { Metadata } from "next";
import { CsvToQboTool } from "@/components/qbo-tools/CsvToQboTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { PageMeta } from "@/components/PageMeta";
import {
    Zap,
    Shield,
    Wallet,
    FileText,
    CheckCircle,
    Database,
    Lock,
    ArrowUpDown,
    TrendingUp
} from "lucide-react";

export const metadata: Metadata = {
    title: "PayPal to QuickBooks Converter Free | Import PayPal CSV to QBO | Statement Extract",
    description: "Free PayPal to QuickBooks converter. Convert PayPal transaction history CSV to QBO format for easy QuickBooks import. 100% browser-based, private, no signup required.",
    keywords: "paypal to quickbooks, paypal csv to qbo, import paypal to quickbooks, paypal transactions to quickbooks, paypal export to qbo, paypal quickbooks integration free, convert paypal csv",
    openGraph: {
        title: "PayPal to QuickBooks Converter Free | Import PayPal Transactions",
        description: "Convert PayPal transaction exports to QuickBooks QBO format instantly. Free, private, no signup required.",
        type: "website",
        url: "https://statementextract.com/convert/paypal-to-qbo"
    },
    alternates: {
        canonical: "https://statementextract.com/convert/paypal-to-qbo/"
    }
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PayPal to QuickBooks QBO Converter",
    "description": "Convert PayPal transaction CSV exports to QuickBooks Web Connect (.qbo) format online for free.",
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
        { "@type": "ListItem", "position": 3, "name": "PayPal to QBO" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I export transactions from PayPal?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Log into PayPal → Activity → Click 'Statements' or 'Download' → Select date range → Choose CSV format → Download. Then upload it here to convert to QBO."
            }
        },
        {
            "@type": "Question",
            "name": "Can I import PayPal transactions directly into QuickBooks?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "QuickBooks has a paid PayPal integration, but you can import for free using this tool. Export your PayPal CSV, convert to QBO format here, then import via Banking → Upload Transactions."
            }
        },
        {
            "@type": "Question",
            "name": "Is this PayPal to QuickBooks converter free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, completely free with no limits. Convert unlimited PayPal transactions without signup or payment."
            }
        },
        {
            "@type": "Question",
            "name": "Is my PayPal data secure?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. This tool runs 100% in your browser. Your PayPal data never leaves your computer and is never uploaded to any server."
            }
        },
        {
            "@type": "Question",
            "name": "Which PayPal columns should I map?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Map 'Date' to Date, 'Gross' or 'Net' to Amount, and 'Name' or 'Description' to Description. The tool auto-detects these standard PayPal column names."
            }
        }
    ]
};

const useCases = [
    { title: "Reconcile PayPal Sales in QuickBooks", desc: "Import all your PayPal transactions for accurate sales tracking and bank reconciliation." },
    { title: "Track E-commerce Revenue", desc: "See every eBay, Etsy, or online store payment received through PayPal." },
    { title: "Monthly PayPal Imports", desc: "Download PayPal exports monthly and import to QuickBooks without expensive integrations." },
    { title: "Replace Paid PayPal-QuickBooks Apps", desc: "Stop paying for third-party sync apps. Manual import is free with this tool." },
];

const relatedTools = [
    { href: "/convert/stripe-to-qbo", title: "Stripe to QBO" },
    { href: "/convert/csv-to-qbo", title: "CSV to QBO" },
    { href: "/convert/csv-to-ofx", title: "CSV to OFX" },
    { href: "/convert-bank-statement-to-quickbooks-xero", title: "PDF to QuickBooks" },
];

export default function PaypalToQboPage() {
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

            {/* Hero Header */}
            <section className="py-8 px-6 text-center border-b border-[hsl(var(--border))]">
                <div className="max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Wallet className="w-4 h-4" />
                        PayPal + QuickBooks
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-3">
                        Convert PayPal to QuickBooks (QBO) Free
                    </h1>
                    <p className="text-lg text-[hsl(var(--muted-foreground))]">
                        Export your PayPal transaction history as CSV, upload here, and download a QuickBooks-ready QBO file. No signup, 100% private.
                    </p>
                </div>
            </section>

            {/* Tool Section - Uses generic CsvToQboTool which works with PayPal CSV */}
            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <CsvToQboTool hideHeader={true} />
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free PayPal to QuickBooks Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Lock, title: "100% Private", desc: "Your PayPal data never leaves your device. All processing happens locally in your browser." },
                            { icon: ArrowUpDown, title: "Smart Column Mapping", desc: "Auto-detects PayPal's Date, Gross, Name, and Description columns." },
                            { icon: Zap, title: "Instant Conversion", desc: "No uploads, no waiting. Convert your PayPal export instantly." },
                            { icon: Shield, title: "No Signup Required", desc: "No email, no account, no subscription. Just drop your file and convert." },
                            { icon: Database, title: "Edit Before Export", desc: "Preview, edit, and clean up transactions before importing to QuickBooks." },
                            { icon: TrendingUp, title: "Replace Paid Apps", desc: "Stop paying monthly fees for PayPal-QuickBooks sync apps." },
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

            {/* How To Section - PayPal Specific */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        How to Import PayPal Transactions to QuickBooks
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Export from PayPal", desc: "Log into PayPal → Activity → Statements or Download → Select date range → Download CSV." },
                            { step: 2, title: "Upload PayPal CSV Here", desc: "Drag and drop or click to select your PayPal activity CSV file." },
                            { step: 3, title: "Map Columns", desc: "Match Date, Gross (or Net), and Name/Description. We auto-detect PayPal formats." },
                            { step: 4, title: "Download QBO File", desc: "Click Export to download your QuickBooks-ready .qbo file." },
                            { step: 5, title: "Import to QuickBooks", desc: "In QuickBooks: Banking → Upload Transactions → Select your QBO file." },
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
                        Perfect for PayPal Users
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

            {/* Comparison Table - PayPal to QuickBooks */}
            <section className="py-12 md:py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Best Free PayPal to QuickBooks Converter
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Compare to paid PayPal-QuickBooks sync apps
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]/10">
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--foreground))]">Feature</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--primary))]">Statement Extract</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--muted-foreground))]">Paid Apps</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: "Price", us: "Free forever", competitors: "$15-30/month" },
                                    { feature: "File Upload", us: "None (browser only)", competitors: "Syncs via cloud" },
                                    { feature: "Data Privacy", us: "100% local", competitors: "Stored on servers" },
                                    { feature: "Edit Before Import", us: "Yes", competitors: "Limited" },
                                    { feature: "Fee Handling", us: "Gross or Net amounts", competitors: "Varies" },
                                    { feature: "Transaction Limit", us: "Unlimited", competitors: "Often capped" },
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
                        The Best Free PayPal to QuickBooks Converter
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Need to get your <strong>PayPal transactions into QuickBooks</strong> without paying for expensive integrations? Our free PayPal to QBO converter transforms any PayPal CSV export into QuickBooks Web Connect format instantly. Unlike subscription-based sync apps, this tool is <strong>100% free</strong> with no limits.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Whether you're selling on eBay, Etsy, or your own website, receiving payments from clients, or managing a small business, this tool makes <strong>PayPal to QuickBooks import</strong> simple and secure.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Convert PayPal CSV to QBO Format?
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>No Expensive Apps:</strong> Stop paying for third-party PayPal-QuickBooks integrations.</li>
                        <li><strong>Full Control:</strong> Review and edit transactions before they enter QuickBooks.</li>
                        <li><strong>Privacy First:</strong> Your financial data never leaves your browser.</li>
                        <li><strong>Works Offline:</strong> Once loaded, the tool works without internet.</li>
                        <li><strong>No Signup:</strong> No account needed. Just convert and download.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        PayPal Export Columns We Support
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Our converter works with standard PayPal activity downloads:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li>Date, Time, Name, Type, Status</li>
                        <li>Gross, Fee, Net amounts</li>
                        <li>Transaction ID, Reference Txn ID</li>
                        <li>Subject, Note, and other details</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        About PayPal Transaction Exports
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>PayPal</strong> is the world's most widely used digital payment platform. When you export your activity from PayPal, you get a comprehensive CSV file detailing every financial event, including:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>Date & Time:</strong> Exact timestamp of the transaction</li>
                        <li><strong>Name:</strong> Sender or recipient name</li>
                        <li><strong>Type:</strong> Transaction type (Payment, Refund, Transfer, Fee)</li>
                        <li><strong>Gross:</strong> Total amount involved</li>
                        <li><strong>Fee:</strong> PayPal's transaction fee</li>
                        <li><strong>Net:</strong> The actual amount credited/debited</li>
                        <li><strong>Transaction ID:</strong> Unique reference number for tracking</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Convert PayPal to Other Formats
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        PayPal exports can be converted to various accounting software formats:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                        {[
                            { name: "PayPal to QBO", current: true },
                            { name: "PayPal to Excel" },
                            { name: "PayPal to CSV" },
                            { name: "PayPal to OFX" },
                            { name: "PayPal to Xero" },
                            { name: "PayPal to IIF" },
                        ].map((format, i) => (
                            format.current ? (
                                <span key={i} className="px-3 py-2 rounded-lg bg-[hsl(var(--primary))] text-white text-sm font-medium text-center">
                                    {format.name} ✓
                                </span>
                            ) : (
                                <span key={i} className="px-3 py-2 rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-sm font-medium text-center text-[hsl(var(--muted-foreground))]">
                                    {format.name}
                                </span>
                            )
                        ))}
                    </div>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Import Payment Platforms to QuickBooks
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Other payment sources you can import to QuickBooks:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                        {[
                            "Stripe to QuickBooks",
                            "Square to QuickBooks",
                            "Shopify to QuickBooks",
                            "Venmo to QuickBooks",
                            "Wise to QuickBooks",
                            "Bank CSV to QuickBooks",
                        ].map((name, i) => (
                            <span key={i} className="px-3 py-2 rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-sm font-medium text-center text-[hsl(var(--muted-foreground))]">
                                {name}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Convert PayPal to QBO Format?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>QBO (QuickBooks Web Connect)</strong> is the standard format for importing bank feeds into QuickBooks. By converting your PayPal CSV to QBO, you gain several advantages:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>Manual Control:</strong> Import only the transactions you need, when you need them</li>
                        <li><strong>Fee Separation:</strong> Clearly distinguish between gross sales and PayPal fees</li>
                        <li><strong>Review Before Import:</strong> Clean up descriptions or categories before they hit your books</li>
                        <li><strong>Historical Data:</strong> Import old transactions that live feed integrations might miss</li>
                        <li><strong>Cost Savings:</strong> Eliminate subscription costs for sync tools</li>
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
                            { q: "How do I export my PayPal transactions?", a: "Log into PayPal, go to Activity, click 'Statements' or 'Download', select your date range, choose CSV format, and download. Upload that file here." },
                            { q: "Which PayPal columns should I map?", a: "Map 'Date' to Date, 'Gross' or 'Net' to Amount, and 'Name' to Description. The tool auto-detects these standard PayPal column names." },
                            { q: "Can I import PayPal Business payments?", a: "Yes! Export your PayPal Business account transactions as CSV and convert them here." },
                            { q: "Does this handle PayPal fees?", a: "PayPal exports include a 'Fee' column. Map the 'Gross' column to see full payment amounts, or 'Net' to see amounts after fees." },
                            { q: "Is this better than paid PayPal-QuickBooks apps?", a: "For manual monthly imports, yes. Paid apps offer real-time sync, but if you're okay with periodic imports, this free tool works perfectly." },
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
                currentTool="PayPal to QBO"
                relatedTools={relatedTools}
            />
        </main>
    );
}
