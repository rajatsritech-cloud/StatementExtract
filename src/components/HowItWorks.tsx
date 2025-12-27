import { Upload, Cpu, Download, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { InteractiveDemo } from "@/components/InteractiveDemo";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Bank Statements",
      description: "Securely upload your PDF bank statements. We support thousands of global bank formats.",
      step: "01",
    },
    {
      icon: Cpu,
      title: "AI Analysis & Validation",
      description: "Our AI engine identifies transactions, verifies balances, and standardizes descriptions automatically.",
      step: "02",
    },
    {
      icon: Download,
      title: "Export to Accounting Software",
      description: "Download verified Excel/CSV files or sync directly to QuickBooks Online and Xero with one click.",
      step: "03",
    }
  ];

  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading" className="relative py-16 px-6 md:py-24 bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--muted))]/30 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Themed Diagonal Lines */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, rgb(168 85 247 / 0.4) 0, rgb(168 85 247 / 0.4) 1px, transparent 0, transparent 50%)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 mb-6">
            <span className="text-sm font-medium text-purple-500">
              Simple Process
            </span>
          </div>
          <h2 id="how-it-works-heading" className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-5xl mb-4">
            Automated Bookkeeping in <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">3 Steps</span>
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
                  className="p-8 bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-purple-500/50 hover:shadow-lg transition-all relative group h-full cursor-pointer"
                >
                  <div className="absolute top-4 right-4 text-6xl font-bold text-purple-500/10 group-hover:text-purple-500/20 transition-colors">
                    {step.step}
                  </div>
                  <div className="relative">
                    <div className="mb-6 inline-flex p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                      <Icon className="h-8 w-8 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-3 group-hover:text-purple-500 transition-colors">
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
