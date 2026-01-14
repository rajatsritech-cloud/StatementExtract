import { Metadata } from "next";
import { QboViewerTool } from "@/components/qbo-tools/QboViewerTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { PageMeta } from "@/components/PageMeta";
import {
    Eye,
    Shield,
    Zap,
    FileText,
    CheckCircle,
    Lock,
    Globe,
    Users,
    Building2,
    BarChart3,
    Briefcase
} from "lucide-react";

export const metadata: Metadata = {
    title: "QBO File Viewer Online Free | Open QuickBooks Files | Statement Extract",
    description: "Free QBO file viewer online. Open and view QuickBooks Web Connect (.qbo), OFX, and QFX files in your browser. See transactions instantly. No software needed. 100% private.",
    keywords: "qbo file viewer, qbo viewer online, open qbo file, qbo file reader, view qbo file, quickbooks file viewer, ofx viewer, qfx viewer, open quickbooks file online",
    openGraph: {
        title: "QBO File Viewer Online Free | Open QuickBooks Files",
        description: "View QBO, OFX, and QFX files online. See transactions instantly without QuickBooks. Free, private, no signup.",
        type: "website",
        url: "https://statementextract.com/tools/qbo-viewer",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"]
    },
    twitter: {
        card: "summary_large_image",
        title: "QBO File Viewer - Free Online Tool",
        description: "Open QuickBooks QBO files online. View transactions instantly. 100% private.",
        images: ["https://statementextract.com/assets/StatementExtract_Workflow_img.png"]
    },
    alternates: {
        canonical: "https://statementextract.com/tools/qbo-viewer/"
    }
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "QBO File Viewer Online",
    "description": "Free online viewer to open and view QuickBooks Web Connect (.qbo), OFX, and QFX bank statement files.",
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
        { "@type": "ListItem", "position": 3, "name": "QBO Viewer" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I open a QBO file online?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply drag and drop your QBO file onto our viewer. It will instantly parse the file and display all transactions in a readable table format. No software installation required."
            }
        },
        {
            "@type": "Question",
            "name": "What is a QBO file?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A QBO file is a QuickBooks Web Connect file used to import bank transactions into QuickBooks. It contains transaction data like dates, amounts, payees, and transaction types in OFX/SGML format."
            }
        },
        {
            "@type": "Question",
            "name": "Is my data secure when viewing QBO files online?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, completely. Our viewer runs 100% in your browser. Your financial data never leaves your device and is never uploaded to any server."
            }
        },
        {
            "@type": "Question",
            "name": "Can I export the transactions after viewing?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! After viewing your QBO file, you can export all transactions to CSV format for use in Excel, Google Sheets, or other software."
            }
        },
        {
            "@type": "Question",
            "name": "Does this viewer support OFX and QFX files too?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our viewer supports QBO (QuickBooks), OFX (Open Financial Exchange), and QFX (Quicken) files. All three formats are based on similar structures."
            }
        }
    ]
};

const whoIsThisFor = [
    { icon: Users, title: "Accountants", desc: "Preview client bank files before importing into QuickBooks." },
    { icon: Building2, title: "Business Owners", desc: "View bank transaction downloads without QuickBooks installed." },
    { icon: BarChart3, title: "Bookkeepers", desc: "Verify QBO file contents before processing in accounting software." },
    { icon: Briefcase, title: "Auditors", desc: "Review bank statement files for audit documentation purposes." },
];

const useCases = [
    { title: "Preview Before Import", desc: "Check transaction counts and date ranges before importing into QuickBooks or other accounting software." },
    { title: "Verify Bank Downloads", desc: "Confirm your bank exported the correct transactions and account information." },
    { title: "Client File Review", desc: "Accountants can quickly review client QBO files without importing them into their own software." },
    { title: "Troubleshoot Import Errors", desc: "Identify problematic transactions when QuickBooks import fails." },
    { title: "Multi-Bank Comparison", desc: "View files from different banks side-by-side to reconcile accounts." },
    { title: "Transaction Auditing", desc: "Review historical bank data for compliance or tax preparation purposes." },
];

const relatedTools = [
    { href: "/tools/ofx-viewer", title: "OFX Viewer" },
    { href: "/convert/qbo-to-csv", title: "QBO to CSV" },
    { href: "/convert/qfx-to-csv", title: "QFX to CSV" },
    { href: "/convert/ofx-to-excel", title: "OFX to Excel" },
    { href: "/convert/qfx-to-pdf", title: "QFX to PDF" },
    { href: "/convert/qif-to-csv", title: "QIF to CSV" },
];

