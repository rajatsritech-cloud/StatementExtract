import { Metadata } from "next";
import { BankStatementConverter } from "@/components/BankStatementConverter";
import { BankStatementFeatures, SupportedBanks, BankStatementFAQ, BankStatementSEOContent } from "@/components/bank-statement/BankStatementContent";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Bank Statement Converter - Convert PDF Bank Statements to CSV/Excel | Automated Extraction",
  description: "Automatically convert any PDF bank statement into clean Excel or CSV files with OCR + AI—trusted accuracy for 1000s of global banks. Fast, secure, industry-leading accuracy conversion.",
  keywords: [
    "Bank Statement Converter",
    "Convert PDF Bank Statements to CSV/Excel",
    "Automated Bank Statement Extraction",
    "Best Bank Statement Converter Online",
    "PDF to Excel Converter",
    "Bank Statement OCR",
    "Financial Data Extraction",
    "Convert Chase Bank Statement to Excel",
    "Convert Wells Fargo PDF to CSV",
    "Scanned Bank Statement to Excel",
    "Bank of America PDF Converter",
    "Free Bank Statement Converter",
    "PDF to CSV for QuickBooks",
    "PDF to Excel for Xero"
  ],
  openGraph: {
    title: "Bank Statement Converter - Convert PDF to CSV/Excel",
    description: "World's most trusted OCR + AI bank statement converter. Works with 1000s of banks globally. Fast, secure, industry-leading accuracy.",
    type: "website",
    url: "/convert-bank-statement-to-csv-excel"
  },
  alternates: {
    canonical: "/convert-bank-statement-to-csv-excel"
  }
};

import { RedirectIfAuthenticated } from "@/components/RedirectIfAuthenticated";

import { RecentBlogs } from "@/components/RecentBlogs";

export default function BankStatementConverterPage() {
  return (
    <>
      <RedirectIfAuthenticated />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Bank Statement Converter",
            "description": "Automatically convert any PDF bank statement into clean Excel or CSV files with OCR + AI",
            "url": "https://statementextract.com/convert-bank-statement-to-csv-excel",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "PDF to Excel conversion",
              "Bank statement OCR",
              "Transaction extraction",
              "CSV export",
              "Secure processing",
              "Multi-currency support",
              "Fraud detection"
            ]
          })
        }}
      />
      <BankStatementConverter />
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
