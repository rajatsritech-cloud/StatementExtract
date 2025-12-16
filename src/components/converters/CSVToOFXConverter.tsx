"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { FileUp, FileText, Download, AlertCircle, Trash2, GripVertical, Settings2, X, ChevronDown, Eye, EyeOff, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";
import {
    parseCSV,
    autoDetectColumns,
    csvToOFXTransactions,
    downloadOFXFile,
    OFXTransaction,
    OFXConfig,
    ExportFormat
} from "@/lib/ofxGenerator";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";

interface ColumnMapping {
    date: string;
    description: string;
    amount: string;
    credit: string;
    debit: string;
    name: string;
    memo: string;
    checkNum: string;
    fitid: string;
    type: string;
}

const DATE_FORMATS = [
    { value: "MM/DD/YYYY", label: "MM/DD/YYYY (US)" },
    { value: "DD/MM/YYYY", label: "DD/MM/YYYY (UK/EU)" },
    { value: "YYYY-MM-DD", label: "YYYY-MM-DD (ISO)" },
];

const ACCOUNT_TYPES = [
    { value: "CHECKING", label: "Checking" },
    { value: "SAVINGS", label: "Savings" },
    { value: "CREDITLINE", label: "Credit Card" },
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

const TRANSACTION_TYPES = ['CREDIT', 'DEBIT', 'CHECK', 'ATM', 'POS', 'XFER', 'OTHER'];

const MAPPING_CONFIG = [
    { id: 'date', label: 'Date', required: true },
    { id: 'description', label: 'Description', required: false, tooltip: 'Fallback Description' },
    { id: 'amount', label: 'Amount', required: false, tooltip: 'Single amount column' },
    { id: 'name', label: 'Payee / Name', required: false },
    { id: 'memo', label: 'Memo', required: false },
    { id: 'type', label: 'Type', required: false },
    { id: 'checkNum', label: 'Check #', required: false },
    { id: 'fitid', label: 'Ref ID', required: false },
    { id: 'credit', label: 'Credit', required: false },
    { id: 'debit', label: 'Debit', required: false },
] as const;

interface EditableTransaction extends OFXTransaction {
    id: string;
}

// Custom scrollbar styles - Dark and Thin
const scrollbarStyles = "scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 hover:[&::-webkit-scrollbar-thumb]:bg-gray-500 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-500";

// Standard input/select styles - Ensuring visibility
const inputStyles = "w-full p-2 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-medium focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent outline-none transition-all";
const tableInputStyles = "w-full p-1 text-sm border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] rounded focus:ring-1 focus:ring-[hsl(var(--primary))] outline-none";

interface CSVToOFXConverterProps {
    title?: string;
    description?: string;
}

export function CSVToOFXConverter({
    title = "Convert CSV to OFX Online",
    description = "Import bank transactions into QuickBooks, Xero, Sage, or Wave."
}: CSVToOFXConverterProps) {
    const [file, setFile] = useState<File | null>(null);
    const [csvData, setCsvData] = useState<{ headers: string[]; rows: Record<string, string>[] } | null>(null);
    const [mapping, setMapping] = useState<ColumnMapping>({
        date: '', description: '', amount: '', credit: '', debit: '',
        name: '', memo: '', checkNum: '', fitid: '', type: ''
    });
    const [isDragging, setIsDragging] = useState(false);

    // Settings (Default Visible)
    const [showSettings, setShowSettings] = useState(true);
    const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
    const [accountType, setAccountType] = useState("CHECKING");
    const [currency, setCurrency] = useState("USD");
    const [bankName, setBankName] = useState("");
    const [accountId, setAccountId] = useState("");
    const [bankId, setBankId] = useState("");
    const [invertSigns, setInvertSigns] = useState(false);

    // Editing
    const [editedTransactions, setEditedTransactions] = useState<EditableTransaction[]>([]);
    const [editingCell, setEditingCell] = useState<{ row: number; field: keyof EditableTransaction } | null>(null);
    const [draggedRow, setDraggedRow] = useState<number | null>(null);

    // Column Visibility
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
        date: true, name: true, memo: true, description: true,
        type: true, checkNum: true, fitid: true, amount: true
    });
    const [showColumnMenu, setShowColumnMenu] = useState(false);

    const handleFile = useCallback((uploadedFile: File) => {
        const isCSV = uploadedFile.name.endsWith('.csv') || uploadedFile.type.includes('csv');
        const isExcel = uploadedFile.name.endsWith('.xlsx') || uploadedFile.name.endsWith('.xls') || uploadedFile.type.includes('sheet') || uploadedFile.type.includes('excel');

        if (!isCSV && !isExcel) {
            toast.error('Please upload a CSV or Excel file');
            return;
        }
        setFile(uploadedFile);

        const reader = new FileReader();

        if (isExcel) {
            reader.onload = (e) => {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' }) as string[][];

                if (jsonData.length < 2) {
                    toast.error('Excel file appears empty or invalid');
                    return;
                }

                // Convert array of arrays to headers + rows object expected by parser logic
                // Ensure headers are strings
                const headers = jsonData[0].map(h => String(h || ''));
                const rows = jsonData.slice(1).map(row => {
                    const rowObj: Record<string, string> = {};
                    headers.forEach((h, i) => {
                        rowObj[h] = String(row[i] || '');
                    });
                    return rowObj;
                });

                setCsvData({ headers, rows });
                const detected = autoDetectColumns(headers);
                setMapping({
                    date: detected.date || '',
                    description: detected.description || '',
                    amount: detected.amount || '',
                    credit: detected.credit || '',
                    debit: detected.debit || '',
                    name: detected.name || '',
                    memo: detected.memo || '',
                    checkNum: detected.checkNum || '',
                    fitid: detected.fitid || '',
                    type: detected.type || ''
                });
                toast.success(`Loaded ${rows.length} transactions from Excel`);
            };
            reader.readAsBinaryString(uploadedFile);
        } else {
            // CSV Handling
            reader.onload = (e) => {
                const text = e.target?.result as string;
                const parsed = parseCSV(text);
                setCsvData(parsed);
                const detected = autoDetectColumns(parsed.headers);
                setMapping({
                    date: detected.date || '',
                    description: detected.description || '',
                    amount: detected.amount || '',
                    credit: detected.credit || '',
                    debit: detected.debit || '',
                    name: detected.name || '',
                    memo: detected.memo || '',
                    checkNum: detected.checkNum || '',
                    fitid: detected.fitid || '',
                    type: detected.type || ''
                });
                toast.success(`Loaded ${parsed.rows.length} transactions`);
            };
            reader.readAsText(uploadedFile);
        }
    }, []);

    const rawTransactions = useMemo(() => {
        if (!csvData) return [];
        return csvToOFXTransactions(csvData.rows, mapping);
    }, [csvData, mapping]);

    useEffect(() => {
        if (rawTransactions.length > 0) {
            setEditedTransactions(rawTransactions.map((tx, i) => ({
                ...tx,
                id: `tx-${i}-${Date.now()}`,
                amount: invertSigns ? -tx.amount : tx.amount
            })));
        }
    }, [rawTransactions, invertSigns]);

    const updateTransaction = (id: string, field: keyof EditableTransaction, value: string) => {
        setEditedTransactions(prev => prev.map(tx =>
            tx.id === id ? { ...tx, [field]: field === 'amount' ? (parseFloat(value) || 0) : value } : tx
        ));
    };

    const deleteTransaction = (id: string) => {
        setEditedTransactions(prev => prev.filter(tx => tx.id !== id));
    };

    const handleRowDragStart = (idx: number) => setDraggedRow(idx);
    const handleRowDragOver = (e: React.DragEvent, idx: number) => {
        e.preventDefault();
        if (draggedRow === null || draggedRow === idx) return;
        const newData = [...editedTransactions];
        const [dragged] = newData.splice(draggedRow, 1);
        newData.splice(idx, 0, dragged);
        setEditedTransactions(newData);
        setDraggedRow(idx);
    };
    const handleRowDragEnd = () => setDraggedRow(null);

    const handleExport = (format: ExportFormat) => {
        if (editedTransactions.length === 0) return;
        const config: OFXConfig = {
            bankName: bankName || 'Bank',
            accountId: accountId || '000000000',
            bankId: bankId || '999999999',
            accountType: accountType as any,
            currency: currency
        };
        const filename = file?.name.replace('.csv', '') || 'converted';
        downloadOFXFile(editedTransactions, filename, config, format);
        toast.success(`Downloaded ${format.toUpperCase()}`);
    };

    const toggleColumn = (col: string) => {
        setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
    };

    const isMappingValid = mapping.date && (mapping.amount || mapping.credit || mapping.debit);

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6">
            <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">{title}</h1>
                <p className="text-[hsl(var(--muted-foreground))]">{description || "Import bank transactions from CSV or Excel."}</p>
            </div>

            {!csvData ? (
                <>
                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                        onDrop={(e) => { e.preventDefault(); setIsDragging(false); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }}
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
                            accept=".csv,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />

                        <div className="relative z-10 space-y-4">
                            <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/5 flex items-center justify-center shadow-lg">
                                <FileUp className="w-10 h-10 text-[hsl(var(--primary))]" />
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-[hsl(var(--foreground))]">
                                    Drop your CSV or Excel file here
                                </p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                                    or click to browse
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.CSV</span>
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.XLSX</span>
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">.XLS</span>
                                <span className="px-2 py-1 rounded-full bg-[hsl(var(--muted))]">100% Private</span>
                            </div>
                        </div>
                    </div>
                    <PrivacyBadge />
                </>
            ) : (
                <>
                    <div className="space-y-6">
                        {/* Top Bar */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FileSpreadsheet className="w-5 h-5 text-[hsl(var(--primary))]" />
                                <span className="font-medium text-[hsl(var(--foreground))]">{file?.name}</span>
                                <span className="text-sm text-[hsl(var(--muted-foreground))]">
                                    ({editedTransactions.length} rows)
                                </span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => { setFile(null); setCsvData(null); }}>
                                <X className="w-4 h-4 mr-1" /> Start Over
                            </Button>
                        </div>

                        <div className="p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-medium text-[hsl(var(--foreground))]">Column Mapping</h3>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                {MAPPING_CONFIG.map(field => (
                                    <div key={field.id}>
                                        <label className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">
                                            {field.label} {field.required && <span className="text-red-500">*</span>}
                                        </label>
                                        <select
                                            value={mapping[field.id as keyof ColumnMapping]}
                                            onChange={(e) => setMapping(m => ({ ...m, [field.id]: e.target.value }))}
                                            className={inputStyles}
                                        >
                                            <option value="">(Skip)</option>
                                            {csvData.headers.map(h => <option key={h} value={h}>{h}</option>)}
                                        </select>
                                    </div>
                                ))}
                            </div>
                            {!isMappingValid && <p className="text-xs text-amber-500 mt-2">Please map Date and Amount columns.</p>}
                        </div>

                        <div className="p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-medium text-sm text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Configuration</h3>
                                <Button variant="ghost" size="sm" onClick={() => setShowSettings(!showSettings)} className="text-xs h-7">
                                    {showSettings ? 'Hide' : 'Show'}
                                </Button>
                            </div>

                            {showSettings && (
                                <div className="grid gap-4 sm:grid-cols-4 animate-in fade-in slide-in-from-top-1 duration-200">
                                    <div>
                                        <label className="text-xs font-medium block mb-1 text-[hsl(var(--muted-foreground))]">Date Format</label>
                                        <select value={dateFormat} onChange={e => setDateFormat(e.target.value)} className={inputStyles}>
                                            {DATE_FORMATS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium block mb-1 text-[hsl(var(--muted-foreground))]">Account Type</label>
                                        <select value={accountType} onChange={e => setAccountType(e.target.value)} className={inputStyles}>
                                            {ACCOUNT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium block mb-1 text-[hsl(var(--muted-foreground))]">Currency</label>
                                        <select value={currency} onChange={e => setCurrency(e.target.value)} className={inputStyles}>
                                            {CURRENCIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                        </select>
                                    </div>
                                    <div className="flex items-end">
                                        <button
                                            onClick={() => setInvertSigns(!invertSigns)}
                                            className={`w-full p-2 text-sm rounded-lg border font-medium transition-all ${invertSigns ? "bg-[hsl(var(--primary))]/10 border-[hsl(var(--primary))] text-[hsl(var(--primary))]" : "border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"}`}
                                        >
                                            {invertSigns ? "✓ Signs Inverted" : "Normal Signs"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {editedTransactions.length > 0 && (
                            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
                                <div className="p-3 border-b border-[hsl(var(--border))] flex items-center justify-between rounded-t-xl">
                                    <span className="text-sm font-medium text-[hsl(var(--foreground))]">Transactions Preview</span>
                                    <div className="relative">
                                        <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setShowColumnMenu(!showColumnMenu)}>
                                            <Eye className="w-3 h-3 mr-1" /> Columns <ChevronDown className="w-3 h-3 ml-1" />
                                        </Button>
                                        {showColumnMenu && (
                                            <div className="absolute right-0 top-full mt-1 w-48 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg shadow-xl z-20 py-1">
                                                {Object.keys(visibleColumns).map(col => (
                                                    <button
                                                        key={col}
                                                        onClick={() => toggleColumn(col)}
                                                        className="w-full text-left px-3 py-2 text-sm hover:bg-[hsl(var(--muted))]/50 flex items-center justify-between text-[hsl(var(--foreground))]"
                                                    >
                                                        <span className="capitalize">{col}</span>
                                                        {visibleColumns[col] && <span className="text-[hsl(var(--primary))] text-xs">✓</span>}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        {showColumnMenu && <div className="fixed inset-0 z-10" onClick={() => setShowColumnMenu(false)} />}
                                    </div>
                                </div>

                                <div className={`overflow-x-auto ${scrollbarStyles} rounded-b-xl`}>
                                    <table className="w-full text-sm">
                                        <thead className="bg-[hsl(var(--muted))]/50 sticky top-0 z-10">
                                            <tr>
                                                <th className="w-10 px-2 py-3"></th>
                                                {visibleColumns.date && <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))] min-w-[120px]">Date</th>}
                                                {visibleColumns.name && <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))] min-w-[150px]">Payee</th>}
                                                {visibleColumns.memo && <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))] min-w-[150px]">Memo</th>}
                                                {visibleColumns.description && <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))] min-w-[150px]">Desc</th>}
                                                {visibleColumns.type && <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))] w-24">Type</th>}
                                                {visibleColumns.checkNum && <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))] w-24">Check#</th>}
                                                {visibleColumns.fitid && <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))] w-24">Ref ID</th>}
                                                {visibleColumns.amount && <th className="px-4 py-3 text-right font-medium text-[hsl(var(--foreground))] min-w-[100px]">Amount</th>}
                                                <th className="w-10 px-2 py-3"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[hsl(var(--border))]">
                                            {editedTransactions.map((tx, idx) => (
                                                <tr key={tx.id} draggable onDragStart={() => handleRowDragStart(idx)} onDragOver={(e) => handleRowDragOver(e, idx)} onDragEnd={handleRowDragEnd} className="hover:bg-[hsl(var(--muted))]/30 text-[hsl(var(--foreground))]">
                                                    <td className="px-2 py-2 cursor-grab"><GripVertical className="w-4 h-4 text-[hsl(var(--muted-foreground))]" /></td>
                                                    {visibleColumns.date && (
                                                        <td className="px-4 py-2">
                                                            {editingCell?.row === idx && editingCell?.field === 'date' ?
                                                                <input autoFocus value={tx.date} onChange={e => updateTransaction(tx.id, 'date', e.target.value)} onBlur={() => setEditingCell(null)} className={tableInputStyles} /> :
                                                                <span onClick={() => setEditingCell({ row: idx, field: 'date' })} className="cursor-pointer hover:text-[hsl(var(--primary))] block truncate">{tx.date}</span>
                                                            }
                                                        </td>
                                                    )}
                                                    {visibleColumns.name && (
                                                        <td className="px-4 py-2">
                                                            {editingCell?.row === idx && editingCell?.field === 'name' ?
                                                                <input autoFocus value={tx.name || ''} onChange={e => updateTransaction(tx.id, 'name', e.target.value)} onBlur={() => setEditingCell(null)} className={tableInputStyles} /> :
                                                                <span onClick={() => setEditingCell({ row: idx, field: 'name' })} className="cursor-pointer hover:text-[hsl(var(--primary))] block truncate min-h-[20px]">{tx.name || <span className="opacity-20">-</span>}</span>
                                                            }
                                                        </td>
                                                    )}
                                                    {visibleColumns.memo && (
                                                        <td className="px-4 py-2">
                                                            {editingCell?.row === idx && editingCell?.field === 'memo' ?
                                                                <input autoFocus value={tx.memo || ''} onChange={e => updateTransaction(tx.id, 'memo', e.target.value)} onBlur={() => setEditingCell(null)} className={tableInputStyles} /> :
                                                                <span onClick={() => setEditingCell({ row: idx, field: 'memo' })} className="cursor-pointer hover:text-[hsl(var(--primary))] block truncate min-h-[20px]">{tx.memo || <span className="opacity-20">-</span>}</span>
                                                            }
                                                        </td>
                                                    )}
                                                    {visibleColumns.description && (
                                                        <td className="px-4 py-2">
                                                            {editingCell?.row === idx && editingCell?.field === 'description' ?
                                                                <input autoFocus value={tx.description || ''} onChange={e => updateTransaction(tx.id, 'description', e.target.value)} onBlur={() => setEditingCell(null)} className={tableInputStyles} /> :
                                                                <span onClick={() => setEditingCell({ row: idx, field: 'description' })} className="cursor-pointer hover:text-[hsl(var(--primary))] block truncate min-h-[20px]">{tx.description}</span>
                                                            }
                                                        </td>
                                                    )}
                                                    {visibleColumns.type && (
                                                        <td className="px-4 py-2">
                                                            {editingCell?.row === idx && editingCell?.field === 'type' ?
                                                                <select autoFocus value={tx.type || ''} onChange={e => updateTransaction(tx.id, 'type', e.target.value)} onBlur={() => setEditingCell(null)} className={tableInputStyles}>
                                                                    <option value="">Select...</option>
                                                                    {TRANSACTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                                                </select> :
                                                                <span onClick={() => setEditingCell({ row: idx, field: 'type' })} className="cursor-pointer hover:text-[hsl(var(--primary))] block truncate min-h-[20px]">{tx.type || <span className="opacity-20">-</span>}</span>
                                                            }
                                                        </td>
                                                    )}
                                                    {visibleColumns.checkNum && (
                                                        <td className="px-4 py-2">
                                                            {editingCell?.row === idx && editingCell?.field === 'checkNum' ?
                                                                <input autoFocus value={tx.checkNum || ''} onChange={e => updateTransaction(tx.id, 'checkNum', e.target.value)} onBlur={() => setEditingCell(null)} className={tableInputStyles} /> :
                                                                <span onClick={() => setEditingCell({ row: idx, field: 'checkNum' })} className="cursor-pointer hover:text-[hsl(var(--primary))] block truncate min-h-[20px]">{tx.checkNum || <span className="opacity-20">-</span>}</span>
                                                            }
                                                        </td>
                                                    )}
                                                    {visibleColumns.fitid && (
                                                        <td className="px-4 py-2">
                                                            {editingCell?.row === idx && editingCell?.field === 'fitid' ?
                                                                <input autoFocus value={tx.fitid || ''} onChange={e => updateTransaction(tx.id, 'fitid', e.target.value)} onBlur={() => setEditingCell(null)} className={tableInputStyles} /> :
                                                                <span onClick={() => setEditingCell({ row: idx, field: 'fitid' })} className="cursor-pointer hover:text-[hsl(var(--primary))] block truncate min-h-[20px]">{tx.fitid || <span className="opacity-20">-</span>}</span>
                                                            }
                                                        </td>
                                                    )}
                                                    {visibleColumns.amount && (
                                                        <td className="px-4 py-2 text-right">
                                                            {editingCell?.row === idx && editingCell?.field === 'amount' ?
                                                                <input autoFocus type="number" value={tx.amount} onChange={e => updateTransaction(tx.id, 'amount', e.target.value)} onBlur={() => setEditingCell(null)} className={`${tableInputStyles} text-right w-24`} /> :
                                                                <span onClick={() => setEditingCell({ row: idx, field: 'amount' })} className={`cursor-pointer hover:text-[hsl(var(--primary))] font-medium ${tx.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                    {tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(2)}
                                                                </span>
                                                            }
                                                        </td>
                                                    )}
                                                    <td className="px-2 py-2 text-center">
                                                        <button onClick={() => deleteTransaction(tx.id)} className="text-[hsl(var(--muted-foreground))] hover:text-red-500 opacity-50 hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-3">
                            <Button
                                onClick={() => handleExport('ofx')}
                                disabled={!isMappingValid}
                                className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-white"
                            >
                                <Download className="h-4 w-4 mr-2" /> Download OFX
                            </Button>
                            <Button
                                onClick={() => handleExport('qbo')}
                                disabled={!isMappingValid}
                                variant="outline"
                                className="border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/10"
                            >
                                <Download className="h-4 w-4 mr-2" /> Download QBO
                            </Button>
                            <Button
                                onClick={() => handleExport('mt940')}
                                disabled={!isMappingValid}
                                variant="outline"
                                className="border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/10"
                            >
                                <Download className="h-4 w-4 mr-2" /> Download MT940
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
