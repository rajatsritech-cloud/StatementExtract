// Test the US Bank transaction extraction with actual PDF text
import { extractUSBankTransactions } from './src/lib/usBankPatterns.js';

// Sample text from your actual PDF (truncated for testing)
const sampleText = `
Jul 17 Visa Direct PAYPAL*Perlow Al 8607171056 $ 99 . 00
Jul 18 Zelle Instant PMT From ARNO PERLOW 100 . 00 On 07/ 18/ 19 PMT ID=PNC013608186
Jul 19 Zelle Instant PMT From ARNO PERLOW 100 . 00 On 07/19/19 PMT ID=PNC013684985
Jul 22 Zelle Instant PMT From ARNO PERLOW 50 . 00 On 07/20/19 PMT ID=PNC013717143
Jul 17 Debit Purchase - VISA APL* I TUNES.COM/ 8100093189 $ 14.43 -
Jul 18 Debit Purchase - VISA RICHMOND HEI MO 9100655200 23.57 -
Jul 23 Electronic Withdrawal To CHARTER COMM $ 109.97 -
`;

console.log('🧪 Testing US Bank Transaction Extraction...');
console.log('📄 Sample text:', sampleText);

const transactions = extractUSBankTransactions(sampleText);

console.log(`\n📊 Results: Found ${transactions.length} transactions`);
transactions.forEach((t, i) => {
  console.log(`${i + 1}. ${t.date} | ${t.description} | $${t.amount.toFixed(2)} | ${t.type}`);
});
