import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // General access
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/dashboard/', '/api/'],
            },
            // Google AdSense crawlers - MUST have full access for ads
            {
                userAgent: 'Mediapartners-Google',
                allow: '/',
            },
            {
                userAgent: 'AdsBot-Google',
                allow: '/',
            },
            {
                userAgent: 'AdsBot-Google-Mobile',
                allow: '/',
            },
            // Block AI training bots (keep your content protected)
            {
                userAgent: 'Amazonbot',
                disallow: '/',
            },
            {
                userAgent: 'Applebot-Extended',
                disallow: '/',
            },
            {
                userAgent: 'Bytespider',
                disallow: '/',
            },
            {
                userAgent: 'CCBot',
                disallow: '/',
            },
            {
                userAgent: 'ClaudeBot',
                disallow: '/',
            },
            {
                userAgent: 'Google-Extended',
                disallow: '/',
            },
            {
                userAgent: 'GPTBot',
                disallow: '/',
            },
            {
                userAgent: 'meta-externalagent',
                disallow: '/',
            },
        ],
        sitemap: 'https://statementextract.com/sitemap.xml',
    }
}

