"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { X, Download, Copy, Eye, EyeOff, TrendingUp, TrendingDown, DollarSign, User, Mail, Building, CreditCard, Calendar, Wallet, ArrowUpCircle, ArrowDownCircle, FileText, Search, ArrowUpDown, Sparkles, CheckCircle2, Lock, Crown, ChevronDown, Trash2, Settings, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Assuming ExportService and ExtractedData are correctly defined elsewhere
import { ExportService, ExportSettings } from "@/lib/exportService";
import { ExtractedData, PDFProcessor } from "@/lib/pdfProcessor";
import { toast } from "react-hot-toast";
import { useAuth, SignInButton } from "@clerk/clerk-react";
import { useUsage } from "@/hooks/useUsage";
import { StorageService } from "@/lib/storageService";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { ProcessingPipeline, ProcessingStep, getDefaultProcessingSteps, updateStepsFromResponse } from "./ProcessingPipeline";

interface ResultsModalProps {
  data: ExtractedData | null;
  file: File | null;
  isProcessing?: boolean;
  progress?: number;
  documentId?: string; // For persisting edits to IndexedDB
  onClose: () => void;
  onTryAnother: () => void;
  onExport: (format: 'csv' | 'excel') => void;
}

// --- Currency Select Component ---
const CURRENCIES = [
  // Tier 1 - Highest CPC Markets (US, UK, EU, AU, CA)
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  // Tier 2 - Major Finance Markets
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰' },
  // Tier 3 - Emerging Markets & High Volume
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦' },
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦' },
  { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽' },
  { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'KRW', name: 'South Korean Won', flag: '🇰🇷' },
  // Tier 4 - European Markets
  { code: 'SEK', name: 'Swedish Krona', flag: '🇸🇪' },
  { code: 'NOK', name: 'Norwegian Krone', flag: '🇳🇴' },
  { code: 'DKK', name: 'Danish Krone', flag: '🇩🇰' },
  { code: 'PLN', name: 'Polish Zloty', flag: '🇵🇱' },
  { code: 'CZK', name: 'Czech Koruna', flag: '🇨🇿' },
  { code: 'HUF', name: 'Hungarian Forint', flag: '🇭🇺' },
  { code: 'RON', name: 'Romanian Leu', flag: '🇷🇴' },
  // Tier 5 - Asia Pacific
  { code: 'THB', name: 'Thai Baht', flag: '🇹🇭' },
  { code: 'MYR', name: 'Malaysian Ringgit', flag: '🇲🇾' },
  { code: 'IDR', name: 'Indonesian Rupiah', flag: '🇮🇩' },
  { code: 'PHP', name: 'Philippine Peso', flag: '🇵🇭' },
  { code: 'VND', name: 'Vietnamese Dong', flag: '🇻🇳' },
  { code: 'TWD', name: 'Taiwan Dollar', flag: '🇹🇼' },
  // Tier 6 - Middle East & Africa
  { code: 'ILS', name: 'Israeli Shekel', flag: '🇮🇱' },
  { code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷' },
  { code: 'EGP', name: 'Egyptian Pound', flag: '🇪🇬' },
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' },
  { code: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪' },
  { code: 'QAR', name: 'Qatari Riyal', flag: '🇶🇦' },
  { code: 'KWD', name: 'Kuwaiti Dinar', flag: '🇰🇼' },
  { code: 'BHD', name: 'Bahraini Dinar', flag: '🇧🇭' },
  { code: 'OMR', name: 'Omani Rial', flag: '🇴🇲' },
  // Tier 7 - Americas
  { code: 'ARS', name: 'Argentine Peso', flag: '🇦🇷' },
  { code: 'CLP', name: 'Chilean Peso', flag: '🇨🇱' },
  { code: 'COP', name: 'Colombian Peso', flag: '🇨🇴' },
  { code: 'PEN', name: 'Peruvian Sol', flag: '🇵🇪' },
  // Tier 8 - Other
  { code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺' },
  { code: 'PKR', name: 'Pakistani Rupee', flag: '🇵🇰' },
  { code: 'BDT', name: 'Bangladeshi Taka', flag: '🇧🇩' },
  { code: 'LKR', name: 'Sri Lankan Rupee', flag: '🇱🇰' },
];

const CurrencySelect = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  // Calculate dropdown position when opened
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'fixed',
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, [isOpen]);

  // Filter currencies based on search
  const filtered = useMemo(() => {
    if (!search) return CURRENCIES;
    const q = search.toLowerCase();
    return CURRENCIES.filter(c =>
      c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    );
  }, [search]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        buttonRef.current && !buttonRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const selected = CURRENCIES.find(c => c.code === value);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 px-3 flex items-center justify-between rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20 text-sm hover:bg-[hsl(var(--muted))]/40 transition-colors"
      >
        <span className="flex items-center gap-2 font-mono">
          {selected ? (
            <>
              <span>{selected.flag}</span>
              <span className="font-semibold">{selected.code}</span>
              <span className="text-[hsl(var(--muted-foreground))] text-xs hidden sm:inline">({selected.name})</span>
            </>
          ) : (
            <span className="text-[hsl(var(--muted-foreground))]">Select currency...</span>
          )}
        </span>
        <ChevronDown className={`h-4 w-4 text-[hsl(var(--muted-foreground))] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          style={dropdownStyle}
          className="bg-[hsl(var(--popover))] border border-[hsl(var(--border))] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="p-2 border-b border-[hsl(var(--border))]">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              <input
                type="text"
                placeholder="Search currencies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-8 pr-3 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
                autoFocus
              />
            </div>
          </div>
          <div className="max-h-[200px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[hsl(var(--border))] [&::-webkit-scrollbar-thumb]:rounded-full">
            {filtered.length === 0 ? (
              <div className="p-4 text-center text-sm text-[hsl(var(--muted-foreground))]">No currencies found</div>
            ) : (
              filtered.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    onChange(c.code);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={`w-full px-3 py-2.5 flex items-center gap-3 text-sm hover:bg-[hsl(var(--muted))] transition-colors ${value === c.code ? 'bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]' : ''}`}
                >
                  <span className="text-lg">{c.flag}</span>
                  <span className="font-mono font-semibold">{c.code}</span>
                  <span className="text-[hsl(var(--muted-foreground))] text-xs">{c.name}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Helper Functions for Formatting ---
// Modified to display PURE NUMBERS only (No currency symbols) as per user request
const formatCurrency = (amount: number, _currency: string = 'USD') => {
  if (amount === undefined || amount === null) return '-';
  try {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    }).format(amount);
  } catch (e) {
    return amount.toFixed(2);
  }
};

// --- Sub-Components for Cleanliness ---

interface UserInfoAndSummaryProps {
  userInfo: ExtractedData['userInfo'];
}

const UserInfoAndSummary = ({ userInfo }: UserInfoAndSummaryProps) => {
  const currency = userInfo.currency || '$';

  return (
    <div className="mb-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden" data-clarity-mask="true">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[hsl(var(--muted))]/30 border-b border-[hsl(var(--border))]">
        <FileText className="h-4 w-4 text-[hsl(var(--primary))]" />
        <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">Statement Overview</h4>
      </div>

      {/* Content - Two columns with divider */}
      <div className="p-5 grid gap-6 md:grid-cols-2 md:divide-x md:divide-[hsl(var(--border))]">
        {/* Account Information Card */}
        <div className="space-y-3 pr-6">
          <h5 className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">Account Details</h5>
          <div className="space-y-2 text-sm">
            {userInfo.name && userInfo.name !== 'N/A' && (
              <div className="flex justify-between">
                <span className="text-[hsl(var(--muted-foreground))]">Account Holder</span>
                <span className="font-medium text-[hsl(var(--foreground))]">{userInfo.name}</span>
              </div>
            )}
            {userInfo.accountNumber && userInfo.accountNumber !== 'N/A' && (
              <div className="flex justify-between">
                <span className="text-[hsl(var(--muted-foreground))]">Account No.</span>
                <span className="font-medium text-[hsl(var(--foreground))] font-mono">{userInfo.accountNumber}</span>
              </div>
            )}
            {userInfo.bankName && userInfo.bankName !== 'N/A' && (
              <div className="flex justify-between">
                <span className="text-[hsl(var(--muted-foreground))]">Bank</span>
                <span className="font-medium text-[hsl(var(--foreground))]">{userInfo.bankName}</span>
              </div>
            )}
            {userInfo.statementPeriod && userInfo.statementPeriod !== 'N/A' && (
              <div className="flex justify-between">
                <span className="text-[hsl(var(--muted-foreground))]">Period</span>
                <span className="font-medium text-[hsl(var(--foreground))]">{userInfo.statementPeriod}</span>
              </div>
            )}
          </div>
        </div>

        {/* Financial Summary Card */}
        {userInfo.accountSummary && (
          <div className="space-y-3 pl-6">
            <h5 className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">Financial Summary</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[hsl(var(--muted-foreground))]">Opening Balance</span>
                <span className="font-medium text-[hsl(var(--foreground))]">{formatCurrency(userInfo.accountSummary.beginningBalance, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[hsl(var(--muted-foreground))]">Total Credits</span>
                <div className="text-right">
                  <span className="font-medium text-green-600 block">+{formatCurrency(userInfo.accountSummary.totalDeposits, currency)}</span>
                  {userInfo.accountSummary.totalDepositsDiscrepancy && (
                    <span className="text-[10px] text-amber-600 font-medium bg-amber-50 px-1 rounded" title="Calculated from rows">
                      Cal: {formatCurrency(userInfo.accountSummary.totalDepositsComputed || 0, currency)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-[hsl(var(--muted-foreground))]">Total Debits</span>
                <div className="text-right">
                  <span className="font-medium text-red-600 block">-{formatCurrency(userInfo.accountSummary.totalWithdrawals, currency)}</span>
                  {userInfo.accountSummary.totalWithdrawalsDiscrepancy && (
                    <span className="text-[10px] text-amber-600 font-medium bg-amber-50 px-1 rounded" title="Calculated from rows">
                      Cal: {formatCurrency(userInfo.accountSummary.totalWithdrawalsComputed || 0, currency)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between pt-2 border-t border-[hsl(var(--border))]">
                <span className="font-semibold text-[hsl(var(--foreground))]">Closing Balance</span>
                <span className="font-bold text-[hsl(var(--foreground))]">{formatCurrency(userInfo.accountSummary.endingBalance, currency)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Validation Status Banner ---
interface ValidationStatusBannerProps {
  data: ExtractedData;
}

const ValidationStatusBanner = ({ data }: ValidationStatusBannerProps) => {
  const validation = data.validation_summary;
  const chainValidation = data.chain_validation;
  const missingWarnings = data.missing_transaction_warnings || [];
  const duplicateWarnings = data.duplicate_warnings || [];

  if (!validation) return null;

  const isVerified = validation.status === 'VERIFIED';
  const hasWarnings = missingWarnings.length > 0 || duplicateWarnings.length > 0;

  return (
    <div className={`mb-4 rounded-lg border overflow-hidden ${isVerified
      ? 'border-green-500/30 bg-green-500/5'
      : 'border-amber-500/30 bg-amber-500/5'
      }`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-2.5 ${isVerified ? 'bg-green-500/10' : 'bg-amber-500/10'
        }`}>
        <div className="flex items-center gap-2">
          {isVerified ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <Sparkles className="h-4 w-4 text-amber-600" />
          )}
          <h4 className={`text-sm font-semibold ${isVerified ? 'text-green-700' : 'text-amber-700'}`}>
            {isVerified ? 'Extraction Verified' : 'Review Recommended'}
          </h4>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-[hsl(var(--muted-foreground))]">Chain Integrity:</span>
            <span className={`font-bold ${validation.chain_integrity >= 95 ? 'text-green-600' : 'text-amber-600'}`}>
              {validation.chain_integrity}%
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[hsl(var(--muted-foreground))]">Confidence:</span>
            <span className={`font-bold ${validation.confidence >= 80 ? 'text-green-600' : 'text-amber-600'}`}>
              {validation.confidence}%
            </span>
          </div>
        </div>
      </div>

      {/* Issues/Warnings */}
      {(validation.issues.length > 0 || hasWarnings) && (
        <div className="px-4 py-3 space-y-2">
          {validation.issues.map((issue, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-amber-700">
              <span className="text-amber-500">⚠️</span>
              <span>{issue}</span>
            </div>
          ))}
          {missingWarnings.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-amber-700">
              <span className="text-amber-500">⚠️</span>
              <span>{missingWarnings.length} potential missing transaction(s) detected</span>
            </div>
          )}
          {duplicateWarnings.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-amber-700">
              <span className="text-amber-500">⚠️</span>
              <span>{duplicateWarnings.length} potential duplicate(s) detected</span>
            </div>
          )}
        </div>
      )}

      {/* Chain Validation Summary */}
      {chainValidation && isVerified && (
        <div className="px-4 py-2 border-t border-green-500/20 flex items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
          <span>✓ Opening: ${chainValidation.opening_balance?.toFixed(2)}</span>
          <span>✓ Credits: ${chainValidation.total_credits?.toFixed(2)}</span>
          <span>✓ Debits: ${chainValidation.total_debits?.toFixed(2)}</span>
          <span>✓ Closing: ${chainValidation.computed_closing?.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};

interface ExportSettingsModalProps {
  settings: ExportSettings;
  format: 'qbo' | 'xero' | 'mt940' | 'tally' | null;
  onSettingsChange: (settings: ExportSettings) => void;
  onDownload: () => void;
  onClose: () => void;
}

const ExportSettingsModal = ({ settings, format, onSettingsChange, onDownload, onClose }: ExportSettingsModalProps) => {
  const isQBO = format === 'qbo';
  const isMT940 = format === 'mt940';
  const formatName = format?.toUpperCase() || 'Export';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl shadow-2xl p-7 max-w-md w-full animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 overflow-hidden relative">
        {/* Progress bar hint */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[hsl(var(--primary))]/20">
          <div className="h-full bg-[hsl(var(--primary))] w-2/3 animate-pulse" />
        </div>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10">
              <Settings className="h-5 w-5 text-[hsl(var(--primary))]" />
            </div>
            <div>
              <h3 className="font-bold text-[hsl(var(--foreground))] text-lg">Finalize {formatName} Export</h3>
              <p className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-widest font-semibold">Accounting Configuration</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-[hsl(var(--muted))] transition-colors group">
            <X className="h-5 w-5 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))]" />
          </button>
        </div>

        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6 leading-relaxed bg-[hsl(var(--muted))]/30 p-3 rounded-lg border border-[hsl(var(--border))]">
          Configure metadata to ensure 100% compatibility with {formatName}. Fields marked <span className="text-[hsl(var(--primary))] font-bold">*</span> are highly recommended for seamless import.
        </p>

        <div className="space-y-4 max-h-[50vh] overflow-y-auto px-1 pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[hsl(var(--border))] [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="grid gap-1.5">
            <label className="text-xs font-semibold text-[hsl(var(--foreground))] flex items-center gap-1">
              Bank Name {(isQBO || isMT940 || format === 'tally') && <span className="text-[hsl(var(--primary))]" title="Required">*</span>}
            </label>
            <Input
              value={settings.bankName || ''}
              onChange={(e) => onSettingsChange({ ...settings, bankName: e.target.value })}
              placeholder="e.g. Chase Bank"
              className="h-10 bg-[hsl(var(--muted))]/20 border-[hsl(var(--border))] focus:ring-1 focus:ring-[hsl(var(--primary))]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-[hsl(var(--foreground))] flex items-center gap-1">
                Account No. {(isQBO || isMT940) && <span className="text-[hsl(var(--primary))]" title="Required">*</span>}
              </label>
              <Input
                value={settings.accountNumber || ''}
                onChange={(e) => onSettingsChange({ ...settings, accountNumber: e.target.value })}
                placeholder="000000000"
                className="h-10 bg-[hsl(var(--muted))]/20 border-[hsl(var(--border))]"
              />
            </div>
            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-[hsl(var(--foreground))] uppercase tracking-tight flex items-center gap-1">
                Currency <span className="text-[hsl(var(--primary))]" title="Required for all formats">*</span>
              </label>
              <CurrencySelect
                value={settings.currency || ''}
                onChange={(val) => onSettingsChange({ ...settings, currency: val })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-[hsl(var(--foreground))] flex items-center gap-1">
                Routing / Sort {isQBO && <span className="text-[hsl(var(--primary))]" title="Required for QBO">*</span>}
              </label>
              <Input
                value={settings.routingNumber || ''}
                onChange={(e) => onSettingsChange({ ...settings, routingNumber: e.target.value })}
                placeholder={isQBO ? "Required" : "Optional"}
                className={`h-10 bg-[hsl(var(--muted))]/20 border-[hsl(var(--border))] ${isQBO && !settings.routingNumber ? 'border-[hsl(var(--primary))]/30' : ''}`}
              />
            </div>
            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-[hsl(var(--foreground))] flex items-center gap-1">
                Statement Seq. {isMT940 && <span className="text-[hsl(var(--primary))]" title="Required for MT940">*</span>}
              </label>
              <Input
                value={settings.statementNumber || ''}
                onChange={(e) => onSettingsChange({ ...settings, statementNumber: e.target.value })}
                placeholder="e.g. 1"
                className="h-10 bg-[hsl(var(--muted))]/20 border-[hsl(var(--border))]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Button variant="outline" onClick={onClose} className="flex-1 h-11 border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]">
            Cancel
          </Button>
          <Button
            onClick={onDownload}
            disabled={
              !settings.currency ||
              (isQBO && (!settings.bankName || !settings.accountNumber || !settings.routingNumber)) ||
              (isMT940 && (!settings.bankName || !settings.accountNumber || !settings.statementNumber)) ||
              (format === 'tally' && !settings.bankName)
            }
            className="flex-1 h-11 bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary))]/90 shadow-lg shadow-[hsl(var(--primary))]/20 gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <Download className="h-4 w-4" />
            Download {formatName}
          </Button>
        </div>

        <p className="text-[10px] text-center text-[hsl(var(--muted-foreground))] mt-4 italic">
          Files are generated locally in your browser for maximum privacy.
        </p>
      </div>
    </div>
  );
};


// --- Dynamic Table Component (Editable) ---
const ExportMenu = ({ onExport, onExportMT940, onExportQBO, onExportXero, isPro, onUpgrade, disabled }: {
  onExport: (format: 'csv' | 'excel') => void;
  onExportMT940: () => void;
  onExportQBO: () => void;
  onExportXero: () => void;
  isPro: boolean;
  onUpgrade: () => void;
  disabled: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="default"
        size="sm"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2 px-3 shadow-sm h-8 text-xs bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90"
      >
        <Download className="h-3.5 w-3.5" />
        Export
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--popover))] p-1 text-[hsl(var(--popover-foreground))] shadow-md outline-none z-[100] animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2">
          <div className="px-2 py-1.5 text-xs font-semibold text-[hsl(var(--muted-foreground))]">
            Standard Formats
          </div>
          <button
            onClick={() => handleAction(() => onExport('csv'))}
            className="w-full flex items-center rounded-sm px-2 py-1.5 text-xs hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] outline-none cursor-pointer"
          >
            <FileText className="mr-2 h-3.5 w-3.5" />
            CSV
          </button>
          <button
            onClick={() => handleAction(() => onExport('excel'))}
            className="w-full flex items-center rounded-sm px-2 py-1.5 text-xs hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] outline-none cursor-pointer"
          >
            <FileText className="mr-2 h-3.5 w-3.5" />
            Excel
          </button>

          <div className="h-px bg-[hsl(var(--border))] my-1" />

          <div className="px-2 py-1.5 text-xs font-semibold text-[hsl(var(--muted-foreground))] flex items-center justify-between">
            <span>Accounting Software</span>
            {!isPro && <Lock className="h-3 w-3" />}
          </div>

          {/* MT940 */}
          <button
            onClick={() => isPro ? handleAction(onExportMT940) : onUpgrade()}
            className={`w-full flex items-center justify-between rounded-sm px-2 py-1.5 text-xs outline-none cursor-pointer ${isPro ? 'hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]' : 'opacity-75 hover:bg-amber-500/10 text-amber-600'}`}
          >
            <span className="flex items-center">
              <Download className="mr-2 h-3.5 w-3.5" />
              MT940
            </span>
            {!isPro && <Crown className="h-3 w-3 text-amber-500" />}
          </button>

          {/* QBO */}
          <button
            onClick={() => isPro ? handleAction(onExportQBO) : onUpgrade()}
            className={`w-full flex items-center justify-between rounded-sm px-2 py-1.5 text-xs outline-none cursor-pointer ${isPro ? 'hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]' : 'opacity-75 hover:bg-amber-500/10 text-amber-600'}`}
          >
            <span className="flex items-center">
              <Download className="mr-2 h-3.5 w-3.5" />
              QuickBooks (QBO)
            </span>
            {!isPro && <Crown className="h-3 w-3 text-amber-500" />}
          </button>

          {/* Xero */}
          <button
            onClick={() => isPro ? handleAction(onExportXero) : onUpgrade()}
            className={`w-full flex items-center justify-between rounded-sm px-2 py-1.5 text-xs outline-none cursor-pointer ${isPro ? 'hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]' : 'opacity-75 hover:bg-amber-500/10 text-amber-600'}`}
          >
            <span className="flex items-center">
              <Download className="mr-2 h-3.5 w-3.5" />
              Xero
            </span>
            {!isPro && <Crown className="h-3 w-3 text-amber-500" />}
          </button>
        </div>
      )}
    </div>
  );
};

