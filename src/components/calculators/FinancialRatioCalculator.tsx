"use client";

import { useState, useMemo } from "react";
import { Calculator, TrendingUp, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface FinancialData {
    // Balance Sheet Items
    currentAssets: string;
    currentLiabilities: string;
    inventory: string;
    cashAndEquivalents: string;
    totalAssets: string;
    totalLiabilities: string;
    shareholderEquity: string;
    accountsReceivable: string;
    accountsPayable: string;

    // Income Statement Items
    revenue: string;
    costOfGoodsSold: string;
    grossProfit: string;
    operatingIncome: string;
    netIncome: string;
    interestExpense: string;
    ebit: string;

    // Market Data (Optional)
    sharePrice: string;
    sharesOutstanding: string;
    dividendsPerShare: string;
}

interface RatioResult {
    name: string;
    value: number | null;
    formatted: string;
    benchmark: string;
    status: 'good' | 'warning' | 'bad' | 'neutral';
    description: string;
}

const initialData: FinancialData = {
    currentAssets: "",
    currentLiabilities: "",
    inventory: "",
    cashAndEquivalents: "",
    totalAssets: "",
    totalLiabilities: "",
    shareholderEquity: "",
    accountsReceivable: "",
    accountsPayable: "",
    revenue: "",
    costOfGoodsSold: "",
    grossProfit: "",
    operatingIncome: "",
    netIncome: "",
    interestExpense: "",
    ebit: "",
    sharePrice: "",
    sharesOutstanding: "",
    dividendsPerShare: "",
};

export function FinancialRatioCalculator() {
    const [data, setData] = useState<FinancialData>(initialData);
    const [activeTab, setActiveTab] = useState<'liquidity' | 'profitability' | 'efficiency' | 'leverage' | 'valuation'>('liquidity');

    const parseNum = (val: string): number => {
        const num = parseFloat(val.replace(/,/g, ''));
        return isNaN(num) ? 0 : num;
    };

    const handleChange = (field: keyof FinancialData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    // Calculate all ratios
    const ratios = useMemo(() => {
        const d = {
            currentAssets: parseNum(data.currentAssets),
            currentLiabilities: parseNum(data.currentLiabilities),
            inventory: parseNum(data.inventory),
            cashAndEquivalents: parseNum(data.cashAndEquivalents),
            totalAssets: parseNum(data.totalAssets),
            totalLiabilities: parseNum(data.totalLiabilities),
            shareholderEquity: parseNum(data.shareholderEquity),
            accountsReceivable: parseNum(data.accountsReceivable),
            accountsPayable: parseNum(data.accountsPayable),
            revenue: parseNum(data.revenue),
            costOfGoodsSold: parseNum(data.costOfGoodsSold),
            grossProfit: parseNum(data.grossProfit),
            operatingIncome: parseNum(data.operatingIncome),
            netIncome: parseNum(data.netIncome),
            interestExpense: parseNum(data.interestExpense),
            ebit: parseNum(data.ebit),
            sharePrice: parseNum(data.sharePrice),
            sharesOutstanding: parseNum(data.sharesOutstanding),
            dividendsPerShare: parseNum(data.dividendsPerShare),
        };

        // Liquidity Ratios
        const currentRatio = d.currentLiabilities > 0 ? d.currentAssets / d.currentLiabilities : null;
        const quickRatio = d.currentLiabilities > 0 ? (d.currentAssets - d.inventory) / d.currentLiabilities : null;
        const cashRatio = d.currentLiabilities > 0 ? d.cashAndEquivalents / d.currentLiabilities : null;
        const workingCapital = d.currentAssets - d.currentLiabilities;

        // Profitability Ratios
        const grossMargin = d.revenue > 0 ? (d.grossProfit / d.revenue) * 100 : null;
        const operatingMargin = d.revenue > 0 ? (d.operatingIncome / d.revenue) * 100 : null;
        const netMargin = d.revenue > 0 ? (d.netIncome / d.revenue) * 100 : null;
        const roe = d.shareholderEquity > 0 ? (d.netIncome / d.shareholderEquity) * 100 : null;
        const roa = d.totalAssets > 0 ? (d.netIncome / d.totalAssets) * 100 : null;

        // Efficiency Ratios
        const assetTurnover = d.totalAssets > 0 ? d.revenue / d.totalAssets : null;
        const inventoryTurnover = d.inventory > 0 ? d.costOfGoodsSold / d.inventory : null;
        const receivablesTurnover = d.accountsReceivable > 0 ? d.revenue / d.accountsReceivable : null;
        const payablesTurnover = d.accountsPayable > 0 ? d.costOfGoodsSold / d.accountsPayable : null;
        const daysInventory = inventoryTurnover && inventoryTurnover > 0 ? 365 / inventoryTurnover : null;
        const daysReceivables = receivablesTurnover && receivablesTurnover > 0 ? 365 / receivablesTurnover : null;
        const daysPayables = payablesTurnover && payablesTurnover > 0 ? 365 / payablesTurnover : null;

        // Leverage Ratios
        const debtToEquity = d.shareholderEquity > 0 ? d.totalLiabilities / d.shareholderEquity : null;
        const debtToAssets = d.totalAssets > 0 ? d.totalLiabilities / d.totalAssets : null;
        const interestCoverage = d.interestExpense > 0 ? d.ebit / d.interestExpense : null;
        const equityRatio = d.totalAssets > 0 ? d.shareholderEquity / d.totalAssets : null;

        // Valuation Ratios
        const marketCap = d.sharePrice * d.sharesOutstanding;
        const eps = d.sharesOutstanding > 0 ? d.netIncome / d.sharesOutstanding : null;
        const peRatio = eps && eps > 0 ? d.sharePrice / eps : null;
        const bookValuePerShare = d.sharesOutstanding > 0 ? d.shareholderEquity / d.sharesOutstanding : null;
        const pbRatio = bookValuePerShare && bookValuePerShare > 0 ? d.sharePrice / bookValuePerShare : null;
        const dividendYield = d.sharePrice > 0 ? (d.dividendsPerShare / d.sharePrice) * 100 : null;

        return {
            liquidity: [
                { name: "Current Ratio", value: currentRatio, formatted: currentRatio?.toFixed(2) || "-", benchmark: "1.5 - 3.0", status: currentRatio ? (currentRatio >= 1.5 && currentRatio <= 3 ? 'good' : currentRatio >= 1 ? 'warning' : 'bad') : 'neutral', description: "Measures ability to pay short-term obligations" },
                { name: "Quick Ratio", value: quickRatio, formatted: quickRatio?.toFixed(2) || "-", benchmark: "1.0 - 1.5", status: quickRatio ? (quickRatio >= 1 ? 'good' : quickRatio >= 0.5 ? 'warning' : 'bad') : 'neutral', description: "Ability to pay short-term debt without selling inventory" },
                { name: "Cash Ratio", value: cashRatio, formatted: cashRatio?.toFixed(2) || "-", benchmark: "0.5 - 1.0", status: cashRatio ? (cashRatio >= 0.5 ? 'good' : cashRatio >= 0.2 ? 'warning' : 'bad') : 'neutral', description: "Most conservative liquidity measure" },
                { name: "Working Capital", value: workingCapital, formatted: workingCapital ? `$${workingCapital.toLocaleString()}` : "-", benchmark: "Positive", status: workingCapital > 0 ? 'good' : 'bad', description: "Current Assets minus Current Liabilities" },
            ],
            profitability: [
                { name: "Gross Margin", value: grossMargin, formatted: grossMargin !== null ? grossMargin.toFixed(2) + "%" : "-", benchmark: "30-50%", status: grossMargin ? (grossMargin >= 30 ? 'good' : grossMargin >= 15 ? 'warning' : 'bad') : 'neutral', description: "Profit after direct costs" },
                { name: "Operating Margin", value: operatingMargin, formatted: operatingMargin !== null ? operatingMargin.toFixed(2) + "%" : "-", benchmark: "10-20%", status: operatingMargin ? (operatingMargin >= 10 ? 'good' : operatingMargin >= 5 ? 'warning' : 'bad') : 'neutral', description: "Profit after operating expenses" },
                { name: "Net Profit Margin", value: netMargin, formatted: netMargin !== null ? netMargin.toFixed(2) + "%" : "-", benchmark: "5-15%", status: netMargin ? (netMargin >= 5 ? 'good' : netMargin >= 2 ? 'warning' : 'bad') : 'neutral', description: "Bottom line profit percentage" },
                { name: "Return on Equity (ROE)", value: roe, formatted: roe !== null ? roe.toFixed(2) + "%" : "-", benchmark: "15-25%", status: roe ? (roe >= 15 ? 'good' : roe >= 8 ? 'warning' : 'bad') : 'neutral', description: "Shareholder return efficiency" },
                { name: "Return on Assets (ROA)", value: roa, formatted: roa !== null ? roa.toFixed(2) + "%" : "-", benchmark: "5-10%", status: roa ? (roa >= 5 ? 'good' : roa >= 2 ? 'warning' : 'bad') : 'neutral', description: "Asset utilization efficiency" },
            ],
            efficiency: [
                { name: "Asset Turnover", value: assetTurnover, formatted: assetTurnover !== null ? assetTurnover.toFixed(2) + "x" : "-", benchmark: "1.0-2.0x", status: assetTurnover ? (assetTurnover >= 1 ? 'good' : 'warning') : 'neutral', description: "Revenue generated per dollar of assets" },
                { name: "Inventory Turnover", value: inventoryTurnover, formatted: inventoryTurnover !== null ? inventoryTurnover.toFixed(2) + "x" : "-", benchmark: "5-10x", status: inventoryTurnover ? (inventoryTurnover >= 5 ? 'good' : inventoryTurnover >= 2 ? 'warning' : 'bad') : 'neutral', description: "How often inventory is sold and replaced" },
                { name: "Days Inventory", value: daysInventory, formatted: daysInventory !== null ? daysInventory.toFixed(0) + " days" : "-", benchmark: "30-60 days", status: daysInventory ? (daysInventory <= 60 ? 'good' : daysInventory <= 90 ? 'warning' : 'bad') : 'neutral', description: "Average days to sell inventory" },
                { name: "Receivables Turnover", value: receivablesTurnover, formatted: receivablesTurnover !== null ? receivablesTurnover.toFixed(2) + "x" : "-", benchmark: "8-12x", status: receivablesTurnover ? (receivablesTurnover >= 8 ? 'good' : receivablesTurnover >= 4 ? 'warning' : 'bad') : 'neutral', description: "How quickly receivables are collected" },
                { name: "Days Sales Outstanding", value: daysReceivables, formatted: daysReceivables !== null ? daysReceivables.toFixed(0) + " days" : "-", benchmark: "30-45 days", status: daysReceivables ? (daysReceivables <= 45 ? 'good' : daysReceivables <= 60 ? 'warning' : 'bad') : 'neutral', description: "Average collection period" },
            ],
            leverage: [
                { name: "Debt to Equity", value: debtToEquity, formatted: debtToEquity !== null ? debtToEquity.toFixed(2) : "-", benchmark: "0.5-1.5", status: debtToEquity ? (debtToEquity <= 1.5 ? 'good' : debtToEquity <= 2.5 ? 'warning' : 'bad') : 'neutral', description: "Debt relative to shareholder equity" },
                { name: "Debt to Assets", value: debtToAssets, formatted: debtToAssets !== null ? debtToAssets.toFixed(2) : "-", benchmark: "0.3-0.6", status: debtToAssets ? (debtToAssets <= 0.6 ? 'good' : debtToAssets <= 0.8 ? 'warning' : 'bad') : 'neutral', description: "Portion of assets financed by debt" },
                { name: "Interest Coverage", value: interestCoverage, formatted: interestCoverage !== null ? interestCoverage.toFixed(2) + "x" : "-", benchmark: "3x+", status: interestCoverage ? (interestCoverage >= 3 ? 'good' : interestCoverage >= 1.5 ? 'warning' : 'bad') : 'neutral', description: "Ability to pay interest on debt" },
                { name: "Equity Ratio", value: equityRatio, formatted: equityRatio !== null ? equityRatio.toFixed(2) : "-", benchmark: "0.4-0.6", status: equityRatio ? (equityRatio >= 0.4 ? 'good' : equityRatio >= 0.25 ? 'warning' : 'bad') : 'neutral', description: "Assets funded by equity" },
            ],
            valuation: [
                { name: "Earnings Per Share (EPS)", value: eps, formatted: eps !== null ? `$${eps.toFixed(2)}` : "-", benchmark: "Varies", status: 'neutral', description: "Net income per share" },
                { name: "P/E Ratio", value: peRatio, formatted: peRatio !== null ? peRatio.toFixed(2) : "-", benchmark: "15-25", status: peRatio ? (peRatio >= 10 && peRatio <= 30 ? 'good' : 'warning') : 'neutral', description: "Price relative to earnings" },
                { name: "Price to Book (P/B)", value: pbRatio, formatted: pbRatio !== null ? pbRatio.toFixed(2) : "-", benchmark: "1-3", status: pbRatio ? (pbRatio >= 1 && pbRatio <= 3 ? 'good' : 'warning') : 'neutral', description: "Market value vs book value" },
                { name: "Dividend Yield", value: dividendYield, formatted: dividendYield !== null ? dividendYield.toFixed(2) + "%" : "-", benchmark: "2-5%", status: dividendYield ? (dividendYield >= 2 ? 'good' : 'warning') : 'neutral', description: "Annual dividend return" },
                { name: "Market Cap", value: marketCap, formatted: marketCap > 0 ? `$${(marketCap / 1000000).toFixed(2)}M` : "-", benchmark: "Varies", status: 'neutral', description: "Total market value" },
            ],
        };
    }, [data]);

    const tabs = [
        { id: 'liquidity', label: 'Liquidity', icon: '💧' },
        { id: 'profitability', label: 'Profitability', icon: '📈' },
        { id: 'efficiency', label: 'Efficiency', icon: '⚡' },
        { id: 'leverage', label: 'Leverage', icon: '⚖️' },
        { id: 'valuation', label: 'Valuation', icon: '💰' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'good': return 'text-green-500';
            case 'warning': return 'text-yellow-500';
            case 'bad': return 'text-red-500';
            default: return 'text-[hsl(var(--muted-foreground))]';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'good': return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
            case 'bad': return <AlertTriangle className="w-4 h-4 text-red-500" />;
            default: return <Info className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />;
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-2xl bg-[hsl(var(--primary))]/10">
                        <Calculator className="w-10 h-10 text-[hsl(var(--primary))]" />
                    </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-3">
                    Financial Ratio Calculator
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                    Analyze your company's financial health with 20+ key ratios. Enter your financial data below to calculate liquidity, profitability, efficiency, leverage, and valuation ratios.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    {/* Balance Sheet Inputs */}
                    <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
                            <span className="text-xl">📊</span> Balance Sheet Data
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { key: 'currentAssets', label: 'Current Assets' },
                                { key: 'currentLiabilities', label: 'Current Liabilities' },
                                { key: 'inventory', label: 'Inventory' },
                                { key: 'cashAndEquivalents', label: 'Cash & Equivalents' },
                                { key: 'totalAssets', label: 'Total Assets' },
                                { key: 'totalLiabilities', label: 'Total Liabilities' },
                                { key: 'shareholderEquity', label: 'Shareholder Equity' },
                                { key: 'accountsReceivable', label: 'Accounts Receivable' },
                                { key: 'accountsPayable', label: 'Accounts Payable' },
                            ].map(({ key, label }) => (
                                <div key={key}>
                                    <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1">{label}</label>
                                    <input
                                        type="text"
                                        value={data[key as keyof FinancialData]}
                                        onChange={(e) => handleChange(key as keyof FinancialData, e.target.value)}
                                        placeholder="0"
                                        className="w-full px-3 py-2 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Income Statement Inputs */}
                    <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
                            <span className="text-xl">📈</span> Income Statement Data
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { key: 'revenue', label: 'Revenue' },
                                { key: 'costOfGoodsSold', label: 'Cost of Goods Sold' },
                                { key: 'grossProfit', label: 'Gross Profit' },
                                { key: 'operatingIncome', label: 'Operating Income' },
                                { key: 'netIncome', label: 'Net Income' },
                                { key: 'ebit', label: 'EBIT' },
                                { key: 'interestExpense', label: 'Interest Expense' },
                            ].map(({ key, label }) => (
                                <div key={key}>
                                    <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1">{label}</label>
                                    <input
                                        type="text"
                                        value={data[key as keyof FinancialData]}
                                        onChange={(e) => handleChange(key as keyof FinancialData, e.target.value)}
                                        placeholder="0"
                                        className="w-full px-3 py-2 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Market Data Inputs (Optional) */}
                    <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
                            <span className="text-xl">💹</span> Market Data (Optional)
                        </h2>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { key: 'sharePrice', label: 'Share Price' },
                                { key: 'sharesOutstanding', label: 'Shares Outstanding' },
                                { key: 'dividendsPerShare', label: 'Dividends/Share' },
                            ].map(({ key, label }) => (
                                <div key={key}>
                                    <label className="block text-xs text-[hsl(var(--muted-foreground))] mb-1">{label}</label>
                                    <input
                                        type="text"
                                        value={data[key as keyof FinancialData]}
                                        onChange={(e) => handleChange(key as keyof FinancialData, e.target.value)}
                                        placeholder="0"
                                        className="w-full px-3 py-2 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    {/* Tab Navigation */}
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                    ? 'bg-[hsl(var(--primary))] text-white'
                                    : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/80'
                                    }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Results Display */}
                    <div className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4 capitalize flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-[hsl(var(--primary))]" />
                            {activeTab} Ratios
                        </h2>
                        <div className="space-y-4">
                            {ratios[activeTab].map((ratio, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))]"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(ratio.status)}
                                            <span className="font-medium text-[hsl(var(--foreground))]">{ratio.name}</span>
                                        </div>
                                        <span className={`text-xl font-bold ${getStatusColor(ratio.status)}`}>
                                            {ratio.formatted}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-[hsl(var(--muted-foreground))]">{ratio.description}</span>
                                        <span className="text-[hsl(var(--muted-foreground))]">Benchmark: {ratio.benchmark}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Summary */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/20">
                        <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3">Quick Health Check</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                {ratios.liquidity[0].status === 'good' ? '✅' : '⚠️'}
                                <span className="text-[hsl(var(--muted-foreground))]">Liquidity: {ratios.liquidity[0].formatted}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {ratios.profitability[2].status === 'good' ? '✅' : '⚠️'}
                                <span className="text-[hsl(var(--muted-foreground))]">Net Margin: {ratios.profitability[2].formatted}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {ratios.leverage[0].status === 'good' ? '✅' : '⚠️'}
                                <span className="text-[hsl(var(--muted-foreground))]">Debt/Equity: {ratios.leverage[0].formatted}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {ratios.profitability[3].status === 'good' ? '✅' : '⚠️'}
                                <span className="text-[hsl(var(--muted-foreground))]">ROE: {ratios.profitability[3].formatted}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
