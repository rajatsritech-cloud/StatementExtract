"use client";

import { useState, useEffect } from "react";
import {
    CheckCircle2,
    Circle,
    Loader2,
    Upload,
    FileText,
    Calculator,
    Shield,
    Sparkles,
    AlertTriangle,
    ChevronDown,
    ChevronUp,
    Brain,
    FileSpreadsheet,
    Copy,
    Lock,
    Crown
} from "lucide-react";

export interface ProcessingStep {
    id: string;
    name: string;
    status: 'pending' | 'running' | 'complete' | 'skipped' | 'warning';
    details?: string;
    subSteps?: string[];
    timing?: number;
}

interface ProcessingPipelineProps {
    steps: ProcessingStep[];
    isProcessing: boolean;
    isPro?: boolean;  // If false, blur details and show upgrade prompt
    fileName?: string;
    pageCount?: number;
    transactionCount?: number;
    className?: string;
    onUpgradeClick?: () => void;  // Callback when user clicks upgrade
}

const stepIcons: Record<string, React.ElementType> = {
    upload: Upload,
    text_extraction: FileText,
    transaction_detection: FileSpreadsheet,
    math_verification: Calculator,
    duplicate_detection: Copy,
    fraud_analysis: Shield,
    payee_normalization: Sparkles,
    llm_validation: Brain,
    source_page_tracking: FileText,
};

const StatusBadge = ({ status }: { status: ProcessingStep['status'] }) => {
    switch (status) {
        case 'complete':
            return <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />;
        case 'running':
            return <Loader2 className="h-3.5 w-3.5 text-[hsl(var(--primary))] animate-spin" />;
        case 'skipped':
            return <CheckCircle2 className="h-3.5 w-3.5 text-gray-400" />;
        case 'warning':
            return <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />;
        default:
            return <Circle className="h-3.5 w-3.5 text-gray-300" />;
    }
};

