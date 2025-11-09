// Simple verification that PDF processing works
const testPDFProcessing = async () => {
  console.log('🧪 Testing PDF Processing...');
  
  try {
    // Test with sample US Bank statement data
    const sampleText = `
US BANK
Account Holder: JOHN A SMITH
Account Number: ****7890
Statement Period: 09/01/2024 - 09/30/2024

Date Description Amount Balance
09/02/2024 Direct Deposit $4,500.00 $6,956.78
09/03/2024 Grocery Store -$125.43 $6,831.35
09/05/2024 Gas Station -$45.00 $6,786.35
    `;
    
    const { PDFProcessor } = await import('./pdfProcessor');
    const result = PDFProcessor['extractDataFromText'](sampleText);
    
    console.log('✅ PDF Processing Test Results:');
    console.log(`- Transactions: ${result.transactions.length}`);
    console.log(`- User: ${result.userInfo.name || 'Not found'}`);
    console.log(`- Account: ${result.userInfo.accountNumber || 'Not found'}`);
    console.log(`- Bank: ${result.userInfo.bankName || 'Not found'}`);
    
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
};

// Auto-run test when page loads
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(testPDFProcessing, 2000);
  });
}

export { testPDFProcessing };
