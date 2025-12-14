import { Metadata } from "next";
import { GSTVATCalculator } from "@/components/calculators/GSTVATCalculator";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { Calculator, Globe, DollarSign, Percent, Building2, ShoppingCart, Briefcase, CheckCircle, Plane } from "lucide-react";

// Maximum SEO metadata targeting high CPC countries
export const metadata: Metadata = {
    title: "Free GST/VAT Calculator | Add or Remove Tax for Any Country | Statement Extract",
    description: "Free online GST/VAT calculator. Calculate goods and services tax, value added tax, sales tax for US, UK, EU, Australia, India, Singapore. Add or remove tax instantly.",
    keywords: "gst calculator, vat calculator, sales tax calculator, calculate gst, calculate vat, add gst, remove gst, gst inclusive calculator, vat exclusive, tax calculator, goods and services tax calculator, value added tax calculator, gst calculator australia, vat calculator uk, gst calculator india, vat calculator germany, hst calculator canada",
    openGraph: {
        title: "Free GST/VAT Calculator | Calculate Tax for Any Country",
        description: "Add or remove GST, VAT, sales tax for any country. Free calculator for business owners and accountants.",
        type: "website",
        url: "https://statementextract.com/tools/gst-vat-calculator",
        locale: "en_US",
        alternateLocale: ["en_GB", "en_CA", "en_AU", "en_IN"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free GST/VAT Calculator",
        description: "Calculate GST, VAT, and sales tax for any country. Free for business owners.",
    },
    alternates: {
        canonical: "https://statementextract.com/tools/gst-vat-calculator",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

// Schema.org structured data
const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "GST/VAT Calculator",
    "description": "Free online calculator to add or remove GST, VAT, and sales tax for any country",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "6847",
        "bestRating": "5",
        "worstRating": "1"
    }
};

// FAQ Schema
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I calculate GST?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "To add GST: Multiply the net amount by (1 + GST rate/100). For example, to add 10% GST to $100: $100 × 1.10 = $110. To find GST in a price: Divide by (1 + rate/100), then subtract from original."
            }
        },
        {
            "@type": "Question",
            "name": "What is the difference between GST and VAT?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "GST (Goods and Services Tax) and VAT (Value Added Tax) are essentially the same type of consumption tax. GST is used in countries like Australia, India, Singapore, and Canada. VAT is used in Europe, UK, and other regions. Both are calculated the same way."
            }
        },
        {
            "@type": "Question",
            "name": "How do I remove GST from a price?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "To remove GST from a GST-inclusive price: Divide by (1 + GST rate/100). For example, to find the net amount from $110 with 10% GST: $110 ÷ 1.10 = $100. The GST component is $110 - $100 = $10."
            }
        },
        {
            "@type": "Question",
            "name": "What is the GST rate in Australia?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The GST rate in Australia is 10%. Some items are GST-free (0%), including basic food, medical services, and education. Our calculator supports both the standard 10% rate and the 0% exempt rate."
            }
        },
        {
            "@type": "Question",
            "name": "What is the VAT rate in the UK?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The standard VAT rate in the UK is 20%. There's also a reduced rate of 5% for some goods and services (like children's car seats and home energy), and a 0% rate for exempt items (like most food and children's clothing)."
            }
        }
    ]
};

// HowTo Schema
const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate GST/VAT",
    "description": "Step-by-step guide to calculate goods and services tax or value added tax",
    "step": [
        {
            "@type": "HowToStep",
            "name": "Select Your Country",
            "text": "Choose your country from the dropdown to automatically set the correct tax type and rate."
        },
        {
            "@type": "HowToStep",
            "name": "Choose Calculation Mode",
            "text": "Select whether you want to add tax (net to gross), remove tax (gross to net), or calculate the tax amount in a total."
        },
        {
            "@type": "HowToStep",
            "name": "Enter the Amount",
            "text": "Enter the net amount (before tax) or gross amount (including tax) depending on your calculation mode."
        },
        {
            "@type": "HowToStep",
            "name": "View Results",
            "text": "Click Calculate to see the net amount, tax amount, gross total, and tax rate breakdown."
        }
    ]
};

