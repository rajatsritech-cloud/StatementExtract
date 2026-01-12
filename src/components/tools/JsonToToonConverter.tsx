"use client";

import { useState, useCallback, useEffect } from "react";
import { Copy, Check, ArrowRight, Zap, AlertTriangle, Code2, FileJson } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

// Custom JSON to TOON converter
function jsonToToon(obj: unknown, indent: number = 0): string {
    const indentStr = "  ".repeat(indent);

    if (obj === null) return "null";
    if (obj === undefined) return "undefined";

    if (typeof obj === "string") {
        // Quote strings that contain special characters
        if (/[,:\n\r]/.test(obj) || obj.includes('"')) {
            return `"${obj.replace(/"/g, '\\"')}"`;
        }
        return obj;
    }

    if (typeof obj === "number" || typeof obj === "boolean") {
        return String(obj);
    }

    if (Array.isArray(obj)) {
        if (obj.length === 0) return "[]";

        // Check if all items are objects with same keys (tabular data)
        const allObjects = obj.every(item =>
            typeof item === "object" && item !== null && !Array.isArray(item)
        );

        if (allObjects && obj.length > 0) {
            const firstKeys = Object.keys(obj[0] as object);
            const allSameKeys = obj.every(item => {
                const keys = Object.keys(item as object);
                return keys.length === firstKeys.length &&
                    firstKeys.every(k => keys.includes(k));
            });

            if (allSameKeys && firstKeys.length > 0) {
                // Tabular format: array[n]{key1,key2,...}:
                const lines: string[] = [];
                lines.push(`[${obj.length}]{${firstKeys.join(",")}}:`);

                for (const item of obj) {
                    const values = firstKeys.map(key => {
                        const val = (item as Record<string, unknown>)[key];
                        if (typeof val === "object" && val !== null) {
                            // Nested object in array - can't use tabular
                            return null;
                        }
                        return jsonToToon(val, 0);
                    });

                    if (values.includes(null)) {
                        // Fall back to list format for complex nested objects
                        return formatAsListArray(obj, indent);
                    }

                    lines.push(`${indentStr}  ${values.join(",")}`);
                }

                return lines.join("\n");
            }
        }

        // List format for mixed arrays
        return formatAsListArray(obj, indent);
    }

    if (typeof obj === "object") {
        const entries = Object.entries(obj as Record<string, unknown>);
        if (entries.length === 0) return "{}";

        const lines: string[] = [];

        for (const [key, value] of entries) {
            const safeKey = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key) ? key : `"${key}"`;

            if (value === null || value === undefined) {
                lines.push(`${indentStr}${safeKey}: ${value === null ? "null" : "undefined"}`);
            } else if (typeof value === "object") {
                if (Array.isArray(value)) {
                    if (value.length === 0) {
                        lines.push(`${indentStr}${safeKey}: []`);
                    } else {
                        const arrayToon = jsonToToon(value, indent + 1);
                        if (arrayToon.startsWith("[")) {
                            // Tabular format
                            lines.push(`${indentStr}${safeKey}${arrayToon}`);
                        } else {
                            // List format
                            lines.push(`${indentStr}${safeKey}:`);
                            lines.push(arrayToon);
                        }
                    }
                } else {
                    const nestedToon = jsonToToon(value, indent + 1);
                    lines.push(`${indentStr}${safeKey}:`);
                    lines.push(nestedToon);
                }
            } else {
                lines.push(`${indentStr}${safeKey}: ${jsonToToon(value, 0)}`);
            }
        }

        return lines.join("\n");
    }

    return String(obj);
}

function formatAsListArray(arr: unknown[], indent: number): string {
    const indentStr = "  ".repeat(indent + 1);
    const lines: string[] = [];

    for (const item of arr) {
        if (typeof item === "object" && item !== null && !Array.isArray(item)) {
            const entries = Object.entries(item as Record<string, unknown>);
            if (entries.length > 0) {
                const [firstKey, firstVal] = entries[0];
                const firstLine = `${indentStr}- ${firstKey}: ${jsonToToon(firstVal, 0)}`;
                lines.push(firstLine);

                for (let i = 1; i < entries.length; i++) {
                    const [key, val] = entries[i];
                    if (typeof val === "object" && val !== null) {
                        lines.push(`${indentStr}  ${key}:`);
                        lines.push(jsonToToon(val, indent + 2));
                    } else {
                        lines.push(`${indentStr}  ${key}: ${jsonToToon(val, 0)}`);
                    }
                }
            }
        } else {
            lines.push(`${indentStr}- ${jsonToToon(item, indent + 1)}`);
        }
    }

    return lines.join("\n");
}

// Token estimation (rough approximation)
function estimateTokens(text: string): number {
    // Rough estimate: ~4 chars per token for English text
    // JSON has more punctuation so ~3 chars per token
    return Math.ceil(text.length / 3.5);
}

