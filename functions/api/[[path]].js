export async function onRequest(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);

  const pathStr = Array.isArray(params.path)
    ? params.path.join("/")
    : params.path;

  // Use the domain name to satisfy Cloudflare's Host requirement
  // Enterprise Load Balancing: Failover Logic
  const backends = [
    "150.136.48.30:8000",
    "129.80.181.100:8000"
  ];

  // Try random backend first (Load Distribution)
  // If it fails, try the other one (High Availability)
  let primaryIndex = Math.floor(Math.random() * backends.length);
  const attemptOrder = [
    backends[primaryIndex],
    backends[(primaryIndex + 1) % backends.length] // The other one
  ];

  const headers = new Headers(request.headers);
  headers.set("host", "api.statementextract.com");
  headers.delete("cf-connecting-ip");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120_000);

  try {
    let lastError;

    // Failover Loop
    for (const backend of attemptOrder) {
      try {
        const targetUrl = `http://${backend}/api/${pathStr}${url.search}`;
        const response = await fetch(targetUrl, {
          method: request.method,
          headers,
          body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
          signal: controller.signal
        });

        if (response.ok || response.status < 500) {
          clearTimeout(timeout);
          return new Response(response.body, response);
        }
        // If 5xx error, throw to trigger failover to next backend
        throw new Error(`Backend ${backend} returned ${response.status}`);

      } catch (err) {
        console.error(`Failed to reach ${backend}: ${err.message}`);
        lastError = err;
        // Continue to next backend
      }
    }

    // If both failed
    throw lastError || new Error("All backends failed");

  } catch (err) {
    clearTimeout(timeout);
    return new Response(
      JSON.stringify({
        error: "Service Unavailable",
        message: "Both server instances are currently unreachable. Please try again later."
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }
}
