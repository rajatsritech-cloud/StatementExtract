
export interface Transaction {
    Date: string;
    Amount: string;
    Name: string;
    Memo: string;
    Type: string;
    CheckNum: string;
    RefNum: string;
    Account: string;
    Currency: string;
}

export const FinanceParsers = {
    /**
     * Parses OFX or QFX content (XML-like SGML) into a flat list of transactions.
     */
    parseOfxOrQfx: (content: string): Transaction[] => {
        const transactions: Transaction[] = [];

        const getValue = (text: string, tag: string): string => {
            const regex = new RegExp(`<${tag}>\\s*([^<\\r\\n]+)`);
            const match = text.match(regex);
            return match ? match[1].trim() : "";
        };

        // Global fields
        const acctId = getValue(content, "ACCTID");
        const currency = getValue(content, "CURDEF") || "USD";

        // Split by transaction block
        // Supports both <STMTTRN>...</STMTTRN> and unclosed SGML style if needed, 
        // but regex below assumes a closing tag or next tag start for robustness could be better,
        // but the previous regex worked well for standard OFX.
        const trnRegex = /<STMTTRN>([\s\S]*?)<\/STMTTRN>/gi;
        let match;

        while ((match = trnRegex.exec(content)) !== null) {
            const block = match[1];

            const formatDate = (dateStr: string) => {
                // OFX dates are YYYYMMDDHHMMSS...
                // We just want YYYY-MM-DD
                if (dateStr && dateStr.length >= 8) {
                    return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
                }
                return dateStr;
            };

            const dateRaw = getValue(block, "DTPOSTED");

            transactions.push({
                Date: formatDate(dateRaw),
                Amount: getValue(block, "TRNAMT"),
                Name: getValue(block, "NAME"),
                Memo: getValue(block, "MEMO"),
                Type: getValue(block, "TRNTYPE"),
                CheckNum: getValue(block, "CHECKNUM"),
                RefNum: getValue(block, "REFNUM") || getValue(block, "FITID"),
                Account: acctId,
                Currency: currency,
            });
        }

        if (transactions.length === 0) {
            // Fallback or just return empty? 
            // Let's throw to let UI handle "invalid file"
            throw new Error("No transactions found. Is this a valid OFX/QFX file?");
        }

        return transactions;
    },

    /**
     * Parses QIF (Quicken Interchange Format) content.
     */
    parseQif: (content: string): Transaction[] => {
        const transactions: Transaction[] = [];
        const lines = content.split(/\r?\n/);

        let currentTrn: Partial<Transaction> = {};
        let isHeader = true;

        // Default values
        let currency = "USD"; // QIF doesn't standardly specify currency in the file headers usually

        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            const code = trimmed[0];
            const value = trimmed.substring(1);

            if (trimmed === '^') {
                // End of transaction
                if (currentTrn.Date) { // Minimal validation
                    transactions.push({
                        Date: currentTrn.Date || "",
                        Amount: currentTrn.Amount || "0",
                        Name: currentTrn.Name || "",
                        Memo: currentTrn.Memo || "",
                        Type: currentTrn.Type || "PAYMENT", // Default assumption
                        CheckNum: currentTrn.CheckNum || "",
                        RefNum: currentTrn.RefNum || "",
                        Account: "", // QIFs often don't have account number inside the txn block
                        Currency: currency
                    });
                }
                currentTrn = {};
                continue;
            }

            // Headers like !Type:Bank
            if (code === '!') {
                continue;
            }

            switch (code) {
                case 'D': // Date
                    // QIF dates are messy: 'D6/ 1/2026' or 'D01/06/2026'.
                    // We need a robust date parser or assume a standard. 
                    // For now, let's keep it simple and just separate parts.
                    // Trying to standardize to YYYY-MM-DD is hard without locale.
                    // We'll fallback to passing it through or simple normalization.
                    currentTrn.Date = value.replace(/'/g, "/"); // Convert ' to /
                    break;
                case 'T': // Amount
                    currentTrn.Amount = value.replace(/,/g, ""); // Remove thousands separator
                    break;
                case 'P': // Payee
                    currentTrn.Name = value;
                    break;
                case 'M': // Memo
                    currentTrn.Memo = value;
                    break;
                case 'N': // Check Number (or Type sometimes)
                    currentTrn.CheckNum = value;
                    break;
                case 'L': // Category (using as Type or Memo fallback)
                    // Category is useful, maybe append to Memo?
                    currentTrn.Type = value; // Often used for 'Category'
                    break;
            }
        }

        if (transactions.length === 0) {
            throw new Error("No transactions found in QIF file.");
        }

        return transactions;
    },

    /**
     * Parses IIF (Intuit Interchange Format) content into transactions.
     */
    parseIif: (content: string): Transaction[] => {
        const transactions: Transaction[] = [];
        const lines = content.split(/\r?\n/);

        let headers: string[] = [];
        let isTransactionSection = false;

        // IIF files have multiple sections. We look for !TRNS and !SPL lines.
        // Simplification: We blindly look for TRNS blocks.

        for (const line of lines) {
            const parts = line.split('\t');
            const type = parts[0];

            if (type === '!TRNS') {
                headers = parts;
                isTransactionSection = true;
                continue;
            }

            if (type === '!SPL') {
                // Splits share the same headers usually, often !SPL follows !TRNS immediately? 
                // In simple IIF checks, !SPL redefines headers sometimes.
                // For this simple parser, we'll assume !TRNS set the headers for TRNS rows.
                // NOTE: We are ignoring splits for now to keep the Excel row flat.
                continue;
            }

            if (type === 'TRNS' && isTransactionSection) {
                // Map values to our Transaction object
                const trn: any = {};

                parts.forEach((val, index) => {
                    const header = headers[index];
                    if (header) trn[header] = val;
                });

                // Required: TRNSID, TRNSTYPE, DATE, ACCT, NAME, AMOUNT, MEMO
                // Map to our generic Transaction interface

                // Date formatting is usually M/D/YYYY in IIF
                const date = trn['DATE'] || "";

                if (date) {
                    transactions.push({
                        Date: date,
                        Amount: trn['AMOUNT'] || "0",
                        Name: trn['NAME'] || "",
                        Memo: trn['MEMO'] || "",
                        Type: trn['TRNSTYPE'] || "PAYMENT",
                        CheckNum: trn['DOCNUM'] || "",
                        RefNum: "",
                        Account: trn['ACCT'] || "",
                        Currency: "USD" // Not always explicit
                    });
                }
            }
        }

        if (transactions.length === 0) {
            throw new Error("No transactions found in IIF file.");
        }

        return transactions;
    },

    toTsv: (transactions: Transaction[]): string => {
        const headers = ["Date", "Amount", "Name", "Memo", "Type", "CheckNum", "RefNum", "Account", "Currency"];
        const rows = [headers.join("\t")];

        for (const t of transactions) {
            const row = headers.map(h => {
                // @ts-ignore
                let val = t[h] || "";
                // Escape? Excel handles tabs well in TSV usually without escaping quotes,
                // but let's replace tabs in content just in case.
                val = val.replace(/\t/g, " ");
                return val;
            });
            rows.push(row.join("\t"));
        }

        return rows.join("\n");
    },

    /**
     * Converts a list of transactions to IIF format.
     */
    toIif: (transactions: Transaction[]): string => {
        // Basic IIF Header
        const header = ["!TRNS", "TRNSID", "TRNSTYPE", "DATE", "ACCT", "NAME", "AMOUNT", "DOCNUM", "MEMO", "CLEAR", "TOPRINT"];
        const splitHeader = ["!SPL", "SPLID", "TRNSTYPE", "DATE", "ACCT", "NAME", "AMOUNT", "DOCNUM", "MEMO", "CLEAR", "QNTY", "PRICE", "INVITEM"];
        const endTrns = ["!ENDTRNS"];

        const lines = [];
        lines.push(header.join("\t"));
        lines.push(splitHeader.join("\t"));
        lines.push(endTrns.join("\t")); // Headers generally defined at top

        for (const t of transactions) {
            // Transaction Line
            const trnsLine = [
                "TRNS",
                "", // TRNSID
                t.Type || "PAYMENT", // TRNSTYPE
                t.Date, // DATE
                t.Account || "Bank Account", // ACCT
                t.Name, // NAME
                t.Amount, // AMOUNT
                t.CheckNum, // DOCNUM
                t.Memo, // MEMO
                "N", // CLEAR
                "N" // TOPRINT
            ];
            lines.push(trnsLine.join("\t"));

            // Split Line (Balancing entry - typically required for double entry, 
            // but for simple import, sometimes omitted or directed to an 'Uncategorized' account)
            // For a simple converter, we might just output the transaction line, 
            // but strict IIF usually requires a SPL line to balance? 
            // QuickBooks can sometimes import just TRNS blocks if they are single-entry lists (like check register).
            // Let's stick to just TRNS/ENDTRNS blocks for now to represent the register list.

            lines.push("!ENDTRNS");
        }

        return lines.join("\n");
    }
};
