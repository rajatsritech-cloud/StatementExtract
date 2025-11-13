"use client";

import { Button } from "@/components/ui/button";
import { FileText, Menu, ChevronDown, Building, FileText as FileIcon, Shield, Truck, Heart, Settings, CreditCard, IdCard, FileCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useState } from "react";

export const Header = () => {
  const router = useRouter();
  const [isSolutionsHovered, setIsSolutionsHovered] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);

  const handleMouseEnter = () => setIsSolutionsHovered(true);
  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!isDropdownHovered) {
        setIsSolutionsHovered(false);
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Statement Extract home">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-[hsl(var(--foreground))]">Statement <span className="bg-gradient-primary bg-clip-text text-transparent">Extract</span></span>
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
                onMouseEnter={() => setIsDropdownHovered(true)}
                onMouseLeave={() => {
                  setIsDropdownHovered(false);
                  setIsSolutionsHovered(false);
                }}
              >
                {/* Dropdown card - Theme Aligned */}
                <div className="relative w-[800px] rounded-xl bg-[hsl(var(--card))] shadow-2xl border border-[hsl(var(--border))] overflow-hidden">
                  <div className="p-6 grid grid-cols-3 gap-6">
                    {/* Left: grid of solution cards */}
                    <div className="col-span-2">
                      <div className="grid grid-cols-2 gap-4">
                        {/* Financial Services */}
                        <div
                          className="group flex gap-3 items-start bg-[hsl(var(--muted))]/50 rounded-lg p-3 border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] hover:border-[hsl(var(--primary))]/50 transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
                          onClick={() => router.push('/convert-bank-statement-to-csv-excel')}
                        >
                          <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 group-hover:bg-[hsl(var(--primary))] transition-colors">
                            <Building className="h-5 w-5 text-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors" />
                          </div>
                          <div>
                            <div className="font-semibold text-[hsl(var(--foreground))] text-sm group-hover:text-[hsl(var(--primary))] transition-colors">Financial Services</div>
                            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Parse bank statements, pay stubs, tax forms, and more</div>
                          </div>
                        </div>

                        {/* Insurance */}
                        <div className="group flex gap-3 items-start bg-[hsl(var(--muted))]/50 rounded-lg p-3 border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] hover:border-[hsl(var(--primary))]/50 transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-0.5">
                          <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 group-hover:bg-[hsl(var(--primary))] transition-colors">
                            <Shield className="h-5 w-5 text-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors" />
                          </div>
                          <div>
                            <div className="font-semibold text-[hsl(var(--foreground))] text-sm group-hover:text-[hsl(var(--primary))] transition-colors">Insurance</div>
                            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Parse loss runs, ACORD forms, policies, and more</div>
                          </div>
                        </div>

                        {/* Property */}
                        <div className="group flex gap-3 items-start bg-[hsl(var(--muted))]/50 rounded-lg p-3 border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] hover:border-[hsl(var(--primary))]/50 transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-0.5">
                          <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 group-hover:bg-[hsl(var(--primary))] transition-colors">
                            <FileIcon className="h-5 w-5 text-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors" />
                          </div>
                          <div>
                            <div className="font-semibold text-[hsl(var(--foreground))] text-sm group-hover:text-[hsl(var(--primary))] transition-colors">Property</div>
                            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Parse offering memos, closing disclosures, rent rolls, and more</div>
                          </div>
                        </div>

                        {/* Logistics */}
                        <div className="group flex gap-3 items-start bg-[hsl(var(--muted))]/50 rounded-lg p-3 border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] hover:border-[hsl(var(--primary))]/50 transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-0.5">
                          <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 group-hover:bg-[hsl(var(--primary))] transition-colors">
                            <Truck className="h-5 w-5 text-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors" />
                          </div>
                          <div>
                            <div className="font-semibold text-[hsl(var(--foreground))] text-sm group-hover:text-[hsl(var(--primary))] transition-colors">Logistics</div>
                            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Parse rate confirmations, bills of lading, invoices, and more</div>
                          </div>
                        </div>

                        {/* Healthcare */}
                        <div className="group flex gap-3 items-start bg-[hsl(var(--muted))]/50 rounded-lg p-3 border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] hover:border-[hsl(var(--primary))]/50 transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-0.5">
                          <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 group-hover:bg-[hsl(var(--primary))] transition-colors">
                            <Heart className="h-5 w-5 text-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors" />
                          </div>
                          <div>
                            <div className="font-semibold text-[hsl(var(--foreground))] text-sm group-hover:text-[hsl(var(--primary))] transition-colors">Healthcare</div>
                            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Parse EOBs, policies, payer confirmations, and more</div>
                          </div>
                        </div>

                        {/* Custom */}
                        <div className="group flex gap-3 items-start bg-[hsl(var(--muted))]/50 rounded-lg p-3 border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] hover:border-[hsl(var(--primary))]/50 transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-0.5">
                          <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[hsl(var(--primary))]/10 group-hover:bg-[hsl(var(--primary))] transition-colors">
                            <Settings className="h-5 w-5 text-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors" />
                          </div>
                          <div>
                            <div className="font-semibold text-[hsl(var(--foreground))] text-sm group-hover:text-[hsl(var(--primary))] transition-colors">Custom</div>
                            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Leverage solution engineers to tackle any document automation use case</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-3">
                        <button 
                          onClick={() => router.push('/convert-bank-statement-to-csv-excel')}
                          className="bg-gradient-button text-[hsl(var(--primary-foreground))] px-6 py-2.5 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                        >
                          Try for Free
                        </button>
                        <button className="bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[hsl(var(--secondary))] hover:border-[hsl(var(--primary))]/50 transition-all duration-200 hover:-translate-y-0.5">
                          Talk to our team
                        </button>
                      </div>
                    </div>

                    {/* Right column: extract list */}
                    <aside className="col-span-1 bg-[hsl(var(--muted))]/30 rounded-lg p-4 border border-[hsl(var(--border))]">
                      <h4 className="text-xs tracking-wide font-bold text-[hsl(var(--primary))] mb-4">EXTRACT</h4>
                      <ul className="space-y-3">
                        {/* Bank Statements */}
                        <li 
                          className="group flex items-start gap-3 cursor-pointer p-2 rounded-lg hover:bg-[hsl(var(--muted))]/50 transition-all duration-200 hover:translate-x-1"
                          onClick={() => router.push('/convert-bank-statement-to-csv-excel')}
                        >
                          <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] transition-colors" />
                          <div>
                            <div className="font-medium text-[hsl(var(--foreground))] text-sm group-hover:text-[hsl(var(--primary))] transition-colors">Bank Statements</div>
                            <div className="text-xs text-[hsl(var(--muted-foreground))]">Real-time bank statement processing</div>
                          </div>
                        </li>

                        {/* Driver's Licenses */}
                        <li className="group flex items-start gap-3 cursor-pointer p-2 rounded-lg hover:bg-[hsl(var(--muted))]/50 transition-all duration-200 hover:translate-x-1">
                          <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))]" />
                          <div>
                            <div className="font-medium text-[hsl(var(--foreground))] text-sm group-hover:text-[hsl(var(--primary))] transition-colors">Driver's Licenses</div>
                            <div className="text-xs text-[hsl(var(--muted-foreground))]">Extract identification details from driver's licenses</div>
                          </div>
                        </li>

                        {/* Policy Declaration Pages */}
                        <li className="group flex items-start gap-3 cursor-pointer p-2 rounded-lg hover:bg-[hsl(var(--muted))]/50 transition-all duration-200 hover:translate-x-1">
                          <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))]" />
                          <div>
                            <div className="font-medium text-[hsl(var(--foreground))] text-sm group-hover:text-[hsl(var(--primary))] transition-colors">Policy Declaration Pages</div>
                            <div className="text-xs text-[hsl(var(--muted-foreground))]">Instantly parse policy declaration pages</div>
                          </div>
                        </li>

                        {/* Utility Bills */}
                        <li className="group flex items-start gap-3 cursor-pointer p-2 rounded-lg hover:bg-[hsl(var(--muted))]/50 transition-all duration-200 hover:translate-x-1">
                          <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))]" />
                          <div>
                            <div className="font-medium text-[hsl(var(--foreground))] text-sm group-hover:text-[hsl(var(--primary))] transition-colors">Utility Bills</div>
                            <div className="text-xs text-[hsl(var(--muted-foreground))]">Extract data from utility bills in seconds</div>
                          </div>
                        </li>
                      </ul>

                      <div className="mt-4">
                        <a className="inline-flex items-center text-xs font-bold text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-light))] transition-colors group cursor-pointer">
                          VIEW MORE 
                          <svg className="ml-2 w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            )}
          </div>
          <a href="#use-cases" className="text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">
            Use Cases
          </a>
          <a href="#docs" className="text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">
            Documentation
          </a>
          <a href="#pricing" className="text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">
            Pricing
          </a>
        </nav>
        
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" className="hidden md:inline-flex">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div suppressHydrationWarning>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <Button 
            className="shadow-md"
            onClick={() => router.push('/convert-bank-statement-to-csv-excel')}
          >
            Get Started
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
