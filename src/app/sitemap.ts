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
    ]

    // 4. Static Info Pages - Low priority, rarely change. Priority 0.5, Monthly/Yearly.
    const infoPages = [
        '/about/',
        '/pricing/',
        '/careers/',
    ]

    const legalPages = [
        '/privacy-policy/',
        '/terms/',
        '/contact/',
    ]

    // 5. Dynamic Blogs - Fetch from source
    // We use the existing URL list logic for now, preventing broken links.
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
    ]

    // Try to fetch dynamic posts (Enterprise way), fallback to static list if empty
    let dynamicPosts: { slug: string; date: string }[] = []
    try {
        dynamicPosts = await getAllPosts()
    } catch (e) {
        console.warn('Could not fetch dynamic blogs, using fallback list')
    }

    // Use dynamic list if available, otherwise fallback to the hardcoded list
    // const blogPosts = dynamicBlogRoutes.length > 0 ? dynamicBlogRoutes : staticBlogPosts

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

        // Blogs List (0.9)
        {
            url: `${baseUrl}${blogListPage}`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },

        // Individual Blog Posts
        ...(dynamicPosts.length > 0
            ? dynamicPosts.map((post) => ({
                url: `${baseUrl}/blogs/${post.slug}/`,
                lastModified: post.date || currentDate,
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            }))
            : staticBlogPosts.map((route) => ({
                url: `${baseUrl}${route}`,
                lastModified: currentDate,
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            }))
        ),

        // Info (0.5)
        ...infoPages.map((route) => ({
            url: `${baseUrl}${route}`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        })),

        // Legal (0.3)
        ...legalPages.map((route) => ({
            url: `${baseUrl}${route}`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        })),
    ]
}
