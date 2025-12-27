import { Building2, FileCheck, Receipt, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const useCases = [
  {
    icon: Building2,
    title: "Bank Statement Processing",
    description: "Convert PDF bank statements to Excel, CSV, QuickBooks, and Xero for accountants and bookkeepers.",
    metrics: "High Accuracy",
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
    <section id="use-cases" aria-labelledby="use-cases-heading" className="relative bg-gradient-to-b from-[hsl(var(--muted))]/30 to-[hsl(var(--background))] py-16 px-6 md:py-24 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Themed Grid Lines */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `linear-gradient(to right, rgb(245 158 11 / 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgb(245 158 11 / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl z-10">
        {/* Header */}
        <div className="mb-16 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 mb-6">
            <span className="text-sm font-medium text-amber-500">
              Use Cases
            </span>
          </div>
          <h2 id="use-cases-heading" className="mb-4 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-5xl">
            Complete <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Financial Suite</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
            Everything accountants, bookkeepers, and businesses need in one platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 transition-all hover:shadow-xl hover:border-amber-500/50"
            >
              <div className="mb-6 flex items-start justify-between">
                <div className="inline-flex rounded-xl bg-amber-500/10 p-4">
                  <useCase.icon className="h-8 w-8 text-amber-500" />
                </div>
                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-500">
                  {useCase.metrics}
                </span>
              </div>

              <h3 className="mb-3 text-2xl font-semibold text-[hsl(var(--card-foreground))] group-hover:text-amber-500 transition-colors">
                {useCase.title}
              </h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                {useCase.description}
              </p>

              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
