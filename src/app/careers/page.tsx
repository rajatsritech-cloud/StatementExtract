"use client"

export default function CareersPage() {
  return (
    <div className="relative mx-auto max-w-3xl px-6 py-12 space-y-10">
      <section className="space-y-3">
        <p className="text-xs font-semibold tracking-[0.25em] text-[hsl(var(--muted-foreground))]">
          CAREERS
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Join Statement Extractor
        </h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-xl">
          We are building a focused tool that makes it fast and reliable to convert bank statements
          into structured data. If you enjoy working on hard technical problems close to real
          customer workflows, we would love to hear from you.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
          Who we are looking for
        </h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          We are especially interested in engineers and technical professionals who:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
          <li>Have experience with TypeScript, React/Next.js, or modern web backends.</li>
          <li>Care about performance, reliability, and clean user experience.</li>
          <li>Are comfortable working in an early-stage environment with lots of ownership.</li>
          <li>Are curious about documents, data extraction, and workflow automation.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
          How to get in touch
        </h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          We do not have a formal job board yet. Instead, if you think you can help us build
          Statement Extractor, please send us an email with a short introduction and any relevant
          links (GitHub, LinkedIn, portfolio, or CV).
        </p>
        <p className="text-lg text-[hsl(var(--muted-foreground))] mb-8">
          We're always looking for talented individuals to join our team.
          If you're passionate about financial data extraction and AI, send us your resume!
        </p>
        <a
          href="mailto:support@statementextract.com"
          className="inline-flex items-center justify-center rounded-lg bg-[hsl(var(--primary))] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[hsl(var(--primary))]/90"
        >
          Email Us
        </a>
      </section>
    </div>
  );
}
