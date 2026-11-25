import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Design concepts are static pages in public/concepts/<x>/index.html
  async rewrites() {
    return [
      { source: "/concepts/:c", destination: "/concepts/:c/index.html" },
      { source: "/concepts/:c/", destination: "/concepts/:c/index.html" },
    ];
  },
};

export default nextConfig;
