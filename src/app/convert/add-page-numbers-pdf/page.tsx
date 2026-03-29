import { Metadata } from "next";
import { AddPageNumbersTool } from "@/components/pdf-tools/AddPageNumbersTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { Hash, Shield, Zap, FileText, Smartphone, CheckCircle, Settings, Type, AlertTriangle, FileStack, Printer, Mail, Briefcase, Monitor, Tablet, Chrome, DollarSign, RotateCw } from "lucide-react";

export const metadata: Metadata = {
    title: "Add Page Numbers to PDF Online Free – Insert Page X of Y (No Upload)",
    description: "Add page numbers to PDF online free – insert at top or bottom with custom formats. Choose position, style (Page X of Y), and starting page. Processed locally in your browser. Works on iPhone & Android.",
    keywords: [
        // Primary long-tail targets
        "add page numbers to pdf free online",
        "add page numbers to pdf",
        "insert page numbers pdf",
        "number pages in pdf",
        "pdf page numbering tool",
        "add page numbers to pdf without acrobat",
        "page number pdf free",
        // Position specific
        "add footer page numbers pdf",
        "add header page numbers pdf",
        "page numbers bottom center pdf",
        // Format specific
        "add page x of y to pdf",
        "page 1 of 10 pdf",
        // Use case specific
        "number pdf pages for printing",
        "add page numbers to scanned pdf",
        "add page numbers to contract pdf",
        "insert page numbers legal document",
        // Mobile
        "add page numbers to pdf on iphone",
        "add page numbers to pdf on phone",
        // Alternative - low competition
        "best page number pdf tool",
        "best free pdf page numbering",
        "pdf page numbering without software",
        "pdf page number tool no watermark",
    ],
    openGraph: {
        title: "Add Page Numbers to PDF Free Online - No Signup Required",
        description: "Insert page numbers anywhere on your PDF. Choose position, format, and starting page. Free Online Tool and private.",
        type: "website",
        url: "https://statementextract.com/convert/add-page-numbers-pdf"
    },
    twitter: {
        card: "summary_large_image",
        title: "Add Page Numbers to PDF Free Online",
        description: "Insert page numbers to PDF. Choose position and format. Works on mobile. Free Online Tool."
    },
    alternates: {
        canonical: "https://statementextract.com/convert/add-page-numbers-pdf/"
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1
        }
    }
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PDF Page Numbering Tool - Add Page Numbers Free",
    "description": "Free online tool to add page numbers to PDF documents. Choose position (top/bottom, left/center/right), format (Page X of Y, simple, dashed), and starting page. No signup required.",
    "url": "https://statementextract.com/convert/add-page-numbers-pdf/",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser, iOS, Android",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Add Page Numbers to PDF Free Online",
    "description": "Step-by-step guide to insert page numbers into any PDF document using our free online tool.",
    "totalTime": "PT2M",
    "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
    },
    "step": [
        {
            "@type": "HowToStep",
            "name": "Upload Your PDF",
            "text": "Drag and drop your PDF file or click to browse. Works with any PDF including scanned documents.",
            "position": 1
        },
        {
            "@type": "HowToStep",
            "name": "Choose Position",
            "text": "Select where to place page numbers: bottom-center, bottom-left, bottom-right, top-center, top-left, or top-right.",
            "position": 2
        },
        {
            "@type": "HowToStep",
            "name": "Select Format",
            "text": "Choose your preferred format: simple (1, 2, 3), with total (1 of 10), Page X, Page X of Y, or dashed (- 1 -).",
            "position": 3
        },
        {
            "@type": "HowToStep",
            "name": "Download Numbered PDF",
            "text": "Click 'Add Page Numbers' and download your numbered PDF instantly.",
            "position": 4
        }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I add page numbers to a PDF for free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Upload your PDF to our free tool, choose the position (top or bottom, left/center/right), select a format like 'Page 1 of 10', and click Add Page Numbers. Your numbered PDF is ready to download instantly with no signup required."
            }
        },
        {
            "@type": "Question",
            "name": "Can I add page numbers starting from a specific page?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! You can set the starting page in our tool. This is useful when you have a cover page or table of contents that shouldn't be numbered. The tool will skip those pages and start numbering from your chosen page."
            }
        },
        {
            "@type": "Question",
            "name": "Is this page numbering tool really free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, this tool is Free Online Tool with no hidden costs, no watermarks, and no signup required. Your PDF is processed entirely in your browser, so it never leaves your device."
            }
        },
        {
            "@type": "Question",
            "name": "Can I customize the page number format?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! We offer 5 formats: simple numbers (1, 2, 3), with total (1 of 10), Page X, Page X of Y, and dashed (- 1 -). You can also adjust the font size from 8 to 24 points."
            }
        },
        {
            "@type": "Question",
            "name": "Where can I position the page numbers?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can place page numbers in 6 positions: bottom-center (most common), bottom-left, bottom-right, top-center, top-left, or top-right. Choose the position that works best for your document."
            }
        },
        {
            "@type": "Question",
            "name": "Can I add page numbers on my phone?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our tool works on iPhones, Android phones, and tablets. No app download needed - just open this page in your mobile browser and add page numbers with the same features as desktop."
            }
        },
        {
            "@type": "Question",
            "name": "Will adding page numbers affect my PDF quality?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Our tool adds page numbers without re-compressing or modifying the existing content. Text, images, and formatting remain exactly the same - only the page numbers are added."
            }
        },
        {
            "@type": "Question",
            "name": "How do I add page numbers to a PDF without Adobe Acrobat?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Use our free online tool! Adobe Acrobat Pro costs $239/year just for this feature. Our tool is completely free, works in your browser, and offers the same functionality - position selection, format options, and custom starting page."
            }
        }
    ]
};

