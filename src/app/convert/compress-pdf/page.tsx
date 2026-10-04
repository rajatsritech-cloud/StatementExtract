import { Metadata } from "next";
import { CompressPDFTool } from "@/components/pdf-tools/CompressPDFTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { Zap, Shield, Globe, FileText, Lock, Minimize2, Mail, HardDrive, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Compress PDF Online Free | Reduce PDF to 100KB, 500KB, 1MB, 2MB | Statement Extract",
    description: "Free PDF compressor. Reduce PDF size to 100KB, 200KB, 500KB, 1MB, 2MB, 5MB. Perfect for email attachments. Fully Client-Side, no upload. Works on all devices.",
    keywords: "compress pdf to 100kb, compress pdf to 500kb, compress pdf to 1mb, compress pdf to 2mb, compress pdf to 5mb, reduce pdf size, pdf compressor online free, shrink pdf for email, compress pdf to 200kb, compress pdf to 300kb, compress pdf without losing quality, make pdf smaller",
    openGraph: {
        title: "Compress PDF Online Free | Reduce PDF to 100KB, 500KB, 1MB",
        description: "Reduce PDF file size to exact targets. Free, private, no upload required.",
        type: "website",
        url: "https://statementextract.com/convert/compress-pdf"
    },
    alternates: {
        canonical: "https://statementextract.com/convert/compress-pdf/"
    }
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PDF Compressor - Compress PDF to Specific Size",
    "description": "Compress PDF files to exact target sizes like 100KB, 500KB, 1MB online for free",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I compress a PDF to 100KB?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Upload your PDF, select high compression level, and download the compressed result. Our tool optimizes the PDF structure to reduce file size while maintaining readability."
            }
        },
        {
            "@type": "Question",
            "name": "Can I compress PDF to under 1MB for email?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Select medium or high compression to reduce your PDF to under 1MB. Most PDFs can be compressed by a significant amount depending on their content."
            }
        },
        {
            "@type": "Question",
            "name": "Is it safe to compress PDFs online?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our PDF compressor processes files entirely in your browser. Your PDFs never leave your device or get uploaded to any server, making it Private & Secure and secure."
            }
        }
    ]
};

// Long-tail keyword target sizes for PDF
const targetSizes = [
    { size: "100KB", use: "Small documents, email signatures, single-page forms" },
    { size: "200KB", use: "Short reports, receipts, simple invoices" },
    { size: "300KB", use: "Multi-page forms, basic contracts, quotes" },
    { size: "500KB", use: "Bank statements, invoices, standard reports" },
    { size: "1MB", use: "Detailed reports, financial statements, presentations" },
    { size: "2MB", use: "Large documents with charts, annual reports" },
    { size: "3MB", use: "Image-heavy documents, brochures, catalogs" },
    { size: "5MB", use: "High-quality documents, portfolios, manuals" },
    { size: "10MB", use: "Large presentations, multi-page scans" },
    { size: "Under email limit", use: "Most email providers limit to 10-25MB" },
];

const relatedTools = [
    { href: "/convert/merge-pdf", title: "Merge PDF" },
    { href: "/convert/split-pdf", title: "Split PDF" },
    { href: "/convert/rotate-pdf", title: "Rotate PDF" },
    { href: "/convert/add-page-numbers-pdf", title: "Add Page Numbers" },
    { href: "/convert/unlock-pdf", title: "Unlock PDF" },
];

