
import { Metadata } from "next";
import { BankStatementConverter } from "@/components/BankStatementConverter";
import { SupportedBanks } from "@/components/bank-statement/BankStatementContent";
import { BankStatementFeaturesXero, BankStatementFAQXero, BankStatementSEOContentXero } from "@/components/bank-statement/BankStatementContentXero";

import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { RedirectIfAuthenticated } from "@/components/RedirectIfAuthenticated";
import { RecentBlogs } from "@/components/RecentBlogs";

export const metadata: Metadata = {
    title: "Convert Bank Statement PDF to QuickBooks & Xero (CSV/QBO) | High-Precision Accuracy",
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
        canonical: "/convert-bank-statement-to-quickbooks-xero/"
    }
};

export default function BankStatementXeroPage() {
    const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Bank Statement to QuickBooks/Xero Converter",
        "description": "AI-powered tool to convert PDF bank statements into QuickBooks (.QBO) and Xero (.CSV) formats with High accuracy.",
        "url": "https://statementextract.com/convert-bank-statement-to-quickbooks-xero",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser, Windows, macOS, iOS, Android",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "priceValidUntil": "2026-12-31",
            "availability": "https://schema.org/InStock"
        },
        "featureList": [
            "PDF to QBO (Web Connect) Conversion",
            "PDF to Xero CSV Conversion",
            "Automatic Bank Reconciliation",
            "High Accuracy OCR for Scanned Docs",
            "Secure & Private Processing"
        ],
        "author": {
            "@type": "Organization",
            "name": "Statement Extract",
            "url": "https://statementextract.com"
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://statementextract.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Bank Statement to QuickBooks & Xero",
                "item": "https://statementextract.com/convert-bank-statement-to-quickbooks-xero"
            }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is a QBO file and how do I import it into QuickBooks?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A QBO file is a QuickBooks Web Connect file format. To import, go to Banking > Upload Transactions in QuickBooks Online, then select your QBO file."
                }
            },
            {
                "@type": "Question",
                "name": "Can I convert bank statements directly to Xero format?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Our converter exports CSV files formatted specifically for Xero's bank import feature, with correct date formatting and column mapping."
                }
            },
            {
                "@type": "Question",
                "name": "Does this work with scanned PDF statements?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. Our AI-powered OCR can extract data from scanned PDFs, images, and even photographed documents with high accuracy."
                }
            },
            {
                "@type": "Question",
                "name": "Which banks are supported?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We support 1000+ banks worldwide including Chase, Wells Fargo, Bank of America, HSBC, Barclays, and most major financial institutions."
                }
            }
        ]
    };

    return (
        <>
            <RedirectIfAuthenticated />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(softwareApplicationSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema)
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
