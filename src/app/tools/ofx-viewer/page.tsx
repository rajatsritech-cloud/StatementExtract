import { Metadata } from "next";
import { OfxViewerTool } from "@/components/ofx-tools/OfxViewerTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { PageMeta } from "@/components/PageMeta";
import {
    Eye,
    Shield,
    Zap,
    CheckCircle,
    Lock,
    Globe,
    Users,
    Building2,
    BarChart3,
    Briefcase
} from "lucide-react";

export const metadata: Metadata = {
    title: "OFX File Viewer Online Free | Open Bank Statement Files | Statement Extract",
    description: "Free OFX file viewer online. Open and view OFX, QFX, and QBO bank statement files in your browser. See transactions instantly. No software required. 100% private.",
    keywords: "ofx file viewer, ofx viewer online, open ofx file, ofx file reader, view ofx file, ofx file opener, qfx viewer, bank statement viewer, open financial exchange viewer",
    openGraph: {
        title: "OFX File Viewer Online Free | Open Bank Statement Files",
        description: "View OFX, QFX, and QBO files online. See bank transactions instantly without software. Free, private.",
        type: "website",
        url: "https://statementextract.com/tools/ofx-viewer",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"]
    },
    twitter: {
        card: "summary_large_image",
        title: "OFX File Viewer - Free Online Tool",
        description: "Open OFX bank statement files online. View transactions instantly. 100% private.",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"]
    },
    alternates: {
        canonical: "https://statementextract.com/tools/ofx-viewer/"
    }
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "OFX File Viewer Online",
    "description": "Free online viewer to open and view OFX (Open Financial Exchange), QFX, and QBO bank statement files.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://statementextract.com" },
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://statementextract.com/tools" },
        { "@type": "ListItem", "position": 3, "name": "OFX Viewer" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I open an OFX file?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply drag and drop your OFX file onto our viewer. It will instantly parse the file and display all transactions in a readable table format. No software installation required."
            }
        },
        {
            "@type": "Question",
            "name": "What is an OFX file?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "OFX (Open Financial Exchange) is a standard file format for exchanging financial data between banks and financial software. It contains bank transactions, account information, and balances."
            }
        },
        {
            "@type": "Question",
            "name": "Is my data secure?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, completely. Our viewer processes files entirely in your browser. Your financial data never leaves your device and is never uploaded to any server."
            }
        },
        {
            "@type": "Question",
            "name": "Can I convert OFX to Excel?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! After viewing your OFX file, click the 'Export to CSV' button to download all transactions as a spreadsheet file compatible with Excel."
            }
        }
    ]
};

const whoIsThisFor = [
    { icon: Users, title: "Accountants", desc: "Preview bank statement files before importing into accounting software." },
    { icon: Building2, title: "Business Owners", desc: "View bank downloads without specialized financial software." },
    { icon: BarChart3, title: "Financial Analysts", desc: "Quickly inspect OFX file contents for analysis." },
    { icon: Briefcase, title: "Software Developers", desc: "Debug and validate OFX file generation or parsing." },
];

const useCases = [
    { title: "Preview Before Import", desc: "Verify OFX file contents and transaction counts before importing into accounting software." },
    { title: "Verify Bank Exports", desc: "Confirm your bank correctly exported all transactions for the selected date range." },
    { title: "Debug OFX Parsing", desc: "Developers can inspect OFX structure and tags to troubleshoot parsing issues." },
    { title: "Multi-Bank Reconciliation", desc: "View statements from different banks side-by-side for account reconciliation." },
    { title: "Audit Trail Review", desc: "Review historical transaction data for compliance, auditing, or tax preparation." },
    { title: "Client File Inspection", desc: "Accountants can review client bank files without importing them into their systems." },
];

const relatedTools = [
    { href: "/tools/qbo-viewer", title: "QBO Viewer" },
    { href: "/convert/ofx-to-excel", title: "OFX to Excel" },
    { href: "/convert/qfx-to-csv", title: "QFX to CSV" },
    { href: "/convert/qfx-to-pdf", title: "QFX to PDF" },
    { href: "/convert/mt940-to-excel", title: "MT940 to Excel" },
    { href: "/convert/qif-to-csv", title: "QIF to CSV" },
];

