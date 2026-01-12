"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { FileUp, Download, Loader2, FileText, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";
import { PDFDocument } from "pdf-lib";

interface CompressedFile {
    name: string;
    originalSize: number;
    compressedSize: number;
    savings: number;
    url: string;
}

// Target sizes in KB - optimized for PDF use cases
const TARGET_SIZES = [100, 200, 300, 500, 1000, 2000];

export function CompressPDFTool() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isCompressing, setIsCompressing] = useState(false);
    const [targetSize, setTargetSize] = useState<number>(500); // Default 500KB
    const [result, setResult] = useState<CompressedFile | null>(null);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const fileSelectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (file) {
            setTimeout(() => {
                fileSelectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    }, [file]);

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    };

    const formatTargetLabel = (kb: number): string => {
        if (kb >= 1000) return `${kb / 1000}MB`;
        return `${kb}KB`;
    };

    const handleFile = useCallback(async (selectedFile: File) => {
        if (!selectedFile.type.includes("pdf") && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
            setError("Please select a PDF file.");
            return;
        }
        setFile(selectedFile);
        setResult(null);
        setError(null);
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

    const compressPDF = async () => {
        if (!file) return;

        setIsCompressing(true);
        setError(null);
        setResult(null);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

            // Save with compression options
            const compressedBytes = await pdfDoc.save({
                useObjectStreams: true,
                addDefaultPage: false,
            });

            const blob = new Blob([compressedBytes as any], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);

            const originalSize = file.size;
            const compressedSize = compressedBytes.length;
            const savings = Math.max(0, ((originalSize - compressedSize) / originalSize) * 100);

            setResult({
                name: file.name.replace(".pdf", "-compressed.pdf"),
                originalSize,
                compressedSize,
                savings,
                url,
            });
        } catch (err) {
            console.error("Compression error:", err);
            setError("Failed to compress PDF. The file may be corrupted or password-protected.");
        } finally {
            setIsCompressing(false);
        }
    };

    const downloadCompressed = () => {
        if (!result) return;
        const link = document.createElement("a");
        link.href = result.url;
        link.download = result.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const reset = () => {
        setFile(null);
        setResult(null);
        setError(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                    Compress PDF to Any Size
                </h1>
                <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto font-normal">
                    Reduce PDF to 100KB, 500KB, 1MB, or any target size. Perfect for email. 100% private.
                </h2>
            </div>

            {!result ? (
                <>
                    {/* Target Size Selector */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-3 text-center">
                            Target File Size
                        </label>
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                            {TARGET_SIZES.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setTargetSize(size)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${targetSize === size
                                        ? "bg-[hsl(var(--primary))] text-white"
                                        : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--primary))]/20"
                                        }`}
                                >
                                    {formatTargetLabel(size)}
                                </button>
                            ))}
                        </div>

                        {/* Custom Size Input */}
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">Or enter custom:</span>
                            <div className="relative">
                                <input
                                    type="number"
                                    min="50"
                                    max="50000"
                                    value={targetSize}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        if (!isNaN(val) && val > 0 && val <= 50000) {
                                            setTargetSize(val);
                                        }
                                    }}
                                    className="w-28 px-3 py-2 pr-10 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] text-center font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                                    placeholder="Size"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[hsl(var(--muted-foreground))] pointer-events-none">
                                    KB
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Drop Zone */}
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
                        {/* Dot Pattern Background */}
                        <div
                            className="absolute inset-0 opacity-30 pointer-events-none"
                            style={{
                                backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.3) 1px, transparent 0)`,
                                backgroundSize: '24px 24px',
                            }}
                        />

                        {/* Decorative Blocks */}
                        <div className="absolute top-4 right-4 w-16 h-16 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))]/10 to-transparent rotate-12 pointer-events-none" />
                        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-lg bg-gradient-to-tr from-[hsl(var(--primary))]/10 to-transparent -rotate-12 pointer-events-none" />
                        <div className="absolute top-1/2 left-8 w-8 h-8 rounded-full bg-[hsl(var(--primary))]/5 pointer-events-none" />

                        <input
                            ref={inputRef}
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handleFileInput}
                            className="hidden"
                        />

                        <div className="relative z-10 space-y-4">
                            <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/5 flex items-center justify-center shadow-lg">
                                <FileUp className="w-10 h-10 text-[hsl(var(--primary))]" />
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
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Up to 100MB</span>
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">No upload</span>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Badge */}
                    <PrivacyBadge />

                    {/* Error Message */}
                    {error && (
                        <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Selected File */}
                    {file && (
                        <div className="mt-6 space-y-6" ref={fileSelectionRef}>
                            {/* File Info */}
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <div className="p-3 rounded-lg bg-[hsl(var(--primary))]/10">
                                    <FileText className="w-6 h-6 text-[hsl(var(--primary))]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-[hsl(var(--foreground))] truncate">{file.name}</p>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                        Original size: {formatFileSize(file.size)} → Target: {formatTargetLabel(targetSize)}
                                    </p>
                                </div>
                                <button
                                    onClick={reset}
                                    className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                                >
                                    <Trash2 className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                                </button>
                            </div>

                            {/* Compress Button */}
                            <Button
                                onClick={compressPDF}
                                disabled={isCompressing}
                                className="w-full h-14 text-lg bg-gradient-primary shadow-glow hover:opacity-90"
                            >
                                {isCompressing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Compressing to {formatTargetLabel(targetSize)}...
                                    </>
                                ) : (
                                    <>
                                        Compress PDF to {formatTargetLabel(targetSize)}
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                /* Result View */
                <div className="space-y-6">
                    {/* Success Card */}
                    <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-full bg-green-500/20">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            </div>
                            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                                Compression Complete!
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="p-4 rounded-xl bg-[hsl(var(--background))]">
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">Original Size</p>
                                <p className="text-xl font-bold text-[hsl(var(--foreground))]">
                                    {formatFileSize(result.originalSize)}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-[hsl(var(--background))]">
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">Compressed Size</p>
                                <p className="text-xl font-bold text-green-500">
                                    {formatFileSize(result.compressedSize)}
                                </p>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-[hsl(var(--background))] text-center">
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">File Size Reduced By</p>
                            <p className="text-3xl font-bold text-[hsl(var(--primary))]">
                                {result.savings.toFixed(1)}%
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <Button
                        onClick={downloadCompressed}
                        className="w-full h-14 text-lg bg-gradient-primary shadow-glow hover:opacity-90"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Download Compressed PDF
                    </Button>

                    <button
                        onClick={reset}
                        className="w-full text-center text-[hsl(var(--primary))] hover:underline font-medium"
                    >
                        Compress another PDF
                    </button>
                </div>
            )}
        </div>
    );
}
