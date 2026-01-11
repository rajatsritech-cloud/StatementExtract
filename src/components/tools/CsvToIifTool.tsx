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
    Settings2,
    CheckCircle2,
    Info,
    AlertTriangle,
    Globe,
    FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";
import * as XLSX from "xlsx";

// Column mapping for IIF format
interface ColumnMapping {
    date: number | null;
    amount: number | null;
    credit: number | null;
    debit: number | null;
    name: number | null; // Payee
    memo: number | null;
    docNum: number | null; // Check Number
    account: number | null; // Category/Account
    type: number | null;
}

// Month name to number mapping (multilingual support)
const MONTH_NAMES: Record<string, string> = {
    // English
    'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'may': '05', 'jun': '06',
    'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12',
    'january': '01', 'february': '02', 'march': '03', 'april': '04', 'june': '06',
    'july': '07', 'august': '08', 'september': '09', 'october': '10', 'november': '11', 'december': '12',
    // German
    'januar': '01', 'februar': '02', 'märz': '03', 'marz': '03', 'mai': '05', 'juni': '06',
    'juli': '07', 'oktober': '10', 'dezember': '12',
    // Dutch
    'januari': '01', 'februari': '02', 'maart': '03', 'mei': '05',
    // French
    'janvier': '01', 'février': '02', 'fevrier': '02', 'mars': '03', 'avril': '04',
    'juin': '06', 'juillet': '07', 'août': '08', 'aout': '08', 'septembre': '09',
    'octobre': '10', 'novembre': '11', 'décembre': '12', 'decembre': '12',
    // Spanish
    'enero': '01', 'febrero': '02', 'marzo': '03', 'abril': '04', 'mayo': '05',
    'junio': '06', 'julio': '07', 'agosto': '08',
    'octubre': '10', 'noviembre': '11', 'diciembre': '12'
};

// 🌍 Region-based date format whitelists
const REGION_DATE_FORMATS: Record<string, { patterns: RegExp[], parser: (match: RegExpMatchArray, year: number) => string }[]> = {
    'US': [
        { patterns: [/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/], parser: (m, _) => `${m[3]}-${m[1].padStart(2, '0')}-${m[2].padStart(2, '0')}` },
        { patterns: [/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{2})$/], parser: (m, _) => `20${m[3]}-${m[1].padStart(2, '0')}-${m[2].padStart(2, '0')}` },
    ],
    'UK': [
        { patterns: [/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/], parser: (m, _) => `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` },
        { patterns: [/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{2})$/], parser: (m, _) => `20${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` },
    ],
    'EU': [
        { patterns: [/^(\d{1,2})[.\-\/](\d{1,2})[.\-\/](\d{4})$/], parser: (m, _) => `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` },
        { patterns: [/^(\d{1,2})[.\-\/](\d{1,2})[.\-\/](\d{2})$/], parser: (m, _) => `20${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` },
    ],
};

const UNIVERSAL_DATE_FORMATS = [
    { pattern: /^(\d{4})-(\d{2})-(\d{2})$/, parser: (m: RegExpMatchArray) => `${m[1]}-${m[2]}-${m[3]}` },
    { pattern: /^(\d{4})(\d{2})(\d{2})$/, parser: (m: RegExpMatchArray) => `${m[1]}-${m[2]}-${m[3]}` },
    { pattern: /^(\d{1,2})[-\/]([A-Za-z]{3,9})$/i, parser: null },
    { pattern: /^([A-Za-z]{3,9})[-\s](\d{1,2})$/i, parser: null },
];

