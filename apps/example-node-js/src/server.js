import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import packageJson from "../package.json" with { type: "json" };

const server = new McpServer({
  title: "Example Node.js MCP Server (JavaScript)",
  name: packageJson.name,
  version: packageJson.version,
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
