import { Metadata } from "next";
import { InvoiceGenerator } from "@/components/tools/InvoiceGenerator";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { PageMeta } from "@/components/PageMeta";
import {
    FileText,
    Download,
    Shield,
    CheckCircle,
    Globe,
    Zap,
    Printer
} from "lucide-react";

// Updated metadata - US priority, then UK/AU
export const metadata: Metadata = {
    title: "Free Invoice Generator for Freelancers & Contractors | 1099 Invoice Maker | Statement Extract",
    description: "Free invoice generator for freelancers, 1099 contractors, and small businesses. Create professional invoices with payment terms, tax ID, and digital signature. Works for US, UK (VAT), Australia (GST). No signup required.",
    keywords: "free invoice generator for freelancers, 1099 invoice template, contractor invoice generator, small business invoice maker, freelancer invoice template free, self employed invoice generator, invoice generator no sign up, professional invoice PDF free, invoice maker with signature, VAT invoice generator UK, GST invoice Australia, invoice template with tax",
    openGraph: {
        title: "Free Invoice Generator | Freelancer & 1099 Contractor Invoice Maker",
        description: "Create professional invoices for your freelance or contracting business. Free, no signup. Supports US, UK VAT, Australian GST.",
        type: "website",
        url: "https://statementextract.com/tools/invoice-generator",
    },
    alternates: {
        canonical: "https://statementextract.com/tools/invoice-generator",
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "VAT & GST Invoice Generator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "featureList": "VAT Invoice UK, GST Invoice Australia, Freelancer Templates, Digital Signature, Multi-Currency, PDF Export",
    "screenshot": "https://statementextract.com/images/invoice-generator-screenshot.png"
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://statementextract.com" },
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://statementextract.com/tools" },
        { "@type": "ListItem", "position": 3, "name": "Invoice Generator" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Does this invoice generator support international tax systems like VAT and GST?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Our generator is built for global business. You can customize tax labels for VAT, GST, or local Sales Tax, and it supports all major international currencies."
            }
        },
        {
            "@type": "Question",
            "name": "Is it completely free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, 100% free with no limits. No watermark, no signup, no credit card required."
            }
        },
        {
            "@type": "Question",
            "name": "How do I save my invoice?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Just click 'Download PDF'. Your data is also securely saved in your browser so you can edit it later."
            }
        }
    ]
};

const relatedTools = [
    { href: "/tools/self-employed-tax-calculator", title: "1099 Tax Calculator" },
    { href: "/tools/profit-margin-calculator", title: "Profit Calculator" },
    { href: "/convert-bank-statement-to-csv-excel", title: "Bank to Excel" },
    { href: "/convert/qif-to-qbo", title: "QIF to QBO" },
];

