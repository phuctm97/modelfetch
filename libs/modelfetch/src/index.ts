import { StreamableHTTPTransport } from "@hono/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Hono } from "hono";
import fs from "node:fs";
import path from "node:path";

async function loadServer(): Promise<McpServer> {
  const distPath = path.join(process.cwd(), "dist", "index.js");
  const srcPath = path.join(process.cwd(), "src", "index.js");
  let modulePath: string;
  if (fs.existsSync(distPath)) {
    modulePath = distPath;
  } else if (fs.existsSync(srcPath)) {
    modulePath = srcPath;
  } else {
    throw new Error(
      "Failed to load MCP server. Please provide mcpServer parameter or ensure dist/index.js or src/index.js exports a default MCP server instance.",
    );
  }
  const module = (await import(modulePath)) as { default: unknown };
  if (module.default instanceof McpServer) return module.default;
  throw new Error(
    `Default export from ${modulePath} is not an instance of McpServer`,
  );
}

export async function createApp(param?: McpServer): Promise<Hono> {
  const server = param ?? (await loadServer());
  const app = new Hono();
  app.all("/mcp", async (c) => {
    const transport = new StreamableHTTPTransport();
    await server.connect(transport);
    return transport.handleRequest(c);
  });
  return app;
}
