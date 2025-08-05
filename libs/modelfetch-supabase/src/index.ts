/**
 * This module lets you deploy MCP servers to Supabase.
 *
 * @example Basic Example
 * ```ts
 * import handle from "@modelfetch/supabase";
 * import server from "./server.ts"; // Import your McpServer
 *
 * // Run as a Supabase Edge Function
 * handle("mcp-server", server);
 * ```
 *
 * @example Advanced Example
 * ```ts
 * import handle from "@modelfetch/supabase";
 * import server from "./server.ts"; // Import your McpServer
 *
 * // Run as a Supabase Edge Function
 * handle("mcp-server", {
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

import type { Config, ServerOrConfig } from "@modelfetch/core";

import { createApp } from "@modelfetch/core";

/**
 * Starts the MCP server.
 */
export default function handle(
  name: string,
  arg: ServerOrConfig,
): Deno.HttpServer {
  const config: Config = "connect" in arg ? { server: arg } : { ...arg };
  config.base = `${config.base ?? ""}/${name}`;
  const app = createApp(config);
  return Deno.serve(app.fetch);
}
