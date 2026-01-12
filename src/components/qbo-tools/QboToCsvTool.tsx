"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { FileUp, X, Download, Loader2, FileSpreadsheet, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";

interface QboFile {
    id: string;
    file: File;
    name: string;
    size: string;
}

export function QboToCsvTool() {
    const [files, setFiles] = useState<QboFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileListRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to file list when files are added
    const prevFileCount = useRef(0);
    useEffect(() => {
        if (files.length > prevFileCount.current) {
            // New files were added
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
        const qboFiles = Array.from(fileList).filter(f =>
            f.name.toLowerCase().endsWith(".qbo") ||
            f.name.toLowerCase().endsWith(".ofx") ||
            f.type === "application/vnd.intu.qbo" ||
            f.type === "text/xml"
        );

        if (qboFiles.length === 0) {
            setError("Please select .qbo or .ofx files only.");
            return;
        }

        const newFiles = qboFiles.map(file => ({
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

    const parseQBO = async (file: File): Promise<string> => {
        const text = await file.text();

        // Basic regex parsing for QBO/OFX SGML format
        // This is robust enough for standard QBO files
        const transactions: any[] = [];

        // Find all STMTTRN blocks
        const trnRegex = /<STMTTRN>([\s\S]*?)<\/STMTTRN>/g;
        let match;

        while ((match = trnRegex.exec(text)) !== null) {
            const block = match[1];

            const getDate = (tag: string) => {
                const m = block.match(new RegExp(`<${tag}>\\s*([^<\r\n]+)`));
                if (!m) return "";
                // Format YYYYMMDDHHMMSS... to YYYY-MM-DD
                const d = m[1].trim();
                if (d.length >= 8) {
                    return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
                }
                return d;
            };

            const getValue = (tag: string) => {
                const m = block.match(new RegExp(`<${tag}>\\s*([^<\r\n]+)`));
                return m ? m[1].trim() : "";
            };

            transactions.push({
                Date: getDate("DTPOSTED"),
                Amount: getValue("TRNAMT"),
                Name: getValue("NAME"),
                Memo: getValue("MEMO"),
                Type: getValue("TRNTYPE"),
                CheckNum: getValue("CHECKNUM"),
                RefNum: getValue("REFNUM") || getValue("FITID"),
            });
        }

        if (transactions.length === 0) {
            throw new Error(`No transactions found in ${file.name}`);
        }

        // Convert to CSV
        const headers = ["Date", "Amount", "Name", "Memo", "Type", "CheckNum", "RefNum"];
        const csvRows = [headers.join(",")];

        for (const t of transactions) {
            const row = headers.map(h => {
                const val = t[h] || "";
                // Escape quotes and wrap in quotes if contains comma
                if (val.includes(",") || val.includes('"')) {
                    return `"${val.replace(/"/g, '""')}"`;
                }
                return val;
            });
            csvRows.push(row.join(","));
        }

        return csvRows.join("\n");
    };

    const convertFiles = async () => {
        if (files.length === 0) return;

        setIsProcessing(true);
        setError(null);

        try {
            // Process each file
            for (const qboFile of files) {
                try {
                    const csvContent = await parseQBO(qboFile.file);

                    // Create download
                    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `${qboFile.name.replace(/\.[^/.]+$/, "")}.csv`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);

                } catch (err) {
                    console.error(err);
                    setError(`Failed to process ${qboFile.name}. It might not be a valid QBO file.`);
                }
            }
        } catch (err) {
            setError("An error occurred during conversion.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                    QBO to CSV Converter
                </h1>
                <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto font-normal">
                    Convert <strong>.qbo to csv</strong> online. Extract transactions from QuickBooks files to Excel. 100% free and private.
                </h2>
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
            >
                {/* Dot Pattern Background */}
                <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.3) 1px, transparent 0)`,
                        backgroundSize: '24px 24px',
                    }}
                />

                <input
                    type="file"
                    accept=".qbo,.ofx,application/vnd.intu.qbo,text/xml"
                    multiple
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />

                <div className="relative z-10 space-y-4">
                    <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/5 flex items-center justify-center shadow-lg">
                        <FileUp className="w-10 h-10 text-[hsl(var(--primary))]" />
                    </div>
                    <div>
                        <p className="text-xl font-semibold text-[hsl(var(--foreground))]">
                            Drop your QBO files here
                        </p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                            or click to browse
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.QBO</span>
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.OFX</span>
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Client-side only</span>
                    </div>
                </div>
            </div>

            {/* Privacy Badge */}
            <PrivacyBadge />

            {/* Error Message */}
            {error && (
                <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                    {error}
                </div>
            )}

            {/* File List */}
            {files.length > 0 && (
                <div className="mt-6" ref={fileListRef}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-[hsl(var(--foreground))]">
                            {files.length} file{files.length > 1 ? "s" : ""} selected
                        </h2>
                        <Button variant="ghost" size="sm" onClick={clearAll} className="text-[hsl(var(--muted-foreground))]">
                            <Trash2 className="w-4 h-4 mr-1" /> Clear All
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {files.map((file, index) => (
                            <div
                                key={file.id}
                                className="flex items-center gap-3 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]"
                            >
                                <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10">
                                    <FileSpreadsheet className="w-5 h-5 text-[hsl(var(--primary))]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-[hsl(var(--foreground))] truncate">{file.name}</p>
                                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                                        {file.size}
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeFile(file.id)}
                                    className="p-1.5 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                                >
                                    <X className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Add More Button */}
                    <label className="mt-4 flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-[hsl(var(--border))] cursor-pointer hover:border-[hsl(var(--primary))]/50 transition-colors">
                        <input
                            type="file"
                            accept=".qbo,.ofx"
                            multiple
                            onChange={handleFileInput}
                            className="hidden"
                        />
                        <Plus className="w-5 h-5 text-[hsl(var(--primary))]" />
                        <span className="text-[hsl(var(--primary))] font-medium">Add more files</span>
                    </label>

                    {/* Convert Button */}
                    <Button
                        onClick={convertFiles}
                        disabled={isProcessing}
                        className="w-full mt-6 h-14 text-lg bg-gradient-primary shadow-glow hover:opacity-90"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Converting...
                            </>
                        ) : (
                            <>
                                <Download className="w-5 h-5 mr-2" />
                                Convert to CSV & Download
                            </>
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
}
