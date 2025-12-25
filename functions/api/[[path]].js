export async function onRequest(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);

  const pathStr = Array.isArray(params.path)
    ? params.path.join("/")
    : params.path;

  // Use the domain name to satisfy Cloudflare's Host requirement
  const targetUrl =
    `http://api.statementextract.com:8000/api/${pathStr}${url.search}`;

  const headers = new Headers(request.headers);
  // Explicitly set the Host header to match the target domain
  headers.set("host", "api.statementextract.com");
  headers.delete("cf-connecting-ip");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120_000); // 120s for queued requests

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
      signal: controller.signal
    });

    clearTimeout(timeout);
    // Recreate response to ensure it's valid for Cloudflare Pages
    return new Response(response.body, response);

  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Upstream timeout or connection error",
        detail: err.name,
        message: err.message
      }),
      { status: 504, headers: { "Content-Type": "application/json" } }
    );
  }
}
