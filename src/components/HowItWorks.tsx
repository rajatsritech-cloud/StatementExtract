import { Upload, Cpu, Download } from "lucide-react";
import { Card } from "@/components/ui/card";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Documents",
      description: "Simply upload your PDFs, images, or documents through our API or dashboard. Support for any format.",
      step: "01"
    },
    {
      icon: Cpu,
      title: "AI Processing",
      description: "Our advanced AI automatically identifies fields, extracts data, and validates information with high accuracy.",
      step: "02"
    },
    {
      icon: Download,
      title: "Get Structured Data",
      description: "Receive clean JSON, CSV, or direct database integration. Ready to use in your systems immediately.",
      step: "03"
    }
  ];

  return (
    <section className="relative py-20 px-6 md:py-32 bg-[hsl(var(--background))] border-y border-[hsl(var(--border))]">
      {/* Vertical lines pattern */}
      <div className="absolute inset-0 bg-grid-pattern-3 bg-size-40" />
      
      <div className="relative mx-auto max-w-7xl z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[hsl(var(--foreground))] md:text-5xl mb-4">
            How it works
          </h2>
          <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            Three simple steps to automate your document processing
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index} 
                className="p-8 bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-all relative group"
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-[hsl(var(--primary))]/10 group-hover:text-[hsl(var(--primary))]/20 transition-colors">
                  {step.step}
                </div>
                <div className="relative">
                  <div className="mb-6 inline-flex p-3 bg-[hsl(var(--primary))]/10 rounded-lg">
                    <Icon className="h-8 w-8 text-[hsl(var(--primary))]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[hsl(var(--muted-foreground))]">
                    {step.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
