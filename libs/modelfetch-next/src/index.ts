import type { ServerOrConfig } from "@modelfetch/core";

import { createApp } from "@modelfetch/core";
import { handle as handler } from "hono/vercel";

export default function handle(arg: ServerOrConfig) {
  const app = createApp(arg);
  return handler(app);
}
