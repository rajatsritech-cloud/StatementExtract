"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { UploadArea } from "@/components/bank-statement/UploadArea";
import { FileText, Upload } from "lucide-react";
import { ResultsModal } from "@/components/bank-statement/ResultsModal";
import { InvoiceResultsModal } from "@/components/invoice/InvoiceResultsModal";

import { toast } from "react-hot-toast";
import { ExtractedData } from "@/lib/pdfProcessor";
import { ExportService } from "@/lib/exportService";
import { useAuth } from "@clerk/clerk-react";

interface BankStatementConverterProps {
  titleSuffix?: React.ReactNode;
  description?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode; // Alias for description for cleaner API
  endpoint?: string;
  mode?: 'bank-statement' | 'invoice';
}

export const BankStatementConverter = ({
  titleSuffix = <span className="bg-gradient-primary bg-clip-text text-transparent"> Excel or CSV</span>,
  description = "World's most trusted Intelligent Document Processing bank statement converter, working with thousands of banks globally. Automatically extract transactions, balances, and references into clean Excel or CSV files with industry-leading accuracy.",
  title,
  subtitle,
  endpoint,
  mode = 'bank-statement'
}: BankStatementConverterProps) => {
  // Trigger HMR update
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadKey, setUploadKey] = useState(0);
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const processingRef = useRef(false);

  const handleFileUpload = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    console.log('🚀 Starting file upload...');
    console.log(`📁 File: ${file.name}`);
    console.log(`📏 Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📄 Type: ${file.type}`);

    // Wait for auth to load
    if (!isLoaded) {
      console.log('⏳ Waiting for auth to load...');
      toast.error('Please wait, loading authentication...');
      return;
    }

    console.log('🔐 Auth loaded:', isLoaded);
    console.log('🔐 Is signed in:', isSignedIn);

    // Set the selected file for PDF viewer
    setSelectedFile(file);

    // File validation
    if (file.size > 10 * 1024 * 1024) {
      console.log('❌ File too large');
      toast.error("File too large. Please upload a statement smaller than 10MB.");
      return;
    }

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      console.log('❌ Invalid file type');
      toast.error("Please upload a PDF, JPG, or PNG file.");
      return;
    }

    console.log('✅ File validation passed');

    // Prevent double-submission (React Strict Mode / Fast clicks)
    if (processingRef.current) return;
    processingRef.current = true;

    setIsProcessing(true);
    setExtractedData(null); // Clear previous data
    setShowResults(true); // Show modal immediately
    setProcessingProgress(0);

    // Reset UploadArea UI by changing its key
    setUploadKey(prev => prev + 1);

    toast(mode === 'invoice' ? "Processing your invoice..." : "Processing your bank statement...", {
      icon: '⏳',
      duration: 4000,
    });

    try {
      console.log('🔄 Starting processing...');
      // Simulate processing progress with "fast start, slow finish" logic
      const progressInterval = setInterval(() => {
        setProcessingProgress(prev => {
          // Fast initial progress (uploading/analyzing)
          if (prev < 30) return prev + 10;
          // Steady progress (OCR/Extraction)
          if (prev < 60) return prev + 5;
          // Slow progress (Validation/AI) - prevents "hanging" feeling at 90%
          if (prev < 90) return prev + 2;
          // Cap at 90% until actual completion
          return 90;
        });
      }, 800);

      let extracted: ExtractedData;
      try {
        const { PDFProcessor } = await import("@/lib/pdfProcessor");
        console.log('📖 Processing file with backend API...');
        let token = await getToken();

        try {
          extracted = await PDFProcessor.processPDF(file, isSignedIn, token, endpoint);
        } catch (err: any) {
          // Retry on token expiration (401)
          if (err.message && (err.message.includes("Token has expired") || err.message.includes("401"))) {
            console.log("🔄 Token expired, refreshing and retrying...");
            token = await getToken(); // Fetch fresh token
            extracted = await PDFProcessor.processPDF(file, isSignedIn, token, endpoint);
          } else {
            throw err;
          }
        }
      } catch (error: any) {
        console.log('❌ Processing error:', error.message);
        throw error;
      }

      clearInterval(progressInterval);
      setProcessingProgress(100);

      console.log('✅ Extraction successful!');
      if (extracted.transactions) {
        console.log(`📊 Found ${extracted.transactions.length} transactions`);
      }
      console.log(`👤 User: ${extracted.userInfo.name || 'Unknown'}`);
      console.log(`🏦 Bank: ${extracted.userInfo.bankName || 'Unknown'}`);
      console.log('📋 Full extracted data:', extracted);

      console.log('🔄 Updating UI state...');
      setTimeout(() => {
        console.log('📊 Setting extracted data...');
        setExtractedData(extracted);
        console.log('⏹️ Stopping processing...');
        console.log('⏹️ Stopping processing...');
        setIsProcessing(false);
        processingRef.current = false;
        console.log('👁️ Showing results modal...');
        setShowResults(true);
        console.log('🎉 Success toast...');
        toast.success(`Successfully processed!`);
      }, 500);

    } catch (error) {
      console.error('❌ Processing error:', error);
      setIsProcessing(false);
      processingRef.current = false;

      // Don't show any error message for OCR authentication - it's handled by the modal
      if (error instanceof Error && error.message.includes('OCR processing requires a free account')) {
        setSelectedFile(null);
        return;
      }

      let errorMessage = "Failed to process the file. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      // Special handling for high traffic / capacity errors
      const isCapacityError =
        errorMessage.includes("503") ||
        errorMessage.includes("capacity") ||
        errorMessage.includes("overload") ||
        errorMessage.includes("high traffic");

      if (isCapacityError) {
        errorMessage = "We're experiencing high traffic on our free tier model. Please try again in a few minutes.";
      }

      // Create empty result to show UI
      const failedResult: ExtractedData = {
        transactions: [],
        userInfo: {
          name: "Extraction Failed",
          bankName: "Unknown",
          accountNumber: "N/A",
          statementPeriod: "N/A",
          currency: "$"
        },
        validation_summary: {
          status: "FAILED",
          confidence: 0,
          issues: ["No transactions found", errorMessage],
          chain_integrity: 0
        },
        summary: {
          totalCredits: 0,
          totalDebits: 0,
          netBalance: 0,
          transactionCount: 0
        },
        llm_used: false,
        // Ensure invoiceData exists so modal opens in invoice mode
        invoiceData: {
          metadata: {
            invoiceNumber: "Error",
            vendorName: "Extraction Failed",
            totalAmount: 0
          },
          lineItems: []
        }
      };

      setExtractedData(failedResult);
      setShowResults(true);

      toast.error(errorMessage, {
        duration: 6000,
      });
    }
  }, [isSignedIn, isLoaded, getToken]);

  const handleTryAnother = () => {
    setShowResults(false);
    setExtractedData(null);
    setProcessingProgress(0);
  };

  const handleExport = (format: 'csv' | 'excel') => {
    if (!extractedData) return;

    try {
      if (format === 'csv') {
        ExportService.exportToCSV(extractedData);
      } else {
        ExportService.exportToExcel(extractedData);
      }
      toast.success(`Statement exported as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error(`Failed to export as ${format.toUpperCase()}`);
      console.error('Export error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <main className="relative overflow-hidden">
        {/* Floating SVG Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute top-20 left-10 w-32 h-32 text-[hsl(var(--primary))]/5 animate-float" style={{ animationDelay: '0s' }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M45.3,-57.3C57.9,-49.1,66.7,-33.5,70.4,-16.3C74.1,0.9,72.7,19.7,64.6,35.1C56.5,50.5,41.7,62.5,24.8,68.4C7.9,74.3,-11.1,74.1,-28.4,68.2C-45.7,62.3,-61.3,50.7,-69.5,35.2C-77.7,19.7,-78.5,0.3,-74.6,-17.6C-70.7,-35.5,-62.1,-51.9,-49.3,-60C-36.5,-68.1,-18.3,-67.9,-0.5,-67.2C17.2,-66.5,32.7,-65.5,45.3,-57.3Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute top-40 right-10 w-24 h-24 text-[hsl(var(--accent))]/5 animate-float" style={{ animationDelay: '1s' }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M41.3,-53.4C53.4,-43.7,62.7,-30.9,66.6,-16.4C70.5,-1.9,69,14.3,62.2,28.3C55.4,42.3,43.3,54.1,28.7,61.2C14.1,68.3,-3.1,70.7,-19.6,66.9C-36.1,63.1,-51.9,53.1,-61.3,38.9C-70.7,24.7,-73.7,6.3,-70.5,-10.3C-67.3,-26.9,-57.9,-41.7,-45.3,-51.2C-32.7,-60.7,-16.3,-64.9,-0.8,-63.8C14.7,-62.7,29.3,-63.1,41.3,-53.4Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute bottom-20 left-10 w-28 h-28 text-[hsl(var(--primary))]/5 animate-float" style={{ animationDelay: '2s' }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M37.3,-49.6C48.9,-40.3,59.3,-29.5,63.8,-16.2C68.3,-2.9,67,12.9,60.5,26.3C54,39.7,42.3,50.7,28.5,57.5C14.7,64.3,-1.2,67,-16.3,63.9C-31.4,60.8,-45.7,51.9,-55.4,39.3C-65.1,26.7,-70.2,10.4,-68.8,-5.4C-67.4,-21.2,-59.5,-36.5,-48.3,-45.5C-37.1,-54.5,-23.6,-57.2,-10.8,-57.7C2,-58.2,25.7,-58.9,37.3,-49.6Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-20 md:pt-25">
          {/* Two-column layout: Content left, Upload right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Hero Content */}
            <div className="text-left">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-5xl lg:text-6xl animate-slide-up">
                {title ? title : (
                  <>
                    Accurately Convert PDF Bank Statements to
                    {titleSuffix}
                  </>
                )}
              </h1>

              <p className="mb-8 max-w-xl text-lg text-[hsl(var(--muted-foreground))] animate-fade-in">
                {subtitle || description}
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-3 animate-fade-in">
                <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))]/10 px-4 py-2 text-sm font-medium text-[hsl(var(--primary))]">
                  ⚡ Fast
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--secondary))] px-4 py-2 text-sm font-medium text-[hsl(var(--secondary-foreground))]">
                  🔒 Secure
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-4 py-2 text-sm font-medium text-[hsl(var(--accent-foreground))]">
                  🎯 Industry-Leading Accuracy
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--muted))] px-4 py-2 text-sm font-medium text-[hsl(var(--muted-foreground))]">
                  👤 Free Account
                </span>
              </div>
            </div>

            {/* Right Column - Upload Area */}
            <div className="w-full">
              <UploadArea key={uploadKey} onFileUpload={handleFileUpload} isProcessing={isProcessing} showPrivacyNotice={false} showLoginPrompt={true} hideFeatures={true} />
            </div>
          </div>

          {/* Features Grid - Below the hero + upload row */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 mx-auto">
                <FileText className="h-6 w-6 text-[hsl(var(--primary))]" />
              </div>
              <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2">Intelligent Processing</h4>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Intelligent Document Processing built for bank statements: capture account holder details, IBANs, balances, and every transaction line from PDFs or images.
              </p>
            </div>

            <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--secondary))] mx-auto">
                <Upload className="h-6 w-6 text-[hsl(var(--secondary-foreground))]" />
              </div>
              <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2">Instant Processing</h4>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Process statements in seconds and instantly export structured data to Excel or CSV, or send it directly into your tools via API.
              </p>
            </div>

            <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--accent))] mx-auto">
                <FileText className="h-6 w-6 text-[hsl(var(--accent-foreground))]" />
              </div>
              <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2">Universal Format</h4>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Works with statements from thousands of banks worldwide, in any layout or language, whether PDF or scanned image.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Results Modal (Handles both processing and results) */}
      {showResults && (
        mode === 'invoice' ? (
          <InvoiceResultsModal
            data={extractedData}
            file={selectedFile}
            isProcessing={isProcessing}
            progress={processingProgress}
            onClose={() => setShowResults(false)}
            onTryAnother={handleTryAnother}
          />
        ) : (
          <ResultsModal
            data={extractedData}
            file={selectedFile}
            isProcessing={isProcessing}
            progress={processingProgress}
            onClose={() => setShowResults(false)}
            onTryAnother={handleTryAnother}
            onExport={handleExport}
          />
        )
      )}
    </div>
  );
};
