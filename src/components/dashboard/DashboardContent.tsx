"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { UploadArea } from "@/components/bank-statement/UploadArea";
import { ResultsModal } from "@/components/bank-statement/ResultsModal";
import { UploadModal } from "@/components/dashboard/UploadModal";
import { ExtractedData } from "@/lib/pdfProcessor";
import { toast } from "react-hot-toast";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { FileText, Trash2, Eye, Loader2, CheckCircle2, Upload, Info } from "lucide-react";
import { StorageService, StoredDocument } from "@/lib/storageService";
import { PrivacyNotice } from "@/components/PrivacyNotice";

import { Button } from "@/components/ui/button";

interface Document {
    id: string;
    fileName: string;
    date: string;
    status: "processing" | "completed" | "failed";
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
    const [isProcessing, setIsProcessing] = useState(false); // Global processing state for UploadArea
    const [uploadKey, setUploadKey] = useState(0);
    const documentsRef = useRef<HTMLDivElement>(null);

    // Load documents from IndexedDB on mount
    useEffect(() => {
        const loadDocs = async () => {
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
                setDocuments(mappedDocs);
            } catch (error) {
                console.error("Failed to load documents from storage:", error);
            }
        };
        loadDocs();
    }, []);

    const handleFileUpload = useCallback(async (file: File) => {
        if (!isLoaded || !isSignedIn) {
            toast.error('Please sign in to upload documents.');
            return;
        }

        setShowUploadModal(false);
        setIsProcessing(true);

        const newDoc: Document = {
            id: Math.random().toString(36).substr(2, 9),
            fileName: file.name,
            date: new Date().toLocaleDateString(),
            status: "processing",
            file: file
        };

        setDocuments(prev => [newDoc, ...prev]);
        setUploadKey(prev => prev + 1);

        toast.loading("Processing started...", { duration: 2000 });

        setTimeout(() => {
            documentsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);

        try {
            const { PDFProcessor } = await import("@/lib/pdfProcessor");
            const token = await getToken();
            const extracted = await PDFProcessor.processPDF(file, isSignedIn, token);

            // Save to IndexedDB
            const storedDoc: StoredDocument = {
                id: newDoc.id,
                fileName: newDoc.fileName,
                date: newDoc.date,
                data: extracted,
                fileBlob: file, // Store the file blob
                timestamp: Date.now()
            };
            await StorageService.saveDocument(storedDoc);

            setDocuments(prev => prev.map(doc =>
                doc.id === newDoc.id
                    ? { ...doc, status: "completed", data: extracted }
                    : doc
            ));

            setSelectedDoc(prev => prev?.id === newDoc.id ? { ...prev, status: "completed", data: extracted } : prev);

            toast.success("Document processed and saved locally!");

            // Trigger usage update in sidebar
            window.dispatchEvent(new Event('usage_updated'));
        } catch (error: any) {
            console.error(error);
            const errorMessage = error.message || "Failed to process document.";

            setDocuments(prev => prev.map(doc =>
                doc.id === newDoc.id
                    ? { ...doc, status: "failed", errorMessage }
                    : doc
            ));
            setSelectedDoc(prev => prev?.id === newDoc.id ? { ...prev, status: "failed", errorMessage } : prev);

            // Show specific error toast
            toast.error(errorMessage, { duration: 5000 });
        } finally {
            setIsProcessing(false);
        }
    }, [isLoaded, isSignedIn]);

    const handleDelete = async (id: string) => {
        try {
            await StorageService.deleteDocument(id);
            setDocuments(prev => prev.filter(doc => doc.id !== id));
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
            <div className="flex-1 overflow-y-auto p-8">
                <div className="mx-auto max-w-5xl space-y-8">

                    {/* Privacy Notice */}
                    <PrivacyNotice />

                    {/* Documents Table */}
                    <div className="space-y-4" ref={documentsRef}>
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Your Documents</h2>
                            <Button
                                onClick={() => setShowUploadModal(true)}
                                className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-white hover:bg-[hsl(var(--primary))]/90 transition-colors shadow-sm"
                            >
                                <Upload className="h-4 w-4" />
                                Upload Document
                            </Button>
                        </div>
                        <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden shadow-sm">
                            <div className="w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead className="[&_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-[hsl(var(--muted))]/50 data-[state=selected]:bg-[hsl(var(--muted))] bg-[hsl(var(--muted))]/50">
                                            <th className="h-12 px-4 text-left align-middle font-medium text-[hsl(var(--muted-foreground))]">Document Name</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-[hsl(var(--muted-foreground))]">Date Uploaded</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-[hsl(var(--muted-foreground))]">Status</th>
                                            <th className="h-12 px-4 text-right align-middle font-medium text-[hsl(var(--muted-foreground))]">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {documents.length === 0 ? (
                                            <tr className="border-b transition-colors hover:bg-[hsl(var(--muted))]/50">
                                                <td colSpan={4} className="p-4 align-middle h-32 text-center text-[hsl(var(--muted-foreground))]">
                                                    No documents uploaded yet.
                                                </td>
                                            </tr>
                                        ) : (
                                            documents.map((doc) => (
                                                <tr key={doc.id} className="border-b transition-colors hover:bg-[hsl(var(--muted))]/50">
                                                    <td className="p-4 align-middle font-medium">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                                                                <FileText className="h-4 w-4" />
                                                            </div>
                                                            {doc.fileName}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle">{doc.date}</td>
                                                    <td className="p-4 align-middle">
                                                        {doc.status === "processing" && (
                                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--primary))]/10 px-2.5 py-0.5 text-xs font-medium text-[hsl(var(--primary))]">
                                                                <Loader2 className="h-3 w-3 animate-spin" />
                                                                Processing
                                                            </span>
                                                        )}
                                                        {doc.status === "completed" && (
                                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">
                                                                <CheckCircle2 className="h-3 w-3" />
                                                                Completed
                                                            </span>
                                                        )}
                                                        {doc.status === "failed" && (
                                                            <div className="group relative">
                                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-600 dark:text-red-400 cursor-help">
                                                                    Failed
                                                                    <Info className="h-3 w-3" />
                                                                </span>
                                                                {doc.errorMessage && (
                                                                    <div className="absolute bottom-full left-1/2 mb-2 w-64 -translate-x-1/2 rounded-lg bg-gray-900 p-2 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 pointer-events-none z-50">
                                                                        {doc.errorMessage}
                                                                        <div className="absolute top-full left-1/2 -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900"></div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="p-4 align-middle text-right">
                                                        <div className="flex justify-end gap-2">
                                                            {doc.status === "completed" && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleView(doc)}
                                                                    className="h-8 w-8 p-0 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
                                                                >
                                                                    <Eye className="h-4 w-4" />
                                                                </Button>
                                                            )}
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleDelete(doc.id)}
                                                                className="h-8 w-8 p-0 text-[hsl(var(--muted-foreground))] hover:text-red-600"
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
