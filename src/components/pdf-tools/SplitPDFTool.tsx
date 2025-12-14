"use client";

import { useState, useCallback, useRef } from "react";
import { FileUp, Download, Loader2, FileText, Trash2, CheckCircle, AlertCircle, Scissors, FileOutput } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PDFDocument } from "pdf-lib";

interface SplitResult {
    name: string;
    pageCount: number;
    url: string;
    size: number;
}

type SplitMode = "extract" | "range" | "all";

export function SplitPDFTool() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [splitMode, setSplitMode] = useState<SplitMode>("extract");
    const [pageInput, setPageInput] = useState<string>("1");
    const [rangeStart, setRangeStart] = useState<string>("1");
    const [rangeEnd, setRangeEnd] = useState<string>("1");
    const [results, setResults] = useState<SplitResult[]>([]);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    };

    const handleFile = useCallback(async (selectedFile: File) => {
        if (!selectedFile.type.includes("pdf") && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
            setError("Please select a PDF file.");
            return;
        }

        try {
            const arrayBuffer = await selectedFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
            const pageCount = pdfDoc.getPageCount();

            setFile(selectedFile);
            setTotalPages(pageCount);
            setRangeEnd(String(pageCount));
            setResults([]);
            setError(null);
        } catch (err) {
            setError("Failed to read PDF. The file may be corrupted or password-protected.");
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) handleFile(droppedFile);
    }, [handleFile]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) handleFile(selectedFile);
    }, [handleFile]);

    const parsePageNumbers = (input: string): number[] => {
        const pages: number[] = [];
        const parts = input.split(",").map(p => p.trim());

        for (const part of parts) {
            if (part.includes("-")) {
                const [start, end] = part.split("-").map(n => parseInt(n.trim()));
                if (!isNaN(start) && !isNaN(end)) {
                    for (let i = start; i <= end; i++) {
                        if (i >= 1 && i <= totalPages && !pages.includes(i)) {
                            pages.push(i);
                        }
                    }
                }
            } else {
                const num = parseInt(part);
                if (!isNaN(num) && num >= 1 && num <= totalPages && !pages.includes(num)) {
                    pages.push(num);
                }
            }
        }

        return pages.sort((a, b) => a - b);
    };

    const splitPDF = async () => {
        if (!file) return;

        setIsProcessing(true);
        setError(null);
        setResults([]);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
            const splitResults: SplitResult[] = [];

            if (splitMode === "extract") {
                // Extract specific pages into one PDF
                const pages = parsePageNumbers(pageInput);
                if (pages.length === 0) {
                    setError("Please enter valid page numbers.");
                    setIsProcessing(false);
                    return;
                }

                const newPdf = await PDFDocument.create();
                const copiedPages = await newPdf.copyPages(pdfDoc, pages.map(p => p - 1));
                copiedPages.forEach(page => newPdf.addPage(page));

                const pdfBytes = await newPdf.save();
                const blob = new Blob([pdfBytes.buffer as BlobPart], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);

                splitResults.push({
                    name: `${file.name.replace(".pdf", "")}-pages-${pages.join("-")}.pdf`,
                    pageCount: pages.length,
                    url,
                    size: pdfBytes.length,
                });

            } else if (splitMode === "range") {
                // Extract a range of pages
                const start = parseInt(rangeStart);
                const end = parseInt(rangeEnd);

                if (isNaN(start) || isNaN(end) || start < 1 || end > totalPages || start > end) {
                    setError("Please enter a valid page range.");
                    setIsProcessing(false);
                    return;
                }

                const newPdf = await PDFDocument.create();
                const pageIndices = Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i);
                const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
                copiedPages.forEach(page => newPdf.addPage(page));

                const pdfBytes = await newPdf.save();
                const blob = new Blob([pdfBytes.buffer as BlobPart], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);

                splitResults.push({
                    name: `${file.name.replace(".pdf", "")}-pages-${start}-to-${end}.pdf`,
                    pageCount: end - start + 1,
                    url,
                    size: pdfBytes.length,
                });

            } else if (splitMode === "all") {
                // Split into individual pages
                for (let i = 0; i < totalPages; i++) {
                    const newPdf = await PDFDocument.create();
                    const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
                    newPdf.addPage(copiedPage);

                    const pdfBytes = await newPdf.save();
                    const blob = new Blob([pdfBytes.buffer as BlobPart], { type: "application/pdf" });
                    const url = URL.createObjectURL(blob);

                    splitResults.push({
                        name: `${file.name.replace(".pdf", "")}-page-${i + 1}.pdf`,
                        pageCount: 1,
                        url,
                        size: pdfBytes.length,
                    });
                }
            }

            setResults(splitResults);
        } catch (err) {
            console.error("Split error:", err);
            setError("Failed to split PDF. The file may be corrupted.");
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadFile = (result: SplitResult) => {
        const link = document.createElement("a");
        link.href = result.url;
        link.download = result.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadAll = async () => {
        for (const result of results) {
            downloadFile(result);
            await new Promise(r => setTimeout(r, 300));
        }
    };

    const reset = () => {
        setFile(null);
        setTotalPages(0);
        setResults([]);
        setError(null);
        setPageInput("1");
        setRangeStart("1");
        setRangeEnd("1");
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                    Split PDF Online Free
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
                    Extract specific pages or split PDF into multiple files. 100% free and private.
                </p>
            </div>

            {results.length === 0 ? (
                <>
                    {/* Drop Zone */}
                    {!file && (
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onClick={() => inputRef.current?.click()}
                            className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all duration-200 overflow-hidden ${isDragging
                                ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5"
                                : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--muted))]/30"
                                }`}
                        >
                            {/* Dot Pattern */}
                            <div
                                className="absolute inset-0 opacity-30 pointer-events-none"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.3) 1px, transparent 0)`,
                                    backgroundSize: '24px 24px',
                                }}
                            />
                            <div className="absolute top-4 right-4 w-16 h-16 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))]/10 to-transparent rotate-12 pointer-events-none" />
                            <div className="absolute bottom-4 left-4 w-12 h-12 rounded-lg bg-gradient-to-tr from-[hsl(var(--primary))]/10 to-transparent -rotate-12 pointer-events-none" />

                            <input
                                ref={inputRef}
                                type="file"
                                accept=".pdf,application/pdf"
                                onChange={handleFileInput}
                                className="hidden"
                            />

                            <div className="relative z-10 space-y-4">
                                <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/5 flex items-center justify-center shadow-lg">
                                    <Scissors className="w-10 h-10 text-[hsl(var(--primary))]" />
                                </div>
                                <div>
                                    <p className="text-xl font-semibold text-[hsl(var(--foreground))]">
                                        Drop your PDF file here
                                    </p>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                                        or click to browse
                                    </p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                                    <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">PDF</span>
                                    <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Extract pages</span>
                                    <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">No upload</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* File Selected - Split Options */}
                    {file && (
                        <div className="space-y-6">
                            {/* File Info */}
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <div className="p-3 rounded-lg bg-[hsl(var(--primary))]/10">
                                    <FileText className="w-6 h-6 text-[hsl(var(--primary))]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-[hsl(var(--foreground))] truncate">{file.name}</p>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                        {totalPages} page{totalPages !== 1 ? "s" : ""} • {formatFileSize(file.size)}
                                    </p>
                                </div>
                                <button
                                    onClick={reset}
                                    className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                                >
                                    <Trash2 className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                                </button>
                            </div>

                            {/* Split Mode Selector */}
                            <div>
                                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-3">
                                    Split Mode
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: "extract", label: "Extract Pages", desc: "Specific pages", icon: "📄" },
                                        { value: "range", label: "Page Range", desc: "From - To", icon: "📑" },
                                        { value: "all", label: "All Pages", desc: "Split all", icon: "📚" },
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setSplitMode(option.value as SplitMode)}
                                            className={`p-4 rounded-xl border-2 text-center transition-all ${splitMode === option.value
                                                ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5"
                                                : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50"
                                                }`}
                                        >
                                            <span className="text-2xl mb-1 block">{option.icon}</span>
                                            <p className="font-semibold text-[hsl(var(--foreground))] text-sm">{option.label}</p>
                                            <p className="text-xs text-[hsl(var(--muted-foreground))]">{option.desc}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Page Input based on mode */}
                            {splitMode === "extract" && (
                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                                        Pages to Extract
                                    </label>
                                    <input
                                        type="text"
                                        value={pageInput}
                                        onChange={(e) => setPageInput(e.target.value)}
                                        placeholder="e.g., 1, 3, 5-8, 12"
                                        className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                                    />
                                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
                                        Enter page numbers separated by commas. Use dash for ranges (e.g., 1-5). Max: {totalPages}
                                    </p>
                                </div>
                            )}

                            {splitMode === "range" && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                                            From Page
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max={totalPages}
                                            value={rangeStart}
                                            onChange={(e) => setRangeStart(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                                            To Page
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max={totalPages}
                                            value={rangeEnd}
                                            onChange={(e) => setRangeEnd(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            )}

                            {splitMode === "all" && (
                                <div className="p-4 rounded-xl bg-[hsl(var(--muted))]/50 border border-[hsl(var(--border))]">
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                        This will create <strong className="text-[hsl(var(--foreground))]">{totalPages} separate PDF files</strong>, one for each page.
                                    </p>
                                </div>
                            )}

                            {/* Error */}
                            {error && (
                                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            {/* Split Button */}
                            <Button
                                onClick={splitPDF}
                                disabled={isProcessing}
                                className="w-full h-14 text-lg bg-gradient-primary shadow-glow hover:opacity-90"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Splitting PDF...
                                    </>
                                ) : (
                                    <>
                                        <Scissors className="w-5 h-5 mr-2" />
                                        Split PDF
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                /* Results View */
                <div className="space-y-6">
                    {/* Success Header */}
                    <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/30">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-green-500/20">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            </div>
                            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                                Split Complete!
                            </h2>
                        </div>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                            Created {results.length} PDF file{results.length !== 1 ? "s" : ""}
                        </p>
                    </div>

                    {/* Results List */}
                    <div className="space-y-2">
                        {results.map((result, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]"
                            >
                                <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10">
                                    <FileOutput className="w-5 h-5 text-[hsl(var(--primary))]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-[hsl(var(--foreground))] truncate text-sm">{result.name}</p>
                                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                                        {result.pageCount} page{result.pageCount !== 1 ? "s" : ""} • {formatFileSize(result.size)}
                                    </p>
                                </div>
                                <Button
                                    onClick={() => downloadFile(result)}
                                    size="sm"
                                    variant="outline"
                                >
                                    <Download className="w-4 h-4 mr-1" />
                                    Download
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Download All */}
                    {results.length > 1 && (
                        <Button
                            onClick={downloadAll}
                            className="w-full h-12 bg-gradient-primary shadow-glow hover:opacity-90"
                        >
                            <Download className="w-5 h-5 mr-2" />
                            Download All ({results.length} files)
                        </Button>
                    )}

                    <button
                        onClick={reset}
                        className="w-full text-center text-[hsl(var(--primary))] hover:underline font-medium"
                    >
                        Split another PDF
                    </button>
                </div>
            )}
        </div>
    );
}
