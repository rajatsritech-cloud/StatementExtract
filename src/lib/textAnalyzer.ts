// Debug function to analyze extracted text
export const debugExtractedText = (rawText: string) => {
  console.log('🔍 === ANALYZING EXTRACTED TEXT ===');
  console.log('📄 Total characters:', rawText.length);
  console.log('📝 First 1000 characters:');
  console.log(rawText.substring(0, 1000));
  console.log('\n📝 Last 500 characters:');
  console.log(rawText.substring(rawText.length - 500));
  
  // Look for common patterns
  console.log('\n🔍 Pattern Analysis:');
  
  // Check for dates
  const datePatterns = [
    /\d{1,2}\/\d{1,2}\/\d{2,4}/g,
    /\d{2}-\d{2}-\d{2,4}/g,
    /\d{4}-\d{2}-\d{2}/g
  ];
  
  datePatterns.forEach((pattern, index) => {
    const matches = rawText.match(pattern);
    console.log(`Date pattern ${index + 1}: ${matches ? matches.length : 0} matches`);
    if (matches && matches.length > 0) {
      console.log(`  Examples: ${matches.slice(0, 5).join(', ')}`);
    }
  });
  
  // Check for amounts
  const amountPatterns = [
    /\$\d{1,3}(?:,\d{3})*(?:\.\d{2})/g,
    /\d{1,3}(?:,\d{3})*(?:\.\d{2})/g,
    /-?\$\d+(?:\.\d{2})?/g
  ];
  
  amountPatterns.forEach((pattern, index) => {
    const matches = rawText.match(pattern);
    console.log(`Amount pattern ${index + 1}: ${matches ? matches.length : 0} matches`);
    if (matches && matches.length > 0) {
      console.log(`  Examples: ${matches.slice(0, 5).join(', ')}`);
    }
  });
  
  // Check for bank names
  const bankNames = ['US BANK', 'US Bank', 'Chase', 'Bank of America', 'Wells Fargo'];
  bankNames.forEach(bank => {
    if (rawText.toLowerCase().includes(bank.toLowerCase())) {
      console.log(`✅ Bank found: ${bank}`);
    }
  });
  
  // Look for table-like structures
  console.log('\n📊 Looking for transaction patterns...');
  const lines = rawText.split('\n');
  const potentialTransactions: { line: number; content: string }[] = [];
  
  lines.forEach((line, index) => {
    // Look for lines with date + description + amount pattern
    if (/\d{1,2}\/\d{1,2}\/\d{2,4}.*\$?\d+/.test(line)) {
      potentialTransactions.push({ line: index + 1, content: line.trim() });
    }
  });
  
  console.log(`Found ${potentialTransactions.length} potential transaction lines:`);
  potentialTransactions.slice(0, 10).forEach(item => {
    console.log(`  Line ${item.line}: ${item.content}`);
  });
  
  return {
    totalCharacters: rawText.length,
    dateMatches: datePatterns.map(p => rawText.match(p) || []).flat(),
    amountMatches: amountPatterns.map(p => rawText.match(p) || []).flat(),
    potentialTransactions
  };
};
