import type { ServerOrConfig } from "@modelfetch/core";

import { createApp } from "@modelfetch/core";

export type Runtime = "deno" | "bun" | "node";

export default function handle(
  runtime: Runtime,
  instance: ServerOrConfig,
  port: number,
) {
  const app = createApp(instance);
  switch (runtime) {
    case "deno": {
      Deno.serve({ port }, app.fetch);
      break;
    }
    default: {
      Bun.serve({ port, fetch: app.fetch });
      break;
    }
  }
}
