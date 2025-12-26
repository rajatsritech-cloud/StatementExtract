
import { Metadata } from "next";
import { BankStatementConverter } from "@/components/BankStatementConverter";
import { SupportedBanks } from "@/components/bank-statement/BankStatementContent";
import { BankStatementFeaturesXero, BankStatementFAQXero, BankStatementSEOContentXero } from "@/components/bank-statement/BankStatementContentXero";

import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { RedirectIfAuthenticated } from "@/components/RedirectIfAuthenticated";
import { RecentBlogs } from "@/components/RecentBlogs";

export const metadata: Metadata = {
    title: "Convert Bank Statement PDF to QuickBooks & Xero (CSV/QBO) | 99% Accuracy",
    description: "Instantly convert PDF bank statements to QuickBooks Online (.QBO) and Xero CSV. No manual entry. Trusted by accountants for high-volume reconciliation.",
    keywords: [
        "Convert PDF to QuickBooks Online",
        "PDF to QBO Converter",
        "Bank Statement to Xero CSV",
        "PDF to Excel Bank Statement",
        "Automated Bank Reconciliation",
        "QuickBooks Web Connect File",
        "Scanned Bank Statement to Excel",
        "Chase PDF to QuickBooks",
        "Wells Fargo to Xero",
        "Bank of America Statement Converter"
    ],
    openGraph: {
        title: "Convert Bank Statement PDF to QuickBooks & Xero (CSV/QBO)",
        description: "Stop typing. Start extracting. Turn PDF statements into QuickBooks and Xero ready files in seconds.",
        type: "website",
        url: "/convert-bank-statement-to-quickbooks-xero"
    },
    alternates: {
        canonical: "/convert-bank-statement-to-quickbooks-xero"
    }
};

export default function BankStatementXeroPage() {
    return (
        <>
            <RedirectIfAuthenticated />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Bank Statement to QuickBooks/Xero Converter",
                        "headline": "Convert PDF Statements to QuickBooks & Xero",
                        "description": "AI-powered tool to convert PDF bank statements into QuickBooks (.QBO) and Xero (.CSV) formats with 99.9% accuracy.",
                        "url": "https://statementextract.com/convert-bank-statement-to-quickbooks-xero",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "Web Browser, Windows, macOS, iOS, Android",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD",
                            "priceValidUntil": "2026-12-31"
                        },
                        "featureList": [
                            "PDF to QBO (Web Connect) Conversion",
                            "PDF to Xero CSV Conversion",
                            "Automatic Bank Reconciliation",
                            "High Accuracy OCR for Scanned Docs",
                            "Secure & Private Processing"
                        ],
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.9",
                            "ratingCount": "1847"
                        },
                        "author": {
                            "@type": "Organization",
                            "name": "Statement Extract",
                            "url": "https://statementextract.com"
                        }
                    })
                }}
            />


            {/* 
        Reusing the main converter component with specialized props for QBO/Xero.
      */}

            <BankStatementConverter
                titleSuffix={<span className="bg-gradient-primary bg-clip-text text-transparent"> QuickBooks & Xero</span>}
                description="Stop manual data entry. Upload your PDF statements and automatically convert them into .QBO (Web Connect) or Xero-compatible CSV format for instant import."
            />
            <SupportedBanks />
            <HowItWorks />
            <BankStatementFeaturesXero />
            <BankStatementSEOContentXero />
            <BankStatementFAQXero />
            <RecentBlogs />
            <CTA />
        </>
    );
}
