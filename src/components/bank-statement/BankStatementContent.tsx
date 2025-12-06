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
        <section className="py-12 px-6 md:py-20 bg-[hsl(var(--background))]">
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
                    The Ultimate Guide to Converting Bank Statements to Excel
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Converting PDF bank statements to Excel or CSV is a critical task for accountants, lenders, and business owners.
                    Manual data entry is slow and error-prone, while generic extraction tools often fail to recognize the complex table structures found in financial documents.
                </p>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Why Automated Extraction is Better
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Our specialized AI engine is trained on millions of bank statements from institutions like <strong>Chase, Wells Fargo, Bank of America, and HSBC</strong>.
                    Unlike standard PDF converters, we understand the difference between a transaction date, a description, and a running balance.
                </p>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Supported Formats
                </h3>
                <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-6 space-y-2">
                    <li><strong>Digital PDFs:</strong> Statements downloaded directly from online banking.</li>
                    <li><strong>Scanned Images:</strong> Paper statements scanned as JPG, PNG, or flattened PDF.</li>
                    <li><strong>Multi-Page Documents:</strong> We automatically stitch together transactions that span multiple pages.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Security & Privacy
                </h3>
                <p className="text-[hsl(var(--muted-foreground))]">
                    We treat your financial data with the highest level of security. All uploads are processed via encrypted channels
                    and are automatically deleted from our processing servers after conversion. We are trusted by financial professionals worldwide.
                </p>
            </div>
        </section>
    );
};
