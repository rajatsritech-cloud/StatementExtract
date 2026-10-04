import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blogs' // Assuming you want to hook up the dynamic blogs eventually

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://statementextract.com'

    // 1. Core Pages - High Priority, Weekly updates (safe bet for tools)
    const corePages = [
        '/', // Homepage
        '/convert/',
        '/tools/',
    ]

    // 2. Converters & Tools - Important, but don't change daily. Priority 0.9, Weekly.
    const toolPages = [
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
        // New high-traffic tools
        '/tools/paycheck-calculator/',
        '/convert/chase-bank-statement-to-excel/',
        '/convert/wells-fargo-statement-to-excel/',

        '/convert/bank-of-america-statement-to-excel/',
        '/convert/vcf-to-csv/',
        '/tools/hourly-to-salary-calculator/',
        '/tools/percentage-calculator/',
        '/tools/routing-number-validator/',
        '/tools/quickbooks-import-validator/',
    ]

    // 3. Secondary Tools - Niche use cases. Priority 0.8, Weekly.
    const secondaryTools = [
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
    ]

    // 4. Static Info Pages - High trust & conversion pages. Priority 0.7, Monthly.
    const infoPages = [
        '/about/',
        '/pricing/',
        '/careers/',
    ]

    // 5. Legal & Contact Pages - Essential compliance pages. Priority 0.6, Monthly.
    const legalPages = [
        '/privacy-policy/',
        '/terms/',
        '/contact/',
        '/cookie-policy/',
    ]

    // 6. Dynamic Blogs - Fetch all MDX technical articles
    const blogListPage = '/blogs/'
    const staticBlogPosts = [
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
        '/blogs/paperless-financial-document-management-2025/',
        '/blogs/bank-statement-for-visa-application-guide/',
        '/blogs/mt940-format-bank-statement-specification-guide/',
        '/blogs/qbo-web-connect-file-format-troubleshooting-guide/',
        '/blogs/chase-bank-statement-pdf-to-excel-conversion-guide/',
        '/blogs/bank-of-america-statement-extraction-quickbooks-guide/',
        '/blogs/wells-fargo-bank-statement-pdf-to-csv-converter-guide/',
        '/blogs/bai2-format-cash-management-bank-statement-guide/',
        '/blogs/ofx-vs-qbo-vs-qfx-financial-file-comparison/',
        '/blogs/bank-statement-audit-trail-fraud-detection-guide/',
        '/blogs/convert-scanned-pdf-to-excel-ocr-guide/',
        '/blogs/xero-bank-reconciliation-troubleshooting-guide/',
        '/blogs/convert-credit-card-statements-to-csv-guide/',
        '/blogs/citibank-statement-pdf-to-excel-conversion-guide/',
        '/blogs/capital-one-statement-extraction-quickbooks-guide/',
        '/blogs/pnc-bank-statement-pdf-to-excel-conversion-guide/',
        '/blogs/td-bank-statement-pdf-to-excel-conversion-guide/',
        '/blogs/quickbooks-desktop-vs-online-bank-feed-import-guide/',
        '/blogs/sage-accounting-bank-statement-import-guide/',
        '/blogs/wave-accounting-bank-statement-csv-formatting-guide/',
        '/blogs/bank-statement-extraction-for-mortgage-underwriters-guide/',
        '/blogs/tax-season-catch-up-bookkeeping-bank-statements-guide/',
    ]

    // Fetch dynamic posts from local content/posts or GitHub
    let dynamicPosts: { slug: string; date: string }[] = []
    try {
        dynamicPosts = await getAllPosts()
    } catch (e) {
        console.warn('Could not fetch dynamic blogs, using fallback list')
    }

    const currentDate = new Date().toISOString().split('T')[0]

    return [
        // Core (1.0)
        ...corePages.map((route) => ({
            url: `${baseUrl}${route}`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        })),

        // Tools (0.9)
        ...toolPages.map((route) => ({
            url: `${baseUrl}${route}`,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 0.9,
        })),

        // Secondary Tools (0.8)
        ...secondaryTools.map((route) => ({
            url: `${baseUrl}${route}`,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 0.8,
        })),

        // Blogs Hub Page (0.9)
        {
            url: `${baseUrl}${blogListPage}`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },

        // Individual Blog Posts (0.85) - High-value comprehensive technical guides
        ...(dynamicPosts.length > 0
            ? dynamicPosts.map((post) => ({
                url: `${baseUrl}/blogs/${post.slug}/`,
                lastModified: post.date || currentDate,
                changeFrequency: 'weekly' as const,
                priority: 0.85,
            }))
            : staticBlogPosts.map((route) => ({
                url: `${baseUrl}${route}`,
                lastModified: currentDate,
                changeFrequency: 'weekly' as const,
                priority: 0.85,
            }))
        ),

        // Static Info Pages (0.7) - About, Pricing, Careers
        ...infoPages.map((route) => ({
            url: `${baseUrl}${route}`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),

        // Legal & Trust Pages (0.6) - Privacy, Terms, Contact, Cookie
        ...legalPages.map((route) => ({
            url: `${baseUrl}${route}`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        })),
    ]
}
