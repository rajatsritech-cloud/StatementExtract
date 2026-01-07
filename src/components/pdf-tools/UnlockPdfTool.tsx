"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Download, Loader2, FileText, Trash2, CheckCircle, AlertCircle, Unlock, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";
import { PDFDocument } from "pdf-lib";

export function UnlockPdfTool() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [needsPassword, setNeedsPassword] = useState(false);
    const [totalPages, setTotalPages] = useState<number>(0);
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

        setFile(selectedFile);
        setResultUrl(null);
        setError(null);
        setPassword("");
        setNeedsPassword(false);

        try {
            const arrayBuffer = await selectedFile.arrayBuffer();
            // Try to load without password first
            const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
            setTotalPages(pdfDoc.getPageCount());
            setNeedsPassword(false);
        } catch (err) {
            // PDF might be encrypted
            setNeedsPassword(true);
            setTotalPages(0);
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

    const unlockPdf = async () => {
        if (!file) return;

        setIsProcessing(true);
        setError(null);
        setResultUrl(null);

        try {
            const arrayBuffer = await file.arrayBuffer();

            // Try to load with password if provided
            const loadOptions: { ignoreEncryption?: boolean; password?: string } = {};
            if (needsPassword && password) {
                loadOptions.password = password;
            } else {
                loadOptions.ignoreEncryption = true;
            }

            const pdfDoc = await PDFDocument.load(arrayBuffer, loadOptions);

            // Create a new unprotected PDF by copying all pages
            const newPdf = await PDFDocument.create();
            const pages = await newPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());

            pages.forEach((page) => {
                newPdf.addPage(page);
            });

            // Copy metadata
            const title = pdfDoc.getTitle();
            const author = pdfDoc.getAuthor();
            const subject = pdfDoc.getSubject();

            if (title) newPdf.setTitle(title);
            if (author) newPdf.setAuthor(author);
            if (subject) newPdf.setSubject(subject);

            // Save without encryption
            const pdfBytes = await newPdf.save();
            const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);

            setResultUrl(url);
            setResultSize(pdfBytes.length);
            setTotalPages(pages.length);
        } catch (err) {
            console.error("Unlock error:", err);
            if (needsPassword) {
                setError("Incorrect password. Please try again with the correct password.");
            } else {
                setError("Failed to unlock PDF. The file may be damaged or have strong encryption.");
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadResult = () => {
        if (!resultUrl || !file) return;
        const link = document.createElement("a");
        link.href = resultUrl;
        link.download = file.name.replace(".pdf", "-unlocked.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const reset = () => {
        setFile(null);
        setTotalPages(0);
        setResultUrl(null);
        setError(null);
        setPassword("");
        setNeedsPassword(false);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                    Unlock PDF Online Free
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
                    Remove restrictions from PDF files. Unlock copy, print, and edit permissions. 100% free and private.
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
                                    <Unlock className="w-10 h-10 text-[hsl(var(--primary))]" />
                                </div>
                                <div>
                                    <p className="text-xl font-semibold text-[hsl(var(--foreground))]">
                                        Drop your locked PDF here
                                    </p>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                                        or click to browse
                                    </p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                                    <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Remove restrictions</span>
                                    <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Enable copy/print</span>
                                    <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">No upload</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {!file && <PrivacyBadge />}

                    {/* File Selected */}
                    {file && (
                        <div className="space-y-6" ref={fileSectionRef}>
                            {/* File Info */}
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <div className="p-3 rounded-lg bg-[hsl(var(--primary))]/10">
                                    <Lock className="w-6 h-6 text-[hsl(var(--primary))]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-[hsl(var(--foreground))] truncate">{file.name}</p>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                        {totalPages > 0 ? `${totalPages} page${totalPages !== 1 ? "s" : ""} • ` : ""}
                                        {formatFileSize(file.size)}
                                        {needsPassword && <span className="text-amber-500 ml-2">• Password protected</span>}
                                    </p>
                                </div>
                                <button
                                    onClick={reset}
                                    className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                                >
                                    <Trash2 className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                                </button>
                            </div>

                            {/* Password Input (if needed) */}
                            {needsPassword && (
                                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                                        This PDF is password protected. Enter the password to unlock:
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter PDF password"
                                            className="w-full px-4 py-3 pr-12 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[hsl(var(--muted-foreground))]"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Info Box */}
                            {!needsPassword && (
                                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                                    <p className="text-sm text-[hsl(var(--foreground))]">
                                        <strong>Ready to unlock!</strong> This PDF has restrictions that prevent copying, printing, or editing.
                                        Click the button below to create an unlocked version.
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <Button
                                onClick={unlockPdf}
                                disabled={isProcessing || (needsPassword && !password)}
                                className="w-full h-14 text-lg bg-gradient-primary shadow-glow hover:opacity-90"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Unlocking PDF...
                                    </>
                                ) : (
                                    <>
                                        <Unlock className="w-5 h-5 mr-2" />
                                        Unlock PDF
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
                                PDF Unlocked Successfully!
                            </h2>
                        </div>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                            Restrictions removed. You can now copy, print, and edit. File size: {formatFileSize(resultSize)}
                        </p>
                    </div>

                    <Button
                        onClick={downloadResult}
                        className="w-full h-14 text-lg bg-gradient-primary shadow-glow hover:opacity-90"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Download Unlocked PDF
                    </Button>

                    <button
                        onClick={reset}
                        className="w-full text-center text-[hsl(var(--primary))] hover:underline font-medium"
                    >
                        Unlock another PDF
                    </button>
                </div>
            )}
        </div>
    );
}
