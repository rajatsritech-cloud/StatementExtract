"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { 
  Building2, 
  Calculator, 
  FileSpreadsheet, 
  ShieldCheck, 
  Receipt, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Database,
  Lock,
  Globe,
  Sparkles,
  Search,
  Check,
  FileText
} from "lucide-react";
import Link from "next/link";

interface BankInfo {
  name: string;
  tag: string;
  dateFmt: string;
  checks: string;
  precision: string;
  sampleDescription: string;
}

const BANKS: BankInfo[] = [
  { 
    name: "JPMorgan Chase", 
    tag: "Chase Commercial & Retail", 
    dateFmt: "MM/DD/YYYY (Standard US)", 
    checks: "3-column check register transposed to sequential rows", 
    precision: "99.94%",
    sampleDescription: "CHASE BUS CHECKING ...8841 - AUTOMATED CLEARING HOUSE ACH"
  },
  { 
    name: "Bank of America", 
    tag: "BofA Business Advantage", 
    dateFmt: "MM/DD/YYYY (Interleaved)", 
    checks: "Deposits, withdrawals, and checks unified chronologically", 
    precision: "99.88%",
    sampleDescription: "BANK OF AMERICA BUSINESS DEPOSIT TRANSFER VIA ZELLE"
  },
  { 
    name: "Wells Fargo", 
    tag: "Wells Fargo Treasury", 
    dateFmt: "MM/DD (Year auto-normalized)", 
    checks: "Back-of-statement check image thumbnails auto-filtered", 
    precision: "99.91%",
    sampleDescription: "WELLS FARGO WIRE INCOMING FED REF# 202603150041"
  },
  { 
    name: "Citibank", 
    tag: "CitiDirect Commercial", 
    dateFmt: "ISO 8601 YYYY-MM-DD", 
    checks: "Multi-currency wire reference codes & IMAD numbers isolated", 
    precision: "99.95%",
    sampleDescription: "CITIBANK NA NEW YORK GLOBAL TREASURY TRANSFER USD/EUR"
  },
];

type FeatureTab = "banks" | "math" | "formats" | "security";

