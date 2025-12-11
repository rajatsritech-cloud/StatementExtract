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
    default: "Statement Extract – AI-Powered Document Processing for Modern Teams",
    template: "%s | Statement Extractor",
  },
  description:
    "Extract structured data from any document—bank statements, invoices, contracts, healthcare records and more. Intelligent Document Processing with no templates, no training, just results",
  openGraph: {
    title: "Statement Extract – Intelligent Document Processing & Extraction",
    description:
      "Statement Extract is an AI-powered Intelligent Document Processing platform that converts any document—bank statements, invoices, contracts, healthcare records, forms, and more—into structured data instantly. No templates, no manual training, and no setup required. Built for scale, with secure APIs, fast processing, and industry-leading accuracy.",
    type: "website",
    siteName: "Statement Extractor",
    images: ["/assets/StatementExtract_Workflow_img.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Statement Extract – AI-Powered Document Processing for Modern Teams",
    description:
      "Extract structured data from any document—bank statements, invoices, contracts, healthcare records and more. Intelligent Document Processing with no templates, no training, just results.",
    images: ["/assets/StatementExtract_Workflow_img.png"],
  },
  appleWebApp: {
    title: "StatementExtract",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",

  alternates: {
    canonical: "/",
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

      </head>
      <body className="antialiased overflow-x-hidden">
        {isProduction && (
          <>
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
            <Script id="microsoft-clarity" strategy="afterInteractive">
              {`
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "uhbfuj9d6q");
              `}
            </Script>
          </>
        )}
        <ClerkProviderClient>
          <ServerWarmup />
          <ThemeProvider defaultTheme="green" storageKey="statement-extract-theme">
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
          </ThemeProvider>
        </ClerkProviderClient>
      </body>
    </html>
  );
}
