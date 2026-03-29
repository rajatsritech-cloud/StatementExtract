
import Script from "next/script";

export const LandingPageSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": "Bank Statement Converter",
                "alternateName": "Statement Extract",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "description": "Convert PDF bank statements to Excel, CSV, or QBO seamlessly. Fast, secure, and private browser-based extraction for accountants and bookkeepers.",
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
