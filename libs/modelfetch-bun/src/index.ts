import type { ServerOrConfig } from "@modelfetch/core";
import type { Except } from "type-fest";

import { createApp } from "@modelfetch/core";

export function getListeningAddress(server: Bun.Server): string {
  const hostname =
    server.hostname === "[::]" ||
    server.hostname === "[::1]" ||
    server.hostname === "0.0.0.0" ||
    server.hostname === "127.0.0.1"
      ? "localhost"
      : server.hostname;
  return `http://${hostname}:${server.port}`;
}

export type Options = Except<Bun.ServeOptions, "fetch">;

export default function handle(
  arg: ServerOrConfig,
  options?: Options,
): Bun.Server {
  const app = createApp(arg);
  return Bun.serve({ ...options, fetch: app.fetch });
}
