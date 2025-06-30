import { StreamableHTTPTransport } from "@hono/mcp";
import { Hono } from "hono";

interface Server {
  connect: (transport: StreamableHTTPTransport) => Promise<void>;
}

export function createHono(server: Server): Hono {
  const hono = new Hono();
  hono.all("/mcp", async (c) => {
    const transport = new StreamableHTTPTransport();
    await server.connect(transport);
    return transport.handleRequest(c);
  });
  return hono;
}
