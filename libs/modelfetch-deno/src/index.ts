/**
 * This module lets you run MCP servers as Deno-native HTTP servers.
 *
 * @example Basic Example
 * ```ts
 * import handle from "@modelfetch/deno";
 * import server from "./server.ts"; // Import your McpServer
 *
 * // Run as a Deno HTTP server
 * handle(server);
 * ```
 *
 * @example Advanced Example
 * ```ts
 * import handle, { getEndpoint } from "@modelfetch/deno";
 * import server from "./server.ts"; // Import your McpServer
 *
 * // Run as a Deno HTTP server
 * handle(server, {
 *   // Customize server options
 *   port: 8080, // Customize server port
 *   onListen: (address) => { // Log the endpoint when the server starts listening
 *     console.log(`MCP server is available at ${getEndpoint(address)}`);
 *   },
 * });
 * ```
 *
 * @module
 */

import type { ServerOrConfig } from "@modelfetch/core";

import { createApp } from "@modelfetch/core";

/**
 * Gets the MCP server endpoint from the server Deno.Addr.
 */
export function getEndpoint(address: Deno.Addr): string {
  if (address.transport === "tcp" || address.transport === "udp") {
    const hostname =
      address.hostname === "[::]" ||
      address.hostname === "[::1]" ||
      address.hostname === "0.0.0.0" ||
      address.hostname === "127.0.0.1"
        ? "localhost"
        : address.hostname;
    return `http://${hostname}:${address.port}`;
  }
  throw new Error(
    `'${address.transport}' transport is not supported (only TCP and UDP transports are supported)`,
  );
}

/**
 * Starts the MCP server.
 */
export default function handle(
  arg: ServerOrConfig,
  options?: Deno.ServeOptions,
): Deno.HttpServer {
  const app = createApp(arg);
  return Deno.serve(options ?? {}, app.fetch);
}
