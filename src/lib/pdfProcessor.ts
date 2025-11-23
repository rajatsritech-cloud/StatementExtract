"use client";

export interface TransactionData {
  date: string;
  description: string;
  amount: number;
  balance: number;
  type: 'credit' | 'debit';
}

export interface ExtractedData {
  userInfo: {
    name?: string;
    email?: string;
    accountNumber?: string;
    bankName?: string;
    statementPeriod?: string;
    accountSummary?: {
      beginningBalance: number;
      endingBalance: number;
      totalDeposits: number;
      totalWithdrawals: number;
    };
  };
  transactions: TransactionData[];
  summary: {
    totalCredits: number;
    totalDebits: number;
    netBalance: number;
    transactionCount: number;
  };
  markdown?: string;
  fraud_analysis?: {
    status: string;
    alerts: Array<{
      type: string;
      severity: string;
      message: string;
      transaction_index?: number;
    }>;
    summary: {
      total_alerts: number;
      high_risk: number;
      medium_risk: number;
      low_risk: number;
    };
  };
  reconciliation?: {
    status: string;
    reconciled: boolean;
    checks: {
      passed: number;
      total: number;
      percentage: number;
    };
    issues?: Array<{
      check: string;
      severity: string;
      message: string;
    }>;
  };
  human_review?: {
    requires_human_review: boolean;
    risk_level: 'low' | 'medium' | 'high';
    review_reasons: string[];
    auto_approved: boolean;
  };
}

export class PDFProcessor {
  static async processPDF(file: File, isSignedIn: boolean = false): Promise<ExtractedData> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('confidence_threshold', '0.3');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000);

      const response = await fetch('http://127.0.0.1:8000/api/v1/pdf-extract/fast', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Backend API error: ${response.statusText}`);
      }

      const result = await response.json();
      const transactions = this.parseMarkdownToTransactions(result.markdown);
      const summary = this.calculateSummary(transactions);

      return {
        userInfo: {},
        transactions: transactions,
        summary: summary,
        markdown: result.markdown,
        fraud_analysis: result.fraud_analysis,
        reconciliation: result.reconciliation,
        human_review: result.human_review
      };

    } catch (error) {
      console.error('PDF processing error:', error);
      throw error;
    }
  }

  static async processImage(file: File, isSignedIn: boolean = false): Promise<ExtractedData> {
    return this.processPDF(file, isSignedIn);
  }

  private static parseMarkdownToTransactions(markdown: string): TransactionData[] {
    if (!markdown) return [];

    const transactions: TransactionData[] = [];
    const lines = markdown.split('\n');
    let isTable = false;
    let headers: string[] = [];

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('|') && !isTable) {
        if (trimmedLine.includes('---')) continue;
        const cols = trimmedLine.split('|').map(c => c.trim()).filter(c => c);
        if (cols.some(c => /date|description|money|amount|balance/i.test(c))) {
          headers = cols.map(c => c.toLowerCase());
          isTable = true;
          continue;
        }
      }

      if (isTable && trimmedLine.startsWith('|')) {
        if (trimmedLine.includes('---')) continue;
        const cols = trimmedLine.split('|').map(c => c.trim()).filter(c => c !== '');

        if (cols.length >= 3) {
          const transaction: any = {};
          let moneyIn = 0;
          let moneyOut = 0;

          headers.forEach((header, index) => {
            if (index >= cols.length) return;
            const value = cols[index];

            if (header.includes('date')) {
              transaction.date = value;
            } else if (header.includes('description')) {
              transaction.description = value;
            } else if (header.includes('money in') || header.includes('credit')) {
              if (value !== '-') {
                const amount = parseFloat(value.replace(/[^0-9.-]/g, ''));
                if (!isNaN(amount)) moneyIn = Math.abs(amount);
              }
            } else if (header.includes('money out') || header.includes('debit')) {
              if (value !== '-') {
                const amount = parseFloat(value.replace(/[^0-9.-]/g, ''));
                if (!isNaN(amount)) moneyOut = Math.abs(amount);
              }
            } else if (header.includes('balance')) {
              transaction.balance = parseFloat(value.replace(/[^0-9.-]/g, '')) || 0;
            }
          });

          if (moneyIn > 0) {
            transaction.amount = moneyIn;
            transaction.type = 'credit';
          } else if (moneyOut > 0) {
            transaction.amount = moneyOut;
            transaction.type = 'debit';
          }

          if (transaction.date && transaction.description && transaction.amount) {
            transactions.push(transaction as TransactionData);
          }
        }
      }
    }

    return transactions;
  }

  private static calculateSummary(transactions: TransactionData[]) {
    let totalCredits = 0;
    let totalDebits = 0;

    transactions.forEach(t => {
      if (t.type === 'credit') totalCredits += t.amount;
      else totalDebits += t.amount;
    });

    return {
      totalCredits,
      totalDebits,
      netBalance: totalCredits - totalDebits,
      transactionCount: transactions.length
    };
  }
}
