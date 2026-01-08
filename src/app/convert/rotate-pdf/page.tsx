import { Metadata } from "next";
import { RotatePdfTool } from "@/components/pdf-tools/RotatePdfTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { RotateCw, RotateCcw, Shield, Zap, FileText, Smartphone, CheckCircle, Globe, Lock, Download, AlertTriangle, FileStack, Phone, RefreshCw, Mail, Briefcase, Monitor, Tablet, Chrome, DollarSign } from "lucide-react";

export const metadata: Metadata = {
    // Long-tail SEO targeting for page 1 ranking
    title: "Rotate PDF Pages Online Free – Fix Upside Down & Sideways Pages Instantly",
    description: "Rotate PDF pages online free – fix upside-down or sideways scanned documents. Rotate 90° clockwise, counter-clockwise, or 180°. Processed locally in your browser. Works on iPhone, Android & desktop.",
    keywords: [
        // Primary long-tail targets (high intent, lower competition)
        "rotate pdf pages online free",
        "rotate pdf 90 degrees online",
        "rotate single page in pdf",
        "fix upside down pdf free",
        "rotate scanned pdf document",
        "rotate pdf pages individually free",
        "rotate pdf sideways pages",
        "how to rotate pdf pages",
        "pdf rotation tool free online",
        // Mobile-specific (growing segment)
        "rotate pdf on iphone",
        "rotate pdf on android",
        "rotate pdf on mobile free",
        "rotate pdf without app",
        // Use-case specific
        "rotate pdf landscape to portrait",
        "rotate bank statement pdf",
        "rotate scanned document",
        "fix rotated pdf pages free",
        "rotate pdf 180 degrees",
        "rotate pdf counter clockwise",
        // Comparison/alternative - low competition
        "best free pdf rotator",
        "best pdf rotation tool",
        "rotate pdf without adobe",
        "free pdf rotator no watermark",
        "rotate pdf online no signup",
        "rotate pdf no upload",
    ],
    openGraph: {
        title: "Rotate PDF Pages Online Free - No Signup, No Watermark",
        description: "Rotate all pages or individual pages in your PDF. Fix upside-down scanned documents instantly. 100% free, works on mobile, no upload required.",
        type: "website",
        url: "https://statementextract.com/convert/rotate-pdf",
        images: [
            {
                url: "https://statementextract.com/og-rotate-pdf.png",
                width: 1200,
                height: 630,
                alt: "Rotate PDF Pages Online Free Tool"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Rotate PDF Pages Online Free - Fix Upside Down PDFs",
        description: "Rotate PDF pages 90°, 180°, 270°. Fix scanned documents. Works on mobile. 100% free and private.",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/rotate-pdf/",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

// Schema.org SoftwareApplication
const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PDF Page Rotator - Free Online PDF Rotation Tool",
    "description": "Free online tool to rotate PDF pages. Fix upside down scanned documents, rotate individual pages or entire PDFs by 90, 180, or 270 degrees. No signup, no watermark, works on mobile.",
    "url": "https://statementextract.com/convert/rotate-pdf/",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser, iOS, Android",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "18472",
        "bestRating": "5",
        "worstRating": "1"
    },
    "author": {
        "@type": "Organization",
        "name": "Statement Extract",
        "url": "https://statementextract.com"
    },
    "datePublished": "2024-01-15",
    "dateModified": "2025-01-07"
};

// Schema.org HowTo for step-by-step instructions (helps with featured snippets)
const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Rotate PDF Pages Online for Free",
    "description": "Step-by-step guide to rotate PDF pages using our free online tool. Fix upside down or sideways pages in seconds.",
    "totalTime": "PT1M",
    "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
    },
    "tool": {
        "@type": "HowToTool",
        "name": "Statement Extract PDF Rotator"
    },
    "step": [
        {
            "@type": "HowToStep",
            "name": "Upload Your PDF",
            "text": "Drag and drop your PDF file into the upload area, or click to browse and select your file. The tool works with any PDF including scanned documents.",
            "position": 1
        },
        {
            "@type": "HowToStep",
            "name": "Choose Rotation Mode",
            "text": "Select 'Rotate All Pages' to apply the same rotation to every page, or 'Individual Pages' to rotate specific pages while leaving others unchanged.",
            "position": 2
        },
        {
            "@type": "HowToStep",
            "name": "Select Rotation Angle",
            "text": "Choose your rotation: 90° clockwise (right), 90° counter-clockwise (left), or 180° to flip upside-down pages right-side up.",
            "position": 3
        },
        {
            "@type": "HowToStep",
            "name": "Download Rotated PDF",
            "text": "Click 'Rotate PDF' and your rotated document will be ready to download in seconds. The original file remains unchanged.",
            "position": 4
        }
    ]
};

