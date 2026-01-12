"use client";

import { useState, useCallback } from "react";
import { Calculator, DollarSign, Percent, RefreshCw, Info, Globe, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

type CalculatorMode = "add" | "remove" | "calculate";

interface CalculationResult {
    originalAmount: number;
    taxAmount: number;
    totalAmount: number;
    taxRate: number;
    taxType: string;
}

interface TaxRate {
    country: string;
    code: string;
    type: string;
    standardRate: number;
    reducedRates?: number[];
    currency: string;
    symbol: string;
}

const taxRates: TaxRate[] = [
    { country: "United States", code: "US", type: "Sales Tax", standardRate: 0, reducedRates: [5, 6, 7, 8, 9, 10], currency: "USD", symbol: "$" },
    { country: "United Kingdom", code: "UK", type: "VAT", standardRate: 20, reducedRates: [5, 0], currency: "GBP", symbol: "£" },
    { country: "European Union", code: "EU", type: "VAT", standardRate: 21, reducedRates: [10, 5, 0], currency: "EUR", symbol: "€" },
    { country: "Germany", code: "DE", type: "VAT", standardRate: 19, reducedRates: [7, 0], currency: "EUR", symbol: "€" },
    { country: "France", code: "FR", type: "VAT", standardRate: 20, reducedRates: [10, 5.5, 2.1, 0], currency: "EUR", symbol: "€" },
    { country: "Canada", code: "CA", type: "GST/HST", standardRate: 5, reducedRates: [13, 15], currency: "CAD", symbol: "C$" },
    { country: "Australia", code: "AU", type: "GST", standardRate: 10, reducedRates: [0], currency: "AUD", symbol: "A$" },
    { country: "New Zealand", code: "NZ", type: "GST", standardRate: 15, reducedRates: [0], currency: "NZD", symbol: "NZ$" },
    { country: "India", code: "IN", type: "GST", standardRate: 18, reducedRates: [5, 12, 28, 0], currency: "INR", symbol: "₹" },
    { country: "Singapore", code: "SG", type: "GST", standardRate: 9, reducedRates: [0], currency: "SGD", symbol: "S$" },
    { country: "Japan", code: "JP", type: "Consumption Tax", standardRate: 10, reducedRates: [8], currency: "JPY", symbol: "¥" },
    { country: "South Africa", code: "ZA", type: "VAT", standardRate: 15, reducedRates: [0], currency: "ZAR", symbol: "R" },
    { country: "United Arab Emirates", code: "AE", type: "VAT", standardRate: 5, reducedRates: [0], currency: "AED", symbol: "د.إ" },
    { country: "Saudi Arabia", code: "SA", type: "VAT", standardRate: 15, reducedRates: [0], currency: "SAR", symbol: "﷼" },
    { country: "Mexico", code: "MX", type: "IVA", standardRate: 16, reducedRates: [0], currency: "MXN", symbol: "$" },
    { country: "Brazil", code: "BR", type: "ICMS", standardRate: 17, reducedRates: [12, 7], currency: "BRL", symbol: "R$" },
];

export function GSTVATCalculator() {
    const [mode, setMode] = useState<CalculatorMode>("add");
    const [amount, setAmount] = useState<string>("");
    const [customRate, setCustomRate] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<TaxRate>(taxRates[3]); // Germany default (high CPC)
    const [useCustomRate, setUseCustomRate] = useState(false);
    const [result, setResult] = useState<CalculationResult | null>(null);

    const calculate = useCallback(() => {
        const amountValue = parseFloat(amount);
        const rate = useCustomRate ? parseFloat(customRate) : selectedCountry.standardRate;

        if (isNaN(amountValue) || amountValue <= 0 || isNaN(rate) || rate < 0) return;

        let originalAmount: number;
        let taxAmount: number;
        let totalAmount: number;

        if (mode === "add") {
            // Add tax to net amount
            originalAmount = amountValue;
            taxAmount = (amountValue * rate) / 100;
            totalAmount = amountValue + taxAmount;
        } else if (mode === "remove") {
            // Remove tax from gross amount
            totalAmount = amountValue;
            originalAmount = amountValue / (1 + rate / 100);
            taxAmount = totalAmount - originalAmount;
        } else {
            // Calculate tax amount from gross
            totalAmount = amountValue;
            taxAmount = (amountValue * rate) / (100 + rate);
            originalAmount = totalAmount - taxAmount;
        }

        setResult({
            originalAmount,
            taxAmount,
            totalAmount,
            taxRate: rate,
            taxType: useCustomRate ? "Custom Rate" : selectedCountry.type,
        });
    }, [mode, amount, customRate, selectedCountry, useCustomRate]);

    const reset = () => {
        setAmount("");
        setCustomRate("");
        setResult(null);
    };

    const formatCurrency = (value: number) => {
        const symbol = selectedCountry.symbol;
        return `${symbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <Breadcrumb
                    items={[
                        { label: "Business Tools", href: "/tools" },
                        { label: "GST/VAT Calculator" }
                    ]}
                />
                <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                    Free GST/VAT Calculator
                </h1>
                <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto font-normal">
                    Calculate GST, VAT, and sales tax for any country. Add or remove tax instantly.
                </h2>
            </div>

            {/* Calculator Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-lg">
                {/* Mode Selector */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-3">
                        What do you want to calculate?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { value: "add", label: "Add Tax", desc: "Net → Gross", icon: <ArrowRight className="w-4 h-4" /> },
                            { value: "remove", label: "Remove Tax", desc: "Gross → Net", icon: <ArrowLeft className="w-4 h-4" /> },
                            { value: "calculate", label: "Calculate Tax", desc: "Find tax in total", icon: <Percent className="w-4 h-4" /> },
                        ].map((option) => (
                            <button
                                key={option.value}
                                onClick={() => { setMode(option.value as CalculatorMode); setResult(null); }}
                                className={`p-3 rounded-xl border-2 text-center transition-all ${mode === option.value
                                    ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5"
                                    : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50"
                                    }`}
                            >
                                <div className="flex justify-center mb-1 text-[hsl(var(--primary))]">{option.icon}</div>
                                <p className="font-semibold text-[hsl(var(--foreground))] text-sm">{option.label}</p>
                                <p className="text-xs text-[hsl(var(--muted-foreground)))]">{option.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Country/Tax Type Selector */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                        <Globe className="w-4 h-4 inline mr-1" />
                        Country / Tax Type
                    </label>
                    <select
                        value={selectedCountry.code}
                        onChange={(e) => {
                            const country = taxRates.find(t => t.code === e.target.value);
                            if (country) {
                                setSelectedCountry(country);
                                setUseCustomRate(false);
                                setResult(null);
                            }
                        }}
                        className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                    >
                        {taxRates.map((tax) => (
                            <option key={tax.code} value={tax.code}>
                                {tax.country} - {tax.type} ({tax.standardRate}%)
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tax Rate Display / Custom Rate */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-[hsl(var(--foreground))]">
                            Tax Rate
                        </label>
                        <button
                            onClick={() => { setUseCustomRate(!useCustomRate); setResult(null); }}
                            className="text-xs text-[hsl(var(--primary))] hover:underline"
                        >
                            {useCustomRate ? "Use standard rate" : "Use custom rate"}
                        </button>
                    </div>

                    {useCustomRate ? (
                        <div className="relative">
                            <input
                                type="number"
                                value={customRate}
                                onChange={(e) => setCustomRate(e.target.value)}
                                placeholder="Enter rate"
                                min="0"
                                max="100"
                                step="0.1"
                                className="w-full pl-4 pr-12 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] font-medium">
                                %
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            <span className="px-4 py-2 rounded-xl bg-[hsl(var(--primary))] text-white font-medium">
                                {selectedCountry.standardRate}% Standard
                            </span>
                            {selectedCountry.reducedRates?.map((rate) => (
                                <button
                                    key={rate}
                                    onClick={() => { setCustomRate(String(rate)); setUseCustomRate(true); }}
                                    className="px-4 py-2 rounded-xl bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] font-medium hover:bg-[hsl(var(--primary))]/20 transition-colors"
                                >
                                    {rate}%{rate === 0 ? " Exempt" : " Reduced"}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Amount Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                        {mode === "add" ? "Net Amount (before tax)" : "Gross Amount (including tax)"}
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] font-medium">
                            {selectedCountry.symbol}
                        </span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Button
                        onClick={calculate}
                        className="flex-1 h-12 text-lg bg-gradient-primary shadow-glow hover:opacity-90"
                    >
                        <Calculator className="w-5 h-5 mr-2" />
                        Calculate
                    </Button>
                    <Button
                        onClick={reset}
                        variant="outline"
                        className="h-12 px-4"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </Button>
                </div>

                {/* Results */}
                {result && (
                    <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/20">
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-[hsl(var(--primary))]" />
                            Calculation Results
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-xl bg-[hsl(var(--background))]">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Net Amount</p>
                                <p className="text-xl font-bold text-[hsl(var(--foreground))]">{formatCurrency(result.originalAmount)}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-[hsl(var(--background))]">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">{result.taxType} ({result.taxRate}%)</p>
                                <p className="text-xl font-bold text-[hsl(var(--primary))]">{formatCurrency(result.taxAmount)}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-[hsl(var(--background))]">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Gross Total</p>
                                <p className="text-xl font-bold text-green-500">{formatCurrency(result.totalAmount)}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-[hsl(var(--background))]">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Tax Rate Used</p>
                                <p className="text-xl font-bold text-[hsl(var(--foreground))]">{result.taxRate}%</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Formula Reference */}
            <div className="mt-8 p-6 rounded-2xl bg-[hsl(var(--muted))]/50 border border-[hsl(var(--border))]">
                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-[hsl(var(--primary))]" />
                    GST/VAT Formulas
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 rounded-xl bg-[hsl(var(--background))]">
                        <p className="font-medium text-[hsl(var(--foreground))] mb-2">Add Tax (Net to Gross):</p>
                        <code className="text-[hsl(var(--primary))]">
                            Gross = Net × (1 + Rate/100)
                        </code>
                    </div>
                    <div className="p-4 rounded-xl bg-[hsl(var(--background))]">
                        <p className="font-medium text-[hsl(var(--foreground))] mb-2">Remove Tax (Gross to Net):</p>
                        <code className="text-[hsl(var(--primary))]">
                            Net = Gross ÷ (1 + Rate/100)
                        </code>
                    </div>
                </div>
            </div>
        </div>
    );
}
