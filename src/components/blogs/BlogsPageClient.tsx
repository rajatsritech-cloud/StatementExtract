"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPostMeta } from "@/lib/blogs";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

interface BlogsPageClientProps {
    posts: BlogPostMeta[];
}

export function BlogsPageClient({ posts }: BlogsPageClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Simplified Category Logic
    const categories = useMemo(() => {
        const topCategories = ["Automation", "Guides", "Tools", "Analysis", "News"];
        return ["All", ...topCategories];
    }, []);

    // Filter posts
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            if (selectedCategory === "All") return true;
            return post.tags.some(tag =>
                tag.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                selectedCategory.toLowerCase().includes(tag.toLowerCase())
            );
        });
    }, [posts, selectedCategory]);

    // Scroll Logic
    const checkScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 10);
            setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", checkScroll);
            window.addEventListener("resize", checkScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener("scroll", checkScroll);
            }
            window.removeEventListener("resize", checkScroll);
        };
    }, [categories]);

    const scroll = (direction: "left" | "right") => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollBy({
                left: direction === "left" ? -200 : 200,
                behavior: "smooth"
            });
        }
    };

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            {/* Hero Section */}
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
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[hsl(var(--background))] to-transparent" />

                    {/* Decorative Elements */}
                    <div className="absolute top-12 left-[10%] w-16 h-16 rounded-xl bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/10 rotate-12 animate-float-slow" />
                    <div className="absolute top-24 right-[15%] w-12 h-12 rounded-lg bg-[hsl(var(--primary))]/8 border border-[hsl(var(--primary))]/15 -rotate-6 animate-float-delayed" />
                    <div className="absolute bottom-16 left-[20%] w-10 h-10 rounded-lg bg-[hsl(var(--primary))]/6 border border-[hsl(var(--primary))]/10 rotate-45 animate-float" />
                    <div className="absolute bottom-20 right-[25%] w-14 h-14 rounded-xl bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/8 -rotate-12 animate-float-slow" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-4 py-1.5 backdrop-blur-sm">
                        <BookOpen className="h-4 w-4 text-[hsl(var(--primary))]" />
                        <span className="text-sm font-medium text-[hsl(var(--primary))]">
                            Blog & Insights
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))] mb-6 tracking-tight">
                        News, tutorials, and stories from the <span className="bg-gradient-primary bg-clip-text text-transparent">Statement Extract</span> team
                    </h1>
                    <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto leading-relaxed">
                        Stay up to date with best practices for document automation, release notes, and deep dives into how we power data extraction for world-class finance teams.
                    </p>
                </div>
            </section>

            {/* Sticky Category Bar - No Border */}
            <div className="sticky top-0 z-40 bg-[hsl(var(--background))]/80 backdrop-blur-md">
                <div className="py-8 px-4 md:px-6">
                    <div className="max-w-5xl mx-auto flex items-center justify-center gap-4">
                        {/* Left Scroll Arrow */}
                        <button
                            onClick={() => scroll("left")}
                            className={`flex-shrink-0 transition-opacity duration-200 ${canScrollLeft
                                ? "opacity-100 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                                : "opacity-30 cursor-default"
                                }`}
                            disabled={!canScrollLeft}
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Scrollable Categories */}
                        <div
                            ref={scrollContainerRef}
                            className="flex items-center gap-3 overflow-x-auto scroll-smooth"
                            style={{
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                            }}
                        >
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryClick(category)}
                                    className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap
                                        ${selectedCategory === category
                                            ? "bg-[hsl(var(--primary))] text-white"
                                            : "text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] hover:text-[hsl(var(--foreground))] hover:border-[hsl(var(--muted-foreground))]"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Right Scroll Arrow */}
                        <button
                            onClick={() => scroll("right")}
                            className={`flex-shrink-0 transition-opacity duration-200 ${canScrollRight
                                ? "opacity-100 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                                : "opacity-30 cursor-default"
                                }`}
                            disabled={!canScrollRight}
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Blog Posts Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 md:pb-16">
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(var(--muted))] mb-4">
                            <BookOpen className="w-8 h-8 text-[hsl(var(--muted-foreground))]" />
                        </div>
                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-2">No articles found</h3>
                        <p className="text-[hsl(var(--muted-foreground))]">
                            Try adjusting your category filter.
                        </p>
                        <button
                            onClick={() => setSelectedCategory("All")}
                            className="mt-6 text-[hsl(var(--primary))] hover:underline font-medium"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blogs/${post.slug}`}
                                className="group flex flex-col h-full bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] overflow-hidden transition-all duration-300 hover:border-[hsl(var(--primary))]/50 hover:shadow-lg hover:-translate-y-1"
                            >
                                {/* Image Container - edge to edge, full quality */}
                                <div className="aspect-[16/9] w-full relative bg-[hsl(var(--muted))] overflow-hidden">
                                    {post.coverImage ? (
                                        <>
                                            <Image
                                                src={post.coverImage}
                                                alt={post.title}
                                                fill
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            {/* AI-Generated Image Disclosure */}
                                            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white/80 text-[9px] px-1.5 py-0.5 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-2.5 w-2.5" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z" clipRule="evenodd" />
                                                </svg>
                                                <span>Illustration by Statement Extract</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))]">
                                            <BookOpen className="w-12 h-12 opacity-20" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 p-6 flex flex-col">
                                    {/* Tag - Full width, not truncated */}
                                    {post.tags[0] && (
                                        <div className="mb-3">
                                            <span className="inline-block text-xs font-semibold text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 px-2.5 py-1 rounded-full">
                                                {post.tags[0]}
                                            </span>
                                        </div>
                                    )}

                                    <h2 className="text-xl font-bold text-[hsl(var(--foreground))] mb-3 line-clamp-3 group-hover:text-[hsl(var(--primary))] transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-[hsl(var(--muted-foreground))] text-sm line-clamp-3 mb-6 flex-1">
                                        {post.summary}
                                    </p>

                                    {/* Footer: Date/Time and Read Link */}
                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-[hsl(var(--border))]/50">
                                        <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                                            <time dateTime={post.date}>{post.date}</time>
                                            <span>•</span>
                                            <span>{Math.ceil(post.summary.length / 200)} min read</span>
                                        </div>

                                        <div className="flex items-center text-sm font-medium text-[hsl(var(--primary))] group-hover:translate-x-1 transition-transform">
                                            Read <span className="hidden sm:inline ml-1">Article</span>
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