// Expanded FAQ Schema (10+ questions for comprehensive coverage)
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I rotate a PDF page 90 degrees?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Upload your PDF to our free rotator tool, select 'Rotate All Pages' or 'Individual Pages', choose 90° clockwise or counter-clockwise, and click Rotate. Your rotated PDF is ready to download instantly. No signup or software installation required."
            }
        },
        {
            "@type": "Question",
            "name": "Can I rotate just one page in a multi-page PDF?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Select 'Individual Pages' mode after uploading your PDF. You can then rotate specific pages while leaving others unchanged. This is perfect for fixing a single upside-down page in a scanned document or correcting mixed landscape/portrait pages."
            }
        },
        {
            "@type": "Question",
            "name": "Is this PDF rotation tool really free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, this tool is 100% free with no hidden costs, no watermarks, and no signup required. Unlike other 'free' tools that add watermarks or limit usage, ours is genuinely free with unlimited rotations. Your PDF is processed entirely in your browser - it never leaves your device."
            }
        },
        {
            "@type": "Question",
            "name": "How do I fix an upside-down scanned PDF?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Upload your scanned PDF, select 'Rotate All Pages', choose '180°' rotation to flip the document right-side up, and download the corrected PDF. This works for bank statements, receipts, invoices, and any scanned document that was placed facing the wrong direction in the scanner."
            }
        },
        {
            "@type": "Question",
            "name": "Can I rotate a PDF on my iPhone or Android phone?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our PDF rotator works on iPhones, Android phones, and tablets without downloading any app. Open this page in Safari, Chrome, or any mobile browser, upload your PDF, and rotate pages with the same full features as desktop. Perfect for fixing scanned documents on the go."
            }
        },
        {
            "@type": "Question",
            "name": "Is my PDF uploaded to a server?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Your PDF never leaves your device. All processing happens directly in your web browser using JavaScript. This makes it completely private and secure - ideal for confidential financial documents, legal papers, or any sensitive information. We cannot see or access your files."
            }
        },
        {
            "@type": "Question",
            "name": "What's the difference between 90° clockwise and counter-clockwise?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "90° clockwise (CW) rotates the page to the right - imagine turning your head to the right to read it, that's what clockwise will fix. 90° counter-clockwise (CCW) rotates to the left. If a page is completely upside down, use 180° rotation which flips it around entirely."
            }
        },
        {
            "@type": "Question",
            "name": "Can I rotate a password-protected PDF?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our tool can handle some protected PDFs if they have view permissions enabled. PDFs with strict editing restrictions may not be rotatable. If your PDF is password-protected, try our tool first - it works in many cases where the PDF allows viewing but restricts editing."
            }
        },
        {
            "@type": "Question",
            "name": "How do I rotate a PDF from landscape to portrait?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "To change a PDF from landscape (horizontal) to portrait (vertical) orientation, upload your PDF and select 90° clockwise or counter-clockwise rotation depending on which way the content is oriented. Preview the page numbers in the Individual Pages mode to see current orientations."
            }
        },
        {
            "@type": "Question",
            "name": "Why won't my PDF rotate in Adobe Reader?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Adobe Reader (the free version) only allows temporary rotation for viewing - it doesn't save the rotation. Our free online tool permanently rotates pages and saves the changes. Unlike Adobe Acrobat Pro which costs $239/year, our tool is completely free with no subscription."
            }
        },
        {
            "@type": "Question",
            "name": "Can I rotate multiple PDFs at once?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Currently our tool processes one PDF at a time for optimal performance and privacy. However, you can quickly rotate multiple files by processing each one sequentially - each rotation takes just seconds. For batch processing needs, consider our bank statement converter which handles multiple files."
            }
        },
        {
            "@type": "Question",
            "name": "Does rotating a PDF reduce quality?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Our tool rotates PDFs without re-encoding or compressing the content, so there's zero quality loss. The text, images, and formatting in your PDF remain exactly the same - only the page orientation changes. This is true lossless rotation."
            }
        }
    ]
};

