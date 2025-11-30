"use client";

import { useAuth } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const RedirectIfAuthenticated = () => {
    const { isSignedIn, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            router.push("/dashboard");
        }
    }, [isLoaded, isSignedIn, router]);

    return null;
};
