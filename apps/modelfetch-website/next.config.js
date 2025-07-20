import { createMDX } from "fumadocs-mdx/next";

export default createMDX()({
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack: process.env.GITHUB_ACTIONS
    ? (config) => {
        if (config.cache) config.cache = Object.freeze({ type: "memory" });
        return config;
      }
    : undefined,
  experimental: process.env.GITHUB_ACTIONS
    ? { webpackMemoryOptimizations: true, webpackBuildWorker: true }
    : undefined,
});
