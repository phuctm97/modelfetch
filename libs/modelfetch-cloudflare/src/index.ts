import type { Server } from "@modelfetch/core";
import type { Except } from "type-fest";

import { createApp } from "@modelfetch/core";

export type Options<
  Env = unknown,
  QueueHandlerMessage = unknown,
  CfHostMetadata = unknown,
> = Except<ExportedHandler<Env, QueueHandlerMessage, CfHostMetadata>, "fetch">;

export default function handle<
  Env = unknown,
  QueueHandlerMessage = unknown,
  CfHostMetadata = unknown,
>(
  server: Server,
  options?: Options<Env, QueueHandlerMessage, CfHostMetadata>,
): ExportedHandler<Env, QueueHandlerMessage, CfHostMetadata> {
  const app = createApp(server);
  return { ...options, fetch: app.fetch };
}
