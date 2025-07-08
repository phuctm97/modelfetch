import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import convert from "npm-to-yarn";

export const docs = defineDocs({ dir: "mdx" });

export default defineConfig({
  mdxOptions: {
    remarkNpmOptions: {
      packageManagers: [
        { command: (cmd) => convert(cmd, "npm"), name: "npm" },
        { command: (cmd) => convert(cmd, "pnpm"), name: "pnpm" },
        { command: (cmd) => convert(cmd, "bun"), name: "bun" },
        { command: (cmd) => convert(cmd, "yarn"), name: "yarn" },
      ],
    },
  },
});
