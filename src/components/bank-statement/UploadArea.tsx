"use client";

import { useCallback, useState, useEffect } from "react";
import { Upload, FileText, Image, X, Sparkles } from "lucide-react";
import { useAuth, SignInButton } from "@clerk/clerk-react";
import Link from "next/link";
import { OCRAuthModal } from "./OCRAuthModal";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "react-hot-toast";
import { useUsage } from "@/hooks/useUsage";

// Import pdf-lib
import { PDFDocument } from 'pdf-lib';

interface UploadAreaProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
  hideFeatures?: boolean;
  manualTrigger?: boolean;
  minimal?: boolean;
  showPrivacyNotice?: boolean;
  showLoginPrompt?: boolean;
}

export const UploadArea = ({ onFileUpload, isProcessing, hideFeatures = false, manualTrigger = false, minimal = false, showPrivacyNotice = true, showLoginPrompt = false }: UploadAreaProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'ready'>('idle');
  const [showOCRAuthModal, setShowOCRAuthModal] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const { usage, refreshUsage } = useUsage();

  const countPdfPages = async (file: File): Promise<number> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      // Load the PDF document
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      // Get the number of pages
      return pdfDoc.getPageCount();
    } catch (error) {
      console.error("Error counting PDF pages:", error);
      return 0;
    }
  };

  const checkLimits = async (file: File): Promise<boolean> => {
    if (isSignedIn) return true; // Logged-in users have different limits (enforced by backend)

    // 1. Check Page Count of Current File
    if (file.type === 'application/pdf') {
      const pageCount = await countPdfPages(file);
      if (pageCount > 5) {
        toast.error(
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Limit Exceeded</span>
            <span>Free uploads are limited to 5 pages per document.</span>
          </div>,
          { duration: 5000 }
        );
        return false;
      }

      // 2. Check Backend Usage (Daily Limit)
      // Use cached usage data if available
      if (usage) {
        if (usage.remaining < pageCount) {
          toast.error(
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Daily Limit Exceeded</span>
              <span>You have {usage.remaining} pages remaining today. This file has {pageCount} pages.</span>
              <span className="text-xs mt-1">Login for higher limits!</span>
            </div>,
            { duration: 6000 }
          );
          return false;
        }
      } else {
        // Fallback if usage not loaded yet (should be rare as hook loads on mount)
        // We could block or allow. Let's allow but NOT trigger refresh here to avoid premature updates.
        // refreshUsage();
      }
    }
    return true;
  };

  const checkAuthenticationForOCR = async (file: File): Promise<boolean> => {
    // Wait for auth to load
    if (!isLoaded) {
      console.log('⏳ Waiting for auth to load...');
      return false;
    }

    console.log('🔐 Checking authentication for file:', file.name);

    // For now, we just allow upload as we are moving to backend processing
    // and removing client-side checks that relied on pdfjs-dist
    return true;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    console.log('📁 Dropped files:', files.length);

    if (files.length > 1 && !isSignedIn) {
      toast.error("Free users can only upload 1 file at a time.");
      return;
    }

    if (files.length > 0) {
      const file = files[0];
      console.log('📄 First file:', file.name);

      // Check limits first
      if (!(await checkLimits(file))) {
        return;
      }

      // Check authentication for OCR before setting file or calling onFileUpload
      const canProceed = await checkAuthenticationForOCR(file);
      if (!canProceed) {
        console.log('🔐 Authentication required, showing modal');
        return;
      }

      setSelectedFile(file);

      if (manualTrigger) {
        setUploadStatus('uploading');
        // Simulate upload delay
        setTimeout(() => {
          setUploadStatus('ready');
        }, 1500);
      } else {
        console.log('✅ File selected, calling onFileUpload');
        onFileUpload(file);
      }
    } else {
      console.log('❌ No files in drop');
    }
  }, [onFileUpload, isSignedIn]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('📁 File select triggered');
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log('📄 File selected:', file.name);
      console.log('📏 File size:', file.size);
      console.log('📋 File type:', file.type);

      // Check limits first
      if (!(await checkLimits(file))) {
        e.target.value = ''; // Clear input
        return;
      }

      // Check authentication for OCR before setting file or calling onFileUpload
      const canProceed = await checkAuthenticationForOCR(file);
      if (!canProceed) {
        // Clear the file input
        e.target.value = '';
        return; // Don't set the file or call onFileUpload if auth fails
      }

      setSelectedFile(file);

      if (manualTrigger) {
        setUploadStatus('uploading');
        // Simulate upload delay
        setTimeout(() => {
          setUploadStatus('ready');
        }, 1500);
      } else {
        console.log('🔄 Calling onFileUpload...');
        onFileUpload(file);
      }
    } else {
      console.log('❌ No files selected');
    }
  }, [onFileUpload, isSignedIn]);

  const handleModalClose = () => {
    setShowOCRAuthModal(false);
    setPendingFile(null);
    // Clear any selected file
    setSelectedFile(null);
  };

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (minimal) {
    return (
      <div className="w-full">
        <input
          id="file-input-minimal"
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          disabled={isProcessing}
        />

        <div className="flex items-center gap-4">
          <button
            onClick={() => !isProcessing && document.getElementById('file-input-minimal')?.click()}
            disabled={isProcessing}
            className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-white hover:bg-[hsl(var(--primary))]/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {isProcessing ? 'Processing...' : 'Upload Document'}
          </button>

          {/* Show selected file name if any (though usually it processes immediately) */}
          {selectedFile && !isProcessing && (
            <span className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {selectedFile.name}
            </span>
          )}
        </div>

        <OCRAuthModal
          isOpen={showOCRAuthModal}
          onClose={handleModalClose}
          fileType={pendingFile?.type === 'image/jpeg' || pendingFile?.type === 'image/png' ? 'image' : 'pdf'}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Privacy Notice - Moved above dropzone */}

      {/* Login Prompt - Moved above dropzone */}
      {showLoginPrompt && !isSignedIn && (
        <Alert className="mb-8 max-w-2xl mx-auto bg-[hsl(var(--accent))]/5 border-[hsl(var(--accent))]/20 p-6">
          <Sparkles className="h-6 w-6 top-6 text-[hsl(var(--accent))]" />
          <AlertTitle className="text-lg mb-2 text-[hsl(var(--foreground))]">Unlock Advanced Features</AlertTitle>
          <AlertDescription className="text-base text-[hsl(var(--muted-foreground))]">
            <SignInButton mode="modal">
              <span className="text-[hsl(var(--accent))] hover:underline font-medium cursor-pointer">Login</span>
            </SignInButton> to see your dashboard with advanced features and extended limits.
          </AlertDescription>
        </Alert>
      )}

      <div
        className={`
          relative border-2 border-dashed rounded-2xl ${hideFeatures ? 'p-6' : 'p-12'} text-center transition-all duration-300
          ${isDragOver
            ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5 scale-[1.02]'
            : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-[hsl(var(--primary))]/50'
          }
          ${isProcessing ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isProcessing && document.getElementById('file-input')?.click()}
      >
        {/* Hidden file input */}
        <input
          id="file-input"
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          disabled={isProcessing}
        />

        {/* Upload Icon */}
        <div className={`${hideFeatures ? 'mb-3' : 'mb-6'} flex justify-center`}>
          <div className={`
            flex ${hideFeatures ? 'h-12 w-12' : 'h-20 w-20'} items-center justify-center rounded-full 
            ${isDragOver ? 'bg-[hsl(var(--primary))] text-white' : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]'}
            transition-colors duration-300
          `}>
            {isProcessing ? (
              <div className={`animate-spin rounded-full ${hideFeatures ? 'h-6 w-6' : 'h-8 w-8'} border-b-2 border-[hsl(var(--primary))]`} />
            ) : (
              <Upload className={`${hideFeatures ? 'h-6 w-6' : 'h-8 w-8'}`} />
            )}
          </div>
        </div>

        {/* Upload Text */}
        <div className={`${hideFeatures ? 'mb-2' : 'mb-4'}`}>
          <h3 className={`${hideFeatures ? 'text-base' : 'text-xl'} font-semibold text-[hsl(var(--foreground))] mb-1`}>
            {isProcessing ? 'Processing...' : 'Drop your bank statement here'}
          </h3>
          <p className="text-[hsl(var(--muted-foreground))]">
            {isProcessing
              ? 'Please wait while we extract your data'
              : 'or click to browse from your computer'
            }
          </p>
        </div>

        {/* File Types */}
        {!isProcessing && (
          <div className="flex justify-center gap-4 text-sm text-[hsl(var(--muted-foreground))]">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>PDF</span>
            </div>
            <div className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span>JPG</span>
            </div>
            <div className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span>PNG</span>
            </div>
          </div>
        )}

        {/* File Info */}
        {selectedFile && !isProcessing && (
          <div className="mt-6 p-4 bg-[hsl(var(--muted))]/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
                  <FileText className="h-5 w-5 text-[hsl(var(--primary))]" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-[hsl(var(--foreground))]" data-clarity-mask="true">{selectedFile.name}</p>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">{formatFileSize(selectedFile.size)}</p>
                  {manualTrigger && uploadStatus === 'uploading' && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-1 w-16 bg-[hsl(var(--muted))] rounded-full overflow-hidden">
                        <div className="h-full bg-[hsl(var(--primary))] animate-progress origin-left" />
                      </div>
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">Uploading...</span>
                    </div>
                  )}
                </div>
              </div>

              {manualTrigger && uploadStatus === 'ready' ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileUpload(selectedFile);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-[hsl(var(--primary))] rounded-lg hover:bg-[hsl(var(--primary))]/90 transition-colors shadow-sm"
                >
                  Convert
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                >
                  <X className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Upload Button */}
        {!isProcessing && !selectedFile && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById('file-input')?.click();
            }}
            className={`${hideFeatures ? 'mt-4 px-4 py-2 text-sm' : 'mt-8 px-6 py-3'} inline-flex items-center gap-2 rounded-lg bg-gradient-button bg-200% text-[hsl(var(--primary-foreground))] font-medium shadow-glow hover:animate-gradient-shift transition-all duration-300`}
          >
            <Upload className="h-4 w-4" />
            Choose File
          </button>
        )}

        {/* Size Limit Notice */}
        <p className="mt-4 text-xs text-[hsl(var(--muted-foreground))]">
          {isSignedIn ? 'Daily limit: 10 pages' : 'Free tier daily limit: 1 PDF (max 5 pages)'}
        </p>
      </div>

      {/* Features Grid */}
      {!hideFeatures && (
        <div className="mt-12 grid gap-6 md:grid-cols-3">
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
      )}

      {/* OCR Authentication Modal */}
      <OCRAuthModal
        isOpen={showOCRAuthModal}
        onClose={handleModalClose}
        fileType={pendingFile?.type === 'image/jpeg' || pendingFile?.type === 'image/png' ? 'image' : 'pdf'}
      />
    </div>
  );
};
