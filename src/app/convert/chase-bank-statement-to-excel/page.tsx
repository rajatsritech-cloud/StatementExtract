import { Metadata } from "next";
import Link from "next/link";
import { BankStatementConverter } from "@/components/BankStatementConverter";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { CheckCircle, Shield, Zap, Building2, FileSpreadsheet } from "lucide-react";

export const metadata: Metadata = {
    title: "Chase Bank Statement to Excel Converter | Free PDF to CSV | Statement Extract",
    description: "Convert Chase Bank PDF statements to Excel or CSV instantly. Free online tool for Chase checking, savings, and credit card statements. No signup, high-precision accuracy.",
    keywords: "chase bank statement to excel, chase statement converter, chase pdf to excel, chase bank statement csv, convert chase statement, chase bank pdf converter, chase checking statement excel, chase credit card statement excel",
    openGraph: {
        title: "Chase Bank Statement to Excel Converter - Free Online Tool",
        description: "Convert your Chase Bank PDF statements to Excel or CSV format instantly. Works with checking, savings, and credit card statements.",
        type: "website",
        url: "https://statementextract.com/convert/chase-bank-statement-to-excel",
        locale: "en_US"
    },
    twitter: {
        card: "summary_large_image",
        title: "Chase Bank Statement to Excel - Free Converter",
        description: "Convert Chase PDF statements to Excel instantly. No signup required."
    },
    alternates: {
        canonical: "https://statementextract.com/convert/chase-bank-statement-to-excel/"
    }
};

const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Chase Bank Statement to Excel Converter",
    "description": "Free online tool to convert Chase Bank PDF statements to Excel or CSV format",
    "applicationCategory": "BusinessApplication",
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
            "name": "How do I convert my Chase bank statement to Excel?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Download your Chase statement as a PDF from chase.com, then upload it to our free converter. The tool will extract all transactions and let you download as Excel (.xlsx) or CSV format."
            }
        },
        {
            "@type": "Question",
            "name": "Does this work with Chase credit card statements?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our converter works with all Chase statement types including Chase Total Checking, Chase Savings, Chase Sapphire, Chase Freedom, and all other Chase credit card statements."
            }
        },
        {
            "@type": "Question",
            "name": "Is it safe to upload my Chase statement?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Your files are processed securely with bank-level 256-bit encryption. We never store your statement data permanently."
            }
        },
        {
            "@type": "Question",
            "name": "Can I convert multiple Chase statements at once?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, you can upload multiple PDF files and convert them all in one batch. Each will be processed and available for download."
            }
        },
        {
            "@type": "Question",
            "name": "How accurate is the Chase statement conversion?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our AI-powered tool achieves High accuracy on Chase statements using intelligent document processing specifically trained on bank statement formats."
            }
        },
        {
            "@type": "Question",
            "name": "Can I import the converted data into QuickBooks?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! The CSV output is fully compatible with QuickBooks, Xero, Sage, and other accounting software for easy bank feed import."
            }
        }
    ]
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://statementextract.com" },
        { "@type": "ListItem", "position": 2, "name": "Converters", "item": "https://statementextract.com/convert" },
        { "@type": "ListItem", "position": 3, "name": "Chase Bank Statement to Excel", "item": "https://statementextract.com/convert/chase-bank-statement-to-excel" }
    ]
};

// HowTo Schema for step-by-step instructions (helps with rich snippets)
const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Convert Chase Bank Statement to Excel",
    "step": [
        { "@type": "HowToStep", "name": "Download Statement", "text": "Log into chase.com, go to Statements, and download your statement as a PDF file." },
        { "@type": "HowToStep", "name": "Upload to Converter", "text": "Drag and drop your Chase PDF or click to browse and select the file." },
        { "@type": "HowToStep", "name": "Choose Format", "text": "Select Excel (.xlsx) or CSV format for your converted data." },
        { "@type": "HowToStep", "name": "Download Results", "text": "Get your clean, organized data ready for Excel, QuickBooks, or Xero." }
    ]
};

const relatedTools = [
    { href: "/convert/wells-fargo-statement-to-excel", title: "Wells Fargo Statement to Excel" },
    { href: "/convert/bank-of-america-statement-to-excel", title: "Bank of America Statement to Excel" },
    { href: "/convert-bank-statement-to-quickbooks-xero", title: "Bank Statement to QuickBooks" },
    { href: "/convert/qbo-to-csv", title: "QBO to CSV Converter" },
];

