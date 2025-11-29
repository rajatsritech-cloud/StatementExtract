import Image from "next/image";

export const DocumentDemo = () => {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--muted))]/30 py-12 px-6 md:py-20 border-y border-[hsl(var(--border))]">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern-1 bg-size-24 opacity-50" />

      {/* Large floating blob accents - Theme Reactive */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-visible">
        <div className="absolute top-[-8rem] left-[-26rem] h-[40rem] w-[40rem] opacity-30 animate-float" style={{ animationDelay: '0s' }}>
          <svg width="100%" height="100%" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <path fill="hsl(var(--primary))" d="M492.5 130.5C538.5 220 376 348 274.5 492.5C173 637 54.5 455 -1.5 304.5C-57.5 154 36.5 41 199 15.5C361.5 -10 446.5 41 492.5 130.5Z" />
          </svg>
        </div>
        <div className="absolute bottom-[-8rem] right-[-24rem] h-[36rem] w-[36rem] opacity-25 animate-float" style={{ animationDelay: '2s' }}>
          <svg width="100%" height="100%" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <path fill="hsl(var(--accent))" d="M375 64.5C406 142 429.5 240 374 330.5C318.5 421 184.5 504.5 90 427.5C-4.5 350.5 -19.5 192.5 40 102.5C99.5 12.5 311 16.5 375 64.5Z" />
          </svg>
        </div>
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
            <div className="w-full max-w-xl rounded-3xl bg-[hsl(var(--background))]/80 border-2 border-[hsl(var(--primary))]/20 shadow-glow backdrop-blur-sm transition-transform hover:scale-[1.02] duration-500">
              <figure className="relative w-full rounded-2xl overflow-hidden border border-[hsl(var(--muted))] bg-[hsl(var(--background))]/90">
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[hsl(var(--primary))]/25" />
                <Image
                  src="/assets/StatementExtract_Workflow_img.png"
                  alt="StatementExtract workflow showing how OCR and AI transform documents into structured data"
                  width={1200}
                  height={675}
                  className="block h-auto w-full"
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
                <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                  From upload to structured outputs in three clear steps.
                </p>
              </div>

              {/* Step 1 */}
              <div className="relative flex gap-4 group">
                <div className="flex flex-col items-center pt-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] shadow-sm ring-1 ring-[hsl(var(--primary))]/20 group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-300 font-bold text-lg">
                    1
                  </div>
                  <div className="h-full w-px bg-gradient-to-b from-[hsl(var(--primary))]/20 to-transparent my-2" />
                </div>
                <div className="relative flex-1 pb-8">
                  <div className="relative rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 px-5 py-4 backdrop-blur-sm hover:bg-[hsl(var(--card))] hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <h3 className="text-base font-bold text-[hsl(var(--foreground))]">
                      Upload and detect documents
                    </h3>
                    <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                      Send invoices, contracts, healthcare records, or bank statements via dashboard or API. We detect
                      the document type and route it into the right OCR + AI pipeline.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex gap-4 group">
                <div className="flex flex-col items-center pt-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] shadow-sm ring-1 ring-[hsl(var(--accent))]/20 group-hover:bg-[hsl(var(--accent))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-300 font-bold text-lg">
                    2
                  </div>
                  <div className="h-full w-px bg-gradient-to-b from-[hsl(var(--accent))]/20 to-transparent my-2" />
                </div>
                <div className="relative flex-1 pb-8">
                  <div className="relative rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 px-5 py-4 backdrop-blur-sm hover:bg-[hsl(var(--card))] hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <h3 className="text-base font-bold text-[hsl(var(--foreground))]">
                      OCR + AI extraction
                    </h3>
                    <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                      Our OCR and AI combination follows the visual layout, reads line items and clauses, and extracts
                      key fields like totals, dates, counterparties, and account details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex gap-4 group">
                <div className="flex flex-col items-center pt-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] shadow-sm ring-1 ring-[hsl(var(--primary))]/20 group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-300 font-bold text-lg">
                    3
                  </div>
                </div>
                <div className="relative flex-1">
                  <div className="relative rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 px-5 py-4 backdrop-blur-sm hover:bg-[hsl(var(--card))] hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <h3 className="text-base font-bold text-[hsl(var(--foreground))]">
                      Structured data delivered
                    </h3>
                    <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
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