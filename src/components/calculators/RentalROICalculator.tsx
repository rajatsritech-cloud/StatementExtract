"use client";

import { useState, useMemo } from "react";
import { DollarSign, Percent, Home, Building, Calculator, TrendingUp } from "lucide-react";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

interface RentalMetrics {
    monthlyMortgage: number;
    monthlyExpenses: number;
    noi: number; // Net Operating Income (Annual)
    annualCashFlow: number;
    totalInvested: number;
    capRate: number;
    cashOnCash: number;
}

export const RentalROICalculator = () => {
    // Investment Details
    const [purchasePrice, setPurchasePrice] = useState<number>(250000);
    const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
    const [closingCosts, setClosingCosts] = useState<number>(5000);
    const [repairCosts, setRepairCosts] = useState<number>(2000);

    // Loan Details
    const [interestRate, setInterestRate] = useState<number>(6.5);
    const [loanTerm, setLoanTerm] = useState<number>(30);

    // Income & Expenses (Monthly)
    const [monthlyRent, setMonthlyRent] = useState<number>(2200);
    const [propertyTax, setPropertyTax] = useState<number>(250); // Monthly
    const [insurance, setInsurance] = useState<number>(100);
    const [hoa, setHoa] = useState<number>(0);
    const [maintenancePercent, setMaintenancePercent] = useState<number>(5);
    const [vacancyPercent, setVacancyPercent] = useState<number>(5);
    const [managementPercent, setManagementPercent] = useState<number>(0);

    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    const formatPercent = (val: number) => new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val / 100);

    const metrics: RentalMetrics | null = useMemo(() => {
        // Loan Calculation
        const downPayment = purchasePrice * (downPaymentPercent / 100);
        const loanAmount = purchasePrice - downPayment;
        let monthlyMortgage = 0;

        if (loanAmount > 0 && interestRate > 0) {
            const monthlyRate = (interestRate / 100) / 12;
            const numPayments = loanTerm * 12;
            monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
        } else if (loanAmount > 0 && interestRate === 0) {
            monthlyMortgage = loanAmount / (loanTerm * 12);
        }

        // Variable Expenses
        const maintenance = monthlyRent * (maintenancePercent / 100);
        const vacancy = monthlyRent * (vacancyPercent / 100);
        const management = monthlyRent * (managementPercent / 100);

        const totalMonthlyExpenses = propertyTax + insurance + hoa + maintenance + vacancy + management; // Excluding mortgage for NO1 calc typically? 
        // NOI = Revenue - Operating Expenses (excluding mortgage)
        const monthlyNOI = monthlyRent - totalMonthlyExpenses;
        const annualNOI = monthlyNOI * 12;

        const monthlyCashFlow = monthlyNOI - monthlyMortgage;
        const annualCashFlow = monthlyCashFlow * 12;

        const totalInvested = downPayment + closingCosts + repairCosts;

        const capRate = purchasePrice > 0 ? (annualNOI / purchasePrice) * 100 : 0;
        const cashOnCash = totalInvested > 0 ? (annualCashFlow / totalInvested) * 100 : 0;

        return {
            monthlyMortgage,
            monthlyExpenses: totalMonthlyExpenses,
            noi: annualNOI,
            annualCashFlow,
            totalInvested,
            capRate,
            cashOnCash
        };
    }, [
        purchasePrice, downPaymentPercent, closingCosts, repairCosts,
        interestRate, loanTerm,
        monthlyRent, propertyTax, insurance, hoa,
        maintenancePercent, vacancyPercent, managementPercent
    ]);

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
            <div className="text-center mb-4">
                <Breadcrumb
                    items={[
                        { label: "Business Tools", href: "/tools" },
                        { label: "Rental ROI Calculator" }
                    ]}
                />
                <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-blue-600 mb-4">
                    Rental ROI Calculator
                </h1>
                <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto font-normal">
                    Calculate cash flow, cap rate, and cash on cash return for your rental property investments. Analyze deals before you invest.
                </h2>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Inputs Columns */}
                <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Property & Loan Info */}
                    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 shadow-sm space-y-5 h-fit">
                        <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-[hsl(var(--border))] pb-3">
                            <Home className="w-5 h-5 text-[hsl(var(--primary))]" />
                            Property & Loan
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Purchase Price ($)</label>
                                <input
                                    type="number"
                                    value={purchasePrice}
                                    onChange={e => setPurchasePrice(Number(e.target.value))}
                                    className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Down Payment (%)</label>
                                    <input
                                        type="number"
                                        value={downPaymentPercent}
                                        onChange={e => setDownPaymentPercent(Number(e.target.value))}
                                        className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                    />
                                    <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                        {formatCurrency(purchasePrice * (downPaymentPercent / 100))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Interest Rate (%)</label>
                                    <input
                                        type="number"
                                        value={interestRate}
                                        onChange={e => setInterestRate(Number(e.target.value))}
                                        className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Loan Term (Years)</label>
                                    <input
                                        type="number"
                                        value={loanTerm}
                                        onChange={e => setLoanTerm(Number(e.target.value))}
                                        className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Closing Costs ($)</label>
                                    <input
                                        type="number"
                                        value={closingCosts}
                                        onChange={e => setClosingCosts(Number(e.target.value))}
                                        className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Repair/Rehab Costs ($)</label>
                                <input
                                    type="number"
                                    value={repairCosts}
                                    onChange={e => setRepairCosts(Number(e.target.value))}
                                    className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Income & Expenses */}
                    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 shadow-sm space-y-5 h-fit">
                        <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-[hsl(var(--border))] pb-3">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            Income & Expenses (Monthly)
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Gross Monthly Rent ($)</label>
                                <input
                                    type="number"
                                    value={monthlyRent}
                                    onChange={e => setMonthlyRent(Number(e.target.value))}
                                    className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Property Tax ($)</label>
                                    <input
                                        type="number"
                                        value={propertyTax}
                                        onChange={e => setPropertyTax(Number(e.target.value))}
                                        className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Insurance ($)</label>
                                    <input
                                        type="number"
                                        value={insurance}
                                        onChange={e => setInsurance(Number(e.target.value))}
                                        className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">HOA Fees ($)</label>
                                <input
                                    type="number"
                                    value={hoa}
                                    onChange={e => setHoa(Number(e.target.value))}
                                    className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Maint (%)</label>
                                    <input
                                        type="number"
                                        value={maintenancePercent}
                                        onChange={e => setMaintenancePercent(Number(e.target.value))}
                                        className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Vacancy (%)</label>
                                    <input
                                        type="number"
                                        value={vacancyPercent}
                                        onChange={e => setVacancyPercent(Number(e.target.value))}
                                        className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Mgmt (%)</label>
                                    <input
                                        type="number"
                                        value={managementPercent}
                                        onChange={e => setManagementPercent(Number(e.target.value))}
                                        className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Column */}
                <div className="xl:col-span-1 space-y-6">
                    {metrics && (
                        <>
                            {/* Key Stats Cards */}
                            <div className="space-y-4">
                                <div className={`p-6 rounded-2xl border ${metrics.annualCashFlow >= 0 ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                                    <div className={`flex items-center gap-2 mb-2 ${metrics.annualCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        <DollarSign className="w-5 h-5" />
                                        <span className="font-medium">Monthly Cash Flow</span>
                                    </div>
                                    <div className="text-3xl font-bold text-[hsl(var(--foreground))]">
                                        {formatCurrency(metrics.annualCashFlow / 12)}
                                    </div>
                                    <div className="text-sm opacity-80 mt-1">
                                        {formatCurrency(metrics.annualCashFlow)} / year
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                        <div className="flex items-center gap-2 text-blue-600 mb-1">
                                            <Percent className="w-4 h-4" />
                                            <span className="text-sm font-medium">CoC Return</span>
                                        </div>
                                        <div className="text-xl font-bold text-[hsl(var(--foreground))]">
                                            {metrics.cashOnCash.toFixed(2)}%
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                        <div className="flex items-center gap-2 text-purple-600 mb-1">
                                            <Building className="w-4 h-4" />
                                            <span className="text-sm font-medium">Cap Rate</span>
                                        </div>
                                        <div className="text-xl font-bold text-[hsl(var(--foreground))]">
                                            {metrics.capRate.toFixed(2)}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Expenses Breakdown */}
                            <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 shadow-sm">
                                <h3 className="font-semibold mb-4">Monthly Expenses</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-[hsl(var(--muted-foreground))]">Mortgage P&I</span>
                                        <span className="font-medium">{formatCurrency(metrics.monthlyMortgage)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[hsl(var(--muted-foreground))]">Property Tax</span>
                                        <span>{formatCurrency(propertyTax)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[hsl(var(--muted-foreground))]">Insurance</span>
                                        <span>{formatCurrency(insurance)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[hsl(var(--muted-foreground))]">HOA</span>
                                        <span>{formatCurrency(hoa)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[hsl(var(--muted-foreground))]">Maintenance</span>
                                        <span>{formatCurrency(monthlyRent * (maintenancePercent / 100))}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[hsl(var(--muted-foreground))]">Vacancy</span>
                                        <span>{formatCurrency(monthlyRent * (vacancyPercent / 100))}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[hsl(var(--muted-foreground))]">Management</span>
                                        <span>{formatCurrency(monthlyRent * (managementPercent / 100))}</span>
                                    </div>
                                    <div className="pt-3 mt-3 border-t border-[hsl(var(--border))] flex justify-between font-bold">
                                        <span>Total</span>
                                        <span>{formatCurrency(metrics.monthlyMortgage + metrics.monthlyExpenses)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Investment Breakdown */}
                            <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 shadow-sm">
                                <h3 className="font-semibold mb-4">Total Investment</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-[hsl(var(--muted-foreground))]">Down Payment</span>
                                        <span>{formatCurrency(purchasePrice * (downPaymentPercent / 100))}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[hsl(var(--muted-foreground))]">Closing Costs</span>
                                        <span>{formatCurrency(closingCosts)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[hsl(var(--muted-foreground))]">Repairs</span>
                                        <span>{formatCurrency(repairCosts)}</span>
                                    </div>
                                    <div className="pt-3 mt-3 border-t border-[hsl(var(--border))] flex justify-between font-bold text-[hsl(var(--primary))]">
                                        <span>Total Cash Needed</span>
                                        <span>{formatCurrency(metrics.totalInvested)}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="flex justify-center pt-8">
                <PrivacyBadge />
            </div>
        </div>
    );
};
