"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { UploadArea } from "@/components/bank-statement/UploadArea";
import { ResultsModal } from "@/components/bank-statement/ResultsModal";
import { UploadModal } from "@/components/dashboard/UploadModal";
import { PortalTooltip } from "@/components/ui/portal-tooltip";
import { ExtractedData } from "@/lib/pdfProcessor";
import { toast } from "react-hot-toast";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { FileText, Trash2, Eye, Loader2, CheckCircle2, Upload, Info, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { StorageService, StoredDocument } from "@/lib/storageService";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { useUsage } from "@/hooks/useUsage";

import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 10;

interface Document {
    id: string;
    fileName: string;
    date: string;
    status: "queued" | "processing" | "completed" | "failed";
    data?: ExtractedData;
    file?: File;
    errorMessage?: string;
}

export const DashboardContent = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const [showResults, setShowResults] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const { isSignedIn, isLoaded, getToken } = useAuth();
    const { refreshUsage } = useUsage();
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadKey, setUploadKey] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const documentsRef = useRef<HTMLDivElement>(null);

    // Load documents from IndexedDB
    const loadDocs = useCallback(async () => {
        try {
            const storedDocs = await StorageService.getDocuments();
            const mappedDocs: Document[] = storedDocs.map(doc => ({
                id: doc.id,
                fileName: doc.fileName,
                date: doc.date,
                status: "completed",
                data: doc.data,
                file: doc.fileBlob ? new File([doc.fileBlob], doc.fileName, { type: 'application/pdf' }) : undefined
            }));

            setDocuments(prevDocs => {
                // Create a Set of IDs from the database (completed items)
                const dbIds = new Set(mappedDocs.map(d => d.id));

                // Keep existing items that are NOT 'completed' (queued, processing, failed)
                // AND are not already in the database list (to prevent duplication)
                const activeDocs = prevDocs.filter(doc =>
                    doc.status !== 'completed' && !dbIds.has(doc.id)
                );

                // Show active (queued/processing) items first, then history
                return [...activeDocs, ...mappedDocs];
            });
        } catch (error) {
            console.error("Failed to load documents from storage:", error);
        }
    }, []);

    useEffect(() => {
        loadDocs();

        const handleStorageUpdate = () => {
            loadDocs();
        };

        window.addEventListener('storage-updated', handleStorageUpdate);
        return () => {
            window.removeEventListener('storage-updated', handleStorageUpdate);
        };
    }, [loadDocs]);

    // Concurrency limit for parallel processing
    const MAX_CONCURRENT = 3;
    const activeCountRef = useRef<number>(0);
    const processingIdsRef = useRef<Set<string>>(new Set());

    // Process a single document
    const processDocument = useCallback(async (docId: string, file: File, delayMs: number = 0) => {
        if (processingIdsRef.current.has(docId)) return;
        processingIdsRef.current.add(docId);
        activeCountRef.current++;

        try {
            // Apply stagger delay if requested
            if (delayMs > 0) {
                await new Promise(resolve => setTimeout(resolve, delayMs));
            }

            // Update status to processing
            setDocuments(prev => prev.map(doc =>
                doc.id === docId ? { ...doc, status: "processing" as const } : doc
            ));

            const { PDFProcessor } = await import("@/lib/pdfProcessor");
            const token = await getToken();
            const extracted = await PDFProcessor.processPDF(file, isSignedIn || false, token);

            // Check if LLM extraction failed (backend returned success but no transactions)
            if (!extracted.transactions || extracted.transactions.length === 0) {
                // Mark as failed - LLM likely had an issue
                setDocuments(prev => prev.map(doc =>
                    doc.id === docId ? {
                        ...doc,
                        status: "failed" as const,
                        errorMessage: "We're experiencing high traffic on our free tier model. Please try again in a few minutes."
                    } : doc
                ));
                toast.error(`Extraction incomplete: ${file.name}. Try again shortly.`, { duration: 5000 });
                return;
            }

            // Save to IndexedDB
            const storedDoc: StoredDocument = {
                id: docId,
                fileName: file.name,
                date: new Date().toLocaleDateString(),
                data: extracted,
                fileBlob: file,
                timestamp: Date.now()
            };
            await StorageService.saveDocument(storedDoc);

            setDocuments(prev => prev.map(doc =>
                doc.id === docId ? { ...doc, status: "completed" as const, data: extracted } : doc
            ));

            toast.success(`Processed: ${file.name}`);
            refreshUsage();
        } catch (error: any) {
            console.error(error);
            let errorMessage = error.message || "Failed to process document.";
            let userFriendlyMessage = `Failed: ${file.name}`;

            // Check for server overload (503)
            if (error.message?.includes("503") || error.message?.includes("capacity") || error.message?.includes("overload") || error.message?.includes("high traffic")) {
                errorMessage = "We're experiencing high traffic on our free tier model. Please try again in a few minutes.";
                userFriendlyMessage = "We're experiencing high traffic on our free tier model. Please try again in a few minutes.";
            }
            // Check for rate limit exceeded (402)
            else if (error.message?.includes("limit exceeded") || error.message?.includes("402") || error.message?.includes("Upgrade")) {
                errorMessage = "Daily page limit exceeded. Upgrade for more!";
                userFriendlyMessage = "Daily limit reached - Upgrade to Pro for more pages!";
            }

            setDocuments(prev => prev.map(doc =>
                doc.id === docId ? { ...doc, status: "failed" as const, errorMessage } : doc
            ));
            toast.error(userFriendlyMessage, { duration: 5000 });
        } finally {
            activeCountRef.current--;
            // Process next queued item if any
            processNextInQueue();
        }
    }, [getToken, isSignedIn, refreshUsage]);

    // Process queued items up to the concurrent limit
    const processNextInQueue = useCallback(() => {
        // Get current queued documents
        setDocuments(prev => {
            const queuedDocs = prev.filter(d => d.status === "queued" && d.file);

            let scheduledCount = 0;
            // Start processing for each available slot
            for (const queuedDoc of queuedDocs) {
                if (activeCountRef.current >= MAX_CONCURRENT) break;

                // Double check to avoid reprocessing items that are waiting for their delay
                if (processingIdsRef.current.has(queuedDoc.id)) continue;

                if (queuedDoc.file) {
                    // Stagger start times: 0s, 2s, 4s...
                    const delay = scheduledCount * 2000;

                    // Start processing this document (async, don't await)
                    processDocument(queuedDoc.id, queuedDoc.file, delay);
                    scheduledCount++;
                }
            }

            return prev; // No state change here
        });
    }, [processDocument]);

    // Watch for new queued documents
    useEffect(() => {
        const queuedDocs = documents.filter(d => d.status === "queued");
        if (queuedDocs.length > 0 && activeCountRef.current < MAX_CONCURRENT) {
            processNextInQueue();
        }

        // Update global processing state
        const hasActiveOrQueued = documents.some(d => d.status === "processing" || d.status === "queued");
        setIsProcessing(hasActiveOrQueued);
    }, [documents, processNextInQueue]);

    const handleFileUpload = useCallback(async (files: File[]) => {
        if (!isLoaded || !isSignedIn) {
            toast.error('Please sign in to upload documents.');
            return;
        }

        setShowUploadModal(false);

        // Calculate how many slots we have in our concurrent queue
        let currentQueueCount = documents.filter(d => d.status === "processing" || d.status === "queued").length;

        // Show summary toast
        if (files.length === 1) {
            toast.loading(`Processing ${files[0].name}...`, { duration: 2000 });
        } else {
            toast.success(`Added ${files.length} documents to queue`, { icon: 'xk' }); // 'xk' is not an icon, assume typo in user prompt 'muktiple updates?'. Standard success/loading icon.
            toast.loading(`Processing ${files.length} documents...`, { duration: 2000 });
        }

        const newDocs: Document[] = [];

        for (const file of files) {
            const willQueue = currentQueueCount + 1 > MAX_CONCURRENT; // Simplified queue logic
            const newDoc: Document = {
                id: Math.random().toString(36).substr(2, 9),
                fileName: file.name,
                date: new Date().toLocaleDateString(),
                status: "queued", // Always start as queued, effect loop picks it up
                file: file
            };
            newDocs.push(newDoc);
            currentQueueCount++;
        }

        setDocuments(prev => [...newDocs, ...prev]);

        setTimeout(() => {
            documentsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }, [isLoaded, isSignedIn, documents]);

    const handleDelete = async (id: string) => {
        try {
            await StorageService.deleteDocument(id);
            setDocuments(prev => {
                const newDocs = prev.filter(doc => doc.id !== id);
                // Adjust current page if we're now beyond the last page
                const newTotalPages = Math.ceil(newDocs.length / ITEMS_PER_PAGE);
                if (currentPage > newTotalPages && newTotalPages > 0) {
                    setCurrentPage(newTotalPages);
                } else if (newDocs.length === 0) {
                    setCurrentPage(1);
                }
                return newDocs;
            });
            toast.success("Document deleted");
        } catch (error) {
            console.error("Failed to delete document:", error);
            toast.error("Failed to delete document");
        }
    };

    // Check for pending extraction from pre-login session (Redirect flow)
    useEffect(() => {
        const pendingData = localStorage.getItem("pending_extraction");
        if (pendingData) {
            try {
                const { data, fileName, date } = JSON.parse(pendingData);

                const id = Math.random().toString(36).substr(2, 9);
                const newDoc: Document = {
                    id: id,
                    fileName: fileName || "Restored Document",
                    date: date || new Date().toLocaleDateString(),
                    status: "completed",
                    data: data
                };

                // Save restored doc to IndexedDB immediately
                const storedDoc: StoredDocument = {
                    id: id,
                    fileName: newDoc.fileName,
                    date: newDoc.date,
                    data: data,
                    timestamp: Date.now()
                };
                StorageService.saveDocument(storedDoc).then(() => {
                    setDocuments(prev => [newDoc, ...prev]);
                    localStorage.removeItem("pending_extraction");
                    toast.success("Restored your pending extraction!");
                });

            } catch (e) {
                console.error("Failed to restore pending extraction", e);
                localStorage.removeItem("pending_extraction");
            }
        }
    }, []);

    const handleView = (doc: Document) => {
        if (doc.status !== "completed" || !doc.data) return;
        setSelectedDoc(doc);
        setShowResults(true);
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-[hsl(var(--background))]">
            <div className="flex-1 overflow-y-auto p-6">
                <div className="mx-auto max-w-5xl space-y-6">

                    {/* Privacy Notice */}
                    <PrivacyNotice />

                    {/* Documents Table */}
                    <div className="space-y-3" ref={documentsRef}>
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Your Documents</h2>
                            <Button
                                onClick={() => setShowUploadModal(true)}
                                className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-3 py-2 text-sm font-medium text-white hover:bg-[hsl(var(--primary))]/90 transition-colors shadow-sm"
                            >
                                <Upload className="h-4 w-4" />
                                Upload Document
                            </Button>
                        </div>
                        <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden shadow-sm">
                            <div className="w-full overflow-x-auto">
                                <table className="w-full caption-bottom text-sm table-fixed">
                                    <thead className="[&_tr]:border-b sticky top-0 bg-[hsl(var(--card))] z-10">
                                        <tr className="border-b transition-colors bg-[hsl(var(--muted))]/30">
                                            <th className="h-10 px-4 text-left align-middle text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">Document Name</th>
                                            <th className="h-10 px-4 text-left align-middle text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide w-32">Date</th>
                                            <th className="h-10 px-4 text-center align-middle text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide w-28">Status</th>
                                            <th className="h-10 px-4 text-center align-middle text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide w-24">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {documents.length === 0 ? (
                                            <tr className="border-b transition-colors">
                                                <td colSpan={4} className="p-8 align-middle text-center text-[hsl(var(--muted-foreground))]">
                                                    No documents uploaded yet. Click "Upload Document" to get started.
                                                </td>
                                            </tr>
                                        ) : (
                                            documents
                                                .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                                                .map((doc) => (
                                                    <tr key={doc.id} className="border-b transition-colors hover:bg-[hsl(var(--muted))]/20">
                                                        <td className="py-3 px-4 align-middle">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] flex-shrink-0">
                                                                    <FileText className="h-4 w-4" />
                                                                </div>
                                                                <span className="truncate text-sm font-medium text-[hsl(var(--foreground))]" title={doc.fileName}>
                                                                    {doc.fileName}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-4 align-middle text-sm text-[hsl(var(--muted-foreground))]">{doc.date}</td>
                                                        <td className="py-3 px-4 align-middle text-center">
                                                            {doc.status === "queued" && (
                                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                                                                    <Clock className="h-3 w-3" />
                                                                    In Queue
                                                                </span>
                                                            )}
                                                            {doc.status === "processing" && (
                                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--primary))]/10 px-2.5 py-1 text-xs font-medium text-[hsl(var(--primary))]">
                                                                    <Loader2 className="h-3 w-3 animate-spin" />
                                                                    Processing
                                                                </span>
                                                            )}
                                                            {doc.status === "completed" && (
                                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                                                                    <CheckCircle2 className="h-3 w-3" />
                                                                    Completed
                                                                </span>
                                                            )}
                                                            {doc.status === "failed" && (
                                                                <PortalTooltip
                                                                    content={doc.errorMessage || "We're experiencing high traffic on our free tier. Please try again in a few minutes."}
                                                                >
                                                                    <span
                                                                        className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-600 dark:text-red-400 cursor-pointer hover:bg-red-500/20 transition-colors"
                                                                        onClick={() => toast.error(
                                                                            doc.errorMessage || "We're experiencing high traffic on our free tier. Please try again in a few minutes.",
                                                                            { duration: 6000 }
                                                                        )}
                                                                    >
                                                                        Failed
                                                                        <Info className="h-3 w-3" />
                                                                    </span>
                                                                </PortalTooltip>
                                                            )}
                                                        </td>
                                                        <td className="py-3 px-4 align-middle">
                                                            <div className="flex justify-center gap-1">
                                                                {doc.status === "completed" && (
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => handleView(doc)}
                                                                        className="h-8 w-8 p-0 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/10"
                                                                    >
                                                                        <Eye className="h-4 w-4" />
                                                                    </Button>
                                                                )}
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleDelete(doc.id)}
                                                                    className="h-8 w-8 p-0 text-[hsl(var(--muted-foreground))] hover:text-red-600 hover:bg-red-500/10"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination */}
                            {documents.length > ITEMS_PER_PAGE && (
                                <div className="flex items-center justify-between border-t border-[hsl(var(--border))] px-4 py-3">
                                    <div className="text-sm text-[hsl(var(--muted-foreground))]">
                                        Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, documents.length)} of {documents.length} documents
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                            disabled={currentPage === 1}
                                            className="h-8 px-3"
                                        >
                                            <ChevronLeft className="h-4 w-4 mr-1" />
                                            Previous
                                        </Button>
                                        <span className="text-sm text-[hsl(var(--muted-foreground))] px-2">
                                            Page {currentPage} of {Math.ceil(documents.length / ITEMS_PER_PAGE)}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(prev => Math.min(Math.ceil(documents.length / ITEMS_PER_PAGE), prev + 1))}
                                            disabled={currentPage >= Math.ceil(documents.length / ITEMS_PER_PAGE)}
                                            className="h-8 px-3"
                                        >
                                            Next
                                            <ChevronRight className="h-4 w-4 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Upload Modal */}
                <UploadModal
                    isOpen={showUploadModal}
                    onClose={() => setShowUploadModal(false)}
                    onFileUpload={handleFileUpload}
                    isProcessing={isProcessing}
                />

                {/* Results Modal */}
                {showResults && selectedDoc && (
                    <ResultsModal
                        data={selectedDoc.data || null}
                        file={selectedDoc.file || null}
                        isProcessing={selectedDoc.status === 'processing'}
                        progress={100} // You might want to implement real progress later
                        onClose={() => {
                            setShowResults(false);
                            setSelectedDoc(null);
                        }}
                        onTryAnother={() => {
                            setShowResults(false);
                            setShowUploadModal(true);
                        }}
                        onExport={(format) => {
                            // Re-implement export logic or import ExportService
                            import("@/lib/exportService").then(({ ExportService }) => {
                                if (selectedDoc.data) {
                                    if (format === 'csv') ExportService.exportToCSV(selectedDoc.data);
                                    else ExportService.exportToExcel(selectedDoc.data);
                                    toast.success(`Exported as ${format.toUpperCase()}`);
                                }
                            });
                        }}
                    />
                )}
            </div>
        </div>
    );
};
