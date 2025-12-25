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
  // Protects Micro Instance from OOM during upload
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > 20_000_000) {
    return new Response(JSON.stringify({ error: "Payload too large (Max 20MB)" }), {
      status: 413,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Enterprise Load Balancing: Failover Logic
  const backends = [
    "backend1.statementextract.com:8000",
    "backend2.statementextract.com:8000"
  ];

  // Try random backend first (Load Distribution)
  // If it fails, try the other one (High Availability)
  let primaryIndex = Math.floor(Math.random() * backends.length);
  const attemptOrder = [
    backends[primaryIndex],
    backends[(primaryIndex + 1) % backends.length] // The other one
  ];

  const headers = new Headers(request.headers);
  // Ensure we do NOT invoke the original Host header on the backend request
  // This forces fetch() to generate the correct Host: <IP> header
  headers.delete("host");
  headers.delete("cf-connecting-ip");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120_000);

  try {
    let lastError;

    // Failover Loop
    for (const backend of attemptOrder) {
      try {
        // Note: Using HTTP as backend is internal/firewalled.
        // HTTPS would require self-signed certs setup on VMs.
        const targetUrl = `http://${backend}/api/${pathStr}${url.search}`;

        const response = await fetch(targetUrl, {
          method: request.method,
          headers,
          body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
          signal: controller.signal
        });

        if (response.ok || response.status < 500) {
          clearTimeout(timeout);

          // 3. Fix Response Cloning (Stream Safety)
          return new Response(response.body, {
            status: response.status,
            headers: response.headers
          });
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
