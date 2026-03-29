import { Metadata } from "next";
import { CsvToQboTool } from "@/components/qbo-tools/CsvToQboTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { PageMeta } from "@/components/PageMeta";
import {
    Zap,
    Shield,
    CreditCard,
    FileText,
    CheckCircle,
    Database,
    Lock,
    ArrowUpDown,
    TrendingUp
} from "lucide-react";

export const metadata: Metadata = {
    title: "Stripe to QuickBooks Converter Free | Import Stripe CSV to QBO | Statement Extract",
    description: "Free Stripe to QuickBooks converter. Convert Stripe transaction CSV exports to QBO format for easy QuickBooks import. Entirely browser-based, private, no signup required.",
    keywords: "stripe to quickbooks, stripe csv to qbo, import stripe to quickbooks, stripe transactions to quickbooks, stripe export to qbo, stripe quickbooks integration free, convert stripe csv",
    openGraph: {
        title: "Stripe to QuickBooks Converter Free | Import Stripe Transactions",
        description: "Convert Stripe payment exports to QuickBooks QBO format instantly. Free, private, no signup required.",
        type: "website",
        url: "https://statementextract.com/convert/stripe-to-qbo"
    },
    alternates: {
        canonical: "https://statementextract.com/convert/stripe-to-qbo/"
    }
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Stripe to QuickBooks QBO Converter",
    "description": "Convert Stripe transaction CSV exports to QuickBooks Web Connect (.qbo) format online for free.",
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
        { "@type": "ListItem", "position": 3, "name": "Stripe to QBO" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I export transactions from Stripe?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Log into Stripe Dashboard → Go to Payments or Balance → Click Export → Select CSV format → Download the file. Then upload it here to convert to QBO."
            }
        },
        {
            "@type": "Question",
            "name": "Can I import Stripe transactions directly into QuickBooks?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "QuickBooks doesn't have a direct Stripe import. Use this tool to convert your Stripe CSV export to QBO format, then import it via Banking → Upload Transactions."
            }
        },
        {
            "@type": "Question",
            "name": "Is this Stripe to QuickBooks converter free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, completely free with no limits. Convert unlimited Stripe transactions without signup or payment."
            }
        },
        {
            "@type": "Question",
            "name": "Is my Stripe data secure?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. This tool runs entirely in your browser. Your Stripe data never leaves your computer and is never uploaded to any server."
            }
        },
        {
            "@type": "Question",
            "name": "Which Stripe export format should I use?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Export as CSV from Stripe. The tool works with Payments, Payouts, or Balance Transaction exports. Just map the Date, Amount, and Description columns."
            }
        }
    ]
};

const useCases = [
    { title: "Reconcile Stripe Payments in QuickBooks", desc: "Import all your Stripe transactions for accurate bank reconciliation." },
    { title: "Track E-commerce Revenue", desc: "See every Shopify, WooCommerce, or custom checkout payment in QuickBooks." },
    { title: "Monthly Stripe Imports", desc: "Download Stripe exports monthly and import to QuickBooks without expensive integrations." },
    { title: "Replace Paid Stripe-QuickBooks Apps", desc: "Stop paying for third-party sync apps. Manual import is free with this tool." },
];

const relatedTools = [
    { href: "/convert/paypal-to-qbo", title: "PayPal to QBO" },
    { href: "/convert/csv-to-qbo", title: "CSV to QBO" },
    { href: "/convert/csv-to-ofx", title: "CSV to OFX" },
    { href: "/convert-bank-statement-to-quickbooks-xero", title: "PDF to QuickBooks" },
];

