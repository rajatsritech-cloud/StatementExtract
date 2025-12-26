"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { FileUp, X, Download, Loader2, FileSpreadsheet, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";

interface QifFile {
    id: string;
    file: File;
    name: string;
    size: string;
}

interface Transaction {
    date: string;
    amount: string;
    payee: string;
    memo: string;
    category: string;
    checkNum: string;
    cleared: string;
}

export function QifToCsvTool() {
    const [files, setFiles] = useState<QifFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const fileListRef = useRef<HTMLDivElement>(null);

    const prevFileCount = useRef(0);
    useEffect(() => {
        if (files.length > prevFileCount.current) {
            setTimeout(() => {
                fileListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
        prevFileCount.current = files.length;
    }, [files.length]);

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    const handleFiles = useCallback((fileList: FileList | File[]) => {
        setError(null);
        const validFiles = Array.from(fileList).filter(f =>
            f.name.toLowerCase().endsWith(".qif")
        );

        if (validFiles.length === 0) {
            setError("Please select .qif files only.");
            return;
        }

        const newFiles = validFiles.map(file => ({
            id: crypto.randomUUID(),
            file,
            name: file.name,
            size: formatFileSize(file.size),
        }));

        setFiles(prev => [...prev, ...newFiles]);
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
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const clearAll = () => {
        setFiles([]);
        setError(null);
    };

    const parseQifDate = (dateStr: string): string => {
        // QIF dates can be in various formats: M/D/YY, M/D'YY, MM/DD/YYYY, etc.
        try {
            // Handle M/D'YY format (Quicken shorthand)
            let normalized = dateStr.replace("'", "/");

            const parts = normalized.split("/");
            if (parts.length >= 3) {
                let month = parts[0].padStart(2, "0");
                let day = parts[1].padStart(2, "0");
                let year = parts[2];

                // Handle 2-digit years
                if (year.length === 2) {
                    const yearNum = parseInt(year);
                    year = yearNum > 50 ? "19" + year : "20" + year;
                }

                return `${year}-${month}-${day}`;
            }
        } catch {
            // Return original if parsing fails
        }
        return dateStr;
    };

    const parseQifToCsv = async (file: File): Promise<string> => {
        const text = await file.text();
        const lines = text.split(/\r?\n/);
        const transactions: Transaction[] = [];
        let currentTrn: Transaction = { date: "", amount: "", payee: "", memo: "", category: "", checkNum: "", cleared: "" };

        for (const line of lines) {
            if (!line.trim()) continue;

            const code = line[0];
            const value = line.slice(1).trim();

            switch (code) {
                case "D": // Date
                    currentTrn.date = parseQifDate(value);
                    break;
                case "T": // Amount
                case "U": // Amount (alternate)
                    currentTrn.amount = value.replace(/,/g, "");
                    break;
                case "P": // Payee
                    currentTrn.payee = value;
                    break;
                case "M": // Memo
                    currentTrn.memo = value;
                    break;
                case "L": // Category
                    currentTrn.category = value;
                    break;
                case "N": // Check number
                    currentTrn.checkNum = value;
                    break;
                case "C": // Cleared status
                    currentTrn.cleared = value;
                    break;
                case "^": // End of transaction
                    if (currentTrn.date || currentTrn.amount) {
                        transactions.push({ ...currentTrn });
                    }
                    currentTrn = { date: "", amount: "", payee: "", memo: "", category: "", checkNum: "", cleared: "" };
                    break;
            }
        }

        // Don't forget last transaction if file doesn't end with ^
        if (currentTrn.date || currentTrn.amount) {
            transactions.push({ ...currentTrn });
        }

        if (transactions.length === 0) {
            throw new Error(`No transactions found in ${file.name}`);
        }

        const headers = ["Date", "Amount", "Payee", "Memo", "Category", "Check Number", "Cleared"];
        const csvRows = [headers.join(",")];

        for (const t of transactions) {
            const row = [t.date, t.amount, t.payee, t.memo, t.category, t.checkNum, t.cleared]
                .map(val => {
                    if (val.includes(",") || val.includes('"') || val.includes('\n')) {
                        return `"${val.replace(/"/g, '""')}"`;
                    }
                    return val;
                });
            csvRows.push(row.join(","));
        }

        return csvRows.join("\n");
    };

    const downloadCsv = (csv: string, originalFileName: string) => {
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = originalFileName.replace(/\.qif$/i, "") + ".csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const convertAll = async () => {
        setIsProcessing(true);
        setError(null);

        try {
            for (const qifFile of files) {
                const csv = await parseQifToCsv(qifFile.file);
                downloadCsv(csv, qifFile.name);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Conversion failed");
        } finally {
            setIsProcessing(false);
        }
    };

    const convertSingle = async (qifFile: QifFile) => {
        setIsProcessing(true);
        setError(null);

        try {
            const csv = await parseQifToCsv(qifFile.file);
            downloadCsv(csv, qifFile.name);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Conversion failed");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-3">
                    QIF to CSV Converter Online
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                    Convert Quicken QIF files to Excel-ready CSV spreadsheets. Works with all Quicken versions.
                    100% private - files never leave your device.
                </p>
            </div>

            <div className="flex justify-center mb-6">
                <PrivacyBadge />
            </div>

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
                    accept=".qif"
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
                            Drop your QIF files here
                        </p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                            or click to browse
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.QIF</span>
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Quicken</span>
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Client-side only</span>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-center">
                    {error}
                </div>
            )}

            {files.length > 0 && (
                <div ref={fileListRef} className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                            Files to Convert ({files.length})
                        </h3>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={clearAll}>
                                <Trash2 className="w-4 h-4 mr-1" />
                                Clear All
                            </Button>
                            <Button
                                size="sm"
                                onClick={convertAll}
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Converting...
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-4 h-4 mr-2" />
                                        Convert All to CSV
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {files.map(file => (
                            <div
                                key={file.id}
                                className="flex items-center justify-between p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]"
                            >
                                <div className="flex items-center gap-3">
                                    <FileSpreadsheet className="w-8 h-8 text-[hsl(var(--primary))]" />
                                    <div>
                                        <p className="font-medium text-[hsl(var(--foreground))]">{file.name}</p>
                                        <p className="text-xs text-[hsl(var(--muted-foreground))]">{file.size}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => convertSingle(file)}
                                        disabled={isProcessing}
                                    >
                                        <Download className="w-4 h-4 mr-1" />
                                        CSV
                                    </Button>
                                    <button
                                        onClick={() => removeFile(file.id)}
                                        className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-red-500 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[hsl(var(--border))] rounded-xl text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary))]/50 hover:text-[hsl(var(--foreground))] transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add More Files
                    </button>
                </div>
            )}
        </div>
    );
}
