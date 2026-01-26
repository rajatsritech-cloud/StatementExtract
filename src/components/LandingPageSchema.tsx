
import Script from "next/script";

export const LandingPageSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": "Statement Extract",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "description": "AI-powered document processing tool (2026) to convert bank statements and invoices to Excel, CSV, QuickBooks, and Xero formats. Extract data from PDFs with 98%+ accuracy—supports 1000+ banks and all major accounting software.",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "ratingCount": "1250"
                }
            },
            {
                "@type": "WebSite",
                "name": "Statement Extract",
                "url": "https://statementextract.com",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://statementextract.com/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "Organization",
                "name": "Statement Extract",
                "url": "https://statementextract.com",
                "logo": "https://statementextract.com/assets/logo.png",
                "sameAs": [
                    "https://x.com/statement3376",
                    "https://www.linkedin.com/company/statement-extract/"
                ]
            }
        ]
    };

    return (
        <Script
            id="landing-page-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
