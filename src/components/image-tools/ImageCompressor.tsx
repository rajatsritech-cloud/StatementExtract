"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Upload, Download, Image as ImageIcon, Loader2, CheckCircle2, Trash2, ArrowRight, Settings, Save } from "lucide-react";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";

interface ImageCompressorProps {
    title: string;
    description: string;
}

const TARGET_SIZES = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB limit

export const ImageCompressor = ({ title, description }: ImageCompressorProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
    const [isCompressing, setIsCompressing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [originalSize, setOriginalSize] = useState<number>(0);
    const [compressedSize, setCompressedSize] = useState<number>(0);
    const [targetSize, setTargetSize] = useState<number>(50);
    const inputRef = useRef<HTMLInputElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (file) {
            setTimeout(() => {
                actionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    }, [file]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            processFile(selectedFile);
        }
    }, []);

    const processFile = (selectedFile: File) => {
        setError(null);
        setCompressedUrl(null);

        // Check file size limit (20MB)
        if (selectedFile.size > MAX_FILE_SIZE) {
            setError(`File too large. Maximum size is 20MB. Your file is ${(selectedFile.size / (1024 * 1024)).toFixed(1)}MB.`);
            return;
        }

        setFile(selectedFile);
        setOriginalSize(selectedFile.size);

        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) {
            processFile(droppedFile);
        }
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }, []);

    const compressImage = useCallback(async () => {
        if (!file || !preview) return;

        setIsCompressing(true);
        setError(null);

        try {
            const img = new Image();
            img.src = preview;

            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;

            // Resize if image is very large
            const maxDimension = 2000;
            if (width > maxDimension || height > maxDimension) {
                if (width > height) {
                    height = (height / width) * maxDimension;
                    width = maxDimension;
                } else {
                    width = (width / height) * maxDimension;
                    height = maxDimension;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            if (!ctx) throw new Error("Canvas context not available");

            ctx.drawImage(img, 0, 0, width, height);

            const targetBytes = targetSize * 1024;
            let quality = 0.9;
            let blob: Blob | null = null;

            // Iterative compression
            while (quality > 0.05) {
                blob = await new Promise<Blob>((resolve, reject) => {
                    canvas.toBlob(
                        (b) => (b ? resolve(b) : reject(new Error("Compression failed"))),
                        "image/webp",
                        quality
                    );
                });

                if (blob.size <= targetBytes) {
                    break;
                }

                // Scale down if we're still too large
                if (quality <= 0.3 && blob.size > targetBytes * 1.5) {
                    const scale = 0.8;
                    width = Math.floor(width * scale);
                    height = Math.floor(height * scale);
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                }

                quality -= 0.05;
            }

            if (!blob) throw new Error("Failed to compress image");

            setCompressedSize(blob.size);
            setCompressedUrl(URL.createObjectURL(blob));

            if (blob.size > targetBytes) {
                setError(`Compressed to ${formatBytes(blob.size)} (target was ${targetSize}KB). Further compression would degrade quality.`);
            }
        } catch (err) {
            setError("Failed to compress image. Please try a different file.");
            console.error(err);
        } finally {
            setIsCompressing(false);
        }
    }, [file, preview, targetSize]);

    const downloadImage = useCallback(() => {
        if (!compressedUrl || !file) return;

        const link = document.createElement("a");
        link.href = compressedUrl;
        const baseName = file.name.replace(/\.[^/.]+$/, "");
        link.download = `${baseName}-compressed.webp`;
        link.click();
    }, [compressedUrl, file]);

    const reset = () => {
        setFile(null);
        setPreview(null);
        setCompressedUrl(null);
        setError(null);
        setOriginalSize(0);
        setCompressedSize(0);
        if (inputRef.current) inputRef.current.value = "";
    };

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const compressionRatio = originalSize > 0 && compressedSize > 0
        ? Math.round((1 - compressedSize / originalSize) * 100)
        : 0;

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-3">
                    {title}
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] text-lg">
                    {description}
                </p>
            </div>

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
                            {size}KB
                        </button>
                    ))}
                </div>

                {/* Custom Size Input */}
                <div className="flex items-center justify-center gap-3">
                    <span className="text-sm text-[hsl(var(--muted-foreground))]">Or enter custom:</span>
                    <div className="relative">
                        <input
                            type="number"
                            min="1"
                            max="10000"
                            value={targetSize}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (!isNaN(val) && val > 0 && val <= 10000) {
                                    setTargetSize(val);
                                }
                            }}
                            className="w-24 px-3 py-2 pr-8 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] text-center font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                            placeholder="Size"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[hsl(var(--muted-foreground))] pointer-events-none">
                            KB
                        </span>
                    </div>
                </div>
            </div>

            {/* Upload Area */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => inputRef.current?.click()}
                className={`
                    relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer
                    transition-all duration-200 overflow-hidden
                    ${file
                        ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5"
                        : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--muted))]/30"
                    }
                `}
            >
                {/* Modern SVG Grid/Dot Pattern Background */}
                <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.3) 1px, transparent 0)
                        `,
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
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {!file ? (
                    <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center">
                            <Upload className="w-8 h-8 text-[hsl(var(--primary))]" />
                        </div>
                        <div>
                            <p className="text-lg font-medium text-[hsl(var(--foreground))]">
                                Drop your image here
                            </p>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                                or click to browse
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                            <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">PNG</span>
                            <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">JPG</span>
                            <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">WebP</span>
                            <span className="px-2 py-1 rounded-full bg-[hsl(var(--primary))] text-white">→ Compressed</span>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="max-h-48 mx-auto rounded-lg shadow-md"
                            />
                        )}
                        <div className="flex items-center justify-center gap-2 text-sm">
                            <ImageIcon className="w-4 h-4 text-[hsl(var(--primary))]" />
                            <span className="font-medium text-[hsl(var(--foreground))]">{file.name}</span>
                            <span className="text-[hsl(var(--muted-foreground))]">({formatBytes(originalSize)})</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Privacy Badge */}
            <PrivacyBadge />

            {/* Error Message */}
            {error && (
                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-700 dark:text-yellow-400 text-sm">
                    {error}
                </div>
            )}

            {/* Action Buttons */}
            {file && !compressedUrl && (
                <div className="mt-6 flex gap-3 justify-center" ref={actionsRef}>
                    <button
                        onClick={reset}
                        className="px-6 py-3 rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] transition-colors flex items-center gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear
                    </button>
                    <button
                        onClick={compressImage}
                        disabled={isCompressing}
                        className="px-8 py-3 rounded-xl bg-[hsl(var(--primary))] text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
                    >
                        {isCompressing ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Compressing...
                            </>
                        ) : (
                            <>
                                Compress to {targetSize}KB
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Success & Download */}
            {compressedUrl && (
                <div className="mt-6 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl">
                    <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium">Compression Complete!</span>
                    </div>

                    <div className="text-center text-sm text-[hsl(var(--muted-foreground))] mb-4">
                        <span>{formatBytes(originalSize)}</span>
                        <ArrowRight className="inline w-4 h-4 mx-2" />
                        <span className="font-medium text-[hsl(var(--foreground))]">{formatBytes(compressedSize)}</span>
                        <span className="ml-2 text-green-600 font-medium">(-{compressionRatio}%)</span>
                    </div>

                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={reset}
                            className="px-6 py-3 rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
                        >
                            Compress Another
                        </button>
                        <button
                            onClick={downloadImage}
                            className="px-8 py-3 rounded-xl bg-[hsl(var(--primary))] text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
