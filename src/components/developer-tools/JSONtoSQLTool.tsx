"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Database, Copy, Download, RefreshCw, CheckCircle, AlertCircle, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyBadge } from "@/components/ui/PrivacyBadge";

type SQLDialect = "mysql" | "postgresql" | "sqlite" | "mssql";
type OutputType = "insert" | "create" | "both";

export function JSONtoSQLTool() {
    const [jsonInput, setJsonInput] = useState<string>("");
    const [sqlOutput, setSqlOutput] = useState<string>("");
    const [tableName, setTableName] = useState<string>("my_table");
    const [dialect, setDialect] = useState<SQLDialect>("postgresql");
    const [outputType, setOutputType] = useState<OutputType>("both");
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const outputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sqlOutput) {
            setTimeout(() => {
                outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    }, [sqlOutput]);

    const dialectConfig = {
        mysql: { name: "MySQL", quote: "`", stringQuote: "'" },
        postgresql: { name: "PostgreSQL", quote: '"', stringQuote: "'" },
        sqlite: { name: "SQLite", quote: '"', stringQuote: "'" },
        mssql: { name: "SQL Server", quote: "[", closeQuote: "]", stringQuote: "'" },
    };

    const escapeString = (value: string, dialect: SQLDialect): string => {
        return value.replace(/'/g, "''");
    };

    const quoteIdentifier = (name: string, dialect: SQLDialect): string => {
        const config = dialectConfig[dialect];
        if (dialect === "mssql") {
            return `[${name}]`;
        }
        return `${config.quote}${name}${config.quote}`;
    };

    const inferSQLType = (value: unknown, dialect: SQLDialect): string => {
        if (value === null || value === undefined) {
            return dialect === "postgresql" ? "TEXT" : "VARCHAR(255)";
        }
        if (typeof value === "number") {
            if (Number.isInteger(value)) {
                return value > 2147483647 || value < -2147483648 ? "BIGINT" : "INT";
            }
            return dialect === "postgresql" ? "NUMERIC" : "DECIMAL(18,6)";
        }
        if (typeof value === "boolean") {
            return dialect === "mysql" ? "TINYINT(1)" : "BOOLEAN";
        }
        if (typeof value === "string") {
            // Check for date patterns
            if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return "DATE";
            if (/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}/.test(value)) {
                return dialect === "postgresql" ? "TIMESTAMP" : "DATETIME";
            }
            if (value.length > 255) return "TEXT";
            return dialect === "postgresql" ? "VARCHAR(255)" : "VARCHAR(255)";
        }
        if (Array.isArray(value) || typeof value === "object") {
            return dialect === "postgresql" ? "JSONB" : "JSON";
        }
        return "TEXT";
    };

    const formatValue = (value: unknown, dialect: SQLDialect): string => {
        if (value === null || value === undefined) return "NULL";
        if (typeof value === "number") return String(value);
        if (typeof value === "boolean") {
            if (dialect === "mysql") return value ? "1" : "0";
            return value ? "TRUE" : "FALSE";
        }
        if (typeof value === "string") {
            return `'${escapeString(value, dialect)}'`;
        }
        if (Array.isArray(value) || typeof value === "object") {
            return `'${escapeString(JSON.stringify(value), dialect)}'`;
        }
        return "NULL";
    };

    const convertToSQL = useCallback(() => {
        setError(null);
        setSqlOutput("");

        if (!jsonInput.trim()) {
            setError("Please enter JSON data");
            return;
        }

        try {
            let data = JSON.parse(jsonInput);

            // Normalize to array
            if (!Array.isArray(data)) {
                data = [data];
            }

            if (data.length === 0) {
                setError("JSON array is empty");
                return;
            }

            // Get all unique keys across all objects
            const allKeys = new Set<string>();
            data.forEach((row: Record<string, unknown>) => {
                if (typeof row === "object" && row !== null) {
                    Object.keys(row).forEach(key => allKeys.add(key));
                }
            });

            if (allKeys.size === 0) {
                setError("No valid object properties found in JSON");
                return;
            }

            const columns = Array.from(allKeys);
            const sqlParts: string[] = [];

            // Generate CREATE TABLE statement
            if (outputType === "create" || outputType === "both") {
                const columnDefs = columns.map(col => {
                    // Find first non-null value for type inference
                    let sampleValue: unknown = null;
                    for (const row of data) {
                        if (row[col] !== null && row[col] !== undefined) {
                            sampleValue = row[col];
                            break;
                        }
                    }
                    const sqlType = inferSQLType(sampleValue, dialect);
                    return `    ${quoteIdentifier(col, dialect)} ${sqlType}`;
                });

                sqlParts.push(`CREATE TABLE ${quoteIdentifier(tableName, dialect)} (`);
                sqlParts.push(columnDefs.join(",\n"));
                sqlParts.push(");\n");
            }

            // Generate INSERT statements
            if (outputType === "insert" || outputType === "both") {
                const columnList = columns.map(col => quoteIdentifier(col, dialect)).join(", ");

                sqlParts.push(`INSERT INTO ${quoteIdentifier(tableName, dialect)} (${columnList})`);
                sqlParts.push("VALUES");

                const valueRows = data.map((row: Record<string, unknown>, index: number) => {
                    const values = columns.map(col => formatValue(row[col], dialect));
                    const suffix = index === data.length - 1 ? ";" : ",";
                    return `    (${values.join(", ")})${suffix}`;
                });

                sqlParts.push(valueRows.join("\n"));
            }

            setSqlOutput(sqlParts.join("\n"));
        } catch (e) {
            if (e instanceof SyntaxError) {
                setError(`Invalid JSON: ${e.message}`);
            } else {
                setError("An error occurred while converting JSON to SQL");
            }
        }
    }, [jsonInput, tableName, dialect, outputType]);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(sqlOutput);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            console.error("Failed to copy");
        }
    };

    const downloadSQL = () => {
        const blob = new Blob([sqlOutput], { type: "text/sql" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${tableName}.sql`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const sampleJSON = `[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "is_active": true,
    "created_at": "2024-01-15T10:30:00Z"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "age": 25,
    "is_active": false,
    "created_at": "2024-02-20T14:45:00Z"
  }
]`;

    const loadSample = () => {
        setJsonInput(sampleJSON);
        setError(null);
    };

    const reset = () => {
        setJsonInput("");
        setSqlOutput("");
        setError(null);
        setTableName("my_table");
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
                    JSON to SQL Converter
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
                    Convert JSON data to SQL INSERT statements and CREATE TABLE schemas. Supports MySQL, PostgreSQL, SQLite, and SQL Server.
                </p>
            </div>

            {/* Options Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6 p-4 rounded-xl bg-[hsl(var(--muted))]/30 border border-[hsl(var(--border))]">
                {/* Table Name */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-[hsl(var(--foreground))]">Table:</label>
                    <input
                        type="text"
                        value={tableName}
                        onChange={(e) => setTableName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))}
                        className="px-3 py-1.5 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-sm w-32"
                        placeholder="table_name"
                    />
                </div>

                {/* SQL Dialect */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-[hsl(var(--foreground))]">Dialect:</label>
                    <select
                        value={dialect}
                        onChange={(e) => setDialect(e.target.value as SQLDialect)}
                        className="px-3 py-1.5 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-sm"
                    >
                        <option value="postgresql">PostgreSQL</option>
                        <option value="mysql">MySQL</option>
                        <option value="sqlite">SQLite</option>
                        <option value="mssql">SQL Server</option>
                    </select>
                </div>

                {/* Output Type */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-[hsl(var(--foreground))]">Output:</label>
                    <select
                        value={outputType}
                        onChange={(e) => setOutputType(e.target.value as OutputType)}
                        className="px-3 py-1.5 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-sm"
                    >
                        <option value="both">CREATE + INSERT</option>
                        <option value="create">CREATE TABLE only</option>
                        <option value="insert">INSERT only</option>
                    </select>
                </div>
            </div>

            {/* Main Editor Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* JSON Input */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-[hsl(var(--primary))]" />
                            JSON Input
                        </label>
                        <button
                            onClick={loadSample}
                            className="text-xs text-[hsl(var(--primary))] hover:underline"
                        >
                            Load Sample
                        </button>
                    </div>
                    <textarea
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        placeholder='[{"id": 1, "name": "Example"}]'
                        className="w-full h-80 p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] font-mono text-sm resize-none focus:outline-none focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))]/20"
                    />
                </div>

                {/* SQL Output */}
                <div className="space-y-3" ref={outputRef}>
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
                            <Database className="w-4 h-4 text-[hsl(var(--primary))]" />
                            SQL Output
                        </label>
                        {sqlOutput && (
                            <div className="flex gap-2">
                                <button
                                    onClick={copyToClipboard}
                                    className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] flex items-center gap-1"
                                >
                                    {copied ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                                    {copied ? "Copied!" : "Copy"}
                                </button>
                                <button
                                    onClick={downloadSQL}
                                    className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] flex items-center gap-1"
                                >
                                    <Download className="w-3 h-3" />
                                    Download
                                </button>
                            </div>
                        )}
                    </div>
                    <textarea
                        value={sqlOutput}
                        readOnly
                        placeholder="SQL output will appear here..."
                        className="w-full h-80 p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 font-mono text-sm resize-none"
                    />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
                <Button
                    onClick={convertToSQL}
                    className="px-8 py-6 text-lg bg-gradient-primary shadow-glow hover:opacity-90"
                >
                    <Database className="w-5 h-5 mr-2" />
                    Convert to SQL
                </Button>
                <Button variant="outline" onClick={reset}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset
                </Button>
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                    { label: "Auto Type Detection", desc: "INT, VARCHAR, DATE, BOOLEAN" },
                    { label: "Multi-Dialect", desc: "MySQL, PostgreSQL, SQLite, MSSQL" },
                    { label: "Nested JSON", desc: "Objects stored as JSON/JSONB" },
                    { label: "100% Client-Side", desc: "Your data never leaves your browser" },
                ].map((feature, i) => (
                    <div key={i} className="p-3 rounded-lg bg-[hsl(var(--muted))]/30">
                        <p className="font-medium text-[hsl(var(--foreground))] text-sm">{feature.label}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">{feature.desc}</p>
                    </div>
                ))}
            </div>

            {/* Privacy Badge */}
            <PrivacyBadge />
        </div>
    );
}
