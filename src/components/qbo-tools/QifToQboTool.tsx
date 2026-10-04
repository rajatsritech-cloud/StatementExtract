"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";
import {
    Upload,
    Download,
    FileText,
    X,
    Loader2,
    AlertCircle,
    CheckCircle2,
    Trash2,
    GripVertical,
    Settings2,
    Info,
    AlertTriangle,
    FileSpreadsheet,
    Globe
} from "lucide-react";

// QIF Transaction interface
interface QifTransaction {
    id: string;
    date: string;
    rawDate: string;
    amount: string;
    payee: string;
    memo: string;
    checkNum: string;
    cleared: string;
    type: string;  // DEBIT or CREDIT
}

// Account settings for QBO export
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
    { value: "USD", label: "US Dollar (USD)" },
    { value: "GBP", label: "British Pound (GBP)" },
    { value: "EUR", label: "Euro (EUR)" },
    { value: "CAD", label: "Canadian Dollar (CAD)" },
    { value: "AUD", label: "Australian Dollar (AUD)" },
    { value: "INR", label: "Indian Rupee (INR)" },
];

// Month name mappings for parsing
const MONTH_NAMES: Record<string, string> = {
    'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'may': '05', 'jun': '06',
    'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12',
    'january': '01', 'february': '02', 'march': '03', 'april': '04', 'june': '06',
    'july': '07', 'august': '08', 'september': '09', 'october': '10', 'november': '11', 'december': '12'
};

