import type { PackageJson } from "type-fest";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

const packageJson = JSON.parse(
  await fs.readFile(path.join(import.meta.dirname, "package.json"), "utf8"),
) as PackageJson;

const mcpServer = new McpServer({
  title: "ModelFetch Example (TypeScript)",
  name: (packageJson.name ?? "") || "modelfetch-example-ts",
  version: (packageJson.version ?? "") || "1.0.0",
});

mcpServer.tool(
  "roll_dice",
  "Rolls an N-sided dice",
  { sides: z.number().int().min(2) },
  ({ sides }) => {
    const value = 1 + Math.floor(Math.random() * sides);
    return {
      content: [
        {
          type: "text",
          text: `🎲 You rolled a ${value}!`,
        },
      ],
    };
  },
);

export default mcpServer;
