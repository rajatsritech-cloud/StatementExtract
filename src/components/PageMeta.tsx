"use client";

import Link from "next/link";
import { Building2 } from "lucide-react";

interface PageMetaProps {
    lastUpdated?: string;
    className?: string;
}

/**
 * PageMeta component for E-E-A-T compliance
 * Shows author/company attribution and last updated date
 */
export const PageMeta = ({ lastUpdated = "January 2026", className = "" }: PageMetaProps) => {
    return (
        <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[hsl(var(--muted-foreground))] ${className}`}>
            <div className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" />
                <span>
                    Created by{" "}
                    <Link
                        href="/about"
                        className="text-[hsl(var(--primary))] hover:underline font-medium"
                    >
                        Statement Extract
                    </Link>
                </span>
            </div>
            <span className="hidden sm:inline">•</span>
            <span>Last updated: {lastUpdated}</span>
        </div>
    );
};
