"use client";

import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";
import { FileText, Upload, Download, AlertCircle, CheckCircle, Loader2, CheckCircle2, User, Table, X, Contact } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Contact {
    [key: string]: string;
}

export const VcfToCsvTool = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);
    const [previewData, setPreviewData] = useState<string[][]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isDragActive, setIsDragActive] = useState(false);
    const [stats, setStats] = useState({ count: 0 });
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Robust VCF Parsing Logic
    const parseVCF = (content: string): Contact[] => {
        const contacts: Contact[] = [];
        // Normalize line endings and split by VCARD boundaries
        const cards = content.replace(/\r\n/g, "\n").split(/BEGIN:VCARD/i);

        cards.forEach((card) => {
            if (!card.trim()) return;

            const contact: Contact = {};
            const lines = card.split("\n");

            lines.forEach((line) => {
                // Simple parser for standard fields (FN, EMAIL, TEL, ORG)
                // Ignores complex multi-line params for now to ensure 100% speed/stability

                if (line.startsWith("FN:")) contact["Full Name"] = line.substring(3).trim();
                else if (line.startsWith("N:") && !contact["Full Name"]) {
                    // Fallback to N if FN is missing
                    const parts = line.substring(2).split(";");
                    contact["Full Name"] = `${parts[1] || ""} ${parts[0] || ""}`.trim();
                }
                else if (line.match(/^EMAIL/i)) {
                    const email = line.split(":")[1];
                    if (email) contact["Email"] = email.trim();
                }
                else if (line.match(/^TEL/i)) {
                    const phone = line.split(":")[1];
                    if (phone) contact["Phone"] = phone.trim();
                }
                else if (line.match(/^ORG/i)) {
                    const org = line.split(":")[1];
                    if (org) contact["Organization"] = org.replace(/;/g, " ").trim();
                }
                else if (line.match(/^TITLE/i)) {
                    const title = line.split(":")[1];
                    if (title) contact["Job Title"] = title.trim();
                }
            });

            if (Object.keys(contact).length > 0) {
                contacts.push(contact);
            }
        });

        return contacts;
    };

    const handleFile = async (selectedFile: File) => {
        if (selectedFile) {
            if (selectedFile.name.toLowerCase().endsWith(".vcf") || selectedFile.name.toLowerCase().endsWith(".vcard")) {
                setFile(selectedFile);
                setConvertedFileUrl(null);
                setError(null);

                try {
                    const text = await selectedFile.text();
                    const parsedContacts = parseVCF(text);

                    if (parsedContacts.length === 0) {
                        setError("No valid contacts found in this file.");
                        return;
                    }

                    setStats({ count: parsedContacts.length });

                    // Prepare Preview Data (Header + first 5 rows)
                    const headers = ["Full Name", "Phone", "Email", "Organization", "Job Title"];
                    const previewRows = parsedContacts.slice(0, 5).map(c => [
                        c["Full Name"] || "",
                        c["Phone"] || "",
                        c["Email"] || "",
                        c["Organization"] || "",
                        c["Job Title"] || ""
                    ]);

                    setPreviewData([headers, ...previewRows]);

                } catch (err) {
                    console.error("Preview parse error:", err);
                    setError("Failed to parse the VCF file. Please ensure it is a valid vCard format.");
                }
            } else {
                setError("Please upload a valid .vcf or .vcard file.");
            }
        }
    };

    const convertToCsv = async () => {
        if (!file) return;

        setIsConverting(true);
        setError(null);

        try {
            const text = await file.text();
            const contacts = parseVCF(text);

            if (contacts.length === 0) {
                throw new Error("No contacts found");
            }

            // Normalize all contacts to have same headers
            const headers = ["Full Name", "Phone", "Email", "Organization", "Job Title"];
            const excelData = [
                headers,
                ...contacts.map(c => [
                    c["Full Name"] || "",
                    c["Phone"] || "",
                    c["Email"] || "",
                    c["Organization"] || "",
                    c["Job Title"] || ""
                ])
            ];

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(excelData);
            XLSX.utils.book_append_sheet(wb, ws, "Contacts");

            const csvOutput = XLSX.write(wb, { bookType: "csv", type: "array" });
            const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);

            setConvertedFileUrl(url);
        } catch (err) {
            console.error(err);
            setError("Conversion failed. Please try again.");
        } finally {
            setIsConverting(false);
        }
    };

    const reset = () => {
        setFile(null);
        setConvertedFileUrl(null);
        setPreviewData([]);
        setStats({ count: 0 });
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
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

    return (
        <div className="w-full max-w-5xl mx-auto">
            {!file ? (
                <>
                    <div className="text-center mb-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                            Convert VCF to Excel / CSV Online
                        </h1>
                        <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto font-normal">
                            Extract contacts from iPhone, Android, or Outlook VCF files into clean Excel spreadsheets. 100% private.
                        </h2>
                    </div>

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
                            accept=".vcf,.vcard"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />

                        <div className="relative z-10 space-y-4">
                            <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/5 flex items-center justify-center shadow-lg">
                                {isConverting ? (
                                    <Loader2 className="w-10 h-10 text-[hsl(var(--primary))] animate-spin" />
                                ) : (
                                    <Contact className="w-10 h-10 text-[hsl(var(--primary))]" />
                                )}
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-[hsl(var(--foreground))]">
                                    {isDragActive ? "Drop VCF file here" : "Drop .vcf or .vcard file here"}
                                </p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                                    or click to browse • Supports iPhone & Gmail Exports
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

                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                        <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>100% Client-Side</span>
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
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-[hsl(var(--primary))]" />
                            <span className="font-medium text-[hsl(var(--foreground))]">{file.name}</span>
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">
                                ({stats.count} Contacts Found)
                            </span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={reset}>
                            <X className="w-4 h-4 mr-1" /> Start Over
                        </Button>
                    </div>

                    {/* Data Preview */}
                    {previewData.length > 0 && (
                        <div className="rounded-xl border border-[hsl(var(--border))] overflow-hidden">
                            <div className="bg-[hsl(var(--muted))]/30 px-6 py-4 border-b border-[hsl(var(--border))] flex items-center gap-2">
                                <Table className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                                <h4 className="font-semibold text-[hsl(var(--foreground))]">Contact Preview</h4>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-[hsl(var(--muted))]/10 border-b border-[hsl(var(--border))]">
                                            {previewData[0].map((header, i) => (
                                                <th key={i} className="px-6 py-3 text-left font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider text-xs">
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {previewData.slice(1).map((row, i) => (
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
                                    Conversion Complete!
                                </h3>
                                <p className="text-[hsl(var(--muted-foreground))] mb-8">
                                    Successfully extracted <strong>{stats.count}</strong> contacts.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href={convertedFileUrl}
                                        download={`${file.name.replace(/\.(vcf|vcard)$/i, "")}.csv`}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[hsl(var(--primary))] text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download CSV
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
                                onClick={convertToCsv}
                                disabled={isConverting}
                                className="w-full py-6 text-lg font-bold bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90"
                            >
                                {isConverting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Converting...
                                    </>
                                ) : (
                                    "Convert to CSV/Excel Now"
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
