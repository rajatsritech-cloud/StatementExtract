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
    Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";
import * as XLSX from "xlsx";

// Column mapping for QBO format
interface ColumnMapping {
    date: number | null;
    amount: number | null;
    credit: number | null;  // Separate credit column
    debit: number | null;   // Separate debit column
    description: number | null;
    type: number | null;
    checkNum: number | null;
    memo: number | null;
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

// 🌍 Region-based date format whitelists (following enterprise standards)
const REGION_DATE_FORMATS: Record<string, { patterns: RegExp[], parser: (match: RegExpMatchArray, year: number) => string }[]> = {
    // US: MM/DD/YYYY, MM-DD-YYYY, MM/DD, M/D
    'US': [
        { patterns: [/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/], parser: (m, _) => `${m[3]}-${m[1].padStart(2, '0')}-${m[2].padStart(2, '0')}` },
        { patterns: [/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{2})$/], parser: (m, _) => `20${m[3]}-${m[1].padStart(2, '0')}-${m[2].padStart(2, '0')}` },
        { patterns: [/^(\d{1,2})[-\/](\d{1,2})$/], parser: (m, yr) => `${yr}-${m[1].padStart(2, '0')}-${m[2].padStart(2, '0')}` },
    ],
    // UK: DD/MM/YYYY, DD-MM-YYYY, DD/MM
    'UK': [
        { patterns: [/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/], parser: (m, _) => `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` },
        { patterns: [/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{2})$/], parser: (m, _) => `20${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` },
        { patterns: [/^(\d{1,2})[-\/](\d{1,2})$/], parser: (m, yr) => `${yr}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` },
    ],
    // EU: DD.MM.YYYY, DD-MM-YYYY, DD/MM/YYYY
    'EU': [
        { patterns: [/^(\d{1,2})[.\-\/](\d{1,2})[.\-\/](\d{4})$/], parser: (m, _) => `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` },
        { patterns: [/^(\d{1,2})[.\-\/](\d{1,2})[.\-\/](\d{2})$/], parser: (m, _) => `20${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` },
        { patterns: [/^(\d{1,2})[.\-\/](\d{1,2})$/], parser: (m, yr) => `${yr}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` },
    ],
    // India: DD-MM-YYYY, DD/MM/YYYY
    'IN': [
        { patterns: [/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/], parser: (m, _) => `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` },
        { patterns: [/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{2})$/], parser: (m, _) => `20${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` },
        { patterns: [/^(\d{1,2})[-\/](\d{1,2})$/], parser: (m, yr) => `${yr}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` },
    ],
};

// Universal formats that work for all regions
const UNIVERSAL_DATE_FORMATS = [
    // ISO: YYYY-MM-DD (already correct)
    { pattern: /^(\d{4})-(\d{2})-(\d{2})$/, parser: (m: RegExpMatchArray) => `${m[1]}-${m[2]}-${m[3]}` },
    // Compact ISO: YYYYMMDD
    { pattern: /^(\d{4})(\d{2})(\d{2})$/, parser: (m: RegExpMatchArray) => `${m[1]}-${m[2]}-${m[3]}` },
    // D-MMM or DD-MMM (e.g., "1-Sep", "15-Oct")
    { pattern: /^(\d{1,2})[-\/]([A-Za-z]{3,9})$/i, parser: null }, // Special handling
    // MMM-D or MMM DD (e.g., "Sep-1", "Oct 15")
    { pattern: /^([A-Za-z]{3,9})[-\s](\d{1,2})$/i, parser: null }, // Special handling
];

