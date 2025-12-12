"use client";

export interface TransactionData {
  date: string;
  description: string;
  amount: number;
  balance: number;
  type: 'credit' | 'debit';
  moneyIn?: number;
  moneyOut?: number;
  source_page?: number;  // Page number in PDF for audit trail
  normalized_payee?: string;  // Cleaned up payee name (e.g., "Amazon Marketplace")
}

// NEW: Section for multi-table display
export interface TransactionSection {
  name: string;  // "TRANSACTIONS", "CHECKS", etc.
  transactions: TransactionData[];
  summary?: {
    transaction_count: number;
    total_credits: number;
    total_debits: number;
  };
}

export interface ExtractedData {
  userInfo: {
    name?: string;
    email?: string;
    accountNumber?: string;
    bankName?: string;
    statementPeriod?: string;
    currency?: string; // Added currency field
    accountSummary?: {
      beginningBalance: number;
      endingBalance: number;
      totalDeposits: number;
      totalWithdrawals: number;
    };
  };
  transactions: TransactionData[];
  sections?: TransactionSection[];  // NEW: Multiple tables/sections
  summary: {
    totalCredits: number;
    totalDebits: number;
    netBalance: number;
    transactionCount: number;
  };
  column_names?: { [key: string]: string }; // Added column_names field
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
  processing_steps?: Array<{
    id: string;
    name: string;
    status: 'pending' | 'running' | 'complete' | 'skipped' | 'warning';
    details?: string;
    sub_steps?: string[];
  }>;
  processing_stats?: {
    payees_normalized: number;
    total_steps: number;
    steps_passed: number;
    extraction_method: string;
  };
  num_pages?: number;
  llm_used?: boolean;
}

