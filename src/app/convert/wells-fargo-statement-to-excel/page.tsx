import { Metadata } from "next";
import Link from "next/link";
import { BankStatementConverter } from "@/components/BankStatementConverter";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { CheckCircle, Shield, Zap, Building2, FileSpreadsheet } from "lucide-react";

export const metadata: Metadata = {
    title: "Wells Fargo Statement to Excel Converter | Free PDF to CSV | Statement Extract",
    description: "Convert Wells Fargo PDF statements to Excel or CSV instantly. Free online tool for Wells Fargo checking, savings, and credit card statements. No signup required.",
    keywords: "wells fargo statement to excel, wells fargo pdf converter, wells fargo bank statement csv, convert wells fargo statement, wells fargo checking statement excel, wells fargo statement download excel",
    openGraph: {
        title: "Wells Fargo Statement to Excel Converter - Free Online Tool",
        description: "Convert your Wells Fargo PDF statements to Excel or CSV format instantly. Works with checking, savings, and credit card statements.",
        type: "website",
        url: "https://statementextract.com/convert/wells-fargo-statement-to-excel",
        locale: "en_US"
    },
    alternates: {
        canonical: "https://statementextract.com/convert/wells-fargo-statement-to-excel/"
    }
};

const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Wells Fargo Statement to Excel Converter",
    "description": "Free online tool to convert Wells Fargo PDF statements to Excel or CSV format",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I convert my Wells Fargo statement to Excel?",
            "acceptedAnswer": { "@type": "Answer", "text": "Download your Wells Fargo statement as a PDF from wellsfargo.com, then upload it to our free converter. Select Excel or CSV format and download instantly." }
        },
        {
            "@type": "Question",
            "name": "Does this work with Wells Fargo business accounts?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes! Our converter works with all Wells Fargo account types including personal checking, savings, business checking, and credit card statements." }
        },
        {
            "@type": "Question",
            "name": "Is my Wells Fargo data secure?",
            "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. All processing uses bank-level 256-bit encryption. We never store your statement data permanently." }
        },
        {
            "@type": "Question",
            "name": "Can I import Wells Fargo data into QuickBooks?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes! The CSV output is fully compatible with QuickBooks, Xero, Sage, and other accounting software." }
        },
        {
            "@type": "Question",
            "name": "How accurate is Wells Fargo statement conversion?",
            "acceptedAnswer": { "@type": "Answer", "text": "Our AI achieves High accuracy on Wells Fargo statements using intelligent document processing." }
        }
    ]
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://statementextract.com" },
        { "@type": "ListItem", "position": 2, "name": "Converters", "item": "https://statementextract.com/convert" },
        { "@type": "ListItem", "position": 3, "name": "Wells Fargo Statement to Excel", "item": "https://statementextract.com/convert/wells-fargo-statement-to-excel" }
    ]
};

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Convert Wells Fargo Statement to Excel",
    "step": [
        { "@type": "HowToStep", "name": "Download Statement", "text": "Log into wellsfargo.com, go to Statements & Documents, and download your statement as PDF." },
        { "@type": "HowToStep", "name": "Upload to Converter", "text": "Drag and drop your Wells Fargo PDF or click to browse files." },
        { "@type": "HowToStep", "name": "Choose Format", "text": "Select Excel (.xlsx) or CSV format for your output." },
        { "@type": "HowToStep", "name": "Download Results", "text": "Get clean, organized data ready for QuickBooks or Excel." }
    ]
};

const relatedTools = [
    { href: "/convert/chase-bank-statement-to-excel", title: "Chase Statement to Excel" },
    { href: "/convert/bank-of-america-statement-to-excel", title: "Bank of America Statement to Excel" },
    { href: "/convert-bank-statement-to-quickbooks-xero", title: "Bank Statement to QuickBooks" },
    { href: "/convert/qbo-to-csv", title: "QBO to CSV Converter" },
];

