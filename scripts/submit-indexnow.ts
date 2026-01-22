/**
 * IndexNow Submission Script
 * 
 * Run this script to submit all 90+ main pages to IndexNow
 * Usage: npx ts-node scripts/submit-indexnow.ts
 */

const INDEXNOW_KEY = 'a1b2c3d4e5f6789012345678abcdef90';
const HOST = 'statementextract.com';
const BASE_URL = `https://${HOST}`;

// All 90+ main pages from sitemap.ts
const URLS = [
    // Core Pages
    '/',
    '/convert/',
    '/tools/',

    // Main Tools & Converters
    '/convert-bank-statement-to-csv-excel/',
    '/convert-invoice-to-excel-csv/',
    '/convert-bank-statement-to-quickbooks-tally/',
    '/convert-bank-statement-to-quickbooks-xero/',
    '/convert/merge-pdf/',
    '/convert/compress-pdf/',
    '/convert/split-pdf/',
    '/convert/jpg-to-pdf/',
    '/convert/image-compressor/',
    '/convert/json-to-toon/',
    '/convert/batch-converter/',
    '/convert/batch-converter/heic-to-jpg/',
    '/convert/avif-converter/image-to-avif/',
    '/convert/avif-converter/avif-to-png/',
    '/convert/avif-converter/avif-to-webp/',
    '/convert/csv-to-ofx/',
    '/convert/csv-to-qbo/',
    '/convert/pdf-to-mt940/',
    '/convert/csv-to-mt940/',
    '/convert/qif-to-qbo/',
    '/tools/profit-margin-calculator/',
    '/tools/gst-vat-calculator/',
    '/tools/markup-calculator/',
    '/tools/invoice-generator/',
    '/tools/self-employed-tax-calculator/',
    '/convert/json-to-sql/',
    '/convert/image-to-base64/',
    '/tools/amortization-calculator/',
    '/tools/debt-snowball-calculator/',
    '/tools/fire-calculator/',
    '/tools/rental-roi-calculator/',
    '/convert/qbo-to-csv/',
    '/tools/financial-ratio-calculator/',
    '/tools/compound-interest-calculator/',
    '/convert/rotate-pdf/',
    '/convert/add-page-numbers-pdf/',
    '/convert/unlock-pdf/',
    '/tools/paycheck-calculator/',
    '/convert/chase-bank-statement-to-excel/',
    '/convert/wells-fargo-statement-to-excel/',
    '/convert/bank-of-america-statement-to-excel/',
    '/convert/vcf-to-csv/',
    '/tools/hourly-to-salary-calculator/',
    '/tools/percentage-calculator/',
    '/tools/routing-number-validator/',
    '/tools/quickbooks-import-validator/',

    // Secondary Tools
    '/convert/stripe-to-qbo/',
    '/convert/paypal-to-qbo/',
    '/convert/qfx-to-pdf/',
    '/tools/qbo-viewer/',
    '/tools/ofx-viewer/',
    '/convert/qfx-to-csv/',
    '/convert/ofx-to-excel/',
    '/convert/ofx-to-qbo/',
    '/convert/mt940-to-excel/',
    '/convert/qif-to-csv/',
    '/convert/qfx-to-excel/',
    '/convert/qif-to-excel/',
    '/convert/iif-to-excel/',
    '/convert/csv-to-iif/',
    '/convert/csv-to-excel/',
    '/convert/excel-to-csv/',

    // Info & Legal
    '/about/',
    '/pricing/',
    '/careers/',
    '/privacy-policy/',
    '/terms/',
    '/contact/',
    '/cookie-policy/',

    // Blog Pages
    '/blogs/',
    '/blogs/bank-statement-converter-pdf-to-excel-csv/',
    '/blogs/bank-statement-analysis-loan-underwriting-automation/',
    '/blogs/idp-vs-ocr-document-processing/',
    '/blogs/bank-statement-pdf-to-excel-using-ai/',
    '/blogs/ultimate-guide-accurate-bank-statement-extraction-ocr-ai/',
    '/blogs/ai-bank-statement-data-extraction-no-templates/',
    '/blogs/best-bank-statement-extraction-software-comparison/',
    '/blogs/bank-statement-mortgage-self-employed-guide/',
    '/blogs/import-bank-statement-quickbooks-xero-sage-without-bank-feed/',
    '/blogs/ai-pdf-data-extraction-tools-accountants-comparison/',
    '/blogs/cash-flow-rental-property-roi-calculator-tools/',
    '/blogs/convert-bank-statement-to-quickbooks-xero-guide/',
    '/blogs/automated-bank-reconciliation-software-guide/',
    '/blogs/bank-statement-organization-tax-preparation-guide/',
    '/blogs/how-to-read-bank-statement-guide/',
    '/blogs/paperless-financial-document-management-2026/',
    '/blogs/bank-statement-for-visa-application-guide/',
].map(path => `${BASE_URL}${path}`);

async function submitToIndexNow() {
    console.log(`Submitting ${URLS.length} URLs to IndexNow...`);

    const payload = {
        host: HOST,
        key: INDEXNOW_KEY,
        urlList: URLS,
    };

    const endpoints = [
        'https://api.indexnow.org/indexnow',
        'https://www.bing.com/indexnow',
        'https://yandex.com/indexnow',
    ];

    for (const endpoint of endpoints) {
        try {
            console.log(`Sending to ${endpoint}...`);
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log(`✅ ${endpoint}: Success (${response.status})`);
            } else {
                console.error(`❌ ${endpoint}: Failed (${response.status} ${response.statusText})`);
                const text = await response.text();
                console.error(`Response: ${text}`);
            }
        } catch (error) {
            console.error(`❌ ${endpoint}: Error -`, error);
        }
    }
}

submitToIndexNow();
