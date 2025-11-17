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
import { useRouter } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { isAdminEmail } from "@/lib/auth";
import { useState, useRef } from "react";

export const Header = () => {
  const router = useRouter();
  const [isSolutionsHovered, setIsSolutionsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { user } = useUser();
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
        
        <nav className="hidden items-center gap-8 md:flex">
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
                          <div className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))] text-center transition-all duration-200 cursor-pointer hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow">
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <FileText className="h-4 w-4" />
                            </div>
                            <span>Contact Us</span>
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
                          <div className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))] text-center transition-all duration-200 cursor-pointer hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow">
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                              <Settings className="h-4 w-4" />
                            </div>
                            <span>Partners</span>
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
                        <button className="bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[hsl(var(--secondary))] hover:border-[hsl(var(--primary))]/50 transition-all duration-200 hover:-translate-y-0.5">
                          Talk to our team
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
                          className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-3 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow"
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

                        <div className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-3 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow">
                          <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                            <Shield className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Insurance</p>
                            <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">Insurance policies, loss runs, and claims documents.</p>
                          </div>
                        </div>

                        <div className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-3 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow">
                          <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                            <FileIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Real Estate</p>
                            <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">Offering memoranda, rent rolls, and closing statements.</p>
                          </div>
                        </div>

                        <div className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-3 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow">
                          <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                            <Truck className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Logistics</p>
                            <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">Rate confirmations, bills of lading, and invoices.</p>
                          </div>
                        </div>

                        <div className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-3 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow">
                          <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                            <Heart className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Healthcare</p>
                            <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">EOBs, healthcare policies, prior authorizations, and contracts.</p>
                          </div>
                        </div>

                        <div className="group flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-3 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-[hsl(var(--muted))]/40 hover:shadow-glow">
                          <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors">
                            <Settings className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Custom</p>
                            <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">Work with solution engineers on any document type.</p>
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
        
        <div className="flex items-center gap-2 md:gap-4">
          <SignedOut>
            <div suppressHydrationWarning>
              <SignInButton mode="modal">
                <Button variant="ghost" className="hidden md:inline-flex">
                  Sign In
                </Button>
              </SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            <div suppressHydrationWarning className="flex items-center gap-2">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="mr-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] transition-colors"
                  aria-label="Admin settings"
                >
                  <Settings className="h-4 w-4" />
                </Link>
              )}
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <Button
            className="hidden shadow-md md:inline-flex"
            onClick={() => router.push('/convert-bank-statement-to-csv-excel')}
          >
            Get Started
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      </div>
      {isMobileMenuOpen && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-4 md:hidden">
          <nav className="pt-3">
            <div className="rounded-2xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--card))]/95 overflow-hidden divide-y divide-[hsl(var(--border))]/70">
              <button
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push('/convert-bank-statement-to-csv-excel');
                }}
              >
                <span className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-[hsl(var(--primary))]" />
                  <span>Solutions</span>
                </span>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Bank Statements</span>
              </button>

              <a
                href="#use-cases"
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <Zap className="h-4 w-4 text-[hsl(var(--primary))]" />
                  <span>Use Cases</span>
                </span>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">How teams use us</span>
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
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Guides & updates</span>
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
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Simple plans</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