export default function InvoiceGeneratorPage() {
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

            {/* Hero Section */}
            <section className="py-16 px-6 text-center border-b border-[hsl(var(--border))] bg-gradient-to-b from-[hsl(var(--muted))]/10 to-transparent">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))] mb-4">
                        Free Professional Invoice Generator
                    </h1>
                    <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto text-xl mb-10 leading-relaxed">
                        The ultimate <span className="text-[hsl(var(--primary))] font-medium">Global Billing Solution</span> for Freelancers & Small Businesses.
                        Create VAT/GST compliant invoices and download PDFs in seconds.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-[hsl(var(--muted-foreground))]">
                        <span className="flex items-center gap-2 bg-[hsl(var(--card))] px-4 py-2 rounded-full border shadow-sm"><CheckCircle className="w-4 h-4 text-green-500" /> No Sign Up</span>
                        <span className="flex items-center gap-2 bg-[hsl(var(--card))] px-4 py-2 rounded-full border shadow-sm"><CheckCircle className="w-4 h-4 text-green-500" /> 100% Free</span>
                        <span className="flex items-center gap-2 bg-[hsl(var(--card))] px-4 py-2 rounded-full border shadow-sm"><CheckCircle className="w-4 h-4 text-green-500" /> Secure (Client-Side)</span>
                    </div>
                </div>
            </section>

            {/* Tool Section */}
            <section className="py-8 md:py-12 bg-[hsl(var(--background))]">
                <InvoiceGenerator />
            </section>

            {/* Structured How-To for AI GEO */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/10 border-t border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">How to Create a Professional Invoice in 4 Steps</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "1", title: "Business Info", desc: "Enter your company name, tax ID (VAT/GST/EIN), and contact details." },
                            { step: "2", title: "Client Details", desc: "Add your client's billing information and the unique invoice number." },
                            { step: "3", title: "Line Items", desc: "List services or products with quantities and rates for automatic calculation." },
                            { step: "4", title: "Download PDF", desc: "Preview your clean document and download a high-resolution PDF instantly." }
                        ].map((item) => (
                            <div key={item.step} className="relative p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-sm">
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[hsl(var(--primary))] text-white flex items-center justify-center font-bold shadow-lg">{item.step}</div>
                                <h3 className="font-bold mb-2 pt-2">{item.title}</h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Use This (Features) */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-t border-[hsl(var(--border))]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free Invoice Generator?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <Zap className="w-8 h-8 text-[hsl(var(--primary))] mb-4" />
                            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">Instant PDF Download</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Generate pristine PDFs instantly. No email required, no waiting.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <Shield className="w-8 h-8 text-[hsl(var(--primary))] mb-4" />
                            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">100% Client-Side Secure</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Your data never leaves your browser. Private and secure by design.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <Printer className="w-8 h-8 text-[hsl(var(--primary))] mb-4" />
                            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">Global Tax Compliance</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Supports VAT, GST, and Tax ID requirements for UK, Australia, Canada, and the US.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who is this for? (Competitor Style) */}
            <section className="py-12 md:py-16 px-6 border-t border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Who Needs a Professional Invoice Template?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex gap-4 p-6 rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/30 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold"><Globe className="w-5 h-5" /></div>
                            <div>
                                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">Freelancers & Consultants</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">Web developers, designers, and writers who need to bill clients per project or hour.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/30 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-green-600 font-bold"><Zap className="w-5 h-5" /></div>
                            <div>
                                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">Contractors (1099)</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">Construction, IT, or trade contractors requiring formal records for tax time.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/30 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0 text-purple-600 font-bold"><FileText className="w-5 h-5" /></div>
                            <div>
                                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">Small Business Owners</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">Sole proprietors needing a lightweight invoicing solution without monthly fees.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/30 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0 text-orange-600 font-bold"><Shield className="w-5 h-5" /></div>
                            <div>
                                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">Service Providers</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">Landscapers, cleaners, and caterers who need on-the-go invoicing.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Deep SEO Content Sections */}
            <section className="py-16 px-6 border-t border-[hsl(var(--border))]">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="prose prose-blue dark:prose-invert">
                            <h2 className="text-3xl font-bold mb-6">A Professional Approach to Global Invoicing</h2>
                            <p>
                                In today's global economy, professionalism in billing is non-negotiable. Whether you are a consultant in London, a developer in Sydney, or a contractor in New York, your invoice is the final impression you leave with a client.
                            </p>

                            {/* Summary Box for AI Parsing */}
                            <div className="my-8 p-6 rounded-xl bg-[hsl(var(--primary))]/5 border-l-4 border-[hsl(var(--primary))] italic text-sm">
                                <strong>Key Takeaway:</strong> A professional invoice generator ensures your billing is compliant, accurate, and visually consistent across all devices, reducing payment delays and establishing trust.
                            </div>

                            <h3 className="text-xl font-bold mt-8 mb-4">Why a Professional Template Matters</h3>
                            <p>
                                Using a dedicated **invoice maker** instead of a simple document editor ensures that all critical data points are captured. Features like automatic total calculations, clear currency symbols, and integrated digital signatures reduce friction in the payment process and ensure you get paid faster.
                            </p>
                            <ul className="space-y-4">
                                <li><strong>Trust & Credibility:</strong> Standardized layouts signal established business processes and attention to detail.</li>
                                <li><strong>Error Reduction:</strong> Pre-formatted fields prevent missing Tax IDs, bank details, or payment terms.</li>
                                <li><strong>Global Ready:</strong> Easily switch between VAT, GST, and standard sales tax labels.</li>
                            </ul>
                        </div>
                        <div className="space-y-8">
                            <div className="p-8 rounded-2xl bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/10 shadow-sm">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[hsl(var(--primary))]">
                                    <Globe className="w-6 h-6" /> International Tax Support
                                </h3>
                                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                                    Our tool is optimized for the highest-CPC markets globally, ensuring compliance across various jurisdictions without complex configurations:
                                </p>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="font-bold text-[hsl(var(--primary))] w-24 shrink-0">UK & IE:</div>
                                        <div className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">Full VAT (Value Added Tax) support with dedicated fields for registration numbers and standard tax rates.</div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="font-bold text-[hsl(var(--primary))] w-24 shrink-0">Australia:</div>
                                        <div className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">GST (Goods and Services Tax) compliant with ABN fields and professional "Tax Invoice" terminology.</div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="font-bold text-[hsl(var(--primary))] w-24 shrink-0">Canada:</div>
                                        <div className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">Flexible tax layers for provincial compliance (HST, GST, and PST Provincial taxes).</div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="font-bold text-[hsl(var(--primary))] w-24 shrink-0">USA:</div>
                                        <div className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">Built-in support for EIN/SSN labels and specific State and Federal tax split configurations.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic Keywords Section */}
            <section className="py-16 px-6 bg-[hsl(var(--muted))]/20 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-8">Empowering Freelancers with Enterprise-Grade Tools</h2>
                    <p className="text-lg text-[hsl(var(--muted-foreground))] mb-12">
                        Rank #1 in your professional billing workflow with a generator designed for speed, security, and global reach.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["Online Invoice Maker", "VAT Compliant", "Bank Grade Security", "No Sign Up", "Unlimited PDFs", "Multi-Currency", "Mobile Ready", "Custom Branding"].map((tag) => (
                            <div key={tag} className="py-3 px-4 rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-sm font-medium hover:border-[hsl(var(--primary))]/50 transition-colors">
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed SEO Content Block (Prose) */}
            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto prose prose-blue dark:prose-invert">
                    <h2 className="text-3xl font-bold mb-8">Comprehensive Guide to International Billing</h2>

                    <h3 className="text-xl font-bold mt-10 mb-4">Managing Currencies and Exchange Rates</h3>
                    <p>
                        When working with international clients, clear communication regarding currency is vital. Our **free invoice generator** allows you to select symbols for USD, EUR, GBP, AUD, and more. Transparent billing reduces disputes—always ensure your payment terms specify the preferred currency and any bank fees for international transfers.
                    </p>

                    <h3 className="text-xl font-bold mt-10 mb-4">The Importance of Digital Signatures</h3>
                    <p>
                        Adding a digital signature to your invoice is more than just a formality—it is a layer of authentication that protects both you and your client. It confirms the validity of the document and creates a sense of professional accountability. Our tool includes a built-in signature pad for easy, high-quality signing directly on your screen.
                    </p>

                    <h3 className="text-xl font-bold mt-10 mb-4">Best Practices for Global Record Keeping</h3>
                    <p>
                        While our tool is 100% client-side and does not store your private data, we recommend downloading and organizing your invoices by year and client. This makes tax preparation seamless, whether you are filing 1099s in the US, Self-Assessment in the UK, or BAS in Australia. A consistent file naming convention like `YYYY-MM-DD_Client_InvoiceID.pdf` is highly recommended.
                    </p>
                </div>
            </section>

            {/* Legal Disclaimer */}
            <section className="py-8 px-6 bg-[hsl(var(--card))] border-t border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-4">
                        <Shield className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                        <div className="text-sm text-[hsl(var(--muted-foreground))]">
                            <p className="font-semibold text-amber-700 dark:text-amber-500 mb-1">Legal Disclaimer</p>
                            <p>
                                This invoice generator is a tool for creating document templates. It does not constitute legal, accounting, or tax advice. You are responsible for ensuring your invoices comply with all applicable laws and regulations in your jurisdiction.
                            </p>
                            <p className="mt-2">
                                We do not store your data on our servers. All information is processed locally in your browser.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Author Attribution for E-E-A-T */}
            <section className="py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <PageMeta lastUpdated="December 2024" />
                </div>
            </section>

            {/* Footer */}
            <ToolPageFooter
                currentTool="Free Invoice Generator"
                relatedTools={relatedTools}
            />
        </main>
    );
}
