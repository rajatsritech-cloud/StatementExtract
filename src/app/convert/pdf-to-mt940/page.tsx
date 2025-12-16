import { Metadata } from "next";
import dynamic from "next/dynamic";
import { BankStatementConverter } from "@/components/BankStatementConverter";

// Dynamic imports for below-fold components
const BankStatementFeatures = dynamic(() => import("@/components/bank-statement/BankStatementContent").then(mod => ({ default: mod.BankStatementFeatures })), {
    loading: () => <div className="min-h-[400px] bg-[hsl(var(--background))]" />,
});

const SupportedBanks = dynamic(() => import("@/components/bank-statement/BankStatementContent").then(mod => ({ default: mod.SupportedBanks })), {
    loading: () => <div className="min-h-[300px] bg-[hsl(var(--background))]" />,
});

const BankStatementFAQ = dynamic(() => import("@/components/bank-statement/BankStatementContent").then(mod => ({ default: mod.BankStatementFAQ })), {
    loading: () => <div className="min-h-[400px] bg-[hsl(var(--background))]" />,
});

const BankStatementSEOContent = dynamic(() => import("@/components/bank-statement/BankStatementContent").then(mod => ({ default: mod.BankStatementSEOContent })), {
    loading: () => <div className="min-h-[300px] bg-[hsl(var(--background))]" />,
});

const HowItWorks = dynamic(() => import("@/components/HowItWorks").then(mod => ({ default: mod.HowItWorks })), {
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
    title: "PDF to MT940 Converter - Convert Bank Statements to MT940 SWIFT | Free Tool",
    description: "Convert PDF bank statements to MT940 (.txt) format for Sage, Xero, and ERPs. Secure, AI-powered extraction compatible with SWIFT standards.",
    keywords: [
        "pdf to mt940 converter",
        "bank statement to mt940",
        "convert pdf to mt940",
        "mt940 converter online",
        "pdf to swift mt940",
        "mt940 generator",
        "bank statement extraction mt940",
        "Sage mt940 import",
        "Xero mt940 import",
        "ERP bank reconciliation format"
    ],
    openGraph: {
        title: "PDF to MT940 Converter - Bank Statements to SWIFT Format",
        description: "Convert PDF bank statements to clean MT940 files for easy import into Sage, Xero, and ERP systems. 100% secure.",
        type: "website",
        locale: "en_US",
        url: "https://statementextract.com/convert/pdf-to-mt940",
        images: [
            {
                url: "/assets/StatementExtract_Workflow_img.png",
                width: 1200,
                height: 630,
                alt: "PDF to MT940 Converter",
            },
        ],
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PDF to MT940 Converter",
    "description": "Convert PDF bank statements to MT940 SWIFT format for seamless integration with accounting software and ERPs.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "950"
    }
};

export default function PdfToMt940Page() {
    return (
        <>
            <RedirectIfAuthenticated />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaData)
                }}
            />
            <BankStatementConverter
                titleSuffix={<span className="bg-gradient-primary bg-clip-text text-transparent"> MT940 Format</span>}
                description="Convert PDF bank statements directly to MT940 SWIFT format. Compatible with Sage, Xero, SAP, and major ERP systems. AI-powered extraction ensures 99%+ accuracy."
            />
            <SupportedBanks />
            <HowItWorks />
            <BankStatementFeatures />
            <BankStatementSEOContent />
            <BankStatementFAQ />
            <RecentBlogs />
            <CTA />
        </>
    );
}
