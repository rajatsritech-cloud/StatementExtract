import { Metadata } from "next";
import { ImageConverter } from "@/components/image-tools/ImageConverter";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { Zap, Shield, Globe, FileImage } from "lucide-react";

export const metadata: Metadata = {
    title: "Free AVIF to WebP Converter Online | No Upload | Statement Extract",
    description: "Convert AVIF images to WebP format instantly. 100% free, client-side conversion with no file size limits. No signup, runs in your browser.",
    keywords: "AVIF to WebP, convert AVIF to WebP, AVIF converter, WebP converter, free image converter, online AVIF converter",
    openGraph: {
        title: "Free AVIF to WebP Converter Online",
        description: "Convert AVIF images to WebP format instantly. 100% free, no signup required.",
        type: "website",
        url: "https://statementextract.com/convert/avif-converter/avif-to-webp",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/avif-converter/avif-to-webp",
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AVIF to WebP Converter",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "ratingCount": "980"
    }
};

const relatedTools = [
    { href: "/convert/avif-converter/avif-to-png", title: "AVIF to PNG" },
    { href: "/convert/avif-converter/image-to-avif", title: "Image to AVIF" },
    { href: "/convert/image-compressor", title: "Image Compressor" },
    { href: "/convert/json-to-toon", title: "JSON to TOON" },
];

export default function AvifToWebpPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            {/* Hero + Tool Section */}
            <section className="py-12 md:py-20 px-6 border-b border-[hsl(var(--border))]">
                <ImageConverter
                    targetFormat="webp"
                    title="Free AVIF to WebP Converter"
                    description="Convert your AVIF images to WebP format instantly. 100% free, runs in your browser."
                />
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our AVIF to WebP Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Zap, title: "Instant Conversion", desc: "No waiting. Convert images in milliseconds using your browser." },
                            { icon: Shield, title: "100% Private", desc: "Files never leave your device. All processing happens locally." },
                            { icon: Globe, title: "Wide Support", desc: "WebP is supported by all modern browsers and platforms." },
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
                        How to Convert AVIF to WebP
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Upload Your AVIF Image", desc: "Drag and drop your .avif file into the upload area above, or click to browse." },
                            { step: 2, title: "Click Convert", desc: "Press the 'Convert to WebP' button. Conversion happens instantly in your browser." },
                            { step: 3, title: "Download Your WebP", desc: "Once converted, click 'Download WebP' to save the file to your device." },
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
                        AVIF vs WebP: Which Format Should You Use?
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Both <strong>AVIF</strong> and <strong>WebP</strong> are modern image formats designed for the web. While AVIF offers slightly better compression in some cases, WebP has much broader support across browsers, email clients, and social media platforms.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>WebP</strong> is supported by Chrome, Firefox, Safari, Edge, and most modern platforms. It's the safest choice when you need wide compatibility while still benefiting from modern compression.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Benefits of WebP Format
                    </h3>
                    <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] space-y-2">
                        <li><strong>25-34% smaller</strong> than comparable JPEG images</li>
                        <li><strong>Supports transparency</strong> (like PNG) without large file sizes</li>
                        <li><strong>Lossy and lossless</strong> compression options</li>
                        <li><strong>Animation support</strong> (like GIF but smaller)</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Privacy & Security
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))]">
                        Your images are <strong>never uploaded</strong> to any server. All conversion happens entirely in your web browser using the Canvas API. This guarantees complete privacy for your files.
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
                            { q: "What is WebP format?", a: "WebP is a modern image format developed by Google that provides superior compression for images on the web." },
                            { q: "Is WebP better than AVIF?", a: "Both are excellent. AVIF can be slightly smaller but WebP has much broader platform support." },
                            { q: "Does this converter cost money?", a: "No! It's completely free with no limits." },
                            { q: "Will I lose image quality?", a: "WebP uses lossy compression by default, but quality loss is minimal and often imperceptible." },
                            { q: "Can I convert other formats to WebP?", a: "Yes! You can upload AVIF, PNG, JPEG, or any browser-supported image format." },
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
                currentTool="AVIF to WebP Converter"
                relatedTools={relatedTools}
            />
        </main>
    );
}
