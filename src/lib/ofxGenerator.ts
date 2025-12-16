"use client";

/**
 * OFX/QBO/QFX File Generator
 * Converts transaction data to Open Financial Exchange format
 * for import into QuickBooks, Xero, Sage, Wave, etc.
 */

export interface OFXTransaction {
    date: string;          // Date in YYYY-MM-DD or MM/DD/YYYY format
    name?: string;         // Payee name
    memo?: string;         // Memo/Description
    description?: string;  // Additional Description
    amount: number;        // Positive for credits, negative for debits
    fitid?: string;        // Unique transaction ID (auto-generated if not provided)
    checkNum?: string;     // Check number (optional)
    type?: 'CREDIT' | 'DEBIT' | 'CHECK' | 'ATM' | 'POS' | 'XFER' | 'OTHER';
}

export interface OFXConfig {
    bankId?: string;        // Bank routing number (default: 000000000)
    accountId?: string;     // Account number
    accountType?: 'CHECKING' | 'SAVINGS' | 'CREDITCARD' | 'CREDITLINE' | 'MONEYMRKT';
    bankName?: string;      // Bank name for header
    currency?: string;      // Currency code (default: USD)
    includeBalance?: boolean;
    closingBalance?: number;
}

export type ExportFormat = 'ofx' | 'qbo' | 'qfx' | 'mt940';

// Format date to OFX standard (YYYYMMDDHHMMSS)
function formatOFXDate(dateStr: string): string {
    let date: Date;

    // Try parsing various date formats
    if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
        // YYYY-MM-DD format
        date = new Date(dateStr);
    } else if (/^\d{1,2}\/\d{1,2}\/\d{2,4}/.test(dateStr)) {
        // MM/DD/YYYY or M/D/YY format
        const parts = dateStr.split('/');
        const year = parts[2].length === 2 ? `20${parts[2]}` : parts[2];
        date = new Date(`${year}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`);
    } else if (/^\d{1,2}-\d{1,2}-\d{2,4}/.test(dateStr)) {
        // DD-MM-YYYY format (common in Europe/India)
        const parts = dateStr.split('-');
        const year = parts[2].length === 2 ? `20${parts[2]}` : parts[2];
        date = new Date(`${year}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`);
    } else {
        // Try native parsing
        date = new Date(dateStr);
    }

    if (isNaN(date.getTime())) {
        // Fallback to today
        date = new Date();
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}${month}${day}120000`;
}

// Generate unique transaction ID
function generateFitId(tx: OFXTransaction, index: number): string {
    if (tx.fitid) return tx.fitid;

    const dateStr = tx.date.replace(/[^0-9]/g, '').slice(0, 8);
    const amount = Math.abs(tx.amount).toFixed(2).replace('.', '');
    return `${dateStr}${index}${amount}`;
}

// Escape XML special characters
function escapeXML(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// Determine transaction type from amount
function getTrnType(tx: OFXTransaction): string {
    if (tx.type) return tx.type;
    if (tx.checkNum) return 'CHECK';
    return tx.amount >= 0 ? 'CREDIT' : 'DEBIT';
}

/**
 * Generate OFX file content
 */
export function generateOFX(
    transactions: OFXTransaction[],
    config: OFXConfig = {},
    format: ExportFormat = 'ofx'
): string {
    const now = new Date();
    const dtserver = formatOFXDate(now.toISOString().split('T')[0]);

    const bankId = config.bankId || '000000000';
    const accountId = config.accountId || '000000000';
    const accountType = config.accountType || 'CHECKING';
    const bankName = config.bankName || 'Bank';
    const currency = config.currency || 'USD';

    // Get date range from transactions
    const dates = transactions.map(t => t.date).filter(Boolean).sort();
    const startDate = dates.length > 0 ? formatOFXDate(dates[0]) : dtserver;
    const endDate = dates.length > 0 ? formatOFXDate(dates[dates.length - 1]) : dtserver;

    // Build transaction XML
    const transactionXML = transactions.map((tx, index) => {
        const trnType = getTrnType(tx);
        const amount = tx.amount.toFixed(2);

        // Use provided name or fallback to description
        const nameVal = tx.name || tx.description || "";
        const name = nameVal.substring(0, 32); // OFX name limit

        // Use provided memo or default to description
        const memo = tx.memo || tx.description;

        const fitid = generateFitId(tx, index);
        const checkNumTag = tx.checkNum ? `\n<CHECKNUM>${tx.checkNum}` : '';

        return `<STMTTRN>