const parseRegionalDate = (dateStr: string, region: string): string | null => {
    const trimmed = dateStr.trim();
    if (!trimmed) return null;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    for (const fmt of UNIVERSAL_DATE_FORMATS) {
        const match = trimmed.match(fmt.pattern);
        if (match) {
            if (fmt.parser) return fmt.parser(match);
            else {
                const dayMonthMatch = trimmed.match(/^(\d{1,2})[-\/]([A-Za-z]{3,9})$/i);
                if (dayMonthMatch) {
                    const day = dayMonthMatch[1].padStart(2, '0');
                    const month = MONTH_NAMES[dayMonthMatch[2].toLowerCase()];
                    if (month) return `${parseInt(month) > currentMonth ? currentYear - 1 : currentYear}-${month}-${day}`;
                }
                const monthDayMatch = trimmed.match(/^([A-Za-z]{3,9})[-\s](\d{1,2})$/i);
                if (monthDayMatch) {
                    const month = MONTH_NAMES[monthDayMatch[1].toLowerCase()];
                    const day = monthDayMatch[2].padStart(2, '0');
                    if (month) return `${parseInt(month) > currentMonth ? currentYear - 1 : currentYear}-${month}-${day}`;
                }
            }
        }
    }

    const regionFormats = REGION_DATE_FORMATS[region] || REGION_DATE_FORMATS['US'];
    for (const fmt of regionFormats) {
        for (const pattern of fmt.patterns) {
            const match = trimmed.match(pattern);
            if (match) {
                const result = fmt.parser(match, currentYear);
                const [y, m, d] = result.split('-').map(Number);
                if (m >= 1 && m <= 12 && d >= 1 && d <= 31) return result;
            }
        }
    }
    return null;
};

const parseDayMonthDate = (d: string): string => {
    const currentYear = new Date().getFullYear();
    const parts = d.split(/[-\/]/);
    if (parts.length !== 2) return '';
    const day = parts[0].padStart(2, '0');
    const month = MONTH_NAMES[parts[1].toLowerCase()];
    if (!month) return '';
    return `${currentYear}-${month}-${day}`;
};

interface Transaction {
    id: string;
    date: string;
    rawDate: string;
    amount: string;
    credit: string;
    debit: string;
    name: string; // Payee
    memo: string;
    docNum: string;
    account: string; // Destination Account (Category)
    type: string;
}

const COUNTRY_PRESETS = [
    { value: "US", label: "🇺🇸 United States", dateFormat: "MM/DD/YYYY" },
    { value: "UK", label: "🇬🇧 United Kingdom", dateFormat: "DD/MM/YYYY" },
    { value: "CA", label: "🇨🇦 Canada", dateFormat: "MM/DD/YYYY" },
    { value: "AU", label: "🇦🇺 Australia", dateFormat: "DD/MM/YYYY" },
    { value: "EU", label: "🇪🇺 Europe", dateFormat: "DD/MM/YYYY" },
];

const DATE_FORMATS = [
    { pattern: /^\d{4}-\d{2}-\d{2}$/, label: "YYYY-MM-DD", parse: (d: string) => d },
    { pattern: /^\d{2}\/\d{2}\/\d{4}$/, label: "MM/DD/YYYY", parse: (d: string) => { const parts = d.split("/"); if (parts.length < 3) return d; const [m, day, y] = parts; return `${y}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`; } },
    { pattern: /^\d{2}\/\d{2}\/\d{4}$/, label: "DD/MM/YYYY", parse: (d: string) => { const parts = d.split("/"); if (parts.length < 3) return d; const [day, m, y] = parts; return `${y}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`; } },
    { pattern: /^\d{1,2}[-\/][A-Za-z]{3}$/, label: "D-MMM (e.g. 1-Jan)", parse: parseDayMonthDate },
];

