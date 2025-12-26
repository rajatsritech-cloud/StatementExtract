"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { FileUp, X, Download, Loader2, FileSpreadsheet, Plus, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";

interface QfxFile {
    id: string;
    file: File;
    name: string;
    size: string;
}

interface Transaction {
    date: string;
    amount: string;
    name: string;
    memo: string;
    type: string;
    checkNum: string;
    refNum: string;
}

export function QfxToPdfTool() {
    const [files, setFiles] = useState<QfxFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileListRef = useRef<HTMLDivElement>(null);

    const prevFileCount = useRef(0);
    useEffect(() => {
        if (files.length > prevFileCount.current) {
            setTimeout(() => {
                fileListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
        prevFileCount.current = files.length;
    }, [files.length]);

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    const handleFiles = useCallback((fileList: FileList | File[]) => {
        setError(null);
        const qfxFiles = Array.from(fileList).filter(f =>
            f.name.toLowerCase().endsWith(".qfx") ||
            f.name.toLowerCase().endsWith(".ofx") ||
            f.name.toLowerCase().endsWith(".qbo")
        );

        if (qfxFiles.length === 0) {
            setError("Please select .qfx, .ofx, or .qbo files only.");
            return;
        }

        const newFiles = qfxFiles.map(file => ({
            id: crypto.randomUUID(),
            file,
            name: file.name,
            size: formatFileSize(file.size),
        }));

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

    const parseQFX = async (file: File): Promise<{ transactions: Transaction[], accountInfo: any }> => {
        const text = await file.text();
        const transactions: Transaction[] = [];

        // Parse account info
        const getBankId = () => {
            const m = text.match(/<BANKID>\s*([^<\r\n]+)/);
            return m ? m[1].trim() : "";
        };
        const getAcctId = () => {
            const m = text.match(/<ACCTID>\s*([^<\r\n]+)/);
            return m ? m[1].trim() : "";
        };

        const accountInfo = {
            bankId: getBankId(),
            accountId: getAcctId(),
        };

        // Find all STMTTRN blocks
        const trnRegex = /<STMTTRN>([\s\S]*?)<\/STMTTRN>/g;
        let match;

        while ((match = trnRegex.exec(text)) !== null) {
            const block = match[1];

            const getDate = (tag: string) => {
                const m = block.match(new RegExp(`<${tag}>\\s*([^<\r\n]+)`));
                if (!m) return "";
                const d = m[1].trim();
                if (d.length >= 8) {
                    return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
                }
                return d;
            };

            const getValue = (tag: string) => {
                const m = block.match(new RegExp(`<${tag}>\\s*([^<\r\n]+)`));
                return m ? m[1].trim() : "";
            };

            transactions.push({
                date: getDate("DTPOSTED"),
                amount: getValue("TRNAMT"),
                name: getValue("NAME"),
                memo: getValue("MEMO"),
                type: getValue("TRNTYPE"),
                checkNum: getValue("CHECKNUM"),
                refNum: getValue("REFNUM") || getValue("FITID"),
            });
        }

        return { transactions, accountInfo };
    };

    const generatePDF = (transactions: Transaction[], accountInfo: any, fileName: string): void => {
        // Create a simple HTML-based PDF using print
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            throw new Error('Please allow popups to generate PDF');
        }

        const formatAmount = (amount: string) => {
            const num = parseFloat(amount);
            if (isNaN(num)) return amount;
            return num < 0
                ? `-$${Math.abs(num).toFixed(2)}`
                : `$${num.toFixed(2)}`;
        };

        const totalCredits = transactions
            .filter(t => parseFloat(t.amount) > 0)
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        const totalDebits = transactions
            .filter(t => parseFloat(t.amount) < 0)
            .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0);

        const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Transaction Report - ${fileName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #1a1a1a; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 20px; }
        .header h1 { font-size: 24px; color: #1e40af; margin-bottom: 8px; }
        .header p { color: #6b7280; font-size: 14px; }
        .account-info { display: flex; justify-content: space-between; margin-bottom: 20px; padding: 15px; background: #f8fafc; border-radius: 8px; }
        .account-info div { text-align: center; }
        .account-info label { font-size: 12px; color: #6b7280; display: block; }
        .account-info span { font-weight: 600; color: #1e40af; }
        .summary { display: flex; justify-content: space-around; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; }
        .summary-item { text-align: center; }
        .summary-item .label { font-size: 12px; color: #6b7280; margin-bottom: 4px; }
        .summary-item .value { font-size: 20px; font-weight: 700; }
        .credits { color: #16a34a; }
        .debits { color: #dc2626; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { background: #1e40af; color: white; padding: 12px 8px; text-align: left; font-size: 12px; text-transform: uppercase; }
        td { padding: 10px 8px; border-bottom: 1px solid #e5e7eb; font-size: 13px; }
        tr:nth-child(even) { background: #f9fafb; }
        .amount-positive { color: #16a34a; font-weight: 600; }
        .amount-negative { color: #dc2626; font-weight: 600; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 20px; }
        @media print { body { padding: 20px; } .no-print { display: none; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>Transaction Report</h1>
        <p>Generated from ${fileName} • ${new Date().toLocaleDateString()}</p>
    </div>
    
    ${accountInfo.bankId || accountInfo.accountId ? `
    <div class="account-info">
        <div><label>Bank ID</label><span>${accountInfo.bankId || 'N/A'}</span></div>
        <div><label>Account</label><span>${accountInfo.accountId ? '****' + accountInfo.accountId.slice(-4) : 'N/A'}</span></div>
        <div><label>Transactions</label><span>${transactions.length}</span></div>
    </div>
    ` : ''}
    
    <div class="summary">
        <div class="summary-item">
            <div class="label">Total Credits</div>
            <div class="value credits">$${totalCredits.toFixed(2)}</div>
        </div>
        <div class="summary-item">
            <div class="label">Total Debits</div>
            <div class="value debits">$${totalDebits.toFixed(2)}</div>
        </div>
        <div class="summary-item">
            <div class="label">Net Change</div>
            <div class="value" style="color: ${totalCredits - totalDebits >= 0 ? '#16a34a' : '#dc2626'}">
                ${totalCredits - totalDebits >= 0 ? '+' : ''}$${(totalCredits - totalDebits).toFixed(2)}
            </div>
        </div>
    </div>
    
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th style="text-align: right;">Amount</th>
            </tr>
        </thead>
        <tbody>
            ${transactions.map(t => `
                <tr>
                    <td>${t.date}</td>
                    <td>${t.name || t.memo || '-'}</td>
                    <td>${t.type || '-'}</td>
                    <td style="text-align: right;" class="${parseFloat(t.amount) >= 0 ? 'amount-positive' : 'amount-negative'}">
                        ${formatAmount(t.amount)}
                    </td>
                </tr>
            `).join('')}
        </tbody>
    </table>
    
    <div class="footer">
        <p>Generated by Statement Extract • statementextract.com</p>
        <p>This report was created from a QFX/OFX file. Please verify all transactions.</p>
    </div>
    
    <script>
        window.onload = function() { window.print(); }
    </script>
</body>
</html>`;

        printWindow.document.write(html);
        printWindow.document.close();
    };

    const convertFiles = async () => {
        if (files.length === 0) return;

        setIsProcessing(true);
        setError(null);

        try {
            for (const qfxFile of files) {
                try {
                    const { transactions, accountInfo } = await parseQFX(qfxFile.file);

                    if (transactions.length === 0) {
                        throw new Error(`No transactions found in ${qfxFile.name}`);
                    }

                    generatePDF(transactions, accountInfo, qfxFile.name);
                } catch (err: any) {
                    console.error(err);
                    setError(err.message || `Failed to process ${qfxFile.name}`);
                }
            }
        } catch (err) {
            setError("An error occurred during conversion.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                    QFX to PDF Converter
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
                    Convert <strong>QFX to PDF</strong> online. Transform Quicken files into clean, printable transaction reports. 100% free and private.
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
                <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.3) 1px, transparent 0)`,
                        backgroundSize: '24px 24px',
                    }}
                />

                <input
                    type="file"
                    accept=".qfx,.ofx,.qbo"
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
                            Drop your QFX files here
                        </p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                            or click to browse
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.QFX</span>
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.OFX</span>
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.QBO</span>
                        <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Client-side only</span>
                    </div>
                </div>
            </div>

            <PrivacyBadge />

            {error && (
                <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                    {error}
                </div>
            )}

            {files.length > 0 && (
                <div className="mt-6" ref={fileListRef}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-[hsl(var(--foreground))]">
                            {files.length} file{files.length > 1 ? "s" : ""} selected
                        </h2>
                        <Button variant="ghost" size="sm" onClick={clearAll} className="text-[hsl(var(--muted-foreground))]">
                            <Trash2 className="w-4 h-4 mr-1" /> Clear All
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {files.map((file) => (
                            <div
                                key={file.id}
                                className="flex items-center gap-3 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]"
                            >
                                <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10">
                                    <FileText className="w-5 h-5 text-[hsl(var(--primary))]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-[hsl(var(--foreground))] truncate">{file.name}</p>
                                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                                        {file.size}
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeFile(file.id)}
                                    className="p-1.5 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                                >
                                    <X className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <label className="mt-4 flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-[hsl(var(--border))] cursor-pointer hover:border-[hsl(var(--primary))]/50 transition-colors">
                        <input
                            type="file"
                            accept=".qfx,.ofx,.qbo"
                            multiple
                            onChange={handleFileInput}
                            className="hidden"
                        />
                        <Plus className="w-5 h-5 text-[hsl(var(--primary))]" />
                        <span className="text-[hsl(var(--primary))] font-medium">Add more files</span>
                    </label>

                    <Button
                        onClick={convertFiles}
                        disabled={isProcessing}
                        className="w-full mt-6 h-14 text-lg bg-gradient-primary shadow-glow hover:opacity-90"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Generating PDF...
                            </>
                        ) : (
                            <>
                                <Download className="w-5 h-5 mr-2" />
                                Convert to PDF
                            </>
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
}
