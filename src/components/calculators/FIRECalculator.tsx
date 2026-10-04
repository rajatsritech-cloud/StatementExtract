"use client";

import { useState, useMemo } from "react";
import { TrendingUp, DollarSign, Calendar, Target, Info, RefreshCw } from "lucide-react";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

interface ProjectionYear {
    age: number;
    year: number;
    principal: number;
    interest: number;
    total: number;
    isFI: boolean;
}

export const FIRECalculator = () => {
    // Inputs
    const [currentAge, setCurrentAge] = useState<number>(30);
    const [currentSavings, setCurrentSavings] = useState<number>(50000);
    const [annualIncome, setAnnualIncome] = useState<number>(80000);
    const [annualSpending, setAnnualSpending] = useState<number>(50000);
    const [annualReturn, setAnnualReturn] = useState<number>(7);
    const [withdrawalRate, setWithdrawalRate] = useState<number>(4);

    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    const results = useMemo(() => {
        const fiNumber = annualSpending * (100 / withdrawalRate);
        const annualSavings = annualIncome - annualSpending;
        const savingsRate = (annualSavings / annualIncome) * 100;

        let balance = currentSavings;
        const projection: ProjectionYear[] = [];
        let fiAge = null;
        let fiYear = null;
        let totalInterest = 0;
        let totalPrincipal = currentSavings;

        const currentYear = new Date().getFullYear();

        // Project for up to 60 years or until age 100
        for (let i = 0; i <= 70; i++) {
            const age = currentAge + i;
            if (age > 100) break;

            const isFI = balance >= fiNumber;
            if (isFI && fiAge === null) {
                fiAge = age;
                fiYear = currentYear + i;
            }

            projection.push({
                age,
                year: currentYear + i,
                principal: totalPrincipal,
                interest: totalInterest,
                total: balance,
                isFI
            });

            // Prepare next year
            const growth = balance * (annualReturn / 100);
            balance += growth + annualSavings;
            totalInterest += growth;
            totalPrincipal += annualSavings;
        }

        return {
            fiNumber,
            fiAge,
            fiYear,
            savingsRate,
            yearsToFI: fiAge ? fiAge - currentAge : null,
            projection
        };
    }, [currentAge, currentSavings, annualIncome, annualSpending, annualReturn, withdrawalRate]);

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8">
            <div className="text-center mb-4">
                <Breadcrumb
                    items={[
                        { label: "Business Tools", href: "/tools" },
                        { label: "FIRE Calculator" }
                    ]}
                />
                <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-blue-600 mb-4">
                    FIRE Calculator
                </h1>
                <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto font-normal">
                    Calculate when you can reach Financial Independence, Retire Early. Project your savings and net worth growth over time.
                </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 shadow-sm space-y-5">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <SettingsIcon className="w-5 h-5 text-[hsl(var(--primary))]" />
                            Your Details
                        </h2>

                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Current Age</label>
                                <input
                                    type="number"
                                    value={currentAge}
                                    onChange={e => setCurrentAge(Number(e.target.value))}
                                    className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Current Savings ($)</label>
                                <input
                                    type="number"
                                    value={currentSavings}
                                    onChange={e => setCurrentSavings(Number(e.target.value))}
                                    className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Annual Income ($)</label>
                                <input
                                    type="number"
                                    value={annualIncome}
                                    onChange={e => setAnnualIncome(Number(e.target.value))}
                                    className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Annual Spending ($)</label>
                                <input
                                    type="number"
                                    value={annualSpending}
                                    onChange={e => setAnnualSpending(Number(e.target.value))}
                                    className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[hsl(var(--border))] space-y-3">
                            <h3 className="text-sm font-medium text-[hsl(var(--foreground))]">Assumptions</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Return (%)</label>
                                    <input
                                        type="number"
                                        value={annualReturn}
                                        onChange={e => setAnnualReturn(Number(e.target.value))}
                                        className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Withdrawal (%)</label>
                                    <input
                                        type="number"
                                        value={withdrawalRate}
                                        onChange={e => setWithdrawalRate(Number(e.target.value))}
                                        className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20">
                            <div className="flex items-center gap-2 text-indigo-600 mb-2">
                                <Target className="w-5 h-5" />
                                <span className="font-medium">FI Number</span>
                            </div>
                            <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
                                {formatCurrency(results.fiNumber)}
                            </div>
                            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                25x Annual Spending
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20">
                            <div className="flex items-center gap-2 text-green-600 mb-2">
                                <Calendar className="w-5 h-5" />
                                <span className="font-medium">Time to FI</span>
                            </div>
                            <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
                                {results.yearsToFI !== null ? `${results.yearsToFI} Years` : 'Never'}
                            </div>
                            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                Age {results.fiAge || 'N/A'} in {results.fiYear || 'N/A'}
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20">
                            <div className="flex items-center gap-2 text-orange-600 mb-2">
                                <TrendingUp className="w-5 h-5" />
                                <span className="font-medium">Savings Rate</span>
                            </div>
                            <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
                                {results.savingsRate.toFixed(1)}%
                            </div>
                            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                {formatCurrency(annualIncome - annualSpending)} per year
                            </div>
                        </div>
                    </div>

                    {/* Chart / Graph Area */}
                    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold mb-6">Net Worth Projection</h3>

                        {/* CSS Bar Chart for next 30 years or until FI + 5 */}
                        <div className="relative h-64 w-full flex items-end justify-between gap-1">
                            {results.projection.filter((_, i) => i % Math.max(1, Math.ceil(results.projection.length / 25)) === 0).slice(0, 25).map((point, i) => {
                                const maxVal = results.projection[results.projection.length - 1].total * 1.1; // Scale to max projected
                                const height = Math.min(100, Math.max(1, (point.total / results.fiNumber) * 60)); // Scale relative to FI number (60% height mark?)
                                // Actually better to scale to max value in view
                                const viewMax = Math.max(results.fiNumber * 1.2, results.projection[Math.min(results.projection.length - 1, 30)].total);
                                const barHeight = (point.total / viewMax) * 100;
                                const fiLineHeight = (results.fiNumber / viewMax) * 100;

                                return (
                                    <div key={point.age} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                                        <div
                                            className={`w-full rounded-t-sm transition-all hover:opacity-100 ${point.isFI ? 'bg-[hsl(var(--primary))]' : 'bg-[hsl(var(--muted))]'}`}
                                            style={{ height: `${barHeight}%` }}
                                        />

                                        {/* Tooltip */}
                                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-20 pointer-events-none">
                                            Age {point.age}: {formatCurrency(point.total)}
                                        </div>

                                        {/* FI Line Marker (only draw on first bar to create line visually? CSS absolute line is better) */}
                                    </div>
                                )
                            })}

                            {/* FI Target Line */}
                            <div
                                className="absolute left-0 right-0 border-t-2 border-dashed border-green-500 z-10 pointer-events-none flex items-end justify-end pr-2"
                                style={{ bottom: `${(results.fiNumber / Math.max(results.fiNumber * 1.2, results.projection[Math.min(results.projection.length - 1, 30)].total)) * 100}%` }}
                            >
                                <span className="text-xs font-bold text-green-600 bg-[hsl(var(--card))] px-1 -mb-3">FI: {formatCurrency(results.fiNumber)}</span>
                            </div>
                        </div>
                        <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mt-2 border-t border-[hsl(var(--border))] pt-2">
                            <span>Age {currentAge}</span>
                            <span>Age {Math.min(currentAge + 30, results.projection[results.projection.length - 1]?.age || 100)}</span>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 shadow-sm overflow-hidden">
                        <h3 className="text-lg font-semibold mb-4">Milestones</h3>
                        <div className="max-h-80 overflow-y-auto">
                            <table className="w-full text-sm">
                                <thead className="text-[hsl(var(--muted-foreground))] border-b border-[hsl(var(--border))]">
                                    <tr>
                                        <th className="text-left py-2 font-medium">Year</th>
                                        <th className="text-left py-2 font-medium">Age</th>
                                        <th className="text-right py-2 font-medium">Balance</th>
                                        <th className="text-right py-2 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[hsl(var(--border))]">
                                    {results.projection.map((row) => (
                                        <tr key={row.year} className={`group hover:bg-[hsl(var(--muted))]/30 ${row.isFI ? 'bg-green-500/5' : ''}`}>
                                            <td className="py-2 text-[hsl(var(--muted-foreground))]">{row.year}</td>
                                            <td className="py-2">{row.age}</td>
                                            <td className="py-2 text-right font-medium">{formatCurrency(row.total)}</td>
                                            <td className="py-2 text-right">
                                                {row.isFI ? (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                        FI Reached
                                                    </span>
                                                ) : (
                                                    <span className="text-[hsl(var(--muted-foreground))] text-xs">Building</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex justify-center pt-4">
                        <PrivacyBadge />
                    </div>
                </div>
            </div>
        </div>
    );
};

function SettingsIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
}