export class PDFProcessor {
  static async processPDF(file: File, isSignedIn: boolean = false, token?: string | null): Promise<ExtractedData> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('confidence_threshold', '0.3');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 300000);

      // Use environment variable for API URL
      // If NEXT_PUBLIC_API_URL is undefined, fallback to localhost for dev
      // If it is explicitly empty string (for proxy), use empty string
      // Logic:
      // 1. If env var is set, use it.
      // 2. If env var is NOT set:
      //    - If dev, use localhost.
      //    - If prod (or unknown), use empty string (relative).

      let apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (apiUrl === undefined) {
        apiUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : '';
      }

      // Sanitize: Remove accidental quotes (e.g. if user set "" in env)
      apiUrl = apiUrl.replace(/['"]+/g, '').trim();

      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${apiUrl}/api/v1/pdf-extract/fast`, {
        method: 'POST',
        headers: headers,
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Backend API error: ${response.statusText}`);
      }

      const result = await response.json();

      // Use structured data from backend if available (New "Hybrid AI" approach)
      if (result.data) {
        console.log("Using structured data from backend:", result.data);
        const backendData = result.data;

        // Map backend structure to frontend ExtractedData interface
        const userInfoRaw = backendData.userInfo || backendData.user_info || {};
        const summaryRaw = backendData.summary || {};

        // Map transactions
        const mapTransaction = (t: any) => ({
          date: t.date,
          description: t.description,
          amount: t.money_in > 0 ? t.money_in : t.money_out,
          balance: t.balance,
          type: t.money_in > 0 ? 'credit' as const : 'debit' as const,
          moneyIn: t.money_in,
          moneyOut: t.money_out,
          source_page: t.source_page,  // Add source page for audit trail
          normalized_payee: t.normalized_payee  // Add normalized payee name
        });

        // Map sections if available (NEW: multi-table support)
        const sections = backendData.sections?.map((s: any) => ({
          name: s.name,
          transactions: s.transactions.map(mapTransaction),
          summary: s.summary
        })) || undefined;

        return {
          userInfo: {
            name: userInfoRaw.name,
            email: userInfoRaw.email,
            accountNumber: userInfoRaw.account_number || userInfoRaw.accountNumber,
            bankName: userInfoRaw.bank_name || userInfoRaw.bankName || "Bank Statement",
            statementPeriod: userInfoRaw.statement_period || userInfoRaw.statementPeriod,
            currency: backendData.currency || userInfoRaw.currency || '$',
            accountSummary: {
              beginningBalance: summaryRaw.opening_balance || summaryRaw.beginningBalance || 0,
              endingBalance: summaryRaw.closing_balance || summaryRaw.endingBalance || 0,
              totalDeposits: summaryRaw.total_money_in || summaryRaw.totalDeposits || 0,
              totalWithdrawals: summaryRaw.total_money_out || summaryRaw.totalWithdrawals || 0,
            }
          },
          transactions: backendData.transactions.map(mapTransaction),
          sections: sections,  // NEW: Include sections for multi-table UI
          summary: {
            totalCredits: summaryRaw.total_money_in || 0,
            totalDebits: summaryRaw.total_money_out || 0,
            netBalance: (summaryRaw.total_money_in || 0) - (summaryRaw.total_money_out || 0),
            transactionCount: backendData.transactions?.length || 0
          },
          column_names: backendData.column_names, // Pass column names
          markdown: result.markdown,
          fraud_analysis: result.fraud_analysis,
          reconciliation: result.reconciliation,
          human_review: result.human_review,
          processing_steps: result.processing_steps,  // Processing pipeline steps
          processing_stats: backendData.processing_stats,  // Processing statistics
          num_pages: result.num_pages,
          llm_used: result.llm_used
        };
      }

      // Fallback to frontend parsing (Legacy)
      const transactions = this.parseMarkdownToTransactions(result.markdown);
      const summary = this.calculateSummary(transactions);
      const userInfo = this.parseUserInfo(result.markdown);

      return {
        userInfo: userInfo,
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

  static async processImage(file: File, isSignedIn: boolean = false, token?: string | null): Promise<ExtractedData> {
    return this.processPDF(file, isSignedIn, token);
  }

  static parseTableStructure(markdown: string): { headers: string[], rows: string[][] } {
    if (!markdown) return { headers: [], rows: [] };

    const lines = markdown.split('\n');
    let headers: string[] = [];
    const rows: string[][] = [];
    let isTable = false;

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Check for header row
      if (trimmedLine.startsWith('|') && !isTable) {
        if (trimmedLine.includes('---')) continue; // Skip separator
        const cols = trimmedLine.split('|').map(c => c.trim()).filter(c => c);
        // Simple heuristic: if it looks like a header (has date/desc/amount keywords), treat as start
        if (cols.some(c => /date|description|money|amount|balance|credit|debit/i.test(c))) {
          headers = cols;
          isTable = true;
          continue;
        }
      }

      // Process table rows
      if (isTable && trimmedLine.startsWith('|')) {
        if (trimmedLine.includes('---')) continue;
        const cols = trimmedLine.split('|').map(c => c.trim()).filter(c => c !== '');

        if (cols.length > 0) {
          rows.push(cols);
        }
      }
    }

    return { headers, rows };
  }

  private static parseUserInfo(markdown: string): ExtractedData['userInfo'] {
    const userInfo: ExtractedData['userInfo'] = {
      accountSummary: {
        beginningBalance: 0,
        endingBalance: 0,
        totalDeposits: 0,
        totalWithdrawals: 0
      }
    };

    if (!markdown) return userInfo;

    // Helper to extract value using regex (robust against markdown formatting)
    const extract = (regex: RegExp): string | undefined => {
      const match = markdown.match(regex);
      return match ? match[1].replace(/\*\*/g, '').trim() : undefined;
    };

    // Helper to extract currency value
    const extractCurrency = (regex: RegExp): number => {
      const match = markdown.match(regex);
      if (match) {
        let valStr = match[1].replace(/,/g, '');
        // Handle trailing negative sign (e.g., "100.00-")
        if (valStr.endsWith('-')) {
          valStr = '-' + valStr.slice(0, -1);
        }

        // Handle comma as decimal separator logic if needed, but for now standardizing on dot
        // If the document uses commas for decimals (e.g. 40.000,00), simple replace might fail.
        // But the user's example showed "40,000,00" which is ambiguous (could be 40k or 40).
        // Assuming standard US/UK format for now as per previous success, but being robust to trailing chars.

        return parseFloat(valStr.replace(/[^0-9.-]/g, '')) || 0;
      }
      return 0;
    };

    // Attempt to detect currency symbol
    const currencyMatch = markdown.match(/([£$€¥])/);
    if (currencyMatch) {
      userInfo.currency = currencyMatch[1];
    } else {
      userInfo.currency = '$'; // Default
    }

    // Extract Account Details
    userInfo.name = extract(/(?:Account Name|Name)[:\s*]+(?:\*\*)?(.*?)(?:\*\*)?$/m);
    userInfo.accountNumber = extract(/(?:Account Number)[:\s*]+(?:\*\*)?(.*?)(?:\*\*)?$/m);
    userInfo.bankName = extract(/(?:Bank Name)[:\s*]+(?:\*\*)?(.*?)(?:\*\*)?$/m) || "Bank Statement";
    userInfo.statementPeriod = extract(/(?:Statement Period|Period|Statement Date)[:\s*]+(?:\*\*)?(.*?)(?:\*\*)?$/m);

    // Extract Email if present
    userInfo.email = extract(/(?:Email)[:\s*]+(?:\*\*)?(.*?)(?:\*\*)?$/m);

    // Extract Account Summary
    if (userInfo.accountSummary) {
      // Regex looks for label, optional bold, optional currency symbol, and the number

      userInfo.accountSummary.beginningBalance = extractCurrency(/(?:Opening Balance|Beginning Balance|Balance at [0-9]+ [A-Za-z]+)[^0-9]*[£$€]?([0-9,.]+)/i);
      userInfo.accountSummary.endingBalance = extractCurrency(/(?:Closing Balance|Ending Balance|Balance at [0-9]+ [A-Za-z]+)[^0-9]*[£$€]?([0-9,.]+)/i);

      // Try to find Total Credits/Deposits/Money In
      userInfo.accountSummary.totalDeposits = extractCurrency(/(?:Total )?(?:Deposits|Credits|Money In)[^0-9]*[£$€]?([0-9,.]+)/i);

      // Try to find Total Debits/Withdrawals/Money Out
      userInfo.accountSummary.totalWithdrawals = extractCurrency(/(?:Total )?(?:Debits|Withdrawals|Money Out)[^0-9]*[£$€]?([0-9,.]+)/i);

      // Fallback: If Total Debits is 0, try summing "Card Withdrawals" and "Other Withdrawals"
      if (userInfo.accountSummary.totalWithdrawals === 0) {
        const cardWithdrawals = extractCurrency(/Card Withdrawals[^0-9]*[£$€]?([0-9,.]+)/i);
        const otherWithdrawals = extractCurrency(/Other Withdrawals[^0-9]*[£$€]?([0-9,.]+)/i);
        if (cardWithdrawals > 0 || otherWithdrawals > 0) {
          userInfo.accountSummary.totalWithdrawals = cardWithdrawals + otherWithdrawals;
        }
      }
    }

    return userInfo;
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