export function BentoFeatures() {
  const [activeTab, setActiveTab] = useState<FeatureTab>("banks");
  const [selectedBank, setSelectedBank] = useState<BankInfo>(BANKS[0]);

  return (
    <section 
      id="bento-features" 
      aria-labelledby="bento-features-heading" 
      className="relative bg-[hsl(var(--background))] py-16 md:py-24 border-t border-[hsl(var(--border))]/60 overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-4 py-1.5 mb-4">
            <Layers className="h-4 w-4 text-[hsl(var(--primary))]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--primary))]">
              Core Engine Architecture
            </span>
          </div>
          <h2 id="bento-features-heading" className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-4xl md:text-5xl">
            Engineered for Accounting Accuracy
          </h2>
          <p className="mt-4 text-base md:text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
            Zero templates. Zero manual transcription. Process bank statements, invoices, and financial records with mathematical verification.
          </p>
        </div>

        {/* Featured Bento Workspace Card (Full Width) */}
        <div className="w-full rounded-2xl md:rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-xl overflow-hidden mb-8 transition-all">
          
          {/* Workspace Top Bar (macOS Window Chrome) */}
          <div className="flex items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40 px-4 sm:px-6 py-3.5">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-rose-500/80" />
              <div className="h-3 w-3 rounded-full bg-amber-500/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 font-mono text-xs text-[hsl(var(--muted-foreground))] hidden sm:inline-block">
                statement-extract / document-engine v2.6
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                <Check className="h-3 w-3" />
                Double-Entry Verified
              </span>
            </div>
          </div>

          {/* Interactive Workspace Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            
            {/* Left Sidebar Navigation */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[hsl(var(--border))] p-4 sm:p-6 bg-[hsl(var(--card))] flex flex-col justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-3 px-2">
                  Interactive Features
                </p>

                <LayoutGroup>
                  {[
                    { id: "banks" as FeatureTab, label: "Multi-Bank Parser", desc: "1,000+ banks with zero templates", icon: Building2 },
                    { id: "math" as FeatureTab, label: "Automated Balance Audit", desc: "Starting + Credits - Debits = Ending", icon: Calculator },
                    { id: "formats" as FeatureTab, label: "Native Accounting Exports", desc: "QBO, Xero CSV, MT940, Excel .xlsx", icon: FileSpreadsheet },
                    { id: "security" as FeatureTab, label: "Zero Data Retention", desc: "Local browser processing & TLS 1.3", icon: ShieldCheck },
                  ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`group relative flex w-full items-start gap-3 rounded-xl p-3 text-left transition-all cursor-pointer ${
                          isActive
                            ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--foreground))]"
                            : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/50 hover:text-[hsl(var(--foreground))]"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="bento-active-pill"
                            className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[hsl(var(--primary))]"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                          />
                        )}
                        <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                          isActive
                            ? "border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))] text-white shadow-sm"
                            : "border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))]"
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-semibold truncate ${isActive ? "text-[hsl(var(--foreground))]" : ""}`}>
                            {tab.label}
                          </p>
                          <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">
                            {tab.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </LayoutGroup>
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-4 border-t border-[hsl(var(--border))]/60">
                <Link
                  href="/convert-bank-statement-to-csv-excel"
                  className="flex items-center justify-between rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
                >
                  <span>Open Free Converter</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Stage: Dynamic Interactive Content */}
            <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-center bg-[hsl(var(--background))]">
              <AnimatePresence mode="wait">
                
                {/* Stage 1: Multi-Bank Selector */}
                {activeTab === "banks" && (
                  <motion.div
                    key="tab-banks"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-xs font-mono font-medium text-[hsl(var(--primary))] uppercase tracking-wider">
                        Zero-Template Normalization
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[hsl(var(--foreground))] mt-1">
                        Adaptive Document DOM Parsing
                      </h3>
                      <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2 max-w-2xl leading-relaxed">
                        Traditional OCR breaks when a bank alters statement margins or header formats. Our neural parser identifies transaction boundaries, balances, and check tables dynamically.
                      </p>
                    </div>

                    {/* Bank Selector Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {BANKS.map((b) => (
                        <button
                          key={b.name}
                          onClick={() => setSelectedBank(b)}
                          className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                            selectedBank.name === b.name
                              ? "bg-[hsl(var(--primary))] text-white shadow-md"
                              : "bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary))]/40"
                          }`}
                        >
                          {b.name}
                        </button>
                      ))}
                    </div>

                    {/* Active Bank Data Preview */}
                    <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-sm space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[hsl(var(--border))]/60 pb-3">
                        <div>
                          <p className="text-sm font-bold text-[hsl(var(--foreground))]">{selectedBank.tag}</p>
                          <p className="text-xs font-mono text-[hsl(var(--muted-foreground))]">{selectedBank.sampleDescription}</p>
                        </div>
                        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {selectedBank.precision} Accuracy
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-[hsl(var(--muted-foreground))] block">Date Normalization:</span>
                          <span className="font-semibold text-[hsl(var(--foreground))] font-mono mt-0.5 block">{selectedBank.dateFmt}</span>
                        </div>
                        <div>
                          <span className="text-[hsl(var(--muted-foreground))] block">Check Handling:</span>
                          <span className="font-semibold text-[hsl(var(--foreground))] mt-0.5 block">{selectedBank.checks}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Stage 2: Mathematical Balance Audit */}
                {activeTab === "math" && (
                  <motion.div
                    key="tab-math"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-xs font-mono font-medium text-[hsl(var(--primary))] uppercase tracking-wider">
                        Double-Entry Integrity
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[hsl(var(--foreground))] mt-1">
                        Automated Mathematical Verification
                      </h3>
                      <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2 max-w-2xl leading-relaxed">
                        Every single extracted ledger is verified against the double-entry accounting identity. If a single withdrawal or decimal point is missing, the variance flag triggers immediately.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-sm space-y-3 font-mono text-xs sm:text-sm">
                      <div className="flex justify-between items-center py-1.5 border-b border-[hsl(var(--border))]/50">
                        <span className="text-[hsl(var(--muted-foreground))]">Beginning Statement Balance:</span>
                        <span className="font-semibold text-[hsl(var(--foreground))]">$14,250.00</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 text-emerald-600 dark:text-emerald-400">
                        <span>(+) Total Deposits &amp; Credits:</span>
                        <span className="font-bold">+$28,400.00</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 text-rose-600 dark:text-rose-400 border-b border-[hsl(var(--border))]/50">
                        <span>(-) Total Withdrawals &amp; Debits:</span>
                        <span className="font-bold">-$12,070.00</span>
                      </div>
                      <div className="flex justify-between items-center py-2 text-sm font-bold text-[hsl(var(--foreground))]">
                        <span>Reconciled Ending Balance:</span>
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                          $30,580.00
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                      </div>
                      <div className="mt-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-2.5 text-center text-xs text-emerald-600 dark:text-emerald-400 font-sans font-medium">
                        ✓ Mathematical Variance: $0.00 — Zero Missing Rows
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Stage 3: Accounting Native Exports */}
                {activeTab === "formats" && (
                  <motion.div
                    key="tab-formats"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-xs font-mono font-medium text-[hsl(var(--primary))] uppercase tracking-wider">
                        Direct Software Ingestion
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[hsl(var(--foreground))] mt-1">
                        Native Accounting Integrations
                      </h3>
                      <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2 max-w-2xl leading-relaxed">
                        Export directly to your general ledger software without manual column remapping or Excel formula repairs.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 space-y-1.5">
                        <div className="flex items-center gap-2 text-sm font-bold text-[hsl(var(--foreground))]">
                          <CheckCircle2 className="h-4 w-4 text-[hsl(var(--primary))]" />
                          <span>QuickBooks .QBO</span>
                        </div>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">
                          Web Connect format with unique &lt;FITID&gt; tags to prevent duplicate transaction imports.
                        </p>
                      </div>

                      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 space-y-1.5">
                        <div className="flex items-center gap-2 text-sm font-bold text-[hsl(var(--foreground))]">
                          <CheckCircle2 className="h-4 w-4 text-[hsl(var(--primary))]" />
                          <span>Xero Standard CSV</span>
                        </div>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">
                          Formatted with separate Debit/Credit columns and ISO dates for 1-click bank feed matching.
                        </p>
                      </div>

                      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 space-y-1.5">
                        <div className="flex items-center gap-2 text-sm font-bold text-[hsl(var(--foreground))]">
                          <CheckCircle2 className="h-4 w-4 text-[hsl(var(--primary))]" />
                          <span>SWIFT MT940 / BAI2</span>
                        </div>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">
                          Standard corporate treasury messages for SAP S/4HANA, NetSuite, and Sage Intacct.
                        </p>
                      </div>

                      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 space-y-1.5">
                        <div className="flex items-center gap-2 text-sm font-bold text-[hsl(var(--foreground))]">
                          <CheckCircle2 className="h-4 w-4 text-[hsl(var(--primary))]" />
                          <span>Formatted Excel (.xlsx)</span>
                        </div>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">
                          Clean numerical values with live `=SUM()` balance formulas ready for CPA working papers.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Stage 4: Zero Data Retention Security */}
                {activeTab === "security" && (
                  <motion.div
                    key="tab-security"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        Enterprise Privacy
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[hsl(var(--foreground))] mt-1">
                        Zero Data Retention Architecture
                      </h3>
                      <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2 max-w-2xl leading-relaxed">
                        Financial data confidentiality is paramount. Our extraction engine runs inside isolated ephemeral memory or locally in your browser via WebAssembly.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 space-y-3 font-mono text-xs">
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <Lock className="h-4 w-4" />
                        <span>Security &amp; Compliance Specifications:</span>
                      </div>
                      <div className="space-y-2 text-[hsl(var(--muted-foreground))] pt-1">
                        <p>✓ 256-Bit TLS 1.3 encrypted data in transit</p>
                        <p>✓ Ephemeral memory execution with zero database caching</p>
                        <p>✓ Automatic immediate file purge post-download</p>
                        <p>✓ No AI model retraining on client financial statements</p>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Supporting 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Supporting Card 1: Invoices & Receipts */}
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm flex flex-col justify-between hover:border-[hsl(var(--primary))]/40 transition-colors">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 mb-4">
                <Receipt className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-2">
                Invoice &amp; Receipt Parser
              </h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">
                Eliminate manual accounts payable entry. Extract line-item product descriptions, sales tax rates (GST/VAT), vendor details, and totals into clean spreadsheets.
              </p>
            </div>
            <Link 
              href="/convert-invoice-to-excel-csv" 
              className="text-xs font-semibold text-[hsl(var(--primary))] hover:underline inline-flex items-center gap-1"
            >
              Try Invoice Converter →
            </Link>
          </div>

          {/* Supporting Card 2: Scanned Document OCR */}
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm flex flex-col justify-between hover:border-[hsl(var(--primary))]/40 transition-colors">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-4">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-2">
                Scanned PDF Deskewing &amp; OCR
              </h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">
                Handles photocopies, mobile snapshots, and skewed scans. Applies adaptive binarization, angle correction, and deep learning table extraction.
              </p>
            </div>
            <Link 
              href="/blogs/convert-scanned-pdf-to-excel-ocr-guide" 
              className="text-xs font-semibold text-[hsl(var(--primary))] hover:underline inline-flex items-center gap-1"
            >
              Read OCR Technical Guide →
            </Link>
          </div>

          {/* Supporting Card 3: Audit Trail & Underwriting */}
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm flex flex-col justify-between hover:border-[hsl(var(--primary))]/40 transition-colors">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-2">
                Loan Underwriting &amp; Audits
              </h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">
                Accelerate 12–24 month Non-QM bank statement loan analysis. Detect large deposits, verify cash flow averages, and identify NSF overdraft patterns.
              </p>
            </div>
            <Link 
              href="/blogs/bank-statement-extraction-for-mortgage-underwriters-guide" 
              className="text-xs font-semibold text-[hsl(var(--primary))] hover:underline inline-flex items-center gap-1"
            >
              Explore Mortgage Guide →
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