// Parse QIF date to ISO format
const parseQifDate = (dateStr: string): string => {
    if (!dateStr) return '';
    const trimmed = dateStr.trim();
    const currentYear = new Date().getFullYear();

    // Format: M/D/YY or MM/DD/YY or M/D/YYYY or MM/DD/YYYY
    const slashMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})(?:\/|')(\d{2,4})$/);
    if (slashMatch) {
        const [, month, day, year] = slashMatch;
        const fullYear = year.length === 2 ? `20${year}` : year;
        return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    // Format: M-D-YY or MM-DD-YYYY
    const dashMatch = trimmed.match(/^(\d{1,2})-(\d{1,2})-(\d{2,4})$/);
    if (dashMatch) {
        const [, month, day, year] = dashMatch;
        const fullYear = year.length === 2 ? `20${year}` : year;
        return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    // Format: M/D (no year - assume current year)
    const noYearMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})$/);
    if (noYearMatch) {
        const [, month, day] = noYearMatch;
        return `${currentYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    // Format: D-MMM-YY or D-MMM-YYYY (e.g., 15-Jan-24)
    const monthNameMatch = trimmed.match(/^(\d{1,2})[-\/]([A-Za-z]{3,9})[-\/]?(\d{2,4})?$/i);
    if (monthNameMatch) {
        const [, day, monthStr, year] = monthNameMatch;
        const month = MONTH_NAMES[monthStr.toLowerCase()];
        if (month) {
            const fullYear = year ? (year.length === 2 ? `20${year}` : year) : currentYear.toString();
            return `${fullYear}-${month}-${day.padStart(2, '0')}`;
        }
    }

    // Already ISO format
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
        return trimmed;
    }

    return trimmed; // Return as-is if no format matched
};

// Parse QIF file content
const parseQifFile = (content: string): { transactions: QifTransaction[], accountType: string } => {
    const lines = content.split(/\r?\n/);
    const transactions: QifTransaction[] = [];
    let accountType = "Bank";

    let currentTxn: Partial<QifTransaction> = {};
    let txnIndex = 0;

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // Header line
        if (trimmed.startsWith('!Type:')) {
            accountType = trimmed.substring(6);
            continue;
        }

        const prefix = trimmed[0];
        const value = trimmed.substring(1);

        switch (prefix) {
            case 'D':
                currentTxn.rawDate = value;
                currentTxn.date = parseQifDate(value);
                break;
            case 'T':
            case 'U': // U is also amount in some QIF versions
                currentTxn.amount = value.replace(/,/g, '');
                break;
            case 'P':
                currentTxn.payee = value;
                break;
            case 'M':
                currentTxn.memo = value;
                break;
            case 'N':
                currentTxn.checkNum = value;
                break;
            case 'C':
                currentTxn.cleared = value;
                break;
            case '^':
                // End of transaction
                if (currentTxn.date || currentTxn.amount || currentTxn.payee) {
                    const amount = parseFloat(currentTxn.amount || '0');
                    transactions.push({
                        id: `txn-${txnIndex++}`,
                        date: currentTxn.date || '',
                        rawDate: currentTxn.rawDate || '',
                        amount: currentTxn.amount || '0',
                        payee: currentTxn.payee || '',
                        memo: currentTxn.memo || '',
                        checkNum: currentTxn.checkNum || '',
                        cleared: currentTxn.cleared || '',
                        type: amount >= 0 ? 'CREDIT' : 'DEBIT'
                    });
                }
                currentTxn = {};
                break;
        }
    }

    return { transactions, accountType };
};

export function QifToQboTool() {
    const [transactions, setTransactions] = useState<QifTransaction[]>([]);
    const [fileName, setFileName] = useState<string>("");
    const [qifAccountType, setQifAccountType] = useState<string>("Bank");
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasFile, setHasFile] = useState(false);
    const [editingCell, setEditingCell] = useState<{ row: number; field: keyof QifTransaction } | null>(null);
    const [draggedRow, setDraggedRow] = useState<number | null>(null);
    const [manualEdits, setManualEdits] = useState<Record<string, Partial<QifTransaction>>>({});

    // Account settings modal
    const [showAccountModal, setShowAccountModal] = useState(false);
    const [accountSettings, setAccountSettings] = useState<AccountSettings>({
        bankId: "",
        accountId: "",
        accountType: "CHECKING",
        currency: "USD",
    });
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [showInfoBanner, setShowInfoBanner] = useState(true);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Get transactions with manual edits applied
    const displayTransactions = useMemo(() => {
        return transactions.map(txn => {
            const edits = manualEdits[txn.id];
            if (edits) {
                return { ...txn, ...edits };
            }
            return txn;
        });
    }, [transactions, manualEdits]);

    // Validation summary
    const validationSummary = useMemo(() => {
        const issues: { row: number; field: string; message: string }[] = [];

        displayTransactions.forEach((txn, idx) => {
            const dateStr = txn.date.replace(/-/g, "");
            if (!dateStr || dateStr.length !== 8 || isNaN(parseInt(dateStr))) {
                issues.push({ row: idx + 1, field: "date", message: "Invalid date" });
            }

            const amount = parseFloat(txn.amount.replace(/[^-\d.]/g, ""));
            if (isNaN(amount) || amount === 0) {
                issues.push({ row: idx + 1, field: "amount", message: "Invalid amount" });
            }

            if (!txn.payee.trim()) {
                issues.push({ row: idx + 1, field: "payee", message: "Empty payee" });
            }
        });

        return {
            issues,
            invalidDates: issues.filter(i => i.field === "date").length,
            invalidAmounts: issues.filter(i => i.field === "amount").length,
            emptyPayees: issues.filter(i => i.field === "payee").length,
            isValid: issues.length === 0
        };
    }, [displayTransactions]);

    // Handle file upload
    const handleFileUpload = useCallback((file: File) => {
        if (!file.name.toLowerCase().endsWith('.qif')) {
            setError("Please upload a QIF file (.qif)");
            return;
        }

        setError(null);
        setIsProcessing(true);
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const { transactions: parsed, accountType } = parseQifFile(content);

                if (parsed.length === 0) {
                    setError("No transactions found in QIF file. Please check the file format.");
                    setIsProcessing(false);
                    return;
                }

                setTransactions(parsed);
                setQifAccountType(accountType);
                setManualEdits({});
                setHasFile(true);

                // Auto-set account type based on QIF header
                if (accountType.toLowerCase().includes('ccard') || accountType.toLowerCase().includes('credit')) {
                    setAccountSettings(prev => ({ ...prev, accountType: "CREDITCARD" }));
                } else if (accountType.toLowerCase().includes('saving')) {
                    setAccountSettings(prev => ({ ...prev, accountType: "SAVINGS" }));
                }

            } catch (err) {
                setError("Failed to parse QIF file. Please check the format.");
            }
            setIsProcessing(false);
        };
        reader.readAsText(file);
    }, []);

    // Drag and drop handlers
    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileUpload(file);
    }, [handleFileUpload]);

    const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileUpload(file);
    }, [handleFileUpload]);

    // Update transaction field
    const updateTransaction = useCallback((txnId: string, field: keyof QifTransaction, value: string) => {
        setManualEdits(prev => ({
            ...prev,
            [txnId]: { ...prev[txnId], [field]: value }
        }));
    }, []);

    // Delete transaction
    const deleteTransaction = useCallback((index: number) => {
        setTransactions(prev => prev.filter((_, i) => i !== index));
    }, []);

    // Row reordering
    const handleDragStart = useCallback((index: number) => {
        setDraggedRow(index);
    }, []);

    const handleDragOverRow = useCallback((e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedRow === null || draggedRow === index) return;

        setTransactions(prev => {
            const newTxns = [...prev];
            const [dragged] = newTxns.splice(draggedRow, 1);
            newTxns.splice(index, 0, dragged);
            return newTxns;
        });
        setDraggedRow(index);
    }, [draggedRow]);

    const handleDragEnd = useCallback(() => {
        setDraggedRow(null);
    }, []);

    // Generate QBO file
    const generateQBO = (): string => {
        const now = new Date();
        const dateStr = now.toISOString().replace(/[-:T]/g, '').slice(0, 14);

        const sortedTxns = [...displayTransactions].sort((a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        const dtStart = sortedTxns[0]?.date.replace(/-/g, '') || dateStr.slice(0, 8);
        const dtEnd = sortedTxns[sortedTxns.length - 1]?.date.replace(/-/g, '') || dateStr.slice(0, 8);

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
        <CURDEF>${accountSettings.currency}</CURDEF>
        <BANKACCTFROM>
          <BANKID>${accountSettings.bankId || "000000000"}</BANKID>
          <ACCTID>${accountSettings.accountId || "000000000"}</ACCTID>
          <ACCTTYPE>${accountSettings.accountType}</ACCTTYPE>
        </BANKACCTFROM>
        <BANKTRANLIST>
          <DTSTART>${dtStart}</DTSTART>
          <DTEND>${dtEnd}</DTEND>
`;

        sortedTxns.forEach((txn, idx) => {
            const amount = parseFloat(txn.amount.replace(/[^-\d.]/g, ''));
            const trnType = amount >= 0 ? 'CREDIT' : 'DEBIT';
            const fitId = `${txn.date.replace(/-/g, '')}${idx.toString().padStart(4, '0')}`;
            const dtPosted = txn.date.replace(/-/g, '') + '120000';

            qbo += `          <STMTTRN>
            <TRNTYPE>${trnType}</TRNTYPE>
            <DTPOSTED>${dtPosted}</DTPOSTED>
            <TRNAMT>${amount.toFixed(2)}</TRNAMT>
            <FITID>${fitId}</FITID>
            <NAME>${txn.payee.substring(0, 32)}</NAME>
            <MEMO>${(txn.memo || txn.payee).substring(0, 255)}</MEMO>
          </STMTTRN>
`;
        });

        qbo += `        </BANKTRANLIST>
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

    // Export QBO
    const handleExportClick = () => {
        if (displayTransactions.length === 0) {
            setError("No transactions to export.");
            return;
        }
        setValidationErrors([]);
        setShowAccountModal(true);
    };

    const exportQBO = () => {
        const errors: string[] = [];
        if (!accountSettings.bankId.match(/^\d{9}$/)) {
            errors.push("Bank routing number must be exactly 9 digits");
        }
        if (!accountSettings.accountId.trim()) {
            errors.push("Account number is required");
        }

        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }

        const qboContent = generateQBO();
        const blob = new Blob([qboContent], { type: "application/qbo" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName.replace(/\.qif$/i, '') + ".qbo";
        a.click();
        URL.revokeObjectURL(url);
        setShowAccountModal(false);
    };

    // Reset
    const reset = () => {
        setTransactions([]);
        setFileName("");
        setHasFile(false);
        setError(null);
        setManualEdits({});
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Account Settings Modal */}
            {showAccountModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[hsl(var(--card))] rounded-2xl p-6 max-w-md w-full border border-[hsl(var(--border))]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">Account Settings</h3>
                            <button onClick={() => setShowAccountModal(false)} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                            Enter your bank account details for QuickBooks to properly match transactions.
                        </p>

                        {validationErrors.length > 0 && (
                            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                                {validationErrors.map((err, i) => (
                                    <p key={i} className="text-sm text-red-500 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" /> {err}
                                    </p>
                                ))}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1">
                                    Bank Routing Number *
                                </label>
                                <input
                                    type="text"
                                    value={accountSettings.bankId}
                                    onChange={(e) => setAccountSettings(prev => ({ ...prev, bankId: e.target.value.replace(/\D/g, '').slice(0, 9) }))}
                                    placeholder="9 digits (e.g., 021000021)"
                                    className="w-full p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1">
                                    Account Number *
                                </label>
                                <input
                                    type="text"
                                    value={accountSettings.accountId}
                                    onChange={(e) => setAccountSettings(prev => ({ ...prev, accountId: e.target.value }))}
                                    placeholder="Your account number"
                                    className="w-full p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1">
                                        Account Type
                                    </label>
                                    <select
                                        value={accountSettings.accountType}
                                        onChange={(e) => setAccountSettings(prev => ({ ...prev, accountType: e.target.value as AccountSettings['accountType'] }))}
                                        className="w-full p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                                    >
                                        {ACCOUNT_TYPES.map(t => (
                                            <option key={t.value} value={t.value}>{t.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1">
                                        Currency
                                    </label>
                                    <select
                                        value={accountSettings.currency}
                                        onChange={(e) => setAccountSettings(prev => ({ ...prev, currency: e.target.value }))}
                                        className="w-full p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                                    >
                                        {CURRENCIES.map(c => (
                                            <option key={c.value} value={c.value}>{c.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <Button variant="outline" onClick={() => setShowAccountModal(false)} className="flex-1">
                                Cancel
                            </Button>
                            <Button onClick={exportQBO} className="flex-1 bg-[hsl(var(--primary))] text-white">
                                <Download className="w-4 h-4 mr-2" /> Export QBO
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Section */}
            {!hasFile ? (
                <>
                    {/* Header */}
                    <div className="text-center mb-4">
                        <Breadcrumb
                            items={[
                                { label: "Converter Tools", href: "/convert" },
                                { label: "QIF to QBO" }
                            ]}
                        />
                        <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                            Convert QIF to QBO Online
                        </h1>
                        <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto font-normal">
                            Import your Quicken transactions into QuickBooks. Parse QIF, preview, and export to .qbo format.
                        </h2>
                    </div>

                    {/* Upload Zone */}
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
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
                            ref={fileInputRef}
                            type="file"
                            accept=".qif"
                            onChange={handleFileInputChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />

                        <div className="relative z-10 space-y-4">
                            <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/5 flex items-center justify-center shadow-lg">
                                {isProcessing ? (
                                    <Loader2 className="w-10 h-10 text-[hsl(var(--primary))] animate-spin" />
                                ) : (
                                    <FileText className="w-10 h-10 text-[hsl(var(--primary))]" />
                                )}
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-[hsl(var(--foreground))]">
                                    {isDragging ? "Drop your QIF file here" : "Drop QIF file here"}
                                </p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                                    or click to browse • Supports Quicken Interchange Format (.qif)
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
                /* Preview & Edit Section */
                <div className="space-y-4">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-[hsl(var(--primary))]" />
                            <span className="font-medium text-[hsl(var(--foreground))]">{fileName}</span>
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">
                                ({displayTransactions.length} transactions • {qifAccountType})
                            </span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={reset}>
                            <X className="w-4 h-4 mr-1" /> Start Over
                        </Button>
                    </div>

                    {/* Info Banner */}
                    {showInfoBanner && (
                        <div className="p-2 px-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                                <Info className="w-4 h-4 text-blue-500" />
                                <span>QIF file parsed successfully. Review transactions below, edit if needed, then export to QBO.</span>
                            </div>
                            <button onClick={() => setShowInfoBanner(false)} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Status Row */}
                    {!validationSummary.isValid && (
                        <div className="flex flex-wrap gap-2 text-xs">
                            {validationSummary.invalidDates > 0 && (
                                <span className="px-2 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {validationSummary.invalidDates} invalid dates
                                </span>
                            )}
                            {validationSummary.invalidAmounts > 0 && (
                                <span className="px-2 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {validationSummary.invalidAmounts} invalid amounts
                                </span>
                            )}
                            {validationSummary.emptyPayees > 0 && (
                                <span className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" />
                                    {validationSummary.emptyPayees} empty payees
                                </span>
                            )}
                        </div>
                    )}

                    {/* Transactions Table */}
                    <div className="rounded-xl border border-[hsl(var(--border))] overflow-hidden">
                        <div className="text-xs text-[hsl(var(--muted-foreground))] p-2 bg-[hsl(var(--muted))]/30 flex items-center gap-2">
                            <GripVertical className="w-4 h-4" />
                            <span>Drag rows to reorder. Click cells to edit.</span>
                        </div>
                        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-[hsl(var(--muted))]/50 sticky top-0">
                                    <tr>
                                        <th className="px-2 py-2 text-left w-8"></th>
                                        <th className="px-3 py-2 text-left font-medium text-[hsl(var(--foreground))]">Date</th>
                                        <th className="px-3 py-2 text-right font-medium text-[hsl(var(--foreground))]">Amount</th>
                                        <th className="px-3 py-2 text-left font-medium text-[hsl(var(--foreground))]">Payee</th>
                                        <th className="px-3 py-2 text-left font-medium text-[hsl(var(--foreground))]">Memo</th>
                                        <th className="px-2 py-2 w-8"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayTransactions.map((txn, idx) => {
                                        const hasDateError = validationSummary.issues.some(i => i.row === idx + 1 && i.field === "date");
                                        const hasAmountError = validationSummary.issues.some(i => i.row === idx + 1 && i.field === "amount");
                                        const hasPayeeError = validationSummary.issues.some(i => i.row === idx + 1 && i.field === "payee");
                                        const amount = parseFloat(txn.amount);
                                        const amountColor = amount >= 0 ? "text-green-600" : "text-red-600";

                                        return (
                                            <tr
                                                key={txn.id}
                                                draggable
                                                onDragStart={() => handleDragStart(idx)}
                                                onDragOver={(e) => handleDragOverRow(e, idx)}
                                                onDragEnd={handleDragEnd}
                                                className={`border-t border-[hsl(var(--border))] ${draggedRow === idx ? "bg-[hsl(var(--primary))]/10" : "hover:bg-[hsl(var(--muted))]/30"}`}
                                            >
                                                <td className="px-2 py-2 cursor-grab">
                                                    <GripVertical className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                                                </td>
                                                <td className={`px-3 py-2 ${hasDateError ? 'bg-red-500/10' : ''}`}>
                                                    {editingCell?.row === idx && editingCell?.field === "date" ? (
                                                        <input
                                                            type="text"
                                                            defaultValue={txn.date}
                                                            onBlur={(e) => { updateTransaction(txn.id, "date", e.target.value); setEditingCell(null); }}
                                                            onKeyDown={(e) => { if (e.key === "Enter") { updateTransaction(txn.id, "date", e.currentTarget.value); setEditingCell(null); } }}
                                                            className="w-full p-1 text-sm border rounded"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <div onClick={() => setEditingCell({ row: idx, field: "date" })} className="cursor-pointer hover:bg-[hsl(var(--primary))]/5 px-1 rounded">
                                                            {txn.date || <span className="text-[hsl(var(--muted-foreground))]/50">—</span>}
                                                            {hasDateError && <AlertCircle className="w-3 h-3 inline ml-1 text-red-500" />}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className={`px-3 py-2 text-right font-medium ${amountColor} ${hasAmountError ? 'bg-red-500/10' : ''}`}>
                                                    {editingCell?.row === idx && editingCell?.field === "amount" ? (
                                                        <input
                                                            type="text"
                                                            defaultValue={txn.amount}
                                                            onBlur={(e) => { updateTransaction(txn.id, "amount", e.target.value); setEditingCell(null); }}
                                                            onKeyDown={(e) => { if (e.key === "Enter") { updateTransaction(txn.id, "amount", e.currentTarget.value); setEditingCell(null); } }}
                                                            className="w-full p-1 text-sm border rounded text-right"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <div onClick={() => setEditingCell({ row: idx, field: "amount" })} className="cursor-pointer hover:bg-[hsl(var(--primary))]/5 px-1 rounded">
                                                            {txn.amount}
                                                            {hasAmountError && <AlertCircle className="w-3 h-3 inline ml-1 text-red-500" />}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className={`px-3 py-2 ${hasPayeeError ? 'bg-amber-500/10' : ''}`}>
                                                    {editingCell?.row === idx && editingCell?.field === "payee" ? (
                                                        <input
                                                            type="text"
                                                            defaultValue={txn.payee}
                                                            onBlur={(e) => { updateTransaction(txn.id, "payee", e.target.value); setEditingCell(null); }}
                                                            onKeyDown={(e) => { if (e.key === "Enter") { updateTransaction(txn.id, "payee", e.currentTarget.value); setEditingCell(null); } }}
                                                            className="w-full p-1 text-sm border rounded"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <div onClick={() => setEditingCell({ row: idx, field: "payee" })} className="cursor-pointer hover:bg-[hsl(var(--primary))]/5 px-1 rounded truncate max-w-[200px]">
                                                            {txn.payee || <span className="text-[hsl(var(--muted-foreground))]/50">—</span>}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {editingCell?.row === idx && editingCell?.field === "memo" ? (
                                                        <input
                                                            type="text"
                                                            defaultValue={txn.memo}
                                                            onBlur={(e) => { updateTransaction(txn.id, "memo", e.target.value); setEditingCell(null); }}
                                                            onKeyDown={(e) => { if (e.key === "Enter") { updateTransaction(txn.id, "memo", e.currentTarget.value); setEditingCell(null); } }}
                                                            className="w-full p-1 text-sm border rounded"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <div onClick={() => setEditingCell({ row: idx, field: "memo" })} className="cursor-pointer hover:bg-[hsl(var(--primary))]/5 px-1 rounded truncate max-w-[150px] text-[hsl(var(--muted-foreground))]">
                                                            {txn.memo || <span className="opacity-50">—</span>}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-2 py-2">
                                                    <button
                                                        onClick={() => deleteTransaction(idx)}
                                                        className="p-1 rounded hover:bg-red-500/10 text-[hsl(var(--muted-foreground))] hover:text-red-500"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Export Button */}
                    <div className="flex justify-end gap-3">
                        <Button
                            onClick={handleExportClick}
                            disabled={displayTransactions.length === 0}
                            className="bg-[hsl(var(--primary))] text-white px-6"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Export to QBO
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
