import type { Server } from "@modelfetch/core";
import type { Except } from "type-fest";

import { serve } from "@hono/node-server";
import { createApp } from "@modelfetch/core";

type Args = Parameters<typeof serve>;

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
