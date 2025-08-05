import type { MiddlewareHandler } from "hono";

import { StreamableHTTPTransport } from "@hono/mcp";
import { Hono } from "hono";

export type App = Hono;

export interface Server {
  connect: (transport: StreamableHTTPTransport) => Promise<void>;
}

export interface Config {
  server: Server;
  base?: string;
  path?: string;
  middleware?: MiddlewareHandler[];
  pre?: (app: Hono) => void;
  post?: (app: Hono) => void;
}

export type ServerOrConfig = Server | Config;

export function createApp(arg: ServerOrConfig): App {
  const config: Config = "connect" in arg ? { server: arg } : arg;

  const app = new Hono();

  const router = config.base ? app.basePath(config.base) : app;

  if (config.pre) config.pre(router);

  const path = (config.path ?? "") || "/mcp";

  if (config.middleware)
    for (const fn of config.middleware) router.use(path, fn);

  router.all(path, async (c) => {
    const transport = new StreamableHTTPTransport();
    await config.server.connect(transport);
    return transport.handleRequest(c);
  });

  if (config.post) config.post(router);

  return app;
}
