"use client";

import { useState, useCallback, useRef } from "react";
import { FileImage, Copy, Download, RefreshCw, CheckCircle, Upload, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";

type OutputFormat = "datauri" | "raw" | "css" | "html" | "markdown";

export function ImageToBase64Tool() {
    const [base64Output, setBase64Output] = useState<string>("");
    const [mimeType, setMimeType] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [fileSize, setFileSize] = useState<number>(0);
    const [outputFormat, setOutputFormat] = useState<OutputFormat>("datauri");
    const [copied, setCopied] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = useCallback((file: File) => {
        if (!file.type.startsWith("image/")) {
            alert("Please select an image file");
            return;
        }

        setFileName(file.name);
        setFileSize(file.size);
        setMimeType(file.type);

        const reader = new FileReader();
        reader.onload = () => {
            const dataUri = reader.result as string;
            setPreviewUrl(dataUri);
            // Extract just the base64 part
            const base64 = dataUri.split(",")[1];
            setBase64Output(base64);
        };
        reader.readAsDataURL(file);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }, [handleFile]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const getFormattedOutput = (): string => {
        if (!base64Output || !mimeType) return "";

        const dataUri = `data:${mimeType};base64,${base64Output}`;

        switch (outputFormat) {
            case "datauri":
                return dataUri;
            case "raw":
                return base64Output;
            case "css":
                return `background-image: url('${dataUri}');`;
            case "html":
                return `<img src="${dataUri}" alt="${fileName}" />`;
            case "markdown":
                return `![${fileName}](${dataUri})`;
            default:
                return dataUri;
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(getFormattedOutput());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            console.error("Failed to copy");
        }
    };

    const downloadBase64 = () => {
        const output = getFormattedOutput();
        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName.split(".")[0]}-base64.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const reset = () => {
        setBase64Output("");
        setMimeType("");
        setFileName("");
        setFileSize(0);
        setPreviewUrl("");
    };

    const formatBytes = (bytes: number): string => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    };

    const base64Size = base64Output ? Math.ceil(base64Output.length * 3 / 4) : 0;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                    Image to Base64 Converter
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
                    Convert images to Base64 strings instantly. Embed images directly in HTML, CSS, or Markdown. Zero server upload.
                </p>
            </div>

            {/* Upload Area */}
            {!base64Output ? (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
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

                    <div className="absolute top-4 right-4 w-16 h-16 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))]/10 to-transparent rotate-12 pointer-events-none" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-lg bg-gradient-to-tr from-[hsl(var(--primary))]/10 to-transparent -rotate-12 pointer-events-none" />

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />

                    <div className="relative z-10 space-y-4">
                        <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/5 flex items-center justify-center shadow-lg">
                            <FileImage className="w-10 h-10 text-[hsl(var(--primary))]" />
                        </div>
                        <div>
                            <p className="text-xl font-semibold text-[hsl(var(--foreground))]">
                                Drop your image here
                            </p>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                                or click to browse
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                            <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">PNG</span>
                            <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">JPG</span>
                            <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">GIF</span>
                            <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">WebP</span>
                            <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">SVG</span>
                        </div>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">
                            Your image never leaves your browser - 100% private
                        </p>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Preview & Info */}
                    <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                        {/* Image Preview */}
                        <div className="flex-shrink-0">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="max-w-48 max-h-48 rounded-xl border border-[hsl(var(--border))] object-contain"
                            />
                        </div>

                        {/* File Info */}
                        <div className="flex-1 space-y-3">
                            <h3 className="font-semibold text-[hsl(var(--foreground))] truncate">{fileName}</h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-[hsl(var(--muted-foreground))]">Original Size</p>
                                    <p className="font-medium text-[hsl(var(--foreground))]">{formatBytes(fileSize)}</p>
                                </div>
                                <div>
                                    <p className="text-[hsl(var(--muted-foreground))]">Base64 Size</p>
                                    <p className="font-medium text-[hsl(var(--foreground))]">{formatBytes(base64Size)}</p>
                                </div>
                                <div>
                                    <p className="text-[hsl(var(--muted-foreground))]">MIME Type</p>
                                    <p className="font-medium text-[hsl(var(--foreground))]">{mimeType}</p>
                                </div>
                                <div>
                                    <p className="text-[hsl(var(--muted-foreground))]">Characters</p>
                                    <p className="font-medium text-[hsl(var(--foreground))]">{base64Output.length.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Output Format Selector */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {(["datauri", "raw", "css", "html", "markdown"] as OutputFormat[]).map((format) => (
                            <button
                                key={format}
                                onClick={() => setOutputFormat(format)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${outputFormat === format
                                    ? "bg-[hsl(var(--primary))] text-white"
                                    : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/80"
                                    }`}
                            >
                                {format === "datauri" ? "Data URI" : format.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Output */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
                                <Code2 className="w-4 h-4 text-[hsl(var(--primary))]" />
                                Base64 Output
                            </label>
                            <div className="flex gap-2">
                                <button
                                    onClick={copyToClipboard}
                                    className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] flex items-center gap-1"
                                >
                                    {copied ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                                    {copied ? "Copied!" : "Copy"}
                                </button>
                                <button
                                    onClick={downloadBase64}
                                    className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] flex items-center gap-1"
                                >
                                    <Download className="w-3 h-3" />
                                    Download
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={getFormattedOutput()}
                            readOnly
                            className="w-full h-48 p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 font-mono text-xs resize-none"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Button
                            onClick={copyToClipboard}
                            className="px-8 py-6 text-lg bg-gradient-primary shadow-glow hover:opacity-90"
                        >
                            {copied ? <CheckCircle className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2" />}
                            {copied ? "Copied!" : "Copy Base64"}
                        </Button>
                        <Button variant="outline" onClick={reset}>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            New Image
                        </Button>
                    </div>
                </div>
            )}

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                    { label: "Instant Convert", desc: "No upload, no waiting" },
                    { label: "100% Private", desc: "Runs in your browser" },
                    { label: "Multiple Formats", desc: "Data URI, CSS, HTML" },
                    { label: "All Images", desc: "PNG, JPG, GIF, WebP, SVG" },
                ].map((feature, i) => (
                    <div key={i} className="p-3 rounded-lg bg-[hsl(var(--muted))]/30">
                        <p className="font-medium text-[hsl(var(--foreground))] text-sm">{feature.label}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">{feature.desc}</p>
                    </div>
                ))}
            </div>

            {/* Privacy Badge */}
            {!base64Output && <PrivacyBadge />}
        </div>
    );
}
