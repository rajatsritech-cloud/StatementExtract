import { Building2, FileCheck, Receipt, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const useCases = [
  {
    icon: Building2,
    title: "Bank Statement Processing",
    description: "Convert PDF bank statements to Excel, CSV, QuickBooks, and Xero for accountants and bookkeepers.",
    metrics: "Industry Leading",
  },
  {
    icon: Receipt,
    title: "QuickBooks & Xero Import",
    description: "Ready-to-import formats for accounting. Seamlessly push data to your preferred software.",
    metrics: "Instant Export",
  },
  {
    icon: FileCheck,
    title: "Small Business Accounting",
    description: "For CPAs, CAs, and bookkeepers. Automate data entry and focus on advisory.",
    metrics: "Save 20+ Hrs/Wk",
  },
  {
    icon: Shield,
    title: "Financial Auditing",
    description: "Transaction verification & reconciliation with audit trails and confidence scores.",
    metrics: "Audit Ready",
  },
];

export const UseCases = () => {
  return (
    <section className="relative bg-[hsl(var(--background))] py-12 px-6 md:py-20 border-y border-[hsl(var(--border))]">
      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 bg-grid-pattern-2 bg-size-32" />
      <div className="relative mx-auto max-w-7xl z-10">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-5xl">
            Complete Financial Suite
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
            Everything accountants, bookkeepers, and businesses need in one platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 transition-all hover:shadow-xl"
            >
              <div className="mb-6 flex items-start justify-between">
                <div className="inline-flex rounded-xl bg-[hsl(var(--primary))]/10 p-4">
                  <useCase.icon className="h-8 w-8 text-[hsl(var(--primary))]" />
                </div>
                <span className="rounded-full bg-[hsl(var(--primary))]/10 px-3 py-1 text-sm font-medium text-[hsl(var(--primary))]">
                  {useCase.metrics}
                </span>
              </div>

              <h3 className="mb-3 text-2xl font-semibold text-[hsl(var(--card-foreground))]">
                {useCase.title}
              </h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                {useCase.description}
              </p>

              <div className="absolute inset-0 -z-10 bg-gradient-primary opacity-0 transition-opacity group-hover:opacity-5" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};