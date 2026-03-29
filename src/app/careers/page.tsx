import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers at Statement Extract | Join Our Team",
  description:
    "Explore career opportunities at Statement Extract. We're building the future of intelligent document processing for finance teams worldwide.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <div className="relative mx-auto max-w-4xl px-6 py-12 space-y-14">
      {/* Header */}
      <section className="space-y-4">
        <p className="text-xs font-semibold tracking-[0.25em] text-[hsl(var(--muted-foreground))]">
          CAREERS
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Build the Future of Financial Document Processing
        </h1>
        <p className="text-sm md:text-base text-[hsl(var(--muted-foreground))] max-w-2xl">
          Statement Extract is on a mission to eliminate manual data entry from
          finance workflows. We combine AI-powered document understanding with
          practical accounting integrations to help thousands of businesses
          worldwide convert bank statements, invoices, and financial documents
          into structured, actionable data.
        </p>
      </section>

      {/* Why Join Us */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">
          Why Join Statement Extract
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 space-y-2">
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">
              🚀 High-Impact Work
            </h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Every feature you build directly helps accountants, bookkeepers,
              and finance teams save hours of manual work every week. Our tools
              are used by professionals in over 50 countries.
            </p>
          </div>
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 space-y-2">
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">
              🔧 Modern Tech Stack
            </h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              We work with Next.js, TypeScript, Python, and cutting-edge AI
              models for document understanding. You'll ship to production
              frequently and own your work end-to-end.
            </p>
          </div>
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 space-y-2">
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">
              🌍 Remote-First Culture
            </h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Work from anywhere with flexible hours. We care about output and
              ownership, not where or when you sit at a desk.
            </p>
          </div>
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 space-y-2">
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">
              📈 Growth Opportunity
            </h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Join an early-stage product with real traction. You'll shape the
              product direction, architecture decisions, and company culture from
              the ground up.
            </p>
          </div>
        </div>
      </section>

      {/* Who We're Looking For */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">
          Who We're Looking For
        </h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          We're always interested in hearing from talented engineers and
          technical professionals. We especially value people who:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
          <li>
            Have hands-on experience with TypeScript, React, Next.js, or modern
            Python backends.
          </li>
          <li>
            Care deeply about performance, reliability, and polished user
            experience.
          </li>
          <li>
            Thrive in an early-stage environment with high ownership and
            autonomy.
          </li>
          <li>
            Are curious about document processing, data extraction, and workflow
            automation.
          </li>
          <li>
            Communicate clearly and enjoy working asynchronously across time
            zones.
          </li>
        </ul>
      </section>

      {/* Areas of Interest */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">
          Areas We Hire For
        </h2>
        <div className="grid gap-4 md:grid-cols-3 text-sm">
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">
              Frontend Engineering
            </h3>
            <p className="text-[hsl(var(--muted-foreground))]">
              React, Next.js, TypeScript, and responsive design for our web
              application and landing pages.
            </p>
          </div>
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">
              Backend & AI Engineering
            </h3>
            <p className="text-[hsl(var(--muted-foreground))]">
              Python, document parsing, AI model integration, and API
              development for our extraction pipeline.
            </p>
          </div>
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">
              Product & Growth
            </h3>
            <p className="text-[hsl(var(--muted-foreground))]">
              SEO, content marketing, product strategy, and user experience
              optimization.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8 text-center space-y-4">
        <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">
          Interested in Joining Us?
        </h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-lg mx-auto">
          Send us an email with a short introduction about yourself and any
          relevant links — GitHub, LinkedIn, portfolio, or your CV. We review
          every application personally and respond within a week.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <a
            href="mailto:careers@statementextract.com"
            className="inline-flex items-center justify-center rounded-lg bg-[hsl(var(--primary))] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[hsl(var(--primary))]/90"
          >
            Apply via Email
          </a>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-lg border border-[hsl(var(--border))] px-6 py-3 text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:bg-[hsl(var(--muted))]"
          >
            Learn More About Us
          </Link>
        </div>
      </section>
    </div>
  );
}
