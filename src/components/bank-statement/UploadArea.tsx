"use client";

import { useCallback, useState } from "react";
import { Upload, FileText, Image, X } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { OCRAuthModal } from "./OCRAuthModal";

interface UploadAreaProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
}

export const UploadArea = ({ onFileUpload, isProcessing }: UploadAreaProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showOCRAuthModal, setShowOCRAuthModal] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const { isSignedIn, isLoaded } = useAuth();

  const checkAuthenticationForOCR = async (file: File): Promise<boolean> => {
    // Wait for auth to load
    if (!isLoaded) {
      console.log('⏳ Waiting for auth to load...');
      return false;
    }
    
    console.log('🔐 Checking authentication for file:', file.name);
    console.log('🔐 Auth loaded:', isLoaded);
    console.log('🔐 Current auth status:', isSignedIn ? 'Signed In' : 'Not Signed In');
    console.log('🔐 File type:', file.type);
    
    // Image files ALWAYS need OCR - require authentication
    const isImageFile = file.type === 'image/jpeg' || file.type === 'image/png';
    
    if (isImageFile) {
      console.log('📸 Image file detected');
      if (!isSignedIn) {
        console.log('❌ Not signed in - showing modal');
        setPendingFile(file);
        setShowOCRAuthModal(true);
        return false;
      }
      console.log('✅ Signed in - allowing image upload');
      return true;
    }
    
    // For PDFs, check if they have text content or will need OCR
    if (file.type === 'application/pdf') {
      console.log('📄 PDF file detected');
      
      if (!isSignedIn) {
        console.log('⚠️ Not signed in - checking if PDF has text');
        try {
          // Dynamically import pdfjs-dist to avoid SSR issues
          const pdfjsLib = await import('pdfjs-dist');
          
          // Configure worker
          if (typeof window !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@5.4.394/legacy/build/pdf.worker.min.mjs';
          }
          
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          
          // Try to extract text from first page
          let hasText = false;
          if (pdf.numPages > 0) {
            const page = await pdf.getPage(1);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => item.str).join(' ');
            hasText = pageText.trim().length > 50;
            console.log('📝 PDF text length:', pageText.trim().length);
          }
          
          // If PDF has no text, it will need OCR - require authentication
          if (!hasText) {
            console.log('❌ PDF has no text (needs OCR) and user not signed in - showing modal');
            setPendingFile(file);
            setShowOCRAuthModal(true);
            return false;
          }
          
          console.log('✅ PDF has text (no OCR needed) - allowing upload without sign in');
          return true;
        } catch (error) {
          console.log('⚠️ Error checking PDF text content:', error);
          // If we can't check, assume it needs OCR and show modal
          console.log('❌ Cannot verify PDF content - showing modal to be safe');
          setPendingFile(file);
          setShowOCRAuthModal(true);
          return false;
        }
      }
      
      console.log('✅ Signed in - allowing PDF upload');
      return true;
    }
    
    console.log('✅ Other file type - allowing upload');
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
    if (files.length > 0) {
      const file = files[0];
      console.log('📄 First file:', file.name);
      
      // Check authentication for OCR before setting file or calling onFileUpload
      const canProceed = await checkAuthenticationForOCR(file);
      if (!canProceed) {
        console.log('🔐 Authentication required, showing modal');
        return;
      }
      
      setSelectedFile(file);
      console.log('✅ File selected, calling onFileUpload');
      onFileUpload(file);
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
      
      // Check authentication for OCR before setting file or calling onFileUpload
      const canProceed = await checkAuthenticationForOCR(file);
      if (!canProceed) {
        // Clear the file input
        e.target.value = '';
        return; // Don't set the file or call onFileUpload if auth fails
      }
      
      setSelectedFile(file);
      console.log('🔄 Calling onFileUpload...');
      onFileUpload(file);
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

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
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
        <div className="mb-6 flex justify-center">
          <div className={`
            flex h-20 w-20 items-center justify-center rounded-full 
            ${isDragOver ? 'bg-[hsl(var(--primary))] text-white' : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]'}
            transition-colors duration-300
          `}>
            {isProcessing ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--primary))]" />
            ) : (
              <Upload className="h-8 w-8" />
            )}
          </div>
        </div>

        {/* Upload Text */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-2">
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
                  <p className="font-medium text-[hsl(var(--foreground))]">{selectedFile.name}</p>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
              >
                <X className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              </button>
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
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-button bg-200% px-6 py-3 text-[hsl(var(--primary-foreground))] font-medium shadow-glow hover:animate-gradient-shift transition-all duration-300"
          >
            <Upload className="h-4 w-4" />
            Choose File
          </button>
        )}

        {/* Size Limit Notice */}
        <p className="mt-4 text-xs text-[hsl(var(--muted-foreground))]">
          Maximum file size: 15MB
        </p>
      </div>

      {/* Features Grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 mx-auto">
            <FileText className="h-6 w-6 text-[hsl(var(--primary))]" />
          </div>
          <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2">Smart OCR</h4>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            OCR + AI built for bank statements: capture account holder details, IBANs, balances, and every transaction line from PDFs or images.
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
      
      {/* OCR Authentication Modal */}
      <OCRAuthModal
        isOpen={showOCRAuthModal}
        onClose={handleModalClose}
        fileType={pendingFile?.type === 'image/jpeg' || pendingFile?.type === 'image/png' ? 'image' : 'pdf'}
      />
    </div>
  );
};
