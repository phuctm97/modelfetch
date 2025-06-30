import { StreamableHTTPTransport } from "@hono/mcp";
import { Hono } from "hono";
import fs from "node:fs";
import path from "node:path";

interface Server {
  connect: (transport: StreamableHTTPTransport) => Promise<void>;
}

function isServer(obj: unknown): obj is Server {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "connect" in obj &&
    typeof obj.connect === "function"
  );
}

async function importServer(param?: string): Promise<Server> {
  let modulePath: string;
  if (param) {
    modulePath = param;
  } else {
    const distPath = path.join(process.cwd(), "dist", "index.js");
    const srcPath = path.join(process.cwd(), "src", "index.js");
    if (fs.existsSync(distPath)) {
      modulePath = distPath;
    } else if (fs.existsSync(srcPath)) {
      modulePath = srcPath;
    } else {
      throw new Error(
        "No entry point found - Expected dist/index.js or src/index.js",
      );
    }
  }
  const module = (await import(modulePath)) as Record<string, unknown>;
  if (isServer(module.default)) return module.default;
  throw new Error(
    `The default export of ${modulePath} is not an McpServer instance`,
  );
}

async function loadServer(param?: Server | string): Promise<Server> {
  return isServer(param) ? param : importServer(param);
}

export async function createApp(param?: Server | string): Promise<Hono> {
  const server = await loadServer(param);
  const app = new Hono();
  app.all("/mcp", async (c) => {
    const transport = new StreamableHTTPTransport();
    await server.connect(transport);
    return transport.handleRequest(c);
  });
  return app;
}
