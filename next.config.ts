import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Cloudflare Pages (Pure Static)
  output: "export",

  // Add the 'images' config right here
  images: {
    unoptimized: true, // Required for static export
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