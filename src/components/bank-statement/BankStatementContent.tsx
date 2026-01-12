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

                {/* Deep Dive: Smart Parsing vs Generic OCR */}
                <div className="my-12 p-8 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] not-prose">
                    <h3 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6 flex items-center gap-3">
                        <Zap className="text-yellow-500 w-8 h-8" />
                        Why Generic PDF Tools Fail
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-semibold text-red-500 mb-2">Standard OCR Tools</h4>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                Generic tools simply extract text line-by-line. They often merge "Deposit" and "Withdrawal" columns or confuse headers, leading to messy spreadsheets that require hours of cleanup.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-green-500 mb-2">Our Smart Parsing Engine</h4>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                We use <strong>Layout Recognition Algorithms</strong> specifically designed for bank statements. Our system identifies table boundaries, detects multi-line descriptions, and separates credit/debit columns based on geometric alignment.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Targeted SEO Keyword Block */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                        Best Free PDF Bank Statement to Excel Converter Online
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Looking for a <strong>free PDF bank statement to Excel converter</strong>? functionality, we provide a secure, browser-based solution that requires no downloads or software installation.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {["Free PDF to Excel", "Online Converter", "No Signup Required", "Secure Download", "CSV Export", "QuickBooks Ready"].map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] text-sm rounded-full font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <p className="text-[hsl(var(--muted-foreground))]">
                        Whether you need to <strong>convert PDF bank statement to CSV free</strong> for personal budgeting or bulk process files for a client, our tool handles it all. We support major banks including <strong>Chase, Bank of America, Wells Fargo, and SBI</strong>, ensuring your data is extracted accurately every time.
                    </p>
                </div>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Built-in Accuracy Checks
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    We don't just extract text; we validate it. Our parser runs mathematical checks on every statement to minimize errors:
                </p>
                <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-6 space-y-2">
                    <li><strong>Column Separation:</strong> Geometric analysis distinguishes between "Description", "Reference", and numeric columns.</li>
                    <li><strong>Transaction Logic:</strong> We algorithmically detect money-in vs money-out flows, even in single-column formats.</li>
                    <li><strong>The "Balance Check":</strong> We automatically verify that <em>Opening Balance + Credits - Debits = Closing Balance</em>. If the math doesn't add up, we alert you.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Convert Scanned PDFs and Images
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Have paper statements? Our tool supports <strong>scanned PDF bank statements</strong> and image formats (JPG, PNG).
                    We use Optical Character Recognition (OCR) to digitize scanned documents before running our parsing logic to structure the data.
                </p>

                {/* Bank Specific Tips */}
                <div className="my-8 p-6 bg-blue-500/5 border border-blue-500/10 rounded-xl not-prose">
                    <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-3">Bank-Specific Conversion Tips</h3>
                    <ul className="space-y-3 text-sm text-[hsl(var(--muted-foreground))]">
                        <li><strong>Chase Bank:</strong> Supports the new 2024 "Blue Headers" PDF format perfectly.</li>
                        <li><strong>Wells Fargo:</strong> We automatically strip the "Cheque Images" from the bottom of statements to keep the Excel file clean.</li>
                        <li><strong>Bank of America:</strong> Handles the "e-Statement" password protection (if you provide the password).</li>
                    </ul>
                </div>

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
                    Related Bank Statement Converters
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                    Need to import directly into accounting software? Try our specialized converters:
                </p>
                <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-8 space-y-2">
                    <li><a href="/convert-bank-statement-to-quickbooks-xero" className="text-[hsl(var(--primary))] hover:underline font-semibold">Bank Statement to QuickBooks & Xero</a> – Convert PDF to QBO and Xero-ready CSV format</li>
                    <li><a href="/convert-bank-statement-to-quickbooks-tally" className="text-[hsl(var(--primary))] hover:underline font-semibold">Bank Statement to Tally Prime</a> – Convert PDF to Tally XML voucher format for Indian accountants</li>
                    <li><a href="/convert-invoice-to-excel-csv" className="text-[hsl(var(--primary))] hover:underline font-semibold">Invoice to Excel Converter</a> – Extract line items and totals from PDF invoices</li>
                    <li><a href="/convert/csv-to-qbo" className="text-[hsl(var(--primary))] hover:underline">CSV to QBO Converter</a> – Convert any CSV to QuickBooks Web Connect format</li>
                </ul>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Learn More: Bank Statement Guides
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                    Read our detailed guides on bank statement processing:
                </p>
                <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-8 space-y-2">
                    <li><a href="/blogs/bank-statement-converter-pdf-to-excel-csv" className="text-[hsl(var(--primary))] hover:underline">Complete Guide: Bank Statement PDF to Excel/CSV Conversion</a></li>
                    <li><a href="/blogs/convert-bank-statement-to-quickbooks-xero-guide" className="text-[hsl(var(--primary))] hover:underline">How to Import Bank Statements to QuickBooks & Xero</a></li>
                    <li><a href="/blogs/best-bank-statement-extraction-software-comparison" className="text-[hsl(var(--primary))] hover:underline">Best Bank Statement Extraction Software Compared</a></li>
                    <li><a href="/blogs/bank-statement-for-visa-application-guide" className="text-[hsl(var(--primary))] hover:underline">Bank Statement for Visa Application: Complete Guide</a></li>
                </ul>

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
                    <li><a href="/tools" className="text-[hsl(var(--primary))] hover:underline font-bold">Explore All Financial Tools →</a></li>
                </ul>
            </div>
        </section >
    );
};
