import type { ServerOrConfig } from "@modelfetch/core";

import { createApp } from "@modelfetch/core";
import { handle as handler } from "hono/aws-lambda";

export default function handle(
  arg: ServerOrConfig,
): ReturnType<typeof handler> {
  const app = createApp(arg);
  return handler(app);
}
