// Enhanced page layout with detailed content sections
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { BankStatementConverter } from "@/components/BankStatementConverter";
import { InvoiceFeatures, SupportedInvoiceFormats, InvoiceFAQ, InvoiceSEOContent } from "@/components/invoice/InvoiceContent";

// Use the same components for now, they are generic enough or we can reuse them
const InvoiceHowItWorks = dynamic(() => import("@/components/InvoiceHowItWorks").then(mod => ({ default: mod.InvoiceHowItWorks })), {
    loading: () => <div className="min-h-[400px] bg-[hsl(var(--background))]" />,
});

const CTA = dynamic(() => import("@/components/CTA").then(mod => ({ default: mod.CTA })), {
    loading: () => <div className="min-h-[200px] bg-[hsl(var(--background))]" />,
});

const RecentBlogs = dynamic(() => import("@/components/RecentBlogs").then(mod => ({ default: mod.RecentBlogs })), {
    loading: () => <div className="min-h-[400px] bg-[hsl(var(--background))]" />,
});

const RedirectIfAuthenticated = dynamic(() => import("@/components/RedirectIfAuthenticated").then(mod => ({ default: mod.RedirectIfAuthenticated })), {
    loading: () => null,
});

export const metadata: Metadata = {
    title: "Invoice to Excel Converter - AI Invoice Data Extraction | Free Tool",
    description: "Free AI Invoice Converter. Extract tables, line items, and totals from PDF invoices to Excel/CSV instantly. Works with Xero, QBO, & international formats.",
    keywords: [
        "invoice to excel",
        "invoice converter",
        "pdf invoice data extraction",
        "ai invoice processing",
        "convert invoice to csv",
        "automated invoice scraping",
        "extract table from invoice",
        "geo ai invoice extraction",
        "invoice ocr online free"
    ],
    openGraph: {
        title: "Free Invoice to Excel Converter - AI Powered",
        description: "Turn PDF invoices into Excel spreadsheets in seconds. Extracts line items, dates, and vendors automatically.",
        type: "website",
        locale: "en_US",
        url: "https://statementextract.com/convert-invoice-to-excel-csv",
        images: [
            {
                url: "/assets/StatementExtract_Workflow_img.png",
                width: 1200,
                height: 630,
                alt: "AI Invoice Converter",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Invoice to Excel Converter",
        description: "Convert PDF Invoices to Excel instantly with AI. Free online tool.",
    },
    alternates: {
        canonical: "/convert-invoice-to-excel-csv/",
        languages: {
            "en-US": "https://statementextract.com/convert-invoice-to-excel-csv",
        },
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Invoice Data Converter by Statement Extract",
    "description": "Convert PDF invoices to Excel with AI extraction. Supports line item parsing and multi-currency detection.",
    "url": "https://statementextract.com/convert-invoice-to-excel-csv",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
    },
    "featureList": [
        "Invoice PDF to Excel",
        "Line Item Table Extraction",
        "Header Data Extraction",
        "Multi-Currency Support",
        "Geo AI Layout Analysis"
    ],
    "softwareVersion": "1.0",
    "datePublished": "2024-01-01",
    "inLanguage": "en-US"
};

export default function InvoiceConverterPage() {
    return (
        <>
            <RedirectIfAuthenticated />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaData)
                }}
            />
            {/* Main Converter Tool */}
            <BankStatementConverter
                title={<>Accurately Convert PDF Invoices to <span className="bg-gradient-primary bg-clip-text text-transparent">Excel or CSV</span></>}
                subtitle="World's most trusted Intelligent Document Processing invoice converter. Automatically extract header details, line items, and totals into clean Excel or CSV files with industry-leading accuracy. No templates or setup required – works with any invoice format instantly."
                endpoint="/api/v1/invoice-extract/extract"
                mode="invoice"
            />

            {/* New Content Sections */}
            <SupportedInvoiceFormats />
            <InvoiceHowItWorks />
            <InvoiceFeatures />
            <InvoiceSEOContent />
            <InvoiceFAQ />

            {/* Common Footer Sections */}
            <RecentBlogs />
            <CTA />
        </>
    );
}
