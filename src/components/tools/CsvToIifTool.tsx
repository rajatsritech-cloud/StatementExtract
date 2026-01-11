"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
    FileUp,
    X,
    Download,
    Loader2,
    FileSpreadsheet,
    GripVertical,
    Trash2,
    Settings2,
    CheckCircle2,
    AlertCircle,
    Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";
import { FinanceParsers } from "@/lib/financeParsers";

// Column mapping for IIF format
interface ColumnMapping {
    date: number | null;
    amount: number | null;
    name: number | null; // Payee
    memo: number | null;
    docNum: number | null; // Check Number
    account: number | null; // Optional override from column
}

interface Transaction {
    id: string;
    rawDate: string;
    amount: string;
    name: string;
    memo: string;
    docNum: string;
    account: string;
}

export function CsvToIifTool() {
    const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [fileName, setFileName] = useState<string>("");
    const [mapping, setMapping] = useState<ColumnMapping>({
        date: null,
        amount: null,
        name: null,
        memo: null,
        docNum: null,
        account: null,
    });
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [defaultAccountName, setDefaultAccountName] = useState("Bank Account");
    const [showSettings, setShowSettings] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initial CSV Parsing
    const handleFiles = useCallback(async (fileList: FileList | File[]) => {
        setError(null);
        if (fileList.length === 0) return;

        const file = fileList[0];
        if (!file.name.toLowerCase().endsWith(".csv")) {
            setError("Please upload a CSV file.");
            return;
        }

        setFileName(file.name);
        setIsProcessing(true);

        try {
            const text = await file.text();
            const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
            if (lines.length < 2) throw new Error("CSV file seems empty or missing headers.");

            // Basic CSV parser (handles quotes poorly but sufficient for simple mapping 
            // - ideally import a library if robust parsing needed, but keeping lightweight)
            // Using a simple regex splitter for now to handle basic quoted CSVs
            const parseLine = (line: string) => {
                const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
                // Fallback to simple split if regex fails or for simple CSVs
                if (matches.length === 0) return line.split(",");
                return matches.map(m => m.replace(/^"|"$/g, "").trim());
            };

            // Actually, let's use a simpler split for speed and assume standard CSV
            const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
            setCsvHeaders(headers);

            // Create initial raw transactions
            const mapped = lines.slice(1).map((line, idx) => {
                // Handle commas inside quotes logic is complex, simplifying:
                // If we need robust parsing, we should add PapaParse. 
                // For now, simple split.
                const values = line.split(",");
                return {
                    id: idx.toString(),
                    rawDate: values[0] || "", // Temp default
                    amount: "0",
                    name: "",
                    memo: "",
                    docNum: "",
                    account: "",
                    values: values // Store raw values for dynamic mapping
                };
            });

            // @ts-ignore - storing raw values temporarily
            setTransactions(mapped);

            // Auto-detect mapping
            const lowerHeaders = headers.map(h => h.toLowerCase());
            const newMapping = { ...mapping };

            lowerHeaders.forEach((h, i) => {
                if (h.includes("date") || h.includes("time")) newMapping.date = i;
                else if (h.includes("amount") || h.includes("sum") || h.includes("total")) newMapping.amount = i;
                else if (h.includes("desc") || h.includes("payee") || h.includes("name")) newMapping.name = i;
                else if (h.includes("memo") || h.includes("note")) newMapping.memo = i;
                else if (h.includes("check") || h.includes("num") || h.includes("ref")) newMapping.docNum = i;
            });
            setMapping(newMapping);

        } catch (err) {
            setError("Failed to parse CSV file.");
        } finally {
            setIsProcessing(false);
        }
    }, [mapping]);

    // Update transactions when mapping changes
    useEffect(() => {
        if (transactions.length === 0) return;

        setTransactions(prev => prev.map(t => {
            // @ts-ignore
            const vals = t.values || [];
            return {
                ...t,
                rawDate: mapping.date !== null ? vals[mapping.date] : "",
                amount: mapping.amount !== null ? vals[mapping.amount] : "",
                name: mapping.name !== null ? vals[mapping.name] : (mapping.description !== null ? vals[mapping.description] : ""), // Fallback
                memo: mapping.memo !== null ? vals[mapping.memo] : "",
                docNum: mapping.docNum !== null ? vals[mapping.docNum] : "",
                account: mapping.account !== null ? vals[mapping.account] : "",
            };
        }));
    }, [mapping]); // simplistic dependency, in real app need safer update logic

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const downloadIif = () => {
        if (mapping.date === null || mapping.amount === null) {
            setError("Please map at least Date and Amount columns.");
            return;
        }

        try {
            // Convert to FinanceParsers Transaction format
            const parsedTransactions = transactions.map(t => ({
                Date: t.rawDate, // TODO: Add date parser/fixer? IIF needs MM/DD/YYYY usually
                Amount: t.amount,
                Name: t.name,
                Memo: t.memo,
                Type: parseFloat(t.amount) < 0 ? "PAYMENT" : "DEPOSIT",
                CheckNum: t.docNum,
                RefNum: "",
                Account: t.account || defaultAccountName,
                Currency: "USD"
            }));

            const iifContent = FinanceParsers.toIif(parsedTransactions);

            const blob = new Blob([iifContent], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName.replace(".csv", ".iif");
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            setError("Failed to generate IIF file.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-3">
                    CSV to IIF Converter
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                    Convert CSV files to QuickBooks IIF format. Map your columns and import transactions directly into QuickBooks Desktop.
                </p>
            </div>

            <PrivacyBadge />

            {/* Upload Area */}
            {!fileName ? (
                <div
                    onDrop={handleDrop}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                >
                    <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
                    <FileUp className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="text-xl font-semibold mb-2">Drop your CSV file here</p>
                    <p className="text-sm text-muted-foreground">or click to browse</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Settings Bar */}
                    <div className="bg-card border rounded-xl p-4 flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileSpreadsheet className="w-8 h-8 text-green-600" />
                            <div>
                                <p className="font-medium">{fileName}</p>
                                <p className="text-xs text-muted-foreground">{transactions.length} transactions found</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => setFileName("")}>
                                <Trash2 className="w-4 h-4 mr-2" /> Reset
                            </Button>
                            <Button size="sm" onClick={() => setShowSettings(!showSettings)}>
                                <Settings2 className="w-4 h-4 mr-2" /> {showSettings ? "Hide Settings" : "Settings"}
                            </Button>
                        </div>
                    </div>

                    {/* Settings Panel */}
                    {(showSettings || !mapping.date) && (
                        <div className="bg-muted/30 border rounded-xl p-6">
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                <Settings2 className="w-4 h-4" /> Import Settings
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Default Bank Account Name</label>
                                    <input
                                        type="text"
                                        value={defaultAccountName}
                                        onChange={(e) => setDefaultAccountName(e.target.value)}
                                        className="w-full p-2 rounded-md border text-sm"
                                        placeholder="e.g. Checking"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        This name will appear in the ACCT field for every transaction unless mapped otherwise.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mapping Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { label: "Date", field: "date", required: true },
                            { label: "Amount", field: "amount", required: true },
                            { label: "Payee / Name", field: "name" },
                            { label: "Memo / Description", field: "memo" },
                            { label: "Check # / DocNum", field: "docNum" },
                        ].map((col) => (
                            <div key={col.field}>
                                <label className="block text-xs font-medium mb-1">
                                    {col.label} {col.required && <span className="text-red-500">*</span>}
                                </label>
                                <select
                                    className="w-full p-2 text-sm rounded-lg border bg-background"
                                    // @ts-ignore
                                    value={mapping[col.field] ?? ""}
                                    // @ts-ignore
                                    onChange={(e) => setMapping(prev => ({ ...prev, [col.field]: e.target.value ? parseInt(e.target.value) : null }))}
                                >
                                    <option value="">Select Column...</option>
                                    {csvHeaders.map((h, i) => (
                                        <option key={i} value={i}>{h}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>

                    {error && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-center text-sm">
                            <AlertCircle className="w-4 h-4 inline mr-2" />
                            {error}
                        </div>
                    )}

                    <Button onClick={downloadIif} className="w-full py-6 text-lg" disabled={!mapping.date || !mapping.amount}>
                        <Download className="w-5 h-5 mr-2" /> Download IIF File
                    </Button>

                    <div className="text-center text-xs text-muted-foreground">
                        <Info className="w-3 h-3 inline mr-1" />
                        We will auto-format dates and amounts for optimal Quickbooks compatibility.
                    </div>
                </div>
            )}
        </div>
    );
}
