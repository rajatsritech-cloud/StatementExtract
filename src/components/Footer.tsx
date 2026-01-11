"use client";

import { FileText, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Recent blog posts for footer
const recentPosts = [
  { slug: "bank-statement-pdf-to-excel-using-ai", title: "Bank Statement PDF to Excel Using AI" },
  { slug: "ai-bank-statement-data-extraction-no-templates", title: "AI Bank Statement Extraction" },
  { slug: "bank-statement-analysis-loan-underwriting-automation", title: "Loan Underwriting Automation" },
];

export const Footer = () => {
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Main Footer - 5 Equal Columns in One Line */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[hsl(var(--foreground))] whitespace-nowrap">Statement <span className="bg-gradient-primary bg-clip-text text-transparent">Extract</span></span>
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
              Intelligent Document Processing for<br />modern teams.
            </p>
            <div className="flex gap-3">
              <a href="https://x.com/statement3376" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors" aria-label="Twitter/X">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/statement-extract/" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[hsl(var(--foreground))] uppercase tracking-wider">Products</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/convert-bank-statement-to-csv-excel" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Bank Statement to Excel</Link></li>
              <li><Link href="/convert-invoice-to-excel-csv" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Invoice to Excel</Link></li>
              <li><Link href="/tools/invoice-generator" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Invoice Generator</Link></li>
              <li><Link href="/convert/merge-pdf" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Merge PDF</Link></li>
              <li><Link href="/convert/compress-pdf" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Compress PDF</Link></li>
              <li><Link href="/tools" className="font-medium text-[hsl(var(--primary))] hover:underline">View All Tools →</Link></li>
            </ul>
          </div>

          {/* Converters */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[hsl(var(--foreground))] uppercase tracking-wider">Converters</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/convert/csv-to-qbo" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">CSV to QBO</Link></li>
              <li><Link href="/convert/qfx-to-excel" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">QFX to Excel</Link></li>
              <li><Link href="/convert/qif-to-excel" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">QIF to Excel</Link></li>
              <li><Link href="/convert/iif-to-excel" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">IIF to Excel</Link></li>
              <li><Link href="/convert/csv-to-iif" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">CSV to IIF</Link></li>
              <li><Link href="/convert" className="font-medium text-[hsl(var(--primary))] hover:underline">View All Converters →</Link></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[hsl(var(--foreground))] uppercase tracking-wider">Tools</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/tools/profit-margin-calculator" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Profit Margin</Link></li>
              <li><Link href="/tools/gst-vat-calculator" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">GST/VAT Calculator</Link></li>
              <li><Link href="/tools/compound-interest-calculator" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Compound Interest</Link></li>
              <li><Link href="/tools/amortization-calculator" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Amortization</Link></li>
              <li><Link href="/tools/paycheck-calculator" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Paycheck Calculator</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[hsl(var(--foreground))] uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Contact</Link></li>
              <li><Link href="/blogs" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Blog</Link></li>
              <li><Link href="/privacy-policy" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Recent Articles Row */}
        <div className="mt-10 pt-8 border-t border-[hsl(var(--border))]">
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] uppercase tracking-wider mb-4">Recent Articles</h3>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
              >
                {post.title}
              </Link>
            ))}
            <Link href="/blogs" className="font-medium text-[hsl(var(--primary))] hover:underline">All Articles →</Link>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="mt-10 pt-8 border-t border-[hsl(var(--border))] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[hsl(var(--muted-foreground))]">
          <p>© 2025 Statement Extract. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/sitemap.xml" className="hover:text-[hsl(var(--foreground))] transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