interface DynamicTableProps {
  transactions: ExtractedData['transactions'];
  currency?: string;
  columnNames?: { [key: string]: string };
  title?: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
  onDataChange?: (transactions: ExtractedData['transactions']) => void;
  fullHeight?: boolean;
}

const DynamicTable = ({ transactions: initialTransactions, currency = '$', columnNames, title = "", subtitle, headerActions, onDataChange, fullHeight = false }: DynamicTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; field: string } | null>(null);
  const [editValue, setEditValue] = useState("");
  // Calculate edited count dynamically
  const editedCount = transactions.filter(t => (t as any)._isEdited).length;
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(() => {
    const cols = new Set(["Date", "Description", "Credit", "Debit", "Balance"]);
    const hasRef = initialTransactions.some(t => t.reference && t.reference.toString().trim() !== '');
    if (hasRef) cols.add("Reference");
    return cols;
  });
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [dateFormat, setDateFormat] = useState("original");
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [newRowIndex, setNewRowIndex] = useState<number | null>(null);
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState<number | null>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showColumnMenu && !(event.target as Element).closest('[data-column-menu]')) {
        setShowColumnMenu(false);
      }
      if (showDateMenu && !(event.target as Element).closest('[data-date-menu]')) {
        setShowDateMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showColumnMenu, showDateMenu]);

  // Dynamic columns based on provided columnNames or defaults
  const ALL_COLUMNS = useMemo(() => {
    const defaults = ["Date", "Description", "Reference", "Credit", "Debit", "Balance", "Type"];
    if (!columnNames) return defaults;

    // Add extra columns from columnNames that aren't in defaults
    const extra = Object.values(columnNames).filter(name => !defaults.includes(name));
    return [...defaults, ...extra];
  }, [columnNames]);

  const DATE_FORMATS = [
    { value: "original", label: "Original" },
    { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
    { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
    { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
  ];

  // Toggle column visibility
  const toggleColumn = (col: string) => {
    setVisibleColumns(prev => {
      const next = new Set(prev);
      if (next.has(col) && next.size > 1) next.delete(col);
      else next.add(col);
      return next;
    });
  };

  // Close column menu when clicking outside
  useEffect(() => {
    if (!showColumnMenu) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-column-menu]')) {
        setShowColumnMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showColumnMenu]);

  // Format date based on selection
  const formatDateValue = (dateStr: string): string => {
    if (!dateStr || dateFormat === "original") return dateStr;
    const match = dateStr.match(/(\d{1,4})[-\/](\d{1,2})[-\/](\d{1,4})/);
    if (!match) return dateStr;
    let y: string, m: string, d: string;
    if (match[1].length === 4) { y = match[1]; m = match[2]; d = match[3]; }
    else { m = match[1]; d = match[2]; y = match[3]; }
    m = m.padStart(2, '0'); d = d.padStart(2, '0');
    switch (dateFormat) {
      case "YYYY-MM-DD": return `${y}-${m}-${d}`;
      case "MM/DD/YYYY": return `${m}/${d}/${y}`;
      case "DD/MM/YYYY": return `${d}/${m}/${y}`;
      default: return dateStr;
    }
  };

  // Add new row
  const addNewRow = () => {
    const newTxn = { date: new Date().toISOString().split('T')[0], description: "New Transaction", amount: 0, balance: 0, type: 'debit' as const, moneyIn: 0, moneyOut: 0 };
    const updated = [...transactions, newTxn];
    setTransactions(updated);
    if (onDataChange) onDataChange(updated);
    setNewRowIndex(updated.length - 1);
    // Scroll to bottom after render
    setTimeout(() => {
      if (tableContainerRef.current) {
        tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
      }
    }, 50);
    // Clear highlight after 2 seconds
    setTimeout(() => setNewRowIndex(null), 2000);
  };

  // Sync with parent if initial transactions change
  useEffect(() => {
    setTransactions(initialTransactions);
  }, [initialTransactions]);

  // Convert transactions to rows for display
  const { headers, filteredData } = useMemo(() => {
    if (!transactions || transactions.length === 0) return { headers: [], filteredData: [] };

    const headers = ALL_COLUMNS.filter(c => visibleColumns.has(c));

    // Filter rows based on search term
    const filtered = transactions.filter(t =>
      (t.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.date || '').includes(searchTerm) ||
      String(t.amount || '').includes(searchTerm)
    );

    // Sort rows
    const sorted = [...filtered].sort((a, b) => {
      if (!sortConfig) return 0;

      let aValue: any = '';
      let bValue: any = '';

      switch (sortConfig.key) {
        case 'Date': aValue = a.date; bValue = b.date; break;
        case 'Description': aValue = a.description; bValue = b.description; break;
        case "Credit":
          aValue = a.moneyIn || (a.type === 'credit' ? a.amount : 0);
          bValue = b.moneyIn || (b.type === 'credit' ? b.amount : 0);
          break;
        case "Debit":
          aValue = a.moneyOut || (a.type === 'debit' ? a.amount : 0);
          bValue = b.moneyOut || (b.type === 'debit' ? b.amount : 0);
          break;
        case 'Balance': aValue = a.balance; bValue = b.balance; break;
        case 'Reference': aValue = a.reference || ''; bValue = b.reference || ''; break;
        default: return 0;
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return { headers, filteredData: sorted };
  }, [transactions, searchTerm, sortConfig, visibleColumns, ALL_COLUMNS]);

  // Reset to first page when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortConfig]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const requestSort = (headerKey: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === headerKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: headerKey, direction });
  };

  // Start editing a cell
  const startEdit = (rowIndex: number, field: string, currentValue: string | number) => {
    setEditingCell({ rowIndex, field });
    setEditValue(String(currentValue ?? ""));
  };

  // Save edit
  const saveEdit = (originalIndex: number, field: string) => {
    const newTransactions = [...transactions];
    const txn = { ...newTransactions[originalIndex] };

    // Update the appropriate field
    // Backup original state if first edit
    if (!(txn as any)._isEdited) {
      (txn as any)._original = { ...txn };
    }

    switch (field) {
      case 'Date':
        txn.date = editValue;
        // Sync date_iso if possible to preserve export accuracy
        if (/^\d{4}-\d{2}-\d{2}$/.test(editValue)) {
          txn.date_iso = editValue;
        } else {
          // Attempt basic parsing for MM/DD/YYYY or DD/MM/YYYY
          const match = editValue.match(/(\d{1,4})[-\/](\d{1,2})[-\/](\d{1,4})/);
          if (match) {
            let y: string, m: string, d: string;
            if (match[1].length === 4) { y = match[1]; m = match[2]; d = match[3]; }
            else { m = match[1]; d = match[2]; y = match[3]; }
            txn.date_iso = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
          }
        }
        break;
      case 'Description':
        txn.description = editValue;
        break;
      case 'Reference':
        txn.reference = editValue;
        break;
      case 'Credit':
        const creditVal = parseFloat(editValue.replace(/[^-\d.]/g, '')) || 0;
        txn.moneyIn = creditVal;
        txn.moneyOut = 0;
        (txn as any).credit = undefined; // Clear string display
        (txn as any).debit = undefined;
        if (creditVal > 0) {
          txn.type = 'credit';
          txn.amount = creditVal;
        } else if (creditVal === 0) {
          // Handle 0
          txn.amount = 0;
        }
        break;
      case 'Debit':
        const debitVal = parseFloat(editValue.replace(/[^-\d.]/g, '')) || 0;
        txn.moneyOut = debitVal;
        txn.moneyIn = 0;
        (txn as any).debit = undefined; // Clear string display
        (txn as any).credit = undefined;
        if (debitVal > 0) {
          txn.type = 'debit';
          txn.amount = debitVal;
        }
        break;
      case 'Balance':
        txn.balance = parseFloat(editValue.replace(/[^-\d.]/g, '')) || 0;
        (txn as any).balance_display = undefined; // Clear string display
        break;
      default:
        // Handle dynamic fields
        const key = columnNames ? Object.keys(columnNames).find(k => columnNames[k] === field) : field.toLowerCase();
        (txn as any)[key || field.toLowerCase()] = editValue;
        break;
    }

    (txn as any)._isEdited = true;
    newTransactions[originalIndex] = txn;
    setTransactions(newTransactions);

    setEditingCell(null);
    setEditValue("");

    // Notify parent of changes
    if (onDataChange) {
      onDataChange(newTransactions);
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue("");
  };

  // Delete row - show confirmation first
  const requestDelete = (originalIndex: number) => {
    setPendingDeleteIndex(originalIndex);
  };

  const confirmDelete = () => {
    if (pendingDeleteIndex === null) return;
    const deletedTxn = transactions[pendingDeleteIndex];
    const newTransactions = transactions.filter((_, i) => i !== pendingDeleteIndex);
    setTransactions(newTransactions);

    // Update edited count if deleted transaction was edited
    // No explicit update needed as editedCount is derived


    if (onDataChange) {
      onDataChange(newTransactions);
    }
    setPendingDeleteIndex(null);
  };

  const cancelDelete = () => {
    setPendingDeleteIndex(null);
  };

  // Undo edit
  const undoEdit = (originalIndex: number) => {
    const newTransactions = [...transactions];
    const txn = newTransactions[originalIndex];

    if ((txn as any)._isEdited && (txn as any)._original) {
      newTransactions[originalIndex] = { ...(txn as any)._original };
      setTransactions(newTransactions);

      if (onDataChange) {
        onDataChange(newTransactions);
      }
    }
  };

  // Get cell value for display
  const getCellValue = (t: any, header: string): string => {
    const moneyIn = t.moneyIn !== undefined ? t.moneyIn : (t.type === 'credit' ? t.amount : 0);
    const moneyOut = t.moneyOut !== undefined ? t.moneyOut : (t.type === 'debit' ? t.amount : 0);

    switch (header) {
      case 'Date': return formatDateValue(t.date);
      case 'Description': return t.description;
      case 'Reference': return t.reference || '';
      case 'Credit':
        // Strict Non-Destructive: Show original string if available, else formatted number
        return (t.credit && t.credit !== '-' && t.credit.trim() !== '') ? t.credit : (moneyIn > 0 ? formatCurrency(moneyIn, currency) : '-');
      case 'Debit':
        return (t.debit && t.debit !== '-' && t.debit.trim() !== '') ? t.debit : (moneyOut > 0 ? formatCurrency(moneyOut, currency) : '-');
      case 'Balance':
        // Use preserved string for display, fall back to formatted number
        return (t.balance_display && t.balance_display !== '-') ? t.balance_display : formatCurrency(t.balance, currency);
      case 'Type': return t.type || 'debit';
      default:
        // Try to find the key from columnNames or use header as key
        const key = columnNames ? Object.keys(columnNames).find(k => columnNames[k] === header) : header.toLowerCase();
        return t[key || header] || t[header.toLowerCase()] || '';
    }
  };

  // Get raw value for editing
  const getRawValue = (t: any, header: string): string => {
    const moneyIn = t.moneyIn !== undefined ? t.moneyIn : (t.type === 'credit' ? t.amount : 0);
    const moneyOut = t.moneyOut !== undefined ? t.moneyOut : (t.type === 'debit' ? t.amount : 0);

    switch (header) {
      case 'Date': return t.date || '';
      case 'Description': return t.description || '';
      case 'Reference': return t.reference || '';
      case 'Credit': return (t.credit && t.credit !== '-' && t.credit.trim() !== '') ? t.credit : (moneyIn > 0 ? String(moneyIn) : '');
      case 'Debit': return (t.debit && t.debit !== '-' && t.debit.trim() !== '') ? t.debit : (moneyOut > 0 ? String(moneyOut) : '');
      case 'Balance': return (t.balance_display && t.balance_display !== '-') ? t.balance_display : String(t.balance || 0);
      case 'Type': return t.type || 'debit';
      default:
        const key = columnNames ? Object.keys(columnNames).find(k => columnNames[k] === header) : header.toLowerCase();
        return String(t[key || header] || t[header.toLowerCase()] || '');
    }
  };

  // Helper to determine cell style based on header
  const getCellStyle = (header: string, content: string, isEdited: boolean) => {
    let base = "text-[hsl(var(--foreground))]";
    if (header === "Credit" && content !== '-') base = "text-green-600 font-medium";
    if (header === "Debit" && content !== '-') base = "text-red-600 font-medium";
    if (isEdited) base += " bg-amber-500/5";
    return base;
  };

  if (transactions.length === 0) return <div className="text-center py-8 text-[hsl(var(--muted-foreground))]">No transaction data found.</div>;

  return (
    <div className={fullHeight ? "flex flex-col h-full gap-3" : "space-y-3"}>
      {/* Header with title and controls */}
      <div className="space-y-2 pb-1">
        {/* Controls Row - Split */}
        <div className="flex items-center justify-between gap-2 flex-wrap w-full">
          <div className="flex items-center gap-2">
            {/* Date Format */}
            <div className="relative" data-date-menu>
              <button
                onClick={(e) => { e.stopPropagation(); setShowDateMenu(!showDateMenu); }}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] transition-colors bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
              >
                <FileText className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))]" />
                <span className="hidden sm:inline">{DATE_FORMATS.find(f => f.value === dateFormat)?.label}</span>
                <ChevronDown className="w-3 h-3 text-[hsl(var(--muted-foreground))]" />
              </button>
              {showDateMenu && (
                <div className="absolute left-0 top-full mt-1 z-50 w-48 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-xl py-1.5">
                  {DATE_FORMATS.map(f => (
                    <button
                      key={f.value}
                      onClick={() => { setDateFormat(f.value); setShowDateMenu(false); }}
                      className={`flex items-center w-full px-3 py-1.5 hover:bg-[hsl(var(--muted))] text-xs text-left gap-2 ${dateFormat === f.value ? 'bg-[hsl(var(--muted))] font-medium' : ''}`}
                    >
                      {dateFormat === f.value && <CheckCircle2 className="h-3 w-3 text-[hsl(var(--primary))]" />}
                      <span className={dateFormat === f.value ? "" : "pl-5"}>{f.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Column Toggle */}
            <div className="relative" data-column-menu>
              <button
                onClick={(e) => { e.stopPropagation(); setShowColumnMenu(!showColumnMenu); }}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Columns</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {showColumnMenu && (
                <div className="absolute right-0 top-full mt-1 z-50 w-40 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-xl py-1.5">
                  {ALL_COLUMNS.map(col => (
                    <label key={col} className="flex items-center gap-2 px-3 py-1.5 hover:bg-[hsl(var(--muted))] cursor-pointer text-xs">
                      <input type="checkbox" checked={visibleColumns.has(col)} onChange={() => toggleColumn(col)} className="rounded border-[hsl(var(--border))] text-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]" />
                      {col}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 h-8 w-64 text-xs"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {editedCount > 0 && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 font-medium border border-amber-500/20 animate-in fade-in zoom-in-50">
                {editedCount} edited
              </span>
            )}
            {headerActions}
          </div>
        </div>

        {/* Title Row - Left Aligned */}
        {title && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h4 className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">{title}</h4>
                {subtitle && <p className="text-xs text-[hsl(var(--muted-foreground))] font-normal mt-0.5">{subtitle}</p>}
              </div>
              {editedCount > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-medium self-start mt-0.5">
                  {editedCount} edited
                </span>
              )}
            </div>
          </div>
        )}
      </div>



      <div className={`rounded-lg border border-[hsl(var(--border))] overflow-hidden ${fullHeight ? 'flex-1 min-h-0 flex flex-col' : ''}`}>
        <div ref={tableContainerRef} className={`overflow-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[hsl(var(--border))] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[hsl(var(--muted-foreground))] ${fullHeight ? 'flex-1' : 'max-h-[400px]'}`} style={{ scrollbarWidth: 'thin', scrollbarColor: 'hsl(var(--border)) transparent' }}>
          <table className="w-full text-sm text-left">
            <thead className="bg-[hsl(var(--muted))]/50 text-[hsl(var(--foreground))]">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 font-semibold border-b border-[hsl(var(--border))] whitespace-nowrap cursor-pointer hover:bg-[hsl(var(--muted))] sticky top-0 bg-[hsl(var(--muted))]/80 backdrop-blur-sm"
                    onClick={() => requestSort(header)}
                  >
                    <div className="flex items-center gap-1">
                      {header}
                      <ArrowUpDown className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                    </div>
                  </th>
                ))}
                <th className="w-10 px-2 py-3"></th>
              </tr>
            </thead>
            <tbody data-clarity-mask="true">
              {filteredData.map((t, rowIndex) => {
                const originalIndex = transactions.findIndex(orig => orig === t);
                const isEdited = (t as any)._isEdited;
                const isNewRow = newRowIndex === originalIndex;

                return (
                  <tr
                    key={rowIndex}
                    className={`hover:bg-[hsl(var(--muted))]/30 transition-colors ${isEdited ? "bg-amber-500/5" : ""} ${isNewRow ? "bg-green-500/20 animate-pulse" : ""}`}
                  >
                    {headers.map((header, cellIndex) => {
                      const isEditing = editingCell?.rowIndex === originalIndex && editingCell?.field === header;
                      const cellValue = getCellValue(t, header);

                      // Check for validation corrections
                      let validationNote = null;
                      let isCorrected = false;

                      if (t.suggested) {
                        if (header === 'Balance' && t.suggested.balance !== undefined) {
                          validationNote = `Suggested: ${t.suggested.balance}`;
                          isCorrected = true;
                        } else if (header === 'Credit' && t.suggested.credit !== undefined) {
                          validationNote = `Suggested: ${t.suggested.credit}`;
                          isCorrected = true;
                        } else if (header === 'Debit' && t.suggested.debit !== undefined) {
                          validationNote = `Suggested: ${t.suggested.debit}`;
                          isCorrected = true;
                        }
                      } else if (t._ledger_fixed) {
                        if (header === 'Balance' && t.balance_corrected) {
                          validationNote = `Suggested: ${t.balance_corrected}`;
                          isCorrected = true;
                        } else if (header === 'Credit' && t.credit_corrected) {
                          validationNote = `Suggested: ${t.credit_corrected}`;
                          isCorrected = true;
                        } else if (header === 'Debit' && t.debit_corrected) {
                          validationNote = `Suggested: ${t.debit_corrected}`;
                          isCorrected = true;
                        }
                      }

                      return (
                        <td key={cellIndex} className={`px-4 py-3 border border-[hsl(var(--border))]/30 hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--primary))]/5 cursor-text transition-colors ${getCellStyle(header, cellValue, isEdited)} ${isCorrected ? "bg-amber-100/30 dark:bg-amber-900/20" : ""}`} title={validationNote || undefined}>
                          {isEditing ? (
                            <div className="flex items-center gap-1">
                              <input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') saveEdit(originalIndex, header);
                                  if (e.key === 'Escape') cancelEdit();
                                }}
                                className="flex-1 px-2 py-1 rounded border border-[hsl(var(--primary))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] outline-none text-sm min-w-[80px]"
                              />
                              <button onClick={() => saveEdit(originalIndex, header)} className="p-1 rounded hover:bg-green-500/10 text-green-500">
                                <CheckCircle2 className="w-3 h-3" />
                              </button>
                              <button onClick={cancelEdit} className="p-1 rounded hover:bg-red-500/10 text-red-500">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-col">
                              <span
                                onClick={() => startEdit(originalIndex, header, getRawValue(t, header))}
                                className="cursor-pointer hover:text-[hsl(var(--primary))] transition-colors"
                              >
                                {cellValue}
                              </span>
                              {isCorrected && (
                                <span className="text-[10px] text-amber-600 font-medium">
                                  {validationNote}
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-1">
                        {isEdited && (
                          <button
                            onClick={() => undoEdit(originalIndex)}
                            className="p-1 rounded hover:bg-amber-500/10 text-[hsl(var(--muted-foreground))] hover:text-amber-600 transition-colors"
                            title="Undo changes"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => requestDelete(originalIndex)}
                          className="p-1 rounded hover:bg-red-500/10 text-[hsl(var(--muted-foreground))] hover:text-red-500 transition-colors"
                          title="Delete row"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {pendingDeleteIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-[hsl(var(--foreground))]">Delete Transaction?</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" size="sm" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button variant="destructive" size="sm" onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer info */}
      <div className="flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))]">
        <div>
          {filteredData.length} transactions
        </div>
      </div>
    </div>
  );
};


// --- Helper: Generate simulated processing steps based on progress ---
const getSimulatedProcessingSteps = (progress: number): ProcessingStep[] => {
  const steps: ProcessingStep[] = [
    {
      id: 'upload',
      name: 'Document Upload',
      status: progress >= 10 ? 'complete' : 'running',
      details: progress >= 10 ? 'Document received' : 'Uploading...'
    },
    {
      id: 'text_extraction',
      name: 'Text Extraction',
      status: progress >= 25 ? 'complete' : progress >= 10 ? 'running' : 'pending',
      details: progress >= 25 ? 'Extracted text using pdfplumber' : progress >= 10 ? 'Extracting text...' : undefined
    },
    {
      id: 'transaction_detection',
      name: 'Transaction Detection',
      status: progress >= 40 ? 'complete' : progress >= 25 ? 'running' : 'pending',
      details: progress >= 40 ? 'Detecting transactions...' : undefined
    },
    {
      id: 'math_verification',
      name: 'Math Verification',
      status: progress >= 55 ? 'complete' : progress >= 40 ? 'running' : 'pending',
      details: progress >= 55 ? 'Balance equation verified' : undefined
    },
    {
      id: 'duplicate_detection',
      name: 'Duplicate Detection',
      status: progress >= 65 ? 'complete' : progress >= 55 ? 'running' : 'pending',
      details: progress >= 65 ? 'Checking for duplicates...' : undefined
    },
    {
      id: 'fraud_analysis',
      name: 'Fraud Analysis',
      status: progress >= 75 ? 'complete' : progress >= 65 ? 'running' : 'pending',
      details: progress >= 75 ? 'Analyzing patterns...' : undefined
    },
    {
      id: 'payee_normalization',
      name: 'Payee Normalization',
      status: progress >= 85 ? 'complete' : progress >= 75 ? 'running' : 'pending',
      details: progress >= 85 ? 'Cleaning merchant names...' : undefined
    },

    {
      id: 'llm_validation',
      name: 'AI Validation',
      status: progress >= 95 ? 'complete' : progress >= 90 ? 'running' : 'pending',
      details: progress >= 95 ? 'Finalizing...' : undefined
    },
  ];
  return steps;
};

// --- Main Component ---
export const ResultsModal = ({ data, file, isProcessing = false, progress = 0, documentId, onClose, onTryAnother, onExport }: ResultsModalProps) => {
  const [showPdf, setShowPdf] = useState(false);
  const [isApproved, setIsApproved] = useState(true);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [editedTransactions, setEditedTransactions] = useState<ExtractedData['transactions'] | null>(null);
  const [showExportSettings, setShowExportSettings] = useState(false);
  const [pendingExportFormat, setPendingExportFormat] = useState<'qbo' | 'xero' | 'mt940' | 'tally' | null>(null);
  const [exportSettings, setExportSettings] = useState<ExportSettings>({
    routingNumber: '',
    statementNumber: '1',
    currency: 'USD',
    accountNumber: '',
    bankName: ''
  });

  // Sync settings when data changes
  // Sync settings when data changes
  // Auto-population removed as per user request to avoid confusion with summary removal
  // useEffect(() => {
  //   if (data?.userInfo) {
  //     setExportSettings(prev => ({
  //       ...prev,
  //       currency: data.userInfo.currency || prev.currency,
  //       accountNumber: data.userInfo.accountNumber || prev.accountNumber,
  //       bankName: data.userInfo.bankName || prev.bankName
  //     }));
  //   }
  // }, [data]);
  const { isSignedIn, isLoaded } = useAuth();
  const { usage } = useUsage();

  // Get the current transactions (edited or original)
  const currentTransactions = editedTransactions || data?.transactions || [];

  // Create data object with potentially edited transactions for export
  const editedData = useMemo(() => {
    if (!data) return null;
    return {
      ...data,
      transactions: currentTransactions
    };
  }, [data, currentTransactions]);

  // Handle transaction edits from table
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleTransactionsChange = useCallback((newTransactions: ExtractedData['transactions']) => {
    setEditedTransactions(newTransactions);

    // Debounced save to IndexedDB
    if (documentId) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        StorageService.updateDocumentTransactions(documentId, newTransactions)
          .catch(err => console.error('Failed to persist edits:', err));
      }, 1000); // 1 second debounce
    }
  }, [documentId]);

  // Determine if user has Pro tier (pro, enterprise, or admin)
  const isPro = !!(usage?.tier && ['pro', 'enterprise', 'admin'].includes(usage.tier.toLowerCase()));

  // Effect to create and revoke PDF object URL
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setFileUrl(null);
  }, [file]);

  const handleExport = (format: 'csv' | 'excel') => {
    if (isLoaded && !isSignedIn) {
      // Save data to localStorage so it can be recovered after login
      if (editedData) {
        localStorage.setItem("pending_extraction", JSON.stringify({
          data: editedData,
          fileName: file?.name || "Extracted Statement.pdf",
          date: new Date().toLocaleDateString()
        }));
      }
      setShowLoginPrompt(true);
    } else if (editedData) {
      // Export with edited data
      import("@/lib/exportService").then(({ ExportService }) => {
        if (format === 'csv') ExportService.exportToCSV(editedData);
        else ExportService.exportToExcel(editedData);
        toast.success(`Exported as ${format.toUpperCase()}`);
      });
    }
  };

  const handleExportQBO = () => {
    if (isLoaded && !isSignedIn) {
      if (editedData) {
        localStorage.setItem("pending_extraction", JSON.stringify({
          data: editedData,
          fileName: file?.name || "Extracted Statement.pdf",
          date: new Date().toLocaleDateString()
        }));
      }
      setShowLoginPrompt(true);
    } else if (editedData) {
      setPendingExportFormat('qbo');
      setShowExportSettings(true);
    }
  };

  const handleExportXero = () => {
    if (isLoaded && !isSignedIn) {
      if (editedData) {
        localStorage.setItem("pending_extraction", JSON.stringify({
          data: editedData,
          fileName: file?.name || "Extracted Statement.pdf",
          date: new Date().toLocaleDateString()
        }));
      }
      setShowLoginPrompt(true);
    } else if (editedData) {
      setPendingExportFormat('xero');
      setShowExportSettings(true);
    }
  };

  const handleExportMT940 = () => {
    if (isLoaded && !isSignedIn) {
      if (editedData) {
        localStorage.setItem("pending_extraction", JSON.stringify({
          data: editedData,
          fileName: file?.name || "Extracted Statement.pdf",
          date: new Date().toLocaleDateString()
        }));
      }
      setShowLoginPrompt(true);
    } else if (editedData) {
      setPendingExportFormat('mt940');
      setShowExportSettings(true);
    }
  };

  const handleExportTally = () => {
    if (isLoaded && !isSignedIn) {
      if (editedData) {
        localStorage.setItem("pending_extraction", JSON.stringify({
          data: editedData,
          fileName: file?.name || "Extracted Statement.pdf",
          date: new Date().toLocaleDateString()
        }));
      }
      setShowLoginPrompt(true);
    } else if (editedData) {
      setPendingExportFormat('tally');
      setShowExportSettings(true);
    }
  };

  const handleFinalDownload = () => {
    if (!editedData || !pendingExportFormat) return;

    try {
      switch (pendingExportFormat) {
        case 'qbo':
          if (!exportSettings.routingNumber && isPro) {
            toast.error("Routing Number is highly recommended for QBO import.");
          }
          ExportService.exportToQBO(editedData, exportSettings);
          toast.success("QuickBooks file (.qbo) downloaded!");
          break;
        case 'xero':
          ExportService.exportToXero(editedData, exportSettings);
          toast.success("Xero file (.csv) downloaded!");
          break;
        case 'mt940':
          ExportService.exportToMT940(editedData, exportSettings);
          toast.success("MT940 file downloaded!");
          break;
        case 'tally':
          ExportService.exportToTally(editedData, exportSettings);
          toast.success("Tally file (.xml) downloaded!");
          break;
      }
      setShowExportSettings(false);
      setPendingExportFormat(null);
    } catch (error) {
      console.error('Export failed:', error);
      toast.error("Failed to generate export file.");
    }
  };

  const handleCopyToClipboard = () => {
    if (isLoaded && !isSignedIn) {
      if (editedData) {
        localStorage.setItem("pending_extraction", JSON.stringify({
          data: editedData,
          fileName: file?.name || "Extracted Statement.pdf",
          date: new Date().toLocaleDateString()
        }));
      }
      setShowLoginPrompt(true);
      return;
    }
    try {
      if (!editedData) {
        toast.error("No data to copy.");
        return;
      }
      ExportService.copyToClipboard(editedData);
      toast.success("Data copied to clipboard!");
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast.error("Failed to copy data.");
    }
  };

  // --- JSX Rendering ---
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
      <div className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-2xl animate-fade-in">

        {/* Compact Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500/10">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                {isProcessing ? 'Processing...' : 'Extraction Complete'}
              </h3>
              <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
                {isProcessing
                  ? 'Analyzing document'
                  : data?.summary?.transactionCount && data.summary.transactionCount > 0
                    ? `${data.summary.transactionCount} transactions detected`
                    : 'Ready to export'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {!showPdf && fileUrl && (
              <Button variant="outline" size="sm" onClick={() => setShowPdf(true)} className="h-7 text-xs px-2">
                Show PDF
              </Button>
            )}
            {!isProcessing && (
              <Button variant="outline" size="sm" onClick={onTryAnother} className="h-7 text-xs px-2">
                Try Another
              </Button>
            )}
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded hover:bg-[hsl(var(--muted))] transition-colors"
            >
              <X className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(95vh-3rem)]">

          {/* Left Side - PDF Viewer */}
          <div className={`w-1/2 border-r border-[hsl(var(--border))] ${showPdf ? 'block' : 'hidden'}`}>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30">
                <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Original PDF</span>
                <button
                  onClick={() => setShowPdf(false)}
                  className="flex h-5 w-5 items-center justify-center rounded hover:bg-[hsl(var(--muted))] transition-colors"
                >
                  <EyeOff className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
                </button>
              </div>
              <div className="flex-1 overflow-auto">
                {fileUrl && (
                  <iframe
                    src={`${fileUrl}#toolbar=0&navpanes=0`}
                    className="h-full w-full border-none"
                    title="PDF Viewer"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Transaction Data */}
          <div className={`${showPdf ? 'w-1/2' : 'w-full'} flex flex-col relative`}>


            <div className="flex-1 flex flex-col overflow-hidden p-4">
              {isProcessing ? (
                // ===== SIMPLE PROCESSING LOADER =====
                <div className="flex-1 flex flex-col items-center justify-center gap-6">
                  {/* Circular Progress */}
                  <div className="relative w-32 h-32">
                    {/* Background circle */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="8"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${progress * 2.83} 283`}
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                    {/* Percentage text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-[hsl(var(--foreground))]">{Math.round(progress)}%</span>
                    </div>
                  </div>

                  {/* Status text */}
                  <div className="text-center space-y-2">
                    <p className="text-lg font-medium text-[hsl(var(--foreground))]">
                      Processing your statement...
                    </p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      {progress < 30 && "Extracting text from PDF..."}
                      {progress >= 30 && progress < 60 && "Detecting transactions..."}
                      {progress >= 60 && progress < 85 && "Verifying data..."}
                      {progress >= 85 && "Almost done..."}
                    </p>
                    {/* Estimated time */}
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-4">
                      {progress < 100 && (
                        <>
                          Estimated time: ~{Math.max(1, Math.ceil((100 - progress) / 10))} sec
                        </>
                      )}
                    </p>
                  </div>

                  {/* File name */}
                  {file?.name && (
                    <p className="text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))]/50 px-3 py-1.5 rounded-full">
                      📄 {file.name}
                    </p>
                  )}
                </div>
              ) : data ? (
                // ===== RESULTS UI =====
                <>
                  {/* Processing Pipeline - Only show if backend returned it */}
                  {data.processing_steps && data.processing_steps.length > 0 && (
                    <ProcessingPipeline
                      steps={data.processing_steps.map(s => ({ ...s, subSteps: s.sub_steps })) as ProcessingStep[]}
                      isProcessing={false}
                      isPro={isPro}
                      fileName={file?.name}
                      pageCount={data.num_pages}
                      transactionCount={data.summary?.transactionCount}
                      className="mb-3"
                      onUpgradeClick={() => setShowUpgradePrompt(true)}
                    />
                  )}



                  {/* Single Unified Table (Smart Reconciled) */}
                  {data.transactions && data.transactions.length > 0 && (
                    <div className="flex-1 min-h-0 flex flex-col mb-8">
                      <DynamicTable
                        fullHeight={true}
                        transactions={currentTransactions}
                        currency={data.userInfo.currency}
                        columnNames={data.column_names}
                        headerActions={(
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={handleCopyToClipboard} disabled={!isApproved} className="h-8 text-xs px-3">
                              <Copy className="h-3.5 w-3.5 mr-1.5" />Copy
                            </Button>
                            <ExportMenu
                              onExport={handleExport}
                              onExportMT940={handleExportMT940}
                              onExportQBO={handleExportQBO}
                              onExportXero={handleExportXero}
                              isPro={isPro}
                              onUpgrade={() => setShowUpgradePrompt(true)}
                              disabled={!isApproved}
                            />
                          </div>
                        )}
                        onDataChange={handleTransactionsChange}
                      />
                    </div>
                  )}


                  {/* detailed Sections (Collapsible) */}
                  {data.sections && data.sections.length > 0 && (
                    // Only show sections if we have more than one, or if the single section differs from the main table
                    !(data.sections.length === 1 && data.transactions && data.sections[0].transactions.length === data.transactions.length) && (
                      <div className="space-y-4 border-t border-[hsl(var(--border))] pt-6 mt-4">
                        <details className="group" open>
                          <summary className="flex items-center gap-2 cursor-pointer select-none text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors w-full">
                            <div className="flex items-center gap-2 flex-1">
                              <FileText className="h-4 w-4" />
                              <h4 className="text-sm font-semibold uppercase tracking-wider">Review Data by Source Section</h4>
                            </div>
                            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                          </summary>

                          <div className="space-y-8 mt-6 pl-2 border-l-2 border-[hsl(var(--muted))] animate-in fade-in slide-in-from-top-2 duration-200">
                            {data.sections.map((section, idx) => (
                              <div key={idx} className="space-y-2">
                                <DynamicTable
                                  transactions={section.transactions}
                                  currency={data.userInfo.currency}
                                  columnNames={data.column_names}
                                  title={section.name}
                                />
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>
                    )
                  )}

                  {/* Privacy Notice */}

                </>
              ) : null}
            </div>

            {/* Inline Login Prompt Overlay */}
            {showLoginPrompt && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px] animate-fade-in rounded-br-2xl">
                <div className="w-full max-w-sm bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-2xl p-6 animate-scale-in mx-4">
                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowLoginPrompt(false)}
                      className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-center mt-2">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10">
                      <Sparkles className="h-6 w-6 text-[hsl(var(--primary))]" />
                    </div>
                    <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-2">
                      Sign in to Download
                    </h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
                      Create a free account to download your extracted data and save it to your dashboard.
                    </p>
                    <div className="space-y-3">
                      <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                        <Button className="w-full gap-2 shadow-lg hover:shadow-xl transition-all">
                          Login / Sign Up Free
                        </Button>
                      </SignInButton>
                      <Button
                        variant="ghost"
                        onClick={() => setShowLoginPrompt(false)}
                        className="w-full"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Upgrade Prompt for Pro Features */}
            {showUpgradePrompt && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px] animate-fade-in rounded-br-2xl">
                <div className="w-full max-w-sm bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-2xl p-6 animate-scale-in mx-4">
                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowUpgradePrompt(false)}
                      className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-center mt-2">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                      <Mail className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-2">
                      Ways to Get This Format
                    </h3>

                    <div className="space-y-4 text-left">
                      {/* Option 1: Upgrade */}
                      <div className="p-3 rounded-lg border border-blue-500/20 bg-blue-500/5">
                        <p className="text-sm font-semibold text-[hsl(var(--foreground))] mb-1">
                          Option 1: Go Pro (Direct Export)
                        </p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">
                          Get direct PDF to QBO, Xero, and MT940 exports. Contact support to upgrade.
                        </p>
                        <Button
                          size="sm"
                          className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white h-8"
                          onClick={() => window.location.href = 'mailto:support@statementextract.com?subject=Upgrade Inquiry - Statement Extract'}
                        >
                          <Mail className="h-3.5 w-3.5" /> Contact Support
                        </Button>
                      </div>

                      {/* Option 2: Free Alternatives */}
                      <div className="p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30">
                        <p className="text-sm font-semibold text-[hsl(var(--foreground))] mb-1">
                          Option 2: Use Free Tools
                        </p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">
                          Download as <strong>CSV / Excel</strong> (Free) and convert it using our free tools.
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-[10px]"
                            onClick={() => window.open('/convert/csv-to-qbo', '_blank')}
                          >
                            CSV / Excel to QBO
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-[10px]"
                            onClick={() => window.open('/convert/csv-to-ofx', '_blank')}
                          >
                            CSV / Excel to OFX
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-[10px] col-span-2"
                            onClick={() => window.open('/convert/csv-to-mt940', '_blank')}
                          >
                            CSV / Excel to MT940
                          </Button>
                        </div>
                        <Button
                          variant="link"
                          size="sm"
                          className="w-full h-auto p-0 mt-2 text-[10px] text-[hsl(var(--primary))]"
                          onClick={() => window.open('/convert', '_blank')}
                        >
                          View All Free Tools
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button
                        variant="ghost"
                        onClick={() => setShowUpgradePrompt(false)}
                        className="w-full text-sm h-8"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Export Settings Modal */}
            {showExportSettings && (
              <ExportSettingsModal
                settings={exportSettings}
                format={pendingExportFormat}
                onSettingsChange={setExportSettings}
                onDownload={handleFinalDownload}
                onClose={() => {
                  setShowExportSettings(false);
                  setPendingExportFormat(null);
                }}
              />
            )}
          </div>
        </div >
      </div >
    </div >
  );
};