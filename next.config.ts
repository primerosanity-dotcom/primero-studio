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
      // Packages used to live under /uslugi/<package>; /uslugi/<slug> is now
      // the single-service landing page, so only the old package URLs move.
      {
        source: "/uslugi/:slug(essential|protect|restore|ceramic|signature)",
        destination: "/pakiety/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
