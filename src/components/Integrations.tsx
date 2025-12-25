import { Card } from "@/components/ui/card";
import { Code2, Database, Webhook, Cloud, Shield, Zap } from "lucide-react";

export const Integrations = () => {
  const integrations = [
    {
      icon: Database,
      name: "QuickBooks Online",
      description: "Direct one-click export for invoices and bank transactions."
    },
    {
      icon: Cloud,
      name: "Xero",
      description: "Seamlessly push reconciled statements to Xero."
    },
    {
      icon: Code2,
      name: "Excel & CSV",
      description: "Universal formats compatible with any accounting software."
    },
    {
      icon: Webhook,
      name: "API & Webhooks",
      description: "Automate your pipeline with our robust developer API."
    },
    {
      icon: Shield,
      name: "Zero Data Retention",
      description: "We process your files in memory and do not store them. Your data stays yours."
    },
    {
      icon: Zap,
      name: "Auto-Categorization",
      description: "Smart rules to auto-assign categories before export."
    }
  ];

  return (
    <section className="relative overflow-hidden bg-[hsl(var(--background))] py-12 px-6 md:py-20 border-y border-[hsl(var(--border))]">
      {/* Dot grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="relative mx-auto max-w-7xl z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[hsl(var(--foreground))] md:text-5xl mb-4">
            Connects with your accounting stack
          </h2>
          <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            Compatible with all major accounting platforms and custom financial workflows.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration, index) => {
            const Icon = integration.icon;
            return (
              <Card
                key={index}
                className="p-6 bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-all group hover:shadow-glow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[hsl(var(--primary))]/10 rounded-lg group-hover:bg-[hsl(var(--primary))]/20 transition-colors">
                    <Icon className="h-6 w-6 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      {integration.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[hsl(var(--muted-foreground))]">
            And many more through our flexible API and webhook system
          </p>
        </div>
      </div>
    </section>
  );
};
