"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
    FileUp,
    X,
    CheckCircle2,
    AlertTriangle,
    AlertCircle,
    Info,
    FileSpreadsheet,
    Download,
    Loader2,
    Trash2,
    GripVertical,
    Settings2,
    Globe,
    FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";
import * as XLSX from "xlsx";

// --- Types & Interfaces ---

interface ColumnMapping {
    date: number | null;
    amount: number | null;
    credit: number | null;
    debit: number | null;
    description: number | null;
    type: number | null;
    checkNum: number | null;
    memo: number | null;
}

interface Transaction {
    id: string;
    date: string;       // Normalized YYYY-MM-DD
    rawDate: string;    // Original input
    amount: string;     // Normalized amount
    credit: string;     // Raw credit
    debit: string;      // Raw debit
    description: string;
    type: string;
    checkNum: string;
    memo: string;
}

// --- Constants & Helpers (Ported from CsvToQboTool) ---

const MONTH_NAMES: Record<string, string> = {
    'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'may': '05', 'jun': '06',
    'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12',
    'january': '01', 'february': '02', 'march': '03', 'april': '04', 'june': '06',
    'july': '07', 'august': '08', 'september': '09', 'october': '10', 'november': '11', 'december': '12',
};

// Region-based formats
const REGION_DATE_FORMATS: Record<string, { patterns: RegExp[], parser: (match: RegExpMatchArray, year: number) => string }[]> = {
    'US': [
        { patterns: [/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/], parser: (m, _) => `${m[3]}-${m[1].padStart(2, '0')}-${m[2].padStart(2, '0')}` },
        { patterns: [/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{2})$/], parser: (m, _) => `20${m[3]}-${m[1].padStart(2, '0')}-${m[2].padStart(2, '0')}` },
    ],
    'UK': [ // Also EU/AU etc.
        { patterns: [/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/], parser: (m, _) => `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` },
        { patterns: [/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{2})$/], parser: (m, _) => `20${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` },
    ],
};

const UNIVERSAL_DATE_FORMATS = [
    { pattern: /^(\d{4})-(\d{2})-(\d{2})$/, parser: (m: RegExpMatchArray) => `${m[1]}-${m[2]}-${m[3]}` },
    { pattern: /^(\d{4})(\d{2})(\d{2})$/, parser: (m: RegExpMatchArray) => `${m[1]}-${m[2]}-${m[3]}` },
];

const parseRegionalDate = (dateStr: string, region: string): string | null => {
    const trimmed = dateStr.trim();
    if (!trimmed) return null;
    const currentYear = new Date().getFullYear();

    // Universal
    for (const fmt of UNIVERSAL_DATE_FORMATS) {
        const match = trimmed.match(fmt.pattern);
        if (match) return fmt.parser(match);
    }

    // Regional
    const regionFormats = REGION_DATE_FORMATS[region] || REGION_DATE_FORMATS['US'];
    for (const fmt of regionFormats) {
        for (const pattern of fmt.patterns) {
            const match = trimmed.match(pattern);
            if (match) return fmt.parser(match, currentYear);
        }
    }
    return null;
};

const parseDayMonthDate = (d: string): string => {
    const currentYear = new Date().getFullYear();
    const parts = d.split(/[-\/]/);
    if (parts.length !== 2) return '';
    const day = parts[0].padStart(2, '0');
    const monthStr = parts[1].toLowerCase();
    const month = MONTH_NAMES[monthStr];
    if (!month) return '';
    return `${currentYear}-${month}-${day}`;
};

const COUNTRY_PRESETS = [
    { value: "US", label: "🇺🇸 United States", dateFormat: "MM/DD/YYYY", region: "US" },
    { value: "UK", label: "🇬🇧 United Kingdom", dateFormat: "DD/MM/YYYY", region: "UK" },
    { value: "CA", label: "🇨🇦 Canada", dateFormat: "MM/DD/YYYY", region: "US" },
    { value: "AU", label: "🇦🇺 Australia", dateFormat: "DD/MM/YYYY", region: "UK" },
    { value: "EU", label: "🇪🇺 Europe", dateFormat: "DD/MM/YYYY", region: "UK" },
];

