/**
 * Core utilities for MCP servers built with ModelFetch.
 *
 * This module provides the foundational components for creating MCP servers that can be deployed
 * across various JavaScript/TypeScript runtimes.
 *
 * @example
 * ```ts
 * import { createApp } from "@modelfetch/core";
 * import server from "./server";
 *
 * // Basic usage
 * const basicApp = createApp(server);
 *
 * // Advanced usage
 * const advancedApp = createApp({
 *   server,
 *   base: "/api",
 *   path: "/mcp",
 *   middleware: [authMiddleware, loggingMiddleware],
 *   pre: (app) => {
 *     // Configure routes before MCP endpoint
 *     app.get("/health", (c) => c.text("OK"));
 *   },
 *   post: (app) => {
 *     // Configure routes after MCP endpoint
 *     app.notFound((c) => c.text("Not found", 404));
 *   }
 * });
 * ```
 *
 * @module
 */

import type { MiddlewareHandler } from "hono";

import { StreamableHTTPTransport } from "@hono/mcp";
import { Hono } from "hono";

/**
 * MCP server application.
 */
export type App = Hono;

/**
 * MCP server implementation.
 */
export interface Server {
  connect: (transport: StreamableHTTPTransport) => Promise<void>;
}

/**
 * MCP server configuration.
 */
export interface Config {
  /** MCP server implementation. */
  server: Server;
  /** Base path for all routes. */
  base?: string;
  /** Custom path for the MCP endpoint (defaults to "/mcp"). */
  path?: string;
  /** Middleware to apply to the MCP endpoint. */
  middleware?: MiddlewareHandler[];
  /** Hook to configure routes before the MCP endpoint. */
  pre?: (app: Hono) => void;
  /** Hook to configure routes after the MCP endpoint. */
  post?: (app: Hono) => void;
}

/**
 * MCP server implementation or configuration.
 */
export type ServerOrConfig = Server | Config;

/**
 * Creates an MCP server application from an MCP server implementation or configuration.
 */
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
