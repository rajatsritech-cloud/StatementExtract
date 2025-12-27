import { Metadata } from "next";
import dynamic from "next/dynamic";
import { BankStatementConverter } from "@/components/BankStatementConverter";

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
    title: "Invoice Data Converter - Convert PDF Invoices to Excel/CSV | Free Online Tool",
    description: "Free Invoice Data Converter. Automatically extract data from PDF invoices into Excel or CSV. Captures line items, tables, totals, and more instantly.",
    keywords: [
        "invoice data converter",
        "invoice to excel",
        "invoice converter",
        "pdf invoice data extraction",
        "convert invoice to csv",
        "automated invoice processing",
        "invoice scraping",
        "extract table from invoice"
    ],
    openGraph: {
        title: "Invoice to Excel Converter - Helper for Accountants",
        description: "Stop manual typing. Upload invoices and get structured Excel files with all line items and headers extracted.",
        type: "website",
        locale: "en_US",
        url: "https://statementextract.com/convert-invoice-to-excel-csv",
        images: [
            {
                url: "/assets/StatementExtract_Workflow_img.png",
                width: 1200,
                height: 630,
                alt: "Invoice Converter",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Invoice to Excel Converter",
        description: "Convert PDF Invoices to Excel instantly. Free online tool.",
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
    "description": "Convert PDF invoices to Excel with AI extraction.",
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
        "Support for multiple formats"
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
            {/* 
        Reusing BankStatementConverter but we might need to update strict props 
        or context if it is hardcoded to bank statements. 
        For now, assuming it is flexible or we will pass a custom prop if needed.
        The backend API URL is usually determined inside the component or context.
        I might need to verify if `BankStatementConverter` allows overriding the endpoint.
      */}
            <BankStatementConverter
                title={<>Accurately Convert PDF Invoices to <span className="bg-gradient-primary bg-clip-text text-transparent">Excel or CSV</span></>}
                subtitle="World's most trusted Intelligent Document Processing invoice converter. Automatically extract header details, line items, and totals into clean Excel or CSV files with industry-leading accuracy. No templates or setup required – works with any invoice format instantly."
                endpoint="/api/v1/invoice-extract/extract"
                mode="invoice"
            />
            <InvoiceHowItWorks />
            <CTA />
            <RecentBlogs />
        </>
    );
}
