import type { ServerOrConfig } from "@modelfetch/core";
import type { AddressInfo } from "node:net";
import type { Except } from "type-fest";

import { serve } from "@hono/node-server";
import { createApp } from "@modelfetch/core";

type Args = Parameters<typeof serve>;

export function getListeningAddress(addressInfo: AddressInfo): string {
  let hostname = addressInfo.address;
  if (addressInfo.family === "IPv6") {
    hostname =
      addressInfo.address === "::" || addressInfo.address === "::1"
        ? "localhost"
        : `[${addressInfo.address}]`;
  }
  if (addressInfo.family === "IPv4") {
    hostname =
      addressInfo.address === "0.0.0.0" || addressInfo.address === "127.0.0.1"
        ? "localhost"
        : addressInfo.address;
  }
  return `http://${hostname}:${addressInfo.port}`;
}

export type Callback = Args[1];

export type Options = Except<Args[0], "fetch">;

export default function handle(
  arg: ServerOrConfig,
  callback?: Callback,
  options?: Options,
) {
  const app = createApp(arg);
  return serve({ ...options, fetch: app.fetch }, callback);
}
