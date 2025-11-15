import { Metadata } from "next";
import { BankStatementConverter } from "@/components/BankStatementConverter";

export const metadata: Metadata = {
  title: "Bank Statement Converter - Convert PDF Bank Statements to CSV/Excel | Automated Extraction",
  description: "Automatically convert any PDF bank statement into clean Excel or CSV files with OCR + AI—trusted accuracy for 1000s of global banks. Fast, secure, 99.9% accurate conversion.",
  keywords: [
    "Bank Statement Converter",
    "Convert PDF Bank Statements to CSV/Excel",
    "Automated Bank Statement Extraction",
    "Best Bank Statement Converter Online",
    "PDF to Excel Converter",
    "Bank Statement OCR",
    "Financial Data Extraction"
  ],
  openGraph: {
    title: "Bank Statement Converter - Convert PDF to CSV/Excel",
    description: "World's most trusted OCR + AI bank statement converter. Works with 1000s of banks globally. Fast, secure, 99.9% accurate.",
    type: "website",
    url: "/convert-bank-statement-to-csv-excel"
  },
  alternates: {
    canonical: "/convert-bank-statement-to-csv-excel"
  }
};

export default function BankStatementConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Bank Statement Converter",
            "description": "Automatically convert any PDF bank statement into clean Excel or CSV files with OCR + AI",
            "url": "/convert-bank-statement-to-csv-excel",
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
              "Secure processing"
            ]
          })
        }}
      />
      <BankStatementConverter />
    </>
  );
}
