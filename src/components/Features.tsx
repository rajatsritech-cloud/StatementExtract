import { Brain, Gauge, Shield, Workflow } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "Industry-Leading Accuracy",
    description: "Our AI is trained on millions of bank statements and invoices to deliver accountant-verified accuracy without templates.",
  },
  {
    icon: Gauge,
    title: "Lightning Fast Processing",
    description: "Convert 100+ page statements in seconds. Automated reconciliation and fraud detection included.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "We take security seriously. Your data is protected with strong encryption in transit and at rest, and our platform is built with privacy and compliance in mind.",
  },
  {
    icon: Workflow,
    title: "Accounting Integrations",
    description: "Export directly to QuickBooks Online, Xero, Excel, or consume via API for your custom workflows.",
  },
];

export const Features = () => {
  return (
    <section className="relative py-12 px-6 md:py-20 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
      {/* Background lines pattern */}
      <div className="absolute inset-0 bg-grid-pattern-1 bg-size-64" />
      <div className="relative mx-auto max-w-7xl z-10">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-5xl">
            Built for modern finance teams
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
            The only platform that combines high-accuracy extraction with built-in financial intelligence.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-[hsl(var(--border))] bg-gradient-card p-6 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex rounded-lg bg-[hsl(var(--primary))]/10 p-3">
                <feature.icon className="h-6 w-6 text-[hsl(var(--primary))]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[hsl(var(--card-foreground))]">
                {feature.title}
              </h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                {feature.description}
              </p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-primary transition-all group-hover:w-full" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
