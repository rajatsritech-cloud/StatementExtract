import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';

// --- Module-Level Cache (Singleton) ---
// This ensures data is shared across all components using this hook.
interface UsageData {
    usage: number;
    limit: number;
    remaining: number;
    tier: string;
}

let cachedData: UsageData | null = null;
let activePromise: Promise<UsageData | null> | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30000; // 30 seconds cache validity

// Event to notify components of updates
const USAGE_UPDATED_EVENT = 'usage_updated';

export const useUsage = () => {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const [data, setData] = useState<UsageData | null>(cachedData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUsage = useCallback(async (force = false) => {
        if (!isLoaded || !isSignedIn) return;

        // 1. Return cached data if valid and not forced
        const now = Date.now();
        if (!force && cachedData && (now - lastFetchTime < CACHE_DURATION)) {
            setData(cachedData);
            return;
        }

        // 2. Return active promise if already fetching (Deduplication)
        if (activePromise) {
            try {
                const result = await activePromise;
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch usage');
            }
            return;
        }

        // 3. Start new fetch
        setIsLoading(true);
        setError(null);

        activePromise = (async () => {
            try {
                const token = await getToken();
                if (!token) return null;

                const { fetchWithFailover } = await import('@/lib/apiClient');
                const response = await fetchWithFailover('/api/v1/user/usage', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!response.ok) throw new Error('Failed to fetch usage');

                const result = await response.json();

                // Update Cache
                cachedData = result;
                lastFetchTime = Date.now();
                return result;
            } catch (err) {
                console.error("Error fetching usage:", err);
                throw err;
            } finally {
                activePromise = null;
                setIsLoading(false);
            }
        })();

        try {
            const result = await activePromise;
            if (result) {
                setData(result);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch usage');
        }
    }, [isLoaded, isSignedIn, getToken]);

    // Manual refresh function (e.g. called after upload)
    const refreshUsage = useCallback(() => {
        // Clear cache to force update
        cachedData = null;
        lastFetchTime = 0;

        fetchUsage(true).then(() => {
            // Dispatch event to notify other components
            window.dispatchEvent(new Event(USAGE_UPDATED_EVENT));
        });
    }, [fetchUsage]);

    // Initial Fetch & Event Listener
    useEffect(() => {
        fetchUsage();

        const handleUpdate = () => {
            // When event fires, we know cache is updated or needs update
            // If we have cached data, update state immediately
            if (cachedData) {
                setData(cachedData);
            } else {
                fetchUsage(true);
            }
        };

        window.addEventListener(USAGE_UPDATED_EVENT, handleUpdate);
        return () => window.removeEventListener(USAGE_UPDATED_EVENT, handleUpdate);
    }, [fetchUsage]);

    return {
        usage: data,
        isLoading,
        error,
        refreshUsage
    };
};