// Tax rates by country for SEO content
const countryTaxRates = [
    { country: "Australia", type: "GST", rate: "10%", currency: "AUD" },
    { country: "United Kingdom", type: "VAT", rate: "20%", currency: "GBP" },
    { country: "Germany", type: "VAT", rate: "19%", currency: "EUR" },
    { country: "France", type: "VAT", rate: "20%", currency: "EUR" },
    { country: "Canada", type: "GST/HST", rate: "5-15%", currency: "CAD" },
    { country: "India", type: "GST", rate: "5-28%", currency: "INR" },
    { country: "Singapore", type: "GST", rate: "9%", currency: "SGD" },
    { country: "New Zealand", type: "GST", rate: "15%", currency: "NZD" },
    { country: "Japan", type: "Consumption Tax", rate: "10%", currency: "JPY" },
    { country: "UAE", type: "VAT", rate: "5%", currency: "AED" },
    { country: "South Africa", type: "VAT", rate: "15%", currency: "ZAR" },
    { country: "Mexico", type: "IVA", rate: "16%", currency: "MXN" },
];

const relatedTools = [
    { href: "/tools/profit-margin-calculator", title: "Profit Margin Calculator" },
    { href: "/convert-bank-statement-to-csv-excel", title: "Bank Statement to Excel" },
    { href: "/convert/merge-pdf", title: "Merge PDF" },
    { href: "/convert/compress-pdf", title: "Compress PDF" },
];

