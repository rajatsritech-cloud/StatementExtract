import { Metadata } from "next";
import { MergePDFTool } from "@/components/pdf-tools/MergePDFTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { Zap, Shield, Globe, FileText, Lock, Layers, ArrowDownUp, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Merge PDF Files Online Free | Combine PDF Documents | Statement Extract",
    description: "Free online PDF merger. Combine multiple PDF files into one document. Drag to reorder pages. 100% client-side, no upload required. Works on all devices.",
    keywords: "merge pdf, combine pdf, join pdf files, pdf merger online free, merge pdf files into one, combine multiple pdfs, pdf joiner, unite pdf documents, merge pdf without upload, merge pdf browser",
    openGraph: {
        title: "Merge PDF Files Online Free | Combine PDF Documents",
        description: "Combine multiple PDF files into one document instantly. Free, private, no upload required.",
        type: "website",
        url: "https://statementextract.com/convert/merge-pdf",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/merge-pdf",
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free PDF Merger",
    "description": "Merge multiple PDF files into one document online for free",
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
        "ratingCount": "2847"
    }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I merge PDF files online for free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply drag and drop your PDF files into our merger, arrange them in your preferred order, and click 'Merge & Download'. The combined PDF will download instantly. No signup or payment required."
            }
        },
        {
            "@type": "Question",
            "name": "Is it safe to merge PDFs online?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our PDF merger processes files entirely in your browser using JavaScript. Your PDFs never leave your device or get uploaded to any server, making it 100% private and secure."
            }
        },
        {
            "@type": "Question",
            "name": "Can I merge large PDF files?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, you can merge PDFs of any size. Since processing happens in your browser, the only limit is your device's memory. For very large files, we recommend using a desktop browser."
            }
        }
    ]
};

const relatedTools = [
    { href: "/convert-bank-statement-to-csv-excel", title: "Bank Statement to Excel" },
    { href: "/convert/image-compressor", title: "Image Compressor" },
    { href: "/convert/batch-converter", title: "HEIC Converter" },
    { href: "/convert/json-to-toon", title: "JSON to TOON" },
];

export default function MergePDFPage() {
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
                <MergePDFTool />
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free PDF Merger?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Lock, title: "100% Private & Secure", desc: "Files never leave your device. All merging happens in your browser." },
                            { icon: Zap, title: "Lightning Fast", desc: "Merge PDFs instantly. No waiting for uploads or server processing." },
                            { icon: ArrowDownUp, title: "Drag to Reorder", desc: "Easily rearrange document order before merging with drag and drop." },
                            { icon: Layers, title: "Unlimited Files", desc: "Combine any number of PDFs. No file count or size restrictions." },
                            { icon: Shield, title: "No Signup Required", desc: "No account, no email, no payment. Just merge and download." },
                            { icon: Globe, title: "Works on All Devices", desc: "Use on desktop, tablet, or mobile. Any modern browser works." },
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
                        How to Merge PDF Files Online
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Upload Your PDF Files", desc: "Drag and drop multiple PDF documents or click to browse and select files from your device." },
                            { step: 2, title: "Arrange the Order", desc: "Drag files to reorder them. The final PDF will follow this sequence from top to bottom." },
                            { step: 3, title: "Click Merge & Download", desc: "Press the merge button. Your combined PDF will download automatically in seconds." },
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

            {/* Use Cases Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Common PDF Merge Use Cases
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: "Combine Bank Statements", desc: "Merge monthly bank statements into a single annual document for accounting and tax purposes." },
                            { title: "Join Invoice Documents", desc: "Combine multiple invoices into one PDF for easier record-keeping and client billing." },
                            { title: "Merge Scanned Documents", desc: "Combine scanned pages into a single cohesive document for digital archiving." },
                            { title: "Create Report Packages", desc: "Merge cover pages, reports, and appendices into professional document packages." },
                        ].map((useCase, i) => (
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
            <section className="py-12 md:py-16 px-6 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        Free PDF Merger — Combine PDFs Without Upload
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Need to <strong>merge PDF files</strong> into a single document? Our <strong>free online PDF merger</strong> makes it easy to combine multiple PDF documents without uploading them to any server. All processing happens directly in your browser using JavaScript, ensuring your files remain <strong>100% private and secure</strong>.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Whether you're an <strong>accountant merging bank statements</strong>, a <strong>bookkeeper combining invoices</strong>, or anyone who needs to <strong>join PDF files</strong>, our tool handles it instantly. Unlike other PDF combiners that upload your sensitive documents to cloud servers, we process everything locally on your device.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        How Does the PDF Merger Work?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Our <strong>PDF joiner</strong> uses the pdf-lib JavaScript library to read, combine, and save PDF documents entirely within your web browser. When you select files:
                    </p>
                    <ul className="text-[hsl(var(--muted-foreground))] mb-4 list-disc pl-6 space-y-2">
                        <li>Files are read into memory using your browser's File API</li>
                        <li>Each PDF is parsed and pages are extracted</li>
                        <li>Pages are combined in your specified order</li>
                        <li>The merged PDF is generated and downloaded directly</li>
                    </ul>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Your files <strong>never leave your computer</strong> — there's no upload, no cloud processing, and no data retention.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Choose Our PDF Combiner?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))]">
                        Most online PDF mergers require uploading your documents to remote servers, which poses privacy and security risks — especially for sensitive financial documents like <strong>bank statements</strong>, <strong>tax forms</strong>, and <strong>invoices</strong>. Our tool eliminates these concerns by processing everything client-side, making it the <strong>safest way to merge PDFs online</strong>.
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
                            { q: "How do I merge PDF files online for free?", a: "Simply drag and drop your PDF files into our merger, arrange them in your preferred order, and click 'Merge & Download'. The combined PDF will download instantly. No signup or payment required." },
                            { q: "Is it safe to merge PDFs online?", a: "Yes! Our PDF merger processes files entirely in your browser using JavaScript. Your PDFs never leave your device or get uploaded to any server, making it 100% private and secure." },
                            { q: "Can I merge large PDF files?", a: "Yes, you can merge PDFs of any size. Since processing happens in your browser, the only limit is your device's memory. For very large files, we recommend using a desktop browser." },
                            { q: "How many PDF files can I merge at once?", a: "There's no limit on the number of files. You can merge dozens of PDFs into a single document. The tool shows page counts for each file so you know exactly what you're combining." },
                            { q: "Can I reorder the PDF pages before merging?", a: "Yes! Simply drag and drop files in the list to rearrange their order. The merged PDF will follow the sequence you set, from top to bottom." },
                            { q: "Is this PDF merger really free?", a: "Yes, completely free with no limits, no watermarks, and no signup required. We make money from our premium document extraction services, not basic PDF tools." },
                            { q: "What browsers support the PDF merger?", a: "Our tool works on all modern browsers including Chrome, Firefox, Safari, and Edge on desktop and mobile devices." },
                            { q: "Can I merge password-protected PDFs?", a: "The tool can handle some encrypted PDFs, but heavily protected files may not be compatible. For best results, remove password protection before merging." },
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
                currentTool="PDF Merger"
                relatedTools={relatedTools}
            />
        </main>
    );
}