export default function StripeToQboPage() {
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
                        <CreditCard className="w-4 h-4" />
                        Stripe + QuickBooks
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-3">
                        Convert Stripe to QuickBooks (QBO) Free
                    </h1>
                    <p className="text-lg text-[hsl(var(--muted-foreground))]">
                        Export your Stripe transactions as CSV, upload here, and download a QuickBooks-ready QBO file. No signup, Private & Secure.
                    </p>
                </div>
            </section>

            {/* Tool Section - Reuses existing CsvToQboTool */}
            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <CsvToQboTool hideHeader={true} />
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free Stripe to QuickBooks Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Lock, title: "Private & Secure", desc: "Your Stripe data never leaves your device. All processing happens locally in your browser." },
                            { icon: ArrowUpDown, title: "Smart Column Mapping", desc: "Auto-detects Stripe's created, amount, and description columns." },
                            { icon: Zap, title: "Instant Conversion", desc: "No uploads, no waiting. Convert your Stripe export instantly." },
                            { icon: Shield, title: "No Signup Required", desc: "No email, no account, no subscription. Just drop your file and convert." },
                            { icon: Database, title: "Edit Before Export", desc: "Preview, edit, and clean up transactions before importing to QuickBooks." },
                            { icon: TrendingUp, title: "Replace Paid Apps", desc: "Stop paying $20+/month for Stripe-QuickBooks sync apps." },
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

            {/* How To Section - Stripe Specific */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        How to Import Stripe Transactions to QuickBooks
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Export from Stripe", desc: "Go to Stripe Dashboard → Payments → Export → Download as CSV." },
                            { step: 2, title: "Upload Stripe CSV Here", desc: "Drag and drop or click to select your Stripe CSV export file." },
                            { step: 3, title: "Map Columns", desc: "Match Date (created), Amount, and Description. We auto-detect Stripe formats." },
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
                        Perfect for Stripe Users
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

            {/* Comparison Table - Stripe to QuickBooks */}
            <section className="py-12 md:py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Best Free Stripe to QuickBooks Converter
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Compare to paid Stripe-QuickBooks sync apps
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
                                    { feature: "Price", us: "Free forever", competitors: "$20-50/month" },
                                    { feature: "File Upload", us: "None (browser only)", competitors: "Syncs via cloud" },
                                    { feature: "Data Privacy", us: "Entirely local", competitors: "Stored on servers" },
                                    { feature: "Edit Before Import", us: "Yes", competitors: "Limited" },
                                    { feature: "All Export Types", us: "Payments, Payouts, Balance", competitors: "Usually payments only" },
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
                        The Best Free Stripe to QuickBooks Converter
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Need to get your <strong>Stripe transactions into QuickBooks</strong> without paying for expensive integrations? Our free Stripe to QBO converter transforms any Stripe CSV export into QuickBooks Web Connect format instantly. Unlike subscription-based sync apps that cost $20-50/month, this tool is <strong>Free Online Tool</strong> with no limits.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Whether you're an e-commerce store owner using Stripe with Shopify or WooCommerce, a SaaS business tracking subscription payments, or a freelancer accepting online payments, this tool makes <strong>Stripe to QuickBooks import</strong> simple and secure.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Convert Stripe CSV to QBO Format?
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>No Expensive Apps:</strong> Stop paying for third-party Stripe-QuickBooks integrations.</li>
                        <li><strong>Full Control:</strong> Review and edit transactions before they enter QuickBooks.</li>
                        <li><strong>Privacy First:</strong> Your financial data never leaves your browser.</li>
                        <li><strong>Works Offline:</strong> Once loaded, the tool works without internet.</li>
                        <li><strong>No Signup:</strong> No account needed. Just convert and download.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Stripe Export Formats Supported
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Our converter works with all Stripe CSV export types:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li>Payments export (individual payment transactions)</li>
                        <li>Payouts export (transfers to your bank account)</li>
                        <li>Balance transactions (complete transaction ledger)</li>
                        <li>Invoices and subscriptions exports</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        About Stripe Transaction Exports
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>Stripe</strong> is a leading payment processing platform used by millions of businesses worldwide. When you export transactions from Stripe, you get a CSV file containing detailed information about each payment, including:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>created:</strong> Transaction timestamp (date and time)</li>
                        <li><strong>amount:</strong> Payment amount in smallest currency unit</li>
                        <li><strong>fee:</strong> Stripe processing fee deducted</li>
                        <li><strong>net:</strong> Amount after fees</li>
                        <li><strong>description:</strong> Payment description or invoice details</li>
                        <li><strong>customer_email:</strong> Customer email address</li>
                        <li><strong>status:</strong> Payment status (succeeded, failed, refunded)</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Convert Stripe to Other Formats
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Stripe exports can be converted to various accounting software formats:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                        {[
                            { name: "Stripe to QBO", current: true },
                            { name: "Stripe to Excel" },
                            { name: "Stripe to CSV" },
                            { name: "Stripe to OFX" },
                            { name: "Stripe to Xero" },
                            { name: "Stripe to QuickBooks" },
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
                        Other payment platforms you can import to QuickBooks:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                        {[
                            "PayPal to QuickBooks",
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
                        Why Convert Stripe to QBO Format?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>QBO (QuickBooks Web Connect)</strong> is the native import format for QuickBooks Online and Desktop. By converting your Stripe transactions to QBO format, you can:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>Import directly to QuickBooks:</strong> No third-party apps or monthly fees required</li>
                        <li><strong>Reconcile payments easily:</strong> Match Stripe income against bank deposits</li>
                        <li><strong>Track fees separately:</strong> See Stripe processing fees as individual expenses</li>
                        <li><strong>Maintain accurate books:</strong> Ensure revenue is recorded on the correct dates</li>
                        <li><strong>Save money:</strong> Avoid $20-50/month for automatic sync integrations</li>
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
                            { q: "How do I export my Stripe transactions?", a: "Log into Stripe Dashboard, go to Payments or Balance, click the Export button, select CSV format, and download. Upload that file here." },
                            { q: "Which Stripe columns should I map?", a: "Map 'created' or 'Created (UTC)' to Date, 'amount' or 'Amount' to Amount, and 'description' or 'Description' to Description. The tool auto-detects these." },
                            { q: "Does this work with Stripe Connect?", a: "Yes! Export your connected account transactions as CSV and convert them here." },
                            { q: "Can I import refunds and fees?", a: "Yes, all transaction types including charges, refunds, fees, and payouts can be converted and imported." },
                            { q: "Is this better than paid Stripe-QuickBooks apps?", a: "For manual monthly imports, yes. Paid apps offer real-time sync, but if you're okay with periodic imports, this free tool works perfectly." },
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
                currentTool="Stripe to QBO"
                relatedTools={relatedTools}
            />
        </main>
    );
}
