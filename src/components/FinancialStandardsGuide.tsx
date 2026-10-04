import Link from "next/link";
import { 
  FileCode, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  FileSpreadsheet, 
  Database, 
  Calculator,
  Cpu
} from "lucide-react";

export function FinancialStandardsGuide() {
  const formats = [
    {
      format: "CSV / Excel (.xlsx)",
      software: "Universal, Excel, Google Sheets, PowerBI",
      spec: "RFC 4180 / OpenXML standard",
      useCase: "General ledger auditing, custom financial models, ad-hoc pivot tables.",
      badge: "Universal Standard"
    },
    {
      format: "QuickBooks QBO (Web Connect)",
      software: "QuickBooks Online, QuickBooks Desktop, Enterprise",
      spec: "OFX 1.02 SGML specification with Intuit banking extensions",
      useCase: "Direct one-click bank feed import without manual column mapping.",
      badge: "Accounting Native"
    },
    {
      format: "OFX (Open Financial Exchange)",
      software: "Xero, Sage 50/Cloud, FreshBooks, FreeAgent",
      spec: "OFX 2.11 XML / SGML banking standard",
      useCase: "Cross-platform bank reconciliation with cryptographic transaction tracking.",
      badge: "Global Standard"
    },
    {
      format: "SWIFT MT940 / MT942",
      software: "SAP, Oracle NetSuite, Microsoft Dynamics 365",
      spec: "ISO 15022 SWIFT Customer Statement Message",
      useCase: "End-of-day commercial banking statements for multi-currency corporate treasuries.",
      badge: "Enterprise & Banking"
    },
    {
      format: "BAI2 Format",
      software: "Treasury Management Systems (TMS), Kyriba, GTreasury",
      spec: "Bank Administration Institute Cash Management Standard",
      useCase: "Intra-day and end-of-day treasury balance reporting across commercial accounts.",
      badge: "Treasury Standard"
    }
  ];

  const pipelineSteps = [
    {
      step: "01",
      title: "Document Ingestion & Vector Stream Decomposition",
      desc: "Digital PDF bank statements consist of nested content streams, fonts, and vector operators. Unlike flat images, vector PDFs contain selectable text objects positioned in Cartesian coordinates (x, y). Our engine extracts bounding boxes and text sequences directly from the PDF DOM without quality loss, bypassing traditional rasterization artifacts."
    },
    {
      step: "02",
      title: "OCR & Vision Fallback for Scanned Documentation",
      desc: "For scanned or physical photocopied bank statements, the engine automatically routes pages to high-resolution adaptive binarization pipelines. Noise reduction, skew correction (deskewing up to 45°), and adaptive thresholding ensure character-level accuracy even with low-contrast dot-matrix or thermal bank receipts."
    },
    {
      step: "03",
      title: "Semantic Table Reconstruction & Narrative Assembly",
      desc: "Bank statements frequently break transactions across multiple lines, wrapping merchant descriptions, wire transfer references, and terminal IDs beneath the date. Our layout engine groups sibling bounding boxes, correlates debit and credit columns, and reassembles fragmented multiline descriptions into clean, atomic transaction records."
    },
    {
      step: "04",
      title: "Mathematical Proof & Running Balance Auditing",
      desc: "Every extracted transaction is verified against a strict accounting reconciliation formula: Opening Balance + Σ(Credits) - Σ(Debits) == Closing Balance. If a discrepancy occurs (due to hidden fees, interest charges, or scan occlusions), the engine isolates the exact row causing the variance for review."
    }
  ];

  return (
    <section 
      id="technical-standards" 
      aria-labelledby="technical-standards-heading" 
      className="relative bg-[hsl(var(--background))] py-16 md:py-24 border-t border-[hsl(var(--border))]/50"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-4 py-1.5 mb-6">
            <Cpu className="h-4 w-4 text-[hsl(var(--primary))]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--primary))]">
              Technical Architecture & Standards
            </span>
          </div>
          <h2 id="technical-standards-heading" className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-4xl md:text-5xl">
            How Bank Statement Extraction Works
          </h2>
          <p className="mt-4 text-base md:text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
            A comprehensive technical breakdown of financial document parsing, data reconciliation, 
            and accounting interchange standards for bookkeepers, accountants, and software engineers.
          </p>
        </div>

        {/* 4-Stage Pipeline Deep-Dive */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {pipelineSteps.map((step) => (
            <div 
              key={step.step}
              className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 shadow-sm transition-all hover:border-[hsl(var(--primary))]/40"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/10 text-sm font-mono font-bold text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20">
                  {step.step}
                </span>
                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] leading-snug">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Financial Data Interchange Formats Matrix */}
        <div className="mt-20">
          <div className="max-w-2xl mb-8">
            <h3 className="text-2xl font-bold text-[hsl(var(--foreground))]">
              Financial Interchange Formats Supported
            </h3>
            <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
              Converting bank PDFs into structured files requires adherence to strict banking schemas. 
              Here is how our output formats integrate with global accounting software.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
            <table className="min-w-full divide-y divide-[hsl(var(--border))] text-left text-sm">
              <thead className="bg-[hsl(var(--muted))]/50">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold text-[hsl(var(--foreground))]">
                    Format & Specification
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-[hsl(var(--foreground))]">
                    Compatible Software
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-[hsl(var(--foreground))]">
                    Technical Standard
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-[hsl(var(--foreground))]">
                    Primary Financial Application
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--border))]">
                {formats.map((f, idx) => (
                  <tr key={idx} className="hover:bg-[hsl(var(--muted))]/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-[hsl(var(--foreground))]">{f.format}</div>
                      <span className="inline-block mt-1 text-[11px] font-mono px-2 py-0.5 rounded bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20">
                        {f.badge}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-[hsl(var(--muted-foreground))]">
                      {f.software}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-[hsl(var(--muted-foreground))]">
                      {f.spec}
                    </td>
                    <td className="px-6 py-4 text-xs text-[hsl(var(--muted-foreground))]">
                      {f.useCase}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical Principles & Audit Trail */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 mb-6 border border-emerald-500/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-3">
              Zero-Knowledge Client Processing
            </h4>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              Standard format conversions (CSV to QBO, OFX to Excel, PDF manipulation) execute directly inside 
              your local browser environment using WebAssembly. Your confidential transactions and banking 
              credentials never traverse external servers or persistent databases.
            </p>
          </div>

          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 mb-6 border border-indigo-500/20">
              <Calculator className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-3">
              Transaction Integrity Verification
            </h4>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              Our extraction engine includes automated checksum verification. Every row is analyzed 
              for ISO date normalization (YYYY-MM-DD), floating-point precision rounding (cents accuracy), 
              and debit/credit orientation according to double-entry accounting standards.
            </p>
          </div>

          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 mb-6 border border-amber-500/20">
              <Database className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-3">
              Intelligent Deduplication (<span className="font-mono text-xs">FITID</span>)
            </h4>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              When converting statements to QuickBooks QBO or Xero OFX, duplicate records corrupt general ledgers. 
              Our generator derives unique cryptographic financial transaction identifiers (<code className="font-mono text-xs">&lt;FITID&gt;</code>) 
              from transaction timestamps, amounts, and descriptions to ensure clean imports.
            </p>
          </div>
        </div>

        {/* Call to Knowledge Base */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/5 p-8">
          <div>
            <h4 className="text-lg font-semibold text-[hsl(var(--foreground))]">
              Need detailed guides for specific banks and file formats?
            </h4>
            <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
              Explore our technical guides on Chase, Bank of America, Wells Fargo, SWIFT MT940, and QuickBooks reconciliation.
            </p>
          </div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-6 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] shadow-sm hover:opacity-90 transition-opacity shrink-0"
          >
            Visit Knowledge Base
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
