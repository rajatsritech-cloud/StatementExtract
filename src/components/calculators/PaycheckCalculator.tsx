"use client";

import { useState, useEffect, useCallback } from "react";
import { Calculator, DollarSign, Briefcase, TrendingDown, HelpCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

// US Federal Tax Brackets 2024
const FEDERAL_TAX_BRACKETS_SINGLE_2024 = [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
];

const FEDERAL_TAX_BRACKETS_MARRIED_2024 = [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
];

// Standard Deductions 2024
const STANDARD_DEDUCTION_SINGLE = 14600;
const STANDARD_DEDUCTION_MARRIED = 29200;

// Social Security and Medicare rates
const SOCIAL_SECURITY_RATE = 0.062;
const SOCIAL_SECURITY_WAGE_BASE = 168600;
const MEDICARE_RATE = 0.0145;
const MEDICARE_ADDITIONAL_RATE = 0.009;
const MEDICARE_ADDITIONAL_THRESHOLD_SINGLE = 200000;
const MEDICARE_ADDITIONAL_THRESHOLD_MARRIED = 250000;

type FilingStatus = "single" | "married";
type PayFrequency = "weekly" | "biweekly" | "semimonthly" | "monthly" | "annually";

interface PaycheckResult {
    grossPay: number;
    federalTax: number;
    socialSecurity: number;
    medicare: number;
    stateTax: number;
    totalDeductions: number;
    netPay: number;
    effectiveRate: number;
}

export const PaycheckCalculator = () => {
    const [grossSalary, setGrossSalary] = useState<string>("75000");
    const [payFrequency, setPayFrequency] = useState<PayFrequency>("biweekly");
    const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
    const [stateWithholding, setStateWithholding] = useState<string>("5");
    const [preT401k, setPreT401k] = useState<string>("0");
    const [result, setResult] = useState<PaycheckResult | null>(null);

    const getPayPeriodsPerYear = (freq: PayFrequency): number => {
        switch (freq) {
            case "weekly": return 52;
            case "biweekly": return 26;
            case "semimonthly": return 24;
            case "monthly": return 12;
            case "annually": return 1;
        }
    };

    const calculateFederalTax = (taxableIncome: number, status: FilingStatus): number => {
        const brackets = status === "single" ? FEDERAL_TAX_BRACKETS_SINGLE_2024 : FEDERAL_TAX_BRACKETS_MARRIED_2024;
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

    const calculatePaycheck = useCallback(() => {
        const annualGross = parseFloat(grossSalary) || 0;
        const stateRate = parseFloat(stateWithholding) / 100 || 0;
        const annual401k = parseFloat(preT401k) || 0;
        const payPeriods = getPayPeriodsPerYear(payFrequency);

        // Calculate annual values
        const standardDeduction = filingStatus === "single" ? STANDARD_DEDUCTION_SINGLE : STANDARD_DEDUCTION_MARRIED;
        const taxableIncome = Math.max(0, annualGross - annual401k - standardDeduction);

        // Federal tax (annual)
        const annualFederalTax = calculateFederalTax(taxableIncome, filingStatus);

        // Social Security (annual)
        const ssWages = Math.min(annualGross - annual401k, SOCIAL_SECURITY_WAGE_BASE);
        const annualSocialSecurity = ssWages * SOCIAL_SECURITY_RATE;

        // Medicare (annual)
        const medicareThreshold = filingStatus === "single" ? MEDICARE_ADDITIONAL_THRESHOLD_SINGLE : MEDICARE_ADDITIONAL_THRESHOLD_MARRIED;
        const medicareWages = annualGross - annual401k;
        let annualMedicare = medicareWages * MEDICARE_RATE;
        if (medicareWages > medicareThreshold) {
            annualMedicare += (medicareWages - medicareThreshold) * MEDICARE_ADDITIONAL_RATE;
        }

        // State tax (annual)
        const annualStateTax = (annualGross - annual401k) * stateRate;

        // Convert to per-paycheck
        const grossPay = annualGross / payPeriods;
        const federalTax = annualFederalTax / payPeriods;
        const socialSecurity = annualSocialSecurity / payPeriods;
        const medicare = annualMedicare / payPeriods;
        const stateTax = annualStateTax / payPeriods;
        const retirement401k = annual401k / payPeriods;

        const totalDeductions = federalTax + socialSecurity + medicare + stateTax + retirement401k;
        const netPay = grossPay - totalDeductions;
        const effectiveRate = annualGross > 0 ? ((annualFederalTax + annualSocialSecurity + annualMedicare + annualStateTax) / annualGross) * 100 : 0;

        setResult({
            grossPay,
            federalTax,
            socialSecurity,
            medicare,
            stateTax,
            totalDeductions,
            netPay,
            effectiveRate,
        });
    }, [grossSalary, payFrequency, filingStatus, stateWithholding, preT401k]);

    useEffect(() => {
        calculatePaycheck();
    }, [calculatePaycheck]);

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(value);
    };

    const frequencyLabels: Record<PayFrequency, string> = {
        weekly: "Weekly",
        biweekly: "Bi-Weekly (Every 2 Weeks)",
        semimonthly: "Semi-Monthly (Twice a Month)",
        monthly: "Monthly",
        annually: "Annually",
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <Breadcrumb
                    items={[
                        { label: "Business Tools", href: "/tools" },
                        { label: "Paycheck Calculator" }
                    ]}
                />
                <div className="inline-flex items-center gap-2 mb-4 mt-4 px-4 py-1.5 rounded-full bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30">
                    <Calculator className="w-4 h-4 text-[hsl(var(--primary))]" />
                    <span className="text-sm font-medium text-[hsl(var(--primary))]">2024 Tax Rates</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-3">
                    Paycheck Calculator
                </h1>
                <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto font-normal">
                    Calculate your take-home pay after federal and state taxes
                </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    <Card className="p-6 bg-[hsl(var(--card))] border-[hsl(var(--border))]">
                        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-[hsl(var(--primary))]" />
                            Salary Information
                        </h2>

                        <div className="space-y-4">
                            {/* Gross Salary */}
                            <div>
                                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                                    Annual Gross Salary
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                                    <input
                                        type="number"
                                        value={grossSalary}
                                        onChange={(e) => setGrossSalary(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                                        placeholder="75000"
                                    />
                                </div>
                            </div>

                            {/* Pay Frequency */}
                            <div>
                                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                                    Pay Frequency
                                </label>
                                <select
                                    value={payFrequency}
                                    onChange={(e) => setPayFrequency(e.target.value as PayFrequency)}
                                    className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                >
                                    {Object.entries(frequencyLabels).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Filing Status */}
                            <div>
                                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                                    Filing Status
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { value: "single", label: "Single" },
                                        { value: "married", label: "Married Filing Jointly" },
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setFilingStatus(option.value as FilingStatus)}
                                            className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${filingStatus === option.value
                                                ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                                                : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary))]/50"
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* State Withholding */}
                            <div>
                                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                                    State Tax Rate (%)
                                </label>
                                <input
                                    type="number"
                                    value={stateWithholding}
                                    onChange={(e) => setStateWithholding(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                    placeholder="5"
                                    step="0.1"
                                />
                                <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                                    Enter 0 for states with no income tax (TX, FL, WA, etc.)
                                </p>
                            </div>

                            {/* 401k Contribution */}
                            <div>
                                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                                    Pre-Tax 401(k) Contribution (Annual)
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                                    <input
                                        type="number"
                                        value={preT401k}
                                        onChange={(e) => setPreT401k(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    {result && (
                        <>
                            {/* Net Pay Highlight */}
                            <Card className="p-6 bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--primary))]/5 border-[hsl(var(--primary))]/30">
                                <div className="text-center">
                                    <p className="text-sm font-medium text-[hsl(var(--primary))] mb-1">
                                        Your Take-Home Pay
                                    </p>
                                    <p className="text-4xl font-bold text-[hsl(var(--foreground))]">
                                        {formatCurrency(result.netPay)}
                                    </p>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                                        per {payFrequency === "biweekly" ? "paycheck" : payFrequency === "semimonthly" ? "paycheck" : payFrequency}
                                    </p>
                                </div>
                            </Card>

                            {/* Breakdown */}
                            <Card className="p-6 bg-[hsl(var(--card))] border-[hsl(var(--border))]">
                                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
                                    <TrendingDown className="w-5 h-5 text-red-500" />
                                    Paycheck Breakdown
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between py-2 border-b border-[hsl(var(--border))]">
                                        <span className="text-[hsl(var(--foreground))] font-medium">Gross Pay</span>
                                        <span className="text-[hsl(var(--foreground))] font-semibold">{formatCurrency(result.grossPay)}</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-[hsl(var(--muted-foreground))]">Federal Income Tax</span>
                                        <span className="text-red-500">-{formatCurrency(result.federalTax)}</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-[hsl(var(--muted-foreground))]">Social Security (6.2%)</span>
                                        <span className="text-red-500">-{formatCurrency(result.socialSecurity)}</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-[hsl(var(--muted-foreground))]">Medicare (1.45%)</span>
                                        <span className="text-red-500">-{formatCurrency(result.medicare)}</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-[hsl(var(--muted-foreground))]">State Tax</span>
                                        <span className="text-red-500">-{formatCurrency(result.stateTax)}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-t border-[hsl(var(--border))] mt-2">
                                        <span className="text-[hsl(var(--foreground))] font-semibold">Net Pay (Take-Home)</span>
                                        <span className="text-green-500 font-bold text-lg">{formatCurrency(result.netPay)}</span>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 rounded-xl bg-[hsl(var(--muted))]/50">
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                        <strong>Effective Tax Rate:</strong> {result.effectiveRate.toFixed(1)}% of your gross income goes to taxes
                                    </p>
                                </div>
                            </Card>

                            {/* Annual Summary */}
                            <Card className="p-6 bg-[hsl(var(--card))] border-[hsl(var(--border))]">
                                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
                                    Annual Summary
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="p-4 rounded-xl bg-[hsl(var(--muted))]/50">
                                        <p className="text-2xl font-bold text-[hsl(var(--foreground))]">
                                            {formatCurrency(result.netPay * getPayPeriodsPerYear(payFrequency))}
                                        </p>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">Annual Take-Home</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-[hsl(var(--muted))]/50">
                                        <p className="text-2xl font-bold text-red-500">
                                            {formatCurrency(result.totalDeductions * getPayPeriodsPerYear(payFrequency))}
                                        </p>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">Total Annual Taxes</p>
                                    </div>
                                </div>
                            </Card>
                        </>
                    )}
                </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        <strong>Disclaimer:</strong> This calculator provides estimates based on 2024 federal tax brackets and does not account for all deductions, credits, or state-specific rules. For accurate tax planning, consult a qualified tax professional.
                    </p>
                </div>
            </div>
        </div>
    );
};
