"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryFilterProps {
    categories: string[];
    onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, onCategoryChange }: CategoryFilterProps) {
    const [activeCategory, setActiveCategory] = useState("All");
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const allCategories = ["All", ...categories];

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        onCategoryChange(category);

        // Scroll to section if not "All"
        if (category !== "All") {
            const sectionId = category.toLowerCase().replace(/[&\s]+/g, "-").replace(/--+/g, "-");
            const element = document.getElementById(sectionId);
            if (element) {
                const headerOffset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

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
    }, []);

    const scroll = (direction: "left" | "right") => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollBy({
                left: direction === "left" ? -200 : 200,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="py-8 px-4 md:px-6 bg-[hsl(var(--background))]">
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
                    {allCategories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap
                                ${activeCategory === category
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
    );
}
