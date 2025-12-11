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
  CreditCard,
  Zap,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  const handleSolutionsItemClick = (path: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsSolutionsHovered(false);
    router.push(path);
  };

  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50">
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
                            <div
                              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))] text-center transition-all duration-200 cursor-pointer hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                              onClick={() => handleSolutionsItemClick("/about")}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                                <Building className="h-4 w-4" />
                              </div>
                              <span>About Us</span>
                            </div>
                            <div
                              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))] text-center transition-all duration-200 cursor-pointer hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                              onClick={() => handleSolutionsItemClick("/careers")}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                                <FileText className="h-4 w-4" />
                              </div>
                              <span>Careers</span>
                            </div>
                            <div
                              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))] text-center transition-all duration-200 cursor-pointer hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                              onClick={() => handleSolutionsItemClick("/privacy-policy")}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                                <Shield className="h-4 w-4" />
                              </div>
                              <span>Privacy Policy</span>
                            </div>
                            <div
                              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))] text-center transition-all duration-200 cursor-pointer hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                              onClick={() => handleSolutionsItemClick("/terms")}
                            >
                              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                                <Settings className="h-4 w-4" />
                              </div>
                              <span>Terms</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                          <button
                            onClick={() => handleSolutionsItemClick('/convert-bank-statement-to-csv-excel')}
                            className="bg-gradient-button text-[hsl(var(--primary-foreground))] px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                          >
                            Try for Free
                          </button>
                          <button
                            onClick={() => handleSolutionsItemClick('/about')}
                            className="bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[hsl(var(--secondary))] hover:border-[hsl(var(--primary))]/50 transition-all duration-200 hover:-translate-y-0.5"
                          >
                            Learn More
                          </button>
                        </div>
                      </div>

                      {/* Right: Solutions column */}
                      <div className="col-span-2 p-6">
                        <div className="mb-5 flex items-start justify-between">
                          <div>
                            <p className="text-xs font-semibold tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-2">SOLUTIONS</p>
                            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Financial Services</h3>
                            <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))] max-w-md">
                              Parse bank statements, pay stubs, tax forms, invoices, and more for finance and operations teams.
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div
                            className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--background))] px-3 py-3 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
                            onClick={() => handleSolutionsItemClick('/convert-bank-statement-to-csv-excel')}
                          >
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <Building className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Banking & Lending</p>
                              <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">Bank statements, pay stubs, and tax returns.</p>
                            </div>
                          </div>

                          <div className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-3 opacity-60 cursor-default">
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(var(--muted))]/50 text-[hsl(var(--muted-foreground))]">
                              <Shield className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
                                Insurance
                                <span className="text-[10px] font-medium bg-[hsl(var(--muted))] px-1.5 py-0.5 rounded">Coming Soon</span>
                              </p>
                              <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">Insurance policies, loss runs, and claims.</p>
                            </div>
                          </div>

                          <div className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-3 opacity-60 cursor-default">
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(var(--muted))]/50 text-[hsl(var(--muted-foreground))]">
                              <FileIcon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
                                Real Estate
                                <span className="text-[10px] font-medium bg-[hsl(var(--muted))] px-1.5 py-0.5 rounded">Coming Soon</span>
                              </p>
                              <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">Rent rolls, closing statements, and more.</p>
                            </div>
                          </div>

                          <div className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-3 opacity-60 cursor-default">
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(var(--muted))]/50 text-[hsl(var(--muted-foreground))]">
                              <Truck className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
                                Logistics
                                <span className="text-[10px] font-medium bg-[hsl(var(--muted))] px-1.5 py-0.5 rounded">Coming Soon</span>
                              </p>
                              <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">Bills of lading and invoices.</p>
                            </div>
                          </div>

                          <div className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-3 opacity-60 cursor-default">
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(var(--muted))]/50 text-[hsl(var(--muted-foreground))]">
                              <Heart className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
                                Healthcare
                                <span className="text-[10px] font-medium bg-[hsl(var(--muted))] px-1.5 py-0.5 rounded">Coming Soon</span>
                              </p>
                              <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">EOBs, policies, and contracts.</p>
                            </div>
                          </div>

                          <div className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-3 opacity-60 cursor-default">
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(var(--muted))]/50 text-[hsl(var(--muted-foreground))]">
                              <Settings className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
                                Custom
                                <span className="text-[10px] font-medium bg-[hsl(var(--muted))] px-1.5 py-0.5 rounded">Coming Soon</span>
                              </p>
                              <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">Work with our team on any document.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <a href="#use-cases" className="text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--primary))]">
              Use Cases
            </a>
            <Link href="/blogs" className="text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--primary))]">
              Blogs
            </Link>
            <a href="#pricing" className="text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--primary))]">
              Pricing
            </a>
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
                  className={`h-4 w-4 rounded-full bg-[#16a34a] transition-all hover:scale-110 ${theme === 'green' ? 'ring-2 ring-offset-1 ring-[#16a34a]' : ''}`}
                  aria-label="Green theme"
                />
                <button
                  onClick={() => setTheme("blue")}
                  className={`h-4 w-4 rounded-full bg-[#3b82f6] transition-all hover:scale-110 ${theme === 'blue' ? 'ring-2 ring-offset-1 ring-[#3b82f6]' : ''}`}
                  aria-label="Blue theme"
                />
                <button
                  onClick={() => setTheme("violet")}
                  className={`h-4 w-4 rounded-full bg-[#8b5cf6] transition-all hover:scale-110 ${theme === 'violet' ? 'ring-2 ring-offset-1 ring-[#8b5cf6]' : ''}`}
                  aria-label="Violet theme"
                />
                <button
                  onClick={() => setTheme("orange")}
                  className={`h-4 w-4 rounded-full bg-[#f97316] transition-all hover:scale-110 ${theme === 'orange' ? 'ring-2 ring-offset-1 ring-[#f97316]' : ''}`}
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
                      <button onClick={() => { setIsMobileMenuOpen(false); router.push('/about'); }} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">About Us</button>
                      <button onClick={() => { setIsMobileMenuOpen(false); }} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Contact Us</button>
                      <button onClick={() => { setIsMobileMenuOpen(false); router.push('/privacy-policy'); }} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Privacy Policy</button>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-wider text-[hsl(var(--muted-foreground))] uppercase px-2 py-1">Solutions</p>
                      <button onClick={() => { setIsMobileMenuOpen(false); router.push('/convert-bank-statement-to-csv-excel'); }} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Banking & Lending</button>
                      <button onClick={() => { setIsMobileMenuOpen(false); router.push('/convert-bank-statement-to-csv-excel'); }} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Insurance</button>
                      <button onClick={() => { setIsMobileMenuOpen(false); router.push('/convert-bank-statement-to-csv-excel'); }} className="block w-full text-left rounded-lg px-2 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))]">Real Estate</button>
                    </div>
                  </div>
                )}
              </div>

              <a
                href="#use-cases"
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <Zap className="h-4 w-4 text-[hsl(var(--primary))]" />
                  <span>Use Cases</span>
                </span>
              </a>

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

              <a
                href="#pricing"
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-[hsl(var(--primary))]" />
                  <span>Pricing</span>
                </span>
              </a>

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
                      <Button variant="outline" className="w-full justify-center">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="w-full justify-center bg-gradient-button text-white shadow-lg">
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
