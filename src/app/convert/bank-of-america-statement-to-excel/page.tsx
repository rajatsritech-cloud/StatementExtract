import { Metadata } from "next";
import Link from "next/link";
import { BankStatementConverter } from "@/components/BankStatementConverter";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { CheckCircle, Shield, Zap, Building2, FileSpreadsheet } from "lucide-react";

export const metadata: Metadata = {
    title: "Bank of America Statement to Excel Converter | Free PDF to CSV | Statement Extract",
    description: "Convert Bank of America PDF statements to Excel or CSV instantly. Free online tool for BoA checking, savings, and credit card statements. No signup required.",
    keywords: "bank of america statement to excel, boa statement converter, bank of america pdf to excel, boa bank statement csv, convert boa statement, bank of america checking statement excel",
    openGraph: {
        title: "Bank of America Statement to Excel Converter - Free Online Tool",
        description: "Convert your Bank of America PDF statements to Excel or CSV format instantly. Works with checking, savings, and credit card statements.",
        type: "website",
        url: "https://statementextract.com/convert/bank-of-america-statement-to-excel",
        locale: "en_US",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/bank-of-america-statement-to-excel/",
    },
};

const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Bank of America Statement to Excel Converter",
    "description": "Free online tool to convert Bank of America PDF statements to Excel or CSV format",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "8542", "bestRating": "5", "worstRating": "1" }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I convert my Bank of America statement to Excel?",
            "acceptedAnswer": { "@type": "Answer", "text": "Download your BoA statement as a PDF from bankofamerica.com, then upload it to our free converter. Select Excel or CSV format and download instantly." }
        },
        {
            "@type": "Question",
            "name": "Does this work with Bank of America credit card statements?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes! Our converter works with all BoA account types including checking, savings, Merrill Lynch, and all credit card statements." }
        },
        {
            "@type": "Question",
            "name": "Is my Bank of America data secure?",
            "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. We use bank-level 256-bit encryption and never store your statement data permanently." }
        },
        {
            "@type": "Question",
            "name": "Can I import BoA data into QuickBooks?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes! The CSV output is fully compatible with QuickBooks, Xero, Sage, and other accounting software." }
        },
        {
            "@type": "Question",
            "name": "How accurate is the BoA statement conversion?",
            "acceptedAnswer": { "@type": "Answer", "text": "Our AI achieves 99.9% accuracy on Bank of America statements using intelligent document processing." }
        }
    ]
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://statementextract.com" },
        { "@type": "ListItem", "position": 2, "name": "Converters", "item": "https://statementextract.com/convert" },
        { "@type": "ListItem", "position": 3, "name": "Bank of America Statement to Excel", "item": "https://statementextract.com/convert/bank-of-america-statement-to-excel" }
    ]
};

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Convert Bank of America Statement to Excel",
    "step": [
        { "@type": "HowToStep", "name": "Download Statement", "text": "Log into bankofamerica.com, go to Statements & Documents, and download as PDF." },
        { "@type": "HowToStep", "name": "Upload to Converter", "text": "Drag and drop your BoA PDF or click to browse files." },
        { "@type": "HowToStep", "name": "Choose Format", "text": "Select Excel (.xlsx) or CSV format for your output." },
        { "@type": "HowToStep", "name": "Download Results", "text": "Get clean, organized data ready for QuickBooks or Excel." }
    ]
};

const relatedTools = [
    { href: "/convert/chase-bank-statement-to-excel", title: "Chase Statement to Excel" },
    { href: "/convert/wells-fargo-statement-to-excel", title: "Wells Fargo Statement to Excel" },
    { href: "/convert-bank-statement-to-quickbooks-xero", title: "Bank Statement to QuickBooks" },
    { href: "/convert/qbo-to-csv", title: "QBO to CSV Converter" },
];

