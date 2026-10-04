"use client";

import { useState, useCallback, useMemo } from "react";
import {
    GripVertical,
    Trash2,
    Search,
    Download,
    ChevronUp,
    ChevronDown,
    Edit2,
    Check,
    X,
    Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Column<T> {
    key: keyof T;
    header: string;
    editable?: boolean;
    width?: string;
    render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
}

export interface InteractiveDataTableProps<T extends { id: string }> {
    data: T[];
    columns: Column<T>[];
    onDataChange?: (data: T[]) => void;
    onRowDelete?: (id: string, index: number) => void;
    onRowEdit?: (id: string, field: keyof T, value: string) => void;
    onReorder?: (data: T[]) => void;
    enableDrag?: boolean;
    enableEdit?: boolean;
    enableDelete?: boolean;
    enableSearch?: boolean;
    enableExport?: boolean;
    exportFilename?: string;
    emptyMessage?: string;
    maxHeight?: string;
    className?: string;
}

export function InteractiveDataTable<T extends { id: string }>({
    data,
    columns,
    onDataChange,
    onRowDelete,
    onRowEdit,
    onReorder,
    enableDrag = true,
    enableEdit = true,
    enableDelete = true,
    enableSearch = true,
    enableExport = true,
    exportFilename = "data",
    emptyMessage = "No data available",
    maxHeight = "400px",
    className = "",
}: InteractiveDataTableProps<T>) {
    const [searchQuery, setSearchQuery] = useState("");
    const [editingCell, setEditingCell] = useState<{ row: number; field: keyof T } | null>(null);
    const [editValue, setEditValue] = useState("");
    const [draggedRow, setDraggedRow] = useState<number | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);

    // Filter data based on search
    const filteredData = useMemo(() => {
        if (!searchQuery.trim()) return data;
        const query = searchQuery.toLowerCase();
        return data.filter(row =>
            columns.some(col => {
                const value = row[col.key];
                return String(value).toLowerCase().includes(query);
            })
        );
    }, [data, searchQuery, columns]);

    // Sort data
    const sortedData = useMemo(() => {
        if (!sortConfig) return filteredData;
        return [...filteredData].sort((a, b) => {
            const aVal = String(a[sortConfig.key]);
            const bVal = String(b[sortConfig.key]);
            const comparison = aVal.localeCompare(bVal, undefined, { numeric: true });
            return sortConfig.direction === "asc" ? comparison : -comparison;
        });
    }, [filteredData, sortConfig]);

    // Handle sort
    const handleSort = (key: keyof T) => {
        setSortConfig(prev => {
            if (prev?.key === key) {
                return prev.direction === "asc" ? { key, direction: "desc" } : null;
            }
            return { key, direction: "asc" };
        });
    };

    // Start editing
    const startEdit = (rowIndex: number, field: keyof T, currentValue: T[keyof T]) => {
        if (!enableEdit) return;
        const col = columns.find(c => c.key === field);
        if (col?.editable === false) return;
        setEditingCell({ row: rowIndex, field });
        setEditValue(String(currentValue ?? ""));
    };

    // Save edit
    const saveEdit = (row: T, field: keyof T) => {
        if (onRowEdit) {
            onRowEdit(row.id, field, editValue);
        }
        if (onDataChange) {
            const newData = data.map(r =>
                r.id === row.id ? { ...r, [field]: editValue } : r
            );
            onDataChange(newData);
        }
        setEditingCell(null);
        setEditValue("");
    };

    // Cancel edit
    const cancelEdit = () => {
        setEditingCell(null);
        setEditValue("");
    };

    // Delete row
    const handleDelete = (row: T, index: number) => {
        if (onRowDelete) {
            onRowDelete(row.id, index);
        }
        if (onDataChange) {
            const newData = data.filter(r => r.id !== row.id);
            onDataChange(newData);
        }
    };

    // Drag handlers
    const handleDragStart = (index: number) => {
        if (!enableDrag) return;
        setDraggedRow(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (!enableDrag || draggedRow === null || draggedRow === index) return;

        const newData = [...data];
        const [dragged] = newData.splice(draggedRow, 1);
        newData.splice(index, 0, dragged);

        if (onReorder) {
            onReorder(newData);
        }
        if (onDataChange) {
            onDataChange(newData);
        }
        setDraggedRow(index);
    };

    const handleDragEnd = () => {
        setDraggedRow(null);
    };

    // Export to CSV
    const exportToCSV = () => {
        const headers = columns.map(col => col.header).join(",");
        const rows = data.map(row =>
            columns.map(col => {
                const value = String(row[col.key] ?? "");
                // Escape quotes and wrap in quotes if contains comma
                if (value.includes(",") || value.includes('"') || value.includes("\n")) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(",")
        ).join("\n");

        const csv = `${headers}\n${rows}`;
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${exportFilename}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className={`space-y-3 ${className}`}>
            {/* Toolbar */}
            {(enableSearch || enableExport) && (
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    {enableSearch && (
                        <div className="relative flex-1 min-w-[200px] max-w-xs">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]/50"
                            />
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        {enableDrag && (
                            <span className="text-xs text-[hsl(var(--muted-foreground))] flex items-center gap-1">
                                <GripVertical className="w-3 h-3" /> Drag to reorder
                            </span>
                        )}
                        {enableExport && data.length > 0 && (
                            <Button variant="outline" size="sm" onClick={exportToCSV}>
                                <Download className="w-4 h-4 mr-1" /> Export CSV
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {/* Table */}
            <div
                className="overflow-auto rounded-xl border border-[hsl(var(--border))]"
                style={{ maxHeight }}
            >
                <table className="w-full text-sm">
                    <thead className="bg-[hsl(var(--muted))]/50 sticky top-0">
                        <tr>
                            {enableDrag && <th className="w-8 px-2 py-3"></th>}
                            {columns.map(col => (
                                <th
                                    key={String(col.key)}
                                    className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))] cursor-pointer hover:bg-[hsl(var(--muted))]/70 transition-colors"
                                    style={{ width: col.width }}
                                    onClick={() => handleSort(col.key)}
                                >
                                    <div className="flex items-center gap-1">
                                        {col.header}
                                        {sortConfig?.key === col.key && (
                                            sortConfig.direction === "asc"
                                                ? <ChevronUp className="w-3 h-3" />
                                                : <ChevronDown className="w-3 h-3" />
                                        )}
                                    </div>
                                </th>
                            ))}
                            {enableDelete && <th className="w-10 px-2 py-3"></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (enableDrag ? 1 : 0) + (enableDelete ? 1 : 0)}
                                    className="px-4 py-8 text-center text-[hsl(var(--muted-foreground))]"
                                >
                                    {searchQuery ? "No results found" : emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            sortedData.map((row, rowIndex) => {
                                const originalIndex = data.findIndex(r => r.id === row.id);
                                return (
                                    <tr
                                        key={row.id}
                                        draggable={enableDrag}
                                        onDragStart={() => handleDragStart(originalIndex)}
                                        onDragOver={(e) => handleDragOver(e, originalIndex)}
                                        onDragEnd={handleDragEnd}
                                        className={`border-t border-[hsl(var(--border))] ${draggedRow === originalIndex
                                                ? "bg-[hsl(var(--primary))]/10"
                                                : "hover:bg-[hsl(var(--muted))]/30"
                                            } transition-colors`}
                                    >
                                        {enableDrag && (
                                            <td className="px-2 py-2 cursor-grab active:cursor-grabbing">
                                                <GripVertical className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                                            </td>
                                        )}
                                        {columns.map(col => {
                                            const isEditing = editingCell?.row === originalIndex && editingCell?.field === col.key;
                                            const canEdit = enableEdit && col.editable !== false;

                                            return (
                                                <td key={String(col.key)} className="px-4 py-2">
                                                    {isEditing ? (
                                                        <div className="flex items-center gap-1">
                                                            <input
                                                                autoFocus
                                                                value={editValue}
                                                                onChange={(e) => setEditValue(e.target.value)}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === "Enter") saveEdit(row, col.key);
                                                                    if (e.key === "Escape") cancelEdit();
                                                                }}
                                                                className="flex-1 px-2 py-1 rounded border border-[hsl(var(--primary))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] outline-none text-sm"
                                                            />
                                                            <button
                                                                onClick={() => saveEdit(row, col.key)}
                                                                className="p-1 rounded hover:bg-green-500/10 text-green-500"
                                                            >
                                                                <Check className="w-3 h-3" />
                                                            </button>
                                                            <button
                                                                onClick={cancelEdit}
                                                                className="p-1 rounded hover:bg-red-500/10 text-red-500"
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    ) : col.render ? (
                                                        col.render(row[col.key], row, originalIndex)
                                                    ) : (
                                                        <span
                                                            onClick={() => canEdit && startEdit(originalIndex, col.key, row[col.key])}
                                                            className={canEdit ? "cursor-pointer hover:text-[hsl(var(--primary))] transition-colors" : ""}
                                                        >
                                                            {row[col.key] !== undefined && row[col.key] !== ""
                                                                ? String(row[col.key])
                                                                : <span className="text-[hsl(var(--muted-foreground))]">—</span>
                                                            }
                                                        </span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                        {enableDelete && (
                                            <td className="px-2 py-2">
                                                <button
                                                    onClick={() => handleDelete(row, originalIndex)}
                                                    className="p-1 rounded hover:bg-red-500/10 text-[hsl(var(--muted-foreground))] hover:text-red-500 transition-colors"
                                                    title="Delete row"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer info */}
            {data.length > 0 && (
                <div className="text-xs text-[hsl(var(--muted-foreground))] flex items-center justify-between">
                    <span>
                        {searchQuery
                            ? `Showing ${sortedData.length} of ${data.length} rows`
                            : `${data.length} rows`
                        }
                    </span>
                    {enableEdit && (
                        <span className="flex items-center gap-1">
                            <Edit2 className="w-3 h-3" /> Click cells to edit
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
