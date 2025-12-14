import { Metadata } from "next";
import { SplitPDFTool } from "@/components/pdf-tools/SplitPDFTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { Zap, Shield, Globe, FileText, Lock, Scissors, FileOutput, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Split PDF Online Free | Extract Pages from PDF | Statement Extract",
    description: "Free PDF splitter. Extract specific pages, split page ranges, or separate all pages. Perfect for bank statements. 100% client-side, no upload required.",
    keywords: "split pdf, extract pages from pdf, pdf splitter, separate pdf pages, split pdf online free, extract pdf pages, pdf page extractor, split pdf into multiple files, remove pages from pdf, split bank statement pdf",
    openGraph: {
        title: "Split PDF Online Free | Extract Pages from PDF",
        description: "Extract specific pages or split PDF into separate files. Free, private, no upload required.",
        type: "website",
        url: "https://statementextract.com/convert/split-pdf",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/split-pdf",
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PDF Splitter - Extract PDF Pages",
    "description": "Split PDF files and extract specific pages online for free",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "3892"
    }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I split a PDF into separate pages?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Upload your PDF, select 'All Pages' mode, and click Split. Each page will be extracted into its own PDF file that you can download individually or all at once."
            }
        },
        {
            "@type": "Question",
            "name": "Can I extract specific pages from a PDF?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Use the 'Extract Pages' mode and enter page numbers like '1, 3, 5-8' to extract only those pages into a single new PDF."
            }
        },
        {
            "@type": "Question",
            "name": "Is it safe to split PDFs online?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our PDF splitter processes files entirely in your browser. Your PDFs never leave your device or get uploaded to any server, making it 100% private and secure."
            }
        }
    ]
};

// Finance-focused use cases for SEO
const useCases = [
    { title: "Split Bank Statement", desc: "Extract specific months or pages from multi-month bank statement PDFs." },
    { title: "Separate Invoice Pages", desc: "Split a combined invoice PDF into individual invoices for clients." },
    { title: "Extract Financial Pages", desc: "Pull specific pages from annual reports or financial statements." },
    { title: "Split Tax Documents", desc: "Separate different tax forms from a combined PDF download." },
    { title: "Extract Receipt Pages", desc: "Pull individual receipts from a scanned expense document." },
    { title: "Split Audit Files", desc: "Extract relevant pages for specific audit queries or reviews." },
];

const relatedTools = [
    { href: "/convert/merge-pdf", title: "Merge PDF" },
    { href: "/convert/compress-pdf", title: "Compress PDF" },
    { href: "/convert-bank-statement-to-csv-excel", title: "Bank Statement to Excel" },
    { href: "/convert/batch-converter", title: "Image Converter" },
];

export default function SplitPDFPage() {
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

            {/* Tool Section - Visible Above the Fold */}
            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <SplitPDFTool />
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free PDF Splitter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Scissors, title: "Multiple Split Modes", desc: "Extract specific pages, ranges, or split all pages at once." },
                            { icon: Shield, title: "100% Private", desc: "All splitting happens in your browser. Files never uploaded." },
                            { icon: Globe, title: "Works Everywhere", desc: "Chrome, Firefox, Safari, Edge — any modern browser." },
                            { icon: FileOutput, title: "Instant Download", desc: "Download individual files or all at once with one click." },
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
                        How to Split PDF Files Online
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Upload Your PDF", desc: "Drag and drop your PDF file or click to browse and select." },
                            { step: 2, title: "Choose Split Mode", desc: "Extract specific pages, a page range, or split into individual pages." },
                            { step: 3, title: "Download Results", desc: "Download your split PDF files individually or all at once." },
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

            {/* Use Cases - Finance Focused */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        PDF Splitting for Finance & Bookkeeping
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
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        Free PDF Splitter — Extract Pages Without Upload
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Need to <strong>split a PDF</strong> or <strong>extract specific pages</strong>? Our <strong>free online PDF splitter</strong> makes it easy to separate PDF documents without uploading to any server. All processing happens directly in your browser using JavaScript.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Whether you're an <strong>accountant extracting bank statement pages</strong>, a <strong>bookkeeper separating invoices</strong>, or anyone who needs to <strong>split PDF files</strong>, our tool handles it instantly with complete privacy.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Three Ways to Split Your PDF
                    </h3>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li><strong>Extract Pages:</strong> Enter specific page numbers (1, 3, 5-8) to extract only those pages into a new PDF</li>
                        <li><strong>Page Range:</strong> Extract a continuous range of pages (e.g., pages 5 to 10)</li>
                        <li><strong>Split All:</strong> Separate every page into its own individual PDF file</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Choose Our PDF Page Extractor?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))]">
                        Most online PDF splitters require uploading your documents to remote servers, which poses privacy and security risks — especially for sensitive financial documents like <strong>bank statements</strong>, <strong>tax forms</strong>, and <strong>invoices</strong>. Our tool processes everything client-side, making it the <strong>safest way to split PDFs online</strong>.
                    </p>
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
                            { q: "How do I split a PDF into separate pages?", a: "Upload your PDF, select 'All Pages' mode, and click Split. Each page will be extracted into its own PDF file that you can download individually or all at once." },
                            { q: "Can I extract specific pages from a PDF?", a: "Yes! Use the 'Extract Pages' mode and enter page numbers like '1, 3, 5-8' to extract only those pages into a single new PDF." },
                            { q: "How do I extract pages 5-10 from a PDF?", a: "Use the 'Page Range' mode, enter 5 as the start page and 10 as the end page, then click Split. You'll get a new PDF with just those 6 pages." },
                            { q: "Is it safe to split PDFs online?", a: "Yes! Our PDF splitter processes files entirely in your browser using JavaScript. Your PDFs never leave your device or get uploaded to any server." },
                            { q: "Can I split password-protected PDFs?", a: "The tool can handle some encrypted PDFs, but heavily password-protected files may not be compatible. Remove protection before splitting." },
                            { q: "Is there a limit on PDF size?", a: "Since processing happens in your browser, you can split large PDFs. The only limit is your device's available memory." },
                            { q: "Can I split bank statement PDFs?", a: "Absolutely! This is one of the most common use cases. Extract specific months or pages from combined bank statements for accounting purposes." },
                            { q: "Is this PDF splitter really free?", a: "100% free with no limits, no watermarks, and no signup required. We monetize through our premium bank statement extraction services." },
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{faq.q}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Document Extraction CTA + Related Tools + Latest Blogs */}
            <ToolPageFooter
                currentTool="PDF Splitter"
                relatedTools={relatedTools}
            />
        </main>
    );
}
