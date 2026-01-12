"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import {
    Calculator,
    DollarSign,
    Calendar,
    TrendingDown,
    FileText,
    Info,
    CheckCircle2,
    PieChart,
    Building2,
    Briefcase
} from "lucide-react";

// 2024 US Tax Brackets (Single)
const TAX_BRACKETS_SINGLE_2024 = [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
];

// 2025 US Tax Brackets (Single - Estimated/Inflation Adjusted)
const TAX_BRACKETS_SINGLE_2025 = [
    { min: 0, max: 11925, rate: 0.10 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
];

// 2024 US Tax Brackets (Married Filing Jointly)
const TAX_BRACKETS_MFJ_2024 = [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
];

// 2025 US Tax Brackets (Married Filing Jointly - Estimated/Inflation Adjusted)
const TAX_BRACKETS_MFJ_2025 = [
    { min: 0, max: 23850, rate: 0.10 },
    { min: 23850, max: 96950, rate: 0.12 },
    { min: 96950, max: 206700, rate: 0.22 },
    { min: 206700, max: 394600, rate: 0.24 },
    { min: 394600, max: 501050, rate: 0.32 },
    { min: 501050, max: 751600, rate: 0.35 },
    { min: 751600, max: Infinity, rate: 0.37 },
];

// Standard Deductions
const STANDARD_DEDUCTIONS = {
    "2024": {
        single: 14600,
        married: 29200,
        hoh: 21900,
    },
    "2025": {
        single: 15000, // Projected
        married: 30000, // Projected
        hoh: 22500, // Projected
    }
};

// Year for calculations
type TaxYear = "2024" | "2025";

// SE Tax constants (unchanged rates)
const SS_TAX_RATE = 0.124; // 12.4%
const SS_WAGE_BASE_2024 = 168600;
const SS_WAGE_BASE_2025 = 175000; // Estimated increase
const MEDICARE_RATE = 0.029; // 2.9%
const ADDITIONAL_MEDICARE_RATE = 0.009; // 0.9%
const ADDITIONAL_MEDICARE_THRESHOLD = 200000;

// Quarterly payment deadlines
const QUARTERLY_DEADLINES = {
    "2024": [
        { quarter: "Q1", period: "Jan 1 - Mar 31", deadline: "April 15, 2024" },
        { quarter: "Q2", period: "Apr 1 - May 31", deadline: "June 17, 2024" },
        { quarter: "Q3", period: "Jun 1 - Aug 31", deadline: "September 16, 2024" },
        { quarter: "Q4", period: "Sep 1 - Dec 31", deadline: "January 15, 2025" },
    ],
    "2025": [
        { quarter: "Q1", period: "Jan 1 - Mar 31", deadline: "April 15, 2025" },
        { quarter: "Q2", period: "Apr 1 - May 31", deadline: "June 16, 2025" },
        { quarter: "Q3", period: "Jun 1 - Aug 31", deadline: "September 15, 2025" },
        { quarter: "Q4", period: "Sep 1 - Dec 31", deadline: "January 15, 2026" },
    ]
};

type FilingStatus = "single" | "married" | "hoh";

interface TaxResults {
    grossIncome: number;
    businessExpenses: number;
    netSelfEmploymentIncome: number;
    selfEmploymentTax: number;
    seTaxDeduction: number;
    adjustedGrossIncome: number;
    standardDeduction: number;
    qbiDeduction: number;
    taxableIncome: number;
    federalIncomeTax: number;
    totalTax: number;
    effectiveRate: number;
    quarterlyPayment: number;
    takeHome: number;
}

// Calculate federal income tax based on brackets
const calculateIncomeTax = (taxableIncome: number, filingStatus: FilingStatus, year: TaxYear): number => {
    let brackets;
    if (year === "2025") {
        brackets = filingStatus === "married" ? TAX_BRACKETS_MFJ_2025 : TAX_BRACKETS_SINGLE_2025;
    } else {
        brackets = filingStatus === "married" ? TAX_BRACKETS_MFJ_2024 : TAX_BRACKETS_SINGLE_2024;
    }

    let tax = 0;
    let remainingIncome = taxableIncome;

    for (const bracket of brackets) {
        if (remainingIncome <= 0) break;
        const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
        tax += taxableInBracket * bracket.rate;
        remainingIncome -= taxableInBracket;
    }

    return Math.max(0, tax);
};

// Calculate self-employment tax
const calculateSETax = (netIncome: number, year: TaxYear): number => {
    // SE tax is calculated on 92.35% of net self-employment income
    const seIncomeBase = netIncome * 0.9235;
    const wageBase = year === "2025" ? SS_WAGE_BASE_2025 : SS_WAGE_BASE_2024;

    // Social Security portion (capped at wage base)
    const ssTaxableIncome = Math.min(seIncomeBase, wageBase);
    const ssTax = ssTaxableIncome * SS_TAX_RATE;

    // Medicare portion (no cap)
    let medicareTax = seIncomeBase * MEDICARE_RATE;

    // Additional Medicare tax for high earners
    if (seIncomeBase > ADDITIONAL_MEDICARE_THRESHOLD) {
        medicareTax += (seIncomeBase - ADDITIONAL_MEDICARE_THRESHOLD) * ADDITIONAL_MEDICARE_RATE;
    }

    return ssTax + medicareTax;
};

export function SelfEmployedTaxCalculator() {
    const [grossIncome, setGrossIncome] = useState<string>("75000");
    const [businessExpenses, setBusinessExpenses] = useState<string>("15000");
    const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
    const [taxYear, setTaxYear] = useState<TaxYear>("2024");
    const [includeQBI, setIncludeQBI] = useState(true);
    const [showBreakdown, setShowBreakdown] = useState(false);

    // Calculate all taxes
    const results = useMemo((): TaxResults | null => {
        const gross = parseFloat(grossIncome.replace(/,/g, "")) || 0;
        const expenses = parseFloat(businessExpenses.replace(/,/g, "")) || 0;

        if (gross <= 0) return null;

        // Net self-employment income
        const netSEIncome = Math.max(0, gross - expenses);

        // Self-employment tax
        const seTax = calculateSETax(netSEIncome, taxYear);

        // 50% of SE tax is deductible
        const seTaxDeduction = seTax * 0.5;

        // Adjusted Gross Income
        const agi = netSEIncome - seTaxDeduction;

        // Standard deduction
        const standardDeduction = STANDARD_DEDUCTIONS[taxYear][filingStatus];

        // QBI Deduction (20% of net SE income, simplified - actual has income limits)
        const qbiDeduction = includeQBI ? Math.min(netSEIncome * 0.20, agi * 0.20) : 0;

        // Taxable income
        const taxableIncome = Math.max(0, agi - standardDeduction - qbiDeduction);

        // Federal income tax
        const federalTax = calculateIncomeTax(taxableIncome, filingStatus, taxYear);

        // Total tax
        const totalTax = seTax + federalTax;

        // Effective rate
        const effectiveRate = gross > 0 ? (totalTax / gross) * 100 : 0;

        // Quarterly estimated payment
        const quarterlyPayment = totalTax / 4;

        // Take-home (after taxes and expenses)
        const takeHome = gross - expenses - totalTax;

        return {
            grossIncome: gross,
            businessExpenses: expenses,
            netSelfEmploymentIncome: netSEIncome,
            selfEmploymentTax: seTax,
            seTaxDeduction,
            adjustedGrossIncome: agi,
            standardDeduction,
            qbiDeduction,
            taxableIncome,
            federalIncomeTax: federalTax,
            totalTax,
            effectiveRate,
            quarterlyPayment,
            takeHome,
        };
    }, [grossIncome, businessExpenses, filingStatus, taxYear, includeQBI]);

    // Format currency
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
                <Breadcrumb
                    items={[
                        { label: "Business Tools", href: "/tools" },
                        { label: "Self-Employed Tax Calculator" }
                    ]}
                />
                <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-blue-600 mb-4">
                    Self-Employed Tax Calculator
                </h1>
                <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto font-normal">
                    Calculate your federal income tax, self-employment tax, and quarterly estimated payments.
                    Includes QBI deduction and {taxYear} tax brackets.
                </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                    <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-[hsl(var(--primary))]" />
                        Your Income Details
                    </h2>

                    <div className="space-y-4">
                        {/* Tax Year Selection */}
                        <div className="bg-[hsl(var(--muted))]/30 p-1 rounded-lg flex">
                            <button
                                onClick={() => setTaxYear("2024")}
                                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${taxYear === "2024" ? "bg-[hsl(var(--background))] shadow text-[hsl(var(--foreground))]" : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"}`}
                            >
                                2024 (File in 2025)
                            </button>
                            <button
                                onClick={() => setTaxYear("2025")}
                                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${taxYear === "2025" ? "bg-[hsl(var(--background))] shadow text-[hsl(var(--foreground))]" : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"}`}
                            >
                                2025 (Projected)
                            </button>
                        </div>

                        {/* Gross Income */}
                        <div>
                            <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1">
                                Gross Self-Employment Income (Annual)
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                                <input
                                    type="text"
                                    value={grossIncome}
                                    onChange={(e) => setGrossIncome(e.target.value.replace(/[^0-9,]/g, ""))}
                                    placeholder="75,000"
                                    className="w-full pl-9 pr-4 py-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] text-lg"
                                />
                            </div>
                            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                Total 1099 income before expenses
                            </p>
                        </div>

                        {/* Business Expenses */}
                        <div>
                            <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1">
                                Business Expenses (Deductions)
                            </label>
                            <div className="relative">
                                <TrendingDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                                <input
                                    type="text"
                                    value={businessExpenses}
                                    onChange={(e) => setBusinessExpenses(e.target.value.replace(/[^0-9,]/g, ""))}
                                    placeholder="15,000"
                                    className="w-full pl-9 pr-4 py-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] text-lg"
                                />
                            </div>
                            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                Equipment, supplies, home office, mileage, etc.
                            </p>
                        </div>

                        {/* Filing Status */}
                        <div>
                            <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1">
                                Filing Status
                            </label>
                            <select
                                value={filingStatus}
                                onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
                                className="w-full p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                            >
                                <option value="single">Single</option>
                                <option value="married">Married Filing Jointly</option>
                                <option value="hoh">Head of Household</option>
                            </select>
                        </div>

                        {/* QBI Toggle */}
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--muted))]/30">
                            <input
                                type="checkbox"
                                id="qbi"
                                checked={includeQBI}
                                onChange={(e) => setIncludeQBI(e.target.checked)}
                                className="w-4 h-4 rounded border-[hsl(var(--border))]"
                            />
                            <label htmlFor="qbi" className="text-sm text-[hsl(var(--foreground))]">
                                Include QBI Deduction (20%)
                            </label>
                            <span title="Qualified Business Income Deduction">
                                <Info className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="space-y-4">
                    {results && (
                        <>
                            {/* Summary Card */}
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/20">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">Total Tax Owed</p>
                                        <p className="text-3xl font-bold text-[hsl(var(--foreground))]">
                                            {formatCurrency(results.totalTax)}
                                        </p>
                                        <p className="text-xs text-[hsl(var(--muted-foreground))]">
                                            {results.effectiveRate.toFixed(1)}% effective rate
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">Quarterly Payment</p>
                                        <p className="text-3xl font-bold text-[hsl(var(--primary))]">
                                            {formatCurrency(results.quarterlyPayment)}
                                        </p>
                                        <p className="text-xs text-[hsl(var(--muted-foreground))]">
                                            Due each quarter
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-[hsl(var(--border))]">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-[hsl(var(--muted-foreground))]">Estimated Take-Home</span>
                                        <span className="text-xl font-semibold text-green-600">{formatCurrency(results.takeHome)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tax Breakdown */}
                            <div className="p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <button
                                    onClick={() => setShowBreakdown(!showBreakdown)}
                                    className="w-full flex items-center justify-between text-left"
                                >
                                    <span className="font-medium text-[hsl(var(--foreground))] flex items-center gap-2">
                                        <PieChart className="w-4 h-4 text-[hsl(var(--primary))]" />
                                        Tax Breakdown
                                    </span>
                                    <span className="text-sm text-[hsl(var(--primary))]">
                                        {showBreakdown ? "Hide" : "Show"}
                                    </span>
                                </button>

                                {showBreakdown && (
                                    <div className="mt-4 space-y-2 text-sm">
                                        <div className="flex justify-between py-1">
                                            <span className="text-[hsl(var(--muted-foreground))]">Gross Income</span>
                                            <span className="text-[hsl(var(--foreground))]">{formatCurrency(results.grossIncome)}</span>
                                        </div>
                                        <div className="flex justify-between py-1">
                                            <span className="text-[hsl(var(--muted-foreground))]">− Business Expenses</span>
                                            <span className="text-red-500">-{formatCurrency(results.businessExpenses)}</span>
                                        </div>
                                        <div className="flex justify-between py-1 border-t border-[hsl(var(--border))]">
                                            <span className="text-[hsl(var(--foreground))] font-medium">Net SE Income</span>
                                            <span className="text-[hsl(var(--foreground))]">{formatCurrency(results.netSelfEmploymentIncome)}</span>
                                        </div>
                                        <div className="flex justify-between py-1">
                                            <span className="text-[hsl(var(--muted-foreground))]">− SE Tax Deduction (50%)</span>
                                            <span className="text-green-600">-{formatCurrency(results.seTaxDeduction)}</span>
                                        </div>
                                        <div className="flex justify-between py-1">
                                            <span className="text-[hsl(var(--muted-foreground))]">− Standard Deduction</span>
                                            <span className="text-green-600">-{formatCurrency(results.standardDeduction)}</span>
                                        </div>
                                        {results.qbiDeduction > 0 && (
                                            <div className="flex justify-between py-1">
                                                <span className="text-[hsl(var(--muted-foreground))]">− QBI Deduction</span>
                                                <span className="text-green-600">-{formatCurrency(results.qbiDeduction)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between py-1 border-t border-[hsl(var(--border))]">
                                            <span className="text-[hsl(var(--foreground))] font-medium">Taxable Income</span>
                                            <span className="text-[hsl(var(--foreground))]">{formatCurrency(results.taxableIncome)}</span>
                                        </div>
                                        <div className="flex justify-between py-2 mt-2 bg-[hsl(var(--muted))]/30 rounded px-2">
                                            <span className="text-[hsl(var(--muted-foreground))]">Federal Income Tax</span>
                                            <span className="text-[hsl(var(--foreground))]">{formatCurrency(results.federalIncomeTax)}</span>
                                        </div>
                                        <div className="flex justify-between py-2 bg-[hsl(var(--muted))]/30 rounded px-2">
                                            <span className="text-[hsl(var(--muted-foreground))]">Self-Employment Tax (15.3%)</span>
                                            <span className="text-[hsl(var(--foreground))]">{formatCurrency(results.selfEmploymentTax)}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Quarterly Deadlines */}
                            <div className="p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-medium text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-[hsl(var(--primary))]" />
                                    {taxYear} Quarterly Payment Deadlines
                                </h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    {QUARTERLY_DEADLINES[taxYear].map((q) => (
                                        <div key={q.quarter} className="p-2 rounded bg-[hsl(var(--muted))]/30">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-[hsl(var(--primary))]">{q.quarter}</span>
                                                <span className="text-[hsl(var(--foreground))]">{formatCurrency(results.quarterlyPayment)}</span>
                                            </div>
                                            <p className="text-xs text-[hsl(var(--muted-foreground))]">Due: {q.deadline}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {!results && (
                        <div className="p-8 rounded-2xl bg-[hsl(var(--muted))]/30 border border-[hsl(var(--border))] text-center">
                            <Calculator className="w-12 h-12 mx-auto text-[hsl(var(--muted-foreground))] mb-4" />
                            <p className="text-[hsl(var(--muted-foreground))]">
                                Enter your income to see tax calculations
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Privacy Badge */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
                <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>100% Client-Side</span>
                </div>
                <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>No Data Stored</span>
                </div>
                <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                    <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">{taxYear} Tax Rates</span>
                </div>
            </div>
        </div>
    );
}
