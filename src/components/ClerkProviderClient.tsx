// components/ClerkProviderClient.tsx
"use client";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function ClerkProviderClient({ children }: { children: React.ReactNode }) {
  // browser console check

  if (!publishableKey) {
    console.warn("Clerk publishable key is missing in client bundle.");
  }

  return <ClerkProvider publishableKey={publishableKey ?? ""}>{children}</ClerkProvider>;
}
