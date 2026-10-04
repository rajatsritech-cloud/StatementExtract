"use client";

import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { X, FileText, Image, Lock } from "lucide-react";

interface OCRAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileType: 'pdf' | 'image';
}

export const OCRAuthModal = ({ isOpen, onClose, fileType }: OCRAuthModalProps) => {
  if (!isOpen) return null;

  const isImageFile = fileType === 'image';
  const title = isImageFile ? 'Image File Processing' : 'Processing Required';
  const description = isImageFile
    ? 'Image files require intelligent processing to extract text and transactions.'
    : 'This PDF appears to be image-based and requires intelligent processing to extract text.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 max-w-md rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10">
              {isImageFile ? (
                <Image className="h-6 w-6 text-[hsl(var(--primary))]" />
              ) : (
                <FileText className="h-6 w-6 text-[hsl(var(--primary))]" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                {title}
              </h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Free account required
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6 space-y-4">
          <div className="rounded-lg bg-[hsl(var(--muted))]/50 p-4">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-[hsl(var(--primary))] mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-sm text-[hsl(var(--foreground))]">
                  {description}
                </p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Create a free account to unlock intelligent processing and extract data from your files.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />
              <span>Free account - no credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />
              <span>Fast and accurate intelligent processing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />
              <span>Supports all image and PDF formats</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
          >
            Cancel
          </button>
          <div className="flex gap-2">
            <SignInButton mode="modal">
              <button className="rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))/90] transition-colors">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </div>
      </div>
    </div>
  );
};
