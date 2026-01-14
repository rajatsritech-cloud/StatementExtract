import { Metadata } from "next";
import dynamic from "next/dynamic";
import { BankStatementConverter } from "@/components/BankStatementConverter";

// Dynamic imports for below-fold components
const BankStatementFeatures = dynamic(() => import("@/components/bank-statement/BankStatementContent").then(mod => ({ default: mod.BankStatementFeatures })), {
  loading: () => <div className="min-h-[400px] bg-[hsl(var(--background))]" />
});

const SupportedBanks = dynamic(() => import("@/components/bank-statement/BankStatementContent").then(mod => ({ default: mod.SupportedBanks })), {
  loading: () => <div className="min-h-[300px] bg-[hsl(var(--background))]" />
});

const BankStatementFAQ = dynamic(() => import("@/components/bank-statement/BankStatementContent").then(mod => ({ default: mod.BankStatementFAQ })), {
  loading: () => <div className="min-h-[400px] bg-[hsl(var(--background))]" />
});

const BankStatementSEOContent = dynamic(() => import("@/components/bank-statement/BankStatementContent").then(mod => ({ default: mod.BankStatementSEOContent })), {
  loading: () => <div className="min-h-[300px] bg-[hsl(var(--background))]" />
});

const HowItWorks = dynamic(() => import("@/components/HowItWorks").then(mod => ({ default: mod.HowItWorks })), {
  loading: () => <div className="min-h-[400px] bg-[hsl(var(--background))]" />
});

const CTA = dynamic(() => import("@/components/CTA").then(mod => ({ default: mod.CTA })), {
  loading: () => <div className="min-h-[200px] bg-[hsl(var(--background))]" />
});

const RecentBlogs = dynamic(() => import("@/components/RecentBlogs").then(mod => ({ default: mod.RecentBlogs })), {
  loading: () => <div className="min-h-[400px] bg-[hsl(var(--background))]" />
});

const RedirectIfAuthenticated = dynamic(() => import("@/components/RedirectIfAuthenticated").then(mod => ({ default: mod.RedirectIfAuthenticated })), {
  loading: () => null
});

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
        alt: "Bank Statement Converter - PDF to Excel/CSV"
      },
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Bank Statement Converter - PDF to Excel/CSV",
    description: "Convert any bank statement PDF to Excel or CSV. Works with Chase, Wells Fargo, Bank of America & more. Free to try."
  },
  alternates: {
    canonical: "/convert-bank-statement-to-csv-excel/",
    languages: {
      "en-US": "https://statementextract.com/convert-bank-statement-to-csv-excel"
    }
  }
};

// Enhanced Schema.org data for better rich snippets
const softwareApplicationSchema = {
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
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock"
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
  "datePublished": "2026-01-01",
  "inLanguage": "en-US"
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
      "name": "Bank Statement Converter",
      "item": "https://statementextract.com/convert-bank-statement-to-csv-excel"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can I convert scanned PDF bank statements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Our tool uses advanced Intelligent Document Processing to read data from scanned images and flattened PDFs with industry-leading accuracy."
      }
    },
    {
      "@type": "Question",
      "name": "Is my financial data secure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. We use bank-level 256-bit encryption. Your files are processed automatically and are not stored permanently on our servers after processing."
      }
    },
    {
      "@type": "Question",
      "name": "Does it work with credit card statements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we support credit card statements, bank account statements, and investment portfolio summaries from almost any financial institution."
      }
    },
    {
      "@type": "Question",
      "name": "How do I import the data into QuickBooks or Xero?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simply download the CSV output. Our format is compatible with the import features of QuickBooks, Xero, Sage, and other major accounting software."
      }
    }
  ]
};

export default function BankStatementConverterPage() {
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
