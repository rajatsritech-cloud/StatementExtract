import type { NextConfig } from "next";

const shouldUseStandalone = process.platform !== "win32" || process.env.NEXT_FORCE_STANDALONE === "true";

const nextConfig: NextConfig = {
  // Use standalone output for OpenNext/Cloudflare
  ...(shouldUseStandalone ? { output: "standalone" } : {}),

  // Add the 'images' config right here
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // We removed rewrites to avoid production issues, but kept standalone for API support.
};

export default nextConfig;