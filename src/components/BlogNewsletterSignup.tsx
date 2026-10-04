"use client";

import React, { useState } from "react";

export function BlogNewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setStatus("loading");
      setMessage("");

      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setMessage("You’re subscribed to Statement Extract updates.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section
      className="relative mt-12 overflow-hidden rounded-3xl border border-gray-200 bg-slate-50 bg-grid-pattern-4 bg-size-32 px-4 py-10 text-center shadow-sm md:px-10 md:py-12"
    >
      <svg
        className="pointer-events-none absolute -left-10 top-0 h-32 w-32 text-[hsl(var(--primary))]/5"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M37.3,-49.6C48.9,-40.3,59.3,-29.5,63.8,-16.2C68.3,-2.9,67,12.9,60.5,26.3C54,39.7,42.3,50.7,28.5,57.5C14.7,64.3,-1.2,67,-16.3,63.9C-31.4,60.8,-45.7,51.9,-55.4,39.3C-65.1,26.7,-70.2,10.4,-68.8,-5.4C-67.4,-21.2,-59.5,-36.5,-48.3,-45.5C-37.1,-54.5,-23.6,-57.2,-10.8,-57.7C2,-58.2,25.7,-58.9,37.3,-49.6Z"
          transform="translate(100 100)"
        />
      </svg>
      <svg
        className="pointer-events-none absolute -right-12 bottom-[-40px] h-40 w-40 text-[hsl(var(--accent))]/10"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M41.3,-53.4C53.4,-43.7,62.7,-30.9,66.6,-16.4C70.5,-1.9,69,14.3,62.2,28.3C55.4,42.3,43.3,54.1,28.7,61.2C14.1,68.3,-3.1,70.7,-19.6,66.9C-36.1,63.1,-51.9,53.1,-61.3,38.9C-70.7,24.7,-73.7,6.3,-70.5,-10.3C-67.3,-26.9,-57.9,-41.7,-45.3,-51.2C-32.7,-60.7,-16.3,-64.9,-0.8,-63.8C14.7,-62.7,29.3,-63.1,41.3,-53.4Z"
          transform="translate(100 100)"
        />
      </svg>
      <div className="relative mx-auto flex max-w-2xl flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-normal text-slate-900">
            Join Statement Extract news
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            And we’ll inform you about upcoming features, improvements, and best
            practices for automating financial documents.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-2 flex justify-center">
          <div className="flex w-full max-w-xl items-center gap-2 rounded-full bg-white px-2 py-1 shadow-sm border border-gray-200 md:px-3 md:py-1.5">
            <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] sm:flex">
              <span className="text-lg">@</span>
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 border-0 bg-transparent px-2 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary))] px-5 py-2 text-xs font-semibold text-[hsl(var(--primary-foreground))] shadow-sm transition hover:bg-[hsl(var(--primary-light))] disabled:opacity-70 md:px-6"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        </form>

        <p className="mt-2 text-[11px] leading-snug text-slate-400">
          We use your email only to deliver newsletters. See our Privacy Policy for
          more information.
        </p>

        {message && (
          <p
            className={`mt-1 text-xs ${status === "success"
              ? "text-emerald-700"
              : status === "error"
                ? "text-red-600"
                : "text-slate-500"
              }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
