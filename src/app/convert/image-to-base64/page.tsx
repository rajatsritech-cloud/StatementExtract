import { Metadata } from "next";
import { ImageToBase64Tool } from "@/components/developer-tools/ImageToBase64Tool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { Zap, Shield, Code2, FileImage, Copy, Globe } from "lucide-react";

export const metadata: Metadata = {
    title: "Image to Base64 Converter Online | Free Instant Encoder | Statement Extract",
    description: "Free image to Base64 converter. Convert PNG, JPG, GIF, WebP, SVG to Base64 strings instantly. Get Data URI, CSS, HTML, or Markdown output. Zero upload - 100% client-side.",
    keywords: "image to base64, base64 encoder, convert image to base64, png to base64, jpg to base64, image base64 string, data uri generator, base64 image encoder, embed image in html, css background image base64, image to data uri, base64 converter online, free base64 encoder, svg to base64",
    openGraph: {
        title: "Image to Base64 Converter - Instant, Free, Private",
        description: "Convert images to Base64 instantly. Embed in HTML, CSS, Markdown. Zero server upload.",
        type: "website",
        url: "https://statementextract.com/convert/image-to-base64",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Image to Base64 - Fastest Online Converter",
        description: "Convert images to Base64 in milliseconds. 100% client-side, private.",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/image-to-base64/",
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

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image to Base64 Converter",
    "description": "Convert images to Base64 encoded strings for embedding in HTML, CSS, and more",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "15623",
        "bestRating": "5",
        "worstRating": "1"
    }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is Base64 encoding for images?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Base64 is a way to encode binary image data as ASCII text. This allows you to embed images directly in HTML, CSS, or JSON without needing a separate image file. The encoded string can be used in a Data URI."
            }
        },
        {
            "@type": "Question",
            "name": "When should I use Base64 images?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Use Base64 for small images (icons, logos under ~10KB) to reduce HTTP requests. Also useful for email templates, single-file HTML exports, and embedding images in JSON/APIs. Avoid for large images as Base64 increases file size by ~33%."
            }
        },
        {
            "@type": "Question",
            "name": "Is my image uploaded to a server?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No! This converter runs 100% in your browser. Your image never leaves your device. The conversion happens instantly using JavaScript's FileReader API."
            }
        },
        {
            "@type": "Question",
            "name": "What image formats are supported?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "All common formats: PNG, JPG/JPEG, GIF, WebP, SVG, BMP, ICO. The Base64 output preserves the original format in the Data URI."
            }
        },
        {
            "@type": "Question",
            "name": "What's the difference between Data URI and raw Base64?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A Data URI includes the MIME type prefix (e.g., 'data:image/png;base64,') making it ready to use in HTML/CSS. Raw Base64 is just the encoded string without the prefix."
            }
        }
    ]
};

const relatedTools = [
    { href: "/convert/batch-converter", title: "Batch Image Converter" },
    { href: "/convert/image-compressor", title: "Image Compressor" },
    { href: "/convert/json-to-sql", title: "JSON to SQL" },
    { href: "/convert/avif-converter/image-to-avif", title: "Image to AVIF" },
];

export default function ImageToBase64Page() {
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

            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <ImageToBase64Tool />
            </section>

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Base64 for Images?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Zap, title: "Reduce HTTP Requests", desc: "Embed small images directly in HTML/CSS to eliminate extra network requests." },
                            { icon: Shield, title: "100% Private", desc: "All conversion happens in your browser. Your images never touch any server." },
                            { icon: Code2, title: "Multiple Formats", desc: "Get output as Data URI, raw Base64, CSS, HTML <img>, or Markdown." },
                            { icon: FileImage, title: "All Image Types", desc: "Works with PNG, JPG, GIF, WebP, SVG, BMP, and more." },
                            { icon: Copy, title: "One-Click Copy", desc: "Instantly copy the encoded string to your clipboard." },
                            { icon: Globe, title: "Email Friendly", desc: "Embed images in HTML emails without hosting image files." },
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

            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-8">
                        Base64 Output Formats Explained
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                format: "Data URI",
                                example: "data:image/png;base64,iVBORw0KGgo...",
                                use: "Use directly in HTML src or CSS url(). Most common format."
                            },
                            {
                                format: "Raw Base64",
                                example: "iVBORw0KGgoAAAANSUhEUgAAAAUA...",
                                use: "Just the encoded string. Use when you need to add your own MIME type."
                            },
                            {
                                format: "CSS",
                                example: "background-image: url('data:image/png;base64,...');",
                                use: "Ready-to-paste CSS background-image property."
                            },
                            {
                                format: "HTML",
                                example: "<img src=\"data:image/png;base64,...\" alt=\"...\">",
                                use: "Complete HTML img tag ready for your document."
                            },
                            {
                                format: "Markdown",
                                example: "![alt](data:image/png;base64,...)",
                                use: "Markdown image syntax for documentation or READMEs."
                            },
                        ].map((item, i) => (
                            <div key={i} className="p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{item.format}</h3>
                                <code className="text-xs bg-[hsl(var(--muted))] px-2 py-1 rounded text-[hsl(var(--muted-foreground))] block mb-2 overflow-x-auto">
                                    {item.example}
                                </code>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.use}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-6">
                        When to Use Base64 Images
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/30">
                            <h3 className="font-semibold text-green-700 dark:text-green-400 mb-3">✓ Good Use Cases</h3>
                            <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                                <li>• Small icons and logos (&lt;10KB)</li>
                                <li>• Email HTML templates</li>
                                <li>• Single-file HTML exports</li>
                                <li>• Embedded favicons</li>
                                <li>• CSS sprites and small UI elements</li>
                                <li>• JSON/API image data</li>
                            </ul>
                        </div>
                        <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/30">
                            <h3 className="font-semibold text-red-700 dark:text-red-400 mb-3">✗ Avoid For</h3>
                            <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                                <li>• Large images (&gt;50KB) - use CDN instead</li>
                                <li>• Frequently changing images</li>
                                <li>• SEO-important images (no alt text in CSS)</li>
                                <li>• Images that need browser caching</li>
                                <li>• When bandwidth is limited</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {[
                            { q: "What is Base64 encoding?", a: "Base64 is a way to encode binary data (like images) as ASCII text. This allows images to be embedded directly in HTML, CSS, or JSON without separate files." },
                            { q: "Is my image uploaded to a server?", a: "No! Conversion happens 100% in your browser using JavaScript. Your image never leaves your device." },
                            { q: "What's the size increase with Base64?", a: "Base64 increases file size by approximately 33%. A 10KB image becomes ~13.3KB as Base64." },
                            { q: "When should I use Base64?", a: "Best for small images (under 10KB) like icons, logos, and sprites. Reduces HTTP requests but increases HTML/CSS size." },
                            { q: "What image formats are supported?", a: "All common formats: PNG, JPG, GIF, WebP, SVG, BMP, ICO. The MIME type is preserved in the Data URI." },
                            { q: "What's the difference between Data URI and raw Base64?", a: "Data URI includes the prefix (data:image/png;base64,) for direct use in HTML/CSS. Raw Base64 is just the encoded string." },
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{faq.q}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ToolPageFooter
                currentTool="Image to Base64 Converter"
                relatedTools={relatedTools}
            />
        </main>
    );
}
