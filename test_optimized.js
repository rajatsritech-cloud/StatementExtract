// Test the optimized extraction and OCR performance
import { extractUSBankTransactions, extractUSBankUserInfo } from './src/lib/usBankPatterns.js';

// Sample text that was causing issues
const problematicText = `
MR JOHN DOE 2 POST ALLEY, SEATTLE, WA 98101 To Contact U.S. Bank
Account Number 123434566789
Statement Period Jul 17, 2019 through Aug 15, 2019
Beginning Balance on Jul 17 $ 405.75
Deposits | Credits 1,150.00
Card Withdrawals 907.75-
Other Withdrawals 263.50-
Ending Balance on Aug 15, 2019 $ 384.50
Jul 17 Visa Direct PAYPAL*Perlow Al 8607171056 $ 99.00
Jul 18 Zelle Instant PMT From ARNO PERLOW 100.00
Jul 19 Zelle Instant PMT From ARNO PERLOW 100.00
Jul 17 Debit Purchase - VISA On 071719 866-712-7753 CA 8100093189 $ 14.43-
Jul 18 Debit Purchase - VISA On 071719 RICHMOND HEI MO 9100655200 23.57-
`;

console.log('🚀 TESTING OPTIMIZED EXTRACTION');
console.log('=' .repeat(50));

// Test user info extraction
console.log('\n👤 USER INFO TEST:');
const userInfo = extractUSBankUserInfo(problematicText);
console.log('Name:', userInfo.name);
console.log('Account:', userInfo.accountNumber);
console.log('Period:', userInfo.statementPeriod);
console.log('Summary:', userInfo.accountSummary);

// Test transaction extraction
console.log('\n💰 TRANSACTION TEST:');
const transactions = extractUSBankTransactions(problematicText);

console.log(`\n📊 RESULTS:`);
console.log(`Found ${transactions.length} transactions`);

transactions.forEach((t, i) => {
  console.log(`${i + 1}. ${t.date} | ${t.description.substring(0, 30)}... | $${Math.abs(t.amount).toFixed(2)} | ${t.type}`);
});

// Calculate totals
const credits = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
const debits = Math.abs(transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0));

console.log(`\n💵 FINANCIAL SUMMARY:`);
console.log(`Total Credits: $${credits.toFixed(2)}`);
console.log(`Total Debits: $${debits.toFixed(2)}`);
console.log(`Net Balance: $${(credits - debits).toFixed(2)}`);

console.log(`\n✅ OPTIMIZATION TEST COMPLETE!`);
console.log(`Expected vs Actual:`);
console.log(`Name: JOHN DOE vs ${userInfo.name}`);
console.log(`Credits: ~$1,150 vs $${credits.toFixed(2)}`);
console.log(`Debits: ~$907 vs $${debits.toFixed(2)}`);
