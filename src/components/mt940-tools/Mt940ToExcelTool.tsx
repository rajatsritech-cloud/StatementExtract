"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { FileUp, X, Download, Loader2, FileSpreadsheet, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";

interface Mt940File {
    id: string;
    file: File;
    name: string;
    size: string;
}

interface Transaction {
    date: string;
    amount: string;
    currency: string;
    description: string;
    reference: string;
    type: string;
}

export function Mt940ToExcelTool() {
    const [files, setFiles] = useState<Mt940File[]>([]);
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
            f.name.toLowerCase().endsWith(".sta") ||
            f.name.toLowerCase().endsWith(".mt940") ||
            f.name.toLowerCase().endsWith(".940") ||
            f.name.toLowerCase().endsWith(".txt")
        );

        if (validFiles.length === 0) {
            setError("Please select MT940 files (.sta, .mt940, .940, or .txt).");
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

    const parseMt940ToTransactions = (content: string): Transaction[] => {
        const transactions: Transaction[] = [];
        const lines = content.split('\n');
        let currentTransaction: Partial<Transaction> = {};
        let inTransaction = false;
        let currency = 'EUR';

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Currency from :60F: or :60M: opening balance
            if (line.startsWith(':60F:') || line.startsWith(':60M:')) {
                const match = line.match(/:60[FM]:([CD])(\d{6})([A-Z]{3})/);
                if (match) {
                    currency = match[3];
                }
            }

            // Transaction line :61:
            if (line.startsWith(':61:')) {
                if (inTransaction && currentTransaction.date) {
                    transactions.push(currentTransaction as Transaction);
                }
                inTransaction = true;
                currentTransaction = { currency };

                // Parse :61: line - format: YYMMDDYYMMDDCDAMOUNT...
                const pattern = /^:61:(\d{6})(\d{4})?([CD]R?)([A-Z]?)([0-9,\.]+)([A-Z]{4})?(.*)$/;
                const match = line.match(pattern);
                if (match) {
                    const dateStr = match[1];
                    const year = parseInt(dateStr.slice(0, 2));
                    const fullYear = year > 50 ? 1900 + year : 2000 + year;
                    currentTransaction.date = `${fullYear}-${dateStr.slice(2, 4)}-${dateStr.slice(4, 6)}`;

                    const direction = match[3].startsWith('D') ? -1 : 1;
                    const amountStr = match[5].replace(',', '.');
                    const amount = parseFloat(amountStr) * direction;
                    currentTransaction.amount = amount.toFixed(2);
                    currentTransaction.type = match[6] || 'NTRF';
                    currentTransaction.reference = match[7]?.trim() || '';
                }
            }

            // Description line :86:
            if (line.startsWith(':86:') && inTransaction) {
                currentTransaction.description = line.substring(4).trim();
                // Continue reading multiline descriptions
                let j = i + 1;
                while (j < lines.length && !lines[j].trim().startsWith(':')) {
                    currentTransaction.description += ' ' + lines[j].trim();
                    j++;
                }
            }
        }

        // Don't forget the last transaction
        if (inTransaction && currentTransaction.date) {
            transactions.push(currentTransaction as Transaction);
        }

        return transactions;
    };

    const convertToExcel = async (file: File): Promise<string> => {
        const content = await file.text();
        const transactions = parseMt940ToTransactions(content);

        if (transactions.length === 0) {
            throw new Error(`No transactions found in ${file.name}. Make sure this is a valid MT940 file.`);
        }

        const headers = ["Date", "Amount", "Currency", "Type", "Reference", "Description"];
        const rows = [headers.join("\t")];

        for (const t of transactions) {
            const row = [
                t.date || "",
                t.amount || "",
                t.currency || "",
                t.type || "",
                t.reference || "",
                (t.description || "").replace(/\t/g, " ").replace(/"/g, '""')
            ];
            rows.push(row.join("\t"));
        }

        return rows.join("\n");
    };

    const downloadExcel = (content: string, originalFileName: string) => {
        const bom = '\uFEFF';
        const blob = new Blob([bom + content], { type: "application/vnd.ms-excel;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = originalFileName.replace(/\.(sta|mt940|940|txt)$/i, "") + ".xls";
        a.click();
        URL.revokeObjectURL(url);
    };

    const convertAll = async () => {
        setIsProcessing(true);
        setError(null);

        try {
            for (const mt940File of files) {
                const content = await convertToExcel(mt940File.file);
                downloadExcel(content, mt940File.name);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Conversion failed");
        } finally {
            setIsProcessing(false);
        }
    };

    const convertSingle = async (mt940File: Mt940File) => {
        setIsProcessing(true);
        setError(null);

        try {
            const content = await convertToExcel(mt940File.file);
            downloadExcel(content, mt940File.name);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Conversion failed");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
                <Breadcrumb
                    items={[
                        { label: "All Converters", href: "/convert" },
                        { label: "MT940 to Excel" }
                    ]}
                />
                <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-3">
                    MT940 to Excel Converter Online
                </h1>
                <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto font-normal">
                    Convert SWIFT MT940 bank statement files to Excel spreadsheets. Perfect for SAP, Oracle, and Sage users.
                    Private & Secure - files never leave your device.
                </h2>
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
                    accept=".sta,.mt940,.940,.txt"
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
                            Drop your MT940 files here
                        </p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                            or click to browse
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.STA</span>
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.MT940</span>
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.940</span>
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.TXT</span>
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
                                        Convert All to Excel
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
                                    <FileSpreadsheet className="w-8 h-8 text-green-600" />
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
                                        Excel
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
