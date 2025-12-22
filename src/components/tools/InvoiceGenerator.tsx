"use client";

import { useState, useRef, useEffect } from "react";
import { toJpeg } from "html-to-image";

import jsPDF from "jspdf";
import {
    Download,
    Plus,
    Trash2,
    Settings,
    Palette,
    RotateCcw,
    Upload,
    Landmark,
    PenTool,
    Layout
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Types
interface LineItem {
    id: string;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
}

interface InvoiceData {
    invoiceNumber: string;
    date: string;
    dueDate: string;
    fromName: string;
    fromEmail: string;
    fromAddress: string;
    fromPhone: string;
    fromTaxId: string; // Generic Tax ID (EIN/SSN/GST)
    toName: string;
    toEmail: string;
    toAddress: string;
    toPhone: string;
    toTaxId: string;
    items: LineItem[];
    notes: string;
    terms: string;
    currency: string;
    taxLabel: string;
    taxRate: number;
    isTaxSplit: boolean; // Renamed from isGstMode for better US context
    discountLabel: string;
    discountRate: number;
    logo?: string;
    signature?: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    routingCode: string; // Routing/IFSC/SWIFT
    routingLabel: string; // Dynamic label
}

const DEFAULT_DATA: InvoiceData = {
    invoiceNumber: "INV-001",
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    fromName: "Your Business Name",
    fromEmail: "billing@yourbusiness.com",
    fromAddress: "123 Business Avenue, Suite 100\nLondon, UK EC1A 1BB",
    fromPhone: "+1 (555) 000-0000",
    fromTaxId: "",
    toName: "High Growth Client Ltd",
    toEmail: "billing@clientcompany.com",
    toAddress: "456 Enterprise Boulevard\nSydney, NSW 2000, Australia",
    toPhone: "",
    toTaxId: "",
    items: [
        { id: "1", description: "Consulting Services", quantity: 1, rate: 1000, amount: 1000 },
        { id: "2", description: "Project Management", quantity: 5, rate: 150, amount: 750 },
    ],
    notes: "Thank you for your business!",
    terms: "Payment is due within 14 days. Checks payable to Your Business Name.",
    currency: "$",
    taxLabel: "Tax",
    taxRate: 0,
    isTaxSplit: false,
    discountLabel: "Discount",
    discountRate: 0,
    bankName: "",
    accountName: "",
    accountNumber: "",
    routingCode: "",
    routingLabel: "Swift / BSB / Sort Code",
};

const COLORS = [
    { name: "Slate", value: "#334155" },
    { name: "Blue", value: "#2563eb" },
    { name: "Indigo", value: "#4f46e5" },
    { name: "Emerald", value: "#059669" },
    { name: "Rose", value: "#e11d48" },
    { name: "Amber", value: "#d97706" },
];

// Professional "Solid" Input Style (Paper) 
const INPUT_STYLE = "bg-slate-50 border border-slate-300 shadow-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 rounded-md px-2 py-1 text-sm";
const INPUT_STYLE_RIGHT = `text-right ${INPUT_STYLE}`;

// Sidebar Input Style (Theme aware)
const SIDEBAR_INPUT = "w-full p-3 text-sm border rounded-lg bg-[hsl(var(--background))] text-[hsl(var(--foreground))] border-[hsl(var(--border))] focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-[hsl(var(--muted-foreground))]";

export function InvoiceGenerator() {
    const [data, setData] = useState<InvoiceData>(DEFAULT_DATA);
    const [themeColor, setThemeColor] = useState(COLORS[0].value); // Slate default for professional look
    const [isGenerating, setIsGenerating] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const invoiceRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const saved = localStorage.getItem("invoice_data_us");
        const savedTheme = localStorage.getItem("invoice_theme_us");
        if (saved) setData(JSON.parse(saved));
        if (savedTheme) setThemeColor(savedTheme);
    }, []);

    useEffect(() => {
        localStorage.setItem("invoice_data_us", JSON.stringify(data));
        localStorage.setItem("invoice_theme_us", themeColor);
    }, [data, themeColor]);

    // Helpers
    const updateField = (field: keyof InvoiceData, value: any) => setData(prev => ({ ...prev, [field]: value }));
    const updateItem = (id: string, field: keyof LineItem, value: any) => {
        setData(prev => ({
            ...prev,
            items: prev.items.map(item => {
                if (item.id !== id) return item;
                const updated = { ...item, [field]: value };
                if (field === "quantity" || field === "rate") updated.amount = updated.quantity * updated.rate;
                return updated;
            })
        }));
    };
    const addItem = () => setData(prev => ({ ...prev, items: [...prev.items, { id: crypto.randomUUID(), description: "", quantity: 1, rate: 0, amount: 0 }] }));
    const removeItem = (id: string) => setData(prev => ({ ...prev, items: prev.items.filter(item => item.id !== id) }));

    const handleImageUpload = (field: 'logo' | 'signature') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => updateField(field, reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    // Math
    const subtotal = data.items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = subtotal * (data.taxRate / 100);
    const discountAmount = subtotal * (data.discountRate / 100);
    const total = subtotal + taxAmount - discountAmount;

    // Number to Words
    const numberToWords = (num: number): string => {
        const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
        const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        const inWords = (n: number): string => {
            if ((n = n.toString() as any).length > 9) return 'overflow';
            const n_array = ('000000000' + n).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
            if (!n_array) return '';
            let str = '';
            str += (Number(n_array[1]) != 0) ? (a[Number(n_array[1])] || b[Number(n_array[1][0])] + ' ' + a[Number(n_array[1][1])]) + 'Crore ' : '';
            str += (Number(n_array[2]) != 0) ? (a[Number(n_array[2])] || b[Number(n_array[2][0])] + ' ' + a[Number(n_array[2][1])]) + 'Lakh ' : '';
            str += (Number(n_array[3]) != 0) ? (a[Number(n_array[3])] || b[Number(n_array[3][0])] + ' ' + a[Number(n_array[3][1])]) + 'Thousand ' : '';
            str += (Number(n_array[4]) != 0) ? (a[Number(n_array[4])] || b[Number(n_array[4][0])] + ' ' + a[Number(n_array[4][1])]) + 'Hundred ' : '';
            str += (Number(n_array[5]) != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n_array[5])] || b[Number(n_array[5][0])] + ' ' + a[Number(n_array[5][1])]) : '';
            return str;
        };
        return inWords(Math.round(num));
    };



    const downloadPDF = async () => {
        if (!invoiceRef.current) return;
        setIsGenerating(true);
        // Allow React a moment to update the DOM with "clean" print styles before capturing
        await new Promise(resolve => setTimeout(resolve, 50));

        try {
            // Use html-to-image for robust handling of modern CSS (Tailwind v4 lab colors)
            const dataUrl = await toJpeg(invoiceRef.current, {
                quality: 0.99,
                pixelRatio: 3.5,
                backgroundColor: "#ffffff",
                filter: (node: any) => {
                    // Exclude elements marked for ignore (Trash icons, empty placeholders)
                    if (node instanceof HTMLElement && node.getAttribute("data-html2canvas-ignore")) return false;
                    return true;
                }
            });

            const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${data.fromName.replace(/\s+/g, '_')}_Invoice_${data.invoiceNumber}.pdf`);
        } catch (err) {
            console.error("PDF Generation Failed:", err);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const formatCurrency = (amt: number) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(amt);

    return (
        <div className="flex lg:flex-row justify-center items-stretch gap-10 w-full max-w-[1600px] mx-auto p-6 md:p-12 min-h-screen pt-24">
            {/* LEFT SIDE: Sidebar / Settings (The Widget) - Using items-start to allow sticking */}
            <div className="w-full lg:w-[450px] flex-shrink-0 order-2 lg:order-1 flex flex-col items-start print:hidden z-30">
                <div className="sticky top-28 w-full space-y-6">
                    <div className="p-8 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl shadow-xl space-y-8">
                        <div>
                            <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-6 flex items-center gap-3"><Layout className="w-5 h-5 text-[hsl(var(--primary))]" /> Templates & Colors</h3>
                            <div className="grid grid-cols-6 gap-2">
                                {COLORS.map(c => (
                                    <button
                                        key={c.name}
                                        onClick={() => setThemeColor(c.value)}
                                        style={{ backgroundColor: c.value }}
                                        className={`w-10 h-10 rounded-full border-2 transition-transform ${themeColor === c.value ? "border-black scale-110 ring-2 ring-offset-2 ring-blue-400" : "border-transparent hover:scale-105"}`}
                                        title={c.name}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-6 flex items-center gap-3"><Settings className="w-5 h-5 text-[hsl(var(--primary))]" /> Configuration</h3>
                            <div className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--muted-foreground))] block mb-2">Currency</label>
                                        <select value={data.currency} onChange={e => updateField("currency", e.target.value)} className={SIDEBAR_INPUT}>
                                            <option value="$">$ (USD)</option>
                                            <option value="€">€ (EUR)</option>
                                            <option value="£">£ (GBP)</option>
                                            <option value="₹">₹ (INR)</option>
                                            <option value="Can$">Can$</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--muted-foreground))] block mb-2">Tax ID / VAT / GST</label>
                                        <input type="text" placeholder="VAT / GST / EIN" value={data.fromTaxId ? "Tax ID" : "ID Label"} disabled className="w-full p-3 text-sm border rounded-lg bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] cursor-not-allowed border-[hsl(var(--border))]" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--muted-foreground))] block mb-2">Tax %</label>
                                        <input type="number" value={data.taxRate} onChange={e => updateField("taxRate", Number(e.target.value))} className={SIDEBAR_INPUT} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--muted-foreground))] block mb-2">Discount %</label>
                                        <input type="number" value={data.discountRate} onChange={e => updateField("discountRate", Number(e.target.value))} className={SIDEBAR_INPUT} />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 pt-2 bg-[hsl(var(--muted))]/30 p-3 rounded-lg border border-[hsl(var(--border))]">
                                    <input type="checkbox" id="taxSplit" checked={data.isTaxSplit} onChange={e => updateField("isTaxSplit", e.target.checked)} className="w-4 h-4 rounded border-[hsl(var(--primary))] text-[hsl(var(--primary))] focus:ring-[hsl(var(--ring))]" />
                                    <label htmlFor="taxSplit" className="text-sm font-medium cursor-pointer text-[hsl(var(--foreground))]">Split Tax (State/Federal)</label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-[hsl(var(--border))]">
                            <h3 className="text-lg font-bold text-[hsl(var(--foreground))] flex items-center gap-3"><Landmark className="w-5 h-5 text-[hsl(var(--primary))]" /> Banking Details</h3>
                            <input type="text" placeholder="Bank Name" value={data.bankName} onChange={e => updateField("bankName", e.target.value)} className={SIDEBAR_INPUT} />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Account #" value={data.accountNumber} onChange={e => updateField("accountNumber", e.target.value)} className={SIDEBAR_INPUT} />
                                <input type="text" placeholder="Routing #" value={data.routingCode} onChange={e => updateField("routingCode", e.target.value)} className={SIDEBAR_INPUT} />
                            </div>
                        </div>

                        <div className="pt-8 space-y-4">
                            <div className="flex items-center justify-between p-3 bg-[hsl(var(--muted))]/50 rounded-lg border border-[hsl(var(--border))]">
                                <span className="text-sm font-semibold text-[hsl(var(--foreground))]">Preview Mode</span>
                                <button
                                    onClick={() => setIsPreview(!isPreview)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isPreview ? 'bg-[hsl(var(--primary))]' : 'bg-[hsl(var(--border))]'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isPreview ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                            <Button onClick={downloadPDF} disabled={isGenerating} className="w-full h-14 text-lg font-bold shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all hover:-translate-y-0.5" style={{ backgroundColor: themeColor }}>
                                {isGenerating ? "Processing..." : <><Download className="w-6 h-6 mr-3" /> Download Invoice</>}
                            </Button>
                            <Button variant="ghost" onClick={() => { if (confirm("Clear form?")) { setData(DEFAULT_DATA); localStorage.removeItem("invoice_data_us"); } }} className="w-full h-10 text-red-500 hover:bg-red-50 hover:text-red-600"><RotateCcw className="w-4 h-4 mr-2" /> Reset Form</Button>
                        </div>
                    </div>
                </div>

            </div>
            {/* RIGHT SIDE: Invoice Paper */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-start overflow-hidden">
                <div className="scale-[0.85] xl:scale-100 origin-top-left">
                    <div className="shadow-2xl">
                        <div
                            ref={invoiceRef}
                            className={`bg-[#ffffff] text-[#1e293b] w-[210mm] min-h-[297mm] border border-[#e2e8f0] p-8 md:p-12 relative flex flex-col transition-all ${isGenerating ? 'border-none' : ''}`}
                            style={{ borderTop: `8px solid ${themeColor}` }}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-10">
                                <div className="w-1/2">
                                    {data.logo ? (
                                        <div className="relative group w-fit mb-6">
                                            <img src={data.logo} alt="Logo" className="h-24 object-contain" />
                                            <button onClick={() => updateField("logo", undefined)} data-html2canvas-ignore="true" className="absolute -top-2 -right-2 bg-[#ef4444] text-white p-1 rounded-full opacity-0 group-hover:opacity-100 print:hidden"><Trash2 className="w-3 h-3" /></button>
                                        </div>
                                    ) : (
                                        <label data-html2canvas-ignore="true" className="flex items-center gap-2 p-4 border-2 border-dashed border-[#e2e8f0] rounded-lg text-[#94a3b8] hover:text-[#64748b] cursor-pointer mb-6 w-fit bg-[#f8fafc] hover:bg-[#f1f5f9] transition-colors print:hidden">
                                            <Upload className="w-6 h-6" /> <span className="text-sm font-medium">Upload Logo</span>
                                            <input type="file" accept="image/*" onChange={handleImageUpload('logo')} className="hidden" />
                                        </label>
                                    )}

                                    <h2 className="text-3xl font-light tracking-wide text-[#1e293b] mb-2">INVOICE</h2>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[#94a3b8] w-24 text-sm uppercase tracking-wide font-semibold">Invoice #</span>
                                        {isGenerating || isPreview ? (
                                            <div className="font-bold text-lg text-[#1e293b] px-2 py-1 border border-transparent leading-none">{data.invoiceNumber || "INV-001"}</div>
                                        ) : (
                                            <input type="text" value={data.invoiceNumber} onChange={e => updateField("invoiceNumber", e.target.value)} className={`font-bold text-lg outline-none w-40 text-[#1e293b] ${INPUT_STYLE} !py-1`} />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[#94a3b8] w-24 text-sm uppercase tracking-wide font-semibold">Date</span>
                                        {isGenerating || isPreview ? (
                                            <div className="text-[#1e293b] px-2 py-1 font-medium border border-transparent leading-none">{data.date}</div>
                                        ) : (
                                            <input type="date" value={data.date} onChange={e => updateField("date", e.target.value)} className={`outline-none cursor-pointer hover:text-blue-600 text-[#1e293b] ${INPUT_STYLE}`} />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[#94a3b8] w-24 text-sm uppercase tracking-wide font-semibold">Due Date</span>
                                        {isGenerating || isPreview ? (
                                            <div className="text-[#1e293b] px-2 py-1 font-medium border border-transparent leading-none">{data.dueDate}</div>
                                        ) : (
                                            <input type="date" value={data.dueDate} onChange={e => updateField("dueDate", e.target.value)} className={`outline-none cursor-pointer hover:text-blue-600 text-[#1e293b] ${INPUT_STYLE}`} />
                                        )}
                                    </div>
                                </div>

                                <div className="w-1/2 text-right space-y-1">
                                    {isGenerating || isPreview ? (
                                        <div className="text-xl font-bold text-[#1e293b] py-1 px-2 border border-transparent leading-tight">{data.fromName || "Your Business"}</div>
                                    ) : (
                                        <input type="text" value={data.fromName} onChange={e => updateField("fromName", e.target.value)} className={`w-full text-lg font-bold outline-none placeholder:text-[#cbd5e1] text-[#1e293b] ${INPUT_STYLE_RIGHT}`} placeholder="Your Business" />
                                    )}
                                    {isGenerating || isPreview ? (
                                        <div className="text-sm text-[#64748b] whitespace-pre-line py-1 px-2 border border-transparent leading-snug">{data.fromAddress || "Address"}</div>
                                    ) : (
                                        <textarea value={data.fromAddress} onChange={e => updateField("fromAddress", e.target.value)} className={`w-full text-xs text-[#64748b] outline-none resize-none ${INPUT_STYLE_RIGHT}`} rows={2} placeholder="Address" />
                                    )}
                                    <div className="flex flex-col items-end">
                                        {isGenerating || isPreview ? (
                                            <div className="text-xs text-[#64748b] py-0.5 px-2 border border-transparent">{data.fromPhone}</div>
                                        ) : (
                                            <input type="text" value={data.fromPhone} onChange={e => updateField("fromPhone", e.target.value)} className={`w-1/2 text-xs text-[#64748b] outline-none ${INPUT_STYLE_RIGHT}`} placeholder="Phone" />
                                        )}
                                        {isGenerating || isPreview ? (
                                            <div className="text-xs text-[#64748b] py-0.5 px-2 border border-transparent">{data.fromEmail}</div>
                                        ) : (
                                            <input type="text" value={data.fromEmail} onChange={e => updateField("fromEmail", e.target.value)} className={`w-1/2 text-xs text-[#64748b] outline-none ${INPUT_STYLE_RIGHT}`} placeholder="Email" />
                                        )}
                                        {isGenerating || isPreview ? (
                                            <div className="text-xs text-[#64748b] py-0.5 px-2 border border-transparent">{data.fromTaxId}</div>
                                        ) : (
                                            <input type="text" value={data.fromTaxId} onChange={e => updateField("fromTaxId", e.target.value)} className={`w-1/2 text-xs text-[#64748b] outline-none ${INPUT_STYLE_RIGHT}`} placeholder="Tax ID / VAT / GST" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Bill To */}
                            <div className="mb-10 p-6 bg-[#f8fafc]/50 rounded-lg border border-[#f1f5f9]">
                                <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-3">Bill To</p>
                                <div className="flex gap-4">
                                    <div className="flex-1 space-y-1">
                                        {isGenerating || isPreview ? (
                                            <div className="font-bold text-xl text-[#1e293b] py-1 px-2 border border-transparent">{data.toName || "Client Name"}</div>
                                        ) : (
                                            <input type="text" value={data.toName} onChange={e => updateField("toName", e.target.value)} className={`w-full font-bold text-xl outline-none text-[#1e293b] ${INPUT_STYLE}`} placeholder="Client Name" />
                                        )}
                                        {isGenerating || isPreview ? (
                                            <div className="text-sm text-[#64748b] whitespace-pre-line py-1 px-2 border border-transparent">{data.toAddress || "Client Address"}</div>
                                        ) : (
                                            <textarea value={data.toAddress} onChange={e => updateField("toAddress", e.target.value)} className={`w-full text-sm text-[#64748b] outline-none resize-none ${INPUT_STYLE}`} rows={2} placeholder="Client Address" />
                                        )}
                                    </div>
                                    <div className="w-1/3 text-right">
                                        {isGenerating || isPreview ? (
                                            <div className="text-sm text-[#64748b] py-1 px-2 border border-transparent">{data.toEmail}</div>
                                        ) : (
                                            <input type="text" value={data.toEmail} onChange={e => updateField("toEmail", e.target.value)} className={`w-full text-sm text-[#64748b] outline-none ${INPUT_STYLE_RIGHT}`} placeholder="Client Email" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="mb-10">
                                <div className="flex text-xs font-bold text-white uppercase tracking-wider py-3 px-4 rounded-lg mb-2" style={{ backgroundColor: themeColor }}>
                                    <div className="flex-1">Description</div>
                                    <div className="w-24 text-right">Qty</div>
                                    <div className="w-32 text-right">Rate</div>
                                    <div className="w-32 text-right">Amount</div>
                                </div>
                                {data.items.map((item) => (
                                    <div key={item.id} className="flex items-start py-4 px-4 border-b border-[#f1f5f9] hover:bg-[#f8fafc] group relative text-sm transition-colors">
                                        <div className="flex-1 pr-4">
                                            {isGenerating || isPreview ? (
                                                <div className="font-semibold text-[#1e293b] py-1 px-2 border border-transparent min-h-[32px]">{item.description}</div>
                                            ) : (
                                                <input type="text" value={item.description} onChange={e => updateItem(item.id, "description", e.target.value)} className={`w-full font-medium outline-none text-[#1e293b] ${INPUT_STYLE}`} placeholder="Item Description" />
                                            )}
                                        </div>
                                        <div className="w-24 text-right">
                                            {isGenerating || isPreview ? (
                                                <div className="text-[#1e293b] py-1 px-2 border border-transparent leading-none">{item.quantity}</div>
                                            ) : (
                                                <input type="number" value={item.quantity} onChange={e => updateItem(item.id, "quantity", Number(e.target.value))} className={`w-full outline-none text-[#1e293b] ${INPUT_STYLE_RIGHT}`} />
                                            )}
                                        </div>
                                        <div className="w-32 text-right">
                                            {isGenerating || isPreview ? (
                                                <div className="text-[#1e293b] py-1 px-2 uppercase font-medium border border-transparent leading-none">{formatCurrency(item.rate)}</div>
                                            ) : (
                                                <input type="number" value={item.rate} onChange={e => updateItem(item.id, "rate", Number(e.target.value))} className={`w-full outline-none text-[#1e293b] ${INPUT_STYLE_RIGHT}`} />
                                            )}
                                        </div>
                                        <div className="w-32 text-right font-medium text-[#334155] py-1 px-2 border border-transparent leading-none">{data.currency}{formatCurrency(item.amount)}</div>
                                        <button onClick={() => removeItem(item.id)} data-html2canvas-ignore="true" className="absolute left-0 top-3 -ml-8 text-[#fca5a5] hover:text-[#ef4444] opacity-0 group-hover:opacity-100 px-2 py-1 print:hidden"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                ))}
                                <button onClick={addItem} data-html2canvas-ignore="true" className="mt-4 text-sm font-medium flex items-center gap-2 hover:bg-[#f1f5f9] px-4 py-2 rounded-lg transition-colors print:hidden" style={{ color: themeColor }}><Plus className="w-4 h-4" /> Add Line Item</button>
                            </div>

                            {/* Totals & Bank */}
                            <div className="flex flex-col md:flex-row justify-between mb-12 gap-10">
                                <div className="w-full md:w-1/2">
                                    <div className="bg-[#f8fafc] p-5 rounded-lg border border-[#f1f5f9]">
                                        <p className="font-bold text-[#334155] mb-3 flex items-center gap-2 border-b border-[#e2e8f0] pb-2 text-sm uppercase tracking-wide">
                                            <Landmark className="w-4 h-4" /> Payment Details
                                        </p>
                                        <div className="grid grid-cols-[100px_1fr] gap-y-2 text-sm">
                                            {data.bankName && <><span className="text-[#94a3b8]">Bank</span> <span className="text-[#334155] font-medium">{data.bankName}</span></>}
                                            {data.accountNumber && <><span className="text-[#94a3b8]">Account #</span> <span className="text-[#334155] font-mono">{data.accountNumber}</span></>}
                                            {data.routingCode && <><span className="text-[#94a3b8]">{data.routingLabel}</span> <span className="text-[#334155] font-mono">{data.routingCode}</span></>}
                                        </div>
                                        {!data.bankName && !data.accountNumber && (
                                            <p className="text-xs text-[#94a3b8] italic">Add payment details in settings...</p>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full md:w-1/3 text-sm space-y-3">
                                    <div className="flex justify-between text-[#64748b]"><span>Subtotal</span> <span className="font-medium text-[#334155]">{data.currency}{formatCurrency(subtotal)}</span></div>

                                    {data.isTaxSplit && data.taxRate > 0 ? (
                                        <>
                                            <div className="flex justify-between text-[#64748b]"><span>State Tax ({data.taxRate / 2}%)</span> <span>+{data.currency}{formatCurrency(taxAmount / 2)}</span></div>
                                            <div className="flex justify-between text-[#64748b]"><span>Federal Tax ({data.taxRate / 2}%)</span> <span>+{data.currency}{formatCurrency(taxAmount / 2)}</span></div>
                                        </>
                                    ) : data.taxRate > 0 && (
                                        <div className="flex justify-between text-[#64748b]"><span>{data.taxLabel} ({data.taxRate}%)</span> <span>+{data.currency}{formatCurrency(taxAmount)}</span></div>
                                    )}

                                    {data.discountRate > 0 && (
                                        <div className="flex justify-between text-[#059669]"><span>Discount ({data.discountRate}%)</span> <span>-{data.currency}{formatCurrency(discountAmount)}</span></div>
                                    )}

                                    <div className="flex justify-between text-xl font-bold border-t-2 border-[#f1f5f9] pt-4" style={{ color: themeColor }}>
                                        <span>Total</span> <span>{data.currency}{formatCurrency(total)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer / Signature */}
                            <div className="mt-auto pt-8 border-t border-[#f1f5f9]">
                                <div className="grid grid-cols-2 gap-8 items-end">
                                    <div>
                                        <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-wide mb-2">Terms & Notes</p>
                                        {isGenerating || isPreview ? (
                                            <div className="text-sm text-[#475569] whitespace-pre-line py-2 min-h-[40px] border-b border-gray-100">{data.notes || "No notes"}</div>
                                        ) : (
                                            <textarea value={data.notes} onChange={e => updateField("notes", e.target.value)} className={`w-full text-sm text-[#475569] outline-none resize-none ${INPUT_STYLE}`} />
                                        )}
                                        {isGenerating || isPreview ? (
                                            <div className="text-xs text-[#94a3b8] whitespace-pre-line py-2">{data.terms}</div>
                                        ) : (
                                            <textarea value={data.terms} onChange={e => updateField("terms", e.target.value)} className={`w-full text-xs text-[#94a3b8] outline-none resize-none mt-2 ${INPUT_STYLE}`} />
                                        )}
                                    </div>
                                    <div className="text-right">
                                        {data.signature ? (
                                            <div className="relative group inline-block">
                                                <img src={data.signature} alt="Sign" className="h-16 object-contain mb-2" />
                                                <button onClick={() => updateField("signature", undefined)} data-html2canvas-ignore="true" className="absolute -top-2 -right-2 bg-[#ef4444] text-white p-1 rounded-full opacity-0 group-hover:opacity-100 print:hidden"><Trash2 className="w-3 h-3" /></button>
                                                <div className="border-t border-[#cbd5e1] pt-1 w-48 ml-auto"></div>
                                            </div>
                                        ) : (
                                            <div className="ml-auto w-48">
                                                <label data-html2canvas-ignore="true" className="h-16 border-2 border-dashed border-[#e2e8f0] flex flex-col items-center justify-center gap-1 rounded-lg cursor-pointer hover:border-[#cbd5e1] text-[#94a3b8] mb-2 print:hidden bg-[#f8fafc]">
                                                    <PenTool className="w-4 h-4" /> <span className="text-[10px] uppercase font-bold">Sign Here</span>
                                                    <input type="file" accept="image/*" onChange={handleImageUpload('signature')} className="hidden" />
                                                </label>
                                                <div className="border-t border-[#cbd5e1] pt-1"></div>
                                            </div>
                                        )}
                                        <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-wide mt-1">Authorized Signature</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