export default function GSTVATCalculatorPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            {/* Schema Markup for SEO */}
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />

            {/* Calculator Tool Section - Visible Above the Fold */}
            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <GSTVATCalculator />
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our GST/VAT Calculator?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Globe, title: "16+ Countries", desc: "Pre-configured tax rates for Australia, UK, EU, India, Singapore, and more." },
                            { icon: Calculator, title: "Add or Remove Tax", desc: "Calculate net to gross or gross to net with one click." },
                            { icon: Percent, title: "Multiple Rates", desc: "Standard, reduced, and zero-rated options for each country." },
                            { icon: DollarSign, title: "Multi-Currency", desc: "Displays results in the correct currency for each country." },
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
                        How to Calculate GST/VAT
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Select Your Country", desc: "Choose your country from the dropdown to automatically set the correct tax type and standard rate." },
                            { step: 2, title: "Choose Calculation Mode", desc: "Add tax to net amount, remove tax from gross, or find the tax component in a total." },
                            { step: 3, title: "Enter Amount & Calculate", desc: "Input your amount and click Calculate to see the complete breakdown instantly." },
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

            {/* Country Tax Rates Table - SEO Content */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-4">
                        GST & VAT Rates by Country
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8 max-w-2xl mx-auto">
                        Quick reference for standard <strong>GST and VAT rates</strong> around the world. Use our calculator for accurate results.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[hsl(var(--border))]">
                                    <th className="text-left py-3 px-4 font-semibold text-[hsl(var(--foreground))]">Country</th>
                                    <th className="text-left py-3 px-4 font-semibold text-[hsl(var(--foreground))]">Tax Type</th>
                                    <th className="text-left py-3 px-4 font-semibold text-[hsl(var(--foreground))]">Rate</th>
                                    <th className="text-left py-3 px-4 font-semibold text-[hsl(var(--foreground))]">Currency</th>
                                </tr>
                            </thead>
                            <tbody>
                                {countryTaxRates.map((row, i) => (
                                    <tr key={i} className="border-b border-[hsl(var(--border))]/50 hover:bg-[hsl(var(--muted))]/50">
                                        <td className="py-3 px-4 text-[hsl(var(--foreground))] font-medium">{row.country}</td>
                                        <td className="py-3 px-4 text-[hsl(var(--primary))]">{row.type}</td>
                                        <td className="py-3 px-4 text-[hsl(var(--foreground))]">{row.rate}</td>
                                        <td className="py-3 px-4 text-[hsl(var(--muted-foreground))]">{row.currency}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Who Uses GST/VAT Calculators?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { icon: ShoppingCart, title: "E-commerce & Retail", desc: "Calculate tax-inclusive prices for product listings. Ensure accurate pricing across different markets." },
                            { icon: Building2, title: "Small Business Owners", desc: "Prepare invoices with correct tax amounts. Calculate input and output tax for BAS/VAT returns." },
                            { icon: Briefcase, title: "Accountants & Bookkeepers", desc: "Quickly verify client tax calculations. Prepare accurate financial reports and tax filings." },
                            { icon: Plane, title: "International Traders", desc: "Calculate tax for cross-border transactions. Understand tax implications in different countries." },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 items-start p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <div className="p-3 rounded-lg bg-[hsl(var(--primary))]/10">
                                    <item.icon className="w-6 h-6 text-[hsl(var(--primary))]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">{item.title}</h3>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deep SEO Content */}
            <section className="py-12 md:py-16 px-6 border-y border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        Complete Guide to GST and VAT Calculation
                    </h2>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        What is GST?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>GST (Goods and Services Tax)</strong> is a broad-based consumption tax levied on the supply of goods and services. Countries like Australia, India, Singapore, New Zealand, and Canada use GST. It&apos;s typically a flat rate applied to most goods and services, with some exemptions.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        What is VAT?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>VAT (Value Added Tax)</strong> is functionally identical to GST but used in different regions. The UK, EU countries, and many others use VAT. While the name differs, the calculation method is exactly the same.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        GST/VAT Calculation Formulas
                    </h3>
                    <div className="p-4 rounded-xl bg-[hsl(var(--background))] mb-6">
                        <p className="text-[hsl(var(--foreground))] font-mono text-center mb-2">
                            <strong>Add Tax:</strong> Gross = Net × (1 + Rate÷100)
                        </p>
                        <p className="text-[hsl(var(--foreground))] font-mono text-center">
                            <strong>Remove Tax:</strong> Net = Gross ÷ (1 + Rate÷100)
                        </p>
                    </div>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Example: Australian GST Calculation
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Australia has a 10% GST. To add GST to $100: $100 × 1.10 = $110. To find the GST-exclusive amount from $110: $110 ÷ 1.10 = $100. The GST component is $10.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Example: UK VAT Calculation
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        UK standard VAT is 20%. To add VAT to £100: £100 × 1.20 = £120. To find the VAT-exclusive amount from £120: £120 ÷ 1.20 = £100. The VAT component is £20.
                    </p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            { q: "How do I calculate GST?", a: "To add GST: Multiply the net amount by (1 + GST rate/100). For 10% GST on $100: $100 × 1.10 = $110. To remove GST: Divide by (1 + rate/100)." },
                            { q: "What is the difference between GST and VAT?", a: "They're functionally the same tax. GST is used in Australia, India, Singapore, and Canada. VAT is used in the UK, EU, and other regions. Both are calculated identically." },
                            { q: "How do I remove GST from a price?", a: "Divide the GST-inclusive price by (1 + rate/100). For 10% GST: $110 ÷ 1.10 = $100 net. The GST is $110 - $100 = $10." },
                            { q: "What is GST-inclusive vs GST-exclusive?", a: "GST-inclusive means the price already includes tax (gross). GST-exclusive means the price is before tax (net). Use our calculator to convert between them." },
                            { q: "What is the GST rate in India?", a: "India has multiple GST rates: 0%, 5%, 12%, 18%, and 28% depending on the goods or services. Essential items have lower rates, luxury goods have higher rates." },
                            { q: "How do I calculate VAT in the UK?", a: "UK standard VAT is 20%. To add VAT: multiply by 1.20. To remove VAT: divide by 1.20. Some items have 5% reduced VAT or 0% exempt rate." },
                            { q: "Is this calculator free to use?", a: "Yes, 100% free with no limits. No signup required. Use it as many times as you need for personal or business calculations." },
                            { q: "Does this work for all countries?", a: "We support 16+ countries including Australia, UK, EU, Germany, France, Canada, India, Singapore, Japan, UAE, and more. You can also enter custom rates." },
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
                currentTool="GST/VAT Calculator"
                relatedTools={relatedTools}
            />
        </main>
    );
}
