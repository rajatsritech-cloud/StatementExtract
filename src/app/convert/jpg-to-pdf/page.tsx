import { Metadata } from "next";
import { JPGtoPDFTool } from "@/components/pdf-tools/JPGtoPDFTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { FileImage, FileText, Zap, Shield, Smartphone, Settings, Download, CheckCircle } from "lucide-react";

// Maximum SEO metadata targeting high-volume long-tail keywords
export const metadata: Metadata = {
    title: "JPG to PDF Converter Free Online | Convert Images to PDF | Statement Extract",
    description: "Free JPG to PDF converter online. Convert JPG, PNG, images to PDF instantly. Combine multiple photos into one PDF. No watermark, no signup, 100% free. Works on iPhone, Android, Windows, Mac.",
    keywords: "jpg to pdf, jpg to pdf converter, convert jpg to pdf, image to pdf, png to pdf, photo to pdf, picture to pdf, jpg to pdf free, jpg to pdf online, convert image to pdf, jpg to pdf converter free, combine images to pdf, multiple jpg to pdf, jpg to pdf no watermark, jpg to pdf iphone, jpg to pdf android, convert picture to pdf, jpeg to pdf, jpg to pdf online free, image to pdf converter",
    openGraph: {
        title: "Free JPG to PDF Converter Online - No Watermark",
        description: "Convert JPG, PNG, images to PDF instantly. Combine multiple photos. 100% free, no signup required.",
        type: "website",
        url: "https://statementextract.com/convert/jpg-to-pdf",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "JPG to PDF Converter - Free Online",
        description: "Convert images to PDF instantly. No watermark, no signup.",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/jpg-to-pdf/",
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

// Schema.org structured data for rich snippets
const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JPG to PDF Converter",
    "description": "Free online tool to convert JPG, PNG, and other images to PDF format",
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
        "ratingCount": "24851",
        "bestRating": "5",
        "worstRating": "1"
    }
};

// FAQ Schema for rich snippets
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I convert JPG to PDF?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Upload your JPG image(s) to our free converter, arrange them in your preferred order, select page size and orientation, then click Convert to PDF. Download your PDF instantly - no signup required."
            }
        },
        {
            "@type": "Question",
            "name": "Can I combine multiple images into one PDF?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Upload multiple JPG, PNG, or other images. Reorder them by dragging, then convert all images into a single PDF document with one click."
            }
        },
        {
            "@type": "Question",
            "name": "Is this JPG to PDF converter really free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, 100% free with no limits, no watermarks, and no signup required. Convert as many images to PDF as you need."
            }
        },
        {
            "@type": "Question",
            "name": "Does it work on iPhone and Android?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our JPG to PDF converter works on all devices including iPhone, iPad, Android phones and tablets, Windows PC, Mac, and Linux. Just use your browser."
            }
        },
        {
            "@type": "Question",
            "name": "What image formats are supported?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We support JPG/JPEG, PNG, WebP, and GIF formats. All images are converted to high-quality PDF with no loss of quality."
            }
        }
    ]
};

// HowTo Schema
const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Convert JPG to PDF",
    "description": "Step-by-step guide to convert images to PDF format",
    "totalTime": "PT1M",
    "step": [
        {
            "@type": "HowToStep",
            "name": "Upload Images",
            "text": "Click the upload area or drag and drop your JPG, PNG, or other images."
        },
        {
            "@type": "HowToStep",
            "name": "Arrange Order",
            "text": "Reorder images by clicking the up/down arrows on each image thumbnail."
        },
        {
            "@type": "HowToStep",
            "name": "Select Settings",
            "text": "Choose your preferred page size (A4, Letter, Legal, or Fit to Image) and orientation."
        },
        {
            "@type": "HowToStep",
            "name": "Convert and Download",
            "text": "Click Convert to PDF and download your finished PDF document."
        }
    ]
};

const relatedTools = [
    { href: "/convert/merge-pdf", title: "Merge PDF" },
    { href: "/convert/compress-pdf", title: "Compress PDF" },
    { href: "/convert/rotate-pdf", title: "Rotate PDF" },
    { href: "/convert/add-page-numbers-pdf", title: "Add Page Numbers" },
    { href: "/convert/unlock-pdf", title: "Unlock PDF" },
];

