"use client";

import { useState, useCallback } from "react";
import { FileUp, X, GripVertical, Download, Loader2, FileText, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";
import { PDFDocument } from "pdf-lib";

interface PDFFile {
    id: string;
    file: File;
    name: string;
    pageCount: number | null;
    size: string;
}

export function MergePDFTool() {
    const [files, setFiles] = useState<PDFFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isMerging, setIsMerging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    const loadPDFInfo = async (file: File): Promise<PDFFile> => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
            return {
                id: crypto.randomUUID(),
                file,
                name: file.name,
                pageCount: pdfDoc.getPageCount(),
                size: formatFileSize(file.size),
            };
        } catch {
            return {
                id: crypto.randomUUID(),
                file,
                name: file.name,
                pageCount: null,
                size: formatFileSize(file.size),
            };
        }
    };

    const handleFiles = useCallback(async (fileList: FileList | File[]) => {
        setError(null);
        const pdfFiles = Array.from(fileList).filter(f => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"));

        if (pdfFiles.length === 0) {
            setError("Please select PDF files only.");
            return;
        }

        const newFiles = await Promise.all(pdfFiles.map(loadPDFInfo));
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

    // Drag and drop reordering
    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const handleDragOverItem = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const newFiles = [...files];
        const [draggedItem] = newFiles.splice(draggedIndex, 1);
        newFiles.splice(index, 0, draggedItem);
        setFiles(newFiles);
        setDraggedIndex(index);
    };

    const mergePDFs = async () => {
        if (files.length < 2) {
            setError("Please add at least 2 PDF files to merge.");
            return;
        }

        setIsMerging(true);
        setError(null);

        try {
            const mergedPdf = await PDFDocument.create();

            for (const pdfFile of files) {
                const arrayBuffer = await pdfFile.file.arrayBuffer();
                const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
                const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const mergedPdfBytes = await mergedPdf.save();
            const blob = new Blob([mergedPdfBytes.buffer as BlobPart], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "merged-document.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Merge error:", err);
            setError("Failed to merge PDFs. Some files may be corrupted or password-protected.");
        } finally {
            setIsMerging(false);
        }
    };

    const totalPages = files.reduce((sum, f) => sum + (f.pageCount || 0), 0);

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                    Merge PDF Files Online
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
                    Combine multiple PDFs into one. Drag to reorder. 100% free and private.
                </p>
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

                {/* Decorative Blocks */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))]/10 to-transparent rotate-12 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-lg bg-gradient-to-tr from-[hsl(var(--primary))]/10 to-transparent -rotate-12 pointer-events-none" />
                <div className="absolute top-1/2 left-8 w-8 h-8 rounded-full bg-[hsl(var(--primary))]/5 pointer-events-none" />

                <input
                    type="file"
                    accept=".pdf,application/pdf"
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
                            Drop your PDF files here
                        </p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                            or click to browse
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">PDF</span>
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Multiple files</span>
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Drag to reorder</span>
                    </div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        Select multiple PDF files to combine into one document
                    </p>
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
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-[hsl(var(--foreground))]">
                            {files.length} file{files.length > 1 ? "s" : ""} selected
                            {totalPages > 0 && <span className="text-[hsl(var(--muted-foreground))] font-normal"> • {totalPages} pages total</span>}
                        </h2>
                        <Button variant="ghost" size="sm" onClick={clearAll} className="text-[hsl(var(--muted-foreground))]">
                            <Trash2 className="w-4 h-4 mr-1" /> Clear All
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {files.map((file, index) => (
                            <div
                                key={file.id}
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragEnd={handleDragEnd}
                                onDragOver={(e) => handleDragOverItem(e, index)}
                                className={`flex items-center gap-3 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] cursor-move transition-all ${draggedIndex === index ? "opacity-50 scale-[0.98]" : ""
                                    }`}
                            >
                                <GripVertical className="w-5 h-5 text-[hsl(var(--muted-foreground))] shrink-0" />
                                <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10">
                                    <FileText className="w-5 h-5 text-[hsl(var(--primary))]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-[hsl(var(--foreground))] truncate">{file.name}</p>
                                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                                        {file.size} {file.pageCount && `• ${file.pageCount} page${file.pageCount > 1 ? "s" : ""}`}
                                    </p>
                                </div>
                                <span className="text-sm text-[hsl(var(--muted-foreground))] font-medium">#{index + 1}</span>
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
                            accept=".pdf,application/pdf"
                            multiple
                            onChange={handleFileInput}
                            className="hidden"
                        />
                        <Plus className="w-5 h-5 text-[hsl(var(--primary))]" />
                        <span className="text-[hsl(var(--primary))] font-medium">Add more files</span>
                    </label>

                    {/* Merge Button */}
                    <Button
                        onClick={mergePDFs}
                        disabled={isMerging || files.length < 2}
                        className="w-full mt-6 h-14 text-lg bg-gradient-primary shadow-glow hover:opacity-90"
                    >
                        {isMerging ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Merging PDFs...
                            </>
                        ) : (
                            <>
                                <Download className="w-5 h-5 mr-2" />
                                Merge & Download PDF
                            </>
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
}
