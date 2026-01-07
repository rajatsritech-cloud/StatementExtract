"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Download, Loader2, FileText, Trash2, CheckCircle, AlertCircle, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

type PagePosition = "bottom-center" | "bottom-left" | "bottom-right" | "top-center" | "top-left" | "top-right";
type NumberFormat = "1" | "1 of N" | "Page 1" | "Page 1 of N" | "- 1 -";

export function AddPageNumbersTool() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [position, setPosition] = useState<PagePosition>("bottom-center");
    const [format, setFormat] = useState<NumberFormat>("1");
    const [startPage, setStartPage] = useState<number>(1);
    const [fontSize, setFontSize] = useState<number>(12);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [resultSize, setResultSize] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const fileSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (file) {
            setTimeout(() => {
                fileSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    }, [file]);

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
            setResultUrl(null);
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

    const getPageNumberText = (pageNum: number, total: number): string => {
        switch (format) {
            case "1": return String(pageNum);
            case "1 of N": return `${pageNum} of ${total}`;
            case "Page 1": return `Page ${pageNum}`;
            case "Page 1 of N": return `Page ${pageNum} of ${total}`;
            case "- 1 -": return `- ${pageNum} -`;
            default: return String(pageNum);
        }
    };

    const addPageNumbers = async () => {
        if (!file) return;

        setIsProcessing(true);
        setError(null);
        setResultUrl(null);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
            const pages = pdfDoc.getPages();

            pages.forEach((page, index) => {
                if (index + 1 < startPage) return; // Skip pages before startPage

                const pageNum = index + 1 - startPage + 1;
                const text = getPageNumberText(pageNum, totalPages - startPage + 1);
                const textWidth = font.widthOfTextAtSize(text, fontSize);
                const { width, height } = page.getSize();
                const margin = 40;

                let x: number, y: number;

                switch (position) {
                    case "bottom-center":
                        x = (width - textWidth) / 2;
                        y = margin;
                        break;
                    case "bottom-left":
                        x = margin;
                        y = margin;
                        break;
                    case "bottom-right":
                        x = width - textWidth - margin;
                        y = margin;
                        break;
                    case "top-center":
                        x = (width - textWidth) / 2;
                        y = height - margin;
                        break;
                    case "top-left":
                        x = margin;
                        y = height - margin;
                        break;
                    case "top-right":
                        x = width - textWidth - margin;
                        y = height - margin;
                        break;
                    default:
                        x = (width - textWidth) / 2;
                        y = margin;
                }

                page.drawText(text, {
                    x,
                    y,
                    size: fontSize,
                    font,
                    color: rgb(0.3, 0.3, 0.3),
                });
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);

            setResultUrl(url);
            setResultSize(pdfBytes.length);
        } catch (err) {
            console.error("Page numbering error:", err);
            setError("Failed to add page numbers. The file may be corrupted.");
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadResult = () => {
        if (!resultUrl || !file) return;
        const link = document.createElement("a");
        link.href = resultUrl;
        link.download = file.name.replace(".pdf", "-numbered.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const reset = () => {
        setFile(null);
        setTotalPages(0);
        setResultUrl(null);
        setError(null);
        setPosition("bottom-center");
        setFormat("1");
        setStartPage(1);
        setFontSize(12);
        if (inputRef.current) inputRef.current.value = "";
    };

    const positionOptions: { value: PagePosition; label: string }[] = [
        { value: "bottom-center", label: "Bottom Center" },
        { value: "bottom-left", label: "Bottom Left" },
        { value: "bottom-right", label: "Bottom Right" },
        { value: "top-center", label: "Top Center" },
        { value: "top-left", label: "Top Left" },
        { value: "top-right", label: "Top Right" },
    ];

    const formatOptions: { value: NumberFormat; label: string; preview: string }[] = [
        { value: "1", label: "Simple", preview: "1, 2, 3..." },
        { value: "1 of N", label: "With Total", preview: "1 of 10, 2 of 10..." },
        { value: "Page 1", label: "Page X", preview: "Page 1, Page 2..." },
        { value: "Page 1 of N", label: "Page X of Y", preview: "Page 1 of 10..." },
        { value: "- 1 -", label: "Dashed", preview: "- 1 -, - 2 -..." },
    ];

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                    Add Page Numbers to PDF Online Free
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
                    Insert page numbers to your PDF documents. Choose position, format, and starting page. 100% free and private.
                </p>
            </div>

            {!resultUrl ? (
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
                            <div
                                className="absolute inset-0 opacity-30 pointer-events-none"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.3) 1px, transparent 0)`,
                                    backgroundSize: '24px 24px',
                                }}
                            />

                            <input
                                ref={inputRef}
                                type="file"
                                accept=".pdf,application/pdf"
                                onChange={handleFileInput}
                                className="hidden"
                            />

                            <div className="relative z-10 space-y-4">
                                <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/5 flex items-center justify-center shadow-lg">
                                    <Hash className="w-10 h-10 text-[hsl(var(--primary))]" />
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
                                    <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Add numbers</span>
                                    <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Custom position</span>
                                    <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">No upload</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {!file && <PrivacyBadge />}

                    {/* File Selected - Options */}
                    {file && (
                        <div className="space-y-6" ref={fileSectionRef}>
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

                            {/* Position Select */}
                            <div>
                                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-3">
                                    Number Position
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {positionOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => setPosition(opt.value)}
                                            className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${position === opt.value
                                                ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5 text-[hsl(var(--primary))]"
                                                : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 text-[hsl(var(--foreground))]"
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Format Select */}
                            <div>
                                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-3">
                                    Number Format
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {formatOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => setFormat(opt.value)}
                                            className={`p-3 rounded-xl border-2 text-left transition-all ${format === opt.value
                                                ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5"
                                                : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50"
                                                }`}
                                        >
                                            <p className="font-medium text-[hsl(var(--foreground))] text-sm">{opt.label}</p>
                                            <p className="text-xs text-[hsl(var(--muted-foreground))]">{opt.preview}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Start Page & Font Size */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                                        Start from Page
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={totalPages}
                                        value={startPage}
                                        onChange={(e) => setStartPage(Math.max(1, Math.min(totalPages, parseInt(e.target.value) || 1)))}
                                        className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                                        Font Size
                                    </label>
                                    <input
                                        type="number"
                                        min="8"
                                        max="24"
                                        value={fontSize}
                                        onChange={(e) => setFontSize(Math.max(8, Math.min(24, parseInt(e.target.value) || 12)))}
                                        className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <Button
                                onClick={addPageNumbers}
                                disabled={isProcessing}
                                className="w-full h-14 text-lg bg-gradient-primary shadow-glow hover:opacity-90"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Adding Page Numbers...
                                    </>
                                ) : (
                                    <>
                                        <Hash className="w-5 h-5 mr-2" />
                                        Add Page Numbers
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/30">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-green-500/20">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            </div>
                            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                                Page Numbers Added!
                            </h2>
                        </div>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                            Your PDF now has page numbers. File size: {formatFileSize(resultSize)}
                        </p>
                    </div>

                    <Button
                        onClick={downloadResult}
                        className="w-full h-14 text-lg bg-gradient-primary shadow-glow hover:opacity-90"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Download Numbered PDF
                    </Button>

                    <button
                        onClick={reset}
                        className="w-full text-center text-[hsl(var(--primary))] hover:underline font-medium"
                    >
                        Add numbers to another PDF
                    </button>
                </div>
            )}
        </div>
    );
}