export default function QboViewerPage() {
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

            {/* Tool Section */}
            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <QboViewerTool />
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free QBO File Viewer?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Lock, title: "100% Private", desc: "Files never leave your device. All processing happens in your browser." },
                            { icon: Eye, title: "Instant Preview", desc: "See all transactions immediately without installing any software." },
                            { icon: Zap, title: "No Signup Required", desc: "No email, no account needed. Just drop your file and view." },
                            { icon: Shield, title: "Multiple Formats", desc: "Supports QBO, OFX, and QFX file formats from any bank." },
                            { icon: Globe, title: "Works Anywhere", desc: "Use on any device with a modern web browser." },
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

            {/* How To Section */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        How to View QBO Files Online
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Upload Your File", desc: "Drag and drop your QBO, OFX, or QFX file onto the viewer." },
                            { step: 2, title: "View Transactions", desc: "Instantly see all transactions with dates, amounts, and descriptions." },
                            { step: 3, title: "Review Summary", desc: "Check total credits, debits, and account information." },
                            { step: 4, title: "Export if Needed", desc: "Download transactions as CSV for use in Excel or other software." },
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

            {/* Who Is This For */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Who Uses This QBO File Viewer?
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
                        Common Use Cases for QBO File Viewer
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

            {/* SEO Content Block */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        The Best Free QBO File Viewer in 2026
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Need to <strong>open a QBO file</strong> but don't have QuickBooks installed? Our free online QBO viewer lets you see the contents of QuickBooks Web Connect files instantly in your browser. No software downloads, no account registration, and <strong>100% private processing</strong>.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        What is a QBO File?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        A <strong>QBO file</strong> (QuickBooks Web Connect) is a financial data file used to import bank transactions into QuickBooks accounting software. Banks provide these files for download so users can automatically sync their transactions. QBO files contain:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>Transaction Data:</strong> Dates, amounts, payees, and descriptions</li>
                        <li><strong>Account Information:</strong> Bank ID, account number, and type</li>
                        <li><strong>Balance Data:</strong> Current or closing balance as of file date</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        QBO File Structure and Key Tags
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        QBO files use OFX (Open Financial Exchange) SGML/XML structure. Key tags include:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>&lt;STMTTRN&gt;:</strong> Statement transaction container</li>
                        <li><strong>&lt;TRNTYPE&gt;:</strong> Transaction type (DEBIT, CREDIT, CHECK)</li>
                        <li><strong>&lt;DTPOSTED&gt;:</strong> Transaction date in YYYYMMDD format</li>
                        <li><strong>&lt;TRNAMT&gt;:</strong> Transaction amount (positive or negative)</li>
                        <li><strong>&lt;FITID&gt;:</strong> Unique financial institution transaction ID</li>
                        <li><strong>&lt;NAME&gt;:</strong> Payee or merchant name</li>
                        <li><strong>&lt;MEMO&gt;:</strong> Additional transaction description</li>
                        <li><strong>&lt;BANKACCTFROM&gt;:</strong> Account identification block</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        QBO vs OFX vs QFX: What's the Difference?
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>QBO (QuickBooks Web Connect):</strong> Intuit's format optimized for QuickBooks import. Contains additional headers for QuickBooks compatibility.</li>
                        <li><strong>OFX (Open Financial Exchange):</strong> The open industry standard for financial data exchange. Used by banks, brokerages, and financial institutions worldwide.</li>
                        <li><strong>QFX (Quicken Financial Exchange):</strong> Intuit's Quicken-specific variant of OFX with proprietary INTU headers.</li>
                    </ul>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Our <strong>QBO file viewer</strong> supports all three formats since they share the same underlying OFX structure.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Use an Online QBO Viewer?
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>No QuickBooks License Needed:</strong> View QBO files without purchasing expensive accounting software.</li>
                        <li><strong>Quick Preview:</strong> Check file contents before importing into accounting software to verify accuracy.</li>
                        <li><strong>Verify Bank Downloads:</strong> Confirm your bank exported the correct transactions and date range.</li>
                        <li><strong>Client File Review:</strong> Accountants can preview client files without importing into their own QuickBooks.</li>
                        <li><strong>Troubleshoot Import Issues:</strong> Identify malformed data that causes QuickBooks import errors.</li>
                        <li><strong>Cross-Platform Access:</strong> Works on Windows, Mac, Linux, tablets, and phones - any device with a browser.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Banks That Provide QBO Downloads
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Most major banks offer QBO file downloads for QuickBooks users, including:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li>Chase, Bank of America, Wells Fargo, Citibank</li>
                        <li>Capital One, PNC Bank, US Bank, TD Bank</li>
                        <li>American Express, Discover, most credit unions</li>
                        <li>PayPal Business, Stripe, Square</li>
                    </ul>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            { q: "How do I open a QBO file without QuickBooks?", a: "Use our free online viewer. Just drag and drop your QBO file and view all transactions instantly in your browser." },
                            { q: "Is it safe to upload my QBO file?", a: "Completely safe. Your file is processed entirely in your browser and never uploaded to any server." },
                            { q: "Can I view multiple QBO files at once?", a: "Yes! Upload multiple files and switch between them using the file tabs above the transaction table." },
                            { q: "What browsers are supported?", a: "Any modern browser works: Chrome, Firefox, Safari, Edge. Works on desktop and mobile devices." },
                            { q: "Can I convert the QBO file to Excel?", a: "Yes, click the 'Export to CSV' button to download transactions as a spreadsheet file." },
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{faq.q}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Author Attribution */}
            <section className="py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <PageMeta lastUpdated="January 2026" />
                </div>
            </section>

            {/* Footer */}
            <ToolPageFooter
                currentTool="QBO Viewer"
                relatedTools={relatedTools}
            />
        </main>
    );
}
