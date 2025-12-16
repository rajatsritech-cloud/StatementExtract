"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function TopLoaderContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setLoading(false);
        setProgress(100);

        const timeout = setTimeout(() => {
            setProgress(0);
        }, 300);

        return () => clearTimeout(timeout);
    }, [pathname, searchParams]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        const handleStart = () => {
            setLoading(true);
            setProgress(15);

            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 90) return prev;
                    const increment = Math.random() * 8;
                    return Math.min(prev + increment, 90);
                });
            }, 300);
        };

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest("a");

            if (link && link.href && !link.href.startsWith("#") && !link.target) {
                const url = new URL(link.href);
                if (url.origin === window.location.origin && url.pathname !== pathname) {
                    handleStart();
                }
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
            if (interval) clearInterval(interval);
        };
    }, [pathname]);

    if (!loading && progress === 0) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-[4px] pointer-events-none">
            <div
                className="h-full relative"
                style={{
                    width: `${progress}%`,
                    opacity: loading ? 1 : 0,
                    transition: loading ? "width 300ms ease-out, opacity 150ms" : "width 150ms ease-out, opacity 200ms",
                    background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.8))",
                    boxShadow: loading ? "0 0 6px hsl(var(--primary) / 0.6)" : "none",
                }}
            >
                {/* Shimmer at the end */}
                <div
                    className="absolute right-0 top-0 h-full w-16"
                    style={{
                        background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.9), white)",
                        opacity: 0.7,
                    }}
                />
            </div>
        </div>
    );
}

export function TopLoader() {
    return (
        <Suspense fallback={null}>
            <TopLoaderContent />
        </Suspense>
    );
}

