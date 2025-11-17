import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
          <p className="text-sm md:text-base text-[hsl(var(--muted-foreground))] max-w-xl">
            Statement Extractor helps founders, finance teams, and operators convert PDF bank
            statements into structured CSV and Excel files in minutes without manual copy-paste,
            broken formulas, or custom scripts.
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
            We focus first on bank statements and related financial documents, turning unstructured
            PDFs into clean, machine-readable tables you can trust.
          </p>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
            Instead of manually keying in transactions or maintaining fragile spreadsheet macros,
            you upload your statements, review detected data, and export directly to CSV or Excel.
            Behind the scenes, we combine parsing rules, document templates, and intelligent checks
            to keep your output consistent.
          </p>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Over time, our goal is to support more financial documentsfrom invoices and receipts
            to account summaries and KYC paperworkso that finance and operations teams can run
            on accurate data instead of manual admin.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-2 uppercase tracking-wide">
              Our vision
            </h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              We believe document understanding should be as standard as spreadsheets. Any company,
              regardless of size, should be able to plug in document automation as easily as they
              plug in a database.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-2 uppercase tracking-wide">
              How we build
            </h3>
            <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
              <li>
                Start narrow: bank statements first, then expand to adjacent financial documents.
              </li>
              <li>
                Ship fast: small, opinionated workflows instead of huge, months-long projects.
              </li>
              <li>
                Stay transparent: clear exports, logs, and checks so you always know where
                numbers came from.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-2 uppercase tracking-wide">
              Early-stage, customer-led
            </h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Statement Extractor is in its early chapters. We work closely with a small group of
              teams to refine the product, add new banks and formats, and prioritize the workflows
              that remove the most manual effort.
            </p>
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
              incoming documents, Statement Extractor sits between your PDFs and the tools where you
              actually do your work.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-sm">
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-3">
              DATA CAPTURE
            </h3>
            <ul className="space-y-1 text-[hsl(var(--muted-foreground))]">
              <li>Invoices</li>
              <li>Purchase Orders</li>
              <li>ID Cards</li>
              <li>Receipts</li>
              <li>Bills of Lading</li>
              <li>Passports</li>
              <li>Bank Statements</li>
              <li className="text-xs text-[hsl(var(--primary))]">More formats coming soon</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-3">
              WORKFLOWS
            </h3>
            <ul className="space-y-1 text-[hsl(var(--muted-foreground))]">
              <li>Document uploads from your team or clients</li>
              <li>Email attachments forwarded into a shared inbox</li>
              <li>AP automation and reconciliation prep</li>
              <li>Audit and review workflows</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-3">
              SOLUTIONS BY FUNCTION
            </h3>
            <ul className="space-y-1 text-[hsl(var(--muted-foreground))]">
              <li>Finance &amp; Accounting</li>
              <li>Operations &amp; RevOps</li>
              <li>Founders &amp; solo operators</li>
              <li>Customer success &amp; onboarding teams</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-3">
              SOLUTIONS BY INDUSTRY
            </h3>
            <ul className="space-y-1 text-[hsl(var(--muted-foreground))]">
              <li>Banking &amp; Finance</li>
              <li>Lending &amp; credit</li>
              <li>Fintech products</li>
              <li>Accounting &amp; bookkeeping firms</li>
              <li>Real Estate &amp; property management</li>
              <li>Logistics &amp; supply chain</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-3">
              SOLUTIONS BY USE CASE
            </h3>
            <ul className="space-y-1 text-[hsl(var(--muted-foreground))]">
              <li>Accounts payable and spend reviews</li>
              <li>Account reconciliation and audits</li>
              <li>Loan and credit application reviews</li>
              <li>Investor reporting &amp; portfolio monitoring</li>
              <li>Historical data clean-up</li>
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
          </div>
        </div>

        <form className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]" htmlFor="name">
              Name
            </label>
            <Input id="name" placeholder="Alex from Example Co." />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]" htmlFor="email">
              Work email
            </label>
            <Input id="email" type="email" placeholder="you@company.com" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]" htmlFor="company">
              Company (optional)
            </label>
            <Input id="company" placeholder="Company name" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]" htmlFor="use-case">
              What would you like help with?
            </label>
            <Input id="use-case" placeholder="e.g. Cleaning up 12 months of bank statements" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]" htmlFor="message">
              Additional details or questions
            </label>
            <Textarea
              id="message"
              placeholder="Share links to example files, banks you use, or anything else that would help."
              rows={4}
            />
          </div>
          <div className="md:col-span-2 flex flex-wrap items-center gap-3">
            <Button type="button" className="shadow-md">
              Send message
            </Button>
            <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
              This form is for discovery and product feedback. We'll get back to you with next steps
              or a short demo if helpful.
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}
