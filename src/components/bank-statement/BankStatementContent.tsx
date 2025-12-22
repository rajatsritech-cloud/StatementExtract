"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck, Zap, FileSpreadsheet, Globe, Lock, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";


export const BankStatementFeatures = () => {
    const features = [
        {
            icon: FileSpreadsheet,
            title: "Excel & CSV Export",
            description: "Get perfectly formatted spreadsheets with separate columns for dates, descriptions, deposits, withdrawals, and balances."
        },
        {
            icon: ShieldCheck,
            title: "Fraud Detection",
            description: "Our AI automatically flags potential tampering, non-consecutive dates, and mathematical inconsistencies in statements."
        },
        {
            icon: Globe,
            title: "Multi-Currency Support",
            description: "Process statements from over 50 countries. We handle different date formats (DD/MM vs MM/DD) and currency symbols automatically."
        },
        {
            icon: Zap,
            title: "Reconciliation Ready",
            description: "Data is cleaned and standardized, making it ready for immediate import into QuickBooks, Xero, or your ERP system."
        }
    ];

    return (
        <section className="py-12 px-6 md:py-20 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
            <div className="mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[hsl(var(--foreground))] md:text-4xl mb-4">
                        Why professionals choose our converter
                    </h2>
                    <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                        More than just standard OCR. We understand financial data structure.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <Card key={index} className="p-6 bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:shadow-lg transition-all">
                            <div className="mb-4 inline-flex p-3 bg-[hsl(var(--primary))]/10 rounded-lg text-[hsl(var(--primary))]">
                                <feature.icon className="h-6 w-6" />
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

export const SupportedBanks = () => {
    const banks = [
        "JPMorgan Chase", "Bank of America", "Wells Fargo", "Citigroup",
        "HSBC", "Barclays", "Lloyds Bank", "Royal Bank of Canada",
        "TD Bank", "Deutsche Bank", "Santander", "BNP Paribas",
        "American Express", "Capital One", "US Bank", "PNC Bank"
    ];

    return (
        <section className="py-12 px-6 md:py-25 bg-[hsl(var(--background))]">
            <div className="mx-auto max-w-7xl text-center">
                <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-8">
                    Trusted compatibility with major global banks
                </h2>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-70">
                    {banks.map((bank) => (
                        <div key={bank} className="flex items-center gap-2 text-lg font-medium text-[hsl(var(--muted-foreground))]">
                            <CheckCircle2 className="h-5 w-5 text-[hsl(var(--primary))]" />
                            {bank}
                        </div>
                    ))}
                </div>
                <p className="mt-8 text-sm text-[hsl(var(--muted-foreground))]">
                    And thousands of other financial institutions worldwide.
                </p>
            </div>
        </section>
    );
};

export const BankStatementFAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: "Can I convert scanned PDF bank statements?",
            a: "Yes! Our tool uses advanced Intelligent Document Processing to read data from scanned images and flattened PDFs with industry-leading accuracy."
        },
        {
            q: "Is my financial data secure?",
            a: "Absolutely. We use bank-level 256-bit encryption. Your files are processed automatically and are not stored permanently on our servers after processing."
        },
        {
            q: "Does it work with credit card statements?",
            a: "Yes, we support credit card statements, bank account statements, and investment portfolio summaries from almost any financial institution."
        },
        {
            q: "How do I import the data into QuickBooks or Xero?",
            a: "Simply download the CSV output. Our format is compatible with the import features of QuickBooks, Xero, Sage, and other major accounting software."
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

export const BankStatementSEOContent = () => {
    return (
        <section className="py-12 px-6 md:py-20 bg-[hsl(var(--background))]">
            <div className="mx-auto max-w-4xl prose prose-lg dark:prose-invert">
                <h2 className="text-3xl font-bold text-[hsl(var(--foreground))] mb-6">
                    The Ultimate Bank Statement to Excel Converter
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Converting <strong>PDF bank statements to Excel</strong> or CSV is a critical task for accountants, lenders, and business owners.
                    Manual data entry is slow, error-prone, and expensive. Our <strong>automated bank statement converter</strong> solves this by using advanced
                    <strong>Financial OCR</strong> technology to extract every transaction with 100% accuracy.
                </p>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Why Automated Extraction is Better than Manual Entry
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Our specialized AI engine is trained on millions of bank statements from major institutions like <strong>Chase, Wells Fargo, Bank of America, and HSBC</strong>.
                    Unlike standard PDF converters, we understand the financial context:
                </p>
                <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-6 space-y-2">
                    <li><strong>Smart Column Detection:</strong> We distinguish between "Description", "Reference Number", and "Transaction Date" columns automatically.</li>
                    <li><strong>Credit/Debit Separation:</strong> We precisely identify money-in and money-out flows, even if they share a single "Amount" column in the PDF.</li>
                    <li><strong>Running Balance Validation:</strong> Our algorithm mathematically verifies that <em>Opening Balance + Credits - Debits = Closing Balance</em>, ensuring zero errors.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Convert Scanned PDFs and Images
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Have paper statements? No problem. Our tool supports <strong>scanned PDF bank statements</strong> and image formats (JPG, PNG).
                    Our Optical Character Recognition (OCR) engine flattens, deskews, and digitizes paper documents into editable Excel spreadsheets in seconds.
                </p>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Supported Export Formats
                </h3>
                <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-6 space-y-2">
                    <li><strong>Excel (.XLSX):</strong> Perfect for financial modeling, analysis, and custom reporting.</li>
                    <li><strong>CSV (.CSV):</strong> Ideal for importing into <strong>Xero, Sage, Zoho Books</strong>, or custom ERP systems.</li>
                    <li><strong>JSON (API):</strong> For developers building automated fintech pipelines or lending platforms.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Enterprise-Grade Security &amp; Privacy
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-8">
                    We treat your financial data with the highest level of security. All uploads are processed via <strong>256-bit SSL encryption</strong>.
                    We adhere to strict data privacy policies: your files are <strong>automatically deleted</strong> from our processing servers immediately after conversion.
                    Trusted by CPAs, mortgage brokers, and financial professionals worldwide.
                </p>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Related Free Finance Tools
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                    Looking for more finance tools? Try our free calculators:
                </p>
                <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] space-y-2">
                    <li><a href="/tools/invoice-generator" className="text-[hsl(var(--primary))] hover:underline font-semibold">Free Invoice Generator</a> – Create professional PDF invoices instantly</li>
                    <li><a href="/convert/qif-to-qbo" className="text-[hsl(var(--primary))] hover:underline">QIF to QBO Converter</a> – Quicken to QuickBooks migration tool</li>
                    <li><a href="/tools/financial-ratio-calculator" className="text-[hsl(var(--primary))] hover:underline">Financial Ratio Calculator</a> – Calculate 20+ key business ratios</li>
                    <li><a href="/tools/profit-margin-calculator" className="text-[hsl(var(--primary))] hover:underline">Profit Margin Calculator</a> – Calculate gross, operating, and net margins</li>
                    <li><a href="/tools/amortization-calculator" className="text-[hsl(var(--primary))] hover:underline">Amortization Calculator</a> – See loan payments and extra payment savings</li>
                    <li><a href="/tools/fire-calculator" className="text-[hsl(var(--primary))] hover:underline font-bold">Explore All Financial Tools →</a></li>
                </ul>
            </div>
        </section>
    );
};
