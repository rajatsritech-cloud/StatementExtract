import { Metadata } from "next";
import { JsonToToonConverter } from "@/components/tools/JsonToToonConverter";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { Zap, Shield, Code2, DollarSign, Clock, Brain } from "lucide-react";

export const metadata: Metadata = {
    title: "Free JSON to TOON Converter Online | Reduce LLM Tokens by 60% | Statement Extract",
    description: "Convert JSON to TOON (Token-Oriented Object Notation) for up to 60% fewer LLM tokens. Free online tool. Save money on OpenAI, Claude, and GPT API calls.",
    keywords: "json to toon, toon converter, reduce llm tokens, token efficient json, llm optimization, gpt token saver, openai token reduction, json compression for ai",
    openGraph: {
        title: "JSON to TOON Converter - Save 60% on LLM Tokens",
        description: "Convert JSON to Token-Oriented Object Notation. Free, fast, no signup.",
        type: "website",
        url: "https://statementextract.com/convert/json-to-toon"
    },
    alternates: {
        canonical: "https://statementextract.com/convert/json-to-toon/"
    }
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JSON to TOON Converter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

const relatedTools = [
    { href: "/convert/batch-converter", title: "HEIC Batch Converter" },
    { href: "/convert/avif-converter/image-to-avif", title: "Image to AVIF" },
    { href: "/convert/image-compressor", title: "Image Compressor" },
];

export default function JsonToToonPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            {/* Tool Section */}
            <section className="py-12 md:py-20 px-6 border-b border-[hsl(var(--border))]">
                <JsonToToonConverter />
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use TOON for LLMs?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: DollarSign, title: "Save Money", desc: "Reduce API costs by 30-60% by using fewer tokens per request." },
                            { icon: Zap, title: "Faster Responses", desc: "Fewer tokens = faster processing time from GPT, Claude, and other LLMs." },
                            { icon: Brain, title: "LLM Optimized", desc: "TOON is designed for machine readability while staying human-friendly." },
                            { icon: Shield, title: "100% Private", desc: "Conversion happens in your browser. Nothing is sent to any server." },
                            { icon: Clock, title: "Real-time", desc: "See TOON output instantly as you type or paste JSON." },
                            { icon: Code2, title: "Developer Friendly", desc: "Copy with one click. Perfect for prompt engineering workflows." },
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

            {/* TOON Explanation */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        What is TOON Format?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                        <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                            <h3 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                                <span className="text-lg">❌</span> JSON (Verbose)
                            </h3>
                            <pre className="text-xs bg-[hsl(var(--muted))]/50 p-4 rounded-xl overflow-x-auto font-mono">
                                {`{
  "users": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
}`}
                            </pre>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-3">~45 tokens</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
                            <h3 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                                <span className="text-lg">✓</span> TOON (Compact)
                            </h3>
                            <pre className="text-xs bg-[hsl(var(--muted))]/50 p-4 rounded-xl overflow-x-auto font-mono">
                                {`users[2]{id,name}:
  1,Alice
  2,Bob`}
                            </pre>
                            <p className="text-sm text-green-600 mt-3 font-medium">~18 tokens (60% savings!)</p>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-4">How TOON Works:</h3>
                        <ul className="space-y-3 text-[hsl(var(--muted-foreground))]">
                            <li className="flex items-start gap-3">
                                <span className="text-[hsl(var(--primary))] font-bold">1.</span>
                                <span><strong>No curly braces or brackets</strong> - Uses indentation instead</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[hsl(var(--primary))] font-bold">2.</span>
                                <span><strong>Tabular arrays</strong> - Keys declared once, values as CSV rows</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[hsl(var(--primary))] font-bold">3.</span>
                                <span><strong>No repeated keys</strong> - Eliminates redundancy in arrays</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[hsl(var(--primary))] font-bold">4.</span>
                                <span><strong>Minimal quotes</strong> - Only when necessary for special characters</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Perfect For
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: "Prompt Engineering", desc: "Include structured data in prompts without burning through tokens." },
                            { title: "API Response Parsing", desc: "Ask LLMs to return data in TOON format for cheaper structured outputs." },
                            { title: "Fine-tuning Datasets", desc: "Use TOON in training data to reduce dataset token counts." },
                            { title: "Agent Workflows", desc: "Pass context between agents more efficiently with TOON encoding." },
                        ].map((item, i) => (
                            <div key={i} className="p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{item.title}</h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
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
                            { q: "What is TOON?", a: "TOON (Token-Oriented Object Notation) is a data format designed to minimize token usage when sending structured data to LLMs like GPT-4, Claude, or Gemini." },
                            { q: "How much can I save?", a: "For flat, tabular data (arrays of objects), you can save 30-60% on tokens. Deeply nested objects may see smaller savings or even slight increases." },
                            { q: "Can LLMs understand TOON?", a: "Yes! Modern LLMs easily parse TOON format. You can also include a brief format explanation in your system prompt for best results." },
                            { q: "Is my data safe?", a: "Absolutely. All conversion happens in your browser using JavaScript. No data is ever sent to any server." },
                            { q: "When should I NOT use TOON?", a: "Avoid TOON for deeply nested hierarchies. It works best for flat data like user lists, product catalogs, API responses, and tabular datasets." },
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
                currentTool="JSON to TOON Converter"
                relatedTools={relatedTools}
            />
        </main>
    );
}
