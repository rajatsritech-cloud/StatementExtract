// Client-side compatible import only (if needed), currently none needed.

// Configuration
const DEFAULT_TIMEOUT_MS = 15000; // 15 seconds default timeout (good for quick reads)

// Define the server URLs
const getApiUrls = () => {
    // Logic:
    // 1. If running in browser and on HTTPS, FORCE relative URL to prevent Mixed Content.
    //    This assumes the serving host (Cloudflare) has the /api proxy set up.
    if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
        return { primary: '', secondary: '' };
    }

    // 2. If explicit Production build
    // In Production: Return EMPTY string. This forces relative path usage (/api/...).
    // Next.js/Cloudflare Pages will then route this to functions/api/[[path]].js,
    // which handles the Proxy + Failover logic securely (fixing Mixed Content).
    if (process.env.NODE_ENV === 'production') {
        return { primary: '', secondary: '' };
    }

    // In Development: Use localhost or env var.

    // Dev Fallback
    let primary = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    return { primary, secondary: '' };
};

// Export for manual usage
export { getApiUrls };

interface FetchOptions extends RequestInit {
    timeout?: number;
    skipFailover?: boolean; // Kept for interface compatibility but largely unused now
}

/**
 * Simplified Fetch Wrapper.
 * In Production, it simply calls the relative endpoint (e.g. /api/v1/extract).
 * The Backup/Failover logic is now handled Server-Side by Cloudflare Functions.
 */
export async function fetchWithFailover(endpoint: string, options: FetchOptions = {}): Promise<Response> {
    const { primary } = getApiUrls();
    const { timeout = DEFAULT_TIMEOUT_MS, ...fetchOptions } = options;

    // Construct URL (Relative in Prod, Absolute in Dev)
    const baseUrl = primary;
    // Ensure endpoint strictly follows base
    const url = baseUrl ? `${baseUrl}${endpoint}` : endpoint;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        console.log(`[ApiClient] Request: ${url}`);
        const response = await fetch(url, {
            ...fetchOptions,
            signal: controller.signal
        });

        return response;
    } catch (error) {
        console.error(`[ApiClient] Request failed:`, error);
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}

