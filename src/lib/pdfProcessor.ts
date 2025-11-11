import Tesseract from 'tesseract.js';
import { debugExtractedText } from './textAnalyzer';
import { extractUSBankTransactions, extractUSBankUserInfo } from './usBankPatterns';

let pdfjsLibPromise: Promise<typeof import('pdfjs-dist/legacy/build/pdf.mjs')> | null = null;

const loadPdfJs = async () => {
  if (typeof window === 'undefined') {
    throw new Error('PDF processing is only available in the browser');
  }

  if (!pdfjsLibPromise) {
    pdfjsLibPromise = import('pdfjs-dist/legacy/build/pdf.mjs').then((module) => {
      module.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${module.version}/legacy/build/pdf.worker.min.mjs`;
      console.log('🔧 PDF.js worker configured:', module.GlobalWorkerOptions.workerSrc);
      return module;
    });
  }

  return pdfjsLibPromise;
};

export interface TransactionData {
  date: string;
  description: string;
  amount: number;
  balance: number;
  type: 'credit' | 'debit';
}

export interface ExtractedData {
  userInfo: {
    name?: string;
    email?: string;
    accountNumber?: string;
    bankName?: string;
    statementPeriod?: string;
    accountSummary?: {
      beginningBalance: number;
      endingBalance: number;
      totalDeposits: number;
      totalWithdrawals: number;
    };
  };
  transactions: TransactionData[];
  summary: {
    totalCredits: number;
    totalDebits: number;
    netBalance: number;
    transactionCount: number;
  };
}

export class PDFProcessor {
  private static readonly TRANSACTION_PATTERNS = [
    // Date patterns (MM/DD/YYYY, MM-DD-YYYY, DD/MM/YYYY, etc.)
    /\b(0[1-9]|1[0-2])[-/](0[1-9]|[12][0-9]|3[01])[-/]\d{2,4}\b/g,
    /\b(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[0-2])[-/]\d{2,4}\b/g,
    // Amount patterns ($1,234.56, -$1,234.56, 1,234.56, etc.)
    /\$?-?\d{1,3}(?:,\d{3})*(?:\.\d{2})?/g,
    // Common transaction keywords
    /\b(deposit|withdrawal|payment|transfer|purchase|fee|interest|credit|debit)\b/gi,
  ];

  private static readonly BANK_PATTERNS = [
    /\b(bank|banking|statement|account)\b/gi,
    /\b(chase|bank of america|wells fargo|citibank|capital one|us bank)\b/gi,
  ];

  static async processPDF(file: File, isSignedIn: boolean = false): Promise<ExtractedData> {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        throw new Error('PDF processing is only available in the browser');
      }

      const pdfjsLib = await loadPdfJs();

      console.log('📖 Starting PDF processing...');
      const arrayBuffer = await file.arrayBuffer();
      console.log('📁 File loaded into memory, size:', arrayBuffer.byteLength);
      
      // Load PDF directly without complex fallback
      console.log('🔧 Loading PDF with pdf.js...');
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      console.log('✅ PDF loaded successfully');
      
      let fullText = '';
      const numPages = pdf.numPages;
      console.log(`📄 PDF has ${numPages} pages`);
      
      // Extract text from all pages
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        console.log(`📖 Processing page ${pageNum}/${numPages}...`);
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
        console.log(`✅ Page ${pageNum} processed, extracted ${pageText.length} characters`);
      }

      console.log(`📝 Total text extracted: ${fullText.length} characters`);

      // If no text found, try OCR on rendered pages (requires authentication)
      if (fullText.trim().length < 100) {
        console.log('⚠️ Limited text found in PDF');
        console.log('🔐 Authentication status:', isSignedIn ? 'Signed In' : 'Not Signed In');
        
        if (!isSignedIn) {
          console.log('❌ OCR requires authentication but user is not signed in');
          console.log('⚠️ Returning minimal data - modal should have prevented this');
          // Return minimal data instead of throwing error
          // The UploadArea should have caught this before processing
          return {
            transactions: [],
            userInfo: {
              name: '',
              accountNumber: '',
              bankName: '',
              statementPeriod: ''
            },
            summary: {
              totalCredits: 0,
              totalDebits: 0,
              netBalance: 0,
              transactionCount: 0
            }
          };
        }
        console.log('⚠️ Limited text found, attempting OCR...');
        fullText = await this.performOCROnPDF(pdf);
      }

      // Extract information from the text
      console.log('🔍 Extracting data from text...');
      console.log('📄 Raw text preview:', fullText.substring(0, 1000) + '...');
      
      // Debug the extracted text to understand the format
      const analysis = debugExtractedText(fullText);
      console.log('📊 Text analysis completed');
      
      const extractedData = this.extractDataFromText(fullText);
      
      console.log('✅ PDF processing completed successfully!');
      return extractedData;
      
    } catch (error) {
      console.error('❌ PDF processing error:', error);
      
      // Provide more specific error messages
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      if (errorMessage.includes('worker')) {
        throw new Error('PDF.js worker failed to load. Please refresh the page and try again.');
      } else if (errorMessage.includes('Invalid PDF')) {
        throw new Error('The file is not a valid PDF. Please ensure it\'s not corrupted.');
      } else if (errorMessage.includes('password')) {
        throw new Error('The PDF is password protected. Please remove the password and try again.');
      } else {
        throw new Error(`Failed to process PDF: ${errorMessage}`);
      }
    }
  }

  private static async performOCROnPDF(pdf: any): Promise<string> {
    let fullText = '';
    const numPages = pdf.numPages;
    
    console.log(`🚀 Starting optimized Tesseract OCR on ${numPages} pages...`);
    
    try {
      // Convert all PDF pages to images first
      const imageBlobs = [];
      
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        
        // Use optimized scale for balance of speed and accuracy
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        console.log(`📄 Rendering page ${pageNum}/${numPages} for OCR...`);
        
        await page.render({ canvasContext: context, viewport }).promise;
        
        // Convert canvas to blob
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => resolve(blob!), 'image/png');
        });
        
        imageBlobs.push(blob);
      }
      
      console.log(`🚀 Running optimized parallel OCR on ${imageBlobs.length} pages...`);
      
      // Process images in parallel with optimized Tesseract settings
      const ocrPromises = imageBlobs.map((blob, index) => 
        Tesseract.recognize(blob, 'eng', {
          logger: (m) => {
            if (m.status === 'recognizing text' && index === 0) {
              // Only show progress for first page to avoid spam
              if (Math.floor(m.progress * 100) % 25 === 0) {
                console.log(`🔍 OCR progress: ${Math.floor(m.progress * 100)}%`);
              }
            }
          }
        }).then(result => result.data.text)
      );
      
      const startTime = Date.now();
      const ocrResults = await Promise.all(ocrPromises);
      const endTime = Date.now();
      
      fullText = ocrResults.join('\n');
      
      console.log(`✅ Optimized Tesseract OCR completed in ${endTime - startTime}ms`);
      console.log(`📝 Extracted ${fullText.length} characters`);
      
      return fullText;
      
    } catch (error) {
      console.error('❌ OCR failed:', error);
      console.log('⚠️ Falling back to no OCR (PDF text extraction only)');
      return '';
    }
  }
  
  private static async ocrPage(pdf: any, pageNum: number): Promise<string> {
    // This method is no longer needed with Scribe.js batch processing
    return '';
  }

  static async processImage(file: File, isSignedIn: boolean = false): Promise<ExtractedData> {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        throw new Error('Image processing is only available in the browser');
      }

      // Check authentication for image OCR
      console.log('🔐 Checking authentication for image OCR');
      console.log('🔐 Authentication status:', isSignedIn ? 'Signed In' : 'Not Signed In');
      
      if (!isSignedIn) {
        console.log('❌ Image OCR requires authentication but user is not signed in');
        console.log('⚠️ Returning minimal data - modal should have prevented this');
        // Return minimal data instead of throwing error
        return {
          transactions: [],
          userInfo: {
            name: '',
            accountNumber: '',
            bankName: '',
            statementPeriod: ''
          },
          summary: {
            totalCredits: 0,
            totalDebits: 0,
            netBalance: 0,
            transactionCount: 0
          }
        };
      }

      console.log('🚀 Using optimized Tesseract for image OCR...');
      
      // Use optimized Tesseract.js for OCR on images
      const startTime = Date.now();
      const result = await Tesseract.recognize(file, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text' && Math.floor(m.progress * 100) % 25 === 0) {
            console.log(`🔍 Image OCR progress: ${Math.floor(m.progress * 100)}%`);
          }
        }
      });
      const endTime = Date.now();
      
      console.log(`✅ Optimized image OCR completed in ${endTime - startTime}ms`);
      console.log(`📝 Extracted ${result.data.text.length} characters`);
      
      const extractedData = this.extractDataFromText(result.data.text);
      
      return extractedData;
      
    } catch (error) {
      console.error('❌ Image processing error:', error);
      throw new Error(`Failed to process image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private static extractDataFromText(text: string): ExtractedData {
    console.log('🔍 Extracting data from text...');
    
    // First try US Bank specific extraction
    if (text.toLowerCase().includes('us bank') || text.toLowerCase().includes('u.s. bank')) {
      console.log('🏦 US Bank format detected, using specific patterns...');
      
      const userInfo = extractUSBankUserInfo(text);
      const transactions = extractUSBankTransactions(text);
      
      // Type assertion to ensure transactions match TransactionData interface
      const typedTransactions: TransactionData[] = transactions.map(t => ({
        ...t,
        type: t.type as 'credit' | 'debit'
      }));
      
      // Calculate summary
      let runningBalance = 0;
      const summary = {
        totalCredits: 0,
        totalDebits: 0,
        netBalance: 0,
        transactionCount: 0
      };
      
      typedTransactions.forEach(transaction => {
        runningBalance += transaction.amount;
        transaction.balance = runningBalance;
        
        if (transaction.amount > 0) {
          summary.totalCredits += transaction.amount;
        } else {
          summary.totalDebits += transaction.amount;
        }
      });
      
      summary.netBalance = summary.totalCredits + summary.totalDebits;
      summary.transactionCount = typedTransactions.length;
      
      console.log(`📊 US Bank extraction complete: ${typedTransactions.length} transactions, $${summary.netBalance.toFixed(2)} net balance`);
      
      return {
        userInfo,
        transactions: typedTransactions,
        summary
      };
    }
    
    // Fallback to generic extraction (original logic)
    console.log('🏛️ Using generic extraction patterns...');
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    
    // Extract user information
    const userInfo = this.extractUserInfo(text);
    
    // Extract transactions
    const transactions = this.extractTransactions(lines);
    
    // Calculate summary
    const summary = this.calculateSummary(transactions);
    
    return {
      userInfo,
      transactions,
      summary
    };
  }

  private static extractUserInfo(text: string): ExtractedData['userInfo'] {
    const userInfo: ExtractedData['userInfo'] = {
      name: '',
      accountNumber: '',
      bankName: '',
      statementPeriod: ''
    };
    
    // Generic patterns for other banks
    const namePatterns = [
      /(?:name|account holder|customer)[:\s]+([A-Za-z\s]+?)(?:\n|$)/i,
      /^([A-Za-z\s]+?)(?:\n\s*(?:account|statement|date))/i,
    ];
    
    for (const pattern of namePatterns) {
      const match = text.match(pattern);
      if (match) {
        userInfo.name = match[1].trim();
        break;
      }
    }

    const accountPatterns = [
      /account\s*number[:\s]+(\*{4,}\d{4})/i,
      /account[:\s]+(\*{4,}\d{4})/i,
    ];
    
    for (const pattern of accountPatterns) {
      const match = text.match(pattern);
      if (match) {
        userInfo.accountNumber = match[1].trim();
        break;
      }
    }

    // Extract bank name
    const bankNames = ['chase', 'bank of america', 'wells fargo', 'citibank', 'capital one'];
    for (const bank of bankNames) {
      if (text.toLowerCase().includes(bank)) {
        userInfo.bankName = bank.charAt(0).toUpperCase() + bank.slice(1);
        break;
      }
    }

    // Extract statement period
    const periodPatterns = [
      /(?:statement period|period)[:\s]+([A-Za-z]+\s\d{1,2}\s*[-–to]*\s*[A-Za-z]+\s\d{1,2},?\s\d{4})/i,
      /(\d{1,2}[/\-]\d{1,2}[/\-]\d{2,4})\s*[-–to]+\s*(\d{1,2}[/\-]\d{1,2}[/\-]\d{2,4})/i,
    ];
    
    for (const pattern of periodPatterns) {
      const match = text.match(pattern);
      if (match) {
        if (match[1] && match[2]) {
          userInfo.statementPeriod = `${match[1]} - ${match[2]}`;
        } else if (match[1]) {
          userInfo.statementPeriod = match[1];
        }
        break;
      }
    }
    
    return userInfo;
  }

  private static extractTransactions(lines: string[]): TransactionData[] {
    const transactions: TransactionData[] = [];
    
    // Generic transaction patterns
    const transactionPatterns = [
      /^(\d{1,2}\/\d{1,2}\/\d{2,4})\s+(.+?)\s+(-?\$?\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s+(-?\$?\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*(credit|debit)?$/i,
      /^(\d{1,2}\/\d{1,2}\/\d{2,4})\s+(.+?)\s+(-?\$?\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*(credit|debit)?$/i,
    ];

    for (const line of lines) {
      if (line.length < 10) continue;
      
      for (const pattern of transactionPatterns) {
        const match = line.match(pattern);
        if (match) {
          try {
            let date = match[1];
            let description = match[2];
            let amountStr = match[3];
            let balanceStr = match[4] || '';
            let explicitType = match[5] || '';
            
            let amount = parseFloat(amountStr.replace(/[$,]/g, ''));
            let balance = balanceStr ? parseFloat(balanceStr.replace(/[$,]/g, '')) : 0;
            
            let type: 'credit' | 'debit';
            if (explicitType) {
              type = explicitType.toLowerCase() === 'credit' ? 'credit' : 'debit';
            } else {
              type = amount >= 0 ? 'credit' : 'debit';
            }
            
            const transaction: TransactionData = {
              date: this.normalizeDate(date),
              description: description.trim(),
              amount: amount,
              balance: balance,
              type: type
            };
            
            transactions.push(transaction);
            break;
          } catch (error) {
            console.log('⚠️ Failed to parse transaction:', line);
          }
        }
      }
    }
    
    return transactions;
  }

  private static calculateSummary(transactions: TransactionData[]) {
    const summary = {
      totalCredits: 0,
      totalDebits: 0,
      netBalance: 0,
      transactionCount: 0
    };
    
    summary.totalCredits = transactions
      .filter(t => t.type === 'credit')
      .reduce((sum, t) => sum + t.amount, 0);
    
    summary.totalDebits = transactions
      .filter(t => t.type === 'debit')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    summary.netBalance = summary.totalCredits - summary.totalDebits;
    summary.transactionCount = transactions.length;
    
    return summary;
  }

  private static normalizeDate(dateStr: string): string {
    // Try various date formats
    const patterns = [
      /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/,
      /(\d{4})-(\d{2})-(\d{2})/,
    ];
    
    for (const pattern of patterns) {
      const match = dateStr.match(pattern);
      if (match) {
        let [, month, day, year] = match;
        if (year.length === 2) year = '20' + year;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
    }
    
    return dateStr;
  }
}