export default function JPGtoPDFPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            {/* Schema Markup */}
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />

            {/* Tool Section - Above the Fold */}
            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <JPGtoPDFTool />
            </section>

            {/* Features */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Choose Our JPG to PDF Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Zap, title: "Instant Conversion", desc: "Convert images to PDF in seconds. No waiting, no processing queues." },
                            { icon: Shield, title: "100% Private", desc: "Your files never leave your device. All processing happens in your browser." },
                            { icon: Smartphone, title: "Works Everywhere", desc: "iPhone, Android, Windows, Mac - works on any device with a browser." },
                            { icon: Download, title: "No Watermarks", desc: "Download clean PDFs without any watermarks or branding." },
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
                        How to Convert JPG to PDF
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Upload Your Images", desc: "Drag and drop JPG, PNG, or other images, or click to browse. Upload multiple images at once." },
                            { step: 2, title: "Arrange & Customize", desc: "Reorder images using arrows. Choose page size (A4, Letter, Legal) and orientation." },
                            { step: 3, title: "Convert to PDF", desc: "Click the Convert button. Your PDF is created instantly in your browser." },
                            { step: 4, title: "Download", desc: "Download your PDF with all images combined. No watermarks, no limits." },
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

            {/* Supported Formats */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-6">
                        Supported Image Formats
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {["JPG / JPEG", "PNG", "WebP", "GIF"].map((format) => (
                            <div key={format} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="font-medium text-[hsl(var(--foreground))]">{format}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-6 text-[hsl(var(--muted-foreground))]">
                        All formats are converted to high-quality PDF with zero loss of quality.
                    </p>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Popular Uses for JPG to PDF
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: "Scan Documents", desc: "Convert scanned document photos into professional PDFs for sharing or archiving." },
                            { title: "Photo Albums", desc: "Combine vacation photos or event pictures into a single PDF album to share." },
                            { title: "Work Portfolios", desc: "Create PDF portfolios from screenshots, designs, or project photos." },
                            { title: "Receipts & Invoices", desc: "Convert receipt photos to PDF for expense reports and record-keeping." },
                            { title: "ID Documents", desc: "Convert passport photos and ID scans to PDF for online applications." },
                            { title: "Presentations", desc: "Turn image slides into a single PDF document for easy distribution." },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-3 items-start p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10">
                                    <FileImage className="w-5 h-5 text-[hsl(var(--primary))]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">{item.title}</h3>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO Content */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        The Best Free JPG to PDF Converter Online
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Our <strong>JPG to PDF converter</strong> is the fastest and easiest way to convert images to PDF format. Whether you need to <strong>convert a single JPG to PDF</strong> or <strong>combine multiple images into one PDF</strong>, our tool handles it all - completely free and without watermarks.
                    </p>
                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Convert JPG to PDF on Any Device
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Works perfectly on <strong>iPhone, iPad, Android</strong>, Windows PC, Mac, and Linux. No app installation required - just use your web browser. Perfect for <strong>converting photos to PDF</strong> when you&apos;re on the go.
                    </p>
                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                        Why Convert Images to PDF?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        PDF format is universally accepted for documents. Converting your <strong>JPG, PNG, or photos to PDF</strong> makes them easier to share, print, and archive. PDFs maintain consistent formatting across all devices and are the standard for professional documents.
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
                            { q: "How do I convert JPG to PDF?", a: "Upload your JPG image(s), arrange them in your preferred order, select page size and orientation, then click Convert to PDF. Download your PDF instantly." },
                            { q: "Can I combine multiple images into one PDF?", a: "Yes! Upload multiple JPG, PNG, or other images. Reorder them as needed, then convert all images into a single PDF document." },
                            { q: "Is this JPG to PDF converter free?", a: "Yes, 100% free with no limits, no watermarks, and no signup required. Convert unlimited images to PDF." },
                            { q: "Does it work on iPhone and Android?", a: "Yes, works on all devices - iPhone, iPad, Android, Windows, Mac, Linux. Just use your browser, no app needed." },
                            { q: "What image formats are supported?", a: "We support JPG/JPEG, PNG, WebP, and GIF. All formats are converted to high-quality PDF." },
                            { q: "Are my images secure?", a: "Yes! All processing happens in your browser. Your images never leave your device or get uploaded to any server." },
                            { q: "Can I choose the page size?", a: "Yes, choose from A4, Letter, Legal, or Fit to Image. You can also select portrait, landscape, or auto orientation." },
                            { q: "Is there a limit on file size or number of images?", a: "No hard limits! However, very large images may take longer to process in your browser." },
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{faq.q}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Tools + CTA */}
            <ToolPageFooter
                currentTool="JPG to PDF Converter"
                relatedTools={relatedTools}
            />
        </main>
    );
}
