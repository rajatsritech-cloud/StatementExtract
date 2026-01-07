"use client";

import { Button } from "@/components/ui/button";
import {
  FileText,
  Menu,
  X,
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
  Flame,
  LayoutDashboard,
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
import { FeedbackModal } from "@/components/FeedbackModal";

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

  const isAnyDropdownOpen = isSolutionsHovered || isConvertersHovered || isToolsHovered;

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

  // Hide Auth buttons on generic converter and tool pages
  // Flagship tools (e.g., /convert-bank-statement-to-csv-excel) are at root so they are NOT generic.
  const isGenericPage =
    pathname === '/convert' ||
    pathname?.startsWith('/convert/') ||
    pathname === '/tools' ||
    pathname?.startsWith('/tools/');

  const shouldShowAuth = !isGenericPage;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-[hsl(var(--border))]/40 bg-[hsl(var(--background))]/80 backdrop-blur-md transition-all support-[backdrop-filter]:bg-[hsl(var(--background))]/60">
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
              <span className="text-lg font-bold text-[hsl(var(--foreground))] md:text-xl whitespace-nowrap">
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
                        <div className="col-span-1 flex flex-col justify-between p-6">
                          <div>
                            <p className="text-xs font-bold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-4">COMPANY</p>
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
                              <p className="text-xs font-bold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-4">SOLUTIONS</p>
                              <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Bank Statement Processing</h3>
                              <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))] max-w-md">
                                Convert PDF bank statements to Excel, CSV, QuickBooks, and Xero for accountants and bookkeepers.
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <Link
                              href="/convert-bank-statement-to-csv-excel"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-3 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
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
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-3 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
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
                        {/* PDF TOOLS - Orange Theme */}
                        <div className="col-span-1 p-6">
                          <p className="text-xs font-bold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-4">PDF TOOLS</p>
                          <div className="space-y-2">
                            <Link
                              href="/convert/merge-pdf"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-500/5"
                              onClick={closeConvertersDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                <Layers className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-orange-500 transition-colors">Merge PDF</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Combine multiple PDFs</p>
                              </div>
                            </Link>
                            <Link
                              href="/convert/compress-pdf"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-500/5"
                              onClick={closeConvertersDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                <Minimize2 className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-orange-500 transition-colors">Compress PDF</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Reduce file size</p>
                              </div>
                            </Link>
                            <Link
                              href="/convert/split-pdf"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-500/5"
                              onClick={closeConvertersDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                <FileIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-orange-500 transition-colors">Split PDF</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Extract pages</p>
                              </div>
                            </Link>
                            <Link
                              href="/convert/jpg-to-pdf"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-500/5"
                              onClick={closeConvertersDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                <FileImage className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-orange-500 transition-colors">JPG to PDF</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Images to PDF</p>
                              </div>
                            </Link>
                          </div>
                        </div>

                        {/* FINANCE - Amber/Gold Theme */}
                        <div className="col-span-1 p-6">
                          <p className="text-xs font-bold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-4">FINANCE</p>
                          <div className="space-y-2">
                            <Link
                              href="/convert-bank-statement-to-csv-excel"
                              className="group flex items-start gap-3 rounded-xl border border-amber-500/50 bg-amber-500/5 px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-amber-500/50 hover:bg-amber-500/5"
                              onClick={closeConvertersDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                <FileSpreadsheet className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-amber-500 transition-colors">Bank to Excel/CSV</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">AI-powered extraction</p>
                              </div>
                            </Link>
                            <Link
                              href="/convert-invoice-to-excel-csv"
                              className="group flex items-start gap-3 rounded-xl border border-amber-500/50 bg-amber-500/5 px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-amber-500/50 hover:bg-amber-500/5"
                              onClick={closeConvertersDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                <FileText className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-amber-500 transition-colors">Invoice to Excel</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Extract invoice data</p>
                              </div>
                            </Link>
                            <Link
                              href="/convert/csv-to-qbo"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-amber-500/50 hover:bg-amber-500/5"
                              onClick={closeConvertersDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                <FileSpreadsheet className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-amber-500 transition-colors">CSV to QBO</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">QuickBooks format</p>
                              </div>
                            </Link>
                            <Link
                              href="/convert/csv-to-ofx"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-amber-500/50 hover:bg-amber-500/5"
                              onClick={closeConvertersDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                <FileSpreadsheet className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-amber-500 transition-colors">CSV to OFX</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Universal banking</p>
                              </div>
                            </Link>
                            <Link
                              href="/convert/csv-to-mt940"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-amber-500/50 hover:bg-amber-500/5"
                              onClick={closeConvertersDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                <FileSpreadsheet className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-amber-500 transition-colors">CSV to MT940</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">SWIFT format</p>
                              </div>
                            </Link>
                          </div>
                        </div>

                        {/* IMAGE & DEV - Purple Theme */}
                        <div className="col-span-1 p-6">
                          <p className="text-xs font-bold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-4">IMAGE & DEV</p>
                          <div className="space-y-2">
                            <Link
                              href="/convert/batch-converter"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-purple-500/50 hover:bg-purple-500/5"
                              onClick={closeConvertersDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <Images className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-purple-500 transition-colors">HEIC/AVIF Batch</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Bulk image convert</p>
                              </div>
                            </Link>
                            <Link
                              href="/convert/image-compressor"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-purple-500/50 hover:bg-purple-500/5"
                              onClick={closeConvertersDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <Minimize2 className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-purple-500 transition-colors">Image Compressor</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Reduce image size</p>
                              </div>
                            </Link>
                            <Link
                              href="/convert/json-to-sql"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-purple-500/50 hover:bg-purple-500/5"
                              onClick={closeConvertersDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <Database className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-purple-500 transition-colors">JSON to SQL</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Database import</p>
                              </div>
                            </Link>
                          </div>
                          <Link
                            href="/convert"
                            className="mt-6 flex items-center justify-end gap-2 text-sm font-bold hover:text-purple-500 hover:underline transition-colors"
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
                    <div className="relative w-[880px] rounded-2xl bg-[hsl(var(--card))] shadow-xl border border-[hsl(var(--border))] overflow-hidden animate-dropdown-enter">
                      <div className="grid grid-cols-3 divide-x divide-[hsl(var(--border))]/70">
                        {/* INVOICING - Orange Theme */}
                        <div className="col-span-1 p-6">
                          <p className="text-xs font-bold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-4">INVOICING</p>
                          <div className="space-y-2">
                            <Link
                              href="/tools/invoice-generator"
                              className="group flex items-start gap-3 rounded-xl border border-orange-500/50 bg-orange-500/5 px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-500/5"
                              onClick={closeToolsDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                <FileText className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-orange-500 transition-colors">Invoice Generator</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Professional PDF invoices</p>
                              </div>
                            </Link>
                            <Link
                              href="/convert-invoice-to-excel-csv"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-500/5"
                              onClick={closeToolsDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                <FileSpreadsheet className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-orange-500 transition-colors">Invoice to Excel</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Convert PDF to Excel</p>
                              </div>
                            </Link>
                            <Link
                              href="/tools/profit-margin-calculator"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-500/5"
                              onClick={closeToolsDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                <TrendingUp className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-orange-500 transition-colors">Profit Margin</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Calculate margins</p>
                              </div>
                            </Link>
                            <Link
                              href="/tools/markup-calculator"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-500/5"
                              onClick={closeToolsDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                <Calculator className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-orange-500 transition-colors">Markup Calculator</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Price markup tool</p>
                              </div>
                            </Link>
                          </div>
                        </div>

                        {/* TAX TOOLS - Amber/Gold Theme */}
                        <div className="col-span-1 p-6">
                          <p className="text-xs font-bold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-4">TAX TOOLS</p>
                          <div className="space-y-2">
                            <Link
                              href="/tools/gst-vat-calculator"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-amber-500/50 hover:bg-amber-500/5"
                              onClick={closeToolsDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                <Receipt className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-amber-500 transition-colors">GST/VAT Calculator</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Global tax rates</p>
                              </div>
                            </Link>
                            <Link
                              href="/tools/self-employed-tax-calculator"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-amber-500/50 hover:bg-amber-500/5"
                              onClick={closeToolsDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                <Calculator className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-amber-500 transition-colors">Self-Employed Tax</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">1099 tax calculator</p>
                              </div>
                            </Link>
                            <Link
                              href="/tools/financial-ratio-calculator"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-amber-500/50 hover:bg-amber-500/5"
                              onClick={closeToolsDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                <TrendingUp className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-amber-500 transition-colors">Financial Ratios</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Key business metrics</p>
                              </div>
                            </Link>
                          </div>
                        </div>

                        {/* INVESTMENTS - Purple Theme */}
                        <div className="col-span-1 p-6">
                          <p className="text-xs font-bold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-4">INVESTMENTS</p>
                          <div className="space-y-2">
                            <Link
                              href="/tools/compound-interest-calculator"
                              className="group flex items-start gap-3 rounded-xl border border-purple-500/50 bg-purple-500/5 px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-purple-500/50 hover:bg-purple-500/5"
                              onClick={closeToolsDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <TrendingUp className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-purple-500 transition-colors">Compound Interest</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Investment growth</p>
                              </div>
                            </Link>
                            <Link
                              href="/tools/amortization-calculator"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-purple-500/50 hover:bg-purple-500/5"
                              onClick={closeToolsDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <TrendingDown className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-purple-500 transition-colors">Amortization</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Loan schedules</p>
                              </div>
                            </Link>
                            <Link
                              href="/tools/rental-roi-calculator"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-purple-500/50 hover:bg-purple-500/5"
                              onClick={closeToolsDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <Layers className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-purple-500 transition-colors">Rental ROI</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Property returns</p>
                              </div>
                            </Link>
                            <Link
                              href="/tools/fire-calculator"
                              className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2.5 cursor-pointer transition-all duration-200 hover:border-purple-500/50 hover:bg-purple-500/5"
                              onClick={closeToolsDropdown}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <Flame className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-[hsl(var(--foreground))] group-hover:text-purple-500 transition-colors">FIRE Calculator</p>
                                <p className="text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--muted-foreground))]/80">Retirement planning</p>
                              </div>
                            </Link>
                          </div>
                          <Link
                            href="/tools"
                            className="mt-6 flex items-center justify-end gap-2 text-sm font-bold hover:text-purple-500 hover:underline transition-colors"
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

              <FeedbackModal />

              {shouldShowAuth && (
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
              )}

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

              {shouldShowAuth && (
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button className="hidden shadow-md">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </SignedOut>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Toggle navigation menu"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>


      </header >

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[5.25rem] z-50 bg-[hsl(var(--background))] lg:hidden animate-in slide-in-from-top-8 duration-300">
          <nav className="flex flex-col h-full overflow-y-auto">
            <div className="flex flex-col py-4">
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-3">
                    <LayoutDashboard className="h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>Dashboard</span>
                  </span>
                </Link>
              </SignedIn>

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
                      <Link href="/convert-bank-statement-to-csv-excel" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Financial Auditing</Link>
                    </div >
                    <div className="mb-2">
                      <p className="text-[10px] font-semibold tracking-wider text-[hsl(var(--muted-foreground))] uppercase px-2 py-1">Image & Dev</p>
                      <Link href="/convert/batch-converter" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">HEIC/AVIF Batch</Link>
                      <Link href="/convert/image-compressor" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Image Compressor</Link>
                      <Link href="/convert/json-to-sql" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">JSON to SQL</Link>
                    </div>
                    <Link href="/convert" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center rounded-lg px-2 py-2 mt-2 text-sm font-medium text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10">View All Converters</Link>
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
                {shouldShowAuth && (
                  <SignedOut>
                    <div suppressHydrationWarning className="grid grid-cols-2 gap-3">
                      <SignInButton mode="modal">
                        <Button variant="outline" className="w-full justify-center" onClick={() => setIsMobileMenuOpen(false)}>
                          Sign In
                        </Button>
                      </SignInButton>
                      <Link href="/convert-bank-statement-to-csv-excel" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                        <Button className="w-full justify-center bg-gradient-button text-white shadow-lg">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </SignedOut>
                )}
                <SignedIn>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[hsl(var(--muted-foreground))]">Signed in as {user?.primaryEmailAddress?.emailAddress}</span>
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
              </div>

            </div >
          </nav >
        </div >
      )}

      {/* Backdrop Blur Overlay */}
      {
        isAnyDropdownOpen && (
          <div
            className="fixed inset-0 top-[5.25rem] z-40 bg-black/10 backdrop-blur-[2px] transition-all duration-300 animate-in fade-in"
            aria-hidden="true"
          />
        )
      }
    </>
  );
};
