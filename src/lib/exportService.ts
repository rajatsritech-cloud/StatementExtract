import { TransactionData, ExtractedData } from './pdfProcessor';
import * as XLSX from 'xlsx';

export class ExportService {
  static exportToCSV(data: ExtractedData, filename: string = 'bank-statement.csv'): void {
    let csvContent = "";

    const processTransactionsToCSV = (transactions: TransactionData[]) => {
      // Determine columns based on data
      const colNames = data.column_names || {};
      const hasMoneyInOut = transactions.some(t => t.moneyIn !== undefined || t.moneyOut !== undefined);
      const hasNormalizedPayee = transactions.some(t => t.normalized_payee !== undefined);



      const dateHeader = colNames.date || 'Date';
      const descHeader = colNames.desc || colNames.description || 'Description';
      const creditHeader = colNames.credit || 'Money In';
      const debitHeader = colNames.debit || 'Money Out';
      const balanceHeader = colNames.balance || 'Balance';

      let headers = [dateHeader, descHeader];

      // Add Clean Payee column if available
      if (hasNormalizedPayee) {
        headers.push('Clean Payee');
      }

      if (hasMoneyInOut) {
        headers.push(creditHeader, debitHeader);
      } else {
        headers.push('Amount', 'Type');
      }
      headers.push(balanceHeader);



      const rows = transactions.map(t => {
        const row = [t.date, t.description];

        // Add normalized payee
        if (hasNormalizedPayee) {
          row.push(t.normalized_payee || t.description);
        }

        if (hasMoneyInOut) {
          row.push(
            t.moneyIn !== undefined && t.moneyIn !== 0 ? t.moneyIn.toString() : "",
            t.moneyOut !== undefined && t.moneyOut !== 0 ? t.moneyOut.toString() : ""
          );
        } else {
          row.push(t.amount.toString(), t.type);
        }
        row.push(t.balance.toString());



        return row.map(cell => `"${cell || ""}"`).join(','); // Handle potential nulls
      });

      return [headers.join(','), ...rows].join('\n');
    };

    if (data.sections && data.sections.length > 0) {
      // Multi-section: Append with headers
      const sectionsContent = data.sections.map(section => {
        const tableCsv = processTransactionsToCSV(section.transactions);
        return `"${section.name}"\n${tableCsv}`;
      });
      csvContent = sectionsContent.join('\n\n');
    } else {
      csvContent = processTransactionsToCSV(data.transactions);
    }

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static exportToExcel(data: ExtractedData, filename: string = 'bank-statement.xlsx'): void {
    const workbook = XLSX.utils.book_new();

    const processTransactionsToSheet = (transactions: TransactionData[], includeCategory: boolean = false) => {
      const colNames = data.column_names || {};
      const hasMoneyInOut = transactions.some(t => t.moneyIn !== undefined || t.moneyOut !== undefined);
      const hasNormalizedPayee = transactions.some(t => t.normalized_payee !== undefined);



      const dateHeader = colNames.date || 'Date';
      const descHeader = colNames.desc || colNames.description || 'Description';
      const creditHeader = colNames.credit || 'Deposits';
      const debitHeader = colNames.debit || 'Withdrawals';
      const balanceHeader = colNames.balance || 'Balance';

      return transactions.map(t => {
        const row: any = {};
        row[dateHeader] = t.date;
        row[descHeader] = t.description;

        // Add normalized payee (clean merchant name) if available
        if (hasNormalizedPayee) {
          row['Clean Payee'] = t.normalized_payee || t.description;
        }

        if (includeCategory && (t as any).category) {
          row['Category'] = (t as any).category;
        }

        if (hasMoneyInOut) {
          row[creditHeader] = t.moneyIn || "";
          row[debitHeader] = t.moneyOut || "";
        } else {
          row['Amount'] = t.amount;
          row['Type'] = t.type;
        }
        row[balanceHeader] = t.balance;



        return row;
      });
    };

    // Sheet 1: Summary (Account Information)
    const summaryData = [
      { Field: 'Account Name', Value: data.userInfo?.name || 'N/A' },
      { Field: 'Account Number', Value: data.userInfo?.accountNumber || 'N/A' },
      { Field: 'Bank Name', Value: data.userInfo?.bankName || 'N/A' },
      { Field: 'Statement Period', Value: data.userInfo?.statementPeriod || 'N/A' },
      { Field: '', Value: '' },
      { Field: 'Opening Balance', Value: data.userInfo?.accountSummary?.beginningBalance ?? 'N/A' },
      { Field: 'Total Credits', Value: data.summary?.totalCredits ?? 'N/A' },
      { Field: 'Total Debits', Value: data.summary?.totalDebits ?? 'N/A' },
      { Field: 'Closing Balance', Value: data.userInfo?.accountSummary?.endingBalance ?? 'N/A' },
    ];
    const summarySheet = XLSX.utils.json_to_sheet(summaryData);
    summarySheet["!cols"] = [{ wch: 20 }, { wch: 40 }];
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

    // Sheet 2: All Transactions (Consolidated - preferred by accountants for import)
    if (data.sections && data.sections.length > 0) {
      const allTransactions: any[] = [];
      data.sections.forEach(section => {
        section.transactions.forEach(t => {
          allTransactions.push({
            ...t,
            category: section.name
          });
        });
      });

      // Sort by date
      allTransactions.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
      });

      const allRows = processTransactionsToSheet(allTransactions, true);
      const allSheet = XLSX.utils.json_to_sheet(allRows);

      // Auto-width columns
      const maxDescLen = allRows.reduce((w, r) => {
        const descKey = data.column_names?.desc || data.column_names?.description || 'Description';
        return Math.max(w, (r[descKey] as string)?.length || 0);
      }, 10);
      allSheet["!cols"] = [{ wch: 12 }, { wch: Math.min(maxDescLen, 50) }, { wch: 20 }, { wch: 14 }, { wch: 14 }, { wch: 14 }];

      XLSX.utils.book_append_sheet(workbook, allSheet, "All Transactions");

      // Individual category sheets
      data.sections.forEach(section => {
        const rows = processTransactionsToSheet(section.transactions);
        const worksheet = XLSX.utils.json_to_sheet(rows);

        // Auto-width columns
        const max_desc = rows.reduce((w, r) => {
          const descKey = data.column_names?.desc || data.column_names?.description || 'Description';
          return Math.max(w, (r[descKey] as string)?.length || 0);
        }, 10);

        const cols = [{ wch: 12 }, { wch: Math.min(max_desc, 50) }, { wch: 14 }, { wch: 14 }, { wch: 14 }];
        worksheet["!cols"] = cols;

        // Sanitize sheet name (max 31 chars, no special chars)
        let sheetName = section.name.replace(/[\\/?*[\]]/g, "").slice(0, 31) || "Sheet";
        // Check for duplicate sheet names
        let uniqueName = sheetName;
        let counter = 1;
        while (workbook.SheetNames.includes(uniqueName)) {
          uniqueName = `${sheetName.slice(0, 28)} ${counter}`;
          counter++;
        }

        XLSX.utils.book_append_sheet(workbook, worksheet, uniqueName);
      });
    } else {
      // Fallback: Single sheet for transactions
      const rows = processTransactionsToSheet(data.transactions);
      const worksheet = XLSX.utils.json_to_sheet(rows);
      worksheet["!cols"] = [{ wch: 12 }, { wch: 50 }, { wch: 14 }, { wch: 14 }, { wch: 14 }];
      XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    }