export default function ChaseBankStatementPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            {/* Schema */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

            {/* Hero with embedded tool */}
            <section className="py-8 md:py-12 px-6 border-b border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30">
                        <Building2 className="w-5 h-5 text-[hsl(var(--primary))]" />
                        <span className="font-medium text-[hsl(var(--primary))]">Chase Bank Statements</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-4">
                        Chase Bank Statement to <span className="bg-gradient-primary bg-clip-text text-transparent">Excel Converter</span>
                    </h1>
                    <p className="text-lg text-[hsl(var(--muted-foreground))]">
                        Convert your Chase checking, savings, or credit card PDF statements to Excel or CSV format in seconds.
                    </p>
                </div>

                {/* Embedded Tool */}
                <BankStatementConverter />
            </section>

            {/* Supported Chase Statement Types */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Works with All Chase Statement Types
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            "Chase Total Checking",
                            "Chase Premier Plus Checking",
                            "Chase Secure Banking",
                            "Chase Savings",
                            "Chase Sapphire Preferred",
                            "Chase Sapphire Reserve",
                            "Chase Freedom Unlimited",
                            "Chase Freedom Flex",
                            "Chase Ink Business",
                        ].map((type) => (
                            <div key={type} className="flex items-center gap-3 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="font-medium text-[hsl(var(--foreground))]">{type}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        How to Convert Chase Statements to Excel
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Download from Chase.com", desc: "Log into your Chase account, go to Statements, and download your statement as PDF." },
                            { step: 2, title: "Upload to Our Converter", desc: "Drag and drop your Chase PDF or click to browse. Multiple files supported." },
                            { step: 3, title: "Get Your Excel/CSV", desc: "Our AI extracts all transactions with High accuracy. Download as Excel or CSV." },
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

            {/* Features */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: Zap, title: "Instant Conversion", desc: "Convert Chase statements in seconds, not minutes. AI-powered for speed." },
                            { icon: Shield, title: "Bank-Level Security", desc: "Your Chase data never leaves your device. 256-bit encryption." },
                            { icon: FileSpreadsheet, title: "Perfect Formatting", desc: "Get clean columns: Date, Description, Amount, Balance. QuickBooks ready." },
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
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        Why Convert Chase Bank Statements to Excel?
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>Chase</strong> is America&apos;s largest bank with over 80 million customers. Whether you&apos;re reconciling your <strong>Chase Total Checking</strong> account, tracking <strong>Chase Sapphire</strong> rewards spending, or preparing tax documents, converting your <strong>Chase PDF statements to Excel</strong> makes financial management easier.
                    </p>
                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Common Use Cases
                    </h3>
                    <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-6 space-y-2">
                        <li><strong>Tax Preparation:</strong> Export Chase transactions for Schedule C, mortgage applications, or CPA review</li>
                        <li><strong>Business Bookkeeping:</strong> Import Chase business checking into QuickBooks or Xero</li>
                        <li><strong>Expense Tracking:</strong> Analyze Chase credit card spending by category</li>
                        <li><strong>Loan Applications:</strong> Provide clean bank statements for mortgage or SBA loans</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Other Bank Statement Converters
                    </h3>
                    <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] space-y-2">
                        <li><Link href="/convert/wells-fargo-statement-to-excel" className="text-[hsl(var(--primary))] hover:underline">Wells Fargo Statement to Excel</Link></li>
                        <li><Link href="/convert/bank-of-america-statement-to-excel" className="text-[hsl(var(--primary))] hover:underline">Bank of America Statement to Excel</Link></li>
                        <li><Link href="/convert-bank-statement-to-csv-excel" className="text-[hsl(var(--primary))] hover:underline">Any Bank Statement to Excel</Link></li>
                        <li><Link href="/convert-bank-statement-to-quickbooks-xero" className="text-[hsl(var(--primary))] hover:underline">Bank Statement to QuickBooks</Link></li>
                    </ul>
                </div>
            </section>

            {/* Who Uses This Tool - E-E-A-T */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Who Uses Our Chase Statement Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: "CPAs & Accountants", desc: "Process client Chase statements for tax returns, audits, and monthly reconciliations. Save hours of manual data entry." },
                            { title: "Small Business Owners", desc: "Import Chase Business Checking transactions into QuickBooks, Xero, or Excel for bookkeeping and expense tracking." },
                            { title: "Mortgage Applicants", desc: "Provide lenders with clean, organized bank statements for home loan applications and refinancing." },
                            { title: "Freelancers & Contractors", desc: "Track income and expenses from Chase accounts for Schedule C tax filing and quarterly estimates." },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{item.title}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comprehensive FAQ Section */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            { q: "How do I download my Chase bank statement as a PDF?", a: "Log into chase.com, go to your account, click 'See statements', select the month you need, and click the download or print icon to save as PDF." },
                            { q: "Does this work with scanned Chase statements?", a: "Yes! Our AI-powered OCR technology can extract data from scanned PDFs and images with high-precision accuracy." },
                            { q: "Can I convert multiple Chase statements at once?", a: "Yes, you can upload multiple PDF files and convert them all in one batch. Each will be processed and available for download." },
                            { q: "Is my Chase financial data secure?", a: "Absolutely. All processing happens securely with bank-level 256-bit encryption. We never store your statement data permanently." },
                            { q: "What format will my converted Chase statement be in?", a: "You can choose Excel (.xlsx) or CSV format. Both include clean columns: Date, Description, Amount, and Balance." },
                            { q: "Will this work with Chase credit card statements?", a: "Yes! We support all Chase statement types including Sapphire, Freedom, Ink Business, and all checking/savings accounts." },
                            { q: "How accurate is the Chase statement conversion?", a: "Our AI achieves high accuracy on Chase statements. We use intelligent document processing specifically trained on bank statement formats." },
                            { q: "Can I import the converted data into QuickBooks?", a: "Yes! The CSV output is fully compatible with QuickBooks, Xero, Sage, and other accounting software for easy bank feed import." },
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{faq.q}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Tools + CTA */}
            <ToolPageFooter
                currentTool="Chase Bank Statement to Excel"
                relatedTools={relatedTools}
            />
        </main>
    );
}
