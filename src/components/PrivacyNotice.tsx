"use client";

import { ShieldCheck, Database, Trash2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { StorageService } from "@/lib/storageService";
import { toast } from "react-hot-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface StorageStatus {
    documentCount: number;
    maxDocuments: number;
    usedSpaceKB: number | null;
    isNearLimit: boolean;
}

export const PrivacyNotice = ({ className, size = 'default' }: { className?: string; size?: 'default' | 'large' }) => {
    const isLarge = size === 'large';
    const [storageStatus, setStorageStatus] = useState<StorageStatus | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchStorageStatus = async () => {
            try {
                const status = await StorageService.getStorageStatus();
                setStorageStatus(status);
            } catch (error) {
                console.error("Failed to get storage status:", error);
            }
        };

        // Fetch on mount
        fetchStorageStatus();

        // Listen for storage updates
        const handleStorageUpdate = () => {
            fetchStorageStatus();
        };
        window.addEventListener('storage-updated', handleStorageUpdate);

        return () => {
            window.removeEventListener('storage-updated', handleStorageUpdate);
        };
    }, []);

    const formatUsedSpace = (kb: number): string => {
        if (kb >= 1024) {
            return `${(kb / 1024).toFixed(1)} MB`;
        }
        return `${kb} KB`;
    };

    const handleDeleteAll = async () => {
        if (!storageStatus || storageStatus.documentCount === 0) return;

        setIsDeleting(true);
        try {
            const deletedCount = await StorageService.deleteAllDocuments();
            toast.success(`Deleted ${deletedCount} document${deletedCount !== 1 ? 's' : ''}`);
        } catch (error) {
            console.error("Failed to delete documents:", error);
            toast.error("Failed to delete documents");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Alert className={`bg-[hsl(var(--primary))]/5 border-[hsl(var(--primary))]/20 ${isLarge ? 'p-6' : 'px-4 py-3'} ${className}`}>
            <ShieldCheck className={`${isLarge ? 'h-6 w-6 top-6' : 'h-4 w-4 top-4'} text-[hsl(var(--primary))]`} />
            <AlertTitle className={`text-[hsl(var(--foreground))] ${isLarge ? 'text-lg mb-2' : ''}`}>Your Data is Private & Secure</AlertTitle>
            <AlertDescription className={`text-[hsl(var(--muted-foreground))] ${isLarge ? 'text-base' : 'text-xs'}`}>
                <div className="flex flex-col gap-1.5">
                    <span>
                        Your financial data is stored locally in your browser (IndexedDB) and is <strong>never</strong> sent to our servers.
                    </span>
                    {storageStatus && (
                        <div className={`flex items-center gap-2 ${storageStatus.isNearLimit ? 'text-amber-500' : 'text-[hsl(var(--muted-foreground))]'}`}>
                            <Database className="h-3 w-3" />
                            <span className="font-medium">
                                {storageStatus.documentCount} / {storageStatus.maxDocuments} documents stored
                                {storageStatus.usedSpaceKB !== null && storageStatus.usedSpaceKB > 0 && (
                                    <span className="opacity-75"> • {formatUsedSpace(storageStatus.usedSpaceKB)} used</span>
                                )}
                            </span>
                            {storageStatus.documentCount > 0 && (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button
                                            className="p-1 rounded hover:bg-red-500/10 text-red-500 transition-colors"
                                            title="Delete all documents"
                                            disabled={isDeleting}
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete All Documents?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This will permanently delete <strong>{storageStatus.documentCount} document{storageStatus.documentCount !== 1 ? 's' : ''}</strong> from your browser storage. This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleDeleteAll}
                                                className="bg-red-500 hover:bg-red-600"
                                            >
                                                Delete All
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}
                        </div>
                    )}
                </div>
            </AlertDescription>
        </Alert>
    );
};
