import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    // Generate Schema.org JSON-LD
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://statementextract.com"
            },
            ...items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": item.label,
                "item": item.href ? `https://statementextract.com${item.href}` : undefined
            }))
        ]
    };

    return (
        <nav aria-label="Breadcrumb" className="flex justify-center mb-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ol className="inline-flex items-center space-x-1 md:space-x-2 px-4 py-2 rounded-full bg-[hsl(var(--muted))]/30 border border-[hsl(var(--border))] backdrop-blur-sm">
                <li className="flex items-center">
                    <Link
                        href="/"
                        className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors flex items-center"
                        title="Home"
                    >
                        <Home className="w-3.5 h-3.5" />
                        <span className="sr-only">Home</span>
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        <ChevronRight className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))]/40 mx-1" />
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-xs md:text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-xs md:text-sm font-medium text-[hsl(var(--foreground))]">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
