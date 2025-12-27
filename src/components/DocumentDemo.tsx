import { ArrowRight, Cpu, FileSpreadsheet, FileText, Sparkles, Upload, Check, Zap } from "lucide-react";

export const DocumentDemo = () => {
  return (
    <section id="document-demo" aria-labelledby="document-demo-heading" className="relative overflow-hidden bg-gradient-to-b from-[hsl(var(--muted))]/30 to-[hsl(var(--background))] py-20 px-6 md:py-28">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Themed Cross-Hatch Pattern */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgb(244 63 94 / 0.3) 0, rgb(244 63 94 / 0.3) 1px, transparent 0, transparent 50%), repeating-linear-gradient(90deg, rgb(244 63 94 / 0.3) 0, rgb(244 63 94 / 0.3) 1px, transparent 0, transparent 50%)`,
          backgroundSize: '30px 30px'
        }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 mb-6">
            <span className="text-sm font-medium text-rose-500">
              How It Works
            </span>
          </div>
          <h2 id="document-demo-heading" className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-5xl mb-4">
            From Documents to Data in <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">Seconds</span>
          </h2>
          <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            Our intelligent pipeline transforms complex financial documents into clean, structured data
          </p>
        </div>

        {/* Process Flow - Desktop */}
        <div className="hidden lg:flex items-center justify-center gap-8 mb-16">
          {/* Step 1: Upload */}
          <div className="group flex flex-col items-center">
            <div className="relative mb-4">
              <div className="h-24 w-24 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center group-hover:bg-rose-500/20 transition-all">
                <Upload className="h-10 w-10 text-rose-500" />
              </div>
              <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold shadow-lg">
                1
              </div>
            </div>
            <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-1">Upload</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] text-center max-w-[160px]">
              Drop any PDF or image
            </p>
          </div>

          {/* Arrow */}
          <div className="flex-shrink-0 w-16 h-0.5 bg-rose-500/30 rounded-full">
            <ArrowRight className="h-4 w-4 text-rose-500 -mt-[7px] ml-auto" />
          </div>

          {/* Step 2: Process */}
          <div className="group flex flex-col items-center">
            <div className="relative mb-4">
              <div className="h-24 w-24 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center group-hover:bg-rose-500/20 transition-all">
                <Cpu className="h-10 w-10 text-rose-500" />
              </div>
              <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold shadow-lg">
                2
              </div>
            </div>
            <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-1">AI Extraction</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] text-center max-w-[160px]">
              Intelligent parsing
            </p>
          </div>

          {/* Arrow */}
          <div className="flex-shrink-0 w-16 h-0.5 bg-rose-500/30 rounded-full">
            <ArrowRight className="h-4 w-4 text-rose-500 -mt-[7px] ml-auto" />
          </div>

          {/* Step 3: Export */}
          <div className="group flex flex-col items-center">
            <div className="relative mb-4">
              <div className="h-24 w-24 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center group-hover:bg-rose-500/20 transition-all">
                <FileSpreadsheet className="h-10 w-10 text-rose-500" />
              </div>
              <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold shadow-lg">
                3
              </div>
            </div>
            <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-1">Export</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] text-center max-w-[160px]">
              CSV, Excel, QBO
            </p>
          </div>
        </div>

        {/* Process Flow - Mobile */}
        <div className="lg:hidden flex flex-col items-center gap-6 mb-16">
          {[
            { icon: Upload, title: "Upload", desc: "Drop any PDF or image", num: 1 },
            { icon: Cpu, title: "AI Extraction", desc: "Intelligent parsing", num: 2 },
            { icon: FileSpreadsheet, title: "Export", desc: "CSV, Excel, QBO", num: 3 },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-4 w-full max-w-sm">
              <div className="h-16 w-16 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0">
                <step.icon className="h-7 w-7 text-rose-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-500">Step {step.num}</span>
                </div>
                <h3 className="font-bold text-[hsl(var(--foreground))]">{step.title}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Easy Upload", desc: "Just drop your PDF and we'll take care of the rest", icon: FileText },
            { title: "Smart Recognition", desc: "Automatically detects tables, amounts, and dates", icon: Sparkles },
            { title: "Instant Results", desc: "Get structured data in seconds, not hours", icon: Check },
          ].map((feature, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-rose-500/50 hover:shadow-lg transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-rose-500/10 flex items-center justify-center mb-4 group-hover:bg-rose-500/20 transition-colors">
                <feature.icon className="h-6 w-6 text-rose-500" />
              </div>
              <h3 className="font-bold text-[hsl(var(--foreground))] mb-2 group-hover:text-rose-500 transition-colors">{feature.title}</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};