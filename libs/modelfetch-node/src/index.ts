import type { Server } from "@modelfetch/core";
import type { AddressInfo } from "node:net";
import type { Except } from "type-fest";

import { serve } from "@hono/node-server";
import { createApp } from "@modelfetch/core";

type Args = Parameters<typeof serve>;

export function getEndpoint(address: AddressInfo): string {
  let hostname = address.address;
  if (address.family === "IPv6") {
    hostname =
      address.address === "::" || address.address === "::1"
        ? "localhost"
        : `[${address.address}]`;
  }
  if (address.family === "IPv4") {
    hostname =
      address.address === "0.0.0.0" || address.address === "127.0.0.1"
        ? "localhost"
        : address.address;
  }
  return `http://${hostname}:${address.port}/mcp`;
}

export type Callback = Args[1];

export type Options = Except<Args[0], "fetch">;

export default function handle(
  server: Server,
  callback?: Callback,
  options?: Options,
) {
  const app = createApp(server);
  return serve({ ...options, fetch: app.fetch }, callback);
}
