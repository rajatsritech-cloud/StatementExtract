import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Allow all bots for AdSense approval
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        sitemap: 'https://statementextract.com/sitemap.xml',
    }
}
