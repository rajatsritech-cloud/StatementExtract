import type { NextConfig } from "next";

const shouldUseStandalone = process.platform !== "win32" || process.env.NEXT_FORCE_STANDALONE === "true";

const nextConfig: NextConfig = {
  // Your existing standalone config
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
};

export default nextConfig;