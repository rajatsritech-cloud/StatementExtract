"use client";

import { useState, useMemo } from "react";
import { Calculator, Download, RefreshCw, TrendingDown, DollarSign, Calendar, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

interface AmortizationRow {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    extraPayment: number;
    totalPayment: number;
    balance: number;
    cumulativeInterest: number;
}

type LoanType = "mortgage" | "auto" | "student" | "personal";

export function AmortizationCalculator() {
    const [loanAmount, setLoanAmount] = useState<string>("250000");
    const [interestRate, setInterestRate] = useState<string>("6.5");
    const [loanTermYears, setLoanTermYears] = useState<string>("30");
    const [extraPayment, setExtraPayment] = useState<string>("0");
    const [startDate, setStartDate] = useState<string>(new Date().toISOString().slice(0, 7));
    const [loanType, setLoanType] = useState<LoanType>("mortgage");
    const [showFullSchedule, setShowFullSchedule] = useState(false);

    const currency = "$";

    const loanPresets: Record<LoanType, { rate: string; term: string; amount: string }> = {
        mortgage: { rate: "6.5", term: "30", amount: "250000" },
        auto: { rate: "7.5", term: "5", amount: "35000" },
        student: { rate: "5.5", term: "10", amount: "50000" },
        personal: { rate: "10", term: "5", amount: "15000" },
    };

    const applyPreset = (type: LoanType) => {
        setLoanType(type);
        const preset = loanPresets[type];
        setInterestRate(preset.rate);
        setLoanTermYears(preset.term);
        setLoanAmount(preset.amount);
    };

    const calculation = useMemo(() => {
        const P = parseFloat(loanAmount) || 0;
        const annualRate = parseFloat(interestRate) || 0;
        const years = parseFloat(loanTermYears) || 0;
        const extra = parseFloat(extraPayment) || 0;

        if (P <= 0 || annualRate <= 0 || years <= 0) {
            return null;
        }

        const monthlyRate = annualRate / 100 / 12;
        const totalMonths = years * 12;

        // Standard monthly payment (without extra)
        const monthlyPayment = P * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);

        const schedule: AmortizationRow[] = [];
        let balance = P;
        let cumulativeInterest = 0;
        let month = 0;

        while (balance > 0.01 && month < totalMonths * 2) {
            month++;
            const interestPayment = balance * monthlyRate;
            let principalPayment = monthlyPayment - interestPayment;
            let actualExtra = extra;

            // Handle final payment
            if (principalPayment + actualExtra >= balance) {
                principalPayment = balance;
                actualExtra = 0;
            } else if (principalPayment + actualExtra > balance) {
                actualExtra = balance - principalPayment;
            }

            balance -= (principalPayment + actualExtra);
            if (balance < 0) balance = 0;

            cumulativeInterest += interestPayment;

            schedule.push({
                month,
                payment: monthlyPayment,
                principal: principalPayment,
                interest: interestPayment,
                extraPayment: actualExtra,
                totalPayment: monthlyPayment + actualExtra,
                balance,
                cumulativeInterest,
            });

            if (balance <= 0) break;
        }

        const totalInterest = cumulativeInterest;
        const totalPaid = schedule.reduce((sum, row) => sum + row.totalPayment, 0);
        const actualMonths = schedule.length;
        const monthsSaved = totalMonths - actualMonths;
        const interestSaved = extra > 0 ? (monthlyPayment * totalMonths - P) - totalInterest : 0;

        return {
            monthlyPayment,
            totalInterest,
            totalPaid,
            schedule,
            actualMonths,
            monthsSaved,
            interestSaved: Math.max(0, interestSaved),
            originalTotalMonths: totalMonths,
        };
    }, [loanAmount, interestRate, loanTermYears, extraPayment]);

    const formatCurrency = (value: number) => {
        return `${currency}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const formatDate = (monthOffset: number) => {
        const [year, month] = startDate.split("-").map(Number);
        const date = new Date(year, month - 1 + monthOffset, 1);
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };

    const downloadCSV = () => {
        if (!calculation) return;

        const headers = ["Month", "Date", "Payment", "Principal", "Interest", "Extra Payment", "Total Payment", "Balance", "Cumulative Interest"];
        const rows = calculation.schedule.map(row => [
            row.month,
            formatDate(row.month - 1),
            row.payment.toFixed(2),
            row.principal.toFixed(2),
            row.interest.toFixed(2),
            row.extraPayment.toFixed(2),
            row.totalPayment.toFixed(2),
            row.balance.toFixed(2),
            row.cumulativeInterest.toFixed(2),
        ]);

        const csv = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "amortization-schedule.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const reset = () => {
        applyPreset("mortgage");
        setExtraPayment("0");
        setShowFullSchedule(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <Breadcrumb
                    items={[
                        { label: "Business Tools", href: "/tools" },
                        { label: "Amortization Calculator" }
                    ]}
                />
                <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-blue-600 mb-4">
                    Amortization Schedule Calculator
                </h1>
                <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto font-normal">
                    Calculate loan payments and see how extra payments save money. Mortgage, auto, student loans.
                </h2>
            </div>

            {/* Loan Type Selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
                {(["mortgage", "auto", "student", "personal"] as LoanType[]).map((type) => (
                    <button
                        key={type}
                        onClick={() => applyPreset(type)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${loanType === type
                            ? "bg-[hsl(var(--primary))] text-white"
                            : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/80"
                            }`}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)} Loan
                    </button>
                ))}
            </div>

            {/* Calculator Card */}
            <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] p-6 md:p-8">
                {/* Input Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Loan Amount */}
                    <div>
                        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                            Loan Amount
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]">{currency}</span>
                            <input
                                type="number"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-lg focus:outline-none focus:border-[hsl(var(--primary))]"
                            />
                        </div>
                    </div>

                    {/* Interest Rate */}
                    <div>
                        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                            Annual Interest Rate
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                step="0.1"
                                value={interestRate}
                                onChange={(e) => setInterestRate(e.target.value)}
                                className="w-full pl-4 pr-10 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-lg focus:outline-none focus:border-[hsl(var(--primary))]"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]">%</span>
                        </div>
                    </div>

                    {/* Loan Term */}
                    <div>
                        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                            Loan Term (Years)
                        </label>
                        <input
                            type="number"
                            value={loanTermYears}
                            onChange={(e) => setLoanTermYears(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-lg focus:outline-none focus:border-[hsl(var(--primary))]"
                        />
                    </div>

                    {/* Extra Monthly Payment */}
                    <div>
                        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                            Extra Monthly Payment (Optional)
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]">{currency}</span>
                            <input
                                type="number"
                                value={extraPayment}
                                onChange={(e) => setExtraPayment(e.target.value)}
                                placeholder="0"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-lg focus:outline-none focus:border-[hsl(var(--primary))]"
                            />
                        </div>
                    </div>

                    {/* Start Date */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                            First Payment Date
                        </label>
                        <input
                            type="month"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-lg focus:outline-none focus:border-[hsl(var(--primary))]"
                        />
                    </div>
                </div>

                {/* Results */}
                {calculation && (
                    <div className="space-y-6">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-xl bg-[hsl(var(--primary))]/10">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Monthly Payment</p>
                                <p className="text-xl font-bold text-[hsl(var(--primary))]">
                                    {formatCurrency(calculation.monthlyPayment)}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-[hsl(var(--muted))]/50">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Total Interest</p>
                                <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                                    {formatCurrency(calculation.totalInterest)}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-[hsl(var(--muted))]/50">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Total Paid</p>
                                <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                                    {formatCurrency(calculation.totalPaid)}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-[hsl(var(--muted))]/50">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Payoff Time</p>
                                <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                                    {Math.floor(calculation.actualMonths / 12)}y {calculation.actualMonths % 12}m
                                </p>
                            </div>
                        </div>

                        {/* Savings from extra payments */}
                        {parseFloat(extraPayment) > 0 && calculation.monthsSaved > 0 && (
                            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <PiggyBank className="w-5 h-5 text-green-600" />
                                    <span className="font-semibold text-green-700 dark:text-green-400">Extra Payment Savings</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-[hsl(var(--muted-foreground))]">Time Saved</p>
                                        <p className="font-bold text-green-700 dark:text-green-400">
                                            {Math.floor(calculation.monthsSaved / 12)} years, {calculation.monthsSaved % 12} months
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[hsl(var(--muted-foreground))]">Interest Saved</p>
                                        <p className="font-bold text-green-700 dark:text-green-400">
                                            {formatCurrency(calculation.interestSaved)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Amortization Schedule Table */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-[hsl(var(--foreground))]">Amortization Schedule</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowFullSchedule(!showFullSchedule)}
                                        className="text-sm text-[hsl(var(--primary))] hover:underline"
                                    >
                                        {showFullSchedule ? "Show Less" : `Show All ${calculation.actualMonths} Months`}
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
                                            <th className="px-3 py-2 text-left font-medium text-[hsl(var(--muted-foreground))]">#</th>
                                            <th className="px-3 py-2 text-left font-medium text-[hsl(var(--muted-foreground))]">Date</th>
                                            <th className="px-3 py-2 text-right font-medium text-[hsl(var(--muted-foreground))]">Payment</th>
                                            <th className="px-3 py-2 text-right font-medium text-[hsl(var(--muted-foreground))]">Principal</th>
                                            <th className="px-3 py-2 text-right font-medium text-[hsl(var(--muted-foreground))]">Interest</th>
                                            <th className="px-3 py-2 text-right font-medium text-[hsl(var(--muted-foreground))]">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(showFullSchedule ? calculation.schedule : calculation.schedule.slice(0, 12)).map((row) => (
                                            <tr key={row.month} className="border-b border-[hsl(var(--border))]/50 hover:bg-[hsl(var(--muted))]/30">
                                                <td className="px-3 py-2 text-[hsl(var(--muted-foreground))]">{row.month}</td>
                                                <td className="px-3 py-2 text-[hsl(var(--foreground))]">{formatDate(row.month - 1)}</td>
                                                <td className="px-3 py-2 text-right text-[hsl(var(--foreground))]">{formatCurrency(row.totalPayment)}</td>
                                                <td className="px-3 py-2 text-right text-green-600">{formatCurrency(row.principal)}</td>
                                                <td className="px-3 py-2 text-right text-red-500">{formatCurrency(row.interest)}</td>
                                                <td className="px-3 py-2 text-right text-[hsl(var(--foreground))] font-medium">{formatCurrency(row.balance)}</td>
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
                            Download Schedule
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
