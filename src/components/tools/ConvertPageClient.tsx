"use client";

import { useState, useMemo, ReactNode } from "react";
import Link from "next/link";
import {
    ArrowRight,
    FileSpreadsheet,
    FileImage,
    Minimize2,
    Images,
    Code2,
    Calculator,
    Receipt,
    Building2,
    FileText,
    TrendingUp,
    Layers,
    CreditCard,
    Wallet,
    Eye,
    LucideIcon
} from "lucide-react";
import { CategoryFilter } from "@/components/tools/CategoryFilter";

// Map icon names to actual icon components
const iconMap: Record<string, LucideIcon> = {
    FileSpreadsheet,
    FileImage,
    Minimize2,
    Images,
    Code2,
    Calculator,
    Receipt,
    Building2,
    FileText,
    TrendingUp,
    Layers,
    ArrowRight,
    CreditCard,
    Wallet,
    Eye,
};

interface Tool {
    title: string;
    description: string;
    href: string;
    icon: string;
    badge: string | null;
}

interface ToolSection {
    title: string;
    description: string;
    icon: string;
    featured: boolean;
    tools: Tool[];
}

interface ConvertPageClientProps {
    toolSections: ToolSection[];
    heroContent?: ReactNode;
}

export function ConvertPageClient({ toolSections, heroContent }: ConvertPageClientProps) {
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = useMemo(() =>
        toolSections.map(section => section.title),
        [toolSections]
    );

    const filteredSections = useMemo(() => {
        if (activeCategory === "All") return toolSections;
        return toolSections.filter(section => section.title === activeCategory);
    }, [activeCategory, toolSections]);

    const getSectionId = (title: string) => {
        return title.toLowerCase().replace(/[&\s]+/g, "-").replace(/--+/g, "-");
    };

    const getIcon = (iconName: string) => {
        return iconMap[iconName] || FileText;
    };

    return (
        <>
            {/* Hero Content - first */}
            {heroContent}

            {/* Category Filter - after hero, before tool sections */}
            <CategoryFilter
                categories={categories}
                onCategoryChange={setActiveCategory}
            />

            {/* Tool Sections */}
            {filteredSections.map((section, sectionIndex) => {
                const SectionIcon = getIcon(section.icon);

                return (
                    <section
                        key={sectionIndex}
                        id={getSectionId(section.title)}
                        className={`relative py-12 md:py-16 px-6 ${section.featured ? 'bg-[hsl(var(--muted))]/30' : ''} ${sectionIndex > 0 ? 'border-t border-[hsl(var(--border))]' : ''}`}
                    >
                        <div className="max-w-6xl mx-auto">
                            {/* Section Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`p-3 rounded-xl ${section.featured ? 'bg-[hsl(var(--primary))]' : 'bg-[hsl(var(--primary))]/10'}`}>
                                    <SectionIcon className={`w-6 h-6 ${section.featured ? 'text-white' : 'text-[hsl(var(--primary))]'}`} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">
                                        {section.title}
                                        {section.featured && (
                                            <span className="ml-3 px-2 py-0.5 text-xs font-medium rounded-full bg-[hsl(var(--primary))] text-white">
                                                Most Used
                                            </span>
                                        )}
                                    </h2>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{section.description}</p>
                                </div>
                            </div>

                            {/* Tools Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {section.tools.map((tool, toolIndex) => {
                                    const ToolIcon = getIcon(tool.icon);

                                    const CardContent = (
                                        <>
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="p-3 rounded-xl bg-[hsl(var(--primary))]/10">
                                                    <ToolIcon className="w-6 h-6 text-[hsl(var(--primary))]" />
                                                </div>
                                                {tool.badge && (
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${tool.badge === "Flagship"
                                                        ? "bg-gradient-primary text-white"
                                                        : tool.badge === "Coming Soon"
                                                            ? "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                                                            : "bg-[hsl(var(--primary))] text-white"
                                                        }`}>
                                                        {tool.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className={`text-lg font-semibold text-[hsl(var(--foreground))] mb-2 transition-colors ${tool.badge !== "Coming Soon" ? "group-hover:text-[hsl(var(--primary))]" : ""
                                                }`}>
                                                {tool.title}
                                            </h3>
                                            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                                                {tool.description}
                                            </p>
                                            <div className={`flex items-center text-sm font-medium ${tool.badge === "Coming Soon"
                                                ? "text-[hsl(var(--muted-foreground))]"
                                                : "text-[hsl(var(--primary))]"
                                                }`}>
                                                {tool.badge === "Coming Soon" ? (
                                                    "Notify me when available"
                                                ) : (
                                                    <>
                                                        Use Tool
                                                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    );

                                    if (tool.badge === "Coming Soon") {
                                        return (
                                            <div
                                                key={toolIndex}
                                                className="group p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] opacity-75 cursor-not-allowed"
                                            >
                                                {CardContent}
                                            </div>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={toolIndex}
                                            href={tool.href}
                                            className="group p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 hover:shadow-lg transition-all duration-200"
                                        >
                                            {CardContent}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                );
            })}
        </>
    );
}
