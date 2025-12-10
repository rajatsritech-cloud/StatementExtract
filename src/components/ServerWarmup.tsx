"use client";

import { useEffect } from "react";

export function ServerWarmup() {
    useEffect(() => {
        // Warm up the backend services and DB connection
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        // Fire and forget - we don't block the UI
        fetch(`${apiUrl}/api/v1/health/`)
            .then(res => {
                if (res.ok) console.log("🔥 Backend warmed up!");
            })
            .catch(() => {
                // Silently fail - if backend is down, main requests will handle errors
            });
    }, []);

    return null; // Renders nothing
}
