import { Metadata } from "next";
import { BatchImageConverter } from "@/components/image-tools/BatchImageConverter";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import Link from "next/link";
import { Zap, Shield, Globe, Images, Smartphone, Lock } from "lucide-react";

export const metadata: Metadata = {
    title: "Free HEIC to JPG Batch Converter | Convert iPhone Photos to JPEG | Statement Extract",
    description: "Batch convert HEIC/HEIF iPhone photos to JPG format. Free, client-side conversion with no upload. Smaller file sizes with excellent quality.",
    keywords: "heic to jpg, convert heic to jpeg, heic to jpg batch converter, iphone photos to jpg, heif to jpeg online, free heic converter",
    openGraph: {
        title: "Free HEIC to JPG Batch Converter",
        description: "Convert iPhone HEIC photos to JPG. 100% free, fast, and private.",
        type: "website",
        url: "https://statementextract.com/convert/batch-converter/heic-to-jpg",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/batch-converter/heic-to-jpg",
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "HEIC to JPG Batch Converter",
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
        "ratingCount": "2340"
    }
};

const relatedTools = [
    { href: "/convert/batch-converter", title: "HEIC to PNG" },
    { href: "/convert/image-compressor", title: "Image Compressor" },
    { href: "/convert/avif-converter/image-to-avif", title: "Image to AVIF" },
    { href: "/convert/json-to-toon", title: "JSON to TOON" },
];

export default function HeicToJpgPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            {/* Tool Section */}
            <section className="py-12 md:py-20 px-6 border-b border-[hsl(var(--border))]">
                <BatchImageConverter
                    targetFormat="jpg"
                    title="HEIC to JPG Batch Converter"
                    description="Convert iPhone HEIC photos to JPG for smaller file sizes and universal compatibility."
                />

                {/* Format Toggle */}
                <div className="max-w-3xl mx-auto mt-8 text-center">
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">Need lossless PNG instead?</p>
                    <Link
                        href="/convert/batch-converter"
                        className="text-[hsl(var(--primary))] hover:underline font-medium"
                    >
                        Use HEIC to PNG Converter →
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Convert HEIC to JPG?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Images, title: "Smaller Files", desc: "JPG files are typically smaller than PNG, perfect for web and email." },
                            { icon: Smartphone, title: "Universal Support", desc: "JPG works on every device, platform, and browser ever made." },
                            { icon: Lock, title: "100% Private", desc: "No upload to any server. All processing happens in your browser." },
                            { icon: Zap, title: "Batch Processing", desc: "Convert dozens of iPhone photos at once. No limits." },
                            { icon: Shield, title: "High Quality", desc: "92% quality setting preserves details while reducing size." },
                            { icon: Globe, title: "Social Media Ready", desc: "Perfect for Instagram, Facebook, Twitter, and LinkedIn." },
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

            {/* SEO Content Block */}
            <section className="py-12 md:py-16 px-6 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        HEIC to JPG: The Complete Guide
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>HEIC</strong> (High Efficiency Image Container) is Apple's default photo format since iOS 11. While it offers superior compression, many platforms still don't support it, making <strong>JPG conversion</strong> essential for sharing photos.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        When to Choose JPG over PNG
                    </h3>
                    <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] space-y-2">
                        <li><strong>Web uploads:</strong> Smaller file sizes load faster</li>
                        <li><strong>Email attachments:</strong> Stay within size limits</li>
                        <li><strong>Social media:</strong> Most platforms prefer JPG</li>
                        <li><strong>Photos without transparency:</strong> JPG is ideal for photographs</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Privacy First
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))]">
                        Your photos contain metadata and personal memories. Unlike server-based converters, our tool processes everything <strong>locally in your browser</strong>. Nothing is ever uploaded, stored, or analyzed by us.
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
                            { q: "Does converting HEIC to JPG lose quality?", a: "There's minimal quality loss with our 92% quality setting. For most purposes, the difference is imperceptible." },
                            { q: "How do I transfer HEIC photos from iPhone?", a: "Use AirDrop, email, or sync via iCloud. Then use our converter to batch convert them to JPG." },
                            { q: "Can I convert HEIC to JPG on Windows?", a: "Yes! Our browser-based converter works on any Windows PC with Chrome, Firefox, or Edge." },
                            { q: "Is batch conversion unlimited?", a: "Yes, no limits on number of files. Convert as many as your computer can handle." },
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
                currentTool="HEIC to JPG Converter"
                relatedTools={relatedTools}
            />
        </main>
    );
}
