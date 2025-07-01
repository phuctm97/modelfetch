import { createMDX } from "fumadocs-mdx/next";

export default createMDX()({
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
});
