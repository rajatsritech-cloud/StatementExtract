import { Brain, Gauge, Shield, Workflow, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Accuracy",
    description: "Powered by advanced AI and LLM models to intelligently extract data from any bank statement format—no templates needed.",
  },
  {
    icon: Gauge,
    title: "Lightning Fast Processing",
    description: "Convert 100+ page statements in seconds. Automated reconciliation and fraud detection included.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with strong encryption. Built with privacy in mind—we never store your documents.",
  },
  {
    icon: Workflow,
    title: "Accounting Integrations",
    description: "Export directly to QuickBooks Online, Xero, Excel, or consume via API for your custom workflows.",
  },
];

export const Features = () => {
  return (
    <section id="features" aria-labelledby="features-heading" className="relative py-20 px-6 md:py-28 bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--muted))]/30 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Themed Grid Lines */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `linear-gradient(to right, rgb(59 130 246 / 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgb(59 130 246 / 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl z-10">
        {/* Header */}
        <div className="mb-16 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 mb-6">
            <span className="text-sm font-medium text-blue-500">
              Simple & Powerful
            </span>
          </div>
          <h2 id="features-heading" className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-5xl mb-4">
            Perfect for <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Small Businesses</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
            Save hours on bookkeeping. Whether you're a freelancer, small business owner, or accountant—we've got you covered.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-all hover:shadow-xl hover:border-blue-500/50"
            >
              <div className="relative">
                <div className="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3 group-hover:bg-blue-500/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-[hsl(var(--card-foreground))] group-hover:text-blue-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Subtle hover overlay */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
