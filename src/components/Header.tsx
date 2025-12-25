"use client";

import { Button } from "@/components/ui/button";
import {
  FileText,
  Menu,
  ChevronDown,
  Building,
  FileText as FileIcon,
  Shield,
  Truck,
  Heart,
  Settings,
  HelpCircle,
  Mail,
  Zap,
  CreditCard,
  RotateCcw,
  Layers,
  Minimize2,
  FileImage,
  Images,
  Calculator,
  Receipt,
  TrendingDown,
  Database,
  FileSpreadsheet,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { isAdminEmail } from "@/lib/auth-client";
import { useState, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

export const Header = () => {
  const router = useRouter();
  const [isSolutionsHovered, setIsSolutionsHovered] = useState(false);
  const [isConvertersHovered, setIsConvertersHovered] = useState(false);
  const [isToolsHovered, setIsToolsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const [isMobileConvertersOpen, setIsMobileConvertersOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const convertersTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toolsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  const isAdmin = isAdminEmail(
    user?.primaryEmailAddress?.emailAddress ?? undefined
  );

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsSolutionsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsSolutionsHovered(false);
    }, 250);
  };

  const closeDropdown = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsSolutionsHovered(false);
  };

  // Converters hover handlers
  const handleConvertersMouseEnter = () => {
    if (convertersTimeoutRef.current) {
      clearTimeout(convertersTimeoutRef.current);
      convertersTimeoutRef.current = null;
    }
    setIsConvertersHovered(true);
  };

  const handleConvertersMouseLeave = () => {
    convertersTimeoutRef.current = setTimeout(() => {
      setIsConvertersHovered(false);
    }, 250);
  };

  const closeConvertersDropdown = () => {
    if (convertersTimeoutRef.current) {
      clearTimeout(convertersTimeoutRef.current);
      convertersTimeoutRef.current = null;
    }
    setIsConvertersHovered(false);
  };

  // Tools hover handlers
  const handleToolsMouseEnter = () => {
    if (toolsTimeoutRef.current) {
      clearTimeout(toolsTimeoutRef.current);
      toolsTimeoutRef.current = null;
    }
    setIsToolsHovered(true);
  };

  const handleToolsMouseLeave = () => {
    toolsTimeoutRef.current = setTimeout(() => {
      setIsToolsHovered(false);
    }, 250);
  };

  const closeToolsDropdown = () => {
    if (toolsTimeoutRef.current) {
      clearTimeout(toolsTimeoutRef.current);
      toolsTimeoutRef.current = null;
    }
    setIsToolsHovered(false);
  };

  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--border))]/40 bg-[hsl(var(--background))]/80 backdrop-blur-md transition-all support-[backdrop-filter]:bg-[hsl(var(--background))]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-3 pb-0">
        <div className="flex h-[4.5rem] items-center justify-between rounded-2xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--background))]/95 px-3 sm:px-5">
          <Link
            href="/"
            className="flex items-center gap-2 md:gap-3"
            aria-label="Statement Extract home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary md:h-10 md:w-10">
              <FileText className="h-4 w-4 text-white md:h-5 md:w-5" />
            </div>
            <span className="text-lg font-bold text-[hsl(var(--foreground))] md:text-xl">
              Statement <span className="bg-gradient-primary bg-clip-text text-transparent">Extract</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                Solutions
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Solutions Dropdown */}
              {isSolutionsHovered && (
                <div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Dropdown card - Theme Aligned */}
                  <div className="relative w-[880px] rounded-2xl bg-[hsl(var(--card))] shadow-2xl border border-[hsl(var(--border))] overflow-hidden animate-dropdown-enter">
                    <div className="grid grid-cols-3 divide-x divide-[hsl(var(--border))]/70">
                      {/* Left: Company column */}
                      <div className="col-span-1 flex flex-col justify-between bg-[hsl(var(--background))]/40 p-6">
                        <div>
                          <p className="text-xs font-semibold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-4">COMPANY</p>
                          <div className="grid grid-cols-2 gap-3">
                            <Link
                              href="/about"
                              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))] text-center transition-all duration-200 cursor-pointer hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                              onClick={closeDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                                <Building className="h-4 w-4" />
                              </div>
                              <span>About Us</span>
                            </Link>
                            <Link
                              href="/contact"
                              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))] text-center transition-all duration-200 cursor-pointer hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                              onClick={closeDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                                <Mail className="h-4 w-4" />
                              </div>
                              <span>Contact Us</span>
                            </Link>
                            <Link
                              href="/privacy-policy"
                              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))] text-center transition-all duration-200 cursor-pointer hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                              onClick={closeDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                                <Shield className="h-4 w-4" />
                              </div>
                              <span>Privacy Policy</span>
                            </Link>
                            <Link
                              href="/terms"
                              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))] text-center transition-all duration-200 cursor-pointer hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                              onClick={closeDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                                <Settings className="h-4 w-4" />
                              </div>
                              <span>Terms</span>
                            </Link>
                          </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                          <Link
                            href="/convert-bank-statement-to-csv-excel"
                            onClick={closeDropdown}
                            className="bg-gradient-button text-[hsl(var(--primary-foreground))] px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 inline-block text-center"
                          >
                            Try for Free
                          </Link>
                          <Link
                            href="/about"
                            onClick={closeDropdown}
                            className="bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[hsl(var(--secondary))] hover:border-[hsl(var(--primary))]/50 transition-all duration-200 hover:-translate-y-0.5 inline-block text-center"
                          >
                            Learn More
                          </Link>
                        </div>
                      </div>

                      {/* Right: Solutions column */}
                      <div className="col-span-2 p-6">
                        <div className="mb-5 flex items-start justify-between">
                          <div>
                            <p className="text-xs font-semibold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-2">SOLUTIONS</p>
                            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Bank Statement Processing</h3>
                            <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))] max-w-md">
                              Convert PDF bank statements to Excel, CSV, QuickBooks, and Xero for accountants and bookkeepers.
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            href="/convert-bank-statement-to-csv-excel"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--background))] px-3 py-3 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeDropdown}
                          >
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <Building className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Bank Statement to Excel/CSV</p>
                              <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">Convert any bank PDF to structured data.</p>
                            </div>
                          </Link>

                          <Link
                            href="/convert-bank-statement-to-quickbooks-xero"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--background))] px-3 py-3 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeDropdown}
                          >
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <CreditCard className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">QuickBooks & Xero Import</p>
                              <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">Ready-to-import formats for accounting.</p>
                            </div>
                          </Link>

                          <Link
                            href="/convert-bank-statement-to-csv-excel"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-3 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40"
                            onClick={closeDropdown}
                          >
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(var(--muted))]/50 text-[hsl(var(--muted-foreground))] group-hover:bg-[hsl(var(--primary))]/10 group-hover:text-[hsl(var(--primary))] transition-colors">
                              <FileIcon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Small Business Accounting</p>
                              <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">For CPAs, CAs, and bookkeepers.</p>
                            </div>
                          </Link>

                          <Link
                            href="/convert-bank-statement-to-csv-excel"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-3 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40"
                            onClick={closeDropdown}
                          >
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(var(--muted))]/50 text-[hsl(var(--muted-foreground))] group-hover:bg-[hsl(var(--primary))]/10 group-hover:text-[hsl(var(--primary))] transition-colors">
                              <Shield className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Financial Auditing</p>
                              <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">Transaction verification & reconciliation.</p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link href="/blogs" className="text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--primary))]">
              Blogs
            </Link>

            {/* Converters Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleConvertersMouseEnter}
              onMouseLeave={handleConvertersMouseLeave}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                Converters
                <ChevronDown className="h-4 w-4" />
              </button>

              {isConvertersHovered && (
                <div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50"
                  onMouseEnter={handleConvertersMouseEnter}
                  onMouseLeave={handleConvertersMouseLeave}
                >
                  <div className="relative w-[880px] rounded-2xl bg-[hsl(var(--card))] shadow-2xl border border-[hsl(var(--border))] overflow-hidden animate-dropdown-enter">
                    <div className="grid grid-cols-3 divide-x divide-[hsl(var(--border))]/70">
                      {/* PDF Tools column */}
                      <div className="col-span-1 p-6 bg-[hsl(var(--background))]/40">
                        <p className="text-xs font-semibold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-4">PDF TOOLS</p>
                        <div className="space-y-2">
                          <Link
                            href="/convert/merge-pdf"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeConvertersDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <Layers className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Merge PDF</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Combine multiple PDFs</p>
                            </div>
                          </Link>
                          <Link
                            href="/convert/compress-pdf"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeConvertersDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <Minimize2 className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Compress PDF</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Reduce file size</p>
                            </div>
                          </Link>
                          <Link
                            href="/convert/split-pdf"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeConvertersDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <FileIcon className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Split PDF</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Extract pages</p>
                            </div>
                          </Link>
                          <Link
                            href="/convert/jpg-to-pdf"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeConvertersDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <FileImage className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">JPG to PDF</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Images to PDF</p>
                            </div>
                          </Link>
                        </div>
                      </div>

                      {/* Finance Converters column */}
                      <div className="col-span-1 p-6">
                        <p className="text-xs font-semibold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-4">FINANCE</p>
                        <div className="space-y-2">
                          <Link
                            href="/convert-bank-statement-to-csv-excel"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/[0.06] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--primary))]/[0.12] hover:shadow-md"
                            onClick={closeConvertersDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <FileSpreadsheet className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Bank to Excel/CSV</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">AI-powered extraction</p>
                            </div>
                          </Link>
                          <Link
                            href="/convert/csv-to-qbo"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeConvertersDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <FileSpreadsheet className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">CSV to QBO</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">QuickBooks format</p>
                            </div>
                          </Link>
                          <Link
                            href="/convert/csv-to-ofx"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeConvertersDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <FileSpreadsheet className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">CSV to OFX</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Universal banking</p>
                            </div>
                          </Link>
                          <Link
                            href="/convert/csv-to-mt940"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeConvertersDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <FileSpreadsheet className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">CSV to MT940</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">SWIFT format</p>
                            </div>
                          </Link>
                        </div>
                      </div>

                      {/* Image & Dev Tools column */}
                      <div className="col-span-1 p-6">
                        <p className="text-xs font-semibold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-4">IMAGE & DEV</p>
                        <div className="space-y-2">
                          <Link
                            href="/convert/batch-converter"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeConvertersDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <Images className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">HEIC/AVIF Batch</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Bulk image convert</p>
                            </div>
                          </Link>
                          <Link
                            href="/convert/image-compressor"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeConvertersDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <Minimize2 className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Image Compressor</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Reduce image size</p>
                            </div>
                          </Link>
                          <Link
                            href="/convert/json-to-sql"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeConvertersDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <Database className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">JSON to SQL</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Database import</p>
                            </div>
                          </Link>
                        </div>
                        <Link
                          href="/convert"
                          className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[hsl(var(--primary))]/[0.08] border border-[hsl(var(--primary))]/20 px-4 py-2 text-sm font-medium text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/[0.12] hover:border-[hsl(var(--primary))]/30 transition-all"
                          onClick={closeConvertersDropdown}
                        >
                          View All Converters →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleToolsMouseEnter}
              onMouseLeave={handleToolsMouseLeave}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                Tools
                <ChevronDown className="h-4 w-4" />
              </button>

              {isToolsHovered && (
                <div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50"
                  onMouseEnter={handleToolsMouseEnter}
                  onMouseLeave={handleToolsMouseLeave}
                >
                  <div className="relative w-[880px] rounded-2xl bg-[hsl(var(--card))] shadow-2xl border border-[hsl(var(--border))] overflow-hidden animate-dropdown-enter">
                    <div className="grid grid-cols-3 divide-x divide-[hsl(var(--border))]/70">
                      {/* Finance & Invoicing column */}
                      <div className="col-span-1 p-6 bg-[hsl(var(--background))]/40">
                        <p className="text-xs font-semibold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-4">INVOICING</p>
                        <div className="space-y-2">
                          <Link
                            href="/tools/invoice-generator"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/[0.06] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--primary))]/[0.12] hover:shadow-md"
                            onClick={closeToolsDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <FileText className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Invoice Generator</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Professional PDF invoices</p>
                            </div>
                          </Link>
                          <Link
                            href="/tools/profit-margin-calculator"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeToolsDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <TrendingUp className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Profit Margin</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Calculate margins</p>
                            </div>
                          </Link>
                          <Link
                            href="/tools/markup-calculator"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeToolsDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <Calculator className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Markup Calculator</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Price markup tool</p>
                            </div>
                          </Link>
                        </div>
                      </div>

                      {/* Tax Calculators column */}
                      <div className="col-span-1 p-6">
                        <p className="text-xs font-semibold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-4">TAX TOOLS</p>
                        <div className="space-y-2">
                          <Link
                            href="/tools/gst-vat-calculator"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeToolsDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <Receipt className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">GST/VAT Calculator</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Global tax rates</p>
                            </div>
                          </Link>
                          <Link
                            href="/tools/self-employed-tax-calculator"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeToolsDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <Calculator className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Self-Employed Tax</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">1099 tax calculator</p>
                            </div>
                          </Link>
                          <Link
                            href="/tools/financial-ratio-calculator"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeToolsDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <TrendingUp className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Financial Ratios</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Key business metrics</p>
                            </div>
                          </Link>
                        </div>
                      </div>

                      {/* Investment & Loans column */}
                      <div className="col-span-1 p-6">
                        <p className="text-xs font-semibold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-4">INVESTMENTS</p>
                        <div className="space-y-2">
                          <Link
                            href="/tools/amortization-calculator"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeToolsDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <TrendingDown className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Amortization</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Loan schedules</p>
                            </div>
                          </Link>
                          <Link
                            href="/tools/rental-roi-calculator"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeToolsDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <Layers className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Rental ROI</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Property analysis</p>
                            </div>
                          </Link>
                          <Link
                            href="/tools/fire-calculator"
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={closeToolsDropdown}
                          >
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <Zap className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">FIRE Calculator</p>
                              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Retire early plan</p>
                            </div>
                          </Link>
                        </div>
                        <Link
                          href="/tools"
                          className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[hsl(var(--primary))]/[0.08] border border-[hsl(var(--primary))]/20 px-4 py-2 text-sm font-medium text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/[0.12] hover:border-[hsl(var(--primary))]/30 transition-all"
                          onClick={closeToolsDropdown}
                        >
                          View All Tools →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link href="/#faq" className="text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--primary))]">
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:gap-4">
            <SignedIn>
              <Link
                href="/dashboard"
                className="hidden lg:inline-flex mr-1 h-9 items-center justify-center rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] transition-colors"
              >
                Dashboard
              </Link>
            </SignedIn>

            <div className="hidden lg:flex items-center gap-2 mr-2">
              <div className="flex items-center gap-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-1">
                <button
                  onClick={() => setTheme("green")}
                  className={`h-4 w-4 rounded-full bg-[#16a34a] transition-transform hover:scale-110 ${theme === 'green' ? 'ring-2 ring-offset-1 ring-[#16a34a]' : ''}`}
                  aria-label="Green theme"
                />
                <button
                  onClick={() => setTheme("blue")}
                  className={`h-4 w-4 rounded-full bg-[#3b82f6] transition-transform hover:scale-110 ${theme === 'blue' ? 'ring-2 ring-offset-1 ring-[#3b82f6]' : ''}`}
                  aria-label="Blue theme"
                />
                <button
                  onClick={() => setTheme("violet")}
                  className={`h-4 w-4 rounded-full bg-[#8b5cf6] transition-transform hover:scale-110 ${theme === 'violet' ? 'ring-2 ring-offset-1 ring-[#8b5cf6]' : ''}`}
                  aria-label="Violet theme"
                />
                <button
                  onClick={() => setTheme("orange")}
                  className={`h-4 w-4 rounded-full bg-[#f97316] transition-transform hover:scale-110 ${theme === 'orange' ? 'ring-2 ring-offset-1 ring-[#f97316]' : ''}`}
                  aria-label="Orange theme"
                />
              </div>
            </div>

            <SignedOut>
              <div suppressHydrationWarning className="flex items-center gap-2">
                <SignInButton mode="modal">
                  <Button variant="ghost" className="hidden lg:inline-flex">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="hidden shadow-md lg:inline-flex">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>

            {/* Tablet-only buttons (hidden on desktop, visible on tablet/mobile) */}
            <SignedIn>
              <Link
                href="/dashboard"
                className="lg:hidden inline-flex h-9 items-center justify-center rounded-md bg-[hsl(var(--primary))] px-4 text-sm font-medium text-white hover:bg-[hsl(var(--primary))]/90 transition-colors"
              >
                Dashboard
              </Link>
              <div suppressHydrationWarning className="flex items-center gap-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>

            <SignedOut>
              <SignUpButton mode="modal">
                <Button className="lg:hidden shadow-md">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Toggle navigation menu"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div >
      {isMobileMenuOpen && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-4 lg:hidden">
          <nav className="pt-3">
            <div className="rounded-2xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))]/95 overflow-hidden divide-y divide-[hsl(var(--border))]/70">
              {/* Mobile Solutions Accordion */}
              <div>
                <button
                  className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]"
                  onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                >
                  <span className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>Solutions</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileSolutionsOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMobileSolutionsOpen && (
                  <div className="bg-[hsl(var(--muted))]/30 px-4 py-2 space-y-1">
                    <div className="mb-2">
                      <p className="text-[10px] font-semibold tracking-wider text-[hsl(var(--muted-foreground))] uppercase px-2 py-1">Company</p>
                      <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">About Us</Link>
                      <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Contact Us</Link>
                      <Link href="/privacy-policy" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Privacy Policy</Link>
                      <Link href="/terms" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Terms</Link>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-wider text-[hsl(var(--muted-foreground))] uppercase px-2 py-1">Solutions</p>
                      <Link href="/convert-bank-statement-to-csv-excel" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Bank Statement to Excel/CSV</Link>
                      <Link href="/convert-bank-statement-to-quickbooks-xero" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">QuickBooks & Xero Import</Link>
                      <Link href="/convert-bank-statement-to-csv-excel" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Small Business Accounting</Link>
                      <Link href="/convert-bank-statement-to-csv-excel" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Financial Auditing</Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/blogs"
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <FileIcon className="h-4 w-4 text-[hsl(var(--primary))]" />
                  <span>Blogs</span>
                </span>
              </Link>

              <Link
                href="/#faq"
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="h-4 w-4 text-[hsl(var(--primary))]" />
                  <span>FAQ</span>
                </span>
              </Link>

              {/* Mobile Converters Accordion */}
              <div>
                <button
                  className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]"
                  onClick={() => setIsMobileConvertersOpen(!isMobileConvertersOpen)}
                >
                  <span className="flex items-center gap-3">
                    <RotateCcw className="h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>Converters</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileConvertersOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMobileConvertersOpen && (
                  <div className="bg-[hsl(var(--muted))]/30 px-4 py-2 space-y-1">
                    <div className="mb-2">
                      <p className="text-[10px] font-semibold tracking-wider text-[hsl(var(--muted-foreground))] uppercase px-2 py-1">PDF Tools</p>
                      <Link href="/convert/merge-pdf" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Merge PDF</Link>
                      <Link href="/convert/compress-pdf" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Compress PDF</Link>
                      <Link href="/convert/split-pdf" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Split PDF</Link>
                      <Link href="/convert/jpg-to-pdf" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">JPG to PDF</Link>
                    </div>
                    <div className="mb-2">
                      <p className="text-[10px] font-semibold tracking-wider text-[hsl(var(--muted-foreground))] uppercase px-2 py-1">Finance</p>
                      <Link href="/convert-bank-statement-to-csv-excel" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Bank to Excel/CSV</Link>
                      <Link href="/convert/csv-to-qbo" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">CSV to QBO</Link>
                      <Link href="/convert/csv-to-ofx" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">CSV to OFX</Link>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-wider text-[hsl(var(--muted-foreground))] uppercase px-2 py-1">Image & Dev</p>
                      <Link href="/convert/batch-converter" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">HEIC/AVIF Batch</Link>
                      <Link href="/convert/image-compressor" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Image Compressor</Link>
                      <Link href="/convert/json-to-sql" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">JSON to SQL</Link>
                    </div>
                    <Link href="/convert" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center rounded-lg px-2 py-2 mt-2 text-sm font-medium text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10">View All Converters</Link>
                  </div>
                )}
              </div>

              {/* Mobile Tools Accordion */}
              <div>
                <button
                  className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]"
                  onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
                >
                  <span className="flex items-center gap-3">
                    <Zap className="h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>Tools</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileToolsOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMobileToolsOpen && (
                  <div className="bg-[hsl(var(--muted))]/30 px-4 py-2 space-y-1">
                    <div className="mb-2">
                      <p className="text-[10px] font-semibold tracking-wider text-[hsl(var(--muted-foreground))] uppercase px-2 py-1">Invoicing</p>
                      <Link href="/tools/invoice-generator" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Invoice Generator</Link>
                      <Link href="/tools/profit-margin-calculator" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Profit Margin</Link>
                      <Link href="/tools/markup-calculator" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Markup Calculator</Link>
                    </div>
                    <div className="mb-2">
                      <p className="text-[10px] font-semibold tracking-wider text-[hsl(var(--muted-foreground))] uppercase px-2 py-1">Tax Tools</p>
                      <Link href="/tools/gst-vat-calculator" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">GST/VAT Calculator</Link>
                      <Link href="/tools/self-employed-tax-calculator" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Self-Employed Tax</Link>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-wider text-[hsl(var(--muted-foreground))] uppercase px-2 py-1">Investments</p>
                      <Link href="/tools/amortization-calculator" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Amortization</Link>
                      <Link href="/tools/rental-roi-calculator" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Rental ROI</Link>
                      <Link href="/tools/fire-calculator" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">FIRE Calculator</Link>
                    </div>
                    <Link href="/tools" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center rounded-lg px-2 py-2 mt-2 text-sm font-medium text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10">View All Tools</Link>
                  </div>
                )}
              </div>

              {/* Mobile Theme Toggle */}
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm font-medium text-[hsl(var(--foreground))]">Theme</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTheme("green")}
                    className={`h-5 w-5 rounded-full bg-[#16a34a] transition-all ${theme === 'green' ? 'ring-2 ring-offset-2 ring-[#16a34a] scale-110' : ''}`}
                    aria-label="Green theme"
                  />
                  <button
                    onClick={() => setTheme("blue")}
                    className={`h-5 w-5 rounded-full bg-[#3b82f6] transition-all ${theme === 'blue' ? 'ring-2 ring-offset-2 ring-[#3b82f6] scale-110' : ''}`}
                    aria-label="Blue theme"
                  />
                  <button
                    onClick={() => setTheme("violet")}
                    className={`h-5 w-5 rounded-full bg-[#8b5cf6] transition-all ${theme === 'violet' ? 'ring-2 ring-offset-2 ring-[#8b5cf6] scale-110' : ''}`}
                    aria-label="Violet theme"
                  />
                  <button
                    onClick={() => setTheme("orange")}
                    className={`h-5 w-5 rounded-full bg-[#f97316] transition-all ${theme === 'orange' ? 'ring-2 ring-offset-2 ring-[#f97316] scale-110' : ''}`}
                    aria-label="Orange theme"
                  />
                </div>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="p-4 space-y-3">
                <SignedOut>
                  <div suppressHydrationWarning className="grid grid-cols-2 gap-3">
                    <SignInButton mode="modal">
                      <Button variant="outline" className="w-full justify-center" onClick={() => setIsMobileMenuOpen(false)}>
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="w-full justify-center bg-gradient-button text-white shadow-lg" onClick={() => setIsMobileMenuOpen(false)}>
                        Get Started
                      </Button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[hsl(var(--muted-foreground))]">Signed in as {user?.primaryEmailAddress?.emailAddress}</span>
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
              </div>

            </div>
          </nav>
        </div>
      )}
    </header >
  );
};
