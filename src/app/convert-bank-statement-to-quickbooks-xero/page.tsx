
import { Metadata } from "next";
import { BankStatementConverter } from "@/components/BankStatementConverter";
import { SupportedBanks } from "@/components/bank-statement/BankStatementContent";
import { BankStatementFeaturesXero, BankStatementFAQXero, BankStatementSEOContentXero } from "@/components/bank-statement/BankStatementContentXero";

import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { RedirectIfAuthenticated } from "@/components/RedirectIfAuthenticated";
import { RecentBlogs } from "@/components/RecentBlogs";

export const metadata: Metadata = {
    title: "Bank Statement to QuickBooks & Xero Converter | Convert PDF to QBO/CSV",
    description: "Securely convert PDF bank statements to QuickBooks (.QBO) and Xero-compatible CSV formats. Automate data entry for QuickBooks Online, QuickBooks Desktop, and Xero. 99%+ Accuracy.",
    keywords: [
        "Convert PDF to QuickBooks",
        "Bank Statement to QuickBooks Converter",
        "Import PDF to QuickBooks Online",
        "Convert Bank Statement to QBO",
        "Xero Bank Statement Import",
        "PDF to Xero CSV",
        "Automated Bank Statement Extraction",
        "QuickBooks Web Connect File Generator",
        "Best Bank Statement Converter for Accountants",
        "Bank statement to Xero",
        "QuickBooks bank feed",
        "Xero bank reconciliation",
        "Chase bank statement to QuickBooks",
        "Wells Fargo PDF to Xero"
    ],
    openGraph: {
        title: "Convert PDF Bank Statements to QuickBooks & Xero",
        description: "The fastest way to import bank statements into QuickBooks and Xero. Convert PDFs to .QBO and CSV instantly.",
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
                        "description": "Convert PDF bank statements to QuickBooks QBO and Xero-compatible CSV formats automatically.",
                        "url": "https://statementextract.com/convert-bank-statement-to-quickbooks-xero",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "Web Browser",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "featureList": [
                            "PDF to QBO Conversion",
                            "PDF to Xero CSV Conversion",
                            "Bank feed integration",
                            "99%+ Accuracy",
                            "Secure processing"
                        ],
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.9",
                            "ratingCount": "1847"
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
