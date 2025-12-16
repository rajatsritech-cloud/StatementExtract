"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
    FileUp,
    X,
    Download,
    Loader2,
    FileSpreadsheet,
    GripVertical,
    Trash2,
    AlertCircle,
    Settings2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";

// Column mapping for QBO format
interface ColumnMapping {
    date: number | null;
    amount: number | null;
    description: number | null;
    type: number | null;
    checkNum: number | null;
    memo: number | null;
}

interface Transaction {
    id: string;
    date: string;
    amount: string;
    description: string;
    type: string;
    checkNum: string;
    memo: string;
}

// Date format detection patterns
const DATE_FORMATS = [
    { pattern: /^\d{4}-\d{2}-\d{2}$/, label: "YYYY-MM-DD", parse: (d: string) => d },
    { pattern: /^\d{2}\/\d{2}\/\d{4}$/, label: "MM/DD/YYYY", parse: (d: string) => { const [m, day, y] = d.split("/"); return `${y}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`; } },
    { pattern: /^\d{2}-\d{2}-\d{4}$/, label: "MM-DD-YYYY", parse: (d: string) => { const [m, day, y] = d.split("-"); return `${y}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`; } },
    { pattern: /^\d{2}\/\d{2}\/\d{4}$/, label: "DD/MM/YYYY", parse: (d: string) => { const [day, m, y] = d.split("/"); return `${y}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`; } },
    { pattern: /^\d{1,2}\/\d{1,2}\/\d{2,4}$/, label: "M/D/YYYY", parse: (d: string) => { const [m, day, y] = d.split("/"); const fullYear = y.length === 2 ? `20${y}` : y; return `${fullYear}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`; } },
];

