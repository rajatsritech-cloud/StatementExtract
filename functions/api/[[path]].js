export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // The path inside /api/...
  // e.g. /api/v1/health -> v1/health
  // The [[path]] parameter captures the rest of the path as an array
  const path = context.params.path;
  const pathStr = Array.isArray(path) ? path.join('/') : path;

  // OCI API Gateway URL (Set this in Cloudflare Pages Environment Variables)
  // Or hardcode it if you prefer (but env var is better)
  // OCI API Gateway blocked by quota? Point directly to Container Instance
  // Container Instance IP: 132.145.134.130
  const OCI_API_URL = env.OCI_API_URL || "http://132.145.134.130:8000/api";

  // Construct the new URL
  const targetUrl = `${OCI_API_URL}/${pathStr}${url.search}`;

  // Clone the request to modify it
  const newRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: "follow"
  });

  // Forward the request to OCI
  try {
    const response = await fetch(newRequest);

    // Create a new response to ensure headers are mutable if needed
    const newResponse = new Response(response.body, response);

    return newResponse;
  } catch (e) {
    return new Response(JSON.stringify({ error: "Proxy Error", details: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
