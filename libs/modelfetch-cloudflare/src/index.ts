import type { Server } from "@modelfetch/core";

import { createApp } from "@modelfetch/core";

export default function handle(server: Server) {
  const app = createApp(server);
  return app.fetch;
}
