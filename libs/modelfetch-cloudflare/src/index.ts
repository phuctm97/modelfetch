import type { ServerOrConfig } from "@modelfetch/core";

import { createApp } from "@modelfetch/core";

export default function handle(arg: ServerOrConfig) {
  const app = createApp(arg);
  return app.fetch;
}
