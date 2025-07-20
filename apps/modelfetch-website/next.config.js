import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

if (process.env.GITHUB_ACTIONS === "true") {
  nextConfig.webpack = (config) => {
    if (config.cache) config.cache = Object.freeze({ type: "memory" });
    return config;
  };
  nextConfig.experimental = {
    webpackMemoryOptimizations: true,
    webpackBuildWorker: true,
  };
}

export default createMDX()(nextConfig);
