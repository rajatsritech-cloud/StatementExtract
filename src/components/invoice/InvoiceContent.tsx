"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck, Zap, FileText, Globe, Lock, ChevronDown, Table, ScanLine } from "lucide-react";
import { Card } from "@/components/ui/card";


export const InvoiceFeatures = () => {
    const features = [
        {
            icon: Table,
            title: "Smart Table Extraction",
            description: "Automatically identifies and extracts complex invoice tables. Captures Line Items, Quantities, Unit Prices, and Totals with precision."
        },
        {
            icon: ScanLine,
            title: "AI Header Recognition",
            description: "Instantly captures Invoice Number, Date, Vendor Name, PO Number, and Tax details without any manual templating."
        },
        {
            icon: Globe,
            title: "Global Currency Support",
            description: "Process invoices from anywhere. We support multi-currency detection (USD, EUR, GBP, AUD, CAD, INR) and international date formats."
        },
        {
            icon: FileText,
            title: "Excel & CSV Ready",
            description: "Download structured data compatible with Xero, QBO, Sage, and NetSuite. No more manual data entry for accounts payable."
        }
    ];

    // Fix for the icon rendering in the map below
    const FeatureIcon = ({ icon: Icon }: { icon: any }) => <Icon className="h-6 w-6" />;

    return (
        <section className="py-12 px-6 md:py-20 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
            <div className="mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[hsl(var(--foreground))] md:text-4xl mb-4">
                        Intelligent Invoice Processing (IDP)
                    </h2>
                    <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                        Turn unstructured PDF invoices into structured financial data in seconds.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <Card key={index} className="p-6 bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:shadow-lg transition-all">
                            <div className="mb-4 inline-flex p-3 bg-[hsl(var(--primary))]/10 rounded-lg text-[hsl(var(--primary))]">
                                {feature.title === "Excel & CSV Ready" ? <FileText className="h-6 w-6" /> : <FeatureIcon icon={feature.icon} />}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--foreground))]">{feature.title}</h3>
                            <p className="text-[hsl(var(--muted-foreground))]">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const SupportedInvoiceFormats = () => {
    const formats = [
        "PDF Invoices", "Scanned Images (JPG/PNG)", "Uber Receipts", "Amazon Invoices",
        "Xero Exports", "QuickBooks Invoices", "Stripe Invoices", "PayPal Receipts",
        "Utility Bills", "Cloud Invoices", "Hotel Receipts", "Purchase Orders"
    ];

    return (
        <section className="py-12 px-6 md:py-25 bg-[hsl(var(--background))]">
            <div className="mx-auto max-w-7xl text-center">
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-8">
                    Works with every invoice format
                </h2>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-70">
                    {formats.map((format) => (
                        <div key={format} className="flex items-center gap-2 text-lg font-medium text-[hsl(var(--muted-foreground))]">
                            <CheckCircle2 className="h-5 w-5 text-[hsl(var(--primary))]" />
                            {format}
                        </div>
                    ))}
                </div>
                <p className="mt-8 text-sm text-[hsl(var(--muted-foreground))]">
                    Our AI models utilize Geo-Specific training to understand invoice layouts from over 100+ countries.
                </p>
            </div>
        </section>
    );
};

export const InvoiceFAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: "Can I convert scanned paper invoices?",
            a: "Yes. Our tool includes built-in OCR (Optical Character Recognition) to digitize scanned paper invoices and photos into editable Excel data."
        },
        {
            q: "Does it extract line items?",
            a: "Absolutely. Unlike basic tools that only get the total, our AI specifically identifies and parses the table data, giving you a row-by-row breakdown in Excel."
        },
        {
            q: "Is it secure for sensitive financial data?",
            a: "Yes. We use 256-bit encryption for transfer. Your documents are processed automatically in a secure environment and are deleted from our servers immediately after conversion."
        },
        {
            q: "Does it support multiple languages?",
            a: "Yes. We currently support English, German, French, and Spanish invoice layouts, with automatic currency detection for USD, EUR, GBP, AUD, CAD, and more."
        }
    ];

    return (
        <section className="py-12 px-6 md:py-20 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
            <div className="mx-auto max-w-3xl">
                <h2 className="text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-12">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border-b border-[hsl(var(--border))]"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex w-full items-center justify-between py-4 text-left text-lg font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                            >
                                {faq.q}
                                <ChevronDown
                                    className={`h-5 w-5 text-[hsl(var(--muted-foreground))] transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="text-[hsl(var(--muted-foreground))] text-base leading-relaxed">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

};

export const InvoiceSEOContent = () => {
    return (
        <section className="py-12 px-6 md:py-20 bg-[hsl(var(--background))]">
            <div className="mx-auto max-w-4xl prose prose-lg dark:prose-invert">
                <h2 className="text-3xl font-bold text-[hsl(var(--foreground))] mb-6">
                    Free AI Invoice to Excel Converter
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Streamline your accounts payable workflow with our <strong>AI-powered Invoice Converter</strong>.
                    Stop manually typing data from PDF invoices into spreadsheets. Our tool uses next-generation <strong>Geo AI</strong> and
                    Financial OCR to automatically extract key data points like <strong className="text-[hsl(var(--foreground))]">Invoice Number, Date, Total Amount, and Line Items</strong> with 100% accuracy.
                </p>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Why use an Automated Invoice Extractor?
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Manual data entry costs businesses hours of time and leads to costly errors like duplicate payments or wrong amounts.
                    <strong>Statement Extract's</strong> invoice tool is designed for:
                </p>
                <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-6 space-y-2">
                    <li><strong>Accountants & Bookkeepers:</strong> Bulk process client invoices for month-end close.</li>
                    <li><strong>Small Business Owners:</strong> Digitize receipts and bills for tax time.</li>
                    <li><strong>Developers:</strong> Test our extraction accuracy for integration into AP automation software.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Geo AI & International Support
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Invoices look different around the world. A German <em>Rechnung</em> puts the date in DD.MM.YYYY format, while a US Invoice uses MM/DD/YYYY.
                    Our <strong>Geo-Spatial Layout Analysis</strong> automatically detects the country of origin to apply the correct parsing rules.
                    We support currencies including <strong>USD ($), EUR (€), GBP (£), AUD (A$), CAD (C$), and INR (₹)</strong>.
                </p>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Export to Accounting Software
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Once converted to Excel or CSV, your invoice data is ready for import into major accounting platforms:
                </p>
                <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-6 space-y-2">
                    <li><strong>QuickBooks Online (QBO)</strong></li>
                    <li><strong>Xero</strong></li>
                    <li><strong>Sage Intacct</strong></li>
                    <li><strong>Oracle NetSuite</strong></li>
                    <li><strong>FreshBooks</strong></li>
                </ul>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Related Tools
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                    Explore our suite of financial data tools:
                </p>
                <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] space-y-2">
                    <li><a href="/convert-bank-statement-to-csv-excel" className="text-[hsl(var(--primary))] hover:underline font-semibold">Bank Statement Converter</a> – PDF to Excel for bank feeds</li>
                    <li><a href="/tools/invoice-generator" className="text-[hsl(var(--primary))] hover:underline">Invoice Generator</a> – Create invoices in seconds</li>
                    <li><a href="/convert/pdf-to-mt940" className="text-[hsl(var(--primary))] hover:underline">PDF to MT940</a> – Convert statements to MT940 format</li>
                    <li><a href="/tools/gst-vat-calculator" className="text-[hsl(var(--primary))] hover:underline">GST/VAT Calculator</a> – Calculate tax amounts quickly</li>
                </ul>
            </div>
        </section>
    );
};
