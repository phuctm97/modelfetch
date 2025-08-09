import "abortcontroller-polyfill/dist/polyfill-patch-fetch";

import type { ServerOrConfig } from "@modelfetch/core";

import { createApp } from "@modelfetch/core";
import { fire } from "hono/service-worker";

Response.json = (data, init) => {
  const body = JSON.stringify(data);
  const headers = new Headers(init?.headers);
  if (!headers.has("content-type"))
    headers.set("content-type", "application/json");
  return new Response(body, { ...init, headers });
};

export default function handle(arg: ServerOrConfig) {
  const app = createApp(arg);
  fire(app);
}
