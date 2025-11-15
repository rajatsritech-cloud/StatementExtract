// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import ClerkProviderClient from "@/components/ClerkProviderClient"; // update path if needed
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://statementextract.com"),
  title: {
    default: "Statement Extractor - Bank Statement to CSV/Excel Converter",
    template: "%s | Statement Extractor",
  },
  description:
    "Convert bank statements to CSV/Excel with advanced OCR and AI-powered transaction extraction",
  openGraph: {
    title: "Statement Extractor - Bank Statement to CSV/Excel Converter",
    description:
      "Convert bank statements to CSV/Excel with advanced OCR and AI-powered transaction extraction",
    type: "website",
    siteName: "Statement Extractor",
    images: ["/assets/StatementExtract_Workflow_img.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Statement Extractor - Bank Statement to CSV/Excel Converter",
    description:
      "Convert bank statements to CSV/Excel with advanced OCR and AI-powered transaction extraction",
    images: ["/assets/StatementExtract_Workflow_img.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&family=Inter:wght@400;500;600;700&family=Clash+Grotesk:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KXNG847173"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-KXNG847173');
          `}
        </Script>
        <ClerkProviderClient>
          <div className="flex min-h-screen flex-col bg-[hsl(var(--background))]">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))]',
              style: {
                background: 'hsl(var(--card))',
                color: 'hsl(var(--card-foreground))',
                border: '1px solid hsl(var(--border))'
              }
            }}
          />
        </ClerkProviderClient>
      </body>
    </html>
  );
}
