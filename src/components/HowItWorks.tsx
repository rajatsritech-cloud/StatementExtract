import { Upload, Cpu, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { InteractiveDemo } from "@/components/InteractiveDemo";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Bank Statements",
      description: "Securely upload your PDF bank statements or scanned images. We support thousands of global bank formats.",
      step: "01"
    },
    {
      icon: Cpu,
      title: "AI Analysis & Validation",
      description: "Our Financial AI engine identifies transactions, verifies balances, and standardizes descriptions automatically.",
      step: "02"
    },
    {
      icon: Download,
      title: "Export to Accounting Software",
      description: "Download verified Excel/CSV files or sync directly to QuickBooks Online and Xero with one click.",
      step: "03"
    }
  ];

  return (
    <section id="how-it-works" className="relative py-12 px-6 md:py-20 bg-[hsl(var(--background))] border-y border-[hsl(var(--border))]">
      {/* Vertical lines pattern */}
      <div className="absolute inset-0 bg-grid-pattern-3 bg-size-40" />

      <div className="relative mx-auto max-w-7xl z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[hsl(var(--foreground))] md:text-5xl mb-4">
            Automated Bookkeeping in 3 Steps
          </h2>
          <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            From PDF to Excel, QuickBooks & Xero in seconds. Stop manual data entry forever.
          </p>
        </div>

        <div className="mb-16">
          <InteractiveDemo />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Link key={index} href="/convert-bank-statement-to-csv-excel" className="block h-full">
                <Card
                  className="p-8 bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] hover:shadow-lg transition-all relative group h-full cursor-pointer"
                >
                  <div className="absolute top-4 right-4 text-6xl font-bold text-[hsl(var(--primary))]/10 group-hover:text-[hsl(var(--primary))]/20 transition-colors">
                    {step.step}
                  </div>
                  <div className="relative">
                    <div className="mb-6 inline-flex p-3 bg-[hsl(var(--primary))]/10 rounded-lg group-hover:bg-[hsl(var(--primary))]/20 transition-colors">
                      <Icon className="h-8 w-8 text-[hsl(var(--primary))]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-3 group-hover:text-[hsl(var(--primary))] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))]">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