export function CsvToIifTool({ hideHeader = false }: { hideHeader?: boolean } = {}) {
    const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
    const [csvData, setCsvData] = useState<string[][]>([]);
    const [fileName, setFileName] = useState<string>("");
    const [mapping, setMapping] = useState<ColumnMapping>({
        date: null, amount: null, credit: null, debit: null, name: null, memo: null, docNum: null, account: null, type: null
    });
    const [dateFormat, setDateFormat] = useState<string>("MM/DD/YYYY");
    const [detectedFormat, setDetectedFormat] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showMappingFeedback, setShowMappingFeedback] = useState(false);
    const [missingColumns, setMissingColumns] = useState<string[]>([]);
    const [hasFile, setHasFile] = useState(false);
    const [manualEdits, setManualEdits] = useState<Record<string, Partial<Transaction>>>({});
    const [editingCell, setEditingCell] = useState<{ row: number; field: string } | null>(null);
    const [draggedRow, setDraggedRow] = useState<number | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string>("US");
    const [showInfoBanner, setShowInfoBanner] = useState(true);
    const [bankAccountName, setBankAccountName] = useState("Checking Account");
    // Removed unused showSettings state

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCountryChange = (countryCode: string) => {
        setSelectedCountry(countryCode);
        const preset = COUNTRY_PRESETS.find(c => c.value === countryCode);
        if (preset) setDateFormat(preset.dateFormat);
    };

    const parseCSV = (text: string): { headers: string[]; data: string[][] } => {
        const lines = text.trim().split(/\r?\n/);
        if (lines.length < 2) throw new Error("CSV must have header and data.");
        const parseRow = (line: string): string[] => {
            const result: string[] = [];
            let current = "", inQuotes = false;
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '"') {
                    if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
                    else inQuotes = !inQuotes;
                } else if (char === "," && !inQuotes) { result.push(current.trim()); current = ""; }
                else current += char;
            }
            result.push(current.trim());
            return result;
        };
        const headers = parseRow(lines[0]);
        const data = lines.slice(1).map(parseRow).filter(row => row.some(cell => cell.trim()));
        return { headers, data };
    };

    const detectDateFormat = (dates: string[]): string => {
        for (const fmt of DATE_FORMATS) {
            if (dates.slice(0, 5).every(d => fmt.pattern.test(d))) return fmt.label;
        }
        return "MM/DD/YYYY";
    };

    const autoMapColumns = (headers: string[]): ColumnMapping => {
        const lower = headers.map(h => h.toLowerCase().trim());
        const find = (arr: string[]) => lower.findIndex(h => arr.some(k => h.includes(k)));

        return {
            date: find(["date", "time"]),
            amount: find(["amount", "total"]),
            credit: find(["credit", "deposit", "in"]),
            debit: find(["debit", "withdraw", "out"]),
            name: find(["payee", "description", "name", "desc"]),
            memo: find(["memo", "note", "reference"]),
            docNum: find(["check", "num", "ref"]),
            account: find(["category", "account", "class"]),
            type: find(["type"])
        };
    };

    const transactions = useMemo<Transaction[]>(() => {
        if (csvData.length === 0 || mapping.date === null) return [];
        const hasAmount = mapping.amount !== null;
        if (!hasAmount && mapping.credit === null && mapping.debit === null) return [];

        const fmt = DATE_FORMATS.find(f => f.label === dateFormat);
        const parseFn = fmt?.parse || ((d: string) => d);

        return csvData.map((row, idx) => {
            const id = `txn-${idx}`;
            const rawDate = row[mapping.date!] || "";

            let amount = "0";
            const rawCredit = mapping.credit !== null ? row[mapping.credit!] || "" : "";
            const rawDebit = mapping.debit !== null ? row[mapping.debit!] || "" : "";
            const rawType = mapping.type !== null ? (row[mapping.type!] || "").toLowerCase() : "";

            if (hasAmount) {
                const val = parseFloat((row[mapping.amount!] || "0").replace(/[^0-9.-]/g, ""));
                // If Type column is mapped, use it to determine sign
                if (mapping.type !== null) {
                    if (["debit", "dr", "withdraw", "withdrawal", "payment", "out", "expense"].some(s => rawType.includes(s))) {
                        amount = (-Math.abs(val)).toString();
                    } else {
                        amount = Math.abs(val).toString();
                    }
                } else {
                    amount = val.toString();
                }
            } else {
                const c = parseFloat(rawCredit.replace(/[^0-9.]/g, "") || "0");
                const d = parseFloat(rawDebit.replace(/[^0-9.]/g, "") || "0");
                if (c > 0) amount = c.toString();
                else if (d > 0) amount = (-d).toString();
            }

            let parsedDate = parseFn(rawDate);
            if (!parsedDate || parsedDate.length < 8) parsedDate = rawDate;

            const baseRow: Transaction = {
                id,
                date: parsedDate,
                rawDate,
                amount,
                credit: rawCredit,
                debit: rawDebit,
                name: mapping.name !== null ? row[mapping.name!] || "" : "",
                memo: mapping.memo !== null ? row[mapping.memo!] || "" : "",
                docNum: mapping.docNum !== null ? row[mapping.docNum!] || "" : "",
                account: mapping.account !== null ? row[mapping.account!] || "" : "",
                type: mapping.type !== null ? row[mapping.type!] : (parseFloat(amount) < 0 ? "PAYMENT" : "DEPOSIT")
            };
            return { ...baseRow, ...(manualEdits[id] || {}) };
        });
    }, [csvData, mapping, dateFormat, manualEdits]);

    const handleFiles = useCallback((fileList: FileList | File[]) => {
        setError(null);
        if (fileList.length === 0) return;
        const file = fileList[0];
        setFileName(file.name);

        const processContent = (headers: string[], data: string[][]) => {
            setCsvHeaders(headers);
            setCsvData(data);
            const map = autoMapColumns(headers);
            setMapping(map);

            const missing = [];
            if (map.date === null) missing.push("Date");
            if (map.amount === null && map.credit === null && map.debit === null) missing.push("Amount");

            if (missing.length > 0) {
                setMissingColumns(missing);
                setShowMappingFeedback(true);
            }

            if (map.date !== null) {
                const dates = data.slice(0, 10).map(r => r[map.date!]).filter(Boolean);
                const detected = detectDateFormat(dates);
                setDetectedFormat(detected);
                setDateFormat(detected);
            }
            setHasFile(true);
        };

        const reader = new FileReader();
        if (file.name.endsWith(".xls") || file.name.endsWith(".xlsx")) {
            reader.onload = (e) => {
                try {
                    const wb = XLSX.read(e.target?.result, { type: 'binary' });
                    const ws = wb.Sheets[wb.SheetNames[0]];
                    const json = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' }) as string[][];
                    if (json.length > 1) processContent(json[0], json.slice(1).map(r => r.map(c => String(c))));
                } catch { setError("Failed to parse Excel file."); }
            };
            reader.readAsBinaryString(file);
        } else {
            reader.onload = (e) => {
                try {
                    const { headers, data } = parseCSV(e.target?.result as string);
                    processContent(headers, data);
                } catch { setError("Failed to parse CSV file."); }
            };
            reader.readAsText(file);
        }
    }, []);

    const updateTransaction = (id: string, field: keyof Transaction, value: string) => {
        setManualEdits(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: value }
        }));
    };

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

    const convertToIIF = () => {
        try {
            if (transactions.length === 0) throw new Error("No transactions to export.");

            let iif = "!TRNS\tTRNSID\tDATE\tACCNT\tNAME\tAMOUNT\tDOCNUM\tMEMO\tCLEAR\tTOPRINT\tADDR1\n";
            iif += "!SPL\tSPLID\tDATE\tACCNT\tNAME\tAMOUNT\tDOCNUM\tMEMO\tCLEAR\n";
            iif += "!ENDTRNS\n";

            transactions.forEach(t => {
                const amt = parseFloat(t.amount.replace(/[^-\d.]/g, "") || "0");
                // Quickbooks IIF date format is usually MM/DD/YYYY or MM/DD/YY
                const dateParts = t.date.split("-");
                // If it's already YYYY-MM-DD
                const qbDate = dateParts.length === 3 ? `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}` : t.date;

                const accName = t.account || "Uncategorized Expenses";

                // TRNS Line (Bank Side)
                iif += `TRNS\t\t${qbDate}\t${bankAccountName}\t${t.name}\t${amt.toFixed(2)}\t${t.docNum}\t${t.memo}\tN\tN\t\n`;

                // SPL Line (Expense/Category Side)
                // Invert amount for the split
                iif += `SPL\t\t${qbDate}\t${accName}\t${t.name}\t${(-amt).toFixed(2)}\t${t.docNum}\t${t.memo}\tN\n`;

                iif += "ENDTRNS\n";
            });

            const blob = new Blob([iif], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName.replace(/\.[^/.]+$/, "") + ".iif";
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            setError("Export failed. Please check your data.");
        }
    };

    const requirements = {
        date: mapping.date !== null,
        amount: mapping.amount !== null || (mapping.credit !== null || mapping.debit !== null),
        name: mapping.name !== null
    };

    // Validation State
    const [validationSummary, setValidationSummary] = useState<ValidationSummary>({
        isValid: true,
        invalidDates: 0,
        invalidAmounts: 0,
        emptyDescriptions: 0,
        issues: [] as { row: number; field: string; message: string }[]
    });

    // Validates transactions whenever they change (or mapping changes)
    useEffect(() => {
        if (transactions.length === 0) {
            setValidationSummary({ isValid: true, invalidDates: 0, invalidAmounts: 0, emptyDescriptions: 0, issues: [] });
            return;
        }

        const issues: { row: number; field: string; message: string }[] = [];
        let invalidDates = 0;
        let invalidAmounts = 0;
        let emptyDescriptions = 0;

        transactions.forEach((t, idx) => {
            // Check Date
            const dateValid = /^\d{4}-\d{2}-\d{2}$/.test(t.date) && !isNaN(Date.parse(t.date));
            if (!dateValid) {
                invalidDates++;
                issues.push({ row: idx + 1, field: 'date', message: 'Invalid Date Format' });
            }

            // Check Amount (must be non-zero number)
            const amt = parseFloat(t.amount);
            if (isNaN(amt) || amt === 0) {
                invalidAmounts++;
                issues.push({ row: idx + 1, field: 'amount', message: 'Invalid Amount' });
                // Also flag credit/debit if that's how we are mapping
                if (mapping.amount === null) {
                    issues.push({ row: idx + 1, field: 'credit', message: 'Check Credit' });
                    issues.push({ row: idx + 1, field: 'debit', message: 'Check Debit' });
                }
            }

            // Check Payee (Warning only, usually)
            if (!t.name || t.name.trim() === "") {
                emptyDescriptions++;
                // issues.push({ row: idx + 1, field: 'name', message: 'Empty Payee' }); // strict validation?
            }
        });

        setValidationSummary({
            isValid: issues.length === 0,
            invalidDates,
            invalidAmounts,
            emptyDescriptions,
            issues
        });
    }, [transactions, mapping]); // Dependencies

    const autoFixDates = () => {
        const newEdits = { ...manualEdits };
        let fixedCount = 0;

        transactions.forEach((t) => {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(t.date)) {
                // Try to repair
                const dateStr = t.rawDate || t.date;
                const parsed = parseRegionalDate(dateStr, selectedCountry) || parseDayMonthDate(dateStr);
                if (parsed) {
                    newEdits[t.id] = { ...newEdits[t.id], date: parsed };
                    fixedCount++;
                }
            }
        });

        if (fixedCount > 0) setManualEdits(newEdits);
    };

    // Helper to render editable cell
    const renderEditableCell = (txn: Transaction, field: keyof Transaction, idx: number, textColor: string = "") => {
        const isEditing = editingCell?.row === idx && editingCell?.field === field;
        const value = txn[field];

        // Error checking
        let errorField = field as string;
        if (field === "date") errorField = "date"; // redundant but clear
        if (field === "credit" || field === "debit") errorField = "amount"; // map these back to amount error

        const hasError = validationSummary.issues.some(i => i.row === idx + 1 && i.field === errorField);

        const cellClass = hasError
            ? "px-4 py-2 bg-red-500/10 border-l-2 border-red-500"
            : "px-4 py-1";

        return (
            <td className={cellClass}>
                {isEditing ? (
                    <input
                        autoFocus
                        defaultValue={value}
                        onBlur={(e) => {
                            updateTransaction(txn.id, field, e.target.value);
                            setEditingCell(null);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                updateTransaction(txn.id, field, (e.target as HTMLInputElement).value);
                                setEditingCell(null);
                            }
                        }}
                        className="w-full px-2 py-1 rounded border-2 border-[hsl(var(--primary))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] outline-none"
                    />
                ) : (
                    <div
                        onClick={() => setEditingCell({ row: idx, field })}
                        className={`cursor-pointer px-2 py-1 rounded border border-transparent hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--primary))]/5 transition-all group ${textColor} ${hasError ? 'border-red-500/50 bg-red-500/5' : ''}`}
                        title={hasError ? "Invalid value" : "Click to edit"}
                    >
                        <span className={hasError ? 'text-red-500' : ''}>
                            {value || <span className="text-[hsl(var(--muted-foreground))]/50">—</span>}
                        </span>
                        {hasError && <AlertCircle className="w-3 h-3 inline ml-1 text-red-500" />}
                    </div>
                )}
            </td>
        );
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {showMappingFeedback && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-[hsl(var(--card))] rounded-2xl p-6 max-w-md w-full border border-[hsl(var(--border))]">
                        <h3 className="text-xl font-bold mb-2 text-[hsl(var(--foreground))]">Columns Missing</h3>
                        <p className="text-[hsl(var(--muted-foreground))] mb-4">Please map these columns manually:</p>
                        <ul className="list-disc pl-5 mb-6 text-sm text-[hsl(var(--foreground))]">
                            {missingColumns.map(c => <li key={c}>{c}</li>)}
                        </ul>
                        <Button onClick={() => setShowMappingFeedback(false)} className="w-full">Okay</Button>
                    </div>
                </div>
            )}

            {!hideHeader && (
                <div className="text-center mb-4">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[hsl(var(--foreground))]">Convert CSV to IIF</h1>
                    <p className="text-[hsl(var(--muted-foreground))]">Import transactions into QuickBooks Desktop (IIF).</p>
                </div>
            )}

            {!hasFile ? (
                <>
                    <div
                        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer overflow-hidden transition-all ${isDragging ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5" : "hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--muted))]/30 border-[hsl(var(--border))]"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.3) 1px, transparent 0)`, backgroundSize: '24px 24px' }} />
                        <input ref={fileInputRef} type="file" className="hidden" accept=".csv,.xlsx,.xls" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
                        <div className="relative z-10">
                            <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/5 flex items-center justify-center shadow-lg mb-4">
                                <FileUp className="w-10 h-10 text-[hsl(var(--primary))]" />
                            </div>
                            <p className="text-xl font-semibold text-[hsl(var(--foreground))]">Drop CSV or Excel here</p>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">or click to browse</p>
                        </div>
                    </div>
                    <PrivacyBadge />
                </>
            ) : (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileSpreadsheet className="w-5 h-5 text-[hsl(var(--primary))]" />
                            <span className="font-medium text-[hsl(var(--foreground))]">{fileName}</span>
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">({transactions.length} rows)</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => { setHasFile(false); setMapping({ date: null, amount: null, credit: null, debit: null, name: null, memo: null, docNum: null, account: null, type: null }); }}>
                            <X className="w-4 h-4 mr-1" /> Start Over
                        </Button>
                    </div>

                    {showInfoBanner && (
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <Info className="w-4 h-4" />
                                <span>QuickBooks IIF requires strict formatting. We auto-fix dates and handle the complex !TRNS blocks for you.</span>
                            </div>
                            <button onClick={() => setShowInfoBanner(false)}><X className="w-4 h-4 opacity-50" /></button>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-4 items-start">
                        <div>
                            <label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1"><Globe className="w-3 h-3 inline mr-1" />Region</label>
                            <select value={selectedCountry} onChange={e => handleCountryChange(e.target.value)} className="p-2 text-sm rounded-lg border bg-[hsl(var(--background))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]">
                                {COUNTRY_PRESETS.map(c => <option key={c.value} value={c.value} className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">{c.label}</option>)}
                            </select>
                        </div>
                        <div className="flex-1 p-3 rounded-lg bg-[hsl(var(--muted))]/30 border border-[hsl(var(--border))] flex flex-wrap gap-3 text-xs items-center">
                            <span className="font-medium text-[hsl(var(--muted-foreground))]">Requirements:</span>
                            <span className={`flex items-center gap-1 ${requirements.date ? 'text-green-500' : 'text-amber-500'}`}>
                                {requirements.date ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />} Date
                            </span>
                            <span className={`flex items-center gap-1 ${requirements.amount ? 'text-green-500' : 'text-amber-500'}`}>
                                {requirements.amount ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />} Amount
                            </span>
                            <span className={`flex items-center gap-1 ${requirements.name ? 'text-green-500' : 'text-amber-500'}`}>
                                {requirements.name ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />} Payee/Name
                            </span>
                            {transactions.length > 0 && (
                                <span className={`flex items-center gap-1 ${validationSummary.isValid ? 'text-green-500' : 'text-red-500'}`}>
                                    {validationSummary.isValid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                                    {validationSummary.isValid ? 'Data Valid' : `${validationSummary.issues.length} Issues`}
                                </span>
                            )}
                        </div>
                    </div>

                    {!validationSummary.isValid && transactions.length > 0 && (
                        <div className="flex flex-wrap gap-2 text-xs">
                            {validationSummary.invalidDates > 0 && (
                                <span className="px-2 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {validationSummary.invalidDates} invalid dates
                                    <button onClick={autoFixDates} className="ml-1 underline hover:no-underline font-medium">Fix</button>
                                </span>
                            )}
                            {validationSummary.invalidAmounts > 0 && (
                                <span className="px-2 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {validationSummary.invalidAmounts} invalid amounts
                                </span>
                            )}
                        </div>
                    )}

                    <div className="p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Settings2 className="w-4 h-4 text-[hsl(var(--primary))]" />
                                <span className="font-medium text-[hsl(var(--foreground))]">Mapping & Settings</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Bank Account Name:</label>
                                <input
                                    type="text"
                                    value={bankAccountName}
                                    onChange={(e) => setBankAccountName(e.target.value)}
                                    className="p-1 px-2 text-sm rounded border bg-[hsl(var(--background))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]"
                                />
                            </div>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <label className="text-xs font-medium block mb-1 text-[hsl(var(--muted-foreground))]">Date *</label>
                                <select value={mapping.date ?? ""} onChange={e => setMapping(p => ({ ...p, date: e.target.value ? parseInt(e.target.value) : null }))} className="w-full p-2 text-sm rounded-lg border bg-[hsl(var(--background))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]">
                                    <option value="" className="bg-[hsl(var(--background))]">Select...</option>
                                    {csvHeaders.map((h, i) => <option key={i} value={i} className="bg-[hsl(var(--background))]">{h}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-medium block mb-1 text-[hsl(var(--muted-foreground))]">Amount *</label>
                                <select value={mapping.amount ?? ""} onChange={e => setMapping(p => ({ ...p, amount: e.target.value ? parseInt(e.target.value) : null, credit: null, debit: null }))} className="w-full p-2 text-sm rounded-lg border bg-[hsl(var(--background))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]">
                                    <option value="" className="bg-[hsl(var(--background))]">Select...</option>
                                    {csvHeaders.map((h, i) => <option key={i} value={i} className="bg-[hsl(var(--background))]">{h}</option>)}
                                </select>
                            </div>

                            {/* Show Credit/Debit ONLY if Amount is NOT picked */}
                            {mapping.amount === null && (
                                <>
                                    <div>
                                        <label className="text-xs font-medium block mb-1 text-[hsl(var(--muted-foreground))]">Credit</label>
                                        <select value={mapping.credit ?? ""} onChange={e => setMapping(p => ({ ...p, credit: e.target.value ? parseInt(e.target.value) : null }))} className="w-full p-2 text-sm rounded-lg border bg-[hsl(var(--background))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]">
                                            <option value="" className="bg-[hsl(var(--background))]">None</option>
                                            {csvHeaders.map((h, i) => <option key={i} value={i} className="bg-[hsl(var(--background))]">{h}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium block mb-1 text-[hsl(var(--muted-foreground))]">Debit</label>
                                        <select value={mapping.debit ?? ""} onChange={e => setMapping(p => ({ ...p, debit: e.target.value ? parseInt(e.target.value) : null }))} className="w-full p-2 text-sm rounded-lg border bg-[hsl(var(--background))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]">
                                            <option value="" className="bg-[hsl(var(--background))]">None</option>
                                            {csvHeaders.map((h, i) => <option key={i} value={i} className="bg-[hsl(var(--background))]">{h}</option>)}
                                        </select>
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="text-xs font-medium block mb-1 text-[hsl(var(--muted-foreground))]">Payee/Name</label>
                                <select value={mapping.name ?? ""} onChange={e => setMapping(p => ({ ...p, name: e.target.value ? parseInt(e.target.value) : null }))} className="w-full p-2 text-sm rounded-lg border bg-[hsl(var(--background))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]">
                                    <option value="" className="bg-[hsl(var(--background))]">Select...</option>
                                    {csvHeaders.map((h, i) => <option key={i} value={i} className="bg-[hsl(var(--background))]">{h}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-medium block mb-1 text-[hsl(var(--muted-foreground))]">Type (Dr/Cr) <span className="text-[10px] text-[hsl(var(--muted-foreground))] font-normal">(Optional)</span></label>
                                <select value={mapping.type ?? ""} onChange={e => setMapping(p => ({ ...p, type: e.target.value ? parseInt(e.target.value) : null }))} className="w-full p-2 text-sm rounded-lg border bg-[hsl(var(--background))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]">
                                    <option value="" className="bg-[hsl(var(--background))]">None (Use +/- in Amount)</option>
                                    {csvHeaders.map((h, i) => <option key={i} value={i} className="bg-[hsl(var(--background))]">{h}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-medium block mb-1 text-[hsl(var(--muted-foreground))]">Memo/Description</label>
                                <select value={mapping.memo ?? ""} onChange={e => setMapping(p => ({ ...p, memo: e.target.value ? parseInt(e.target.value) : null }))} className="w-full p-2 text-sm rounded-lg border bg-[hsl(var(--background))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]">
                                    <option value="" className="bg-[hsl(var(--background))]">Select...</option>
                                    {csvHeaders.map((h, i) => <option key={i} value={i} className="bg-[hsl(var(--background))]">{h}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-medium block mb-1 text-[hsl(var(--muted-foreground))]">Category (Dest Acc)</label>
                                <select value={mapping.account ?? ""} onChange={e => setMapping(p => ({ ...p, account: e.target.value ? parseInt(e.target.value) : null }))} className="w-full p-2 text-sm rounded-lg border bg-[hsl(var(--background))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]">
                                    <option value="" className="bg-[hsl(var(--background))]">Use Default (Uncategorized)</option>
                                    {csvHeaders.map((h, i) => <option key={i} value={i} className="bg-[hsl(var(--background))]">{h}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-medium block mb-1 text-[hsl(var(--muted-foreground))]">Check Number</label>
                                <select value={mapping.docNum ?? ""} onChange={e => setMapping(p => ({ ...p, docNum: e.target.value ? parseInt(e.target.value) : null }))} className="w-full p-2 text-sm rounded-lg border bg-[hsl(var(--background))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]">
                                    <option value="" className="bg-[hsl(var(--background))]">None</option>
                                    {csvHeaders.map((h, i) => <option key={i} value={i} className="bg-[hsl(var(--background))]">{h}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2 mb-3">
                            <GripVertical className="w-4 h-4" />
                            <span>Drag rows to reorder. Click cells to edit.</span>
                        </div>

                        <div className="rounded-xl border border-[hsl(var(--border))] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-[hsl(var(--muted))]/50 text-[hsl(var(--muted-foreground))] font-medium">
                                        <tr>
                                            <th className="w-8 px-2 py-3"></th>
                                            <th className="p-3">Date</th>
                                            <th className="p-3">Payee</th>
                                            {mapping.amount !== null ? (
                                                <th className="p-3">Amount</th>
                                            ) : (
                                                <>
                                                    <th className="p-3">Credit</th>
                                                    <th className="p-3">Debit</th>
                                                </>
                                            )}
                                            <th className="p-3">Memo</th>
                                            <th className="p-3">Category</th>
                                            <th className="p-3 text-right"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.slice(0, 50).map((t, idx) => (
                                            <tr
                                                key={t.id}
                                                draggable
                                                onDragStart={() => handleDragStart(idx)}
                                                onDragOver={(e) => handleDragOver(e, idx)}
                                                onDragEnd={handleDragEnd}
                                                className={`border-t border-[hsl(var(--border))] ${draggedRow === idx ? "bg-[hsl(var(--primary))]/5" : "hover:bg-[hsl(var(--muted))]/20"} transition-colors`}
                                            >
                                                <td className="px-2 py-2 cursor-grab">
                                                    <GripVertical className="w-4 h-4 text-[hsl(var(--muted-foreground))]/50" />
                                                </td>
                                                {renderEditableCell(t, 'date', idx, 'font-mono text-xs')}
                                                {renderEditableCell(t, 'name', idx)}

                                                {mapping.amount !== null ? (
                                                    renderEditableCell(t, 'amount', idx, parseFloat(t.amount) < 0 ? 'text-red-500 font-medium' : 'text-green-500 font-medium')
                                                ) : (
                                                    <>
                                                        {renderEditableCell(t, 'credit', idx, 'text-green-500 font-medium')}
                                                        {renderEditableCell(t, 'debit', idx, 'text-red-500 font-medium')}
                                                    </>
                                                )}

                                                {renderEditableCell(t, 'memo', idx, 'text-[hsl(var(--muted-foreground))] max-w-[200px] truncate')}
                                                {renderEditableCell(t, 'account', idx, 'text-[hsl(var(--muted-foreground))]')}

                                                <td className="px-2 py-2 text-right">
                                                    <button onClick={() => {
                                                        const idx = parseInt(t.id.replace("txn-", ""));
                                                        setCsvData(d => d.filter((_, i) => i !== idx));
                                                    }} className="p-1 rounded hover:bg-red-500/10 text-[hsl(var(--muted-foreground))] hover:text-red-500 transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button size="lg" onClick={convertToIIF} className="w-full md:w-auto" disabled={!requirements.date || (!requirements.amount && !mapping.credit && !mapping.debit)}>
                            <Download className="w-5 h-5 mr-2" />
                            Download IIF File
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
