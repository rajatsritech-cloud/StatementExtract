"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Upload, Download, Image as ImageIcon, Loader2, CheckCircle2, Trash2, ArrowRight, AlertTriangle } from "lucide-react";

interface ImageToAvifConverterProps {
    title: string;
    description: string;
}

export const ImageToAvifConverter = ({ title, description }: ImageToAvifConverterProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [originalSize, setOriginalSize] = useState<number>(0);
    const [convertedSize, setConvertedSize] = useState<number>(0);
    const [avifSupported, setAvifSupported] = useState<boolean | null>(null);
    const [quality, setQuality] = useState<number>(80);
    const inputRef = useRef<HTMLInputElement>(null);

    // Check AVIF encoding support
    useEffect(() => {
        const checkAvifSupport = async () => {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                setAvifSupported(false);
                return;
            }
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, 1, 1);

            try {
                const blob = await new Promise<Blob | null>((resolve) => {
                    canvas.toBlob((b) => resolve(b), 'image/avif', 0.8);
                });
                setAvifSupported(blob !== null && blob.type === 'image/avif');
            } catch {
                setAvifSupported(false);
            }
        };
        checkAvifSupport();
    }, []);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            processFile(selectedFile);
        }
    }, []);

    const processFile = (selectedFile: File) => {
        setError(null);
        setConvertedUrl(null);
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

            const blob = await new Promise<Blob>((resolve, reject) => {
                canvas.toBlob(
                    (b) => {
                        if (b && b.type === 'image/avif') {
                            resolve(b);
                        } else {
                            reject(new Error("AVIF encoding not supported by your browser"));
                        }
                    },
                    "image/avif",
                    quality / 100
                );
            });

            setConvertedSize(blob.size);
            setConvertedUrl(URL.createObjectURL(blob));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to convert image. Your browser may not support AVIF encoding.");
            }
            console.error(err);
        } finally {
            setIsConverting(false);
        }
    }, [file, preview, quality]);

    const downloadImage = useCallback(() => {
        if (!convertedUrl || !file) return;

        const link = document.createElement("a");
        link.href = convertedUrl;
        const baseName = file.name.replace(/\.[^/.]+$/, "");
        link.download = `${baseName}.avif`;
        link.click();
    }, [convertedUrl, file]);

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

    const compressionRatio = originalSize > 0 && convertedSize > 0
        ? Math.round((1 - convertedSize / originalSize) * 100)
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

            {/* Browser Support Warning */}
            {avifSupported === false && (
                <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-yellow-700 dark:text-yellow-400 font-medium">AVIF Encoding Not Supported</p>
                        <p className="text-sm text-yellow-600 dark:text-yellow-500 mt-1">
                            Your browser doesn't support AVIF encoding. Please use Chrome 94+, Firefox 93+, or Edge 121+ for best results.
                        </p>
                    </div>
                </div>
            )}

            {/* Quality Selector */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-3 text-center">
                    Quality: {quality}%
                </label>
                <div className="flex items-center gap-4 max-w-md mx-auto">
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">Smaller</span>
                    <input
                        type="range"
                        min="10"
                        max="100"
                        value={quality}
                        onChange={(e) => setQuality(Number(e.target.value))}
                        className="flex-1 h-2 bg-[hsl(var(--muted))] rounded-lg appearance-none cursor-pointer accent-[hsl(var(--primary))]"
                    />
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">Better</span>
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
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="relative z-10">
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
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">GIF</span>
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--primary))] text-white">→ AVIF</span>
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
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 text-sm">
                    {error}
                </div>
            )}

            {/* Action Buttons */}
            {file && !convertedUrl && (
                <div className="mt-6 flex gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-3 rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] transition-colors flex items-center gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear
                    </button>
                    <button
                        onClick={convertImage}
                        disabled={isConverting || avifSupported === false}
                        className="px-8 py-3 rounded-xl bg-[hsl(var(--primary))] text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
                    >
                        {isConverting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Converting...
                            </>
                        ) : (
                            <>
                                Convert to AVIF
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
                        {compressionRatio > 0 && (
                            <span className="ml-2 text-green-600 font-medium">(-{compressionRatio}%)</span>
                        )}
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
                            Download AVIF
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
