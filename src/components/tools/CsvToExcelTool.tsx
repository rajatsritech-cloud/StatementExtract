"use client";

import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";
import { FileSpreadsheet, Upload, Download, AlertCircle, CheckCircle, Settings, FileText, Loader2, CheckCircle2, Info, X, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const CsvToExcelTool = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);
    const [previewData, setPreviewData] = useState<string[][]>([]);
    const [error, setError] = useState<string | null>(null);
    const [preserveZeros, setPreserveZeros] = useState(true);
    const [isDragActive, setIsDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (selectedFile: File) => {
        if (selectedFile) {
            if (selectedFile.type === "text/csv" || selectedFile.name.endsWith(".csv")) {
                setFile(selectedFile);
                setConvertedFileUrl(null);
                setPreviewData([]);
                setError(null);

                try {
                    const text = await selectedFile.text();
                    const workbook = XLSX.read(text, { type: "string" });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];
                    setPreviewData(data.slice(0, 5));
                } catch (err) {
                    console.error("Preview error:", err);
                    // Non-blocking error for preview
                }
            } else {
                setError("Please upload a valid CSV file.");
            }
        }
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragActive(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragActive(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const convertToExcel = async () => {
        if (!file) return;

        setIsConverting(true);
        setError(null);

        try {
            const text = await file.text();

            const readOpts: XLSX.ParsingOptions = {
                raw: preserveZeros,
                type: 'string'
            };

            const workbook = XLSX.read(text, { type: "string" });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            const newWorkbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(newWorkbook, worksheet, "Sheet1");

            const excelBuffer = XLSX.write(newWorkbook, { bookType: "xlsx", type: "array" });
            const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            const url = URL.createObjectURL(blob);

            setConvertedFileUrl(url);
        } catch (err) {
            console.error(err);
            setError("Failed to convert file. Please ensure it's a valid CSV.");
        } finally {
            setIsConverting(false);
        }
    };

    const reset = () => {
        setFile(null);
        setConvertedFileUrl(null);
        setPreviewData([]);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            {!file ? (
                <>
                    {/* Header */}
                    <div className="text-center mb-4">
                        <Breadcrumb
                            items={[
                                { label: "All Converters", href: "/convert" },
                                { label: "CSV to Excel" }
                            ]}
                        />
                        <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                            Convert CSV to Excel Online
                        </h1>
                        <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto font-normal">
                            Turn raw CSV data into formatted Excel spreadsheets. Preserve leading zeros, dates, and special characters.
                        </h2>
                    </div>

                    {/* Upload Zone */}
                    <div
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all duration-200 overflow-hidden ${isDragActive
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
                            type="file"
                            ref={fileInputRef}
                            onChange={onInputChange}
                            accept=".csv"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />

                        <div className="relative z-10 space-y-4">
                            <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/5 flex items-center justify-center shadow-lg">
                                {isConverting ? (
                                    <Loader2 className="w-10 h-10 text-[hsl(var(--primary))] animate-spin" />
                                ) : (
                                    <Upload className="w-10 h-10 text-[hsl(var(--primary))]" />
                                )}
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-[hsl(var(--foreground))]">
                                    {isDragActive ? "Drop your CSV file here" : "Drop CSV file here"}
                                </p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                                    or click to browse • Supports .csv files
                                </p>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            <p className="text-red-500">{error}</p>
                        </div>
                    )}

                    {/* Privacy Info */}
                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                        <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>Fully Client-Side</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>No Upload Required</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                            <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Private</span>
                        </div>
                    </div>
                    <PrivacyBadge />
                </>
            ) : (
                /* Conversion & Success View */
                <div className="space-y-6">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-[hsl(var(--primary))]" />
                            <span className="font-medium text-[hsl(var(--foreground))]">{file.name}</span>
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">
                                ({(file.size / 1024).toFixed(2)} KB)
                            </span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={reset}>
                            <X className="w-4 h-4 mr-1" /> Start Over
                        </Button>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[hsl(var(--muted))]/30 border border-[hsl(var(--border))]">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="smartFormat"
                                checked={preserveZeros}
                                onChange={(e) => setPreserveZeros(e.target.checked)}
                                className="rounded border-[hsl(var(--border))]"
                            />
                            <label htmlFor="smartFormat" className="text-sm font-medium cursor-pointer flex items-center gap-1">
                                Smart Formatting (Preserve '00123')
                                <Info className="w-3 h-3 text-[hsl(var(--muted-foreground))]" />
                            </label>
                        </div>
                    </div>

                    {/* Data Preview (Always Visible) */}
                    {previewData.length > 0 && (
                        <div className="rounded-xl border border-[hsl(var(--border))] overflow-hidden">
                            <div className="bg-[hsl(var(--muted))]/30 px-6 py-4 border-b border-[hsl(var(--border))] flex items-center gap-2">
                                <Table className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                                <h4 className="font-semibold text-[hsl(var(--foreground))]">Data Preview (First 5 Rows)</h4>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <tbody>
                                        {previewData.map((row, i) => (
                                            <tr key={i} className="border-b border-[hsl(var(--border))] last:border-0 hover:bg-[hsl(var(--muted))]/20">
                                                {row.map((cell: any, j: number) => (
                                                    <td key={j} className="px-6 py-3 whitespace-nowrap text-[hsl(var(--foreground))] border-r border-[hsl(var(--border))] last:border-0">
                                                        {String(cell)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {convertedFileUrl ? (
                        <div className="space-y-6">
                            <div className="text-center p-8 bg-[hsl(var(--primary))]/10 rounded-2xl border border-[hsl(var(--primary))]/20">
                                <div className="w-16 h-16 bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-2">
                                    Ready to Download!
                                </h3>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                                    <a
                                        href={convertedFileUrl}
                                        download={`${file.name.replace(/\.csv$/, "")}.xlsx`}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[hsl(var(--primary))] text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download Excel
                                    </a>
                                    <Button
                                        onClick={reset}
                                        variant="outline"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-3"
                                    >
                                        Convert Another File
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <Button
                                onClick={convertToExcel}
                                disabled={isConverting}
                                className="w-full py-6 text-lg font-bold bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90"
                            >
                                {isConverting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Converting...
                                    </>
                                ) : "Convert to Excel Now"}
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
