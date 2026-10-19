import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  // The app has one root layout per route group, so the 404 is a global page.
  experimental: { globalNotFound: true },
};

export default nextConfig;
