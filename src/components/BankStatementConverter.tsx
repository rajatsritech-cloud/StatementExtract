"use client";

import { useState, useCallback } from "react";
import { UploadArea } from "@/components/bank-statement/UploadArea";
import { ProcessingModal } from "@/components/bank-statement/ProcessingModal";
import { ResultsModal } from "@/components/bank-statement/ResultsModal";

import { toast } from "react-hot-toast";
import { ExtractedData } from "@/lib/pdfProcessor";
import { ExportService } from "@/lib/exportService";
import { useAuth } from "@clerk/nextjs";

export const BankStatementConverter = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { isSignedIn, isLoaded } = useAuth();

  const handleFileUpload = useCallback(async (file: File) => {
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
    if (file.size > 15 * 1024 * 1024) {
      console.log('❌ File too large');
      toast.error("File too large. Please upload a statement smaller than 15MB.");
      return;
    }

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      console.log('❌ Invalid file type');
      toast.error("Please upload a PDF, JPG, or PNG file.");
      return;
    }

    console.log('✅ File validation passed');
    setIsProcessing(true);
    setProcessingProgress(0);
    setSelectedFile(null); // Clear file from upload area immediately
    toast("Processing your bank statement...", {
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
        extracted = await PDFProcessor.processPDF(file, isSignedIn);
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
        setIsProcessing(false);
        console.log('👁️ Showing results modal...');
        setShowResults(true);
        console.log('🎉 Success toast...');
        toast.success(`Successfully processed!`);
      }, 500);

    } catch (error) {
      console.error('❌ Processing error:', error);
      setIsProcessing(false);
      setSelectedFile(null); // Clear the selected file on error

      // Don't show any error message for OCR authentication - it's handled by the modal
      if (error instanceof Error && error.message.includes('OCR processing requires a free account')) {
        return; // Silent fail - modal handles the user communication
      }

      let errorMessage = "Failed to process the file. Please try again.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        duration: 5000,
      });
    }
  }, [isSignedIn, isLoaded]);

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
          <svg className="absolute top-40 right-20 w-24 h-24 text-[hsl(var(--accent))]/5 animate-float" style={{ animationDelay: '1s' }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M41.3,-53.4C53.4,-43.7,62.7,-30.9,66.6,-16.4C70.5,-1.9,69,14.3,62.2,28.3C55.4,42.3,43.3,54.1,28.7,61.2C14.1,68.3,-3.1,70.7,-19.6,66.9C-36.1,63.1,-51.9,53.1,-61.3,38.9C-70.7,24.7,-73.7,6.3,-70.5,-10.3C-67.3,-26.9,-57.9,-41.7,-45.3,-51.2C-32.7,-60.7,-16.3,-64.9,-0.8,-63.8C14.7,-62.7,29.3,-63.1,41.3,-53.4Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute bottom-20 left-1/4 w-28 h-28 text-[hsl(var(--primary))]/5 animate-float" style={{ animationDelay: '2s' }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M37.3,-49.6C48.9,-40.3,59.3,-29.5,63.8,-16.2C68.3,-2.9,67,12.9,60.5,26.3C54,39.7,42.3,50.7,28.5,57.5C14.7,64.3,-1.2,67,-16.3,63.9C-31.4,60.8,-45.7,51.9,-55.4,39.3C-65.1,26.7,-70.2,10.4,-68.8,-5.4C-67.4,-21.2,-59.5,-36.5,-48.3,-45.5C-37.1,-54.5,-23.6,-57.2,-10.8,-57.7C2,-58.2,25.7,-58.9,37.3,-49.6Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-32">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-7xl animate-slide-up">
              Accurately Convert PDF Bank Statements to
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Excel or CSV</span>
            </h1>

            <p className="mx-auto mb-10 max-w-3xl text-xl text-[hsl(var(--muted-foreground))] animate-fade-in">
              World's most trusted OCR + AI bank statement converter, working with thousands of banks globally.
              Automatically extract transactions, balances, and references into clean Excel or CSV files with 99.9% accuracy.
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in">
              <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))]/10 px-4 py-2 text-sm font-medium text-[hsl(var(--primary))]">
                ⚡ Fast
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--secondary))] px-4 py-2 text-sm font-medium text-[hsl(var(--secondary-foreground))]">
                🔒 Secure
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-4 py-2 text-sm font-medium text-[hsl(var(--accent-foreground))]">
                🎯 99.9% Accurate
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--muted))] px-4 py-2 text-sm font-medium text-[hsl(var(--muted-foreground))]">
                👤 Free Account
              </span>
            </div>
          </div>

          {/* Upload Area */}
          <div className="mx-auto max-w-2xl">
            <UploadArea onFileUpload={handleFileUpload} isProcessing={isProcessing} />
          </div>
        </div>
      </main>

      {/* Processing Modal */}
      {isProcessing && (
        <ProcessingModal progress={processingProgress} />
      )}

      {/* Results Modal */}
      {showResults && extractedData && (
        <ResultsModal
          data={extractedData}
          file={selectedFile}
          onClose={() => setShowResults(false)}
          onTryAnother={handleTryAnother}
          onExport={handleExport}
        />
      )}
    </div>
  );
};
