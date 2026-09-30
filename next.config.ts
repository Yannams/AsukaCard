import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/:slug.vcf",
        destination: "/api/vcard/:slug.vcf",
      },
    ];
  },
};

export default nextConfig;
