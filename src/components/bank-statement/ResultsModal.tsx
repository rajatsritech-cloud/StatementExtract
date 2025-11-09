"use client";

import { useState, useMemo } from "react";
import { X, Download, Copy, Eye, EyeOff, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExportService } from "@/lib/exportService";
import { ExtractedData } from "@/lib/pdfProcessor";
import { PDFViewer } from "@/components/PDFViewer";

interface ResultsModalProps {
  data: ExtractedData;
  file: File | null;
  onClose: () => void;
  onTryAnother: () => void;
  onExport: (format: 'csv' | 'excel') => void;
}

export const ResultsModal = ({ data, file, onClose, onTryAnother, onExport }: ResultsModalProps) => {
  const [showPdf, setShowPdf] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof data.transactions[0]; direction: 'asc' | 'desc' } | null>(null);

  // Sort transactions
  const sortedTransactions = useMemo(() => {
    let sortableTransactions = [...data.transactions];
    if (sortConfig !== null) {
      sortableTransactions.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTransactions;
  }, [data.transactions, sortConfig]);

  const handleSort = (key: keyof typeof data.transactions[0]) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleCopyToClipboard = () => {
    try {
      ExportService.copyToClipboard(data);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-7xl max-h-[90vh] overflow-hidden rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[hsl(var(--border))]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
              <DollarSign className="h-5 w-5 text-[hsl(var(--primary))]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">Extraction Complete!</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                {data.summary.transactionCount} transactions extracted successfully
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onTryAnother}>
              Try Another File
            </Button>
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
                {file && <PDFViewer file={file} className="h-full" />}
              </div>
            </div>
          </div>
          
          {/* Show PDF Toggle Button */}
          {!showPdf && (
            <div className="absolute left-4 top-20 z-10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPdf(true)}
                className="flex items-center gap-2"
              >
                <Eye className="h-3 w-3" />
                Show PDF
              </Button>
            </div>
          )}

          {/* Right Side - Transaction Data */}
          <div className={`${showPdf ? 'w-1/2' : 'w-full'} flex flex-col`}>
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

            <div className="flex-1 overflow-auto">
              {/* User Info */}
              <div className="p-6 border-b border-[hsl(var(--border))]">
                <h4 className="font-medium text-[hsl(var(--foreground))] mb-4">Account Information</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs text-[hsl(var(--muted-foreground))]">Name</label>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{data.userInfo.name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-[hsl(var(--muted-foreground))]">Email</label>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{data.userInfo.email || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-[hsl(var(--muted-foreground))]">Bank</label>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{data.userInfo.bankName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-[hsl(var(--muted-foreground))]">Account</label>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{data.userInfo.accountNumber || 'N/A'}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-[hsl(var(--muted-foreground))]">Statement Period</label>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{data.userInfo.statementPeriod || 'N/A'}</p>
                  </div>
                </div>
                
                {/* Account Summary */}
                {data.userInfo.accountSummary && (
                  <div className="mt-6 pt-6 border-t border-[hsl(var(--border))]">
                    <h4 className="font-medium text-[hsl(var(--foreground))] mb-4">Account Summary</h4>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-xs text-[hsl(var(--muted-foreground))]">Beginning Balance</label>
                        <p className="text-sm font-medium text-[hsl(var(--foreground))]">{formatCurrency(data.userInfo.accountSummary.beginningBalance)}</p>
                      </div>
                      <div>
                        <label className="text-xs text-[hsl(var(--muted-foreground))]">Ending Balance</label>
                        <p className="text-sm font-medium text-[hsl(var(--foreground))]">{formatCurrency(data.userInfo.accountSummary.endingBalance)}</p>
                      </div>
                      <div>
                        <label className="text-xs text-[hsl(var(--muted-foreground))]">Total Deposits</label>
                        <p className="text-sm font-medium text-green-500">{formatCurrency(data.userInfo.accountSummary.totalDeposits)}</p>
                      </div>
                      <div>
                        <label className="text-xs text-[hsl(var(--muted-foreground))]">Total Withdrawals</label>
                        <p className="text-sm font-medium text-red-500">{formatCurrency(data.userInfo.accountSummary.totalWithdrawals)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Summary Cards */}
              <div className="p-6 border-b border-[hsl(var(--border))]">
                <h4 className="font-medium text-[hsl(var(--foreground))] mb-4">Summary</h4>
                <div className="grid gap-4 sm:grid-cols-4">
                  <div className="rounded-lg bg-[hsl(var(--muted))]/30 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">Total Credits</span>
                    </div>
                    <p className="text-lg font-semibold text-green-500">{formatCurrency(data.summary.totalCredits)}</p>
                  </div>
                  <div className="rounded-lg bg-[hsl(var(--muted))]/30 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingDown className="h-4 w-4 text-red-500" />
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">Total Debits</span>
                    </div>
                    <p className="text-lg font-semibold text-red-500">{formatCurrency(Math.abs(data.summary.totalDebits))}</p>
                  </div>
                  <div className="rounded-lg bg-[hsl(var(--muted))]/30 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-[hsl(var(--primary))]" />
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">Net Balance</span>
                    </div>
                    <p className="text-lg font-semibold text-[hsl(var(--foreground))]">{formatCurrency(data.summary.netBalance)}</p>
                  </div>
                  <div className="rounded-lg bg-[hsl(var(--muted))]/30 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-[hsl(var(--accent))]" />
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">Transactions</span>
                    </div>
                    <p className="text-lg font-semibold text-[hsl(var(--foreground))]">{data.summary.transactionCount}</p>
                  </div>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-[hsl(var(--foreground))]">Transactions</h4>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onExport('csv')}>
                      <Download className="h-3 w-3 mr-1" />
                      CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onExport('excel')}>
                      <Download className="h-3 w-3 mr-1" />
                      Excel
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[hsl(var(--border))]">
                        <th className="text-left p-2 font-medium text-[hsl(var(--foreground))] cursor-pointer hover:text-[hsl(var(--primary))]" onClick={() => handleSort('date')}>
                          Date {sortConfig?.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="text-left p-2 font-medium text-[hsl(var(--foreground))] cursor-pointer hover:text-[hsl(var(--primary))]" onClick={() => handleSort('description')}>
                          Description {sortConfig?.key === 'description' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="text-right p-2 font-medium text-[hsl(var(--foreground))] cursor-pointer hover:text-[hsl(var(--primary))]" onClick={() => handleSort('amount')}>
                          Amount {sortConfig?.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="text-right p-2 font-medium text-[hsl(var(--foreground))] cursor-pointer hover:text-[hsl(var(--primary))]" onClick={() => handleSort('balance')}>
                          Balance {sortConfig?.key === 'balance' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="text-center p-2 font-medium text-[hsl(var(--foreground))] cursor-pointer hover:text-[hsl(var(--primary))]" onClick={() => handleSort('type')}>
                          Type {sortConfig?.key === 'type' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedTransactions.map((transaction, index) => (
                        <tr key={index} className="border-b border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/30 transition-colors">
                          <td className="p-2 text-[hsl(var(--foreground))]">{formatDate(transaction.date)}</td>
                          <td className="p-2 text-[hsl(var(--foreground))]">{transaction.description}</td>
                          <td className={`p-2 text-right font-medium ${transaction.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {formatCurrency(transaction.amount)}
                          </td>
                          <td className="p-2 text-right text-[hsl(var(--foreground))]">{formatCurrency(transaction.balance)}</td>
                          <td className="p-2 text-center">
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              transaction.type === 'credit' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {transaction.type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