export const JsonToToonConverter = () => {
    const [jsonInput, setJsonInput] = useState<string>("");
    const [toonOutput, setToonOutput] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [jsonTokens, setJsonTokens] = useState(0);
    const [toonTokens, setToonTokens] = useState(0);

    const convertToToon = useCallback(() => {
        if (!jsonInput.trim()) {
            setToonOutput("");
            setError(null);
            setJsonTokens(0);
            setToonTokens(0);
            return;
        }

        try {
            const parsed = JSON.parse(jsonInput);
            const toon = jsonToToon(parsed, 0);
            setToonOutput(toon);
            setError(null);

            // Calculate token estimates
            setJsonTokens(estimateTokens(jsonInput));
            setToonTokens(estimateTokens(toon));
        } catch (err) {
            if (err instanceof Error) {
                setError(`Invalid JSON: ${err.message}`);
            } else {
                setError("Invalid JSON format");
            }
            setToonOutput("");
            setJsonTokens(0);
            setToonTokens(0);
        }
    }, [jsonInput]);

    // Auto-convert on input change (debounced)
    useEffect(() => {
        const timer = setTimeout(convertToToon, 150);
        return () => clearTimeout(timer);
    }, [jsonInput, convertToToon]);

    const copyToClipboard = async () => {
        if (!toonOutput) return;
        await navigator.clipboard.writeText(toonOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const loadExample = () => {
        setJsonInput(JSON.stringify({
            users: [
                { id: 1, name: "Alice", email: "alice@example.com", role: "admin" },
                { id: 2, name: "Bob", email: "bob@example.com", role: "user" },
                { id: 3, name: "Charlie", email: "charlie@example.com", role: "user" }
            ]
        }, null, 2));
    };

    const tokenSavings = jsonTokens > 0 ? Math.round((1 - toonTokens / jsonTokens) * 100) : 0;

    return (
        <div className="w-full max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <Breadcrumb
                    items={[
                        { label: "Developer Tools", href: "/convert" },
                        { label: "JSON to TOON" }
                    ]}
                />
                <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-3">
                    JSON to TOON Converter
                </h1>
                <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto font-normal">
                    Convert JSON to Token-Oriented Object Notation (TOON) for up to 60% fewer LLM tokens
                </h2>
            </div>

            {/* Token Savings Banner */}
            {tokenSavings > 0 && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center justify-center gap-4">
                    <Zap className="w-5 h-5 text-green-500" />
                    <div className="text-center">
                        <span className="text-green-600 font-bold text-lg">
                            {tokenSavings}% Token Savings
                        </span>
                        <span className="text-[hsl(var(--muted-foreground))] text-sm ml-3">
                            (~{jsonTokens} → ~{toonTokens} tokens)
                        </span>
                    </div>
                </div>
            )}

            {/* Split Panel */}
            <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
                {/* JSON Input Panel */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <FileJson className="w-5 h-5 text-[hsl(var(--primary))]" />
                            <span className="font-semibold text-[hsl(var(--foreground))]">JSON Input</span>
                        </div>
                        <button
                            onClick={loadExample}
                            className="text-xs px-3 py-1.5 rounded-lg bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted))]/80 text-[hsl(var(--muted-foreground))] transition-colors"
                        >
                            Load Example
                        </button>
                    </div>
                    <div className="flex-1 min-h-[400px]">
                        <textarea
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                            placeholder='{\n  "users": [\n    { "id": 1, "name": "Alice" }\n  ]\n}'
                            className="w-full h-full min-h-[400px] p-4 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))]/20 outline-none resize-none font-mono text-sm transition-all"
                            spellCheck={false}
                        />
                    </div>
                    {error && (
                        <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <span className="text-red-600 text-sm">{error}</span>
                        </div>
                    )}
                </div>


                {/* TOON Output Panel */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Code2 className="w-5 h-5 text-green-500" />
                            <span className="font-semibold text-[hsl(var(--foreground))]">TOON Output</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600">Token Efficient</span>
                        </div>
                        <button
                            onClick={copyToClipboard}
                            disabled={!toonOutput}
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[hsl(var(--primary))] text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3.5 h-3.5" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5" />
                                    Copy
                                </>
                            )}
                        </button>
                    </div>
                    <div className="flex-1 min-h-[400px]">
                        <pre className="w-full h-full min-h-[400px] p-4 rounded-2xl bg-[hsl(var(--card))] border border-green-500/30 overflow-auto font-mono text-sm whitespace-pre-wrap break-all">
                            {toonOutput || (
                                <span className="text-[hsl(var(--muted-foreground))] italic">
                                    TOON output will appear here...
                                </span>
                            )}
                        </pre>
                    </div>
                </div>
            </div>

            {/* Comparison Table */}
            {jsonTokens > 0 && (
                <div className="mt-8 p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                    <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4 text-center">Token Comparison</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-4 rounded-xl bg-[hsl(var(--muted))]/50">
                            <div className="text-2xl font-bold text-[hsl(var(--foreground))]">~{jsonTokens}</div>
                            <div className="text-sm text-[hsl(var(--muted-foreground))]">JSON Tokens</div>
                        </div>
                        <div className="p-4 rounded-xl bg-green-500/10">
                            <div className="text-2xl font-bold text-green-600">~{toonTokens}</div>
                            <div className="text-sm text-green-600">TOON Tokens</div>
                        </div>
                        <div className="p-4 rounded-xl bg-[hsl(var(--primary))]/10">
                            <div className="text-2xl font-bold text-[hsl(var(--primary))]">{tokenSavings}%</div>
                            <div className="text-sm text-[hsl(var(--primary))]">Saved</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
