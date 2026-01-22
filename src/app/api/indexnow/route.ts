import { NextRequest, NextResponse } from 'next/server';

// IndexNow key - must match the key file in /public/{key}.txt
const INDEXNOW_KEY = 'a1b2c3d4e5f6789012345678abcdef90';

// Search engines that support IndexNow
const INDEXNOW_ENDPOINTS = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow',
];

interface IndexNowPayload {
    host: string;
    key: string;
    urlList: string[];
}

/**
 * Submit URLs to IndexNow
 * POST /api/indexnow
 * Body: { urls: string[] }
 * 
 * Requires API_SECRET header for security
 */
export async function POST(request: NextRequest) {
    try {
        // Simple API key protection
        const apiSecret = request.headers.get('x-api-secret');
        if (apiSecret !== process.env.INDEXNOW_API_SECRET) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const urls: string[] = body.urls;

        if (!urls || !Array.isArray(urls) || urls.length === 0) {
            return NextResponse.json(
                { error: 'Invalid request: urls array required' },
                { status: 400 }
            );
        }

        // Validate URLs belong to our domain
        const validUrls = urls.filter(url =>
            url.startsWith('https://statementextract.com') ||
            url.startsWith('https://www.statementextract.com')
        );

        if (validUrls.length === 0) {
            return NextResponse.json(
                { error: 'No valid URLs for statementextract.com' },
                { status: 400 }
            );
        }

        // Limit to 10,000 URLs per request (IndexNow limit)
        const urlsToSubmit = validUrls.slice(0, 10000);

        const payload: IndexNowPayload = {
            host: 'statementextract.com',
            key: INDEXNOW_KEY,
            urlList: urlsToSubmit,
        };

        const results = await Promise.allSettled(
            INDEXNOW_ENDPOINTS.map(async (endpoint) => {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    body: JSON.stringify(payload),
                });
                return {
                    endpoint,
                    status: response.status,
                    ok: response.ok,
                };
            })
        );

        const summary = results.map((result, index) => {
            if (result.status === 'fulfilled') {
                return result.value;
            }
            return {
                endpoint: INDEXNOW_ENDPOINTS[index],
                status: 'error',
                error: result.reason?.message || 'Unknown error',
            };
        });

        return NextResponse.json({
            success: true,
            urlsSubmitted: urlsToSubmit.length,
            results: summary,
        });
    } catch (error) {
        console.error('IndexNow error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * GET endpoint to submit a single URL quickly
 * GET /api/indexnow?url=https://statementextract.com/page
 */
export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get('url');
    const secret = request.nextUrl.searchParams.get('secret');

    if (secret !== process.env.INDEXNOW_API_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!url) {
        return NextResponse.json({ error: 'URL parameter required' }, { status: 400 });
    }

    if (!url.startsWith('https://statementextract.com')) {
        return NextResponse.json({ error: 'Invalid URL domain' }, { status: 400 });
    }

    // Submit to IndexNow API (which shares with all participating engines)
    const indexNowUrl = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${INDEXNOW_KEY}`;

    try {
        const response = await fetch(indexNowUrl);
        return NextResponse.json({
            success: response.ok,
            status: response.status,
            url: url,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: 'Failed to submit to IndexNow',
        }, { status: 500 });
    }
}
