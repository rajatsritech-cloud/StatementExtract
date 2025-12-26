"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { FileUp, X, FileSpreadsheet, Plus, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";

interface Transaction {
    date: string;
    amount: string;
    name: string;
    memo: string;
    type: string;
    checkNum: string;
    refNum: string;
}

interface AccountInfo {
    bankId: string;
    acctId: string;
    acctType: string;
    balanceAmount: string;
    balanceDate: string;
}

interface ParsedFile {
    id: string;
    fileName: string;
    transactions: Transaction[];
    accountInfo: AccountInfo;
}

export function QboViewerTool() {
    const [parsedFiles, setParsedFiles] = useState<ParsedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to results when files are parsed
    useEffect(() => {
        if (parsedFiles.length > 0 && resultsRef.current) {
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [parsedFiles.length]);

    const parseQboFile = async (file: File): Promise<ParsedFile> => {
        const text = await file.text();
        const transactions: Transaction[] = [];

        // Parse account info
        const getValue = (content: string, tag: string): string => {
            const regex = new RegExp(`<${tag}>\\s*([^<\\r\\n]+)`);
            const match = content.match(regex);
            return match ? match[1].trim() : "";
        };

        const getDate = (content: string, tag: string): string => {
            const val = getValue(content, tag);
            if (val.length >= 8) {
                return `${val.slice(0, 4)}-${val.slice(4, 6)}-${val.slice(6, 8)}`;
            }
            return val;
        };

        const accountInfo: AccountInfo = {
            bankId: getValue(text, "BANKID"),
            acctId: getValue(text, "ACCTID"),
            acctType: getValue(text, "ACCTTYPE") || "CHECKING",
            balanceAmount: getValue(text, "BALAMT"),
            balanceDate: getDate(text, "DTASOF"),
        };

        // Parse transactions
        const trnRegex = /<STMTTRN>([\s\S]*?)<\/STMTTRN>/g;
        let match;

        while ((match = trnRegex.exec(text)) !== null) {
            const block = match[1];
            transactions.push({
                date: getDate(block, "DTPOSTED"),
                amount: getValue(block, "TRNAMT"),
                name: getValue(block, "NAME"),
                memo: getValue(block, "MEMO"),
                type: getValue(block, "TRNTYPE"),
                checkNum: getValue(block, "CHECKNUM"),
                refNum: getValue(block, "REFNUM") || getValue(block, "FITID"),
            });
        }

        if (transactions.length === 0) {
            throw new Error(`No transactions found in ${file.name}`);
        }

        return {
            id: crypto.randomUUID(),
            fileName: file.name,
            transactions,
            accountInfo,
        };
    };

    const handleFiles = useCallback(async (fileList: FileList | File[]) => {
        setError(null);
        const validFiles = Array.from(fileList).filter(f =>
            f.name.toLowerCase().endsWith(".qbo") ||
            f.name.toLowerCase().endsWith(".ofx") ||
            f.name.toLowerCase().endsWith(".qfx")
        );

        if (validFiles.length === 0) {
            setError("Please select .qbo, .ofx, or .qfx files only.");
            return;
        }

        try {
            const results = await Promise.all(validFiles.map(parseQboFile));
            setParsedFiles(prev => [...prev, ...results]);
            if (results.length > 0) {
                setSelectedFileId(results[0].id);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to parse file");
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    }, [handleFiles]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    }, [handleFiles]);

    const removeFile = (id: string) => {
        setParsedFiles(prev => {
            const updated = prev.filter(f => f.id !== id);
            if (selectedFileId === id && updated.length > 0) {
                setSelectedFileId(updated[0].id);
            } else if (updated.length === 0) {
                setSelectedFileId(null);
            }
            return updated;
        });
    };

    const selectedFile = parsedFiles.find(f => f.id === selectedFileId);

    const formatAmount = (amount: string): string => {
        const num = parseFloat(amount);
        return isNaN(num) ? amount : num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const getTotalCredits = (transactions: Transaction[]): number => {
        return transactions
            .filter(t => parseFloat(t.amount) > 0)
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    };

    const getTotalDebits = (transactions: Transaction[]): number => {
        return Math.abs(transactions
            .filter(t => parseFloat(t.amount) < 0)
            .reduce((sum, t) => sum + parseFloat(t.amount), 0));
    };

    const exportToCsv = (file: ParsedFile) => {
        const headers = ["Date", "Amount", "Name", "Memo", "Type", "CheckNum", "RefNum"];
        const rows = [headers.join(",")];

        for (const t of file.transactions) {
            const row = [t.date, t.amount, t.name, t.memo, t.type, t.checkNum, t.refNum]
                .map(val => val.includes(",") || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val);
            rows.push(row.join(","));
        }

        const blob = new Blob([rows.join("\n")], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.fileName.replace(/\.(qbo|ofx|qfx)$/i, "") + ".csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-3">
                    QBO File Viewer Online
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                    Open and view QuickBooks Web Connect (.qbo), OFX, and QFX files in your browser.
                    See transactions instantly. 100% private - files never leave your device.
                </p>
            </div>

            {/* Privacy Badge */}
            <div className="flex justify-center mb-6">
                <PrivacyBadge />
            </div>

            {/* Drop Zone */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all duration-200 overflow-hidden ${isDragging
                    ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5"
                    : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--muted))]/30"
                    }`}
                onClick={() => fileInputRef.current?.click()}
            >
                <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.3) 1px, transparent 0)`,
                        backgroundSize: '24px 24px',
                    }}
                />
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".qbo,.ofx,.qfx"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                />
                <div className="relative z-10 space-y-4">
                    <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/5 flex items-center justify-center shadow-lg">
                        <FileUp className="w-10 h-10 text-[hsl(var(--primary))]" />
                    </div>
                    <div>
                        <p className="text-xl font-semibold text-[hsl(var(--foreground))]">
                            Drop your QBO, OFX, or QFX files here
                        </p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                            or click to browse
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.QBO</span>
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.OFX</span>
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.QFX</span>
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Client-side only</span>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-center">
                    {error}
                </div>
            )}

            {/* Results Section */}
            {parsedFiles.length > 0 && (
                <div ref={resultsRef} className="mt-8 space-y-6">
                    {/* File Tabs */}
                    <div className="flex flex-wrap gap-2 items-center">
                        <Eye className="w-5 h-5 text-[hsl(var(--primary))]" />
                        <span className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Files:</span>
                        {parsedFiles.map(file => (
                            <button
                                key={file.id}
                                onClick={() => setSelectedFileId(file.id)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedFileId === file.id
                                    ? "bg-[hsl(var(--primary))] text-white"
                                    : "bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]/80"
                                    }`}
                            >
                                <FileSpreadsheet className="w-4 h-4" />
                                {file.fileName}
                                <X
                                    className="w-3.5 h-3.5 hover:text-red-400"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile(file.id);
                                    }}
                                />
                            </button>
                        ))}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/80"
                        >
                            <Plus className="w-4 h-4" />
                            Add File
                        </button>
                    </div>

                    {/* Selected File Details */}
                    {selectedFile && (
                        <div className="space-y-6">
                            {/* Account Summary */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                    <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Transactions</p>
                                    <p className="text-2xl font-bold text-[hsl(var(--foreground))]">
                                        {selectedFile.transactions.length}
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                    <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Total Credits</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {formatAmount(getTotalCredits(selectedFile.transactions).toFixed(2))}
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                    <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Total Debits</p>
                                    <p className="text-2xl font-bold text-red-600">
                                        {formatAmount(getTotalDebits(selectedFile.transactions).toFixed(2))}
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                    <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Account</p>
                                    <p className="text-lg font-semibold text-[hsl(var(--foreground))] truncate">
                                        {selectedFile.accountInfo.acctId || "N/A"}
                                    </p>
                                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                                        {selectedFile.accountInfo.acctType}
                                    </p>
                                </div>
                            </div>

                            {/* Export Button */}
                            <div className="flex justify-end">
                                <Button
                                    onClick={() => exportToCsv(selectedFile)}
                                    className="flex items-center gap-2"
                                >
                                    <Download className="w-4 h-4" />
                                    Export to CSV
                                </Button>
                            </div>

                            {/* Transactions Table */}
                            <div className="rounded-xl border border-[hsl(var(--border))] overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-[hsl(var(--muted))]">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-semibold text-[hsl(var(--foreground))]">Date</th>
                                                <th className="px-4 py-3 text-left font-semibold text-[hsl(var(--foreground))]">Description</th>
                                                <th className="px-4 py-3 text-right font-semibold text-[hsl(var(--foreground))]">Amount</th>
                                                <th className="px-4 py-3 text-left font-semibold text-[hsl(var(--foreground))]">Type</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-[hsl(var(--card))]">
                                            {selectedFile.transactions.map((t, i) => (
                                                <tr key={i} className="border-t border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/30">
                                                    <td className="px-4 py-3 text-[hsl(var(--foreground))] whitespace-nowrap">{t.date}</td>
                                                    <td className="px-4 py-3 text-[hsl(var(--foreground))]">
                                                        <div className="font-medium">{t.name || "—"}</div>
                                                        {t.memo && <div className="text-xs text-[hsl(var(--muted-foreground))]">{t.memo}</div>}
                                                    </td>
                                                    <td className={`px-4 py-3 text-right font-medium whitespace-nowrap ${parseFloat(t.amount) >= 0 ? "text-green-600" : "text-red-600"
                                                        }`}>
                                                        {formatAmount(t.amount)}
                                                    </td>
                                                    <td className="px-4 py-3 text-[hsl(var(--muted-foreground))]">{t.type}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
