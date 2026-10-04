"use client";

import { useState, useCallback } from "react";
import { Calculator, DollarSign, Percent, TrendingUp, RefreshCw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

type CalculatorMode = "margin" | "markup" | "selling";

interface CalculationResult {
    grossProfit: number;
    profitMargin: number;
    markup: number;
    sellingPrice: number;
    costPrice: number;
}

export function ProfitMarginCalculator() {
    const [mode, setMode] = useState<CalculatorMode>("margin");
    const [costPrice, setCostPrice] = useState<string>("");
    const [sellingPrice, setSellingPrice] = useState<string>("");
    const [marginPercent, setMarginPercent] = useState<string>("");
    const [markupPercent, setMarkupPercent] = useState<string>("");
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [currency, setCurrency] = useState<string>("$");

    const currencies = [
        { symbol: "$", label: "USD" },
        { symbol: "£", label: "GBP" },
        { symbol: "€", label: "EUR" },
        { symbol: "A$", label: "AUD" },
        { symbol: "C$", label: "CAD" },
        { symbol: "S$", label: "SGD" },
        { symbol: "₹", label: "INR" },
    ];

    const calculate = useCallback(() => {
        const cost = parseFloat(costPrice) || 0;
        const selling = parseFloat(sellingPrice) || 0;
        const margin = parseFloat(marginPercent) || 0;
        const markup = parseFloat(markupPercent) || 0;

        let calculatedResult: CalculationResult;

        if (mode === "margin") {
            // Calculate from cost and selling price
            if (cost <= 0 || selling <= 0) return;
            const grossProfit = selling - cost;
            const profitMargin = (grossProfit / selling) * 100;
            const markupCalc = (grossProfit / cost) * 100;

            calculatedResult = {
                grossProfit,
                profitMargin,
                markup: markupCalc,
                sellingPrice: selling,
                costPrice: cost,
            };
        } else if (mode === "markup") {
            // Calculate selling price from cost and markup %
            if (cost <= 0 || markup <= 0) return;
            const grossProfit = (cost * markup) / 100;
            const calculatedSelling = cost + grossProfit;
            const profitMargin = (grossProfit / calculatedSelling) * 100;

            calculatedResult = {
                grossProfit,
                profitMargin,
                markup,
                sellingPrice: calculatedSelling,
                costPrice: cost,
            };
        } else {
            // Calculate selling price from cost and margin %
            if (cost <= 0 || margin <= 0 || margin >= 100) return;
            const calculatedSelling = cost / (1 - margin / 100);
            const grossProfit = calculatedSelling - cost;
            const markupCalc = (grossProfit / cost) * 100;

            calculatedResult = {
                grossProfit,
                profitMargin: margin,
                markup: markupCalc,
                sellingPrice: calculatedSelling,
                costPrice: cost,
            };
        }

        setResult(calculatedResult);
    }, [mode, costPrice, sellingPrice, marginPercent, markupPercent]);

    const reset = () => {
        setCostPrice("");
        setSellingPrice("");
        setMarginPercent("");
        setMarkupPercent("");
        setResult(null);
    };

    const formatCurrency = (value: number) => {
        return `${currency}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <Breadcrumb
                    items={[
                        { label: "Business Tools", href: "/tools" },
                        { label: "Profit Margin Calculator" }
                    ]}
                />
                <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                    Free Profit Margin Calculator
                </h1>
                <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto font-normal">
                    Calculate gross profit margin, markup percentage, and selling price instantly.
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
                            { value: "margin", label: "Profit Margin", desc: "From prices" },
                            { value: "markup", label: "Selling Price", desc: "From markup %" },
                            { value: "selling", label: "Selling Price", desc: "From margin %" },
                        ].map((option) => (
                            <button
                                key={option.value}
                                onClick={() => { setMode(option.value as CalculatorMode); setResult(null); }}
                                className={`p-3 rounded-xl border-2 text-center transition-all ${mode === option.value
                                    ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5"
                                    : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50"
                                    }`}
                            >
                                <p className="font-semibold text-[hsl(var(--foreground))] text-sm">{option.label}</p>
                                <p className="text-xs text-[hsl(var(--muted-foreground))]">{option.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Currency Selector */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                        Currency
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {currencies.map((curr) => (
                            <button
                                key={curr.symbol}
                                onClick={() => setCurrency(curr.symbol)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${currency === curr.symbol
                                    ? "bg-[hsl(var(--primary))] text-white"
                                    : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--primary))]/20"
                                    }`}
                            >
                                {curr.symbol} {curr.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-4 mb-6">
                    {/* Cost Price - Always shown */}
                    <div>
                        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                            Cost Price (Cost of Goods)
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] font-medium">
                                {currency}
                            </span>
                            <input
                                type="number"
                                value={costPrice}
                                onChange={(e) => setCostPrice(e.target.value)}
                                placeholder="0.00"
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Selling Price - Only for margin mode */}
                    {mode === "margin" && (
                        <div>
                            <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                                Selling Price (Revenue)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] font-medium">
                                    {currency}
                                </span>
                                <input
                                    type="number"
                                    value={sellingPrice}
                                    onChange={(e) => setSellingPrice(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                                />
                            </div>
                        </div>
                    )}

                    {/* Markup % - Only for markup mode */}
                    {mode === "markup" && (
                        <div>
                            <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                                Markup Percentage
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={markupPercent}
                                    onChange={(e) => setMarkupPercent(e.target.value)}
                                    placeholder="0"
                                    className="w-full pl-4 pr-12 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] font-medium">
                                    %
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Margin % - Only for selling mode */}
                    {mode === "selling" && (
                        <div>
                            <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                                Desired Profit Margin
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={marginPercent}
                                    onChange={(e) => setMarginPercent(e.target.value)}
                                    placeholder="0"
                                    max="99"
                                    className="w-full pl-4 pr-12 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] font-medium">
                                    %
                                </span>
                            </div>
                        </div>
                    )}
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
                            <TrendingUp className="w-5 h-5 text-[hsl(var(--primary))]" />
                            Calculation Results
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-xl bg-[hsl(var(--background))]">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Gross Profit</p>
                                <p className="text-xl font-bold text-green-500">{formatCurrency(result.grossProfit)}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-[hsl(var(--background))]">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Profit Margin</p>
                                <p className="text-xl font-bold text-[hsl(var(--primary))]">{result.profitMargin.toFixed(2)}%</p>
                            </div>
                            <div className="p-4 rounded-xl bg-[hsl(var(--background))]">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Markup</p>
                                <p className="text-xl font-bold text-[hsl(var(--foreground))]">{result.markup.toFixed(2)}%</p>
                            </div>
                            <div className="p-4 rounded-xl bg-[hsl(var(--background))]">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Selling Price</p>
                                <p className="text-xl font-bold text-[hsl(var(--foreground))]">{formatCurrency(result.sellingPrice)}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Formula Reference */}
            <div className="mt-8 p-6 rounded-2xl bg-[hsl(var(--muted))]/50 border border-[hsl(var(--border))]">
                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-[hsl(var(--primary))]" />
                    Profit Margin Formulas
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 rounded-xl bg-[hsl(var(--background))]">
                        <p className="font-medium text-[hsl(var(--foreground))] mb-2">Profit Margin Formula:</p>
                        <code className="text-[hsl(var(--primary))]">
                            Margin % = (Selling Price - Cost) ÷ Selling Price × 100
                        </code>
                    </div>
                    <div className="p-4 rounded-xl bg-[hsl(var(--background))]">
                        <p className="font-medium text-[hsl(var(--foreground))] mb-2">Markup Formula:</p>
                        <code className="text-[hsl(var(--primary))]">
                            Markup % = (Selling Price - Cost) ÷ Cost × 100
                        </code>
                    </div>
                </div>
            </div>
        </div>
    );
}