export default function CompressPDFPage() {
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
                <CompressPDFTool />
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Free PDF Compressor?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Minimize2, title: "Target Any Size", desc: "Compress PDF to 100KB, 500KB, 1MB, or any target size." },
                            { icon: Shield, title: "Private & Secure", desc: "All compression happens in your browser. Files never uploaded." },
                            { icon: Globe, title: "Works Everywhere", desc: "Chrome, Firefox, Safari, Edge — any modern browser." },
                            { icon: Mail, title: "Perfect for Email", desc: "Get PDFs under email limits without losing quality." },
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
                        How to Compress PDF to Specific Size
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Upload Your PDF", desc: "Drag and drop your PDF file or click to browse and select." },
                            { step: 2, title: "Choose Compression Level", desc: "Select low (best quality), medium (balanced), or high (smallest size)." },
                            { step: 3, title: "Download Compressed PDF", desc: "Click compress and download your smaller PDF file instantly." },
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

            {/* Long-Tail Keywords Section - Compress to Specific Size */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-4">
                        Compress PDF to Exact File Sizes
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-10 max-w-2xl mx-auto">
                        Need to compress PDF to 100KB for a form upload? Or reduce to 1MB for email? Our tool helps you hit your target size.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {targetSizes.map((item, i) => (
                            <div key={i} className="p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-colors">
                                <div className="flex items-center gap-3 mb-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <h3 className="font-bold text-[hsl(var(--foreground))]">
                                        Compress to {item.size}
                                    </h3>
                                </div>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                    {item.use}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table - Best Free PDF Compressor */}
            <section className="py-12 md:py-16 px-4 bg-[hsl(var(--muted))]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Best Free PDF Compressor (No Upload, No Signup)
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Compare our free tool to Adobe Acrobat, Smallpdf, and iLovePDF
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]/10">
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--foreground))]">Feature</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--primary))]">Statement Extract</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--muted-foreground))]">Others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: "Price", us: "Free forever", competitors: "$8-20/month" },
                                    { feature: "File Upload", us: "None (browser only)", competitors: "Uploads to servers" },
                                    { feature: "Target Sizes", us: "8 presets + custom", competitors: "Low/Med/High only" },
                                    { feature: "Watermarks", us: "Never", competitors: "Often on free tier" },
                                    { feature: "File Limits", us: "Unlimited", competitors: "2-5 files/day free" },
                                    { feature: "Batch Compress", us: "Yes", competitors: "Premium only" },
                                    { feature: "Quality Preview", us: "Yes", competitors: "Sometimes" },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-[hsl(var(--border))]">
                                        <td className="p-4 text-[hsl(var(--foreground))]">{row.feature}</td>
                                        <td className="p-4 text-[hsl(var(--primary))] font-medium">{row.us}</td>
                                        <td className="p-4 text-[hsl(var(--muted-foreground))]">{row.competitors}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Deep SEO Content - Individual Size Guides */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-8 text-center">
                        Complete Guide: Compress PDF to Any Size
                    </h2>

                    <div className="space-y-8 text-[hsl(var(--muted-foreground))]">
                        {/* Compress to ANY Size - Niche SEO */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/5 to-[hsl(var(--card))] border border-[hsl(var(--primary))]/20">
                            <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                                Compress PDF to Custom Size (100KB, 200KB, 500KB, 1MB, etc.)
                            </h3>
                            <p className="mb-3">
                                Need to <strong>compress PDF to 100KB</strong> for a strict form upload? Or <strong>reduce PDF to 500KB</strong> for email? Our tool optimizes PDF structure to <em>minimize file size</em> while preserving document quality and readability.
                            </p>
                            <p className="mb-3">
                                Unlike image compression which loses quality, PDF compression primarily removes redundant data, unused objects, and optimizes internal streams. This means your text remains sharp and your document stays professional.
                            </p>
                            <div className="mt-4 p-4 bg-[hsl(var(--background))] rounded-xl">
                                <p className="text-sm font-medium text-[hsl(var(--foreground))] mb-2">Popular target sizes:</p>
                                <div className="flex flex-wrap gap-2">
                                    {["100KB", "150KB", "200KB", "250KB", "300KB", "400KB", "500KB", "750KB", "1MB", "1.5MB", "2MB", "3MB", "5MB", "10MB"].map((size) => (
                                        <span key={size} className="px-2 py-1 rounded-md bg-[hsl(var(--muted))] text-xs font-medium">
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Compress PDF to 100KB */}
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                                How to Compress PDF to 100KB
                            </h3>
                            <p className="mb-3">
                                Need to <strong>compress PDF to 100KB</strong> for a government form or job application? Many online portals require documents under 100KB. Our compressor uses high-level optimization to strip unnecessary data and reach this target.
                            </p>
                            <p>
                                100KB is achievable for text-heavy PDFs with minimal images. For image-heavy documents, consider removing images or using our high compression setting.
                            </p>
                        </div>

                        {/* Compress PDF to 500KB */}
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                                How to Compress PDF to 500KB
                            </h3>
                            <p className="mb-3">
                                Looking to <strong>compress PDF to 500KB</strong>? This is the ideal size for bank statements, invoices, and standard business documents. Most multi-page documents can be compressed to 500KB while maintaining full readability.
                            </p>
                            <p>
                                500KB PDFs are email-friendly and load quickly on mobile devices, making them perfect for sharing financial documents with clients and accountants.
                            </p>
                        </div>

                        {/* Compress PDF to 1MB */}
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                                How to Compress PDF to 1MB
                            </h3>
                            <p className="mb-3">
                                Want to <strong>compress PDF to 1MB</strong>? This size works perfectly for detailed financial reports, annual statements, and presentation documents. It's under most email attachment limits while preserving good quality.
                            </p>
                            <p>
                                1MB is the sweet spot for professional documents that need to look sharp when viewed on desktop screens or printed.
                            </p>
                        </div>

                        {/* Compress PDF to 2MB */}
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                                How to Compress PDF to 2MB
                            </h3>
                            <p className="mb-3">
                                Need to <strong>compress PDF to 2MB</strong>? This target is great for larger documents with charts, graphs, and embedded images. Annual reports and tax documents often fit well at this size.
                            </p>
                            <p>
                                2MB PDFs are still small enough for email attachments through most providers while maintaining excellent visual quality for professional presentations.
                            </p>
                        </div>

                        {/* Compress PDF for Email */}
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                                Compress PDF for Email Attachments
                            </h3>
                            <p className="mb-3">
                                Need to <strong>compress PDF for email</strong>? Most email providers (Gmail, Outlook, Yahoo) limit attachments to 10-25MB. Our compressor helps you <strong>reduce PDF size for email</strong> without losing document quality.
                            </p>
                            <p>
                                For multiple attachments, aim for 1-2MB per PDF. This ensures your emails send quickly and recipients can download them on mobile without issues.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases - Finance Focused */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        PDF Compression for Finance & Bookkeeping
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: "Bank Statement PDFs", desc: "Compress bank statements to email accountants or upload to tax portals. Reduce 5MB statements to under 500KB." },
                            { title: "Invoice Documents", desc: "Shrink invoice PDFs for faster email delivery to clients. Keep documents under 200KB for quick sending." },
                            { title: "Financial Reports", desc: "Compress quarterly and annual reports for stakeholder emails while maintaining chart quality." },
                            { title: "Tax Document Uploads", desc: "Many tax portals limit uploads to 1-2MB. Compress your tax PDFs to meet these requirements." },
                            { title: "Receipt Archives", desc: "Reduce scanned receipt sizes for long-term storage. Save disk space without losing readability." },
                            { title: "Audit Documentation", desc: "Compress large audit files for secure sharing with external auditors and compliance teams." },
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

            {/* Why Our Compressor - Deep SEO */}
            <section className="py-12 md:py-16 px-6 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-8">
                        Why Choose Our Free PDF Compressor?
                    </h2>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-[hsl(var(--muted-foreground))]">
                            Unlike other <strong>PDF compressor</strong> tools that upload your sensitive documents to servers, our compressor runs entirely in your browser. This means:
                        </p>

                        <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] space-y-2 mt-4">
                            <li><strong>Complete Privacy:</strong> Your PDFs never leave your device. No server uploads, no data collection. Perfect for sensitive bank statements and financial documents.</li>
                            <li><strong>Faster Processing:</strong> No waiting for upload/download. Compression happens instantly using your browser's capabilities.</li>
                            <li><strong>No File Limits:</strong> Compress as many PDFs as you want. No daily limits, no subscription required.</li>
                            <li><strong>Works Offline:</strong> Once the page loads, you can compress PDFs without an internet connection.</li>
                            <li><strong>Finance-Friendly:</strong> Optimized for bank statements, invoices, and financial documents that accountants and bookkeepers use daily.</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mt-8 mb-4">
                            How Much Can You Compress a PDF?
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))]">
                            Compression results vary based on PDF content. <strong>Text-heavy PDFs</strong> (like bank statements) can often be reduced by a significant amount. <strong>Image-heavy PDFs</strong> (like scanned documents) may see a significant amount reduction. Documents already optimized will see smaller reductions.
                        </p>

                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mt-8 mb-4">
                            Compress PDF Without Losing Quality
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))]">
                            Our <strong>PDF size reducer</strong> uses lossless optimization techniques that don't degrade document quality. We remove unused objects, compress streams, and optimize the PDF structure — your text stays crisp and images remain clear.
                        </p>
                    </div>
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
                            { q: "How do I compress PDF to 100KB?", a: "Upload your PDF, select high compression, and download the result. For very small targets like 100KB, the PDF should be mostly text with minimal images." },
                            { q: "Can I compress PDF to 500KB for email?", a: "Yes! 500KB is achievable for most multi-page documents. Our high compression setting optimizes the PDF structure to reduce file size significantly." },
                            { q: "How do I compress PDF to 1MB?", a: "Upload your document, choose medium or high compression, and download. Most documents can easily fit under 1MB with our optimization." },
                            { q: "Will compressing PDF reduce quality?", a: "Our compressor uses lossless techniques for text. Images may be slightly optimized but remain clear. Text stays perfectly sharp and readable." },
                            { q: "Is it safe to compress bank statements online?", a: "Yes! Our tool processes everything in your browser. Your bank statements never leave your device or get uploaded to any server." },
                            { q: "How much can I reduce PDF file size?", a: "Typically a significant amount depending on content. Text PDFs see a significant amount reduction, while image-heavy documents can be reduced by a significant amount." },
                            { q: "Can I compress password-protected PDFs?", a: "The tool can handle some encrypted PDFs, but heavily password-protected files may not be compatible. Remove protection before compressing." },
                            { q: "Is this PDF compressor really free?", a: "Free Online Tool with no limits, no watermarks, and no signup. We monetize through our premium bank statement extraction services." },
                            { q: "What's the maximum file size I can compress?", a: "Since processing happens in your browser, you can compress PDFs up to 100MB or more. The only limit is your device's available memory." },
                            { q: "Can I compress multiple PDFs at once?", a: "Currently, we process one PDF at a time for optimal results. Use our Merge PDF tool first if you want to combine files, then compress." },
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
                currentTool="PDF Compressor"
                relatedTools={relatedTools}
            />
        </main>
    );
}