export default function WellsFargoStatementPage() {
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
                        <span className="font-medium text-[hsl(var(--primary))]">Wells Fargo Statements</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-4">
                        Wells Fargo Statement to <span className="bg-gradient-primary bg-clip-text text-transparent">Excel Converter</span>
                    </h1>
                    <p className="text-lg text-[hsl(var(--muted-foreground))]">
                        Convert your Wells Fargo checking, savings, or credit card PDF statements to Excel or CSV format in seconds.
                    </p>
                </div>

                {/* Embedded Tool */}
                <BankStatementConverter />
            </section>

            {/* Supported Types */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Works with All Wells Fargo Accounts
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            "Wells Fargo Everyday Checking",
                            "Wells Fargo Preferred Checking",
                            "Wells Fargo Way2Save Savings",
                            "Wells Fargo Platinum Savings",
                            "Wells Fargo Active Cash Card",
                            "Wells Fargo Autograph Card",
                            "Wells Fargo Business Checking",
                            "Wells Fargo Business Savings",
                            "Wells Fargo Commercial Banking",
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
                            { icon: Zap, title: "Instant Conversion", desc: "Convert Wells Fargo statements in seconds. AI-powered extraction." },
                            { icon: Shield, title: "Bank-Level Security", desc: "Your Wells Fargo data never leaves your device. 256-bit encryption." },
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
                        Why Convert Wells Fargo Statements to Excel?
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>Wells Fargo</strong> is one of the largest banks in the United States, serving millions of personal and business customers. Converting your <strong>Wells Fargo PDF statements to Excel</strong> helps with tax preparation, expense tracking, and importing into accounting software like QuickBooks.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Other Bank Statement Converters
                    </h3>
                    <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] space-y-2">
                        <li><Link href="/convert/chase-bank-statement-to-excel" className="text-[hsl(var(--primary))] hover:underline">Chase Bank Statement to Excel</Link></li>
                        <li><Link href="/convert/bank-of-america-statement-to-excel" className="text-[hsl(var(--primary))] hover:underline">Bank of America Statement to Excel</Link></li>
                        <li><Link href="/convert-bank-statement-to-csv-excel" className="text-[hsl(var(--primary))] hover:underline">Any Bank Statement to Excel</Link></li>
                    </ul>
                </div>
            </section>

            {/* Who Uses This Tool - E-E-A-T */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Who Uses Our Wells Fargo Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: "CPAs & Accountants", desc: "Process client Wells Fargo statements for tax returns, audits, and reconciliations." },
                            { title: "Small Business Owners", desc: "Import Wells Fargo Business Checking into QuickBooks or Xero for bookkeeping." },
                            { title: "Mortgage Applicants", desc: "Provide lenders with organized bank statements for home loan applications." },
                            { title: "Freelancers", desc: "Track income and expenses for Schedule C tax filing and quarterly estimates." },
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
                            { q: "How do I download my Wells Fargo statement as a PDF?", a: "Log into wellsfargo.com, go to Statements & Documents, select your account, choose the date range, and download as PDF." },
                            { q: "Does this work with scanned Wells Fargo statements?", a: "Yes! Our AI-powered OCR can extract data from scanned PDFs and images with high-precision accuracy." },
                            { q: "Can I convert multiple Wells Fargo statements at once?", a: "Yes, upload multiple PDF files and convert them all in one batch." },
                            { q: "Is my Wells Fargo data secure?", a: "Absolutely. We use bank-level 256-bit encryption and never store your data permanently." },
                            { q: "What format will my converted statement be in?", a: "Choose Excel (.xlsx) or CSV with clean columns: Date, Description, Amount, Balance." },
                            { q: "Can I import into QuickBooks?", a: "Yes! The CSV output is fully compatible with QuickBooks, Xero, Sage, and other accounting software." },
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
                currentTool="Wells Fargo Statement to Excel"
                relatedTools={relatedTools}
            />
        </main>
    );
}