    XLSX.writeFile(workbook, filename);
  }

  static copyToClipboard(data: ExtractedData): void {
    try {
      let textContent = "";

      const processTransactionsToText = (transactions: TransactionData[]) => {
        const colNames = data.column_names || {};
        const hasMoneyInOut = transactions.some(t => t.moneyIn !== undefined || t.moneyOut !== undefined);

        const dateHeader = colNames.date || 'Date';
        const descHeader = colNames.desc || colNames.description || 'Description';
        const creditHeader = colNames.credit || 'Money In';
        const debitHeader = colNames.debit || 'Money Out';
        const balanceHeader = colNames.balance || 'Balance';

        let headers = [dateHeader, descHeader];
        if (hasMoneyInOut) { headers.push(creditHeader, debitHeader); }
        else { headers.push('Amount', 'Type'); }
        headers.push(balanceHeader);

        const rows = transactions.map(t => {
          const row = [t.date, t.description];
          if (hasMoneyInOut) {
            row.push(t.moneyIn ? t.moneyIn.toString() : "", t.moneyOut ? t.moneyOut.toString() : "");
          } else {
            row.push(t.amount.toString(), t.type);
          }
          row.push(t.balance.toString());
          return row.join('\t');
        });
        return [headers.join('\t'), ...rows].join('\n');
      };

      if (data.sections && data.sections.length > 0) {
        textContent = data.sections.map(sec => `${sec.name}\n${processTransactionsToText(sec.transactions)}`).join('\n\n');
      } else {
        textContent = processTransactionsToText(data.transactions);
      }

      // Only try clipboard if user has interacted with the page
      if (navigator.clipboard && document.hasFocus()) {
        navigator.clipboard.writeText(textContent)
          .then(() => {
            console.log('Data copied to clipboard successfully');
          })
          .catch((err) => {
            console.log('Clipboard not available - this is normal during automated testing');
          });
      } else {
        console.log('Clipboard not available - document not focused (normal for testing)');
      }
    } catch (error) {
      console.log('Clipboard copy skipped - not available in current context');
    }
  }

  private static fallbackCopyToClipboard(text: string): void {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      if (successful) {
        console.log('Data copied to clipboard successfully (fallback method)');
      } else {
        console.error('Failed to copy to clipboard (fallback method failed)');
      }

      document.body.removeChild(textArea);
    } catch (error) {
      console.error('Fallback clipboard copy failed:', error);
    }
  }

  /**
   * Export to QBO format (QuickBooks Web Connect)
   * This creates an OFX-based XML file that can be imported directly into:
   * - QuickBooks Desktop & Online
   * - Xero
   * - Wave
   * - FreshBooks
   * - Most other accounting software
   */
  static exportToQBO(data: ExtractedData, filename: string = 'bank-statement.qbo'): void {
    const now = new Date();
    const dtserver = this.formatOFXDate(now);

    // Generate a unique transaction ID based on date and amount
    const generateFitID = (tx: TransactionData, index: number): string => {
      const dateStr = tx.date.replace(/[^0-9]/g, '');
      const amount = Math.abs(tx.moneyIn || tx.moneyOut || tx.amount || 0);
      return `${dateStr}${index}${amount.toFixed(2).replace('.', '')}`;
    };

    // Format date for OFX (YYYYMMDDHHMMSS)
    const formatTxDate = (dateStr: string): string => {
      // Try to parse the date
      const parts = dateStr.split(/[-/]/);
      if (parts.length >= 3) {
        // Assume YYYY-MM-DD or similar
        const year = parts[0].length === 4 ? parts[0] : `20${parts[2]}`;
        const month = parts[0].length === 4 ? parts[1] : parts[0];
        const day = parts[0].length === 4 ? parts[2] : parts[1];
        return `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}120000`;
      }
      // Fallback to today
      return this.formatOFXDate(new Date());
    };

    // Collect ALL transactions - from both flat array and sections
    let allTransactions: TransactionData[] = [];

    // Add transactions from flat array
    if (data.transactions && data.transactions.length > 0) {
      allTransactions = [...data.transactions];
    }

    // Add transactions from sections (if any)
    if (data.sections && data.sections.length > 0) {
      for (const section of data.sections) {
        if (section.transactions && section.transactions.length > 0) {
          allTransactions = [...allTransactions, ...section.transactions];
        }
      }
    }

    // Remove duplicates (by date + description + amount)
    const seen = new Set<string>();
    allTransactions = allTransactions.filter(tx => {
      const key = `${tx.date}|${tx.description}|${tx.moneyIn || 0}|${tx.moneyOut || 0}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const transactionXML = allTransactions.map((tx, index) => {
      const amount = tx.moneyIn && tx.moneyIn > 0
        ? tx.moneyIn
        : tx.moneyOut && tx.moneyOut > 0
          ? -tx.moneyOut
          : (tx.type === 'credit' ? tx.amount : -tx.amount);

      const trnType = amount >= 0 ? 'CREDIT' : 'DEBIT';
      const name = tx.normalized_payee || tx.description;
      // Truncate name to 32 chars (OFX limit)
      const truncatedName = name.substring(0, 32);

      return `<STMTTRN>
<TRNTYPE>${trnType}
<DTPOSTED>${formatTxDate(tx.date)}
<TRNAMT>${amount.toFixed(2)}
<FITID>${generateFitID(tx, index)}
<NAME>${this.escapeXML(truncatedName)}
<MEMO>${this.escapeXML(tx.description)}
</STMTTRN>`;
    }).join('\n');

    // Get account info
    const accountNumber = data.userInfo?.accountNumber || '000000000';
    const bankName = data.userInfo?.bankName || 'Bank';
    const routingNumber = '000000000'; // Default routing number

    // Get date range
    const dates = allTransactions
      .map(tx => tx.date)
      .filter(d => d)
      .sort();
    const startDate = dates.length > 0 ? formatTxDate(dates[0]) : dtserver;
    const endDate = dates.length > 0 ? formatTxDate(dates[dates.length - 1]) : dtserver;

    // Build full QBO/OFX document
    const qboContent = `OFXHEADER:100
DATA:OFXSGML
VERSION:102
SECURITY:NONE
ENCODING:USASCII
CHARSET:1252
COMPRESSION:NONE
OLDFILEUID:NONE
NEWFILEUID:NONE

<OFX>
<SIGNONMSGSRSV1>
<SONRS>
<STATUS>
<CODE>0
<SEVERITY>INFO
</STATUS>
<DTSERVER>${dtserver}
<LANGUAGE>ENG
<FI>
<ORG>${this.escapeXML(bankName)}
<FID>10001
</FI>
</SONRS>
</SIGNONMSGSRSV1>
<BANKMSGSRSV1>
<STMTTRNRS>
<TRNUID>0
<STATUS>
<CODE>0
<SEVERITY>INFO
</STATUS>
<STMTRS>
<CURDEF>USD
<BANKACCTFROM>
<BANKID>${routingNumber}
<ACCTID>${accountNumber}
<ACCTTYPE>CHECKING
</BANKACCTFROM>
<BANKTRANLIST>
<DTSTART>${startDate}
<DTEND>${endDate}
${transactionXML}
</BANKTRANLIST>
<LEDGERBAL>
<BALAMT>${(data.userInfo?.accountSummary?.endingBalance || 0).toFixed(2)}
<DTASOF>${endDate}
</LEDGERBAL>
</STMTRS>
</STMTTRNRS>
</BANKMSGSRSV1>
</OFX>`;

    // Create download - use data URI for better browser compatibility
    const blob = new Blob([qboContent], { type: 'application/octet-stream' });
    const reader = new FileReader();
    reader.onload = function () {
      const link = document.createElement('a');
      link.href = reader.result as string;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    };
    reader.readAsDataURL(blob);
  }

  // Helper: Format date to OFX format (YYYYMMDDHHMMSS)
  private static formatOFXDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }

  // Helper: Escape XML special characters
  private static escapeXML(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * Export to Tally XML format
   * Creates vouchers that can be imported into Tally ERP 9 / TallyPrime
   * Import via: Gateway of Tally → Import of Data → Vouchers
   */
  static exportToTally(data: ExtractedData, filename: string = 'bank-statement-tally.xml'): void {
    const bankName = data.userInfo?.bankName || 'Bank Account';
    const accountName = data.userInfo?.name || 'Bank Account';

    // Format date for Tally (YYYYMMDD)
    const formatTallyDate = (dateStr: string): string => {
      const parts = dateStr.split(/[-/]/);
      if (parts.length >= 3) {
        const year = parts[0].length === 4 ? parts[0] : `20${parts[2]}`;
        const month = parts[0].length === 4 ? parts[1] : parts[0];
        const day = parts[0].length === 4 ? parts[2] : parts[1];
        return `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`;
      }
      return new Date().toISOString().slice(0, 10).replace(/-/g, '');
    };

    // Collect ALL transactions - from both flat array and sections
    let allTransactions: TransactionData[] = [];

    if (data.transactions && data.transactions.length > 0) {
      allTransactions = [...data.transactions];
    }

    if (data.sections && data.sections.length > 0) {
      for (const section of data.sections) {
        if (section.transactions && section.transactions.length > 0) {
          allTransactions = [...allTransactions, ...section.transactions];
        }
      }
    }

    // Remove duplicates
    const seen = new Set<string>();
    allTransactions = allTransactions.filter(tx => {
      const key = `${tx.date}|${tx.description}|${tx.moneyIn || 0}|${tx.moneyOut || 0}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const vouchers = allTransactions.map((tx, index) => {
      const isCredit = (tx.moneyIn && tx.moneyIn > 0) || tx.type === 'credit';
      const amount = tx.moneyIn && tx.moneyIn > 0
        ? tx.moneyIn
        : tx.moneyOut && tx.moneyOut > 0
          ? tx.moneyOut
          : Math.abs(tx.amount);

      const voucherType = isCredit ? 'Receipt' : 'Payment';
      const partyName = tx.normalized_payee || tx.description.substring(0, 50);
      const voucherNumber = `BANK${formatTallyDate(tx.date)}${String(index + 1).padStart(4, '0')}`;

      return `    <VOUCHER VCHTYPE="${voucherType}" ACTION="Create">
      <DATE>${formatTallyDate(tx.date)}</DATE>
      <VOUCHERTYPENAME>${voucherType}</VOUCHERTYPENAME>
      <VOUCHERNUMBER>${voucherNumber}</VOUCHERNUMBER>
      <NARRATION>${this.escapeXML(tx.description)}</NARRATION>
      <ALLLEDGERENTRIES.LIST>
        <LEDGERNAME>${this.escapeXML(bankName)}</LEDGERNAME>
        <ISDEEMEDPOSITIVE>${isCredit ? 'Yes' : 'No'}</ISDEEMEDPOSITIVE>
        <AMOUNT>${isCredit ? -amount : amount}</AMOUNT>
      </ALLLEDGERENTRIES.LIST>
      <ALLLEDGERENTRIES.LIST>
        <LEDGERNAME>${this.escapeXML(partyName)}</LEDGERNAME>
        <ISDEEMEDPOSITIVE>${isCredit ? 'No' : 'Yes'}</ISDEEMEDPOSITIVE>
        <AMOUNT>${isCredit ? amount : -amount}</AMOUNT>
      </ALLLEDGERENTRIES.LIST>
    </VOUCHER>`;
    }).join('\n');

    // Build Tally XML document
    const tallyXML = `<?xml version="1.0" encoding="UTF-8"?>
<ENVELOPE>
  <HEADER>
    <TALLYREQUEST>Import Data</TALLYREQUEST>
  </HEADER>
  <BODY>
    <IMPORTDATA>
      <REQUESTDESC>
        <REPORTNAME>Vouchers</REPORTNAME>
      </REQUESTDESC>
      <REQUESTDATA>
        <TALLYMESSAGE xmlns:UDF="TallyUDF">
${vouchers}
        </TALLYMESSAGE>
      </REQUESTDATA>
    </IMPORTDATA>
  </BODY>
</ENVELOPE>`;

    // Create download
    const blob = new Blob([tallyXML], { type: 'application/octet-stream' });
    const reader = new FileReader();
    reader.onload = function () {
      const link = document.createElement('a');
      link.href = reader.result as string;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    };
    reader.readAsDataURL(blob);
  }

  /**
   * Export to Xero CSV format
   * Creates a CSV file that can be imported directly into Xero via Banking > Bank Statements
   * Xero expects: Date, Amount, Payee, Description, Reference
   */
  static exportToXero(data: ExtractedData, filename: string = 'bank-statement-xero.csv'): void {
    // Collect ALL transactions
    let allTransactions: TransactionData[] = [];

    if (data.transactions && data.transactions.length > 0) {
      allTransactions = [...data.transactions];
    }

    if (data.sections && data.sections.length > 0) {
      for (const section of data.sections) {
        if (section.transactions && section.transactions.length > 0) {
          allTransactions = [...allTransactions, ...section.transactions];
        }
      }
    }

    // Remove duplicates
    const seen = new Set<string>();
    allTransactions = allTransactions.filter(tx => {
      const key = `${tx.date}|${tx.description}|${tx.moneyIn || 0}|${tx.moneyOut || 0}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Xero CSV format headers
    const headers = ['Date', 'Amount', 'Payee', 'Description', 'Reference'];

    // Format transactions for Xero
    const rows = allTransactions.map((tx, index) => {
      // Calculate amount (positive for credits, negative for debits)
      const amount = tx.moneyIn && tx.moneyIn > 0
        ? tx.moneyIn
        : tx.moneyOut && tx.moneyOut > 0
          ? -tx.moneyOut
          : (tx.type === 'credit' ? tx.amount : -tx.amount);

      // Payee (use normalized if available)
      const payee = tx.normalized_payee || tx.description.substring(0, 50);

      // Reference (unique ID)
      const reference = `TXN${String(index + 1).padStart(5, '0')}`;

      return [
        tx.date,
        amount.toFixed(2),
        `"${payee.replace(/"/g, '""')}"`, // Escape quotes in payee
        `"${tx.description.replace(/"/g, '""')}"`, // Escape quotes in description
        reference
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');

    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
