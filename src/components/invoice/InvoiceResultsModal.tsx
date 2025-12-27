"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { X, Download, FileText, CheckCircle2, ChevronDown, Search, ArrowUpDown, Copy, EyeOff, Trash2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExtractedData } from "@/lib/pdfProcessor";
import * as XLSX from 'xlsx';
import { toast } from "react-hot-toast";

interface InvoiceResultsModalProps {
    data: ExtractedData | null;
    file: File | null;
    onClose: () => void;
    onTryAnother: () => void;
    isProcessing?: boolean;
    progress?: number;
}

// Helper to safely format numbers (handles strings from API)
const formatCurrency = (value: any, _currency: string = 'USD'): string => {
    if (value === undefined || value === null || value === '') return '-';
    const num = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.-]/g, ''));
    if (isNaN(num)) return '-';
    try {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        }).format(num);
    } catch {
        return num.toFixed(2);
    }
};

// Line Item Type
interface LineItem {
    description: string;
    quantity?: number;
    unitPrice?: number;
    amount?: number;
    _isEdited?: boolean;
    _original?: LineItem;
}

// Metadata Type
interface InvoiceMetadata {
    invoiceNumber?: string;
    invoiceDate?: string;
    dueDate?: string;
    vendorName?: string;
    customerName?: string;
    currency?: string;
    subtotal?: number;
    taxAmount?: number;
    totalAmount?: number;
}

