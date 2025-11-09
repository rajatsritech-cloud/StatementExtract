import { Card } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";

export const DocumentDemo = () => {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--muted))]/30 py-20 px-6 md:py-32 border-y border-[hsl(var(--border))]">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern-1 bg-size-24" />
      
      <div className="relative mx-auto max-w-7xl z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[hsl(var(--foreground))] md:text-5xl mb-4">
            See it in action
          </h2>
          <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            Watch how our AI transforms unstructured documents into clean, structured data
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          {/* Before - Document */}
          <Card className="p-8 bg-[hsl(var(--card))] border-[hsl(var(--border))] relative overflow-hidden group hover:border-[hsl(var(--primary))]/50 transition-all">
            <div className="absolute top-3 left-3 bg-[hsl(var(--muted))] px-3 py-1 rounded-full text-xs font-medium text-[hsl(var(--muted-foreground))]">
              Input Document
            </div>
            <div className="mt-8 space-y-4">
              <div className="h-3 bg-[hsl(var(--muted))] rounded w-3/4"></div>
              <div className="h-3 bg-[hsl(var(--muted))] rounded w-full"></div>
              <div className="h-3 bg-[hsl(var(--muted))] rounded w-5/6"></div>
              <div className="h-20 bg-[hsl(var(--secondary))] rounded mt-6 mb-4"></div>
              <div className="h-3 bg-[hsl(var(--muted))] rounded w-2/3"></div>
              <div className="h-3 bg-[hsl(var(--muted))] rounded w-full"></div>
              <div className="h-3 bg-[hsl(var(--muted))] rounded w-4/5"></div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="h-12 bg-[hsl(var(--muted))] rounded"></div>
                <div className="h-12 bg-[hsl(var(--muted))] rounded"></div>
              </div>
              <div className="h-3 bg-[hsl(var(--muted))] rounded w-full mt-6"></div>
              <div className="h-3 bg-[hsl(var(--muted))] rounded w-3/4"></div>
            </div>
          </Card>

          <div className="flex justify-center md:justify-start">
            <ArrowRight className="h-12 w-12 text-[hsl(var(--primary))] animate-pulse" />
          </div>
        </div>

        <div className="mt-8">
          {/* After - Structured Data */}
          <Card className="p-8 bg-gradient-card border-[hsl(var(--primary))]/50 relative overflow-hidden">
            <div className="absolute top-3 left-3 bg-[hsl(var(--primary))]/20 border border-[hsl(var(--primary))]/30 px-3 py-1 rounded-full text-xs font-medium text-[hsl(var(--primary))] flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Extracted Data
            </div>
            <div className="mt-8 font-mono text-sm">
              <div className="bg-[hsl(var(--secondary))]/50 rounded p-4 overflow-x-auto">
                <pre className="text-[hsl(var(--foreground))]">
{`{
  "invoice_number": "INV-2024-001",
  "date": "2024-11-09",
  "vendor": {
    "name": "Acme Corporation",
    "address": "123 Business St, Suite 100"
  },
  "items": [
    {
      "description": "Professional Services",
      "quantity": 1,
      "unit_price": 5000.00,
      "total": 5000.00
    }
  ],
  "subtotal": 5000.00,
  "tax": 450.00,
  "total": 5450.00
}`}
                </pre>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};