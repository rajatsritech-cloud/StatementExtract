import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BlogInlineCTA() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] px-6 py-8 text-center shadow-2xl md:px-10 md:py-10">
      <div className="absolute inset-0 bg-gradient-primary opacity-10" aria-hidden="true" />

      <svg
        className="pointer-events-none absolute -left-10 top-4 h-32 w-32 text-[hsl(var(--primary))]/10"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M37.3,-49.6C48.9,-40.3,59.3,-29.5,63.8,-16.2C68.3,-2.9,67,12.9,60.5,26.3C54,39.7,42.3,50.7,28.5,57.5C14.7,64.3,-1.2,67,-16.3,63.9C-31.4,60.8,-45.7,51.9,-55.4,39.3C-65.1,26.7,-70.2,10.4,-68.8,-5.4C-67.4,-21.2,-59.5,-36.5,-48.3,-45.5C-37.1,-54.5,-23.6,-57.2,-10.8,-57.7C2,-58.2,25.7,-58.9,37.3,-49.6Z"
          transform="translate(100 100)"
        />
      </svg>

      <svg
        className="pointer-events-none absolute -right-16 bottom-[-40px] h-40 w-40 text-[hsl(var(--accent))]/15"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M41.3,-53.4C53.4,-43.7,62.7,-30.9,66.6,-16.4C70.5,-1.9,69,14.3,62.2,28.3C55.4,42.3,43.3,54.1,28.7,61.2C14.1,68.3,-3.1,70.7,-19.6,66.9C-36.1,63.1,-51.9,53.1,-61.3,38.9C-70.7,24.7,-73.7,6.3,-70.5,-10.3C-67.3,-26.9,-57.9,-41.7,-45.3,-51.2C-32.7,-60.7,-16.3,-64.9,-0.8,-63.8C14.7,-62.7,29.3,-63.1,41.3,-53.4Z"
          transform="translate(100 100)"
        />
      </svg>

      <div className="relative mx-auto flex max-w-2xl flex-col gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-3xl">
            Get started free with Statement Extract
          </h3>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))] md:text-base">
            Convert your first 10 bank statements in less than 5 minutes with our Intelligent Document Processing.
          </p>
        </div>

        <div className="mt-4 flex justify-center">
          <Link href="/convert-bank-statement-to-csv-excel" passHref>
            <Button
              size="lg"
              className="group gap-2 shadow-glow bg-none bg-[hsl(var(--primary-dark))] hover:bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
            >
              Get started free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
