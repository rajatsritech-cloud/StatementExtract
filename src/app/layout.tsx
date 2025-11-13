// app/layout.tsx
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import ClerkProviderClient from "@/components/ClerkProviderClient"; // update path if needed
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Statement Extractor - Bank Statement to CSV/Excel Converter",
  description: "Convert bank statements to CSV/Excel with AI-powered OCR and transaction extraction",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Clash+Grotesk:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
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