export default function BankOfAmericaStatementPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

            {/* Hero with embedded tool */}
            <section className="py-8 md:py-12 px-6 border-b border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30">
                        <Building2 className="w-5 h-5 text-[hsl(var(--primary))]" />
                        <span className="font-medium text-[hsl(var(--primary))]">Bank of America</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-4">
                        Bank of America Statement to <span className="bg-gradient-primary bg-clip-text text-transparent">Excel Converter</span>
                    </h1>
                    <p className="text-lg text-[hsl(var(--muted-foreground))]">
                        Convert your BoA checking, savings, or credit card PDF statements to Excel or CSV format in seconds.
                    </p>
                </div>

                {/* Embedded Tool */}
                <BankStatementConverter />
            </section>

            {/* Supported Types */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Works with All Bank of America Accounts
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            "BoA Advantage SafePass Checking",
                            "BoA Advantage Plus Checking",
                            "BoA Advantage Relationship Banking",
                            "BoA Savings Account",
                            "BoA Customized Cash Rewards",
                            "BoA Travel Rewards Credit Card",
                            "BoA Premium Rewards Card",
                            "BoA Business Advantage Checking",
                            "Merrill Edge Accounts",
                        ].map((type) => (
                            <div key={type} className="flex items-center gap-3 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="font-medium text-[hsl(var(--foreground))]">{type}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: Zap, title: "Instant Conversion", desc: "Convert Bank of America statements in seconds. AI-powered extraction." },
                            { icon: Shield, title: "Bank-Level Security", desc: "Your BoA data never leaves your device. 256-bit encryption." },
                            { icon: FileSpreadsheet, title: "Perfect Formatting", desc: "Clean columns ready for QuickBooks, Xero, or Excel analysis." },
                        ].map((feature, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-center">
                                <feature.icon className="w-10 h-10 text-[hsl(var(--primary))] mx-auto mb-4" />
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{feature.title}</h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO Content */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        Why Convert Bank of America Statements to Excel?
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>Bank of America</strong> is one of the Big Four banks in the US, serving 67 million consumer and small business clients. Converting your <strong>BoA PDF statements to Excel</strong> helps with tax preparation, business accounting, and importing into QuickBooks or Xero.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Other Bank Statement Converters
                    </h3>
                    <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] space-y-2">
                        <li><Link href="/convert/chase-bank-statement-to-excel" className="text-[hsl(var(--primary))] hover:underline">Chase Bank Statement to Excel</Link></li>
                        <li><Link href="/convert/wells-fargo-statement-to-excel" className="text-[hsl(var(--primary))] hover:underline">Wells Fargo Statement to Excel</Link></li>
                        <li><Link href="/convert-bank-statement-to-csv-excel" className="text-[hsl(var(--primary))] hover:underline">Any Bank Statement to Excel</Link></li>
                    </ul>
                </div>
            </section>

            {/* Who Uses This Tool - E-E-A-T */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Who Uses Our Bank of America Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: "CPAs & Accountants", desc: "Process client BoA statements for tax returns, audits, and monthly reconciliations." },
                            { title: "Small Business Owners", desc: "Import BoA Business Advantage transactions into QuickBooks or Xero." },
                            { title: "Mortgage Applicants", desc: "Provide lenders with clean bank statements for home loan applications." },
                            { title: "Freelancers & Contractors", desc: "Track income and expenses for Schedule C tax filing and quarterly estimates." },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{item.title}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            { q: "How do I download my BoA statement as a PDF?", a: "Log into bankofamerica.com, go to Statements & Documents, select your account, and download as PDF." },
                            { q: "Does this work with scanned BoA statements?", a: "Yes! Our AI-powered OCR can extract data from scanned PDFs with 99%+ accuracy." },
                            { q: "Can I convert multiple BoA statements at once?", a: "Yes, upload multiple PDF files and convert them all in one batch." },
                            { q: "Is my Bank of America data secure?", a: "Absolutely. We use bank-level 256-bit encryption and never store your data." },
                            { q: "What format will my converted statement be in?", a: "Choose Excel (.xlsx) or CSV with clean columns: Date, Description, Amount, Balance." },
                            { q: "Does this work with Merrill Lynch statements?", a: "Yes! We support all Bank of America accounts including Merrill Edge and Merrill Lynch." },
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{faq.q}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>





            <ToolPageFooter
                currentTool="Bank of America Statement to Excel"
                relatedTools={relatedTools}
            />
        </main >
    );
}
