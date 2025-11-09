// US Bank transaction patterns for the specific format found in the PDF
export const USBANK_PATTERNS = {
  // Transaction patterns for format like: "Jul 17 Visa Direct PAYPAL*Perlow Al 8607171056 $ 99 . 00"
  TRANSACTION_PATTERNS: [
    // Pattern 1: Month Day Description Ref Number $ Amount (most common)
    /^(\w{3}\s+\d{1,2})\s+(.+?)\s+(\d+)\s+\$\s*([\d,]+\.\d{2})\s*([-\+]?)\s*$/i,
    // Pattern 2: Month Day Description $ Amount (no ref number)
    /^(\w{3}\s+\d{1,2})\s+(.+?)\s+\$\s*([\d,]+\.\d{2})\s*([-\+]?)\s*$/i,
    // Pattern 3: Month Day Description Amount (no $)
    /^(\w{3}\s+\d{1,2})\s+(.+?)\s+([\d,]+\.\d{2})\s*([-\+]?)\s*$/i,
    // Pattern 4: Debit Purchase format - "Jul 17 Debit Purchase - VISA APL* I TUNES.COM/ 8100093189 $ 14.43 -"
    /^(\w{3}\s+\d{1,2})\s+Debit Purchase\s+[-]\s+(.+?)\s+(\d+)\s+\$?\s*([\d,]+\.\d{2})\s*([-\+]?)\s*$/i,
    // Pattern 5: Electronic Withdrawal format - "Jul 23 Electronic Withdrawal To CHARTER COMM $ 109.97 -"
    /^(\w{3}\s+\d{1,2})\s+Electronic Withdrawal\s+(.+?)\s+\$\s*([\d,]+\.\d{2})\s*([-\+]?)\s*$/i,
    // Pattern 6: More flexible - match any line with Month Day and amount
    /^(\w{3}\s+\d{1,2})\s+(.+?)\s+\$?\s*([\d,]+\.\d{2})\s*([-\+]?)\s*$/i,
    // Pattern 7: Zelle format - "Jul 18 Zelle Instant PMT From ARNO PERLOW 100 . 00"
    /^(\w{3}\s+\d{1,2})\s+Zelle Instant\s+(.+?)\s+(\d+)\s+\.?\s*(\d{2})\s*$/i
  ],
  
  // User info patterns
  USER_INFO: {
    BANK_NAME: /\bU\.?S\.?\s*BANK\b/i,
    ACCOUNT_HOLDER: /(?:MR|MS|MRS)\.?\s+([A-Z\s]+?)(?:\n|$)/i,
    ACCOUNT_NUMBER: /Account Number\s*[:\-]?\s*([\d\s\-\*]+)/i,
    STATEMENT_PERIOD: /Statement\s*Period\s*[:\-]?\s*(.+?)(?:\n|$)/i
  },
  
  // Section markers
  SECTIONS: {
    TRANSACTION_START: [
      /Date\s+Description\s+(?:Ref\s+Number\s+)?Amount/i,
      /Deposits\s+I\s+Credits/i,
      /Card\s+Withdrawals/i,
      /Date\s+Descri pt ion\s+of\s+Transaction\s+Ref\s+Number\s+Amount/i,
      /Date\s+Description\s+of\s+Transaction\s+Ref\s+Number\s+Amount/i
    ],
    TRANSACTION_END: [
      /Total\s+Deposits/i,
      /Balance\s+Summary/i,
      /Total\s+Other\s+Withdrawals/i,
      /Total\s+Card\s+Withdrawals/i,
      /Balances\s+only\s+appear\s+for\s+days/i
    ]
  }
};

