// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import ClerkProviderClient from "@/components/ClerkProviderClient"; // update path if needed
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ServerWarmup } from "@/components/ServerWarmup";
import { TopLoader } from "@/components/TopLoader";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@/components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const isProduction = process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL("https://statementextract.com"),
  title: {
    default: "Statement Extract – AI Document Processing Made Easy",
    template: "%s | Statement Extract",
  },
  description:
    "Extract data from bank statements, invoices & documents instantly. AI-powered processing—no templates, no training required. Free to try.",
  keywords: [
    // Primary high-volume terms
    "bank statement converter",
    "PDF to Excel converter",
    "bank statement to excel",
    "convert PDF bank statement",
    "invoice data extraction",
    // AI/IDP terms
    "AI document processing",
    "intelligent document processing",
    "OCR software",
    "document automation",
    // Specific use cases
    "bank statement to CSV",
    "bank statement to QuickBooks",
    "PDF to QBO converter",
    "invoice to Excel",
    "financial data extraction",
    // Free tool keywords  
    "free PDF converter",
    "free bank statement converter",
    "merge PDF online free",
    "compress PDF free",
  ],
  authors: [{ name: "Statement Extract" }],
  creator: "Statement Extract",
  publisher: "Statement Extract",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Statement Extract – Intelligent Document Processing & Extraction",
    description:
      "Statement Extract is an AI-powered Intelligent Document Processing platform that converts any document—bank statements, invoices, contracts, healthcare records, forms, and more—into structured data instantly. No templates, no manual training, and no setup required. Built for scale, with secure APIs, fast processing, and industry-leading accuracy.",
    type: "website",
    locale: "en_US",
    siteName: "Statement Extract",
    url: "https://statementextract.com",
    images: [
      {
        url: "/assets/StatementExtract_Workflow_img.png",
        width: 1200,
        height: 630,
        alt: "Statement Extract - AI Document Processing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Statement Extract – AI-Powered Document Processing for Modern Teams",
    description:
      "Extract structured data from any document—bank statements, invoices, contracts, healthcare records and more. Intelligent Document Processing with no templates, no training, just results.",
    images: ["/assets/StatementExtract_Workflow_img.png"],
    creator: "@statementextract",
  },
  appleWebApp: {
    title: "StatementExtract",
    statusBarStyle: "default",
  },
  icons: {
    // Google prefers 48x48+ in multiples of 48. Ordered by priority for search engines.
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" }, // Google minimum
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: [{ url: "/favicon.ico" }], // Legacy support for some crawlers
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  category: "technology",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "https://statementextract.com",
      "en-GB": "https://statementextract.com", // UK - High CPC
      "en-CA": "https://statementextract.com", // Canada - High CPC
      "en-AU": "https://statementextract.com", // Australia - High CPC
      "x-default": "https://statementextract.com",
    },
  },
};

export const viewport = {
  themeColor: "#16a34a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Organization Schema for E-E-A-T */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Statement Extract",
              "url": "https://statementextract.com",
              "logo": "https://statementextract.com/favicon-512x512.png",
              "description": "AI-powered document processing platform for extracting structured data from bank statements, invoices, and financial documents.",
              "foundingDate": "2024",
              "sameAs": [
                "https://www.linkedin.com/company/statement-extract/"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "url": "https://statementextract.com/contact"
              }
            })
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden w-full max-w-[100vw]">
        {isProduction && (
          <>
            <Analytics />
          </>
        )}
        <ClerkProviderClient>
          <ServerWarmup />
          <ThemeProvider defaultTheme="orange" storageKey="statement-extract-theme">
            <TopLoader />
            <div className="flex min-h-screen flex-col bg-[hsl(var(--background))]">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            {/* <CookieConsent /> */}
            <TopLoader />
            <ScrollToTop />
            <Toaster
              position="bottom-right"
              toastOptions={{
                className: 'bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))]',
                style: {
                  background: 'hsl(var(--card))',
                  color: 'hsl(var(--card-foreground))',
                  border: '1px solid hsl(var(--border))'
                }
              }}
            />
          </ThemeProvider>
        </ClerkProviderClient>
      </body>
    </html>
  );
}
