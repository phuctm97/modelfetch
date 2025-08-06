import handle, { getListeningAddress } from "@modelfetch/bun";

import server from "./server.ts";

const bunServer = handle(server);

console.log(`The MCP server is listening at ${getListeningAddress(bunServer)}`);