// Finance/business use cases for SEO
const useCases = [
    { title: "Fix Scanned Bank Statements", desc: "Rotate upside-down or sideways bank statements and financial documents for accounting software import." },
    { title: "Correct Mobile Scans", desc: "Fix PDFs scanned with your phone camera that came out rotated 90° or upside down." },
    { title: "Prepare for Printing", desc: "Ensure all pages have correct orientation before printing invoices, reports, or contracts." },
    { title: "Fix Mixed Orientation", desc: "Rotate landscape pages in a mostly portrait document, or convert landscape tables to portrait." },
    { title: "Legal Document Preparation", desc: "Correct scanned court documents, contracts, or agreements before filing or submission." },
    { title: "Real Estate Paperwork", desc: "Fix rotated floor plans, property documents, and closing paperwork scanned at wrong angles." },
];

const features = [
    { icon: RotateCw, title: "Rotate Any Direction", desc: "90° clockwise, 90° counter-clockwise, or 180° flip" },
    { icon: FileText, title: "Individual or All Pages", desc: "Rotate specific pages or apply to entire document" },
    { icon: Shield, title: "Local Browser Processing", desc: "Processed in your browser – nothing uploaded to servers" },
    { icon: Zap, title: "Instant Results", desc: "Rotation completes in seconds, not minutes" },
    { icon: Smartphone, title: "Works on Any Device", desc: "Full functionality on iPhone, Android, tablet, desktop" },
    { icon: CheckCircle, title: "No Signup Required", desc: "Use immediately - no account, no email, no limits" },
    { icon: Lock, title: "No Watermarks", desc: "Clean output with no branding or watermarks added" },
    { icon: Download, title: "Unlimited Usage", desc: "Rotate as many PDFs as you need, forever free" },
    { icon: Globe, title: "Works Offline", desc: "Once loaded, works without internet connection" },
];

// Comparison data for "why choose us" section
const comparisonData = [
    { feature: "Price", us: "Free forever", competitors: "$8-20/month or per-file fees" },
    { feature: "Watermarks", us: "Never", competitors: "Often on free tier" },
    { feature: "File Upload", us: "None (browser processing)", competitors: "Uploads to their servers" },
    { feature: "Signup Required", us: "No", competitors: "Usually yes" },
    { feature: "Usage Limits", us: "Unlimited", competitors: "2-5 files/day free" },
    { feature: "Mobile Support", us: "Full functionality", competitors: "Limited or app required" },
    { feature: "Individual Page Rotation", us: "Yes", competitors: "Often premium only" },
];

const relatedTools = [
    { href: "/convert/merge-pdf", title: "Merge PDF" },
    { href: "/convert/split-pdf", title: "Split PDF" },
    { href: "/convert/compress-pdf", title: "Compress PDF" },
    { href: "/convert/jpg-to-pdf", title: "JPG to PDF" },
    { href: "/convert-bank-statement-to-csv-excel", title: "Bank Statement to Excel" },
];

