"use client";

import Link from "next/link";
import { FileSpreadsheet, ArrowRight, Sparkles, FileText } from "lucide-react";

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

const INVOICE_TOOLS = [
    {
        name: "Invoice to Excel",
        href: "/convert-invoice-to-excel-csv",
        icon: FileText,
        description: "Export invoice data to Excel (.xlsx) format"
    },
    {
        name: "Invoice to CSV",
        href: "/convert-invoice-to-excel-csv",
        icon: FileText,
        description: "Export invoice data to CSV format for any system"
    }
];

export function FlagshipTools() {
    return (
        <section id="flagship-tools" aria-labelledby="flagship-tools-heading" className="relative pt-12 pb-16 px-6 bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--muted))]/30">
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
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 animate-slide-up mb-24">
                    {FLAGSHIP_TOOLS.map((tool, i) => (
                        <div key={tool.href + i} className="relative group">
                            <Link
                                href={tool.href}
                                className="relative flex flex-col items-center text-center h-full p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md shadow-xl hover:bg-violet-500/5 hover:border-violet-500/60 transition-all duration-300 overflow-hidden"
                            >
                                {/* Glass Highlight */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50" />

                                <div className="relative z-10 flex flex-col items-center h-full w-full">
                                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/10 text-violet-400 mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-violet-500/5">
                                        <tool.icon className="h-7 w-7" />
                                    </div>

                                    <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-3 group-hover:text-violet-400 transition-colors duration-300">
                                        {tool.name}
                                    </h3>
                                    <p className="text-[hsl(var(--muted-foreground))] mb-6 leading-relaxed max-w-sm flex-grow">
                                        {tool.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-sm font-semibold text-violet-400/70 group-hover:text-violet-300 transition-colors mt-auto group-hover:underline decoration-violet-500/30 underline-offset-4">
                                        Try Converter
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Spacer */}
                <div className="h-16"></div>

                {/* Section Header - Invoice */}
                <div className="text-center mb-12 animate-fade-in">
                    <h2 className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-5xl mb-4">
                        <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Invoice Data</span> Converter
                    </h2>
                    <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                        Eliminate manual data entry. Convert PDF invoices to csv and Excel instantly.
                    </p>
                </div>

                {/* Invoice Tools Grid */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 animate-slide-up max-w-4xl mx-auto">
                    {INVOICE_TOOLS.map((tool, i) => (
                        <div key={tool.href + i} className="relative group">

                            <Link
                                href={tool.href}
                                className="relative flex flex-col items-center text-center h-full p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md shadow-xl hover:bg-emerald-500/5 hover:border-emerald-500/60 transition-all duration-300 overflow-hidden"
                            >
                                {/* Glass Highlight */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50" />

                                <div className="relative z-10 flex flex-col items-center h-full w-full">
                                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/10 text-emerald-400 mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-emerald-500/5">
                                        <tool.icon className="h-7 w-7" />
                                    </div>

                                    <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                                        {tool.name}
                                    </h3>
                                    <p className="text-[hsl(var(--muted-foreground))] mb-6 leading-relaxed max-w-sm flex-grow">
                                        {tool.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400/70 group-hover:text-emerald-300 transition-colors mt-auto group-hover:underline decoration-emerald-500/30 underline-offset-4">
                                        Try Converter
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
