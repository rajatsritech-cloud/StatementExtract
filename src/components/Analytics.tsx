"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export function Analytics() {
    const [consent, setConsent] = useState(false);

    useEffect(() => {
        const checkConsent = () => {
            const val = localStorage.getItem("cookie-consent");
            // If no value set yet, we default to FALSE (strict privacy)
            // Only enable if explicitly 'accepted'
            if (val === "accepted") {
                setConsent(true);
                // Load clarity immediately if needed or let Script handle it
            } else {
                setConsent(false);
            }
        };

        checkConsent();

        // Listen for the custom event dispatched by CookieConsent
        window.addEventListener("cookie-consent-update", checkConsent);
        return () => window.removeEventListener("cookie-consent-update", checkConsent);
    }, []);

    // TEMPORARY: Consent logic disabled for development/monitoring.
    // Scripts load headers conditionally but return unconditionally.
    // if (!consent) return null; // UNCOMMENT THIS LINE TO RE-ENABLE STRICT GDPR COMPLIANCE

    return (
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
    );
}
