import type { ServerOrConfig } from "@modelfetch/core";

import { createApp } from "@modelfetch/core";
import { streamHandle } from "hono/aws-lambda";

export default function handle(
  arg: ServerOrConfig,
): ReturnType<typeof streamHandle> {
  const app = createApp(arg);
  return streamHandle(app);
}
