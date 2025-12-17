"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false); // Start false to match server
    const [hasConsent, setHasConsent] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const consent = localStorage.getItem("cookie-consent");
        const hasExistingConsent = !!consent;

        setHasConsent(hasExistingConsent);
        // Show if NO consent exists
        setIsVisible(!hasExistingConsent);
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setHasConsent(true);
        setIsVisible(false);
        window.dispatchEvent(new Event("cookie-consent-update"));
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setHasConsent(true);
        setIsVisible(false);
        window.dispatchEvent(new Event("cookie-consent-update"));
    };

    // Don't render until client-side hydration is complete
    if (!mounted) return null;

    // If fully handled (hidden + consent exists), don't render anything
    if (!isVisible && hasConsent) return null;

    // Minimized state (floating icon) - Show if hidden but NO consent (user closed it manually)
    if (!isVisible && !hasConsent) {
        return (
            <div className="fixed bottom-4 left-4 z-[9999] rounded-full bg-[hsl(var(--card))] p-3 shadow-2xl md:bottom-6 md:left-6">
                <button
                    onClick={() => setIsVisible(true)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                    >
                        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                        <path d="M8.5 8.5v.01" />
                        <path d="M16 15.5v.01" />
                        <path d="M12 12v.01" />
                        <path d="M11 17v.01" />
                        <path d="M7 14v.01" />
                    </svg>
                </button>
            </div>
        );
    }

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 z-[9999] w-[90vw] max-w-md rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-2xl md:bottom-6 md:left-6 transition-all duration-300 ease-in-out transform">
            <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                    >
                        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                        <path d="M8.5 8.5v.01" />
                        <path d="M16 15.5v.01" />
                        <path d="M12 12v.01" />
                        <path d="M11 17v.01" />
                        <path d="M7 14v.01" />
                    </svg>
                </div>
                <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                        <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                            Cookie Preferences
                        </h3>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
                        We use cookies to analyze traffic and improve your experience.
                        Review our <Link href="/privacy-policy" className="text-[hsl(var(--primary))] hover:underline underline-offset-2">Privacy Policy</Link>.
                    </p>
                    <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                        <Button
                            size="sm"
                            onClick={handleAccept}
                            className="h-8 text-xs w-full sm:flex-1 shadow-sm"
                        >
                            Accept All
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDecline}
                            className="h-8 text-xs w-full sm:flex-1"
                        >
                            Necessary Only
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
