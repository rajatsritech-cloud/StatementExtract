import { Metadata } from "next";
import { BatchImageConverter } from "@/components/image-tools/BatchImageConverter";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import Link from "next/link";
import { Zap, Shield, Globe, Images, Smartphone, Lock } from "lucide-react";

export const metadata: Metadata = {
    title: "Free HEIC & AVIF Batch Converter Online | Convert iPhone Photos | Statement Extract",
    description: "Batch convert HEIC/HEIF iPhone photos and AVIF images to PNG or JPG. Free, client-side, no upload. Works on all devices. Convert multiple files at once.",
    keywords: "batch convert heic to jpg client side, free online avif to png no upload, heic to webp converter, convert iphone photos to png online, heic to jpg batch, heif converter, avif batch converter",
    openGraph: {
        title: "Free HEIC & AVIF Batch Converter Online",
        description: "Batch convert iPhone HEIC photos and AVIF images to PNG or JPG. 100% free and private.",
        type: "website",
        url: "https://statementextract.com/convert/batch-converter",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/batch-converter",
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "HEIC & AVIF Batch Converter",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "1890"
    }
};

const relatedTools = [
    { href: "/convert/avif-converter/avif-to-png", title: "AVIF to PNG" },
    { href: "/convert/avif-converter/avif-to-webp", title: "AVIF to WebP" },
    { href: "/convert/image-compressor", title: "Image Compressor" },
    { href: "/convert/json-to-toon", title: "JSON to TOON" },
];

export default function BatchConverterPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            {/* Tool Section */}
            <section className="py-12 md:py-20 px-6 border-b border-[hsl(var(--border))]">
                <BatchImageConverter
                    targetFormat="png"
                    title="HEIC & AVIF Batch Converter"
                    description="Batch convert iPhone HEIC photos and AVIF images to PNG. Select multiple files at once."
                />

                {/* Format Toggle */}
                <div className="max-w-3xl mx-auto mt-8 text-center">
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">Need JPG instead?</p>
                    <Link
                        href="/convert/batch-converter/heic-to-jpg"
                        className="text-[hsl(var(--primary))] hover:underline font-medium"
                    >
                        Use HEIC to JPG Converter →
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Batch Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Images, title: "Batch Processing", desc: "Convert dozens of files at once. No limits on quantity." },
                            { icon: Smartphone, title: "iPhone Photos Ready", desc: "Convert HEIC/HEIF from any iPhone or iPad instantly." },
                            { icon: Lock, title: "100% Private", desc: "Files never leave your device. All processing is client-side." },
                            { icon: Zap, title: "Lightning Fast", desc: "Uses your browser's native image processing for speed." },
                            { icon: Shield, title: "No Signup", desc: "No account needed. No email. Just convert and download." },
                            { icon: Globe, title: "Works Everywhere", desc: "Chrome, Firefox, Safari, Edge — any modern browser." },
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
                        How to Batch Convert HEIC & AVIF
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Select Multiple Files", desc: "Drag and drop or click to select multiple HEIC, AVIF, or other image files." },
                            { step: 2, title: "Click Convert", desc: "Press the convert button. Watch the progress as each file is processed." },
                            { step: 3, title: "Download All", desc: "Download converted files individually or all at once." },
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
                        Convert iPhone HEIC Photos to PNG or JPG Online
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>HEIC (High Efficiency Image Container)</strong> is Apple's default photo format on iPhone and iPad since iOS 11. While HEIC offers excellent compression and quality, it's not universally supported on Windows, older software, or many websites and social media platforms.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Our <strong>free HEIC batch converter</strong> solves this problem by converting your iPhone photos to universally compatible <strong>PNG or JPG</strong> format — directly in your browser with no upload required.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        What is AVIF?
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>AVIF (AV1 Image File Format)</strong> is a next-generation image format offering superior compression. However, like HEIC, it's not yet supported everywhere. Convert AVIF to PNG for maximum compatibility with legacy systems and platforms.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Privacy & Security
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))]">
                        Unlike other converters that upload your photos to remote servers, our tool processes everything <strong>100% client-side</strong> in your browser. Your photos <strong>never leave your device</strong>, making this the most secure way to convert sensitive images.
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
                            { q: "What is HEIC format?", a: "HEIC (High Efficiency Image Container) is Apple's default photo format on iPhone/iPad. It offers better compression than JPEG while maintaining quality, but isn't universally supported." },
                            { q: "Why can't I open HEIC files on Windows?", a: "Windows doesn't natively support HEIC. You need to install the HEIF Image Extensions from Microsoft Store, or convert to PNG/JPG using our free tool." },
                            { q: "Are my photos uploaded to a server?", a: "No! All conversion happens in your browser using JavaScript. Your photos never leave your device — this is the most private way to convert images." },
                            { q: "How many files can I convert at once?", a: "There's no hard limit. You can select and convert dozens of files in a single batch. Processing time depends on file sizes and your device's capabilities." },
                            { q: "Is this converter really free?", a: "Yes, completely free with no signup, no email, no limits. We make money from our paid document processing services, not image conversion." },
                            { q: "Which browsers support HEIC conversion?", a: "Modern versions of Chrome, Firefox, Safari, and Edge all support our converter. Safari on macOS may have native HEIC support already." },
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
                currentTool="HEIC & AVIF Batch Converter"
                relatedTools={relatedTools}
            />
        </main>
    );
}
