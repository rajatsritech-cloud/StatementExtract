import { Building2, FileCheck, Receipt, Stethoscope } from "lucide-react";
import { Card } from "@/components/ui/card";

const useCases = [
  {
    icon: Receipt,
    title: "Invoice Processing",
    description: "Automatically extract line items, totals, dates, and vendor information from invoices in any format.",
    metrics: "98% accuracy",
  },
  {
    icon: FileCheck,
    title: "Contract Analysis",
    description: "Pull key terms, dates, parties, and clauses from legal documents and contracts.",
    metrics: "10x faster",
  },
  {
    icon: Stethoscope,
    title: "Healthcare Records",
    description: "Extract patient data, diagnoses, and treatment information while maintaining HIPAA compliance.",
    metrics: "100% secure",
  },
  {
    icon: Building2,
    title: "Bank Statements",
    description: "Use OCR + AI to extract transactions, balances, IBANs, and account details from bank statements in any format.",
    metrics: "Industry-leading accuracy",
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
            Trusted across industries
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
            From startups to Fortune 500 companies, teams rely on our platform for critical document processing.
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