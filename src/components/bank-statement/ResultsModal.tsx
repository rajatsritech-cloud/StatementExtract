"use client";

import { useState, useMemo } from "react";
import { X, Download, Copy, Eye, EyeOff, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExportService } from "@/lib/exportService";
import { ExtractedData } from "@/lib/pdfProcessor";
import { useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from "react-hot-toast";

interface ResultsModalProps {
  data: ExtractedData;
  file: File | null;
  onClose: () => void;
  onTryAnother: () => void;
  onExport: (format: 'csv' | 'excel') => void;
}

export const ResultsModal = ({ data, file, onClose, onTryAnother, onExport }: ResultsModalProps) => {
  const [showPdf, setShowPdf] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof data.transactions[0]; direction: 'asc' | 'desc' } | null>(null);
  const [isApproved, setIsApproved] = useState(!data.human_review?.requires_human_review);

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

  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setFileUrl(null);
  }, [file]);

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
        <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--border))]">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
              <DollarSign className="h-4 w-4 text-[hsl(var(--primary))]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">Extraction Complete!</h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                {data.summary.transactionCount > 0
                  ? `${data.summary.transactionCount} transactions extracted`
                  : 'Data extracted successfully'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onTryAnother} className="h-8 text-xs">
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
                {fileUrl && (
                  <iframe
                    src={fileUrl}
                    className="h-full w-full border-none"
                    title="PDF Viewer"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Show PDF Toggle Button */}


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

            <div className="flex-1 overflow-auto p-4">
              {/* Summary Cards - Show if we have transaction data */}
              {data.summary.transactionCount > 0 && (
                <div className="mb-4 pb-4 border-b border-[hsl(var(--border))]">
                  <h4 className="text-sm font-medium text-[hsl(var(--foreground))] mb-3">Summary</h4>
                  <div className="grid gap-3 sm:grid-cols-4">
                    <div className="rounded-lg bg-[hsl(var(--muted))]/30 p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">Total Credits</span>
                      </div>
                      <p className="text-base font-semibold text-green-500">{formatCurrency(data.summary.totalCredits)}</p>
                    </div>
                    <div className="rounded-lg bg-[hsl(var(--muted))]/30 p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingDown className="h-3 w-3 text-red-500" />
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">Total Debits</span>
                      </div>
                      <p className="text-base font-semibold text-red-500">{formatCurrency(Math.abs(data.summary.totalDebits))}</p>
                    </div>
                    <div className="rounded-lg bg-[hsl(var(--muted))]/30 p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="h-3 w-3 text-[hsl(var(--primary))]" />
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">Net Balance</span>
                      </div>
                      <p className="text-base font-semibold text-[hsl(var(--foreground))]">{formatCurrency(data.summary.netBalance)}</p>
                    </div>
                    <div className="rounded-lg bg-[hsl(var(--muted))]/30 p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="h-3 w-3 text-[hsl(var(--accent))]" />
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">Transactions</span>
                      </div>
                      <p className="text-base font-semibold text-[hsl(var(--foreground))]">{data.summary.transactionCount}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Export Buttons */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-[hsl(var(--foreground))]">
                  {data.markdown ? 'Extracted Data' : 'Transactions'}
                </h4>
                <div className="flex items-center gap-2">
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
                    onClick={() => onExport('csv')}
                    disabled={!isApproved}
                    title={!isApproved ? "Please approve the review first" : "Export as CSV"}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    {!isApproved ? '🔒 CSV' : 'CSV'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onExport('excel')}
                    disabled={!isApproved}
                    title={!isApproved ? "Please approve the review first" : "Export as Excel"}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    {!isApproved ? '🔒 Excel' : 'Excel'}
                  </Button>
                </div>
              </div>

              {data.markdown ? (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-4 rounded-lg border border-[hsl(var(--border))]">
                          <table className="w-full text-sm text-left" {...props} />
                        </div>
                      ),
                      thead: ({ node, ...props }) => (
                        <thead className="bg-[hsl(var(--muted))]/50 text-[hsl(var(--foreground))]" {...props} />
                      ),
                      th: ({ node, ...props }) => (
                        <th className="px-4 py-3 font-semibold border-b border-[hsl(var(--border))]" {...props} />
                      ),
                      td: ({ node, ...props }) => (
                        <td className="px-4 py-3 border-b border-[hsl(var(--border))] last:border-0" {...props} />
                      ),
                      tr: ({ node, ...props }) => (
                        <tr className="hover:bg-[hsl(var(--muted))]/30 transition-colors" {...props} />
                      ),
                      h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4 text-[hsl(var(--foreground))]" {...props} />,
                      h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-3 mt-6 text-[hsl(var(--foreground))]" {...props} />,
                      h3: ({ node, ...props }) => <h3 className="text-lg font-bold mb-2 mt-4 text-[hsl(var(--foreground))]" {...props} />,
                      p: ({ node, ...props }) => <p className="mb-2 text-[hsl(var(--foreground))]" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 text-[hsl(var(--foreground))]" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4 text-[hsl(var(--foreground))]" {...props} />,
                    }}
                  >
                    {data.markdown}
                  </ReactMarkdown>
                </div>
              ) : (
                <>
                  {/* User Info */}
                  <div className="pb-6 border-b border-[hsl(var(--border))]">
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

                  {/* Transactions Table */}
                  <div className="pt-6">
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
                                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${transaction.type === 'credit'
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
                </>
              )}
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};
