"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  FileSpreadsheet, 
  ShieldCheck, 
  Lock,
  RefreshCw,
  TrendingUp,
  Download
} from "lucide-react";
import Link from "next/link";

export type ScanStatus = "idle" | "scanning" | "done";

export function ScanDocumentHero() {
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [activeTab, setActiveTab] = useState<"statement" | "extracted">("statement");

  const startScan = () => {
    if (status === "scanning") return;
    setStatus("scanning");
    setTimeout(() => {
      setStatus("done");
      setActiveTab("extracted");
    }, 2800);
  };

  const resetScan = () => {
    setStatus("idle");
    setActiveTab("statement");
  };

  return (
    <div className="relative mx-auto w-full max-w-5xl rounded-3xl border border-[hsl(var(--border))] bg-gradient-to-b from-[hsl(var(--card))]/90 to-[hsl(var(--card))]/40 p-6 md:p-10 shadow-2xl backdrop-blur-xl">
      {/* Decorative top ambient glow */}
      <div className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-[hsl(var(--primary))]/20 blur-[90px] pointer-events-none" />

      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[hsl(var(--border))]/60 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/20 text-[hsl(var(--primary))]">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[hsl(var(--foreground))] flex items-center gap-2">
              Interactive AI Parser
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                Live Preview
              </span>
            </h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Experience zero-template vector &amp; OCR statement extraction
            </p>
          </div>
        </div>

        {/* Action Toggle Tabs */}
        <div className="flex items-center gap-2 rounded-xl bg-[hsl(var(--background))]/80 p-1 border border-[hsl(var(--border))]">
          <button
            onClick={() => setActiveTab("statement")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "statement"
                ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-sm"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            }`}
          >
            Original PDF
          </button>
          <button
            onClick={() => {
              if (status !== "done") startScan();
              else setActiveTab("extracted");
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "extracted"
                ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-sm"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            }`}
          >
            Structured Data
          </button>
        </div>
      </div>

      {/* Interactive Main Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Document Visualizer (7 Columns) */}
        <div className="lg:col-span-7 relative">
          <div className="relative mx-auto w-full max-w-md rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-5 shadow-xl overflow-hidden min-h-[360px] flex flex-col justify-between">
            
            {/* Animated Laser Scanning Bar */}
            {status === "scanning" && (
              <motion.div
                initial={{ top: "0%" }}
                animate={{ top: ["0%", "95%", "0%"] }}
                transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
                className="absolute left-0 right-0 z-30 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent shadow-[0_0_18px_4px_hsl(var(--primary))]"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full bg-[hsl(var(--primary))] text-[9px] font-mono text-white tracking-widest uppercase">
                  Analyzing Document DOM
                </div>
              </motion.div>
            )}

            {/* Document Header Mockup */}
            <div className="border-b border-[hsl(var(--border))]/50 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded bg-blue-600/20 text-blue-500 flex items-center justify-center font-bold text-xs">
                    CH
                  </div>
                  <span className="text-xs font-bold text-[hsl(var(--foreground))]">CHASE COMMERCIAL BANKING</span>
                </div>
                <span className="text-[10px] font-mono text-[hsl(var(--muted-foreground))]">ACCOUNT: ...8841</span>
              </div>
              <div className="mt-3 flex justify-between text-[11px] text-[hsl(var(--muted-foreground))]">
                <span>Cycle: Mar 01 - Mar 31, 2026</span>
                <span className="font-semibold text-emerald-500">Balance: $48,250.80</span>
              </div>
            </div>

            {/* Document Table Rows */}
            <div className="py-4 space-y-2.5 font-mono text-[11px]">
              <div className="grid grid-cols-12 gap-2 font-semibold text-[hsl(var(--muted-foreground))] text-[10px] border-b border-[hsl(var(--border))]/40 pb-1">
                <span className="col-span-3">Date</span>
                <span className="col-span-6">Description</span>
                <span className="col-span-3 text-right">Amount</span>
              </div>

              <div className={`grid grid-cols-12 gap-2 transition-colors rounded p-1 ${status === 'done' ? 'bg-emerald-500/10 text-emerald-400' : 'text-[hsl(var(--foreground))]'}`}>
                <span className="col-span-3">03/04/2026</span>
                <span className="col-span-6 truncate">STRIPE PAYMENTS TRANSFER</span>
                <span className="col-span-3 text-right text-emerald-500">+$12,450.00</span>
              </div>

              <div className={`grid grid-cols-12 gap-2 transition-colors rounded p-1 ${status === 'done' ? 'bg-emerald-500/10 text-emerald-400' : 'text-[hsl(var(--foreground))]'}`}>
                <span className="col-span-3">03/08/2026</span>
                <span className="col-span-6 truncate">AMAZON WEB SERVICES</span>
                <span className="col-span-3 text-right text-rose-500">-$412.80</span>
              </div>

              <div className={`grid grid-cols-12 gap-2 transition-colors rounded p-1 ${status === 'done' ? 'bg-emerald-500/10 text-emerald-400' : 'text-[hsl(var(--foreground))]'}`}>
                <span className="col-span-3">03/15/2026</span>
                <span className="col-span-6 truncate">PAYROLL DISBURSEMENT ACH</span>
                <span className="col-span-3 text-right text-rose-500">-$8,920.50</span>
              </div>

              <div className={`grid grid-cols-12 gap-2 transition-colors rounded p-1 ${status === 'done' ? 'bg-emerald-500/10 text-emerald-400' : 'text-[hsl(var(--foreground))]'}`}>
                <span className="col-span-3">03/22/2026</span>
                <span className="col-span-6 truncate">WIRE INFLOW: CLIENT INV-904</span>
                <span className="col-span-3 text-right text-emerald-500">+$24,100.00</span>
              </div>
            </div>

            {/* Document Footer Status */}
            <div className="border-t border-[hsl(var(--border))]/50 pt-3 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 text-[hsl(var(--muted-foreground))]">
                <Lock className="h-3 w-3 text-emerald-500" />
                256-bit Encrypted Ephemeral Stream
              </span>
              <span className="text-[hsl(var(--primary))] font-mono font-medium">
                {status === "idle" && "Ready to parse"}
                {status === "scanning" && "Decompressing text stream..."}
                {status === "done" && "✓ Math verified 100%"}
              </span>
            </div>
          </div>
        </div>

        {/* Controls & Live Metrics (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--primary))]">
              <Sparkles className="h-4 w-4" />
              Next-Gen Financial OCR
            </div>
            <h4 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
              Convert any bank PDF into clean spreadsheets in seconds.
            </h4>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              No manual templates. Drop your Chase, Wells Fargo, Bank of America, or international statement and watch our layout engine extract dates, debits, credits, and check numbers instantly.
            </p>
          </div>

          {/* Action Trigger Button */}
          <div className="pt-2">
            {status === "idle" && (
              <button
                onClick={startScan}
                className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-light,var(--primary)))] py-4 px-6 text-sm font-bold text-white shadow-lg transition-all hover:opacity-95 hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)]"
              >
                <span>Trigger Live Extraction Demo</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            )}

            {status === "scanning" && (
              <button
                disabled
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[hsl(var(--muted))] py-4 px-6 text-sm font-semibold text-[hsl(var(--muted-foreground))] cursor-wait"
              >
                <RefreshCw className="h-4 w-4 animate-spin text-[hsl(var(--primary))]" />
                <span>Parsing 4 Pages &amp; Reconciling Balances...</span>
              </button>
            )}

            {status === "done" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3.5 text-xs text-emerald-500">
                  <span className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="h-4 w-4" />
                    Extraction Complete: 54 Rows Verified
                  </span>
                  <button onClick={resetScan} className="text-xs text-[hsl(var(--muted-foreground))] hover:underline">
                    Reset
                  </button>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/convert-bank-statement-to-csv-excel"
                    className="flex-1 text-center rounded-xl bg-[hsl(var(--primary))] py-3 text-xs font-bold text-white shadow-sm hover:opacity-90 transition-opacity"
                  >
                    Convert Your Own Statements Free →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Feature Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 p-2.5">
              <FileSpreadsheet className="h-4 w-4 text-[hsl(var(--primary))]" />
              <span className="text-[hsl(var(--foreground))] font-medium">Excel &amp; CSV Ready</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 p-2.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span className="text-[hsl(var(--foreground))] font-medium">Zero Data Retention</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
