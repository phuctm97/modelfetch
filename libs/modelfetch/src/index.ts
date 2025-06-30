import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { StreamableHTTPTransport } from "@hono/mcp";
import { Hono } from "hono";

export function createApp(mcpServer: McpServer): Hono {
  const app = new Hono();

  app.all("/mcp", async (c) => {
    const transport = new StreamableHTTPTransport();
    await mcpServer.connect(transport);
    return transport.handleRequest(c);
  });

  return app;
}
