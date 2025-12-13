import { Metadata } from "next";
import Link from "next/link";
import { FileImage, Minimize2, ArrowRight, Zap, Shield, Globe, Images, Code2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Free Online Developer Tools | Image Converters & JSON Tools | Statement Extract",
    description: "Free online tools: JSON to TOON converter, HEIC batch converter, AVIF converter, image compressor. No signup, no limits, 100% private.",
    keywords: "free developer tools, json to toon, image converter, image compressor, AVIF converter, HEIC converter, llm token optimization",
    openGraph: {
        title: "Free Online Developer Tools",
        description: "Convert images and optimize data for free. No signup required.",
        type: "website",
        url: "https://statementextract.com/convert",
    },
    alternates: {
        canonical: "https://statementextract.com/convert",
    },
};

const tools = [
    {
        title: "JSON to TOON Converter",
        description: "Convert JSON to Token-Oriented Object Notation. Save 60% on LLM tokens.",
        href: "/convert/json-to-toon",
        icon: Code2,
        badge: "Hot",
    },
    {
        title: "HEIC & AVIF Batch Converter",
        description: "Batch convert iPhone HEIC photos and AVIF images to PNG or JPG.",
        href: "/convert/batch-converter",
        icon: Images,
        badge: "New",
    },
    {
        title: "Image to AVIF Converter",
        description: "Convert PNG, JPG, WebP to AVIF for up to 50% smaller files.",
        href: "/convert/avif-converter/image-to-avif",
        icon: FileImage,
        badge: "New",
    },
    {
        title: "AVIF to PNG Converter",
        description: "Convert AVIF images to universally compatible PNG format.",
        href: "/convert/avif-converter/avif-to-png",
        icon: FileImage,
        badge: "Popular",
    },
    {
        title: "AVIF to WebP Converter",
        description: "Convert AVIF to WebP for smaller files with great quality.",
        href: "/convert/avif-converter/avif-to-webp",
        icon: FileImage,
        badge: null,
    },
    {
        title: "Image Compressor",
        description: "Compress images to exact sizes: 10KB, 20KB, 50KB, or 100KB.",
        href: "/convert/image-compressor",
        icon: Minimize2,
        badge: null,
    },
];


export default function ConvertHubPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            {/* Hero with Grid Background */}
            <section className="relative py-16 md:py-24 px-6 text-center border-b border-[hsl(var(--border))] overflow-hidden">
                {/* Grid SVG Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-[hsl(var(--border))]" strokeOpacity="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                    </svg>
                    {/* Gradient fade at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[hsl(var(--background))] to-transparent" />
                    {/* Decorative floating blocks */}
                    <div className="absolute top-12 left-[10%] w-16 h-16 rounded-xl bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/10 rotate-12" />
                    <div className="absolute top-24 right-[15%] w-12 h-12 rounded-lg bg-[hsl(var(--primary))]/8 border border-[hsl(var(--primary))]/15 -rotate-6" />
                    <div className="absolute bottom-16 left-[20%] w-10 h-10 rounded-lg bg-[hsl(var(--primary))]/6 border border-[hsl(var(--primary))]/10 rotate-45" />
                    <div className="absolute bottom-20 right-[25%] w-14 h-14 rounded-xl bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/8 -rotate-12" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))] mb-4">
                        Free Online Image Tools
                    </h1>
                    <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                        Convert and compress images instantly. No signup, no limits, 100% private — everything runs in your browser.
                    </p>
                </div>
            </section>

            {/* Tools Grid with subtle background */}
            <section className="relative py-12 md:py-16 px-6">
                {/* Subtle dot pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="dots-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
                                <circle cx="2" cy="2" r="1" fill="currentColor" className="text-[hsl(var(--muted-foreground))]" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dots-pattern)" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tools.map((tool, i) => (
                            <Link
                                key={i}
                                href={tool.href}
                                className="group p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] hover:shadow-lg transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 rounded-xl bg-[hsl(var(--primary))]/10">
                                        <tool.icon className="w-6 h-6 text-[hsl(var(--primary))]" />
                                    </div>
                                    {tool.badge && (
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-[hsl(var(--primary))] text-white">
                                            {tool.badge}
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">
                                    {tool.title}
                                </h2>
                                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                                    {tool.description}
                                </p>
                                <div className="flex items-center text-sm text-[hsl(var(--primary))] font-medium">
                                    Try it free
                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="relative py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                {/* Grid background */}
                <div className="absolute inset-0 pointer-events-none opacity-40">
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="features-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-[hsl(var(--border))]" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#features-grid)" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Choose Our Tools?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Zap, title: "Lightning Fast", desc: "All processing happens instantly in your browser. No waiting for server uploads." },
                            { icon: Shield, title: "100% Private", desc: "Your files never leave your device. We don't store or see any of your images." },
                            { icon: Globe, title: "Works Anywhere", desc: "Use on any device with a modern browser. No installation required." },
                        ].map((feature, i) => (
                            <div key={i} className="text-center">
                                <div className="mx-auto w-14 h-14 rounded-2xl bg-[hsl(var(--primary))]/10 flex items-center justify-center mb-4">
                                    <feature.icon className="w-7 h-7 text-[hsl(var(--primary))]" />
                                </div>
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{feature.title}</h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">
                        Need to Convert Bank Statements?
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-6">
                        Check out our flagship tool — the AI-powered Bank Statement to Excel/CSV converter.
                    </p>
                    <Link
                        href="/convert-bank-statement-to-csv-excel"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[hsl(var(--primary))] text-white font-medium hover:opacity-90 transition-opacity"
                    >
                        Bank Statement Converter
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
