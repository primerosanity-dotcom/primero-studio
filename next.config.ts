import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    // Photos managed in Sanity are served from their CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    return [
      { source: "/cennik", destination: "/pakiety", permanent: true },
      { source: "/uslugi/:slug", destination: "/pakiety/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
