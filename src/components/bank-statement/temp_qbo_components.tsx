"use client";

import { useState } from "react";
import { FileSpreadsheet, ShieldCheck, Globe, Zap, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";

export const BankStatementFeaturesQBO = () => {
    const features = [
        {
            icon: FileSpreadsheet,
            title: "QuickBooks & Tally Ready",
            description: "Download data in .QBO (Web Connect) or Tally XML format. No more manual data entry or complex mapping required."
        },
        {
            icon: ShieldCheck,
            title: "100% Accuracy Guarantee",
            description: "Our AI ensures every debit and credit is captured correctly, preventing reconciliation headaches during month-end closes."
        },
        {
            icon: Globe,
            title: "Universal Bank Support",
            description: "Whether it's Chase, HDFC, SBI, or bespoke credit unions, we convert any PDF statement into accounting-ready formats."
        },
        {
            icon: Zap,
            title: "Instant Reconciliation",
            description: "Import files directly into QuickBooks Online, Desktop, or Tally Prime. The 'Bank Feed' will match transactions automatically."
        }
    ];

    return (
        <section className="py-12 px-6 md:py-20 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
            <div className="mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[hsl(var(--foreground))] md:text-4xl mb-4">
                        Why Accountants Choose Us for QBO & Tally
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

export const BankStatementFAQQBO = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: "How do I import the converted file into QuickBooks?",
            a: "For QuickBooks Online: Go to Banking > Upload transactions > select the .QBO file we provide. The transactions will appear in your Bank Feed for review."
        },
        {
            q: "Does this work with Tally Prime?",
            a: "Yes! We generate Tally-compatible XML files. You can use the 'Import Data' > 'Vouchers' option in Tally Prime or ERP 9 to load all transactions instantly."
        },
        {
            q: "What if my PDF is scanned?",
            a: "No problem. Our OCR technology extracts data from scanned paper statements and formatted images, converting them into clean digital formats for your accounting software."
        },
        {
            q: "Is it secure?",
            a: "Yes. Your data is encrypted and automatically deleted after processing. We do not store your bank details."
        }
    ];

    return (
        <section className="py-12 px-6 md:py-20 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
            <div className="mx-auto max-w-3xl">
                <h2 className="text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-12">
                    QBO & Tally Conversion FAQs
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

export const BankStatementSEOContentQBO = () => {
    return (
        <section className="py-12 px-6 md:py-20 bg-[hsl(var(--background))]">
            <div className="mx-auto max-w-4xl prose prose-lg dark:prose-invert">
                <h2 className="text-3xl font-bold text-[hsl(var(--foreground))] mb-6">
                    Convert PDF Bank Statements to QuickBooks & Tally
                </h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Streamline your accounting workflow by converting PDF bank statements directly into <strong>QuickBooks Online (.QBO)</strong> and <strong>Tally XML</strong> formats.
                    Eliminate manual data entry errors and reconcile your accounts in minutes, not hours.
                </p>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Why Use a Dedicated Converter?
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Generic PDF converters often output messy Excel files that require hours of cleaning before they can be imported.
                    Our tool understands financial structures, properly categorizing **Credits** and **Debits**, and formatting dates specifically for **QuickBooks** and **Tally** import requirements.
                </p>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Supported Software
                </h3>
                <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] mb-6 space-y-2">
                    <li><strong>QuickBooks Online & Desktop:</strong> We produce standard .QBO Web Connect files.</li>
                    <li><strong>Tally Prime / ERP 9:</strong> Import Vouchers via standard XML format.</li>
                    <li><strong>Xero / Sage:</strong> Compatible CSV formats available.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
                    Automate Your Month-End Close
                </h3>
                <p className="text-[hsl(var(--muted-foreground))]">
                    Trusted by CPAs and Bookkeepers, our automated extraction ensures 100% accuracy even with scanned or low-quality PDF statements.
                    Just upload, convert, and import.
                </p>
            </div>
        </section>
    );
};
