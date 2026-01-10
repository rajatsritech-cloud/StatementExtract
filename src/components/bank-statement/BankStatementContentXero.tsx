"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck, Zap, FileSpreadsheet, Globe, Lock, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";

export const BankStatementFeaturesXero = () => {
    const features = [
        {
            icon: FileSpreadsheet,
            title: "QuickBooks & Xero Ready",
            description: "Download data in .QBO (Web Connect) or Xero-compatible CSV format. No more manual data entry or complex mapping required."
        },
        {
            icon: ShieldCheck,
            title: "99%+ Accuracy Guarantee",
            description: "Our AI ensures every debit and credit is captured correctly, preventing reconciliation headaches during month-end closes."
        },
        {
            icon: Globe,
            title: "Universal Bank Support",
            description: "Whether it's Chase, Wells Fargo, Bank of America, or regional credit unions, we convert any PDF statement into accounting-ready formats."
        },
        {
            icon: Zap,
            title: "Instant Reconciliation",
            description: "Import files directly into QuickBooks Online, Desktop, or Xero. The 'Bank Feed' will match transactions automatically."
        }
    ];

    return (
        <section className="py-12 px-6 md:py-20 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
            <div className="mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[hsl(var(--foreground))] md:text-4xl mb-4">
                        Why Accountants Choose Us for QuickBooks & Xero
                    </h2>
                    <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                        Stop typing bank statements. Start importing them.
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

export const BankStatementFAQXero = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: "How do I import the converted file into QuickBooks?",
            a: "For QuickBooks Online: Go to Banking > Upload transactions > select the .QBO file we provide. The transactions will appear in your Bank Feed for review."
        },
        {
            q: "Does this work with Xero?",
            a: "Yes! We generate Xero-compatible CSV files. Simply go to Banking > Bank Statements in Xero and upload the CSV file. All transactions will be imported instantly."
        },
        {
            q: "What if my PDF is scanned?",
            a: "No problem. Our OCR technology extracts data from scanned paper statements and formatted images, converting them into clean digital formats for your accounting software."
        },
        {
            q: "Is it secure?",
            a: "Yes. Your data is encrypted and automatically deleted after processing. We do not store your bank details."
        },
        {
            q: "Which US banks are supported?",
            a: "We support all major US banks including Chase, Wells Fargo, Bank of America, Citibank, Capital One, PNC, US Bank, TD Bank, and thousands more. Our AI adapts to any bank format."
        }
    ];

    return (
        <section className="py-12 px-6 md:py-20 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
            <div className="mx-auto max-w-3xl">
                <h2 className="text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-12">
                    QuickBooks & Xero Conversion FAQs
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

import Link from "next/link";

export const BankStatementSEOContentXero = () => {
    return (
        <section className="py-12 px-6 md:py-20 bg-[hsl(var(--background))]">
            <div className="mx-auto max-w-4xl prose prose-lg dark:prose-invert">
                <h2 className="text-3xl font-bold text-[hsl(var(--foreground))] mb-6">
                    Automate Your Accounting: PDF to QuickBooks & Xero Converter
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Streamline your accounting workflow by converting PDF bank statements directly into <strong>QuickBooks Online (.QBO)</strong> and <strong>Xero-compatible CSV</strong> formats.
                    Eliminate manual data entry errors, save hours of typing, and reconcile your accounts in minutes.
                </p>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Import Bank Statements into QuickBooks (Online & Desktop)
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Our tool generates <strong>Web Connect (.QBO)</strong> files that are certified compatible with QuickBooks.
                    Instead of dealing with messy <Link href="/blogs/bank-statement-converter-pdf-to-excel-csv" className="text-primary hover:underline">CSV mapping</Link>, simply upload the .QBO file to your "Bank Feeds" center.
                    QuickBooks will automatically match transactions to your existing records, identifying duplicates and categorizing expenses.
                </p>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Import Bank Statements into Xero
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    For businesses using <strong>Xero</strong>, we generate clean CSV files that match Xero's import format perfectly.
                    Simply navigate to <strong>Banking &gt; Bank Statements</strong> and upload the file.
                    Xero will automatically match transactions to your existing records, identifying duplicates and categorizing expenses.
                </p>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Import Stripe & PayPal to QuickBooks
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    We also offer specialized free tools for payment processors. If you need to import data from payment platforms, use our dedicated converters:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <Link href="/convert/stripe-to-qbo" className="block p-4 rounded-xl border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] transition-colors bg-[hsl(var(--card))]">
                        <span className="font-semibold text-[hsl(var(--foreground))] block mb-1">Stripe to QuickBooks</span>
                        <span className="text-sm text-[hsl(var(--muted-foreground))]">Convert Stripe CSV exports to QBO format.</span>
                    </Link>
                    <Link href="/convert/paypal-to-qbo" className="block p-4 rounded-xl border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] transition-colors bg-[hsl(var(--card))]">
                        <span className="font-semibold text-[hsl(var(--foreground))] block mb-1">PayPal to QuickBooks</span>
                        <span className="text-sm text-[hsl(var(--muted-foreground))]">Convert PayPal CSV exports to QBO format.</span>
                    </Link>
                </div>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    How it Works
                </h3>
                <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-6 space-y-2">
                    <li><strong>Upload:</strong> Drag and drop your <Link href="/blogs/bank-statement-pdf-to-excel-using-ai" className="text-primary hover:underline">PDF bank statement</Link> (scanned or digital).</li>
                    <li><strong>Extract:</strong> Our <Link href="/blogs/ultimate-guide-accurate-bank-statement-extraction-ocr-ai" className="text-primary hover:underline">AI extracts</Link> transaction dates, descriptions, amounts, and running balances.</li>
                    <li><strong>Convert:</strong> Select "QuickBooks" or "Xero" as your output format.</li>
                    <li><strong>Import:</strong> Load the file directly into your accounting software. Zero manual typing.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Trusted by CPAs and Bookkeepers Across the US
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-8">
                    We understand that one decimal error can ruin a reconciliation. Our <strong>Triple-Check Validation</strong> engine verifies
                    open/close balances against transaction totals before letting you download, guaranteeing 99%+ mathematical consistency.
                    Thousands of accountants trust Statement Extract for their daily <Link href="/blogs/best-bank-statement-extraction-software-comparison" className="text-primary hover:underline">bank statement processing</Link> needs.
                </p>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Related Converters
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">
                    Explore our other flagship document conversion tools:
                </p>
                <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] space-y-2">
                    <li><Link href="/convert-bank-statement-to-csv-excel" className="text-[hsl(var(--primary))] hover:underline font-semibold">Bank Statement to Excel/CSV</Link> – General PDF to Excel conversion for any bank</li>
                    <li><Link href="/convert-bank-statement-to-quickbooks-tally" className="text-[hsl(var(--primary))] hover:underline font-semibold">Bank Statement to Tally Prime</Link> – Convert PDF to Tally XML for Indian accountants</li>
                    <li><Link href="/convert-invoice-to-excel-csv" className="text-[hsl(var(--primary))] hover:underline font-semibold">Invoice to Excel Converter</Link> – Extract line items from PDF invoices</li>
                    <li><Link href="/convert" className="text-[hsl(var(--primary))] hover:underline font-bold">View All Converters →</Link></li>
                </ul>
            </div>
        </section>
    );
};
