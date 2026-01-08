"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { FileUp, Download, Loader2, FileText, Trash2, CheckCircle, AlertCircle, RotateCw, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";
import { PDFDocument, degrees } from "pdf-lib";

interface PageInfo {
    pageNumber: number;
    rotation: number; // 0, 90, 180, 270
}

type RotationMode = "all" | "individual";

export function RotatePdfTool() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [pages, setPages] = useState<PageInfo[]>([]);
    const [rotationMode, setRotationMode] = useState<RotationMode>("all");
    const [globalRotation, setGlobalRotation] = useState<number>(90); // default 90° clockwise
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [resultSize, setResultSize] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const fileSectionRef = useRef<HTMLDivElement>(null);

    // Auto-scroll when file is selected
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

            const pageInfos: PageInfo[] = [];
            for (let i = 0; i < pageCount; i++) {
                const page = pdfDoc.getPage(i);
                pageInfos.push({
                    pageNumber: i + 1,
                    rotation: page.getRotation().angle,
                });
            }

            setFile(selectedFile);
            setPages(pageInfos);
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

    const rotatePageIndividual = (pageIndex: number, direction: 'cw' | 'ccw') => {
        setPages(prev => prev.map((p, i) => {
            if (i === pageIndex) {
                let newRotation = p.rotation + (direction === 'cw' ? 90 : -90);
                if (newRotation >= 360) newRotation -= 360;
                if (newRotation < 0) newRotation += 360;
                return { ...p, rotation: newRotation };
            }
            return p;
        }));
    };

    const rotatePDF = async () => {
        if (!file) return;

        setIsProcessing(true);
        setError(null);
        setResultUrl(null);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

            if (rotationMode === "all") {
                // Rotate all pages by globalRotation
                const pdfPages = pdfDoc.getPages();
                pdfPages.forEach(page => {
                    const currentRotation = page.getRotation().angle;
                    page.setRotation(degrees(currentRotation + globalRotation));
                });
            } else {
                // Apply individual rotations
                const pdfPages = pdfDoc.getPages();
                pages.forEach((pageInfo, index) => {
                    if (index < pdfPages.length) {
                        pdfPages[index].setRotation(degrees(pageInfo.rotation));
                    }
                });
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);

            setResultUrl(url);
            setResultSize(pdfBytes.length);
        } catch (err) {
            console.error("Rotation error:", err);
            setError("Failed to rotate PDF. The file may be corrupted.");
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadResult = () => {
        if (!resultUrl || !file) return;
        const link = document.createElement("a");
        link.href = resultUrl;
        link.download = file.name.replace(".pdf", "-rotated.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const reset = () => {
        setFile(null);
        setPages([]);
        setResultUrl(null);
        setError(null);
        setGlobalRotation(90);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                    Rotate PDF Pages Online Free
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
                    Rotate all pages or individual pages in your PDF. Fix scanned documents, upside-down pages, and landscape/portrait orientation. 100% free and private.
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
                                    <RotateCw className="w-10 h-10 text-[hsl(var(--primary))]" />
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
                                    <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Rotate 90°</span>
                                    <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Fix orientation</span>
                                    <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">No upload</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Privacy Badge */}
                    {!file && <PrivacyBadge />}

                    {/* File Selected - Rotation Options */}
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
                                        {pages.length} page{pages.length !== 1 ? "s" : ""} • {formatFileSize(file.size)}
                                    </p>
                                </div>
                                <button
                                    onClick={reset}
                                    className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                                >
                                    <Trash2 className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                                </button>
                            </div>

                            {/* Rotation Mode Selector */}
                            <div>
                                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-3">
                                    Rotation Mode
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { value: "all", label: "Rotate All Pages", desc: "Same rotation for all", icon: "🔄" },
                                        { value: "individual", label: "Individual Pages", desc: "Rotate specific pages", icon: "📄" },
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setRotationMode(option.value as RotationMode)}
                                            className={`p-4 rounded-xl border-2 text-center transition-all ${rotationMode === option.value
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

                            {/* Global Rotation Options */}
                            {rotationMode === "all" && (
                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-3">
                                        Rotate All Pages By
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[
                                            { value: 90, label: "90° CW", icon: <RotateCw className="w-4 h-4" /> },
                                            { value: 180, label: "180°", icon: <span className="text-sm">↺↻</span> },
                                            { value: 270, label: "90° CCW", icon: <RotateCcw className="w-4 h-4" /> },
                                            { value: 0, label: "0° (None)", icon: <span className="text-sm">—</span> },
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => setGlobalRotation(option.value)}
                                                className={`p-3 rounded-xl border-2 text-center transition-all flex flex-col items-center gap-1 ${globalRotation === option.value
                                                    ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5"
                                                    : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50"
                                                    }`}
                                            >
                                                <span className="text-[hsl(var(--primary))]">{option.icon}</span>
                                                <span className="text-xs font-medium text-[hsl(var(--foreground))]">{option.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Individual Page Rotation */}
                            {rotationMode === "individual" && (
                                <div className="max-h-64 overflow-y-auto border border-[hsl(var(--border))] rounded-xl">
                                    {pages.map((page, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 border-b border-[hsl(var(--border))] last:border-b-0"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="w-8 h-8 rounded-lg bg-[hsl(var(--muted))] flex items-center justify-center text-sm font-medium text-[hsl(var(--foreground))]">
                                                    {page.pageNumber}
                                                </span>
                                                <span className="text-sm text-[hsl(var(--muted-foreground))]">
                                                    Current: {page.rotation}°
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => rotatePageIndividual(index, 'ccw')}
                                                    className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                                                    title="Rotate counter-clockwise"
                                                >
                                                    <RotateCcw className="w-4 h-4 text-[hsl(var(--primary))]" />
                                                </button>
                                                <button
                                                    onClick={() => rotatePageIndividual(index, 'cw')}
                                                    className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                                                    title="Rotate clockwise"
                                                >
                                                    <RotateCw className="w-4 h-4 text-[hsl(var(--primary))]" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Error */}
                            {error && (
                                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            {/* Rotate Button */}
                            <Button
                                onClick={rotatePDF}
                                disabled={isProcessing}
                                className="w-full h-14 text-lg bg-gradient-primary shadow-glow hover:opacity-90"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Rotating PDF...
                                    </>
                                ) : (
                                    <>
                                        <RotateCw className="w-5 h-5 mr-2" />
                                        Rotate PDF
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
                                Rotation Complete!
                            </h2>
                        </div>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                            Your PDF has been rotated successfully. File size: {formatFileSize(resultSize)}
                        </p>
                    </div>

                    {/* Download Button */}
                    <Button
                        onClick={downloadResult}
                        className="w-full h-14 text-lg bg-gradient-primary shadow-glow hover:opacity-90"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Download Rotated PDF
                    </Button>

                    <button
                        onClick={reset}
                        className="w-full text-center text-[hsl(var(--primary))] hover:underline font-medium"
                    >
                        Rotate another PDF
                    </button>
                </div>
            )}
        </div>
    );
}
