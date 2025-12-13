"use client";

import { useState, useMemo, useEffect } from "react";
import { X, Download, Copy, Eye, EyeOff, TrendingUp, TrendingDown, DollarSign, User, Mail, Building, CreditCard, Calendar, Wallet, ArrowUpCircle, ArrowDownCircle, FileText, Search, ArrowUpDown, Sparkles, CheckCircle2, Lock, Crown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Assuming ExportService and ExtractedData are correctly defined elsewhere
import { ExportService } from "@/lib/exportService";
import { ExtractedData, PDFProcessor } from "@/lib/pdfProcessor";
import { toast } from "react-hot-toast";
import { useAuth, SignInButton } from "@clerk/clerk-react";
import { useUsage } from "@/hooks/useUsage";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { ProcessingPipeline, ProcessingStep, getDefaultProcessingSteps, updateStepsFromResponse } from "./ProcessingPipeline";

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
  // Map symbols to currency codes
  let currencyCode = 'USD';
  if (currency === '£' || currency === 'GBP') currencyCode = 'GBP';
  else if (currency === '€' || currency === 'EUR') currencyCode = 'EUR';
  else if (currency === '₹' || currency === 'INR' || currency === 'Rs') currencyCode = 'INR';
  else if (currency === 'C$' || currency === 'CAD') currencyCode = 'CAD';
  else if (currency === 'A$' || currency === 'AUD') currencyCode = 'AUD';
  else if (currency && currency.length === 3) currencyCode = currency; // Assume valid 3-letter code

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  } catch (e) {
    // Fallback if currency code is invalid
    return `${currency}${amount.toFixed(2)}`;
  }
};

// --- Sub-Components for Cleanliness ---

interface UserInfoAndSummaryProps {
  userInfo: ExtractedData['userInfo'];
}

