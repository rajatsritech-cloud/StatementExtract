import type { Metadata } from "next";
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });


export const metadata: Metadata = {
  title: "Statement Extractor - Bank Statement to CSV/Excel Converter",
  description: "Convert bank statements to CSV/Excel with AI-powered OCR and transaction extraction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} antialiased`}
        >
          {children}
          
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
        </body>
      </html>
    </ClerkProvider>
  );
}
