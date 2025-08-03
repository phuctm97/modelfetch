import type { Config, ServerOrConfig } from "@modelfetch/core";

import { createApp } from "@modelfetch/core";

export default function handle(
  name: string,
  arg: ServerOrConfig,
): Deno.HttpServer {
  const config: Config = "connect" in arg ? { server: arg } : { ...arg };
  config.base = `${config.base ?? ""}/${name}`;
  const app = createApp(config);
  return Deno.serve(app.fetch);
}