const useCases = [
    { title: "Legal Documents", desc: "Add page numbers to contracts, agreements, and court filings for professional presentation." },
    { title: "Business Reports", desc: "Number your quarterly reports, proposals, and presentations for easy reference." },
    { title: "Academic Papers", desc: "Add page numbers to essays, theses, and dissertations per academic requirements." },
    { title: "Printed Manuals", desc: "Prepare instruction manuals and guides with clear page numbering for printing." },
    { title: "Meeting Minutes", desc: "Number multi-page meeting notes and agendas for organizational records." },
    { title: "Invoices & Statements", desc: "Add page numbers to long invoices and financial statements for accounting." },
];

const features = [
    { icon: Settings, title: "6 Position Options", desc: "Top or bottom, left/center/right placement" },
    { icon: Type, title: "5 Number Formats", desc: "Simple, Page X, Page X of Y, dashed, and more" },
    { icon: Hash, title: "Custom Start Page", desc: "Skip cover pages, start numbering from any page" },
    { icon: Shield, title: "Local Processing", desc: "Processed in your browser – nothing uploaded" },
    { icon: Zap, title: "Instant Results", desc: "Page numbers added in seconds" },
    { icon: Smartphone, title: "Works on Mobile", desc: "Full functionality on iPhone, Android, tablet" },
    { icon: CheckCircle, title: "No Watermarks", desc: "Clean output with no branding added" },
    { icon: FileText, title: "Any PDF Size", desc: "Works with documents of any length" },
];

const comparisonData = [
    { feature: "Price", us: "Free forever", competitors: "$8-20/month" },
    { feature: "Watermarks", us: "Never", competitors: "Often on free tier" },
    { feature: "Position Options", us: "6 positions", competitors: "Often limited" },
    { feature: "Number Formats", us: "5 formats", competitors: "1-2 formats" },
    { feature: "Custom Start Page", us: "Yes", competitors: "Premium only" },
    { feature: "File Upload", us: "None (local)", competitors: "Uploads to server" },
];

const relatedTools = [
    { href: "/convert/rotate-pdf", title: "Rotate PDF" },
    { href: "/convert/merge-pdf", title: "Merge PDF" },
    { href: "/convert/split-pdf", title: "Split PDF" },
    { href: "/convert/compress-pdf", title: "Compress PDF" },
    { href: "/convert-bank-statement-to-csv-excel", title: "Bank Statement to Excel" },
];

