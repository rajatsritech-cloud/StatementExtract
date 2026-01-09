export async function onRequest(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);

  // 1. Safe Path Handling
  const pathStr = params?.path
    ? Array.isArray(params.path)
      ? params.path.join("/")
      : params.path
    : "";

  // 2. Request Size Guard (20MB Limit)
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > 20_000_000) {
    return new Response(JSON.stringify({ error: "Payload too large (Max 20MB)" }), {
      status: 413,
      headers: { "Content-Type": "application/json" }
    });
  }

  // ---------------------------------------------------------
  // CONFIGURATION: Backend Hosts
  // ---------------------------------------------------------
  // Use Domain Names to ensure proper Host resolution and avoid Cloudflare 1003 errors.
  // Port 8000 is used by the backend.
  const PRIMARY_BACKEND = "backend1.statementextract.com:8000";
  const SECONDARY_BACKEND = "backend2.statementextract.com:8000";

  // Deterministic Failover: Always try Primary first, then Secondary.
  const attemptOrder = [PRIMARY_BACKEND, SECONDARY_BACKEND];

  const headers = new Headers(request.headers);
  // Important: Remove Host/IP headers so the backend doesn't get confused
  // or reject the request based on incorrect host.
  headers.delete("host");
  headers.delete("cf-connecting-ip");
  headers.delete("x-forwarded-for");
  headers.delete("x-real-ip");

  // Create a strict shorter timeout for CONNECTING, but allow long READ.
  // Standard fetch doesn't separate these well. 
  // We'll use a relatively generous global timeout for the logic.
  // 5 Minutes (matches our PDF processing needs)
  const GLOBAL_TIMEOUT_MS = 300_000;

  // We need to handle potential hangs.
  // If Primary hangs, we want to give up eventually. 
  // But wait, the user's PDF processing takes 25s.
  // So we can't just timeout quickly on the main request.
  // However, Cloudflare doesn't support "Health Check then Request" easily in one go
  // without delaying the stream.
  //
  // STRATEGY: 
  // We rely on the fact that if the server is DOWN (RST), fetch fails fast.
  // If it's HANGING, we might wait. BUT, since we fixed the Mixed Content,
  // we can just let Cloudflare retry if it's a network error.

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GLOBAL_TIMEOUT_MS);

  try {
    // ---------------------------------------------------------
    // OPTIMIZATION: Smart Failover (Health Check First)
    // ---------------------------------------------------------
    // Problem: If Primary is a "zombie" (accepts conn but hangs), we wait too long.
    // Solution: Quick ping (2s timeout) to Primary's health endpoint.

    let targetBackend = PRIMARY_BACKEND;

    try {
      // Only check health if we are targeting the Primary
      const healthController = new AbortController();
      const healthTimeout = setTimeout(() => healthController.abort(), 2000); // 2s hard timeout

      // We assume backend has a lightweight /api/v1/health endpoint
      // Using HTTP here because we are in the internal proxy network context
      const healthUrl = `http://${PRIMARY_BACKEND}/api/v1/health`;

      const healthRes = await fetch(healthUrl, {
        method: "GET",
        signal: healthController.signal
      });

      clearTimeout(healthTimeout);

      if (!healthRes.ok) {
        console.log(`[Proxy] Primary is unhealthy (${healthRes.status}), failing over instantly.`);
        targetBackend = SECONDARY_BACKEND;
      }
    } catch (err) {
      console.log("[Proxy] Primary health check failed/timed out. Switch to Secondary.");
      targetBackend = SECONDARY_BACKEND;
    }

    // ---------------------------------------------------------
    // MAIN REQUEST
    // ---------------------------------------------------------
    // Now we try the determined target. If that fails (unexpectedly), we can still fallback (optional),
    // but this pre-check solves the "slow latency" issue.

    const backendsToTry = targetBackend === SECONDARY_BACKEND
      ? [SECONDARY_BACKEND]
      : [PRIMARY_BACKEND, SECONDARY_BACKEND];

    // To handle potential body consumption issues on retries, we'll clone the request body
    // if it's not a GET/HEAD request and we might need to retry.
    let requestBody = ["GET", "HEAD"].includes(request.method) ? undefined : request.body;
    let clonedBody = null;

    if (requestBody) {
      // If we might retry (i.e., backendsToTry has more than one element), clone the body.
      // This is a simplification; a more robust solution might buffer the body.
      if (backendsToTry.length > 1) {
        const [body1, body2] = request.body.tee();
        requestBody = body1;
        clonedBody = body2;
      }
    }

    let lastError;

    for (let i = 0; i < backendsToTry.length; i++) {
      const backendHost = backendsToTry[i];
      try {
        const targetUrl = new URL(request.url);
        targetUrl.protocol = "http:"; // Communicate internally over HTTP
        targetUrl.host = backendHost;
        targetUrl.port = "8000";
        targetUrl.pathname = `/api/${pathStr}${targetUrl.search}`; // Reconstruct path with /api/ prefix

        console.log(`[Proxy] Forwarding to: ${targetUrl.toString()}`);

        const currentRequestBody = (i === 0) ? requestBody : clonedBody;

        const response = await fetch(targetUrl.toString(), {
          method: request.method,
          headers,
          body: currentRequestBody,
          signal: controller.signal // Use the global timeout signal
        });

        clearTimeout(timeoutId); // Clear global timeout if a response is received
        const newResponse = new Response(response.body, response);
        newResponse.headers.set("X-Proxy-Target", backendHost);
        return newResponse;

      } catch (e) {
        console.error(`[Proxy] Connection failed to ${backendHost}:`, e);
        lastError = e;

        // If there's another backend to try, and we haven't exhausted our options
        if (i < backendsToTry.length - 1) {
          continue; // Try next
        }
      }
    }

    throw lastError || new Error("All backends unreachable");

  } catch (err) {
    clearTimeout(timeoutId);
    return new Response(
      JSON.stringify({
        error: "Service Unavailable",
        message: "Unable to connect to analysis servers.",
        details: err.message
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }
}
