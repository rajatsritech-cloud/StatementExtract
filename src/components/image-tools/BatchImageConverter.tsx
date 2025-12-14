"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, Download, Image as ImageIcon, Loader2, CheckCircle2, Trash2, ArrowRight, X, FileImage } from "lucide-react";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";

interface ConvertedFile {
    original: File;
    url: string;
    name: string;
    size: number;
}

interface BatchImageConverterProps {
    targetFormat: "png" | "jpg";
    title: string;
    description: string;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB limit

export const BatchImageConverter = ({ targetFormat, title, description }: BatchImageConverterProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
    const [isConverting, setIsConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length > 0) {
            processFiles(selectedFiles);
        }
    }, []);

    const processFiles = (selectedFiles: File[]) => {
        setError(null);
        setConvertedFiles([]);
        setProgress(0);

        // Filter for image files
        const imageFiles = selectedFiles.filter(f =>
            f.type.startsWith('image/') ||
            f.name.toLowerCase().endsWith('.heic') ||
            f.name.toLowerCase().endsWith('.heif') ||
            f.name.toLowerCase().endsWith('.avif')
        );

        // Check file size limit (20MB per file)
        const oversizedFiles = imageFiles.filter(f => f.size > MAX_FILE_SIZE);
        if (oversizedFiles.length > 0) {
            setError(`${oversizedFiles.length} file(s) exceed the 20MB limit. Please remove oversized files.`);
        }

        // Only include files under 20MB
        const validFiles = imageFiles.filter(f => f.size <= MAX_FILE_SIZE);
        setFiles(validFiles);
    };

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length > 0) {
            processFiles(droppedFiles);
        }
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }, []);

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const convertImages = useCallback(async () => {
        if (files.length === 0) return;

        setIsConverting(true);
        setError(null);
        setConvertedFiles([]);
        setProgress(0);

        const results: ConvertedFile[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            try {
                let imageData: Blob | File = file;

                // Handle HEIC/HEIF files
                const isHeic = file.name.toLowerCase().endsWith('.heic') ||
                    file.name.toLowerCase().endsWith('.heif') ||
                    file.type === 'image/heic' ||
                    file.type === 'image/heif';

                if (isHeic) {
                    // Dynamic import heic-to for Web Worker support (non-blocking)
                    const { heicTo } = await import('heic-to');
                    const mimeType = targetFormat === 'png' ? 'image/png' : 'image/jpeg';
                    imageData = await heicTo({
                        blob: file,
                        type: mimeType,
                        quality: 0.92
                    });
                } else {
                    // For non-HEIC files, use canvas conversion
                    const img = new Image();
                    const objectUrl = URL.createObjectURL(file);

                    await new Promise<void>((resolve, reject) => {
                        img.onload = () => {
                            URL.revokeObjectURL(objectUrl);
                            resolve();
                        };
                        img.onerror = () => {
                            URL.revokeObjectURL(objectUrl);
                            reject(new Error('Failed to load image'));
                        };
                        img.src = objectUrl;
                    });

                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;

                    const ctx = canvas.getContext('2d');
                    if (!ctx) throw new Error('Canvas context not available');

                    // For JPG, fill white background (no transparency)
                    if (targetFormat === 'jpg') {
                        ctx.fillStyle = '#FFFFFF';
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }

                    ctx.drawImage(img, 0, 0);

                    const mimeType = targetFormat === 'png' ? 'image/png' : 'image/jpeg';
                    const quality = targetFormat === 'jpg' ? 0.92 : undefined;

                    imageData = await new Promise<Blob>((resolve, reject) => {
                        canvas.toBlob(
                            (blob) => blob ? resolve(blob) : reject(new Error('Conversion failed')),
                            mimeType,
                            quality
                        );
                    });
                }

                const baseName = file.name.replace(/\.[^/.]+$/, '');
                const newName = `${baseName}.${targetFormat}`;

                results.push({
                    original: file,
                    url: URL.createObjectURL(imageData),
                    name: newName,
                    size: imageData.size
                });

            } catch (err) {
                console.error(`Failed to convert ${file.name}:`, err);
                // Continue with other files
            }

            setProgress(Math.round(((i + 1) / files.length) * 100));
        }

        setConvertedFiles(results);
        setIsConverting(false);

        if (results.length === 0) {
            setError('Failed to convert any images. Please try different files.');
        } else if (results.length < files.length) {
            setError(`Converted ${results.length} of ${files.length} images. Some files could not be processed.`);
        }
    }, [files, targetFormat]);

    const downloadAll = useCallback(async () => {
        if (convertedFiles.length === 1) {
            // Single file download
            const link = document.createElement('a');
            link.href = convertedFiles[0].url;
            link.download = convertedFiles[0].name;
            link.click();
        } else {
            // Multiple files - download individually (or use JSZip if available)
            for (const file of convertedFiles) {
                const link = document.createElement('a');
                link.href = file.url;
                link.download = file.name;
                link.click();
                // Small delay to prevent browser blocking
                await new Promise(r => setTimeout(r, 200));
            }
        }
    }, [convertedFiles]);

    const downloadSingle = (file: ConvertedFile) => {
        const link = document.createElement('a');
        link.href = file.url;
        link.download = file.name;
        link.click();
    };

    const reset = () => {
        setFiles([]);
        setConvertedFiles([]);
        setError(null);
        setProgress(0);
        if (inputRef.current) inputRef.current.value = '';
    };

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const totalOriginalSize = files.reduce((acc, f) => acc + f.size, 0);
    const totalConvertedSize = convertedFiles.reduce((acc, f) => acc + f.size, 0);

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-3">
                    {title}
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] text-lg">
                    {description}
                </p>
            </div>

            {/* Upload Area with Modern SVG Background */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => inputRef.current?.click()}
                className={`
                    relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer
                    transition-all duration-200 overflow-hidden
                    ${files.length > 0
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
                    accept="image/*,.heic,.heif,.avif"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="relative z-10">
                    {files.length === 0 ? (
                        <div className="space-y-4">
                            <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/5 flex items-center justify-center shadow-lg">
                                <Upload className="w-10 h-10 text-[hsl(var(--primary))]" />
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
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">HEIC</span>
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">HEIF</span>
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">AVIF</span>
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">PNG</span>
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">JPG</span>
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">WebP</span>
                            </div>
                            <p className="text-xs text-[hsl(var(--muted-foreground))]">
                                Select multiple files for batch conversion
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="flex items-center justify-center gap-2 text-[hsl(var(--primary))]">
                                <FileImage className="w-5 h-5" />
                                <span className="font-semibold">{files.length} file{files.length > 1 ? 's' : ''} selected</span>
                            </div>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                Total size: {formatBytes(totalOriginalSize)}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Privacy Badge */}
            <PrivacyBadge />

            {/* Selected Files List */}
            {files.length > 0 && convertedFiles.length === 0 && (
                <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-[hsl(var(--foreground))]">Selected Files</h3>
                        <button
                            onClick={reset}
                            className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                        >
                            Clear all
                        </button>
                    </div>
                    <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-xl bg-[hsl(var(--muted))]/50 border border-[hsl(var(--border))]"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <ImageIcon className="w-4 h-4 text-[hsl(var(--primary))] shrink-0" />
                                    <span className="text-sm text-[hsl(var(--foreground))] truncate">{file.name}</span>
                                    <span className="text-xs text-[hsl(var(--muted-foreground))] shrink-0">({formatBytes(file.size)})</span>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                                    className="p-1 hover:bg-[hsl(var(--muted))] rounded-md transition-colors"
                                >
                                    <X className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Progress Bar */}
            {isConverting && (
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[hsl(var(--foreground))]">Converting...</span>
                        <span className="text-sm text-[hsl(var(--primary))] font-medium">{progress}%</span>
                    </div>
                    <div className="h-2 bg-[hsl(var(--muted))] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))]/70 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-700 dark:text-yellow-400 text-sm">
                    {error}
                </div>
            )}

            {/* Action Buttons */}
            {files.length > 0 && convertedFiles.length === 0 && !isConverting && (
                <div className="mt-6 flex gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-3 rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] transition-colors flex items-center gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear
                    </button>
                    <button
                        onClick={convertImages}
                        disabled={isConverting}
                        className="px-8 py-3 rounded-xl bg-[hsl(var(--primary))] text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
                    >
                        Convert {files.length} file{files.length > 1 ? 's' : ''} to {targetFormat.toUpperCase()}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Success & Download */}
            {convertedFiles.length > 0 && (
                <div className="mt-6 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl">
                    <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium">Conversion Complete!</span>
                    </div>

                    <div className="text-center text-sm text-[hsl(var(--muted-foreground))] mb-4">
                        <span>{convertedFiles.length} file{convertedFiles.length > 1 ? 's' : ''} converted</span>
                        <span className="mx-2">•</span>
                        <span>{formatBytes(totalOriginalSize)}</span>
                        <ArrowRight className="inline w-4 h-4 mx-2" />
                        <span className="font-medium text-[hsl(var(--foreground))]">{formatBytes(totalConvertedSize)}</span>
                    </div>

                    {/* Converted Files List */}
                    <div className="max-h-48 overflow-y-auto space-y-2 mb-4 pr-2">
                        {convertedFiles.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))]"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                    <span className="text-sm text-[hsl(var(--foreground))] truncate">{file.name}</span>
                                    <span className="text-xs text-[hsl(var(--muted-foreground))] shrink-0">({formatBytes(file.size)})</span>
                                </div>
                                <button
                                    onClick={() => downloadSingle(file)}
                                    className="p-2 hover:bg-[hsl(var(--muted))] rounded-lg transition-colors"
                                >
                                    <Download className="w-4 h-4 text-[hsl(var(--primary))]" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={reset}
                            className="px-6 py-3 rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
                        >
                            Convert More
                        </button>
                        <button
                            onClick={downloadAll}
                            className="px-8 py-3 rounded-xl bg-[hsl(var(--primary))] text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Download All
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
