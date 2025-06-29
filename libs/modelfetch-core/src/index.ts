import { StreamableHTTPTransport } from "@hono/mcp";
import { Hono } from "hono";

export interface Server {
  connect: (transport: StreamableHTTPTransport) => Promise<void>;
}

export type App = Hono;

export function createApp(server: Server): App {
  const app = new Hono();
  app.all("/mcp", async (c) => {
    const transport = new StreamableHTTPTransport();
    await server.connect(transport);
    return transport.handleRequest(c);
  });
  return app;
}
