"use client";

import { X } from "lucide-react";

interface ProcessingModalProps {
  progress: number;
}

export const ProcessingModal = ({ progress }: ProcessingModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative mx-auto max-w-md w-full mx-4">
        <div className="relative overflow-hidden rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-2xl animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[hsl(var(--border))]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[hsl(var(--primary))]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">Processing Statement</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Upload in Progress...</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[hsl(var(--foreground))]">Extracting data</span>
                <span className="text-sm text-[hsl(var(--muted-foreground))]">{progress}%</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-[hsl(var(--muted))]">
                <div 
                  className="absolute h-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Processing Steps */}
            <div className="space-y-3">
              <div className={`flex items-center gap-3 ${progress >= 25 ? 'text-[hsl(var(--foreground))]' : 'text-[hsl(var(--muted-foreground))]'}`}>
                <div className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${progress >= 25 ? 'bg-[hsl(var(--primary))] text-white' : 'bg-[hsl(var(--muted))]'}`}>
                  {progress >= 25 ? '✓' : '1'}
                </div>
                <span className="text-sm">Analyzing document format</span>
              </div>
              
              <div className={`flex items-center gap-3 ${progress >= 50 ? 'text-[hsl(var(--foreground))]' : 'text-[hsl(var(--muted-foreground))]'}`}>
                <div className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${progress >= 50 ? 'bg-[hsl(var(--primary))] text-white' : 'bg-[hsl(var(--muted))]'}`}>
                  {progress >= 50 ? '✓' : '2'}
                </div>
                <span className="text-sm">Extracting text with OCR</span>
              </div>
              
              <div className={`flex items-center gap-3 ${progress >= 75 ? 'text-[hsl(var(--foreground))]' : 'text-[hsl(var(--muted-foreground))]'}`}>
                <div className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${progress >= 75 ? 'bg-[hsl(var(--primary))] text-white' : 'bg-[hsl(var(--muted))]'}`}>
                  {progress >= 75 ? '✓' : '3'}
                </div>
                <span className="text-sm">Identifying transactions</span>
              </div>
              
              <div className={`flex items-center gap-3 ${progress >= 100 ? 'text-[hsl(var(--foreground))]' : 'text-[hsl(var(--muted-foreground))]'}`}>
                <div className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${progress >= 100 ? 'bg-[hsl(var(--primary))] text-white' : 'bg-[hsl(var(--muted))]'}`}>
                  {progress >= 100 ? '✓' : '4'}
                </div>
                <span className="text-sm">Structuring data</span>
              </div>
            </div>

            {/* Loading Animation */}
            <div className="mt-6 flex justify-center">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-[hsl(var(--primary))] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="h-2 w-2 bg-[hsl(var(--primary))] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="h-2 w-2 bg-[hsl(var(--primary))] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-[hsl(var(--muted))]/30 border-t border-[hsl(var(--border))]">
            <p className="text-xs text-[hsl(var(--muted-foreground))] text-center">
              Please don't close this window while processing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