// Strict date parser with region awareness
const parseRegionalDate = (dateStr: string, region: string): string | null => {
    const trimmed = dateStr.trim();
    if (!trimmed) return null;

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    // Try universal formats first
    for (const fmt of UNIVERSAL_DATE_FORMATS) {
        const match = trimmed.match(fmt.pattern);
        if (match) {
            if (fmt.parser) {
                return fmt.parser(match);
            } else {
                // Special handling for month name formats
                const dayMonthMatch = trimmed.match(/^(\d{1,2})[-\/]([A-Za-z]{3,9})$/i);
                if (dayMonthMatch) {
                    const day = dayMonthMatch[1].padStart(2, '0');
                    const monthStr = dayMonthMatch[2].toLowerCase();
                    const month = MONTH_NAMES[monthStr];
                    if (month) {
                        const monthNum = parseInt(month);
                        const year = monthNum > currentMonth ? currentYear - 1 : currentYear;
                        return `${year}-${month}-${day}`;
                    }
                }
                const monthDayMatch = trimmed.match(/^([A-Za-z]{3,9})[-\s](\d{1,2})$/i);
                if (monthDayMatch) {
                    const monthStr = monthDayMatch[1].toLowerCase();
                    const day = monthDayMatch[2].padStart(2, '0');
                    const month = MONTH_NAMES[monthStr];
                    if (month) {
                        const monthNum = parseInt(month);
                        const year = monthNum > currentMonth ? currentYear - 1 : currentYear;
                        return `${year}-${month}-${day}`;
                    }
                }
            }
        }
    }

    // Try region-specific formats
    const regionFormats = REGION_DATE_FORMATS[region] || REGION_DATE_FORMATS['US'];
    for (const fmt of regionFormats) {
        for (const pattern of fmt.patterns) {
            const match = trimmed.match(pattern);
            if (match) {
                const result = fmt.parser(match, currentYear);
                // Validate the result is a valid date
                const [y, m, d] = result.split('-').map(Number);
                if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
                    return result;
                }
            }
        }
    }

    return null; // Could not parse - reject ambiguous
};

// Helper function for parsing D-MMM format (used by DATE_FORMATS)
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

interface Transaction {
    id: string;
    date: string;
    rawDate: string;  // Original date from CSV
    amount: string;
    credit: string;   // Raw credit value
    debit: string;    // Raw debit value
    description: string;
    type: string;
    checkNum: string;
    memo: string;
}

// Account settings for QBO generation
interface AccountSettings {
    bankId: string;
    accountId: string;
    accountType: string;
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
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "CAD", label: "CAD - Canadian Dollar" },
    { value: "AUD", label: "AUD - Australian Dollar" },
    { value: "INR", label: "INR - Indian Rupee" },
];

// Country presets for auto-configuration
const COUNTRY_PRESETS = [
    { value: "US", label: "🇺🇸 United States", dateFormat: "MM/DD/YYYY", currency: "USD" },
    { value: "UK", label: "🇬🇧 United Kingdom", dateFormat: "DD/MM/YYYY", currency: "GBP" },
    { value: "CA", label: "🇨🇦 Canada", dateFormat: "MM/DD/YYYY", currency: "CAD" },
    { value: "AU", label: "🇦🇺 Australia", dateFormat: "DD/MM/YYYY", currency: "AUD" },
    { value: "IN", label: "🇮🇳 India", dateFormat: "DD/MM/YYYY", currency: "INR" },
    { value: "EU", label: "🇪🇺 Europe", dateFormat: "DD/MM/YYYY", currency: "EUR" },
    { value: "OTHER", label: "🌍 Other", dateFormat: "YYYY-MM-DD", currency: "USD" },
];

// Date format detection patterns
const DATE_FORMATS = [
    { pattern: /^\d{4}-\d{2}-\d{2}$/, label: "YYYY-MM-DD", parse: (d: string) => d },
    { pattern: /^\d{2}\/\d{2}\/\d{4}$/, label: "MM/DD/YYYY", parse: (d: string) => { const [m, day, y] = d.split("/"); return `${y}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`; } },
    { pattern: /^\d{2}-\d{2}-\d{4}$/, label: "MM-DD-YYYY", parse: (d: string) => { const [m, day, y] = d.split("-"); return `${y}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`; } },
    { pattern: /^\d{2}\/\d{2}\/\d{4}$/, label: "DD/MM/YYYY", parse: (d: string) => { const [day, m, y] = d.split("/"); return `${y}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`; } },
    { pattern: /^\d{1,2}\/\d{1,2}\/\d{2,4}$/, label: "M/D/YYYY", parse: (d: string) => { const [m, day, y] = d.split("/"); const fullYear = y.length === 2 ? `20${y}` : y; return `${fullYear}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`; } },
    { pattern: /^\d{1,2}[-\/][A-Za-z]{3}$/, label: "D-MMM (e.g., 1-Sep)", parse: parseDayMonthDate },
    { pattern: /^\d{1,2}[-\/][A-Za-z]{3,9}$/, label: "D-Month (e.g., 1-September)", parse: parseDayMonthDate },
];

