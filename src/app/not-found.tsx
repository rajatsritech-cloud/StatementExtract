"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[hsl(var(--background))] px-6 py-16">
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10">
          <AlertTriangle className="h-12 w-12 text-[hsl(var(--primary))]" />
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-[hsl(var(--foreground))]">
          This doesn't look like a valid page
        </h1>
        <p className="mx-auto max-w-md text-sm md:text-base text-[hsl(var(--muted-foreground))]">
          We couldn't find anything at
          {" "}
          <span className="font-mono text-[hsl(var(--foreground))]">
            {pathname}
          </span>
          . Check the URL or head back to the home page.
        </p>
        <div className="flex justify-center">
          <Link href="/">
            <Button size="lg" className="gap-2">
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
