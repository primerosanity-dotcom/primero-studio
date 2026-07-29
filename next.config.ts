import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      { source: "/cennik", destination: "/pakiety", permanent: true },
      { source: "/uslugi/:slug", destination: "/pakiety/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
