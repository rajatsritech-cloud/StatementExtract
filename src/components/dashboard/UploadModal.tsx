"use client";

import { X } from "lucide-react";
import { UploadArea } from "@/components/bank-statement/UploadArea";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onFileUpload: (file: File) => void;
    isProcessing: boolean;
}

export const UploadModal = ({ isOpen, onClose, onFileUpload, isProcessing }: UploadModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="relative w-full max-w-4xl bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--border))]">
                    <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">Upload Document</h3>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                    >
                        <X className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <UploadArea
                        onFileUpload={onFileUpload}
                        isProcessing={isProcessing}
                        hideFeatures={true}
                        manualTrigger={false} // Auto-trigger when file is dropped/selected
                    />
                </div>
            </div>
        </div>
    );
};
