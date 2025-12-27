"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";

export default function AboutPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-6 py-12 space-y-16">
      {/* Hero / Pricing CTA */}
      <section className="grid gap-10 md:grid-cols-[1.6fr,1fr] items-start">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-[hsl(var(--muted-foreground))] mb-3">
            ABOUT
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[hsl(var(--foreground))] mb-4">
            Turning messy bank statements into clean, reliable data.
          </h1>
          <p className="text-sm md:text-base text-[hsl(var(--muted-foreground))] max-w-xl mb-4">
            Statement Extract is built to simplify bookkeeping and financial data processing for small businesses, accountants, and finance professionals worldwide. Our focus is accuracy, privacy, and automation—reducing manual work while keeping users in control of their data.
          </p>
          <p className="text-sm md:text-base text-[hsl(var(--muted-foreground))] max-w-xl">
            We help founders, finance teams, and operators convert PDF bank statements into structured CSV and Excel files in minutes—without manual copy-paste, broken formulas, or custom scripts.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="shadow-md">
              <Link href="/convert-bank-statement-to-csv-excel">
                Get started for free
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[hsl(var(--border))] text-[hsl(var(--foreground))]"
            >
              <Link href="#about-contact">
                Request a demo
              </Link>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3">
            Pricing
          </h2>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mb-4">
            Start with our free tools while you explore Statement Extractor. When you are ready,
            you can upgrade to unlock higher volumes, team access, and priority support.
          </p>
          <ul className="space-y-2 text-xs text-[hsl(var(--muted-foreground))]">
            <li>
              Fair, usage-based pricing as you grow.
            </li>
            <li>
              No long-term contracts or implementation fees.
            </li>
            <li>
              Built for early-stage teams that want to move quickly.
            </li>
          </ul>
        </div>
      </section>

      {/* What we do */}
      <section className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-[hsl(var(--foreground))] mb-3">
            What we do
          </h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
            Statement Extractor is an AI-assisted workflow for document-heavy finance operations.
            We focus exclusively on financial documents, turning unstructured PDFs into clean,
            machine-readable tables you can trust.
          </p>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
            Instead of manually keying in transactions or maintaining fragile spreadsheet macros,
            you upload your statements, review detected data, and export directly to CSV, Excel,
            or QuickBooks (QBO) format. Behind the scenes, we combine parsing rules, document templates,
            and intelligent checks to keep your output consistent.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-2 uppercase tracking-wide">
              Our vision
            </h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              We believe financial data access should be instant and error-free. Any company,
              regardless of size, should be able to plug in document automation as easily as they
              plug in a bank feed.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-2 uppercase tracking-wide">
              How we build
            </h3>
            <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
              <li>
                Start narrow: bank statements first, then credit card and loan documents.
              </li>
              <li>
                Ship fast: small, opinionated workflows instead of huge, complex ERP implementations.
              </li>
              <li>
                Stay transparent: clear exports, logs, and checks so you always know where
                numbers came from.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Where Statement Extractor fits */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-[hsl(var(--foreground))] mb-1">
              Where Statement Extractor fits
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-xl">
              Whether you are cleaning up historical statements or building a repeatable process for
              incoming documents, Statement Extractor sits between your PDFs and your accounting software.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 text-sm">
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-3">
              SUPPORTED DOCUMENTS
            </h3>
            <ul className="space-y-1 text-[hsl(var(--muted-foreground))]">
              <li>Bank Statements (PDF)</li>
              <li>Credit Card Statements</li>
              <li className="text-xs text-[hsl(var(--primary))] pt-1">Detailed transaction extraction</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-3">
              EXPORT FORMATS
            </h3>
            <ul className="space-y-1 text-[hsl(var(--muted-foreground))]">
              <li>Excel (.xlsx)</li>
              <li>CSV (.csv)</li>
              <li>QuickBooks Online</li>
              <li>Xero</li>
              <li>Tally</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-3">
              PERFECT FOR
            </h3>
            <ul className="space-y-1 text-[hsl(var(--muted-foreground))]">
              <li>Monthly Bookkeeping</li>
              <li>Catch-up Accounting</li>
              <li>Reconciliation</li>
              <li>Audit Trails</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section
        id="about-contact"
        className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-[hsl(var(--foreground))] mb-2">
              Have more questions?
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-xl">
              Share a bit about your documents, current workflow, or what you are trying to
              automate. We'll follow up with ideas, next steps, or a short walkthrough.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <span className="font-medium text-[hsl(var(--foreground))]">Talk to an expert</span>
            <span>Get a free 15-minute conversation about your statement workflows.</span>
            <span className="mt-2">
              Email us directly:{" "}
              <a href="mailto:support@statementextract.com" className="text-[hsl(var(--primary))] hover:underline font-medium">
                support@statementextract.com
              </a>
            </span>
          </div>
        </div>

        <ContactForm />
      </section>
    </div>
  );
}
