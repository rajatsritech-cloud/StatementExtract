import { ArrowRight, Cpu, FileSpreadsheet, FileText, Image as ImageIcon, UploadCloud } from "lucide-react";

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
            Watch how our Intelligent Document Processing pipeline transforms unstructured documents into clean, structured data
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Left: Dynamic Visualization Card */}
          <div className="flex justify-center md:justify-start animate-slide-up">
            <div className="w-full max-w-xl rounded-3xl bg-[hsl(var(--background))]/80 border-2 border-[hsl(var(--primary))]/20 shadow-glow backdrop-blur-sm p-8 md:p-12 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group">

              {/* Animated Background Pulse */}
              <div className="absolute inset-0 bg-[hsl(var(--primary))]/5 animate-pulse" />

              {/* Flow Container */}
              <div className="relative z-10 flex items-center gap-4 md:gap-8 w-full justify-center">

                {/* Input Node */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-lg flex items-center justify-center relative z-10">
                      <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-[hsl(var(--primary-foreground))] text-xs font-bold">1</div>
                      <ImageIcon className="h-8 w-8 text-[hsl(var(--muted-foreground))]" />
                    </div>
                    <div className="absolute top-2 left-2 h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-md -z-10 rotate-6" />
                  </div>
                  <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Input</span>
                </div>

                {/* Arrow 1 */}
                <div className="flex-1 h-[2px] bg-gradient-to-r from-[hsl(var(--border))] to-[hsl(var(--primary))] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[hsl(var(--primary))] w-1/2 animate-[shimmer_1.5s_infinite]" />
                </div>

                {/* Processing Node */}
                <div className="flex flex-col items-center gap-3 relative">
                  <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center relative z-10 animate-float">
                    <Cpu className="h-10 w-10 text-white animate-pulse" />
                  </div>
                  {/* Orbiting particles */}
                  <div className="absolute inset-0 rounded-full border border-[hsl(var(--primary))]/30 w-full h-full scale-150 animate-[spin_4s_linear_infinite]" />
                  <div className="absolute inset-0 rounded-full border border-dashed border-[hsl(var(--primary))]/20 w-full h-full scale-[1.8] animate-[spin_8s_linear_infinite_reverse]" />

                  <span className="text-xs font-bold text-[hsl(var(--primary))] uppercase tracking-wider">AI Engine</span>
                </div>

                {/* Arrow 2 */}
                <div className="flex-1 h-[2px] bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--border))] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[hsl(var(--primary))] w-1/2 animate-[shimmer_1.5s_infinite] delay-75" />
                </div>

                {/* Output Node */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative group-hover:-translate-y-2 transition-transform duration-300">
                    <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--primary))]/30 shadow-lg flex items-center justify-center relative z-10">
                      <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center text-white text-xs font-bold">3</div>
                      <FileSpreadsheet className="h-8 w-8 text-[hsl(var(--primary))]" />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-1 bg-[hsl(var(--primary))]/20 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Output</span>
                </div>

              </div>

              <div className="mt-12 flex items-center gap-2 text-sm font-medium text-[hsl(var(--muted-foreground))] bg-[hsl(var(--background))]/50 px-4 py-2 rounded-full border border-[hsl(var(--border))]">
                <UploadCloud className="h-4 w-4 text-[hsl(var(--primary))]" />
                <span>Processing in real-time</span>
              </div>

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
                      the document type and route it into the right Intelligent Document Processing pipeline.
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
                      Intelligent Document Processing extraction
                    </h3>
                    <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                      Our Intelligent Document Processing engine follows the visual layout, reads line items and clauses, and extracts
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