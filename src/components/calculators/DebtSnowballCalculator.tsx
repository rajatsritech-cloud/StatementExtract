"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus, Trash2, DollarSign, Calculator, TrendingDown, Calendar, ArrowRight, PiggyBank } from "lucide-react";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";

interface Debt {
    id: string;
    name: string;
    balance: number;
    interestRate: number;
    minPayment: number;
}

interface PayoffMonth {
    month: number;
    date: Date;
    totalBalance: number;
    paidInterest: number;
    debts: { [key: string]: number }; // balance of each debt
}

export const DebtSnowballCalculator = () => {
    const [debts, setDebts] = useState<Debt[]>([
        { id: "1", name: "Credit Card 1", balance: 5000, interestRate: 18.99, minPayment: 150 },
        { id: "2", name: "Car Loan", balance: 12000, interestRate: 6.5, minPayment: 350 },
    ]);
    const [monthlyExtra, setMonthlyExtra] = useState<number>(200);
    const [schedule, setSchedule] = useState<PayoffMonth[]>([]);
    const [summary, setSummary] = useState({
        totalInterest: 0,
        debtFreeDate: new Date(),
        monthsSaved: 0,
        interestSaved: 0,
        payoffMonths: 0
    });

    // New debt form state
    const [newDebt, setNewDebt] = useState({ name: "", balance: "", interestRate: "", minPayment: "" });

    const addDebt = () => {
        if (!newDebt.name || !newDebt.balance || !newDebt.minPayment) return;
        setDebts([
            ...debts,
            {
                id: Math.random().toString(36).substr(2, 9),
                name: newDebt.name,
                balance: parseFloat(newDebt.balance),
                interestRate: parseFloat(newDebt.interestRate) || 0,
                minPayment: parseFloat(newDebt.minPayment),
            },
        ]);
        setNewDebt({ name: "", balance: "", interestRate: "", minPayment: "" });
    };

    const removeDebt = (id: string) => {
        setDebts(debts.filter((d) => d.id !== id));
    };

    const calculateSnowball = useMemo(() => {
        if (debts.length === 0) return null;

        // Sort debts by balance (Snowball method)
        const sortedDebts = [...debts].sort((a, b) => a.balance - b.balance);
        let currentDebts = sortedDebts.map(d => ({ ...d }));
        let totalOriginalBalance = currentDebts.reduce((sum, d) => sum + d.balance, 0);

        const timeline: PayoffMonth[] = [];
        let totalInterest = 0;
        let month = 0;
        const startDate = new Date();

        // Safety break
        while (currentDebts.some(d => d.balance > 0) && month < 600) { // 50 years cap
            month++;
            const currentDate = new Date(startDate);
            currentDate.setMonth(startDate.getMonth() + month);

            let availableExtra = monthlyExtra;
            let monthInterest = 0;
            const balancesSnapshot: { [key: string]: number } = {};

            // 1. Accrue Interest
            currentDebts.forEach(debt => {
                if (debt.balance > 0) {
                    const interest = (debt.balance * (debt.interestRate / 100)) / 12;
                    debt.balance += interest;
                    monthInterest += interest;
                    totalInterest += interest;
                }
            });

            // 2. Pay Minimums
            currentDebts.forEach(debt => {
                if (debt.balance > 0) {
                    const payment = Math.min(debt.balance, debt.minPayment);
                    debt.balance -= payment;
                    // If debt paid off with min payment, add remainder to snowball?
                    // Typically min payment is fixed. If balance < min, the difference is freed up immediately?
                    // Simplified: Pay min. If cleared, strictly freed up min payment goes to snowball.
                    if (debt.balance <= 0) {
                        availableExtra += (debt.minPayment - (payment + (debt.balance * -1))); // complicated logic simplification
                        availableExtra += debt.minPayment; // Once paid off, min payment rolls over NEXT month usually.
                        // For this month, if we overpaid, we apply to next debt?
                        // Let's stick to standard: Pay Minimums first.
                    }
                }
            });

            // Re-calculate checking strictly for paid off status to roll over amount
            // Actually, simpler logic:
            // Available to pay = Sum of all min payments + Extra.
            // Snowball method: Pay min on all. Put ALL leftover money (Extra + Unused Mins from paid off debts) to smallest debt.

            let totalBudget = debts.reduce((sum, d) => sum + d.minPayment, 0) + monthlyExtra;

            // Reset debts for this month calculation to do it cleanly
            // Wait, modifying objects in place is messy in loop.
            // Let's restart logic for the loop step.
        }

        // Correct implementation
        let simDebts = sortedDebts.map(d => ({ ...d, originalId: d.id }));
        let simTimeline: PayoffMonth[] = [];
        let simTotalInterest = 0;
        let simMonth = 0;

        let totalMonthlyBudget = simDebts.reduce((sum, d) => sum + d.minPayment, 0) + monthlyExtra;

        while (simDebts.some(d => d.balance > 0.01) && simMonth < 600) {
            simMonth++;
            let monthlyInterest = 0;
            let moneyRemaining = totalMonthlyBudget;

            // 1. Charge Interest on all
            simDebts.forEach(d => {
                if (d.balance > 0) {
                    const interest = (d.balance * (d.interestRate / 100)) / 12;
                    d.balance += interest;
                    monthlyInterest += interest;
                    simTotalInterest += interest;
                }
            });

            // 2. Pay Min Payments on all (or close if balance < min)
            simDebts.forEach(d => {
                if (d.balance > 0) {
                    const payment = Math.min(d.balance, d.minPayment);
                    d.balance -= payment;
                    moneyRemaining -= payment;
                }
            });

            // 3. Apply Snowball (Remaining Money) to first active debt
            for (let d of simDebts) {
                if (d.balance > 0 && moneyRemaining > 0) {
                    const payment = Math.min(d.balance, moneyRemaining);
                    d.balance -= payment;
                    moneyRemaining -= payment;
                }
            }

            // Snapshot
            const currentTotalBalance = simDebts.reduce((sum, d) => sum + d.balance, 0);
            const date = new Date();
            date.setMonth(date.getMonth() + simMonth);

            const debtBalances: { [key: string]: number } = {};
            simDebts.forEach(d => debtBalances[d.originalId] = Math.max(0, d.balance));

            simTimeline.push({
                month: simMonth,
                date: date,
                totalBalance: Math.max(0, currentTotalBalance),
                paidInterest: simTotalInterest,
                debts: debtBalances
            });
        }

        const payoffDate = new Date();
        payoffDate.setMonth(payoffDate.getMonth() + simMonth);

        return {
            timeline: simTimeline,
            summary: {
                totalInterest: simTotalInterest,
                debtFreeDate: payoffDate,
                payoffMonths: simMonth
            }
        };

    }, [debts, monthlyExtra]);

    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-[hsl(var(--primary))]" />
                            Add Your Debts
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Debt Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Visa Card"
                                    value={newDebt.name}
                                    onChange={e => setNewDebt({ ...newDebt, name: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Balance ($)</label>
                                    <input
                                        type="number"
                                        placeholder="5000"
                                        value={newDebt.balance}
                                        onChange={e => setNewDebt({ ...newDebt, balance: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Min Payment ($)</label>
                                    <input
                                        type="number"
                                        placeholder="150"
                                        value={newDebt.minPayment}
                                        onChange={e => setNewDebt({ ...newDebt, minPayment: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Interest Rate (%)</label>
                                <input
                                    type="number"
                                    placeholder="18.99"
                                    value={newDebt.interestRate}
                                    onChange={e => setNewDebt({ ...newDebt, interestRate: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-sm"
                                />
                            </div>
                            <button
                                onClick={addDebt}
                                className="w-full py-2 bg-[hsl(var(--primary))] text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Add Debt
                            </button>
                        </div>
                    </div>

                    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <PiggyBank className="w-5 h-5 text-green-500" />
                            Snowball Power
                        </h2>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Monthly Extra Payment</label>
                            <input
                                type="number"
                                value={monthlyExtra}
                                onChange={e => setMonthlyExtra(Number(e.target.value))}
                                className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                            />
                            <p className="text-xs text-[hsl(var(--muted-foreground))]">
                                Adding extra money accelerates the process exponentially.
                            </p>
                        </div>
                    </div>

                    {/* Debt List */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Your Debts</h3>
                        {debts.map(debt => (
                            <div key={debt.id} className="group relative p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--accent))]/10 hover:bg-[hsl(var(--accent))]/20 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-semibold">{debt.name}</span>
                                    <button onClick={() => removeDebt(debt.id)} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="text-[hsl(var(--muted-foreground))]">Balance: <span className="text-[hsl(var(--foreground))]">{formatCurrency(debt.balance)}</span></div>
                                    <div className="text-[hsl(var(--muted-foreground))]">Rate: <span className="text-[hsl(var(--foreground))]">{debt.interestRate}%</span></div>
                                    <div className="text-[hsl(var(--muted-foreground))]">Min: <span className="text-[hsl(var(--foreground))]">{formatCurrency(debt.minPayment)}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
                            <div className="flex items-center gap-2 text-blue-600 mb-2">
                                <Calendar className="w-5 h-5" />
                                <span className="font-medium">Debt Free Date</span>
                            </div>
                            <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
                                {calculateSnowball ? formatDate(calculateSnowball.summary.debtFreeDate) : '-'}
                            </div>
                            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                {calculateSnowball ? `${calculateSnowball.summary.payoffMonths} months to go` : 'Add debts to see'}
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20">
                            <div className="flex items-center gap-2 text-red-600 mb-2">
                                <TrendingDown className="w-5 h-5" />
                                <span className="font-medium">Total Interest</span>
                            </div>
                            <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
                                {calculateSnowball ? formatCurrency(calculateSnowball.summary.totalInterest) : '-'}
                            </div>
                            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                Cost of borrowing
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20">
                            <div className="flex items-center gap-2 text-green-600 mb-2">
                                <DollarSign className="w-5 h-5" />
                                <span className="font-medium">Total Paid</span>
                            </div>
                            <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
                                {calculateSnowball ? formatCurrency(debts.reduce((s, d) => s + d.balance, 0) + calculateSnowball.summary.totalInterest) : '-'}
                            </div>
                            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                Principal + Interest
                            </div>
                        </div>
                    </div>

                    {/* Timeline Chart Visualization */}
                    {calculateSnowball && (
                        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 shadow-sm overflow-hidden">
                            <h3 className="text-lg font-semibold mb-6">Payoff Timeline</h3>
                            <div className="relative h-64 w-full flex items-end justify-between gap-1">
                                {calculateSnowball.timeline.filter((_, i) => i % Math.ceil(calculateSnowball.timeline.length / 20) === 0).map((point, i, arr) => {
                                    const maxBalance = debts.reduce((s, d) => s + d.balance, 0) * 1.1; // 10% buffer
                                    const height = (point.totalBalance / maxBalance) * 100;
                                    return (
                                        <div key={point.month} className="flex-1 flex flex-col items-center group relative">
                                            <div
                                                className="w-full bg-[hsl(var(--primary))] opacity-80 rounded-t-sm transition-all hover:opacity-100"
                                                style={{ height: `${height}%` }}
                                            />
                                            {/* Tooltip */}
                                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 pointer-events-none">
                                                {formatDate(point.date)}: {formatCurrency(point.totalBalance)}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mt-2 border-t border-[hsl(var(--border))] pt-2">
                                <span>Now</span>
                                <span>{formatDate(calculateSnowball.summary.debtFreeDate)}</span>
                            </div>
                        </div>
                    )}

                    {/* Payoff Steps */}
                    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Snowball Payoff Order</h3>
                        <div className="space-y-4">
                            {[...debts].sort((a, b) => a.balance - b.balance).map((debt, idx) => (
                                <div key={debt.id} className="flex items-center gap-4 p-4 rounded-xl bg-[hsl(var(--muted))]/30">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(var(--primary))] text-white flex items-center justify-center font-bold">
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-[hsl(var(--foreground))]">{debt.name}</h4>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                            {formatCurrency(debt.balance)} at {debt.interestRate}%
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                                            Priority
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center pt-8">
                <PrivacyBadge />
            </div>
        </div>
    );
};
