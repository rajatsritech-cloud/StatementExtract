// Client-side compatible import only (if needed), currently none needed.

// Configuration
const DEFAULT_TIMEOUT_MS = 15000; // 15 seconds default timeout (good for quick reads)
const MAX_RETRIES = 1;

// Define the server URLs
// Primary: From env var or default
// Secondary: Hardcoded fallback based on your deployment script or a second env var
const getApiUrls = () => {
    // Logic:
    // 1. Primary is NEXT_PUBLIC_API_URL
    // 2. Secondary is NEXT_PUBLIC_API_URL_SECONDARY or specific IP from deployment script

    let primary = process.env.NEXT_PUBLIC_API_URL;

    // Default for dev vs prod
    if (!primary) {
        primary = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : '';
    }

    // Clean strings
    primary = primary.replace(/['"]+/g, '').trim();

    // Secondary Server (Instance 2 from your deploy script)
    // You can also add this to your .env.local: NEXT_PUBLIC_API_URL_SECONDARY=http://129.80.181.100:8000
    let secondary = process.env.NEXT_PUBLIC_API_URL_SECONDARY || 'http://129.80.181.100:8000';
    secondary = secondary.replace(/['"]+/g, '').trim();

    return { primary, secondary };
};

// Export for manual usage (e.g. in PDFProcessor)
export { getApiUrls };

/**
 * Checks if a server is healthy (responds within 2 seconds).
 * Returns true if healthy, false if unhealthy/timeout.
 */
export async function isServerHealthy(baseUrl: string): Promise<boolean> {
    if (!baseUrl) return false;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s Strict Timeout

    try {
        // Try /api/v1/health (standard) or fallback to root if needed, but existing script shows /health exists
        const response = await fetch(`${baseUrl}/api/v1/health`, {
            method: 'GET',
            signal: controller.signal
        });
        return response.ok;
    } catch (error) {
        console.warn(`[ApiClient] Health check failed for ${baseUrl}`, error);
        return false;
    } finally {
        clearTimeout(timeoutId);
    }
}

interface FetchOptions extends RequestInit {
    timeout?: number;
    skipFailover?: boolean;
}

/**
 * standard fetch wrapper with failover logic.
 * Tries Primary URL first. On network error or 5xx or Timeout => Tries Secondary URL.
 */
export async function fetchWithFailover(endpoint: string, options: FetchOptions = {}): Promise<Response> {
    const { primary, secondary } = getApiUrls();
    const { timeout = DEFAULT_TIMEOUT_MS, skipFailover = false, ...fetchOptions } = options;

    // Helper to perform a single fetch with timeout
    const doFetch = async (baseUrl: string): Promise<Response> => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            // Ensure endpoint starts with / if base doesn't end with one, and handle empty base (relative)
            const url = baseUrl ? `${baseUrl}${endpoint}` : endpoint;

            console.log(`[ApiClient] Attempting request to: ${url}`);

            const response = await fetch(url, {
                ...fetchOptions,
                signal: controller.signal
            });

            return response;
        } finally {
            clearTimeout(timeoutId);
        }
    };

    // 1. Try Primary
    try {
        const response = await doFetch(primary);

        // If successful or client error (4xx), return immediately. 
        // We only failover on 5xx or network errors.
        if (response.ok || (response.status >= 400 && response.status < 500)) {
            return response;
        }

        console.warn(`[ApiClient] Primary server returned ${response.status}. Initiating failover...`);
        throw new Error(`Primary server error: ${response.status}`);
    } catch (error: any) {
        if (skipFailover) throw error;

        console.warn(`[ApiClient] Primary server failed (${error.name}: ${error.message}). Trying secondary...`);

        // 2. Try Secondary
        try {
            const response = await doFetch(secondary);
            return response;
        } catch (secondaryError: any) {
            console.error(`[ApiClient] Secondary server also failed:`, secondaryError);
            // Throw the original error or a combined one? 
            // Usually better to throw the secondary error so we know both failed.
            throw secondaryError;
        }
    }
}