export default function AddPageNumbersPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Main Tool */}
            <section className="py-12 px-4">
                <AddPageNumbersTool />
            </section>

            {/* Trust Stats */}
            <section className="py-6 px-4 bg-[hsl(var(--primary))]/5 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-[hsl(var(--primary))]">9,800+</p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">PDFs Numbered Daily</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[hsl(var(--primary))]">6</p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">Position Options</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[hsl(var(--primary))]">0</p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">Processed Locally</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[hsl(var(--primary))]">4.8★</p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">User Rating</p>
                    </div>
                </div>
            </section>

            {/* How To Steps */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        How to Add Page Numbers in 4 Easy Steps
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { step: "1", title: "Upload PDF", desc: "Drag & drop or click to select your file" },
                            { step: "2", title: "Choose Position", desc: "Top or bottom, left/center/right" },
                            { step: "3", title: "Select Format", desc: "Pick from 5 numbering styles" },
                            { step: "4", title: "Download", desc: "Get your numbered PDF instantly" },
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary))] text-white text-xl font-bold flex items-center justify-center mx-auto mb-3">
                                    {item.step}
                                </div>
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">{item.title}</h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-12 px-4 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-8">
                        Common Use Cases for Adding Page Numbers
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {useCases.map((useCase, i) => (
                            <div key={i} className="p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">{useCase.title}</h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">{useCase.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Why Choose Our Free Page Numbering Tool?
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-10 max-w-2xl mx-auto">
                        More customization than paid tools. Everything runs locally in your browser.
                    </p>
                    <div className="grid md:grid-cols-4 gap-4">
                        {features.map((feature, i) => (
                            <div key={i} className="p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <feature.icon className="w-7 h-7 text-[hsl(var(--primary))] mb-3" />
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1 text-sm">{feature.title}</h3>
                                <p className="text-xs text-[hsl(var(--muted-foreground))]">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-16 px-4 bg-[hsl(var(--muted))]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Best Free PDF Page Numbering Tool (No Upload)
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Compare our free tool to Adobe Acrobat, Smallpdf, and iLovePDF
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]/10">
                                    <th className="text-left p-4 font-semibold">Feature</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--primary))]">Statement Extract</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--muted-foreground))]">Others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, i) => (
                                    <tr key={i} className="border-b border-[hsl(var(--border))]">
                                        <td className="p-4">{row.feature}</td>
                                        <td className="p-4 text-[hsl(var(--primary))] font-medium">{row.us}</td>
                                        <td className="p-4 text-[hsl(var(--muted-foreground))]">{row.competitors}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* SEO Content */}
            <section className="py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-4">
                            How to Add Page Numbers to PDF Free Online
                        </h2>
                        <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                            Need to number pages in a PDF document for printing or professional presentation? Our free tool makes it easy with customizable positions and formats.
                        </p>
                    </div>

                    {/* Why Add Page Numbers */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-6 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            Why Add Page Numbers to PDFs?
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <Printer className="w-5 h-5 text-[hsl(var(--muted-foreground))] shrink-0 mt-0.5" />
                                <p className="text-[hsl(var(--muted-foreground))]">Printed documents need page numbers for easy navigation and organization</p>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <FileStack className="w-5 h-5 text-[hsl(var(--muted-foreground))] shrink-0 mt-0.5" />
                                <p className="text-[hsl(var(--muted-foreground))]">Legal and business documents require numbered pages for reference</p>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <Mail className="w-5 h-5 text-[hsl(var(--muted-foreground))] shrink-0 mt-0.5" />
                                <p className="text-[hsl(var(--muted-foreground))]">Shared PDFs are easier to discuss when pages are numbered</p>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <Briefcase className="w-5 h-5 text-[hsl(var(--muted-foreground))] shrink-0 mt-0.5" />
                                <p className="text-[hsl(var(--muted-foreground))]">Professional presentations look more polished with page numbers</p>
                            </div>
                        </div>
                    </div>

                    {/* Position Options */}
                    <div className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                            6 Position Options for Page Numbers
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {["Top Left", "Top Center", "Top Right", "Bottom Left", "Bottom Center", "Bottom Right"].map((pos, i) => (
                                <div key={i} className="px-4 py-3 rounded-lg bg-white/50 dark:bg-black/20 text-center">
                                    <p className="font-medium text-[hsl(var(--foreground))]">{pos}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Format Options */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-6 text-center">
                            5 Number Format Options
                        </h3>
                        <div className="grid md:grid-cols-5 gap-3">
                            {[
                                { format: "1, 2, 3", label: "Simple" },
                                { format: "1 of 10", label: "With Total" },
                                { format: "Page 1", label: "Page X" },
                                { format: "Page 1 of 10", label: "Page X of Y" },
                                { format: "- 1 -", label: "Dashed" },
                            ].map((opt, i) => (
                                <div key={i} className="p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-center">
                                    <p className="font-bold text-[hsl(var(--primary))] mb-1">{opt.format}</p>
                                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{opt.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Device Support */}
                    <div className="mb-12 p-6 rounded-2xl bg-[hsl(var(--muted))]/50">
                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 text-center">
                            Works on Any Device
                        </h3>
                        <p className="text-center text-[hsl(var(--muted-foreground))] mb-6">
                            Add page numbers to PDFs from any device with a web browser.
                        </p>
                        <div className="flex justify-center gap-8 flex-wrap">
                            <div className="text-center">
                                <Smartphone className="w-8 h-8 text-[hsl(var(--muted-foreground))] mx-auto mb-1" />
                                <span className="text-xs text-[hsl(var(--muted-foreground))]">iPhone/iPad</span>
                            </div>
                            <div className="text-center">
                                <Tablet className="w-8 h-8 text-[hsl(var(--muted-foreground))] mx-auto mb-1" />
                                <span className="text-xs text-[hsl(var(--muted-foreground))]">Android</span>
                            </div>
                            <div className="text-center">
                                <Monitor className="w-8 h-8 text-[hsl(var(--muted-foreground))] mx-auto mb-1" />
                                <span className="text-xs text-[hsl(var(--muted-foreground))]">Windows/Mac</span>
                            </div>
                            <div className="text-center">
                                <Chrome className="w-8 h-8 text-[hsl(var(--muted-foreground))] mx-auto mb-1" />
                                <span className="text-xs text-[hsl(var(--muted-foreground))]">Any Browser</span>
                            </div>
                        </div>
                    </div>

                    {/* Free vs Paid */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-[hsl(var(--primary))]/10 to-emerald-500/10 border border-[hsl(var(--primary))]/20">
                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-emerald-500" />
                            Free vs Adobe Acrobat Pro
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))]">
                            Adobe Acrobat Pro costs <strong className="text-[hsl(var(--foreground))]">$239/year</strong> for page numbering and other features.
                            Our tool is <strong className="text-[hsl(var(--primary))]">completely free with no limits</strong> – more position options, more formats, and everything runs locally.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 px-4 bg-[hsl(var(--muted))]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqSchema.mainEntity.map((faq, i) => (
                            <details key={i} className="group p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <summary className="font-medium text-[hsl(var(--foreground))] cursor-pointer list-none flex items-center justify-between">
                                    {faq.name}
                                    <span className="text-[hsl(var(--muted-foreground))] group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-3 text-[hsl(var(--muted-foreground))]">
                                    {faq.acceptedAnswer.text}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-4">
                        Ready to Add Page Numbers?
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-6">
                        No signup required. Runs locally in your browser. Get instant results.
                    </p>
                    <a
                        href="#top"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity shadow-glow"
                    >
                        <Hash className="w-5 h-5" />
                        Add Page Numbers Now - It&apos;s Free
                    </a>
                </div>
            </section>

            <ToolPageFooter relatedTools={relatedTools} />
        </>
    );
}
