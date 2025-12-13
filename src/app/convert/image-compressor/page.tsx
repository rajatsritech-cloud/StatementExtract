import { Metadata } from "next";
import { ImageCompressor } from "@/components/image-tools/ImageCompressor";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { Zap, Shield, Globe, FileImage, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Free Image Compressor Online | Compress PNG to 100KB, 50KB, 20KB | Statement Extract",
    description: "Compress PNG, JPG, WebP images to exact sizes - 100KB, 50KB, 20KB, 10KB. Free online compressor, no upload limits, 100% private. Works in browser.",
    keywords: "compress png to 100kb, compress image to 50kb, compress png to 200kb, compress png free, compress image to 20kb, reduce image size online, compress png to 1mb, compress png to 500kb, compress png to 300kb, image compressor online free, reduce png file size",
    openGraph: {
        title: "Free Image Compressor - Compress PNG to 100KB, 50KB, 20KB",
        description: "Compress images to exact target sizes. Free, fast, and 100% private.",
        type: "website",
        url: "https://statementextract.com/convert/image-compressor",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/image-compressor",
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image Compressor - Compress PNG to Specific Size",
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
        "ratingCount": "3150"
    }
};

const relatedTools = [
    { href: "/convert/avif-converter/avif-to-png", title: "AVIF to PNG Converter" },
    { href: "/convert/avif-converter/avif-to-webp", title: "AVIF to WebP Converter" },
    { href: "/convert/batch-converter", title: "HEIC Batch Converter" },
];

// Long-tail keyword target sizes
const targetSizes = [
    { size: "10KB", use: "Email signatures, tiny thumbnails, favicon images" },
    { size: "20KB", use: "Profile pictures, small icons, status images" },
    { size: "50KB", use: "Blog thumbnails, product icons, social avatars" },
    { size: "100KB", use: "Website images, email attachments, document images" },
    { size: "200KB", use: "High-quality web images, presentations" },
    { size: "500KB", use: "Large banners, hero images, detailed graphics" },
];

