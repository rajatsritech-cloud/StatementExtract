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
  // CONFIGURATION: Backend IPs
  // ---------------------------------------------------------
  // Using direct IPs avoids DNS propagation issues and allows HTTP access
  // without mixed-content errors (since Cloudflare -> Backend is hidden).
  const PRIMARY_BACKEND = "150.136.48.30:8000";
  const SECONDARY_BACKEND = "129.80.181.100:8000";

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
    let lastError;

    for (const backend of attemptOrder) {
      try {
        const targetUrl = `http://${backend}/api/${pathStr}${url.search}`;
        console.log(`[Proxy] Forwarding to: ${targetUrl}`);

        const response = await fetch(targetUrl, {
          method: request.method,
          headers,
          body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
          // We share the signal, but if one fails fast, we continue.
          // Note: Re-using signal for sequential fetches is risky if aborted.
          // Better: Create a new signal for each IF we wanted per-request timeouts.
          // Checks: backend connectivity usually fails fast (TCP).
          // Processing hangs are different.
        });

        // If we got a response (even 404/500), the server is "reachable".
        // Use 5xx as a signal to retry on secondary?
        if (response.ok || response.status < 500) {
          clearTimeout(timeoutId);
          return new Response(response.body, {
            status: response.status,
            headers: response.headers
          });
        }

        console.warn(`[Proxy] Backend ${backend} returned ${response.status}. trying next...`);
        // If 500+, we treat as failure and try next.
        lastError = new Error(`Status ${response.status}`);

      } catch (err) {
        console.error(`[Proxy] Connection failed to ${backend}: ${err.message}`);
        lastError = err;
        // Continue loop
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
