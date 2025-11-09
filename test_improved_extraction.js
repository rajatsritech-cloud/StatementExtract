// Test the improved US Bank transaction extraction
import { extractUSBankTransactions, extractUSBankUserInfo } from './src/lib/usBankPatterns.js';

// Sample text from your actual PDF
const sampleText = `
Uni - Statement  Account Number:  1   234   3456   6 7 89  Statement   Period:  Jul 17, 2019  through  Aug   15,   2019  Page 1 of 3  PO Box 1800  Saint Paul, Minnesota 55101 - 0800  7086   TRN   S   X   ST01  000096466 01   SP   000638117810813 E  MR JOHN DOE  2 POST ALLEY,  SEATTLE, WA 98101  To Contact U.S. Bank  By   Phone:   1 - 800 - US BANKS  (1 - 800 - 872 - 2657)  St. Louis  Metro Area:  U.S. Bank accepts Relay Calls  Internet:  314 - 425 - 2000  usbank.com  STUDENT CHECKING   Member FDIC  U.S. Bank National Association   Account Number   1 - 234 - 3456 - 6789  Account   Summary  Beginning   Balance   on   Jul   17   $   405.75   Number   of   Days   in   Statement   Period   30  Deposits   I   Credits   1,150.00  Card   Withdrawals   907.75 -  Other   Withdrawals   263 .50 -  Ending   Balance   on   Aug   15 ,   2019   $   384.50  Deposits I Credits  Date   Descri p tion of Transaction   Ref Number   Amount  Jul   17   Visa Direct   PAYPAL*Perlow Al   8607171056   $   99 . 00  Jul   18   Zelle Instant   PMT From ARNO PERLOW   100 . 00  On 07/ 18/ 19   PMT ID=PNC013608186  Jul   19   Zelle Instant   PMT From ARNO PERLOW   100 . 00  On 07/19/19   PMT ID=PNC013684985  Jul   22   Zelle Instant   PMT From ARNO PERLOW   50 . 00  On 07/20/19   PMT ID=PNC013717143  Jul   17   Debit Purchase   -   VISA  APL*   I TUNES.COM/  On   071719   866 - 712 - 7753   CA  REF   #   24692169198100093189880  8100093189   $   14.43 -  Jul   18   Debit Purchase   -   VISA   On   071719   RICHMOND   HEI   MO   9100655200   23.57 -  Total Deposits   I   Credits   $   1,150.00  Card   Withdrawals  Card   Number:   xxxx - xxxx - xxxx - 6789  Balance   Summary  Date   Ending Balance   Date   Ending Balance   Date   Ending Balance  Jul   17   490 .32   Jul 29   641.42   Aug   5   437 .38
`;

console.log('🧪 Testing Improved US Bank Transaction Extraction...');
console.log('📄 Sample text length:', sampleText.length);

// Test user info extraction
console.log('\n👤 Testing User Info Extraction:');
const userInfo = extractUSBankUserInfo(sampleText);
console.log('User Info:', userInfo);

// Test transaction extraction
console.log('\n💰 Testing Transaction Extraction:');
const transactions = extractUSBankTransactions(sampleText);

console.log(`\n📊 Results: Found ${transactions.length} transactions`);
transactions.forEach((t, i) => {
  console.log(`${i + 1}. ${t.date} | ${t.description} | $${t.amount.toFixed(2)} | ${t.type}`);
});

// Calculate summary
const credits = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
const debits = Math.abs(transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0));
const netBalance = credits - debits;

console.log(`\n📈 Summary:`);
console.log(`Total Credits: $${credits.toFixed(2)}`);
console.log(`Total Debits: $${debits.toFixed(2)}`);
console.log(`Net Balance: $${netBalance.toFixed(2)}`);
