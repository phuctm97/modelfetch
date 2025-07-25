import "abortcontroller-polyfill/dist/polyfill-patch-fetch";

import type { ServerOrConfig } from "@modelfetch/core";

import { createApp } from "@modelfetch/core";
import { fire } from "hono/service-worker";

export default function handle(arg: ServerOrConfig) {
  const app = createApp(arg);
  fire(app);
}
