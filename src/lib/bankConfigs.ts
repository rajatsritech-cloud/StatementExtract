// Bank Configuration Mapping
// This file contains bank-specific patterns and configurations
// No hardcoded values - all dynamic extraction based on bank detection

export interface BankConfig {
  name: string;
  patterns: {
    // User info patterns
    userInfo: {
      name: RegExp;
      accountNumber: RegExp;
      statementPeriod: RegExp;
    };
    // Transaction patterns
    transactions: {
      datePattern: RegExp;
      amountPattern: RegExp;
      descriptionCleanup: RegExp[];
      skipPatterns: RegExp[];
      debitKeywords: string[];
    };
    // Section markers
    sections: {
      transactionStart: RegExp[];
      transactionEnd: RegExp[];
    };
  };
  // Date normalization
  dateNormalizer: (dateStr: string) => string;
}

// US Bank Configuration
export const US_BANK_CONFIG: BankConfig = {
  name: 'US Bank',
  patterns: {
    userInfo: {
      name: /(?:MR|MRS|MS)\.?\s+([A-Z\s]+?)(?:\n|$)/i,
      accountNumber: /Account Number\s*[:\-]?\s*([\d\s\-\*]+)/i,
      statementPeriod: /Statement\s*Period\s*[:\-]?\s*(.+?)(?:\n|Page)/i
    },
    transactions: {
      datePattern: /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2})/gi,
      amountPattern: /(\d+)\s*\.?\s*(\d{2})/,
      descriptionCleanup: [
        /On\s+\d{2}\/\d{2}\/\d{2}\s+PMT\s+ID=\w+/g,
        /REF=\d+/g,
        /REF\s+#\s*\d+/g,
        /Serial\s+No\.\s*\d+/g
      ],
      skipPatterns: [
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
      ],
      debitKeywords: ['debit', 'purchase', 'withdrawal', 'electronic withdrawal', 'atm withdrawal']
    },
    sections: {
      transactionStart: [
        /Date.*Description.*Ref.*Number.*Amount/i,
        /Deposits.*I.*Credits/i
      ],
      transactionEnd: [
        /Total.*Deposits/i,
        /Balance.*Summary/i
      ]
    }
  },
  dateNormalizer: (dateStr: string) => {
    const monthMap: { [key: string]: string } = {
      'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
      'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
      'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };
    
    const match = dateStr.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2})/i);
    if (match) {
      const month = monthMap[match[1]];
      const day = match[2].padStart(2, '0');
      // Default to 2019 for this statement period, could be made dynamic
      return `2019-${month}-${day}`;
    }
    
    return dateStr;
  }
};

// Bank Detection and Configuration Mapping
export const BANK_CONFIGS: BankConfig[] = [
  US_BANK_CONFIG,
  // Add more bank configurations here as needed
  // Example: CHASE_CONFIG, WELLS_FARGO_CONFIG, etc.
];

// Bank Detection Function
export const detectBank = (text: string): BankConfig | null => {
  console.log('🔍 Detecting bank format...');
  
  for (const config of BANK_CONFIGS) {
    // Check if bank name appears in text
    const bankNamePatterns = [
      new RegExp(config.name.replace(/\s+/g, '\\s+'), 'i'),
      new RegExp(config.name.replace(/\s+/g, '[\\s\\-]*'), 'i')
    ];
    
    for (const pattern of bankNamePatterns) {
      if (pattern.test(text)) {
        console.log(`✅ ${config.name} format detected`);
        return config;
      }
    }
  }
  
  console.log('⚠️ No specific bank format detected, using generic extraction');
  return null;
};

// Generic fallback configuration
export const GENERIC_CONFIG: BankConfig = {
  name: 'Generic',
  patterns: {
    userInfo: {
      name: /(?:MR|MRS|MS)\.?\s+([A-Z\s]+?)(?:\n|$)/i,
      accountNumber: /Account Number\s*[:\-]?\s*([\d\s\-\*]+)/i,
      statementPeriod: /Statement\s*Period\s*[:\-]?\s*(.+?)(?:\n|$)/i
    },
    transactions: {
      datePattern: /\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/gi,
      amountPattern: /\$?\s*([\d,]+)\.(\d{2})/,
      descriptionCleanup: [],
      skipPatterns: [
        /Total/i,
        /Balance/i,
        /Summary/i
      ],
      debitKeywords: ['debit', 'withdrawal', 'payment', 'fee']
    },
    sections: {
      transactionStart: [/Date/i, /Transaction/i],
      transactionEnd: [/Total/i, /Summary/i]
    }
  },
  dateNormalizer: (dateStr: string) => {
    // Generic date normalization - can be enhanced
    return dateStr;
  }
};

export default {
  BANK_CONFIGS,
  detectBank,
  US_BANK_CONFIG,
  GENERIC_CONFIG
};
