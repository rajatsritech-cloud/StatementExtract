"use client";

import { useState, useMemo } from "react";
import { Calculator, Download, RefreshCw, TrendingUp, DollarSign, Percent, Calendar, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

type CompoundFrequency = "daily" | "monthly" | "quarterly" | "annually";
type CurrencyCode = "USD" | "GBP" | "EUR" | "AUD" | "CAD" | "INR" | "NZD" | "CHF";

interface YearlyBreakdown {
    year: number;
    startBalance: number;
    contributions: number;
    interestEarned: number;
    endBalance: number;
}

interface CurrencyOption {
    code: CurrencyCode;
    symbol: string;
    name: string;
    flag: string;
}

const CURRENCIES: CurrencyOption[] = [
    { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸" },
    { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧" },
    { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar", flag: "🇦🇺" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar", flag: "🇨🇦" },
    { code: "INR", symbol: "₹", name: "Indian Rupee", flag: "🇮🇳" },
    { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar", flag: "🇳🇿" },
    { code: "CHF", symbol: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
];

export function CompoundInterestCalculator() {
    const [principal, setPrincipal] = useState<string>("10000");
    const [monthlyContribution, setMonthlyContribution] = useState<string>("500");
    const [annualRate, setAnnualRate] = useState<string>("7");
    const [years, setYears] = useState<string>("20");
    const [compoundFrequency, setCompoundFrequency] = useState<CompoundFrequency>("monthly");
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("USD");
    const [showFullBreakdown, setShowFullBreakdown] = useState(false);

    const currency = CURRENCIES.find(c => c.code === selectedCurrency) || CURRENCIES[0];

    const frequencyLabels: Record<CompoundFrequency, string> = {
        daily: "Daily (365x/year)",
        monthly: "Monthly (12x/year)",
        quarterly: "Quarterly (4x/year)",
        annually: "Annually (1x/year)",
    };

    const frequencyPeriods: Record<CompoundFrequency, number> = {
        daily: 365,
        monthly: 12,
        quarterly: 4,
        annually: 1,
    };

    const calculation = useMemo(() => {
        const P = parseFloat(principal) || 0;
        const PMT = parseFloat(monthlyContribution) || 0;
        const r = (parseFloat(annualRate) || 0) / 100;
        const t = parseFloat(years) || 0;
        const n = frequencyPeriods[compoundFrequency];

        if (t <= 0) return null;

        // Calculate future value with compound interest
        // Formula: A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]
        const ratePerPeriod = r / n;
        const totalPeriods = n * t;

        let futureValue: number;
        let contributionGrowth: number;

        if (r === 0) {
            // No interest case
            futureValue = P + PMT * 12 * t;
            contributionGrowth = PMT * 12 * t;
        } else {
            // With interest
            const principalGrowth = P * Math.pow(1 + ratePerPeriod, totalPeriods);

            // For contributions, we need to adjust for monthly deposits
            // Convert monthly contribution to per-period contribution
            const periodsPerMonth = n / 12;
            const contributionPerPeriod = PMT * (12 / n);

            if (ratePerPeriod === 0) {
                contributionGrowth = contributionPerPeriod * totalPeriods;
            } else {
                contributionGrowth = contributionPerPeriod * ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod);
            }

            futureValue = principalGrowth + contributionGrowth;
        }

        const totalContributions = P + PMT * 12 * t;
        const totalInterest = futureValue - totalContributions;

        // Year-by-year breakdown
        const yearlyBreakdown: YearlyBreakdown[] = [];
        let balance = P;

        for (let year = 1; year <= t; year++) {
            const startBalance = balance;
            const yearlyContribution = PMT * 12;

            // Simulate the year with monthly contributions
            for (let month = 0; month < 12; month++) {
                // Add monthly contribution at start of month
                balance += PMT;
                // Calculate interest for this month
                const monthlyRate = r / 12;
                if (compoundFrequency === "monthly" || compoundFrequency === "daily") {
                    balance *= (1 + monthlyRate);
                } else if (compoundFrequency === "quarterly" && (month + 1) % 3 === 0) {
                    balance *= (1 + r / 4);
                }
            }

            // For annual compounding, apply at year end
            if (compoundFrequency === "annually") {
                balance = (startBalance + yearlyContribution) * (1 + r);
            }

            const interestEarned = balance - startBalance - yearlyContribution;

            yearlyBreakdown.push({
                year,
                startBalance,
                contributions: yearlyContribution,
                interestEarned: Math.max(0, interestEarned),
                endBalance: balance,
            });
        }

        return {
            futureValue,
            totalContributions,
            totalInterest,
            principalAmount: P,
            yearlyBreakdown,
        };
    }, [principal, monthlyContribution, annualRate, years, compoundFrequency]);

    const formatCurrency = (value: number) => {
        return `${currency.symbol}${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    };

    const downloadCSV = () => {
        if (!calculation) return;

        const headers = ["Year", "Starting Balance", "Annual Contributions", "Interest Earned", "Ending Balance"];
        const rows = calculation.yearlyBreakdown.map(row => [
            row.year,
            row.startBalance.toFixed(2),
            row.contributions.toFixed(2),
            row.interestEarned.toFixed(2),
            row.endBalance.toFixed(2),
        ]);

        const csv = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "compound-interest-breakdown.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const reset = () => {
        setPrincipal("10000");
        setMonthlyContribution("500");
        setAnnualRate("7");
        setYears("20");
        setCompoundFrequency("monthly");
        setSelectedCurrency("USD");
        setShowFullBreakdown(false);
    };

    // Calculate percentages for visual bar
    const principalPercent = calculation ? (calculation.principalAmount / calculation.futureValue) * 100 : 0;
    const contributionsPercent = calculation ? ((calculation.totalContributions - calculation.principalAmount) / calculation.futureValue) * 100 : 0;
    const interestPercent = calculation ? (calculation.totalInterest / calculation.futureValue) * 100 : 0;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-emerald-600 mb-4">
                    Compound Interest Calculator
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
                    See how your money grows with daily, monthly, or annual compounding. Add monthly contributions to accelerate your wealth building.
                </p>
            </div>

            {/* Currency & Frequency Selectors */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
                {/* Currency Selector */}
                <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                    <select
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value as CurrencyCode)}
                        className="px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-sm focus:outline-none focus:border-[hsl(var(--primary))]"
                    >
                        {CURRENCIES.map((c) => (
                            <option key={c.code} value={c.code}>
                                {c.flag} {c.code} - {c.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Compound Frequency Selector */}
                <div className="flex flex-wrap gap-2">
                    {(["daily", "monthly", "quarterly", "annually"] as CompoundFrequency[]).map((freq) => (
                        <button
                            key={freq}
                            onClick={() => setCompoundFrequency(freq)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${compoundFrequency === freq
                                ? "bg-[hsl(var(--primary))] text-white"
                                : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/80"
                                }`}
                        >
                            {freq.charAt(0).toUpperCase() + freq.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Calculator Card */}
            <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] p-6 md:p-8">
                {/* Input Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Initial Principal */}
                    <div>
                        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                            Initial Investment
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]">{currency.symbol}</span>
                            <input
                                type="number"
                                value={principal}
                                onChange={(e) => setPrincipal(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-lg focus:outline-none focus:border-[hsl(var(--primary))]"
                            />
                        </div>
                    </div>

                    {/* Monthly Contribution */}
                    <div>
                        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                            Monthly Contribution
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]">{currency.symbol}</span>
                            <input
                                type="number"
                                value={monthlyContribution}
                                onChange={(e) => setMonthlyContribution(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-lg focus:outline-none focus:border-[hsl(var(--primary))]"
                            />
                        </div>
                    </div>

                    {/* Annual Interest Rate */}
                    <div>
                        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                            Annual Interest Rate
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                step="0.1"
                                value={annualRate}
                                onChange={(e) => setAnnualRate(e.target.value)}
                                className="w-full pl-4 pr-10 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-lg focus:outline-none focus:border-[hsl(var(--primary))]"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]">%</span>
                        </div>
                    </div>

                    {/* Years */}
                    <div>
                        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                            Time Period (Years)
                        </label>
                        <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-lg focus:outline-none focus:border-[hsl(var(--primary))]"
                        />
                    </div>
                </div>

                {/* Results */}
                {calculation && (
                    <div className="space-y-6">
                        {/* Big Number - Future Value */}
                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))]/10 to-emerald-500/10 border border-[hsl(var(--primary))]/20">
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-1">Your investment will grow to</p>
                            <p className="text-4xl md:text-5xl font-bold text-[hsl(var(--primary))]">
                                {formatCurrency(calculation.futureValue)}
                            </p>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2">
                                after {years} years with {compoundFrequency} compounding
                            </p>
                        </div>

                        {/* Visual Breakdown Bar */}
                        <div className="space-y-2">
                            <div className="flex h-8 rounded-full overflow-hidden">
                                <div
                                    className="bg-blue-500 flex items-center justify-center text-xs text-white font-medium"
                                    style={{ width: `${principalPercent}%` }}
                                >
                                    {principalPercent > 10 && "Principal"}
                                </div>
                                <div
                                    className="bg-purple-500 flex items-center justify-center text-xs text-white font-medium"
                                    style={{ width: `${contributionsPercent}%` }}
                                >
                                    {contributionsPercent > 10 && "Contributions"}
                                </div>
                                <div
                                    className="bg-emerald-500 flex items-center justify-center text-xs text-white font-medium"
                                    style={{ width: `${interestPercent}%` }}
                                >
                                    {interestPercent > 10 && "Interest"}
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))]">
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    Principal: {formatCurrency(calculation.principalAmount)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                    Contributions: {formatCurrency(calculation.totalContributions - calculation.principalAmount)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    Interest: {formatCurrency(calculation.totalInterest)}
                                </span>
                            </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-xl bg-blue-500/10">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Initial Investment</p>
                                <p className="text-xl font-bold text-blue-600">
                                    {formatCurrency(calculation.principalAmount)}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-500/10">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Total Contributions</p>
                                <p className="text-xl font-bold text-purple-600">
                                    {formatCurrency(calculation.totalContributions)}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-500/10">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Interest Earned</p>
                                <p className="text-xl font-bold text-emerald-600">
                                    {formatCurrency(calculation.totalInterest)}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-[hsl(var(--primary))]/10">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Final Balance</p>
                                <p className="text-xl font-bold text-[hsl(var(--primary))]">
                                    {formatCurrency(calculation.futureValue)}
                                </p>
                            </div>
                        </div>

                        {/* Year-by-Year Breakdown Table */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-[hsl(var(--foreground))]">Year-by-Year Growth</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowFullBreakdown(!showFullBreakdown)}
                                        className="text-sm text-[hsl(var(--primary))] hover:underline"
                                    >
                                        {showFullBreakdown ? "Show Less" : `Show All ${years} Years`}
                                    </button>
                                    <button
                                        onClick={downloadCSV}
                                        className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] flex items-center gap-1"
                                    >
                                        <Download className="w-3 h-3" />
                                        CSV
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto max-h-96 overflow-y-auto">
                                <table className="w-full text-sm">
                                    <thead className="sticky top-0 bg-[hsl(var(--card))]">
                                        <tr className="border-b border-[hsl(var(--border))]">
                                            <th className="px-3 py-2 text-left font-medium text-[hsl(var(--muted-foreground))]">Year</th>
                                            <th className="px-3 py-2 text-right font-medium text-[hsl(var(--muted-foreground))]">Start</th>
                                            <th className="px-3 py-2 text-right font-medium text-[hsl(var(--muted-foreground))]">Contributions</th>
                                            <th className="px-3 py-2 text-right font-medium text-[hsl(var(--muted-foreground))]">Interest</th>
                                            <th className="px-3 py-2 text-right font-medium text-[hsl(var(--muted-foreground))]">End Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(showFullBreakdown ? calculation.yearlyBreakdown : calculation.yearlyBreakdown.slice(0, 10)).map((row) => (
                                            <tr key={row.year} className="border-b border-[hsl(var(--border))]/50 hover:bg-[hsl(var(--muted))]/30">
                                                <td className="px-3 py-2 text-[hsl(var(--muted-foreground))]">{row.year}</td>
                                                <td className="px-3 py-2 text-right text-[hsl(var(--foreground))]">{formatCurrency(row.startBalance)}</td>
                                                <td className="px-3 py-2 text-right text-purple-600">{formatCurrency(row.contributions)}</td>
                                                <td className="px-3 py-2 text-right text-emerald-600">{formatCurrency(row.interestEarned)}</td>
                                                <td className="px-3 py-2 text-right text-[hsl(var(--foreground))] font-medium">{formatCurrency(row.endBalance)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                    <Button variant="outline" onClick={reset}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reset
                    </Button>
                    {calculation && (
                        <Button onClick={downloadCSV} className="bg-gradient-primary shadow-glow">
                            <Download className="w-4 h-4 mr-2" />
                            Download Breakdown
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
