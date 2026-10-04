"use client";

import React, { useState, useEffect } from "react";
import { Percent, ArrowUp, ArrowDown, Calculator, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

type Mode = "increase" | "percentOf" | "whatPercent";

export function PercentageTool() {
    const [mode, setMode] = useState<Mode>("increase");
    const [val1, setVal1] = useState<string>("");
    const [val2, setVal2] = useState<string>("");
    const [result, setResult] = useState<number | null>(null);
    const [explanation, setExplanation] = useState<string>("");

    const calculate = () => {
        const v1 = parseFloat(val1);
        const v2 = parseFloat(val2);

        if (isNaN(v1) || isNaN(v2)) {
            setResult(null);
            setExplanation("");
            return;
        }

        if (mode === "increase") {
            // Percentage Increase/Decrease
            const diff = v2 - v1;
            const res = (diff / v1) * 100;
            setResult(res);
            setExplanation(res > 0
                ? `${v2} is a ${res.toFixed(2)}% increase from ${v1}`
                : `${v2} is a ${Math.abs(res).toFixed(2)}% decrease from ${v1}`
            );
        } else if (mode === "percentOf") {
            // What is X% of Y?
            const res = (v1 / 100) * v2;
            setResult(res);
            setExplanation(`${v1}% of ${v2} is ${res.toLocaleString()}`);
        } else if (mode === "whatPercent") {
            // X is what % of Y?
            const res = (v1 / v2) * 100;
            setResult(res);
            setExplanation(`${v1} is ${res.toFixed(2)}% of ${v2}`);
        }
    };

    useEffect(() => {
        calculate();
    }, [val1, val2, mode]);

    const reset = () => {
        setVal1("");
        setVal2("");
        setResult(null);
        setExplanation("");
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-[hsl(var(--card))] rounded-3xl border border-[hsl(var(--border))] shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-[hsl(var(--muted))]/30 border-b border-[hsl(var(--border))] p-6 md:p-8 text-center">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[hsl(var(--primary))]/10 mb-4">
                        <Percent className="w-8 h-8 text-[hsl(var(--primary))]" />
                    </div>
                    <Breadcrumb
                        items={[
                            { label: "Business Tools", href: "/tools" },
                            { label: "Percentage Calculator" }
                        ]}
                    />
                    <h1 className="text-3xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                        Percentage Calculator
                    </h1>
                    <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto font-normal">
                        Calculate increases, discounts, and proportions instantly.
                    </h2>
                </div>

                {/* Mode Selector */}
                <div className="flex border-b border-[hsl(var(--border))] divide-x divide-[hsl(var(--border))] overflow-x-auto">
                    {[
                        { id: "increase", label: "% Increase / Decrease" },
                        { id: "percentOf", label: "What is X% of Y?" },
                        { id: "whatPercent", label: "X is what % of Y?" }
                    ].map((m) => (
                        <button
                            key={m.id}
                            onClick={() => { setMode(m.id as Mode); reset(); }}
                            className={`flex-1 min-w-[150px] p-4 text-sm font-semibold transition-colors ${mode === m.id
                                ? "bg-[hsl(var(--primary))]/5 text-[hsl(var(--primary))]"
                                : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/50"
                                }`}
                        >
                            {m.label}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[hsl(var(--border))]">
                    {/* Inputs */}
                    <div className="md:col-span-6 p-6 md:p-8 space-y-6">
                        {mode === "increase" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">Original Value</label>
                                    <input
                                        type="number" value={val1} onChange={e => setVal1(e.target.value)}
                                        className="w-full p-3 rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                        placeholder="e.g., 100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">New Value</label>
                                    <input
                                        type="number" value={val2} onChange={e => setVal2(e.target.value)}
                                        className="w-full p-3 rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                        placeholder="e.g., 150"
                                    />
                                </div>
                            </>
                        )}

                        {mode === "percentOf" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">Percentage (%)</label>
                                    <input
                                        type="number" value={val1} onChange={e => setVal1(e.target.value)}
                                        className="w-full p-3 rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                        placeholder="e.g., 20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">Of Number</label>
                                    <input
                                        type="number" value={val2} onChange={e => setVal2(e.target.value)}
                                        className="w-full p-3 rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                        placeholder="e.g., 500"
                                    />
                                </div>
                            </>
                        )}

                        {mode === "whatPercent" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">Number (Part)</label>
                                    <input
                                        type="number" value={val1} onChange={e => setVal1(e.target.value)}
                                        className="w-full p-3 rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                        placeholder="e.g., 25"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">Total (Whole)</label>
                                    <input
                                        type="number" value={val2} onChange={e => setVal2(e.target.value)}
                                        className="w-full p-3 rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                        placeholder="e.g., 100"
                                    />
                                </div>
                            </>
                        )}

                        <Button onClick={reset} variant="ghost" className="w-full gap-2">
                            <RefreshCw className="w-4 h-4" /> Clear
                        </Button>
                    </div>

                    {/* Result */}
                    <div className="md:col-span-6 bg-[hsl(var(--muted))]/10 p-6 md:p-8 flex flex-col justify-center items-center text-center">
                        {result !== null ? (
                            <div className="space-y-2 animate-in fade-in zoom-in duration-300">
                                <p className="text-[hsl(var(--muted-foreground))] font-medium">Result</p>
                                <p className={`text-5xl font-bold tracking-tight ${(mode === "increase" && result < 0) ? "text-red-500" : "text-[hsl(var(--primary))]"
                                    }`}>
                                    {mode === "increase" ? (result > 0 ? "+" : "") : ""}
                                    {Number.isInteger(result) ? result : result.toFixed(2)}
                                    {mode === "percentOf" ? "" : "%"}
                                </p>
                                <p className="text-lg font-medium text-[hsl(var(--foreground))] mt-4 py-2 px-4 rounded-full bg-[hsl(var(--background))] border border-[hsl(var(--border))] inline-block shadow-sm">
                                    {explanation}
                                </p>
                            </div>
                        ) : (
                            <div className="text-[hsl(var(--muted-foreground))] opacity-50 space-y-2">
                                <Calculator className="w-12 h-12 mx-auto" />
                                <p>Enter values to calculate</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
