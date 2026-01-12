"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Upload, FileImage, Trash2, Download, Plus, ArrowUp, ArrowDown, RefreshCw, FileText } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/button";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";
import { PDFDocument } from "pdf-lib";

interface ImageFile {
    id: string;
    file: File;
    preview: string;
    name: string;
}

type PageSize = "a4" | "letter" | "legal" | "fit";
type Orientation = "portrait" | "landscape" | "auto";

export function JPGtoPDFTool() {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [isConverting, setIsConverting] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [pageSize, setPageSize] = useState<PageSize>("a4");
    const [orientation, setOrientation] = useState<Orientation>("auto");
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const prevImageCount = useRef(0);

    useEffect(() => {
        if (images.length > prevImageCount.current) {
            setTimeout(() => {
                optionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
        prevImageCount.current = images.length;
    }, [images.length]);

    const pageSizes = {
        a4: { width: 595.28, height: 841.89 },
        letter: { width: 612, height: 792 },
        legal: { width: 612, height: 1008 },
        fit: { width: 0, height: 0 }, // Fit to image size
    };

    const handleFileSelect = useCallback((files: FileList | null) => {
        if (!files) return;

        const validFiles = Array.from(files).filter(file =>
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/webp" ||
            file.type === "image/gif"
        );

        const newImages: ImageFile[] = validFiles.map(file => ({
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
        }));

        setImages(prev => [...prev, ...newImages]);
        setDownloadUrl(null);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files);
    }, [handleFileSelect]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const removeImage = (id: string) => {
        setImages(prev => {
            const image = prev.find(img => img.id === id);
            if (image) URL.revokeObjectURL(image.preview);
            return prev.filter(img => img.id !== id);
        });
        setDownloadUrl(null);
    };

    const moveImage = (index: number, direction: "up" | "down") => {
        if (
            (direction === "up" && index === 0) ||
            (direction === "down" && index === images.length - 1)
        ) return;

        const newImages = [...images];
        const swapIndex = direction === "up" ? index - 1 : index + 1;
        [newImages[index], newImages[swapIndex]] = [newImages[swapIndex], newImages[index]];
        setImages(newImages);
        setDownloadUrl(null);
    };

    const loadImage = (file: File): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    };

    const convertToPDF = async () => {
        if (images.length === 0) return;

        setIsConverting(true);
        try {
            const pdfDoc = await PDFDocument.create();

            for (const imageFile of images) {
                const img = await loadImage(imageFile.file);
                const imgWidth = img.naturalWidth;
                const imgHeight = img.naturalHeight;
                URL.revokeObjectURL(img.src);

                // Determine page dimensions
                let pageWidth: number;
                let pageHeight: number;

                if (pageSize === "fit") {
                    pageWidth = imgWidth;
                    pageHeight = imgHeight;
                } else {
                    const size = pageSizes[pageSize];
                    if (orientation === "landscape") {
                        pageWidth = size.height;
                        pageHeight = size.width;
                    } else if (orientation === "portrait") {
                        pageWidth = size.width;
                        pageHeight = size.height;
                    } else {
                        // Auto: match image orientation
                        if (imgWidth > imgHeight) {
                            pageWidth = size.height;
                            pageHeight = size.width;
                        } else {
                            pageWidth = size.width;
                            pageHeight = size.height;
                        }
                    }
                }

                const page = pdfDoc.addPage([pageWidth, pageHeight]);

                // Read image bytes
                const arrayBuffer = await imageFile.file.arrayBuffer();
                let embeddedImage;

                if (imageFile.file.type === "image/jpeg") {
                    embeddedImage = await pdfDoc.embedJpg(arrayBuffer);
                } else {
                    // For PNG, WebP, GIF - convert to PNG format
                    embeddedImage = await pdfDoc.embedPng(arrayBuffer);
                }

                // Calculate scaling to fit page while maintaining aspect ratio
                const imgAspect = imgWidth / imgHeight;
                const pageAspect = pageWidth / pageHeight;

                let drawWidth: number;
                let drawHeight: number;

                if (pageSize === "fit") {
                    drawWidth = imgWidth;
                    drawHeight = imgHeight;
                } else {
                    if (imgAspect > pageAspect) {
                        drawWidth = pageWidth;
                        drawHeight = pageWidth / imgAspect;
                    } else {
                        drawHeight = pageHeight;
                        drawWidth = pageHeight * imgAspect;
                    }
                }

                // Center image on page
                const x = (pageWidth - drawWidth) / 2;
                const y = (pageHeight - drawHeight) / 2;

                page.drawImage(embeddedImage, {
                    x,
                    y,
                    width: drawWidth,
                    height: drawHeight,
                });
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes.buffer as BlobPart], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            setDownloadUrl(url);
        } catch (error) {
            console.error("Error converting to PDF:", error);
            alert("Error converting images to PDF. Please try again.");
        } finally {
            setIsConverting(false);
        }
    };

    const reset = () => {
        images.forEach(img => URL.revokeObjectURL(img.preview));
        if (downloadUrl) URL.revokeObjectURL(downloadUrl);
        setImages([]);
        setDownloadUrl(null);
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <Breadcrumb
                    items={[
                        { label: "All Converters", href: "/convert" },
                        { label: "JPG to PDF" }
                    ]}
                />
                <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                    JPG to PDF Converter
                </h1>
                <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto font-normal">
                    Convert JPG, PNG, WebP images to PDF. Combine multiple images into one PDF. 100% free.
                </h2>
            </div>

            {/* Upload Area */}
            {images.length === 0 ? (
                <>
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
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={(e) => handleFileSelect(e.target.files)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />

                        <div className="relative z-10 space-y-4">
                            <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/5 flex items-center justify-center shadow-lg">
                                <FileImage className="w-10 h-10 text-[hsl(var(--primary))]" />
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-[hsl(var(--foreground))]">
                                    Drop your images here
                                </p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                                    or click to browse
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">JPG</span>
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">PNG</span>
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">WebP</span>
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">GIF</span>
                            </div>
                            <p className="text-xs text-[hsl(var(--muted-foreground))]">
                                Upload multiple images to combine into one PDF
                            </p>
                        </div>
                    </div>
                    <PrivacyBadge />
                </>
            ) : (
                <div className="space-y-6" ref={optionsRef}>
                    {/* Options Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[hsl(var(--muted))]/30 border border-[hsl(var(--border))]">
                        <div className="flex flex-wrap items-center gap-4">
                            {/* Page Size */}
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-[hsl(var(--foreground))]">Size:</label>
                                <select
                                    value={pageSize}
                                    onChange={(e) => { setPageSize(e.target.value as PageSize); setDownloadUrl(null); }}
                                    className="px-3 py-1.5 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-sm"
                                >
                                    <option value="a4">A4</option>
                                    <option value="letter">Letter</option>
                                    <option value="legal">Legal</option>
                                    <option value="fit">Fit to Image</option>
                                </select>
                            </div>

                            {/* Orientation */}
                            {pageSize !== "fit" && (
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-[hsl(var(--foreground))]">Orientation:</label>
                                    <select
                                        value={orientation}
                                        onChange={(e) => { setOrientation(e.target.value as Orientation); setDownloadUrl(null); }}
                                        className="px-3 py-1.5 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-sm"
                                    >
                                        <option value="auto">Auto</option>
                                        <option value="portrait">Portrait</option>
                                        <option value="landscape">Landscape</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Add More Button */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Images
                        </Button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={(e) => handleFileSelect(e.target.files)}
                            className="hidden"
                        />
                    </div>

                    {/* Image List */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                            <div
                                key={image.id}
                                className="relative group rounded-xl overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--card))]"
                            >
                                <img
                                    src={image.preview}
                                    alt={image.name}
                                    className="w-full aspect-square object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    {index > 0 && (
                                        <button
                                            onClick={() => moveImage(index, "up")}
                                            className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                                        >
                                            <ArrowUp className="w-4 h-4 text-white" />
                                        </button>
                                    )}
                                    {index < images.length - 1 && (
                                        <button
                                            onClick={() => moveImage(index, "down")}
                                            className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                                        >
                                            <ArrowDown className="w-4 h-4 text-white" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => removeImage(image.id)}
                                        className="p-2 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-black/60 text-white text-xs truncate">
                                    {index + 1}. {image.name}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {!downloadUrl ? (
                            <Button
                                onClick={convertToPDF}
                                disabled={isConverting || images.length === 0}
                                className="px-8 py-6 text-lg bg-gradient-primary shadow-glow hover:opacity-90"
                            >
                                {isConverting ? (
                                    <>
                                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                        Converting...
                                    </>
                                ) : (
                                    <>
                                        <FileText className="w-5 h-5 mr-2" />
                                        Convert to PDF
                                    </>
                                )}
                            </Button>
                        ) : (
                            <a
                                href={downloadUrl}
                                download="images-combined.pdf"
                                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors shadow-lg"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Download PDF
                            </a>
                        )}
                        <Button variant="outline" onClick={reset}>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Reset
                        </Button>
                    </div>

                    {/* Image Count */}
                    <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
                        {images.length} image{images.length !== 1 ? "s" : ""} selected • Drag to reorder
                    </p>
                </div>
            )}
        </div>
    );
}
