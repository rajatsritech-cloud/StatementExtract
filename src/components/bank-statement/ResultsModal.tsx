"use client";

import { useState, useMemo, useEffect } from "react";
import { X, Download, Copy, Eye, EyeOff, TrendingUp, TrendingDown, DollarSign, User, Mail, Building, CreditCard, Calendar, Wallet, ArrowUpCircle, ArrowDownCircle, FileText, Search, ArrowUpDown, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Assuming ExportService and ExtractedData are correctly defined elsewhere
import { ExportService } from "@/lib/exportService";
import { ExtractedData, PDFProcessor } from "@/lib/pdfProcessor";
import { toast } from "react-hot-toast";
import { useAuth, SignInButton } from "@clerk/clerk-react";
import { PrivacyNotice } from "@/components/PrivacyNotice";

interface ResultsModalProps {
  data: ExtractedData | null;
  file: File | null;
  isProcessing?: boolean;
  progress?: number;
  onClose: () => void;
  onTryAnother: () => void;
  onExport: (format: 'csv' | 'excel') => void;
}

// --- Helper Functions for Formatting ---
const formatCurrency = (amount: number, currency: string = 'USD') => {
  // Simple mapping for common symbols to currency codes
  const currencyCode = currency === '£' ? 'GBP' : currency === '€' ? 'EUR' : 'USD';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

// --- Sub-Components for Cleanliness ---

interface UserInfoAndSummaryProps {
  userInfo: ExtractedData['userInfo'];
}

const UserInfoAndSummary = ({ userInfo }: UserInfoAndSummaryProps) => {
  const currency = userInfo.currency || '$';

  return (
    <div className="mb-6 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm" data-clarity-mask="true">
      <div className="flex items-center gap-2 mb-6 border-b border-[hsl(var(--border))] pb-3">
        <FileText className="h-5 w-5 text-[hsl(var(--primary))]" />
        <h4 className="font-semibold text-[hsl(var(--foreground))]">Statement Overview</h4>
      </div>

      <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
        {/* Account Information Section */}
        <div>
          <h5 className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-4">Account Information</h5>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-[hsl(var(--border))]/50 pb-2">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">Account Name</span>
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">{userInfo.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-[hsl(var(--border))]/50 pb-2">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">Account Number</span>
              <span className="text-sm font-medium text-[hsl(var(--foreground))] font-mono">{userInfo.accountNumber || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-[hsl(var(--border))]/50 pb-2">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">Bank Name</span>
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">{userInfo.bankName || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-[hsl(var(--border))]/50 pb-2">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">Statement Period</span>
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">{userInfo.statementPeriod || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Account Summary Section */}
        {userInfo.accountSummary && (
          <div>
            <h5 className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-4">Account Summary</h5>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-[hsl(var(--border))]/50 pb-2">
                <span className="text-sm text-[hsl(var(--muted-foreground))]">Opening Balance</span>
                <span className="text-sm font-medium text-[hsl(var(--foreground))]">{formatCurrency(userInfo.accountSummary.beginningBalance, currency)}</span>
              </div>
              <div className="flex justify-between border-b border-[hsl(var(--border))]/50 pb-2">
                <span className="text-sm text-[hsl(var(--muted-foreground))]">Total Credits</span>
                <span className="text-sm font-medium text-green-600">{formatCurrency(userInfo.accountSummary.totalDeposits, currency)}</span>
              </div>
              <div className="flex justify-between border-b border-[hsl(var(--border))]/50 pb-2">
                <span className="text-sm text-[hsl(var(--muted-foreground))]">Total Debits</span>
                <span className="text-sm font-medium text-red-600">{formatCurrency(userInfo.accountSummary.totalWithdrawals, currency)}</span>
              </div>
              <div className="flex justify-between border-b border-[hsl(var(--border))]/50 pb-2">
                <span className="text-sm text-[hsl(var(--muted-foreground))]">Closing Balance</span>
                <span className="text-sm font-bold text-[hsl(var(--foreground))]">{formatCurrency(userInfo.accountSummary.endingBalance, currency)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Dynamic Table Component ---
interface DynamicTableProps {
  transactions: ExtractedData['transactions'];
  currency?: string;
  columnNames?: { [key: string]: string };
}

const DynamicTable = ({ transactions, currency = '$', columnNames }: DynamicTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Convert transactions to rows for display
  const { headers, rows } = useMemo(() => {
    if (!transactions || transactions.length === 0) return { headers: [], rows: [] };

    const creditLabel = columnNames?.credit || "Money In";
    const debitLabel = columnNames?.debit || "Money Out";

    const headers = ["Date", "Description", creditLabel, debitLabel, "Balance"];

    // Filter rows based on search term
    const filtered = transactions.filter(t =>
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.date.includes(searchTerm) ||
      t.amount.toString().includes(searchTerm)
    );

    // Sort rows
    const sorted = [...filtered].sort((a, b) => {
      if (!sortConfig) return 0;

      let aValue: any = '';
      let bValue: any = '';

      // Map sort keys to values
      switch (sortConfig.key) {
        case 'Date': aValue = a.date; bValue = b.date; break;
        case 'Description': aValue = a.description; bValue = b.description; break;
        case creditLabel:
          aValue = a.moneyIn || (a.type === 'credit' ? a.amount : 0);
          bValue = b.moneyIn || (b.type === 'credit' ? b.amount : 0);
          break;
        case debitLabel:
          aValue = a.moneyOut || (a.type === 'debit' ? a.amount : 0);
          bValue = b.moneyOut || (b.type === 'debit' ? b.amount : 0);
          break;
        case 'Balance': aValue = a.balance; bValue = b.balance; break;
        default: return 0;
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    const rows = sorted.map(t => {
      const moneyIn = t.moneyIn !== undefined ? t.moneyIn : (t.type === 'credit' ? t.amount : 0);
      const moneyOut = t.moneyOut !== undefined ? t.moneyOut : (t.type === 'debit' ? t.amount : 0);

      return [
        t.date,
        t.description,
        moneyIn > 0 ? formatCurrency(moneyIn, currency) : '-',
        moneyOut > 0 ? formatCurrency(moneyOut, currency) : '-',
        formatCurrency(t.balance, currency)
      ];
    });

    return { headers, rows };
  }, [transactions, searchTerm, sortConfig, currency, columnNames]);

  const requestSort = (headerIndex: number) => {
    const header = headers[headerIndex];
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === header && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: header, direction });
  };

  // Helper to determine cell style based on header
  const getCellStyle = (header: string, content: string) => {
    const creditLabel = columnNames?.credit || "Money In";
    const debitLabel = columnNames?.debit || "Money Out";

    if (header === creditLabel && content !== '-') return "text-green-600 font-medium";
    if (header === debitLabel && content !== '-') return "text-red-600 font-medium";
    return "text-[hsl(var(--foreground))]";
  };

  if (transactions.length === 0) return <div className="text-center py-8 text-[hsl(var(--muted-foreground))]">No transaction data found.</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-[hsl(var(--foreground))]">Transactions</h4>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 h-9"
          />
        </div>
      </div>

      <div className="rounded-lg border border-[hsl(var(--border))] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[hsl(var(--muted))]/50 text-[hsl(var(--foreground))]">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 font-semibold border-b border-[hsl(var(--border))] whitespace-nowrap cursor-pointer hover:bg-[hsl(var(--muted))]"
                    onClick={() => requestSort(index)}
                  >
                    <div className="flex items-center gap-1">
                      {header}
                      <ArrowUpDown className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody data-clarity-mask="true">
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-[hsl(var(--muted))]/30 transition-colors border-b border-[hsl(var(--border))] last:border-0">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className={`px-4 py-3 ${getCellStyle(headers[cellIndex], cell)}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-xs text-[hsl(var(--muted-foreground))] text-right">
        Showing {rows.length} transactions
      </div>
    </div>
  );
};

// --- Main Component ---
export const ResultsModal = ({ data, file, isProcessing = false, progress = 0, onClose, onTryAnother, onExport }: ResultsModalProps) => {
  const [showPdf, setShowPdf] = useState(false);
  const [isApproved, setIsApproved] = useState(true);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();

  // Effect to create and revoke PDF object URL
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setFileUrl(null);
  }, [file]);

  const handleExport = (format: 'csv' | 'excel') => {
    if (isLoaded && !isSignedIn) {
      // Save data to localStorage so it can be recovered after login
      if (data) {
        localStorage.setItem("pending_extraction", JSON.stringify({
          data: data,
          fileName: file?.name || "Extracted Statement.pdf",
          date: new Date().toLocaleDateString()
        }));
      }
      setShowLoginPrompt(true);
    } else {
      onExport(format);
    }
  };

  const handleCopyToClipboard = () => {
    if (isLoaded && !isSignedIn) {
      if (data) {
        localStorage.setItem("pending_extraction", JSON.stringify({
          data: data,
          fileName: file?.name || "Extracted Statement.pdf",
          date: new Date().toLocaleDateString()
        }));
      }
      setShowLoginPrompt(true);
      return;
    }
    try {
      if (!data) {
        toast.error("No data to copy.");
        return;
      }
      ExportService.copyToClipboard(data);
      toast.success("Data copied to clipboard!");
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast.error("Failed to copy data.");
    }
  };

  // --- JSX Rendering ---
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-7xl max-h-[90vh] overflow-hidden rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-2xl animate-fade-in">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--border))]">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
              <DollarSign className="h-4 w-4 text-[hsl(var(--primary))]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">
                {isProcessing ? 'Processing Statement...' : 'Extraction Complete!'}
              </h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                {isProcessing
                  ? 'Please wait while we analyze your document'
                  : data?.summary?.transactionCount && data.summary.transactionCount > 0
                    ? `${data.summary.transactionCount} transactions extracted`
                    : 'Data extracted successfully'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isProcessing && (
              <Button variant="outline" size="sm" onClick={onTryAnother} className="h-8 text-xs">
                Try Another File
              </Button>
            )}
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
            >
              <X className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-8rem)]">

          {/* Left Side - PDF Viewer */}
          <div className={`w-1/2 border-r border-[hsl(var(--border))] ${showPdf ? 'block' : 'hidden'}`}>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--border))]">
                <h4 className="font-medium text-[hsl(var(--foreground))]">Original Document</h4>
                <button
                  onClick={() => setShowPdf(false)}
                  className="flex h-6 w-6 items-center justify-center rounded hover:bg-[hsl(var(--muted))] transition-colors"
                >
                  <EyeOff className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                </button>
              </div>
              <div className="flex-1 overflow-auto">
                {fileUrl && (
                  <iframe
                    src={`${fileUrl}#toolbar=0&navpanes=0`}
                    className="h-full w-full border-none"
                    title="PDF Viewer"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Transaction Data/Processing UI */}
          <div className={`${showPdf ? 'w-1/2' : 'w-full'} flex flex-col relative`}>

            {/* Show PDF Toggle Button (when PDF is hidden) */}
            {!showPdf && (
              <div className="flex items-center justify-center p-4 border-b border-[hsl(var(--border))]">
                <button
                  onClick={() => setShowPdf(true)}
                  className="flex items-center gap-2 text-sm text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]/80 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  Show PDF Viewer
                </button>
              </div>
            )}

            <div className="flex-1 overflow-auto p-4">
              {isProcessing ? (
                // ===== PROCESSING UI =====
                <div className="flex items-center justify-center h-full">
                  <div className="text-center max-w-md">
                    <div className="relative mb-8">
                      <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-[hsl(var(--primary))] mx-auto"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <DollarSign className="h-8 w-8 text-[hsl(var(--primary))]" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">
                      Processing Your Statement
                    </h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
                      Extracting transaction data and account information...
                    </p>
                    {/* Progress Bar */}
                    <div className="w-full bg-[hsl(var(--muted))] rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-[hsl(var(--primary))] to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      {Math.round(progress)}% complete
                    </p>
                  </div>
                </div>
              ) : data ? (
                // ===== RESULTS UI =====
                <>
                  {/* Consolidated Account Info & Summary */}
                  <UserInfoAndSummary userInfo={data.userInfo} />

                  {/* Export Buttons - Positioned above table */}
                  <div className="flex items-center justify-end mb-4 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyToClipboard}
                      disabled={!isApproved}
                      title={!isApproved ? "Please approve the review first" : "Copy to clipboard"}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExport('csv')}
                      disabled={!isApproved}
                      title={!isApproved ? "Please approve the review first" : "Export as CSV"}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      {!isApproved ? '🔒 CSV' : 'CSV'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExport('excel')}
                      disabled={!isApproved}
                      title={!isApproved ? "Please approve the review first" : "Export as Excel"}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      {!isApproved ? '🔒 Excel' : 'Excel'}
                    </Button>
                  </div>

                  {/* Dynamic Table with Sort/Search */}
                  {data.transactions && <DynamicTable transactions={data.transactions} currency={data.userInfo.currency} columnNames={data.column_names} />}

                  {/* Privacy Notice */}
                  <PrivacyNotice className="mt-8" />
                </>
              ) : null}
            </div>

            {/* Inline Login Prompt Overlay */}
            {showLoginPrompt && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px] animate-fade-in rounded-br-2xl">
                <div className="w-full max-w-sm bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-2xl p-6 animate-scale-in mx-4">
                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowLoginPrompt(false)}
                      className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-center mt-2">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10">
                      <Sparkles className="h-6 w-6 text-[hsl(var(--primary))]" />
                    </div>
                    <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-2">
                      Sign in to Download
                    </h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
                      Create a free account to download your extracted data and save it to your dashboard.
                    </p>
                    <div className="space-y-3">
                      <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                        <Button className="w-full gap-2 shadow-lg hover:shadow-xl transition-all">
                          Login / Sign Up Free
                        </Button>
                      </SignInButton>
                      <Button
                        variant="ghost"
                        onClick={() => setShowLoginPrompt(false)}
                        className="w-full"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div >
      </div >
    </div >
  );
};