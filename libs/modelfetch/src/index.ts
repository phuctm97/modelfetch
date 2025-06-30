import { StreamableHTTPTransport } from "@hono/mcp";
import { Hono } from "hono";

interface Server {
  connect: (transport: StreamableHTTPTransport) => Promise<void>;
}

export function createApp(server: Server): Hono {
  const app = new Hono();
  app.all("/mcp", async (c) => {
    const transport = new StreamableHTTPTransport();
    await server.connect(transport);
    return transport.handleRequest(c);
  });
  return app;
}
