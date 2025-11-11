"use client";

import React, { useEffect, useRef, useState } from "react";

interface PDFViewerProps {
  file: File;
  className?: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ file, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [pdfDoc, setPdfDoc] = useState<any>(null);

  useEffect(() => {
    if (!file) return;

    let cancelled = false;
    let pdfjsLib: any; // will hold the dynamically imported pdfjs

    const loadPDF = async () => {
      try {
        setLoading(true);
        setError("");

        // dynamic import ensures pdfjs-dist runs only in browser
        pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
        // configure worker AFTER importing
        if (typeof window !== "undefined" && pdfjsLib?.GlobalWorkerOptions) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/legacy/build/pdf.worker.min.mjs`;
        }

        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        if (cancelled) return;

        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setCurrentPage(1);

        // Render first page
        await renderPage(pdf, 1, pdfjsLib);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setError("Failed to load PDF document");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadPDF();

    return () => {
      cancelled = true;
      // optional cleanup
      setPdfDoc(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]); // keep dependency only on file

  const renderPage = async (pdf: any, pageNumber: number, pdfjsLibParam?: any) => {
    if (!canvasRef.current) return;
    try {
      const pdfjs = pdfjsLibParam ?? (await import("pdfjs-dist/legacy/build/pdf.mjs"));
      const page = await pdf.getPage(pageNumber);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      const viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
    } catch (err) {
      console.error("Error rendering page:", err);
      setError("Failed to render page");
    }
  };

  const handlePageChange = async (newPage: number) => {
    if (!pdfDoc || newPage < 1 || newPage > numPages) return;

    setCurrentPage(newPage);
    await renderPage(pdfDoc, newPage);
  };

  const handlePrevPage = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1);
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 border rounded-lg bg-gray-50 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading PDF...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center p-8 border rounded-lg bg-red-50 ${className}`}>
        <div className="text-center">
          <div className="text-red-600 mb-2">⚠️</div>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`border rounded-lg bg-white ${className}`}>
      {/* PDF Controls */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">Page {currentPage} of {numPages}</span>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= numPages}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>

        <div className="text-sm text-gray-500">{file.name}</div>
      </div>

      {/* PDF Canvas */}
      <div className="overflow-auto max-h-[600px] bg-gray-100 p-4">
        <div className="flex justify-center">
          <canvas ref={canvasRef} className="shadow-lg border border-gray-300" style={{ maxWidth: "100%", height: "auto" }} />
        </div>
      </div>

      {/* Page Navigation */}
      {numPages > 1 && (
        <div className="flex items-center justify-center p-4 border-t bg-gray-50 space-x-2">
          {Array.from({ length: Math.min(numPages, 10) }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-2 py-1 text-sm rounded ${currentPage === pageNum ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              {pageNum}
            </button>
          ))}
          {numPages > 10 && <span className="text-sm text-gray-500">...{numPages}</span>}
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