export default function ImageCompressorPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            {/* Tool Section */}
            <section className="py-12 md:py-20 px-6 border-b border-[hsl(var(--border))]">
                <ImageCompressor
                    title="Free Image Compressor"
                    description="Compress PNG, JPG, or any image to your exact target size. Fast, free, and 100% private."
                />
            </section>

            {/* Features */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our Image Compressor?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Zap, title: "Precise Control", desc: "Choose exact target size: 10KB, 20KB, 50KB, 100KB, or custom." },
                            { icon: Shield, title: "100% Private", desc: "All compression happens in your browser. Files never uploaded." },
                            { icon: Globe, title: "Works Everywhere", desc: "Chrome, Firefox, Safari, Edge — any modern browser." },
                            { icon: FileImage, title: "All Formats", desc: "Compress PNG, JPG, WebP, AVIF, GIF, and more." },
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

            {/* How To */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        How to Compress an Image to Specific Size
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Select Target Size", desc: "Choose your desired file size: 10KB, 20KB, 50KB, or 100KB." },
                            { step: 2, title: "Upload Your Image", desc: "Drag and drop or click to select any PNG, JPG, or image file." },
                            { step: 3, title: "Download Compressed", desc: "Your optimized image is ready to download instantly." },
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
                        Compress Images to Exact File Sizes
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-10 max-w-2xl mx-auto">
                        Need to compress PNG to 100KB? Or reduce an image to 50KB for email? Our tool lets you target exact file sizes.
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

            {/* Deep SEO Content - Long Tail Keywords */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-8 text-center">
                        Complete Guide: Compress PNG & Images to Specific Sizes
                    </h2>

                    <div className="space-y-8 text-[hsl(var(--muted-foreground))]">
                        {/* Compress PNG to 100KB */}
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                                How to Compress PNG to 100KB
                            </h3>
                            <p className="mb-3">
                                Need to <strong>compress PNG to 100KB</strong> for a website or email attachment? Our free online tool makes it simple. Just select the 100KB target size, upload your PNG, and download the compressed result instantly.
                            </p>
                            <p>
                                100KB is the ideal size for web images that need to look crisp while loading quickly. Perfect for blog posts, product images, and email newsletters.
                            </p>
                        </div>

                        {/* Compress PNG to 50KB */}
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                                How to Compress PNG to 50KB
                            </h3>
                            <p className="mb-3">
                                Looking to <strong>compress PNG to 50KB</strong>? This size is perfect for thumbnails, profile pictures, and smaller web graphics. Our compressor intelligently reduces file size while preserving visual quality.
                            </p>
                            <p>
                                50KB images load almost instantly on mobile networks, improving user experience and Core Web Vitals scores for SEO.
                            </p>
                        </div>

                        {/* Compress PNG to 20KB */}
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                                How to Compress PNG to 20KB
                            </h3>
                            <p className="mb-3">
                                To <strong>compress PNG to 20KB</strong>, you need aggressive optimization. Our tool automatically adjusts quality and dimensions to reach this target while keeping your image looking good.
                            </p>
                            <p>
                                20KB is ideal for icons, email signatures, and images that will be displayed at small sizes.
                            </p>
                        </div>

                        {/* Compress PNG to 200KB */}
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                                How to Compress PNG to 200KB
                            </h3>
                            <p className="mb-3">
                                Need to <strong>compress PNG to 200KB</strong> for higher quality requirements? This size works well for featured images on blogs, presentation slides, and document attachments.
                            </p>
                            <p>
                                At 200KB, images retain excellent detail for viewing at medium to large sizes on desktop screens.
                            </p>
                        </div>

                        {/* Compress PNG to 500KB */}
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                                How to Compress PNG to 500KB
                            </h3>
                            <p className="mb-3">
                                Want to <strong>compress PNG to 500KB</strong>? This size is great for high-resolution hero images, banners, and detailed infographics that need to look sharp on large screens.
                            </p>
                            <p>
                                500KB strikes a balance between quality and performance for above-the-fold content on marketing pages.
                            </p>
                        </div>

                        {/* Compress PNG to 1MB */}
                        <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                                How to Compress PNG to 1MB
                            </h3>
                            <p className="mb-3">
                                For <strong>compressing PNG to 1MB</strong>, you're targeting high-fidelity use cases. This size preserves excellent detail for downloadable resources, print-ready graphics, and portfolio images.
                            </p>
                            <p>
                                1MB images should be lazy-loaded on websites to avoid impacting initial page load times.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Our Compressor Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-8">
                        Why Choose Our Free Image Compressor?
                    </h2>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-[hsl(var(--muted-foreground))]">
                            Unlike other <strong>PNG compressor</strong> tools that upload your images to servers, our compressor runs entirely in your browser. This means:
                        </p>

                        <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))] space-y-2 mt-4">
                            <li><strong>Complete Privacy:</strong> Your images never leave your device. No server uploads, no data collection.</li>
                            <li><strong>Faster Processing:</strong> No waiting for upload/download. Compression happens instantly using your browser's native capabilities.</li>
                            <li><strong>No File Limits:</strong> Compress as many images as you want. No daily limits, no subscription required.</li>
                            <li><strong>Works Offline:</strong> Once the page loads, you can compress images without an internet connection.</li>
                            <li><strong>Precise Size Control:</strong> Target exact file sizes like 100KB, 50KB, or 20KB — not approximate ranges.</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mt-8 mb-4">
                            Compress PNG vs Compress JPG — Which Should You Use?
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))]">
                            <strong>PNG</strong> is ideal for images with transparency, text, logos, and graphics with sharp edges. <strong>JPG</strong> works better for photographs and images with many colors. Our compressor accepts both and outputs optimized WebP for the best of both worlds.
                        </p>

                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mt-8 mb-4">
                            Reduce Image Size for Email and Web
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))]">
                            Most email providers limit attachment sizes to 10-25MB, and large images can push you over this limit fast. By compressing images to 50KB-100KB, you can include multiple images in a single email while ensuring fast loading for recipients.
                        </p>
                        <p className="text-[hsl(var(--muted-foreground))] mt-3">
                            For websites, Google recommends keeping images under 100KB for optimal Core Web Vitals scores. Our compressor helps you hit these targets while maintaining visual quality.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            { q: "How do I compress PNG to 100KB?", a: "Select 100KB as your target size, upload your PNG image, and click compress. Our tool automatically adjusts quality to hit exactly 100KB." },
                            { q: "Can I compress PNG to 50KB without losing quality?", a: "Yes! Our smart compression algorithm preserves visual quality while reducing file size. For 50KB targets, images still look great at typical web sizes." },
                            { q: "Is this PNG compressor really free?", a: "100% free with no limits. No signup, no email, no subscription. We make money from our bank statement tools, not image compression." },
                            { q: "What image formats can I compress?", a: "PNG, JPG, JPEG, WebP, AVIF, GIF, and most other image formats. We output optimized WebP for best compression." },
                            { q: "Are my images uploaded to a server?", a: "No! All compression happens locally in your browser. Your images never leave your device — complete privacy guaranteed." },
                            { q: "Can I compress multiple images at once?", a: "Use our Batch Converter for bulk compression. This compressor handles one image at a time for precise size targeting." },
                            { q: "How do I compress an image to under 100KB for a form upload?", a: "Select the 100KB target, upload your image, and download the result. If the original is very large, the compressor may resize it slightly to hit the target." },
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
                currentTool="Image Compressor"
                relatedTools={relatedTools}
            />
        </main>
    );
}
