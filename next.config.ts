import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Uploads (src/lib/media.ts) and bundled imports only. Uploads get new
    // file names on every change, so a resized copy can live for a month.
    localPatterns: [
      { pathname: "/media/**", search: "" },
      { pathname: "/_next/static/media/**", search: "" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 31,
    qualities: [75],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Allows real stock photos (e.g. from Pexels) to stand in as
    // placeholders while real team/community photos aren't ready yet.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  // Uploaded files (avatars, project covers) come from the API host: see src/lib/media.ts.
  async rewrites() {
    const api = process.env.API_URL?.replace(/\/+$/, "");
    if (!api) return [];
    return [{ source: "/media/:path*", destination: `${api}/media/:path*` }];
  },
};

export default nextConfig;
