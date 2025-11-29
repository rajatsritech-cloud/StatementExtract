import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export const CTA = () => {
  return (
    <section className="py-12 px-6 md:py-20 bg-[hsl(var(--background))]">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] p-12 text-center shadow-2xl md:p-16">
          <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>

          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))]/20 border border-[hsl(var(--primary))]/30 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" />
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">Ready to get started?</span>
            </div>

            <h2 className="mb-6 text-4xl font-bold text-[hsl(var(--foreground))] md:text-5xl">
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
              Start with 500 free pages • No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};