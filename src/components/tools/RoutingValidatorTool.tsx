"use client";

import React, { useState } from "react";
import { CheckCircle, XCircle, Search, Building2, ShieldCheck, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RoutingValidatorTool() {
    const [routingNum, setRoutingNum] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [bankDetails, setBankDetails] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);

    // ABA Routing Number Checksum Algorithm
    const validateRouting = (rn: string) => {
        if (!/^\d{9}$/.test(rn)) return false;

        const weights = [3, 7, 1, 3, 7, 1, 3, 7];
        let sum = 0;

        for (let i = 0; i < 8; i++) {
            sum += parseInt(rn[i]) * weights[i];
        }

        const checksum = Math.ceil(sum / 10) * 10 - sum;
        return checksum === parseInt(rn[8]);
    };

    const handleCheck = () => {
        setTouched(true);
        const valid = validateRouting(routingNum);
        setIsValid(valid);

        if (valid) {
            // Simulated "Lookup" - In a real app this would hit a DB
            // For SEO/Demo purposes we show the structure
            setBankDetails("Valid US Banking Institution Format");
        } else {
            setBankDetails(null);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(routingNum);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-[hsl(var(--card))] rounded-3xl border border-[hsl(var(--border))] shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-[hsl(var(--muted))]/30 border-b border-[hsl(var(--border))] p-8 text-center">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[hsl(var(--primary))]/10 mb-5">
                        <ShieldCheck className="w-10 h-10 text-[hsl(var(--primary))]" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-3">
                        Routing Number Validator
                    </h1>
                    <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-2xl mx-auto">
                        Instantly verify typical US Bank Routing Numbers (ABA) using the official checksum algorithm.
                    </p>
                </div>

                <div className="p-8 md:p-12">
                    <div className="max-w-xl mx-auto space-y-8">
                        <div>
                            <label className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-3 uppercase tracking-wider">
                                Enter 9-Digit ABA Routing Number
                            </label>
                            <div className="relative">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[hsl(var(--muted-foreground))]" />
                                <input
                                    type="text"
                                    value={routingNum}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '').slice(0, 9);
                                        setRoutingNum(val);
                                        setIsValid(null); // Reset on type
                                        setTouched(false);
                                    }}
                                    className={`w-full pl-14 pr-4 py-4 text-2xl font-mono tracking-widest bg-[hsl(var(--background))] border rounded-xl outline-none transition-all shadow-sm ${isValid === false && touched
                                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                            : isValid === true
                                                ? "border-green-500 focus:ring-2 focus:ring-green-200"
                                                : "border-[hsl(var(--input))] focus:border-[hsl(var(--primary))] focus:ring-4 focus:ring-[hsl(var(--primary))]/10"
                                        }`}
                                    placeholder="000000000"
                                />
                            </div>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-3 flex justify-between">
                                <span>Format: 9 Digits</span>
                                <span>{routingNum.length}/9</span>
                            </p>
                        </div>

                        <Button
                            onClick={handleCheck}
                            size="lg"
                            className="w-full text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all"
                            disabled={routingNum.length !== 9}
                        >
                            Validate Routing Number
                        </Button>

                        {/* Result Display */}
                        {touched && isValid !== null && (
                            <div className={`rounded-2xl p-6 border animate-in fade-in zoom-in duration-300 ${isValid
                                    ? "bg-green-500/5 border-green-500/20"
                                    : "bg-red-500/5 border-red-500/20"
                                }`}>
                                <div className="flex items-start gap-4">
                                    {isValid ? (
                                        <CheckCircle className="w-8 h-8 text-green-600 shrink-0" />
                                    ) : (
                                        <XCircle className="w-8 h-8 text-red-600 shrink-0" />
                                    )}
                                    <div className="flex-1">
                                        <h3 className={`text-xl font-bold mb-1 ${isValid ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                                            {isValid ? "Valid Routing Number Format" : "Invalid Routing Number"}
                                        </h3>
                                        <p className="text-[hsl(var(--muted-foreground))] mb-4">
                                            {isValid
                                                ? "This number passes the checksum validation used by US banks."
                                                : "This number does not follow the standard ABA routing checksum rules."
                                            }
                                        </p>

                                        {isValid && (
                                            <div className="bg-[hsl(var(--background))] rounded-xl p-4 border border-[hsl(var(--border))] flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Building2 className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                                                    <div>
                                                        <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase">Status</p>
                                                        <p className="font-medium">{bankDetails}</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                                                    <Copy className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
