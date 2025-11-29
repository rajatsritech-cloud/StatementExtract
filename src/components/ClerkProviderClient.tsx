// components/ClerkProviderClient.tsx
"use client";
import React from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

export default function ClerkProviderClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  if (!publishableKey) {
    console.warn("Clerk publishable key is missing in client bundle.");
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      routerPush={(to) => router.push(to)}
      routerReplace={(to) => router.replace(to)}
    >
      {children}
    </ClerkProvider>
  );
}
