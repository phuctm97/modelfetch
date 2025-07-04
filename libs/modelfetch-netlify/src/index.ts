import type { Server } from "@modelfetch/core";

import { createApp } from "@modelfetch/core";
import { handle as handler } from "hono/netlify";

export default function handle(server: Server) {
  const app = createApp(server);
  return handler(app);
}
