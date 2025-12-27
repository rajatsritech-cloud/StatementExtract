import { Card } from "@/components/ui/card";
import { Code2, Database, Webhook, Cloud, Shield, Zap, Link2 } from "lucide-react";

export const Integrations = () => {
  const integrations = [
    {
      icon: Database,
      name: "QuickBooks Online",
      description: "Direct one-click export for invoices and bank transactions.",
    },
    {
      icon: Cloud,
      name: "Xero",
      description: "Seamlessly push reconciled statements to Xero.",
    },
    {
      icon: Code2,
      name: "Excel & CSV",
      description: "Universal formats compatible with any accounting software.",
    },
    {
      icon: Webhook,
      name: "API & Webhooks",
      description: "Automate your pipeline with our robust developer API.",
    },
    {
      icon: Shield,
      name: "Privacy First",
      description: "We process your files securely and minimize data retention.",
    },
    {
      icon: Zap,
      name: "Auto-Categorization",
      description: "Smart rules to auto-assign categories before export.",
    }
  ];

  return (
    <section id="integrations" aria-labelledby="integrations-heading" className="relative overflow-hidden bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--muted))]/30 py-12 px-6 md:py-20">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Themed Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: `radial-gradient(rgb(34 197 94 / 0.5) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }} />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 mb-6">
            <span className="text-sm font-medium text-green-500">
              Integrations
            </span>
          </div>
          <h2 id="integrations-heading" className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-5xl mb-4">
            Connects with your <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">accounting stack</span>
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
                className="p-6 bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-green-500/50 transition-all group hover:shadow-glow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                    <Icon className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2 group-hover:text-green-500 transition-colors">
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

