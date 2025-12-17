"use client";

import { FileText, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Recent blog posts for footer (hardcoded for static export)
const recentPosts = [
  { slug: "bank-statement-pdf-to-excel-using-ai", title: "Bank Statement PDF to Excel Using AI" },
  { slug: "ai-bank-statement-data-extraction-no-templates", title: "AI Bank Statement Extraction" },
  { slug: "bank-statement-analysis-loan-underwriting-automation", title: "Loan Underwriting Automation" },
  { slug: "idp-vs-ocr-document-processing", title: "IDP vs OCR: Which to Choose?" },
  { slug: "ultimate-guide-accurate-bank-statement-extraction-ocr-ai", title: "Ultimate Extraction Guide" },
];

export const Footer = () => {
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[hsl(var(--foreground))] whitespace-nowrap">Statement <span className="bg-gradient-primary bg-clip-text text-transparent">Extract</span></span>
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Intelligent Document Processing for modern teams.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="https://x.com/statement3376" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors" aria-label="Twitter/X">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/statement-extract/" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.reddit.com/user/statementextract/" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors" aria-label="Reddit">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[hsl(var(--foreground))]">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/convert-bank-statement-to-csv-excel"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  Bank Statement Converter
                </Link>
              </li>
              <li>
                <Link
                  href="/convert"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  Free Tools
                </Link>
              </li>
              <li><a href="/#use-cases" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Use Cases</a></li>
              <li><a href="/#pricing" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[hsl(var(--foreground))]">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources - Recent Blogs */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[hsl(var(--foreground))]">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blogs"
                  className="font-medium text-[hsl(var(--primary))] hover:underline"
                >
                  All Blog Posts →
                </Link>
              </li>
              {recentPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[hsl(var(--border))] pt-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
          <p>© 2025 Statement Extract. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
