import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Explicitly allow Google AdSense crawler and Googlebot
            {
                userAgent: 'Mediapartners-Google',
                allow: '/',
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
            },
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        sitemap: 'https://statementextract.com/sitemap.xml',
    }
}
