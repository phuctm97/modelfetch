/**
 * This module lets you deploy MCP servers to Netlify.
 *
 * @example Basic Example
 * ```ts
 * import handle from "@modelfetch/netlify";
 * import server from "../server.ts"; // Import your McpServer
 *
 * // Export as a Netlify Edge Function handler
 * export default handle(server);
 * ```
 *
 * @example Advanced Example
 * ```ts
 * import handle from "@modelfetch/netlify";
 * import server from "../server.ts"; // Import your McpServer
 *
 * // Export as a Netlify Edge Function handler
 * export default handle({
 *   server,
 *   base: "/api",
 *   path: "/mcp",
 *   middleware: [authMiddleware, loggingMiddleware],
 *   pre: (app) => {
 *     app.get("/health", (c) => c.text("OK"));
 *   },
 *   post: (app) => {
 *     app.notFound((c) => c.text("Not found", 404));
 *   }
 * });
 * ```
 *
 * @module
 */

import type { ServerOrConfig } from "@modelfetch/core";

import { createApp } from "@modelfetch/core";
import { handle as handler } from "hono/netlify";

/**
 * Creates a Netlify Edge Function handler from an McpServer instance.
 */
export default function handle(arg: ServerOrConfig) {
  const app = createApp(arg);
  return handler(app);
}
