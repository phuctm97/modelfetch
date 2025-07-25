import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import packageJson from "../package.json" with { type: "json" };

const server = new McpServer({
  title: "Example Bun MCP Server (TypeScript)",
  name: packageJson.name,
  version: packageJson.version,
});

// Example tool: Roll Dice
server.registerTool(
  "roll_dice",
  {
    title: "Roll Dice",
    description: "Rolls an N-sided dice",
    inputSchema: { sides: z.number().int().min(2) },
  },
  ({ sides }) => ({
    content: [
      {
        type: "text",
        text: `🎲 You rolled a ${1 + Math.floor(Math.random() * sides)}!`,
      },
    ],
  }),
);

// Example resource: App Config
server.registerResource(
  "app_config",
  "app://config",
  {
    title: "App Config",
    description: "Application configuration: API keys and user settings",
    mimeType: "text/plain",
  },
  (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: "<APP_CONFIG>",
      },
    ],
  }),
);

// Example prompt: Review Code
server.registerPrompt(
  "review_code",
  {
    title: "Review Code",
    description: "Review code for best practices and potential issues",
    argsSchema: { code: z.string() },
  },
  ({ code }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Please review this code:\n\n${code}`,
        },
      },
    ],
  }),
);

export default server;
