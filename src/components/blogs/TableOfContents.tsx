"use client";

import { useEffect, useState } from "react";

interface Heading {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Pre-selection Logic:
        // 1. If there's a hash in the URL, use that.
        // 2. Otherwise, default to the first heading.
        const hash = window.location.hash.substring(1);
        if (hash) {
            setActiveId(hash);
        } else if (headings.length > 0) {
            setActiveId(headings[0].id);
        }

        const callback = (entries: IntersectionObserverEntry[]) => {
            const visibleEntry = entries.find((entry) => entry.isIntersecting);
            if (visibleEntry) {
                setActiveId(visibleEntry.target.id);
            }
        };

        const observer = new IntersectionObserver(callback, {
            // 'rootMargin' tweaks how early the intersection is detected.
            // -100px so it doesn't trigger until the header is well past.
            rootMargin: "-100px 0px -40% 0px",
            threshold: 0,
        });

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        // ADDED 'self-start' here. This is CRITICAL for sticky positioning in CSS Grid.
        // Without it, the aside stretches to the full height of the parent grid cell,
        // leaving no room to "stick" (scroll).
        <aside className="hidden lg:block lg:sticky lg:top-28 mb-10 w-64 self-start">
            <div className="relative">
                <h2 className="mb-4 text-sm font-bold tracking-wide text-[hsl(var(--foreground))] uppercase flex items-center gap-2">
                    <span>Table of Contents</span>
                </h2>

                <div className="max-h-[calc(100vh-12rem)] overflow-y-auto pr-4 scrollbar-hide border-r border-[hsl(var(--border))]/50" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <nav aria-label="Table of contents" className="relative">
                        <ul className="space-y-0.5 border-l border-[hsl(var(--border))]">
                            {headings.map((heading) => {
                                const isActive = activeId === heading.id;
                                return (
                                    <li key={heading.id} className="relative">
                                        <a
                                            href={`#${heading.id}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById(heading.id)?.scrollIntoView({
                                                    behavior: "smooth",
                                                });
                                                setActiveId(heading.id);
                                                window.history.pushState(null, "", `#${heading.id}`);
                                            }}
                                            className={`
                      block pl-4 py-1.5 text-sm transition-all duration-200 border-l-2 -ml-[1px]
                      ${isActive
                                                    ? "border-[hsl(var(--primary))] text-[hsl(var(--primary))] font-semibold bg-[hsl(var(--primary))]/5"
                                                    : "border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:border-[hsl(var(--muted-foreground))]/50"
                                                }
                    `}
                                        >
                                            {heading.text}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
                {/* Global style to hide scrollbar for Webkit */}
                <style jsx global>{`
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
            </div>
        </aside>
    );
}
