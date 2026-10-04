"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { FileUp, X, Download, Loader2, FileText, Plus, Trash2, Settings2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";


interface OfxFile {
    id: string;
    file: File;
    name: string;
    size: string;
    transactionCount?: number;
}

interface AccountSettings {
    bankId: string;
    accountId: string;
    accountType: "CHECKING" | "SAVINGS" | "CREDITCARD" | "MONEYMRKT";
    currency: string;
}

const ACCOUNT_TYPES = [
    { value: "CHECKING", label: "Checking" },
    { value: "SAVINGS", label: "Savings" },
    { value: "CREDITCARD", label: "Credit Card" },
    { value: "MONEYMRKT", label: "Money Market" },
];

const CURRENCIES = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "CAD", label: "CAD - Canadian Dollar" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "AUD", label: "AUD - Australian Dollar" },
];

export function OfxToQboTool({ hideHeader = false }: { hideHeader?: boolean } = {}) {
    const [files, setFiles] = useState<OfxFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [showSettings, setShowSettings] = useState(false);
    const [accountSettings, setAccountSettings] = useState<AccountSettings>({
        bankId: "",
        accountId: "",
        accountType: "CHECKING",
        currency: "USD",
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
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

    // Parse OFX file and extract transactions
    const parseOfxFile = async (file: File): Promise<{
        transactions: any[];
        bankId: string;
        accountId: string;
        currency: string;
        accountType: string;
    }> => {
        const text = await file.text();
        const transactions: any[] = [];

        const getValue = (content: string, tag: string): string => {
            const regex = new RegExp(`<${tag}>\\s*([^<\\r\\n]+)`);
            const match = content.match(regex);
            return match ? match[1].trim() : "";
        };

        // Get account info from OFX
        const bankId = getValue(text, "BANKID") || accountSettings.bankId || "000000000";
        const acctId = getValue(text, "ACCTID") || accountSettings.accountId || "000000000";
        const currency = getValue(text, "CURDEF") || accountSettings.currency || "USD";
        const acctType = getValue(text, "ACCTTYPE") || accountSettings.accountType || "CHECKING";

        const trnRegex = /<STMTTRN>([\s\S]*?)<\/STMTTRN>/g;
        let match;

        while ((match = trnRegex.exec(text)) !== null) {
            const block = match[1];

            const getDate = (tag: string) => {
                const val = getValue(block, tag);
                if (val.length >= 8) {
                    return `${val.slice(0, 4)}-${val.slice(4, 6)}-${val.slice(6, 8)}`;
                }
                return val;
            };

            transactions.push({
                date: getDate("DTPOSTED"),
                rawDate: getValue(block, "DTPOSTED"),
                amount: getValue(block, "TRNAMT"),
                name: getValue(block, "NAME"),
                memo: getValue(block, "MEMO"),
                type: getValue(block, "TRNTYPE"),
                checkNum: getValue(block, "CHECKNUM"),
                fitId: getValue(block, "FITID"),
                refNum: getValue(block, "REFNUM"),
            });
        }

        return { transactions, bankId, accountId: acctId, currency, accountType: acctType };
    };

    // Generate QBO from transactions
    const generateQBO = (
        transactions: any[],
        settings: { bankId: string; accountId: string; currency: string; accountType: string }
    ): string => {
        const now = new Date();
        const dateStr = now.toISOString().replace(/[-:T]/g, '').slice(0, 14);

        const sortedTxns = [...transactions].sort((a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        const dtStart = sortedTxns[0]?.rawDate?.slice(0, 8) || dateStr.slice(0, 8);
        const dtEnd = sortedTxns[sortedTxns.length - 1]?.rawDate?.slice(0, 8) || dateStr.slice(0, 8);

        let qbo = `OFXHEADER:100
DATA:OFXSGML
VERSION:102
SECURITY:NONE
ENCODING:USASCII
CHARSET:1252
COMPRESSION:NONE
OLDFILEUID:NONE
NEWFILEUID:NONE

<OFX>
  <SIGNONMSGSRSV1>
<SONRS>
  <STATUS>
    <CODE>0</CODE>
    <SEVERITY>INFO</SEVERITY>
  </STATUS>
  <DTSERVER>${dateStr}</DTSERVER>
  <LANGUAGE>ENG</LANGUAGE>
  <INTU.BID>3000</INTU.BID>
</SONRS>
  </SIGNONMSGSRSV1>
  <BANKMSGSRSV1>
<STMTTRNRS>
  <TRNUID>1</TRNUID>
  <STATUS>
    <CODE>0</CODE>
    <SEVERITY>INFO</SEVERITY>
  </STATUS>
  <STMTRS>
    <CURDEF>${settings.currency}</CURDEF>
    <BANKACCTFROM>
      <BANKID>${settings.bankId}</BANKID>
      <ACCTID>${settings.accountId}</ACCTID>
      <ACCTTYPE>${settings.accountType}</ACCTTYPE>
    </BANKACCTFROM>
    <BANKTRANLIST>
      <DTSTART>${dtStart}</DTSTART>
      <DTEND>${dtEnd}</DTEND>
`;

        sortedTxns.forEach((txn, idx) => {
            const amount = parseFloat(txn.amount.replace(/[^\-\d.]/g, ''));
            const trnType = txn.type || (amount >= 0 ? 'CREDIT' : 'DEBIT');
            const fitId = txn.fitId || `${txn.rawDate?.slice(0, 8) || dtEnd}${idx.toString().padStart(4, '0')}`;
            const dtPosted = txn.rawDate || (txn.date.replace(/-/g, '') + '120000');

            qbo += `      <STMTTRN>
        <TRNTYPE>${trnType}</TRNTYPE>
        <DTPOSTED>${dtPosted}</DTPOSTED>
        <TRNAMT>${amount.toFixed(2)}</TRNAMT>
        <FITID>${fitId}</FITID>
        <NAME>${(txn.name || '').substring(0, 32)}</NAME>
        <MEMO>${(txn.memo || txn.name || '').substring(0, 255)}</MEMO>
      </STMTTRN>
`;
        });

        qbo += `    </BANKTRANLIST>
    <LEDGERBAL>
      <BALAMT>0.00</BALAMT>
      <DTASOF>${dtEnd}120000</DTASOF>
    </LEDGERBAL>
  </STMTRS>
</STMTTRNRS>
  </BANKMSGSRSV1>
</OFX>`;

        return qbo;
    };

    const handleFiles = useCallback(async (fileList: FileList | File[]) => {
        setError(null);
        setSuccess(null);
        const validFiles = Array.from(fileList).filter(f =>
            f.name.toLowerCase().endsWith(".ofx") ||
            f.name.toLowerCase().endsWith(".qfx")
        );

        if (validFiles.length === 0) {
            setError("Please select .ofx or .qfx files only.");
            return;
        }

        const newFiles: OfxFile[] = [];
        for (const file of validFiles) {
            try {
                const parsed = await parseOfxFile(file);

                // Auto-populate settings from first file
                if (files.length === 0 && newFiles.length === 0) {
                    setAccountSettings({
                        bankId: parsed.bankId || accountSettings.bankId,
                        accountId: parsed.accountId || accountSettings.accountId,
                        accountType: (parsed.accountType as any) || accountSettings.accountType,
                        currency: parsed.currency || accountSettings.currency,
                    });
                }

                newFiles.push({
                    id: crypto.randomUUID(),
                    file,
                    name: file.name,
                    size: formatFileSize(file.size),
                    transactionCount: parsed.transactions.length,
                });
            } catch (err) {
                setError(`Failed to parse ${file.name}: ${err instanceof Error ? err.message : 'Unknown error'}`);
            }
        }

        setFiles(prev => [...prev, ...newFiles]);
    }, [files.length, accountSettings]);

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
        setSuccess(null);
    };

    const downloadQbo = (content: string, originalFileName: string) => {
        const blob = new Blob([content], { type: "application/x-ofx" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = originalFileName.replace(/\.(ofx|qfx)$/i, "") + ".qbo";
        a.click();
        URL.revokeObjectURL(url);
    };

    const convertAll = async () => {
        setIsProcessing(true);
        setError(null);
        setSuccess(null);

        try {
            let totalTransactions = 0;
            for (const ofxFile of files) {
                const parsed = await parseOfxFile(ofxFile.file);
                if (parsed.transactions.length === 0) {
                    throw new Error(`No transactions found in ${ofxFile.name}`);
                }
                const qboContent = generateQBO(parsed.transactions, {
                    bankId: accountSettings.bankId || parsed.bankId,
                    accountId: accountSettings.accountId || parsed.accountId,
                    currency: accountSettings.currency || parsed.currency,
                    accountType: accountSettings.accountType || parsed.accountType,
                });
                downloadQbo(qboContent, ofxFile.name);
                totalTransactions += parsed.transactions.length;
            }
            setSuccess(`Successfully converted ${files.length} file(s) with ${totalTransactions} transactions to QBO format!`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Conversion failed");
        } finally {
            setIsProcessing(false);
        }
    };

    const convertSingle = async (ofxFile: OfxFile) => {
        setIsProcessing(true);
        setError(null);
        setSuccess(null);

        try {
            const parsed = await parseOfxFile(ofxFile.file);
            if (parsed.transactions.length === 0) {
                throw new Error(`No transactions found in ${ofxFile.name}`);
            }
            const qboContent = generateQBO(parsed.transactions, {
                bankId: accountSettings.bankId || parsed.bankId,
                accountId: accountSettings.accountId || parsed.accountId,
                currency: accountSettings.currency || parsed.currency,
                accountType: accountSettings.accountType || parsed.accountType,
            });
            downloadQbo(qboContent, ofxFile.name);
            setSuccess(`Converted ${ofxFile.name} with ${parsed.transactions.length} transactions to QBO!`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Conversion failed");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {!hideHeader && (
                <div className="text-center mb-4">
                    <Breadcrumb
                        items={[
                            { label: "All Converters", href: "/convert" },
                            { label: "OFX to QBO" }
                        ]}
                    />
                    <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                        OFX to QBO Converter Online Free
                    </h1>
                    <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto font-normal">
                        Convert OFX bank files to QuickBooks QBO format instantly.
                        <br />
                        <span className="text-sm">Fully Client-Side processing. Your data never leaves your device.</span>
                    </h2>
                </div>
            )}

            {/* Upload Zone (shown when no file) */}
            {files.length === 0 && (
                <>
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all duration-200 overflow-hidden ${isDragging
                            ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5"
                            : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--muted))]/30"
                            }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div
                            className="absolute inset-0 opacity-30 pointer-events-none"
                            style={{
                                backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.3) 1px, transparent 0)`,
                                backgroundSize: '24px 24px',
                            }}
                        />

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".ofx,.qfx"
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
                                    Drop OFX or QFX files here
                                </p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                                    or click to browse
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.OFX</span>
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.QFX</span>
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">→ .QBO</span>
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Private</span>
                            </div>
                        </div>
                    </div>
                    <PrivacyBadge />
                </>
            )}

            {success && (
                <div className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    {success}
                </div>
            )}

            {error && (
                <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-center">
                    {error}
                </div>
            )}

            {files.length > 0 && (
                <div ref={fileListRef} className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                            Files to Convert ({files.length})
                        </h3>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowSettings(!showSettings)}
                            >
                                <Settings2 className="w-4 h-4 mr-1" />
                                Settings
                            </Button>
                            <Button variant="outline" size="sm" onClick={clearAll}>
                                <Trash2 className="w-4 h-4 mr-1" />
                                Clear
                            </Button>
                            <Button
                                size="sm"
                                onClick={convertAll}
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Converting...
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-4 h-4 mr-2" />
                                        Convert All to QBO
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {showSettings && (
                        <div className="p-4 rounded-xl bg-[hsl(var(--muted))]/50 border border-[hsl(var(--border))] space-y-4">
                            <h4 className="font-medium text-[hsl(var(--foreground))]">Account Settings (Optional)</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1">Bank ID</label>
                                    <input
                                        type="text"
                                        value={accountSettings.bankId}
                                        onChange={(e) => setAccountSettings({ ...accountSettings, bankId: e.target.value })}
                                        placeholder="Auto-detected"
                                        className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1">Account ID</label>
                                    <input
                                        type="text"
                                        value={accountSettings.accountId}
                                        onChange={(e) => setAccountSettings({ ...accountSettings, accountId: e.target.value })}
                                        placeholder="Auto-detected"
                                        className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1">Account Type</label>
                                    <select
                                        value={accountSettings.accountType}
                                        onChange={(e) => setAccountSettings({ ...accountSettings, accountType: e.target.value as any })}
                                        className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-sm"
                                    >
                                        {ACCOUNT_TYPES.map(t => (
                                            <option key={t.value} value={t.value}>{t.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1">Currency</label>
                                    <select
                                        value={accountSettings.currency}
                                        onChange={(e) => setAccountSettings({ ...accountSettings, currency: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-sm"
                                    >
                                        {CURRENCIES.map(c => (
                                            <option key={c.value} value={c.value}>{c.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        {files.map(file => (
                            <div
                                key={file.id}
                                className="flex items-center justify-between p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="w-8 h-8 text-blue-600" />
                                    <div>
                                        <p className="font-medium text-[hsl(var(--foreground))]">{file.name}</p>
                                        <p className="text-xs text-[hsl(var(--muted-foreground))]">
                                            {file.size} • {file.transactionCount} transactions
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => convertSingle(file)}
                                        disabled={isProcessing}
                                    >
                                        <Download className="w-4 h-4 mr-1" />
                                        QBO
                                    </Button>
                                    <button
                                        onClick={() => removeFile(file.id)}
                                        className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-red-500 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[hsl(var(--border))] rounded-xl text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary))]/50 hover:text-[hsl(var(--foreground))] transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add More Files
                    </button>
                </div>
            )}
        </div>
    );
}
