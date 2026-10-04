"use client";

import { useState } from "react";
import { Mail, MessageCircle, BookOpen, Calendar, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is the best way to convert PDF bank statements to Excel?",
    intro:
      "StatementExtract provides the most accurate way to convert PDF bank statements to Excel, CSV, and accounting formats. Unlike generic OCR tools, we specialize in financial documents.",
    points: [
      "Automatically extracts transactions, dates, descriptions, and balances.",
      "Converts PDF to Excel (.xlsx) and CSV with proper column formatting.",
      "Eliminates manual data entry for accountants and bookkeepers.",
    ],
  },
  {
    question: "Do you support converting scanned PDF statements and images?",
    intro:
      "Yes, our advanced Financial OCR technology handles scanned PDFs and image-based statements (JPG, PNG) with high precision.",
    points: [
      "Digitize paper statements and low-quality scans instantly.",
      "Corrects common OCR errors using context-aware financial logic.",
      "Perfect for converting older historical bank records to digital formats.",
    ],
  },
  {
    question: "How do I import bank statements into QuickBooks Online and Xero?",
    intro:
      "We generate files specifically formatted for direct import into QuickBooks Online, Xero, Sage, and FreshBooks.",
    points: [
      "Download .qbo files for one-click QuickBooks Web Connect import.",
      "Export Xero-compatible CSVs or OFX files for easy bank feed reconciliation.",
      "Assign categories automatically before exporting to save time on coding.",
    ],
  },
  {
    question: "Can I process bulk bank statements or use an API?",
    intro:
      "Yes, our platform is built for high-volume batch processing for firms and developers.",
    points: [
      "Upload hundreds of PDFs at once via our dashboard for bulk conversion.",
      "Use our Developer API to integrate bank statement extraction into your own app.",
      "Ideal for lenders, underwriting automation, and tax preparation firms.",
    ],
  },
  {
    question: "Which bank formats do you support?",
    intro:
      "We support thousands of global bank formats, including major institutions like Chase, Bank of America, Wells Fargo, and international banks.",
    points: [
      "Works with checking, savings, credit card, and load account statements.",
      "Handles multi-column layouts, widely varying tables, and multi-page documents.",
      "Support for multi-currency statements and complex date formats (DD/MM vs MM/DD).",
    ],
  },
  {
    question: "Is my financial data secure and private?",
    intro:
      "Security is our top priority. We operate with a strict Zero Data Retention policy.",
    points: [
      "We process files in memory and do not store your financial data after conversion.",
      "Zero database storage ensures your client's sensitive PII remains content.",
      "All data transfer is protected by bank-level AES-256 encryption and TLS 1.3.",
    ],
  },
  {
    question: "How accurate is the reconciliation and data validation?",
    intro:
      "We deliver industry-leading accuracy by mathematically validating every transaction against the statement period balances.",
    points: [
      "Automatic reconciliation checks opening balance + transactions = closing balance.",
      "Flags potential errors or missing pages for review.",
      "Provides a confidence score so you know exactly which data is verified.",
    ],
  },
  {
    question: "Is this tool suitable for lenders and credit underwriting?",
    intro:
      "Absolutely. Lenders and mortgage brokers use StatementExtract to speed up credit analysis and income verification.",
    points: [
      "Extract cash flow data, recurring deposits, and average daily balances.",
      "Detect non-sufficient funds (NSF) fees and other risk indicators.",
      "Turn months of applicant bank statements into a clean credit analysis spreadsheet.",
    ],
  },
  {
    question: "Can I convert checking, savings, and credit card statements?",
    intro:
      "Yes, our AI understands the unique layouts of checking accounts, savings summaries, and detailed credit card activity logs.",
    points: [
      "Separates deposits, withdrawals, and fees into distinct columns.",
      "Standardizes merchant names and clean transaction descriptions.",
      "Handles combined statements with multiple accounts in a single PDF.",
    ],
  },
  {
    question: "Is there a free trial or free PDF to Excel converter?",
    intro:
      "Yes, we offer a generous free tier that allows you to convert PDF bank statements to Excel and CSV for free.",
    points: [
      "No credit card required to start converting.",
      "Get full access to all export formats (QBO, Xero, Excel) during the trial.",
      "Simple, transparent pricing for growing accounting firms.",
    ],
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative bg-gradient-to-b from-[hsl(var(--muted))]/30 to-[hsl(var(--background))] py-12 px-6 md:py-20 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Themed Grid Lines */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `linear-gradient(to right, rgb(6 182 212 / 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgb(6 182 212 / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl z-10">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)] items-start">
          <div className="space-y-5 animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-medium text-cyan-500">
              <span>Got more questions?</span>
            </div>
            <h2 id="faq-heading" className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-4xl">
              Need further <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">assistance</span>?
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-base md:text-lg max-w-xl">
              Got more questions? Need further assistance? Contact us at
              <span className="font-medium"> support@statementextract.com</span>, check out our
              documentation or book a demo.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="mailto:support@statementextract.com"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-cyan-600 hover:shadow-lg transition-all"
              >
                <Mail className="h-4 w-4" />
                Contact us
              </a>
              <a
                href="/blogs"
                className="inline-flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:border-cyan-500/50 hover:bg-[hsl(var(--muted))] transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Read documentation & guides
              </a>
              <a
                href="mailto:support@statementextract.com?subject=Book%20a%20demo%20of%20StatementExtract"
                className="inline-flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:border-cyan-500/50 hover:bg-[hsl(var(--muted))] transition-colors"
              >
                <Calendar className="h-4 w-4" />
                Book a demo
              </a>
            </div>

            <p className="text-xs text-[hsl(var(--muted-foreground))] pt-2">
              We typically respond within 24 hours on business days.
            </p>
          </div>

          <div className="space-y-3 animate-slide-up">
            {faqs.map((item, index) => (
              <button
                key={item.question}
                type="button"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                aria-expanded={openIndex === index}
                className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-left text-sm md:text-base text-[hsl(var(--foreground))] hover:border-cyan-500/50 hover:bg-[hsl(var(--muted))]/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10 text-[0.7rem] font-medium text-cyan-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <MessageCircle className="h-4 w-4 text-cyan-500" />
                </div>
                {openIndex === index && (
                  <div className="mt-2 space-y-2 text-xs md:text-sm text-[hsl(var(--muted-foreground))]">
                    <p>{item.intro}</p>
                    <ul className="ml-5 list-disc space-y-1">
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
