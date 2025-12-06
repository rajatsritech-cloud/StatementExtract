"use client";

import { useState } from "react";
import { Mail, MessageCircle, BookOpen, Calendar, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is StatementExtract and what problem does it solve?",
    intro:
      "StatementExtract focuses on turning complex business documents—like invoices, contracts, healthcare records, and bank statements—into clean, structured data you can actually use.",
    points: [
      "Upload PDFs or images and get ready-to-use CSV or Excel instead of manual copy-paste.",
      "Designed for workflows like invoice processing, contract review, healthcare reporting, and financial analysis.",
      "Eliminates human error and frees your team from repetitive data entry tasks.",
    ],
  },
  {
    question: "How is StatementExtract different from standard OCR tools?",
    intro:
      "Standard OCR only gives you plain text; StatementExtract understands the structure and meaning of financial data.",
    points: [
      "Built specifically for high-value documents like invoices, contracts, healthcare records, and bank statements, not generic images.",
      "Identifies the right fields for each document type—line items, key terms, patient details, or transactions—automatically.",
      "Delivers structured outputs you can filter and analyze immediately, greatly reducing the amount of custom parsing you need to build.",
    ],
  },
  {
    question: "Which documents and formats do you support?",
    intro:
      "StatementExtract is designed to work across many document types and layouts without manual template setup.",
    points: [
      "Supports digital PDFs, scanned PDFs, and images (JPG, PNG).",
      "Handles invoices, contracts, healthcare records, bank statements, and other financial documents.",
      "Intelligent Document Processing adapts to new layouts so you don’t have to maintain rigid templates for every format.",
    ],
  },
  {
    question: "What data can you extract from invoices, contracts, healthcare records, and bank statements?",
    intro:
      "We focus on extracting the fields that actually power automation and decision making across your documents.",
    points: [
      "Invoice processing: line items, totals, taxes, dates, and vendor information across many formats.",
      "Contract analysis: key terms, parties, dates, renewal details, and important clauses from legal documents.",
      "Healthcare records: patient details, diagnoses, and treatment information while supporting strict privacy requirements.",
      "Bank statements: account details, period, balances, and every transaction line with date, description, and amount.",
    ],
  },
  {
    question: "How accurate is the Intelligent Document Processing engine?",
    intro:
      "The extraction pipeline is tuned for financial data and built to minimize silent errors.",
    points: [
      "Targets industry-leading accuracy on well-structured statements.",
      "Applies validation checks across balances and transaction totals to catch anomalies.",
      "Flags suspicious or low-confidence areas instead of guessing and polluting your data.",
    ],
  },
  {
    question: "Do I need templates or training data to get started?",
    intro:
      "You can start using StatementExtract without upfront configuration or labeled datasets.",
    points: [
      "No need to build or maintain per-bank templates.",
      "Upload a statement or call the API and receive structured results immediately.",
      "Intelligent Document Processing models generalize across many formats for you.",
    ],
  },
  {
    question: "How does StatementExtract keep my financial data secure?",
    intro:
      "Bank statements are sensitive, so the platform is designed with security as a core requirement, not an afterthought.",
    points: [
      "Data is encrypted in transit and at rest throughout processing.",
      "Access is restricted to only the services that need it, with strong logging and monitoring.",
      "Your private documents are not used to train generic public models.",
    ],
  },
  {
    question: "How can I integrate StatementExtract into my existing systems?",
    intro:
      "You can start simple and grow into deeper automation as your volumes increase.",
    points: [
      "Use the web interface to upload statements and export CSV, Excel, or JSON.",
      "Integrate via REST API and webhooks to automate uploads and retrieval of results.",
      "Feed outputs directly into accounting tools, BI dashboards, or internal databases.",
    ],
  },
  {
    question: "Can StatementExtract handle invoices, contracts, healthcare records, and bank statements?",
    intro:
      "Yes—StatementExtract is built to support multiple high-value use cases, not just one document type.",
    points: [
      "Process invoices, contracts, healthcare records, bank statements, and related financial paperwork with the same pipeline.",
      "Configure extraction to focus on fields that matter in each use case—line items, clauses, patient info, or transactions.",
      "Keep all of this data flowing into a single, consistent structure for downstream tools.",
    ],
  },
  {
    question: "What does the pricing and free usage look like?",
    intro:
      "StatementExtract is designed to be easy to try and scale without upfront commitment.",
    points: [
      "Start with a generous free tier so you can test on real statements without a credit card.",
      "Move to a paid plan as your page volumes and integration needs grow.",
      "Work with our team to pick a usage-based model that fits your business.",
    ],
  },
  {
    question: "How fast is processing and will it scale with my volume?",
    intro:
      "The platform is built so that individual users get fast responses even when volumes are high.",
    points: [
      "Most statements are processed in a few seconds from upload to structured data.",
      "The backend pipeline scales to handle spikes and large batches without blocking others.",
      "Whether you upload one PDF or thousands via API, the experience stays responsive.",
    ],
  },
  {
    question: "What happens if the engine is unsure or something looks wrong?",
    intro:
      "We prefer explicit handling of edge cases rather than letting bad data slip into your systems.",
    points: [
      "Low-confidence text or confusing layouts can be flagged for review.",
      "Balance and total checks help surface mismatches before they impact reporting.",
      "You can combine our confidence signals with your own business rules to decide when to trust or escalate a document.",
    ],
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative bg-[hsl(var(--background))] py-12 px-6 md:py-20 border-y border-[hsl(var(--border))]">
      <div className="absolute inset-0 bg-grid-pattern-3 bg-size-40" />

      <div className="relative mx-auto max-w-7xl z-10">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)] items-start">
          <div className="space-y-5 animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))]/10 px-4 py-2 text-xs font-medium text-[hsl(var(--primary))]">
              <HelpCircle className="h-4 w-4" />
              <span>Got more questions?</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))]">
              Need further assistance with Statement Extract?
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-base md:text-lg max-w-xl">
              Got more questions? Need further assistance? Contact us at
              <span className="font-medium"> contact@statementextract.com</span>, check out our
              documentation or book a demo.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="mailto:contact@statementextract.com"
                className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] shadow-md hover:shadow-lg transition-shadow"
              >
                <Mail className="h-4 w-4" />
                Contact us
              </a>
              <a
                href="/blogs"
                className="inline-flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--muted))] transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Read documentation & guides
              </a>
              <a
                href="mailto:contact@statementextract.com?subject=Book%20a%20demo%20of%20StatementExtract"
                className="inline-flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary))]/60 hover:bg-[hsl(var(--muted))] transition-colors"
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
                className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-left text-sm md:text-base text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--muted))]/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[0.7rem] font-medium text-[hsl(var(--primary))]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <MessageCircle className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
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
