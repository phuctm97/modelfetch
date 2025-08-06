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
 * import handle, { getListeningAddress } from "@modelfetch/deno";
 * import server from "./server.ts"; // Import your McpServer
 *
 * // Run as a Deno HTTP server
 * handle(server, {
 *   // Customize server options
 *   port: 8080, // Customize server port
 *   onListen: (addr) => { // Print listening address
 *     console.log(`The MCP server is listening at ${getListeningAddress(addr)}`);
 *   },
 * });
 * ```
 *
 * @module
 */

import type { ServerOrConfig } from "@modelfetch/core";

import { createApp } from "@modelfetch/core";

/**
 * Gets listening address from the server Deno.Addr.
 */
export function getListeningAddress(addr: Deno.Addr): string {
  if (addr.transport === "tcp" || addr.transport === "udp") {
    const hostname =
      addr.hostname === "[::]" ||
      addr.hostname === "[::1]" ||
      addr.hostname === "0.0.0.0" ||
      addr.hostname === "127.0.0.1"
        ? "localhost"
        : addr.hostname;
    return `http://${hostname}:${addr.port}`;
  }
  throw new Error(
    `'${addr.transport}' transport is not supported (only TCP and UDP transports are supported)`,
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
