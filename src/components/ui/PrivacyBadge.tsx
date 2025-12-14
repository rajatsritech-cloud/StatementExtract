"use client";

import { Shield, Lock, Eye, Server } from "lucide-react";

interface PrivacyBadgeProps {
    variant?: "compact" | "full";
}

export function PrivacyBadge({ variant = "full" }: PrivacyBadgeProps) {
    if (variant === "compact") {
        return (
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[hsl(var(--muted-foreground))]">
                <Shield className="w-3.5 h-3.5 text-green-500" />
                <span>Your files never leave your browser • 100% private</span>
            </div>
        );
    }

    return (
        <div className="mt-6 p-4 rounded-xl bg-green-500/5 border border-green-500/20">
            <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-green-500/10">
                    <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="font-semibold text-green-700 dark:text-green-400 text-sm">
                    100% Private & Secure
                </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-start gap-2">
                    <Server className="w-3.5 h-3.5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="font-medium text-[hsl(var(--foreground))]">No Upload</p>
                        <p className="text-[hsl(var(--muted-foreground))]">Files stay on your device</p>
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <Lock className="w-3.5 h-3.5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="font-medium text-[hsl(var(--foreground))]">Browser Processing</p>
                        <p className="text-[hsl(var(--muted-foreground))]">Everything runs locally</p>
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <Eye className="w-3.5 h-3.5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="font-medium text-[hsl(var(--foreground))]">Zero Storage</p>
                        <p className="text-[hsl(var(--muted-foreground))]">We never see your files</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
