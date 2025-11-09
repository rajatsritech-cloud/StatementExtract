// Quick test to verify the fixes work
import { extractUSBankTransactions, extractUSBankUserInfo } from './src/lib/usBankPatterns.js';

// Sample problematic text that was causing huge numbers
const testText = `
Jul 17 Visa Direct PAYPAL*Perlow Al 8607171056 99 . 00
Jul 18 Debit Purchase - VISA On 071719 RICHMOND HEI MO 9100655200 23.57 -
Jul 22 PANERA BREAD #60 Debit Purchase REF # 24692169199100655200744 1907191849 3.91 -
`;

console.log('🧪 Testing Fixed Amount Parsing...');
console.log('📄 Test text:', testText);

const userInfo = extractUSBankUserInfo(testText);
console.log('\n👤 User Info:', userInfo);

const transactions = extractUSBankTransactions(testText);
console.log(`\n💰 Found ${transactions.length} transactions:`);

transactions.forEach((t, i) => {
  console.log(`${i + 1}. ${t.date} | ${t.description} | $${Math.abs(t.amount).toFixed(2)} | ${t.type}`);
});

// Calculate totals
const credits = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
const debits = Math.abs(transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0));

console.log(`\n📊 Summary:`);
console.log(`Total Credits: $${credits.toFixed(2)}`);
console.log(`Total Debits: $${debits.toFixed(2)}`);
console.log(`Net Balance: $${(credits - debits).toFixed(2)}`);

console.log(`\n✅ Test Complete!`);