// Compact Invoice Summary Bar (minimal - only Invoice # and Total)
const InvoiceSummaryBar = ({ metadata }: { metadata: InvoiceMetadata }) => {
    const currency = metadata?.currency || '$';

    // Only show Invoice # and Total (the essentials)
    const hasData = metadata?.invoiceNumber || metadata?.totalAmount !== undefined;
    if (!hasData) return null;

    return (
        <div className="mb-3 flex items-center gap-6 px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20 text-xs">
            {metadata?.invoiceNumber && (
                <div className="flex items-center gap-1.5">
                    <span className="text-[hsl(var(--muted-foreground))]">Invoice #:</span>
                    <span className="font-medium text-[hsl(var(--foreground))] font-mono">{metadata.invoiceNumber}</span>
                </div>
            )}
            {metadata?.totalAmount !== undefined && (
                <div className="flex items-center gap-1.5">
                    <span className="text-[hsl(var(--muted-foreground))]">Total:</span>
                    <span className="font-semibold text-green-600">{formatCurrency(metadata.totalAmount, currency)}</span>
                </div>
            )}
        </div>
    );
};
// Line Items Table with Inline Editing, Delete, and Undo
const LineItemsTable = ({
    lineItems: initialLineItems,
    currency = 'USD',
    headerActions,
    onDataChange
}: {
    lineItems: LineItem[];
    currency?: string;
    headerActions?: React.ReactNode;
    onDataChange?: (lineItems: LineItem[]) => void;
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
    const [lineItems, setLineItems] = useState<LineItem[]>(initialLineItems);
    const [editingCell, setEditingCell] = useState<{ rowIndex: number; field: string } | null>(null);
    const [editValue, setEditValue] = useState("");
    const [pendingDeleteIndex, setPendingDeleteIndex] = useState<number | null>(null);

    // Calculate edited count
    const editedCount = lineItems.filter(item => item._isEdited).length;

    const filteredData = useMemo(() => {
        let filtered = lineItems.filter(item =>
            (item.description || '').toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortConfig) {
            filtered = [...filtered].sort((a, b) => {
                let aVal: any = a[sortConfig.key as keyof typeof a];
                let bVal: any = b[sortConfig.key as keyof typeof b];
                if (typeof aVal === 'string') aVal = aVal.toLowerCase();
                if (typeof bVal === 'string') bVal = bVal.toLowerCase();
                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [lineItems, searchTerm, sortConfig]);

    const handleSort = (key: string) => {
        setSortConfig(prev => {
            if (prev?.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'asc' };
        });
    };

    // Start editing a cell
    const startEdit = (rowIndex: number, field: string, value: string) => {
        setEditingCell({ rowIndex, field });
        setEditValue(value);
    };

    // Save edit
    const saveEdit = (originalIndex: number, field: string) => {
        const newLineItems = [...lineItems];
        const item = { ...newLineItems[originalIndex] };

        // Store original if first edit
        if (!item._isEdited) {
            item._original = { ...item };
        }

        switch (field) {
            case 'description':
                item.description = editValue;
                break;
            case 'quantity':
                item.quantity = parseFloat(editValue) || undefined;
                break;
            case 'unitPrice':
                item.unitPrice = parseFloat(editValue.replace(/[^-\d.]/g, '')) || undefined;
                break;
            case 'amount':
                item.amount = parseFloat(editValue.replace(/[^-\d.]/g, '')) || undefined;
                break;
        }

        item._isEdited = true;
        newLineItems[originalIndex] = item;
        setLineItems(newLineItems);
        setEditingCell(null);
        setEditValue("");

        if (onDataChange) {
            onDataChange(newLineItems);
        }
    };

    // Cancel edit
    const cancelEdit = () => {
        setEditingCell(null);
        setEditValue("");
    };

    // Delete row - show confirmation first
    const requestDelete = (originalIndex: number) => {
        setPendingDeleteIndex(originalIndex);
    };

    const confirmDelete = () => {
        if (pendingDeleteIndex === null) return;
        const newLineItems = lineItems.filter((_, i) => i !== pendingDeleteIndex);
        setLineItems(newLineItems);

        if (onDataChange) {
            onDataChange(newLineItems);
        }
        setPendingDeleteIndex(null);
        toast.success("Line item deleted");
    };

    const cancelDelete = () => {
        setPendingDeleteIndex(null);
    };

    // Undo edit
    const undoEdit = (originalIndex: number) => {
        const newLineItems = [...lineItems];
        const item = newLineItems[originalIndex];

        if (item._isEdited && item._original) {
            newLineItems[originalIndex] = { ...item._original };
            setLineItems(newLineItems);

            if (onDataChange) {
                onDataChange(newLineItems);
            }
            toast.success("Changes undone");
        }
    };

    // Get raw value for editing
    const getRawValue = (item: LineItem, field: string): string => {
        switch (field) {
            case 'description': return item.description || '';
            case 'quantity': return item.quantity?.toString() || '';
            case 'unitPrice': return item.unitPrice?.toString() || '';
            case 'amount': return item.amount?.toString() || '';
            default: return '';
        }
    };

    return (
        <div className="space-y-3 flex-1 min-h-0 flex flex-col">
            {/* Toolbar - matches DynamicTable */}
            <div className="flex items-center justify-between gap-4 flex-shrink-0">
                <div className="flex items-center gap-2">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
                        <Input
                            placeholder="Search line items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8 h-8 w-64 text-xs"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {editedCount > 0 && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 font-medium border border-amber-500/20 animate-in fade-in zoom-in-50">
                            {editedCount} edited
                        </span>
                    )}
                    {headerActions}
                </div>
            </div>

            {/* Table Container - matches DynamicTable border/scroll */}
            <div className="rounded-lg border border-[hsl(var(--border))] overflow-hidden flex-1 min-h-0 flex flex-col">
                <div className="overflow-auto flex-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[hsl(var(--border))] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[hsl(var(--muted-foreground))]" style={{ scrollbarWidth: 'thin', scrollbarColor: 'hsl(var(--border)) transparent' }}>
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[hsl(var(--muted))]/50 text-[hsl(var(--foreground))]">
                            <tr>
                                <th
                                    className="px-4 py-3 font-semibold border-b border-[hsl(var(--border))] whitespace-nowrap cursor-pointer hover:bg-[hsl(var(--muted))] sticky top-0 bg-[hsl(var(--muted))]/80 backdrop-blur-sm"
                                    onClick={() => handleSort('description')}
                                >
                                    <div className="flex items-center gap-1">
                                        Description
                                        <ArrowUpDown className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 font-semibold border-b border-[hsl(var(--border))] whitespace-nowrap cursor-pointer hover:bg-[hsl(var(--muted))] sticky top-0 bg-[hsl(var(--muted))]/80 backdrop-blur-sm text-right w-24"
                                    onClick={() => handleSort('quantity')}
                                >
                                    <div className="flex items-center gap-1 justify-end">
                                        Qty
                                        <ArrowUpDown className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 font-semibold border-b border-[hsl(var(--border))] whitespace-nowrap cursor-pointer hover:bg-[hsl(var(--muted))] sticky top-0 bg-[hsl(var(--muted))]/80 backdrop-blur-sm text-right w-32"
                                    onClick={() => handleSort('unitPrice')}
                                >
                                    <div className="flex items-center gap-1 justify-end">
                                        Unit Price
                                        <ArrowUpDown className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 font-semibold border-b border-[hsl(var(--border))] whitespace-nowrap cursor-pointer hover:bg-[hsl(var(--muted))] sticky top-0 bg-[hsl(var(--muted))]/80 backdrop-blur-sm text-right w-32"
                                    onClick={() => handleSort('amount')}
                                >
                                    <div className="flex items-center gap-1 justify-end">
                                        Amount
                                        <ArrowUpDown className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                                    </div>
                                </th>
                                {/* Actions column header */}
                                <th className="w-20 px-2 py-3 sticky top-0 bg-[hsl(var(--muted))]/80 backdrop-blur-sm border-b border-[hsl(var(--border))]"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-[hsl(var(--muted-foreground))]">
                                        No line items found.
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((item: LineItem, rowIndex: number) => {
                                    const originalIndex = lineItems.findIndex(orig => orig === item);
                                    const isEdited = item._isEdited;

                                    return (
                                        <tr key={rowIndex} className={`hover:bg-[hsl(var(--muted))]/30 transition-colors ${isEdited ? "bg-amber-500/5" : ""}`}>
                                            {/* Description Cell */}
                                            <td className="px-4 py-3 border border-[hsl(var(--border))]/30 hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--primary))]/5 cursor-text transition-colors">
                                                {editingCell?.rowIndex === originalIndex && editingCell?.field === 'description' ? (
                                                    <div className="flex items-center gap-1">
                                                        <input
                                                            autoFocus
                                                            value={editValue}
                                                            onChange={(e) => setEditValue(e.target.value)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') saveEdit(originalIndex, 'description');
                                                                if (e.key === 'Escape') cancelEdit();
                                                            }}
                                                            className="flex-1 px-2 py-1 rounded border border-[hsl(var(--primary))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] outline-none text-sm min-w-[80px]"
                                                        />
                                                        <button onClick={() => saveEdit(originalIndex, 'description')} className="p-1 rounded hover:bg-green-500/10 text-green-500">
                                                            <CheckCircle2 className="w-3 h-3" />
                                                        </button>
                                                        <button onClick={cancelEdit} className="p-1 rounded hover:bg-red-500/10 text-red-500">
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span onClick={() => startEdit(originalIndex, 'description', getRawValue(item, 'description'))} className="cursor-pointer hover:text-[hsl(var(--primary))] transition-colors">
                                                        {item.description || '-'}
                                                    </span>
                                                )}
                                            </td>

                                            {/* Quantity Cell */}
                                            <td className="px-4 py-3 border border-[hsl(var(--border))]/30 hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--primary))]/5 cursor-text transition-colors text-right font-mono">
                                                {editingCell?.rowIndex === originalIndex && editingCell?.field === 'quantity' ? (
                                                    <div className="flex items-center gap-1 justify-end">
                                                        <input
                                                            autoFocus
                                                            value={editValue}
                                                            onChange={(e) => setEditValue(e.target.value)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') saveEdit(originalIndex, 'quantity');
                                                                if (e.key === 'Escape') cancelEdit();
                                                            }}
                                                            className="w-20 px-2 py-1 rounded border border-[hsl(var(--primary))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] outline-none text-sm text-right"
                                                        />
                                                        <button onClick={() => saveEdit(originalIndex, 'quantity')} className="p-1 rounded hover:bg-green-500/10 text-green-500">
                                                            <CheckCircle2 className="w-3 h-3" />
                                                        </button>
                                                        <button onClick={cancelEdit} className="p-1 rounded hover:bg-red-500/10 text-red-500">
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-[hsl(var(--muted-foreground))] cursor-pointer hover:text-[hsl(var(--primary))] transition-colors" onClick={() => startEdit(originalIndex, 'quantity', getRawValue(item, 'quantity'))}>
                                                        {item.quantity ?? '-'}
                                                    </span>
                                                )}
                                            </td>

                                            {/* Unit Price Cell */}
                                            <td className="px-4 py-3 border border-[hsl(var(--border))]/30 hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--primary))]/5 cursor-text transition-colors text-right font-mono">
                                                {editingCell?.rowIndex === originalIndex && editingCell?.field === 'unitPrice' ? (
                                                    <div className="flex items-center gap-1 justify-end">
                                                        <input
                                                            autoFocus
                                                            value={editValue}
                                                            onChange={(e) => setEditValue(e.target.value)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') saveEdit(originalIndex, 'unitPrice');
                                                                if (e.key === 'Escape') cancelEdit();
                                                            }}
                                                            className="w-24 px-2 py-1 rounded border border-[hsl(var(--primary))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] outline-none text-sm text-right"
                                                        />
                                                        <button onClick={() => saveEdit(originalIndex, 'unitPrice')} className="p-1 rounded hover:bg-green-500/10 text-green-500">
                                                            <CheckCircle2 className="w-3 h-3" />
                                                        </button>
                                                        <button onClick={cancelEdit} className="p-1 rounded hover:bg-red-500/10 text-red-500">
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-[hsl(var(--muted-foreground))] cursor-pointer hover:text-[hsl(var(--primary))] transition-colors" onClick={() => startEdit(originalIndex, 'unitPrice', getRawValue(item, 'unitPrice'))}>
                                                        {formatCurrency(item.unitPrice, currency)}
                                                    </span>
                                                )}
                                            </td>

                                            {/* Amount Cell */}
                                            <td className="px-4 py-3 border border-[hsl(var(--border))]/30 hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--primary))]/5 cursor-text transition-colors text-right font-mono font-semibold">
                                                {editingCell?.rowIndex === originalIndex && editingCell?.field === 'amount' ? (
                                                    <div className="flex items-center gap-1 justify-end">
                                                        <input
                                                            autoFocus
                                                            value={editValue}
                                                            onChange={(e) => setEditValue(e.target.value)}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') saveEdit(originalIndex, 'amount');
                                                                if (e.key === 'Escape') cancelEdit();
                                                            }}
                                                            className="w-24 px-2 py-1 rounded border border-[hsl(var(--primary))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] outline-none text-sm text-right"
                                                        />
                                                        <button onClick={() => saveEdit(originalIndex, 'amount')} className="p-1 rounded hover:bg-green-500/10 text-green-500">
                                                            <CheckCircle2 className="w-3 h-3" />
                                                        </button>
                                                        <button onClick={cancelEdit} className="p-1 rounded hover:bg-red-500/10 text-red-500">
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="cursor-pointer hover:text-[hsl(var(--primary))] transition-colors" onClick={() => startEdit(originalIndex, 'amount', getRawValue(item, 'amount'))}>
                                                        {formatCurrency(item.amount, currency)}
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions Cell */}
                                            <td className="px-2 py-2">
                                                <div className="flex items-center gap-1">
                                                    {isEdited && (
                                                        <button
                                                            onClick={() => undoEdit(originalIndex)}
                                                            className="p-1 rounded hover:bg-amber-500/10 text-[hsl(var(--muted-foreground))] hover:text-amber-600 transition-colors"
                                                            title="Undo changes"
                                                        >
                                                            <RotateCcw className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => requestDelete(originalIndex)}
                                                        className="p-1 rounded hover:bg-red-500/10 text-[hsl(var(--muted-foreground))] hover:text-red-500 transition-colors"
                                                        title="Delete row"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {pendingDeleteIndex !== null && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 animate-in fade-in zoom-in-95">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                                <Trash2 className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[hsl(var(--foreground))]">Delete Line Item?</h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">This action cannot be undone.</p>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end">
                            <Button variant="outline" size="sm" onClick={cancelDelete}>
                                Cancel
                            </Button>
                            <Button variant="destructive" size="sm" onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white">
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Export Menu (matches bank statement ExportMenu)
const ExportMenu = ({ onExport }: { onExport: (format: 'csv' | 'excel') => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className="relative" ref={menuRef}>
            <Button
                variant="default"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="gap-2 px-3 shadow-sm h-8 text-xs bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90"
            >
                <Download className="h-3.5 w-3.5" />
                Export
                <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--popover))] p-1 text-[hsl(var(--popover-foreground))] shadow-md z-[100] animate-in fade-in zoom-in-95">
                    <div className="px-2 py-1.5 text-xs font-semibold text-[hsl(var(--muted-foreground))]">
                        Standard Formats
                    </div>
                    <button
                        onClick={() => { onExport('csv'); setIsOpen(false); }}
                        className="w-full flex items-center rounded-sm px-2 py-1.5 text-xs hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] outline-none cursor-pointer"
                    >
                        <FileText className="mr-2 h-3.5 w-3.5" />
                        CSV
                    </button>
                    <button
                        onClick={() => { onExport('excel'); setIsOpen(false); }}
                        className="w-full flex items-center rounded-sm px-2 py-1.5 text-xs hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] outline-none cursor-pointer"
                    >
                        <FileText className="mr-2 h-3.5 w-3.5" />
                        Excel
                    </button>
                </div>
            )}
        </div>
    );
};

export const InvoiceResultsModal = ({ data, file, onClose, onTryAnother, isProcessing, progress = 0 }: InvoiceResultsModalProps) => {
    // Default to closed
    const [showInvoice, setShowInvoice] = useState(false);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [editedLineItems, setEditedLineItems] = useState<LineItem[] | null>(null);

    // Create file URL for viewer
    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setFileUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [file]);

    // Processing State
    if (isProcessing) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
                <div className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-2xl animate-fade-in">
                    {/* Compact Header */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20">
                        <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded bg-amber-500/10">
                                <FileText className="h-3.5 w-3.5 text-amber-500" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Processing...</h3>
                                <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Analyzing invoice</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex h-7 w-7 items-center justify-center rounded hover:bg-[hsl(var(--muted))] transition-colors"
                        >
                            <X className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                        </button>
                    </div>

                    {/* Processing Content */}
                    <div className="flex h-[calc(95vh-3rem)] items-center justify-center">
                        <div className="flex flex-col items-center justify-center gap-6">
                            {/* Circular Progress */}
                            <div className="relative w-32 h-32">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                                    <circle
                                        cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeDasharray={`${progress * 2.83} 283`}
                                        className="transition-all duration-500 ease-out"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-[hsl(var(--foreground))]">{Math.round(progress)}%</span>
                                </div>
                            </div>

                            <div className="text-center space-y-2">
                                <p className="text-lg font-medium text-[hsl(var(--foreground))]">Extracting invoice data...</p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                    {progress < 30 && "Reading PDF content..."}
                                    {progress >= 30 && progress < 60 && "Detecting line items..."}
                                    {progress >= 60 && progress < 85 && "Extracting totals..."}
                                    {progress >= 85 && "Almost done..."}
                                </p>
                            </div>

                            {/* File name */}
                            {file?.name && (
                                <p className="text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))]/50 px-3 py-1.5 rounded-full">
                                    📄 {file.name}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!data || !data.invoiceData) return null;

    const { metadata, lineItems } = data.invoiceData;
    const currency = metadata?.currency || 'USD';

    // Use edited data if available, otherwise use original
    const currentLineItems = editedLineItems || lineItems;

    const handleExport = (format: 'csv' | 'excel') => {
        try {
            const exportData = currentLineItems.map((item: LineItem) => ({
                "Description": item.description || '',
                "Quantity": item.quantity ?? '',
                "Unit Price": item.unitPrice ?? '',
                "Amount": item.amount ?? '',
                "Invoice Number": metadata?.invoiceNumber || '',
                "Invoice Date": metadata?.invoiceDate || '',
                "Vendor": metadata?.vendorName || '',
                "Total": metadata?.totalAmount ?? ''
            }));

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(exportData);
            XLSX.utils.book_append_sheet(wb, ws, "Invoice Data");

            const filename = `invoice_${metadata?.invoiceNumber || 'export'}_${new Date().toISOString().split('T')[0]}`;
            if (format === 'csv') {
                XLSX.writeFile(wb, `${filename}.csv`);
            } else {
                XLSX.writeFile(wb, `${filename}.xlsx`);
            }

            toast.success(`Exported to ${format.toUpperCase()} successfully!`);
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Failed to export data");
        }
    };

    const handleCopyToClipboard = () => {
        try {
            const text = currentLineItems.map((item: LineItem) =>
                `${item.description}\t${item.quantity ?? ''}\t${item.unitPrice ?? ''}\t${item.amount ?? ''}`
            ).join('\n');
            navigator.clipboard.writeText(`Description\tQty\tUnit Price\tAmount\n${text}`);
            toast.success("Data copied to clipboard!");
        } catch (error) {
            toast.error("Failed to copy data");
        }
    };

    const handleLineItemsChange = (items: LineItem[]) => {
        setEditedLineItems(items);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
            <div className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-2xl animate-fade-in">

                {/* Compact Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20">
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500/10">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Extraction Complete</h3>
                            <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
                                {currentLineItems.length} line items • Invoice {metadata?.invoiceNumber || ''}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        {!showInvoice && fileUrl && (
                            <Button variant="outline" size="sm" onClick={() => setShowInvoice(true)} className="h-7 text-xs px-2">
                                Show Invoice
                            </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={onTryAnother} className="h-7 text-xs px-2">
                            Try Another
                        </Button>
                        <button
                            onClick={onClose}
                            className="flex h-7 w-7 items-center justify-center rounded hover:bg-[hsl(var(--muted))] transition-colors"
                        >
                            <X className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                        </button>
                    </div>
                </div>

                {/* Content - Split view with Invoice on left, Data on right */}
                <div className="flex h-[calc(95vh-3rem)]">

                    {/* Left Side - Invoice Viewer */}
                    <div className={`w-1/2 border-r border-[hsl(var(--border))] ${showInvoice ? 'block' : 'hidden'}`}>
                        <div className="flex h-full flex-col">
                            <div className="flex items-center justify-between px-3 py-1.5 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30">
                                <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Original Invoice</span>
                                <button
                                    onClick={() => setShowInvoice(false)}
                                    className="flex h-5 w-5 items-center justify-center rounded hover:bg-[hsl(var(--muted))] transition-colors"
                                >
                                    <EyeOff className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-auto">
                                {fileUrl && (
                                    <iframe
                                        src={`${fileUrl}#toolbar=0&navpanes=0`}
                                        className="h-full w-full border-none"
                                        title="Invoice Viewer"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Extracted Data */}
                    <div className={`${showInvoice ? 'w-1/2' : 'w-full'} flex flex-col relative`}>
                        <div className="flex-1 flex flex-col overflow-hidden p-4">
                            {/* Compact Invoice Summary */}
                            <InvoiceSummaryBar metadata={metadata} />

                            {/* Line Items Table with Editing, Delete, Undo */}
                            <LineItemsTable
                                lineItems={currentLineItems}
                                currency={currency}
                                onDataChange={handleLineItemsChange}
                                headerActions={(
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" onClick={handleCopyToClipboard} className="h-8 text-xs px-3">
                                            <Copy className="h-3.5 w-3.5 mr-1.5" />Copy
                                        </Button>
                                        <ExportMenu onExport={handleExport} />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