export function CsvToQboTool() {
    const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
    const [csvData, setCsvData] = useState<string[][]>([]);
    const [fileName, setFileName] = useState<string>("");
    const [mapping, setMapping] = useState<ColumnMapping>({
        date: null,
        amount: null,
        credit: null,
        debit: null,
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

    // Account settings modal
    const [showAccountModal, setShowAccountModal] = useState(false);
    const [accountSettings, setAccountSettings] = useState<AccountSettings>({
        bankId: "",
        accountId: "",
        accountType: "CHECKING",
        currency: "USD",
    });
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>("US");
    const [showInfoBanner, setShowInfoBanner] = useState(true);
    const [fixedDatesCount, setFixedDatesCount] = useState<number>(0);
    const [hasAutoFixed, setHasAutoFixed] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle country change - auto-set date format and currency
    const handleCountryChange = (countryCode: string) => {
        setSelectedCountry(countryCode);
        const preset = COUNTRY_PRESETS.find(c => c.value === countryCode);
        if (preset) {
            setDateFormat(preset.dateFormat);
            setAccountSettings(prev => ({ ...prev, currency: preset.currency }));
        }
    };

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
        const newMapping: ColumnMapping = { date: null, amount: null, credit: null, debit: null, description: null, type: null, checkNum: null, memo: null };
        const lowerHeaders = headers.map(h => h.toLowerCase().trim());

        const dateIdx = lowerHeaders.findIndex(h => ["date", "trans date", "transaction date", "posted", "posted date"].includes(h));
        if (dateIdx >= 0) newMapping.date = dateIdx;

        // Check for separate Credit/Debit columns first
        const creditIdx = lowerHeaders.findIndex(h => ["credit", "credits", "deposit", "deposits", "money in"].includes(h));
        const debitIdx = lowerHeaders.findIndex(h => ["debit", "debits", "withdrawal", "withdrawals", "money out"].includes(h));

        if (creditIdx >= 0 && debitIdx >= 0) {
            // Separate credit/debit columns found
            newMapping.credit = creditIdx;
            newMapping.debit = debitIdx;
        } else {
            // Fall back to single amount column
            const amountIdx = lowerHeaders.findIndex(h => ["amount", "transaction amount", "value", "total"].includes(h));
            if (amountIdx >= 0) newMapping.amount = amountIdx;
        }

        // Description - also check for partial matches
        let descIdx = lowerHeaders.findIndex(h => ["description", "name", "payee", "merchant", "vendor", "transaction description", "details"].includes(h));
        if (descIdx < 0) {
            // Try partial match for headers containing 'description' or 'desc'
            descIdx = lowerHeaders.findIndex(h => h.includes('desc') || h.includes('description'));
        }
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
        // Need date AND (amount OR credit+debit)
        const hasAmount = mapping.amount !== null;
        const hasCreditDebit = mapping.credit !== null || mapping.debit !== null;

        if (csvData.length === 0 || mapping.date === null || (!hasAmount && !hasCreditDebit)) {
            return [];
        }

        const fmt = DATE_FORMATS.find(f => f.label === dateFormat);
        const parseFn = fmt?.parse || ((d: string) => d);

        return csvData.map((row, idx) => {
            const id = `txn-${idx}`;

            // Get raw values
            const rawDateValue = row[mapping.date!] || "";
            const rawCredit = mapping.credit !== null ? row[mapping.credit] || "" : "";
            const rawDebit = mapping.debit !== null ? row[mapping.debit] || "" : "";

            // Calculate amount from credit/debit or use amount column
            let amount = "0";
            let autoType = "";

            if (hasAmount) {
                amount = row[mapping.amount!] || "0";
            } else {
                // Use credit/debit columns
                const creditVal = rawCredit ? parseFloat(rawCredit.replace(/[^-\d.]/g, "") || "0") || 0 : 0;
                const debitVal = rawDebit ? parseFloat(rawDebit.replace(/[^-\d.]/g, "") || "0") || 0 : 0;

                if (creditVal > 0) {
                    amount = creditVal.toString();
                    autoType = "CREDIT";
                } else if (debitVal > 0) {
                    amount = (-debitVal).toString(); // Debits are negative
                    autoType = "DEBIT";
                }
            }

            // Parse date with fallback
            let parsedDate = parseFn(rawDateValue);
            if (!parsedDate || parsedDate.includes("undefined") || parsedDate.includes("NaN")) {
                parsedDate = rawDateValue; // Keep raw if parsing fails
            }

            const baseRow: Transaction = {
                id,
                date: parsedDate,
                rawDate: rawDateValue,
                amount,
                credit: rawCredit,
                debit: rawDebit,
                description: mapping.description !== null ? row[mapping.description] || "" : "",
                type: mapping.type !== null ? row[mapping.type] || "" : autoType,
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

    // Auto-fix dates - uses region-aware strict parsing
    const autoFixDates = useCallback(() => {
        const newEdits: Record<string, Partial<Transaction>> = {};
        let fixedCount = 0;

        // Map country to region format
        const regionMap: Record<string, string> = {
            'US': 'US', 'UK': 'UK', 'AU': 'UK', 'NZ': 'UK', 'CA': 'US',
            'DE': 'EU', 'FR': 'EU', 'NL': 'EU', 'BE': 'EU', 'ES': 'EU', 'IT': 'EU',
            'IN': 'IN', 'JP': 'US', 'CN': 'US', // JP/CN use ISO or similar to US
        };
        const region = regionMap[selectedCountry] || 'US';

        transactions.forEach((txn) => {
            const dateToFix = (txn.rawDate || txn.date || "").trim();
            if (!dateToFix) return;

            // Use strict regional parsing
            const fixedDate = parseRegionalDate(dateToFix, region);

            if (fixedDate) {
                newEdits[txn.id] = {
                    ...manualEdits[txn.id],
                    date: fixedDate,
                    rawDate: fixedDate
                };
                fixedCount++;
            }
        });

        // Apply all edits
        if (Object.keys(newEdits).length > 0) {
            setManualEdits(prev => ({ ...prev, ...newEdits }));
        }

        return fixedCount;
    }, [transactions, manualEdits, selectedCountry]);

    // Auto-fix dates when file is first loaded
    useEffect(() => {
        if (transactions.length > 0 && !hasAutoFixed) {
            // Small delay to ensure state is settled
            const timer = setTimeout(() => {
                const count = autoFixDates();
                setFixedDatesCount(count);
                setHasAutoFixed(true);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [transactions.length, hasAutoFixed, autoFixDates]);

    // Compute validation issues for each transaction
    const validationSummary = useMemo(() => {
        const issues: { row: number; field: string; message: string }[] = [];

        transactions.forEach((txn, idx) => {
            // Check date
            const dateStr = txn.date.replace(/-/g, "");
            if (!dateStr || dateStr.length !== 8 || isNaN(parseInt(dateStr)) || dateStr.includes("undefined")) {
                issues.push({ row: idx + 1, field: "date", message: `Invalid date format` });
            }

            // Check amount - consider credit/debit when amount column not mapped
            let amountValid = false;
            if (mapping.amount !== null) {
                // Using amount column
                const amountNum = parseFloat(txn.amount.replace(/[^-\d.]/g, ""));
                amountValid = !isNaN(amountNum) && amountNum !== 0;
            } else {
                // Using credit/debit columns - either one having a valid value is ok
                const creditNum = parseFloat((txn.credit || "").replace(/[^-\d.]/g, "") || "0");
                const debitNum = parseFloat((txn.debit || "").replace(/[^-\d.]/g, "") || "0");
                amountValid = creditNum !== 0 || debitNum !== 0;
            }
            if (!amountValid) {
                issues.push({ row: idx + 1, field: "amount", message: `Invalid or zero amount` });
            }

            // Check description
            if (!txn.description.trim()) {
                issues.push({ row: idx + 1, field: "description", message: `Empty description` });
            }
        });

        return {
            issues,
            invalidDates: issues.filter(i => i.field === "date").length,
            invalidAmounts: issues.filter(i => i.field === "amount").length,
            emptyDescriptions: issues.filter(i => i.field === "description").length,
            isValid: issues.length === 0
        };
    }, [transactions]);

    // Requirements checklist status
    const requirementsStatus = useMemo(() => ({
        hasDate: mapping.date !== null,
        hasAmount: mapping.amount !== null || (mapping.credit !== null || mapping.debit !== null),
        hasDescription: mapping.description !== null,
        hasValidData: validationSummary.isValid,
        isComplete: (mapping.date !== null) &&
            (mapping.amount !== null || mapping.credit !== null || mapping.debit !== null) &&
            (mapping.description !== null)
    }), [mapping, validationSummary.isValid]);
    // Handle file selection
    const handleFiles = useCallback((fileList: FileList | File[]) => {
        setError(null);
        const file = Array.from(fileList).find(f =>
            f.name.toLowerCase().endsWith(".csv") ||
            f.type === "text/csv" ||
            f.name.toLowerCase().endsWith(".xlsx") ||
            f.name.toLowerCase().endsWith(".xls") ||
            f.type.includes("sheet") ||
            f.type.includes("excel")
        );

        if (!file) {
            setError("Please select a CSV or Excel file.");
            return;
        }

        setFileName(file.name);

        setFileName(file.name);

        const reader = new FileReader();

        if (file.name.toLowerCase().endsWith(".csv") || file.type === "text/csv") {
            reader.onload = (e) => {
                try {
                    const text = e.target?.result as string;
                    const { headers, data } = parseCSV(text);

                    setCsvHeaders(headers);
                    setCsvData(data);
                    setManualEdits({});
                    setHasAutoFixed(false);
                    setFixedDatesCount(0);

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
        } else {
            // Excel Handling
            reader.onload = (e) => {
                try {
                    const data = e.target?.result;
                    const workbook = XLSX.read(data, { type: 'binary' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' }) as string[][];

                    if (jsonData.length < 2) {
                        setError("Excel file appears empty or invalid (requires header and data).");
                        return;
                    }

                    const headers = jsonData[0].map(h => String(h || ''));
                    const filteredData = jsonData.slice(1).map(row =>
                        headers.map((_, i) => String(row[i] || ''))
                    ).filter(row => row.some(cell => cell.trim()));

                    setCsvHeaders(headers);
                    setCsvData(filteredData);
                    setManualEdits({});
                    setHasAutoFixed(false);
                    setFixedDatesCount(0);

                    const autoMapping = autoMapColumns(headers);
                    setMapping(autoMapping);

                    if (autoMapping.date !== null) {
                        const dates = filteredData.slice(0, 10).map(row => row[autoMapping.date!]).filter(Boolean);
                        const detected = detectDateFormat(dates);
                        setDetectedFormat(detected);
                        setDateFormat(detected);
                    }

                    setHasFile(true);
                } catch (err) {
                    setError("Failed to parse Excel file.");
                }
            };
            reader.readAsBinaryString(file);
        }
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

    // Open modal to collect account settings before export
    const handleExportClick = () => {
        if (transactions.length === 0) {
            setError("No valid transactions to export. Please map Date, Amount, and Description columns.");
            return;
        }
        setValidationErrors([]);
        setShowAccountModal(true);
    };

    // Validate and export QBO file
    const exportQBO = () => {
        // Validate inputs
        const errors: string[] = [];

        if (!accountSettings.bankId.trim()) {
            errors.push("Bank Routing Number is required");
        } else if (!/^\d{9}$/.test(accountSettings.bankId.trim())) {
            errors.push("Bank Routing Number must be 9 digits");
        }

        if (!accountSettings.accountId.trim()) {
            errors.push("Account Number is required");
        }

        // Validate transactions have valid dates
        const invalidDates = transactions.filter(t => {
            const dateStr = t.date.replace(/-/g, "");
            return !dateStr || dateStr.length !== 8 || isNaN(parseInt(dateStr));
        });
        if (invalidDates.length > 0) {
            errors.push(`${invalidDates.length} transaction(s) have invalid dates`);
        }

        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }

        setIsProcessing(true);
        setShowAccountModal(false);
        try {
            const qboContent = generateQBO();
            const blob = new Blob([qboContent], { type: "application/vnd.intu.qbo" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName.replace(/\.csv$/i, "").replace(/\.xlsx?$/i, "") + ".qbo";
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
        setManualEdits(prev => {
            const updates: Partial<Transaction> = { ...prev[id], [field]: value };
            // When editing date, also update rawDate
            if (field === 'date' || field === 'rawDate') {
                updates.date = value;
                updates.rawDate = value;
            }
            return {
                ...prev,
                [id]: updates
            };
        });
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
        setMapping({ date: null, amount: null, credit: null, debit: null, description: null, type: null, checkNum: null, memo: null });
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
                            accept=".csv,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            onChange={(e) => e.target.files && handleFiles(e.target.files)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />

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
                    <PrivacyBadge />
                </>
            )}

            {/* Mapping + Preview (shown when file is loaded) */}
            {
                hasFile && (
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

                        {/* Info Banner - Compact Collapsible */}
                        {showInfoBanner && (
                            <div className="p-2 px-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                                    <Info className="w-4 h-4 text-blue-500" />
                                    <span>QuickBooks accepts: <strong>Date + Description + Amount</strong> or <strong>Date + Description + Credit/Debit</strong>. Dates auto-fixed to ISO format.</span>
                                </div>
                                <button onClick={() => setShowInfoBanner(false)} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {/* Country & Requirements Row */}
                        <div className="flex flex-wrap gap-4 items-start">
                            {/* Country Selector */}
                            <div className="flex-shrink-0">
                                <label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">
                                    <Globe className="w-3 h-3 inline mr-1" /> Region
                                </label>
                                <select
                                    value={selectedCountry}
                                    onChange={(e) => handleCountryChange(e.target.value)}
                                    className="p-2 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                                >
                                    {COUNTRY_PRESETS.map(c => (
                                        <option key={c.value} value={c.value}>{c.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Requirements Checklist */}
                            <div className="flex-1 min-w-[200px] p-3 rounded-lg bg-[hsl(var(--muted))]/30 border border-[hsl(var(--border))]">
                                <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] mb-2">Requirements</p>
                                <div className="flex flex-wrap gap-3 text-xs">
                                    <span className={`flex items-center gap-1 ${requirementsStatus.hasDate ? 'text-green-500' : 'text-amber-500'}`}>
                                        {requirementsStatus.hasDate ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                                        Date
                                    </span>
                                    <span className={`flex items-center gap-1 ${requirementsStatus.hasAmount ? 'text-green-500' : 'text-amber-500'}`}>
                                        {requirementsStatus.hasAmount ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                                        Amount
                                    </span>
                                    <span className={`flex items-center gap-1 ${requirementsStatus.hasDescription ? 'text-green-500' : 'text-amber-500'}`}>
                                        {requirementsStatus.hasDescription ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                                        Description
                                    </span>
                                    {transactions.length > 0 && (
                                        <span className={`flex items-center gap-1 ${validationSummary.isValid ? 'text-green-500' : 'text-red-500'}`}>
                                            {validationSummary.isValid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                                            {validationSummary.isValid ? 'Data Valid' : `${validationSummary.issues.length} Issues`}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Status Row - Only show if there are issues */}
                        {!validationSummary.isValid && transactions.length > 0 && (
                            <div className="flex flex-wrap gap-2 text-xs">
                                {validationSummary.invalidDates > 0 && (
                                    <span className="px-2 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {validationSummary.invalidDates} invalid dates
                                        <button onClick={autoFixDates} className="ml-1 underline hover:no-underline">Fix</button>
                                    </span>
                                )}
                                {validationSummary.invalidAmounts > 0 && (
                                    <span className="px-2 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {validationSummary.invalidAmounts} invalid amounts (click to edit)
                                    </span>
                                )}
                                {validationSummary.emptyDescriptions > 0 && (
                                    <span className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3" />
                                        {validationSummary.emptyDescriptions} empty descriptions
                                    </span>
                                )}
                            </div>
                        )}

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

                                {/* Amount OR Credit/Debit */}
                                <div>
                                    <label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">
                                        Amount {mapping.credit === null && mapping.debit === null && <span className="text-red-500">*</span>}
                                    </label>
                                    <select
                                        value={mapping.amount ?? ""}
                                        onChange={(e) => setMapping(prev => ({ ...prev, amount: e.target.value ? parseInt(e.target.value) : null, credit: null, debit: null }))}
                                        className="w-full p-2 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                                    >
                                        <option value="">Select...</option>
                                        {csvHeaders.map((h, i) => (
                                            <option key={i} value={i}>{h}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Credit Column */}
                                <div>
                                    <label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">
                                        Credit {mapping.amount === null && <span className="text-amber-500">(or use Amount)</span>}
                                    </label>
                                    <select
                                        value={mapping.credit ?? ""}
                                        onChange={(e) => setMapping(prev => ({ ...prev, credit: e.target.value ? parseInt(e.target.value) : null, amount: null }))}
                                        className="w-full p-2 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                                    >
                                        <option value="">None</option>
                                        {csvHeaders.map((h, i) => (
                                            <option key={i} value={i}>{h}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Debit Column */}
                                <div>
                                    <label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">
                                        Debit {mapping.amount === null && <span className="text-amber-500">(or use Amount)</span>}
                                    </label>
                                    <select
                                        value={mapping.debit ?? ""}
                                        onChange={(e) => setMapping(prev => ({ ...prev, debit: e.target.value ? parseInt(e.target.value) : null, amount: null }))}
                                        className="w-full p-2 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                                    >
                                        <option value="">None</option>
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
                                            <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">
                                                Date
                                                <span className="text-xs text-[hsl(var(--muted-foreground))] ml-1">(click to edit)</span>
                                            </th>
                                            {mapping.amount !== null ? (
                                                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Amount</th>
                                            ) : (
                                                <>
                                                    <th className="px-4 py-3 text-left font-medium text-green-500">Credit (+)</th>
                                                    <th className="px-4 py-3 text-left font-medium text-red-500">Debit (-)</th>
                                                </>
                                            )}
                                            <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Description</th>
                                            <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Type</th>
                                            <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Memo</th>
                                            <th className="w-10 px-2 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.length === 0 ? (
                                            <tr>
                                                <td colSpan={mapping.amount !== null ? 7 : 8} className="px-4 py-8 text-center text-[hsl(var(--muted-foreground))]">
                                                    {isMappingValid ? "No transactions found" : "Map Date, Amount (or Credit+Debit), and Description columns"}
                                                </td>
                                            </tr>
                                        ) : (
                                            transactions.map((txn, idx) => {
                                                // Dynamic fields based on mapping
                                                const fieldsToShow = mapping.amount !== null
                                                    ? ["rawDate", "amount", "description", "type", "memo"] as const
                                                    : ["rawDate", "credit", "debit", "description", "type", "memo"] as const;

                                                return (
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
                                                        {fieldsToShow.map(field => {
                                                            // Check if this cell has an error
                                                            // Map rawDate → date, credit/debit → amount for error checking
                                                            let errorField = field as string;
                                                            if (field === "rawDate") errorField = "date";
                                                            if (field === "credit" || field === "debit") errorField = "amount";

                                                            const hasError = validationSummary.issues.some(
                                                                i => i.row === idx + 1 && i.field === errorField
                                                            );

                                                            // Color coding for credit/debit
                                                            let textColor = "";
                                                            if (field === "credit" && txn.credit) textColor = "text-green-600 font-medium";
                                                            if (field === "debit" && txn.debit) textColor = "text-red-600 font-medium";

                                                            // Make all cells look editable
                                                            const cellClass = hasError
                                                                ? "px-4 py-2 bg-red-500/10 border-l-2 border-red-500"
                                                                : "px-4 py-1";

                                                            const value = txn[field as keyof Transaction];
                                                            const editableField = field === "rawDate" ? "date" : field;

                                                            return (
                                                                <td key={field} className={cellClass}>
                                                                    {editingCell?.row === idx && editingCell?.field === editableField ? (
                                                                        <input
                                                                            autoFocus
                                                                            defaultValue={value}
                                                                            onBlur={(e) => {
                                                                                updateTransaction(txn.id, editableField as keyof Transaction, e.target.value);
                                                                                setEditingCell(null);
                                                                            }}
                                                                            onKeyDown={(e) => {
                                                                                if (e.key === "Enter") {
                                                                                    updateTransaction(txn.id, editableField as keyof Transaction, (e.target as HTMLInputElement).value);
                                                                                    setEditingCell(null);
                                                                                }
                                                                            }}
                                                                            className="w-full px-2 py-1 rounded border-2 border-[hsl(var(--primary))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] outline-none"
                                                                        />
                                                                    ) : (
                                                                        <div
                                                                            onClick={() => setEditingCell({ row: idx, field: editableField as keyof Transaction })}
                                                                            className={`cursor-pointer px-2 py-1 rounded border border-transparent hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--primary))]/5 transition-all group ${textColor} ${hasError ? 'border-red-500/50 bg-red-500/5' : ''}`}
                                                                            title="Click to edit"
                                                                        >
                                                                            <span className={hasError ? 'text-red-500' : ''}>
                                                                                {value || <span className="text-[hsl(var(--muted-foreground))]/50">—</span>}
                                                                            </span>
                                                                            {hasError && <AlertCircle className="w-3 h-3 inline ml-1 text-red-500" />}
                                                                        </div>
                                                                    )}
                                                                </td>
                                                            );
                                                        })}
                                                        <td className="px-2 py-2">
                                                            <button
                                                                onClick={() => deleteTransaction(idx)}
                                                                className="p-1 rounded hover:bg-red-500/10 text-[hsl(var(--muted-foreground))] hover:text-red-500 transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Export Button */}
                        <Button
                            onClick={handleExportClick}
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
                )
            }

            {/* Error Message */}
            {
                error && (
                    <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        {error}
                    </div>
                )
            }
            {/* Account Settings Modal */}
            {
                showAccountModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setShowAccountModal(false)}
                        />

                        {/* Modal */}
                        <div className="relative z-10 w-full max-w-md mx-4 p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">Account Settings</h2>
                                <button
                                    onClick={() => setShowAccountModal(false)}
                                    className="p-1 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                                >
                                    <X className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                                </button>
                            </div>

                            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
                                Enter your bank account details for QuickBooks to properly match transactions.
                            </p>

                            {/* Validation Errors */}
                            {validationErrors.length > 0 && (
                                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                                    {validationErrors.map((err, i) => (
                                        <p key={i} className="text-sm text-red-500 flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                            {err}
                                        </p>
                                    ))}
                                </div>
                            )}

                            <div className="space-y-4">
                                {/* Bank Routing Number */}
                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1">
                                        Bank Routing Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={accountSettings.bankId}
                                        onChange={(e) => setAccountSettings(prev => ({ ...prev, bankId: e.target.value.replace(/\D/g, "").slice(0, 9) }))}
                                        placeholder="9 digits (e.g., 021000021)"
                                        className="w-full p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]"
                                    />
                                </div>

                                {/* Account Number */}
                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1">
                                        Account Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={accountSettings.accountId}
                                        onChange={(e) => setAccountSettings(prev => ({ ...prev, accountId: e.target.value }))}
                                        placeholder="Your account number"
                                        className="w-full p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]"
                                    />
                                </div>

                                {/* Account Type */}
                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1">
                                        Account Type
                                    </label>
                                    <select
                                        value={accountSettings.accountType}
                                        onChange={(e) => setAccountSettings(prev => ({ ...prev, accountType: e.target.value }))}
                                        className="w-full p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                                    >
                                        {ACCOUNT_TYPES.map(t => (
                                            <option key={t.value} value={t.value}>{t.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Currency */}
                                <div>
                                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1">
                                        Currency
                                    </label>
                                    <select
                                        value={accountSettings.currency}
                                        onChange={(e) => setAccountSettings(prev => ({ ...prev, currency: e.target.value }))}
                                        className="w-full p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                                    >
                                        {CURRENCIES.map(c => (
                                            <option key={c.value} value={c.value}>{c.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Generate Button */}
                            <Button
                                onClick={exportQBO}
                                disabled={isProcessing}
                                className="w-full mt-6 h-12 text-lg bg-gradient-primary shadow-glow hover:opacity-90"
                            >
                                {isProcessing ? (
                                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...</>
                                ) : (
                                    <><Download className="w-5 h-5 mr-2" /> Generate QBO File</>
                                )}
                            </Button>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
