"use client";

import { useState, useEffect } from "react";
import { Calculator, ArrowRight, RotateCcw, DollarSign, Percent, TrendingUp, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type CalculationMode = "costToPrice" | "priceToMarkup" | "markupToCost";

interface CalculationResult {
    cost: number;
    sellingPrice: number;
    markupPercent: number;
    markupAmount: number;
    grossProfit: number;
    profitMargin: number;
}

export function MarkupCalculator() {
    const [mode, setMode] = useState<CalculationMode>("costToPrice");
    const [cost, setCost] = useState<string>("");
    const [sellingPrice, setSellingPrice] = useState<string>("");
    const [markupPercent, setMarkupPercent] = useState<string>("");
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [currency, setCurrency] = useState<string>("$");

    const currencies = [
        { symbol: "$", name: "USD" },
        { symbol: "€", name: "EUR" },
        { symbol: "£", name: "GBP" },
        { symbol: "₹", name: "INR" },
        { symbol: "A$", name: "AUD" },
        { symbol: "C$", name: "CAD" },
    ];

    const modeConfig = {
        costToPrice: {
            title: "Cost → Selling Price",
            description: "Enter cost and markup % to calculate selling price",
            icon: TrendingUp,
            inputs: ["cost", "markupPercent"],
        },
        priceToMarkup: {
            title: "Price → Markup %",
            description: "Enter cost and selling price to calculate markup",
            icon: Percent,
            inputs: ["cost", "sellingPrice"],
        },
        markupToCost: {
            title: "Reverse Markup",
            description: "Enter selling price and markup % to find cost",
            icon: ArrowLeftRight,
            inputs: ["sellingPrice", "markupPercent"],
        },
    };

    const calculate = () => {
        let costVal = parseFloat(cost) || 0;
        let priceVal = parseFloat(sellingPrice) || 0;
        let markupVal = parseFloat(markupPercent) || 0;

        if (mode === "costToPrice" && costVal > 0 && markupVal >= 0) {
            // Calculate selling price from cost and markup %
            const markupAmount = costVal * (markupVal / 100);
            priceVal = costVal + markupAmount;
            const profitMargin = ((priceVal - costVal) / priceVal) * 100;

            setResult({
                cost: costVal,
                sellingPrice: priceVal,
                markupPercent: markupVal,
                markupAmount: markupAmount,
                grossProfit: markupAmount,
                profitMargin: profitMargin,
            });
        } else if (mode === "priceToMarkup" && costVal > 0 && priceVal > 0) {
            // Calculate markup % from cost and selling price
            const markupAmount = priceVal - costVal;
            markupVal = (markupAmount / costVal) * 100;
            const profitMargin = (markupAmount / priceVal) * 100;

            setResult({
                cost: costVal,
                sellingPrice: priceVal,
                markupPercent: markupVal,
                markupAmount: markupAmount,
                grossProfit: markupAmount,
                profitMargin: profitMargin,
            });
        } else if (mode === "markupToCost" && priceVal > 0 && markupVal >= 0) {
            // Calculate cost from selling price and markup % (reverse)
            costVal = priceVal / (1 + markupVal / 100);
            const markupAmount = priceVal - costVal;
            const profitMargin = (markupAmount / priceVal) * 100;

            setResult({
                cost: costVal,
                sellingPrice: priceVal,
                markupPercent: markupVal,
                markupAmount: markupAmount,
                grossProfit: markupAmount,
                profitMargin: profitMargin,
            });
        }
    };

    const reset = () => {
        setCost("");
        setSellingPrice("");
        setMarkupPercent("");
        setResult(null);
    };

    const formatCurrency = (value: number) => {
        return `${currency}${value.toFixed(2)}`;
    };

    const formatPercent = (value: number) => {
        return `${value.toFixed(2)}%`;
    };

    // Auto-calculate when inputs change
    useEffect(() => {
        const timer = setTimeout(() => {
            calculate();
        }, 300);
        return () => clearTimeout(timer);
    }, [cost, sellingPrice, markupPercent, mode]);

    // Quick markup presets
    const quickMarkups = [10, 20, 25, 30, 50, 100];

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                    Free Markup Calculator
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
                    Calculate markup percentage, selling price, or cost. Understand your profit margins instantly.
                </p>
            </div>

            {/* Mode Selector */}
            <div className="grid grid-cols-3 gap-2 mb-6">
                {(Object.keys(modeConfig) as CalculationMode[]).map((modeKey) => {
                    const config = modeConfig[modeKey];
                    const IconComponent = config.icon;
                    return (
                        <button
                            key={modeKey}
                            onClick={() => { setMode(modeKey); reset(); }}
                            className={`p-3 rounded-xl border transition-all duration-200 ${mode === modeKey
                                ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                                : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary))]/50"
                                }`}
                        >
                            <IconComponent className="w-5 h-5 mx-auto mb-1" />
                            <span className="text-xs font-medium block">{config.title}</span>
                        </button>
                    );
                })}
            </div>

            {/* Calculator Card */}
            <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] p-6 md:p-8">
                {/* Currency Selector */}
                <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-medium text-[hsl(var(--foreground))]">Currency</span>
                    <div className="flex gap-1">
                        {currencies.map((curr) => (
                            <button
                                key={curr.symbol}
                                onClick={() => setCurrency(curr.symbol)}
                                className={`px-3 py-1 text-sm rounded-lg transition-colors ${currency === curr.symbol
                                    ? "bg-[hsl(var(--primary))] text-white"
                                    : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/80"
                                    }`}
                            >
                                {curr.symbol}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                    {/* Cost Input */}
                    {modeConfig[mode].inputs.includes("cost") && (
                        <div>
                            <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                                Cost Price
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]">
                                    {currency}
                                </span>
                                <input
                                    type="number"
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-lg focus:outline-none focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))]/20"
                                />
                            </div>
                        </div>
                    )}

                    {/* Selling Price Input */}
                    {modeConfig[mode].inputs.includes("sellingPrice") && (
                        <div>
                            <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                                Selling Price
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]">
                                    {currency}
                                </span>
                                <input
                                    type="number"
                                    value={sellingPrice}
                                    onChange={(e) => setSellingPrice(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-lg focus:outline-none focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))]/20"
                                />
                            </div>
                        </div>
                    )}

                    {/* Markup Percentage Input */}
                    {modeConfig[mode].inputs.includes("markupPercent") && (
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
                                    className="w-full pl-4 pr-10 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-lg focus:outline-none focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))]/20"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]">
                                    %
                                </span>
                            </div>
                            {/* Quick Markup Buttons */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {quickMarkups.map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => setMarkupPercent(val.toString())}
                                        className="px-3 py-1 text-xs rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))] transition-colors"
                                    >
                                        {val}%
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                    <Button
                        onClick={calculate}
                        className="flex-1 py-6 bg-gradient-primary shadow-glow hover:opacity-90"
                    >
                        <Calculator className="w-5 h-5 mr-2" />
                        Calculate
                    </Button>
                    <Button variant="outline" onClick={reset} className="py-6">
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </div>

                {/* Results */}
                {result && (
                    <div className="mt-6 pt-6 border-t border-[hsl(var(--border))]">
                        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">Results</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-[hsl(var(--muted))]/50">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Cost Price</p>
                                <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                                    {formatCurrency(result.cost)}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-[hsl(var(--primary))]/10">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Selling Price</p>
                                <p className="text-xl font-bold text-[hsl(var(--primary))]">
                                    {formatCurrency(result.sellingPrice)}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-[hsl(var(--muted))]/50">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Markup %</p>
                                <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                                    {formatPercent(result.markupPercent)}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-green-500/10">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Gross Profit</p>
                                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                    {formatCurrency(result.grossProfit)}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-[hsl(var(--muted))]/50">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Profit Margin</p>
                                <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                                    {formatPercent(result.profitMargin)}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-[hsl(var(--muted))]/50">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Markup Amount</p>
                                <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                                    {formatCurrency(result.markupAmount)}
                                </p>
                            </div>
                        </div>

                        {/* Calculation Breakdown */}
                        <div className="mt-4 p-4 rounded-xl bg-[hsl(var(--muted))]/30 border border-[hsl(var(--border))]">
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                <strong>Formula:</strong> Selling Price = Cost × (1 + Markup% ÷ 100)
                            </p>
                            <p className="text-sm text-[hsl(var(--foreground))] mt-1">
                                {formatCurrency(result.sellingPrice)} = {formatCurrency(result.cost)} × (1 + {result.markupPercent.toFixed(0)}% ÷ 100)
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Markup vs Margin Quick Reference */}
            <div className="mt-6 p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                    <ArrowLeftRight className="w-5 h-5 text-[hsl(var(--primary))]" />
                    Markup vs Margin Quick Reference
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    {[
                        { markup: 20, margin: 16.67 },
                        { markup: 25, margin: 20 },
                        { markup: 50, margin: 33.33 },
                        { markup: 100, margin: 50 },
                    ].map((item) => (
                        <div key={item.markup} className="p-3 rounded-lg bg-[hsl(var(--muted))]/50">
                            <p className="text-lg font-bold text-[hsl(var(--foreground))]">{item.markup}%</p>
                            <p className="text-xs text-[hsl(var(--muted-foreground))]">Markup</p>
                            <ArrowRight className="w-3 h-3 mx-auto my-1 text-[hsl(var(--muted-foreground))]" />
                            <p className="text-lg font-bold text-[hsl(var(--primary))]">{item.margin.toFixed(2)}%</p>
                            <p className="text-xs text-[hsl(var(--muted-foreground))]">Margin</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
