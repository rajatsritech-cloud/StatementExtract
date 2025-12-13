import Link from "next/link";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { RecentBlogs } from "@/components/RecentBlogs";
import { LazyInView } from "@/components/LazyInView";

interface ToolPageFooterProps {
    currentTool?: string;
    relatedTools?: { href: string; title: string }[];
}

export function ToolPageFooter({ currentTool, relatedTools }: ToolPageFooterProps) {
    return (
        <>
            {/* Document Extraction CTA */}
            <section className="py-12 md:py-16 px-6 bg-gradient-to-br from-[hsl(var(--primary))]/5 via-[hsl(var(--background))] to-[hsl(var(--primary))]/10 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        Our Flagship Product
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-4">
                        Need to Extract Data from Bank Statements?
                    </h2>

                    <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto mb-8">
                        Convert PDF bank statements to Excel/CSV with AI-powered accuracy.
                        Works with any bank format, extracts transactions, balances, and account details automatically.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/convert-bank-statement-to-csv-excel"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[hsl(var(--primary))] text-white font-medium hover:opacity-90 transition-opacity"
                        >
                            <FileText className="w-5 h-5" />
                            Bank Statement to Excel/CSV
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/convert-bank-statement-to-quickbooks-tally"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] font-medium hover:border-[hsl(var(--primary))]/50 transition-colors"
                        >
                            QuickBooks & Tally Export
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Related Tools */}
            {relatedTools && relatedTools.length > 0 && (
                <section className="py-12 md:py-16 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-8">More Free Tools</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {relatedTools.map((tool, i) => (
                                <Link
                                    key={i}
                                    href={tool.href}
                                    className="px-6 py-3 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] transition-colors flex items-center gap-2"
                                >
                                    {tool.title}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            ))}
                            <Link
                                href="/convert"
                                className="px-6 py-3 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] transition-colors flex items-center gap-2"
                            >
                                All Free Tools
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Latest Blog Posts - Lazy loaded when visible */}
            <LazyInView rootMargin="300px 0px">
                <RecentBlogs />
            </LazyInView>
        </>
    );
}
