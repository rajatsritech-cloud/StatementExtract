"use client";

import React, { useState, useEffect } from "react";
import { DollarSign, Clock, Calendar, Calculator, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SalaryData {
    hourly: number;
    daily: number;
    weekly: number;
    biWeekly: number;
    monthly: number;
    annual: number;
}

export function HourlyToSalaryTool() {
    const [hourlyRate, setHourlyRate] = useState<string>("25.00");
    const [hoursPerWeek, setHoursPerWeek] = useState<string>("40");
    const [weeksPerYear, setWeeksPerYear] = useState<string>("52");
    const [currency, setCurrency] = useState<string>("USD");
    const [results, setResults] = useState<SalaryData | null>(null);

    const currencies = [
        { code: "USD", symbol: "$", name: "US Dollar" },
        { code: "GBP", symbol: "£", name: "British Pound" },
        { code: "EUR", symbol: "€", name: "Euro" },
        { code: "CAD", symbol: "$", name: "Canadian Dollar" },
        { code: "AUD", symbol: "$", name: "Australian Dollar" },
        { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
        { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    ];

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: currency === "JPY" ? 0 : 2,
            maximumFractionDigits: currency === "JPY" ? 0 : 2,
        }).format(val);
    };

    const getSymbol = () => currencies.find(c => c.code === currency)?.symbol || "$";

    const calculate = () => {
        const rate = parseFloat(hourlyRate) || 0;
        const hours = parseFloat(hoursPerWeek) || 0;
        const weeks = parseFloat(weeksPerYear) || 0;

        const weekly = rate * hours;
        const annual = weekly * weeks;
        const monthly = annual / 12;
        const biWeekly = annual / 26;
        const daily = weekly / 5; // Assuming 5 day work week for simplicity in daily view

        setResults({
            hourly: rate,
            daily,
            weekly,
            biWeekly,
            monthly,
            annual,
        });
    };

    useEffect(() => {
        calculate();
    }, [hourlyRate, hoursPerWeek, weeksPerYear, currency]);

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="bg-[hsl(var(--card))] rounded-3xl border border-[hsl(var(--border))] shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-[hsl(var(--muted))]/30 border-b border-[hsl(var(--border))] p-6 md:p-8 text-center">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[hsl(var(--primary))]/10 mb-4">
                        <Calculator className="w-8 h-8 text-[hsl(var(--primary))]" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-2">
                        Hourly to Salary Calculator
                    </h1>
                    <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto font-normal">
                        Instantly convert your hourly wage to weekly, monthly, and annual income.
                    </h2>
                </div>

                <div className="grid md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[hsl(var(--border))]">
                    {/* Input Section */}
                    <div className="md:col-span-5 p-6 md:p-8 space-y-6">

                        {/* Currency Selector */}
                        <div>
                            <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">
                                Currency
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {currencies.map((c) => (
                                    <button
                                        key={c.code}
                                        onClick={() => setCurrency(c.code)}
                                        className={`px-2 py-2 text-sm font-semibold rounded-lg border transition-all ${currency === c.code
                                            ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]"
                                            : "bg-[hsl(var(--background))] border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary))]"
                                            }`}
                                    >
                                        {c.code}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">
                                Hourly Wage
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-[hsl(var(--muted-foreground))]">
                                    {getSymbol()}
                                </span>
                                <input
                                    type="number"
                                    value={hourlyRate}
                                    onChange={(e) => setHourlyRate(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-[hsl(var(--background))] border border-[hsl(var(--input))] rounded-xl text-lg font-semibold focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] transition-all outline-none"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">
                                Hours per Week
                            </label>
                            <div className="relative">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                                <input
                                    type="number"
                                    value={hoursPerWeek}
                                    onChange={(e) => setHoursPerWeek(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-[hsl(var(--background))] border border-[hsl(var(--input))] rounded-xl text-lg font-semibold focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] transition-all outline-none"
                                    placeholder="40"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">
                                Weeks per Year
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                                <input
                                    type="number"
                                    value={weeksPerYear}
                                    onChange={(e) => setWeeksPerYear(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-[hsl(var(--background))] border border-[hsl(var(--input))] rounded-xl text-lg font-semibold focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] transition-all outline-none"
                                    placeholder="52"
                                />
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1 ml-1">
                                    Standard year is 52 weeks. Subtract 2 weeks for unpaid vacation = 50.
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={() => {
                                setHourlyRate("25.00");
                                setHoursPerWeek("40");
                                setWeeksPerYear("52");
                            }}
                            variant="outline"
                            className="w-full h-12 rounded-xl gap-2 hover:bg-[hsl(var(--muted))]/50"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset Defaults
                        </Button>
                    </div>

                    {/* Results Section */}
                    <div className="md:col-span-7 bg-[hsl(var(--muted))]/10 p-6 md:p-8 flex flex-col justify-center">
                        {results && (
                            <div className="space-y-6">
                                {/* Highlights */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-[hsl(var(--background))] rounded-2xl border border-[hsl(var(--border))] shadow-sm text-center">
                                        <p className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-1">Annual Salary</p>
                                        <p className="text-2xl md:text-3xl font-bold text-[hsl(var(--primary))]">
                                            {formatCurrency(results.annual)}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-[hsl(var(--background))] rounded-2xl border border-[hsl(var(--border))] shadow-sm text-center">
                                        <p className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-1">Monthly Pay</p>
                                        <p className="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))]">
                                            {formatCurrency(results.monthly)}
                                        </p>
                                    </div>
                                </div>

                                {/* Detailed Table */}
                                <div className="bg-[hsl(var(--background))] rounded-2xl border border-[hsl(var(--border))] overflow-hidden">
                                    <table className="w-full">
                                        <tbody className="divide-y divide-[hsl(var(--border))]">
                                            {[
                                                { label: "Bi-Weekly Pay", value: results.biWeekly, desc: "Every 2 weeks" },
                                                { label: "Weekly Pay", value: results.weekly, desc: "Every week" },
                                                { label: "Daily Pay", value: results.daily, desc: "Per 8-hour day" },
                                                { label: "Hourly Rate", value: results.hourly, desc: "Your unadjusted wage" },
                                            ].map((row, i) => (
                                                <tr key={i} className="hover:bg-[hsl(var(--muted))]/20 transition-colors">
                                                    <td className="p-4 text-left">
                                                        <p className="font-semibold text-[hsl(var(--foreground))]">{row.label}</p>
                                                        <p className="text-xs text-[hsl(var(--muted-foreground))]">{row.desc}</p>
                                                    </td>
                                                    <td className="p-4 text-right font-medium text-[hsl(var(--foreground))]">
                                                        {formatCurrency(row.value)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
