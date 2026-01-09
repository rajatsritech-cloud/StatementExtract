
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
        canonical: "/convert-bank-statement-to-quickbooks-tally/"
    }
};

export default function BankStatementQBOPage() {
    const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Bank Statement to QuickBooks/Tally Converter",
        "description": "Convert PDF bank statements to Tally XML and QuickBooks QBO formats automatically. Supports all major Indian and Global banks.",
        "url": "https://statementextract.com/convert-bank-statement-to-quickbooks-tally",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser, Windows",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "priceValidUntil": "2026-12-31",
            "availability": "https://schema.org/InStock"
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
            "ratingCount": "1250",
            "bestRating": "5",
            "worstRating": "1"
        },
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
                "name": "Bank Statement to QuickBooks & Tally",
                "item": "https://statementextract.com/convert-bank-statement-to-quickbooks-tally"
            }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How do I import the converted file into Tally Prime?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "After conversion, download the Tally XML file. In Tally Prime, go to Gateway of Tally > Import Data > Vouchers, then select your XML file for instant import."
                }
            },
            {
                "@type": "Question",
                "name": "Which Indian banks are supported?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We support all major Indian banks including HDFC, ICICI, SBI, Axis Bank, Kotak Mahindra, Yes Bank, and many more regional banks."
                }
            },
            {
                "@type": "Question",
                "name": "Can I convert multiple statements at once?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Our batch processing feature allows you to upload and convert multiple bank statements simultaneously, saving hours of manual work."
                }
            },
            {
                "@type": "Question",
                "name": "Is the Tally XML format compatible with all Tally versions?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our XML output is fully compatible with Tally Prime, Tally ERP 9, and older versions. The voucher format follows Tally's official XML import specification."
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
