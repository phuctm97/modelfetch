import handle, { getListeningAddress } from "@modelfetch/deno";

import server from "./server.js";

handle(server, {
  onListen: (addr) => {
    console.log(`The MCP server is listening at ${getListeningAddress(addr)}`);
  },
});
