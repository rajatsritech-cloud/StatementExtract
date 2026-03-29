import { ExtractedData } from './pdfProcessor';

export const SAMPLE_STATEMENT_DATA: ExtractedData = {
  transactions: [
    { date: "2026-03-01", description: "AMAZON.COM*MARKETPLACE", amount: 42.99, balance: 14520.50, type: 'debit', reference: "AMZN-9923" },
    { date: "2026-03-02", description: "STRIPE PAYOUT - STATEMENTEXTRACT", amount: 1250.00, balance: 15770.50, type: 'credit', reference: "STR-0012" },
    { date: "2026-03-04", description: "UBER TRIP HELP.UBER.COM", amount: 18.50, balance: 15752.00, type: 'debit', reference: "UBR-4412" },
    { date: "2026-03-05", description: "STARBUCKS COFFEE #122", amount: 5.75, balance: 15746.25, type: 'debit' },
    { date: "2026-03-07", description: "VERIZON WIRELESS BILL PAY", amount: 89.99, balance: 15656.26, type: 'debit', reference: "VZN-991" },
    { date: "2026-03-10", description: "EMPLOYER PAYROLL DIRECT DEP", amount: 4500.00, balance: 20156.26, type: 'credit', reference: "PAY-MAR" },
    { date: "2026-03-12", description: "ADOBE CREATIVE CLOUD", amount: 52.99, balance: 20103.27, type: 'debit' },
    { date: "2026-03-15", description: "RENT PAYMENT - APARTMENT 4B", amount: 1800.00, balance: 18303.27, type: 'debit', reference: "RE-551" },
    { date: "2026-03-18", description: "SAFEWAY STORES INC", amount: 112.45, balance: 18190.82, type: 'debit' },
    { date: "2026-03-20", description: "SHELL OIL 44192", amount: 45.00, balance: 18145.82, type: 'debit' },
    { date: "2026-03-22", description: "NETFLIX.COM", amount: 15.99, balance: 18129.83, type: 'debit' },
    { date: "2026-03-25", description: "GITHUB SPONSORS", amount: 10.00, balance: 18119.83, type: 'debit' }
  ],
  userInfo: {
    name: "John Doe",
    bankName: "Global Standard Bank",
    accountNumber: "XXXX-XXXX-1234",
    statementPeriod: "March 1, 2026 - March 31, 2026",
    currency: "USD",
    accountSummary: {
      beginningBalance: 14563.49,
      totalDeposits: 5750.00,
      totalWithdrawals: 2193.66,
      endingBalance: 18119.83
    }
  },
  validation_summary: {
    status: "VERIFIED",
    confidence: 100,
    issues: [],
    chain_integrity: 100
  },
  summary: {
    totalCredits: 5750.00,
    totalDebits: 2193.66,
    netBalance: 3556.34,
    transactionCount: 12
  },
  llm_used: true
};
