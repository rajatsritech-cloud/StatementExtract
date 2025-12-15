import { Metadata } from "next";
import { ImageConverter } from "@/components/image-tools/ImageConverter";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { Zap, Shield, Globe, FileImage } from "lucide-react";

export const metadata: Metadata = {
    title: "Free AVIF to PNG Converter Online | No Upload Limit | Statement Extract",
    description: "Convert AVIF images to PNG format instantly. 100% free, client-side conversion with no file size limits. No signup required. Works on all devices.",
    keywords: "AVIF to PNG, convert AVIF to PNG, AVIF converter, free image converter, online AVIF converter, AVIF to PNG online",
    openGraph: {
        title: "Free AVIF to PNG Converter Online",
        description: "Convert AVIF images to PNG format instantly. 100% free, no signup required.",
        type: "website",
        url: "https://statementextract.com/convert/avif-converter/avif-to-png",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/avif-converter/avif-to-png",
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AVIF to PNG Converter",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1250"
    }
};

const relatedTools = [
    { href: "/convert/avif-converter/avif-to-webp", title: "AVIF to WebP" },
    { href: "/convert/avif-converter/image-to-avif", title: "Image to AVIF" },
    { href: "/convert/image-compressor", title: "Image Compressor" },
    { href: "/convert/json-to-toon", title: "JSON to TOON" },
];

export default function AvifToPngPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            {/* Schema.org */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            {/* Hero + Tool Section */}
            <section className="py-12 md:py-20 px-6 border-b border-[hsl(var(--border))]">
                <ImageConverter
                    targetFormat="png"
                    title="Free AVIF to PNG Converter"
                    description="Convert your AVIF images to PNG format instantly. 100% free, runs in your browser."
                />
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our AVIF to PNG Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Zap, title: "Instant Conversion", desc: "No waiting. Convert images in milliseconds using your browser." },
                            { icon: Shield, title: "100% Private", desc: "Files never leave your device. All processing happens locally." },
                            { icon: Globe, title: "Works Everywhere", desc: "Chrome, Firefox, Safari, Edge — any modern browser, any device." },
                            { icon: FileImage, title: "No Limits", desc: "Convert as many images as you want. No daily limits, no signup." },
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
                        How to Convert AVIF to PNG
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Upload Your AVIF Image", desc: "Drag and drop your .avif file into the upload area above, or click to browse." },
                            { step: 2, title: "Click Convert", desc: "Press the 'Convert to PNG' button. Conversion happens instantly in your browser." },
                            { step: 3, title: "Download Your PNG", desc: "Once converted, click 'Download PNG' to save the file to your device." },
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

            {/* SEO Content Block */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        What is AVIF and Why Convert to PNG?
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>AVIF (AV1 Image File Format)</strong> is a next-generation image format that offers superior compression compared to JPEG and PNG. However, not all software and platforms support AVIF yet. That's where our <strong>free AVIF to PNG converter</strong> comes in.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>PNG (Portable Network Graphics)</strong> is a widely-supported, lossless image format. It's ideal for images that require transparency, sharp edges, or when you need universal compatibility across all platforms, including social media, email clients, and older software.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        When Should You Convert AVIF to PNG?
                    </h3>
                    <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] space-y-2">
                        <li><strong>Social Media:</strong> Platforms like LinkedIn and older versions of Twitter may not display AVIF images correctly.</li>
                        <li><strong>Email Attachments:</strong> PNG is universally supported by all email clients.</li>
                        <li><strong>Print & Design:</strong> PNG's lossless quality makes it ideal for print-ready graphics.</li>
                        <li><strong>Legacy Software:</strong> Older image editors and operating systems may not support AVIF.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Is This Converter Free?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))]">
                        Yes! Our AVIF to PNG converter is <strong>completely free</strong> with no hidden fees, no signup required, and no file size limits. Your images are processed entirely in your browser, meaning they never leave your device — ensuring <strong>100% privacy</strong>.
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
                            { q: "Is this AVIF to PNG converter free?", a: "Yes, it's 100% free with no limits or signup required." },
                            { q: "Are my images uploaded to a server?", a: "No. All conversion happens in your browser. Your files never leave your device." },
                            { q: "What browsers support this tool?", a: "Chrome, Edge, Firefox, and Safari all support our converter." },
                            { q: "Can I convert multiple images at once?", a: "Yes! Use our Batch Converter tool for converting multiple images at once." },
                            { q: "Does conversion reduce image quality?", a: "No. PNG is a lossless format, so your image quality is fully preserved." },
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
                currentTool="AVIF to PNG Converter"
                relatedTools={relatedTools}
            />
        </main>
    );
}
