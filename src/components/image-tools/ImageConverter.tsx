"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Upload, Download, Image as ImageIcon, Loader2, CheckCircle2, Trash2, ArrowRight } from "lucide-react";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";

interface ImageConverterProps {
    targetFormat: "png" | "webp";
    sourceFormat?: string;
    title: string;
    description: string;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB limit

export const ImageConverter = ({ targetFormat, sourceFormat = "AVIF", title, description }: ImageConverterProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [originalSize, setOriginalSize] = useState<number>(0);
    const [convertedSize, setConvertedSize] = useState<number>(0);
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
        setConvertedUrl(null);

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

    const convertImage = useCallback(async () => {
        if (!file || !preview) return;

        setIsConverting(true);
        setError(null);

        try {
            const img = new Image();
            img.src = preview;

            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            if (!ctx) throw new Error("Canvas context not available");

            ctx.drawImage(img, 0, 0);

            const mimeType = targetFormat === "png" ? "image/png" : "image/webp";
            const quality = targetFormat === "webp" ? 0.9 : undefined;

            const blob = await new Promise<Blob>((resolve, reject) => {
                canvas.toBlob(
                    (b) => (b ? resolve(b) : reject(new Error("Conversion failed"))),
                    mimeType,
                    quality
                );
            });

            setConvertedSize(blob.size);
            setConvertedUrl(URL.createObjectURL(blob));
        } catch (err) {
            setError("Failed to convert image. Please try a different file.");
            console.error(err);
        } finally {
            setIsConverting(false);
        }
    }, [file, preview, targetFormat]);

    const downloadImage = useCallback(() => {
        if (!convertedUrl || !file) return;

        const link = document.createElement("a");
        link.href = convertedUrl;
        const baseName = file.name.replace(/\.[^/.]+$/, "");
        link.download = `${baseName}.${targetFormat}`;
        link.click();
    }, [convertedUrl, file, targetFormat]);

    const reset = () => {
        setFile(null);
        setPreview(null);
        setConvertedUrl(null);
        setError(null);
        setOriginalSize(0);
        setConvertedSize(0);
        if (inputRef.current) inputRef.current.value = "";
    };

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

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
                                Drop your {sourceFormat} image here
                            </p>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                                or click to browse
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                            <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">{sourceFormat}</span>
                            <span className="px-2 py-1 rounded-full bg-[hsl(var(--primary))] text-white">→ {targetFormat.toUpperCase()}</span>
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
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 text-sm">
                    {error}
                </div>
            )}

            {/* Action Buttons */}
            {file && !convertedUrl && (
                <div className="mt-6 flex gap-3 justify-center" ref={actionsRef}>
                    <button
                        onClick={reset}
                        className="px-6 py-3 rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] transition-colors flex items-center gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear
                    </button>
                    <button
                        onClick={convertImage}
                        disabled={isConverting}
                        className="px-8 py-3 rounded-xl bg-[hsl(var(--primary))] text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
                    >
                        {isConverting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Converting...
                            </>
                        ) : (
                            <>
                                Convert to {targetFormat.toUpperCase()}
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Success & Download */}
            {convertedUrl && (
                <div className="mt-6 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl">
                    <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium">Conversion Complete!</span>
                    </div>

                    <div className="text-center text-sm text-[hsl(var(--muted-foreground))] mb-4">
                        <span>{formatBytes(originalSize)}</span>
                        <ArrowRight className="inline w-4 h-4 mx-2" />
                        <span className="font-medium text-[hsl(var(--foreground))]">{formatBytes(convertedSize)}</span>
                    </div>

                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={reset}
                            className="px-6 py-3 rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
                        >
                            Convert Another
                        </button>
                        <button
                            onClick={downloadImage}
                            className="px-8 py-3 rounded-xl bg-[hsl(var(--primary))] text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Download {targetFormat.toUpperCase()}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
