import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blogs";
import { BookOpen, ArrowRight, Clock, Tag } from "lucide-react";

export async function RecentBlogs() {
    const allPosts = await getAllPosts();
    // Display top 6 articles on the homepage for deep content visibility
    const recentPosts = allPosts.slice(0, 6);

    if (recentPosts.length === 0) {
        return null;
    }

    return (
        <section 
            id="knowledge-hub" 
            aria-labelledby="knowledge-hub-heading" 
            className="relative bg-[hsl(var(--background))] py-16 md:py-24 overflow-hidden border-t border-[hsl(var(--border))]/50"
        >
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div 
                    className="absolute inset-0" 
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
                        backgroundSize: '32px 32px'
                    }} 
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-4 py-1.5 mb-4">
                            <BookOpen className="h-4 w-4 text-[hsl(var(--primary))]" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--primary))]">
                                Knowledge Hub & Technical Guides
                            </span>
                        </div>
                        <h2 id="knowledge-hub-heading" className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-4xl md:text-5xl">
                            Financial Document Guides & Insights
                        </h2>
                        <p className="mt-3 text-base text-[hsl(var(--muted-foreground))]">
                            Authoritative technical tutorials on bank statement parsing, automated reconciliation, and accounting software integration.
                        </p>
                    </div>

                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--primary))] hover:underline shrink-0 group"
                    >
                        Explore all {allPosts.length} articles
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* 6-Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recentPosts.map((post) => {
                        const estimatedReadTime = Math.max(5, Math.ceil(post.title.length / 8));
                        return (
                            <Link
                                key={post.slug}
                                href={`/blogs/${post.slug}`}
                                className="group flex flex-col justify-between rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[hsl(var(--primary))]/50 hover:shadow-lg"
                            >
                                <div className="w-full">
                                    <div className="aspect-[16/9] w-full bg-[hsl(var(--muted))] overflow-hidden relative">
                                        {post.coverImage ? (
                                            <Image
                                                src={post.coverImage}
                                                alt={post.title}
                                                fill
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-xs text-[hsl(var(--muted-foreground))]">
                                                Technical Guide
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))] mb-3">
                                            {post.tags[0] && (
                                                <span className="inline-flex items-center gap-1 rounded-md bg-[hsl(var(--primary))]/10 px-2.5 py-1 text-[11px] font-medium text-[hsl(var(--primary))]">
                                                    <Tag className="h-3 w-3" />
                                                    {post.tags[0]}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {estimatedReadTime} min read
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold leading-snug text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))] line-clamp-3">
                                            {post.summary}
                                        </p>
                                    </div>
                                </div>

                                <div className="px-6 pb-6 pt-2 border-t border-[hsl(var(--border))]/40 mt-auto flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="h-7 w-7 rounded-full overflow-hidden border border-[hsl(var(--primary))]/20 bg-[hsl(var(--primary))]/10 flex items-center justify-center shrink-0">
                                            <Image
                                                src="/favicon-32x32.png"
                                                alt="Statement Extract Team"
                                                width={16}
                                                height={16}
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="text-xs">
                                            <span className="font-semibold text-[hsl(var(--foreground))]">Editorial Team</span>
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium text-[hsl(var(--primary))] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                                        Read Guide →
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-8 py-3.5 text-sm font-semibold text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary))] transition-colors"
                    >
                        Browse Full Knowledge Base Library ({allPosts.length} Articles)
                        <ArrowRight className="h-4 w-4 text-[hsl(var(--primary))]" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