export default function OfxViewerPage() {
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

            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <OfxViewerTool />
            </section>

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free OFX File Viewer?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Lock, title: "100% Private", desc: "Files never leave your device. All processing happens in your browser." },
                            { icon: Eye, title: "Instant Preview", desc: "See all transactions immediately without installing any software." },
                            { icon: Zap, title: "No Signup Required", desc: "No email, no account needed. Just drop your file and view." },
                            { icon: Shield, title: "Multiple Formats", desc: "Supports OFX, QFX, and QBO file formats from any bank." },
                            { icon: Globe, title: "Multi-Currency", desc: "Correctly displays transactions in any currency." },
                            { icon: CheckCircle, title: "Free Forever", desc: "Unlimited file viewing at zero cost." },
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

            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        How to View OFX Files Online
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Upload Your File", desc: "Drag and drop your OFX, QFX, or QBO file onto the viewer." },
                            { step: 2, title: "View Transactions", desc: "Instantly see all transactions with dates, amounts, and descriptions." },
                            { step: 3, title: "Review Details", desc: "Check account info, total credits/debits, and bank ID." },
                            { step: 4, title: "Export if Needed", desc: "Download transactions as CSV for Excel or other software." },
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

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Who Uses This OFX File Viewer?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {whoIsThisFor.map((persona, i) => (
                            <div key={i} className="flex gap-4 items-start p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <persona.icon className="w-8 h-8 text-[hsl(var(--primary))] shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">{persona.title}</h3>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{persona.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Common Use Cases Section */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Common Use Cases for OFX File Viewer
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {useCases.map((useCase, i) => (
                            <div key={i} className="flex gap-4 items-start p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <CheckCircle className="w-6 h-6 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">{useCase.title}</h3>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{useCase.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        The Best Free OFX File Viewer in 2026
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Need to <strong>open an OFX file</strong> but don't have financial software? Our free <strong>online OFX viewer</strong> lets you see the contents of bank statement files instantly in your browser. No downloads, no registration, and <strong>100% private processing</strong>.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        What is OFX Format?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>OFX (Open Financial Exchange)</strong> is an open standard format for exchanging financial data between banks, brokerages, and personal finance software. Developed jointly by Microsoft, Intuit, and CheckFree in 1997, it has become the backbone of online banking downloads. OFX files contain:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>Transaction Data:</strong> Dates, amounts, payees, memos, and transaction types</li>
                        <li><strong>Account Information:</strong> Bank ID (routing number), account number, and account type</li>
                        <li><strong>Balance Information:</strong> Opening balance, closing balance, and available balance</li>
                        <li><strong>Currency Code:</strong> USD, EUR, GBP, CAD, or any ISO 4217 currency code</li>
                        <li><strong>Statement Period:</strong> Start and end dates for the statement range</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        OFX File Structure and Key Tags
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        OFX files use an SGML/XML-like structure with specific tags for financial data:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>&lt;STMTTRN&gt;:</strong> Statement transaction container block</li>
                        <li><strong>&lt;DTPOSTED&gt;:</strong> Transaction date (YYYYMMDDHHMMSS format)</li>
                        <li><strong>&lt;TRNAMT&gt;:</strong> Transaction amount (positive for credits, negative for debits)</li>
                        <li><strong>&lt;TRNTYPE&gt;:</strong> Transaction type (DEBIT, CREDIT, CHECK, DEP, ATM, POS, INT, FEE)</li>
                        <li><strong>&lt;NAME&gt;:</strong> Payee or merchant name</li>
                        <li><strong>&lt;MEMO&gt;:</strong> Additional transaction description</li>
                        <li><strong>&lt;FITID&gt;:</strong> Financial institution's unique transaction ID</li>
                        <li><strong>&lt;CHECKNUM&gt;:</strong> Check number (for check transactions)</li>
                        <li><strong>&lt;BANKACCTFROM&gt;:</strong> Source account identification block</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        OFX Versions: 1.x vs 2.x
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        There are two main versions of OFX:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>OFX 1.x (SGML):</strong> Uses SGML syntax without closing tags. Still widely used by most banks.</li>
                        <li><strong>OFX 2.x (XML):</strong> Uses proper XML syntax with closing tags. Adopted by newer implementations.</li>
                    </ul>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Our <strong>OFX file viewer</strong> supports both versions and automatically detects the format.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Use an Online OFX Viewer?
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>No Software Needed:</strong> View OFX files without installing Quicken, QuickBooks, or Money.</li>
                        <li><strong>Quick Validation:</strong> Verify bank downloads before importing into accounting software.</li>
                        <li><strong>Multi-Format Support:</strong> Works with OFX, QFX (Quicken), and QBO (QuickBooks) files.</li>
                        <li><strong>Privacy First:</strong> Your sensitive financial data never leaves your computer.</li>
                        <li><strong>Cross-Platform:</strong> Works on Windows, Mac, Linux, iOS, and Android.</li>
                        <li><strong>Debug Support:</strong> Developers can inspect file structure for parsing troubleshooting.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Banks That Support OFX Downloads
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Most major financial institutions provide OFX file downloads:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li>Chase, Bank of America, Wells Fargo, Citibank, Capital One</li>
                        <li>PNC Bank, US Bank, TD Bank, Truist, Fifth Third</li>
                        <li>Charles Schwab, Fidelity, Vanguard, E*TRADE</li>
                        <li>American Express, Discover, most credit unions</li>
                    </ul>
                </div>
            </section>

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            { q: "How do I open an OFX file without software?", a: "Use our free online viewer. Just drag and drop your OFX file and view all transactions instantly in your browser." },
                            { q: "Is this viewer really free?", a: "Yes! It's 100% free with no limits on files or transactions. No signup required." },
                            { q: "Can I view files from any bank?", a: "Yes, the viewer supports standard OFX files from any bank worldwide." },
                            { q: "What's the difference between OFX and QFX?", a: "OFX is the open standard. QFX is Quicken's proprietary variant with extra headers. Both work with our viewer." },
                            { q: "Can I edit the transactions?", a: "This viewer is read-only. To edit, export to CSV and modify in Excel or Google Sheets." },
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{faq.q}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <PageMeta lastUpdated="January 2026" />
                </div>
            </section>

            <ToolPageFooter
                currentTool="OFX Viewer"
                relatedTools={relatedTools}
            />
        </main >
    );
}
