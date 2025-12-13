
import { Metadata } from "next";
import { BankStatementConverter } from "@/components/BankStatementConverter";
import { SupportedBanks } from "@/components/bank-statement/BankStatementContent";
import { BankStatementFeaturesQBO, BankStatementFAQQBO, BankStatementSEOContentQBO } from "@/components/bank-statement/BankStatementContentQBO";

import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { RedirectIfAuthenticated } from "@/components/RedirectIfAuthenticated";
import { RecentBlogs } from "@/components/RecentBlogs";

export const metadata: Metadata = {
    title: "Bank Statement to QuickBooks & Tally Converter | Convert PDF to XML/QBO",
    description: "Securely convert PDF bank statements to QuickBooks (.QBO) and Tally XML formats. Automate data entry for Tally Prime, ERP 9, and QuickBooks Online. 100% Accuracy.",
    keywords: [
        "Convert PDF to Tally XML",
        "Bank Statement to QuickBooks Converter",
        "Import PDF to QuickBooks Online",
        "Convert Bank Statement to QBO",
        "Tally Prime Bank Import",
        "PDF to Tally Vouchers",
        "Automated Bank Statement Extraction",
        "QuickBooks Web Connect File Generator",
        "Best Bank Statement Converter for Accountants"
    ],
    openGraph: {
        title: "Convert PDF Bank Statements to QuickBooks & Tally",
        description: "The fastest way to import bank statements into QuickBooks and Tally. Convert PDFs to .QBO and XML instantly.",
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
                        "description": "Convert PDF bank statements to Tally XML and QuickBooks QBO formats automatically.",
                        "url": "https://statementextract.com/convert-bank-statement-to-quickbooks-tally",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "Web Browser",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "featureList": [
                            "PDF to QBO Conversion",
                            "PDF to Tally XML Conversion",
                            "Bank feed integration",
                            "100% Accuracy",
                            "Secure processing"
                        ]
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
