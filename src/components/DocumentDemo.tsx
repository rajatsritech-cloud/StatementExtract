import Image from "next/image";

export const DocumentDemo = () => {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--muted))]/30 py-20 px-6 md:py-32 border-y border-[hsl(var(--border))]">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern-1 bg-size-24" />
      {/* Glowing stars overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-6 left-[8%] h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))] blur-[1px] animate-twinkle" />
        <div className="absolute top-16 right-[10%] h-1.5 w-1.5 rounded-full bg-white/70 blur-[2px] animate-twinkle" />
        <div className="absolute top-1/3 left-[20%] h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))] blur-[1px] animate-twinkle" />
        <div className="absolute top-1/2 right-[22%] h-1.5 w-1.5 rounded-full bg-white/60 blur-[2px] animate-twinkle" />
        <div className="absolute bottom-20 left-[12%] h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))] blur-[1px] animate-twinkle" />
        <div className="absolute bottom-10 right-[8%] h-1.5 w-1.5 rounded-full bg-white/70 blur-[2px] animate-twinkle" />
        <div className="absolute top-10 left-1/2 h-1.5 w-1.5 rounded-full bg-white/60 blur-[2px] animate-twinkle" />
        <div className="absolute bottom-5 left-1/3 h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))] blur-[1px] animate-twinkle" />
      </div>

      <div className="relative mx-auto max-w-7xl z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-[hsl(var(--foreground))] md:text-5xl mb-4">
            See it in action
          </h2>
          <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            Watch how our OCR and AI pipeline transforms unstructured documents into clean, structured data
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Left: workflow image card */}
          <div className="flex justify-center md:justify-start animate-slide-up">
            <div className="w-full max-w-xl rounded-3xl bg-[hsl(var(--background))]/80 border-2 border-[hsl(var(--primary))]/60 shadow-glow">
              <figure className="relative w-full rounded-2xl overflow-hidden border border-[hsl(var(--muted))] bg-[hsl(var(--background))]/90">
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[hsl(var(--primary))]/25" />
                <Image
                  src="/assets/StatementExtract_Workflow_img.png"
                  alt="StatementExtract workflow showing how OCR and AI transform documents into structured data"
                  width={1200}
                  height={675}
                  className="block h-auto w-full animate-float-x"
                />
              </figure>
            </div>
          </div>

          {/* Right: 3-step workflow text */}
          <div className="relative mt-8 md:mt-0 animate-fade-in">
            <div className="space-y-6 pl-0 md:pl-10">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[hsl(var(--primary))] uppercase">
                  Workflow
                </p>
                <p className="mt-2 text-xs md:text-sm text-[hsl(var(--muted-foreground))]">
                  From upload to structured outputs in three clear steps. OCR and AI work together to follow the same
                  flow you see in the diagram.
                </p>
              </div>

              {/* Step 1 */}
              <div className="relative flex gap-3">
                <div className="flex flex-col items-center pt-1">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] text-xs font-semibold shadow-sm">
                    1
                  </div>
                </div>
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-[hsl(var(--primary))]/25 via-[hsl(var(--accent))]/20 to-transparent opacity-90" />
                  <div className="relative rounded-2xl border border-white/5 bg-black/10 px-4 py-3 backdrop-blur-sm">
                    <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                      Upload and detect documents
                    </h3>
                    <p className="mt-1 text-xs md:text-sm text-[hsl(var(--muted-foreground))]">
                      Send invoices, contracts, healthcare records, or bank statements via dashboard or API. We detect
                      the document type and route it into the right OCR + AI pipeline.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex gap-3">
                <div className="flex flex-col items-center pt-1">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--accent))]/25 text-[hsl(var(--accent))] text-xs font-semibold shadow-sm">
                    2
                  </div>
                </div>
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-[hsl(var(--accent))]/25 via-[hsl(var(--primary))]/20 to-transparent opacity-90" />
                  <div className="relative rounded-2xl border border-white/5 bg-black/10 px-4 py-3 backdrop-blur-sm">
                    <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                      OCR + AI extraction
                    </h3>
                    <p className="mt-1 text-xs md:text-sm text-[hsl(var(--muted-foreground))]">
                      Our OCR and AI combination follows the visual layout, reads line items and clauses, and extracts
                      key fields like totals, dates, counterparties, and account details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex gap-3">
                <div className="flex flex-col items-center pt-1">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--primary))]/25 text-[hsl(var(--primary))] text-xs font-semibold shadow-sm">
                    3
                  </div>
                </div>
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-[hsl(var(--primary))]/25 via-[hsl(var(--accent))]/20 to-transparent opacity-90" />
                  <div className="relative rounded-2xl border border-white/5 bg-black/10 px-4 py-3 backdrop-blur-sm">
                    <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                      Structured data delivered
                    </h3>
                    <p className="mt-1 text-xs md:text-sm text-[hsl(var(--muted-foreground))]">
                      Receive clean, structured data as CSV, Excel, or via API and webhooks so you can power analytics,
                      reconciliation, or downstream automations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};