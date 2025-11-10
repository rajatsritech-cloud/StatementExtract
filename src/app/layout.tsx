import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import "./globals.css";


export const metadata: Metadata = {
  title: "Statement Extractor - Bank Statement to CSV/Excel Converter",
  description: "Convert bank statements to CSV/Excel with AI-powered OCR and transaction extraction",
};

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY; // Or process.env.REACT_APP_CLERK_PUBLISHABLE_KEY

console.log(clerkPublishableKey,"clerkPublishableKey")
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Clash+Grotesk:wght@400;600;700&display=swap" rel="stylesheet" />
        </head>
        <body
          className="antialiased"
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