export const ProcessingPipeline = ({
    steps,
    isProcessing,
    isPro = true,  // Default to true for backwards compatibility
    fileName,
    pageCount,
    transactionCount,
    className = "",
    onUpgradeClick
}: ProcessingPipelineProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Auto-expand during processing
    useEffect(() => {
        if (isProcessing) setIsExpanded(true);
    }, [isProcessing]);

    const completedCount = steps.filter(s => s.status === 'complete').length;
    const warningCount = steps.filter(s => s.status === 'warning').length;
    const totalSteps = steps.length;
    const progressPercent = totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;
    const allPassed = completedCount === totalSteps && warningCount === 0;

    return (
        <div className={`rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden ${className}`}>
            {/* Compact Header */}
            <div
                className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-[hsl(var(--muted))]/20 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-md ${isProcessing ? 'bg-[hsl(var(--primary))]/10' :
                        allPassed ? 'bg-green-500/10' : 'bg-amber-500/10'
                        }`}>
                        {isProcessing ? (
                            <Loader2 className="h-4 w-4 text-[hsl(var(--primary))] animate-spin" />
                        ) : allPassed ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                                {isProcessing ? 'Processing...' : 'Validation'}
                            </span>
                            <span className={`text-xs px-1.5 py-0.5 rounded ${allPassed ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'
                                }`}>
                                {completedCount}/{totalSteps} passed
                            </span>
                            {warningCount > 0 && (
                                <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600">
                                    {warningCount} warning{warningCount > 1 ? 's' : ''}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Mini progress bar */}
                    <div className="hidden sm:flex items-center gap-1.5">
                        <div className="w-16 h-1.5 bg-[hsl(var(--muted))] rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-300 ${allPassed ? 'bg-green-500' : 'bg-amber-500'
                                    }`}
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                        <span className="text-[10px] text-[hsl(var(--muted-foreground))] w-7">{Math.round(progressPercent)}%</span>
                    </div>
                    {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                    )}
                </div>
            </div>

            {/* Expanded Steps - Compact Grid */}
            {isExpanded && (
                <div className="relative px-4 pb-3 pt-1 border-t border-[hsl(var(--border))]">
                    {/* Blur overlay for free users */}
                    {!isPro && !isProcessing && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[hsl(var(--card))]/80 backdrop-blur-sm">
                            <div className="text-center px-4">
                                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
                                    <Crown className="h-5 w-5 text-amber-500" />
                                </div>
                                <p className="text-sm font-medium text-[hsl(var(--foreground))] mb-1">
                                    Pro Feature
                                </p>
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">
                                    Detailed validation reports are Pro-only
                                </p>
                                {onUpgradeClick && (
                                    <button
                                        onClick={onUpgradeClick}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all"
                                    >
                                        <Lock className="h-3 w-3" /> Upgrade to Pro
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Document Info - Single line */}
                    {fileName && (
                        <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))] py-1.5 mb-2 border-b border-[hsl(var(--border))]/50">
                            <span><span className="opacity-60">File:</span> {fileName}</span>
                            {pageCount && <span><span className="opacity-60">Pages:</span> {pageCount}</span>}
                            {transactionCount !== undefined && <span><span className="opacity-60">Transactions:</span> {transactionCount}</span>}
                        </div>
                    )}

                    {/* Steps Grid - 2 columns for compact display */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                        {steps.map((step) => {
                            const Icon = stepIcons[step.id] || FileText;
                            return (
                                <div
                                    key={step.id}
                                    className={`flex items-center gap-2 py-1.5 px-2 rounded text-xs ${step.status === 'warning' ? 'bg-amber-500/5' : ''
                                        }`}
                                >
                                    <StatusBadge status={step.status} />
                                    <Icon className={`h-3 w-3 ${step.status === 'complete' ? 'text-green-600' :
                                        step.status === 'warning' ? 'text-amber-500' :
                                            'text-[hsl(var(--muted-foreground))]'
                                        }`} />
                                    <span className={`font-medium ${step.status === 'pending' ? 'text-[hsl(var(--muted-foreground))]' :
                                        'text-[hsl(var(--foreground))]'
                                        }`}>
                                        {step.name}
                                    </span>
                                    {step.status === 'warning' && step.details && (
                                        <span className="ml-auto text-[10px] text-amber-600 truncate max-w-[120px]" title={step.details}>
                                            ⚠
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Warning details if any */}
                    {warningCount > 0 && (
                        <div className="mt-2 pt-2 border-t border-[hsl(var(--border))]/50">
                            <div className="text-xs text-amber-600 space-y-0.5">
                                {steps.filter(s => s.status === 'warning').map(s => (
                                    <div key={s.id} className="flex items-start gap-1.5">
                                        <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                        <span><strong>{s.name}:</strong> {s.details}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Enterprise badge - More subtle */}
                    <div className="mt-2 pt-2 border-t border-[hsl(var(--border))]/50 flex items-center justify-center gap-1.5 text-[10px] text-[hsl(var(--muted-foreground))]">
                        <Shield className="h-3 w-3" />
                        <span>Enterprise validation by Statement Extract</span>
                    </div>
                </div>
            )}
        </div>
    );
};

// Default processing steps template
export const getDefaultProcessingSteps = (): ProcessingStep[] => [
    { id: 'upload', name: 'Upload', status: 'pending' },
    { id: 'text_extraction', name: 'Extract', status: 'pending' },
    { id: 'transaction_detection', name: 'Detect', status: 'pending' },
    { id: 'math_verification', name: 'Verify Math', status: 'pending' },
    { id: 'duplicate_detection', name: 'Duplicates', status: 'pending' },
    { id: 'fraud_analysis', name: 'Fraud Check', status: 'pending' },
    { id: 'payee_normalization', name: 'Normalize', status: 'pending' },
    { id: 'source_page_tracking', name: 'Page Track', status: 'pending' },
    { id: 'llm_validation', name: 'AI Check', status: 'pending' },
];

// Update steps based on backend response
export const updateStepsFromResponse = (
    baseSteps: ProcessingStep[],
    response: any
): ProcessingStep[] => {
    const steps = [...baseSteps];

    steps.forEach(step => { step.status = 'complete'; });

    // Upload step
    const uploadStep = steps.find(s => s.id === 'upload');
    if (uploadStep) uploadStep.details = `${response.num_pages || 1} page(s)`;

    // Transaction detection
    const txStep = steps.find(s => s.id === 'transaction_detection');
    if (txStep && response.data) {
        txStep.details = `${response.data.transactions?.length || 0} found`;
    }

    // Math verification
    const mathStep = steps.find(s => s.id === 'math_verification');
    if (mathStep && response.reconciliation) {
        const recon = response.reconciliation;
        if (recon.reconciled) {
            mathStep.details = 'Balances verified ✓';
        } else {
            mathStep.status = 'warning';
            mathStep.details = `${recon.checks?.percentage || 0}% checks passed`;
        }
    }

    // Duplicate detection
    const dupStep = steps.find(s => s.id === 'duplicate_detection');
    if (dupStep && response.fraud_analysis) {
        const dups = response.fraud_analysis.alerts?.filter((a: any) => a.type === 'duplicate_transaction') || [];
        if (dups.length > 0) {
            dupStep.status = 'warning';
            dupStep.details = `${dups.length} potential`;
        }
    }

    // Fraud analysis
    const fraudStep = steps.find(s => s.id === 'fraud_analysis');
    if (fraudStep && response.fraud_analysis?.summary) {
        const s = response.fraud_analysis.summary;
        if (s.high_risk > 0) fraudStep.status = 'warning';
        fraudStep.details = `${s.high_risk} high, ${s.medium_risk} med`;
    }

    // Payee normalization
    const payeeStep = steps.find(s => s.id === 'payee_normalization');
    if (payeeStep) {
        payeeStep.details = `${response.data?.processing_stats?.payees_normalized || 0} cleaned`;
    }

    // LLM validation
    const llmStep = steps.find(s => s.id === 'llm_validation');
    if (llmStep) {
        if (response.llm_used) {
            llmStep.details = 'AI verified';
        } else {
            llmStep.status = 'skipped';
            llmStep.details = 'Skipped (high confidence)';
        }
    }

    return steps;
};