<TRNTYPE>${trnType}
<DTPOSTED>${formatOFXDate(tx.date)}
<TRNAMT>${amount}
<FITID>${fitid}${checkNumTag}
<NAME>${escapeXML(name)}
<MEMO>${escapeXML(memo)}
</STMTTRN>`;
    }).join('\n');

    // Balance section (optional)
    let balanceSection = '';
    if (config.includeBalance && config.closingBalance !== undefined) {
        balanceSection = `
<LEDGERBAL>
<BALAMT>${config.closingBalance.toFixed(2)}
<DTASOF>${endDate}
</LEDGERBAL>`;
    }

    // For QBO format, add INTU.BID for QuickBooks Desktop compatibility
    const intuBid = format === 'qbo' ? `
<INTU.BID>10001` : '';

    // Build full OFX document
    const ofxContent = `OFXHEADER:100
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
<ORG>${escapeXML(bankName)}
<FID>10001
</FI>${intuBid}
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
<CURDEF>${currency}
<BANKACCTFROM>
<BANKID>${bankId}
<ACCTID>${accountId}
<ACCTTYPE>${accountType}
</BANKACCTFROM>
<BANKTRANLIST>
<DTSTART>${startDate}
<DTEND>${endDate}
${transactionXML}
</BANKTRANLIST>${balanceSection}
</STMTRS>
</STMTTRNRS>
</BANKMSGSRSV1>
</OFX>`;

    return ofxContent;
}

/**
 * Generate MT940 file content (SWIFT)
 */
export function generateMT940(
    transactions: OFXTransaction[],
    config: OFXConfig = {}
): string {
    const accountId = config.accountId || '000000000';
    const currency = config.currency || 'USD';
    const bankId = config.bankId || '999999999';

    // Sort transactions by date
    const sorted = [...transactions].sort((a, b) => {
        // Handle various date formats for sorting
        const d1 = new Date(a.date.replace(/(\d{2})[-/](\d{2})[-/](\d{4})/, '$3-$1-$2')); // Attempt US format conversion
        const d2 = new Date(b.date.replace(/(\d{2})[-/](\d{2})[-/](\d{4})/, '$3-$1-$2'));
        const t1 = isNaN(d1.getTime()) ? new Date(a.date).getTime() : d1.getTime();
        const t2 = isNaN(d2.getTime()) ? new Date(b.date).getTime() : d2.getTime();
        return t1 - t2;
    });

    const now = new Date();
    const sequenceNum = Math.floor(Math.random() * 99999).toString().padStart(5, '0');

    // Header Block
    let mt940 = `{1:F01${bankId}XX0000000000}{2:I940${accountId}N}{4:\r\n`;
    mt940 += `:20:${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}EXPORT\r\n`;
    mt940 += `:25:${accountId}\r\n`;
    mt940 += `:28C:${sequenceNum}/1\r\n`;

    // Calculate opening balance (assumed 0 if not provided or calculated backwards)
    // For simplicity in CSV converter, we might start at 0 or use config
    let currentBalance = config.closingBalance !== undefined && config.includeBalance ?
        (config.closingBalance - sorted.reduce((sum, t) => sum + t.amount, 0)) : 0;

    const openingDate = sorted.length > 0 ? sorted[0].date : new Date().toISOString().split('T')[0];
    const openDateObj = new Date(openingDate);
    // Format YYMMDD
    const openDateStr = `${openDateObj.getFullYear().toString().substring(2)}${(openDateObj.getMonth() + 1).toString().padStart(2, '0')}${openDateObj.getDate().toString().padStart(2, '0')}`;

    // 60F: Opening Balance
    const openSign = currentBalance >= 0 ? 'C' : 'D';
    const openAmt = Math.abs(currentBalance).toFixed(2).replace('.', ',');
    mt940 += `:60F:${openSign}${openDateStr}${currency}${openAmt}\r\n`;

    // Transactions
    sorted.forEach(tx => {
        // Parse date for YYMMDD
        // Try multiple formats again or use the sorted date logic
        let d = new Date(tx.date);
        if (isNaN(d.getTime())) {
            // Basic parsing attempt only valid if standard formats
            d = new Date(); // Fallback
        }
        const yymmdd = `${d.getFullYear().toString().substring(2)}${(d.getMonth() + 1).toString().padStart(2, '0')}${d.getDate().toString().padStart(2, '0')}`;

        const sign = tx.amount >= 0 ? 'C' : 'D';
        const amt = Math.abs(tx.amount).toFixed(2).replace('.', ',');
        const typeChar = 'N'; // Non-ref
        const typeCode = 'MSC'; // Misc
        const ref = (tx.checkNum || tx.fitid || 'NONREF').substring(0, 16);

        // :61:
        mt940 += `:61:${yymmdd}${sign}${amt}${typeChar}${typeCode}${ref}\r\n`;

        // :86: Description
        const desc = (tx.description || tx.name || tx.memo || 'Transfer').substring(0, 65);
        mt940 += `:86:${desc}\r\n`;

        currentBalance += tx.amount;
    });

    // 62F: Closing Balance
    const closeDate = sorted.length > 0 ? sorted[sorted.length - 1].date : openDateStr; // Or now
    const dClose = new Date(closeDate);
    const closeDateStr = `${dClose.getFullYear().toString().substring(2)}${(dClose.getMonth() + 1).toString().padStart(2, '0')}${dClose.getDate().toString().padStart(2, '0')}`;

    const closeSign = currentBalance >= 0 ? 'C' : 'D';
    const closeAmt = Math.abs(currentBalance).toFixed(2).replace('.', ',');

    mt940 += `:62F:${closeSign}${closeDateStr}${currency}${closeAmt}\r\n`;
    mt940 += `-}`;

    return mt940;
}

/**
 * Generate and download OFX/QBO/QFX file
 */
export function downloadOFXFile(
    transactions: OFXTransaction[],
    filename: string,
    config: OFXConfig = {},
    format: ExportFormat = 'ofx'
): void {
    let content = '';

    if (format === 'mt940') {
        content = generateMT940(transactions, config);
    } else {
        content = generateOFX(transactions, config, format);
    }

    // Determine file extension
    let ext = format === 'mt940' ? 'txt' : format;
    const finalFilename = filename.includes('.')
        ? filename.replace(/\.[^.]+$/, `.${ext}`)
        : `${filename}.${ext}`;

    // Create and trigger download
    const blob = new Blob([content], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = finalFilename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 100);
}

/**
 * Parse CSV string to array of objects
 */
export function parseCSV(csvText: string): { headers: string[]; rows: Record<string, string>[] } {
    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length < 2) {
        return { headers: [], rows: [] };
    }

    // Parse header row
    const headers = parseCSVLine(lines[0]);

    // Parse data rows
    const rows = lines.slice(1)
        .filter(line => line.trim())
        .map(line => {
            const values = parseCSVLine(line);
            const row: Record<string, string> = {};
            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });
            return row;
        });

    return { headers, rows };
}

/**
 * Parse a single CSV line (handles quoted fields)
 */
function parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }

    result.push(current.trim());
    return result;
}

/**
 * Auto-detect column mapping from header names
 */
export function autoDetectColumns(headers: string[]): {
    date: string | null;
    description: string | null;
    name: string | null;
    memo: string | null;
    amount: string | null;
    credit: string | null;
    debit: string | null;
    balance: string | null;
    checkNum: string | null;
    fitid: string | null;
    type: string | null;
} {
    const normalized = headers.map(h => h.toLowerCase().trim());

    const findMatch = (patterns: string[]): string | null => {
        for (const pattern of patterns) {
            const index = normalized.findIndex(h => h.includes(pattern));
            if (index >= 0) return headers[index];
        }
        return null;
    };

    return {
        date: findMatch(['date', 'posting', 'trans date', 'transaction date', 'value date']),
        description: findMatch(['description', 'desc', 'narration', 'particulars', 'details']),
        name: findMatch(['name', 'payee', 'merchant', 'party']),
        memo: findMatch(['memo', 'note', 'check memo', 'ref']),
        amount: findMatch(['amount', 'value', 'sum']),
        credit: findMatch(['credit', 'deposit', 'money in', 'credits', 'in']),
        debit: findMatch(['debit', 'withdrawal', 'money out', 'debits', 'out']),
        balance: findMatch(['balance', 'running balance', 'ledger balance']),
        checkNum: findMatch(['check', 'cheque', 'chk', 'ck#', 'doc num']),
        fitid: findMatch(['fitid', 'id', 'ref', 'reference', 'trn id']),
        type: findMatch(['type', 'trans type', 'd/c', 'cr/dr'])
    };
}

/**
 * Convert CSV rows to OFX transactions
 */
export function csvToOFXTransactions(
    rows: Record<string, string>[],
    mapping: {
        date: string;
        description?: string;
        name?: string;
        memo?: string;
        amount?: string;
        credit?: string;
        debit?: string;
        checkNum?: string;
        fitid?: string;
        type?: string;
    }
): OFXTransaction[] {
    return rows
        .map(row => {
            const date = row[mapping.date] || '';

            // Description can come from desc, name, memo, or fallback
            let description = '';
            if (mapping.description) description = row[mapping.description];
            else if (mapping.name) description = row[mapping.name];
            else if (mapping.memo) description = row[mapping.memo];

            const name = mapping.name ? row[mapping.name] : undefined;
            const memo = mapping.memo ? row[mapping.memo] : undefined;
            const checkNum = mapping.checkNum ? row[mapping.checkNum] : undefined;
            const fitid = mapping.fitid ? row[mapping.fitid] : undefined;

            // Parse Type if mapped
            let type: OFXTransaction['type'] | undefined;
            if (mapping.type) {
                const typeStr = (row[mapping.type] || '').toUpperCase();
                if (typeStr.includes('CREDIT') || typeStr === 'CR') type = 'CREDIT';
                else if (typeStr.includes('DEBIT') || typeStr === 'DR') type = 'DEBIT';
                else if (typeStr.includes('CHECK')) type = 'CHECK';
                else if (typeStr.includes('ATM')) type = 'ATM';
                else if (typeStr.includes('POS')) type = 'POS';
                else if (typeStr.includes('XFER') || typeStr.includes('TRANSFER')) type = 'XFER';
            }

            let amount = 0;

            if (mapping.amount) {
                // Single amount column
                const amtStr = row[mapping.amount] || '0';
                amount = parseFloat(amtStr.replace(/[^0-9.-]/g, '')) || 0;
            } else if (mapping.credit || mapping.debit) {
                // Separate credit/debit columns
                const creditStr = mapping.credit ? (row[mapping.credit] || '0') : '0';
                const debitStr = mapping.debit ? (row[mapping.debit] || '0') : '0';

                const credit = parseFloat(creditStr.replace(/[^0-9.-]/g, '')) || 0;
                const debit = parseFloat(debitStr.replace(/[^0-9.-]/g, '')) || 0;

                if (credit > 0) {
                    amount = credit;
                } else if (debit > 0) {
                    amount = -debit;
                }
            }

            // Validations
            if (!date) return null;
            // If neither description nor amount logic worked, we might still process if we have date/amount
            // But usually we need at least a date and amount

            // Allow missing description if date/amount present
            if (!description && !name && !memo) description = 'Transaction';

            return {
                date,
                description: description || (name || memo || 'Transaction'),
                name,
                memo,
                amount,
                checkNum,
                fitid,
                type
            };
        })
        .filter((tx): tx is OFXTransaction => tx !== null);
}
