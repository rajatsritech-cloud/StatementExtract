"use client";

import { useState, useCallback, useRef } from "react";
import { UploadArea } from "@/components/bank-statement/UploadArea";
import { ResultsModal } from "@/components/bank-statement/ResultsModal";
import { ExtractedData } from "@/lib/pdfProcessor";
import { toast } from "react-hot-toast";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { FileText, Trash2, Eye, Loader2, CheckCircle2 } from "lucide-react";


import { Button } from "@/components/ui/button";

interface Document {
    id: string;
    fileName: string;
    date: string;
    status: "processing" | "completed" | "failed";
    data?: ExtractedData;
    file?: File;
}

export const DashboardContent = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const [showResults, setShowResults] = useState(false);
    const { isSignedIn, isLoaded } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false); // Global processing state for UploadArea
    const [uploadKey, setUploadKey] = useState(0);
    const documentsRef = useRef<HTMLDivElement>(null);

    const handleFileUpload = useCallback(async (file: File) => {
        if (!isLoaded || !isSignedIn) {
            toast.error('Please sign in to upload documents.');
            return;
        }

        // Create new document entry
        const newDoc: Document = {
            id: Math.random().toString(36).substr(2, 9),
            fileName: file.name,
            date: new Date().toLocaleDateString(),
            status: "processing",
            file: file
        };

        setDocuments(prev => [newDoc, ...prev]);
        setUploadKey(prev => prev + 1); // Reset UploadArea to clear the file

        toast.loading("Processing started. You can view the status in 'Your Documents'.", { duration: 4000 });

        // Scroll to documents section
        setTimeout(() => {
            documentsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);

        try {
            // Simulate processing delay or actual processing
            const { PDFProcessor } = await import("@/lib/pdfProcessor");
            const extracted = await PDFProcessor.processPDF(file, isSignedIn);

            setDocuments(prev => prev.map(doc =>
                doc.id === newDoc.id
                    ? { ...doc, status: "completed", data: extracted }
                    : doc
            ));
            toast.success("Document processed successfully!");
        } catch (error) {
            console.error(error);
            setDocuments(prev => prev.map(doc =>
                doc.id === newDoc.id
                    ? { ...doc, status: "failed" }
                    : doc
            ));
            toast.error("Failed to process document.");
        }
    }, [isLoaded, isSignedIn]);

    const handleDelete = (id: string) => {
        setDocuments(prev => prev.filter(doc => doc.id !== id));
        toast.success("Document deleted");
    };

    const handleView = (doc: Document) => {
        if (doc.status !== "completed" || !doc.data) return;
        setSelectedDoc(doc);
        setShowResults(true);
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-[hsl(var(--background))]">
            {/* Top Header with User Details */}
            <div className="flex items-center justify-end px-8 py-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]">
                <UserButton afterSignOutUrl="/" />
            </div>

            <div className="flex-1 overflow-y-auto p-8">
                <div className="mx-auto max-w-5xl space-y-8">

                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">Bank Statement Converter</h1>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                            Upload your PDF statements to convert them into Excel/CSV formats.
                        </p>
                    </div>

                    {/* Upload Section */}
                    <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-sm">
                        <h2 className="text-base font-semibold mb-3 text-[hsl(var(--foreground))]">Upload New Document</h2>
                        <UploadArea key={uploadKey} onFileUpload={handleFileUpload} isProcessing={isProcessing} hideFeatures={true} manualTrigger={true} />
                    </div>

                    {/* Documents Table */}
                    <div className="space-y-4" ref={documentsRef}>
                        <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Your Documents</h2>
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
                                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-xs font-medium text-yellow-600">
                                                                <Loader2 className="h-3 w-3 animate-spin" />
                                                                Processing
                                                            </span>
                                                        )}
                                                        {doc.status === "completed" && (
                                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-600">
                                                                <CheckCircle2 className="h-3 w-3" />
                                                                Completed
                                                            </span>
                                                        )}
                                                        {doc.status === "failed" && (
                                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-600">
                                                                Failed
                                                            </span>
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

                {/* Results Modal */}
                {showResults && selectedDoc && selectedDoc.data && (
                    <ResultsModal
                        data={selectedDoc.data}
                        file={selectedDoc.file || null}
                        isProcessing={false}
                        progress={100}
                        onClose={() => setShowResults(false)}
                        onTryAnother={() => setShowResults(false)}
                        onExport={(format) => {
                            // Re-implement export logic or import ExportService
                            import("@/lib/exportService").then(({ ExportService }) => {
                                if (format === 'csv') ExportService.exportToCSV(selectedDoc.data!);
                                else ExportService.exportToExcel(selectedDoc.data!);
                                toast.success(`Exported as ${format.toUpperCase()}`);
                            });
                        }}
                    />
                )}
            </div>
        </div>
    );
};
