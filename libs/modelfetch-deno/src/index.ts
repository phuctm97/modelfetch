import type { ServerOrConfig } from "@modelfetch/core";

import { createApp } from "@modelfetch/core";

export function getEndpoint(address: Deno.Addr): string {
  if (address.transport === "tcp" || address.transport === "udp") {
    const hostname =
      address.hostname === "[::]" ||
      address.hostname === "[::1]" ||
      address.hostname === "0.0.0.0" ||
      address.hostname === "127.0.0.1"
        ? "localhost"
        : address.hostname;
    return `http://${hostname}:${address.port}/mcp`;
  }
  throw new Error(
    `'${address.transport}' transport is not supported (only TCP and UDP transports are supported)`,
  );
}

export type Options = Deno.ServeOptions;

export default function handle(
  arg: ServerOrConfig,
  options?: Options,
): Deno.HttpServer {
  const app = createApp(arg);
  return Deno.serve(options ?? {}, app.fetch);
}
