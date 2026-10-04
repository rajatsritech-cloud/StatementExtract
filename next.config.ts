import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Static export only for production (Cloudflare Pages) — disabled in dev so Clerk SSR works
  ...(isDev ? {} : { output: "export", trailingSlash: true }),

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },


};

export default nextConfig;