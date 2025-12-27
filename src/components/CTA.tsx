import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export const CTA = () => {
  return (
    <section id="cta" aria-labelledby="cta-heading" className="py-16 px-6 md:py-24 bg-[hsl(var(--background))] overflow-hidden">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] p-12 text-center shadow-2xl md:p-16">
          {/* Decorative Elements - Glow behind badge */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-64 h-32 bg-[hsl(var(--primary))]/20 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))]/20 border border-[hsl(var(--primary))]/30 px-4 py-2 backdrop-blur-sm">
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">Ready to get started?</span>
            </div>

            <h2 id="cta-heading" className="mb-6 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-5xl">
              Start extracting data in minutes
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
              Join thousands of companies using our platform to automate document processing.
              No setup required, cancel anytime.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/convert-bank-statement-to-csv-excel">
                <Button
                  size="lg"
                  className="group gap-2"
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
              >
                Schedule Demo
              </Button>
            </div>

            <p className="mt-6 text-sm text-[hsl(var(--muted-foreground))]">
              Start with 10 free pages per day • No credit card required • <Link href="/tools" className="underline hover:text-[hsl(var(--primary))] transition-colors">Free Business Tools</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


