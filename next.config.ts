import type { NextConfig } from "next";

const shouldUseStandalone = process.platform !== "win32" || process.env.NEXT_FORCE_STANDALONE === "true";

const nextConfig: NextConfig = {
  ...(shouldUseStandalone ? { output: "standalone" } : {}),
};

export default nextConfig;