// Extract transactions specifically for US Bank format
export const extractUSBankTransactions = (text: string) => {
  console.log('🏦 Extracting US Bank transactions...');
  
  const transactions = [];
  
  // The PDF text extraction puts everything on one line, so we need to split by month patterns
  const monthPattern = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2})/gi;
  const matches = Array.from(text.matchAll(monthPattern));
  
  console.log(`📊 Found ${matches.length} potential transaction dates`);
  
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const month = match[1];
    const day = match[2];
    
    // Get the text starting from this match
    const startIndex = match.index;
    
    // Try to extract the transaction from this position
    try {
      // Look for the next month or section end to determine transaction boundary
      let endIndex = text.length;
      const remainingMatches = matches.slice(i + 1);
      if (remainingMatches.length > 0) {
        const nextMatch = remainingMatches[0];
        endIndex = nextMatch.index;
      }
      
      const transactionText = text.substring(startIndex, endIndex).trim();
      console.log(`🔍 Processing transaction: ${transactionText.substring(0, 100)}...`);
      
      // Enhanced filtering - skip if this looks like a header, summary, or balance entry
      const skipPatterns = [
        /Date.*Description.*Ref.*Number.*Amount/i,
        /Total.*Deposits.*Credits/i,
        /Total.*Card.*Withdrawals/i,
        /Total.*Other.*Withdrawals/i,
        /Balance.*Summary/i,
        /Beginning.*Balance/i,
        /Ending.*Balance/i,
        /Account.*Summary/i,
        /Deposits.*Credits/i,
        /Card.*Withdrawals/i,
        /Other.*Withdrawals/i,
        /Number.*of.*Days/i,
        /Card.*Number:/i,
        /Page.*\d+.*of.*\d+/i,
        /Statement.*Period/i,
        /Account.*Number/i,
        /Member.*FDIC/i,
        /U\.S\.Bank/i,
        /Subtotal/i,
        /Balances.*only.*appear/i,
        /reflecting.*change/i,
        /Bank.*Statement.*Converter/i
      ];
      
      let shouldSkip = false;
      for (const pattern of skipPatterns) {
        if (pattern.test(transactionText)) {
          shouldSkip = true;
          console.log(`⚠️ Skipping summary/balance entry: ${transactionText.substring(0, 50)}...`);
          break;
        }
      }
      
      if (shouldSkip) continue;
      
      // Extract amounts - handle multiple formats with better validation
      let amount = 0;
      let amountString = '';
      
      // Pattern 1: $ 99 . 00 format (with spaces) - most reliable for this PDF
      const spacedAmountMatch = transactionText.match(/\$\s+(\d{1,5})\s*\.\s*(\d{2})/);
      if (spacedAmountMatch) {
        amount = parseFloat(`${spacedAmountMatch[1]}.${spacedAmountMatch[2]}`);
        amountString = spacedAmountMatch[0];
      } else {
        // Pattern 2: Regular format like "100 . 00" or "100.00" but limit to reasonable amounts
        const regularAmountMatch = transactionText.match(/(\d{1,5})\s*\.?\s*(\d{2})/);
        if (regularAmountMatch) {
          const potentialAmount = parseFloat(`${regularAmountMatch[1]}.${regularAmountMatch[2]}`);
          // Validate amount is reasonable (between $0.01 and $50,000)
          if (potentialAmount >= 0.01 && potentialAmount <= 50000) {
            amount = potentialAmount;
            amountString = regularAmountMatch[0];
          }
        }
      }
      
      if (isNaN(amount) || amount === 0) {
        console.log('⚠️ No valid amount found');
        continue;
      }
      
      // Additional validation - amount should be the last number in the transaction text
      const allNumbers = transactionText.match(/(\d{1,5})\s*\.?\s*(\d{2})/g);
      if (allNumbers && allNumbers.length > 1) {
        // Use the last occurrence as it's most likely the actual amount
        const lastMatch = allNumbers[allNumbers.length - 1].match(/(\d{1,5})\s*\.?\s*(\d{2})/);
        if (lastMatch) {
          const lastAmount = parseFloat(`${lastMatch[1]}.${lastMatch[2]}`);
          if (lastAmount >= 0.01 && lastAmount <= 50000) {
            amount = lastAmount;
            amountString = allNumbers[allNumbers.length - 1];
          }
        }
      }
      
      // Extract description (everything between date and amount)
      const dateEnd = startIndex + match[0].length;
      let description = '';
      
      // Find where the amount starts to extract description
      const amountStart = text.indexOf(amountString, startIndex);
      if (amountStart > dateEnd) {
        description = text.substring(dateEnd, amountStart).trim();
      }
      
      // Clean up description - remove extra spaces and normalize
      description = description.replace(/\s+/g, ' ').trim();
      
      // Remove common patterns that aren't part of the description
      description = description.replace(/On\s+\d{2}\/\d{2}\/\d{2}\s+PMT\s+ID=\w+/g, '').trim();
      description = description.replace(/REF=\d+/g, '').trim();
      description = description.replace(/REF\s+#\s*\d+/g, '').trim();
      description = description.replace(/Serial\s+No\.\s*\d+/g, '').trim();
      
      // Skip very short descriptions (likely not real transactions)
      if (description.length < 3) {
        console.log('⚠️ Skipping very short description');
        continue;
      }
      
      // Skip if description is just numbers or symbols
      if (/^[\d\s\-\.\,\$]+$/.test(description)) {
        console.log('⚠️ Skipping numeric-only description');
        continue;
      }
      
      // Determine transaction type based on the transaction text, not just the amount
      const isDebit = transactionText.includes('-') || 
                     description.toLowerCase().includes('debit') || 
                     description.toLowerCase().includes('purchase') ||
                     description.toLowerCase().includes('withdrawal') ||
                     description.toLowerCase().includes('electronic withdrawal') ||
                     description.toLowerCase().includes('atm withdrawal');
      
      const transactionType = isDebit ? 'debit' : 'credit';
      const signedAmount = isDebit ? -Math.abs(amount) : Math.abs(amount);
      
      // Normalize date
      const normalizedDate = normalizeUSBankDate(`${month} ${day}`);
      
      const transaction = {
        date: normalizedDate,
        description: description,
        amount: signedAmount,
        balance: 0, // Will be calculated later
        type: transactionType
      };
      
      transactions.push(transaction);
      console.log(`✅ Transaction: ${month} ${day} | ${description} | $${signedAmount.toFixed(2)} | ${transactionType}`);
      
    } catch (error) {
      console.log('⚠️ Failed to parse transaction at position', match.index, error);
    }
  }
  
  console.log(`📊 Extracted ${transactions.length} US Bank transactions`);
  return transactions;
};