const DATE_FORMATS = [
    { pattern: /^\d{4}-\d{2}-\d{2}$/, label: "YYYY-MM-DD", parse: (d: string) => d },
    { pattern: /^\d{2}\/\d{2}\/\d{4}$/, label: "MM/DD/YYYY", parse: (d: string) => { const parts = d.split("/"); if (parts.length < 3) return d; const [m, day, y] = parts; return `${y}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`; } },
    { pattern: /^\d{2}\/\d{2}\/\d{4}$/, label: "DD/MM/YYYY", parse: (d: string) => { const parts = d.split("/"); if (parts.length < 3) return d; const [day, m, y] = parts; return `${y}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`; } },
    { pattern: /^\d{1,2}[-\/][A-Za-z]{3}$/, label: "D-MMM (e.g., 1-Sep)", parse: parseDayMonthDate },
];

// --- Main Component ---

export function QuickBooksValidatorTool({ hideHeader = false }: { hideHeader?: boolean } = {}) {
    // State
    const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
    const [csvData, setCsvData] = useState<string[][]>([]);
    const [fileName, setFileName] = useState<string>("");
    const [mapping, setMapping] = useState<ColumnMapping>({
        date: null, amount: null, credit: null, debit: null, description: null, type: null, checkNum: null, memo: null
    });
    const [dateFormat, setDateFormat] = useState<string>("MM/DD/YYYY");
    const [detectedFormat, setDetectedFormat] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showMappingFeedback, setShowMappingFeedback] = useState(false);
    const [missingColumns, setMissingColumns] = useState<string[]>([]);
    const [hasFile, setHasFile] = useState(false);
    const [editingCell, setEditingCell] = useState<{ row: number; field: keyof Transaction } | null>(null);
    const [draggedRow, setDraggedRow] = useState<number | null>(null);
    const [manualEdits, setManualEdits] = useState<Record<string, Partial<Transaction>>>({});
    const [selectedCountry, setSelectedCountry] = useState<string>("US");
    const [showInfoBanner, setShowInfoBanner] = useState(true);
    const [hasAutoFixed, setHasAutoFixed] = useState(false);
    const [fixedDatesCount, setFixedDatesCount] = useState<number>(0);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // -- Handlers --

    const handleCountryChange = (countryCode: string) => {
        setSelectedCountry(countryCode);
        const preset = COUNTRY_PRESETS.find(c => c.value === countryCode);
        if (preset) setDateFormat(preset.dateFormat);
    };

    const parseCSV = (text: string) => {
        const lines = text.trim().split(/\r?\n/);
        if (lines.length < 2) throw new Error("CSV must have header + data");
        const parseRow = (line: string) => {
            // Simple quote-aware split (can rely on regex or loop)
            const res: string[] = [];
            let cur = "", inQ = false;
            for (let i = 0; i < line.length; i++) {
                const c = line[i];
                if (c === '"') {
                    if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
                    else inQ = !inQ;
                } else if (c === ',' && !inQ) { res.push(cur.trim()); cur = ""; }
                else cur += c;
            }
            res.push(cur.trim());
            return res;
        };
        const headers = parseRow(lines[0]);
        const data = lines.slice(1).map(parseRow).filter(r => r.some(c => c.trim()));
        return { headers, data };
    };

    const autoMapColumns = (headers: string[]): ColumnMapping => {
        const newMap: ColumnMapping = { date: null, amount: null, credit: null, debit: null, description: null, type: null, checkNum: null, memo: null };
        const low = headers.map(h => h.toLowerCase().trim());

        const setIdx = (keys: string[], field: keyof ColumnMapping) => {
            const idx = low.findIndex(h => keys.some(k => h.includes(k)));
            if (idx >= 0) newMap[field] = idx;
        };

        setIdx(["date", "posted"], "date");
        setIdx(["desc", "payee", "name", "narrative"], "description");
        setIdx(["credit", "deposit"], "credit");
        setIdx(["debit", "withdrawal"], "debit");

        // If no separate credit/debit, look for amount
        if (newMap.credit === null && newMap.debit === null) {
            setIdx(["amount", "value", "sum"], "amount");
        }

        setIdx(["type", "trntype"], "type");
        setIdx(["check", "ref", "cheque"], "checkNum");
        setIdx(["memo", "note"], "memo");

        return newMap;
    };

    const detectDateFormat = (dates: string[]) => {
        for (const fmt of DATE_FORMATS) {
            if (dates.slice(0, 5).every(d => fmt.pattern.test(d))) return fmt.label;
        }
        return "MM/DD/YYYY";
    };

    // -- File Load --
    const handleFiles = useCallback((fileList: FileList | File[]) => {
        setError(null);
        const file = Array.from(fileList).find(f =>
            f.name.match(/\.(csv|xlsx|xls)$/i) || f.type.includes("sheet") || f.type.includes("csv")
        );
        if (!file) { setError("Please upload a valid CSV or Excel file."); return; }

        setFileName(file.name);
        setIsProcessing(true);

        const reader = new FileReader();

        const processData = (headers: string[], data: string[][]) => {
            setCsvHeaders(headers);
            setCsvData(data);
            setManualEdits({});
            setHasAutoFixed(false);

            const mapping = autoMapColumns(headers);
            setMapping(mapping);

            // Check missing
            const missing = [];
            if (mapping.date === null) missing.push("Date column");
            if (mapping.description === null) missing.push("Description column");
            if (mapping.amount === null && (mapping.credit === null || mapping.debit === null)) missing.push("Amount (or Credit/Debit)");

            if (missing.length > 0) {
                setMissingColumns(missing);
                setShowMappingFeedback(true);
            } else if (mapping.date !== null) {
                const dates = data.slice(0, 10).map(r => r[mapping.date!]).filter(Boolean);
                setDetectedFormat(detectDateFormat(dates));
            }
            setHasFile(true);
            setIsProcessing(false);
        };

        if (file.name.endsWith(".csv")) {
            reader.onload = (e) => {
                try {
                    const { headers, data } = parseCSV(e.target?.result as string);
                    processData(headers, data);
                } catch (e) { setError("Failed to parse CSV."); setIsProcessing(false); }
            };
            reader.readAsText(file);
        } else {
            // Excel
            reader.onload = (e) => {
                try {
                    const wb = XLSX.read(e.target?.result, { type: 'binary' });
                    const ws = wb.Sheets[wb.SheetNames[0]];
                    const json = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' }) as string[][];
                    if (json.length < 2) throw new Error("Empty Excel file");
                    const headers = json[0].map(String);
                    const data = json.slice(1).map(r => headers.map((_, i) => String(r[i] || ''))).filter(r => r.some(c => c.trim()));
                    processData(headers, data);
                } catch (e) { setError("Failed to parse Excel."); setIsProcessing(false); }
            };
            reader.readAsBinaryString(file);
        }
    }, []);

    // -- Derived Transactions --
    const transactions = useMemo<Transaction[]>(() => {
        const hasAmount = mapping.amount !== null;
        const hasCrDr = mapping.credit !== null || mapping.debit !== null;
        if (!hasFile || mapping.date === null || (!hasAmount && !hasCrDr)) return [];

        const fmt = DATE_FORMATS.find(f => f.label === dateFormat);
        const parseFn = fmt?.parse || ((d: string) => d);

        return csvData.map((row, idx) => {
            const id = `txn-${idx}`;
            const rawDate = row[mapping.date!] || "";
            const rawCredit = mapping.credit !== null ? row[mapping.credit] || "" : "";
            const rawDebit = mapping.debit !== null ? row[mapping.debit] || "" : "";

            let amount = "0";
            let type = "";

            if (hasAmount) {
                amount = row[mapping.amount!] || "0";
            } else {
                const cVal = parseFloat(rawCredit.replace(/[^-\d.]/g, "") || "0");
                const dVal = parseFloat(rawDebit.replace(/[^-\d.]/g, "") || "0");
                if (cVal > 0) { amount = cVal.toString(); type = "CREDIT"; }
                else if (dVal > 0) { amount = (-dVal).toString(); type = "DEBIT"; }
            }

            let parsedDate = parseFn(rawDate);
            // Basic fix attempt if parseFn fails (returns same/garbage)
            if (!parsedDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
                // Try basic ISO detection
            }

            const base: Transaction = {
                id,
                date: parsedDate,
                rawDate,
                amount,
                credit: rawCredit,
                debit: rawDebit,
                description: mapping.description !== null ? row[mapping.description] || "" : "",
                type: mapping.type !== null ? row[mapping.type] || "" : type,
                checkNum: mapping.checkNum !== null ? row[mapping.checkNum] || "" : "",
                memo: mapping.memo !== null ? row[mapping.memo] || "" : ""
            };

            const edit = manualEdits[id];
            return edit ? { ...base, ...edit } : base;
        });
    }, [csvData, mapping, dateFormat, manualEdits, hasFile]);

    // -- Validation Logic --
    const validationSummary = useMemo(() => {
        // Critical Check: If required columns aren't mapped, it's NOT valid
        const hasDate = mapping.date !== null;
        const hasAmount = mapping.amount !== null || (mapping.credit !== null || mapping.debit !== null);
        const hasDesc = mapping.description !== null;

        if (!hasDate || !hasAmount || !hasDesc) {
            return {
                issues: [],
                invalidDates: 0,
                invalidAmounts: 0,
                emptyDescriptions: 0,
                isValid: false
            };
        }

        const issues: { row: number; field: string; message: string; type: 'error' | 'warning' }[] = [];
        const seenRows = new Set<string>();

        transactions.forEach((t, idx) => {
            // 1. Duplicate Detection
            const uniqueKey = `${t.date}|${t.amount}|${t.description.trim().toLowerCase()}`;
            if (seenRows.has(uniqueKey)) {
                issues.push({ row: idx + 1, field: "general", message: "Duplicate Transaction Detect detected", type: 'warning' });
            } else {
                seenRows.add(uniqueKey);
            }

            // 2. Date Checks
            const dateTimestamp = Date.parse(t.date);
            const dateObj = new Date(dateTimestamp);
            const dateValid = !isNaN(dateTimestamp) && t.date.length >= 8;

            if (!dateValid) {
                issues.push({ row: idx + 1, field: "date", message: "Invalid Date format", type: 'error' });
            } else {
                if (dateObj.getFullYear() < 2000) {
                    issues.push({ row: idx + 1, field: "date", message: "Date is too old (< 2000)", type: 'warning' });
                }
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + 30);
                if (dateObj > futureDate) {
                    issues.push({ row: idx + 1, field: "date", message: "Future date detected", type: 'warning' });
                }
            }

            // 3. Amount Checks
            const amtStr = t.amount.replace(/[^-\d.]/g, "");
            const amt = parseFloat(amtStr);
            if (isNaN(amt) || amt === 0) {
                issues.push({ row: idx + 1, field: "amount", message: "Invalid or Zero Amount", type: 'error' });
            } else {
                // Precision check (more than 2 decimals)
                if (amtStr.includes('.') && amtStr.split('.')[1].length > 2) {
                    issues.push({ row: idx + 1, field: "amount", message: "Precision > 2 decimals (will round)", type: 'warning' });
                }
            }

            // 4. Description/Memo Checks
            if (!t.description.trim()) issues.push({ row: idx + 1, field: "description", message: "Empty Description", type: 'error' });
            if (t.description.includes(":")) issues.push({ row: idx + 1, field: "description", message: "Contains colon (:)", type: 'error' });
            if (t.description.length > 100) issues.push({ row: idx + 1, field: "description", message: "Desc > 100 chars", type: 'warning' });

            if (t.memo.length > 1000) issues.push({ row: idx + 1, field: "memo", message: "Memo > 1000 chars", type: 'error' });
        });

        // Errors block export, Warnings do not (but are shown)
        const blockingErrors = issues.filter(i => i.type === 'error');

        return {
            issues,
            blockingErrors,
            invalidDates: issues.filter(i => i.field === "date" && i.type === 'error').length,
            invalidAmounts: issues.filter(i => i.field === "amount" && i.type === 'error').length,
            emptyDescriptions: issues.filter(i => i.field === "description" && i.type === 'error').length,
            isValid: blockingErrors.length === 0
        };
    }, [transactions, mapping]);

    const requirementsStatus = {
        hasDate: mapping.date !== null,
        hasAmount: mapping.amount !== null || (mapping.credit !== null || mapping.debit !== null),
        hasDescription: mapping.description !== null
    };




    // -- Drag/Drop/Edit Helpers --
    const updateTransaction = (id: string, field: keyof Transaction, val: string) => {
        setManualEdits(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: val, ...(field === 'date' ? { rawDate: val } : {}) }
        }));
    };

    const deleteTransaction = (idx: number) => {
        setCsvData(prev => prev.filter((_, i) => i !== idx));
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault(); setIsDragging(false);
        if (e.dataTransfer.files[0]) handleFiles(e.dataTransfer.files);
    }, [handleFiles]);

    const downloadReport = () => {
        // Simple text report generation
        const report = transactions.map((t, i) => {
            const errs = validationSummary.issues.filter(is => is.row === i + 1).map(is => is.message).join(", ");
            return `Row ${i + 1}: ${errs || "OK"} | ${t.date} | ${t.description} | ${t.amount}`;
        }).join("\n");
        const blob = new Blob([report], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = "validation-report.txt";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            {!hideHeader && (
                <div className="text-center mb-4">
                    <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: "QuickBooks Validator" }]} />
                    <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">QuickBooks Import Validator</h1>
                    <h2 className="text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto font-normal">Check and fix CSV import errors instantly in your browser.</h2>
                </div>
            )}

            {/* Missing Columns Modal */}
            {showMappingFeedback && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[hsl(var(--card))] rounded-2xl shadow-xl max-w-md w-full border border-[hsl(var(--border))]">
                        <div className="p-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-6 h-6 text-amber-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Missing Columns</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                                We couldn't find some required columns: <strong>{missingColumns.join(", ")}</strong>. Please map them manually.
                            </p>
                            <Button onClick={() => setShowMappingFeedback(false)} className="w-full">OK, I'll Map Them</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Zone */}
            {!hasFile && (
                <div
                    onDrop={handleDrop}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
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

                    <input type="file" ref={fileInputRef} className="hidden" accept=".csv,.xlsx,.xls" onChange={(e) => e.target.files && handleFiles(e.target.files)} />

                    <div className="relative z-10 space-y-4">
                        <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/5 flex items-center justify-center shadow-lg">
                            <FileUp className="w-10 h-10 text-[hsl(var(--primary))]" />
                        </div>
                        <div>
                            <p className="text-xl font-semibold text-[hsl(var(--foreground))]">
                                Drop CSV or Excel here
                            </p>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                                or click to browse
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                            <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.CSV</span>
                            <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.XLSX</span>
                            <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.XLS</span>
                            <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">Private</span>
                        </div>
                    </div>
                </div>
            )}

            {hasFile && (
                <div className="space-y-6">
                    {/* Top Info Bar */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileSpreadsheet className="w-5 h-5 text-[hsl(var(--primary))]" />
                            <span className="font-medium text-[hsl(var(--foreground))]">{fileName}</span>
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">({transactions.length} rows)</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => {
                            setHasFile(false);
                            setCsvData([]);
                            setCsvHeaders([]);
                            setFileName("");
                            setError(null);
                        }}>
                            <X className="w-4 h-4 mr-1" /> Start Over
                        </Button>
                    </div>

                    {/* Requirements / Status */}
                    <div className="flex flex-wrap gap-4 items-start">
                        <div className="flex-shrink-0">
                            <label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">
                                <Globe className="w-3 h-3 inline mr-1" /> Region
                            </label>
                            <select value={selectedCountry} onChange={(e) => handleCountryChange(e.target.value)} className="p-2 text-sm rounded-lg border bg-[hsl(var(--background))]">
                                {COUNTRY_PRESETS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                            </select>
                        </div>
                        <div className="flex-1 p-3 rounded-lg bg-[hsl(var(--muted))]/30 border">
                            <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] mb-2">Checks</p>
                            <div className="flex flex-wrap gap-3 text-xs">
                                <span className={`flex items-center gap-1 ${requirementsStatus.hasDate ? 'text-green-500' : 'text-amber-500'}`}>
                                    {requirementsStatus.hasDate ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />} Date Column
                                </span>
                                <span className={`flex items-center gap-1 ${requirementsStatus.hasAmount ? 'text-green-500' : 'text-amber-500'}`}>
                                    {requirementsStatus.hasAmount ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />} Amount
                                </span>
                                <span className={`flex items-center gap-1 ${requirementsStatus.hasDescription ? 'text-green-500' : 'text-amber-500'}`}>
                                    {requirementsStatus.hasDescription ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />} Description
                                </span>
                                {transactions.length > 0 && (
                                    <span className={`flex items-center gap-1 ml-auto font-bold ${validationSummary.isValid ? 'text-green-600' : 'text-red-600'}`}>
                                        {validationSummary.isValid ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                                        {validationSummary.isValid ? "Valid" : `${validationSummary.issues.length} Errors`}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Status Feedback Row */}
                    {!validationSummary.isValid && (
                        <div className="flex flex-wrap gap-2 text-xs">
                            {validationSummary.invalidDates > 0 && (
                                <span className="px-2 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> {validationSummary.invalidDates} invalid dates found (click cell to fix)
                                </span>
                            )}
                            {validationSummary.invalidAmounts > 0 && <span className="px-2 py-1 rounded bg-red-500/10 text-red-500"> {validationSummary.invalidAmounts} invalid amounts </span>}
                            {validationSummary.emptyDescriptions > 0 && <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-600"> {validationSummary.emptyDescriptions} missing descriptions </span>}
                        </div>
                    )}

                    {/* Column Mapping Grid */}
                    <div className="p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                        <div className="flex items-center gap-2 mb-4">
                            <Settings2 className="w-4 h-4 text-[hsl(var(--primary))]" />
                            <span className="font-medium text-[hsl(var(--foreground))]">Column Mapping</span>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                            {/* Helper to render select */}
                            {[
                                { label: "Date", field: "date", req: true },
                                { label: "Amount", field: "amount", req: mapping.credit === null && mapping.debit === null },
                                { label: "Credit", field: "credit", req: false },
                                { label: "Debit", field: "debit", req: false },
                                { label: "Description", field: "description", req: true },
                                { label: "Memo", field: "memo", req: false },
                            ].map((col) => (
                                <div key={col.field}>
                                    <label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">
                                        {col.label} {col.req && <span className="text-red-500">*</span>}
                                    </label>
                                    <select
                                        value={mapping[col.field as keyof ColumnMapping] ?? ""}
                                        onChange={(e) => setMapping(prev => ({ ...prev, [col.field]: e.target.value ? parseInt(e.target.value) : null }))}
                                        className="w-full p-2 text-sm rounded-lg border bg-[hsl(var(--background))]"
                                    >
                                        <option value="">Select...</option>
                                        {csvHeaders.map((h, i) => <option key={i} value={i}>{h}</option>)}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="overflow-x-auto rounded-xl border border-[hsl(var(--border))]">
                        <table className="w-full text-sm">
                            <thead className="bg-[hsl(var(--muted))]/50">
                                <tr>
                                    <th className="w-8 px-2 py-3"></th>
                                    <th className="px-4 py-3 text-left font-medium">Date</th>
                                    <th className="px-4 py-3 text-left font-medium">Amount</th>
                                    <th className="px-4 py-3 text-left font-medium">Description</th>
                                    <th className="px-4 py-3 text-left font-medium">Memo</th>
                                    <th className="w-10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((txn, idx) => {
                                    const errs = validationSummary.issues.filter(i => i.row === idx + 1);

                                    // Helper to check for error vs warning
                                    const getStatus = (field: string) => {
                                        const fieldIssues = errs.filter(e => e.field === field);
                                        if (fieldIssues.some(e => e.type === 'error')) return 'error';
                                        if (fieldIssues.some(e => e.type === 'warning')) return 'warning';
                                        return null;
                                    };

                                    const dateStatus = getStatus("date");
                                    const amtStatus = getStatus("amount");
                                    const descStatus = getStatus("description");
                                    const memoStatus = getStatus("memo");

                                    return (
                                        <tr key={txn.id} className="border-t border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/30">
                                            <td className="px-2 py-2 text-[hsl(var(--muted-foreground))]"><GripVertical className="w-4 h-4" /></td>

                                            <td className={`px-4 py-2 ${dateStatus === 'error' ? 'bg-red-500/10 box-border border-l-2 border-red-500' :
                                                    dateStatus === 'warning' ? 'bg-amber-500/10 box-border border-l-2 border-amber-500' : ''
                                                }`}>
                                                {editingCell?.row === idx && editingCell.field === 'date' ? (
                                                    <input autoFocus defaultValue={txn.date} onBlur={(e) => { updateTransaction(txn.id, 'date', e.target.value); setEditingCell(null); }} className="w-full p-1 border rounded" />
                                                ) : (
                                                    <div onClick={() => setEditingCell({ row: idx, field: 'date' })} className="cursor-pointer" title={errs.find(e => e.field === 'date')?.message}>
                                                        {txn.date || <span className="text-red-400">Missing</span>}
                                                    </div>
                                                )}
                                            </td>

                                            <td className={`px-4 py-2 ${amtStatus === 'error' ? 'bg-red-500/10 border-l-2 border-red-500' :
                                                    amtStatus === 'warning' ? 'bg-amber-500/10 border-l-2 border-amber-500' : ''
                                                }`}>
                                                {editingCell?.row === idx && editingCell.field === 'amount' ? (
                                                    <input autoFocus defaultValue={txn.amount} onBlur={(e) => { updateTransaction(txn.id, 'amount', e.target.value); setEditingCell(null); }} className="w-full p-1 border rounded" />
                                                ) : (
                                                    <div onClick={() => setEditingCell({ row: idx, field: 'amount' })} className="cursor-pointer" title={errs.find(e => e.field === 'amount')?.message}>
                                                        {txn.amount}
                                                    </div>
                                                )}
                                            </td>

                                            <td className={`px-4 py-2 ${descStatus === 'error' ? 'bg-red-500/10 border-l-2 border-red-500' :
                                                    descStatus === 'warning' ? 'bg-amber-500/10 border-l-2 border-amber-500' : ''
                                                }`}>
                                                {editingCell?.row === idx && editingCell.field === 'description' ? (
                                                    <input autoFocus defaultValue={txn.description} onBlur={(e) => { updateTransaction(txn.id, 'description', e.target.value); setEditingCell(null); }} className="w-full p-1 border rounded" />
                                                ) : (
                                                    <div onClick={() => setEditingCell({ row: idx, field: 'description' })} className="cursor-pointer" title={errs.find(e => e.field === 'description')?.message}>
                                                        {txn.description || <span className="text-amber-500">Empty</span>}
                                                    </div>
                                                )}
                                            </td>

                                            <td className={`px-4 py-2 ${memoStatus === 'error' ? 'bg-red-500/10 border-l-2 border-red-500' : ''
                                                }`}>
                                                {editingCell?.row === idx && editingCell.field === 'memo' ? (
                                                    <input autoFocus defaultValue={txn.memo} onBlur={(e) => { updateTransaction(txn.id, 'memo', e.target.value); setEditingCell(null); }} className="w-full p-1 border rounded" />
                                                ) : (
                                                    <div onClick={() => setEditingCell({ row: idx, field: 'memo' })} className="cursor-pointer" title={errs.find(e => e.field === 'memo')?.message}>
                                                        {txn.memo}
                                                    </div>
                                                )}
                                            </td>

                                            <td className="px-2 py-2">
                                                <button onClick={() => deleteTransaction(idx)} className="text-[hsl(var(--muted-foreground))] hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Action Footer */}
                    <div className="flex justify-end gap-4">
                        <Button variant="outline" onClick={() => { setHasFile(false); setCsvData([]); }}>Cancel</Button>
                        <Button
                            className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))/90] hover:opacity-90 text-white shadow-lg transition-all"
                            disabled={!validationSummary.isValid}
                            onClick={downloadReport}
                        >
                            {validationSummary.isValid ? (
                                <><CheckCircle2 className="w-4 h-4 mr-2" /> Validation Passed</>
                            ) : (
                                transactions.length === 0 ? (
                                    <><Settings2 className="w-4 h-4 mr-2" /> Map Columns to Proceed</>
                                ) : (
                                    <><AlertTriangle className="w-4 h-4 mr-2" /> Fix Errors to Proceed</>
                                )
                            )}
                        </Button>
                    </div>
                </div>
            )}

            {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2"><AlertCircle className="w-5 h-5" /> {error}</div>}
        </div>
    );
}
