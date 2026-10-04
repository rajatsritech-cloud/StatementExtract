"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { FileSpreadsheet, CheckCircle2, Building, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export function InteractiveFolderHero() {
  const [isOpen, setIsOpen] = useState(false);

  const spring = {
    type: "spring" as const,
    stiffness: 170,
    damping: 20,
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl py-6 flex flex-col items-center">
      
      {/* Interactive 3D Folder Stage */}
      <div 
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative cursor-pointer select-none py-8 px-4"
        title="Click or hover to open document folder"
      >
        <div className="relative w-80 sm:w-96 h-56 flex items-center justify-center">
          
          {/* Back Folder Wall */}
          <div 
            className="absolute inset-0 rounded-2xl border border-[hsl(var(--border))] transition-colors"
            style={{
              background: "hsl(var(--card))",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.15)",
            }}
          >
            {/* Folder Tab at Top Left */}
            <div 
              className="absolute -top-3.5 left-4 h-5 w-28 rounded-t-lg border-t border-l border-r border-[hsl(var(--border))] bg-[hsl(var(--card))]"
            />
          </div>

          {/* Document Sheet 1: Left Fanned Document (Bank Statement PDF) */}
          <motion.div
            initial={{ rotate: -2, x: -20, y: 0 }}
            animate={isOpen ? { rotate: -12, x: -95, y: -45 } : { rotate: -2, x: -20, y: 0 }}
            transition={spring}
            className="absolute top-3 w-48 sm:w-56 h-48 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-3.5 shadow-lg z-10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[hsl(var(--border))]/60 pb-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="h-4 w-4 rounded bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[8px] font-bold">
                    CH
                  </div>
                  <span className="text-[10px] font-bold text-[hsl(var(--foreground))]">CHASE BANK</span>
                </div>
                <span className="text-[8px] font-mono text-[hsl(var(--muted-foreground))]">...8841</span>
              </div>
              <div className="space-y-1.5 font-mono text-[9px] text-[hsl(var(--muted-foreground))]">
                <div className="flex justify-between">
                  <span>03/04 PAYROLL</span>
                  <span className="text-rose-500 font-semibold">-$4,200</span>
                </div>
                <div className="flex justify-between">
                  <span>03/12 STRIPE</span>
                  <span className="text-emerald-500 font-semibold">+$12,450</span>
                </div>
                <div className="flex justify-between">
                  <span>03/18 WIRE IN</span>
                  <span className="text-emerald-500 font-semibold">+$8,900</span>
                </div>
              </div>
            </div>
            <div className="border-t border-[hsl(var(--border))]/50 pt-1.5 flex justify-between items-center text-[8px] text-[hsl(var(--muted-foreground))]">
              <span>PDF Statement</span>
              <span className="text-amber-500 font-bold">Pending Parse</span>
            </div>
          </motion.div>

          {/* Document Sheet 2: Right Fanned Document (Extracted Excel Spreadsheet) */}
          <motion.div
            initial={{ rotate: 3, x: 25, y: 0 }}
            animate={isOpen ? { rotate: 12, x: 100, y: -50 } : { rotate: 3, x: 25, y: 0 }}
            transition={spring}
            className="absolute top-3 w-48 sm:w-56 h-48 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-3.5 shadow-lg z-10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[hsl(var(--border))]/60 pb-2 mb-2">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-bold">RECONCILED.XLSX</span>
                </div>
                <span className="text-[8px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">✓ 100%</span>
              </div>
              <div className="space-y-1.5 font-mono text-[9px]">
                <div className="flex justify-between text-[hsl(var(--muted-foreground))]">
                  <span>Beg. Balance:</span>
                  <span className="font-semibold text-[hsl(var(--foreground))]">$14,250.00</span>
                </div>
                <div className="flex justify-between text-emerald-500">
                  <span>Credits (14):</span>
                  <span>+$32,100.00</span>
                </div>
                <div className="flex justify-between text-rose-500">
                  <span>Debits (28):</span>
                  <span>-$18,099.20</span>
                </div>
              </div>
            </div>
            <div className="border-t border-[hsl(var(--border))]/50 pt-1.5 flex justify-between items-center text-[8px] text-emerald-600 dark:text-emerald-400 font-bold">
              <span>Ending Balance</span>
              <span>$28,250.80 ✓</span>
            </div>
          </motion.div>

          {/* Document Sheet 3: Center Featured Document (Accounting Web Connect / QBO) */}
          <motion.div
            initial={{ rotate: 0, x: 0, y: 0 }}
            animate={isOpen ? { rotate: 0, x: 0, y: -65 } : { rotate: 0, x: 0, y: 0 }}
            transition={{ ...spring, duration: 0.55 }}
            className="absolute top-1 w-52 sm:w-60 h-50 rounded-xl border border-[hsl(var(--primary))]/40 bg-[hsl(var(--card))] p-4 shadow-2xl z-20 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-2 mb-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="h-5 w-5 rounded-lg bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 flex items-center justify-center text-[hsl(var(--primary))] font-bold text-[10px]">
                    SE
                  </div>
                  <span className="text-xs font-bold text-[hsl(var(--foreground))]">Statement Extract</span>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                  Zero Variance
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[11px] font-medium text-[hsl(var(--foreground))]">
                  <span>54 Transactions</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">$0.00 Diff</span>
                </div>
                <p className="text-[10px] text-[hsl(var(--muted-foreground))] leading-tight pt-1">
                  Ready for 1-click import into QuickBooks, Xero, and Excel spreadsheets.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[hsl(var(--border))]/60 flex items-center justify-between text-[10px]">
              <span className="text-[hsl(var(--muted-foreground))]">Format: <strong className="text-[hsl(var(--foreground))]">QBO / CSV / Excel</strong></span>
              <span className="text-[hsl(var(--primary))] font-bold flex items-center gap-1">
                Verified ✓
              </span>
            </div>
          </motion.div>

          {/* Front Translucent Folder Pocket with Lip */}
          <motion.div 
            animate={{ rotateX: isOpen ? -25 : 0 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
            className="absolute -left-1 -right-1 -bottom-1 h-36 rounded-2xl border-t border-l border-r border-[hsl(var(--border))] bg-gradient-to-t from-[hsl(var(--card))] via-[hsl(var(--card))]/95 to-[hsl(var(--card))]/80 backdrop-blur-md z-30 flex items-end p-4 shadow-xl"
          >
            <div className="w-full flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))]">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                256-bit Encrypted Stream
              </span>
              <span className="font-semibold text-[hsl(var(--primary))] group-hover:underline">
                {isOpen ? "Release to fold ↑" : "Hover or click to inspect sheets →"}
              </span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Helper Prompt */}
      <div className="text-center mt-2">
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Interactive multi-bank document pipeline • Supports Chase, Wells Fargo, BofA, Citi, and 1,000+ institutions
        </p>
      </div>

    </div>
  );
}
