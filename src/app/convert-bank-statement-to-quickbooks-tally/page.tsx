
import { Metadata } from "next";
import { BankStatementConverter } from "@/components/BankStatementConverter";
import { SupportedBanks } from "@/components/bank-statement/BankStatementContent";
import { BankStatementFeaturesQBO, BankStatementFAQQBO, BankStatementSEOContentQBO } from "@/components/bank-statement/BankStatementContentQBO";

import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { RedirectIfAuthenticated } from "@/components/RedirectIfAuthenticated";
import { RecentBlogs } from "@/components/RecentBlogs";

export const metadata: Metadata = {
    title: "Convert Bank Statement PDF to Tally (XML) & QuickBooks (QBO)",
    description: "The #1 Bank Statement Converter for Tally Prime & QuickBooks. Convert PDF to Tally XML and QBO automatically. 100% compliant with Tally Import.",
    keywords: [
        "Convert PDF to Tally XML",
        "Bank Statement to Tally Prime",
        "PDF to Tally Voucher Import",
        "Convert PDF to QuickBooks Online",
        "Tally Bank Audit Tool",
        "Automated Data Entry for Tally",
        "QuickBooks QBO Converter",
        "Bank Statement Extraction India",
        "ICICI Bank Statement to Tally",
        "HDFC PDF to Tally XML"
    ],
    openGraph: {
        title: "Convert PDF Bank Statements to Tally Prime & QuickBooks",
        description: "Automate your Tally data entry. Convert PDF bank statements to Tally XML Vouchers in seconds.",
        type: "website",
        url: "/convert-bank-statement-to-quickbooks-tally"
    },
    alternates: {
        canonical: "/convert-bank-statement-to-quickbooks-tally"
    }
};

export default function BankStatementQBOPage() {
    return (
        <>
            <RedirectIfAuthenticated />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Bank Statement to QuickBooks/Tally Converter",
                        "headline": "Convert PDF Statements to Tally Prime & QuickBooks",
                        "description": "Convert PDF bank statements to Tally XML and QuickBooks QBO formats automatically. Supports all major Indian and Global banks.",
                        "url": "https://statementextract.com/convert-bank-statement-to-quickbooks-tally",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "Web Browser, Windows",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD",
                            "priceValidUntil": "2026-12-31"
                        },
                        "featureList": [
                            "PDF to Tally XML (Voucher) Conversion",
                            "PDF to QBO Conversion",
                            "Automatic Ledger Mapping",
                            "100% Tally Prime Compatible",
                            "Secure & Private"
                        ],
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.8",
                            "ratingCount": "1250"
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
        Reusing the main converter component with specialized props for QBO/Tally.
      */}

            <BankStatementConverter
                titleSuffix={<span className="bg-gradient-primary bg-clip-text text-transparent"> QuickBooks & Tally</span>}
                description="Stop manual data entry. Upload your PDF statements and automatically convert them into .QBO (Web Connect) or Tally XML format for instant import."
            />
            <SupportedBanks />
            <HowItWorks />
            <BankStatementFeaturesQBO />
            <BankStatementSEOContentQBO />
            <BankStatementFAQQBO />
            <RecentBlogs />
            <CTA />
        </>
    );
}
