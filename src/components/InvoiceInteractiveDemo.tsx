"use client";

import { useState } from "react";
import { Upload, FileText, Image, Loader2, Download, ArrowRight, RefreshCw, DollarSign, CheckCircle2, Search, ArrowUpDown, X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type DemoStep = "upload" | "processing" | "review" | "success";

export const InvoiceInteractiveDemo = () => {
    const [step, setStep] = useState<DemoStep>("upload");
    const [progress, setProgress] = useState(0);
    const [showPdf, setShowPdf] = useState(false);

    // Reset demo
    const resetDemo = () => {
        setStep("upload");
        setProgress(0);
        setShowPdf(false);
    };

    // Handle file upload simulation
    const handleUpload = () => {
        setStep("processing");
        // Simulate processing progress
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 2; // Slower for more realism
            if (currentProgress >= 100) {
                clearInterval(interval);
                setStep("review");
            }
            setProgress(currentProgress);
        }, 50);
    };

    // Mock Data for Invoice Review Step
    const mockLineItems = [
        { desc: "Web Development Services", qty: "40 hrs", rate: "$150.00", amount: "$6,000.00" },
        { desc: "Server Hosting (Annual)", qty: "1", rate: "$240.00", amount: "$240.00" },
        { desc: "Domain Registration", qty: "2", rate: "$15.00", amount: "$30.00" },
        { desc: "SSL Certificate", qty: "1", rate: "$99.00", amount: "$99.00" },
        { desc: "Maintenance Support", qty: "10 hrs", rate: "$100.00", amount: "$1,000.00" },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Browser Window Frame */}
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-2xl overflow-hidden">
                {/* Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="ml-4 flex-1 flex justify-center">
                        <div className="px-3 py-1 rounded-md bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-[10px] text-[hsl(var(--muted-foreground))] w-full max-w-[200px] text-center font-mono truncate">
                            statementextract.com/demo
                        </div>
                    </div>
                    <div className="w-16 flex justify-end">
                        {step !== "upload" && (
                            <button
                                onClick={resetDemo}
                                className="p-1 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                                title="Restart Demo"
                            >
                                <RefreshCw className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Window Content */}
                <div className={`min-h-[600px] bg-[hsl(var(--background))] relative flex flex-col ${step === 'upload' || step === 'processing' || step === 'success' ? 'items-center justify-center p-6 md:p-12' : ''}`}>

                    {/* STEP 1: UPLOAD */}
                    {step === "upload" && (
                        <div className="w-full max-w-3xl animate-fade-in relative">
                            <div
                                onClick={handleUpload}
                                className="relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-purple-500/50 cursor-pointer group"
                            >
                                {/* Upload Icon */}
                                <div className="mb-6 flex justify-center">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                                        <Upload className="h-8 w-8" />
                                    </div>
                                </div>

                                {/* Upload Text */}
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-1">
                                        Drop your invoice here
                                    </h3>
                                    <p className="text-[hsl(var(--muted-foreground))]">
                                        or click to browse from your computer
                                    </p>
                                </div>

                                {/* File Types */}
                                <div className="flex justify-center gap-4 text-sm text-[hsl(var(--muted-foreground))] mb-8">
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

                                {/* Upload Button */}
                                <button className="px-6 py-3 inline-flex items-center gap-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium shadow-lg transition-all">
                                    <Upload className="h-4 w-4" />
                                    Choose Invoice
                                </button>
                            </div>

                            {/* Floating "Cursor" Hint */}
                            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 animate-bounce text-lg text-purple-500 font-bold whitespace-nowrap z-50 drop-shadow-md">
                                Click anywhere to try!
                            </div>
                        </div>
                    )}

                    {/* STEP 2: PROCESSING */}
                    {step === "processing" && (
                        <div className="w-full max-w-md text-center animate-fade-in">
                            <div className="relative mb-8">
                                <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-[hsl(var(--primary))] mx-auto"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <FileText className="h-8 w-8 text-[hsl(var(--primary))]" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">
                                Scanning Invoice
                            </h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
                                Identifying line items, tax rates, and totals...
                            </p>
                            {/* Progress Bar */}
                            <div className="w-full bg-[hsl(var(--muted))] rounded-full h-2 mb-2">
                                <div
                                    className="bg-gradient-to-r from-[hsl(var(--primary))] to-blue-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-[hsl(var(--muted-foreground))]">
                                {Math.round(progress)}% complete
                            </p>
                        </div>
                    )}

                    {/* STEP 3: REVIEW */}
                    {step === "review" && (
                        <div className="flex h-full w-full animate-fade-in">

                            {/* Left Side - Mock PDF Viewer */}
                            <div className={`border-r border-[hsl(var(--border))] bg-gray-100 dark:bg-gray-900 transition-all duration-300 ease-in-out ${showPdf ? 'w-1/2 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
                                <div className="flex h-full flex-col">
                                    <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]">
                                        <h4 className="font-medium text-[hsl(var(--foreground))]">Original Invoice</h4>
                                        <button
                                            onClick={() => setShowPdf(false)}
                                            className="flex h-6 w-6 items-center justify-center rounded hover:bg-[hsl(var(--muted))] transition-colors"
                                        >
                                            <EyeOff className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                                        </button>
                                    </div>
                                    <div className="flex-1 p-8 overflow-auto flex items-center justify-center">
                                        <div className="w-full h-full max-w-[400px] bg-white shadow-lg p-8 flex flex-col gap-4 opacity-80">
                                            {/* Mock Invoice PDF Look */}
                                            <div className="flex justify-between mb-4">
                                                <div className="h-8 w-24 bg-gray-200 rounded"></div>
                                                <div className="h-8 w-16 bg-gray-200 rounded"></div>
                                            </div>
                                            <div className="h-4 w-1/3 bg-gray-100 rounded mb-2"></div>
                                            <div className="h-4 w-1/2 bg-gray-100 rounded mb-8"></div>

                                            {/* Mock Table Lines */}
                                            <div className="border border-gray-200 rounded p-4 space-y-3">
                                                <div className="h-2 w-full bg-gray-100 rounded"></div>
                                                <div className="h-2 w-full bg-gray-100 rounded"></div>
                                                <div className="h-2 w-full bg-gray-100 rounded"></div>
                                            </div>

                                            <div className="flex justify-end mt-4">
                                                <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Results */}
                            <div className={`flex flex-col transition-all duration-300 ease-in-out ${showPdf ? 'w-1/2' : 'w-full'}`}>

                                {/* Toggle PDF Button */}
                                {!showPdf && (
                                    <div className="flex items-center justify-center p-4 border-b border-[hsl(var(--border))] relative z-20">
                                        <button
                                            onClick={() => setShowPdf(true)}
                                            className="flex items-center gap-2 text-sm text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]/80 transition-colors font-medium"
                                        >
                                            <Eye className="h-4 w-4" />
                                            Show PDF Viewer
                                        </button>
                                        <div className="absolute top-12 left-1/2 -translate-x-1/2 animate-bounce pt-2 z-30">
                                            <div className="flex flex-col items-center">
                                                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-[hsl(var(--primary))]"></div>
                                                <div className="bg-[hsl(var(--primary))] text-white text-sm px-3 py-1.5 rounded-full font-bold whitespace-nowrap shadow-lg">
                                                    Click to compare!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex-1 overflow-auto p-6">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
                                                <FileText className="h-4 w-4 text-[hsl(var(--primary))]" />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">
                                                    Extraction Complete!
                                                </h3>
                                                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                                                    5 line items extracted
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 relative">
                                            {showPdf && (
                                                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 animate-bounce text-base text-[hsl(var(--primary))] font-bold whitespace-nowrap flex items-center gap-2 z-50">
                                                    <span>Click here to finish</span>
                                                    <ArrowRight className="h-5 w-5" />
                                                </div>
                                            )}
                                            <Button onClick={() => setStep("success")} size="sm" className={`gap-2 shadow-[0_0_15px_rgba(var(--primary),0.5)] ${showPdf ? 'animate-pulse' : ''}`}>
                                                <Download className="h-4 w-4" />
                                                Export Excel
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Invoice Overview */}
                                    <div className="mb-6 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm">
                                        <div className="flex items-center gap-2 mb-6 border-b border-[hsl(var(--border))] pb-3">
                                            <FileText className="h-5 w-5 text-[hsl(var(--primary))]" />
                                            <h4 className="font-semibold text-[hsl(var(--foreground))]">Invoice Details</h4>
                                        </div>

                                        <div className={`grid gap-6 ${showPdf ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
                                            <div>
                                                <h5 className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-4">Metadata</h5>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between border-b border-[hsl(var(--border))]/50 pb-2">
                                                        <span className="text-sm text-[hsl(var(--muted-foreground))]">Invoice Number</span>
                                                        <span className="text-sm font-medium text-[hsl(var(--foreground))]">INV-2024-001</span>
                                                    </div>
                                                    <div className="flex justify-between border-b border-[hsl(var(--border))]/50 pb-2">
                                                        <span className="text-sm text-[hsl(var(--muted-foreground))]">Invoice Date</span>
                                                        <span className="text-sm font-medium text-[hsl(var(--foreground))]">Oct 15, 2023</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h5 className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-4">Totals</h5>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between border-b border-[hsl(var(--border))]/50 pb-2">
                                                        <span className="text-sm text-[hsl(var(--muted-foreground))]">Subtotal</span>
                                                        <span className="text-sm font-medium text-[hsl(var(--foreground))]">$7,369.00</span>
                                                    </div>
                                                    <div className="flex justify-between border-b border-[hsl(var(--border))]/50 pb-2">
                                                        <span className="text-sm text-[hsl(var(--muted-foreground))]">Total Amount</span>
                                                        <span className="text-sm font-bold text-[hsl(var(--foreground))]">$7,369.00</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Line Items Table */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium text-[hsl(var(--foreground))]">Line Items</h4>
                                        </div>

                                        <div className="rounded-lg border border-[hsl(var(--border))] overflow-hidden">
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm text-left">
                                                    <thead className="bg-[hsl(var(--muted))]/50 text-[hsl(var(--foreground))]">
                                                        <tr>
                                                            {["Description", "Quantity", "Rate", "Amount"].map((header, index) => (
                                                                <th key={index} className="px-4 py-3 font-semibold border-b border-[hsl(var(--border))] whitespace-nowrap">
                                                                    <div className="flex items-center gap-1">
                                                                        {header}
                                                                        <ArrowUpDown className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                                                                    </div>
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {mockLineItems.map((item, i) => (
                                                            <tr key={i} className="hover:bg-[hsl(var(--muted))]/30 transition-colors border-b border-[hsl(var(--border))] last:border-0">
                                                                <td className="px-4 py-3 text-[hsl(var(--foreground))]">{item.desc}</td>
                                                                <td className="px-4 py-3 text-[hsl(var(--foreground))]">{item.qty}</td>
                                                                <td className="px-4 py-3 text-[hsl(var(--foreground))]">{item.rate}</td>
                                                                <td className="px-4 py-3 font-medium text-[hsl(var(--foreground))]">{item.amount}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: SUCCESS */}
                    {step === "success" && (
                        <div className="text-center animate-fade-in max-w-md">
                            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                <CheckCircle2 className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-3">
                                Invoice Extracted!
                            </h3>
                            <p className="text-[hsl(var(--muted-foreground))] mb-8">
                                You just extracted line items directly from a PDF. Ready to try your own?
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link href="/convert-invoice-to-excel-csv">
                                    <Button size="lg" className="w-full sm:w-auto gap-2 shadow-lg hover:shadow-xl transition-all">
                                        Convert My Invoice
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    onClick={resetDemo}
                                    className="w-full sm:w-auto"
                                >
                                    Replay Demo
                                </Button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};
