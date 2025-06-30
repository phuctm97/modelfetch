import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

const packageJson = JSON.parse(
  await fs.readFile(
    path.resolve(import.meta.dirname, "..", "package.json"),
    "utf8",
  ),
);

const server = new McpServer({
  title: "Example (JavaScript)",
  name: (packageJson.name ?? "") || "example-js",
  version: (packageJson.version ?? "") || "1.0.0",
});

server.tool(
  "roll_dice",
  "Rolls an N-sided dice",
  { sides: z.number().int().min(2) },
  ({ sides }) => ({
    content: [
      {
        type: "text",
        text: `🎲 You rolled a ${1 + Math.floor(Math.random() * sides)}!`,
      },
    ],
  }),
);

export default server;
