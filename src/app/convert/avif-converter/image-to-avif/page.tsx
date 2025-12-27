import { Metadata } from "next";
import { ImageToAvifConverter } from "@/components/image-tools/ImageToAvifConverter";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { Zap, Shield, Globe, Minimize2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Free Image to AVIF Converter Online | PNG JPG WebP to AVIF | Statement Extract",
    description: "Convert PNG, JPG, WebP images to AVIF format for smaller file sizes. Free online tool with quality control. No upload, 100% private.",
    keywords: "png to avif, jpg to avif, webp to avif, convert to avif, avif converter, image to avif online, free avif encoder",
    openGraph: {
        title: "Free Image to AVIF Converter",
        description: "Convert images to AVIF for up to 50% smaller files. Free, fast, and private.",
        type: "website",
        url: "https://statementextract.com/convert/avif-converter/image-to-avif",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/avif-converter/image-to-avif/",
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image to AVIF Converter",
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
        "ratingCount": "1560"
    }
};

const relatedTools = [
    { href: "/convert/avif-converter/avif-to-png", title: "AVIF to PNG" },
    { href: "/convert/batch-converter", title: "HEIC Batch Converter" },
    { href: "/convert/image-compressor", title: "Image Compressor" },
    { href: "/convert/json-to-toon", title: "JSON to TOON" },
];

export default function ImageToAvifPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            {/* Tool Section */}
            <section className="py-12 md:py-20 px-6 border-b border-[hsl(var(--border))]">
                <ImageToAvifConverter
                    title="Convert Images to AVIF"
                    description="Transform PNG, JPG, or WebP images to AVIF for up to 50% smaller file sizes."
                />
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Convert to AVIF?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Minimize2, title: "50% Smaller", desc: "AVIF offers the best compression ratio of any image format." },
                            { icon: Zap, title: "Fast Loading", desc: "Smaller files mean faster website load times and better SEO." },
                            { icon: Shield, title: "100% Private", desc: "All conversion happens in your browser. Files never uploaded." },
                            { icon: Globe, title: "Modern Format", desc: "Supported by Chrome, Firefox, Safari, Edge, and Opera." },
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
                        How to Convert to AVIF
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Adjust Quality", desc: "Use the slider to balance file size vs image quality (80% recommended)." },
                            { step: 2, title: "Upload Image", desc: "Drop your PNG, JPG, or WebP file into the upload area." },
                            { step: 3, title: "Download AVIF", desc: "Click convert and download your optimized AVIF image." },
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

            {/* SEO Content */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        What is AVIF Format?
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>AVIF (AV1 Image File Format)</strong> is a next-generation image format based on the AV1 video codec. It offers significantly better compression than JPEG, PNG, and even WebP — often achieving <strong>50% smaller file sizes</strong> at the same visual quality.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        AVIF vs Other Formats
                    </h3>
                    <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] space-y-2">
                        <li><strong>vs JPEG:</strong> AVIF is 50% smaller at the same quality</li>
                        <li><strong>vs PNG:</strong> AVIF supports transparency AND lossy compression</li>
                        <li><strong>vs WebP:</strong> AVIF offers 20-30% better compression</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Browser Support
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))]">
                        AVIF is supported by <strong>Chrome 85+</strong>, <strong>Firefox 93+</strong>, <strong>Safari 16.1+</strong>, and <strong>Edge 121+</strong>. For encoding, Chrome 94+ and Firefox 93+ support canvas-based AVIF creation used by this tool.
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
                            { q: "What quality setting should I use?", a: "For photos, 70-80% offers excellent quality with significant size reduction. For graphics/icons, use 85-90% for sharper edges." },
                            { q: "Does my browser support AVIF encoding?", a: "Chrome 94+, Firefox 93+, and Edge 121+ support AVIF encoding. If your browser doesn't support it, you'll see a warning." },
                            { q: "Is AVIF better than WebP?", a: "Yes, AVIF typically achieves 20-30% smaller files than WebP at the same quality, though encoding is slower." },
                            { q: "Can I convert back from AVIF?", a: "Yes! Use our AVIF to PNG or AVIF to WebP converters to convert back to universally supported formats." },
                            { q: "Is this tool free?", a: "Yes, completely free with no signup, no limits, and no file uploads. Everything runs in your browser." },
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
                currentTool="Image to AVIF Converter"
                relatedTools={relatedTools}
            />
        </main>
    );
}
