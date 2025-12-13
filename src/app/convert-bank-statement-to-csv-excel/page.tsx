import { Metadata } from "next";
import { BankStatementConverter } from "@/components/BankStatementConverter";
import { BankStatementFeatures, SupportedBanks, BankStatementFAQ, BankStatementSEOContent } from "@/components/bank-statement/BankStatementContent";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Bank Statement Converter - Convert PDF Bank Statements to CSV/Excel | Free Online Tool",
  description: "Automatically convert any PDF bank statement into clean Excel or CSV files with AI-powered extraction. Works with Chase, Wells Fargo, Bank of America, Citibank & 1000s more. Fast, secure, 99%+ accuracy.",
  keywords: [
    // High-CPC US-targeted keywords
    "bank statement converter",
    "PDF to Excel converter",
    "bank statement to csv",
    "convert bank statement to excel",
    "bank statement pdf to excel",
    // Major US Banks
    "Chase bank statement converter",
    "Wells Fargo statement to Excel",
    "Bank of America PDF converter",
    "Citibank statement converter",
    "Capital One bank statement to CSV",
    "US Bank statement extraction",
    "TD Bank statement converter",
    "PNC bank statement to Excel",
    // Accounting Software Integration
    "PDF to CSV for QuickBooks",
    "bank statement import QuickBooks",
    "PDF to Excel for Xero",
    "bank statement import Xero",
    "bank statement to accounting software",
    // High-intent keywords
    "best bank statement converter online",
    "free bank statement converter",
    "automated bank statement extraction",
    "scanned bank statement to Excel",
    "OCR bank statement",
    "financial data extraction",
    "bank transaction extraction"
  ],
  openGraph: {
    title: "Bank Statement Converter - Convert PDF to CSV/Excel Instantly",
    description: "The most trusted AI-powered bank statement converter. Works with 1000s of US banks including Chase, Wells Fargo, Bank of America. Free to try, 99%+ accuracy.",
    type: "website",
    locale: "en_US",
    url: "https://statementextract.com/convert-bank-statement-to-csv-excel",
    images: [
      {
        url: "/assets/StatementExtract_Workflow_img.png",
        width: 1200,
        height: 630,
        alt: "Bank Statement Converter - PDF to Excel/CSV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bank Statement Converter - PDF to Excel/CSV",
    description: "Convert any bank statement PDF to Excel or CSV. Works with Chase, Wells Fargo, Bank of America & more. Free to try.",
  },
  alternates: {
    canonical: "/convert-bank-statement-to-csv-excel",
    languages: {
      "en-US": "https://statementextract.com/convert-bank-statement-to-csv-excel",
    },
  },
};

import { RedirectIfAuthenticated } from "@/components/RedirectIfAuthenticated";
import { RecentBlogs } from "@/components/RecentBlogs";

// Enhanced Schema.org data for better rich snippets
const schemaData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Bank Statement Converter by Statement Extract",
  "description": "Automatically convert any PDF bank statement into clean Excel or CSV files with AI-powered Intelligent Document Processing. Works with Chase, Wells Fargo, Bank of America, and 1000s of banks worldwide.",
  "url": "https://statementextract.com/convert-bank-statement-to-csv-excel",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "priceValidUntil": "2025-12-31",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "2847",
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": [
    "PDF to Excel conversion",
    "PDF to CSV conversion",
    "Chase Bank statement processing",
    "Wells Fargo statement extraction",
    "Bank of America PDF conversion",
    "Citibank statement processing",
    "QuickBooks compatible export",
    "Xero compatible export",
    "Multi-currency support",
    "Secure encryption",
    "99%+ accuracy",
    "Scanned document support"
  ],
  "screenshot": "https://statementextract.com/assets/StatementExtract_Workflow_img.png",
  "softwareVersion": "2.0",
  "datePublished": "2024-01-01",
  "inLanguage": "en-US"
};

export default function BankStatementConverterPage() {
  return (
    <>
      <RedirectIfAuthenticated />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData)
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