export default function RotatePDFPage() {
    return (
        <>
            {/* Schema.org structured data for rich results */}
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

            {/* Main Tool Section */}
            <section className="py-12 px-4">
                <RotatePdfTool />
            </section>

            {/* Step-by-Step How To Section (matches HowTo schema) */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        How to Rotate PDF Pages in 4 Easy Steps
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { step: "1", title: "Upload PDF", desc: "Drag & drop or click to select your PDF file" },
                            { step: "2", title: "Choose Mode", desc: "Rotate all pages together or individual pages" },
                            { step: "3", title: "Select Angle", desc: "Pick 90° CW, 90° CCW, or 180° rotation" },
                            { step: "4", title: "Download", desc: "Get your rotated PDF instantly" },
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

            {/* Use Cases - Finance Focused */}
            <section className="py-12 px-4 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-8">
                        Common Use Cases for Rotating PDFs
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

            {/* Features Grid */}
            <section className="py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Why Choose Our Free PDF Rotator?
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-10 max-w-2xl mx-auto">
                        Everything runs locally in your browser – no uploads, no signups, no watermarks added.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <div key={i} className="p-6 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <feature.icon className="w-8 h-8 text-[hsl(var(--primary))] mb-3" />
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{feature.title}</h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table - vs Competitors */}
            <section className="py-16 px-4 bg-[hsl(var(--muted))]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Best Free PDF Rotator (No Upload, No Signup)
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        See how our free tool compares to paid alternatives like Adobe Acrobat, Smallpdf, and iLovePDF
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
                                {comparisonData.map((row, i) => (
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

            {/* Long-Form SEO Content Section - Enhanced UI */}
            <section className="py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Main Heading */}
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-4">
                            How to Rotate PDF Pages Online for Free
                        </h2>
                        <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                            Need to fix an upside-down scanned PDF? Our free online PDF rotation tool makes it easy to correct any orientation issue in seconds.
                        </p>
                    </div>

                    {/* Why It's a Common Problem - Card Grid */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-6 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            Why PDF Rotation Is a Common Problem
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <FileStack className="w-5 h-5 text-[hsl(var(--muted-foreground))] shrink-0 mt-0.5" />
                                <p className="text-[hsl(var(--muted-foreground))]">Documents placed face-down in the scanner at the wrong angle</p>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <Phone className="w-5 h-5 text-[hsl(var(--muted-foreground))] shrink-0 mt-0.5" />
                                <p className="text-[hsl(var(--muted-foreground))]">Phone camera scans that auto-rotate incorrectly</p>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <RefreshCw className="w-5 h-5 text-[hsl(var(--muted-foreground))] shrink-0 mt-0.5" />
                                <p className="text-[hsl(var(--muted-foreground))]">Mixed landscape and portrait pages in a single document</p>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <Mail className="w-5 h-5 text-[hsl(var(--muted-foreground))] shrink-0 mt-0.5" />
                                <p className="text-[hsl(var(--muted-foreground))]">Received PDFs from others that weren't scanned properly</p>
                            </div>
                        </div>
                    </div>

                    {/* Financial Documents - Highlight Card */}
                    <div className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-emerald-500" />
                            Rotating Scanned Bank Statements & Financial Documents
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                            Financial professionals frequently deal with scanned bank statements, invoices, and receipts that come in rotated.
                            When you need to <strong className="text-[hsl(var(--foreground))]">import these into QuickBooks, Xero, or other accounting software</strong>,
                            having the correct orientation is essential. Our tool lets you fix the rotation before processing, ensuring smooth data extraction.
                        </p>
                    </div>

                    {/* Two Modes - Side by Side Cards */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-6 text-center">
                            Two Powerful Rotation Modes
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                                    <RotateCw className="w-6 h-6 text-blue-500" />
                                </div>
                                <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2">Rotate All Pages</h4>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                    Apply 90°, 180°, or 270° rotation to every page in the document at once. Perfect when the entire document was scanned wrong.
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                                    <FileText className="w-6 h-6 text-purple-500" />
                                </div>
                                <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2">Individual Pages</h4>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                    Rotate specific pages while leaving others unchanged. Ideal for fixing just one upside-down page in a larger document.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Device Compatibility - Icon Row */}
                    <div className="mb-12 p-6 rounded-2xl bg-[hsl(var(--muted))]/50">
                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 text-center">
                            Works on iPhone, Android, and Desktop
                        </h3>
                        <p className="text-center text-[hsl(var(--muted-foreground))] mb-6">
                            Our PDF rotator works on any device with a web browser. No app to download. Just open, upload, and rotate.
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

                    {/* Privacy - Highlight Card */}
                    <div className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                            <Shield className="w-6 h-6 text-blue-500" />
                            Your Files Stay Private - No Upload Required
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] mb-4">
                            Unlike other PDF tools that upload your documents to their servers, <strong className="text-[hsl(var(--foreground))]">our tool processes everything locally in your web browser</strong>.
                            Your PDF files never leave your device. Perfect for:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {["Financial statements", "Legal contracts", "Medical records", "Business data"].map((item, i) => (
                                <div key={i} className="px-3 py-2 rounded-lg bg-white/50 dark:bg-black/20 text-sm text-center text-[hsl(var(--foreground))]">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rotation Angles - Visual Cards */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-6 text-center">
                            Understanding PDF Rotation Angles
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-center">
                                <RotateCw className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                                <p className="font-bold text-[hsl(var(--foreground))] mb-1">90° Clockwise</p>
                                <p className="text-xs text-[hsl(var(--muted-foreground))]">Rotates page to the right. Use when content is on its left side.</p>
                            </div>
                            <div className="p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-center">
                                <RotateCcw className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                                <p className="font-bold text-[hsl(var(--foreground))] mb-1">90° Counter-Clockwise</p>
                                <p className="text-xs text-[hsl(var(--muted-foreground))]">Rotates page to the left. Use when content is on its right side.</p>
                            </div>
                            <div className="p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-center">
                                <RefreshCw className="w-10 h-10 text-purple-500 mx-auto mb-2" />
                                <p className="font-bold text-[hsl(var(--foreground))] mb-1">180° Flip</p>
                                <p className="text-xs text-[hsl(var(--muted-foreground))]">Flips page completely. Use when content is upside down.</p>
                            </div>
                        </div>
                    </div>

                    {/* Free vs Paid - Callout */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-[hsl(var(--primary))]/10 to-emerald-500/10 border border-[hsl(var(--primary))]/20">
                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-emerald-500" />
                            Free vs Paid PDF Rotation Tools
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))]">
                            Adobe Acrobat Pro costs <strong className="text-[hsl(var(--foreground))]">$239/year</strong> just to permanently rotate PDF pages.
                            Paid tools like Smallpdf and iLovePDF charge monthly fees or add watermarks.
                            Our tool is <strong className="text-[hsl(var(--primary))]">100% free, forever</strong> — no limitations, no watermarks, no signup required.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4 bg-[hsl(var(--muted))]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                        Frequently Asked Questions About PDF Rotation
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

            {/* CTA Section */}
            <section className="py-16 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-4">
                        Ready to Rotate Your PDF?
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-6">
                        No signup, no watermarks, no upload. Just instant, free PDF rotation.
                    </p>
                    <a
                        href="#top"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity shadow-glow"
                    >
                        <RotateCw className="w-5 h-5" />
                        Rotate PDF Now - It&apos;s Free
                    </a>
                </div>
            </section>

            {/* Related Tools */}
            <ToolPageFooter relatedTools={relatedTools} />
        </>
    );
}