export function CsvToQboTool() {
    const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
    const [csvData, setCsvData] = useState<string[][]>([]);
    const [fileName, setFileName] = useState<string>("");
    const [mapping, setMapping] = useState<ColumnMapping>({
        date: null,
        amount: null,
        description: null,
        type: null,
        checkNum: null,
        memo: null,
    });
    const [dateFormat, setDateFormat] = useState<string>("MM/DD/YYYY");
    const [detectedFormat, setDetectedFormat] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasFile, setHasFile] = useState(false);
    const [editingCell, setEditingCell] = useState<{ row: number; field: keyof Transaction } | null>(null);
    const [draggedRow, setDraggedRow] = useState<number | null>(null);
    const [manualEdits, setManualEdits] = useState<Record<string, Partial<Transaction>>>({});

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Parse CSV file
    const parseCSV = (text: string): { headers: string[]; data: string[][] } => {
        const lines = text.trim().split(/\r?\n/);
        if (lines.length < 2) throw new Error("CSV must have at least a header row and one data row");

        const parseRow = (line: string): string[] => {
            const result: string[] = [];
            let current = "";
            let inQuotes = false;

            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '"') {
                    if (inQuotes && line[i + 1] === '"') {
                        current += '"';
                        i++;
                    } else {
                        inQuotes = !inQuotes;
                    }
                } else if (char === "," && !inQuotes) {
                    result.push(current.trim());
                    current = "";
                } else {
                    current += char;
                }
            }
            result.push(current.trim());
            return result;
        };

        const headers = parseRow(lines[0]);
        const data = lines.slice(1).map(parseRow).filter(row => row.some(cell => cell.trim()));

        return { headers, data };
    };

    // Auto-detect date format
    const detectDateFormat = (dates: string[]): string => {
        for (const fmt of DATE_FORMATS) {
            if (dates.slice(0, 5).every(d => fmt.pattern.test(d))) {
                return fmt.label;
            }
        }
        return "MM/DD/YYYY";
    };

    // Auto-map columns
    const autoMapColumns = (headers: string[]): ColumnMapping => {
        const newMapping: ColumnMapping = { date: null, amount: null, description: null, type: null, checkNum: null, memo: null };
        const lowerHeaders = headers.map(h => h.toLowerCase().trim());

        const dateIdx = lowerHeaders.findIndex(h => ["date", "trans date", "transaction date", "posted", "posted date"].includes(h));
        if (dateIdx >= 0) newMapping.date = dateIdx;

        const amountIdx = lowerHeaders.findIndex(h => ["amount", "transaction amount", "debit", "credit", "value"].includes(h));
        if (amountIdx >= 0) newMapping.amount = amountIdx;

        const descIdx = lowerHeaders.findIndex(h => ["description", "name", "payee", "merchant", "vendor", "transaction description"].includes(h));
        if (descIdx >= 0) newMapping.description = descIdx;

        const typeIdx = lowerHeaders.findIndex(h => ["type", "transaction type", "trntype"].includes(h));
        if (typeIdx >= 0) newMapping.type = typeIdx;

        const checkIdx = lowerHeaders.findIndex(h => ["check", "check num", "check number", "checknum", "reference"].includes(h));
        if (checkIdx >= 0) newMapping.checkNum = checkIdx;

        const memoIdx = lowerHeaders.findIndex(h => h === "memo" || h === "notes" || h === "category");
        if (memoIdx >= 0 && memoIdx !== descIdx) newMapping.memo = memoIdx;

        return newMapping;
    };

    // Compute transactions from CSV data and current mapping (reactive)
    const transactions = useMemo<Transaction[]>(() => {
        if (csvData.length === 0 || mapping.date === null || mapping.amount === null) {
            return [];
        }

        const fmt = DATE_FORMATS.find(f => f.label === dateFormat);
        const parseFn = fmt?.parse || ((d: string) => d);

        return csvData.map((row, idx) => {
            const id = `txn-${idx}`;
            const baseRow: Transaction = {
                id,
                date: parseFn(row[mapping.date!] || ""),
                amount: row[mapping.amount!] || "0",
                description: mapping.description !== null ? row[mapping.description] || "" : "",
                type: mapping.type !== null ? row[mapping.type] || "" : "",
                checkNum: mapping.checkNum !== null ? row[mapping.checkNum] || "" : "",
                memo: mapping.memo !== null ? row[mapping.memo] || "" : "",
            };
            // Apply manual edits if any
            const edits = manualEdits[id];
            if (edits) {
                return { ...baseRow, ...edits };
            }
            return baseRow;
        });
    }, [csvData, mapping, dateFormat, manualEdits]);

    // Handle file selection
    const handleFiles = useCallback((fileList: FileList | File[]) => {
        setError(null);
        const file = Array.from(fileList).find(f =>
            f.name.toLowerCase().endsWith(".csv") || f.type === "text/csv"
        );

        if (!file) {
            setError("Please select a CSV file.");
            return;
        }

        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const { headers, data } = parseCSV(text);

                setCsvHeaders(headers);
                setCsvData(data);
                setManualEdits({});

                // Auto-map columns
                const autoMapping = autoMapColumns(headers);
                setMapping(autoMapping);

                // Auto-detect date format
                if (autoMapping.date !== null) {
                    const dates = data.slice(0, 10).map(row => row[autoMapping.date!]).filter(Boolean);
                    const detected = detectDateFormat(dates);
                    setDetectedFormat(detected);
                    setDateFormat(detected);
                }

                setHasFile(true);
            } catch (err) {
                setError("Failed to parse CSV file. Please check the format.");
            }
        };
        reader.readAsText(file);
    }, []);

    // Generate QBO file with proper XML format
    const generateQBO = (): string => {
        const now = new Date();
        const dateStr = now.toISOString().replace(/[-:T]/g, "").slice(0, 14);

        // Calculate date range from transactions
        let dtStart = dateStr;
        let dtEnd = dateStr;
        if (transactions.length > 0) {
            const dates = transactions.map(t => t.date.replace(/-/g, "") + "120000").filter(Boolean).sort();
            if (dates.length > 0) {
                dtStart = dates[0];
                dtEnd = dates[dates.length - 1];
            }
        }

        // Calculate balance
        const balance = transactions.reduce((sum, t) => {
            return sum + (parseFloat(t.amount.replace(/[^-\d.]/g, "")) || 0);
        }, 0);

        // Proper XML QBO format with closing tags
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
        <CURDEF>USD</CURDEF>
        <BANKACCTFROM>
          <BANKID>123456789</BANKID>
          <ACCTID>987654321</ACCTID>
          <ACCTTYPE>CHECKING</ACCTTYPE>
        </BANKACCTFROM>
        <BANKTRANLIST>
          <DTSTART>${dtStart}</DTSTART>
          <DTEND>${dtEnd}</DTEND>
`;

        // Add transactions with proper indentation and closing tags
        transactions.forEach((txn, idx) => {
            const dateFormatted = txn.date.replace(/-/g, "") + "120000";
            const amount = parseFloat(txn.amount.replace(/[^-\d.]/g, "")) || 0;
            const trnType = txn.type || (amount < 0 ? "DEBIT" : "CREDIT");
            const fitId = `${txn.date.replace(/-/g, "")}${String(idx + 1).padStart(3, "0")}`;

            qbo += `          
          <STMTTRN>
            <TRNTYPE>${trnType}</TRNTYPE>
            <DTPOSTED>${dateFormatted}</DTPOSTED>
            <TRNAMT>${amount.toFixed(2)}</TRNAMT>
            <FITID>${fitId}</FITID>
`;
            if (txn.checkNum) {
                qbo += `            <CHECKNUM>${txn.checkNum}</CHECKNUM>
`;
            }
            qbo += `            <NAME>${txn.description.slice(0, 32).replace(/[<>&]/g, "")}</NAME>
`;
            if (txn.memo) {
                qbo += `            <MEMO>${txn.memo.slice(0, 255).replace(/[<>&]/g, "")}</MEMO>
`;
            }
            qbo += `          </STMTTRN>
`;
        });

        qbo += `          
        </BANKTRANLIST>
        <LEDGERBAL>
          <BALAMT>${balance.toFixed(2)}</BALAMT>
          <DTASOF>${dtEnd}</DTASOF>
        </LEDGERBAL>
      </STMTRS>
    </STMTTRNRS>
  </BANKMSGSRSV1>
</OFX>`;

        return qbo;
    };

    // Export QBO file
    const exportQBO = () => {
        if (transactions.length === 0) {
            setError("No valid transactions to export. Please map Date, Amount, and Description columns.");
            return;
        }

        setIsProcessing(true);
        try {
            const qboContent = generateQBO();
            const blob = new Blob([qboContent], { type: "application/vnd.intu.qbo" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName.replace(/\.csv$/i, "") + ".qbo";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            setError("Failed to generate QBO file.");
        } finally {
            setIsProcessing(false);
        }
    };

    // Edit transaction (stores in manual edits)
    const updateTransaction = (id: string, field: keyof Transaction, value: string) => {
        setManualEdits(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: value }
        }));
    };

    // Delete transaction
    const deleteTransaction = (idx: number) => {
        setCsvData(prev => prev.filter((_, i) => i !== idx));
    };

    // Drag and drop reorder
    const handleDragStart = (idx: number) => setDraggedRow(idx);
    const handleDragOver = (e: React.DragEvent, idx: number) => {
        e.preventDefault();
        if (draggedRow === null || draggedRow === idx) return;
        const newData = [...csvData];
        const [dragged] = newData.splice(draggedRow, 1);
        newData.splice(idx, 0, dragged);
        setCsvData(newData);
        setDraggedRow(idx);
    };
    const handleDragEnd = () => setDraggedRow(null);

    // Drop zone handlers
    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    }, [handleFiles]);

    // Reset to start
    const reset = () => {
        setCsvHeaders([]);
        setCsvData([]);
        setManualEdits({});
        setMapping({ date: null, amount: null, description: null, type: null, checkNum: null, memo: null });
        setHasFile(false);
        setError(null);
    };

    // Check if mapping is valid
    const isMappingValid = mapping.date !== null && mapping.amount !== null && mapping.description !== null;

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                    Convert CSV to QBO Online
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
                    Import your bank transactions into QuickBooks. Map columns, preview, and export to .qbo format.
                </p>
            </div>

            {/* Upload Zone (shown when no file) */}
            {!hasFile && (
                <>
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
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
                            accept=".csv,text/csv"
                            onChange={(e) => e.target.files && handleFiles(e.target.files)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />

                        <div className="relative z-10 space-y-4">
                            <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/5 flex items-center justify-center shadow-lg">
                                <FileUp className="w-10 h-10 text-[hsl(var(--primary))]" />
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-[hsl(var(--foreground))]">
                                    Drop your CSV file here
                                </p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                                    or click to browse
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.CSV</span>
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Bank Exports</span>
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">100% Private</span>
                            </div>
                        </div>
                    </div>
                    <PrivacyBadge />
                </>
            )}

            {/* Mapping + Preview (shown when file is loaded) */}
            {hasFile && (
                <div className="space-y-6">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileSpreadsheet className="w-5 h-5 text-[hsl(var(--primary))]" />
                            <span className="font-medium text-[hsl(var(--foreground))]">{fileName}</span>
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">
                                ({csvData.length} rows)
                            </span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={reset}>
                            <X className="w-4 h-4 mr-1" /> Start Over
                        </Button>
                    </div>

                    {/* Column Mapping Panel */}
                    <div className="p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                        <div className="flex items-center gap-2 mb-4">
                            <Settings2 className="w-4 h-4 text-[hsl(var(--primary))]" />
                            <span className="font-medium text-[hsl(var(--foreground))]">Column Mapping</span>
                            {!isMappingValid && (
                                <span className="text-xs text-amber-500 ml-2">(Map Date, Amount, and Description)</span>
                            )}
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                            {/* Date Column */}
                            <div>
                                <label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={mapping.date ?? ""}
                                    onChange={(e) => setMapping(prev => ({ ...prev, date: e.target.value ? parseInt(e.target.value) : null }))}
                                    className="w-full p-2 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                                >
                                    <option value="">Select...</option>
                                    {csvHeaders.map((h, i) => (
                                        <option key={i} value={i}>{h}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Date Format */}
                            <div>
                                <label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">
                                    Format {detectedFormat && <span className="text-[hsl(var(--primary))]">✓</span>}
                                </label>
                                <select
                                    value={dateFormat}
                                    onChange={(e) => setDateFormat(e.target.value)}
                                    className="w-full p-2 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                                >
                                    {DATE_FORMATS.map(f => (
                                        <option key={f.label} value={f.label}>{f.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">
                                    Amount <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={mapping.amount ?? ""}
                                    onChange={(e) => setMapping(prev => ({ ...prev, amount: e.target.value ? parseInt(e.target.value) : null }))}
                                    className="w-full p-2 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                                >
                                    <option value="">Select...</option>
                                    {csvHeaders.map((h, i) => (
                                        <option key={i} value={i}>{h}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={mapping.description ?? ""}
                                    onChange={(e) => setMapping(prev => ({ ...prev, description: e.target.value ? parseInt(e.target.value) : null }))}
                                    className="w-full p-2 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                                >
                                    <option value="">Select...</option>
                                    {csvHeaders.map((h, i) => (
                                        <option key={i} value={i}>{h}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Type (Optional) */}
                            <div>
                                <label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">
                                    Type
                                </label>
                                <select
                                    value={mapping.type ?? ""}
                                    onChange={(e) => setMapping(prev => ({ ...prev, type: e.target.value ? parseInt(e.target.value) : null }))}
                                    className="w-full p-2 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                                >
                                    <option value="">Auto</option>
                                    {csvHeaders.map((h, i) => (
                                        <option key={i} value={i}>{h}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Memo (Optional) */}
                            <div>
                                <label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">
                                    Memo
                                </label>
                                <select
                                    value={mapping.memo ?? ""}
                                    onChange={(e) => setMapping(prev => ({ ...prev, memo: e.target.value ? parseInt(e.target.value) : null }))}
                                    className="w-full p-2 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                                >
                                    <option value="">None</option>
                                    {csvHeaders.map((h, i) => (
                                        <option key={i} value={i}>{h}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Transactions Table (always visible) */}
                    <div>
                        <div className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2 mb-3">
                            <GripVertical className="w-4 h-4" />
                            <span>Drag rows to reorder. Click cells to edit.</span>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-[hsl(var(--border))]">
                            <table className="w-full text-sm">
                                <thead className="bg-[hsl(var(--muted))]/50">
                                    <tr>
                                        <th className="w-8 px-2 py-3"></th>
                                        <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Date</th>
                                        <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Amount</th>
                                        <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Description</th>
                                        <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Type</th>
                                        <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Memo</th>
                                        <th className="w-10 px-2 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-4 py-8 text-center text-[hsl(var(--muted-foreground))]">
                                                {isMappingValid ? "No transactions found" : "Map Date, Amount, and Description columns to preview transactions"}
                                            </td>
                                        </tr>
                                    ) : (
                                        transactions.map((txn, idx) => (
                                            <tr
                                                key={txn.id}
                                                draggable
                                                onDragStart={() => handleDragStart(idx)}
                                                onDragOver={(e) => handleDragOver(e, idx)}
                                                onDragEnd={handleDragEnd}
                                                className={`border-t border-[hsl(var(--border))] ${draggedRow === idx ? "bg-[hsl(var(--primary))]/10" : "hover:bg-[hsl(var(--muted))]/30"} transition-colors`}
                                            >
                                                <td className="px-2 py-2 cursor-grab">
                                                    <GripVertical className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                                                </td>
                                                {(["date", "amount", "description", "type", "memo"] as const).map(field => (
                                                    <td key={field} className="px-4 py-2">
                                                        {editingCell?.row === idx && editingCell?.field === field ? (
                                                            <input
                                                                autoFocus
                                                                value={txn[field]}
                                                                onChange={(e) => updateTransaction(txn.id, field, e.target.value)}
                                                                onBlur={() => setEditingCell(null)}
                                                                onKeyDown={(e) => e.key === "Enter" && setEditingCell(null)}
                                                                className="w-full px-2 py-1 rounded border border-[hsl(var(--primary))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] outline-none"
                                                            />
                                                        ) : (
                                                            <span
                                                                onClick={() => setEditingCell({ row: idx, field })}
                                                                className="cursor-pointer hover:text-[hsl(var(--primary))] transition-colors"
                                                            >
                                                                {txn[field] || <span className="text-[hsl(var(--muted-foreground))]">—</span>}
                                                            </span>
                                                        )}
                                                    </td>
                                                ))}
                                                <td className="px-2 py-2">
                                                    <button
                                                        onClick={() => deleteTransaction(idx)}
                                                        className="p-1 rounded hover:bg-red-500/10 text-[hsl(var(--muted-foreground))] hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Export Button */}
                    <Button
                        onClick={exportQBO}
                        disabled={isProcessing || transactions.length === 0}
                        className="w-full h-14 text-lg bg-gradient-primary shadow-glow hover:opacity-90"
                    >
                        {isProcessing ? (
                            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...</>
                        ) : (
                            <><Download className="w-5 h-5 mr-2" /> Export as QBO ({transactions.length} transactions)</>
                        )}
                    </Button>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                </div>
            )}
        </div>
    );
}
