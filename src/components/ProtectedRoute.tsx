"use client";

import { useAuth } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLoaded, isSignedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push("/");
        }
    }, [isLoaded, isSignedIn, router]);

    if (!isLoaded) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[hsl(var(--background))]">
                <Loader2 className="h-8 w-8 animate-spin text-[hsl(var(--primary))]" />
            </div>
        );
    }

    if (!isSignedIn) {
        return null;
    }

    return <>{children}</>;
};