const UserInfoAndSummary = ({ userInfo }: UserInfoAndSummaryProps) => {
  const currency = userInfo.currency || '$';

  return (
    <div className="mb-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden" data-clarity-mask="true">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[hsl(var(--muted))]/30 border-b border-[hsl(var(--border))]">
        <FileText className="h-4 w-4 text-[hsl(var(--primary))]" />
        <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">Statement Overview</h4>
      </div>

      {/* Content - Two columns with divider */}
      <div className="p-5 grid gap-6 md:grid-cols-2 md:divide-x md:divide-[hsl(var(--border))]">
        {/* Account Information Card */}
        <div className="space-y-3 pr-6">
          <h5 className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">Account Details</h5>
          <div className="space-y-2 text-sm">
            {userInfo.name && userInfo.name !== 'N/A' && (
              <div className="flex justify-between">
                <span className="text-[hsl(var(--muted-foreground))]">Account Holder</span>
                <span className="font-medium text-[hsl(var(--foreground))]">{userInfo.name}</span>
              </div>
            )}
            {userInfo.accountNumber && userInfo.accountNumber !== 'N/A' && (
              <div className="flex justify-between">
                <span className="text-[hsl(var(--muted-foreground))]">Account No.</span>
                <span className="font-medium text-[hsl(var(--foreground))] font-mono">{userInfo.accountNumber}</span>
              </div>
            )}
            {userInfo.bankName && userInfo.bankName !== 'N/A' && (
              <div className="flex justify-between">
                <span className="text-[hsl(var(--muted-foreground))]">Bank</span>
                <span className="font-medium text-[hsl(var(--foreground))]">{userInfo.bankName}</span>
              </div>
            )}
            {userInfo.statementPeriod && userInfo.statementPeriod !== 'N/A' && (
              <div className="flex justify-between">
                <span className="text-[hsl(var(--muted-foreground))]">Period</span>
                <span className="font-medium text-[hsl(var(--foreground))]">{userInfo.statementPeriod}</span>
              </div>
            )}
          </div>
        </div>

        {/* Financial Summary Card */}
        {userInfo.accountSummary && (
          <div className="space-y-3 pl-6">
            <h5 className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">Financial Summary</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[hsl(var(--muted-foreground))]">Opening Balance</span>
                <span className="font-medium text-[hsl(var(--foreground))]">{formatCurrency(userInfo.accountSummary.beginningBalance, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[hsl(var(--muted-foreground))]">Total Credits</span>
                <span className="font-medium text-green-600">+{formatCurrency(userInfo.accountSummary.totalDeposits, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[hsl(var(--muted-foreground))]">Total Debits</span>
                <span className="font-medium text-red-600">-{formatCurrency(userInfo.accountSummary.totalWithdrawals, currency)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[hsl(var(--border))]">
                <span className="font-semibold text-[hsl(var(--foreground))]">Closing Balance</span>
                <span className="font-bold text-[hsl(var(--foreground))]">{formatCurrency(userInfo.accountSummary.endingBalance, currency)}</span>
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
  title?: string;
}

const DynamicTable = ({ transactions, currency = '$', columnNames, title = "Transactions" }: DynamicTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Convert transactions to rows for display
  const { headers, rows } = useMemo(() => {
    if (!transactions || transactions.length === 0) return { headers: [], rows: [] };

    // Standardized Headers to avoid "Amount/Amount" confusion
    const headers = ["Date", "Description", "Credit", "Debit", "Balance"];

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
        case "Credit":
          aValue = a.moneyIn || (a.type === 'credit' ? a.amount : 0);
          bValue = b.moneyIn || (b.type === 'credit' ? b.amount : 0);
          break;
        case "Debit":
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

  // Reset to first page when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortConfig]);

  // Pagination Logic
  const totalPages = Math.ceil(rows.length / ITEMS_PER_PAGE);
  const paginatedRows = rows.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const goToNextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));
  const goToPrevPage = () => setCurrentPage(p => Math.max(1, p - 1));

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
    if (header === "Credit" && content !== '-') return "text-green-600 font-medium";
    if (header === "Debit" && content !== '-') return "text-red-600 font-medium";
    return "text-[hsl(var(--foreground))]";
  };

  if (transactions.length === 0) return <div className="text-center py-8 text-[hsl(var(--muted-foreground))]">No transaction data found.</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-[hsl(var(--foreground))]">{title}</h4>
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
              {paginatedRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-[hsl(var(--muted))]/30 transition-colors border-b border-[hsl(var(--border))] last:border-0 text-zinc-600 dark:text-zinc-300">
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

      {/* Pagination Controls */}
      <div className="flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))]">
        <div>
          Showing {paginatedRows.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(currentPage * ITEMS_PER_PAGE, rows.length)} of {rows.length} transactions
        </div>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToPrevPage} disabled={currentPage === 1} className="h-7 w-7 p-0">
              {"<"}
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage === totalPages} className="h-7 w-7 p-0">
              {">"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Helper: Generate simulated processing steps based on progress ---
const getSimulatedProcessingSteps = (progress: number): ProcessingStep[] => {
  const steps: ProcessingStep[] = [
    {
      id: 'upload',
      name: 'Document Upload',
      status: progress >= 10 ? 'complete' : 'running',
      details: progress >= 10 ? 'Document received' : 'Uploading...'
    },
    {
      id: 'text_extraction',
      name: 'Text Extraction',
      status: progress >= 25 ? 'complete' : progress >= 10 ? 'running' : 'pending',
      details: progress >= 25 ? 'Extracted text using pdfplumber' : progress >= 10 ? 'Extracting text...' : undefined
    },
    {
      id: 'transaction_detection',
      name: 'Transaction Detection',
      status: progress >= 40 ? 'complete' : progress >= 25 ? 'running' : 'pending',
      details: progress >= 40 ? 'Detecting transactions...' : undefined
    },
    {
      id: 'math_verification',
      name: 'Math Verification',
      status: progress >= 55 ? 'complete' : progress >= 40 ? 'running' : 'pending',
      details: progress >= 55 ? 'Balance equation verified' : undefined
    },
    {
      id: 'duplicate_detection',
      name: 'Duplicate Detection',
      status: progress >= 65 ? 'complete' : progress >= 55 ? 'running' : 'pending',
      details: progress >= 65 ? 'Checking for duplicates...' : undefined
    },
    {
      id: 'fraud_analysis',
      name: 'Fraud Analysis',
      status: progress >= 75 ? 'complete' : progress >= 65 ? 'running' : 'pending',
      details: progress >= 75 ? 'Analyzing patterns...' : undefined
    },
    {
      id: 'payee_normalization',
      name: 'Payee Normalization',
      status: progress >= 85 ? 'complete' : progress >= 75 ? 'running' : 'pending',
      details: progress >= 85 ? 'Cleaning merchant names...' : undefined
    },

    {
      id: 'llm_validation',
      name: 'AI Validation',
      status: progress >= 95 ? 'complete' : progress >= 90 ? 'running' : 'pending',
      details: progress >= 95 ? 'Finalizing...' : undefined
    },
  ];
  return steps;
};

// --- Main Component ---
export const ResultsModal = ({ data, file, isProcessing = false, progress = 0, onClose, onTryAnother, onExport }: ResultsModalProps) => {
  const [showPdf, setShowPdf] = useState(false);
  const [isApproved, setIsApproved] = useState(true);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();
  const { usage } = useUsage();

  // Determine if user has Pro tier (pro, enterprise, or admin)
  const isPro = !!(usage?.tier && ['pro', 'enterprise', 'admin'].includes(usage.tier.toLowerCase()));

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

  const handleExportQBO = () => {
    if (isLoaded && !isSignedIn) {
      if (data) {
        localStorage.setItem("pending_extraction", JSON.stringify({
          data: data,
          fileName: file?.name || "Extracted Statement.pdf",
          date: new Date().toLocaleDateString()
        }));
      }
      setShowLoginPrompt(true);
    } else if (data) {
      ExportService.exportToQBO(data);
      toast.success("QuickBooks file (.qbo) downloaded!");
    }
  };

  const handleExportTally = () => {
    if (isLoaded && !isSignedIn) {
      if (data) {
        localStorage.setItem("pending_extraction", JSON.stringify({
          data: data,
          fileName: file?.name || "Extracted Statement.pdf",
          date: new Date().toLocaleDateString()
        }));
      }
      setShowLoginPrompt(true);
    } else if (data) {
      ExportService.exportToTally(data);
      toast.success("Tally file (.xml) downloaded!");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
      <div className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-2xl animate-fade-in">

        {/* Compact Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[hsl(var(--primary))]/10">
              <DollarSign className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                {isProcessing ? 'Processing...' : 'Extraction Complete'}
              </h3>
              <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
                {isProcessing
                  ? 'Analyzing document'
                  : data?.summary?.transactionCount && data.summary.transactionCount > 0
                    ? `${data.summary.transactionCount} transactions`
                    : 'Ready to export'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {!isProcessing && (
              <Button variant="outline" size="sm" onClick={onTryAnother} className="h-7 text-xs px-2">
                Try Another
              </Button>
            )}
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded hover:bg-[hsl(var(--muted))] transition-colors"
            >
              <X className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(95vh-3rem)]">

          {/* Left Side - PDF Viewer */}
          <div className={`w-1/2 border-r border-[hsl(var(--border))] ${showPdf ? 'block' : 'hidden'}`}>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30">
                <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Original PDF</span>
                <button
                  onClick={() => setShowPdf(false)}
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
                    title="PDF Viewer"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Transaction Data */}
          <div className={`${showPdf ? 'w-1/2' : 'w-full'} flex flex-col relative`}>

            {/* Show PDF Toggle (subtle) */}
            {!showPdf && (
              <div className="flex items-center justify-center py-1.5 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20">
                <button
                  onClick={() => setShowPdf(true)}
                  className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  <Eye className="h-3 w-3" />
                  Show PDF
                </button>
              </div>
            )}

            <div className="flex-1 overflow-auto p-4">
              {isProcessing ? (
                // ===== PROCESSING UI with Pipeline =====
                <div className="max-w-2xl mx-auto">
                  <ProcessingPipeline
                    steps={getSimulatedProcessingSteps(progress)}
                    isProcessing={true}
                    fileName={file?.name}
                    pageCount={undefined}
                    transactionCount={undefined}
                  />
                </div>
              ) : data ? (
                // ===== RESULTS UI =====
                <>
                  {/* Processing Pipeline - Only show if backend returned it */}
                  {data.processing_steps && data.processing_steps.length > 0 && (
                    <ProcessingPipeline
                      steps={data.processing_steps.map(s => ({ ...s, subSteps: s.sub_steps })) as ProcessingStep[]}
                      isProcessing={false}
                      isPro={isPro}
                      fileName={file?.name}
                      pageCount={data.num_pages}
                      transactionCount={data.summary?.transactionCount}
                      className="mb-3"
                      onUpgradeClick={() => setShowUpgradePrompt(true)}
                    />
                  )}

                  {/* Consolidated Account Info & Summary */}
                  <UserInfoAndSummary userInfo={data.userInfo} />

                  {/* Export Buttons */}
                  <div className="flex items-center justify-end mb-4 gap-2 flex-wrap">
                    <Button variant="outline" size="sm" onClick={handleCopyToClipboard} disabled={!isApproved} className="h-8 text-xs px-3">
                      <Copy className="h-3.5 w-3.5 mr-1.5" />Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExport('csv')} disabled={!isApproved} className="h-8 text-xs px-3">
                      <Download className="h-3.5 w-3.5 mr-1.5" />CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExport('excel')} disabled={!isApproved} className="h-8 text-xs px-3">
                      <Download className="h-3.5 w-3.5 mr-1.5" />Excel
                    </Button>
                    {/* QBO - Pro Feature */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={isPro ? handleExportQBO : () => setShowUpgradePrompt(true)}
                      disabled={!isApproved}
                      className={`h-8 text-xs px-3 ${isPro ? 'border-green-500/50 text-green-600 hover:bg-green-500/10' : 'border-amber-500/50 text-amber-600 hover:bg-amber-500/10'}`}
                      title={isPro ? "Export to QuickBooks" : "Pro feature - Upgrade to unlock"}
                    >
                      {isPro ? <Download className="h-3.5 w-3.5 mr-1.5" /> : <Lock className="h-3.5 w-3.5 mr-1.5" />}
                      QBO
                      {!isPro && <Crown className="h-3 w-3 ml-1 text-amber-500" />}
                    </Button>
                    {/* Tally - Pro Feature */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={isPro ? handleExportTally : () => setShowUpgradePrompt(true)}
                      disabled={!isApproved}
                      className={`h-8 text-xs px-3 ${isPro ? 'border-purple-500/50 text-purple-600 hover:bg-purple-500/10' : 'border-amber-500/50 text-amber-600 hover:bg-amber-500/10'}`}
                      title={isPro ? "Export to Tally" : "Pro feature - Upgrade to unlock"}
                    >
                      {isPro ? <Download className="h-3.5 w-3.5 mr-1.5" /> : <Lock className="h-3.5 w-3.5 mr-1.5" />}
                      Tally
                      {!isPro && <Crown className="h-3 w-3 ml-1 text-amber-500" />}
                    </Button>
                  </div>

                  {/* Sectioned Transaction Display */}
                  {/* Single Unified Table (Smart Reconciled) */}
                  {data.transactions && data.transactions.length > 0 && (
                    <div className="mb-8">
                      <DynamicTable
                        transactions={data.transactions}
                        currency={data.userInfo.currency}
                        columnNames={data.column_names}
                        title="Statement Activity (Reconciled)"
                      />
                    </div>
                  )}

                  {/* detailed Sections (Collapsible) */}
                  {data.sections && data.sections.length > 0 && (
                    // Only show sections if we have more than one, or if the single section differs from the main table
                    !(data.sections.length === 1 && data.transactions && data.sections[0].transactions.length === data.transactions.length) && (
                      <div className="space-y-4 border-t border-[hsl(var(--border))] pt-6 mt-4">
                        <details className="group" open>
                          <summary className="flex items-center gap-2 cursor-pointer select-none text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors w-full">
                            <div className="flex items-center gap-2 flex-1">
                              <FileText className="h-4 w-4" />
                              <h4 className="text-sm font-semibold uppercase tracking-wider">Review Data by Source Section</h4>
                            </div>
                            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                          </summary>

                          <div className="space-y-8 mt-6 pl-2 border-l-2 border-[hsl(var(--muted))] animate-in fade-in slide-in-from-top-2 duration-200">
                            {data.sections.map((section, idx) => (
                              <div key={idx} className="space-y-2">
                                <DynamicTable
                                  transactions={section.transactions}
                                  currency={data.userInfo.currency}
                                  columnNames={data.column_names}
                                  title={section.name}
                                />
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>
                    )
                  )}

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

            {/* Upgrade Prompt for Pro Features */}
            {showUpgradePrompt && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px] animate-fade-in rounded-br-2xl">
                <div className="w-full max-w-sm bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-2xl p-6 animate-scale-in mx-4">
                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowUpgradePrompt(false)}
                      className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-center mt-2">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
                      <Crown className="h-6 w-6 text-amber-500" />
                    </div>
                    <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-2">
                      Pro Feature
                    </h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                      QuickBooks (.qbo) and Tally (.xml) exports are available on <strong>Pro</strong> and <strong>Enterprise</strong> plans.
                    </p>
                    <ul className="text-xs text-left text-[hsl(var(--muted-foreground))] mb-6 space-y-1.5">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> QuickBooks & Tally exports</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Higher page limits (250+/month)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Priority processing</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Detailed validation reports</li>
                    </ul>
                    <div className="space-y-3">
                      <Button
                        className="w-full gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg"
                        onClick={() => window.open('/dashboard', '_blank')}
                      >
                        <Crown className="h-4 w-4" /> Upgrade to Pro
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setShowUpgradePrompt(false)}
                        className="w-full text-sm"
                      >
                        Maybe Later
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