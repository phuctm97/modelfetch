const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

if (process.env.GITHUB_ACTIONS === "true") {
  nextConfig.webpack = (config) => {
    if (config.cache) config.cache = Object.freeze({ type: "memory" });
    return config;
  };
  nextConfig.productionBrowserSourceMaps = false;
  nextConfig.experimental = {
    enablePrerenderSourceMaps: false,
    serverSourceMaps: false,
    turbopackSourceMaps: false,
    webpackMemoryOptimizations: true,
    webpackBuildWorker: true,
  };
}

export default nextConfig;
