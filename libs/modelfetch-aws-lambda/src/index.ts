import type { Server } from "@modelfetch/core";

import { createApp } from "@modelfetch/core";
import { streamHandle } from "hono/aws-lambda";

export default function handle(
  server: Server,
): ReturnType<typeof streamHandle> {
  const app = createApp(server);
  return streamHandle(app);
}
