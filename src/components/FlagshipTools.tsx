"use client";

import Link from "next/link";
import { FileSpreadsheet, ArrowRight, Sparkles } from "lucide-react";

const FLAGSHIP_TOOLS = [
    {
        name: "Bank Statement to Excel/CSV",
        href: "/convert-bank-statement-to-csv-excel",
        icon: FileSpreadsheet,
        description: "AI-powered extraction from any bank PDF"
    },
    {
        name: "Bank Statement to QBO/Xero",
        href: "/convert-bank-statement-to-quickbooks-xero",
        icon: FileSpreadsheet,
        description: "Import directly to QuickBooks or Xero"
    },
    {
        name: "Bank Statement to Tally",
        href: "/convert-bank-statement-to-quickbooks-tally",
        icon: FileSpreadsheet,
        description: "Ready for Tally accounting"
    },
];

export function FlagshipTools() {
    return (
        <section id="flagship-tools" aria-labelledby="flagship-tools-heading" className="relative py-16 px-6 bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--muted))]/30">
            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Themed Hexagon Pattern */}
                <div className="absolute inset-0 opacity-[0.08]" style={{
                    backgroundImage: `radial-gradient(rgb(139 92 246 / 0.4) 1.5px, transparent 1.5px)`,
                    backgroundSize: '20px 20px'
                }} />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-5xl">
                {/* Section Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 mb-6">
                        <span className="text-sm font-medium text-violet-500">
                            Flagship Tools
                        </span>
                    </div>
                    <h2 id="flagship-tools-heading" className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-5xl mb-4">
                        <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Bank Statement</span> Converters
                    </h2>
                    <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                        Transform any bank statement PDF into structured data for your accounting software
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid md:grid-cols-3 gap-6 animate-slide-up">
                    {FLAGSHIP_TOOLS.map((tool, i) => (
                        <Link
                            key={tool.href + i}
                            href={tool.href}
                            className="group relative p-6 rounded-2xl border border-violet-500/20 bg-[hsl(var(--card))] hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/5 group-hover:to-fuchsia-500/5 transition-all duration-300" />

                            <div className="relative">
                                <div className="inline-flex p-3 rounded-xl bg-violet-500/10 text-violet-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <tool.icon className="h-6 w-6" />
                                </div>

                                <h3 className="font-semibold text-[hsl(var(--foreground))] group-hover:text-violet-500 transition-colors mb-2">
                                    {tool.name}
                                </h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                                    {tool.description}
                                </p>

                                <div className="flex items-center gap-1 text-sm font-medium text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Try now
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
