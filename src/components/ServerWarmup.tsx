"use client";

import { useEffect } from "react";

// Oracle Functions go cold after ~15 min of inactivity
// Ping every 10 minutes to keep warm
const KEEP_ALIVE_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

export function ServerWarmup() {
    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        const pingServer = () => {
            fetch(`${apiUrl}/api/v1/health/`)
                .then(res => {
                    if (res.ok) console.log("🔥 Backend warmed up!");
                })
                .catch(() => {
                    // Silently fail - if backend is down, main requests will handle errors
                });
        };

        // Initial warmup on page load
        pingServer();

        // Keep-alive: ping every 10 minutes to prevent cold starts
        const intervalId = setInterval(() => {
            console.log("🔄 Keep-alive ping...");
            pingServer();
        }, KEEP_ALIVE_INTERVAL_MS);

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, []);

    return null; // Renders nothing
}
