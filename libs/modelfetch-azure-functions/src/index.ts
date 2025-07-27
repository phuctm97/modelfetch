import type { ServerOrConfig } from "@modelfetch/core";

import { app } from "@azure/functions";
import { azureHonoHandler } from "@marplex/hono-azurefunc-adapter";
import { createApp } from "@modelfetch/core";

export default function handle(arg: ServerOrConfig): void {
  const honoApp = createApp(arg);
  app.setup({ enableHttpStream: true });
  app.http("default", {
    methods: ["GET", "POST", "DELETE"],
    route: "{*path}",
    authLevel: "anonymous",
    handler: azureHonoHandler(honoApp.fetch),
  });
}
