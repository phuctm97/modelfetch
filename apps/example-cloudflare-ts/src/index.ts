import handle from "@modelfetch/cloudflare";

import server from "./server";

export default {
  fetch: handle(server),
} satisfies ExportedHandler<Env>;
