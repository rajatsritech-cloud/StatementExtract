"use client";

import Image from "next/image";
import Link from "next/link";

interface PageMetaProps {
    lastUpdated?: string;
    className?: string;
}

/**
 * PageMeta component for E-E-A-T compliance
 * Shows author attribution with photo and last updated date
 */
export const PageMeta = ({ lastUpdated = "March 2026", className = "" }: PageMetaProps) => {
    return (
        <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[hsl(var(--muted-foreground))] ${className}`}>
            <Link href="/about" className="flex items-center gap-2 group">
                <Image
                    src="/favicon-32x32.png"
                    alt="Statement Extract Team"
                    width={20}
                    height={20}
                    className="rounded-full object-contain"
                />
                <span>
                    By{" "}
                    <span className="text-[hsl(var(--primary))] group-hover:underline font-medium">
                        Statement Extract Editorial Team
                    </span>
                </span>
            </Link>
            <span className="hidden sm:inline">•</span>
            <span>Last updated: {lastUpdated}</span>
        </div>
    );
};