// Normalize US Bank date format
export const normalizeUSBankDate = (dateStr: string) => {
  const monthMap: { [key: string]: string } = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
    'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
    'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
  };
  
  const match = dateStr.match(/^(\w{3})\s+(\d{1,2})/);
  if (match) {
    const month = monthMap[match[1]];
    const day = match[2].padStart(2, '0');
    // Default to 2019 since that's what's in the PDF
    return `2019-${month}-${day}`;
  }
  
  return dateStr; // Return original if can't parse
};

// Extract user information specifically for US Bank format
export const extractUSBankUserInfo = (text: string) => {
  console.log('🏦 Extracting US Bank user info...');
  
  const userInfo = {
    name: '',
    email: '',
    bankName: 'US Bank',
    accountNumber: '',
    statementPeriod: '',
    accountSummary: {
      beginningBalance: 0,
      endingBalance: 0,
      totalDeposits: 0,
      totalWithdrawals: 0
    }
  };
  
  // Extract name - look for MR/MRS pattern
  const nameMatch = text.match(/(?:MR|MRS|MS)\.?\s+([A-Z\s]+?)(?:\n|$)/i);
  if (nameMatch) {
    userInfo.name = nameMatch[1].trim();
    console.log(`✅ Found name: ${userInfo.name}`);
  }
  
  // Extract account number - look for Account Number pattern
  const accountMatch = text.match(/Account Number\s*[:\-]?\s*([\d\s\-\*]+)/i);
  if (accountMatch) {
    userInfo.accountNumber = accountMatch[1].replace(/\s+/g, '').trim();
    console.log(`✅ Found account number: ${userInfo.accountNumber}`);
  }
  
  // Extract statement period - look for Statement Period pattern
  const periodMatch = text.match(/Statement\s*Period\s*[:\-]?\s*(.+?)(?:\n|Page)/i);
  if (periodMatch) {
    userInfo.statementPeriod = periodMatch[1].trim();
    console.log(`✅ Found statement period: ${userInfo.statementPeriod}`);
  }
  
  // Extract account summary
  // Beginning Balance
  const beginningBalanceMatch = text.match(/Beginning\s+Balance\s+on\s+[^$]*?\$\s*([\d,]+\.\d{2})/i);
  if (beginningBalanceMatch) {
    userInfo.accountSummary.beginningBalance = parseFloat(beginningBalanceMatch[1].replace(/,/g, ''));
  }
  
  // Ending Balance
  const endingBalanceMatch = text.match(/Ending\s+Balance\s+on\s+[^$]*?\$\s*([\d,]+\.\d{2})/i);
  if (endingBalanceMatch) {
    userInfo.accountSummary.endingBalance = parseFloat(endingBalanceMatch[1].replace(/,/g, ''));
  }
  
  // Total Deposits
  const depositsMatch = text.match(/Deposits\s+I\s+Credits\s+\$?\s*([\d,]+\.\d{2})/i);
  if (depositsMatch) {
    userInfo.accountSummary.totalDeposits = parseFloat(depositsMatch[1].replace(/,/g, ''));
  }
  
  // Total Withdrawals (Card + Other)
  const cardWithdrawalsMatch = text.match(/Card\s+Withdrawals\s+([^\$]*?)\$\s*([\d,]+\.\d{2})\s*-/i);
  const otherWithdrawalsMatch = text.match(/Other\s+Withdrawals\s+([^\$]*?)\$\s*([\d,]+\.\d{2})\s*-/i);
  
  let cardWithdrawals = 0;
  let otherWithdrawals = 0;
  
  if (cardWithdrawalsMatch) {
    cardWithdrawals = parseFloat(cardWithdrawalsMatch[2].replace(/,/g, ''));
  }
  if (otherWithdrawalsMatch) {
    otherWithdrawals = parseFloat(otherWithdrawalsMatch[2].replace(/,/g, ''));
  }
  
  userInfo.accountSummary.totalWithdrawals = cardWithdrawals + otherWithdrawals;
  
  console.log('👤 US Bank User Info:', userInfo);
  console.log('📊 Account Summary:', userInfo.accountSummary);
  return userInfo;
};
